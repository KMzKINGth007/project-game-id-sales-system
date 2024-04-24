import axios from "axios";
import React, { useEffect, useState } from "react";
import AdsBar from "./adsBar";
import { Link } from 'react-router-dom';

export default function UserHome() {
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

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8889/cart/addProductToCard/${productId}`, {
        userId: localStorage.getItem('userId'),
        productId: productId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user-home min-h-screen">
      <h1>หน้าหลัก USER</h1>
      <AdsBar />
      <div className="w-full text-center"><p>สินค้าแนะนำ</p></div>
      <div className="justify-center product-cart-container flex flex-wrap ">
        {products.map(product => (
          <div key={product.id} className="product-cart m-4 border rounded p-2 min-h-[400px] min-w-[100px] max-h-[500px] max-w-[250px]">
            <Link to={`/product/${product.id}`}>
              <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[250px] h-[200px]" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description.length > 30 ? product.description.slice(0, 30) + '...' : product.description}</p>
              <p className="product-price">Price: {product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
            </Link>
            <div className="flex justify-end">
              <button className="btn btn-outline" onClick={() => addToCart(product.id)}>เพิ่มลงตะกร้า</button>
              <button className="btn btn-outline">ซื้อเลย!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
