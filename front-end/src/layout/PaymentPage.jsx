import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const { paymentId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8889/payment/getPaymentDetails/${paymentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPaymentDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  if (!paymentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="payment-details min-h-screen">
      <div className="w-full border p-2 h-[500px] mb-10">
        <h1>รายละเอียดการชำระเงิน</h1>
        <p>ID การชำระเงิน: {paymentDetails.id}</p>
        <p>วันที่ชำระเงิน: {paymentDetails.paymentDate}</p>
        <p>จำนวนเงิน: {paymentDetails.amount}</p>
        <p>สถานะการชำระเงิน: {paymentDetails.status}</p>
      </div>
    </div>
  );
}
