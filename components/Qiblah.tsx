"use client";
import { useState } from 'react';
import axios from 'axios';

// Define the structure of the API response
interface QiblahResponse {
  data: {
    direction: number; // The direction is a number (e.g., 120 degrees)
  };
}

const Qiblah = () => {
  const [direction, setDirection] = useState<number | null>(null);

  const fetchQiblah = async () => {
    try {
      const response = await axios.get<QiblahResponse>('https://api.aladhan.com/v1/qibla', {
        params: { latitude: 21.3891, longitude: 39.8579 },
      });
      // Now TypeScript knows that response.data has the correct shape
      setDirection(response.data.data.direction);
    } catch (error) {
      console.error('Error fetching Qiblah direction:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-2">Qiblah Direction</h1>
      <button
        onClick={fetchQiblah}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Qiblah Direction
      </button>
      {direction !== null && <p className="mt-4">Direction: {direction}°</p>}
    </div>
  );
};

export default Qiblah;
