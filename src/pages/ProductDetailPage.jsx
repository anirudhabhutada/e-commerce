import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, BRAND_INFO } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  ChevronRight, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Check, 
  Plus, 
  Minus, 
  Share2, 
  MessageCircle,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductDetailPage = ({ productId }) => {
  const { 
    navigateTo, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    showToast,
    setIsCartOpen 
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedEdition, setSelectedEdition] = useState(product.editions ? product.editions[0] : 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedEdition(product.editions ? product.editions[0] : 'Standard');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  const extraPrice = selectedEdition.includes('+₹') 
    ? parseInt(selectedEdition.match(/\+₹(\d+)/)?.[1] || 0, 10) 
    : 0;
  const unitPrice = product.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedEdition);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedEdition);
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleWhatsAppOrder = () => {
    const msg = `Namaskar Kalaa Culture! I would like to order: ${quantity}x ${product.name} (${selectedEdition}) - Total: ₹${totalPrice}. Please share payment details!`;
    window.open(`https://wa.me/917875005963?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'success');
    }
  };

  // Related products from the same category or bestsellers
  const relatedProducts = PRODUCTS
    .filter((p) => p.id !== product.id && (p.category === product.category || p.tag === 'Bestseller'))
    .slice(0, 4);

  return (
    <div className="product-detail-wrapper section-padding">
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li>
              <button type="button" onClick={() => navigateTo('home')}>Home</button>
            </li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li>
              <button type="button" onClick={() => navigateTo('shop')}>Shop</button>
            </li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li>
              <button type="button" onClick={() => navigateTo('shop', { categoryId: product.category })}>
                {product.categoryName}
              </button>
            </li>
            <li aria-hidden="true"><ChevronRight size={14} /></li>
            <li aria-current="page" className="current-crumb">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Layout */}
        <div className="pdp-main-grid">
          
          {/* Left Column: Gallery */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-frame">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="pdp-main-image"
                width="600"
                height="600"
              />
              {product.tag && (
                <span className="pdp-badge badge-gold">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="pdp-thumbnail-row">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Callout Box */}
            <div className="pdp-authenticity-card">
              <div className="auth-card-item">
                <Sparkles size={20} color="#D4AF37" />
                <div>
                  <strong>Official Kalaa Culture Seal</strong>
                  <p>Every piece features the authentic @kalaaculture watermark and stamp perforation</p>
                </div>
              </div>
              <div className="auth-card-item">
                <ShieldCheck size={20} color="#D4AF37" />
                <div>
                  <strong>Heavy-Duty Neodymium Core</strong>
                  <p>Engineered to hold multiple invitations, photos, and notes on steel surfaces</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Commerce Actions */}
          <div className="pdp-info-col">
            
            {/* Sacred Marathi Header */}
            {product.marathiName && (
              <span className="pdp-marathi devanagari-text">
                {product.marathiName}
              </span>
            )}

            <h1 className="pdp-title">
              {product.name}
            </h1>

            <p className="pdp-subtitle">
              {product.subtitle || product.categoryName}
            </p>

            {/* Ratings & Social Proof */}
            <div className="pdp-rating-row">
              <div className="star-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              <span className="rating-score"><strong>{product.rating.toFixed(1)}</strong></span>
              <span className="rating-divider">•</span>
              <span className="rating-count">{product.reviewsCount} verified devotee reviews</span>
              <span className="rating-divider">•</span>
              <span className="stock-status-pill in-stock">
                <Check size={13} /> {product.stockCount ? `Only ${product.stockCount} left in this batch` : 'In Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div className="pdp-price-box">
              <div className="pdp-prices">
                <span className="pdp-price-current">₹{unitPrice}</span>
                {product.originalPrice && (
                  <span className="pdp-price-original">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && product.originalPrice > unitPrice && (
                  <span className="pdp-save-pill">
                    Save ₹{product.originalPrice - unitPrice} ({Math.round(((product.originalPrice - unitPrice) / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>
              <p className="pdp-tax-note">Inclusive of all taxes. Free shipping on orders above ₹{BRAND_INFO.shippingThreshold}.</p>
            </div>

            {/* Edition / Variant Selector */}
            {product.editions && product.editions.length > 1 && (
              <div className="pdp-variants-section">
                <label className="variant-label">Select Edition:</label>
                <div className="variant-buttons-group">
                  {product.editions.map((ed) => (
                    <button
                      key={ed}
                      type="button"
                      className={`variant-select-btn ${selectedEdition === ed ? 'active' : ''}`}
                      onClick={() => setSelectedEdition(ed)}
                    >
                      <span>{ed}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pdp-quantity-section">
              <label className="variant-label">Quantity:</label>
              <div className="quantity-selector-box">
                <button 
                  type="button" 
                  className="pdp-qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="pdp-qty-val">{quantity}</span>
                <button 
                  type="button" 
                  className="pdp-qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="pdp-item-subtotal">Subtotal: <strong>₹{totalPrice}</strong></span>
            </div>

            {/* Action Buttons */}
            <div className="pdp-actions-stack">
              <div className="pdp-primary-actions-row">
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg pdp-add-cart-btn"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={20} />
                  <span>Add to Bag • ₹{totalPrice}</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-gold btn-lg pdp-buy-now-btn"
                  onClick={handleBuyNow}
                >
                  <span>Buy Now</span>
                </button>

                <button 
                  type="button"
                  className={`pdp-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  title={isWishlisted ? "Saved" : "Save to wishlist"}
                >
                  <Heart size={22} className={isWishlisted ? "filled-heart" : ""} />
                </button>

                <button 
                  type="button"
                  className="pdp-share-btn"
                  onClick={handleShare}
                  aria-label="Share product"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <button 
                type="button" 
                className="btn btn-outline pdp-whatsapp-btn"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle size={18} />
                <span>Instant Order via WhatsApp (+91 78750 05963)</span>
              </button>
            </div>

            {/* Delivery & Shipping Info */}
            <div className="pdp-perks-box">
              <div className="perk-row">
                <Truck size={18} />
                <div>
                  <strong>All-India Express Dispatch:</strong> Dispatched within 24–48 hours from Mumbai. Delivered in 3–5 working days.
                </div>
              </div>
              <div className="perk-row">
                <ShieldCheck size={18} />
                <div>
                  <strong>Safe Transit Guarantee:</strong> Triple-layer bubble wrap & rigid carton packaging to ensure pristine delivery.
                </div>
              </div>
              <div className="perk-row">
                <RefreshCw size={18} />
                <div>
                  <strong>Hassle-Free Replacement:</strong> Free replacement in the unlikely event of transit damage upon unboxing photo proof.
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="pdp-description-block">
              <h3 className="desc-heading">Description</h3>
              <p className="desc-text">{product.description}</p>
            </div>

            {/* Product Specifications & Care Tabs */}
            <div className="pdp-tabs-block">
              <div className="pdp-tab-headers">
                <button 
                  type="button" 
                  className={`pdp-tab-header-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Specifications
                </button>
                <button 
                  type="button" 
                  className={`pdp-tab-header-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Key Highlights
                </button>
                <button 
                  type="button" 
                  className={`pdp-tab-header-btn ${activeTab === 'care' ? 'active' : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  Care Guide
                </button>
              </div>

              <div className="pdp-tab-content">
                {activeTab === 'specs' && (
                  <dl className="specs-dl">
                    <div className="spec-row">
                      <dt>Dimensions</dt>
                      <dd>{product.dimensions || '3.25" × 2.4"'}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>Material</dt>
                      <dd>{product.material || 'Cast Acrylic with Neodymium Magnet'}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>Magnetic Core</dt>
                      <dd>Heavy-Duty Rare Earth Neodymium</dd>
                    </div>
                    <div className="spec-row">
                      <dt>Manufacturing Origin</dt>
                      <dd>{product.origin || 'Mumbai, Maharashtra, India'}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>Category</dt>
                      <dd>{product.categoryName}</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'features' && (
                  <ul className="features-checklist">
                    {product.features?.map((feat, idx) => (
                      <li key={idx}>
                        <Check size={16} color="#D4AF37" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'care' && (
                  <div className="care-guide-text">
                    <p>• Wipe clean gently with a soft dry microfiber cloth if dusted.</p>
                    <p>• Water-resistant print surface can withstand mild damp cloth cleaning.</p>
                    <p>• Do not expose to open flame, extreme heat, or abrasive scrubbing pads.</p>
                    <p>• Safe for all stainless steel, cast iron, and painted steel refrigerators and cabinets.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related-section">
            <div className="section-header">
              <span className="section-eyebrow">Complementary Treasures</span>
              <h2 className="section-title">Complete Your Mumbai Collection</h2>
              <p className="section-description">Devotees who admired {product.name} also collected these iconic editions.</p>
            </div>
            <div className="products-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Mobile Sticky Add-to-Cart Bar */}
        <div className="pdp-mobile-sticky-bar">
          <div className="sticky-price-info">
            <span className="sticky-name">{product.name}</span>
            <span className="sticky-price">₹{unitPrice}</span>
          </div>
          <button 
            type="button" 
            className="btn btn-primary btn-sm sticky-btn"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={16} />
            <span>Add to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};
