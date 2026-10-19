import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ShoeService } from '../../services/shoe.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCardComponent, RouterLink, NgxSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: any[] = [];

  brandId!: number;

  serverUrl = environment.serverUrl;
  private spinner = inject(NgxSpinnerService);

  constructor(
    private route: ActivatedRoute,
    private Service: ShoeService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.brandId = Number(params.get('id'));

      if (this.brandId) {
        this.getProductsByBrand();
      }
    });
  }

  getProductsByBrand(): void {
    this.spinner.show();

    this.Service.getProductsByBrand(this.brandId).subscribe({
      next: (response) => {
        console.log(response);

        if (response.success) {
          this.products = response.data;
        } else {
          this.products = [];
        }
        this.spinner.hide();
      },

      error: (error) => {
        this.spinner.hide();
        console.error('Error loading products:', error);

        this.products = [];
      },
    });
  }
}
