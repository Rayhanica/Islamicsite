import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/globals.css"; 
import Navbar from "../components/Navbar";

// Define the structure of prayer times
interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");

  // Fetch prayer times from Aladhan API
  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: {
          city: "New York", // Replace with your city
          country: "USA",   // Replace with your country
          method: 2,        // Islamic calculation method
        },
      });
      setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate countdown to next prayer
  const calculateCountdown = () => {
    if (prayerTimes) {
      const now = new Date();
      const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let nextPrayerTime: Date | null = null;
      let nextPrayerName = "";

      // Find the next prayer time
      for (let i = 0; i < prayerNames.length; i++) {
        const prayerName = prayerNames[i];
        const prayerTime = prayerTimes[prayerName as keyof PrayerTimesData];

        if (!prayerTime) continue;

        const [hours, minutes] = prayerTime.split(":").map(Number);
        const prayerDate = new Date(now);
        prayerDate.setHours(hours, minutes, 0, 0);

        // Check if the prayer time is in the future
        if (prayerDate > now) {
          nextPrayerTime = prayerDate;
          nextPrayerName = prayerName;
          break;
        }
      }

      // If no next prayer is found, set it to Fajr of the next day
      if (!nextPrayerTime) {
        const [fajrHours, fajrMinutes] = prayerTimes.Fajr.split(":").map(Number);
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(fajrHours, fajrMinutes, 0, 0);
        nextPrayerTime = tomorrow;
        nextPrayerName = "Fajr";
      }

      setNextPrayer(nextPrayerName);

      // Calculate time difference for the countdown
      const timeDiff = nextPrayerTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

      // Update countdown
      setCountdown(
        `${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`
      );
    }
  };

  // Fetch prayer times on mount and start countdown calculation
  useEffect(() => {
    fetchPrayerTimes();
    const timer = setInterval(calculateCountdown, 1000); // Update countdown every second

    return () => {
      clearInterval(timer);
    };
  }, [prayerTimes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-teal-900 to-gray-900 text-white">
      {/* Navbar */}
      <div className="bg-black p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold">Islamic Website</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-teal-400">Home</a></li>
              <li><a href="/prayertimes" className="hover:text-teal-400">Prayer Times</a></li>
              <li><a href="/about" className="hover:text-teal-400">About</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Countdown for Next Prayer */}
      <div className="text-center py-4 mt-6 bg-opacity-70 bg-black">
        <div className="text-2xl font-semibold">
          <p>Next Prayer: {nextPrayer}</p>
          <p>Countdown: {countdown}</p>
        </div>
      </div>

      {/* Prayer Times Header */}
      <div className="text-center py-4 bg-opacity-70 bg-black">
        <h1 className="text-3xl font-serif font-bold">Prayer Times</h1>
      </div>

      {/* Prayer Times Table */}
      {prayerTimes && (
        <div className="container mx-auto p-6">
          <table className="min-w-full text-center table-auto bg-white text-black rounded-lg shadow-lg">
            <thead>
              <tr className="bg-teal-500">
                <th className="py-2 px-4">Prayer</th>
                <th className="py-2 px-4">Time (AM/PM)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prayerTimes).map(([prayer, time]) => (
                <tr key={prayer}>
                  <td className="py-2 px-4">{prayer}</td>
                  <td className="py-2 px-4">{formatTime(time as string)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;












