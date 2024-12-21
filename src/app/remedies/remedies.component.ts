import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { RemedyService } from '../admin-services/remedy.service';

@Component({
  selector: 'app-remedies',
  standalone: false,
  templateUrl: './remedies.component.html',
  styleUrls: ['./remedies.component.css']
})
export class RemediesComponent implements OnInit {
  cards: any[] = [];  // Define an empty array for storing remedies

  constructor(
    private remedyService: RemedyService, // Inject the RemedyService
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    // Fetch remedies when the component initializes
    this.remedyService.getRemedies().subscribe(
      (data) => {
        this.cards = data;  // Set the fetched data to cards
      },
      (error) => {
        console.error('Error fetching remedies:', error); // Handle errors
      }
    );
  }

  // Save card to bookmarks
  bookmarkCard(
    card: { RemedyId: number, RemedyName: string, Remediesimg: string, Description: string, Benefits: string, PreperationMethod: string, UsageInstructions: string, CategoryId: number, createdBy: string, category: string  }): void {
    this.bookmarkService.addBookmark(card);
    
  }
}
