import React, { useState } from 'react';
import './DataUpload.css';

const DataUpload = ({ onDataUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // Simple CSV parsing
        const csv = event.target.result;
        const lines = csv.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          return {
            email: values[0],
            days: values[1],
            count: parseInt(values[2]) || 0
          };
        }).filter(item => item.email && item.days);

        onDataUpload(data);
      } catch (error) {
        alert('Error parsing file. Please ensure it\'s in CSV format with columns: email, days, count');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>📁 Upload Your Data</h2>
        <p className="upload-description">
          Upload a CSV file with escalation data in the following format:
        </p>
        <pre className="format-example">
{`email,days,count
john.doe@company.com,0 days,10
john.doe@company.com,1 day,5`}
        </pre>
        
        <div
          className={`upload-area ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📤</div>
          <p className="upload-text">Drag and drop your CSV file here</p>
          <p className="upload-or">or</p>
          <label className="upload-button">
            Browse Files
            <input
              type="file"
              accept=".csv"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;