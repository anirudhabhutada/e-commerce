import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Star, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  const handleCardClick = () => {
    navigateTo('product', { id: product.id });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="product-card" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(); }}>
      
      {/* Product Image Frame */}
      <div className="product-card-media-wrapper">
        <div className="product-card-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            width="320"
            height="320"
          />
        </div>

        {/* Badges */}
        <div className="product-card-badges">
          {product.tag && (
            <span className={`card-badge ${product.tag === 'Bestseller' ? 'badge-primary' : 'badge-gold'}`}>
              {product.tag}
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="card-badge badge-save">
              Save ₹{product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={18} className={isWishlisted ? "filled-heart" : ""} />
        </button>

        {/* Quick Add Overlay on Desktop */}
        <div className="product-card-quick-actions">
          <button 
            type="button" 
            className="quick-add-btn"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag size={16} />
            <span>Add to Bag • ₹{product.price}</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="product-card-content">
        
        {/* Devanagari Calligraphy Line */}
        {product.marathiName && (
          <span className="product-card-marathi devanagari-text">
            {product.marathiName}
          </span>
        )}

        {/* Title */}
        <h3 className="product-card-title">
          {product.name}
        </h3>

        {/* Subtitle / Edition */}
        <p className="product-card-subtitle">
          {product.subtitle || product.categoryName}
        </p>

        {/* Rating and Social Proof */}
        <div className="product-card-rating">
          <div className="star-group" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            <Star size={13} className="star-filled" fill="#D4AF37" color="#D4AF37" />
            <span className="rating-score">{product.rating.toFixed(1)}</span>
          </div>
          <span className="rating-count">({product.reviewsCount} reviews)</span>
          <span className="stock-indicator">
            <Check size={12} color="#15803D" /> In Stock
          </span>
        </div>

        {/* Price Row */}
        <div className="product-card-price-row">
          <div className="price-group">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Mobile Direct Add Button */}
          <button 
            type="button"
            className="mobile-card-add-btn"
            onClick={handleQuickAdd}
            aria-label="Add to bag"
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>

      </div>
    </article>
  );
};
