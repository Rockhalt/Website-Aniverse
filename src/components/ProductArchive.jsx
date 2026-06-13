import React, { useState, useEffect } from 'react';
import './ProductArchive.css';
import { addProductToDatabase, getProductsFromDatabase } from './supabaseService';

// Expanded catalog with 12 premium items
const products = [
  {
    id: 1,
    brand: "AKATSUKI SYNDICATE",
    category: "STREETWEAR",
    title: "Heavyweight Cloud Cloak Hoodie (Matte Black)",
    rating: 4.8,
    reviews: 124,
    originalPrice: "$129.99",
    price: "$89.99",
    discount: "-30% OFF",
    tags: ["BEST SELLER", "LIMITED RUN"],
    lowStock: false,
    image: "images/Akatsuki.jpg"
  },
  {
    id: 2,
    brand: "ANBU OPS",
    category: "PROP REPLICA",
    title: "Porcelain Shadow Mask - Itachi Edition",
    rating: 4.9,
    reviews: 88,
    originalPrice: null,
    price: "$145.00",
    discount: null,
    tags: ["HANDCRAFTED", "MATTE FINISH"],
    lowStock: true,
    stockCount: 3,
    image: "images/Anbu.webp"
  },
  {
    id: 3,
    brand: "UCHIHA ARCHIVES",
    category: "ACCESSORIES",
    title: "Mangekyou Sharingan Obsidian Signet Ring",
    rating: 5.0,
    reviews: 42,
    originalPrice: "$85.00",
    price: "$64.99",
    discount: "-24% OFF",
    tags: ["ARTISAN", "TITANIUM"],
    lowStock: false,
    image: "images/Sharingan.webp"
  },
  {
    id: 4,
    brand: "GHOST OF UCHIHA",
    category: "WEAPONS",
    title: "Madara's Gunbai War Fan (1:1 Scale Metal)",
    rating: 4.7,
    reviews: 31,
    originalPrice: "$399.99",
    price: "$299.99",
    discount: "-25% OFF",
    tags: ["COLLECTOR'S TIER", "HEAVYWEIGHT"],
    lowStock: false,
    image: "images/Gunbai.jpeg"
  },
  {
    id: 5,
    brand: "HIDDEN LEAF ELITE",
    category: "COLLECTIBLE",
    title: "Minato's Hiraishin Kunai (24k Gold Plated Edition)",
    rating: 5.0,
    reviews: 156,
    originalPrice: "$220.00",
    price: "$180.00",
    discount: "-18% OFF",
    tags: ["PREMIUM TIER", "VAULT EXCLUSIVE"],
    lowStock: true,
    stockCount: 2,
    image: "images/Kunai.jpg"
  },
  {
    id: 6,
    brand: "CURSED ARCHIVES",
    category: "PROP REPLICA",
    title: "Ryomen Sukuna Cursed Finger (Resin Cast)",
    rating: 4.6,
    reviews: 95,
    originalPrice: "$60.00",
    price: "$45.00",
    discount: "-25% OFF",
    tags: ["BEST SELLER"],
    lowStock: false,
    image: "images/Sukuna.webp"
  },
  {
    id: 7,
    brand: "ESPADA SYNDICATE",
    category: "APPAREL",
    title: "Las Noches Heavyweight Bomber (Charcoal)",
    rating: 4.8,
    reviews: 67,
    originalPrice: null,
    price: "$110.00",
    discount: null,
    tags: ["NEW ARRIVAL"],
    lowStock: false,
    image: "images/Fortress.jpg"
  },
  {
    id: 8,
    brand: "HASHIRA FORGE",
    category: "KATANA",
    title: "Sun Breathing Nichirin (Matte Black Carbon)",
    rating: 4.9,
    reviews: 210,
    originalPrice: "$299.99",
    price: "$250.00",
    discount: "-16% OFF",
    tags: ["ARTISAN", "1:1 SCALE"],
    lowStock: true,
    stockCount: 4,
    image: "images/Sword.webp"
  },
  {
    id: 9,
    brand: "PARADIS COMMAND",
    category: "JEWELRY",
    title: "Wings of Freedom Titanium Pendant",
    rating: 4.7,
    reviews: 184,
    originalPrice: "$75.00",
    price: "$55.00",
    discount: "-26% OFF",
    tags: ["BEST SELLER"],
    lowStock: false,
    image: "images/Wings.png"
  },
  {
    id: 10,
    brand: "METEOR CITY",
    category: "ACCESSORIES",
    title: "Phantom Troupe Artisan Keycap Set",
    rating: 4.9,
    reviews: 53,
    originalPrice: null,
    price: "$85.00",
    discount: null,
    tags: ["LIMITED EDITION", "CHERRY MX"],
    lowStock: false,
    image: "images/Keys.jpg"
  },
  {
    id: 11,
    brand: "STATE ALCHEMIST",
    category: "ACCESSORIES",
    title: "Flamel Transmutation Pocket Watch (Vintage Brass)",
    rating: 4.8,
    reviews: 112,
    originalPrice: null,
    price: "$120.00",
    discount: null,
    tags: ["VAULT EXCLUSIVE"],
    lowStock: true,
    stockCount: 7,
    image: "images/Watch.webp"
  },
  {
    id: 12,
    brand: "ZENIN OUTCAST",
    category: "STREETWEAR",
    title: "Heavenly Restriction Compression Top",
    rating: 4.7,
    reviews: 89,
    originalPrice: "$60.00",
    price: "$45.00",
    discount: "-25% OFF",
    tags: ["PERFORMANCE"],
    lowStock: true,
    stockCount: 5,
    image: "images/Toji.webp"
  }
];

