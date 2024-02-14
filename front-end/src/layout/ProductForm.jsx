import axios from "axios";
import { useState } from "react";

export default function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        stock: 0
    })

    const handleChange = e => {
        setProduct(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const rs = await axios.post('http://localhost:8889/products', product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(rs)
            if (rs.status === 200) {
                alert('Create Successful')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

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
    </div>
    )
}