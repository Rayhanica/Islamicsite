"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PrayerTimesMarquee from "../components/PrayerTimesMarquee";
import RandomReminder from "../components/RandomReminder";
import axios from "axios";
import Link from "next/link";
import "../styles/globals.css";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [nextPrayerTime, setNextPrayerTime] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");
  const [countdownColor, setCountdownColor] = useState<string>("text-white");

  const city = "New York";
  const country = "USA";

  // Fetch prayer times
  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: { city, country, method: 2 },
      });
      setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  // Calculate countdown to next prayer
  const calculateCountdown = () => {
    if (prayerTimes) {
      const now = new Date();
      const prayerNames: (keyof PrayerTimes)[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let nextPrayerName = "";
      let nextPrayerTime: Date | null = null;

      for (const prayerName of prayerNames) {
        const [hours, minutes] = prayerTimes[prayerName]?.split(":").map(Number) || [];
        if (hours === undefined || minutes === undefined) continue;

        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          nextPrayerTime = prayerDate;
          nextPrayerName = prayerName;
          break;
        }
      }

      if (!nextPrayerTime) {
        const [fajrHours, fajrMinutes] = prayerTimes.Fajr.split(":").map(Number);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(fajrHours, fajrMinutes, 0, 0);
        nextPrayerTime = tomorrow;
        nextPrayerName = "Fajr";
      }

      const timeDiff = nextPrayerTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setNextPrayer(nextPrayerName);
      setNextPrayerTime(nextPrayerTime.toLocaleTimeString());
      setCountdown(
        `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft.toString().padStart(2, "0")}:${secondsLeft
          .toString()
          .padStart(2, "0")}`
      );
      setCountdownColor(hoursLeft === 0 && minutesLeft < 1 ? "text-red-500" : "text-white");
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      calculateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const dailyIndex = new Date().getDate() - 1;

  const quranVerses = [
    {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      english: "Indeed, with hardship comes ease.",
      source: "Quran 94:6",
    },
    {
      arabic: "وَقُل رَّبُّ زِدْنِي عِلْمًا",
      english: "And say, 'My Lord, increase me in knowledge.'",
      source: "Quran 20:114",
    },
  ];

  const duas = [
    {
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
      english: "My Lord, expand for me my breast.",
      source: "Quran 20:25",
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
      english: "Our Lord, grant us in this world good.",
      source: "Quran 2:201",
    },
  ];

  const hadiths = [
    {
      english: "The strong believer is better and more beloved to Allah than the weak believer.",
      source: "Sahih Muslim",
    },
    {
      english: "None of you [truly] believes until he loves for his brother what he loves for himself.",
      source: "Sahih Bukhari",
    },
  ];

  const todaysVerse = quranVerses[dailyIndex % quranVerses.length];
  const todaysDua = duas[dailyIndex % duas.length];
  const todaysHadith = hadiths[dailyIndex % hadiths.length];

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-blue-800 via-teal-900 to-gray-900">
      <Navbar />
      <PrayerTimesMarquee />
      <div className="text-center py-4 bg-opacity-70 bg-black">
        <div className="text-3xl font-serif font-bold">{currentTime}</div>
        <div className="text-xl mt-2">{currentDate}</div>
      </div>
      <div className="text-center py-4 mt-6 bg-opacity-70 bg-black">
        <div className="text-2xl font-semibold">
          <p>
            Next Prayer: {nextPrayer} at {nextPrayerTime}
          </p>
          <p className={`Countdown: ${countdown} ${countdownColor}`} />
        </div>
      </div>
      <div className="py-6 px-4">
        <section className="py-6 px-4 bg-blue-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Quran of the Day</h2>
          <p className="italic mt-4 text-gray-800">{todaysVerse.english}</p>
          <p className="text-sm text-gray-700 mt-2">{todaysVerse.source}</p>
          <p className="text-xl mt-4" dir="rtl" style={{ fontFamily: "Amiri", fontWeight: "bold" }}>
            {todaysVerse.arabic}
          </p>
          <Link
            href="/quran"
            className="mt-6 inline-block px-6 py-3 bg-blue-900 text-yellow-300 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
          >
            Explore the Quran
          </Link>
        </section>
        <section className="py-6 px-4 bg-green-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-green-900">Dua of the Day</h2>
          <p className="italic mt-4 text-gray-800">{todaysDua.english}</p>
          <p className="text-sm text-gray-700 mt-2">{todaysDua.source}</p>
          <p className="text-xl mt-4" dir="rtl" style={{ fontFamily: "Amiri", fontWeight: "bold" }}>
            {todaysDua.arabic}
          </p>
        </section>
        <section className="py-6 px-4 bg-yellow-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-yellow-900">Hadith of the Day</h2>
          <p className="italic mt-4 text-gray-800">{todaysHadith.english}</p>
          <p className="text-sm text-gray-700 mt-2">{todaysHadith.source}</p>
        </section>
        <RandomReminder />
      </div>
    </div>
  );
};

export default HomePage;














































