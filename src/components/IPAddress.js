// // filepath: src/components/IPAddress.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const IPAddress = () => {
//   const [ip, setIP] = useState('');

//   useEffect(() => {
//     const fetchIP = async () => {
//       try {
//         const response = await axios.get('https://api.ipify.org?format=json');
//         setIP(response.data.ip);
//       } catch (error) {
//         console.error('Error fetching IP address:', error);
//       }
//     };

//     fetchIP();
//   }, []);

//   return (
//     <div>
//       <h3>Your IP Address is: {ip}</h3>
//     </div>
//   );
// };

// export default IPAddress;