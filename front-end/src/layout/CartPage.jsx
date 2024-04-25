import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);
  const navigate = useNavigate();



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
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8889/cart/updateCart/${id}`, {
        quantity: quantity
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const handlePayment = async () => {
    try {

      const paymentData = {
        paymentDate: new Date(),
        amount: selectedTotalPrice,
        status: "unpaid",
        cartId: selectedItems,
        paymentMethodId: 1
      };

      const response = await axios.post("http://localhost:8889/payment/createPayment", paymentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setSelectedItems([]);

      navigate(`/payment/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const updateSelectedTotalPrice = () => {
      const selectedItemsTotalPrice = cartItems.reduce((acc, item) => {
        if (selectedItems.includes(item.id)) {
          return acc + (item.product.price * item.quantity);
        }
        return acc;
      }, 0);
      setSelectedTotalPrice(selectedItemsTotalPrice);
    }

    updateSelectedTotalPrice();
  }, [selectedItems, cartItems]);

  return (
    <div className="cart-page min-h-screen">
      <h1>ตะกร้าสินค้า</h1>
      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-base-200 p-4">
              <div>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
              <div>
                <img src={`http://localhost:8889/${item.product.imageUrl}`} alt={item.product.name} className="w-[80px]" />
              </div>
              <div className="item-details w-[200px]">
                <h2>{item.product.name}</h2>
              </div>
              <div className="w-[200px]">
                <p>ราคา: {item.product.price} บาท</p>
              </div>
              <div className="w-[130px]">
                <p>จำนวน:
                  <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button className="btn btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </p>
              </div>
              <div className="w-[200px]">
                ราคารวม: {item.product.price * item.quantity} บาท
              </div>
              <div>
                <button className="btn btn-outline btn-error" onClick={() => removeCart(item.id)}>ลบ</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full justify-end px-5 py-2 bg-base-300">
        <div className="self-center mx-2">
          <p className="align-items">ราคารวมที่เลือก: {selectedTotalPrice} บาท</p>
        </div>
        <button className="btn btn-outline btn-info" onClick={handlePayment}>ชำระเงิน</button>
        <button className="btn btn-outline btn-primary mx-2" onClick={() => navigate('/order')}>การสั่งซื้อของฉัน</button>
      </div>

    </div>
  );
}