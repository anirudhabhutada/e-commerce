import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_INFO } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CheckCircle2,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    discount, 
    shipping, 
    grandTotal, 
    freeShippingRemaining,
    totalItemCount,
    navigateTo,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleWhatsAppOrder = () => {
    const itemsText = cart.map(item => `${item.quantity}x ${item.product.name} (${item.variant}) - ₹${item.price * item.quantity}`).join('%0A');
    const msg = `Hello Kalaa Culture! I would like to order the following items:%0A%0A${itemsText}%0A%0ASubtotal: ₹${subtotal}%0ADiscount: ₹${discount}%0AShipping: ₹${shipping}%0ATotal: ₹${grandTotal}%0A%0APlease confirm availability!`;
    window.open(`https://wa.me/917875005963?text=${msg}`, '_blank');
  };

  return (
    <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside 
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping Bag"
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <ShoppingBag size={20} />
            <h2 className="cart-title">Your Shopping Bag ({totalItemCount})</h2>
          </div>
          <button 
            type="button" 
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          {freeShippingRemaining > 0 ? (
            <div>
              <p className="shipping-text">
                <Truck size={15} /> Add <strong>₹{freeShippingRemaining}</strong> more for <strong>Free Delivery</strong>
              </p>
              <div className="shipping-bar-track">
                <div 
                  className="shipping-bar-fill" 
                  style={{ width: `${Math.min(100, (subtotal / BRAND_INFO.shippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="shipping-unlocked">
              <CheckCircle2 size={16} />
              <span>You have unlocked <strong>Free All-India Delivery!</strong></span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-icon-circle">
                <ShoppingBag size={36} />
              </div>
              <h3>Your bag is currently empty</h3>
              <p>Discover our iconic postage stamp fridge magnets honoring Mumbai's revered Ganpatis.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => { setIsCartOpen(false); navigateTo('shop'); }}
              >
                Explore Collectibles
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.key} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    {item.variant && item.variant !== 'Standard' && (
                      <span className="cart-item-variant">{item.variant}</span>
                    )}
                    <span className="cart-item-price">₹{item.price} each</span>

                    {/* Quantity controls */}
                    <div className="cart-qty-row">
                      <div className="qty-controls">
                        <button 
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.key, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.key, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="item-line-total">₹{item.price * item.quantity}</span>

                      <button 
                        type="button"
                        className="item-remove-btn"
                        onClick={() => removeFromCart(item.key)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer Summary */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            
            {/* Coupon Code Section */}
            <div className="cart-coupon-section">
              {appliedCoupon ? (
                <div className="coupon-applied-badge">
                  <div className="coupon-info">
                    <Tag size={15} />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount})</span>
                  </div>
                  <button type="button" onClick={removeCoupon} className="coupon-remove-btn">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <div className="coupon-input-group">
                    <Tag size={16} className="coupon-icon" />
                    <input 
                      type="text" 
                      placeholder="Coupon Code (e.g. GANPATI10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="submit" className="coupon-apply-btn">
                      Apply
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="cart-totals-breakdown">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="totals-row discount-row">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="free-shipping-tag">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="totals-row grand-total-row">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="cart-cta-actions">
              <button 
                type="button" 
                className="btn btn-primary btn-checkout-action"
                onClick={handleProceedCheckout}
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={18} />
              </button>

              <button 
                type="button" 
                className="btn btn-outline btn-whatsapp-action"
                onClick={handleWhatsAppOrder}
                title="Quick Order directly via WhatsApp"
              >
                <MessageCircle size={18} />
                <span>Instant Order via WhatsApp (+91 78750 05963)</span>
              </button>
            </div>

            <div className="cart-guarantee-note">
              <ShieldCheck size={14} />
              <span>100% Secure Checkout • Neodymium Quality Assurance</span>
            </div>

          </div>
        )}
      </aside>
    </div>
  );
};
