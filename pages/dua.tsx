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
    title: "Ayat al-Kursi: The Greatest Protection",
    arabic: "أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. اَللّٰهُ لَآ إِلٰهَ إِلَّا هُوَ الْحَىُّ الْقَيُّوْمُ ، لَا تَأْخُذُهُۥ سِنَةٌ وَّلَا نَوْمٌ ، لَهُ مَا فِى السَّمٰـوٰتِ وَمَا فِى الْأَرْضِ ، مَنْ ذَا الَّذِىْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِۦ ، يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ ، وَلَا يُحِيْطُوْنَ بِشَىْءٍ مِّنْ عِلْمِهِٓ إِلَّا بِمَا شَآءَ ، وَسِعَ كُرْسِيُّهُ السَّمٰـوٰتِ وَالْأَرْضَ، وَلَا يَئُوْدُهُۥ حِفْظُهُمَا ، وَهُوَ الْعَلِىُّ الْعَظِيْمُ",
    transliteration: "Aʿūdhu bi-llāhi mina-sh-Shayṭāni-r-rajīm. Allāhu lā ilāha illā Huwa-l-Ḥayyu-l-Qayyūm, lā ta’khudhuhū sinatuw-wa lā nawm, lahū mā fi-s-samāwāti wa mā fi-l-arḍ, man dhā’lladhī yashfaʿu ʿindahū illā bi-idhnih, yaʿlamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay’im-min ʿilmihī illā bi-mā shā’, wasiʿa kursiyyuhu-s-samāwāti wa-l-arḍ, wa lā ya’ūduhū ḥifẓuhumā wa Huwa-l-ʿAlliyu-l-ʿAẓīm.",
    translation: "I seek the protection of Allah from the accursed Shayṭān. Allah, there is no god worthy of worship but He, the Ever Living, The Sustainer of all. Neither drowsiness overtakes Him nor sleep. To Him Alone belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except with His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursī extends over the heavens and the earth, and their preservation does not tire Him. And He is the Most High, the Magnificent. (2:255)",
    category: "Morning Duas",
  },
  {
    id: 2,
    title: "Surah Al Ikhlas (3x)",
    arabic:"بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ أَحَدٌ ، اَللّٰهُ الصَّمَدُ ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ ، وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul Huwa-llāhu Aḥad. Allāhu-ṣ-Ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahū kufuwan aḥad.",
    translation: "In the name of Allah, the All-Merciful, the Very Merciful. Say, He is Allah, the One, the Self-Sufficient Master, Who has not given birth and was not born, and to Whom no one is equal. (112)",
    category: "Morning Duas",
  },
  {
    id: 3,
    title: "Surah Al Falaq (3x)",
    arabic: " بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ، مِنْ شَرِّ مَا خَلَقَ ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul aʿūdhu bi-Rabbi-l-falaq. Min sharri mā khalaq. Wa min sharri ghāsiqin idhā waqab. Wa min sharri-n-naffāthāti fi-l-ʿuqad. Wa min sharri ḥāsidin idhā ḥasad.",
    translation:"In the name of Allah, the All-Merciful, the Very Merciful. Say, I seek protection of the Lord of the daybreak, from the evil of what He has created, and from the evil of the darkening night when it settles, and from the evil of the blowers in knots, and from the evil of the envier when he envies. (113)",
    category: "Morning Duas",
  },
  {
    id: 4 ,
    title: "Surah An Nas (3x)",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ، مَلِكِ النَّاسِ ، إِلٰهِ النَّاسِ ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ، اَلَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ، مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul aʿūdhu bi-Rabbi-n-nās. Maliki-n-nās. Ilāh-hin-nās. Min sharri-l-waswāsi-l-khannās. Al-ladhī yuwaswisu fī ṣudūri-n-nās. Mina-l-jinnati wa-n-nās.",
    translation: "In the name of Allah, the All-Merciful, the Very Merciful. Say, I seek protection of the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the hearts of mankind, whether they be Jinn or people. (114)",
    category: "Morning Duas",

  },
  {
    id: 5  ,
    title: "Sayyid al-Istighfar: The Best Way of Seeking Forgiveness",
    arabic: "اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ لَكَ بِذَنْبِيْ ، فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma Anta Rabbī, lā ilāha illā Ant, khalaqtanī wa ana ʿabduk, wa ana ʿalā ʿahdika wa waʿdika mā’staṭaʿt, aʿūdhu bika min sharri mā ṣanaʿt, abū’u laka bi niʿmatika ʿalayya wa abū’u laka bi-dhambī fa-ghfir lī fa-innahū lā yaghfiru-dh-dhunūba illā Ant.",
    translation: "O Allah, You are my Lord. There is no god worthy of worship except You. You have created me, and I am Your slave, and I am under Your covenant and pledge (to fulfil it) to the best of my ability. I seek Your protection from the evil that I have done. I acknowledge the favours that You have bestowed upon me, and I admit my sins. Forgive me, for none forgives sins but You.",
    category: "Morning Duas",

  },
  {
    id: 6 ,
    title: "Protect Yourself From Anxiety, Laziness, Debt etc",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    transliteration: "Allāhumma innī aʿūdhu bika min-l-hammi wa-l-ḥazan, wa aʿūdhu bika min-l-ʿajzi wa-l-kasal, wa aʿūdhu bika min-l-jubni wa-l-bukhl, wa aʿūdhu bika min ghalabati-d-dayni wa qahri-r-rijāl.",
    translation: "O Allah, I seek Your protection from anxiety and grief. I seek Your protection from inability and laziness. I seek Your protection from cowardice and miserliness, and I seek Your protection from being overcome by debt and being overpowered by men.",
    category: "Morning Duas",

  },
  {
    id: 7 ,
    title: "Well-being in this World and the Hereafter",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ ، اَللّٰهُمَّ اسْتُرْ عَوْرَاتِيْ وَآمِنْ رَوْعَاتِيْ ، اَللّٰهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ ، وَمِنْ خَلْفِيْ ، وَعَنْ يَّمِيْنِيْ ، وَعَنْ شِمَالِيْ ، وَمِنْ فَوْقِيْ ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ",
    transliteration: "Allāhumma innī as’aluka-l-ʿāfiyata fi-d-dunyā wa-l-ākhirah. Allāhumma innī as’aluka-l-ʿafwa wa-l-ʿāfiyata fī dīnī wa dunyāya wa ahlī wa mālī, Allāhumma-stur ʿawrātī wa āmin rawʿātī. Allāhumma-ḥfaẓnī mim bayni yadayya wa min khalfī, wa ʿay-n yamīnī wa ʿan shimālī wa min fawqī, wa aʿūdhu bi-ʿaẓamatika an ughtāla min taḥtī.",
    translation: "O Allah, I ask You for well-being in this world and the next. O Allah, I ask You for forgiveness and well-being in my religion, in my worldly affairs, in my family and in my wealth. O Allah, conceal my faults and calm my fears. O Allah, guard me from in front of me and behind me, from my right, and from my left, and from above me. I seek protection in Your Greatness from being unexpectedly destroyed from beneath me.",
    category: "Morning Duas",

  },
  {
    id: 8 ,
    title: "Protect Yourself From the 4 Evils",
    arabic: "اَللّٰهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ ، فَاطِرَ السَّمٰوَاتِ وَالْأَرْضِ ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ ، أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا أَنْتَ ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِيْ سُوْءًا ، أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ",
    transliteration: "Allāhumma ʿālima-l-ghaybi wa-sh-shahādah, fāṭir-as-samāwāti wa-l-arḍi, rabba kulli shay’iw-wa malīkah, ash-hadu al-lā ilāha illā Anta, aʿūdhu bika min sharri nafsī wa min sharri-sh-shayṭāni wa shirkihī wa an aqtarifa ʿalā nafsī sū’an aw ajurrahū ilā muslim.",
    translation: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, the Lord and Sovereign of everything; I bear witness that there is no god worthy of worship but You. I seek Your protection from the evil of my own self, from the evil of Shayṭān and from the evil of polytheism to which he calls,and from inflicting evil on myself, or bringing it upon a Muslim.",
    category: "Morning Duas",

  },
  {
    id: 9 ,
    title: "Entrust All Your Matters to Allah",
    arabic: "يَا حَيُّ يَا قَيُّوْمُ ، بِرَحْمَتِكَ أَسْتَغِيْثُ ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ ، وَلَا تَكِلْنِيْ إِلَىٰ نَفْسِيْ طَرْفَةَ عَيْنٍ",
    transliteration: "Yā Ḥayyu yā Qayyūm, bi-raḥmatika astaghīth, aṣliḥ lī sha’nī kullah, wa lā takilnī ilā nafsī ṭarfata ʿayn.",
    translation: "O The Ever Living, The Sustainer of all. ; I seek assistance through Your mercy. Rectify all of my affairs and do not entrust me to myself for the blink of an eye.",
    category: "Morning Duas",

  },
  {
    id: 10 ,
    title: "Fulfil Your Obligation to Thank Allah",
    arabic: "اَللّٰهُمَّ مَا أَصْبَحَ بِيْ مِنْ نِّعْمَةٍ أَوْ بِأَحَدٍ مِّنْ خَلْقِكَ ، فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
    transliteration: "Allāhumma mā aṣbaḥa bī min niʿmatin aw bi-aḥadim-min khalqik, fa-minka waḥdaka lā sharīka lak, fa laka-l-ḥamdu wa laka-sh-shukr.",
    translation: "O Allah, all the favours that I or anyone from Your creation has received in the morning, are from You Alone. You have no partner. To You Alone belong all praise and all thanks.",
    category: "Morning Duas",

  },
  {
    id: 11 ,
    title: "Start Your Day by Renewing Tawhid",
    arabic: "أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ ، وَعَلَىٰ دِيْنِ نَبِيِّنَا مُحَمَّدٍ ، وَعَلَىٰ مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُّسْلِمًا وَّمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
    transliteration: "Aṣbaḥnā ʿalā fiṭrati-l-islām. wa ʿalā kalimati-l-ikhlāṣ, wa ʿalā dīni Nabiyyinā Muḥammadin ṣallallāhu ʿalayhi wa sallam, wa ʿalā millati abīnā Ibrāhīma ḥanīfam-muslima, wa mā kāna min-l-mushrikīn.",
    translation: "We have entered the morning upon the natural religion of Islam, the statement of pure faith (i.e. Shahādah), the religion of our Prophet Muhammad ﷺ and upon the way of our father Ibrāhīm, who turned away from all that is false, having surrendered to Allah, and he was not of the polytheists.",
    category: "Morning Duas",

  },
  {
    id: 12 ,
    title: "Start the Morning by Praising Allah (3x)",
    arabic: "أَصْبَحْتُ أُثْنِيْ عَلَيْكَ حَمْدًا ، وَأَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ",
    transliteration: "Aṣbaḥtu uthnī ʿalayka ḥamdā, wa ash-hadu al-lā ilāha illāl- Allāh.",
    translation: "I have entered the morning praising You, and I bear witness that there is no god worthy of worship but Allah.",
    category: "Morning Duas",

  },
  {
    id: 13 ,
    title: "Ask Allah for a Good Day",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ وَالْحَمْدُ لِلّٰهِ ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration: "Aṣbaḥnā wa aṣbaḥa-l-mulku li-llāh, wa-l-ḥamdu li-llāh, lā ilāha illa-llāhu waḥdahū lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, wa huwa ʿalā kulli shay’in Qadīr, Rabbi as’aluka khayra mā fī hādha-l-yawmi wa khayra mā baʿdah, wa aʿūdhu bika min sharri mā fī hādha-l-yawmi wa sharri mā baʿdah. Rabbi aʿūdhu bika mina-l-kasali wa sū’i-l-kibar, Rabbi aʿūdhu bika min ʿadhābin fi-n-nāri wa ʿadhābin fi-l-qabr.",
    translation: "We have entered the morning and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god worthy of worship except Allah, the One; He has no partner with Him. The entire kingdom belongs solely to Him, to Him is all praise due, and He is All-Powerful over everything. My Lord, I ask You for the good that is in this day and the good that follows it, and I seek Your protection from the evil that is in this day and from the evil that follows it. My Lord, I seek Your protection from laziness and the misery of old age. My Lord, I seek Your protection from the torment of the Hell-fire and the punishment of the grave.",
    category: "Morning Duas",

  },
  {
    id: 14 ,
    title: "Ask Allah to Bless Your Day",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هٰذَا الْيَوْمِ ، فَتْحَهُ وَنَصْرَهُ وَنُوْرَهُ وَبَرَكَتَهُ وَهُدَاهُ ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهِ وَشَرِّ مَا بَعْدَهُ",
    transliteration: "Aṣbaḥnā wa aṣbaḥa-l-mulku li-llāhi Rabbi-l-ʿālamīn, Allāhumma innī as’aluka khayra hādha-l-yawm, fatḥahū wa naṣrahū wa nūrahū wa barakatahū wa hudāh, wa aʿūdhu bika min sharri mā fīhi wa sharri mā baʿdah.",
    translation: "We have entered the morning and at this very time the whole kingdom belongs to Allah, Lord of the Worlds. O Allah, I ask You for the goodness of this day: its victory, its help, its light, and its blessings and guidance. I seek Your protection from the evil that is in it and from the evil that follows it",
    category: "Morning Duas",

  },
  {
    id: 15 ,
    title: "Get Yourself Freed from the Hell-fire (4x)",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَصْبَحْتُ أُشْهِدُكَ ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيْعَ خَلْقِكَ ، أَنَّكَ أَنْتَ اللّٰهُ لَا إِلٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ",
    transliteration: "Allāhumma innī aṣbaḥtu ush-hiduk, wa ush-hidu ḥamlata ʿarshik, wa malā’ikatika wa jamīʿa khalqik, an-naka Anta-llāhu lā ilāha illā Anta waḥdak, lā sharīka lak, wa anna Muḥammadan ʿabduka wa rasūluk",
    translation: "O Allah, I have entered the morning, and I call upon You, the bearers of Your Throne, Your angels and all creation, to bear witness that surely You are Allah. There is no god worthy of worship except You Alone. You have no partners, and that Muḥammad ﷺ is Your slave and Your Messenger.",
    category: "Morning Duas",

  },
  {
    id: 16 ,
    title: "Upon Entering the Morning",
    arabic: "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ",
    transliteration: "Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilayka-n-nushūr.",
    translation: "O Allah, by You we have entered the morning and by You we enter upon the evening. By You, we live and we die, and to You is the resurrection.",
    category: "Morning Duas",

  },
  {
    id: 17 ,
    title: "Ask Allah For Good Health and Protection (3x)",
    arabic: "اَللّٰهُمَّ عَافِنِيْ فِيْ بَدَنِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ سَمْعِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ بَصَرِيْ ، لَا إِلٰهَ إِلَّا أَنْتَ ، اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلٰهَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā Ant, Allāhumma innī aʿūdhu bika mina-l-kufri wa-l-faqr, wa aʿūdhu bika min ʿadhābi-l-qabr, lā ilāha illā Ant.",
    translation: "O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight. There is no god worthy of worship except You. O Allah, I seek Your protection from disbelief and poverty and I seek Your protection from the punishment of the grave. There is no god worthy of worship except You.",
    category: "Morning Duas",

  },
  {
    id: 18 ,
    title: "Allah Will Suffice You in Everything (7x)",
    arabic: "حَسْبِيَ اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ ، عَلَيْهِ تَوَكَّلْتُ ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ",
    transliteration: "Ḥasbiya-Allāhu lā ilāha illā Huwa, ʿalayhi tawakkaltu, wa Huwa Rabbu-l-ʿArshi-l-ʿaẓīm.",
    translation: "Allah is sufficient for me. There is no god worthy of worship except Him. I have placed my trust in Him only and He is the Lord of the Magnificent Throne.",
    category: "Morning Duas",

  },
  {
    id: 19 ,
    title: "Have the Prophet ﷺ Hold Your Hand and Admit You to Paradise (3x)",
    arabic: "رَضِيْتُ بِاللّٰهِ رَبًّا ، وَبِالْإِسْلَامِ دِيْنًا ، وَبِمُحَمَّدٍ نَّبِيًّا",
    transliteration: "Raḍītu bi-llāhi Rabbā, wa bi-l-islāmi dīnā, wa bi Muḥammadin-Nabiyyā.",
    translation: "I am pleased with Allah as my Lord, with Islām as my religion and with Muḥammad ﷺ as my Prophet.",
    category: "Morning Duas",

  },
  {
    id: 20 ,
    title: "Protect Yourself From All Harm (3x)",
    arabic: "بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ ، وَهُوَ السَّمِيْعُ الْعَلِيْمُ",
    transliteration: "Bismi-llāhi-lladhī lā yaḍurru maʿasmihi shay’un fi-l-arḍi wa lā fi-s-samā’, wa Huwa-s-Samīʿu-l-ʿAlīm.",
    translation: "In the Name of Allah, with whose Name nothing can harm in the earth nor in the sky. He is The All-Hearing and All-Knowing.",
    category: "Morning Duas",

  },
  {
    id: 21 ,
    title: "Get Your Sins Forgiven (100x)",
    arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ",
    transliteration: "Subḥāna-llāhi wa bi ḥamdih.",
    translation: "Allah is free from imperfection, and all praise is due to Him.",
    category: "Morning Duas",

  },
  {
    id: 22 ,
    title: "An Uparallel Reward (100x)",
    arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ.",
    transliteration: "Lā ilāha illā-Allāh, waḥdahū lā sharīka lah, lahu-l-mulk, wa lahu-l-ḥamd, wa Huwa ʿalā kulli shay’in Qadīr.",
    translation: "There is no god worthy of worship except Allah. He is Alone and He has no partner whatsoever. To Him Alone belong all sovereignty and all praise. He is over all things All-Powerful.",
    category: "Morning Duas",

  },
  {
    id: 23 ,
    title: "Receive the Intercession of the Prophet ﷺ (100x)",
    arabic: "الصلاة على النبي (اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ)",
    transliteration: "Allāhumma ṣalli ʿalā Muḥammad wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka Ḥamīdu-m-Majīd, Allāhumma bārik ʿalā Muḥammad, wa ʿalā āli Muḥammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka Ḥamīdu-m-Majīd",
    translation: "O Allah, honour and have mercy upon Muhammad and the family of Muhammad as You have honoured and had mercy upon Ibrāhīm and the family of Ibrāhīm. Indeed, You are the Most Praiseworthy, the Most Glorious. O Allah, bless Muhammad and the family of Muhammad as You have blessed Ibrāhīm and the family of Ibrāhīm. Indeed, You are the Most Praiseworthy, the Most Glorious.",
    category: "Morning Duas",

  },
  {
    id: 24 ,
    title: "Seek Forgiveness and Repent (100x)",
    arabic: "أَسْتَغْفِرُ اللّٰهَ وَأَتُوْبُ إِلَيْهِ",
    transliteration: "Astaghfiru-l-llāha wa atūbu ilayh.",
    translation: "I seek Allah’s forgiveness and turn to Him in repentance.",
    category: "Morning Duas",

  },
  {
    id: 25  ,
    title: "4 Phrases That Outweigh All Other Dhikr (3x)",
    arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ ، عَدَدَ خَلْقِهِ ، وَرِضَا نَفْسِهِ ، وَزِنَةَ عَرْشِهِ ، وَمِدَادَ كَلِمَاتِهِ",
    transliteration: "Subḥāna-llāhi wa bi ḥamdih, ʿadada khalqih, wa riḍā nafsih, wa zinata ʿarshih, wa midāda kalimātih.",
    translation: "Allah is free from imperfection and all praise is due to Him, (in ways) as numerous as all He has created, (as vast) as His pleasure, (as limitless) as the weight of His Throne, and (as endless) as the ink of His words.",
    category: "Morning Duas",

  },
  {
    id: 26,
    title: "Ayat al-Kursi: The Greatest Protection",
    arabic: "أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. اَللّٰهُ لَآ إِلٰهَ إِلَّا هُوَ الْحَىُّ الْقَيُّوْمُ ، لَا تَأْخُذُهُۥ سِنَةٌ وَّلَا نَوْمٌ ، لَهُ مَا فِى السَّمٰـوٰتِ وَمَا فِى الْأَرْضِ ، مَنْ ذَا الَّذِىْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِۦ ، يَعْلَمُ مَا بَيْنَ أَيْدِيْهِمْ وَمَا خَلْفَهُمْ ، وَلَا يُحِيْطُوْنَ بِشَىْءٍ مِّنْ عِلْمِهِٓ إِلَّا بِمَا شَآءَ ، وَسِعَ كُرْسِيُّهُ السَّمٰـوٰتِ وَالْأَرْضَ، وَلَا يَئُوْدُهُۥ حِفْظُهُمَا ، وَهُوَ الْعَلِىُّ الْعَظِيْمُ",
    transliteration: "Aʿūdhu bi-llāhi mina-sh-Shayṭāni-r-rajīm. Allāhu lā ilāha illā Huwa-l-Ḥayyu-l-Qayyūm, lā ta’khudhuhū sinatuw-wa lā nawm, lahū mā fi-s-samāwāti wa mā fi-l-arḍ, man dhā’lladhī yashfaʿu ʿindahū illā bi-idhnih, yaʿlamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay’im-min ʿilmihī illā bi-mā shā’, wasiʿa kursiyyuhu-s-samāwāti wa-l-arḍ, wa lā ya’ūduhū ḥifẓuhumā wa Huwa-l-ʿAlliyu-l-ʿAẓīm.",
    translation: "I seek the protection of Allah from the accursed Shayṭān. Allah, there is no god worthy of worship but He, the Ever Living, The Sustainer of all. Neither drowsiness overtakes Him nor sleep. To Him Alone belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except with His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursī extends over the heavens and the earth, and their preservation does not tire Him. And He is the Most High, the Magnificent. (2:255)",
    category: "Evening Duas",
  },
  {
    id: 27,
    title: "Surah Al Ikhlas (3x)",
    arabic:"بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ أَحَدٌ ، اَللّٰهُ الصَّمَدُ ، لَمْ يَلِدْ وَلَمْ يُوْلَدْ ، وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul Huwa-llāhu Aḥad. Allāhu-ṣ-Ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahū kufuwan aḥad.",
    translation: "In the name of Allah, the All-Merciful, the Very Merciful. Say, He is Allah, the One, the Self-Sufficient Master, Who has not given birth and was not born, and to Whom no one is equal. (112)",
    category: "Evening Duas",
  },
  {
    id: 28,
    title: "Surah Al Falaq (3x)",
    arabic: " بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ ، مِنْ شَرِّ مَا خَلَقَ ، وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ، وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ، وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul aʿūdhu bi-Rabbi-l-falaq. Min sharri mā khalaq. Wa min sharri ghāsiqin idhā waqab. Wa min sharri-n-naffāthāti fi-l-ʿuqad. Wa min sharri ḥāsidin idhā ḥasad.",
    translation:"In the name of Allah, the All-Merciful, the Very Merciful. Say, I seek protection of the Lord of the daybreak, from the evil of what He has created, and from the evil of the darkening night when it settles, and from the evil of the blowers in knots, and from the evil of the envier when he envies. (113)",
    category: "Evening Duas",
  },
  {
    id: 29 ,
    title: "Surah An Nas (3x)",
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ أَعُوْذُ بِرَبِّ النَّاسِ ، مَلِكِ النَّاسِ ، إِلٰهِ النَّاسِ ، مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ، اَلَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ ، مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Bismi-llāhi-r-Raḥmāni-r-Raḥīm. Qul aʿūdhu bi-Rabbi-n-nās. Maliki-n-nās. Ilāh-hin-nās. Min sharri-l-waswāsi-l-khannās. Al-ladhī yuwaswisu fī ṣudūri-n-nās. Mina-l-jinnati wa-n-nās.",
    translation: "In the name of Allah, the All-Merciful, the Very Merciful. Say, I seek protection of the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers in the hearts of mankind, whether they be Jinn or people. (114)",
    category: "Evening Duas",

  },
  {
    id: 30  ,
    title: "Sayyid al-Istighfar: The Best Way of Seeking Forgiveness",
    arabic: "اَللّٰهُمَّ أَنْتَ رَبِّيْ لَا إِلٰهَ إِلَّا أَنْتَ ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ لَكَ بِذَنْبِيْ ، فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma Anta Rabbī, lā ilāha illā Ant, khalaqtanī wa ana ʿabduk, wa ana ʿalā ʿahdika wa waʿdika mā’staṭaʿt, aʿūdhu bika min sharri mā ṣanaʿt, abū’u laka bi niʿmatika ʿalayya wa abū’u laka bi-dhambī fa-ghfir lī fa-innahū lā yaghfiru-dh-dhunūba illā Ant.",
    translation: "O Allah, You are my Lord. There is no god worthy of worship except You. You have created me, and I am Your slave, and I am under Your covenant and pledge (to fulfil it) to the best of my ability. I seek Your protection from the evil that I have done. I acknowledge the favours that You have bestowed upon me, and I admit my sins. Forgive me, for none forgives sins but You.",
    category: "Evening Duas",

  },
  {
    id: 31 ,
    title: "Protect Yourself From Anxiety, Laziness, Debt etc",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ ، وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ ، وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    transliteration: "Allāhumma innī aʿūdhu bika min-l-hammi wa-l-ḥazan, wa aʿūdhu bika min-l-ʿajzi wa-l-kasal, wa aʿūdhu bika min-l-jubni wa-l-bukhl, wa aʿūdhu bika min ghalabati-d-dayni wa qahri-r-rijāl.",
    translation: "O Allah, I seek Your protection from anxiety and grief. I seek Your protection from inability and laziness. I seek Your protection from cowardice and miserliness, and I seek Your protection from being overcome by debt and being overpowered by men.",
    category: "Evening Duas",

  },
  {
    id: 32 ,
    title: "Well-being in this World and the Hereafter",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِيْ دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ ، اَللّٰهُمَّ اسْتُرْ عَوْرَاتِيْ وَآمِنْ رَوْعَاتِيْ ، اَللّٰهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ ، وَمِنْ خَلْفِيْ ، وَعَنْ يَّمِيْنِيْ ، وَعَنْ شِمَالِيْ ، وَمِنْ فَوْقِيْ ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ",
    transliteration: "Allāhumma innī as’aluka-l-ʿāfiyata fi-d-dunyā wa-l-ākhirah. Allāhumma innī as’aluka-l-ʿafwa wa-l-ʿāfiyata fī dīnī wa dunyāya wa ahlī wa mālī, Allāhumma-stur ʿawrātī wa āmin rawʿātī. Allāhumma-ḥfaẓnī mim bayni yadayya wa min khalfī, wa ʿay-n yamīnī wa ʿan shimālī wa min fawqī, wa aʿūdhu bi-ʿaẓamatika an ughtāla min taḥtī.",
    translation: "O Allah, I ask You for well-being in this world and the next. O Allah, I ask You for forgiveness and well-being in my religion, in my worldly affairs, in my family and in my wealth. O Allah, conceal my faults and calm my fears. O Allah, guard me from in front of me and behind me, from my right, and from my left, and from above me. I seek protection in Your Greatness from being unexpectedly destroyed from beneath me.",
    category: "Evening Duas",

  },
  {
    id: 33 ,
    title: "Protect Yourself From the 4 Evils",
    arabic: "اَللّٰهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ ، فَاطِرَ السَّمٰوَاتِ وَالْأَرْضِ ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ ، أَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا أَنْتَ ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِيْ سُوْءًا ، أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ",
    transliteration: "Allāhumma ʿālima-l-ghaybi wa-sh-shahādah, fāṭir-as-samāwāti wa-l-arḍi, rabba kulli shay’iw-wa malīkah, ash-hadu al-lā ilāha illā Anta, aʿūdhu bika min sharri nafsī wa min sharri-sh-shayṭāni wa shirkihī wa an aqtarifa ʿalā nafsī sū’an aw ajurrahū ilā muslim.",
    translation: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, the Lord and Sovereign of everything; I bear witness that there is no god worthy of worship but You. I seek Your protection from the evil of my own self, from the evil of Shayṭān and from the evil of polytheism to which he calls,and from inflicting evil on myself, or bringing it upon a Muslim.",
    category: "Evening Duas",

  },
  {
    id: 34 ,
    title: "Entrust All Your Matters to Allah",
    arabic: "يَا حَيُّ يَا قَيُّوْمُ ، بِرَحْمَتِكَ أَسْتَغِيْثُ ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ ، وَلَا تَكِلْنِيْ إِلَىٰ نَفْسِيْ طَرْفَةَ عَيْنٍ",
    transliteration: "Yā Ḥayyu yā Qayyūm, bi-raḥmatika astaghīth, aṣliḥ lī sha’nī kullah, wa lā takilnī ilā nafsī ṭarfata ʿayn.",
    translation: "O The Ever Living, The Sustainer of all. ; I seek assistance through Your mercy. Rectify all of my affairs and do not entrust me to myself for the blink of an eye.",
    category: "Evening Duas",

  },
  {
    id: 35 ,
    title: "Fulfil Your Obligation to Thank Allah",
    arabic: "اَللّٰهُمَّ مَا أَصْبَحَ بِيْ مِنْ نِّعْمَةٍ أَوْ بِأَحَدٍ مِّنْ خَلْقِكَ ، فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
    transliteration: "Allāhumma mā aṣbaḥa bī min niʿmatin aw bi-aḥadim-min khalqik, fa-minka waḥdaka lā sharīka lak, fa laka-l-ḥamdu wa laka-sh-shukr.",
    translation: "O Allah, all the favours that I or anyone from Your creation has received in the morning, are from You Alone. You have no partner. To You Alone belong all praise and all thanks.",
    category: "Evening Duas",

  },
  {
    id:36 ,
    title: "Start Your Evening by Renewing Tawhid",
    arabic: "أَمْسَيْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ ، وَعَلَىٰ دِيْنِ نَبِيِّنَا مُحَمَّدٍ ، وَعَلَىٰ مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُّسْلِمًا وَّمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
    transliteration: "Amsaynā ʿalā fiṭrati-l-islām, wa ʿalā kalimati-l-ikhlāṣ, wa ʿalā dīni Nabiyyinā Muḥammadin ṣallallāhu ʿalayhi wa sallam, wa ʿalā millati abīnā Ibrāhīma ḥanīfam-muslima, wa mā kāna mina-l-mushrikīn.",
    translation: "We have entered the evening upon the natural religion of Islam, the statement of pure faith (i.e. Shahādah), the religion of our Prophet Muhammad ﷺ and upon the way of our father Ibrāhīm, who turned away from all that is false, having surrendered to Allah, and he was not of the polytheists. (Nasā’ī)",
    category: "Evening Duas",
  },
  {
    id: 37  ,
    title: "Start the Evening by Praising Allah (3x)",
    arabic: "أَمْسَيْتُ أُثْنِيْ عَلَيْكَ حَمْدًا ، وَأَشْهَدُ أَنْ لَّا إِلٰهَ إِلَّا اللّٰهُ",
    transliteration: "Amsaytu uthnī ʿalayka ḥamdā, wa ash-hadu al-lā ilāha illāl-llāh.",
    translation: "I have entered the evening praising You, and I bear witness that there is no god worthy of worship but Allah.",
    category: "Evening Duas",
  },
  {
    id: 38 ,
    title: "Ask Allah for a Good Evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ وَالْحَمْدُ لِلّٰهِ ، لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration: "Amsaynā wa amsa-l-mulku li-llāh, wa-l-ḥamdu li-llāh, lā ilāha illa-llāhu waḥdahū lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, wa huwa ʿalā kulli shay’in Qadīr, Rabbi as’aluka khayra mā fī hādhihi-l-laylati wa khayra mā baʿdah, wa aʿūdhu bika min sharri mā fī hādhihi-l-laylati wa sharri mā baʿdah. Rabbi aʿūdhu bika mina-l-kasali wa sū’i-l-kibar, Rabbi aʿūdhu bika min ʿadhābin fi-n-nāri wa ʿadhābin fi-l-qabr.",
    translation: "We have entered the evening and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god worthy of worship except Allah, the One; He has no partner with Him. The entire kingdom belongs solely to Him, to Him is all praise due, and He is All-Powerful over everything. My Lord, I ask You for the good that is in this night and the good that follows it, and I seek Your protection from the evil that is in this night and from the evil that follows it. My Lord, I seek Your protection from laziness and the misery of old age. My Lord, I seek Your protection from the torment of the Hell-fire and the punishment of the grave.",
    category: "Evening Duas",
  },
  {
    id: 39  ,
    title: "Ask Allah to Bless Your Evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ رَبِّ الْعَالَمِيْنَ ، اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ هـٰذِهِ اللَّيْلَةِ ، فَتْحَهَا وَنَصْرَهَا وَنُوْرَهَا وَبَرَكَتَهَا وَهُدَاهَا ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهَا وَشَرِّ مَا بَعْدَهَا",
    transliteration: "Amsaynā wa amsa-l-mulku li-llāhi Rabbi-l-ʿālamīn, Allāhumma innī as’aluka khayra hādhihi-l-laylah, fatḥahā wa naṣrahā wa nūrahā wa barakatahā wa hudāhā, wa aʿūdhu bika min sharri mā fīhā wa sharri mā baʿdahā.",
    translation: "We have entered the evening and at this very time the whole kingdom belongs to Allah, Lord of the Worlds. O Allah, I ask You for the goodness of this day/night: its victory, its help, its light, and its blessings and guidance. I seek Your protection from the evil that is in it and from the evil that follows it.",
    category: "Evening Duas",
  },
  {
    id: 40  ,
    title: "Get Yourself Freed from the Hell-fire (4x)",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيْعَ خَلْقِكَ ، أَنَّكَ أَنْتَ اللّٰهُ لَا إِلٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيْكَ لَكَ ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ",
    transliteration: "Allāhumma innī amsaytu ush-hiduka, wa ush-hidu ḥamlata ʿarshika, wa malā’ikatika, wa jamī’a khalqika, annaka Anta-llāhu lā ilāha illā Anta waḥdak, lā sharīka lak, wa an-na Muḥammadan ʿabduka wa rasūluk.",
    translation: "O Allah, I have entered the evening, and I call upon You, the bearers of Your Throne, Your angels and all creation, to bear witness that surely You are Allah. There is no god worthy of worship except You Alone. You have no partners, and that Muḥammad ﷺ is Your slave and Your Messenger.",
    category: "Evening Duas",
  },
  {
    id: 41 ,
    title: "Upon Entering the Evening",
    arabic: "اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَإِلَيْكَ الْمَصِيْرُ",
    transliteration: "Allāhumma bika amsaynā wa bika aṣbaḥnā wa bika naḥyā wa bika namūtu wa ilayka-l-maṣīr.",
    translation: "O Allah, by You we have entered the evening and by You we enter upon the morning. By You, we live and we die, and to You is the resurrection/return.",
    category: "Evening Duas",
  },
  {
    id: 42 ,
    title: "Ask Allah For Good Health and Protection (3x)",
    arabic: "اَللّٰهُمَّ عَافِنِيْ فِيْ بَدَنِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ سَمْعِيْ ، اَللّٰهُمَّ عَافِنِيْ فِيْ بَصَرِيْ ، لَا إِلٰهَ إِلَّا أَنْتَ ، اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلٰهَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā Ant, Allāhumma innī aʿūdhu bika mina-l-kufri wa-l-faqr, wa aʿūdhu bika min ʿadhābi-l-qabr, lā ilāha illā Ant.",
    translation: "O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight. There is no god worthy of worship except You. O Allah, I seek Your protection from disbelief and poverty and I seek Your protection from the punishment of the grave. There is no god worthy of worship except You.",
    category: "Evening Duas",

  },
  {
    id: 43 ,
    title: "Allah Will Suffice You in Everything (7x)",
    arabic: "حَسْبِيَ اللّٰهُ لَا إِلٰهَ إِلَّا هُوَ ، عَلَيْهِ تَوَكَّلْتُ ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيْمِ",
    transliteration: "Ḥasbiya-Allāhu lā ilāha illā Huwa, ʿalayhi tawakkaltu, wa Huwa Rabbu-l-ʿArshi-l-ʿaẓīm.",
    translation: "Allah is sufficient for me. There is no god worthy of worship except Him. I have placed my trust in Him only and He is the Lord of the Magnificent Throne.",
    category: "Evening Duas",

  },
  {
    id: 44 ,
    title: "Have the Prophet ﷺ Hold Your Hand and Admit You to Paradise (3x)",
    arabic: "رَضِيْتُ بِاللّٰهِ رَبًّا ، وَبِالْإِسْلَامِ دِيْنًا ، وَبِمُحَمَّدٍ نَّبِيًّا",
    transliteration: "Raḍītu bi-llāhi Rabbā, wa bi-l-islāmi dīnā, wa bi Muḥammadin-Nabiyyā.",
    translation: "I am pleased with Allah as my Lord, with Islām as my religion and with Muḥammad ﷺ as my Prophet.",
    category: "Evening Duas",

  },
  {
    id: 45 ,
    title: "Protect Yourself From All Harm (3x)",
    arabic: "بِسْمِ اللّٰهِ الَّذِيْ لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ ، وَهُوَ السَّمِيْعُ الْعَلِيْمُ",
    transliteration: "Bismi-llāhi-lladhī lā yaḍurru maʿasmihi shay’un fi-l-arḍi wa lā fi-s-samā’, wa Huwa-s-Samīʿu-l-ʿAlīm.",
    translation: "In the Name of Allah, with whose Name nothing can harm in the earth nor in the sky. He is The All-Hearing and All-Knowing.",
    category: "Evening Duas",

  },
  {
    id: 46 ,
    title: "Get Your Sins Forgiven (100x)",
    arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ",
    transliteration: "Subḥāna-llāhi wa bi ḥamdih.",
    translation: "Allah is free from imperfection, and all praise is due to Him.",
    category: "Evening Duas",

  },
  {
    id: 47 ,
    title: "An Uparallel Reward (100x)",
    arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيْرٌ.",
    transliteration: "Lā ilāha illā-Allāh, waḥdahū lā sharīka lah, lahu-l-mulk, wa lahu-l-ḥamd, wa Huwa ʿalā kulli shay’in Qadīr.",
    translation: "There is no god worthy of worship except Allah. He is Alone and He has no partner whatsoever. To Him Alone belong all sovereignty and all praise. He is over all things All-Powerful.",
    category: "Evening Duas",

  },
  {
    id: 48 ,
    title: "Receive the Intercession of the Prophet ﷺ (100x)",
    arabic: "الصلاة على النبي (اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ ، اَللّٰهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ اٰلِ مُحَمَّدٍ ، كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيْمَ وَعَلَىٰ اٰلِ إِبْرَاهِيْمَ ، إِنَّكَ حَمِيْدٌ مَّجِيْدٌ)",
    transliteration: "Allāhumma ṣalli ʿalā Muḥammad wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka Ḥamīdu-m-Majīd, Allāhumma bārik ʿalā Muḥammad, wa ʿalā āli Muḥammad, kamā bārakta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka Ḥamīdu-m-Majīd",
    translation: "O Allah, honour and have mercy upon Muhammad and the family of Muhammad as You have honoured and had mercy upon Ibrāhīm and the family of Ibrāhīm. Indeed, You are the Most Praiseworthy, the Most Glorious. O Allah, bless Muhammad and the family of Muhammad as You have blessed Ibrāhīm and the family of Ibrāhīm. Indeed, You are the Most Praiseworthy, the Most Glorious.",
    category: "Evening Duas",

  },
  {
    id: 49  ,
    title: "Protection from all Evil (3x)",
    arabic: "أَعُوْذُ بِكَلِمَاتِ اللّٰهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "Aʿūdhu bi kalimāti-l-llāhi-t-tāmmāti min sharri mā khalaq.",
    translation: "I seek protection in Allah’s perfect words from the evil of whatever He has created.",
    category: "Evening Duas",
  },

];

