import { Component, OnInit } from '@angular/core';
import { HealthTipsService } from '../admin-services/health-tips.service';
import { ReadHealthTipDTO } from '../models/health-tips-dto.Model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helthtips',
  templateUrl: './helthtips.component.html',
  imports:[CommonModule],
  styleUrls: ['./helthtips.component.css']
})
export class HelthtipsComponent implements OnInit {
  title = 'Health Tips';
  healthTips: ReadHealthTipDTO[] = []; // Array to hold health tips
  filteredHealthTips: ReadHealthTipDTO[] = []; // Array to hold filtered health tips

  constructor(private healthTipsService: HealthTipsService) { }

  ngOnInit(): void {
    // Fetch health tips when the component initializes
    this.getHealthTips();
  }

  // Method to fetch health tips from the API
  getHealthTips(): void {
    this.healthTipsService.getHealthTips().subscribe(
      (data: ReadHealthTipDTO[]) => {
        this.healthTips = data;
        this.filteredHealthTips = data; // Initially show all health tips
      },
      error => {
        console.error('Error fetching health tips:', error);
      }
    );
  }

  // Filter health tips by category
  filterByCategory(categoryId: number): void {
    if (categoryId === 0) {
      this.filteredHealthTips = this.healthTips; // Show all tips if category is 0
    } else {
      this.filteredHealthTips = this.healthTips.filter(tip => tip.CategoryId === categoryId);
    }
  }
}
