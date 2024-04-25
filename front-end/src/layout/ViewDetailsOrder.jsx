import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewDetailsOrder() {
    const { id } = useParams();
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        fetchPaymentById();
    }, []);

    const fetchPaymentById = async () => {
        try {
            const response = await axios.get(`http://localhost:8889/payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPayment(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBackgroundColor = (status) => {
        return status === 'paid' ? 'bg-green-900' : 'bg-red-900';
    };

    return (
        <div className={`py-4 px-6 rounded-md ${payment ? getBackgroundColor(payment.status) : 'bg-gray-800'}`}>
            <h1 className="text-2xl font-bold mb-4 text-white">Payment Details</h1>
            {payment && (
                <div>
                    <div className="mb-4 p-2 bg-base-100">
                        <p className="font-semibold text-white">Payment ID:</p>
                        <p className="text-white">{payment.id}</p>
                    </div>
                    <div className="mb-4 p-2 bg-base-100">
                        <p className="font-semibold text-white">Payment Date:</p>
                        <p className="text-white">{new Date(payment.paymentDate).toLocaleString()}</p>
                    </div>
                    <div className="mb-4 p-2 bg-base-100">
                        <p className="font-semibold text-white">Amount:</p>
                        <p className="text-white">{payment.amount}</p>
                    </div>
                    <div className="mb-4 p-2 bg-base-100">
                        <p className="font-semibold text-white">Status:</p>
                        <p className="text-white">{payment.status}</p>
                    </div>
                    <div className="mb-4 p-2 bg-base-100">
                        <h2 className="text-xl font-semibold mb-2 text-white">User Details</h2>
                        <p><span className="font-semibold text-white">User ID:</span> {payment.carts.user.id}</p>
                        <p><span className="font-semibold text-white">Username:</span> {payment.carts.user.username}</p>
                        <p><span className="font-semibold text-white">Email:</span> {payment.carts.user.email}</p>
                        <p><span className="font-semibold text-white">Facebook:</span> {payment.carts.user.facebook}</p>
                        <p><span className="font-semibold text-white">Line:</span> {payment.carts.user.line}</p>
                    </div>
                    <div className="mb-4 p-2 bg-base-100">
                        <h2 className="text-xl font-semibold mb-2 text-white">Product Details</h2>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2 text-white">GameType Details</h2>
                            <p><span className="font-semibold text-white">GameType Name:</span> {payment.carts.product.gameType.TypeName}</p>
                            {payment.carts.product.gameType.ImageUrl && (
                                <img src={`http://localhost:8889/${payment.carts.product.gameType.ImageUrl}`} className=" max-h-[50px]" alt="GameType Image" />
                            )}
                        </div>
                        <p><span className="font-semibold text-white">Product ID:</span> {payment.carts.product.id}</p>
                        <p><span className="font-semibold text-white">Product Name:</span> {payment.carts.product.name}</p>
                        <p><span className="font-semibold text-white">Description:</span> {payment.carts.product.description}</p>
                        <p><span className="font-semibold text-white">Price:</span> {payment.carts.product.price}</p>
                        <div className="flex">
                            <img src={`http://localhost:8889/${payment.carts.product.imageUrl}`} className=" max-h-[140px]" />
                            <img src={`http://localhost:8889/${payment.carts.product.imageUrl2}`} className=" max-h-[140px]" />
                            <img src={`http://localhost:8889/${payment.carts.product.imageUrl3}`} className=" max-h-[140px]" />
                            <img src={`http://localhost:8889/${payment.carts.product.imageUrl4}`} className=" max-h-[140px]" />
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
