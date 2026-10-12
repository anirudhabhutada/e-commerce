import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ShopPage = () => {
  const { route, navigateTo } = useShop();

  const activeCategory = route.params?.categoryId || 'all';
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCategoryChange = (catId) => {
    navigateTo('shop', catId === 'all' ? {} : { categoryId: catId });
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search match
      if (searchFilter.trim() !== '') {
        const query = searchFilter.toLowerCase();
        const match = 
          product.name.toLowerCase().includes(query) ||
          product.marathiName.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.categoryName.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Price filter
      if (priceRange === 'under-100' && product.price > 99) return false;
      if (priceRange === '100-200' && (product.price < 100 || product.price > 200)) return false;
      if (priceRange === 'above-200' && product.price <= 200) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0; // featured order in PRODUCTS array
    });
  }, [activeCategory, searchFilter, sortBy, priceRange]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  const resetFilters = () => {
    setSearchFilter('');
    setPriceRange('all');
    setSortBy('featured');
    navigateTo('shop', {});
  };

  return (
    <div className="shop-page-wrapper section-padding">
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
            {activeCategory !== 'all' && (
              <>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li aria-current="page" className="current-crumb">
                  {activeCategoryObj.name}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Shop Header Banner */}
        <div className="shop-header-banner">
          <div>
            <span className="section-eyebrow">
              {activeCategory === 'all' ? 'The Complete Treasury' : 'Curated Collection'}
            </span>
            <h1 className="shop-main-title">
              {activeCategoryObj.name}
            </h1>
            <p className="shop-subtitle">
              {activeCategory === 'stamp-magnets' && 'Signature perforated postage stamp fridge magnets honoring Mumbai’s famous Ganpatis. ₹100 each.'}
              {activeCategory === 'collector-boxes' && 'Curated 5-piece Mumbai Ganpati Mandal sets packaged in luxury gift presentation boxes.'}
              {activeCategory === 'heritage-decor' && 'Devotional plaques and acrylic keepsakes capturing sacred moments and cultural milestones.'}
              {activeCategory === 'stickers' && 'Premium waterproof, UV-proof matte vinyl sticker sheets for devices and vehicles.'}
              {activeCategory === 'all' && 'Explore all authentic Kalaa Culture stamp magnets, collector sets, and devotional lifestyle keepsakes.'}
            </p>
          </div>
          <div className="shop-results-badge">
            <span>{filteredProducts.length} Collectible{filteredProducts.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="category-tabs-container">
          <div className="category-tabs-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="cat-count-pill">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Control Bar */}
        <div className="filter-sort-bar">
          
          {/* Search Input */}
          <div className="shop-search-field">
            <Search size={18} className="shop-search-icon" />
            <input 
              type="text" 
              placeholder="Search in this collection..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="shop-search-input"
              aria-label="Filter products by name"
            />
            {searchFilter && (
              <button type="button" onClick={() => setSearchFilter('')} className="search-clear-btn" aria-label="Clear">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-sort-controls">
            
            {/* Price Filter Select */}
            <div className="custom-select-box">
              <label htmlFor="priceFilter" className="select-label">Price:</label>
              <select 
                id="priceFilter"
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="shop-select"
              >
                <option value="all">All Prices</option>
                <option value="under-100">Under ₹100</option>
                <option value="100-200">₹100 - ₹200</option>
                <option value="above-200">Above ₹200</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="custom-select-box">
              <label htmlFor="sortBy" className="select-label">Sort by:</label>
              <select 
                id="sortBy"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-select"
              >
                <option value="featured">Featured Editions</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Clear Filters (if active) */}
            {(searchFilter || priceRange !== 'all' || sortBy !== 'featured' || activeCategory !== 'all') && (
              <button type="button" onClick={resetFilters} className="btn-reset-filters">
                <X size={14} />
                <span>Reset</span>
              </button>
            )}

          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="shop-empty-state">
            <div className="empty-state-icon">
              <Search size={36} />
            </div>
            <h3>No collectibles found matching your criteria</h3>
            <p>Try clearing your search query or adjusting your price filters.</p>
            <button type="button" className="btn btn-primary" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
