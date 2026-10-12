import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, BRAND_INFO } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation State with URL Sync
  const getInitialRoute = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return { page: 'home', params: {} };
    if (path === '/shop') return { page: 'shop', params: {} };
    if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      return { page: 'product', params: { id } };
    }
    if (path.startsWith('/collection/')) {
      const categoryId = path.replace('/collection/', '');
      return { page: 'shop', params: { categoryId } };
    }
    if (path === '/cart') return { page: 'cart', params: {} };
    if (path === '/checkout') return { page: 'checkout', params: {} };
    if (path === '/order-confirmation') return { page: 'order-confirmation', params: {} };
    if (path === '/about') return { page: 'about', params: {} };
    if (path === '/contact') return { page: 'contact', params: {} };
    if (path === '/faq') return { page: 'faq', params: {} };
    if (path === '/shipping-policy') return { page: 'shipping-policy', params: {} };
    if (path === '/returns-policy') return { page: 'returns-policy', params: {} };
    if (path === '/privacy-policy') return { page: 'privacy-policy', params: {} };
    if (path === '/terms') return { page: 'terms', params: {} };
    return { page: 'home', params: {} };
  };

  const [route, setRoute] = useState(getInitialRoute);

  const navigateTo = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let url = '/';
    if (page === 'shop') url = params.categoryId ? `/collection/${params.categoryId}` : '/shop';
    else if (page === 'product') url = `/product/${params.id}`;
    else if (page === 'cart') url = '/cart';
    else if (page === 'checkout') url = '/checkout';
    else if (page === 'order-confirmation') url = '/order-confirmation';
    else if (page === 'about') url = '/about';
    else if (page === 'contact') url = '/contact';
    else if (page === 'faq') url = '/faq';
    else if (['shipping-policy', 'returns-policy', 'privacy-policy', 'terms'].includes(page)) url = `/${page}`;

    if (window.location.pathname !== url) {
      window.history.pushState({ page, params }, '', url);
    }
  };

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state) {
        setRoute({ page: e.state.page, params: e.state.params || {} });
      } else {
        setRoute(getInitialRoute());
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart Persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kalaa_culture_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kalaa_culture_cart', JSON.stringify(cart));
    } catch {
      // storage quota or private mode
    }
  }, [cart]);

  // Wishlist Persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kalaa_culture_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kalaa_culture_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // UI Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // Toast Notification Trigger
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart Actions
  const addToCart = (product, quantity = 1, variant = null) => {
    const selectedVariant = variant || (product.editions ? product.editions[0] : 'Standard');
    const extraPrice = selectedVariant.includes('+₹')
      ? parseInt(selectedVariant.match(/\+₹(\d+)/)?.[1] || 0, 10)
      : 0;
    const finalPrice = product.price + extraPrice;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.variant === selectedVariant
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            key: `${product.id}-${selectedVariant}`,
            productId: product.id,
            product,
            variant: selectedVariant,
            price: finalPrice,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to bag`, 'success');
    setIsCartOpen(true);
  };

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  // Coupon Logic
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    const found = BRAND_INFO.coupons.find((c) => c.code === clean);
    if (!found) {
      showToast('Invalid coupon code. Try GANPATI10', 'error');
      return false;
    }
    if (subtotal < found.minSpend) {
      showToast(`Coupon requires minimum spend of ₹${found.minSpend}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Live Price Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const shipping = subtotal === 0 ? 0 : subtotal >= BRAND_INFO.shippingThreshold ? 0 : BRAND_INFO.shippingCost;
  const grandTotal = Math.max(0, subtotal - discount + shipping);
  const freeShippingRemaining = Math.max(0, BRAND_INFO.shippingThreshold - subtotal);

  return (
    <ShopContext.Provider
      value={{
        route,
        navigateTo,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        grandTotal,
        totalItemCount,
        freeShippingRemaining,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
