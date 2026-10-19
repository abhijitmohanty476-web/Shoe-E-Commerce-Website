import { Component } from '@angular/core';
import { HappyCustomerComponent } from '../happy-customer/happy-customer.component';
import { environment } from '../../../environments/environment.development';
import { ShoeService } from '../../services/shoe.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [HappyCustomerComponent, CommonModule, RouterModule, NgxSpinnerModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  serverUrl = environment.serverUrl;

  brands: any[] = [];
  products: any[] = [];

  constructor(private shoeService: ShoeService,private spinner: NgxSpinnerService) {
    
  }

  ngOnInit(): void {

     /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    this.loadBrands();
    this.loadPopularProducts(); 


  }

  loadBrands(): void {
    this.spinner.show();
    this.shoeService.getBrands().subscribe({
      next: (response: any) => {
        this.spinner.hide();
        if (response.success) {
          this.brands = response.data;
          
        }

        
      },

      error: (error) => {
        console.error(error);
        this.spinner.hide();
      },
    });
  }

  loadPopularProducts(): void {
    this.spinner.show();
    this.shoeService.getCategories().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.spinner.hide();
          this.products = response.data;
        }

        console.log(this.brands);
      },

      error: (error) => {
        this.spinner.hide();
        console.error(error);
      },
    });
  }
}
