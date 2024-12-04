import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for an Ayah
interface Ayah {
  numberInSurah: number;
  text: string;
}

// Define the type for Surah details
interface SurahDetail {
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}

const SurahDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic parameter from the URL
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    if (!id) return; // Wait for the `id` to be defined

    const fetchSurah = async () => {
      try {
        // Use the correct endpoint to fetch Surah details
        const response = await axios.get<{ data: SurahDetail }>(
          `https://api.alquran.cloud/v1/surah/${id}`
        );
        setSurah(response.data.data); // Access the Surah detail
      } catch (error) {
        console.error("Error fetching surah details:", error);
        setError("Failed to load Surah content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6">{error}</div>;
  }

  if (!surah) {
    return <div className="container mx-auto p-6">Surah not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {surah.name} - {surah.englishName} ({surah.englishNameTranslation})
      </h1>
      <p className="text-gray-600 mb-4">Revelation Type: {surah.revelationType}</p>
      <div className="space-y-4">
        {surah.ayahs.map((ayah) => (
          <div key={ayah.numberInSurah} className="p-4 border rounded shadow">
            <p className="font-bold">Ayah {ayah.numberInSurah}:</p>
            <p>{ayah.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetails;


