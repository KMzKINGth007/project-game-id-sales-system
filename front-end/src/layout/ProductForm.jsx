// import axios from "axios";
// import { useState } from "react";

// export default function ProductForm() {
//   const [products, setProducts] = useState(
//     {
//       name : '',
//       price : '',
//       stock : '',
//       gameTypeId : ''
//     }
//   );

//   const hdlChange = e => {
//     setProducts(prv => ({ ...prv, [e.target.name] : e.target.value }))
//   }

//   const hdlSubmit = async e => {
//     try {
//       e.preventDefault()
//       // validation
//       const token = localStorage.getItem('token')
//       const rs = await axios.post('http://localhost:8889/product/addProducts', products, {
//         headers : { Authorization : `Bearer ${token}` }
//       })
//       console.log(rs.data)
//       if (rs.status === 200) {
//         alert('Register Successful')
//       }
//     }catch(err) {
//       console.log( err.message)
//     }
//   }


//   return (
// <div className="p-[5%] border w-6/6 min-w-[400px] max-w-[50%] max-h-[1069px] mx-auto  mt-[8%] text-center">
//   <h1>Product Form</h1>
//   <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
//     <label className="form-control w-full max-w-[682px] mx-auto">
//       <div className="label">
//         <span className="label-text">ชื่อสินค้า</span>
//       </div>
//       <input
//         type="text"
//         className="input input-bordered w-full "
//         name="name"
//         value={products.name}
//         onChange={ hdlChange }
//       />
//     </label>
//     <label className="form-control w-full max-w-[682px] mx-auto">
//       <div className="label">
//         <span className="label-text">ราคา</span>
//       </div>
//       <input
//         type="number"
//         className="input input-bordered w-full "
//         name="price"
//         value={products.price}
//         onChange={ hdlChange }
//       />
//     </label>
//     <label className="form-control w-full max-w-[682px] mx-auto">
//       <div className="label">
//         <span className="label-text">จํานวน</span>
//       </div>
//       <input
//         type="number"
//         className="input input-bordered w-full "
//         name="stock"
//         value={products.stock}
//         onChange={ hdlChange }
//       />
//     </label>
//         <select name="gameType" value={products.gameTypeId} onChange={hdlChange}>
//           <option value="1">genshin impact</option>
//           <option value="2">honkai impact</option>
//           <option value="3">honkai star rail</option>
//         </select>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }


import axios from "axios";
import { useState } from "react";

export default function ProductForm() {
  const [products, setProducts] = useState(
    {
      name: '',
      price: '',
      stock: '',
      gameTypeId: ''
    }
  );

  const hdlChange = e => {
    let value = e.target.value;
    if (e.target.name === 'price' || e.target.name === 'stock' || e.target.name === 'gameTypeId') {
      value = parseInt(value, 10);
    }
    setProducts(prv => ({ ...prv, [e.target.name]: value }));
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.post('http://localhost:8889/product/addProducts', products, config);
      console.log(response.data);
      alert('Create new OK')
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  }

  return (
    <div className="p-[5%] border w-6/6 min-w-[400px] max-w-[50%] max-h-[1069px] mx-auto  mt-[8%] text-center">
      <h1>Product Form</h1>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">ชื่อสินค้า</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full "
            name="name"
            value={products.name}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">ราคา</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full "
            name="price"
            value={products.price}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">จํานวน</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full "
            name="stock"
            value={products.stock}
            onChange={hdlChange}
          />
        </label>
        <label htmlFor="gameType" className="form-control w-full max-w-[682px] mx-auto">
          <div className="label">
            <span className="label-text">ประเภทเกม</span>
          </div>
          <select
            className="select select-bordered w-full"
            name="gameType"
            value={products.gameTypeId}
            onChange={hdlChange}
          >
            <option value="">โปรดเลือก</option>
            <option value="1">Genshin Impact</option>
            <option value="2">Honkai Impact</option>
            <option value="3">Honkai Star Rail</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}