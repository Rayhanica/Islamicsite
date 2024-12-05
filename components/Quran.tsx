import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import "../styles/globals.css"; 
import Navbar from "../components/Navbar"; 

interface Surah {
  number: number;
  name: string;
  englishName: string;
}

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/quran/edition/quran-uthmani");
        setSurahs(response.data.data.surahs); // Extract the Surah list
      } catch (error) {
        setError("Failed to load Surahs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-6">List of Surahs</h1>
      <ul>
        {surahs.map((surah) => (
          <li key={surah.number} className="mb-4">
            <Link
              href={`/quran/surah/${surah.number}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {surah.name} ({surah.englishName})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quran;





