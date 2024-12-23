import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NatureNew';
  showNav: boolean = true;
  excludedRoutes: string[] = ['/login','/dashboard', '/admin-product-form','/admin-product-form?id=30','/admin-remedies-form','/admin-health-tip-form','/signup','/admin-panel','/admin-pay','/admin-user-details','/admin-profile','/admin-product','admin-product-form','/admin-remedies','admin-remedies-form','/admin-management','/admin-health-tips','admin-health-tip-form', '/admin-user-management', '/successpay','/userlogin']; // Add paths where you don't want nav

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is in the excluded list
        this.showNav = !this.excludedRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}
