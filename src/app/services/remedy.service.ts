import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemedyService {

  // Set the API endpoint URL here
  private apiUrl = 'https://localhost:44348/api/Remedies';

  constructor(private http: HttpClient) {}

  // Method to fetch remedies from the API
  getRemedies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
