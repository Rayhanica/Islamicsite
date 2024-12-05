// app/prayerTimes.tsx

import PrayerTimes from "../components/PrayerTimes"; // Import PrayerTimes component
import Navbar from "../components/Navbar"; // Import Navbar component

const PrayerTimesPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-serif font-extrabold text-gold-600 text-center mb-8">
          Prayer Times
        </h1>
        <PrayerTimes /> {/* Display the PrayerTimes component */}
      </div>
    </div>
  );
};

export default PrayerTimesPage;
