// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Admin = () => {
//   const [vehicleType, setVehicleType] = useState('');
//   const [licensePlate, setLicensePlate] = useState('');
//   const [driverName, setDriverName] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [editingId, setEditingId] = useState(null);  // Track which data is being edited

//   useEffect(() => {
//     // Fetch all data when the component mounts
//     axios.get('http://localhost:8000/api/data')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         setError('Error fetching data');
//       });
//   }, []);

//   const handleCreate = (e) => {
//     e.preventDefault();

//     const newData = {
//       vehicle_type: vehicleType,
//       license_plate: licensePlate,
//       driver_name: driverName,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//     };

//     axios.post('http://localhost:8000/api/data', newData)
//       .then((response) => {
//         setMessage('Data added successfully!');
//         setData([...data, response.data]); // Add new data to the list
//         resetForm();
//       })
//       .catch((error) => {
//         setError('Error adding data');
//       });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const updatedData = {
//       vehicle_type: vehicleType,
//       license_plate: licensePlate,
//       driver_name: driverName,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//     };

//     axios.put(`http://localhost:8000/api/data/${editingId}`, updatedData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
//       }
//     })

//       .then((response) => {
//         setMessage('Data updated successfully!');
//         const updatedList = data.map(item =>
//           item.id === editingId ? response.data : item
//         );
//         setData(updatedList); // Update the data list
//         resetForm();
//       })
//       .catch((error) => {
//   if (!error.response) {
//     console.error('Network Error:', error.message);
//     setError('Network Error: Please check your internet connection.');
//   } else {
//     console.error('Error updating data:', error.response.data);
//     setError('Error updating data');
//   }
// });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:8000/api/data/${id}`)
//       .then(() => {
//         setMessage('Data deleted successfully!');
//         const filteredData = data.filter(item => item.id !== id);
//         setData(filteredData); // Remove deleted item from the list
//       })
//       .catch((error) => {
//         setError('Error deleting data');
//       });
//   };

//   const handleEdit = (item) => {
//     setEditingId(item.id);  // Set the ID of the data being edited
//     setVehicleType(item.vehicle_type);
//     setLicensePlate(item.license_plate);
//     setDriverName(item.driver_name);
//     setLatitude(item.latitude);
//     setLongitude(item.longitude);
//   };

//   const resetForm = () => {
//     setEditingId(null);  // Clear editing state
//     setVehicleType('');
//     setLicensePlate('');
//     setDriverName('');
//     setLatitude('');
//     setLongitude('');
//   };

//   return (
//     <div>
//       <h2>Admin Panel - Manage Vehicle Data</h2>

//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* Form for adding or updating data */}
//       <form onSubmit={editingId ? handleUpdate : handleCreate}>
//         <div>
//           <label>Vehicle Type:</label>
//           <input
//             type="text"
//             value={vehicleType}
//             onChange={(e) => setVehicleType(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>License Plate:</label>
//           <input
//             type="text"
//             value={licensePlate}
//             onChange={(e) => setLicensePlate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Driver Name:</label>
//           <input
//             type="text"
//             value={driverName}
//             onChange={(e) => setDriverName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Latitude:</label>
//           <input
//             type="number"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Longitude:</label>
//           <input
//             type="number"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">{editingId ? 'Update Data' : 'Add Data'}</button>
//       </form>

//       {/* Display all data */}
//       <h3>Existing Vehicle Data</h3>
//       <div>
//         {data.map((item) => (
//           <div key={item.id}>
//             <p>Vehicle Type: {item.vehicle_type}</p>
//             <p>License Plate: {item.license_plate}</p>
//             <p>Driver Name: {item.driver_name}</p>
//             <p>Latitude: {item.latitude}</p>
//             <p>Longitude: {item.longitude}</p>

//             {/* Edit and Delete buttons */}
//             <button onClick={() => handleEdit(item)}>Edit</button>
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Admin;

//line 
// .catch((error) => {
//   console.error('Error updating data:', error.response ? error.response.data : error.message);
//   setError('Error updating data');
// });

// .catch((error) => {
//   if (!error.response) {
//     console.error('Network Error:', error.message);
//     setError('Network Error: Please check your internet connection.');
//   } else {
//     console.error('Error updating data:', error.response.data);
//     setError('Error updating data');
//   }
// });


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";

const Admin = () => {
  const location = useLocation();
  const initialData = location.state?.data || [];

  const [vehicleType, setVehicleType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [driverName, setDriverName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track which data is being edited

  const handleCreate = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(), // Generate a unique ID for the new item
      vehicleType,
      licensePlate,
      driverName,
      latitude,
      longitude,
    };
    setData([...data, newItem]);
    setMessage("Item added successfully");
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setVehicleType(itemToEdit.vehicleType);
    setLicensePlate(itemToEdit.licensePlate);
    setDriverName(itemToEdit.driverName);
    setLatitude(itemToEdit.latitude);
    setLongitude(itemToEdit.longitude);
    setEditingId(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = data.map((item) =>
      item.id === editingId
        ? { ...item, vehicleType, licensePlate, driverName, latitude, longitude }
        : item
    );
    setData(updatedData);
    setMessage("Item updated successfully");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setMessage("Item deleted successfully");
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <button type="submit" className="add-button" >{editingId ? "Update" : "Add"}</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.vehicleType} - {item.licensePlate} - {item.driverName} - {item.latitude} - {item.longitude}
            <button className="edit-button" onClick={() => handleEdit(item.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;