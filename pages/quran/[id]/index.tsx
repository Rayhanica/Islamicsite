import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Howl } from "howler";
import Navbar from "../../../components/Navbar"; // Adjust the import path for Navbar
import "../../../styles/globals.css";

interface Verse {
  number: number;
  text: string;
  translation: string;
  tafsir: string;
  audio: string;
}

const QuranSurahPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerses = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`https://api.sahih-international.com/v1/surah/${id}`);
        setVerses(response.data.verses);
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerses();
  }, [id]);

  const playAudio = (url: string) => {
    const sound = new Howl({ src: [url] });
    sound.play();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="container mx-auto py-8">
        {loading ? (
          <p className="text-center text-lg">Loading verses...</p>
        ) : (
          <div>
            {verses.map((verse) => (
              <div key={verse.number} className="mb-6 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold text-teal-600">Verse {verse.number}</h2>
                <p className="text-lg text-gray-800">{verse.text}</p>
                <p className="text-sm text-gray-600 italic">{verse.translation}</p>
                <p className="text-sm text-gray-500 mt-2">{verse.tafsir}</p>
                <button
                  onClick={() => playAudio(verse.audio)}
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
                >
                  Play Audio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranSurahPage;






