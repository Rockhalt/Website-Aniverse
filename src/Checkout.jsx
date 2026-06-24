import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Tapping into the global backpack!
import './Checkout.css'; 

export default function Checkout() {
  const navigate = useNavigate();
  
  // 1. GRAB THE GLOBAL CART AND MATH FUNCTION
  const { cart, getCartTotal } = useCart();

  // 2. DYNAMIC MATH BASED ON THE WHOLE CART
  const subtotal = getCartTotal();
  const shippingFee = cart.length > 0 ? 15.00 : 0; // Only charge shipping if cart has items
  const grandTotal = (subtotal + shippingFee).toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Transmission failed. Cart is empty.");
    alert(`AUTHORIZATION ACCEPTED. Your ${cart.length} items are being prepped for transport.`);
    navigate('/'); 
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>✦ SECURE CHECKOUT</h1>
        <p className="subtitle">Encrypted Vault Transaction</p>
      </div>

      <div className="checkout-content">
        
        {/* LEFT COLUMN: The Form */}
        <div className="checkout-form-section">
          <button className="btn-return" onClick={() => navigate('/')}>
            ← RETURN TO ARCHIVE
          </button>

          <form onSubmit={handleCheckout}>
            <h2>SHIPPING PROTOCOLS</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter last name" required />
              </div>
              <div className="form-group full-width">
                <label>Email Address</label>
                <input type="email" placeholder="transmission@network.com" required />
              </div>
              <div className="form-group full-width">
                <label>Shipping Address</label>
                <input type="text" placeholder="Street Address" required />
              </div>
            </div>

            <h2>PAYMENT AUTHORIZATION</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" required />
              </div>
              <div className="form-group">
                <label>Expiration Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>Security Code</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={cart.length === 0}>
              AUTHORIZE ${grandTotal}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Dynamic Order Summary */}
        <div className="order-summary">
          <h2>ORDER SUMMARY ({cart.length})</h2>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '1rem' }}>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="summary-item">
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p>{item.brand} / {item.category}</p>
                  </div>
                  <span className="item-price">{item.price}</span>
                </div>
              ))
            ) : (
              <div className="summary-item">
                <p style={{ color: '#888' }}>No transmission detected. Cart is empty.</p>
              </div>
            )}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Encrypted Shipping</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>TOTAL</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}