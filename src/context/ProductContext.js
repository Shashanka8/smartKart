import { createContext } from "react";

const ProductContext = createContext({
  products: [],
  addProduct: (product) => {},
  updateProduct: (product) => {},
  deleteProduct: (id) => {},
});

export default ProductContext;
