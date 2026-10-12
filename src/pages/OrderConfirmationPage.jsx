import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  MapPin, 
  Phone, 
  ShoppingBag, 
  MessageCircle,
  Download,
  ArrowRight
} from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { lastOrder, navigateTo } = useShop();

  if (!lastOrder) {
    return (
      <div className="section-padding text-center">
        <div className="container">
          <h2>No Recent Order Found</h2>
          <p>You have not placed an order yet in this session.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigateTo('shop')}>
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppConfirmation = () => {
    const items = lastOrder.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ');
    const msg = `Namaskar! I placed order #${lastOrder.orderId} for ₹${lastOrder.grandTotal} (${items}). My shipping address is: ${lastOrder.customer.address}, ${lastOrder.customer.city}. Please confirm dispatch!`;
    window.open(`https://wa.me/917875005963?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="order-confirmation-wrapper section-padding">
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Success Header */}
        <div className="confirmation-header-card">
          <div className="success-icon-badge">
            <CheckCircle2 size={44} color="#15803D" />
          </div>
          <span className="confirmation-sub">Order Successfully Placed</span>
          <h1 className="confirmation-title">Thank You, {lastOrder.customer.fullName}!</h1>
          <p className="confirmation-desc">
            Your sacred collectibles have been reserved. An order summary has been logged for Order <strong>#{lastOrder.orderId}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="confirmation-receipt-card">
          
          <div className="receipt-meta-grid">
            <div className="receipt-meta-item">
              <span className="meta-label"><Package size={15} /> Order Number</span>
              <strong className="meta-val highlight">{lastOrder.orderId}</strong>
            </div>

            <div className="receipt-meta-item">
              <span className="meta-label"><Calendar size={15} /> Order Date</span>
              <strong className="meta-val">{lastOrder.date}</strong>
            </div>

            <div className="receipt-meta-item">
              <span className="meta-label"><Truck size={15} /> Dispatch Status</span>
              <strong className="meta-val text-success">Processing in Mumbai</strong>
            </div>

            <div className="receipt-meta-item">
              <span className="meta-label">Payment Method</span>
              <strong className="meta-val">{lastOrder.paymentMethod.toUpperCase()}</strong>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="receipt-address-section">
            <h3 className="receipt-section-title"><MapPin size={17} /> Shipping Address</h3>
            <p className="address-text">
              <strong>{lastOrder.customer.fullName}</strong><br />
              {lastOrder.customer.address}<br />
              {lastOrder.customer.landmark && `${lastOrder.customer.landmark}, `}
              {lastOrder.customer.city}, {lastOrder.customer.state} — {lastOrder.customer.pincode}<br />
              <Phone size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> Phone: {lastOrder.customer.phone}
            </p>
          </div>

          {/* Itemized Table */}
          <div className="receipt-items-section">
            <h3 className="receipt-section-title"><ShoppingBag size={17} /> Items Ordered</h3>
            <div className="receipt-items-list">
              {lastOrder.items.map((item) => (
                <div key={item.key} className="receipt-item-row">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="receipt-item-info">
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-sub">Qty: {item.quantity} • {item.variant}</span>
                  </div>
                  <span className="item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="receipt-totals-breakdown">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>₹{lastOrder.subtotal}</span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="totals-row discount">
                  <span>Discount</span>
                  <span>-₹{lastOrder.discount}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Delivery</span>
                <span>{lastOrder.shipping === 0 ? 'FREE' : `₹${lastOrder.shipping}`}</span>
              </div>
              <div className="totals-row grand-total">
                <span>Total Paid / Payable</span>
                <span>₹{lastOrder.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="receipt-actions-row">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={handleWhatsAppConfirmation}
            >
              <MessageCircle size={18} />
              <span>Confirm on Studio WhatsApp (+91 78750 05963)</span>
            </button>

            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => navigateTo('shop')}
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
