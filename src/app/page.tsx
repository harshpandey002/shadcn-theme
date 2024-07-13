'use client';

import CardsDemo from '@/components/cards';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div className="p-10">{mounted ? <CardsDemo /> : null}</div>;
}
