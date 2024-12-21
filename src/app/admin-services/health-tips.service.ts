import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHealthTipDTO, ReadHealthTipDTO, UpdateHealthTipDTO, DeleteHealthTipDTO } from '../models/health-tips-dto.Model';

@Injectable({
  providedIn: 'root'
})
export class HealthTipsService {
  private apiUrl = 'https://localhost:44348/api/HealthTips';  // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  // Get all health tips
  getHealthTips(): Observable<ReadHealthTipDTO[]> {
    return this.http.get<ReadHealthTipDTO[]>(this.apiUrl);
  }

  // Get a specific health tip by ID
  getHealthTip(id: number): Observable<ReadHealthTipDTO> {
    return this.http.get<ReadHealthTipDTO>(`${this.apiUrl}/${id}`);
  }

  // Add a new health tip (including image handling)
  addHealthTip(createHealthTipDTO: CreateHealthTipDTO): Observable<ReadHealthTipDTO> {
    const formData = new FormData();
    formData.append('TipTitle', createHealthTipDTO.TipTitle);
    formData.append('TipDescription', createHealthTipDTO.TipDescription);
    formData.append('CategoryId', createHealthTipDTO.CategoryId.toString());
    formData.append('File', createHealthTipDTO.HealthTipsimg); // Append image file correctly


    return this.http.post<ReadHealthTipDTO>(this.apiUrl, formData);
  }

  // Update an existing health tip (including image handling)
  updateHealthTip(updateHealthTipDTO: UpdateHealthTipDTO): Observable<ReadHealthTipDTO> {
    const formData = new FormData();
    formData.append('TipTitle', updateHealthTipDTO.TipTitle);
    formData.append('TipDescription', updateHealthTipDTO.TipDescription);
    formData.append('CategoryId', updateHealthTipDTO.CategoryId.toString());

    // If a new health tip image is provided, append it
    if (updateHealthTipDTO.HealthTipsimg) {
      formData.append('File', updateHealthTipDTO.HealthTipsimg); // Append new image correctly
    }

    return this.http.put<ReadHealthTipDTO>(`${this.apiUrl}/${updateHealthTipDTO.TipId}`, formData);
  }

  // Delete a health tip
  deleteHealthTip(id: number): Observable<DeleteHealthTipDTO> {
    return this.http.delete<DeleteHealthTipDTO>(`${this.apiUrl}/${id}`);
  }
}
