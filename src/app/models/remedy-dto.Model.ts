// CreateRemedyDTO: Used to create a new remedy
export class CreateRemedyDTO {
    RemedyName: string;          // The name of the remedy
    Remediesimg: File | null;    // The image file for the remedy (optional)
    Description: string;        // Description of the remedy
    Benefits: string;           // Benefits of the remedy
    PreparationMethod: string;  // Preparation method for the remedy
    UsageInstructions: string;  // Instructions for using the remedy
    CategoryId: number;         // The category ID for the remedy
  }
  
  // UpdateRemedyDTO: Used to update an existing remedy
  export class UpdateRemedyDTO {
    RemedyId: number;           // The ID of the remedy
    RemedyName: string;         // The name of the remedy
    Remediesimg: File | null;   // The image file for the remedy (optional)
    Description: string;        // Description of the remedy
    Benefits: string;           // Benefits of the remedy
    PreparationMethod: string;  // Preparation method for the remedy
    UsageInstructions: string;  // Instructions for using the remedy
    CategoryId: number;         // The category ID for the remedy
  }
  
  // ReadRemedyDTO: Used to represent a remedy when fetching from the API
  export class ReadRemedyDTO {
    RemedyId: number;          // The ID of the remedy
    RemedyName: string;        // The name of the remedy
    Remediesimg: File | null; // The image file (can be base64 string or URL)
    Description: string;       // Description of the remedy
    Benefits: string;          // Benefits of the remedy
    PreparationMethod: string; // Preparation method for the remedy
    UsageInstructions: string; // Instructions for using the remedy
    CategoryId: number;        // The category ID for the remedy
  }
  
  // DeleteRemedyDTO: Used to represent the remedy ID for deletion
  export class DeleteRemedyDTO {
    RemedyId: number;          // The ID of the remedy to be deleted
  }
  