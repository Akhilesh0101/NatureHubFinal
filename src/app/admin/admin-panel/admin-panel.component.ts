import { Component } from '@angular/core';
import { AutharizeService } from '../../services/autharize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(private authService: AutharizeService, private router: Router) {}

  // Sample data
  totalProduct = 40;
  totalRemedies = 40;
  totalHealthTips = 40;
  totalUsers = 5;
  totalAdmins = 1;

  // Event handlers for buttons

  onRemediesClick() {
    console.log('Navigating to Remedies page...');
  }

  onHealthTipsClick() {
    console.log('Navigating to Health Tips page...');
  }

  onUserDetailsClick() {
    console.log('Navigating to User Details page...');
  }

  onCreateAdminClick() {
    console.log('Navigating to Create Admin page...');
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to login page
  }
}
