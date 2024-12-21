import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {
  private errorMessageSource = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSource.asObservable();

  showError(message: string): void {
    this.errorMessageSource.next(message);
    setTimeout(() => this.clearError(), 5000);  // Clear the error after 5 seconds
  }

  clearError(): void {
    this.errorMessageSource.next(null);
  }
}
