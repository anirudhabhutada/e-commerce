import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  MessageCircle
} from 'lucide-react';

export const CartPage = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    discount, 
    shipping, 
    grandTotal, 
    freeShippingRemaining, 
    navigateTo, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon 
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsText = cart.map(item => `${item.quantity}x ${item.product.name} (${item.variant}) - ₹${item.price * item.quantity}`).join('%0A');
    const msg = `Hello Kalaa Culture! I would like to order:%0A%0A${itemsText}%0A%0ASubtotal: ₹${subtotal}%0ADiscount: ₹${discount}%0AShipping: ₹${shipping}%0ATotal: ₹${grandTotal}%0A%0APlease confirm!`;
    window.open(`https://wa.me/917875005963?text=${msg}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper section-padding">
        <div className="container">
          <div className="cart-empty-page-state">
            <div className="empty-icon-circle">
              <ShoppingBag size={48} />
            </div>
            <h2>Your Shopping Bag is Empty</h2>
            <p>You have not added any collectibles yet. Explore our iconic stamp fridge magnets and collector box sets.</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigateTo('shop')}>
              Discover Collectibles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper section-padding">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li><button type="button" onClick={() => navigateTo('home')}>Home</button></li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">Shopping Bag</li>
          </ol>
        </nav>

        <h1 className="page-heading">Your Shopping Bag</h1>

        {/* Free Shipping Alert */}
        <div className="cart-page-shipping-banner">
          {freeShippingRemaining > 0 ? (
            <div className="shipping-progress-box">
              <p><Truck size={18} /> Add <strong>₹{freeShippingRemaining}</strong> more to unlock <strong>Free Pan-India Delivery</strong></p>
              <div className="shipping-bar-track">
                <div 
                  className="shipping-bar-fill" 
                  style={{ width: `${Math.min(100, (subtotal / BRAND_INFO.shippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="shipping-unlocked-banner">
              <CheckCircle2 size={18} />
              <span>Congratulations! You qualify for <strong>Free Delivery across India</strong></span>
            </div>
          )}
        </div>

        <div className="cart-page-grid">
          
          {/* Cart Items Table */}
          <div className="cart-items-column">
            <div className="cart-items-card">
              {cart.map((item) => (
                <div key={item.key} className="cart-table-row">
                  <img src={item.product.image} alt={item.product.name} className="cart-product-thumb" />
                  
                  <div className="cart-product-main">
                    <span className="cart-product-marathi devanagari-text">{item.product.marathiName}</span>
                    <h3 className="cart-product-title">{item.product.name}</h3>
                    {item.variant && <span className="cart-product-variant">{item.variant}</span>}
                    <span className="cart-product-unit-price">₹{item.price} each</span>
                  </div>

                  <div className="cart-qty-selector">
                    <button type="button" onClick={() => updateQuantity(item.key, -1)} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.key, 1)} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="cart-line-total">
                    <span>₹{item.price * item.quantity}</span>
                  </div>

                  <button 
                    type="button" 
                    className="cart-remove-icon-btn"
                    onClick={() => removeFromCart(item.key)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-continue-row">
              <button type="button" className="btn btn-outline" onClick={() => navigateTo('shop')}>
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Cart Summary Column */}
          <div className="cart-summary-column">
            <div className="summary-card">
              <h2 className="summary-heading">Order Summary</h2>

              {/* Coupon Section */}
              <div className="summary-coupon-box">
                {appliedCoupon ? (
                  <div className="applied-coupon-row">
                    <div>
                      <Tag size={16} />
                      <span>Code <strong>{appliedCoupon.code}</strong> Applied (-₹{discount})</span>
                    </div>
                    <button type="button" onClick={removeCoupon} className="coupon-remove-text">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
                    <div className="coupon-field-row">
                      <input 
                        type="text" 
                        placeholder="Coupon code (e.g. GANPATI10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="summary-coupon-input"
                      />
                      <button type="submit" className="btn btn-primary btn-sm">
                        Apply
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Cost Rows */}
              <div className="summary-cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="cost-row discount">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="cost-row">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? <strong className="free-shipping-tag">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="cost-row total-row">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="summary-actions">
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg full-width"
                  onClick={() => navigateTo('checkout')}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  type="button" 
                  className="btn btn-outline full-width"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle size={18} />
                  <span>Order via WhatsApp (+91 78750 05963)</span>
                </button>
              </div>

              <div className="summary-guarantee">
                <ShieldCheck size={16} />
                <span>100% Genuine Devotional Keepsakes • Dispatched from Mumbai</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
