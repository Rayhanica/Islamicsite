import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import { Howl } from "howler";

interface Verse {
  numberInSurah: number;
  text: string;
  translation: string;
  audio: string;
}

const QuranSurahPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVerses = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.sahih`
        );
        if (response.data.code === 200) {
          const arabicVerses = response.data.data[0].ayahs;
          const englishVerses = response.data.data[1].ayahs;

          const combinedVerses = arabicVerses.map((verse: any, index: number) => ({
            numberInSurah: verse.numberInSurah,
            text: verse.text,
            translation: englishVerses[index].text,
            audio: verse.audio,
          }));

          setVerses(combinedVerses);
        } else {
          setError("Failed to fetch verses.");
        }
      } catch (err) {
        setError("Error fetching verses.");
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [id]);

  const playAudio = (audioUrl: string) => {
    const sound = new Howl({ src: [audioUrl] });
    sound.play();
  };

  if (loading) return <p>Loading verses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Surah {id}
        </h1>
        <div className="space-y-4">
          {verses.map((verse) => (
            <div key={verse.numberInSurah} className="p-4 bg-white rounded shadow">
              <p className="text-xl text-gray-700">{verse.text}</p>
              <p className="text-sm text-gray-500 italic">{verse.translation}</p>
              <button
                onClick={() => playAudio(verse.audio)}
                className="mt-2 px-4 py-2 bg-teal-500 text-white rounded"
              >
                Play Audio
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranSurahPage;







