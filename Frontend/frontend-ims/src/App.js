import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Header from './Header.js';
import Items from './Items.js';
import Cart from './Cart.js';
import Checkout from './Checkout.js';
import './App.css';
import Login from './login.js';
import Register from './Register.js';
import Logout from './Logout.js';
import Pay from './Pay.js';
import { useEffect } from 'react';

function App() {
  const isLoggedIn=sessionStorage.getItem("status");
  const [error,setError]=useState('');
  const [products, setProducts] = useState([]);

  // Function to update the products in App.js when sent from Items.js
  const handleProducts = (products) => {
      setProducts(products);
  };
 
  // Load cart items from sessionStorage on component mount
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from sessionStorage
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart && isLoggedIn) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to sessionStorage whenever cartItems changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const handleAddToCart = (item) => {
    const exist = cartItems.find((cartItem) => cartItem.id === item.id);
    if (exist) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  const handleRemoveFromCart=(item)=>{
    const exist = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if(exist){

      const newItems = [];
      console.log("Entered");

      cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          if(cartItem.quantity>1){
            newItems.push({ ...cartItem, quantity: cartItem.quantity - 1 });
          }  
        } else {
          newItems.push(cartItem);
        }
      });
      setCartItems(newItems);
      }

 }



const clearCart=()=>{
  setCartItems([]);
 }

 const handleCheckout = (products) => {
    const outOfStockItems = cartItems.filter((cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);
      return product && cartItem.quantity > product.count;
    });

    if (outOfStockItems.length > 0) {
      const outOfStockNames = outOfStockItems.map((item) => item.name).join(", ");
      setError(`Out of stock for the items: ${outOfStockNames}. Please reduce the count or remove them from the cart.`);
      return false;
    } else {
      setError("");
      alert("Checkout successful!");
      setCartItems([]); // Clear cart
      return true;
    }
  };

  return (
    <Router>
      <div className="App">
        {/* <Header cart={cartItems} /> */}
        <Routes>
          <Route path="/" element={(
            <>
              <Header cart={(cartItems)} login={isLoggedIn} />
              <Items add={handleAddToCart} remove={handleRemoveFromCart} sendProductsToApp={handleProducts}/>
            </>
             )}
             />
            
            <Route path="/cart" element={<Cart c={cartItems} products={products}/>} />
            

            <Route path="/checkout" element={<Checkout clear={clearCart} c={cartItems} />} />
           

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/pay" element={<Pay />} />
         
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
