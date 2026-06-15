import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const siteDescription =
  'Full-stack engineer building polished web and mobile products with Next.js, React, Flutter, and .NET. Currently building NextAria — AI-powered musical theatre song recommendations.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mukiibs.dev'),
  title: 'Joshua Daniel Mukiibi',
  description: siteDescription,
  openGraph: {
    title: 'Joshua Daniel Mukiibi — Full-Stack Software Engineer',
    description: siteDescription,
    url: 'https://www.mukiibs.dev',
    siteName: 'Joshua Daniel Mukiibi',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Joshua Daniel Mukiibi — Full-Stack Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joshua Daniel Mukiibi — Full-Stack Software Engineer',
    description: siteDescription,
    images: ['/assets/images/og-card.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background" suppressHydrationWarning>
        {children}
        <Toaster />
        <footer className="flex flex-col justify-center items-center h-20">
          <p className="text-sm text-gray-500">
            Favicon sourced from Icons8: <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/icon/N5H8YRvduAGy/source-code">Dev</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
          </p>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Joshua Daniel Mukiibi
          </p>
        </footer>
      </body>
    </html>
  );
}
