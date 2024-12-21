import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../product.model';

@Component({
  selector: 'app-admin-payment',
  standalone: false,
  
  templateUrl: './admin-payment.component.html',
  styleUrl: './admin-payment.component.css'
})
export class AdminPaymentComponent implements OnInit {
  paymentRecords: any[] = [];
  userEmail: string = '';


  ngOnInit(): void {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    this.paymentRecords = payments;
    this.userEmail = sessionStorage.getItem('email');

  }
}