import React from 'react';
import { MAP_SIZE, STORES, HOUSES } from '../utils/mockData';
import './Map.css';

/**
 * Map Component
 * Renders an SVG telemetry map displaying all active stores, delivery houses, and real-time courier paths.
 * 
 * @param {Object} props
 * @param {Array} props.activeOrders - List of currently active orders in simulation
 * @param {string} props.selectedRiderId - The ID of the currently selected rider to highlight on the map
 */
function Map({ activeOrders, selectedRiderId }) {
  // Let's render the streets or background grid
  const gridLines = [];
  for (let i = 50; i < MAP_SIZE.width; i += 100) {
    gridLines.push(<line key={`x-${i}`} x1={i} y1={0} x2={i} y2={MAP_SIZE.height} className="map-grid-line" />);
  }
  for (let j = 50; j < MAP_SIZE.height; j += 100) {
    gridLines.push(<line key={`y-${j}`} x1={0} y1={j} x2={MAP_SIZE.width} y2={j} className="map-grid-line" />);
  }

  return (
    <div className="map-canvas-container glass-panel">
      <div className="map-canvas-header">
        <h4>⚡ Real-Time Operations Telemetry</h4>
        <span className="map-live-indicator"><span className="pulse-dot"></span> Live Map</span>
      </div>
      <div className="map-viewport">
        <svg viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`} className="map-svg">
          {/* Background grid */}
          <g className="map-grid">
            {gridLines}
          </g>

          {/* Paths for active deliveries */}
          {activeOrders.map(order => {
            if (order.status === 'delivered') return null;
            const store = STORES.find(s => s.id === order.storeId);
            const house = HOUSES.find(h => h.id === order.houseId);
            if (!store || !house) return null;

            return (
              <g key={`path-${order.id}`}>
                {/* Leg 1: Rider to Store (only if rider has coordinates) */}
                {order.riderX !== undefined && order.riderY !== undefined && (
                  <line 
                    x1={order.riderX} 
                    y1={order.riderY} 
                    x2={store.x} 
                    y2={store.y} 
                    className="delivery-path rider-to-store" 
                  />
                )}
                {/* Leg 2: Store to House */}
                <line 
                  x1={store.x} 
                  y1={store.y} 
                  x2={house.x} 
                  y2={house.y} 
                  className={`delivery-path store-to-house ${order.status === 'delivering' ? 'active-delivery' : ''}`}
                />
              </g>
            );
          })}

          {/* Houses */}
          {HOUSES.map(house => (
            <g key={house.id} className="map-node house-node">
              <circle cx={house.x} cy={house.y} r={16} className="house-marker-bg" />
              <text x={house.x} y={house.y + 4} className="node-icon">🏠</text>
              <text x={house.x} y={house.y + 26} className="node-label">{house.name}</text>
            </g>
          ))}

          {/* Stores */}
          {STORES.map(store => (
            <g key={store.id} className="map-node store-node">
              <circle cx={store.x} cy={store.y} r={18} className="store-marker-bg" style={{ stroke: store.color }} />
              <text x={store.x} y={store.y + 5} className="node-icon">{store.icon}</text>
              <text x={store.x} y={store.y + 28} className="node-label store-label">{store.name}</text>
            </g>
          ))}

          {/* Active Riders */}
          {activeOrders.map(order => {
            if (order.status === 'delivered' || order.riderX === undefined || order.riderY === undefined) return null;
            const isSelected = selectedRiderId === order.rider.id;

            return (
              <g key={`rider-marker-${order.id}`} className={`rider-marker ${isSelected ? 'selected' : ''}`}>
                <circle cx={order.riderX} cy={order.riderY} r={14} className="rider-marker-bg" />
                <text x={order.riderX} y={order.riderY + 4} className="rider-icon">{order.rider.avatar}</text>
                <text x={order.riderX} y={order.riderY - 18} className="rider-label">
                  {order.rider.name} ({Math.round(order.progress * 100)}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default Map;
