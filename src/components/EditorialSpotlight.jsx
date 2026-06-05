import React from 'react';

export function EditorialSpotlight() {
  return (
    <>
      <style>{`
        .spotlight-section {
          display: flex;
          background-color: #070707; /* Core brand black */
          min-height: 85vh; /* Takes up most of the screen */
          border-top: 1px solid #141414;
          border-bottom: 1px solid #141414;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        /* --- LEFT SIDE: EDITORIAL IMAGE --- */
        .spotlight-image-wrapper {
          flex: 1; /* Takes exactly half the screen */
          position: relative;
          background-color: #000;
          overflow: hidden;
        }

        .spotlight-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Dark luxury photo filter */
          filter: grayscale(30%) brightness(0.6) contrast(1.3) sepia(20%) hue-rotate(-15deg);
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .spotlight-image-wrapper:hover .spotlight-image {
          transform: scale(1.04);
        }

        /* A subtle gradient so the image fades smoothly into the background */
        .spotlight-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 70%, #070707 100%);
          pointer-events: none;
        }

        /* --- RIGHT SIDE: CONTENT & TYPOGRAPHY --- */
        .spotlight-content {
          flex: 1; /* Takes the other half */
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 6rem;
          color: #ffffff;
        }

        .spotlight-label {
          color: #dc2626; /* Signature Dark Red */
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .spotlight-label::before {
          content: "";
          display: block;
          width: 30px;
          height: 1px;
          background-color: #dc2626;
        }

        .spotlight-title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 4rem;
          line-height: 0.9;
          letter-spacing: -1px;
          margin: 0 0 1.5rem 0;
          text-transform: uppercase;
          transform: scaleY(1.1);
          transform-origin: left bottom;
        }

        .spotlight-description {
          color: #a3a3a3;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 90%;
          margin-bottom: 2.5rem;
        }

        /* Spec List (Materials, Sizing, etc.) */
        .spotlight-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
          border-top: 1px solid #1a1a1a;
          padding-top: 1.5rem;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .spec-title {
          color: #525252;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .spec-detail {
          color: #e5e5e5;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Action Buttons */
        .spotlight-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        /* HIGH-END PILL BUTTON (BRAND ORANGE) */
        .btn-preorder {
          background-color: #ff4500; /* Logo Color */
          color: #ffffff;
          border: 1px solid #ff4500;
          padding: 1rem 2.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 99px; /* Pill shaped curve */
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .btn-preorder:hover {
          background-color: #ffffff;
          color: #ff4500; /* Text flips to orange */
          border-color: #ffffff;
          box-shadow: 0 4px 20px rgba(255, 69, 0, 0.25); /* Subtle orange glow */
        }

        .btn-preorder svg {
          transition: transform 0.3s ease;
        }

        .spotlight-section:hover .btn-preorder svg {
          transform: translateX(4px);
        }

        .price-tag {
          font-size: 1.4rem;
          font-weight: 600;
          color: #ffffff;
        }

        /* --- RESPONSIVE MOBILE VIEW --- */
        @media (max-width: 1024px) {
          .spotlight-section {
            flex-direction: column; /* Stacks image on top of text */
          }
          
          .spotlight-image-wrapper {
            min-height: 50vh;
            flex: none;
          }

          .spotlight-gradient {
            background: linear-gradient(to bottom, transparent 60%, #070707 100%);
          }

          .spotlight-content {
            padding: 3rem 2rem;
            flex: none;
          }

          .spotlight-title {
            font-size: 3rem;
          }
          
          .spotlight-specs {
            grid-template-columns: 1fr; /* Single column specs on mobile */
          }
        }
      `}</style>

      <section className="spotlight-section">
        
        {/* Left: Editorial Image */}
        <div className="spotlight-image-wrapper">
          <img 
            src="images/Eyes.jpg" 
            alt="Editorial Campaign" 
            className="spotlight-image"
            loading="lazy"
          />
          <div className="spotlight-gradient"></div>
        </div>

        {/* Right: Product Story */}
        <div className="spotlight-content">
          <span className="spotlight-label">ARCHIVE SPOTLIGHT</span>
          
          <h2 className="spotlight-title">
            PROJECT: TSUKUYOMI <br />
            TACTICAL ANORAK
          </h2>
          
          <p className="spotlight-description">
            Engineered for absolute stealth and unrelenting elements. The Tsukuyomi Anorak features a matte-black waterproof shell, hidden internal harnessing, and ultra-dense embroidery. A strict limited-run release reserved for the elite. 
          </p>

          <div className="spotlight-specs">
            <div className="spec-item">
              <span className="spec-title">Material</span>
              <span className="spec-detail">3L Gore-Tex / Obsidian Nylon</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Hardware</span>
              <span className="spec-detail">Matte Black YKK Aquaguard</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Edition Size</span>
              <span className="spec-detail">Limited to 150 pieces worldwide</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Delivery</span>
              <span className="spec-detail">Ships Fall 2026</span>
            </div>
          </div>

          <div className="spotlight-actions">
            <button className="btn-preorder">
              Pre-Order Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <span className="price-tag">$345.00</span>
          </div>
        </div>

      </section>
    </>
  );
}