export function ProductArchive() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // UPDATED STATE: Added "tag" to handle the dropdown menu selection
  const [newProduct, setNewProduct] = useState({ 
    title: '', brand: '', category: '', price: '', image: '', originalPrice: '', discount: '', stockCount: '', tag: 'NONE' 
  });
  
  const [inventory, setInventory] = useState(products);

  useEffect(() => {
    async function loadVault() {
      try {
        const cloudData = await getProductsFromDatabase();
        if (cloudData && cloudData.length > 0) {
          setInventory([...cloudData, ...products]); 
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    }
    loadVault();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const parsedStock = newProduct.stockCount ? parseInt(newProduct.stockCount) : null;
    const isLowStock = parsedStock !== null && parsedStock > 0 && parsedStock <= 5;

    // Format the tag as an array for Supabase (if "NONE" is selected, send an empty array)
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
      tags: productTags // NEW: Sends the selected tag to the database
    };

    try {
      await addProductToDatabase(newItem);
      setInventory([newItem, ...inventory]);
      setIsModalOpen(false);
      
      // Wipe the form completely clean
      setNewProduct({ 
        title: '', brand: '', category: '', price: '', image: '', originalPrice: '', discount: '', stockCount: '', tag: 'NONE' 
      });

    } catch (error) {
      console.error("Vault Error:", error);
      alert("Error: Could not connect to the Supabase Vault.");
    }
  };

  return (
    <>
      <section className="archive-section">
        
        <header className="archive-header">
          <div className="header-left">
            <h2 className="title">
              <span className="title-icon">✦</span> CURATED GEAR ARCHIVE
            </h2>
            <p className="subtitle">{inventory.length} ITEMS FOUND</p> 
          </div>
          
          <div className="header-controls">
            <button className="admin-add-btn" onClick={() => setIsModalOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              ADD PRODUCT
            </button>

            <button className="control-btn">
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
          {inventory.map(product => (
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

                <img src={product.image} alt={product.title} className="card-image" loading="lazy" />
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="meta-brand">{product.brand}</span>
                  <span className="meta-category">{product.category}</span>
                </div>
                
                <h3 className="card-title">{product.title}</h3>
                
                <div className="card-rating">
                  <span className="stars">★★★★★</span>
                  <span className="review-count">({product.reviews})</span>
                </div>

                <div className="card-footer">
                  <div className="price-container">
                    <span className="price-original">{product.originalPrice || ''}</span>
                    <span className="price-current">{product.price}</span>
                  </div>
                  
                  <button className="buy-now">
                    BUY NOW
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

      {/* --- ADMIN UPLOAD MODAL --- */}
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

              {/* NEW ROW: Feature Tag Dropdown and Image URL */}
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
                <input 
                  type="text" placeholder="Image URL (e.g., images/mask.jpg)" required
                  value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              
              <button type="submit" className="submit-btn">AUTHORIZE UPLOAD</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}