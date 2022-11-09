import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ProductItem from "./ProductItem";

function Products() {
  const navigate = useNavigate();
  const productCtx = useContext(ProductContext);

  return (
    <div className="mt-16">
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
      <div
        className={`${
          productCtx.products.length === 0 ? "flex" : "hidden"
        } justify-center items-center`}
      >
        {productCtx.products.length === 0 && (
          <progress className="progress w-56"></progress>
        )}
      </div>
      <div className="flex justify-between items-start flex-wrap">
        {productCtx.products?.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Products;
