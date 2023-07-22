import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// compnent for single train data
const singleTrain = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        
        const apiKey = 'JnNPGs';
        const apiUrl = `http://20.244.56.144/train/schedule/${trainId}`;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        };

        const response = await axios.get(apiUrl, { headers });
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching single train:', error.message);
      }
    };

    fetchTrain();
  }, [trainId]);

  return (
    <div>
      {train ? (
        <div>
          <h1>Train Details</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default singleTrain;
