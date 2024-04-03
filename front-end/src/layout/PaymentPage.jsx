import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const { paymentId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8889/payment/${paymentId}`);
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
    <div>
      <h1>รายละเอียดการชำระเงิน</h1>
      <p>วันที่ชำระเงิน: {paymentDetails.paymentDate}</p>
      <p>จำนวนเงิน: {paymentDetails.amount} บาท</p>
      {/* แสดงรายละเอียดอื่น ๆ ของการชำระเงินที่ต้องการ */}
    </div>
  );
}
