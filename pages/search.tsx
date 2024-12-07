import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

interface SearchResult {
  surah: {
    number: number;
    name: string;
  };
  text: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/search/${query}`
      );

      if (response.data.code === 200) {
        const hits: SearchResult[] = response.data.data.hits.map((hit: any) => ({
          surah: {
            number: hit.surah.number,
            name: hit.surah.name,
          },
          text: hit.text,
        }));
        setResults(hits);
      } else {
        setError("No results found.");
      }
    } catch {
      setError("Error searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Search Quran</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search for a verse, surah, or word..."
            className="p-2 border border-gray-300 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-teal-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && <p>Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.surah.number} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{result.surah.name}</h3>
              <p>{result.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;


