import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];  // Specify the type for cart items
  cartTotal: number = 0;
  
  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();  // Initialize cart on component load
  }

  // Method to load cart items and total
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.getCartTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);  // Call removeItem method from CartService
    this.loadCart();  // Reload cart after removing an item
  }
  
  updateQuantity(productId: number, change: number) {
    const product = this.cartItems.find(item => item.product.ProductId === productId);
    if (product) {
      const newQuantity = product.quantity + change;
      if (newQuantity >= 1) {
        this.cartService.updateQuantity(productId, newQuantity); // Update quantity in cart service
        this.loadCart();  // Reload cart items and total after update
      }
    }
  }
  
  

  // Navigate to the payment page
 
  proceedToPayment() {
    const paymentData = {
      cartTotal: this.cartTotal,
      products: this.cartItems.map(item => ({
        name: item.product.ProductName,
        userEmail: localStorage.getItem('email') ,
        quantity: item.quantity,
      })),
    };
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(paymentData);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    this.router.navigate(['/payment']);
  }
  
  // Clear all items in the cart
  clearCart() {
    this.cartService.clearCart();  // Call the clearCart method from CartService
    this.loadCart();  // Reload cart after clearing
  }
}
