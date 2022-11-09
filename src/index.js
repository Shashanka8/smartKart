import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductProvider from "./context/ProductProvider";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </ProductProvider>
  </React.StrictMode>
);
