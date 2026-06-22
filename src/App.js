import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import DataUpload from './components/DataUpload';
import { parseExcelData } from './utils/dataParser';

function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load sample data on mount
  useEffect(() => {
    const sampleData = [
      { email: 'arunkumarrathod.vc@flipkart.com', days: '0 days', count: 14 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '1 day', count: 1 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '14 days', count: 14 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '3 days', count: 7 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '5 days', count: 24 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '>5 days', count: 24 },
      { email: 'arunkumarrathod.vc@flipkart.com', days: '>7 days', count: 29 },
      
      { email: 'hajirashaheen.vc@flipkart.com', days: '0 days', count: 33 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '1 day', count: 13 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '14 days', count: 20 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '3 days', count: 9 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '5 days', count: 24 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '>5 days', count: 10 },
      { email: 'hajirashaheen.vc@flipkart.com', days: '>7 days', count: 22 },
      
      { email: 'afshanfathima.vc@flipkart.com', days: '0 days', count: 37 },
      { email: 'afshanfathima.vc@flipkart.com', days: '1 day', count: 12 },
      { email: 'afshanfathima.vc@flipkart.com', days: '14 days', count: 20 },
      { email: 'afshanfathima.vc@flipkart.com', days: '3 days', count: 18 },
      { email: 'afshanfathima.vc@flipkart.com', days: '5 days', count: 17 },
      { email: 'afshanfathima.vc@flipkart.com', days: '>5 days', count: 9 },
      { email: 'afshanfathima.vc@flipkart.com', days: '>7 days', count: 19 },
    ];
    setData(sampleData);
    setIsLoaded(true);
  }, []);

  const handleDataUpload = (uploadedData) => {
    setData(uploadedData);
    setIsLoaded(true);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📊 Escalation Management Dashboard</h1>
          <p>Real-time monitoring and analytics</p>
        </div>
      </header>
      
      <main className="app-main">
        {isLoaded && data.length > 0 ? (
          <Dashboard data={data} />
        ) : (
          <DataUpload onDataUpload={handleDataUpload} />
        )}
      </main>
    </div>
  );
}

export default App;
