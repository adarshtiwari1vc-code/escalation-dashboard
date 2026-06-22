import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'desc' });

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="data-table-container">
      <h3 className="table-title">📋 Detailed Escalation Data</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('email')} className="sortable">
                Email {getSortIndicator('email')}
              </th>
              <th onClick={() => handleSort('days')} className="sortable">
                Time Bucket {getSortIndicator('days')}
              </th>
              <th onClick={() => handleSort('count')} className="sortable">
                Count {getSortIndicator('count')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                <td className="email-cell">{item.email}</td>
                <td className="days-cell">
                  <span className="days-badge">{item.days}</span>
                </td>
                <td className="count-cell">
                  <span className="count-badge">{item.count}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <p>Showing {sortedData.length} records</p>
      </div>
    </div>
  );
};

export default DataTable;