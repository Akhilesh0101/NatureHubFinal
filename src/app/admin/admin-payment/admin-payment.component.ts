import { Component, OnInit } from '@angular/core';
import { UserService } from '../../admin-services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  imports:[CommonModule],
  styleUrls: ['./admin-payment.component.css']
})

export class AdminPaymentComponent implements OnInit {
  paymentRecords: any[] = [];
  userEmail: string = '';


  ngOnInit(): void {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    this.paymentRecords = payments;
    this.userEmail = localStorage.getItem('email');

  }
}