import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
}

const duas: Dua[] = [
  // Morning Duas
  {
    id: 1,
    title: "Dua for Morning",
    arabic: "اللّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allahumma bika asbahnaa wa bika amsaynaa wa bika nahyaa wa bika namootu wa ilaykan-nushoor.",
    translation: "O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die, and unto You is our return.",
    category: "Morning Duas"
  },
  {
    id: 2,
    title: "Dua for Light in Morning",
    arabic: "اللّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا",
    transliteration: "Allahumma aj'al fi qalbi nooran, wa fi basari nooran, wa fi sam'i nooran.",
    translation: "O Allah, place light in my heart, light in my sight, and light in my hearing.",
    category: "Morning Duas"
  },

  // Evening Duas
  {
    id: 101,
    title: "Dua for Evening",
    arabic: "اللّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsaynaa wa bika asbahnaa wa bika nahyaa wa bika namootu wa ilaykal-maseer.",
    translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die, and unto You is our return.",
    category: "Evening Duas"
  },

  // After Prayer Duas
  {
    id: 201,
    title: "Dua for Forgiveness After Prayer",
    arabic: "اللّهُمَّ اغْفِرْ لِي، وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Allahumma-ghfir li, wa tub ‘alayya innaka antat-Tawwaabur-Raheem.",
    translation: "O Allah, forgive me and accept my repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
    category: "After Prayer Duas"
  },
  
  // Add more duas here...
  {
    id: 501,
    title: "Dua for All Needs",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni’mal wakeel.",
    translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    category: "General Duas"
  }
];

const DuaCard = ({ dua, isBookmarked, toggleBookmark }: { dua: Dua; isBookmarked: boolean; toggleBookmark: (id: number) => void }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{dua.title}</h2>
    <p className="text-2xl text-gray-700 font-semibold mb-2">{dua.arabic}</p>
    <p className="text-lg text-gray-500 italic mb-2">{dua.transliteration}</p>
    <p className="text-md text-gray-600">{dua.translation}</p>
    <button
      onClick={() => toggleBookmark(dua.id)}
      className={`mt-3 px-4 py-2 rounded ${
        isBookmarked ? "bg-yellow-400 text-white" : "bg-teal-500 text-white"
      }`}
    >
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  </div>
);

const DuaPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Morning Duas");
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedDuas");
    if (storedBookmarks) {
      setBookmarkedIds(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (id: number) => {
    const updatedBookmarks = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((bookmarkId) => bookmarkId !== id)
      : [...bookmarkedIds, id];

    setBookmarkedIds(updatedBookmarks);
    localStorage.setItem("bookmarkedDuas", JSON.stringify(updatedBookmarks));
  };

  const categories = [...new Set(duas.map((dua) => dua.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Daily Duas</h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Explore categorized duas and bookmark your favorites for quick access.
        </p>

        <div className="flex justify-center space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded ${
                activeCategory === category ? "bg-teal-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {duas
            .filter((dua) => dua.category === activeCategory)
            .map((dua) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                isBookmarked={bookmarkedIds.includes(dua.id)}
                toggleBookmark={toggleBookmark}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DuaPage;
