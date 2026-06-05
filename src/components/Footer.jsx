import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* Main Footer Container */
        .aniverse-footer {
          background-color: #070707; /* Matches your navbar's deep black */
          border-top: 1px solid #141414; /* Very subtle line to separate from content */
          padding: 5rem 2rem 4rem; /* Generous breathing room */
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Centered Brand Logo */
        .footer-logo {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 2rem;
          color: #ff4500; /* Vibrant Orange */
          text-decoration: none;
          letter-spacing: -1px;
          transform: scaleY(1.15); /* Stretches vertically just like the navbar */
          margin-bottom: 2rem;
        }

        /* Links Container */
        .footer-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
          margin: 0 0 2.5rem 0;
          padding: 0;
        }

        /* Individual Links */
        .footer-link {
          color: #737373; /* Muted gray from your screenshot */
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #ff4500; /* Highlights orange on hover */
        }

        /* Copyright Text */
        .footer-copyright {
          color: #4a4a4a; /* Even darker gray so it recedes into the background */
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin: 0;
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
          .footer-links {
            gap: 1.5rem;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <footer className="aniverse-footer">
        
        {/* Brand Logo */}
        <a href="/" className="footer-logo">
          ANIVERSE
        </a>

        {/* Center Links */}
        <ul className="footer-links">
          <li><a href="#privacy" className="footer-link">Privacy</a></li>
          <li><a href="#terms" className="footer-link">Terms</a></li>
          <li><a href="#contact" className="footer-link">Contact</a></li>
          <li><a href="#api" className="footer-link">API</a></li>
        </ul>

        {/* Copyright */}
        <p className="footer-copyright">
          &copy; {currentYear} Aniverse Media Group. All rights reserved.
        </p>

      </footer>
    </>
  );
}