import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsSearchOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.marathiName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tag?.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query)
        );
      });

  const handleSelectProduct = (id) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigateTo('product', { id });
  };

  const handleSelectCategory = (catId) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigateTo('shop', { categoryId: catId });
  };

  return (
    <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search Catalog"
      >
        <div className="search-input-wrapper">
          <Search size={22} className="search-input-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search Mumbai Cha Raja, Chintamani, Parelcha Raja, stickers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-modal-input"
            aria-label="Search collectibles"
          />
          {searchTerm && (
            <button 
              type="button" 
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <button 
            type="button" 
            className="search-modal-close"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="search-suggestions-row">
          <span className="suggestions-label">Popular Searches:</span>
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <button 
              key={cat.id} 
              type="button" 
              className="suggestion-tag"
              onClick={() => handleSelectCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
          <button 
            type="button" 
            className="suggestion-tag"
            onClick={() => setSearchTerm('Mumbai Cha Raja')}
          >
            Mumbai Cha Raja
          </button>
          <button 
            type="button" 
            className="suggestion-tag"
            onClick={() => setSearchTerm('Chintamani')}
          >
            Chinchpoklicha Chintamani
          </button>
        </div>

        {/* Results Body */}
        <div className="search-results-body">
          {searchTerm.trim() !== '' && (
            <div className="search-results-header">
              <span>{filteredProducts.length} collectible{filteredProducts.length === 1 ? '' : 's'} found for "{searchTerm}"</span>
            </div>
          )}

          {searchTerm.trim() !== '' && filteredProducts.length === 0 && (
            <div className="search-empty-state">
              <p>No products found matching "{searchTerm}".</p>
              <span>Try searching for "stamp", "magnet", "Raja", or "box set".</span>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="search-results-list">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="search-result-item"
                  onClick={() => handleSelectProduct(product.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={product.image} alt={product.name} className="search-item-thumb" />
                  <div className="search-item-info">
                    <span className="search-item-marathi devanagari-text">{product.marathiName}</span>
                    <h4 className="search-item-title">{product.name}</h4>
                    <span className="search-item-category">{product.categoryName}</span>
                  </div>
                  <div className="search-item-price-col">
                    <span className="search-item-price">₹{product.price}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
