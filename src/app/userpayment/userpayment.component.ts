import { Component } from '@angular/core';

@Component({
  selector: 'app-userpayment',
  standalone: false,
  
  templateUrl: './userpayment.component.html',
  styleUrl: './userpayment.component.css'
})
export class UserpaymentComponent {

  userEmail: string = '';
  products: { name: string; quantity: number }[] = [];
  cartTotal: number = 0;

  ngOnInit(): void {
    const paymentData = sessionStorage.getItem('paymentData');
    if (paymentData) {
      const parsedData = JSON.parse(paymentData);
      this.cartTotal = parsedData.cartTotal;
      this.products = parsedData.products;
      this.userEmail = sessionStorage.getItem('email');
    
    }
  }

}
