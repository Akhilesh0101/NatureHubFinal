import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  processPayment(paymentDetails: any): boolean {
    console.log('Payment details:', paymentDetails);
    return true; // Simulate successful payment
  }
}
