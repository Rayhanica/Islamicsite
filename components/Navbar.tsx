// components/Navbar.tsx
"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Islamic Website</Link>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gold-600">Home</Link>
          <Link href="/quran" className="hover:text-gold-600">Quran</Link>
          <Link href="/prayerTimes" className="hover:text-gold-600">Prayer Times</Link> {/* Link to Prayer Times */}
          <Link href="/dua" className="hover:text-gold-600">Duas </Link>
          <Link href="/about" className="hover:text-gold-600">About Me</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



