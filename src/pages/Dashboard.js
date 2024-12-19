import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    // Fetch data from the Laravel API
    axios.get('http://localhost:8000/api/data')  // Update with your actual API URL
      .then((response) => {
        setData(response.data);  // Set the fetched data
        setLoading(false);        // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Error fetching data');  // Set error if request fails
        setLoading(false);                // Set loading to false if an error occurs
      });
  }, []);  // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading...</p>  // Show loading message if data is still being fetched
      ) : error ? (
        <p>{error}</p>  // Display error message if there is an issue
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <p>Vehicle Type: {item.vehicle_type}</p>
              <p>License Plate: {item.license_plate}</p>
              <p>Driver Name: {item.driver_name}</p>
              <p>Latitude: {item.latitude}</p>
              <p>Longitude: {item.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
