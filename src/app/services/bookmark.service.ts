import { Injectable } from '@angular/core';
import { ToastrServiceWrapper } from '../toastr.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private bookmarkKey = 'bookmarkedCards';

  constructor(private toastr: ToastrServiceWrapper) { }

  // Get all bookmarked cards from session storage
  getBookmarks(): any[] {
    const bookmarks = sessionStorage.getItem(this.bookmarkKey);
    return bookmarks ? JSON.parse(bookmarks) : [];
  }

  // Add a bookmark to session storage
  addBookmark(card: { RemedyId: number, RemedyName: string, Remediesimg: string, Description: string, Benefits: string, PreperationMethod: string, UsageInstructions: string, CategoryId: number, createdBy: string, category: string }): void {
    const bookmarks = this.getBookmarks();
  
    // Check if the bookmark with the same RemedyId already exists
    const bookmarkExists = bookmarks.some(b => b.RemedyId === card.RemedyId);
  
    if (bookmarkExists) {
      // Show alert if the bookmark already exists
      this.toastr.warning('This bookmark has already been added.');
    } else {
      // Add the bookmark if it does not already exist
      bookmarks.push(card);
      sessionStorage.setItem(this.bookmarkKey, JSON.stringify(bookmarks));
      this.toastr.success('Bookmark added successfully!');
    }
  }

  // Remove a bookmark from the bookmarks list in session storage
  removeBookmark(card: { RemedyId: number, RemedyName: string, Remediesimg: string, Description: string, Benefits: string, PreperationMethod: string, UsageInstructions: string, CategoryId: number, createdBy: string, category: string }): void {
    let bookmarks = this.getBookmarks();
    // Filter the bookmarks array by RemedyId to remove the correct card
    bookmarks = bookmarks.filter(b => b.RemedyId !== card.RemedyId);
    sessionStorage.setItem(this.bookmarkKey, JSON.stringify(bookmarks));
    this.toastr.success('Bookmark removed successfully!');
  }
}
