import React, { useState } from 'react';
import axios from 'axios';

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8889/products', product);
      setMessage(response.data.msg);
    } catch (error) {
      console.error(error);
      setMessage('Error occurred while creating product');
    }
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={product.stock} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}