'use client';

import CardsDemo from '@/components/cards';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10 text-foreground">
      <Navbar />
      <Hero />
      {mounted ? <CardsDemo /> : null}
    </div>
  );
}
