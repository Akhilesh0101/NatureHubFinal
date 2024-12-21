import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: false,
  
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Output() closePopup = new EventEmitter<void>();  // Event emitter to close the popup
  @Output() remindLater = new EventEmitter<void>();  // Event emitter for "Remind Me Later"

  showPopup: boolean = true;  // Flag to control the visibility of the popup

  constructor(private router: Router) {}

  // Close the popup
  onClose() {
    this.closePopup.emit();
  }

  // Remind the user later by saving the time when they chose to be reminded
  remindMeLater() {
    const remindTime = new Date().getTime() + 20000; // Store the time 1 minute later (in milliseconds)
    localStorage.setItem('remindTime', remindTime.toString());
    this.remindLater.emit();  // Emit an event to close the popup
  }

  // Redirect to the login page when the user clicks 'Go to Login'
  redirectToLogin() {
    this.router.navigate(['signup']);
  }

  
}
