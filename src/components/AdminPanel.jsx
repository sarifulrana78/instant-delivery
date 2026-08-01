import React from 'react';
import Map from './Map';
import './AdminPanel.css';

function AdminPanel({ activeOrders, allOrders, logs, selectedRiderId }) {
  // Compute metrics
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrdersCount = activeOrders.filter(o => o.status !== 'delivered').length;
  const completedOrdersCount = allOrders.filter(o => o.status === 'delivered').length;
  
  // Calculate average delivery progress/success rate
  const successRate = allOrders.length > 0 
    ? Math.round((completedOrdersCount / allOrders.length) * 100) 
    : 100;

  // Average time is simulated as 15 minutes base
  const avgDeliveryTime = allOrders.length > 0
    ? '12.5 mins'
    : '--';

  return (
    <div className="admin-panel-container">
      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-card glass-panel revenue">
          <div className="metric-icon">💰</div>
          <div className="metric-details">
            <span className="label">Total Revenue</span>
            <h3>${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="metric-card glass-panel active-jobs">
          <div className="metric-icon">⚡</div>
          <div className="metric-details">
            <span className="label">Active Deliveries</span>
            <h3>{activeOrdersCount}</h3>
          </div>
        </div>

        <div className="metric-card glass-panel time">
          <div className="metric-icon">⏱️</div>
          <div className="metric-details">
            <span className="label">Avg Delivery Time</span>
            <h3>{avgDeliveryTime}</h3>
          </div>
        </div>

        <div className="metric-card glass-panel success">
          <div className="metric-icon">✅</div>
          <div className="metric-details">
            <span className="label">Order Success Rate</span>
            <h3>{successRate}%</h3>
          </div>
        </div>
      </div>

      <div className="admin-layout-grid">
        {/* Map Column */}
        <div className="admin-map-column">
          <Map activeOrders={activeOrders} selectedRiderId={selectedRiderId} />
        </div>

        {/* Live Logs Column */}
        <div className="admin-logs-column glass-panel">
          <div className="logs-header">
            <h4>📋 System Operations Log</h4>
            <span className="log-count">{logs.length} events</span>
          </div>

          <div className="logs-terminal">
            {logs.length > 0 ? (
              logs.slice().reverse().map(log => (
                <div key={log.id} className={`log-entry ${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-text">{log.message}</span>
                </div>
              ))
            ) : (
              <div className="no-logs">
                <span className="console-prompt">&gt;</span> No events logged yet. Place an order to begin tracking operations telemetry.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
