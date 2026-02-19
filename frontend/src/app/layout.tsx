import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'BusLens - Smart Bus Route Finder for Tricity',
  description: 'Discover the fastest, most convenient bus routes across Chandigarh, Mohali, and Panchkula with real-time information and smart recommendations.',
  keywords: ['bus routes', 'tricity', 'chandigarh', 'mohali', 'panchkula', 'public transport', 'route finder'],
  authors: [{ name: 'BusLens Team' }],
  creator: 'BusLens',
  publisher: 'BusLens',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://buslens.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BusLens - Smart Bus Route Finder for Tricity',
    description: 'Discover the fastest, most convenient bus routes across Chandigarh, Mohali, and Panchkula with real-time information and smart recommendations.',
    url: 'https://buslens.com',
    siteName: 'BusLens',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BusLens - Smart Bus Route Finder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BusLens - Smart Bus Route Finder for Tricity',
    description: 'Discover the fastest, most convenient bus routes across Chandigarh, Mohali, and Panchkula with real-time information and smart recommendations.',
    images: ['/og-image.jpg'],
    creator: '@buslens',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}