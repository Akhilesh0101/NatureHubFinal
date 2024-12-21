import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'https://localhost:44348/api/Product'; // Adjust the URL to your .NET Core API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

 // Add an API method to update stock quantity
   updateProductStock(productId: number, stockQuantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}/update-stock`, { StockQuantity: stockQuantity });
  }
}


