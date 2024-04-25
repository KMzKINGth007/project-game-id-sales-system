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

  const handleConfirmPayment = async () => {
    try {
      await axios.put(`http://localhost:8889/payment/updatePayment/${paymentId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setPaymentDetails(prevState => ({
        ...prevState,
        status: 'paid'

      }));
      alert("ยืนยันการชำระเสร็จสิ้น!");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการยืนยันการชำระเงิน");
    }
  };

  if (!paymentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="payment-details min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-md shadow-md p-6 mb-8">
          <h1 className="text-xl font-semibold mb-4">รายละเอียดการชำระเงิน</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">ID การชำระเงิน: {paymentDetails.id}</p>
              <p className="text-sm">วันที่ชำระเงิน: {new Date(paymentDetails.paymentDate).toLocaleString()}</p>
              <p className="text-sm">จำนวนเงิน: {paymentDetails.amount}</p>
              <p className="text-sm">จำนวนสินค้า: {paymentDetails.carts.quantity}</p>
              <p className="text-sm">สถานะการชำระเงิน: {paymentDetails.status}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">รายละเอียดสินค้า</h2>
              <p className="text-sm">ชื่อสินค้า: {paymentDetails.carts.product.name}</p>
              <p className="text-sm">ราคา: {paymentDetails.carts.product.price}</p>
              <p className="text-sm">รายละเอียด: {paymentDetails.carts.product.description}</p>
              <div className="mt-2">
                <img src={`http://localhost:8889/${paymentDetails.carts.product.imageUrl}`} alt="Product" className="w-24 h-24 object-cover rounded-md" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">วิธีการชำระเงิน</h2>
          <p className="text-sm">ชื่อวิธีการชำระเงิน: {paymentDetails.paymentMethod.nameMethod}</p>
        </div>
        <div className="bg-gray-800 rounded-md shadow-md mt-3 p-6 flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold"
            onClick={handleConfirmPayment}
            disabled={paymentDetails.status === 'paid'}
          >
            {paymentDetails.status === 'paid' ? 'ชำระแล้ว' : 'ยืนยันการชำระ'}
          </button>
        </div>
      </div>
    </div>
  );
}
