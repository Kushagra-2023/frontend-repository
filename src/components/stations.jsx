import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Homepage from './homepage';

export default function StationList() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    // If userId is null, redirect to login
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);
  const [stationData, setStationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch station data
  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/booking/station")
  //     .then(response => response.json())
  //     .then(data => {
  //       const formattedData = data.map(station => ({
  //         id: station.station_id,
  //         label: station.station_name,  // Using the station's name as the label
  //       }));
  //       setStationData(formattedData);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setLoading(true); // Ensure loading state is reset
    axios.get("http://127.0.0.1:8000/booking/station")
      .then((response) => {
        const formattedData = response.data.map(station => ({
          id: station.station_id,
          label: station.station_name,
        }));
        setStationData(formattedData);
        console.log(formattedData[0]);
        setLoading(false); // Mark loading as complete
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Mark loading as complete even on error
      });
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "Something went wrong."}</div>;
  if (stationData.length === 0 && !loading) return <div>No stations found.</div>;
  // Pass the station data as a prop to BookingForm
  return <Homepage stationData={stationData} />;
}
