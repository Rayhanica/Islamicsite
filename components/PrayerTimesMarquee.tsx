'use client';

import { useState, useEffect } from "react";
import axios from "axios";

// Define the structure of the prayer times object
interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

// Function to convert 24-hour time to 12-hour AM/PM format
const formatTimeTo12Hour = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;
  return `${hour12}:${minuteFormatted} ${suffix}`;
};

const PrayerTimesMarquee = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null); // Store prayer times

  // Fetch prayer times based on default city
  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity`, {
        params: {
          city: "New York",
          country: "USA", // Replace with your country
          method: 2,
        },
      });

      const timings = response.data.data.timings;

      // Convert all prayer times to 12-hour AM/PM format
      const formattedTimes: PrayerTimes = {
        Fajr: formatTimeTo12Hour(timings.Fajr),
        Dhuhr: formatTimeTo12Hour(timings.Dhuhr),
        Asr: formatTimeTo12Hour(timings.Asr),
        Maghrib: formatTimeTo12Hour(timings.Maghrib),
        Isha: formatTimeTo12Hour(timings.Isha),
      };

      setPrayerTimes(formattedTimes);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  return (
    <div className="bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-700 p-4">
      <div className="overflow-hidden">
        <div className="flex animate-slow-marquee space-x-10">
          {prayerTimes ? (
            Object.keys(prayerTimes).map((prayer) => (
              <p key={prayer} className="text-xl text-white italic">
                {prayer}: {prayerTimes[prayer as keyof PrayerTimes]}
              </p>
            ))
          ) : (
            <p className="text-xl text-white italic">Loading prayer times...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesMarquee;







