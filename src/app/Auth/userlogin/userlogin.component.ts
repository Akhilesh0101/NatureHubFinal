import { Component } from '@angular/core';
import { AutharizeService } from '../../services/autharize.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrServiceWrapper } from '../../toastr.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  constructor(private authService: AutharizeService, private router: Router,private toastr:ToastrServiceWrapper) {}
  validateInputs(): boolean {
    let isValid = true;

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/;
  if (!this.password || !passwordRegex.test(this.password)) {
    this.passwordError =
      'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter,1 special Character and 1 number.';
    this.toastr.error(this.passwordError, 'Error');
    isValid = false;
  } else {
    this.passwordError = '';
  }

  return isValid;
}
  login(): void {
    // Validate inputs before making the API call
    if (!this.validateInputs()) {
      return; // Stop submission if validation fails
    }
    this.authService.loginUser(this.username, this.email, this.password).subscribe(
      (response) => {
        this.authService.storeAuthData(response.token, 'user');
        sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('email', this.email);
      localStorage.setItem('email', this.email);

         Swal.fire({
                title: 'Success!',
                text: `${this.username} logged in successfully`,
                icon: 'success',
                confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']); // Redirect to home after user clicks "OK"
        }
      });
    },
      (error) => {
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
