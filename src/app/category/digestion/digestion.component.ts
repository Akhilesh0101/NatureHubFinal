import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FilterService } from '../../services/filter.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-digestion',
  standalone: false,
  
  templateUrl: './digestion.component.html',
  styleUrl: './digestion.component.css'
})
export class DigestionComponent implements OnInit{
  products: Product[] = [];

  constructor(private filterService: FilterService, private toastr: ToastrServiceWrapper, public cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this.fetchProducts(5);  // Assuming '5' is the categoryId for digestion
  }

  fetchProducts(categoryId: number): void {
    this.filterService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
    });
  }
  // Add product to the cart
  addToCart(product: Product) {
    if (product && product.ProductId) {  // Check if product is valid
      this.cartService.addToCart(product);
      this.toastr.success(`${product.ProductName} added to cart!`);
    } else {
      this.toastr.error('Invalid product', 'Error');
    }
  }
  

  // Buy product immediately and proceed to payment
  buyNow(product: Product) {
    if (product.StockQuantity > 0) {
      // Add the product to cart temporarily
      this.cartService.addToCart(product);
  
      // Prepare payment data for immediate purchase
      const paymentData = {
        cartTotal: product.Price, // Since it's a single product, total is its price
        products: [{
          name: product.ProductName,
          quantity: 1, // Single quantity for Buy Now
        }],
      };
  
      // Store current payment data in sessionStorage
      sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
  
      // Add the payment data to admin's payment dashboard
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push(paymentData);
      localStorage.setItem('payments', JSON.stringify(payments));
  
      // Navigate to the payment page
      this.router.navigate(['/payment']);
    } else {
      this.toastr.warning(`${product.ProductName} 'is out of stock!, Out of Stock`);
    }
  }


}
