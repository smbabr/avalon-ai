import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avalon.ai',
  description: 'The most powerful systems do not try to impress. They let silence and precision do the work.',
};

import Navigation from '@/components/layout/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import CursorGlow from '@/components/effects/CursorGlow';
import PageTransition from '@/components/effects/PageTransition';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-avalon-base text-avalon-text-primary selection:bg-avalon-accent selection:text-avalon-base">
        <ThemeProvider>
          <Navigation />
          <CursorGlow />
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
