export class Product {
  ProductId: number;
  ProductName: string;
  ProductImage: string;
  Price: number;
  Description: string;
  StockQuantity: number;
  CategoryId: number;

  category: 'skin' | 'immunity' | 'digestion' | 'body' | 'hair';
  
}

