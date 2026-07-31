import React from 'react';
import './Navbar.css';

function Navbar({ activeTab, setActiveTab, cartCount }) {
  return (
    <nav className="navbar glass-panel">
      <div className="navbar-logo">
        <div className="logo-icon">⚡</div>
        <span className="logo-text">Flash<span className="logo-accent">Dash</span></span>
      </div>
      <div className="navbar-links">
        <button 
          className={`nav-tab-btn ${activeTab === 'customer' ? 'active' : ''}`}
          onClick={() => setActiveTab('customer')}
        >
          🛍️ Order Food & Goods
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'rider' ? 'active' : ''}`}
          onClick={() => setActiveTab('rider')}
        >
          🚴 Rider Panel
        </button>
        <button 
          className={`nav-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          📊 Operations Admin
        </button>
      </div>
      <div className="navbar-actions">
        <div className="cart-badge-container" onClick={() => setActiveTab('customer')}>
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
        </div>
        <div className="user-profile">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=FlashDash" alt="User avatar" className="avatar" />
          <span className="user-role-status">Online</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
