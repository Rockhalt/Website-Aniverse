import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './CartSlider.css';

export function CartSlider() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
      {/* e.stopPropagation() prevents clicking inside the drawer from closing it */}
      <div className="cart-slider" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-header">
          <h2>✦ SECURE CART ({cart.length})</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center' }}>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(index)}>REMOVE ITEM</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>SUBTOTAL</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout} disabled={cart.length === 0}>
            PROCEED TO CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}