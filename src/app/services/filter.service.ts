import { Injectable, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private productService:ProductService) { }
  // Fetch products by categoryId
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return new Observable<Product[]>(observer => {
      this.productService.getProducts().subscribe(products => {
        const filteredProducts = products.filter(product => product.CategoryId === categoryId);
        observer.next(filteredProducts);
        observer.complete();
      });
    });
  }

}
