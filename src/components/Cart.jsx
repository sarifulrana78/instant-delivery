import React, { useState } from 'react';
import { HOUSES, RIDERS } from '../utils/mockData';
import './Cart.css';

function Cart({ cartItems, store, onUpdateQuantity, onCheckout }) {
  const [selectedHouse, setSelectedHouse] = useState(HOUSES[0].id);
  const [selectedRider, setSelectedRider] = useState(RIDERS[0].id);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal > 0 ? subtotal + deliveryFee + serviceFee : 0;

  const handlePlaceOrder = () => {
    const houseObj = HOUSES.find(h => h.id === selectedHouse);
    const riderObj = RIDERS.find(r => r.id === selectedRider);
    onCheckout(houseObj, riderObj, total);
    setShowCheckoutModal(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-sidebar glass-panel empty">
        <div className="empty-cart-icon">🛒</div>
        <h3>Your Cart is Empty</h3>
        <p>Add some delicious meals or items from your favorite store to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-sidebar glass-panel">
      <div className="cart-header">
        <h3>Your Order</h3>
        <span className="cart-store-name">from {store?.name}</span>
      </div>

      <div className="cart-items-list">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <span className="cart-item-visual">{item.image}</span>
            <div className="cart-item-info">
              <h5>{item.name}</h5>
              <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div className="cart-item-qty-control">
              <button onClick={() => onUpdateQuantity(item.id, -1)} className="qty-btn">-</button>
              <span className="qty-val">{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, 1)} className="qty-btn">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-delivery-config">
        <div className="config-group">
          <label htmlFor="house-select">📍 Deliver To</label>
          <select 
            id="house-select" 
            value={selectedHouse} 
            onChange={(e) => setSelectedHouse(e.target.value)}
            className="glass-input"
          >
            {HOUSES.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.desc})</option>
            ))}
          </select>
        </div>

        <div className="config-group">
          <label htmlFor="rider-select">🚴 Choose Delivery Partner</label>
          <select 
            id="rider-select" 
            value={selectedRider} 
            onChange={(e) => setSelectedRider(e.target.value)}
            className="glass-input"
          >
            {RIDERS.map(r => (
              <option key={r.id} value={r.id}>{r.name} - {r.type} ({r.rating}⭐)</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        className="glass-button primary checkout-btn glow-effect"
        onClick={() => setShowCheckoutModal(true)}
      >
        Proceed to Checkout
      </button>

      {showCheckoutModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal glass-panel">
            <h2>Confirm Your Instant Order</h2>
            <p>Your order will be instantly prepared and dispatched using our lightning fast delivery system.</p>
            
            <div className="checkout-preview-details">
              <div className="preview-detail-row">
                <strong>Store:</strong> <span>{store?.name}</span>
              </div>
              <div className="preview-detail-row">
                <strong>Rider:</strong> <span>{RIDERS.find(r => r.id === selectedRider)?.name} ({RIDERS.find(r => r.id === selectedRider)?.type})</span>
              </div>
              <div className="preview-detail-row">
                <strong>Destination:</strong> <span>{HOUSES.find(h => h.id === selectedHouse)?.name}</span>
              </div>
              <div className="preview-detail-row total">
                <strong>Amount:</strong> <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="glass-button"
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="glass-button primary confirm-order-btn glow-effect"
                onClick={handlePlaceOrder}
              >
                ⚡ Place Instant Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
