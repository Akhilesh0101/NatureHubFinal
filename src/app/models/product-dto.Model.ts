export class CreateProductDTO {
    ProductName: string;       // The name of the product
    ProductImage: File|null;        // The image file for the product
    Price: number;             // The price of the product
    Description: string;       // Description of the product
    StockQuantity: number;     // The quantity in stock
    CategoryId: number;       // The category ID for the product
  }
  
  export class UpdateProductDTO {
    ProductId: number;        // The ID of the product
    ProductName: string;      // The name of the product
    ProductImage: File | null; // The image file for the product (optional)
    Price: number;            // The price of the product
    Description: string;      // Description of the product
    StockQuantity: number;    // The quantity in stock
    CategoryId: number;      // The category ID for the product
  }
  
  export class ReadProductDTO {
    ProductId: number;        // The ID of the product
    ProductName: string;      // The name of the product
    ProductImage: File | null; // The image file (can be base64 or null)
    Price: number;            // The price of the product
    Description: string;      // Description of the product
    StockQuantity: number;    // The quantity in stock
    CategoryId: number;      // The category ID for the product
  }
  
  export class DeleteProductDTO {
    ProductId: number;        // The ID of the product to be deleted
  }
  