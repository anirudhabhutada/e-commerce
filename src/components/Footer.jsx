import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HeartHandshake,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Instagram } from './Icons';

export const Footer = () => {
  const { navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to Kalaa Culture Collector Circle!', 'success');
  };

  return (
    <footer className="footer-wrapper" role="contentinfo">
      
      {/* Brand Trust Strip */}
      <div className="footer-trust-strip">
        <div className="container trust-inner-grid">
          <div className="trust-card">
            <div className="trust-icon-box">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="trust-card-title">Authentic Philatelic Art</h4>
              <p className="trust-card-desc">Honoring Mumbai's revered Ganpatis with authentic Devanagari calligraphy</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="trust-card-title">Neodymium Strength</h4>
              <p className="trust-card-desc">Heavy-duty neodymium magnets that firmly hold on fridges and steel cabinets</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="trust-card-title">Pan-India Safe Delivery</h4>
              <p className="trust-card-desc">Carefully packed in bubble-wrapped secure boxes with tracking updates</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <HeartHandshake size={24} />
            </div>
            <div>
              <h4 className="trust-card-title">Born in Mumbai</h4>
              <p className="trust-card-desc">Designed, manufactured, and dispatched with pride from Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="footer-main">
        <div className="container footer-main-grid">
          
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img 
                src="/assets/kalaa_logo_clean.png" 
                alt="Kalaa Culture" 
                width="52" 
                height="52"
                className="footer-logo-img" 
              />
              <div>
                <span className="footer-brand-title">KALAA CULTURE</span>
                <span className="footer-brand-tagline">Where Tradition Meets Modern Design</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Kalaa Culture bridges sacred devotion and contemporary aesthetics. From iconic stamp fridge magnets to curated Ganpati collector editions, we craft timeless keepsakes that bring divine grace into modern living spaces.
            </p>
            <div className="footer-social-links">
              <a 
                href={BRAND_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Kalaa Culture on Instagram"
                title="Follow @kalaaculture on Instagram"
              >
                <Instagram size={20} />
                <span>@kalaaculture</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h3 className="footer-heading">Collections</h3>
            <ul className="footer-link-list">
              <li>
                <button type="button" onClick={() => navigateTo('shop', { categoryId: 'stamp-magnets' })}>
                  Stamp Fridge Magnets (₹100)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', { categoryId: 'collector-boxes' })}>
                  Pancharatna Box Sets
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', { categoryId: 'heritage-decor' })}>
                  Heritage Keepsakes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop', { categoryId: 'stickers' })}>
                  Waterproof Vinyl Stickers
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shop')}>
                  Browse All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="footer-col">
            <h3 className="footer-heading">Customer Care</h3>
            <ul className="footer-link-list">
              <li>
                <button type="button" onClick={() => navigateTo('about')}>
                  Our Heritage & Craft
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('contact')}>
                  Contact & Bulk Orders
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('faq')}>
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('shipping-policy')}>
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('returns-policy')}>
                  Returns & Replacement Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('privacy-policy')}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo('terms')}>
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col">
            <h3 className="footer-heading">Join the Collector Circle</h3>
            <p className="newsletter-desc">
              Subscribe to receive exclusive previews of limited-run Ganesh Utsav editions, new mandal drops, and festive discount coupons.
            </p>
            {subscribed ? (
              <div className="newsletter-success-box">
                <CheckCircle2 size={20} />
                <span>Thank you for subscribing! Check your inbox for updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form" noValidate>
                <div className="newsletter-input-group">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="newsletter-input"
                    aria-label="Email for newsletter"
                    required
                  />
                  <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}

            <div className="footer-direct-contact">
              <span className="contact-label">Direct Studio Support:</span>
              <div className="contact-row">
                <Phone size={15} />
                <a href="tel:+917875005963">+91 78750 05963</a> / <a href="tel:+917875900563">+91 78759 00563</a>
              </div>
              <div className="contact-row">
                <Mail size={15} />
                <a href="mailto:care@kalaaculture.com">care@kalaaculture.com</a>
              </div>
              <div className="contact-row">
                <MapPin size={15} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} KALAA CULTURE. All design and manufacturing rights reserved.
          </p>
          <div className="payment-badges-row">
            <span className="payment-tag">UPI</span>
            <span className="payment-tag">Google Pay</span>
            <span className="payment-tag">PhonePe</span>
            <span className="payment-tag">Paytm</span>
            <span className="payment-tag">RuPay</span>
            <span className="payment-tag">Visa / Mastercard</span>
            <span className="payment-tag">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
