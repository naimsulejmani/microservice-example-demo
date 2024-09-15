export interface Order {
  id: string;
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  status: string;
}