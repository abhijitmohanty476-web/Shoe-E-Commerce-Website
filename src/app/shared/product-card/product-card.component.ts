import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,
    RouterModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
   @Input() products: any[] = [];

  serverUrl = environment.serverUrl;

}
