import React, { useState, useEffect } from 'react';

// Expanded 7-item slide data tailored for a premium anime e-commerce store
const slides = [
  {
    id: 1,
    tag: "FEATURED COLLECTION",
    title: "UCHIHA LEGACY",
    rating: "4.95",
    year: "2026",
    certification: "LIMITED EDITION",
    genres: ["APPAREL", "FIGURES", "PROPS"],
    description: "Embrace the shadows with our exclusive line of premium merchandise. Featuring masterfully crafted scale figures and ultra-dark, heavyweight apparel inspired by the legendary clan. Designed with deep blacks and subtle crimson highlights.",
    bgImage: "images/UchihaLegacy.jpg",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 2,
    tag: "NEW ARRIVAL",
    title: "SHINOBI GEAR",
    rating: "4.80",
    year: "2026",
    certification: "BEST SELLER",
    genres: ["ACCESSORIES", "JEWELRY"],
    description: "Upgrade your arsenal with 1:1 scale replicas and premium metallic accessories. Forged in matte black and metallic gold finishes, these pieces are the ultimate addition to any high-end collection.",
    bgImage: "images/Hokage.jpg",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 3,
    tag: "RESTOCKED",
    title: "CURSED ENERGY",
    rating: "5.00",
    year: "2026",
    certification: "PREMIUM TIER",
    genres: ["FIGURES", "HOME DECOR"],
    description: "The highly anticipated domain expansion desk mats and infinity scale figures are back in stock. Elevate your setup with these meticulously detailed, high-contrast pieces before they vanish again.",
    bgImage: "images/CursedEnergy.jpg",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 4,
    tag: "EXCLUSIVE DROP",
    title: "HOLLOWFICATION",
    rating: "4.90",
    year: "2026",
    certification: "LIMITED RUN",
    genres: ["PROP REPLICAS", "APPAREL"],
    description: "Surrender to the void. Discover our meticulously crafted matte black hollow masks and monochrome streetwear. Designed for those who walk the line between realms.",
    bgImage: "images/Hollowfication.jpg",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 5,
    tag: "PRE-ORDER NOW",
    title: "THE FOUNDING",
    rating: "4.98",
    year: "2026",
    certification: "COLLECTOR'S EDITION",
    genres: ["PREMIUM FIGURES", "MANGA"],
    description: "Witness the rumbling. Secure your towering 1/4 scale titan statues and heavyweight scout cloaks. A tribute to absolute freedom, forged in ultimate darkness.",
    bgImage: "images/Founding.jpg",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 6,
    tag: "TRENDING",
    title: "DEMON BANE",
    rating: "4.85",
    year: "2026",
    certification: "ELITE TIER",
    genres: ["KATANA", "HOME DECOR"],
    description: "Breathe with absolute focus. Featuring carbon steel Nichirin replicas and metallic displate art. Elevate your sanctum with the ultimate tools of the Hashira.",
    bgImage: "images/DemonBane.webp",
    primaryBtn: "SHOP NOW",
    secondaryBtn: "DETAILS"
  },
  {
    id: 7,
    tag: "MEMBER EXCLUSIVE",
    title: "THE PHANTOM",
    rating: "5.00",
    year: "2026",
    certification: "THE VAULT",
    genres: ["STREETWEAR", "JEWELRY"],
    description: "Join the spider. Access our most restricted collection of obsidian rings, chain accessories, and elite darkwear. Reserved strictly for Aniverse Vault members.",
    bgImage: "images/ThePhantom.jpg",
    primaryBtn: "UNLOCK ACCESS",
    secondaryBtn: "JOIN MEMBERSHIP"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect: Changes every 4000ms (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    
    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        /* Main Container */
        .hero-container {
          position: relative;
          width: 100%;
          height: 95vh;
          background-color: #070707;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Individual Slide Wrapper */
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          z-index: 1;
        }

        .slide.active {
          opacity: 1;
          z-index: 2;
        }

        /* Background Image & Gradients */
        .slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1);
          transition: transform 4s linear;
        }
        
        .slide.active .slide-bg {
          transform: scale(1.03);
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to right, rgba(7, 7, 7, 0.95) 0%, rgba(7, 7, 7, 0.6) 45%, rgba(7, 7, 7, 0.1) 100%),
            linear-gradient(to top, rgba(7, 7, 7, 1) 0%, rgba(7, 7, 7, 0) 30%);
        }

        /* Content Positioning */
        .hero-content {
          position: absolute;
          bottom: 15%;
          left: 4rem;
          max-width: 700px;
          color: #ffffff;
          z-index: 3;
        }

        /* Small Orange Tag */
        .hero-tag {
          display: inline-block;
          background-color: #ff4500;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 0.3rem 0.6rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
          border-radius: 2px;
        }

        /* Massive Blocky Title */
        .hero-title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 5.5rem;
          line-height: 0.9;
          margin: 0 0 1.2rem 0;
          text-transform: uppercase;
          letter-spacing: -1px;
          transform: scaleY(1.1);
          transform-origin: left bottom;
        }

        /* Metadata Row (Rating, Year, Tags) */
        .hero-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
          color: #d1d1d1;
        }

        .meta-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #ffffff;
        }

        .meta-star {
          color: #ff4500;
          font-size: 0.9rem;
        }

        .meta-pills {
          display: flex;
          gap: 0.5rem;
        }

        .meta-pill {
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 0.2rem 0.6rem;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Description Paragraph */
        .hero-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #b0b0b0;
          margin-bottom: 2.5rem;
          max-width: 90%;
        }

        /* Action Buttons */
        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.8rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        /* Primary Button (White) */
        .btn-primary {
          background-color: #ffffff;
          color: #000000;
        }
        
        .btn-primary:hover {
          background-color: #e0e0e0;
          transform: scale(1.02);
        }

        /* Secondary Button (Dark Glass) */
        .btn-secondary {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          backdrop-filter: blur(4px);
        }

        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .hero-content {
            left: 2rem;
            bottom: 10%;
          }
          .hero-title {
            font-size: 3.5rem;
          }
        }
      `}</style>

      <section className="hero-container">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide ${index === current ? 'active' : ''}`}
          >
            {/* Background Image & Shadow Overlays */}
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="slide-overlay" />

            {/* Slide Content */}
            <div className="hero-content">
              
              <span className="hero-tag">{slide.tag}</span>
              
              <h1 className="hero-title">{slide.title}</h1>
              
              <div className="hero-meta">
                <div className="meta-rating">
                  <span className="meta-star">★</span> {slide.rating}
                </div>
                <span>{slide.year}</span>
                <span>{slide.certification}</span>
                
                <div className="meta-pills">
                  {slide.genres.map(genre => (
                    <span key={genre} className="meta-pill">{genre}</span>
                  ))}
                </div>
              </div>

              <p className="hero-desc">
                {slide.description}
              </p>

              <div className="hero-actions">
                <button className="btn-primary">
                  {/* Shopping Bag / Play Icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {slide.primaryBtn}
                </button>
                
                <button className="btn-secondary">
                  {/* Info Icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  {slide.secondaryBtn}
                </button>
              </div>

            </div>
          </div>
        ))}
      </section>
    </>
  );
}