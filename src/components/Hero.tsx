import BasicControls from '@/components/BasicControls';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AdvanceControls from './AdvanceControls';
import CopyCode from './CopyCode';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [showAdvControls, setShowAdvControls] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const onOpenCode = () => {
    setShowCode(true);
  };

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-10 py-20">
      <div className="col-span-2 flex flex-col justify-center text-center md:text-start">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2 ml-2">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/harshpandey002/">
            {<Icons.linkedin className="h-5 w-5 fill-primary" />}
          </Link>
          <Link target="_blank" href="https://x.com/harshpandey002">
            {<Icons.twitter className="h-5 w-5 fill-primary" />}
          </Link>
          <div className="h-full w-[1px] bg-muted" />
          <Link
            target="_blank"
            href="https://harshkumarpandey.com"
            className="flex items-center gap-2 hover:underline underline-offset-2 text-primary font-medium">
            harshkumarpandey.com
            <MoveRight className="h-5 w-5 text-primary" />
          </Link>
        </div>

        <h1 className="text-4xl font-black italic">shadcn Theme Generator</h1>
        <p className="max-w-xl md:text-xl mt-2 font-medium text-muted-foreground">
          Generate high quality theme for your website with a single color, or
          click Advance Controls to have even more control over your theme.
        </p>
        <Link
          href="https://github.com/harshpandey002/shadcn-theme"
          target="_blank"
          className={cn(
            buttonVariants(),
            'flex items-center gap-3 w-max px-6 mt-8 rounded-[24px] bg-[#242424] text-white text-md hover:bg-[#070707] hover:underline mx-auto md:mx-0'
          )}>
          <Icons.gitHub className="h-5 w-5" />
          View Code
        </Link>
      </div>
      <div className="col-span-2">
        <BasicControls
          showAdvControls={showAdvControls}
          setShowAdvControls={setShowAdvControls}
          onOpenCode={onOpenCode}
        />
      </div>
      {showAdvControls ? (
        <div className="col-span-2 lg:col-span-4">
          <AdvanceControls onOpenCode={onOpenCode} />
        </div>
      ) : null}
      <CopyCode show={showCode} onClose={() => setShowCode(false)} />
    </div>
  );
}
