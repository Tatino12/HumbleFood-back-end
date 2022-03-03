export interface Product {
  id: String;
  name: String;
  description: String;
  price: Number;
  discount: String;
  stock: Number;
  categoriesId: String[];
  shopId: String[];
  orderId: String[];
}
