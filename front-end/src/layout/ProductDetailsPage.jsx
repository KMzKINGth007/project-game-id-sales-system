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

  const addToCart = async () => {
    try {
      const response = await axios.post(`http://localhost:8889/cart/addProductToCard/${id}`, {
        userId: localStorage.getItem('userId'),
        productId: id,
        quantity: 1 // จำนวนสินค้าที่ต้องการเพิ่มลงในตะกร้า (เช่น 1 ชิ้น)
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data); // พิมพ์ response ที่ได้รับจากเซิร์ฟเวอร์เพื่อตรวจสอบ
      // จะเป็นการแจ้งให้ผู้ใช้ทราบว่าสินค้าถูกเพิ่มลงในตะกร้าแล้ว
    } catch (error) {
      console.error(error);
      // จัดการข้อผิดพลาดที่อาจเกิดขึ้นเมื่อส่งคำขอไปยัง API
    }
  };

  return (
    <div className="items-center justify-center ">
      {product ? (
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-[600px] border rounded p-2 h-[500px]">
            <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className=" w-[100%] max-h-[400px]" />
          </div>
          <div className="w-[600px] border rounded p-2 min-h-[200px] min-w-[100px]">
            <h2 className="product-name my-[10px] text-xl">{product.name}</h2>
            <hr className="my-[10px]" />
            <p className="product-price my-[10px]">Price: {product.price} THB</p>
            <p className="product-stock my-[10px]">Stock: {product.stock}</p>
            <div className="w-full justify-end flex">
              <button className="btn btn-outline" onClick={addToCart}>เพิ่มลงตะกร้า</button>
              <button className="btn btn-outline">ซื้อเลย!</button>
            </div>
          </div>
          <div className="w-full border p-2 h-[500px] mb-10">
            <div>
              <h2 className="product-name my-[10px] text-xl">รายละเอียดเพิ่มเติม</h2>
              <p className="product-description my-[10px]">{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}



// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้าที่ต้องการเพิ่มลงในตะกร้า

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8889/product/${id}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setProduct(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       await axios.post(`http://localhost:8889/cart/addProductToCart/${id}`, {
//         userId: localStorage.getItem('userId'), // ใช้ userId ที่เก็บไว้ใน localStorage จากการล็อกอิน
//         productId: id,
//         quantity: quantity
//       });
//       alert('สินค้าถูกเพิ่มลงในตะกร้าแล้ว');
//     } catch (error) {
//       console.error(error);
//       alert('มีข้อผิดพลาดเกิดขึ้น ไม่สามารถเพิ่มสินค้าลงในตะกร้าได้');
//     }
//   };

//   return (
//     <div className="items-center justify-center">
//       {product ? (
//         <div className="w-full flex flex-wrap justify-center">
//           <div className="w-[600px] border rounded p-2 h-[500px]">
//             <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="w-[100%] max-h-[400px]" />
//           </div>
//           <div className="w-[600px] border rounded p-2 min-h-[200px] min-w-[100px]">
//             <h2 className="product-name my-[10px] text-xl">{product.name}</h2>
//             <hr className="my-[10px]" />
//             <p className="product-price my-[10px]">Price: {product.price} THB</p>
//             <p className="product-stock my-[10px]">Stock: {product.stock}</p>
//             <div className="w-full justify-end flex">
//               <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
//               <button className="btn btn-outline" onClick={handleAddToCart}>เพิ่มลงตะกร้า</button>
//               <button className="btn btn-outline">ซื้อเลย!</button>
//             </div>
//           </div>
//           <div className="w-full border p-2 h-[500px] mb-10">
//             <div>
//               <h2 className="product-name my-[10px] text-xl">รายละเอียดเพิ่มเติม</h2>
//               <p className="product-description my-[10px]">{product.description}</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }