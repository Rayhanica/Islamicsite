import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/globals.css";

interface Surah {
  number: number;
  englishName: string;
  englishNameTranslation: string;
}

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
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










