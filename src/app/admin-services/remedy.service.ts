import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRemedyDTO, DeleteRemedyDTO, ReadRemedyDTO, UpdateRemedyDTO } from '../models/remedy-dto.Model';

@Injectable({
  providedIn: 'root'
})
export class RemedyService {
  private apiUrl = 'https://localhost:44348/api/Remedies';  // Change this to your actual API URL

  constructor(private http: HttpClient) { }

  // Method to get all remedies
  getRemedies(): Observable<ReadRemedyDTO[]> {
    return this.http.get<ReadRemedyDTO[]>(this.apiUrl);
  }

  // Method to get a single remedy by ID
  getRemedyById(id: number): Observable<ReadRemedyDTO> {
    return this.http.get<ReadRemedyDTO>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new remedy
  addRemedy(createRemedyDTO: CreateRemedyDTO): Observable<ReadRemedyDTO> {
    const formData = new FormData();
    formData.append('RemedyName', createRemedyDTO.RemedyName); // Ensure correct naming convention
    formData.append('Description', createRemedyDTO.Description);
    formData.append('Benefits', createRemedyDTO.Benefits);
    formData.append('PreparationMethod', createRemedyDTO.PreparationMethod);
    formData.append('UsageInstructions', createRemedyDTO.UsageInstructions);
    formData.append('CategoryId', createRemedyDTO.CategoryId.toString());
    formData.append('File', createRemedyDTO.Remediesimg); 
   

    return this.http.post<ReadRemedyDTO>(this.apiUrl, formData);
  }

  // Method to update an existing remedy
  updateRemedy(updateRemedyDTO: UpdateRemedyDTO): Observable<ReadRemedyDTO> {
    const formData = new FormData();
    formData.append('RemedyName', updateRemedyDTO.RemedyName); // Ensure correct naming convention
    formData.append('Description', updateRemedyDTO.Description);
    formData.append('Benefits', updateRemedyDTO.Benefits);
    formData.append('PreparationMethod', updateRemedyDTO.PreparationMethod);
    formData.append('UsageInstructions', updateRemedyDTO.UsageInstructions);
    formData.append('CategoryId', updateRemedyDTO.CategoryId.toString());

    // If a new image is provided, append it
    if (updateRemedyDTO.Remediesimg) {
      formData.append('File', updateRemedyDTO.Remediesimg); // Append new image correctly
    }

    return this.http.put<ReadRemedyDTO>(`${this.apiUrl}/${updateRemedyDTO.RemedyId}`, formData);
  }

  // Method to delete a remedy
  deleteRemedy(remedyId: number): Observable<DeleteRemedyDTO> {
    return this.http.delete<DeleteRemedyDTO>(`${this.apiUrl}/${remedyId}`);
  }
}
