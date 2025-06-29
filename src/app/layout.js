import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JacForklift Uzbekistan - Forklift sotish, ijara, ta\'mirlash | Toshkent',
  description: 'JacForklift Uzbekistan - O\'zbekistonda eng ishonchli forklift va yuk ko\'tarish texnikalari. Professional sotish, ijara, ta\'mirlash va servis xizmatlari. Yangi va ishlatilgan forkliftlar eng qulay narxlarda!',
  keywords: 'forklift uzbekistan, forklift toshkent, forklift sotish, forklift ijara, yuk koʻtaruvchi, elektr forklift, dizel forklift, forklift ehtiyot qismlari, forklift tamirlash, warehouse equipment uzbekistan, pogRUZchik uzbekistan, JAC forklift uzbekistan, kara toshkent',
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
        type: 'image/jpeg'
      },
      {
        url: 'https://jacforklift.uz/images/logo.png',
        width: 800,
        height: 600,
        alt: 'JacForklift Uzbekistan Logo',
        type: 'image/png'
      }
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JacForklift Uzbekistan - Professional forklift xizmatlari',
    description: 'Ishonchli forklift sotish, ijara va ta\'mirlash xizmatlari',
    images: [
      {
        url: 'https://jacforklift.uz/images/twitter-forklift.jpg',
        alt: 'JacForklift Uzbekistan'
      }
    ],
    creator: '@jacforklift_uz',
    site: '@jacforklift_uz'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '9k2tDlaLTD-3vjKRtXxfN88Z7K0nsh-XLaf1ZJwD_dc',
    yandex: 'haqiqiy-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1a365d' }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        {/* Enhanced Meta Tags */}
        <meta name="google-site-verification" content="9k2tDlaLTD-3vjKRtXxfN88Z7K0nsh-XLaf1ZJwD_dc" />
        <meta name="yandex-verification" content="haqiqiy-yandex-verification-code" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="msapplication-TileColor" content="#1a365d" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="UZ-TK" />
        <meta name="geo.placename" content="Tashkent, Uzbekistan" />
        <meta name="geo.position" content="41.311151;69.279737" />
        <meta name="ICBM" content="41.311151, 69.279737" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:image:secure_url" content="https://jacforklift.uz/images/og-forklift-uzbekistan.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        
        {/* Additional Twitter Meta */}
        <meta name="twitter:image:alt" content="JacForklift Uzbekistan - Professional forklift equipment" />
        
        {/* Favicons and Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload Critical Images */}
        <link rel="preload" as="image" href="/images/hero-forklift.jpg" />
        <link rel="preload" as="image" href="/images/logo.png" />
        
        {/* Enhanced Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JacForklift Uzbekistan",
              "alternateName": ["JacForklift UZ", "JAC Forklift Uzbekistan"],
              "url": "https://jacforklift.uz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://jacforklift.uz/images/logo.png",
                "width": 400,
                "height": 200,
                "caption": "JacForklift Uzbekistan Logo"
              },
              "image": [
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/business-photo.jpg",
                  "width": 1200,
                  "height": 800,
                  "caption": "JacForklift Uzbekistan Office"
                },
                {
                  "@type": "ImageObject", 
                  "url": "https://jacforklift.uz/images/showroom.jpg",
                  "width": 1200,
                  "height": 800,
                  "caption": "Forklift Showroom"
                }
              ],
              "description": "Professional forklift sotish, ijara va ta'mirlash xizmatlari O'zbekistonda. JAC brendining rasmiy vakili.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Amir Temur shoh ko'chasi, 1-uy",
                "addressLocality": "Toshkent",
                "addressRegion": "Toshkent",
                "postalCode": "100000",
                "addressCountry": "UZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.311151",
                "longitude": "69.279737"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "telephone": "+998901234567",
                  "areaServed": "UZ",
                  "availableLanguage": ["uz", "ru", "en"],
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "telephone": "+998701234567",
                  "areaServed": "UZ",
                  "availableLanguage": ["uz", "ru"]
                }
              ],
              "sameAs": [
                "https://t.me/jacforklift_uz",
                "https://instagram.com/jacforklift_uz",
                "https://facebook.com/jacforklift.uzbekistan"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Uzbekistan"
              },
              "foundingDate": "2020",
              "numberOfEmployees": "25-50",
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
                      "image": {
                        "@type": "ImageObject",
                        "url": "https://jacforklift.uz/images/electric-forklift.jpg",
                        "caption": "JAC Electric Forklift"
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
                      "durationOfWarranty": "P1Y",
                      "warrantyScope": "Full coverage including parts and labor"
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
                      "image": {
                        "@type": "ImageObject",
                        "url": "https://jacforklift.uz/images/diesel-forklift.jpg",
                        "caption": "JAC Diesel Forklift"
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
        
        {/* Enhanced Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "JacForklift Uzbekistan",
              "image": [
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/business-exterior.jpg",
                  "width": 1200,
                  "height": 800,
                  "caption": "JacForklift Uzbekistan Building"
                },
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/showroom-interior.jpg", 
                  "width": 1200,
                  "height": 800,
                  "caption": "Forklift Showroom Interior"
                },
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/service-center.jpg",
                  "width": 1200,
                  "height": 800,
                  "caption": "Service Center"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Amir Temur shoh ko'chasi, 1-uy",
                "addressLocality": "Toshkent",
                "addressRegion": "Toshkent viloyati",
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
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification", 
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "16:00"
                }
              ],
              "priceRange": "$$-$$$",
              "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Cryptocurrency"],
              "currenciesAccepted": "UZS",
              "hasMap": "https://maps.google.com/?q=41.311151,69.279737"
            })
          }}
        />

        {/* Enhanced Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "JAC Forklift - Professional Series",
              "image": [
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/forklift-main.jpg",
                  "width": 1200,
                  "height": 900,
                  "caption": "JAC Forklift Professional Series"
                },
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/forklift-side-view.jpg",
                  "width": 1200,
                  "height": 900,
                  "caption": "JAC Forklift Side View"
                },
                {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/forklift-cabin.jpg",
                  "width": 1200,
                  "height": 900,
                  "caption": "JAC Forklift Operator Cabin"
                }
              ],
              "description": "Yuqori sifatli JAC forkliftlar - elektr va dizel turlarida. Professional xizmat va 1 yil kafolat bilan. 1.5-10 tonna ko'tarish quvvati.",
              "brand": {
                "@type": "Brand",
                "name": "JAC",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/jac-logo.png"
                }
              },
              "manufacturer": {
                "@type": "Organization",
                "name": "JAC Motors",
                "url": "https://www.jac.com.cn"
              },
              "category": "Industrial Equipment",
              "model": "JAC Professional Series",
              "sku": "JAC-PRO-2024",
              "mpn": "JACPRO2024",
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
                  "warrantyScope": "Full coverage including parts and labor"
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

        {/* Image Sitemap Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageGallery",
              "name": "JacForklift Uzbekistan Gallery",
              "description": "Professional forklift equipment images",
              "image": [
                {
                  "@type": "ImageObject",
                  "contentUrl": "https://jacforklift.uz/images/gallery/forklift-1.jpg",
                  "name": "JAC Electric Forklift in Warehouse",
                  "description": "JAC electric forklift operating in warehouse environment",
                  "uploadDate": "2024-01-15"
                },
                {
                  "@type": "ImageObject", 
                  "contentUrl": "https://jacforklift.uz/images/gallery/forklift-2.jpg",
                  "name": "JAC Diesel Forklift Outdoor",
                  "description": "Heavy-duty JAC diesel forklift for outdoor operations",
                  "uploadDate": "2024-01-15"
                },
                {
                  "@type": "ImageObject",
                  "contentUrl": "https://jacforklift.uz/images/gallery/service-team.jpg", 
                  "name": "Professional Service Team",
                  "description": "Expert technicians providing forklift maintenance",
                  "uploadDate": "2024-01-15"
                }
              ]
            })
          }}
        />

        {/* Enhanced FAQ Schema */}
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
                    "text": "JAC forklift narxi 35-85 million so'm oralig'ida. Elektr forkliftlar 35-55 million so'm, dizel forkliftlar 45-85 million so'm. Aniq narx ko'tarish quvvati, model va qo'shimcha jihozlarga bog'liq. Batafsil ma'lumot uchun +998901234567 raqamiga qo'ng'iroq qiling.",
                    "image": {
                      "@type": "ImageObject",
                      "url": "https://jacforklift.uz/images/faq/forklift-prices.jpg"
                    }
                  }
                },
                {
                  "@type": "Question",
                  "name": "Forklift ijara xizmati bormi?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "Ha, bizda kunlik, haftalik va oylik forklift ijara xizmatlari mavjud. Kunlik ijara 500,000 so'mdan, haftalik 3,000,000 so'mdan, oylik 10,000,000 so'mdan boshlanadi. Operator xizmati ham mavjud.",
                    "image": {
                      "@type": "ImageObject",
                      "url": "https://jacforklift.uz/images/faq/rental-service.jpg"
                    }
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kafolat muddati qancha?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Barcha yangi forkliftlarga 1 yil to'liq kafolat beramiz. Ehtiyot qismlar va servis xizmatlari kafolat davomida bepul. Ishlatilgan forkliftlarga 6 oy kafolat.",
                    "image": {
                      "@type": "ImageObject",
                      "url": "https://jacforklift.uz/images/faq/warranty.jpg"
                    }
                  }
                },
                {
                  "@type": "Question",
                  "name": "Ehtiyot qismlar mavjudmi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ha, bizda barcha JAC forklift modellari uchun asl ehtiyot qismlar mavjud. Tez-tez kerak bo'ladigan qismlar doimo omborda, boshqa qismlar 3-7 kun ichida buyurtma qilinadi.",
                    "image": {
                      "@type": "ImageObject",
                      "url": "https://jacforklift.uz/images/faq/spare-parts.jpg"
                    }
                  }
                }
              ]
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JacForklift Uzbekistan",
              "url": "https://jacforklift.uz",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jacforklift.uz/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "JacForklift Uzbekistan",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jacforklift.uz/images/logo.png"
                }
              }
            })
          }}
        />

        {/* Enhanced Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Bosh sahifa",
                  "item": "https://jacforklift.uz"
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `
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