import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateProductDTO, ReadProductDTO, UpdateProductDTO } from '../../models/product-dto.Model';
import { ProductService } from '../../admin-services/product.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
  imports: [FormsModule, CommonModule], // Ensure ReactiveFormsModule is added
})
export class AdminProductFormComponent implements OnInit {
  product: CreateProductDTO | UpdateProductDTO = {
    ProductName: '',
    Price: 0,
    Description: '',
    StockQuantity: 0,
    CategoryId: 0,
    ProductImage: null,
  };

  isEditMode: boolean = false;
  productId: number | null = null;
  showCategoryInfo: boolean = false; // For displaying category info

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrServiceWrapper
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode and load product details if so
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.productId = +params['id']; // Convert to number
        this.isEditMode = true;
        this.loadProduct(this.productId); // Load product details for editing
      }
    });
  }

  // Load product details for editing
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: ReadProductDTO) => {
        // Map fetched product to the form product object
        this.product = {
          ProductName: product.ProductName,
          Price: product.Price,
          Description: product.Description,
          StockQuantity: product.StockQuantity,
          CategoryId: product.CategoryId,
          ProductImage: product.ProductImage, // If no image, set null
        };
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  // Handle form submission (for both adding and updating a product)
  onSubmit(): void {
    if (this.isEditMode && this.productId !== null) {
      // Prepare the UpdateProductDTO
      const updateProductDTO: UpdateProductDTO = {
        ProductId: this.productId,
        ProductName: this.product.ProductName,
        Price: this.product.Price,
        Description: this.product.Description,
        StockQuantity: this.product.StockQuantity,
        CategoryId: this.product.CategoryId,
        ProductImage: this.product.ProductImage, // For image handling in update
      };

      // Call update service method
      this.productService.updateProduct(updateProductDTO).subscribe(
        (response) => {
          this.toastr.success('Product updated successfully:');
          this.router.navigate(['/admin-product']); // Navigate back to the product list
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Prepare CreateProductDTO for a new product
      const createProductDTO: CreateProductDTO = {
        ProductName: this.product.ProductName,
        ProductImage: this.product.ProductImage, // Product image must be provided
        Price: this.product.Price,
        Description: this.product.Description,
        StockQuantity: this.product.StockQuantity,
        CategoryId: this.product.CategoryId,
      };

      // Call add service method
      this.productService.addProduct(createProductDTO).subscribe(
        (response: ReadProductDTO) => {
          this.toastr.success('Product added successfully:');
          this.router.navigate(['/admin-product']); // Navigate back to the product list
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  // Handle file input changes (for product image)
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.ProductImage = file; // Set the selected image file to product
    }
  }
}
