import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  // API URL for address-related operations
  private apiUrl = 'https://localhost:44348/api/Addresses';  // Make sure this matches your backend API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all saved addresses
  getSavedAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new address
  addAddress(address: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, address);
  }

  // Update an existing address
  updateAddress(address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${address.AddressId}`, address);  // Make sure the API expects 'AddressId'
  }

  // Remove an address by ID
  removeAddress(AddressId: number): Observable<any> {
    // Make sure that the address object passed contains the correct field name 'AddressId'
    return this.http.delete<any>(`${this.apiUrl}/${AddressId}`);  // Fix AddressId here if needed
  }
}
