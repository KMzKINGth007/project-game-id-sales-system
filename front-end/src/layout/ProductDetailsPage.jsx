import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8889/product/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="">
      {product ? (
        <div className="w-full justify-center items-center ">
          <h1>{product.name}</h1>
          <div className="">
            <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[250px] h-[200px]" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
