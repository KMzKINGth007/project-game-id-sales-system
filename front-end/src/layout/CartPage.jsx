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
      // เตรียมข้อมูลสำหรับการชำระเงิน
      const paymentData = {
        paymentDate: new Date(),
        amount: selectedTotalPrice,
        status: "paid",
        cartId: selectedItems,
        paymentMethodId: 1
      };

      // ส่งข้อมูลการชำระเงินไปยังเซิร์ฟเวอร์เพื่อบันทึกลงในฐานข้อมูล
      const response = await axios.post("http://localhost:8889/payment/createPayment", paymentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // ทำการล้างรายการที่เลือกหลังจากทำการชำระเงินสำเร็จ
      setSelectedItems([]);

      // เมื่อชำระเงินสำเร็จ นำผู้ใช้ไปยังหน้า Payment โดยแสดง ID การชำระเงินที่สร้าง
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
    <div className="cart-page">
      <h1>ตะกร้าสินค้า</h1>
      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center ">
              <div>
                <input 
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
              <div>
                <img src={`http://localhost:8889/${item.product.imageUrl}`} alt={item.product.name} className="w-[80px]" />
              </div>
              <div className="item-details">
                <h2>{item.product.name}</h2>
              </div>
              <div>
                <p>ราคา: {item.product.price} บาท</p>
              </div>
              <div>
                <p>จำนวน: 
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </p>
              </div>
              <div>ราคารวม: {item.product.price * item.quantity} บาท</div>
              <div>
                <button onClick={() => removeCart(item.id)}>ลบ</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <p>ราคารวมที่เลือก: {selectedTotalPrice} บาท</p>
        <button onClick={handlePayment}>ชำระเงิน</button>
      </div>
    </div>
  );
}