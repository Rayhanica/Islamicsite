import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar"; // Navbar component
import "../styles/globals.css";

interface Surah {
  number: number;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
}

const QuranPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.sahih-international.com/v1/surahs");
        setSurahs(response.data.data);
        setFilteredSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching Surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const results = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query)
    );
    setFilteredSurahs(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Quran Surahs</h1>
        <input
          type="text"
          placeholder="Search for a surah..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 mb-6 border rounded-lg shadow"
        />
        {loading ? (
          <p className="text-center text-lg">Loading Surahs...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurahs.map((surah) => (
              <li key={surah.number} className="p-4 bg-white rounded shadow hover:bg-gray-200">
                <Link href={`/quran/${surah.number}`}>
                  <a>
                    <h2 className="text-2xl font-bold text-teal-600">
                      {surah.number}. {surah.englishName}
                    </h2>
                    <p className="text-gray-600">{surah.englishNameTranslation}</p>
                    <p className="text-sm text-gray-500">{surah.revelationType}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuranPage;








