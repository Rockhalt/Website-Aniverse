import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { products as localData } from '../data'; 
import { getProductsFromDatabase } from './supabaseService';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  
  // ✦ NEW: State to hold the found product while we search ✦
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const locateGear = async () => {
      try {
        // 1. Check local static data first (instant load)
        let foundGear = localData.find(p => p.id === parseInt(id));
        
        // 2. If not found locally, search the Supabase Vault
        if (!foundGear) {
          const liveVault = await getProductsFromDatabase();
          foundGear = liveVault.find(p => p.id === parseInt(id));
        }
        
        setProduct(foundGear);
      } catch (error) {
        console.error("Transmission Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    locateGear();
  }, [id]);

  if (isLoading) {
    return <div style={{ paddingTop: '150px', color: '#888', textAlign: 'center', letterSpacing: '2px' }}>DECRYPTING GEAR DATA...</div>;
  }

  if (!product) {
    return <div style={{ paddingTop: '150px', color: '#ff4500', textAlign: 'center', letterSpacing: '2px' }}>TRANSMISSION LOST. GEAR NOT FOUND.</div>;
  }

  const isApparel = product.category === 'STREETWEAR' || product.category === 'APPAREL';

  const handleBuy = () => {
    if (isApparel && !selectedSize) {
      alert("ERROR: Please select a size specification before authorizing.");
      return;
    }
    const itemToCart = { ...product, size: selectedSize };
    addToCart(itemToCart);
    navigate('/'); 
  };

  return (
    <>
      <style>{`
        .product-room {
          min-height: 100vh;
          padding: 150px 5% 50px 5%;
          background-color: #070707;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .room-container {
          display: flex;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          padding: 3rem;
        }
        .room-image-side {
          flex: 1;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #222;
          overflow: hidden;
        }
        .room-image-side img {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .room-image-side:hover img {
          transform: scale(1.05);
        }
        .room-info-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .room-brand {
          color: #ff4500;
          letter-spacing: 2px;
          font-weight: bold;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .room-title {
          color: #fff;
          font-size: 2.5rem;
          font-family: Impact, "Arial Black", sans-serif;
          letter-spacing: 1px;
          margin: 0 0 1.5rem 0;
          line-height: 1.1;
        }
        .room-price-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #222;
          padding-bottom: 2rem;
        }
        .room-price {
          font-size: 2rem;
          color: #fff;
          font-weight: bold;
        }
        .size-section {
          margin-bottom: 2rem;
        }
        .size-label {
          color: #888;
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
        }
        .size-grid {
          display: flex;
          gap: 1rem;
        }
        .size-btn {
          background: transparent;
          border: 1px solid #333;
          color: #fff;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .size-btn:hover { border-color: #888; }
        .size-btn.active {
          border-color: #ff4500;
          color: #ff4500;
        }
        .room-lore {
          color: #888;
          line-height: 1.6;
          margin-bottom: 3rem;
          font-size: 0.95rem;
        }
        .btn-authorize {
          background: #fff;
          color: #000;
          border: none;
          padding: 1.25rem;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .btn-authorize:hover {
          background: #ff4500;
          color: #fff;
        }
        .btn-back {
          background: none;
          border: none;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          margin-bottom: 2rem;
          text-align: left;
          padding: 0;
          transition: color 0.3s;
        }
        .btn-back:hover { color: #fff; }
      `}</style>

      <div className="product-room">
        <div className="room-container">
          
          <div className="room-image-side">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="room-info-side">
            <button className="btn-back" onClick={() => navigate(-1)}>← Return to Archive</button>
            
            <div className="room-brand">{product.brand} // {product.category}</div>
            <h1 className="room-title">{product.title.toUpperCase()}</h1>
            
            <div className="room-price-row">
              <span className="room-price">{product.price}</span>
              {product.discount && <span style={{ color: '#ff4500', fontWeight: 'bold' }}>{product.discount}</span>}
            </div>

            {isApparel && (
              <div className="size-section">
                <span className="size-label">Select Specification: {selectedSize || ''}</span>
                <div className="size-grid">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="room-lore">
              A premium, high-grade artifact recovered from the Aniverse Vault. Designed with uncompromising quality, this piece features a matte finish, heavy-duty materials, and elite craftsmanship. Limited stock available. Authorization required for extraction.
            </p>

            <button className="btn-authorize" onClick={handleBuy}>
              AUTHORIZE PURCHASE
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}