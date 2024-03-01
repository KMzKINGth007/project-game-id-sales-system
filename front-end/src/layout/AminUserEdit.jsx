import axios from "axios";
import { useEffect, useState } from "react";



export default function AdminUserEdit() {
    const [user, setUser] = useState([]);

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
      <h1>หน้าหลัก จัดการผู้ใช้</h1>
    </div>
  )
}