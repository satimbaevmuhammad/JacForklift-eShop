export default function sitemap() {
  const baseUrl = 'https://jacforklift.uz'
  
  // Asosiy sahifalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/karaDetail/128`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/haqida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mahsulotlar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xizmatlar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ijara`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ehtiyot-qismlar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/aloqa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  ]

  // Mahsulot turkumlari (agar kerak bo'lsa)
  const mahsulotTurkumlari = [
    'elektr-forkliftlar',
    'dizel-forkliftlar', 
    'gaz-forkliftlar',
    'omborxona-uskunalari',
    'pallet-yuklovchilar',
    'baland-yuklovchilar'
  ]

  const mahsulotSahifalari = mahsulotTurkumlari.map(turkum => ({
    url: `${baseUrl}/mahsulotlar/${turkum}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Faqat asosiy sahifalarni qaytarish (agar mahsulot sahifalari kerak bo'lmasa)
  return staticPages
  
  // Agar mahsulot sahifalari ham kerak bo'lsa, quyidagi qatorni ishlatmating:
  // return [...staticPages, ...mahsulotSahifalari]
}