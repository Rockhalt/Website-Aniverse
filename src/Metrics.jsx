import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Metrics.css'; 

export default function Metrics() {
  const navigate = useNavigate();

  return (
    <div className="metrics-container">
      
      <header className="metrics-header">
        <div>
          <h1>✦ VAULT INTELLIGENCE</h1>
          <p className="subtitle">Live Global Analytics & Inventory Status</p>
        </div>
        <button className="btn-return-metrics" onClick={() => navigate('/')}>
          EXIT TERMINAL
        </button>
      </header>

      <div className="dashboard-grid">
        
        {/* KPI Card 1 */}
        <div className="metric-card">
          <span className="metric-label">Gross Volume (30D)</span>
          <h2 className="metric-value">$14,285</h2>
          <span className="metric-trend trend-up">↑ +12.4% vs last month</span>
        </div>

        {/* KPI Card 2 */}
        <div className="metric-card">
          <span className="metric-label">Active Vault Visitors</span>
          <h2 className="metric-value">1,042</h2>
          <span className="metric-trend trend-up">↑ +5.2% traffic surge</span>
        </div>

        {/* KPI Card 3 */}
        <div className="metric-card">
          <span className="metric-label">Conversion Rate</span>
          <h2 className="metric-value">3.8%</h2>
          <span className="metric-trend trend-down">↓ -0.4% checkout drop</span>
        </div>

        {/* Wide Card: Top Performers */}
        <div className="metric-card wide">
          <span className="metric-label">Top Moving Assets</span>
          <ul className="performers-list">
            <li className="performer-item">
              <span className="performer-name">Heavyweight Cloud Cloak (Matte Black)</span>
              <span className="performer-stat">142 UNITS</span>
            </li>
            <li className="performer-item">
              <span className="performer-name">Sun Breathing Nichirin (Carbon)</span>
              <span className="performer-stat">89 UNITS</span>
            </li>
            <li className="performer-item">
              <span className="performer-name">Mangekyou Obsidian Signet Ring</span>
              <span className="performer-stat">76 UNITS</span>
            </li>
          </ul>
        </div>

        {/* Status Card: Inventory Alerts */}
        <div className="metric-card">
          <span className="metric-label">System Alerts</span>
          <ul className="performers-list">
            <li className="performer-item">
              <span className="performer-name" style={{ color: '#8b0000' }}>Low Stock: Shadow Mask</span>
              <span className="performer-stat">3 LEFT</span>
            </li>
            <li className="performer-item">
              <span className="performer-name" style={{ color: '#8b0000' }}>Low Stock: Gold Kunai</span>
              <span className="performer-stat">2 LEFT</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}