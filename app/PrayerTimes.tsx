import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import your Navbar component

const PrayerTimesPage = () => {
  const [prayerTimes, setPrayerTimes] = useState<any>(null); // Store prayer times
  const [city, setCity] = useState("New York"); // Default city
  const [loading, setLoading] = useState(false); // Loading state

  // Function to convert 24-hour time to 12-hour AM/PM format
  const formatTimeTo12Hour = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const minuteFormatted = minute < 10 ? `0${minute}` : minute;
    return `${hour12}:${minuteFormatted} ${suffix}`;
  };

  // Fetch prayer times based on city
  const fetchPrayerTimes = async (city: string) => {
    setLoading(true);
    try {
      // Fetch prayer times from Aladhan API
      const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity`, {
        params: {
          city: city,
          country: "USA", // Replace with your country
          method: 2, // You can change method to get different calculation methods
        },
      });
      const timings = response.data.data.timings;

      // Convert all prayer times to 12-hour AM/PM format
      const formattedTimes = Object.keys(timings).reduce((acc, prayer) => {
        acc[prayer] = formatTimeTo12Hour(timings[prayer]);
        return acc;
      }, {});

      setPrayerTimes(formattedTimes);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch prayer times when the page loads
  useEffect(() => {
    fetchPrayerTimes(city);
  }, [city]);

  return (
    <div className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-serif font-extrabold text-gold-600 text-center mb-8">
          Prayer Times in {city}
        </h1>

        {/* Search Input for City */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full max-w-lg p-3 rounded-lg text-gray-800 focus:outline-none shadow-lg"
          />
        </div>

        {/* Display Prayer Times */}
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <div className="space-y-6">
            {prayerTimes ? (
              <ul>
                {Object.keys(prayerTimes).map((prayer) => (
                  <li
                    key={prayer}
                    className="p-6 border rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-50"
                  >
                    <h2 className="text-2xl font-serif font-semibold text-gold-600">
                      {prayer}
                    </h2>
                    <p className="text-gray-700 mt-2">{prayerTimes[prayer]}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg">No data available for this location.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimesPage;

