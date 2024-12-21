import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  activeTab: string = ''; // Tracks the active tab

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
