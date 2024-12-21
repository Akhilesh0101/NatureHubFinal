import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import the JwtHelperService
import { UserService } from './services/user.service';
import { AutharizeService } from './services/autharize.service';

@Injectable({
  providedIn: 'root' // Makes the AuthGuard globally available
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AutharizeService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const token = sessionStorage.getItem('authToken');
    
    // Check if the user is authenticated
    if (!token) {
      this.router.navigate(['/userlogin']);
      return false; // Deny access if not authenticated
    }

    // Optionally, check user role based on route data
    const expectedRole = route.data['role'];
    const currentRole = this.authService.getRole();

    if (expectedRole && currentRole !== expectedRole) {
      this.router.navigate(['/unauthorized']);  // Redirect to unauthorized page if role doesn't match
      return false;
    }

    return true; // Allow access if authenticated and role matches (if required)
  }
}
  // constructor(private router: Router, private userService: UserService) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   // Check if the user is authenticated (using UserService)
  //   const currentUser = this.userService.getUser();  // Get the current logged-in user

  //   // If user is authenticated, allow access to the route
  //   if (currentUser && currentUser.email) {
  //     return true;
  //   }

  //   // If not authenticated, redirect to the login page and return false
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Optionally store the return URL
  //   return false;
  // }
  

