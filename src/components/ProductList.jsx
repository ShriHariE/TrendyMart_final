import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4gVXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzU1MDUxNTE5LCJpc3MiOiJUcmVuZHlNYXJ0QVBJIiwiYXVkIjoiVHJlbmR5TWFydENsaWVudCJ9.vimQoremLfVuFn81FfJ0H0PtoNvIYt8PVssqNsofNoI"; 

    fetch("https://localhost:7024/api/Product/GetAllProducts", {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="product-container">
      <h1 className="title">Our Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.productId}>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="product-image"
            />
            <h2>{product.productName}</h2>
            <p>{product.description}</p>
            <span className="price">₹{product.price}</span>
            <p className="category">{product.categoryName}</p>
            <p className="seller">Sold by: {product.sellerName}</p>
            <p className={product.isActive ? "active" : "inactive"}>
              {product.isActive ? "Available" : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
