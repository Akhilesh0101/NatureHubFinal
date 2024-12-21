import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { AutharizeService } from '../../services/autharize.service';
import { ToastrServiceWrapper } from '../../toastr.service';
@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  username: string | null = '';
  email: string | null = '';

  ngOnInit(): void {
    // Fetch user details from session storage
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email');
  }

}
