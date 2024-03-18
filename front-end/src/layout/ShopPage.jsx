import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ShopPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProductData = async () => {
        try {
          const response = await axios.get('http://localhost:8889/product/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchProductData();
    }, []);
  
    return (
      <div className="user-home">

        <h1>หน้าสินค้าทั้งหมด</h1>
        <div className="justify-center product-cart-container flex flex-wrap justify-start">
          {products.map(product => (
            <div key={product.id} className="product-cart m-4 border rounded p-2 min-h-[400px] min-w-[100px] max-h-[500px] max-w-[250px]">
              <Link to={`/product/${product.id}`}>
                <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[250px] h-[200px]" />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: {product.price}</p>
                <p className="product-stock">Stock: {product.stock}</p>
              </Link>
            </div>
          ))}
  
        </div>
      </div>
    );
  }
  