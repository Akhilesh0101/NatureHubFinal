import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthTipsService {

  // Set the API endpoint URL for health tips
  private apiUrl = 'https://localhost:44348/api/HealthTips';  // Update the URL as needed

  constructor(private http: HttpClient) {}

  // Method to fetch health tips from the API
  getHealthTips(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Optional: Method to fetch health tips by category if needed
  getHealthTipsByCategory(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/category/${categoryId}`;  // Assuming the API supports category filtering
    return this.http.get<any>(url);
  }
}
