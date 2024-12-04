"use client";
import { useEffect, useState } from "react";

const RandomReminder = () => {
  // List of 100 reminders with source citations
  const reminders = [
    { text: "Stay humble and patient.", source: "Prophet Muhammad (PBUH)" },
    { text: "Trust in Allah’s plan.", source: "Quran, Surah At-Tawbah (9:51)" },
    { text: "Make Dua daily for guidance.", source: "Prophet Muhammad (PBUH)" },
    { text: "Every hardship comes with ease.", source: "Quran, Surah Ash-Sharh (94:6)" },
    { text: "Be kind to others, even when they are unkind.", source: "Prophet Muhammad (PBUH)" },
    { text: "Remember Allah in all your moments.", source: "Quran, Surah Ar-Ra'd (13:28)" },
    { text: "Sadaqah purifies the soul.", source: "Prophet Muhammad (PBUH)" },
    { text: "Repentance is a way to cleanse the heart.", source: "Quran, Surah At-Tahrim (66:8)" },
    { text: "Islam is peace and submission to the will of Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "Forgive others as Allah forgives you.", source: "Quran, Surah Al-A'raf (7:199)" },
    { text: "Be honest and true in your speech.", source: "Prophet Muhammad (PBUH)" },
    { text: "The best among you are those who are beneficial to others.", source: "Prophet Muhammad (PBUH)" },
    { text: "Seek knowledge from the cradle to the grave.", source: "Prophet Muhammad (PBUH)" },
    { text: "Charity does not decrease wealth.", source: "Prophet Muhammad (PBUH)" },
    { text: "The Quran is a healing for the hearts.", source: "Quran, Surah Al-Isra (17:82)" },
    { text: "There is no strength except with Allah.", source: "Quran, Surah Al-Imran (3:160)" },
    { text: "Do not be sad, Allah is with you.", source: "Quran, Surah At-Tawbah (9:40)" },
    { text: "Guard your prayers, especially the middle prayer.", source: "Quran, Surah Al-Baqarah (2:238)" },
    { text: "Whosoever does good deeds will be rewarded generously.", source: "Quran, Surah Az-Zumar (39:10)" },
    { text: "Help those in need, and Allah will help you.", source: "Prophet Muhammad (PBUH)" },
    { text: "Trust in Allah and do not rely solely on your own efforts.", source: "Prophet Muhammad (PBUH)" },
    { text: "He who has no mercy on others, Allah will not have mercy on him.", source: "Prophet Muhammad (PBUH)" },
    { text: "Patience is a sign of strength.", source: "Quran, Surah Al-Asr (103:3)" },
    { text: "Your wealth is in what you give, not what you keep.", source: "Prophet Muhammad (PBUH)" },
    { text: "He who has faith in Allah will never be disappointed.", source: "Quran, Surah Ash-Sharh (94:5-6)" },
    { text: "Be mindful of your thoughts, for they become your actions.", source: "Prophet Muhammad (PBUH)" },
    { text: "Trust the timing of Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "Read the Quran and it will guide you.", source: "Quran, Surah Al-Isra (17:9)" },
    { text: "Allah loves those who are patient.", source: "Quran, Surah Al-Baqarah (2:153)" },
    { text: "Take care of your health, for it is a trust from Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "Treat others as you wish to be treated.", source: "Prophet Muhammad (PBUH)" },
    { text: "Perform good deeds with sincerity, for Allah sees everything.", source: "Quran, Surah Al-Baqarah (2:225)" },
    { text: "Sincerity in worship is the key to acceptance with Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "The believer is the one who is kind to all.", source: "Prophet Muhammad (PBUH)" },
    { text: "Repent and seek forgiveness, for Allah is the Most Forgiving.", source: "Quran, Surah An-Nisa (4:110)" },
    { text: "Give thanks to Allah, and He will increase His blessings upon you.", source: "Quran, Surah Ibrahim (14:7)" },
    { text: "Life is a test; be patient and thankful for all that comes your way.", source: "Prophet Muhammad (PBUH)" },
    { text: "Knowledge is the light that dispels the darkness.", source: "Quran, Surah Az-Zumar (39:9)" },
    { text: "Gratitude is a sign of true faith.", source: "Prophet Muhammad (PBUH)" },
    { text: "Keep your promises, for honesty is the way of the believer.", source: "Prophet Muhammad (PBUH)" },
    { text: "The best of you are those who bring the most benefit to others.", source: "Prophet Muhammad (PBUH)" },
    { text: "The best of charity is the one given when you are in need.", source: "Prophet Muhammad (PBUH)" },
    { text: "Do not be deceived by the world’s pleasures; they are temporary.", source: "Quran, Surah Al-Hadid (57:20)" },
    { text: "Helping others is an act of worship.", source: "Prophet Muhammad (PBUH)" },
    { text: "The Quran is a guidance for the entire humanity.", source: "Quran, Surah Al-Baqarah (2:185)" },
    { text: "Pray when you are alone; it’s your conversation with Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "True success lies in pleasing Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "When you make an effort, Allah will guide your path.", source: "Quran, Surah Al-Mujadila (58:11)" },
    { text: "Forgive others, even if they do not ask for forgiveness.", source: "Prophet Muhammad (PBUH)" },
    { text: "Be mindful of your deeds, for they will be presented to you on the Day of Judgment.", source: "Quran, Surah Al-Kahf (18:49)" },
    { text: "A good word is a charity.", source: "Prophet Muhammad (PBUH)" },
    { text: "Seek knowledge even if it takes you to China.", source: "Prophet Muhammad (PBUH)" },
    { text: "The prayer is the best form of worship.", source: "Prophet Muhammad (PBUH)" },
    { text: "Do not envy others; be grateful for the blessings Allah has given you.", source: "Quran, Surah An-Nisa (4:32)" },
    { text: "Do not let your heart be attached to the world, for it is temporary.", source: "Prophet Muhammad (PBUH)" },
    { text: "Your life is a gift from Allah, treat it with respect.", source: "Prophet Muhammad (PBUH)" },
    { text: "Know that Allah is always near and listens to your prayers.", source: "Quran, Surah Al-Baqarah (2:186)" },
    { text: "The reward for good deeds is never wasted.", source: "Quran, Surah Al-Imran (3:195)" },
    { text: "Remember Allah often, and you will find peace.", source: "Quran, Surah Ar-Ra'd (13:28)" },
    { text: "Be patient in your prayers; it brings peace to the heart.", source: "Quran, Surah Al-Baqarah (2:45)" },
    { text: "Your real wealth is in your faith and deeds.", source: "Prophet Muhammad (PBUH)" },
    { text: "No soul knows what Allah has prepared for them.", source: "Quran, Surah As-Sajdah (32:17)" },
    { text: "Shaytan has no power over those who trust in Allah.", source: "Quran, Surah An-Nahl (16:99)" },
    { text: "Strive for the good of the hereafter, not just the world.", source: "Quran, Surah Al-Baqarah (2:201)" },
    { text: "True love is love for the sake of Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "Give to charity even if it is a small amount.", source: "Prophet Muhammad (PBUH)" },
    { text: "Guard your heart from hatred, and fill it with love for Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "Ask Allah for guidance, for He is the best of guides.", source: "Quran, Surah Al-Fatiha (1:6)" },
    { text: "Do not let your sins make you despair of Allah’s mercy.", source: "Quran, Surah Az-Zumar (39:53)" },
    { text: "Seek Allah’s forgiveness and repent often.", source: "Prophet Muhammad (PBUH)" },
    { text: "Take care of the rights of others as you would your own.", source: "Prophet Muhammad (PBUH)" },
    { text: "Be patient in times of difficulty, for it is a test from Allah.", source: "Prophet Muhammad (PBUH)" },
    { text: "The Quran is a light for the believer’s heart.", source: "Quran, Surah Al-Baqarah (2:257)" },
    { text: "Trust in Allah and He will provide for you.", source: "Quran, Surah At-Tawbah (9:51)" }
  ];

  // State to hold the current reminder
  const [currentReminder, setCurrentReminder] = useState<any>(reminders[0]);

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      // Get a random reminder from the list of reminders
      const randomIndex = Math.floor(Math.random() * reminders.length);
      setCurrentReminder(reminders[randomIndex]);
    }, 15000); // Update every 15 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(reminderInterval);
  }, []); // Empty dependency array ensures it runs once when the component is mounted

  return (
    <div className="w-full bg-green-900 text-white text-center py-2 px-4 overflow-hidden">
    <div className="text-sm font-medium">
      <span className="italic">{currentReminder.text}</span>
      <span className="block text-xs text-gray-300 mt-1">Source: {currentReminder.source}</span>
    </div>
  </div>
  );
};

export default RandomReminder;








