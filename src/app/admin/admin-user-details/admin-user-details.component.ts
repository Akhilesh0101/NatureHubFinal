import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../admin-services/user.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  imports:[CommonModule],
  styleUrls: ['./admin-user-details.component.css'],
})
export class AdminUserDetailsComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private toastr: ToastrServiceWrapper) {}

  ngOnInit(): void {
    // Fetch users when the component is initialized
    this.loadUsers();
  }

  // Method to load users from the backend
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(data)
       
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Handle user deletion
  onDeleteUser(userId: number): void {
  
    
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          // Remove the user from the list after successful deletion
          this.users = this.users.filter((user) => user.UserId !== userId);
          this.toastr.success("User Deleted")
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  
}