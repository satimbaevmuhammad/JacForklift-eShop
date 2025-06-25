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
    }
   
  ]

  // Agar dinamik mahsulot sahifalari bo'lsa, ularni shu yerga qo'shishingiz mumkin
  // Mahsulot turkumlari misoli:


  return [...staticPages, ...mahsulotSahifalari]
}