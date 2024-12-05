import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "../styles/globals.css"; 
import Navbar from "../components/Navbar";

// Define the API URL and Edition (You can change edition if needed)
const API_URL = "http://api.alquran.cloud/v1/quran/quran-uthmani";

const QuranPage = () => {
  const [surahs, setSurahs] = useState<any[]>([]); // Store surahs list
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Function to fetch Surahs from the API
  useEffect(() => {
    const fetchSurahs = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        // Making the GET request to the API
        const response = await axios.get(API_URL);

        // Extract surah data from the response and set it in state
        if (response.data && response.data.data && response.data.data.surahs) {
          setSurahs(response.data.data.surahs); // Assuming the surah list is in `data.surahs`
        } else {
          setError("Surah data not found in response.");
        }
      } catch (err: any) {
        // Catch and handle any errors during the API call
        setError("Failed to load Surahs. Please try again later.");
        console.error("API request error: ", err.message);
      } finally {
        setLoading(false); // Set loading to false after the API call finishes
      }
    };

    fetchSurahs(); // Call the function to fetch surahs
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Quran</h1>
      
      {/* Loading state */}
      {loading ? (
        <div className="text-center">Loading Surahs...</div>
      ) : error ? (
        // Show error message if something went wrong
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">List of Surahs</h2>
          <ul className="space-y-2">
            {/* Map through surahs and display them */}
            {surahs.length > 0 ? (
              surahs.map((surah: any) => (
                <li key={surah.number} className="flex items-center justify-between">
                  <Link
                    href={`/quran/surah/${surah.number}`}
                    className="text-blue-500 hover:underline text-lg"
                  >
                    {surah.name} ({surah.englishName})
                  </Link>
                  <span className="text-gray-500">Ayahs: {surah.numberOfAyahs}</span>
                </li>
              ))
            ) : (
              <div className="text-center text-gray-500">No Surahs found.</div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuranPage;












