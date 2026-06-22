import React from 'react';
import './ExportButton.css';

const ExportButton = ({ data }) => {
  const handleExportCSV = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Email', 'Time Bucket', 'Count'];
    const rows = data.map(item => [item.email, item.days, item.count]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `escalation-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `escalation-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="export-buttons">
      <button className="export-btn export-csv" onClick={handleExportCSV}>
        📥 Export CSV
      </button>
      <button className="export-btn export-json" onClick={handleExportJSON}>
        📥 Export JSON
      </button>
    </div>
  );
};

export default ExportButton;