import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorNotificationService } from '../services/error-notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorNotificationService: ErrorNotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Handle backend errors (400, 401, 500, etc.)
          switch (error.status) {
            case 400:
              errorMessage = `Bad Request: ${error.error.message || 'Invalid data provided.'}`;
              break;
            case 401:
              errorMessage = `Unauthorized: ${error.error.message || 'Invalid credentials.'}`;
              break;
            case 500:
              errorMessage = `Server error: ${error.error.message || 'Something went wrong on the server.'}`;
              break;
            default:
              errorMessage = `Error: ${error.status} - ${error.message}`;
              break;
          }
        }

        // Send the error message to the notification service
        this.errorNotificationService.showError(errorMessage);
        throw error;
      })
    );
  }
}
