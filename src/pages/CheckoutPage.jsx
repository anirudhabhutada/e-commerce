import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  ShieldCheck, 
  Truck, 
  ChevronRight, 
  Lock, 
  CreditCard, 
  QrCode, 
  Banknote, 
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Info
} from 'lucide-react';

export const CheckoutPage = () => {
  const { 
    cart, 
    subtotal, 
    discount, 
    shipping, 
    grandTotal, 
    appliedCoupon, 
    navigateTo, 
    clearCart, 
    setLastOrder,
    showToast 
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'cod', 'card'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="checkout-empty section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Your bag is empty</h2>
          <p>Please add items to your shopping bag before proceeding to checkout.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigateTo('shop')}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required for tracking updates';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit mobile number required for courier dispatch';
    if (!formData.address.trim()) errs.address = 'Street delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = 'Valid 6-digit PIN code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill in all required shipping details correctly', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `KC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderRecord = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        customer: formData,
        paymentMethod,
        items: [...cart],
        subtotal,
        discount,
        couponCode: appliedCoupon?.code || null,
        shipping,
        grandTotal,
        status: paymentMethod === 'cod' ? 'Confirmed (Cash on Delivery)' : 'Payment Verified (Demo Environment)'
      };

      setLastOrder(orderRecord);
      clearCart();
      setIsSubmitting(false);
      showToast(`Order #${orderId} confirmed successfully!`, 'success');
      navigateTo('order-confirmation');
    }, 1200);
  };

  return (
    <div className="checkout-page-wrapper section-padding">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li><button type="button" onClick={() => navigateTo('cart')}>Shopping Bag</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">Checkout</li>
          </ol>
        </nav>

        <div className="checkout-title-row">
          <h1 className="checkout-main-heading">Secure Checkout</h1>
          <div className="security-tag">
            <Lock size={15} />
            <span>256-bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="checkout-layout-grid" noValidate>
          
          {/* Left Column: Delivery & Payment Details */}
          <div className="checkout-forms-column">
            
            {/* Step 1: Customer Contact */}
            <div className="checkout-section-card">
              <div className="card-header-row">
                <span className="step-num">1</span>
                <h2 className="step-title">Customer Contact Details</h2>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <input 
                    id="fullName"
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tanmay Deshmukh"
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                    required
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Mobile Number *</label>
                  <input 
                    id="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number for courier OTP"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    required
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="order-receipt@domain.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  required
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="checkout-section-card">
              <div className="card-header-row">
                <span className="step-num">2</span>
                <h2 className="step-title">Delivery Address (Pan-India)</h2>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Street Address / Flat / Building *</label>
                <input 
                  id="address"
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat No, Building, Street Name, Area"
                  className={`form-input ${errors.address ? 'input-error' : ''}`}
                  required
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City *</label>
                  <input 
                    id="city"
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`form-input ${errors.city ? 'input-error' : ''}`}
                    required
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">State *</label>
                  <select 
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="form-select"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Goa">Goa</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other States">Other Indian State</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pincode" className="form-label">PIN Code *</label>
                  <input 
                    id="pincode"
                    type="text" 
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="400012"
                    className={`form-input ${errors.pincode ? 'input-error' : ''}`}
                    required
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="landmark" className="form-label">Landmark / Delivery Instructions (Optional)</label>
                <input 
                  id="landmark"
                  type="text" 
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Near temple, metro station, or office gate"
                  className="form-input"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="checkout-section-card">
              <div className="card-header-row">
                <span className="step-num">3</span>
                <h2 className="step-title">Select Payment Mode</h2>
              </div>

              <div className="payment-options-grid">
                
                {/* UPI Option */}
                <label className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="upi" 
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div className="payment-option-content">
                    <div className="payment-head">
                      <QrCode size={20} color="#7B1123" />
                      <strong>UPI Instant Pay / QR</strong>
                      <span className="rec-tag">Recommended</span>
                    </div>
                    <p className="payment-sub">GPay, PhonePe, Paytm, BHIM or any Indian UPI app</p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div className="payment-option-content">
                    <div className="payment-head">
                      <Banknote size={20} color="#7B1123" />
                      <strong>Cash on Delivery (COD)</strong>
                    </div>
                    <p className="payment-sub">Pay in cash or UPI when the courier arrives at your doorstep</p>
                  </div>
                </label>

                {/* Cards & NetBanking */}
                <label className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="payment-option-content">
                    <div className="payment-head">
                      <CreditCard size={20} color="#7B1123" />
                      <strong>Debit / Credit Card & NetBanking</strong>
                    </div>
                    <p className="payment-sub">All major Indian banks, RuPay, Visa, Mastercard</p>
                  </div>
                </label>

              </div>

              {/* Technical Integration Notice */}
              <div className="payment-integration-notice">
                <Info size={16} />
                <div>
                  <strong>Store Configuration Notice:</strong>
                  <p>
                    This digital flagship store is configured with a secure testing/sandbox flow. In live deployment, seamless payment routing connects via verified gateway credentials (Razorpay / Cashfree / PhonePe PG). For immediate manual order confirmation, you can also connect directly with the studio via WhatsApp.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="checkout-summary-column">
            <div className="checkout-order-summary-card">
              <h2 className="summary-heading">Items in Order ({cart.length})</h2>

              <div className="checkout-items-preview-list">
                {cart.map((item) => (
                  <div key={item.key} className="checkout-item-preview-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="item-info-col">
                      <span className="item-title">{item.product.name}</span>
                      <span className="item-qty-tag">Qty: {item.quantity} {item.variant !== 'Standard' ? `(${item.variant})` : ''}</span>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary-cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="cost-row discount">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="cost-row">
                  <span>Pan-India Delivery</span>
                  <span>{shipping === 0 ? <strong className="free-shipping-tag">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="cost-row total-row">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg full-width checkout-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <span>Place Order • ₹{grandTotal}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="checkout-help-note">
                <Truck size={14} />
                <span>Dispatched within 24–48 hours from Mumbai studio</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