const DuaCard = ({
  dua,
  isBookmarked,
  toggleBookmark,
}: {
  dua: Dua;
  isBookmarked: boolean;
  toggleBookmark: (id: number) => void;
}) => (
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
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);

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

  const filteredDuas = showBookmarks
    ? duas.filter((dua) => bookmarkedIds.includes(dua.id))
    : duas.filter((dua) => dua.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Daily Duas</h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Explore categorized duas and bookmark your favorites for quick access.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setShowBookmarks(false)}
            className={`px-4 py-2 rounded ${
              !showBookmarks ? "bg-teal-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            All Duas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setShowBookmarks(false);
                setActiveCategory(category);
              }}
              className={`px-4 py-2 rounded ${
                activeCategory === category && !showBookmarks
                  ? "bg-teal-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setShowBookmarks(true)}
            className={`px-4 py-2 rounded ${
              showBookmarks ? "bg-yellow-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            View Bookmarks
          </button>
        </div>

        {/* Dua Display Section */}
        <div className="space-y-6">
          {filteredDuas.length === 0 ? (
            <p className="text-center text-gray-600">
              {showBookmarks
                ? "No bookmarked duas yet. Bookmark your favorite duas to see them here."
                : "No duas available in this category."}
            </p>
          ) : (
            filteredDuas.map((dua) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                isBookmarked={bookmarkedIds.includes(dua.id)}
                toggleBookmark={toggleBookmark}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DuaPage;

