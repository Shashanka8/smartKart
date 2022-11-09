import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ProductItem from "./ProductItem";

function Products() {
  const navigate = useNavigate();
  const productCtx = useContext(ProductContext);

  console.log(productCtx.products);

  return (
    <>
      <div className="flex justify-between mb-10">
        <span className="text-4xl">Products</span>
        <span>
          <button
            className="btn"
            onClick={() => {
              navigate("/addProduct");
            }}
          >
            Add Product
          </button>
        </span>
      </div>
      <div className="flex justify-between items-start flex-wrap">
        {productCtx.products?.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default Products;
