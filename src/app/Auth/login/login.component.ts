import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../../interfaces/authenticated-response';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { AutharizeService } from '../../services/autharize.service';
import Swal from 'sweetalert2';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  email: string;
  password: string;
  errorMessage: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AutharizeService, private router: Router, private toastr:ToastrServiceWrapper) {}
  validateInputs(): boolean {
    let isValid = true;

    // Username Validation
    // Username Validation
    const usernameRegex = /^[a-zA-Z ]{4,20}$/; // Only letters and spaces, 4-20 characters
  if (!this.username || !usernameRegex.test(this.username)) {
    this.usernameError = 'Username must be 4-20 characters long and contain only alphabets';
    this.toastr.error(this.usernameError, 'Error');
    isValid = false;
  } else {
    this.usernameError = '';
  }
  
    // Email Validation
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address.';
      this.toastr.error('Please enter a valid email address.','Error')
      isValid = false;
    } else {
      this.emailError = '';
    }

    // Password Validation
    const passwordRegex = /^[a-zA-Z]+[a-zA-Z0-9]{8,}$/;
  if (!this.password || !passwordRegex.test(this.password)) {
    this.passwordError =
      'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
    this.toastr.error(this.passwordError, 'Error');
    isValid = false;
  } else {
    this.passwordError = '';
  }

  return isValid;
}
  onSubmit(): void {
    // Validate inputs before making the API call
    if (!this.validateInputs()) {
      return; // Stop submission if validation fails
    }
    this.authService.loginAdmin(this.username, this.email, this.password).subscribe(
      (response) => {
        // Store auth token and user role
        this.authService.storeAuthData(response.token, 'admin');
       Swal.fire({
                       title: 'Success!',
                       text: 'Admin Logged in successfully',
                       icon: 'success',
                       confirmButtonText: 'OK'
             }).then((result) => {
               if (result.isConfirmed) {
                 this.router.navigate(['/admin-panel']); // Redirect to home after user clicks "OK"
               }
             });
           },
      
      (error) => {
        // Extract a detailed error message if available
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid login credentials. Please try again.';
          Swal.fire({
                                   title: 'Error!',
                                   text: this.errorMessage,
                                   icon: 'error',
                                   confirmButtonText: 'Retry'
                                 });
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
          Swal.fire({
                                   title: 'Error!',
                                   text: this.errorMessage,
                                   icon: 'error',
                                   confirmButtonText: 'Retry'
                                 });
        } else {
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
        console.error('Error logging in:', error);
        Swal.fire({
          title: 'Error!',
          text: this.errorMessage,
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    );
  }
}