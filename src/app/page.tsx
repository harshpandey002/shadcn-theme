'use client';

import BasicControls from '@/components/BasicControls';
import CardsDemo from '@/components/cards';
import EditTheme from '@/components/EditTheme';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showAdvControls, setShowAdvControls] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-10 py-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-black italic">Shadcn Theme Generator</h1>
          <p className="max-w-xl text-xl mt-2 font-medium text-muted-foreground">
            Generate high quality theme for your website with a single color, or
            click on the Advance Controls to have even more control over your
            theme.
          </p>
          <Button
            size="lg"
            className="flex items-center gap-3 w-max mt-4 bg-[#242424] text-white text-md hover:bg-[#070707] hover:underline">
            <Icons.gitHub className="h-5 w-5" />
            View Code
          </Button>
        </div>
        <BasicControls setShowAdvControls={setShowAdvControls} />
      </div>
      {mounted ? <CardsDemo /> : null}
      <EditTheme
        showAdvControls={showAdvControls}
        setShowAdvControls={setShowAdvControls}
      />
    </div>
  );
}
