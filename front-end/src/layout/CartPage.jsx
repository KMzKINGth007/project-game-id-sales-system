import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8889/cart/getCart", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8889/cart/deleteCart/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cart-page">
      <h1>ตะกร้าสินค้า</h1>
      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="w-[100px] h-[100px]">
                <img src={`http://localhost:8889/${item.product.imageUrl}`} alt={item.product.name} className="w-[80px]" />
              </div>
              <div className="item-details">
                <h2>{item.product.name}</h2>
              </div>
              <div>
                <p>ราคา: {item.product.price} บาท</p>
              </div>
              <div>
                <p>จำนวน: {item.quantity}</p>
              </div>
              <div>
                <button onClick={() => removeCart(item.id)}>ลบ</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
