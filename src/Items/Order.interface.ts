enum estado {
  "pendienteDeProcesamiento",
  "procesando",
  "creado",
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