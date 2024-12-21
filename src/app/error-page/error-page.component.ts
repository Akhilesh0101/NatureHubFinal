import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  constructor(private router: Router) {}  // Inject the Router

  goHome() {
    this.router.navigate(['/']);  // Navigate to the home page
  }
}
