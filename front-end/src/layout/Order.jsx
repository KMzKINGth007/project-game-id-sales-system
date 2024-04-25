import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function AllUserPayment() {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                const response = await axios.get('http://localhost:8889/payment/getAllPayment', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const userPayments = response.data.filter(payment => payment.carts.user.id === user.id);
                setPayments(userPayments);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchUserPayments();
        }
    }, [user]);

    const handleDeletePayment = async (paymentId) => {
        try {
            await axios.delete(`http://localhost:8889/payment/deletePayment/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPayments(payments.filter(payment => payment.id !== paymentId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto min-h-screen">
            <h1 className="text-2xl font-bold mb-4">My Payments</h1>
            <div>
                {payments.map((payment) => (
                    <div key={payment.id} className="p-4 bg-base-300 shadow-md rounded-md mb-2 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                            <div className="mb-2">
                                <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleString()}</p>
                                <p><strong>Amount:</strong> {payment.amount}</p>
                                <p><strong>Status:</strong> {payment.status}</p>
                            </div>
                            <div className="flex bg-base-200 p-2">
                                <h3 className="text-lg font-semibold mb-1">Product Details</h3>
                                <div className="mx-2">
                                    <img src={`http://localhost:8889/${payment.carts.product.imageUrl}`} className=" max-h-[140px]" />
                                </div>
                                <div>
                                    <p><strong>Product Name:</strong> {payment.carts.product.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full px-5 border-l-2">
                            <Link to={`/payment/${payment.id}`} className="btn btn-outline btn-info ml-2">ชำระเงิน</Link>
                            <button className="btn btn-outline btn-error" onClick={() => handleDeletePayment(payment.id)}>ลบ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
