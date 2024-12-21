import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For using common directives like ngIf, ngFor
import { Router } from '@angular/router'; // Router for navigation
import { FormsModule } from '@angular/forms';
import { ReadHealthTipDTO } from '../../models/health-tips-dto.Model';
import { HealthTipsService } from '../../admin-services/health-tips.service';

@Component({
  selector: 'app-admin-health-tips',
  templateUrl: './admin-health-tips.component.html',
  styleUrls: ['./admin-health-tips.component.css'],
  imports:[FormsModule,CommonModule],
})
export class AdminHealthTipsComponent implements OnInit {
  healthTips: ReadHealthTipDTO[] = [];  // Array to hold fetched health tips

  constructor(
    private healthTipsService: HealthTipsService,  // Inject health tip service
    private router: Router  // Inject router for navigation
  ) { }

  ngOnInit(): void {
    this.loadHealthTips();  // Load health tips on component initialization
  }

  // Method to load health tips from the backend
  loadHealthTips(): void {
    this.healthTipsService.getHealthTips().subscribe(
      (data: ReadHealthTipDTO[]) => {
        this.healthTips = data;  // Assign fetched data to the healthTips array
        console.log('Fetched health tips:', data);  // Log data for debugging
      },
      (error) => {
        console.error('Error fetching health tips:', error);  // Handle error
      }
    );
  }

  // Add a new health tip
  onAddHealthTip(): void {
    this.router.navigate(['/admin-health-tip-form']);  // Navigate to a form to add new health tip
    
  }

  // Edit an existing health tip
  onEditHealthTip(healthTip: ReadHealthTipDTO): void {
    this.router.navigate(['/admin-health-tip-form'], {
      queryParams: { id: healthTip.TipId }  // Pass the TipId for editing the selected health tip
    });
  }

  // Delete a health tip
  onDeleteHealthTip(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this health tip?');
    if (confirmDelete) {
      this.healthTipsService.deleteHealthTip(id).subscribe(
        () => {
          this.healthTips = this.healthTips.filter((tip) => tip.TipId !== id);  // Remove deleted tip from the list
          console.log('Health tip deleted successfully');
        },
        (error) => {
          console.error('Error deleting health tip:', error);  // Handle error during deletion
        }
      );
    }
  }
}
