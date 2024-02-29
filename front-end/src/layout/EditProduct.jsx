import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get('http://localhost:8889/product/Products', {
                    headers : { Authorization : `Bearer ${localStorage.getItem('token')}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductData()
    }, [])

    return (
        <div>
          <h1>show product</h1>
          <div className="grid grid-cols-3 border-t-4">
          {products.map(product => (
            <div className="p-4 border-t-10 border-solid border-indigo-500" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.stock}</p>
              <p>{product.gameTypeId}</p>
            </div>
          ))}
        </div>
        </div>
      )
    }