import React from 'react';
import { RIDERS, STORES, HOUSES } from '../utils/mockData';
import './RiderPanel.css';

/**
 * RiderPanel Component
 * Renders the Rider view panel including current active jobs, statistics, and simulation speeds.
 * 
 * @param {Object} props
 * @param {string} props.selectedRiderId - Currently selected rider ID
 * @param {Function} props.setSelectedRiderId - Handler to change active rider
 * @param {Array} props.activeOrders - List of active simulation orders
 * @param {Object} props.riderStats - Earnings and delivery counts statistics map
 * @param {Function} props.onSimulateTick - Action callback to manually step the simulation
 * @param {number} props.simulationSpeed - Current speed factor
 * @param {Function} props.setSimulationSpeed - Handler to change speed factor
 */
function RiderPanel({ 
  selectedRiderId, 
  setSelectedRiderId, 
  activeOrders, 
  riderStats, 
  onSimulateTick,
  simulationSpeed,
  setSimulationSpeed
}) {
  const currentRider = RIDERS.find(r => r.id === selectedRiderId) || RIDERS[0];
  
  // Find active order for this rider
  const activeOrder = activeOrders.find(
    order => order.rider.id === selectedRiderId && order.status !== 'delivered'
  );

  const stats = riderStats[selectedRiderId] || { deliveries: 0, earnings: 0 };

  return (
    <div className="rider-panel-container">
      {/* Rider Selector Tab bar */}
      <div className="rider-selector-tabs">
        {RIDERS.map(rider => (
          <button 
            key={rider.id}
            className={`rider-tab-btn glass-panel ${selectedRiderId === rider.id ? 'active' : ''}`}
            onClick={() => setSelectedRiderId(rider.id)}
          >
            <span className="rider-tab-avatar">{rider.avatar}</span>
            <div className="rider-tab-meta">
              <h4>{rider.name}</h4>
              <span>{rider.type}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="rider-dashboard-grid">
        {/* Statistics Card */}
        <div className="rider-card glass-panel stats-card">
          <h3>Rider Profile & Stats</h3>
          <div className="rider-profile-header">
            <span className="profile-large-avatar">{currentRider.avatar}</span>
            <div className="profile-meta">
              <h2>{currentRider.name}</h2>
              <span className="badge">{currentRider.type}</span>
              <span className="rating">⭐ {currentRider.rating} Rating</span>
            </div>
          </div>

          <div className="stats-metric-grid">
            <div className="metric-box">
              <span className="metric-title">Completed Deliveries</span>
              <span className="metric-value">{stats.deliveries}</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">Total Earnings</span>
              <span className="metric-value">${stats.earnings.toFixed(2)}</span>
            </div>
          </div>

          <div className="simulation-settings-box">
            <h4>Simulation Controls</h4>
            <div className="speed-controls">
              <span>Simulation Speed:</span>
              <div className="speed-buttons">
                {[1, 2, 5].map(speed => (
                  <button 
                    key={speed}
                    onClick={() => setSimulationSpeed(speed)}
                    className={`speed-btn ${simulationSpeed === speed ? 'active' : ''}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Job Card */}
        <div className="rider-card glass-panel job-card">
          <h3>Active Delivery Task</h3>

          {activeOrder ? (
            <div className="active-job-details">
              <div className="job-status-banner">
                <span className="status-label">Status:</span>
                <span className={`status-badge ${activeOrder.status}`}>
                  {activeOrder.status === 'placed' && '🛒 Placed'}
                  {activeOrder.status === 'preparing' && '🍳 Preparing'}
                  {activeOrder.status === 'delivering' && '🚴 Out for Delivery'}
                </span>
              </div>

              <div className="job-route-timeline">
                <div className="timeline-stop">
                  <div className="stop-marker store">🛒</div>
                  <div className="stop-info">
                    <h5>Pickup from</h5>
                    <p>{STORES.find(s => s.id === activeOrder.storeId)?.name}</p>
                  </div>
                </div>

                <div className="timeline-connector">
                  <div className="connector-progress" style={{ height: `${activeOrder.progress * 100}%` }}></div>
                </div>

                <div className="timeline-stop">
                  <div className="stop-marker customer">📍</div>
                  <div className="stop-info">
                    <h5>Deliver to</h5>
                    <p>{HOUSES.find(h => h.id === activeOrder.houseId)?.name}</p>
                  </div>
                </div>
              </div>

              <div className="job-progress-container">
                <div className="progress-text">
                  <span>Job Progress</span>
                  <span>{Math.round(activeOrder.progress * 100)}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${activeOrder.progress * 100}%` }}></div>
                </div>
              </div>

              <button 
                onClick={() => onSimulateTick(activeOrder.id)}
                className="glass-button primary action-btn animate-pulse"
              >
                ⚡ Manually Advance Order Step
              </button>
            </div>
          ) : (
            <div className="no-active-job">
              <span className="no-job-icon">📭</span>
              <h4>No Active Jobs Assigned</h4>
              <p>Go to the Customer tab to place an order and assign it to {currentRider.name}!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiderPanel;
