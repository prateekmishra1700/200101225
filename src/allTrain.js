import React, { useEffect, useState } from 'react';
import axios from 'axios';

// component for all trains data
const allTrain = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        
        const apiKey = 'JnNPGs';
        const apiUrl = 'http://20.244.56.144/train/schedule';

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        };

        const response = await axios.get(apiUrl, { headers });
        const filteredTrains = response.data.filter(train => !isDepartingSoon(train));
        const sortedTrains = sortTrains(filteredTrains);
        setTrains(sortedTrains);
      } catch (error) {
        console.error('Error fetching train schedules:', error.message);
      }
    };

    fetchTrains();
  }, []);

  const isDepartingSoon = (train) => {
    const departureTime = new Date(train.departureTime); 
    const currentTime = new Date();
  
    //difference b/w departure and current time
    const timeDifferenceInMinutes = (departureTime - currentTime) / (1000 * 60);
  
    return timeDifferenceInMinutes <= 30;
  };
  

  const sortTrains = (trains) => {
    // sortAscending
    trains.sort((a, b) => a.price - b.price);
  
    // sortAscending
    trains.sort((a, b) => b.tickets - a.tickets);
  
    //sprt based on departure time
    trains.sort((a, b) => {
      const departureTimeA = new Date(a.departureTime); 
      const departureTimeB = new Date(b.departureTime);
      const delayA = a.delay || 0; 
      const delayB = b.delay || 0;
  
      return (departureTimeB.getTime() + delayB * 60000) - (departureTimeA.getTime() + delayA * 60000);
    });
  
    return trains;
  };
  

  return (
    <div>
    <h1>All Train Schedule</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Departure Time</th>
          <th>Delay (minutes)</th>
          <th>Available Seats (Sleeper)</th>
          <th>Available Seats (AC)</th>
          <th>Price (Sleeper)</th>
          <th>Price (AC)</th>
        </tr>
      </thead>
      <tbody>
        {trains.map(train => (
          <tr key={train.id}>
            <td>{train.name}</td>
            <td>{train.departureTime}</td>
            <td>{train.delay || 0}</td>
            <td>{train.seatAvailability.sleeper}</td>
            <td>{train.seatAvailability.AC}</td>
            <td>{train.prices.sleeper}</td>
            <td>{train.prices.AC}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};



export default allTrain;
