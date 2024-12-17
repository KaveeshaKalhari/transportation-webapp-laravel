import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching transportation data
    const sampleData = [
      { id: 1, route: 'Route 1', status: 'On time' },
      { id: 2, route: 'Route 2', status: 'Delayed' },
      { id: 3, route: 'Route 3', status: 'On time' },
    ];

    setData(sampleData);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {data.map((item) => (
        <div key={item.id}>
          <p>Route: {item.route}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
