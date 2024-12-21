import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { AutharizeService } from '../services/autharize.service';
import { Product } from '../product.model';
import { ToastrServiceWrapper } from '../toastr.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  products: Product[] = [];
  bestSellers: Product[] = [];
  showPopup: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private authService: AutharizeService,
    private toastr: ToastrServiceWrapper
  ) {
    this.checkRemindTime();
  }

  logOut = () => {
    this.authService.logout();
  }

  checkRemindTime() {
    if (this.isLoggedIn) {
      this.showPopup = false;
      return;
    }

    const remindTime = sessionStorage.getItem('remindTime');
    if (remindTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= parseInt(remindTime)) {
        this.showPopup = true;
      }
    } else {
      this.showPopup = true;
    }
  }

  closePopup() {
    this.showPopup = false;
  }

  remindLater() {
    this.showPopup = false;
    const remindTime = new Date().getTime() + 20000;  // 20 seconds later for testing
    localStorage.setItem('remindTime', remindTime.toString());
  }

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(data);

        // Randomize and take the first 4 products as best sellers (or adjust the number as needed)
        this.bestSellers = this.getRandomProducts(this.products, 3);
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.toastr.error('Failed to load products', 'Error');
      }
    );

    AOS.init();
  }

  getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random()); // Randomize products
    return shuffled.slice(0, count);  // Take the first `count` products
  }

  addToCart(product: Product) {
    if (product && product.ProductId) {
      this.cartService.addToCart(product);
      this.toastr.success(`${product.ProductName} added to cart!`);
    } else {
      console.error('Invalid product:', product);
      this.toastr.error('Failed to add product to cart', 'Error');
    }
  }

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

  onButtonClick(product: Product) {
    if (this.isLoggedIn) {
      // If the user is logged in, add the product to the cart
      this.addToCart(product);
    } else {
      // If the user is not logged in, show a message prompting them to log in
      this.toastr.warning('Please log in to add products to the cart.', 'Login Required');
      // this.router.navigate(['/login']);
    }
 }
}
