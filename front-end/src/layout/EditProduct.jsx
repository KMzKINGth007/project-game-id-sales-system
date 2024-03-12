import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // เพิ่ม state เพื่อเก็บข้อมูลของสินค้าที่กำลังแก้ไข

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get('http://localhost:8889/product/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductData();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8889/product/${editingProduct.id}`, editingProduct, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("Edit Product", response.data);

            setEditingProduct(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const productId = parseInt(id);
            await axios.delete(`http://localhost:8889/product/${productId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("Product deleted successfully");

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {editingProduct && editingProduct.id === product.id ? (
                            <div className="justify-between w-[100%] flex my-1 border-solid border-2 min-h-[52px]">
                                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                                <input type="text" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
                                <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} />
                                <button onClick={handleUpdate}>Confirm</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div className="justify-between w-[100%] flex my-1 border-solid border-2 min-h-[52px]">
                                <div className="w-[100px]"><img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[100px] h-[40px]" /></div>
                                <div className="w-[200px]"><p>Name: {product.name}</p></div>
                                <div className="w-[600px]"><p>Description: {product.description}</p></div>
                                <div className="w-[100px]"><p>Price: {product.price}</p></div>
                                <div className="w-[100px]"><p>Stock: {product.stock}</p></div>
                                <div className="w-[30px]"><button onClick={() => handleEdit(product)}>Edit</button></div>
                                <div className="w-[50px]"><button onClick={() => handleDelete(product.id)}>Delete</button></div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}



// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function EditProduct() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8889/product/', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchProductData();
//     }, []);

//     const handleFileChange = (e) => {
//         setProduct({ ...product, imageUrl: e.target.files[0] });
//     }

//     const handleEdit = (product) => {
//         setEditingProduct(product); // เมื่อคลิกที่ปุ่ม Edit จะกำหนดข้อมูลของสินค้าที่กำลังแก้ไข
//     };

//     const handleCancelEdit = () => {
//         setEditingProduct(null); // เมื่อคลิกที่ปุ่ม Cancel จะล้างข้อมูลของสินค้าที่กำลังแก้ไข
//     };

//     const handleupdate = async (id) => {
//         try {
//             const response = await axios.put(`http://localhost:8889/product/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             console.log("Edit Product", response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };


//     const handleDelete = async (id) => {
//         try {
//             const productId = parseInt(id);
//             await axios.delete(`http://localhost:8889/product/${productId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             console.log("Product deleted successfully");

//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };


//     return (
//         <div>
//             <h1>Edit Product</h1>
//             <ul>
//                 {products.map(product => (
//                     <li key={product.id}>
//                         <div className="justify-between w-[100%] flex my-1 border-solid border-2">
//                             <div className="w-[100px]"><img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[100px] h-[40px]" /></div>
//                             <div className="w-[250px]"><p>Name: {product.name}</p></div>
//                             <div className="w-[600px]"><p>Description: {product.description}</p></div>
//                             <div className="w-[100px]"><p>Price: {product.price}</p></div>
//                             <div className="w-[70px]"><p>Stock: {product.stock}</p></div>
//                             <div className="w-[30px]"><button onClick={() => handleEdit(product.id)}>Edit</button></div>
//                             <div className="w-[50px]"><button onClick={() => handleDelete(product.id)}>Delete</button></div>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


// <div>
//     <h1>Edit Product</h1>
//     <ul>
//         {products.map(product => (
//             <li key={product.id}>
//                 (
//                 <div>
//                     <input
//                         type="file"
//                         name="imageUrl"
//                         onChange={handleFileChange}
//                     />
//                     <input
//                         type="text"
//                         name="name"
//                         value={product.name}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         value={product.description}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="number"
//                         name="price"
//                         value={product.price}
//                         onChange={handleChange}
//                     />
//                     <input
//                         type="number"
//                         name="stock"
//                         value={product.stock}
//                         onChange={handleChange}
//                     />
//                     <select
//                         name="gameTypeId"
//                         value={product.gameTypeId}
//                         onChange={handleChange}
//                     >
//                         <option value="">Please select</option>
//                         <option value="1">Genshin Impact</option>
//                         <option value="2">Honkai Impact</option>
//                         <option value="3">Honkai Star Rail</option>
//                     </select>
//                     <button onClick={handleupdate}>Confirm</button>
//                     <button onClick={handleCancelEdit}>Cancel</button>
//                 </div>
//                 ) : (
//                 <div className="justify-between w-[100%] flex my-1 border-solid border-2">
//                     <div className="w-[100px]"><img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[100px] h-[40px]" /></div>
//                     <div className="w-[250px]"><p>Name: {product.name}</p></div>
//                     <div className="w-[600px]"><p>Description: {product.description}</p></div>
//                     <div className="w-[100px]"><p>Price: {product.price}</p></div>
//                     <div className="w-[100px]"><p>Stock: {product.stock}</p></div>
//                     <div className="w-[30px]"><button onClick={() => handleEdit(product)}>Edit</button></div>
//                     <div className="w-[30px]"><button onClick={() => handleDelete(product.id)}>Delete</button></div>
//                 </div>
//                 )
//             </li>
//         ))}
//     </ul>
// </div>