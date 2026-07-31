import React, { useState } from 'react';
import { STORES } from '../utils/mockData';
import './StoreBrowser.css';

function StoreBrowser({ onAddItemToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStore, setSelectedStore] = useState(STORES[0]);

  const categories = ['All', 'Food', 'Groceries', 'Pharmacy'];

  const filteredStores = selectedCategory === 'All' 
    ? STORES 
    : STORES.filter(store => store.category === selectedCategory);

  return (
    <div className="store-browser">
      <div className="category-tabs">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              // Select the first store of the new filtered list automatically
              const matched = cat === 'All' ? STORES : STORES.filter(s => s.category === cat);
              if (matched.length > 0) setSelectedStore(matched[0]);
            }}
          >
            {cat === 'All' && '🌟'}
            {cat === 'Food' && '🍔'}
            {cat === 'Groceries' && '🍏'}
            {cat === 'Pharmacy' && '💊'}
            {' '}{cat}
          </button>
        ))}
      </div>

      <div className="store-layout-grid">
        <div className="stores-list-column">
          <h3>Available Stores</h3>
          <div className="stores-vertical-scroll">
            {filteredStores.map(store => (
              <div 
                key={store.id} 
                className={`store-card glass-panel ${selectedStore.id === store.id ? 'active' : ''}`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="store-card-icon" style={{ backgroundColor: `${store.color}22`, border: `1px solid ${store.color}` }}>
                  {store.icon}
                </div>
                <div className="store-card-info">
                  <h4>{store.name}</h4>
                  <div className="store-card-meta">
                    <span className="store-meta-rating">⭐ {store.rating}</span>
                    <span className="store-meta-time">⏱️ {store.prepTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="store-details-column glass-panel">
          <div className="store-banner" style={{ background: `linear-gradient(135deg, ${selectedStore.color}dd, ${selectedStore.color}33)` }}>
            <span className="store-banner-icon">{selectedStore.icon}</span>
            <div className="store-banner-text">
              <h2>{selectedStore.name}</h2>
              <p>{selectedStore.category} • Fast Delivery in {selectedStore.prepTime}</p>
            </div>
          </div>

          <div className="products-grid">
            {selectedStore.items.map(item => (
              <div key={item.id} className="product-card glass-panel">
                <div className="product-visual">{item.image}</div>
                <div className="product-details">
                  <h4>{item.name}</h4>
                  <p className="product-desc">{item.desc}</p>
                  <div className="product-footer">
                    <span className="product-price">${item.price.toFixed(2)}</span>
                    <button 
                      className="glass-button primary add-to-cart-btn"
                      onClick={() => onAddItemToCart(item, selectedStore)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreBrowser;
