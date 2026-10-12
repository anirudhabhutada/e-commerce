import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';

export const FAQPage = () => {
  const { navigateTo } = useShop();

  const faqs = [
    {
      q: "What makes Kalaa Culture stamp fridge magnets unique?",
      a: "Our signature products are modeled after vintage postal stamps, combining philatelic collectible aesthetics with sacred Maharashtrian cultural iconography. Each magnet features authentic Devanagari calligraphy, iconic Mumbai Ganpati portraits (like Chinchpoklicha Chintamani and Mumbai Cha Raja), realistic die-cut stamp perforations, and our official @kalaaculture studio watermark."
    },
    {
      q: "What are the dimensions and materials of each magnet?",
      a: "Each standard stamp fridge magnet measures approximately 3.25\" × 2.4\" (8.25 cm × 6.1 cm) with a 3mm solid cast acrylic base. The surface is sealed with a satin-matte anti-glare scratch-resistant laminate, and the back is fitted with a permanent heavy-duty neodymium rare-earth magnet."
    },
    {
      q: "How strong is the magnetic hold? Will it slide off the fridge?",
      a: "Unlike flimsy rubber magnetic sheets, we use genuine N52 rare-earth neodymium magnets. Each piece has exceptional grip strength and can firmly hold 3 to 4 sheets of paper, wedding invitation cards, or photo prints on any steel refrigerator or metal cabinet without sliding down."
    },
    {
      q: "Are the magnets waterproof and easy to clean?",
      a: "Yes! The UV-cured archival pigment ink and protective acrylic seal make them water-resistant. You can effortlessly wipe them clean with a soft, slightly damp microfiber cloth if kitchen grease or dust settles on them."
    },
    {
      q: "What is included in the Mumbai Ganpati Pancharatna Box Set?",
      a: "The Pancharatna Box Set (₹449) is our premium gift edition containing all 5 iconic Mumbai Ganpatis: Lalbaugcha Raja, Chinchpoklicha Chintamani, Mumbai Cha Raja, Parelcha Raja, and Kalachowkicha Mahaganpati. It arrives in an artisan crimson rigid presentation box embossed with gold foil and an individual collector serial certificate."
    },
    {
      q: "Where do you ship, and what are the delivery charges?",
      a: "We ship all across India! Orders above ₹399 qualify for 100% FREE Pan-India delivery. For smaller orders, a nominal standard shipping fee of ₹49 applies. Orders are dispatched from our Mumbai studio within 24 to 48 business hours and typically arrive within 3 to 5 business days."
    },
    {
      q: "Can I order directly through WhatsApp or Instagram DM?",
      a: "Absolutely! Kalaa Culture originally began on Instagram (@kalaaculture). You can easily place orders on this website, or click the 'Instant Order via WhatsApp' button on any product page to chat directly with our studio team at +91 78750 05963."
    },
    {
      q: "Do you offer bulk pricing for Mandals, weddings, or corporate events?",
      a: "Yes! We regularly provide custom gift sets and bulk quantities for housing societies, Ganesh Mandals, wedding welcome hampers, and corporate festivities. Contact our studio via WhatsApp (+91 78750 05963) or the contact form for wholesale discounts."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="faq-page-wrapper section-padding">
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">Frequently Asked Questions</li>
          </ol>
        </nav>

        <div className="faq-header-card">
          <span className="section-eyebrow">Everything You Need to Know</span>
          <h1 className="faq-main-title">Frequently Asked Questions</h1>
          <p className="faq-sub-text">
            Find quick answers about our stamp magnets, neodymium strength, delivery timelines, and box set details.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                <button 
                  type="button" 
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer-pane animate-fade">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="faq-contact-cta">
          <div className="faq-cta-text">
            <h3>Still have questions?</h3>
            <p>Our studio team in Mumbai is available on WhatsApp to assist you.</p>
          </div>
          <div className="faq-cta-buttons">
            <a 
              href="https://wa.me/917875005963" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Studio (+91 78750 05963)</span>
            </a>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => navigateTo('contact')}
            >
              <span>Contact Page</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
