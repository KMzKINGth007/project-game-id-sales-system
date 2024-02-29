import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import EditProduct from "./EditProduct";


export default function AdminHome() {
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
      <h1>หน้าหลัก ADMIN</h1>
      <ProductForm />
      <EditProduct/>
    </div>
  )
}