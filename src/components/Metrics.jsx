import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Metrics() {
  const navigate = useNavigate();

  // Auto-scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ 
      minHeight: '80vh', 
      paddingTop: '150px', 
      backgroundColor: '#0a0a0a', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <h1 style={{ 
        fontFamily: 'Impact, "Arial Black", sans-serif', 
        color: '#ff4500', 
        fontSize: '3rem', 
        letterSpacing: '2px',
        margin: '0 0 1rem 0'
      }}>
        VAULT METRICS
      </h1>
      
      <p style={{ color: '#888', letterSpacing: '1px', marginBottom: '3rem' }}>
        Global transmission data and advanced filters are currently encrypting...
      </p>

      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '1rem 2rem',
          backgroundColor: 'transparent',
          border: '1px solid #333',
          color: '#fff',
          cursor: 'pointer',
          letterSpacing: '2px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => { e.target.style.borderColor = '#ff4500'; e.target.style.color = '#ff4500'; }}
        onMouseOut={(e) => { e.target.style.borderColor = '#333'; e.target.style.color = '#fff'; }}
      >
        ← RETURN TO ARCHIVE
      </button>
    </div>
  );
}