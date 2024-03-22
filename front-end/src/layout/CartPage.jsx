import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8889/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>ตะกร้าสินค้า</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.product.name}</h2>
            <p>ราคา: {item.product.price} THB</p>
            <p>จำนวน: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
