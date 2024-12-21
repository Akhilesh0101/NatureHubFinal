import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44348/api/Users';  // Your user-related API endpoint

  constructor(private http: HttpClient) {}

  // Check if user exists by username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${username}`);
  }
  // Method to store user data in sessionStorage (or memory)
  storeUserData(user: User): void {
    sessionStorage.setItem('userId', user.userId.toString());
    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('userImage', user.userImage);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('password',user.password);
  }

  // Method to get user data from sessionStorage
  getStoredUserData(): User | null {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const userImage = sessionStorage.getItem('userImage');
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password')

    if (userId && username && userImage && email && password) {
      return {
        userId: parseInt(userId),
        username: username,
        userImage: userImage,
        email: email,
        password:password,
      };
    }
    return null;
  }

  // Method to clear stored user data from sessionStorage
  clearUserData(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userImage');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password')
  }
}