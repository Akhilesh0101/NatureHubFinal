
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AutharizeService } from '../../services/autharize.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [CommonModule, ReactiveFormsModule,FormsModule ],
})
export class SignupComponent {
  signupForm: FormGroup;
  validationErrors: string[] = [];
  errorMessage:string='';
  constructor(private fb: FormBuilder, private authService: AutharizeService, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+[a-zA-Z ]{4,20}$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$")]],
      password: ['', [    Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$")]],

      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  

  signup(): void {
    this.validationErrors = [];

    if (this.signupForm.invalid) {
      this.validationErrors.push('Please fill in all fields correctly.');
      return;
    }

    const { userName, email, password } = this.signupForm.value;

    const formData = new FormData();
    formData.append('UserName', userName);
    formData.append('Email', email);
    formData.append('Password', password);
    

    this.authService.signupWithImage(formData).subscribe(
      (response) => {
        // console.log('Signup successful:', response);
        Swal.fire({
                               title: 'Success!',
                               text: 'Your credentials created successfully',
                               icon: 'success',
                               confirmButtonText: 'Login Now'
                     }).then((result) => {
                       if (result.isConfirmed) {
                         this.router.navigate(['/userlogin']); // Redirect to home after user clicks "OK"
                       }
                     });
                   },

      (error) => {
                if (error.error && error.error.message) {
                         this.errorMessage = error.error.message;
                       } else if (error.status === 400) {
                         this.errorMessage = 'Username or Email already exist. Please try again.';
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
                         this.errorMessage = 'An unexpected error occurred. Please try again.';
                         
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