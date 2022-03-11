export enum estado {
  "pendienteDeProcesamiento",
  "creado",
  "procesando",
  "enviando",
  "completado",
  "cancelado",
}
export type Order = {
  state:         estado;
  shopId:        string;
  productsId:    string[];
  cartId:        string;
  total:         number;
}


export type ProductOrderType = {
  id?:         string
  productId?:  string
  ordenId?:    string
  cantidad?:   number
};
