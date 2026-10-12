import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  const { navigateTo } = useShop();

  return (
    <div className="not-found-wrapper section-padding text-center">
      <div className="container" style={{ maxWidth: '640px' }}>
        <span className="section-eyebrow">404 Error</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The collectible page or link you are seeking has been moved or does not exist. Explore our full treasury of Ganpati stamp magnets and collector editions.
        </p>
        <div className="not-found-actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={() => navigateTo('home')}>
            Return to Homepage
          </button>
          <button type="button" className="btn btn-outline btn-lg" onClick={() => navigateTo('shop')}>
            Browse All Products
          </button>
        </div>
      </div>
    </div>
  );
};
