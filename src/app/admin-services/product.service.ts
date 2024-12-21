import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductDTO, UpdateProductDTO, ReadProductDTO, DeleteProductDTO } from '../models/product-dto.Model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44348/api/Product'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get all products
  getProducts(): Observable<ReadProductDTO[]> {
    return this.http.get<ReadProductDTO[]>(this.apiUrl);
  }

  // Method to get a single product by ID
  getProductById(id: number): Observable<ReadProductDTO> {
    return this.http.get<ReadProductDTO>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new product
  addProduct(createProductDTO: CreateProductDTO): Observable<ReadProductDTO> {
    const formData = new FormData();
    formData.append('ProductName', createProductDTO.ProductName); // Ensure correct naming convention
    formData.append('Price', createProductDTO.Price.toString());
    formData.append('Description', createProductDTO.Description);
    formData.append('StockQuantity', createProductDTO.StockQuantity.toString());
    formData.append('CategoryId', createProductDTO.CategoryId.toString());
    formData.append('File', createProductDTO.ProductImage); // Append the image file correctly
   
    return this.http.post<ReadProductDTO>(this.apiUrl, formData);
  }

  // Method to update an existing product
  updateProduct(updateProductDTO: UpdateProductDTO): Observable<ReadProductDTO> {
    const formData = new FormData();
    formData.append('ProductName', updateProductDTO.ProductName); // Ensure correct naming convention
    formData.append('Price', updateProductDTO.Price.toString());
    formData.append('Description', updateProductDTO.Description);
    formData.append('StockQuantity', updateProductDTO.StockQuantity.toString());
    formData.append('CategoryId', updateProductDTO.CategoryId.toString());

    // If a new product image is provided, append it
    if (updateProductDTO.ProductImage) {
      formData.append('File', updateProductDTO.ProductImage); // Append new image correctly
    }

    return this.http.put<ReadProductDTO>(`${this.apiUrl}/${updateProductDTO.ProductId}`, formData);
  }

  // Method to delete a product
  deleteProduct(productId: number): Observable<DeleteProductDTO> {
    return this.http.delete<DeleteProductDTO>(`${this.apiUrl}/${productId}`);
  }
}
