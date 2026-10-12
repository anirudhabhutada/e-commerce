import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, BRAND_INFO } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Check, 
  ShoppingBag,
  ExternalLink,
  Star
} from 'lucide-react';
import { Instagram } from '../components/Icons';

export const HomePage = () => {
  const { navigateTo, addToCart } = useShop();

  const bestsellers = PRODUCTS.filter(p => p.tag === 'Bestseller' || p.tag === 'Most Loved').slice(0, 4);
  const stampMagnets = PRODUCTS.filter(p => p.category === 'stamp-magnets').slice(0, 4);
  const boxSet = PRODUCTS.find(p => p.id === 'mumbai-ganpati-pancharatna-box-set');

  const instagramPosts = [
    {
      img: '/assets/mumbai_raja_table.webp',
      title: 'Mumbai Cha Raja • Special Edition',
      subtitle: 'Postage stamp fridge magnet on stone marble',
      link: BRAND_INFO.instagramUrl
    },
    {
      img: '/assets/mumbai_raja_sky.webp',
      title: 'Classic Darshan • Azure Sky',
      subtitle: 'Revered idol against Mumbai sky',
      link: BRAND_INFO.instagramUrl
    },
    {
      img: '/assets/parel_raja_special.webp',
      title: 'गगनी झळकला परळचा राजा',
      subtitle: 'Standing king at sunset horizon',
      link: BRAND_INFO.instagramUrl
    },
    {
      img: '/assets/chintamani_sky.webp',
      title: 'Chinchpoklicha Chintamani • 105 Years',
      subtitle: 'Sacred Sudarshan hand mudra',
      link: BRAND_INFO.instagramUrl
    },
    {
      img: '/assets/parel_raja_feta.webp',
      title: 'परळचा राजा • शाही फेटा',
      subtitle: 'Soulful eyes & Marathi poetry keepsake',
      link: BRAND_INFO.instagramUrl
    },
    {
      img: '/assets/lalbaugcha_raja.webp',
      title: 'Lalbaugcha Raja Darshan',
      subtitle: 'King of Lalbaug golden throne',
      link: BRAND_INFO.instagramUrl
    }
  ];

  return (
    <div className="homepage-wrapper">
      
      {/* Hero Section */}
      <section className="hero-section" aria-label="Welcome Hero">
        <div className="container hero-container">
          
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">Authentic Mumbai Cultural Collectibles</span>
            </div>

            <h1 className="hero-title">
              Where Tradition Meets Modern Design.
            </h1>

            <p className="hero-subtitle">
              Collectible philatelic postage-stamp fridge magnets honoring the sacred Ganpatis of Mumbai. Handcrafted with precision die-cut acrylic, archival inks, and heavy-duty neodymium magnets.
            </p>

            <div className="hero-cta-group">
              <button 
                type="button" 
                className="btn btn-gold btn-lg"
                onClick={() => navigateTo('shop', { categoryId: 'stamp-magnets' })}
              >
                <span>Shop Stamp Magnets (₹100)</span>
                <ArrowRight size={18} />
              </button>

              <button 
                type="button" 
                className="btn btn-outline btn-lg hero-outline-btn"
                onClick={() => navigateTo('product', { id: 'mumbai-ganpati-pancharatna-box-set' })}
              >
                <span>5-Mandal Box Set (Save ₹101)</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="hero-trust-indicators">
              <div className="trust-indicator-item">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <span className="indicator-label"><strong>4.9/5</strong> Rating from 750+ Devotees</span>
              </div>
              <div className="trust-indicator-divider"></div>
              <div className="trust-indicator-item">
                <ShieldCheck size={18} color="#D4AF37" />
                <span className="indicator-label">Neodymium Magnetic Grip Guarantee</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Spotlight */}
          <div className="hero-visual-card">
            <div className="hero-card-inner">
              <div className="hero-image-stamp-frame">
                <img 
                  src="/assets/mumbai_raja_table.webp" 
                  alt="Mumbai Cha Raja Special Edition Stamp Fridge Magnet by Kalaa Culture"
                  className="hero-main-img"
                  width="480"
                  height="480"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              {/* Floating Highlight Card */}
              <div className="hero-floating-badge">
                <div className="floating-badge-thumb">
                  <img src="/assets/chintamani_sky.webp" alt="Chintamani magnet" width="56" height="56" />
                </div>
                <div className="floating-badge-info">
                  <span className="floating-badge-sub">2026 Collector Series</span>
                  <span className="floating-badge-name">Chinchpoklicha Chintamani</span>
                  <span className="floating-badge-price">₹100 each</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid Bar */}
      <section className="categories-strip-section" aria-label="Product Categories">
        <div className="container">
          <div className="category-cards-grid">
            
            <div 
              className="category-pill-card"
              onClick={() => navigateTo('shop', { categoryId: 'stamp-magnets' })}
              role="button"
              tabIndex={0}
            >
              <div className="cat-img-box">
                <img src="/assets/mumbai_raja_sky.webp" alt="Stamp Fridge Magnets" loading="lazy" decoding="async" width="72" height="72" />
              </div>
              <div className="cat-text-box">
                <span className="cat-tag">Signature Line</span>
                <h3 className="cat-title">Stamp Fridge Magnets</h3>
                <span className="cat-price-from">From ₹100 • 6 Deities</span>
              </div>
              <ArrowRight size={18} className="cat-arrow" />
            </div>

            <div 
              className="category-pill-card highlight"
              onClick={() => navigateTo('shop', { categoryId: 'collector-boxes' })}
              role="button"
              tabIndex={0}
            >
              <div className="cat-img-box">
                <img src="/assets/mumbai_raja_table.webp" alt="Collector Box Sets" loading="lazy" decoding="async" width="72" height="72" />
              </div>
              <div className="cat-text-box">
                <span className="cat-tag">Gift Edition</span>
                <h3 className="cat-title">Pancharatna Box Sets</h3>
                <span className="cat-price-from">₹449 (Save ₹101)</span>
              </div>
              <ArrowRight size={18} className="cat-arrow" />
            </div>

            <div 
              className="category-pill-card"
              onClick={() => navigateTo('shop', { categoryId: 'heritage-decor' })}
              role="button"
              tabIndex={0}
            >
              <div className="cat-img-box">
                <img src="/assets/mahaganpati_studio.webp" alt="Heritage Keepsakes" loading="lazy" decoding="async" width="72" height="72" />
              </div>
              <div className="cat-text-box">
                <span className="cat-tag">Cultural Art</span>
                <h3 className="cat-title">Heritage Keepsakes</h3>
                <span className="cat-price-from">From ₹119 • Acrylic Plaques</span>
              </div>
              <ArrowRight size={18} className="cat-arrow" />
            </div>

            <div 
              className="category-pill-card"
              onClick={() => navigateTo('shop', { categoryId: 'stickers' })}
              role="button"
              tabIndex={0}
            >
              <div className="cat-img-box">
                <img src="/assets/parel_raja_feta.webp" alt="Die-Cut Stickers" loading="lazy" decoding="async" width="72" height="72" />
              </div>
              <div className="cat-text-box">
                <span className="cat-tag">Waterproof</span>
                <h3 className="cat-title">Die-Cut Stickers</h3>
                <span className="cat-price-from">Pack of 6 • ₹89</span>
              </div>
              <ArrowRight size={18} className="cat-arrow" />
            </div>

          </div>
        </div>
      </section>

      {/* Bestselling Products Section */}
      <section className="section-padding bestsellers-section" aria-label="Bestselling Collectibles">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Devotional Flagship Series</span>
            <h2 className="section-title">Most Revered Collectibles</h2>
            <p className="section-description">
              Our iconic postal stamp magnets are designed to capture the divine majesty of Mumbai's Ganesh Mandals with museum-grade precision.
            </p>
          </div>

          <div className="products-grid">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-bottom-action">
            <button 
              type="button" 
              className="btn btn-outline btn-lg"
              onClick={() => navigateTo('shop')}
            >
              <span>Explore All 12 Collectibles</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Spotlight Feature: Pancharatna Collector Box Set */}
      {boxSet && (
        <section className="section-padding box-spotlight-section" aria-label="Collector Box Spotlight">
          <div className="container">
            <div className="spotlight-card">
              
              <div className="spotlight-visual">
                <div className="spotlight-stamp-grid">
                  <img src="/assets/mumbai_raja_table.webp" alt="Mumbai Cha Raja" className="spotlight-sub-img i1" loading="lazy" decoding="async" width="180" height="180" />
                  <img src="/assets/chintamani_sky.webp" alt="Chinchpokli Chintamani" className="spotlight-sub-img i2" loading="lazy" decoding="async" width="180" height="180" />
                  <img src="/assets/parel_raja_special.webp" alt="Parelcha Raja" className="spotlight-sub-img i3" loading="lazy" decoding="async" width="180" height="180" />
                  <img src="/assets/lalbaugcha_raja.webp" alt="Lalbaugcha Raja" className="spotlight-sub-img i4" loading="lazy" decoding="async" width="180" height="180" />
                </div>
                <div className="spotlight-ribbon">
                  <span>5-Piece Complete Mandal Treasury</span>
                </div>
              </div>

              <div className="spotlight-content">
                <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>Limited Festive Box</span>
                <h2 className="spotlight-title">
                  Mumbai Ganpati Pancharatna Box Set
                </h2>
                <p className="spotlight-marathi devanagari-text">
                  मुंबई गणपती पंचरत्न भेटपेटी (५ स्टॅम्प मॅग्नेट्स)
                </p>
                <p className="spotlight-desc">
                  Bring the spiritual heartbeat of Lalbaug, Chinchpokli, Ganesh Galli, Parel, and Kalachowki into your home. Each set includes all 5 iconic stamp magnets encased in a luxury gold-embossed crimson gift box with individual serial numbers.
                </p>

                <div className="spotlight-features-list">
                  <div className="spotlight-feature-item">
                    <Check size={18} color="#D4AF37" />
                    <span>Includes Lalbaugcha Raja, Chintamani, Mumbai Cha Raja, Parelcha Raja & Mahaganpati</span>
                  </div>
                  <div className="spotlight-feature-item">
                    <Check size={18} color="#D4AF37" />
                    <span>Rigid Crimson Box with Gold Foil Seal & Certificate of Authenticity</span>
                  </div>
                  <div className="spotlight-feature-item">
                    <Check size={18} color="#D4AF37" />
                    <span>Special Collector Bundle Price: ₹449 (MRP ₹550 — Save ₹101)</span>
                  </div>
                </div>

                <div className="spotlight-action-row">
                  <div className="spotlight-price-box">
                    <span className="spotlight-current-price">₹449</span>
                    <span className="spotlight-original-price">₹550</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-gold btn-lg"
                    onClick={() => addToCart(boxSet, 1)}
                  >
                    <ShoppingBag size={18} />
                    <span>Add Box Set to Bag</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Brand Heritage Craft Section */}
      <section className="section-padding heritage-story-section" aria-label="Brand Story and Craft">
        <div className="container">
          <div className="heritage-story-grid">
            
            <div className="heritage-text-col">
              <span className="section-eyebrow">The Kalaa Culture Philosophy</span>
              <h2 className="heritage-title">
                The Heritage of Philately Reborn in Modern Sacred Art
              </h2>
              <p className="heritage-body">
                For over a century, Mumbai's Ganesh Utsav has been an unparalleled convergence of devotion, art, community, and grandeur. Millions throng the streets of Lalbaug and Parel each year to seek blessings from the divine mudras of the Rajas and Chintamani.
              </p>
              <p className="heritage-body">
                At <strong>Kalaa Culture</strong>, we asked: Why should such transcendent devotion be relegated to ephemeral calendar prints? Inspired by vintage postal philately, we conceived collectible stamp fridge magnets—durable, tactile keepsakes featuring authentic Devanagari calligraphy, iconic idol portraits, and heavy-duty neodymium magnets.
              </p>
              
              <div className="heritage-stats-row">
                <div className="stat-item">
                  <span className="stat-number">3mm</span>
                  <span className="stat-label">Cast Diamond Acrylic</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Water & UV Proof</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">N52</span>
                  <span className="stat-label">Neodymium Strength</span>
                </div>
              </div>
            </div>

            <div className="heritage-visual-col">
              <div className="heritage-visual-stack">
                <img 
                  src="/assets/parel_raja_feta.webp" 
                  alt="Parelcha Raja Royal Feta Stamp Magnet" 
                  className="heritage-stack-img primary"
                  loading="lazy"
                  decoding="async"
                />
                <img 
                  src="/assets/lalbaugcha_raja_sky.webp" 
                  alt="Holding stamp magnet outdoors" 
                  className="heritage-stack-img secondary"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Authentic Instagram Gallery */}
      <section className="section-padding instagram-gallery-section" aria-label="Instagram Community Showcase">
        <div className="container">
          
          <div className="instagram-section-header">
            <div>
              <span className="section-eyebrow">Direct from our Studio</span>
              <h2 className="section-title">Follow @kalaaculture on Instagram</h2>
              <p className="section-description">
                Join 7,650+ devotees and art collectors celebrating Mumbai's festival culture. Tag <strong>#KalaaCulture</strong> to be featured.
              </p>
            </div>
            <a 
              href={BRAND_INFO.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              <Instagram size={18} />
              <span>Visit Official Instagram</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="instagram-grid">
            {instagramPosts.map((post, idx) => (
              <a 
                key={idx} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="instagram-tile"
                aria-label={post.title}
              >
                <img src={post.img} alt={post.title} loading="lazy" />
                <div className="instagram-tile-overlay">
                  <Instagram size={28} className="insta-overlay-icon" />
                  <span className="insta-overlay-title">{post.title}</span>
                  <span className="insta-overlay-sub">{post.subtitle}</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
