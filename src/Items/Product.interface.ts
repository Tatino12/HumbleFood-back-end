import { type } from "os";
import internal from "stream";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  categoriesId: string[];
  categories: string[];
  shopId: string;
}

export interface Products {
  [key: number]: Product;
}


export type ProductOptions = {
  id?: string
  name?: string,
  categoriesId?: string
}

export type Producto = {
  name: string,
  image: string,
  description: string,
  price: number,
  discount: number,
  stock: number,
  categoriesId: string[];
}


