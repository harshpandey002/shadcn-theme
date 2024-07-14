import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';

const fontSans = GeistSans;

export const metadata: Metadata = {
  title: 'Shadcn Theme Generator | Harsh Pandey',
  description: 'Advance theme generator for Shadcn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
