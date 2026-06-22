import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, setFilters, data }) => {
  const uniqueDays = [...new Set(data.map(d => d.days))].sort();
  const uniqueEmails = [...new Set(data.map(d => d.email))];

  const handleClearFilters = () => {
    setFilters({ email: '', days: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="email-filter">Search by Email:</label>
        <input
          id="email-filter"
          type="text"
          placeholder="Search team member..."
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="days-filter">Filter by Time:</label>
        <select
          id="days-filter"
          value={filters.days}
          onChange={(e) => setFilters({ ...filters, days: e.target.value })}
          className="filter-select"
        >
          <option value="">All Time Buckets</option>
          {uniqueDays.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <button className="clear-btn" onClick={handleClearFilters}>
        🔄 Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;