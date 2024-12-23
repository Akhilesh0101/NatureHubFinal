import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ToastrServiceWrapper } from '../toastr.service';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product; quantity: number }[] = [];

  constructor(private toastr: ToastrServiceWrapper, private productService: ProductService) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  // Add to cart logic (already exists)
   // Add to cart logic (already exists)
   addToCart(product: Product) {
    if (!product || !product.ProductId) {
      console.error('Invalid product:', product); // Log the invalid product
      return; // Exit if product is invalid
    }
  
    const existingProduct = this.cartItems.find(item => item.product.ProductId === product.ProductId);
    // If the product is already in the cart
    if (existingProduct) {
      if (product.StockQuantity>1) {
        existingProduct.quantity += 1; // Increment quantity
        this.toastr.success(`One more ${product.ProductName} is added to cart!!`)

      } else {
        this.toastr.warning(`Sorry, only ${product.StockQuantity} left in stock.`); // Notify about stock limit
        return;
      }
    } else {
      // Add product to cart only if stock is available
      if (product.StockQuantity > 0) {
        this.cartItems.push({ product, quantity: 1 });
        this.toastr.success(`${product.ProductName} is successfully added to cart!!`)

      } else {
        this.toastr.error('Out of stock!'); // Notify if out of stock
        return;
      }
    }
    product.StockQuantity -= 1;
    this.productService.updateProductStock(product.ProductId, product.StockQuantity).subscribe(
      () => {
        console.log(`Stock updated successfully for ${product.ProductName}`);
      },
      (error) => {
        console.error(`Failed to update stock for ${product.ProductName}:, error`);
      }
    );
    this.saveCart();
  }

  // Update quantity (+ or -) in the cart
  updateQuantity(productId: number, newQuantity: number) {
    const productInCart = this.cartItems.find(item => item.product.ProductId === productId);
  
    if (productInCart) {
      const availableStock = productInCart.product.StockQuantity + productInCart.quantity -1; // Include current cart quantity in available stock
  
      if (newQuantity > availableStock) {
        this.toastr.warning(`Can't update quantity, Only one left in stock`);
      } else if (newQuantity >= 1) {
        // Update stock quantity based on the difference
        const quantityChange = newQuantity - productInCart.quantity;
  
        productInCart.product.StockQuantity -= quantityChange; // Decrease or increase stock
        productInCart.quantity = newQuantity; // Update the cart quantity
  
        // Sync the updated stock with the backend
        this.productService.updateProductStock(productInCart.product.ProductId, productInCart.product.StockQuantity).subscribe(
          () => {
            console.log(`Stock updated successfully for ${productInCart.product.ProductName}`);
          },
          (error) => {
            console.error(`Failed to update stock for ${productInCart.product.ProductName}:`, error);
          }
        );
  
        this.saveCart(); // Save the updated cart
      }
    }
  }
  

  // Remove item and update stock
  removeItem(productId: number) {
    const productIndex = this.cartItems.findIndex(item => item.product.ProductId === productId);
    if (productIndex !== -1) {
      const removedItem = this.cartItems[productIndex];
      this.cartItems.splice(productIndex, 1);  // Remove the item from cart

      // Update stock quantity in the backend or local state
      const product = removedItem.product;
      product.StockQuantity += removedItem.quantity; // Restore the stock
      this.productService.updateProductStock(product.ProductId, product.StockQuantity).subscribe(
        () => {
          console.log(`Stock restored successfully for ${product.ProductName}`);
        },
        (error) => {
          console.error(`Failed to restore stock for ${product.ProductName}:`, error);
        }
      );
      this.saveCart();  // Save the updated cart to localStorage
    }
  }

  // Other methods like getCartItems, clearCart, etc.
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Save cart to localStorage
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + item.product.Price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
}
