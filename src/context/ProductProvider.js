import { useEffect, useReducer } from "react";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  STORE_PRODUCTS,
  UPDATE_PRODUCT,
} from "./action.types";

import ProductContext from "./ProductContext";

const productReducer = (state, action) => {
  switch (action.type) {
    case STORE_PRODUCTS:
      return [...action.products];

    case ADD_PRODUCT:
      return [...state, action.product];

    case UPDATE_PRODUCT:
      const existingProductIndex = state.findIndex(
        (item) => item.id === parseInt(action.product.id)
      );
      console.log(action);
      const existingProduct = state[existingProductIndex];
      let updatedProducts;
      const updatedProduct = {
        ...existingProduct,
        ...action.product,
      };
      updatedProducts = [...state];
      updatedProducts[existingProductIndex] = updatedProduct;
      return updatedProducts;

    case DELETE_PRODUCT:
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

const ProductProvider = (props) => {
  const [products, dispatchProductAction] = useReducer(productReducer, []);

  useEffect(() => {
    async function fetchData() {
      await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          dispatchProductAction({
            type: STORE_PRODUCTS,
            products: data?.products,
          });
        });
    }
    fetchData();
  }, []);

  const addProductHandler = (product) => {
    dispatchProductAction({ type: ADD_PRODUCT, product: product });
  };

  const updateProductHandler = (product) => {
    dispatchProductAction({ type: UPDATE_PRODUCT, product: product });
  };

  const deleteProductHandler = (id) => {
    dispatchProductAction({ type: DELETE_PRODUCT, id: id });
  };

  const productContext = {
    products: products,
    addProduct: addProductHandler,
    updateProduct: updateProductHandler,
    deleteProduct: deleteProductHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
