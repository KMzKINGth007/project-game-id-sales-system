import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:8889/product/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="user-home">
      <h1>หน้าหลัก USER</h1>
      <div className="product-cart-container flex flex-wrap justify-start">
        {products.map((product) => (
          <div key={product.id} className="product-cart m-4 border rounded p-2">
            <img className="product-image w-full" src={product.imgUrl} alt={product.name} />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <p className="product-type">Type: {product.gameType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
