import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar
import RandomReminder from "../components/RandomReminder";
import "../styles/globals.css";
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
  const [nextPrayerTime, setNextPrayerTime] = useState<string>("");
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");

  // Fetch prayer times from Aladhan API
  const fetchPrayerTimes = useCallback(async () => {
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
  }, []);

  // Format time to 12-hour format with AM/PM
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Determine current and next prayers, and calculate countdown
  const updatePrayerTimes = useCallback(() => {
    if (prayerTimes) {
      const now = new Date();
      const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let upcomingPrayerTime: Date | null = null;
      let upcomingPrayerName = "";
      let currentPrayerName = "";

      // Determine current prayer and next prayer
      for (let i = 0; i < prayerNames.length; i++) {
        const prayerName = prayerNames[i];
        const prayerTime = prayerTimes[prayerName as keyof PrayerTimesData];
        const [hours, minutes] = prayerTime.split(":").map(Number);
        const prayerDate = new Date(now);
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          upcomingPrayerTime = prayerDate;
          upcomingPrayerName = prayerName;
          currentPrayerName = i === 0 ? prayerNames[prayerNames.length - 1] : prayerNames[i - 1];
          break;
        }
      }

      // Handle when no upcoming prayer is found (end of the day)
      if (!upcomingPrayerTime) {
        const [fajrHours, fajrMinutes] = prayerTimes.Fajr.split(":").map(Number);
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(fajrHours, fajrMinutes, 0, 0);
        upcomingPrayerTime = tomorrow;
        upcomingPrayerName = "Fajr";
        currentPrayerName = "Isha";
      }

      setNextPrayer(upcomingPrayerName);
      setNextPrayerTime(formatTime(prayerTimes[upcomingPrayerName as keyof PrayerTimesData]));
      setCurrentPrayer(currentPrayerName);

      // Calculate countdown
      const timeDiff = upcomingPrayerTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`
      );
    }
  }, [prayerTimes]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  useEffect(() => {
    const timer = setInterval(updatePrayerTimes, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, [updatePrayerTimes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-teal-900 to-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Countdown for Next Prayer */}
      <div className="text-center py-4 mt-6 bg-opacity-70 bg-black">
        <div className="text-2xl font-semibold">
          <p>
            Next Prayer: {nextPrayer} at {nextPrayerTime}
          </p>
          <p>Countdown: {countdown}</p>
        </div>
      </div>

      {/* Prayer Times Table */}
      <div className="container mx-auto p-6">
        <table className="min-w-full text-center table-auto bg-white text-black rounded-lg shadow-lg">
          <thead>
            <tr className="bg-teal-500">
              <th className="py-2 px-4">Prayer</th>
              <th className="py-2 px-4">Time (AM/PM)</th>
            </tr>
          </thead>
          <tbody>
            {prayerTimes &&
              Object.entries(prayerTimes).map(([prayer, time]) => (
                <tr
                  key={prayer}
                  className={`py-2 px-4 ${
                    currentPrayer === prayer ? "bg-yellow-300 font-bold" : ""
                  }`}
                >
                  <td className="py-2 px-4">{prayer}</td>
                  <td className="py-2 px-4">{formatTime(time as string)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <RandomReminder />
    </div>
  );
};

export default PrayerTimes;

































































