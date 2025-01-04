import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);  // Track which data is being edited

  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
      setError('Error fetching data');
      });
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();

    const newData = {
      vehicle_type: vehicleType,
      license_plate: licensePlate,
      driver_name: driverName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    axios.post('http://localhost:8000/api/data', newData)
      .then((response) => {
        setMessage('Data added successfully!');
        setData([...data, response.data]); // Add new data to the list
        resetForm();
      })
      .catch((error) => {
        setError('Error adding data');
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      vehicle_type: vehicleType,
      license_plate: licensePlate,
      driver_name: driverName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    axios.put(`http://localhost:8000/api/data/${editingId}`, updatedData)
      .then((response) => {
        setMessage('Data updated successfully!');
        const updatedList = data.map(item =>
          item.id === editingId ? response.data : item
        );
        setData(updatedList); // Update the data list
        resetForm();
      })
      .catch((error) => {
        setError('Error updating data');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/data/${id}`)
      .then(() => {
        setMessage('Data deleted successfully!');
        const filteredData = data.filter(item => item.id !== id);
        setData(filteredData); // Remove deleted item from the list
      })
      .catch((error) => {
        setError('Error deleting data');
      });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);  // Set the ID of the data being edited
    setVehicleType(item.vehicle_type);
    setLicensePlate(item.license_plate);
    setDriverName(item.driver_name);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
  };

  const resetForm = () => {
    setEditingId(null);  // Clear editing state
    setVehicleType('');
    setLicensePlate('');
    setDriverName('');
    setLatitude('');
    setLongitude('');
  };
 
  return (
    <div>
      <h2>Admin Panel - Manage Vehicle Data</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Driver Name:</label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>

        <button type="submit">{editingId ? 'Update Data' : 'Add Data'}</button>
      </form>

      <h3>Existing Vehicle Data</h3>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <p>Vehicle Type: {item.vehicle_type}</p>
            <p>License Plate: {item.license_plate}</p>
            <p>Driver Name: {item.driver_name}</p>
            <p>Latitude: {item.latitude}</p>
            <p>Longitude: {item.longitude}</p>

            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;