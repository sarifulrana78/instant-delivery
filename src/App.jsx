import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StoreBrowser from './components/StoreBrowser';
import Cart from './components/Cart';
import RiderPanel from './components/RiderPanel';
import AdminPanel from './components/AdminPanel';
import Map from './components/Map';
import { RIDERS, STORES, HOUSES } from './utils/mockData';
import './components/Cart.css';

function App() {
  const [activeTab, setActiveTab] = useState('customer');
  const [cartItems, setCartItems] = useState([]);
  const [cartStore, setCartStore] = useState(null);
  
  // Simulation states
  const [activeOrders, setActiveOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedRiderId, setSelectedRiderId] = useState(RIDERS[0].id);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Rider cumulative stats
  const [riderStats, setRiderStats] = useState(
    RIDERS.reduce((acc, rider) => {
      acc[rider.id] = { deliveries: 0, earnings: 0 };
      return acc;
    }, {})
  );

  // Add system logs helper
  const addLog = (message, type = 'info') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, time: timeStr, message, type }]);
  };

  // Cart operations
  const handleAddItemToCart = (item, store) => {
    // If selecting a different store, reset cart to new store
    if (cartStore && cartStore.id !== store.id) {
      setCartItems([{ ...item, quantity: 1 }]);
      setCartStore(store);
      addLog(`Cleared cart and started fresh order from ${store.name}`, 'warning');
      return;
    }

    if (!cartStore) {
      setCartStore(store);
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addLog(`Added ${item.name} to cart`, 'info');
  };

  const handleUpdateQuantity = (itemId, change) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
      
      if (updated.length === 0) {
        setCartStore(null);
      }
      return updated;
    });
  };

  const handleCheckout = (house, rider, totalAmount) => {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      storeId: cartStore.id,
      houseId: house.id,
      rider: rider,
      items: [...cartItems],
      totalAmount: totalAmount,
      status: 'placed',
      progress: 0,
      riderX: 400,
      riderY: 250,
      startX: 400,
      startY: 250,
      // Track which alerts/logs were already triggered for this order
      notifiedArrived: false,
      notifiedPickedUp: false
    };

    setActiveOrders(prev => [...prev, newOrder]);
    setAllOrders(prev => [...prev, newOrder]);
    setCartItems([]);
    setCartStore(null);
    setShowCheckoutSuccess(true);

    addLog(`Order #${orderId} placed successfully at ${cartStore.name}! Total: $${totalAmount.toFixed(2)}. Courier ${rider.name} is on the way.`, 'success');
  };

  // Main simulation tick logic
  const handleSimulateTick = useCallback((orderId) => {
    setActiveOrders(prevOrders => {
      const order = prevOrders.find(o => o.id === orderId);
      if (!order || order.status === 'delivered') return prevOrders;

      const store = STORES.find(s => s.id === order.storeId);
      const house = HOUSES.find(h => h.id === order.houseId);
      if (!store || !house) return prevOrders;

      const step = 0.015 * order.rider.speed * simulationSpeed;
      const newProgress = Math.min(order.progress + step, 1.0);

      let newStatus = order.status;
      let rx = order.riderX;
      let ry = order.riderY;
      let notifiedArrived = order.notifiedArrived;
      let notifiedPickedUp = order.notifiedPickedUp;

      // Progress-based simulation stages
      if (newProgress < 0.3) {
        newStatus = 'placed';
        // Interpolate start to store
        const p1 = newProgress / 0.3;
        rx = order.startX + (store.x - order.startX) * p1;
        ry = order.startY + (store.y - order.startY) * p1;
      } else if (newProgress >= 0.3 && newProgress < 0.5) {
        newStatus = 'preparing';
        rx = store.x;
        ry = store.y;

        if (!notifiedArrived) {
          addLog(`Courier ${order.rider.name} arrived at ${store.name} for Order #${order.id}. Merchant is preparing items.`, 'info');
          notifiedArrived = true;
        }
      } else if (newProgress >= 0.5 && newProgress < 1.0) {
        newStatus = 'delivering';
        // Interpolate store to house
        const p2 = (newProgress - 0.5) / 0.5;
        rx = store.x + (house.x - store.x) * p2;
        ry = store.y + (house.y - store.y) * p2;

        if (!notifiedPickedUp) {
          addLog(`Courier ${order.rider.name} picked up Order #${order.id} and is out for delivery.`, 'success');
          notifiedPickedUp = true;
        }
      } else if (newProgress >= 1.0) {
        newStatus = 'delivered';
        rx = house.x;
        ry = house.y;

        addLog(`Order #${order.id} delivered safely to ${house.name}! Earnings of $${(order.totalAmount * 0.15 + 2.99).toFixed(2)} added to ${order.rider.name}'s wallet.`, 'success');
        
        // Update rider statistics
        setRiderStats(prev => ({
          ...prev,
          [order.rider.id]: {
            deliveries: prev[order.rider.id].deliveries + 1,
            earnings: prev[order.rider.id].earnings + (order.totalAmount * 0.15 + 2.99)
          }
        }));
      }

      const updated = {
        ...order,
        progress: newProgress,
        status: newStatus,
        riderX: rx,
        riderY: ry,
        notifiedArrived,
        notifiedPickedUp
      };

      // Sync status back to allOrders history list
      setAllOrders(prevAll => 
        prevAll.map(o => o.id === orderId ? { ...o, status: updated.status, progress: updated.progress } : o)
      );

      return prevOrders.map(o => o.id === orderId ? updated : o);
    });
  }, [simulationSpeed]);

  // Run simulation interval
  useEffect(() => {
    const interval = setInterval(() => {
      activeOrders.forEach(order => {
        if (order.status !== 'delivered') {
          handleSimulateTick(order.id);
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, [activeOrders, handleSimulateTick]);

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} 
      />

      <main className="main-content-layout">
        {activeTab === 'customer' && (
          <div className="customer-view-grid">
            <div className="left-panel">
              <StoreBrowser onAddItemToCart={handleAddItemToCart} />
              
              {/* If there's an active order, show Map and tracking below */}
              {activeOrders.some(o => o.status !== 'delivered') && (
                <div style={{ marginTop: '2rem' }}>
                  <Map activeOrders={activeOrders} selectedRiderId={selectedRiderId} />
                </div>
              )}
            </div>
            
            <div className="right-panel">
              <Cart 
                cartItems={cartItems} 
                store={cartStore} 
                onUpdateQuantity={handleUpdateQuantity} 
                onCheckout={handleCheckout} 
              />
            </div>
          </div>
        )}

        {activeTab === 'rider' && (
          <RiderPanel 
            selectedRiderId={selectedRiderId}
            setSelectedRiderId={setSelectedRiderId}
            activeOrders={activeOrders}
            riderStats={riderStats}
            onSimulateTick={handleSimulateTick}
            simulationSpeed={simulationSpeed}
            setSimulationSpeed={setSimulationSpeed}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            activeOrders={activeOrders}
            allOrders={allOrders}
            logs={logs}
            selectedRiderId={selectedRiderId}
          />
        )}
      </main>

      {/* Checkout Success Modal */}
      {showCheckoutSuccess && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal glass-panel">
            <span className="modal-success-icon">🚀</span>
            <h3>Order Transmitted!</h3>
            <p>Your order is routed to the merchant. Switch to the <strong>Rider Panel</strong> or <strong>Operations Admin</strong> to monitor delivery telemetry in real time!</p>
            <button 
              className="glass-button primary" 
              onClick={() => setShowCheckoutSuccess(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
