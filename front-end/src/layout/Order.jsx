import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderPage() {
  const [userPayments, setUserPayments] = useState([]);

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8889/payment/getUserPayments", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPayments();
  }, []);

  return (
    <div className="order-page min-h-screen">
      <h1>การสั่งซื้อของฉัน</h1>
      {userPayments.length === 0 ? (
        <p>ไม่มีการสั่งซื้อ</p>
      ) : (
        <div className="order-list">
          {userPayments.map((payment) => (
            <div key={payment.id} className="order-item">
              <h2>รหัสการสั่งซื้อ: {payment.id}</h2>
              <p>วันที่สั่งซื้อ: {new Date(payment.paymentDate).toLocaleDateString()}</p>
              <p>ยอดเงิน: {payment.amount} บาท</p>
              <p>สถานะการชำระเงิน: {payment.status}</p>
              <h3>รายการสินค้า</h3>
              <ul>
                {payment.carts.map((cart) => (
                  <li key={cart.id}>
                    <p>ชื่อสินค้า: {cart.product.name}</p>
                    <p>ราคา: {cart.product.price} บาท</p>
                    <p>จำนวน: {cart.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
