import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

const surahNames = [
  "Al-Fatiha", "Al-Baqarah", "Aali Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
  "Hud", "Yusuf", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya",
  "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajda",
  "Al-Ahzab", "Ya-Sin", "Az-Zumar", "Fussilat", "Al-Jathiya", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat",
  "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina", "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim",
  "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Maarij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyama", "Al-Insan",
  "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq",
  "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq",
  "Al-Qadr", "Al-Bayyina", "Az-Zalzalah", "Al-Adiyat", "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraish",
  "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

interface Verse {
  numberInSurah: number;
  text: string;
  translation: string;
}

const VerseCard = ({ verse }: { verse: Verse }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
    <p className="text-2xl text-gray-700 font-semibold">
      {verse.numberInSurah}. {verse.text}
    </p>
    <p className="text-lg text-gray-500 italic mt-2">{verse.translation}</p>
  </div>
);

const QuranSurahPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [verses, setVerses] = useState<Verse[]>([]);
  const [surahName, setSurahName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSurah = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.sahih`
        );

        if (response.data.code === 200) {
          const arabicVerses = response.data.data[0].ayahs;
          const englishVerses = response.data.data[1].ayahs;

          setSurahName(surahNames[parseInt(id as string, 10) - 1] || `Surah ${id}`);
          const combinedVerses = arabicVerses.map((verse: any, index: number) => ({
            numberInSurah: verse.numberInSurah,
            text: verse.text,
            translation: englishVerses[index].text,
          }));

          setVerses(combinedVerses);
        } else {
          setError("Failed to fetch verses.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch the Surah. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);

  if (!id || loading) return <p>Loading verses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          {surahName}
        </h1>

        <div className="flex justify-between mb-6">
          <Link
            href={`/quran/${Math.max(parseInt(id as string, 10) - 1, 1)}`}
            className="px-4 py-2 bg-teal-500 text-white rounded"
          >
            Previous Surah
          </Link>
          <Link
            href="/quran"
            className="px-4 py-2 bg-teal-500 text-white rounded"
          >
            Back to Quran
          </Link>
          <Link
            href={`/quran/${Math.min(parseInt(id as string, 10) + 1, 114)}`}
            className="px-4 py-2 bg-teal-500 text-white rounded"
          >
            Next Surah
          </Link>
        </div>

        <div className="space-y-6">
          {verses.map((verse) => (
            <VerseCard key={verse.numberInSurah} verse={verse} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranSurahPage;





















