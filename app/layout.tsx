import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav/NavBar";
import SmoothScrolling from "@/components/lib/SmoothScrolling";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
  description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
  keywords: "hearing aid center Ethiopia, hearing test Addis Ababa, audiology services East Africa, hearing aids Ethiopia, speech therapy Addis Ababa, cochlear implants Ethiopia, hearing loss treatment East Africa",
  authors: [{ name: 'East African Hearing and Speech Center' }],
  creator: 'East African Hearing and Speech Center',
  publisher: 'East African Hearing and Speech Center',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eaha.et'),
  alternates: {
    canonical: 'https://eaha.et',
  },
  openGraph: {
    title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
    description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
    url: 'https://eaha.et',
    siteName: 'East African Hearing and Speech Center',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Images/logo.png',
        width: 1200,
        height: 630,
        alt: 'East African Hearing and Speech Center - Leading Hearing Care in Ethiopia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
    description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
    images: ['/Images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ff6633',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ff6633" />
        <meta charSet="utf-8" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>
        <SmoothScrolling>
          <div className="bg-white relative z-0">
            <header role="banner">
              <Nav />
            </header>
            <main id="main-content" role="main">
              {children}
            </main>
          </div>
        </SmoothScrolling>
      </body>
    </html>
  );
}
