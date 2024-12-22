import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  UserId: number;
  UserName: string;
  Email: string;
  CreatedDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:44348/api/Users'; // Replace with your API URL
  private userEmail: string = ''; // Variable to store email

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch and save email by user ID
  fetchAndSaveEmail(UserId: number): Observable<string> {
    return new Observable((observer) => {
      this.http.get<User>(`${this.apiUrl}/${UserId}`).subscribe({
        next: (user) => {
          this.userEmail = user.Email;
          observer.next(this.userEmail);
          observer.complete();
        },
        error: (err) => {
          console.error('Error fetching user email:', err);
          observer.error(err);
        },
      });
    });
  }

  // Retrieve stored email
  getEmail(): string {
    return this.userEmail;
  }

  // Delete a user
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
}
