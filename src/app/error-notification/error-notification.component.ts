import { Component, OnInit } from '@angular/core';
import { ErrorNotificationService } from '../services/error-notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  imports:[CommonModule],
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorNotificationService: ErrorNotificationService) {}

  ngOnInit(): void {
    this.errorNotificationService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }
}
