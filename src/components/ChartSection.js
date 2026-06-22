import React, { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './ChartSection.css';

const ChartSection = ({ data }) => {
  const emailData = useMemo(() => {
    const emailMap = {};
    data.forEach(item => {
      if (!emailMap[item.email]) {
        emailMap[item.email] = 0;
      }
      emailMap[item.email] += item.count;
    });

    return Object.entries(emailMap)
      .map(([email, count]) => ({
        email: email.split('.')[0],
        count,
        fullEmail: email
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  const daysData = useMemo(() => {
    const daysMap = {};
    data.forEach(item => {
      if (!daysMap[item.days]) {
        daysMap[item.days] = 0;
      }
      daysMap[item.days] += item.count;
    });

    const dayOrder = ['0 days', '1 day', '3 days', '5 days', '>5 days', '>7 days'];
    return dayOrder
      .map(day => ({
        name: day,
        value: daysMap[day] || 0
      }))
      .filter(item => item.value > 0);
  }, [data]);

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b'];

  return (
    <div className="charts-section">
      <div className="chart-container">
        <h3 className="chart-title">Top Team Members by Escalations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={emailData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="email" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Escalations by Time Bucket</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daysData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#764ba2"
              strokeWidth={3}
              dot={{ fill: '#764ba2', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Distribution by Time Bucket</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={daysData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {daysData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;