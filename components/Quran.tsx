import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar"; // Import Navbar
import "../styles/globals.css";

const Quran = () => {
  const [surahs, setSurahs] = useState<any[]>([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      const response = await axios.get('https://api.alquran.cloud/v1/surah');
      setSurahs(response.data.data);
    };
    fetchSurahs();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-2">Quran Surahs</h1>
      <ul>
        {surahs.map((surah) => (
          <li key={surah.number} className="mb-1">
            {surah.number}. {surah.englishName} ({surah.englishNameTranslation})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quran;









