import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReadProductDTO } from '../../models/product-dto.Model';
import { ProductService } from '../../admin-services/product.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: ReadProductDTO[] = []; // List to hold the products

  constructor(
    private productService: ProductService,
    private router: Router,
    
     private toastr: ToastrServiceWrapper
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products when the component is initialized
  }

  // Method to load all products from the backend
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: ReadProductDTO[]) => {
        this.products = data; // Assign the fetched products to the local products array
      },
      (error) => {
        console.error('Error fetching products:', error); // Handle error
      }
    );
  }

  // Method to navigate to the product creation form
  onAddProduct(): void {
    this.router.navigate(['/admin-product-form']); // Navigate to the product form for adding a new product
  }

  // Method to navigate to the product form for editing a product
  onEditProduct(product: ReadProductDTO): void {
    this.router.navigate(['/admin-product-form'], {
      queryParams: { id: product.ProductId } // Pass product ID as a query parameter for editing
    });
    
  }

  // Method to handle product deletion
  onDeleteProduct(productId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Remove the deleted product from the list
          this.products = this.products.filter((p) => p.ProductId !== productId);
           this.toastr.success("Product Deleted Successfully")    
              },
        (error) => {
          console.error('Error deleting product:', error); // Handle error during deletion
        }
      );
    }
  }
}
