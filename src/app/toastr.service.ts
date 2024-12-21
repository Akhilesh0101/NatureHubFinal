import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrServiceWrapper{

  constructor(private toastr: ToastrService) {}
 success(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      timeOut: 3000,            // Duration of the toast
      positionClass: 'toast-top-right', // Position on screen
      closeButton: true,        // Add a close button
      progressBar: true,       // Show progress bar
      toastClass: 'ngx-toast',  // Custom toast class
    });
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      toastClass: 'ngx-toast',
    });
  }

  info(message: string, title: string = 'Information') {
    this.toastr.info(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      toastClass: 'ngx-toast',
    });
  }

  warning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      toastClass: 'ngx-toast',
    });
  }
}