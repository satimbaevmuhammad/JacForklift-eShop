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
      'uz': 'https://jacforklift.uz/?lang=uz',
      'ru': 'https://jacforklift.uz/?lang=ru',
      'en': 'https://jacforklift.uz/?lang=en'
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
    google: '9k2tDlaLTD-3vjKRtXxfN88Z7K0nsh-XLaf1ZJwD_dc',
    yandex: 'haqiqiy-yandex-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="9k2tDlaLTD-3vjKRtXxfN88Z7K0nsh-XLaf1ZJwD_dc" />
        
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
        
        {/* Structured Data - Organization with Complete Offers */}
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
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Forklift va yuk ko'tarish texnikalari",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Elektr forkliftlar",
                      "category": "Industrial Equipment",
                      "brand": {
                        "@type": "Brand",
                        "name": "JAC"
                      },
                      "description": "Yuqori sifatli elektr forkliftlar 1.5-3.5 tonna ko'tarish quvvati bilan"
                    },
                    "price": "45000000",
                    "priceCurrency": "UZS",
                    "priceValidUntil": "2025-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "JacForklift Uzbekistan"
                    },
                    "warranty": {
                      "@type": "WarrantyPromise",
                      "durationOfWarranty": "P1Y"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Dizel forkliftlar",
                      "category": "Industrial Equipment", 
                      "brand": {
                        "@type": "Brand",
                        "name": "JAC"
                      },
                      "description": "Kuchli dizel forkliftlar 2-10 tonna ko'tarish quvvati bilan"
                    },
                    "price": "55000000",
                    "priceCurrency": "UZS",
                    "priceValidUntil": "2025-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "JacForklift Uzbekistan"
                    },
                    "warranty": {
                      "@type": "WarrantyPromise",
                      "durationOfWarranty": "P1Y"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Forklift ijara xizmati",
                      "category": "Rental Service",
                      "description": "Kunlik, oylik va yillik forklift ijara xizmatlari"
                    },
                    "price": "500000",
                    "priceCurrency": "UZS",
                    "priceValidUntil": "2025-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization", 
                      "name": "JacForklift Uzbekistan"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Forklift ta'mirlash xizmati",
                      "category": "Repair Service",
                      "description": "Professional ta'mirlash va texnik xizmat ko'rsatish"
                    },
                    "price": "1000000", 
                    "priceCurrency": "UZS",
                    "priceValidUntil": "2025-12-31",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization", 
                      "name": "JacForklift Uzbekistan"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
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
              "image": [
                "https://jacforklift.uz/images/business-photo.jpg",
                "https://jacforklift.uz/images/showroom.jpg"
              ],
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
              "email": "info@jacforklift.uz",
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
              "priceRange": "$$",
              "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
              "currenciesAccepted": "UZS"
            })
          }}
        />

        {/* Structured Data - Product Catalog */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "JAC Forklift - Professional Series",
              "image": [
                "https://jacforklift.uz/images/forklift-1.jpg",
                "https://jacforklift.uz/images/forklift-2.jpg",
                "https://jacforklift.uz/images/forklift-3.jpg"
              ],
              "description": "Yuqori sifatli JAC forkliftlar - elektr va dizel turlarida. Professional xizmat va 1 yil kafolat bilan. 1.5-10 tonna ko'tarish quvvati.",
              "brand": {
                "@type": "Brand",
                "name": "JAC"
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "JAC Motors"
              },
              "category": "Industrial Equipment",
              "model": "JAC Professional Series",
              "offers": {
                "@type": "Offer",
                "url": "https://jacforklift.uz/products",
                "priceCurrency": "UZS",
                "price": "45000000",
                "lowPrice": "35000000",
                "highPrice": "85000000",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "seller": {
                  "@type": "Organization",
                  "name": "JacForklift Uzbekistan"
                },
                "warranty": {
                  "@type": "WarrantyPromise",
                  "durationOfWarranty": "P1Y",
                  "warrantyScope": "Full coverage"
                },
                "shippingDetails": {
                  "@type": "OfferShippingDetails",
                  "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "UZS"
                  },
                  "deliveryTime": {
                    "@type": "ShippingDeliveryTime",  
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 1,
                      "maxValue": 3,
                      "unitCode": "DAY"
                    }
                  }
                }
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Ahmad Karimov"
                  },
                  "reviewBody": "Juda yaxshi forklift, ishonchli va sifatli xizmat. 2 yildan beri ishlatamiz, hech qanday muammo yo'q.",
                  "datePublished": "2024-12-15"
                },
                {
                  "@type": "Review", 
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Olim Toshmatov"
                  },
                  "reviewBody": "Professional xizmat va tez ta'mirlash. Ehtiyot qismlar doimo mavjud. Tavsiya qilaman!",
                  "datePublished": "2024-11-28"
                },
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating", 
                    "ratingValue": "4",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Sardor Yunusov"
                  },
                  "reviewBody": "Yaxshi sifat, narx ham maqul. Xizmat ko'rsatish a'lo darajada.",
                  "datePublished": "2024-10-20"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8", 
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              }
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

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "JAC forklift narxi qancha?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "JAC forklift narxi 35-85 million so'm oralig'ida. Aniq narx ko'tarish quvvati va modelga bog'liq. Batafsil ma'lumot uchun +998901234567 raqamiga qo'ng'iroq qiling."
                  }
                },
                {
                  "@type": "Question", 
                  "name": "Forklift ijara xizmati bormi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ha, bizda kunlik, haftalik va oylik forklift ijara xizmatlari mavjud. Kun uchun 500,000 so'mdan boshlangan narxlarda."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kafolat muddati qancha?", 
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Barcha yangi forkliftlarga 1 yil to'liq kafolat beramiz. Ehtiyot qismlar va servis xizmatlari kafolat davomida bepul."
                  }
                }
              ]
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