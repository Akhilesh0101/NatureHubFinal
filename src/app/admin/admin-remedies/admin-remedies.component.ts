import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReadRemedyDTO } from '../../models/remedy-dto.Model';
import { RemedyService } from '../../admin-services/remedy.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-remedies',
  templateUrl: './admin-remedies.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./admin-remedies.component.css'],
})
export class AdminRemediesComponent implements OnInit {
  remedies: ReadRemedyDTO[] = []; // List to hold the remedies using ReadRemedyDTO

  constructor(
    private remedyService: RemedyService,
    private router: Router,
    private toastr: ToastrServiceWrapper
    
  ) {}

  ngOnInit(): void {
    this.loadRemedies(); // Load remedies when the component is initialized
  }

  // Method to load all remedies from the backend
  loadRemedies(): void {
    this.remedyService.getRemedies().subscribe(
      (data: ReadRemedyDTO[]) => {
        console.log(data); // Log the fetched data
        this.remedies = data; // Assign the fetched remedies to the local remedies array
      },
      (error) => {
        console.error('Error fetching remedies:', error); // Handle error
      }
    );
  }

  // Method to navigate to the remedy creation form
  onAddRemedy(): void {
    console.log('Navigating to remedy form...');
    this.router.navigate(['/admin-remedies-form']);
  }

  // Method to navigate to the remedy form for editing a remedy
  onEditRemedy(remedy: ReadRemedyDTO): void {
    this.router.navigate(['/admin-remedies-form'], {
      queryParams: { id: remedy.RemedyId }, // Pass remedy ID as a query parameter for editing
    });
  }

  // Method to handle remedy deletion
  onDeleteRemedy(remedyId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this remedy?');
    if (confirmDelete) {
      this.remedyService.deleteRemedy(remedyId).subscribe(
        () => {
          // Remove the deleted remedy from the list
          this.remedies = this.remedies.filter((r) => r.RemedyId !== remedyId);
          this.toastr.success('Remedy deleted successfully');
        },
        (error) => {
          console.error('Error deleting remedy:', error); // Handle error during deletion
        }
      );
    }
  }
}
