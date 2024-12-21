import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateHealthTipDTO, ReadHealthTipDTO, UpdateHealthTipDTO } from '../../models/health-tips-dto.Model';
import { HealthTipsService } from '../../admin-services/health-tips.service';
import { ToastrServiceWrapper } from '../../toastr.service';

@Component({
  selector: 'app-admin-health-tip-form',
  templateUrl: './admin-health-tip-form.component.html',
  styleUrls: ['./admin-health-tip-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AdminHealthTipFormComponent implements OnInit {
  healthTip: CreateHealthTipDTO | UpdateHealthTipDTO = {
    TipTitle: '',
    TipDescription: '',
    CategoryId: 0,
    HealthTipsimg: null,
  };

  isEditMode: boolean = false;
  healthTipId: number | null = null;
  showCategoryInfo: boolean = false;
  // Error messages for validation
  errorMessages: { [key: string]: string } = {
    TipTitle: '',
    TipDescription: '',
    CategoryId: '',
  };
  constructor(
    private healthTipsService: HealthTipsService,
    private router: Router,
    private route: ActivatedRoute,
        private toastr: ToastrServiceWrapper,
        
  ) {}

  ngOnInit(): void {
    // Check if we're in edit mode and load health tip details if so
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.healthTipId = +params['id']; // Convert to number
        this.isEditMode = true;
        this.loadHealthTip(this.healthTipId); // Load health tip details for editing
      }
    });
  }

  // Load health tip details for editing
  loadHealthTip(id: number): void {
    this.healthTipsService.getHealthTip(id).subscribe(
      (healthTip: ReadHealthTipDTO) => {
        // Map fetched health tip to the form healthTip object
        this.healthTip = {
          TipTitle: healthTip.TipTitle,
          TipDescription: healthTip.TipDescription,
          CategoryId: healthTip.CategoryId,
          HealthTipsimg: healthTip.HealthTipsimg, // If no image, set null
        };
      },
      (error) => {
        console.error('Error fetching health tip:', error);
      }
    );
  }

  // Handle form submission (for both adding and updating a health tip)
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }
    if (this.isEditMode && this.healthTipId !== null) {
      // Prepare the UpdateHealthTipDTO
      const updateHealthTipDTO: UpdateHealthTipDTO = {
        TipId: this.healthTipId,
        TipTitle: this.healthTip.TipTitle,
        TipDescription: this.healthTip.TipDescription,
        CategoryId: this.healthTip.CategoryId,
        HealthTipsimg: this.healthTip.HealthTipsimg, // For image handling in update
      };

      // Call update service method
      this.healthTipsService.updateHealthTip(updateHealthTipDTO).subscribe(
        (response) => {
          this.toastr.success('Health tip updated successfully:', 'Success');
          this.router.navigate(['/admin-health-tips']); // Navigate back to the health tips list
        },
        (error) => {
          console.error('Error updating health tip:', error);
        }
      );
    } else {
      // Prepare CreateHealthTipDTO for a new health tip
      const createHealthTipDTO: CreateHealthTipDTO = {
        TipTitle: this.healthTip.TipTitle,
        TipDescription: this.healthTip.TipDescription,
        CategoryId: this.healthTip.CategoryId,
        HealthTipsimg: this.healthTip.HealthTipsimg, // Health tip image is optional
      };

      // Call add service method
      this.healthTipsService.addHealthTip(createHealthTipDTO).subscribe(
        (response: ReadHealthTipDTO) => {
          this.toastr.success('Health tip addedd successfully:', 'Success');
          this.router.navigate(['/admin-health-tips']); // Navigate back to the health tips list
        },
        (error) => {
          console.error('Error adding health tip:', error);
        }
      );
    }
  }

  // Handle file input changes (for health tip image)
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.healthTip.HealthTipsimg = file; // Set the selected image file to healthTip
    }
  }
  // Validate form inputs
  validateForm(): boolean {
    let isValid = true;

    // Reset error messages
    this.errorMessages = {
      TipTitle: '',
      TipDescription: '',
      CategoryId: '',
    };
    if (!(this.healthTip as CreateHealthTipDTO).TipTitle) {
      this.errorMessages['TipTitle'] = 'Title is required.';
      isValid = false;
    }

    if (!(this.healthTip as CreateHealthTipDTO).TipDescription) {
      this.errorMessages['TipDescription'] = 'Description is required.';
      isValid = false;
    }

    if (
      !(this.healthTip as CreateHealthTipDTO).CategoryId ||
      (this.healthTip as CreateHealthTipDTO).CategoryId < 1 ||
      (this.healthTip as CreateHealthTipDTO).CategoryId > 5
    ) {
      this.errorMessages['CategoryId']= 'Category must be between 1 and 5.';
      isValid = false;
    }

    return isValid;
  }

}
