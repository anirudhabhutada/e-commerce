import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { Instagram } from '../components/Icons';

export const AboutPage = () => {
  const { navigateTo } = useShop();

  return (
    <div className="about-page-wrapper section-padding">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">Our Story</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <div className="about-hero-header">
          <span className="section-eyebrow">The Kalaa Culture Story</span>
          <h1 className="about-main-title">
            Where Tradition Meets Modern Design.
          </h1>
          <p className="about-lead-text">
            Rooted in Mumbai’s historic heartlands, Kalaa Culture transforms centuries of sacred iconography, Maharashtrian cultural pride, and divine Ganesh Utsav memories into timeless, collectible design artifacts.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="about-narrative-grid">
          <div className="narrative-text">
            <h2 className="narrative-heading">The Genesis: Sacred Mumbai & Philatelic Art</h2>
            <p>
              In Mumbai, Ganesh Chaturthi is more than a festival—it is an emotion woven into the fabric of daily life. From the historic 105-year legacy of <strong>Chinchpoklicha Chintamani</strong> and the majestic presence of <strong>Lalbaugcha Raja</strong>, to the royal grace of <strong>Mumbai Cha Raja</strong> in Ganesh Galli and the heroic stance of <strong>Parelcha Raja</strong>, these deities embody spiritual refuge for millions.
            </p>
            <p>
              Yet, after the ten days of immersive celebration and visarjan, devotees often found themselves longing for tactile, dignified keepsakes that could live gracefully in modern homes, studios, and workspaces.
            </p>
            <p>
              Kalaa Culture was founded to fill this sacred space. By reimagining vintage postal stamps—classic symbols of communication, heritage, and timeless value—we created our signature line of <strong>philatelic stamp fridge magnets</strong>. Each piece is a miniature museum exhibit featuring authentic Devanagari calligraphy, postmark watermarks, and sacred mudras.
            </p>
          </div>
          <div className="narrative-image-card">
            <img src="/assets/mumbai_raja_table.jpg" alt="Mumbai Cha Raja stamp magnet on stone" className="narrative-img" />
            <span className="narrative-caption">The Signature Mumbai Cha Raja Special Edition Postage Magnet</span>
          </div>
        </div>

        {/* Logo Symbolism Breakdown */}
        <div className="about-emblem-section">
          <div className="emblem-card-inner">
            <div className="emblem-visual-col">
              <img 
                src="/assets/kalaa_logo_clean.png" 
                alt="Kalaa Culture Authentic Emblem" 
                className="emblem-symbol-img"
              />
            </div>
            <div className="emblem-text-col">
              <span className="section-eyebrow" style={{ color: 'var(--color-gold)' }}>Visual Identity</span>
              <h2 className="emblem-title">The Sacred Ligature in Our Emblem</h2>
              <p>
                Our emblem represents the soul of our craft. Handcrafted inside an auspicious crimson medallion rimmed with mandir gold, it features an ingenious Devanagari ligature:
              </p>
              <ul className="emblem-points-list">
                <li>
                  <Check size={18} color="#D4AF37" />
                  <span><strong>The Crown (Mukut):</strong> The upper arch evokes the royal crown of Maharashtra’s kings and Ganpatis.</span>
                </li>
                <li>
                  <Check size={18} color="#D4AF37" />
                  <span><strong>Devanagari 'क' (Ka):</strong> The upper loops form the Marathi letterform 'क' and the compassionate eyes of Ganesha.</span>
                </li>
                <li>
                  <Check size={18} color="#D4AF37" />
                  <span><strong>Devanagari 'ला' (Laa):</strong> The flowing curves beneath form 'ला' while sculpting the sacred trunk and cheeks, with a vermillion tilak at its core.</span>
                </li>
                <li>
                  <Check size={18} color="#D4AF37" />
                  <span><strong>Culture:</strong> Rooted in ancient tradition, built for the contemporary world.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Craftsmanship Standards */}
        <div className="about-standards-grid">
          <div className="standard-card">
            <div className="std-icon-box"><Sparkles size={24} /></div>
            <h3>Museum Archival Prints</h3>
            <p>We use UV-cured pigment inks that never fade, smudge, or yellow under household lighting or sunlight.</p>
          </div>

          <div className="standard-card">
            <div className="std-icon-box"><ShieldCheck size={24} /></div>
            <h3>3mm Cast Diamond Acrylic</h3>
            <p>Precision laser-cut with realistic stamp serrations, polished edges, and satin matte protective laminate.</p>
          </div>

          <div className="standard-card">
            <div className="std-icon-box"><Heart size={24} /></div>
            <h3>Heavy Neodymium Magnet</h3>
            <p>Permanently bonded rare-earth neodymium backing capable of holding multiple wedding invites and notes firmly.</p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="about-cta-strip">
          <h2>Bring Sacred Mumbai Heritage to Your Space</h2>
          <p>Discover our full collection of devotional stamp magnets, Pancharatna gift boxes, and vinyl stickers.</p>
          <button type="button" className="btn btn-gold btn-lg" onClick={() => navigateTo('shop')}>
            <span>Explore the Treasury</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
