import React from 'react';

// Expanded catalog with 12 premium items and stable image seeds
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
  return (
    <>
      <style>{`
        .archive-section {
          background-color: #070707; 
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 4rem 3rem;
          min-height: 100vh;
        }

        /* --- HEADER STYLES --- */
        .archive-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #1a1a1a;
        }

        .header-left .title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 2rem;
          letter-spacing: 1px;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-left .title-icon {
          color: #dc2626; 
        }

        .header-left .subtitle {
          color: #737373;
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 2px;
          margin: 0;
          text-transform: uppercase;
        }

        .header-controls {
          display: flex;
          gap: 1rem;
        }

        .control-btn {
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #a3a3a3;
          padding: 0.6rem 1.5rem;
          border-radius: 99px; 
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          border-color: #dc2626;
          color: #ffffff;
        }

        /* --- GRID STYLES --- */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        /* --- CARD STYLES --- */
        .card {
          background-color: #0f0f0f; 
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: #333;
        }

        .card-image-wrapper {
          position: relative;
          aspect-ratio: 4/3;
          background-color: #000000;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%) brightness(0.65) contrast(1.2) sepia(10%) hue-rotate(-10deg);
          transition: all 0.5s ease;
        }

        .card:hover .card-image {
          filter: grayscale(0%) brightness(0.85) contrast(1.1);
          transform: scale(1.05);
        }

        /* Overlays (Tags & Favorite) */
        .tags-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          z-index: 2;
        }

        .tag {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          border-radius: 2px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .tag-discount {
          background-color: #dc2626; 
          color: #ffffff;
        }

        .tag-dark {
          background-color: rgba(0, 0, 0, 0.8);
          color: #d1d1d1;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tag-warning {
          background-color: transparent;
          color: #fb923c;
          font-family: monospace;
          padding: 0;
          margin-top: 0.2rem;
        }

        .fav-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a3a3a3;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          z-index: 2;
        }

        .fav-btn:hover {
          color: #dc2626;
          border-color: #dc2626;
        }

        /* --- CARD CONTENT --- */
        .card-content {
          padding: 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
        }

        .meta-brand { color: #dc2626; } 
        .meta-category { color: #525252; }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0 0 0.8rem 0;
          color: #f5f5f5;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 2rem;
        }

        .stars {
          color: #f59e0b; 
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        .review-count {
          color: #525252;
          font-size: 0.75rem;
        }

        /* --- CARD FOOTER --- */
        .card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center; 
        }

        .price-container {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .price-original {
          color: #525252;
          font-size: 0.75rem;
          text-decoration: line-through;
          height: 12px;
        }

        .price-current {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 700;
        }

        /* HIGH-END PILL BUTTON DESIGN */
        .buy-now {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid #2a2a2a;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.4rem;
          border-radius: 99px; 
        }

        /* Interactive smooth filling transition */
        .card:hover .buy-now {
          background-color: #ffffff;
          color: #000000;
          border-color: #ffffff;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .buy-now svg {
          transition: transform 0.3s ease;
        }

        .card:hover .buy-now svg {
          transform: translateX(2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .archive-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .archive-section { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="archive-section">
        
        {/* Header Area */}
        <header className="archive-header">
          <div className="header-left">
            <h2 className="title">
              <span className="title-icon">✦</span> CURATED GEAR ARCHIVE
            </h2>
            <p className="subtitle">{products.length} ITEMS FOUND</p>
          </div>
          
          <div className="header-controls">
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

        {/* Product Grid */}
        <div className="product-grid">
          {products.map(product => (
            <article key={product.id} className="card">
              
              {/* Image & Overlays */}
              <div className="card-image-wrapper">
                <div className="tags-container">
                  {product.discount && <span className="tag tag-discount">{product.discount}</span>}
                  {product.tags.map(tag => (
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

              {/* Text Content */}
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
                  
                  {/* Clean, Consistent E-commerce Pill Button */}
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
    </>
  );
}