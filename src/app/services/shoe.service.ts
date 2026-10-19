import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBrands() {
    return this.http.get(this.apiUrl + '/Brand/GetBrands');
  }

  getCategories() {
    return this.http.get(this.apiUrl + '/Product/GetPopularProducts');
  }

  getshoedetails() {
    return this.http.get(this.apiUrl + '');
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Product/GetProductDetails/${id}`);
  }

  getproductbybrand(id: number) {
    return this.http.get(`${this.apiUrl}/Product/GetProductsByBrand/${id}`);
  }

  placeOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/Order/buy-now`, orderData);
  }

    getProductsByBrand(brandId: number) {

    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsByBrand/${brandId}`
    );

  }
}
