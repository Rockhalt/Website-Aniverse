import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabaseService'; 

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/'); // Successfully verified, enter the Vault!
    }
  };

  return (
    <>
      {/* Premium Elite CSS matching your Signup Page */}
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          background-color: #030303; 
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .premium-card {
          background: #0a0a0a;
          border-left: 4px solid #ff4500; 
          border-top: 1px solid #1a1a1a;
          border-right: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          border-radius: 6px;
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9);
        }

        .premium-title {
  color: #fff;
  font-size: 2.5rem; /* Increased size to make the block letters hit harder */
  font-family: Impact, "Arial Black", sans-serif; /* Matching the Aniverse logo */
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 2rem 0;
}

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .premium-input {
          background: #111;
          border: 1px solid #222;
          color: #fff;
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          border-radius: 6px; 
          transition: all 0.3s ease;
        }

        .premium-input::placeholder {
          color: #555;
        }

        .premium-input:focus {
          outline: none;
          border-color: #ff4500;
          background: #151515;
          box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.2);
        }

        .premium-btn {
          background: #ff4500; 
          color: #fff;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          letter-spacing: 1px;
        }

        .premium-btn:hover:not(:disabled) {
          background: #ff4500;
          transform: translateY(-1px);
        }

        .premium-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
        }

        .error-message {
          color: #ff4444;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background: rgba(255, 68, 68, 0.1);
          border-radius: 4px;
          border-left: 2px solid #ff4444;
        }

        .auth-footer {
          color: #777;
          text-align: center;
          font-size: 0.9rem;
          margin-top: 1.5rem;
        }

        .auth-footer a {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
          margin-left: 5px;
        }

        .auth-footer a:hover {
          color: #ff4500;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="premium-card">
          <h2 className="premium-title">Sign in</h2>
          
          {/* This will explicitly show us WHY it is failing! */}
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={submit}>
            <div className="input-group">
              <input 
                className="premium-input"
                placeholder="Email" 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
              <input 
                className="premium-input"
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
            </div>
            
            <button type="submit" className="premium-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Sign in'}
            </button>
          </form>
          
          <div className="auth-footer">
            No account? <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}