// utils/searchHadith.ts
import { Hadith } from "../types/hadith";

export const searchHadiths = (query: string, hadiths: Hadith[]): Hadith[] => {
  if (!query) return hadiths;

  return hadiths.filter((hadith) =>
    hadith.arabic.toLowerCase().includes(query.toLowerCase()) ||
    hadith.english.toLowerCase().includes(query.toLowerCase()) ||
    hadith.explanation.toLowerCase().includes(query.toLowerCase())
  );
};

  