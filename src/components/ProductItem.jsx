import React from "react";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {
  const { title, thumbnail, description, price, rating, discountPercentage } =
    props;

  const navigate = useNavigate();

  const editProductHandler = () => {
    navigate("/addProduct", {
      state: props,
    });
  };

  return (
    <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl my-3">
      <figure className="relative">
        <span
          className="bg-gray-700 flex items-center justify-center h-10 w-10 rounded-full absolute top-2 right-2 cursor-pointer"
          onClick={editProductHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4"
            fill="white"
          >
            <path d="M10.2 461L0 512l51-10.2L160 480 420.7 219.3l-128-128L32 352 10.2 461zM315.3 68.7l128 128 34.7-34.7L512 128l-16-16L478.1 94.1 417.9 33.9 400 16 384 0 350.1 33.9 315.3 68.7zM96 416h60.1l-19.8 19.8-75.1 15 15-75.1L96 355.9V416z" />
          </svg>
        </span>
        <img
          src={thumbnail}
          alt={description}
          className="bg-cover min-h-[240px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <span className="truncate w-52">{title}</span>
          <span className="bg-green-600 text-white text-sm px-1 rounded-sm ml-2 h-5">
            {parseFloat(rating || 0).toFixed(1)}{" "}
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star bg-green-500"
            />
          </span>
        </h2>
        <p>{description}</p>
        <p className="text-xl font-semibold">
          ${price}{" "}
          <span className="text-green-600 text-sm font-bold">
            {Math.floor(parseFloat(discountPercentage || 0))}% off
          </span>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
