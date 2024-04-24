// frontend code (ShopPage.js)
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [gameTypes, setGameTypes] = useState([]);
  const [selectedGameType, setSelectedGameType] = useState(null);

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

    const fetchGameTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8889/product/gameType/${gameTypeId}', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setGameTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
    fetchGameTypes();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8889/cart/addProductToCard/${productId}`, {
        userId: localStorage.getItem('userId'),
        productId: productId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProductsByGameType = (gameTypeId) => {
    setSelectedGameType(gameTypeId);
  };

  const filteredProducts = selectedGameType
    ? products.filter(product => product.gameTypeId === selectedGameType)
    : products;

  return (
    <div className="user-home min-h-screen">
      <div className="game-type-menu">
        <h2>เลือกประเภทเกม</h2>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-300 rounded-box">
          <li className="h-full" onClick={() => filterProductsByGameType(null)}><div ><a>ทั้งหมด</a></div></li>
          {gameTypes.map(gameType => (
            <li  key={gameType.id} onClick={() => filterProductsByGameType(gameType.id)}>
              <div>
                <img src={`http://localhost:8889/${gameType.ImageUrl}`} alt={gameType.TypeName} className="w-[70px] h-[50px]" />
                <a>{gameType.TypeName}</a>
              </div>
            </li>
          ))}
        </ul>

      </div>
      <h1>หน้าสินค้า</h1>
      <div className="justify-center product-cart-container flex flex-wrap ">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-cart m-4 border rounded p-2 min-h-[400px] min-w-[100px] max-h-[500px] max-w-[250px]">
            <Link to={`/product/${product.id}`}>
              <img src={`http://localhost:8889/${product.imageUrl}`} alt={product.name} className="mb-3 w-[250px] h-[200px]" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description.length > 30 ? product.description.slice(0, 30) + '...' : product.description}</p>
              <p className="product-price">Price: {product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
            </Link>
            <div className="flex justify-end mt-[10px]">
              <button className="btn btn-outline mx-[5px]" onClick={() => addToCart(product.id)}>เพิ่มลงตะกร้า</button>
              <button className="btn btn-outline mx-[5px]">ซื้อเลย!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}