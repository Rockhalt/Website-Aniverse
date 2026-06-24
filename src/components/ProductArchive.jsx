import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartSlider } from './CartSlider';
import './ProductArchive.css';
import { addProductToDatabase, getProductsFromDatabase } from './supabaseService';
import { useCart } from '../CartContext';
import { products } from '../data';

export function ProductArchive() {
  const navigate = useNavigate();
  
  const { category } = useParams(); 
  const categoryFilter = category || 'trending';
  
  const { addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const [newProduct, setNewProduct] = useState({ 
    title: '', brand: '', category: '', price: '', image: '', originalPrice: '', discount: '', stockCount: '', tag: 'NONE' 
  });
  
  const [inventory, setInventory] = useState(products);

  useEffect(() => {
    const fetchLiveVaultData = async () => {
      try {
        const liveData = await getProductsFromDatabase();
        
        if (liveData && liveData.length > 0) {
          // ✦ THE FIX: Combine the live database items WITH your local products ✦
          setInventory([...liveData, ...products]); 
        }
      } catch (error) {
        console.error("Vault Transmission Error:", error);
      }
    };
    fetchLiveVaultData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryFilter]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const parsedStock = newProduct.stockCount ? parseInt(newProduct.stockCount) : null;
    const isLowStock = parsedStock !== null && parsedStock > 0 && parsedStock <= 5;
    const productTags = newProduct.tag !== 'NONE' ? [newProduct.tag] : [];

    const newItem = {
      id: Date.now(), 
      title: newProduct.title,
      brand: newProduct.brand,
      category: newProduct.category,
      price: `$${newProduct.price}`, 
      originalPrice: newProduct.originalPrice ? `$${newProduct.originalPrice}` : null,
      discount: newProduct.discount ? newProduct.discount : null,
      image: newProduct.image,
      rating: 5.0, 
      reviews: Math.floor(Math.random() * 150) + 12, 
      lowStock: isLowStock,
      stockCount: parsedStock,
      tags: productTags 
    };

    try {
      await addProductToDatabase(newItem);
      setInventory([newItem, ...inventory]);
      setIsModalOpen(false);
      setNewProduct({ 
        title: '', brand: '', category: '', price: '', image: '', originalPrice: '', discount: '', stockCount: '', tag: 'NONE' 
      });
    } catch (error) {
      console.error("Vault Error:", error);
      alert("Error: Could not connect to the Supabase Vault.");
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product); 
    setShowPopup(true); 
    setTimeout(() => setShowPopup(false), 2500); 
  };

  const displayedInventory = inventory.filter(product => {
    if (!categoryFilter || categoryFilter === 'trending') return true;
    
    const cat = product.category.toLowerCase();
    if (categoryFilter === 'figures') return cat.includes('replica') || cat.includes('collectible');
    if (categoryFilter === 'accessories') return cat.includes('accessories') || cat.includes('jewelry');
    if (categoryFilter === 'katana') return cat.includes('katana') || cat.includes('weapon');
    if (categoryFilter === 'clothes') return cat.includes('streetwear') || cat.includes('apparel');
    
    return true;
  });

  return (
    <>
      <section className="archive-section">
        <header className="archive-header">
          <div className="header-left">
            <h2 className="title">
              <span className="title-icon">✦</span> CURATED GEAR ARCHIVE
            </h2>
            <p className="subtitle">{displayedInventory.length} ITEMS FOUND</p> 
          </div>
          
          <div className="header-controls">
            <button className="admin-add-btn" onClick={() => setIsModalOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              ADD PRODUCT
            </button>
            <button className="control-btn" onClick={() => navigate('/metrics')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-8h6m2 10h6"/></svg>
              METRICS / FILTERS
            </button>
            <button className="control-btn">
              SORT: FEATURED
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
        </header>

        <div className="product-grid">
          {displayedInventory.map(product => (
            <article key={product.id} className="card">
              <div className="card-image-wrapper">
                <div className="tags-container">
                  {product.discount && <span className="tag tag-discount">{product.discount}</span>}
                  {(product.tags || []).map(tag => (
                    <span key={tag} className="tag tag-dark">{tag}</span>
                  ))}
                  {product.lowStock && (
                    <span className="tag tag-warning">LOW STOCK: {product.stockCount}</span>
                  )}
                </div>
                
                <button className="fav-btn" aria-label="Add to wishlist">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>

                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="card-image" 
                  loading="lazy" 
                  onClick={() => navigate(`/product/${product.id}`)} 
                  style={{ cursor: 'pointer' }} 
                />
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="meta-brand">{product.brand}</span>
                  <span className="meta-category">{product.category}</span>
                </div>
                
                <h3 
                  className="card-title" 
                  onClick={() => navigate(`/product/${product.id}`)} 
                  style={{ cursor: 'pointer' }}
                >
                  {product.title}
                </h3>
                
                <div className="card-rating">
                  <span className="stars">★★★★★</span>
                  <span className="review-count">({product.reviews})</span>
                </div>

                <div className="card-footer">
                  <div className="price-container">
                    <span className="price-original">{product.originalPrice || ''}</span>
                    <span className="price-current">{product.price}</span>
                  </div>
                  
                  <button className="buy-now" onClick={() => handleAddToCart(product)}>
                    ADD TO CART
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>✦ ADD NEW GEAR</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddProduct} className="admin-form">
              <input 
                type="text" placeholder="Product Title (e.g., Hollow Mask)" required
                value={newProduct.title} onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
              />
              <div className="form-row">
                <input 
                  type="text" placeholder="Brand" required
                  value={newProduct.brand} onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                />
                <input 
                  type="text" placeholder="Category" required
                  value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                />
              </div>
              
              <div className="form-row">
                <input 
                  type="number" placeholder="Current Price (USD)" required
                  value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <input 
                  type="number" placeholder="Original Price (Optional)" 
                  value={newProduct.originalPrice} onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                />
              </div>

              <div className="form-row">
                <input 
                  type="text" placeholder="Discount Text (e.g., -20% OFF)" 
                  value={newProduct.discount} onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                />
                <input 
                  type="number" placeholder="Stock Count (Optional)" 
                  value={newProduct.stockCount} onChange={(e) => setNewProduct({...newProduct, stockCount: e.target.value})}
                />
              </div>

              <div className="form-row">
                <select 
                  value={newProduct.tag} 
                  onChange={(e) => setNewProduct({...newProduct, tag: e.target.value})}
                  style={{ padding: '0.8rem', backgroundColor: '#111', color: '#fff', border: '1px solid #333', textTransform: 'uppercase' }}
                >
                  <option value="NONE">-- NO HIGHLIGHT TAG --</option>
                  <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                  <option value="BEST SELLER">BEST SELLER</option>
                  <option value="LIMITED RUN">LIMITED RUN</option>
                  <option value="VAULT EXCLUSIVE">VAULT EXCLUSIVE</option>
                </select>
                {/* ✦ POLISH: Added a slash to the placeholder so you remember ✦ */}
                <input 
                  type="text" placeholder="Image URL (e.g., /images/mask.jpg)" required
                  value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              
              <button type="submit" className="submit-btn">AUTHORIZE UPLOAD</button>
            </form>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="premium-cart-popup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
          GEAR SECURED IN CART
        </div>
      )}
    </>
  );
}