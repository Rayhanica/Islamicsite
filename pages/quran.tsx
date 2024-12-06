import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar"; // Assuming Navbar exists
import "../styles/globals.css";

// Surah interface
interface Surah {
  number: number;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
}

const QuranPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // To track search input

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        if (response.data.code === 200) {
          setSurahs(response.data.data);
          setFilteredSurahs(response.data.data); // Initially show all surahs
        } else {
          setError("Failed to fetch surahs.");
        }
      } catch (err) {
        setError("Error fetching surahs.");
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter surahs based on the query
    const filtered = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query)
    );
    setFilteredSurahs(filtered);
  };

  if (loading) return <p>Loading Surahs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold text-center mb-6">Quran Surahs</h1>
        
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Surah..."
            className="px-4 py-2 w-2/3 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Display Surahs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} href={`/quran/${surah.number}`} className="block p-4 bg-white rounded-lg shadow hover:bg-green-100 transition">
              <h2 className="text-2xl font-semibold text-teal-600">
                {surah.number}. {surah.englishName}
              </h2>
              <p className="text-gray-600">{surah.englishNameTranslation}</p>
              <span className="text-sm text-gray-500">{surah.revelationType}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranPage;





















