import React, { useState, useEffect } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Trigger the blur effect when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Base Navbar Layout */
        .aniverse-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between; /* Pushes left and right groups apart */
          align-items: center;
          padding: 1.5rem 4rem; /* Generous padding for a premium layout */
          transition: all 0.3s ease;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          
          /* Deep matte black background */
          background-color: #070707; 
          border-bottom: 1px solid transparent;
        }

        /* Scrolled Glassmorphism Effect */
        .aniverse-nav.scrolled {
          background-color: rgba(7, 7, 7, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 1rem 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Left Side: Logo and Links */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        /* Blocky Tall Orange Logo */
        .nav-logo {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 2.4rem;
          color: #ff4500; /* Vibrant Orange */
          text-decoration: none;
          letter-spacing: -1px;
          transform: scaleY(1.15); /* Stretches the text vertically */
        }

        /* Text Links Group */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #d1d1d1;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #ff4500;
        }

        /* Right Side: Icons */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          position: relative;
        }

        .icon-btn:hover {
          color: #ff4500;
        }

        .icon-btn svg {
          width: 22px;
          height: 22px;
        }

        /* E-commerce Cart Badge */
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background-color: #ff4500;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          height: 18px;
          min-width: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #070707; /* Matches the deep black background */
        }

        /* Scrolled state border color adjustment for badge */
        .aniverse-nav.scrolled .cart-badge {
          border-color: transparent; 
        }

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .aniverse-nav, .aniverse-nav.scrolled {
            padding: 1rem 2rem;
          }
          .nav-left {
            gap: 2rem;
          }
          .nav-links {
            display: none; /* Hide text links on smaller screens */
          }
        }
      `}</style>

      <nav className={`aniverse-nav ${isScrolled ? 'scrolled' : ''}`}>
        
        {/* LEFT SIDE: Logo & Links */}
        <div className="nav-left">
          <a href="/" className="nav-logo">
            ANIVERSE
          </a>

          <ul className="nav-links">
            <li><a href="#trending" className="nav-link">TRENDING</a></li>
            <li><a href="#figures" className="nav-link">FIGURES</a></li>
            <li><a href="#accessories" className="nav-link">ACCESSORIES</a></li>
            <li><a href="#katana" className="nav-link">KATANA</a></li>
            <li><a href="#t-shirt" className="nav-link">T-SHIRT</a></li>
          </ul>
        </div>

        {/* RIGHT SIDE: Action Icons */}
        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button className="icon-btn" aria-label="Profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <button className="icon-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="cart-badge">2</span>
          </button>
        </div>

      </nav>
    </>
  );
}