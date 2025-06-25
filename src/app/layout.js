import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JacForklift Uzbekistan - Forklift sotish, ijara, ta\'mirlash | Toshkent',
  description: 'JacForklift Uzbekistan - O\'zbekistonda eng ishonchli forklift va yuk ko\'tarish texnikalari. Professional sotish, ijara, ta\'mirlash va servis xizmatlari. Yangi va ishlatilgan forkliftlar eng qulay narxlarda!',
  keywords: 'forklift uzbekistan, forklift toshkent, forklift sotish, forklift ijara, yuk koʻtaruvchi, elektr forklift, dizel forklift, forklift ehtiyot qismlari, forklift tamirlash, warehouse equipment uzbekistan, pogRUZchik uzbekistan, JAC forklift uzbekistan,kara toshkent',
  authors: [{ name: 'JacForklift Uzbekistan' }],
  creator: 'JacForklift Team',
  publisher: 'JacForklift Uzbekistan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jacforklift.uz'),
  alternates: {
    canonical: 'https://jacforklift.uz',
    languages: {
      'uz': 'https://jacforklift.uz',
      'ru': 'https://jacforklift.uz/ru',
      'en': 'https://jacforklift.uz/en'
    }
  },
  openGraph: {
    title: 'JacForklift Uzbekistan - Forklift sotish va ijara xizmatlari',
    description: 'O\'zbekistonda eng ishonchli forklift yetkazib beruvchi. Yangi va ishlatilgan forkliftlar, professional servis xizmatlari.',
    url: 'https://jacforklift.uz',
    siteName: 'JacForklift Uzbekistan',
    images: [
      {
        url: 'https://jacforklift.uz/images/og-forklift-uzbekistan.jpg',
        width: 1200,
        height: 630,
        alt: 'JacForklift Uzbekistan - Forklift sotish va xizmat',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JacForklift Uzbekistan - Professional forklift xizmatlari',
    description: 'Ishonchli forklift sotish, ijara va ta\'mirlash xizmatlari',
    images: ['https://jacforklift.uz/images/twitter-forklift.jpg'],
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
    google: 'google-site-verification=9k2tDlaLTD-3vjKRtXxfN88Z7K0nsh-XLaf1ZJwD_dc',
    yandex: 'haqiqiy-yandex-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Tashkent" />
        <meta name="geo.position" content="41.311151;69.279737" />
        <meta name="ICBM" content="41.311151, 69.279737" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data - Company */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JacForklift Uzbekistan",
              "alternateName": "JacForklift UZ",
              "url": "https://jacforklift.uz",
              "logo": "https://jacforklift.uz/images/logo.png",
              "description": "Professional forklift sotish, ijara va ta'mirlash xizmatlari O'zbekistonda",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "UZ",
                "addressRegion": "Toshkent",
                "addressLocality": "Toshkent",
                "streetAddress": "Sizning manzilingiz"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.311151",
                "longitude": "69.279737"
              },
              "contactPoint": [{
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": "+998901234567",
                "areaServed": "UZ",
                "availableLanguage": ["uz", "ru", "en"]
              }, {
                "@type": "ContactPoint",
                "contactType": "sales",
                "telephone": "+998701234567",
                "areaServed": "UZ"
              }],
              "sameAs": [
                "https://t.me/jacforklift_uz",
                "https://instagram.com/jacforklift_uz"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Uzbekistan"
              },
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Forklift va yuk koʻtarish texnikalari",
                  "category": "Industrial Equipment"
                }
              }
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "JacForklift Uzbekistan",
              "image": "https://jacforklift.uz/images/business-photo.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sizning manzilingiz",
                "addressLocality": "Toshkent",
                "addressRegion": "Toshkent",
                "postalCode": "100000",
                "addressCountry": "UZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.311151,
                "longitude": 69.279737
              },
              "url": "https://jacforklift.uz",
              "telephone": "+998901234567",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$"
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Bosh sahifa",
                "item": "https://jacforklift.uz"
              }]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}