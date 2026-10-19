import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductsDetailsComponent } from './component/products-details/products-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  

  { path: 'products/:id', component: ProductsComponent },

  { path: 'product-details/:id', component: ProductsDetailsComponent },

  {
    path: '**',
    redirectTo: '',
  },
];
