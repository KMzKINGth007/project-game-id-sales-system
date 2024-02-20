import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:8889/product/addProducts');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div>
      <h1>หน้าหลัก USER</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}