import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8889/payment/getAllPayment', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPayments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'paid') {
      return 'bg-green-900';
    } else if (status === 'unpaid') {
      return 'bg-red-900';
    } else {
      return 'bg-gray-900'; // สีพื้นหลังเริ่มต้นหากไม่ใช่ paid หรือ unpaid
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="grid grid-cols-6 gap-4">
        {payments.map((payment) => (
          <div key={payment.id} className={`border rounded p-2 ${getStatusColor(payment.status)}`}>
            <div>
              <span className="font-bold">Payment ID:</span> {payment.id}
            </div>
            <div>
              <span className="font-bold">Payment Date:</span> {payment.paymentDate}
            </div>
            <div>
              <span className="font-bold">Amount:</span> {payment.amount}
            </div>
            <div>
              <span className="font-bold">Status:</span> {payment.status}
            </div>
            <div>
              <span className="font-bold">User:</span> {payment.carts.user.username}
            </div>
            <div>
              <span className="font-bold">Product:</span> {payment.carts.product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
