"use client";

import RandomReminder from "../components/RandomReminder";
import PrayerTimesMarquee from "../components/PrayerTimesMarquee";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [islamicDate, setIslamicDate] = useState<string>("");
  const [prayerTimes, setPrayerTimes] = useState<any>(null); // Store prayer times
  const [countdown, setCountdown] = useState<string>(""); // Store the countdown
  const [nextPrayer, setNextPrayer] = useState<string>(""); // Store the next prayer name
  const [countdownColor, setCountdownColor] = useState<string>("text-white"); // Store the countdown text color

  const quranVerses = [
    "Indeed, with hardship comes ease. (Quran 94:6)",
    "And He found you lost and guided you. (Quran 93:7)",
    "So remember Me; I will remember you. (Quran 2:152)",
    "Indeed, Allah is with those who fear Him and those who are doers of good. (Quran 16:128)",
    "Indeed, this Qur'an guides to that which is most suitable... (Quran 17:9)",
    "And your ally is none but Allah and His Messenger... (Quran 5:55)",
    "Do not kill the soul which Allah has forbidden, except by right. (Quran 6:151)",
    "O mankind, fear your Lord, who created you from one soul. (Quran 4:1)",
    // Add 30 Quranic verses
  ];

  const hadiths = [
    "The best among you are those who learn the Qur'an and teach it. (Sahih al-Bukhari, Book 66, Hadith 49)",
    "Actions are judged by intentions. (Sahih al-Bukhari, Hadith 1)",
    "None of you truly believes until he wishes for his brother what he wishes for himself. (Sahih Muslim, Hadith 45)",
    "The best of you are those who are the most beneficial to others. (Daraqutni)",
    "A Muslim is the one from whose tongue and hand other Muslims are safe. (Sahih al-Bukhari)",
    "Do not grieve; indeed, Allah is with us. (Quran 9:40)",
    "If you do not show mercy, you will not be shown mercy. (Sahih Muslim, Hadith 2319)",
    "The strong person is not the one who can overpower others, but the one who can control themselves when angry. (Sahih al-Bukhari)",
    // Add 30 Hadiths
  ];

  const duas = [
    "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds. (Sunan Ibn Majah, Hadith 925)",
    "O Allah, forgive me, have mercy upon me, and grant me success. (Sahih Muslim, Hadith 115)",
    "O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness. (Sahih al-Bukhari, Hadith 633)",
    "O Allah, protect me from the trials of this world and the punishment of the grave. (Sunan Abu Dawood)",
    "O Allah, make me among the righteous and grant me a good ending. (Sahih Muslim)",
    "O Allah, I seek refuge in You from the evil of my soul and the evil of my deeds. (Sunan Ibn Majah)",
    "O Allah, make me grateful for Your blessings and increase them. (Sahih al-Bukhari)",
    "O Allah, I entrust You with my affairs, guide me to what is best. (Sunan Abu Dawood)",
    // Add 30 Duas
  ];

  // Fetch prayer times
  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get("http://api.aladhan.com/v1/timingsByCity", {
        params: {
          city: "New York", // Use your desired city
          country: "USA", // Change country as needed
          method: 2, // You can change method to get different calculation methods
        },
      });
      setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  // Fetch Hijri date
  const fetchHijriDate = async () => {
    try {
      const response = await axios.get("https://timesprayer.com/en/todayhijridate.html");
      const hijriDate = response.data.match(/<b>(.*?)<\/b>/)[1];
      setIslamicDate(hijriDate);
    } catch (error) {
      console.error("Error fetching Hijri date:", error);
      setIslamicDate("Jumada II 3, 1446 AH"); // Default value if fetching fails
    }
  };

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const hour12 = hours % 12 || 12; // Convert to 12-hour format
      setCurrentTime(`${hour12}:${minutes}:${seconds} ${ampm}`);

      const fullDate = now.toLocaleDateString();
      setCurrentDate(fullDate);
    };

    const calculateCountdown = () => {
      if (prayerTimes) {
        const now = new Date();
        const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        let nextPrayerTime = null;
        let nextPrayerName = "";
        
        for (let i = 0; i < prayerNames.length; i++) {
          const prayerName = prayerNames[i];
          const prayerTime = prayerTimes[prayerName];
          
          if (!prayerTime) continue; // Skip if no prayer time available

          const [hours, minutes] = prayerTime.split(":").map(Number);
          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0, 0); // Set the prayer time to the correct hour and minute

          if (prayerDate > now) {
            nextPrayerTime = prayerDate;
            nextPrayerName = prayerName;
            break;
          }
        }

        if (!nextPrayerTime) {
          // If no next prayer is found, reset to the first prayer of the day (Fajr)
          const fajrTime = prayerTimes.Fajr.split(":").map(Number);
          nextPrayerTime = new Date();
          nextPrayerTime.setHours(fajrTime[0], fajrTime[1], 0, 0); // Reset to Fajr time
          nextPrayerName = "Fajr";
        }

        setNextPrayer(nextPrayerName);

        // Calculate the time difference in milliseconds
        const timeDiff = nextPrayerTime.getTime() - now.getTime();
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert to hours
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Convert to minutes
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000); // Convert to seconds

        // Update countdown text
        const formattedCountdown = `${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
        setCountdown(formattedCountdown);

        // If less than 1 minute left, set countdown color to red
        if (timeDiff <= 60000) {
          setCountdownColor("text-red-600");
        } else {
          setCountdownColor("text-white");
        }
      }
    };

    updateDateTime();
    fetchHijriDate();
    fetchPrayerTimes();
    const interval = setInterval(() => {
      updateDateTime();
      calculateCountdown();
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, [prayerTimes]);

  // Get daily index for rotating through Quran, Hadith, and Dua
  const getDailyIndex = () => {
    const date = new Date();
    return date.getDate() - 1; // Use the day of the month (0-30)
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-blue-800 via-teal-900 to-gray-900">
      <Navbar />

      <PrayerTimesMarquee />
      <div className="text-center py-4 bg-opacity-70 bg-black">
        <div className="text-3xl font-serif font-bold">{currentTime}</div>
        <div className="text-xl mt-2">{currentDate}</div>
        <div className="text-xl mt-2">{islamicDate} (Hijri Date)</div>
      </div>

      {/* Countdown for Next Prayer */}
      <div className="text-center py-4 bg-opacity-70 bg-black mt-4">
        <div className={`text-3xl font-serif font-bold ${countdownColor}`}>
          <span>Next Prayer Time: </span>
          {nextPrayer} <br />
          <span>Countdown: </span>
          {countdown}
        </div>
      </div>

       {/* Main Content */}
       <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-5xl font-serif font-extrabold text-yellow-500 text-center mb-8">
          Welcome to the Islamic Portal
        </h1>

        {/* Daily Quranic Verse Section */}
        <section className="py-6 px-4 bg-yellow-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Daily Quranic Verse</h2>
          <p className="italic mt-4 text-gray-800">"Indeed, with hardship comes ease." (94:6)</p>
          <p className="text-sm text-gray-700 mt-2">Surah Ash-Sharh, 94:6</p>
          <Link
            href="/quran"
            className="mt-6 inline-block px-6 py-3 bg-blue-900 text-yellow-300 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
          >
            Explore the Quran
          </Link>
        </section>

        {/* Hadith of the Day Section */}
        <section className="py-6 px-4 bg-green-600 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-white">Hadith of the Day</h2>
          <p className="italic mt-4 text-white">{hadiths[getDailyIndex()]}</p>
        </section>

         {/* Daily Dua Section */}
         <section className="py-6 px-4 bg-indigo-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-yellow-300">Daily Dua</h2>
          <p className="italic mt-4 text-white">{duas[getDailyIndex()]}</p>
        </section>
      </div>

      {/* Random Reminder Section */}
      <RandomReminder />
    </div>
  );
};

export default HomePage;































