"use client";

import { useEffect, useState, useCallback } from "react";
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
  const fetchPrayerTimes = useCallback(async () => {
    try {
      const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
        params: { city, country, method: 2 },
      });
      setPrayerTimes(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  }, []);

  // Calculate countdown to next prayer
  const calculateCountdown = useCallback(() => {
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
  }, [prayerTimes]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  useEffect(() => {
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
  }, [calculateCountdown]);

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
    {
      arabic: "وَجَعَلْنَا لِلَّهِ فِيهَا جَنَّاتٍ وَيَحْشُرُهُمْ إِلَيْهِ جَمِيعًا",
      english: "And We made for Allah therein gardens and He will gather them together to Himself.",
      source: "Quran 24:35",
    },
    {
      arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
      english: "And indeed, you are of a great moral character.",
      source: "Quran 68:4",
    },
    {
      arabic: "فَذُوقُوا بِمَا نَسِيتُمْ لِقَاءَ يَوْمِكُمْ إِنَّا نَسِينَاكُمْ",
      english: "So taste [the punishment] because you forgot the meeting of this Day. Indeed, We have forgotten you.",
      source: "Quran 32:14",
    },
    {
      arabic: "مَا أَصَابَكَ مِنْ حَسَنَةٍ فَمِنَ اللَّهِ وَمَا أَصَابَكَ مِنْ سَيِّئَةٍ فَمِنْ نَفْسِكَ",
      english: "Whatever good reaches you is from Allah, and whatever bad befalls you is from yourself.",
      source: "Quran 4:79",
    },
    {
      arabic: "إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُحْتَالٍ فَجُورٍ",
      english: "Indeed, Allah does not like every treacherous and sinful person.",
      source: "Quran 22:38",
    },
    {
      arabic: "يُحْيِي وَيُمِيتُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      english: "It is He who gives life and causes death, and He has power over everything.",
      source: "Quran 3:156",
    },
    {
      arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
      english: "Who believe in the unseen, establish prayer, and spend from what We have provided for them.",
      source: "Quran 2:3",
    },
    {
      arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ",
      english: "Indeed, Allah is with those who fear Him and those who are doers of good.",
      source: "Quran 16:128",
    },
    {
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      english: "Indeed, with hardship comes ease.",
      source: "Quran 94:6",
    },
    {
      arabic: "وَمَا مِنْ دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا",
      english: "And there is no creature on the earth but that its provision is from Allah.",
      source: "Quran 11:6",
    },
    {
      arabic: "وَمَا لَكُمْ لَا تُؤْمِنُونَ بِاللَّهِ وَالرَّسُولِ يَدْعُوكُمْ لِيُؤْمِنُوا بِرَبِّكُمْ وَقَدْ أَخَذَ مِيثَاقَكُمْ إِن كُنتُمْ مُؤْمِنِينَ",
      english: "And what is [wrong] with you that you do not believe in Allah, while the Messenger invites you to believe in your Lord, and He has taken your covenant, if you should be believers?",
      source: "Quran 57:8",
    },
    {
      arabic: "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلًا",
      english: "Those who remember Allah while standing or sitting or [lying] on their sides and give thought to the creation of the heavens and the earth, [saying], 'Our Lord, You did not create this in vain.'",
      source: "Quran 3:191",
    },
    {
      arabic: "يُحِبُّونَ أَنْ يَتَبَاهَوْا بِمَا لَمْ يَفْعَلُوا",
      english: "They love to boast about what they did not do.",
      source: "Quran 3:188",
    },
    {
      arabic: "وَلَكُمْ فِي قِصَاصٍ حَيَاةٌ يَا أُوْلِي الْأَلْبَابِ",
      english: "And there is for you in legal retribution [saving of] life, O you who have understanding.",
      source: "Quran 2:179",
    },
    {
      arabic: "قُلْ يَا أَيُّهَا النَّاسُ إِنِّى رَسُولُ اللَّهِ إِلَيْكُمْ جَمِيعًا",
      english: "Say, 'O mankind, indeed I am the messenger of Allah to you all.'",
      source: "Quran 7:158",
    },
    {
      arabic: "فَإِنَّ اللَّهَ هُوَ خَيْرٌ وَيَجْعَلُونَ لِعَذَابِهِ أَسْبَابًا",
      english: "Indeed, Allah is better, and He makes the means of His punishment.",
      source: "Quran 18:58",
    },
    {
      arabic: "إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      english: "Indeed, Allah is capable of all things.",
      source: "Quran 2:20",
    },
    {
      arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
      english: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
      source: "Quran 21:107",
    },
    {
      arabic: "الَّذِينَ إِن مَّكَّنَّاهُمْ فِي الْأَرْضِ أَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ وَأَمَرُوا بِالْمَعْرُوفِ وَنَهَوْا عَنِ الْمُنْكَرِ",
      english: "Those who, if We give them authority in the land, establish prayer and give zakah and enjoin what is right and forbid what is wrong.",
      source: "Quran 22:41",
    },
    {
      arabic: "فَمَنِ اتَّبَعَ هُدَايَ فَلَا يَضِلُّ وَلَا يَشْقَى",
      english: "So whoever follows My guidance will neither go astray nor be miserable.",
      source: "Quran 20:123",
    },
    {
      arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      english: "Indeed, Allah is with the patient.",
      source: "Quran 2:153",
    },
    {
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      english: "Say, 'He is Allah, [Who is] One.'",
      source: "Quran 112:1",
    },
    {
      arabic: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا",
      english: "Whoever brings a good deed will have ten times the like thereof.",
      source: "Quran 6:160",
    },
    {
      arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
      english: "Do not despair of Allah's mercy.",
      source: "Quran 39:53",
    },
    {
      arabic: "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا",
      english: "And whoever fears Allah... He will make a way for him to get out [from every difficulty].",
      source: "Quran 65:2",
    },
    {
      arabic: "وَقُولُوا لِلنَّاسِ حُسْنًا",
      english: "And speak to people good [words].",
      source: "Quran 2:83",
    },
    {
      arabic: "وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ",
      english: "And remind, for indeed, the reminder benefits the believers.",
      source: "Quran 51:55",
    },
    {
      arabic: "يُدَبِّرُ الْأَمْرَ مِنَ السَّمَاءِ إِلَى الْأَرْضِ",
      english: "He directs the matter from the heavens to the earth.",
      source: "Quran 32:4",
    },
    {
      arabic: "وَلَا تَقْتُلُوا أَنفُسَكُمْ إِنَّ اللَّهَ كَانَ بِكُمْ رَحِيمًا",
      english: "And do not kill the soul which Allah has forbidden, except by right.",
      source: "Quran 4:29",
    },
    {
      arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
      english: "Indeed, Allah commands you to render trusts to whom they are due.",
      source: "Quran 4:58",
    },
    {
      arabic: "وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا",
      english: "And do not think those who have been killed in the cause of Allah are dead.",
      source: "Quran 3:169",
    }
  ];
  

  const duas = [
    {
      arabic: "اللّهُمّ اجعل هذا البلد آمناً مُطمئِناً، سخاءً رَخاءً، وسائر بلاد المسلمين.",
      english: "O Allah, make this land secure, peaceful, and prosperous, and all other lands of the Muslims.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ إني أسالك العافية في الدنيا والآخرة.",
      english: "O Allah, I ask You for well-being in this world and the Hereafter.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يسيرون على صراطك المستقيم.",
      english: "O Allah, make me among those who walk on Your Straight Path.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ اجعل القرآن ربيع قلوبنا.",
      english: "O Allah, make the Quran the spring of our hearts.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل الجنة، واجنبنا عذاب النار.",
      english: "O Allah, make us from the people of Jannah and protect us from the punishment of the Fire.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ فَقِّهني في الدين.",
      english: "O Allah, grant me understanding in religion.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ عافني في بدني.",
      english: "O Allah, grant me health in my body.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ استر عورتي، وآمن روعتي.",
      english: "O Allah, conceal my faults and calm my fears.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "اللّهُمّ إني أسالك العفو والعافية.",
      english: "O Allah, I ask You for forgiveness and well-being.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يستمعون القول فيتبعون أحسنه.",
      english: "O Allah, make me from those who listen to the words and follow the best of them.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل التقوى.",
      english: "O Allah, make us from the people of piety.",
      source: "Sunan An-Nasa'i",
    },
    {
      arabic: "اللّهُمّ إني أسالك من خير ما سألك منه محمد صلى الله عليه وسلم.",
      english: "O Allah, I ask You for the good that Prophet Muhammad (peace be upon him) asked from You.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يُحبونك ويحبون عبادك الصالحين.",
      english: "O Allah, make us from those who love You and love Your righteous servants.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل الصدق.",
      english: "O Allah, make us from the people of truthfulness.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ ارزقني الجنة وما قرب إليها من قول أو عمل.",
      english: "O Allah, grant me Jannah and whatever brings me closer to it in word or deed.",
      source: "Sunan At-Tirmidhi",
    },
    {
      arabic: "اللّهُمّ إني أعوذ بك من شر ما عملت، ومن شر ما لم أعمل.",
      english: "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ اجعلني من أهل الرحمة.",
      english: "O Allah, make me from the people of mercy.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلني من أهل القلوب الطيبة.",
      english: "O Allah, make me from those who have pure hearts.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "اللّهُمّ اكفني بحلالك عن حرامك.",
      english: "O Allah, suffice me with what is lawful and keep me away from what is unlawful.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يركعون ويسجدون في الصلاة.",
      english: "O Allah, make me among those who bow and prostrate in prayer.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يلتزمون بالصلاة والزكاة.",
      english: "O Allah, make us from those who uphold prayer and give zakat.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يتبعون رسولك الكريم.",
      english: "O Allah, make me among those who follow Your noble Messenger.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل التوحيد.",
      english: "O Allah, make us from the people of monotheism.",
      source: "Sunan An-Nasa'i",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يذكرونك في السراء والضراء.",
      english: "O Allah, make us among those who remember You in times of ease and hardship.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل الإيمان.",
      english: "O Allah, make us from the people of faith.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يعفون عن الناس.",
      english: "O Allah, make us from those who forgive others.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل المغفرة.",
      english: "O Allah, make us from the people of forgiveness.",
      source: "Sunan Abu Dawood",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يعملون لأخرتهم.",
      english: "O Allah, make us from those who work for the Hereafter.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يوفون بوعودهم.",
      english: "O Allah, make me among those who fulfill their promises.",
      source: "Sahih Muslim",
    },
    {
      arabic: "اللّهُمّ اجعلنا من أهل الجود والكرم.",
      english: "O Allah, make us from the people of generosity and nobility.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللّهُمّ اجعلني من الذين يرحمون عبادك.",
      english: "O Allah, make me from those who show mercy to Your servants.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يفضلون الآخرين على أنفسهم.",
      english: "O Allah, make us from those who prefer others over themselves.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يحبون فيك ويكرهون فيك.",
      english: "O Allah, make us from those who love in You and hate in You.",
      source: "Sunan Abu Dawood",
    },
    {
      arabic: "اللّهُمّ اجعلنا من الذين يُرشدون الناس إلى الخير.",
      english: "O Allah, make us from those who guide others to goodness.",
      source: "Sahih Muslim",
    }
  ];
  
  

  const hadiths = [
    {
      arabic: "مَن لا يشكر الناس لا يشكر الله.",
      english: "Whoever does not thank the people, does not thank Allah.",
      source: "Sunan Abi Dawood",
    },
    {
      arabic: "إِنَّمَا الأعمالُ بِالنِّيَّاتِ.",
      english: "Actions are judged by intentions.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنتَ.",
      english: "Fear Allah wherever you are.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ.",
      english: "Indeed, Allah is beautiful and loves beauty.",
      source: "Sahih Muslim",
    },
    {
      arabic: "مَن لا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ.",
      english: "Whoever does not show mercy to the people, Allah will not show mercy to him.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "مَنْ قَالَ لِأَخِيهِ: حَشَرَ اللَّهُ جَمِيعًا.",
      english: "Whoever says to his brother, 'Allah will gather us all together.'",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "لَا تُحَقِّرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا.",
      english: "Do not belittle any act of kindness.",
      source: "Sahih Muslim",
    },
    {
      arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ.",
      english: "Purity is half of faith.",
      source: "Sahih Muslim",
    },
    {
      arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ.",
      english: "Paradise lies under the feet of mothers.",
      source: "Sunan An-Nasa'i",
    },
    {
      arabic: "مَنْ رَجَا لِقَاءَ اللَّهِ فَإِنَّ اللَّهَ رَاجِيهِ.",
      english: "Whoever hopes for the meeting with Allah, Allah hopes for him.",
      source: "Sahih Muslim",
    },
    {
      arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ.",
      english: "The best of people are those who are most beneficial to others.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "الصَّدَقَةُ تُطْفِئُ غَضَبَ اللَّهِ.",
      english: "Charity extinguishes the anger of Allah.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "إِذَا لَمْ تَسْتَحْيِ فَافْعَلْ مَا شِئْتَ.",
      english: "If you have no shame, then do as you wish.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا.",
      english: "Verily, with hardship comes ease.",
      source: "Sahih Muslim",
    },
    {
      arabic: "لَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا.",
      english: "Do not think those who are killed in the cause of Allah are dead.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "الَّذِي يَأْكُلُ رَابِحًا وَيَأْكُلُ خَاسِرًا.",
      english: "The one who eats from what is lawful and avoids the unlawful is the successful one.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "تَفَاؤَلُوا بِالْخَيْرِ تَجِدُوا.",
      english: "Have hope for good, and you will find it.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "إِنَّ اللَّهَ لَا يَظْلِمُ النَّاسَ شَيْئًا.",
      english: "Indeed, Allah does not do injustice to anyone.",
      source: "Sahih Muslim",
    },
    {
      arabic: "مَنْ سَأَلَ النَّاسَ فِي رَحْمَتِهِ فِي مَرَضِهِ.",
      english: "Whoever asks the people for his mercy during his illness, Allah will give him mercy.",
      source: "Sunan Tirmidhi",
    },
    {
      arabic: "إِنَّمَا الصَّبْرُ عِندَ الصَّدْمَةِ الْأُولَىٰ.",
      english: "Verily, patience is at the first strike.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "مَنْ قَتَلَ نَفْسَةً فَفِي النَّارِ.",
      english: "Whoever kills a soul, he will be in the fire.",
      source: "Sunan Ibn Majah",
    },
    {
      arabic: "اللَّهُمَّ اجْعَلْنَا مِنَ الصَّابِرِينَ.",
      english: "O Allah, make us among the patient.",
      source: "Hadith",
    },
    {
      arabic: "اَلْمُؤْمِنُ مِرْآةُ أَخِيهِ.",
      english: "The believer is the mirror of his brother.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "لَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا.",
      english: "Do not think those who are killed in the cause of Allah are dead.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "أَحَبُّ النَّاسِ إِلَى اللَّهِ أَنْفَعُهُمْ لِلنَّاسِ.",
      english: "The most beloved people to Allah are those who are most beneficial to others.",
      source: "Sahih Bukhari",
    },
    {
      arabic: "اِجْتَنِبُوا السَّبَابَ.",
      english: "Avoid speaking ill of others.",
      source: "Sahih Muslim",
    },
    {
      arabic: "لَا تَحْقِرَنَّ مِنْ عَمَلٍ صَالِحٍ.",
      english: "Do not belittle any good deed.",
      source: "Sahih Muslim",
    },
    {
      arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ.",
      english: "Purity is half of faith.",
      source: "Sahih Muslim",
    },
    {
      arabic: "مَنْ سَارَعَ فِي خَيْرٍ فَفِي النَّارِ.",
      english: "Whoever hurries in good deeds will be successful.",
      source: "Sahih Muslim",
    },
    {
      arabic: "مَنْ لَا يُؤْمِنُ بِالْغَيْبِ فَإِنَّ اللَّهَ لَا يَسْتَجِيبُ لَهُ.",
      english: "Whoever does not believe in the unseen, Allah will not respond to him.",
      source: "Sahih Muslim",
    }
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
          <p>Next Prayer: {nextPrayer} at {nextPrayerTime}</p>
          <p className={`Countdown ${countdownColor}`}>Countdown: {countdown}</p>
        </div>
      </div>
      <div className="py-6 px-4">
        <section className="py-6 px-4 bg-blue-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Verse of the Day</h2>
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
          <Link
            href="/dua"
            className="mt-6 inline-block px-6 py-3 bg-blue-900 text-yellow-300 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
          >
            Explore More Duas
          </Link>
        </section>
        <section className="py-6 px-4 bg-yellow-500 text-center rounded-xl shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-yellow-900">Hadith of the Day</h2>
          <p className="italic mt-4 text-gray-800">{todaysHadith.english}</p>
          <p className="text-sm text-gray-700 mt-2">{todaysHadith.source}</p>
        </section>
        <RandomReminder />
      </div>
      <footer>Developed by Rayhan Usmanu</footer>
    </div>
  );
};

export default HomePage;
















































