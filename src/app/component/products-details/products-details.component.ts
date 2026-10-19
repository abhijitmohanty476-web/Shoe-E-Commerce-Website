import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { ShoeService } from '../../services/shoe.service';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-details',

  imports: [CommonModule, RouterLink, ReactiveFormsModule,NgxSpinnerModule],

  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  private route = inject(ActivatedRoute);

  private productService = inject(ShoeService);

  private fb = inject(FormBuilder);
  private spinner=inject(NgxSpinnerService)

  serverUrl = environment.serverUrl;

  product: any;

  orderForm!: FormGroup;

  showOrderForm = false;

 
  productId!: number;

  ngOnInit(): void {
   
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.createOrderForm();

    this.getProductDetails(this.productId);
  }


  createOrderForm(): void {
    this.orderForm = this.fb.group({
      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],

      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)],
      ],

      email: ['', [Validators.required, Validators.email]],

      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }



  getProductDetails(id: number): void {
    this.spinner.show();
    this.productService.getProductDetails(id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.product = response.data;
        }
         this.spinner.hide();
      },

      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

 

  buyProduct(): void {
    this.showOrderForm = true;

    setTimeout(() => {
      document.getElementById('orderForm')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  }

  

  get f() {
    return this.orderForm.controls;
  }

  

submitOrder(): void {

  if (this.orderForm.invalid) {

    this.orderForm.markAllAsTouched();

    return;
  }


  const orderData = {

    productId: this.product.productId,

    brandId: this.product.brandId,

    customerName: this.orderForm.value.customerName,

    mobileNumber: this.orderForm.value.mobileNumber,

    email: this.orderForm.value.email,

    address: this.orderForm.value.address,

    price: this.product.price

  };
    this.spinner.show();


  this.productService.placeOrder(orderData).subscribe({

    next: (response: any) => {
      this.spinner.hide();

   
      this.orderForm.reset();

     
      this.showOrderForm = false;

      
      this.getProductDetails(this.productId);


     
      Swal.fire({

        toast: true,

        position: 'top-end',

        icon: 'success',

        title: 'Order Placed Successfully!',

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true

      });

    },


    error: (error) => {

      console.log('Order Error:', error);
       this.spinner.hide()


      
      Swal.fire({

        toast: true,

        position: 'top-end',

        icon: 'error',

        title: 'Order Failed!',

        text: 'Something went wrong while placing your order.',

        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true

      });

    }

  });

}


}
