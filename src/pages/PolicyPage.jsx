import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Lock, 
  FileText, 
  ChevronRight,
  Phone
} from 'lucide-react';

export const PolicyPage = ({ policyType }) => {
  const { navigateTo } = useShop();

  const getPolicyContent = () => {
    switch (policyType) {
      case 'shipping-policy':
        return {
          icon: <Truck size={32} color="#D4AF37" />,
          title: "Shipping & Delivery Policy",
          eyebrow: "Pan-India Logistics",
          content: (
            <>
              <h2>1. Dispatch & Processing Timelines</h2>
              <p>
                All Kalaa Culture collectibles are handcrafted and inspected at our studio in Mumbai, Maharashtra. Standard orders are dispatched within <strong>24 to 48 business hours</strong> from the time of order confirmation.
              </p>

              <h2>2. Delivery Transit Timelines</h2>
              <p>
                • <strong>Mumbai, Thane, Navi Mumbai & Pune:</strong> Delivered within 2 to 3 business days.<br />
                • <strong>Metro Cities (Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> Delivered within 3 to 5 business days.<br />
                • <strong>Rest of India:</strong> Delivered within 4 to 6 business days.
              </p>

              <h2>3. Shipping Charges</h2>
              <p>
                • <strong>Orders ₹{BRAND_INFO.shippingThreshold} and above:</strong> 100% Free Pan-India Delivery.<br />
                • <strong>Orders below ₹{BRAND_INFO.shippingThreshold}:</strong> A flat nominal shipping fee of ₹{BRAND_INFO.shippingCost} applies to cover premium bubble packaging and courier handling.
              </p>

              <h2>4. Packaging Standards</h2>
              <p>
                Every acrylic stamp magnet and plaque is individually sleeved in scratch-resistant poly film, layered in double-walled bubble cushioning, and shipped in rigid shock-proof cardboard cartons to prevent any transit damage.
              </p>
            </>
          )
        };

      case 'returns-policy':
        return {
          icon: <RefreshCw size={32} color="#D4AF37" />,
          title: "Returns & Replacement Policy",
          eyebrow: "Our Devotee Guarantee",
          content: (
            <>
              <h2>1. Transit Damage Guarantee</h2>
              <p>
                At Kalaa Culture, we treat our sacred collectibles with utmost reverence. In the unlikely event that your package arrives damaged, cracked, or missing items during transit, we provide a <strong>100% free immediate replacement</strong>.
              </p>

              <h2>2. How to Claim a Replacement</h2>
              <p>
                Please notify our Mumbai studio within <strong>48 hours of parcel delivery</strong> by sending an unboxing photo or short video to our WhatsApp (+91 78750 05963) or email (care@kalaaculture.com) along with your Order ID.
              </p>

              <h2>3. Non-Returnable Items</h2>
              <p>
                Due to the collectible, limited-run nature of our festive and personalized editions, returns for reasons other than physical transit defect or incorrect item delivery are not accepted.
              </p>
            </>
          )
        };

      case 'privacy-policy':
        return {
          icon: <Lock size={32} color="#D4AF37" />,
          title: "Privacy Policy",
          eyebrow: "Customer Data Protection",
          content: (
            <>
              <h2>1. Information We Collect</h2>
              <p>
                We only collect information necessary to fulfill and deliver your orders: your full name, shipping address, contact phone number, and email address for order notifications.
              </p>

              <h2>2. How We Protect Your Data</h2>
              <p>
                Your personal details are used strictly for order logistics, dispatch communications, and customer care. We never sell, rent, or lease your private data to third-party marketing brokers.
              </p>

              <h2>3. Payment Security</h2>
              <p>
                All online transactions and payment verifications are conducted over secure 256-bit encrypted channels. We do not store sensitive credit/debit card numbers or UPI PINs on our servers.
              </p>
            </>
          )
        };

      case 'terms':
      default:
        return {
          icon: <FileText size={32} color="#D4AF37" />,
          title: "Terms & Conditions",
          eyebrow: "Legal & Store Policies",
          content: (
            <>
              <h2>1. Intellectual Property & Brand Rights</h2>
              <p>
                All graphic compositions, Devanagari calligraphy arrangements, philatelic stamp design layouts, product photographs, and the Kalaa Culture logo emblem are the proprietary intellectual property of Kalaa Culture, Mumbai. Unauthorized reproduction or commercial reselling is strictly prohibited.
              </p>

              <h2>2. Product Representation</h2>
              <p>
                We strive to represent colors and dimensions with high fidelity. Slight nuances in color tone may occur due to varying smartphone/monitor display calibrations and natural lighting during festival photography.
              </p>

              <h2>3. Pricing & Availability</h2>
              <p>
                All prices listed are in Indian Rupees (INR) and are inclusive of applicable taxes. In cases of limited batch drops, items are allocated on a first-come, first-served basis.
              </p>
            </>
          )
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="policy-page-wrapper section-padding">
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">{policy.title}</li>
          </ol>
        </nav>

        <div className="policy-header-card">
          <div className="policy-icon-circle">{policy.icon}</div>
          <span className="section-eyebrow">{policy.eyebrow}</span>
          <h1 className="policy-main-title">{policy.title}</h1>
        </div>

        <div className="policy-content-body">
          {policy.content}
        </div>

        <div className="policy-support-strip">
          <p>
            Have questions regarding this policy? Contact our studio directly at <a href="tel:+917875005963">+91 78750 05963</a> or write to <a href="mailto:care@kalaaculture.com">care@kalaaculture.com</a>.
          </p>
        </div>

      </div>
    </div>
  );
};
