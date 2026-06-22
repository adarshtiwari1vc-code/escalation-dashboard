import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ backgroundColor: `${color}20` }}>
        <span className="icon-text">{icon}</span>
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value" style={{ color }}>{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;