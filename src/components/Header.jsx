import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  ChevronRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Instagram } from './Icons';

export const Header = () => {
  const { 
    navigateTo, 
    route, 
    totalItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page, params = {}) => {
    navigateTo(page, params);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-wrapper" role="banner">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <div className="announcement-item">
            <Truck size={14} aria-hidden="true" />
            <span>Free Delivery across India on orders above ₹{BRAND_INFO.shippingThreshold}</span>
          </div>
          <div className="announcement-separator" aria-hidden="true">|</div>
          <div className="announcement-item highlight">
            <span>Use code <strong>GANPATI10</strong> for 10% off</span>
          </div>
          <div className="announcement-separator desktop-only" aria-hidden="true">|</div>
          <div className="announcement-item desktop-only">
            <Phone size={14} aria-hidden="true" />
            <a href="tel:+917875005963" aria-label="Customer service phone">+91 78750 05963</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="main-header">
        <div className="container main-header-inner">
          
          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Authentic Brand Logo & Wordmark */}
          <a 
            href="/" 
            className="brand-logo-link"
            onClick={(e) => { e.preventDefault(); handleNav('home'); }}
            aria-label="Kalaa Culture Home"
          >
            <div className="brand-logo-container">
              <img 
                src="/assets/kalaa_logo_clean.png" 
                alt="Kalaa Culture Authentic Emblem" 
                className="brand-logo-img"
                width="48"
                height="48"
                fetchPriority="high"
                decoding="sync"
              />
            </div>
            <div className="brand-wordmark-container">
              <span className="brand-title">KALAA CULTURE</span>
              <span className="brand-tagline">Where Tradition Meets Modern Design</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" role="navigation" aria-label="Primary Navigation">
            <ul className="nav-list">
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.page === 'home' ? 'active' : ''}`}
                  onClick={() => handleNav('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.page === 'shop' && !route.params.categoryId ? 'active' : ''}`}
                  onClick={() => handleNav('shop')}
                >
                  Shop All
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.params?.categoryId === 'stamp-magnets' ? 'active' : ''}`}
                  onClick={() => handleNav('shop', { categoryId: 'stamp-magnets' })}
                >
                  Stamp Magnets
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.params?.categoryId === 'collector-boxes' ? 'active' : ''}`}
                  onClick={() => handleNav('shop', { categoryId: 'collector-boxes' })}
                >
                  Collector Boxes
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.page === 'about' ? 'active' : ''}`}
                  onClick={() => handleNav('about')}
                >
                  Our Story
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className={`nav-link ${route.page === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNav('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            
            {/* Search Trigger Button */}
            <button 
              type="button" 
              className="action-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search collectibles"
              title="Search"
            >
              <Search size={21} />
            </button>

            {/* Wishlist Trigger */}
            <button 
              type="button" 
              className="action-icon-btn wishlist-btn"
              onClick={() => handleNav('shop')}
              aria-label={`Wishlist (${wishlist.length} items)`}
              title="Saved Items"
            >
              <Heart size={21} className={wishlist.length > 0 ? "filled-heart" : ""} />
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Cart Bag Trigger */}
            <button 
              type="button" 
              className="action-icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Bag (${totalItemCount} items)`}
              title="View Shopping Bag"
            >
              <ShoppingBag size={21} />
              {totalItemCount > 0 && (
                <span className="badge-count cart-badge">{totalItemCount}</span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <div className="mobile-drawer-header">
              <div className="brand-logo-container">
                <img 
                  src="/assets/kalaa_logo_clean.png" 
                  alt="Kalaa Culture" 
                  width="40" 
                  height="40" 
                />
              </div>
              <div className="drawer-title">
                <span className="name">KALAA CULTURE</span>
                <span className="sub">MUMBAI</span>
              </div>
              <button 
                type="button" 
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <button type="button" onClick={() => handleNav('home')}>
                <span>Home</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('shop')}>
                <span>Shop All Collectibles</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('shop', { categoryId: 'stamp-magnets' })}>
                <span>Stamp Fridge Magnets (₹100)</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('shop', { categoryId: 'collector-boxes' })}>
                <span>Mumbai Ganpati Box Sets</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('shop', { categoryId: 'heritage-decor' })}>
                <span>Heritage Keepsakes & Plaques</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('shop', { categoryId: 'stickers' })}>
                <span>Die-Cut Vinyl Stickers</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('about')}>
                <span>About Our Craft & Heritage</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('contact')}>
                <span>Contact & Bulk Orders</span>
                <ChevronRight size={18} />
              </button>
              <button type="button" onClick={() => handleNav('faq')}>
                <span>FAQs & Magnet Care</span>
                <ChevronRight size={18} />
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <a 
                href={BRAND_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="drawer-insta-btn"
              >
                <Instagram size={18} />
                <span>Follow @kalaaculture on Instagram</span>
              </a>
              <div className="drawer-contact-info">
                <p>Order assistance & WhatsApp:</p>
                <a href="tel:+917875005963" className="drawer-phone">
                  <Phone size={14} /> +91 78750 05963
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
