import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Icons } from './icons';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Shadcn Theme</h2>
      <Link
        className="block md:hidden"
        target="_blank"
        href="https://github.com/harshpandey002/shadcn-theme">
        {<Icons.gitHub className="h-5 w-5" />}
      </Link>
      <ul className="hidden md:flex items-center gap-8 list-none font-medium">
        <Link
          href="https://tailwindcss.com/"
          target="_blank"
          className="flex items-center gap-1 hover:text-primary">
          <li>Tailwind</li>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          target="_blank"
          href="https://ui.shadcn.com/"
          className="flex items-center gap-1 hover:text-primary">
          <li>Shadcn</li>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="https://nextjs.org/"
          className="flex items-center gap-1 hover:text-primary">
          <li>Nextjs</li>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </ul>
    </div>
  );
}
