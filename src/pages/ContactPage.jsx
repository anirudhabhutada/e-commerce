import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Instagram } from '../components/Icons';

export const ContactPage = () => {
  const { navigateTo, showToast } = useShop();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our studio team!', 'success');
  };

  return (
    <div className="contact-page-wrapper section-padding">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">Contact & Studio</li>
          </ol>
        </nav>

        <div className="contact-header">
          <span className="section-eyebrow">Connect With Our Studio</span>
          <h1 className="contact-title">We’d Love to Hear From You</h1>
          <p className="contact-desc">
            Have a question regarding bulk orders, custom mandal editions, delivery timelines, or artist collaborations? Reach out directly via our studio lines, WhatsApp, or Instagram.
          </p>
        </div>

        <div className="contact-main-grid">
          
          {/* Left Column: Direct Info */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              
              <div className="contact-info-item">
                <div className="contact-icon-box"><Phone size={22} /></div>
                <div>
                  <h3 className="info-title">Phone & WhatsApp Orders</h3>
                  <p className="info-desc">Direct lines for orders, inquiries, and customer care:</p>
                  <p className="info-val">
                    <a href="tel:+917875005963">+91 78750 05963</a> / <a href="tel:+917875900563">+91 78759 00563</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box"><Instagram size={22} /></div>
                <div>
                  <h3 className="info-title">Instagram Official</h3>
                  <p className="info-desc">DM us directly or explore new drops and reels:</p>
                  <p className="info-val">
                    <a href={BRAND_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
                      @kalaaculture
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box"><Mail size={22} /></div>
                <div>
                  <h3 className="info-title">Email Inquiries</h3>
                  <p className="info-desc">For corporate gifting and collaborations:</p>
                  <p className="info-val">
                    <a href="mailto:care@kalaaculture.com">care@kalaaculture.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box"><MapPin size={22} /></div>
                <div>
                  <h3 className="info-title">Studio & Dispatches</h3>
                  <p className="info-desc">Crafted and dispatched from:</p>
                  <p className="info-val">Mumbai, Maharashtra, India</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box"><Clock size={22} /></div>
                <div>
                  <h3 className="info-title">Support Hours</h3>
                  <p className="info-val">Monday – Saturday: 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              {/* Instant WhatsApp Button */}
              <div className="contact-whatsapp-box">
                <a 
                  href="https://wa.me/917875005963?text=Namaskar%20Kalaa%20Culture!%20I%20have%20an%20inquiry%20regarding%20your%20collectibles." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline full-width"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp (+91 78750 05963)</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h2 className="form-card-title">Send Our Studio a Message</h2>
              <p className="form-card-subtitle">We typically reply within 24 hours.</p>

              {submitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={44} color="#15803D" />
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. A representative from the Kalaa Culture studio will be in touch with you shortly.</p>
                  <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="contactName" className="form-label">Your Name *</label>
                      <input 
                        id="contactName"
                        type="text" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Rucha Joshi"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactPhone" className="form-label">Phone Number (Optional)</label>
                      <input 
                        id="contactPhone"
                        type="tel" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactEmail" className="form-label">Email Address *</label>
                    <input 
                      id="contactEmail"
                      type="email" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactSubject" className="form-label">Inquiry Subject</label>
                    <select 
                      id="contactSubject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="form-select"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bulk / Mandal Orders">Bulk Order / Mandal Gifting (50+ pcs)</option>
                      <option value="Order Tracking">Existing Order Tracking</option>
                      <option value="Custom Collaboration">Custom Design Collaboration</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactMessage" className="form-label">Message Details *</label>
                    <textarea 
                      id="contactMessage"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Share your inquiry, required quantities, or preferred mandal designs..."
                      className="form-textarea"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg full-width">
                    <Send size={18} />
                    <span>Send Message to Studio</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
