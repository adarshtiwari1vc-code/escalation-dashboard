import React, { useState, useMemo } from 'react';
import StatisticsCard from './StatisticsCard';
import ChartSection from './ChartSection';
import DataTable from './DataTable';
import FilterBar from './FilterBar';
import ExportButton from './ExportButton';
import './Dashboard.css';

const Dashboard = ({ data }) => {
  const [filters, setFilters] = useState({
    email: '',
    days: ''
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const emailMatch = item.email.toLowerCase().includes(filters.email.toLowerCase());
      const daysMatch = filters.days ? item.days === filters.days : true;
      return emailMatch && daysMatch;
    });
  }, [data, filters]);

  const stats = useMemo(() => {
    const uniqueEmails = new Set(filteredData.map(d => d.email)).size;
    const totalEscalations = filteredData.reduce((sum, d) => sum + d.count, 0);
    const avgPerEmail = uniqueEmails > 0 ? (totalEscalations / uniqueEmails).toFixed(2) : 0;
    const maxEscalations = filteredData.length > 0 ? Math.max(...filteredData.map(d => d.count)) : 0;

    return {
      uniqueEmails,
      totalEscalations,
      avgPerEmail,
      maxEscalations
    };
  }, [filteredData]);

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <FilterBar filters={filters} setFilters={setFilters} data={data} />
        <ExportButton data={filteredData} />
      </div>

      <div className="statistics-grid">
        <StatisticsCard
          title="Total Team Members"
          value={stats.uniqueEmails}
          icon="👥"
          color="#667eea"
        />
        <StatisticsCard
          title="Total Escalations"
          value={stats.totalEscalations}
          icon="📈"
          color="#764ba2"
        />
        <StatisticsCard
          title="Avg per Member"
          value={stats.avgPerEmail}
          icon="📊"
          color="#f093fb"
        />
        <StatisticsCard
          title="Highest Count"
          value={stats.maxEscalations}
          icon="🔥"
          color="#4facfe"
        />
      </div>

      <ChartSection data={filteredData} />

      <DataTable data={filteredData} />
    </div>
  );
};

export default Dashboard;