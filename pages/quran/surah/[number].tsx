import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://api.alquran.cloud/v1/quran/quran-simple/surah";

const SurahPage = () => {
  const router = useRouter();
  const { number } = router.query; // Get the Surah number from the URL
  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!number) return; // If the Surah number is not yet available, do nothing

    const fetchSurah = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/${number}`);
        setSurah(response.data.data); // Assuming the API returns data under 'data' property
        setLoading(false);
      } catch (err) {
        setError("Failed to load Surah content. Please try again later.");
        setLoading(false);
      }
    };
    fetchSurah();
  }, [number]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{surah.name}</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{surah.englishName}</h2>
      <p className="italic mb-6">{surah.englishNameTranslation}</p>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Ayahs:</h3>
        <div>
          {surah.ayahs.map((ayah: any, index: number) => (
            <p key={index} className="text-lg mb-2">
              {ayah.text} <span className="text-sm text-gray-600">({ayah.number})</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurahPage;

