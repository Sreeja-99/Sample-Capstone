import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 

function Cart({ c, products }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const clickHandle = async () => {
    if (c.length > 0) {
      // Check for items with insufficient stock
      const insufficientStockItems = c.filter((item) => {
        const product = products.find((p) => p.id === item.id);
        return product && product.count < item.quantity;
      });

      if (insufficientStockItems.length > 0) {
        const errorItems = insufficientStockItems.map((item) => item.name).join(", ");
        setError(`Out of stock for the items: "${errorItems}". Please reduce the count or remove them from cart before checkout.`);
      } else if (sessionStorage.getItem('status')) {
        // Send data to backend
        try {
          const payload = c.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }));

          const response = await fetch('http://localhost:8080/inventory/decinv', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (response.status === 200) {
            // If the response status is 200 (OK), proceed with the checkout
            navigate("/checkout");
          } else if (response.status === 400) {
            setError("Bad request. Please try again later.");
          } else if (response.status === 404) {
            setError("Inventory not found.");
          } else if (response.status === 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Error updating inventory. Please try again later.");
          }
        } catch (err) {
          setError("An error occurred while communicating with the server.");
          console.error(err);
        }
      } else {
        setError("Please login before checkout");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      setError("Please add items to cart");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <div className="cart-page">
        <h2>Your Cart</h2>
        {c.length === 0 ? (
          <p className='empty-cart'>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {c.map((item) => (
              <div key={item.id} className="cart-item">

                <span className="title">{item.name} [{item.quantity}]:</span>
                <span className="price">${item.quantity * item.price}</span>
              </div>
            ))}
            {/* <p className='total'>Total: {c.reduce((total, item) => total + (item.quantity * item.price), 0)}</p> */}
            <p className='total'>
  Total: ${parseFloat(c.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2))}
</p>

          </div>
        )}
     

      <button className="checkout" onClick={clickHandle} disabled={c.length === 0}>
        Proceed to Checkout
      </button>
      </div>

      {error && <div className="error"><p>{error}</p></div>}
      {message && <div className="message"><p>{message}</p></div>}
    </>
  );
}

export default Cart;
