import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductContext from "../context/ProductContext";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const productCtx = useContext(ProductContext);

  useEffect(() => {
    if (location.state) {
      const {
        title,
        thumbnail,
        description,
        price,
        rating,
        discountPercentage,
        stock,
        brand,
        category,
      } = location.state;

      setTitle(title);
      setDescription(description);
      setPrice(price);
      setDiscountPercentage(discountPercentage);
      setRating(rating);
      setStock(stock);
      setBrand(brand);
      setCategory(category);
      setThumbnail(thumbnail);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !(
        title ||
        description ||
        price ||
        discountPercentage ||
        rating ||
        stock ||
        brand ||
        category ||
        thumbnail
      )
    ) {
      return toast.error("Invalid form");
    }

    if (location.state) {
      fetch(`https://dummyjson.com/products/${location.state.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          productCtx.updateProduct(data);
          toast.success("Product updated successfully");
          navigate("/");
        });
    } else {
      fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          productCtx.addProduct(data);
          toast.success("Product added successfully");
          navigate("/");
        });
    }
  };

  const deleteProductHandler = () => {
    fetch(`https://dummyjson.com/products/${location.state.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        productCtx.deleteProduct(data.id);
        toast.success("Product deleted successfully");
        navigate("/");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-center text-4xl mb-5">Add Product</h2>
        <form
          onSubmit={submitHandler}
          className="w-[400px] bg-slate-200 px-10 py-6 rounded shadow-xl"
        >
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Title</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Description</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Price</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Discount(%)</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Rating</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Stock</span>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Brand</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Category</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control mb-2">
            <label className="input-group">
              <span className="w-36">Thumbnail</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-secondary btn-sm">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-3 text-white">
          {location.state && (
            <button
              className="btn btn-error btn-sm"
              onClick={deleteProductHandler}
            >
              Delete Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
