import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRemedyDTO, ReadRemedyDTO, UpdateRemedyDTO } from '../../models/remedy-dto.Model';
import { RemedyService } from '../../admin-services/remedy.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-remedy-form',
imports:[FormsModule,CommonModule],
  
  templateUrl: './admin-remedy-form.component.html',

  styleUrl: './admin-remedy-form.component.css'
})
export class AdminRemedyFormComponent {
 remedy: CreateRemedyDTO | UpdateRemedyDTO = {
    RemedyName: '',
    Description: '',
    Benefits: '',
    PreparationMethod: '',
    UsageInstructions: '',
    CategoryId: 0,
    Remediesimg: null,  // Store the image (base64 string)
  };

  isEditMode: boolean = false;
  remedyId: number | null = null;
  showCategoryInfo: boolean = false;

  constructor(
    private remedyService: RemedyService,
    private router: Router,
    private route: ActivatedRoute,
      private toastr: ToastrServiceWrapper
  ) {}
 
  
  ngOnInit(): void {
    // Check if we're in edit mode and load remedy details if so
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.remedyId = +params['id']; // Convert to number
        this.isEditMode = true;
        this.loadRemedy(this.remedyId); // Load remedy details for editing
      }
    });
  }

  // Load remedy details for editing
  loadRemedy(id: number): void {
    this.remedyService.getRemedyById(id).subscribe(
      (remedy: ReadRemedyDTO) => {
        // Map fetched remedy to the form remedy object
        this.remedy = {
          RemedyName: remedy.RemedyName,
          Description: remedy.Description,
          Benefits: remedy.Benefits,
          PreparationMethod: remedy.PreparationMethod,
          UsageInstructions: remedy.UsageInstructions,
          CategoryId: remedy.CategoryId,
          Remediesimg: remedy.Remediesimg, // If no image, set null
        };
      },
      (error) => {
        console.error('Error fetching remedy:', error);
      }
    );
  }

  // Handle form submission (for both adding and updating a remedy)
  onSubmit(): void {
    if (this.isEditMode && this.remedyId !== null) {
      // Prepare the UpdateRemedyDTO
      const updateRemedyDTO: UpdateRemedyDTO = {
        RemedyId: this.remedyId,
        RemedyName: this.remedy.RemedyName,
        Description: this.remedy.Description,
        Benefits: this.remedy.Benefits,
        PreparationMethod: this.remedy.PreparationMethod,
        UsageInstructions: this.remedy.UsageInstructions,
        CategoryId: this.remedy.CategoryId,
        Remediesimg: this.remedy.Remediesimg, // For image handling in update
      };

      // Call update service method
      this.remedyService.updateRemedy(updateRemedyDTO).subscribe(
        (response) => {
          this.toastr.success('Remedy updated successfully:');
          this.router.navigate(['/admin-remedies']); // Navigate back to the remedy list
        },
        (error) => {
          console.error('Error updating remedy:', error);
        }
      );
    } else {
      // Prepare CreateRemedyDTO for a new remedy
      const createRemedyDTO: CreateRemedyDTO = {
        RemedyName: this.remedy.RemedyName,
        Remediesimg: this.remedy.Remediesimg, // Remedy image must be provided
        Description: this.remedy.Description,
        Benefits: this.remedy.Benefits,
        PreparationMethod: this.remedy.PreparationMethod,
        UsageInstructions: this.remedy.UsageInstructions,
        CategoryId: this.remedy.CategoryId,
      };

      // Call add service method
      this.remedyService.addRemedy(createRemedyDTO).subscribe(
        (response: ReadRemedyDTO) => {
          this.toastr.success('Remedy added successfully:');
          this.router.navigate(['/admin-remedies']); // Navigate back to the remedy list
        },
        (error) => {
          console.error('Error adding remedy:', error);
        }
      );
    }
  }

  // Handle file input changes (for remedy image)
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
     
        this.remedy.Remediesimg  =file // Set the selected image (base64 string) to remedy
      
    }
  }
}
