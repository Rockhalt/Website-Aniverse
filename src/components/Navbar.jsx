import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; 
import { supabase } from './supabaseService'; // Connect the Navbar to the database

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // This constantly listens to see if someone is logged in
  useEffect(() => {
    // Check the current status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for any logins or logouts
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Send them back to the login page after leaving
  };

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
          justify-content: space-between; 
          align-items: center;
          padding: 1.5rem 4rem; 
          transition: all 0.3s ease;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
          color: #ff4500; 
          text-decoration: none;
          letter-spacing: -1px;
          transform: scaleY(1.15); 
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
          cursor: pointer; /* Added pointer here directly in CSS! */
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
        .navbar-cart-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          position: relative; 
          padding: 0.5rem;
          transition: color 0.3s ease;
        }

        .navbar-cart-btn:hover {
          color: #888;
        }

        .cart-badge {
          position: absolute;
          top: 0px;
          right: -5px;
          background-color: #ff4500; 
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          height: 18px;
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%; 
        }

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
            display: none; 
          }
        }
      `}</style>

      <nav className={`aniverse-nav ${isScrolled ? 'scrolled' : ''}`}>
        
        {/* LEFT SIDE: Logo & Links ab ek hi container ke andar hain! */}
        <div className="nav-left">
          <a href="/" className="nav-logo">
            ANIVERSE
          </a>
          
          <div className="nav-links">
            {/* Root page */}
            <span className="nav-link" onClick={() => navigate('/shop/trending')}>TRENDING</span>
            <span className="nav-link" onClick={() => navigate('/shop/figures')}>FIGURES</span>
            <span className="nav-link" onClick={() => navigate('/shop/accessories')}>ACCESSORIES</span>
            <span className="nav-link" onClick={() => navigate('/shop/katana')}>KATANA</span>
            <span className="nav-link" onClick={() => navigate('/shop/clothes')}>CLOTHES</span>
          </div>
        </div>

        {/* RIGHT SIDE: Action Icons */}
        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

           {/* ✦ THE SMART PROFILE BUTTON ✦ */}
            {user ? (
              // If they ARE logged in, show a red LOGOUT button
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: '#ff4500', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}
              >
                LOG OUT
              </button>
            ) : (
              // If they ARE NOT logged in, show the normal profile icon and clicking it goes to Login
              <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            )}

          <button className="navbar-cart-btn" onClick={() => setIsCartOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </button>
        </div>

      </nav>
    </>
  );
}