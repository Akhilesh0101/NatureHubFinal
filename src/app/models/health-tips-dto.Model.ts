export class CreateHealthTipDTO {
    TipTitle: string;            // The title of the health tip
  TipDescription: string;     // The description of the health tip (optional)
  CategoryId: number;         // The category ID for the health tip
  HealthTipsimg: File | null; // The image file for the health tip (optional)
}

// DTO for updating an existing health tip
export class UpdateHealthTipDTO {
  TipId: number;              // The ID of the health tip
  TipTitle: string;           // The title of the health tip
  TipDescription: string;    // The description of the health tip (optional)
  CategoryId: number;         // The category ID for the health tip
  HealthTipsimg: File | null; // The image file for the health tip (optional)
}

// DTO for reading/displaying a health tip (from the backend)
export class ReadHealthTipDTO {
  TipId: number;              // The ID of the health tip
  TipTitle: string;           // The title of the health tip
  TipDescription: string;    // The description of the health tip (optional)
  CategoryId: number;         // The category ID for the health tip
  HealthTipsimg: File | null; // The image of the health tip (could be a URL or base64 string)
}

// DTO for deleting a health tip
export class DeleteHealthTipDTO {
  TipId: number;    
}
