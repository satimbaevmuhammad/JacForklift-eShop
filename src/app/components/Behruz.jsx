// "use client"

// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'

// const Products = () => {
//     const [products, setProducts] = useState([])
//     const [categories, setCategories] = useState([])
//     const [filteredProducts, setFilteredProducts] = useState([])
//     const [selectedCategory, setSelectedCategory] = useState('all')
//     const [loading, setLoading] = useState(true)
//     const [searchTerm, setSearchTerm] = useState('')

//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const category = searchParams.get('category')

//     useEffect(() => {
//         fetchData()
//     }, [])

//     useEffect(() => {
//         if (category) {
//             setSelectedCategory(category)
//         }
//     }, [category])

//     useEffect(() => {
//         filterProducts()
//     }, [products, selectedCategory, searchTerm])

//     const fetchData = async () => {
//         try {
//             const [productsResponse, categoriesResponse] = await Promise.all([
//                 fetch('http://localhost:5000/products'),
//                 fetch('http://localhost:5000/categories')
//             ])

//             const productsData = await productsResponse.json()
//             const categoriesData = await categoriesResponse.json()

//             setProducts(productsData)
//             setCategories(categoriesData)
//             setLoading(false)
//         } catch (error) {
//             console.error('Ma\'lumotlarni yuklashda xato:', error)
//             setLoading(false)
//         }
//     }

//     const filterProducts = () => {
//         let filtered = products

//         // Kategoriya bo'yicha filtrlash
//         if (selectedCategory !== 'all') {
//             filtered = filtered.filter(product =>
//                 product.category_id.toString() === selectedCategory.toString()
//             )
//         }

//         // Qidiruv bo'yicha filtrlash
//         if (searchTerm) {
//             filtered = filtered.filter(product =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.description.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         }

//         setFilteredProducts(filtered)
//     }

//     const getCategoryName = (categoryId) => {
//         const category = categories.find(cat => cat.id === categoryId)
//         return category ? category.name : 'Noma\'lum kategoriya'
//     }

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD'
//         }).format(price)
//     }

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Header */}


//             {/* Main Content */}
//             <main className='py-20'>
//                 <div className='max-w-7xl mx-auto px-6'>
//                     {/* Header with Search */}
//                     <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6'>
//                         <div>
//                             <h1 className='text-5xl font-bold text-gray-900 mb-4'>
//                                 Mahsulotlar
//                             </h1>
//                             <div className='w-24 h-1 bg-orange-500'></div>
//                             <p className='text-gray-600 mt-4'>
//                                 {selectedCategory !== 'all'
//                                     ? `${getCategoryName(parseInt(selectedCategory))} kategoriyasidagi mahsulotlar`
//                                     : `Jami ${filteredProducts.length} ta mahsulot topildi`
//                                 }
//                             </p>
//                         </div>

//                         {/* Search and Filter */}
//                         <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto'>
//                             {/* Search */}
//                             <div className='relative'>
//                                 <input
//                                     type="text"
//                                     placeholder="Mahsulot qidirish..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className='w-full sm:w-80 px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
//                                 />
//                                 <svg className='absolute left-4 top-3.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
//                                 </svg>
//                             </div>

//                             {/* Category Filter */}
//                             <select
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                                 className='px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white'
//                             >
//                                 <option value="all">Barcha kategoriyalar</option>
//                                 {categories.map((category) => (
//                                     <option key={category.id} value={category.id}>
//                                         {category.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Products Grid */}
//                     {filteredProducts.length > 0 ? (
//                         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
//                             {filteredProducts.map((product) => (
//                                 <div
//                                     key={product.id}
//                                     className='group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden'
//                                 >
//                                     {/* Image Container */}
//                                     <div className='relative h-56 bg-gray-50 flex items-center justify-center p-4 group-hover:bg-orange-50/50 transition-colors duration-300'>
//                                         <img
//                                             src={product.image || '/images/default-product.jpg'}
//                                             alt={product.name}
//                                             className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300'
//                                             onError={(e) => {
//                                                 e.target.src = '/images/default-product.jpg'
//                                             }}
//                                         />

//                                         {/* Category Badge */}
//                                         <div className='absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
//                                             {getCategoryName(product.category_id)}
//                                         </div>

//                                         {/* Hover overlay with action buttons */}
//                                         <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
//                                             <div className='flex gap-2'>
//                                                 <button className='bg-white shadow-lg rounded-full p-3 hover:bg-orange-500 hover:text-white transition-all duration-200'>
//                                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
//                                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
//                                                     </svg>
//                                                 </button>
//                                                 <button className='bg-white shadow-lg rounded-full p-3 hover:bg-orange-500 hover:text-white transition-all duration-200'>
//                                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Content */}
//                                     <div className='p-4'>
//                                         <h3 className='text-gray-900 font-medium mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200'>
//                                             {product.name}
//                                         </h3>

//                                         {/* Specifications */}
//                                         {product.specifications && (
//                                             <div className='mb-3 text-sm text-gray-600'>
//                                                 <div>Ko'tarish quvvati: {product.specifications.lifting_capacity}</div>
//                                                 {product.specifications.fuel_type && (
//                                                     <div>Yoqilg'i turi: {product.specifications.fuel_type}</div>
//                                                 )}
//                                             </div>
//                                         )}

//                                         <div className='flex items-center justify-between'>
//                                             <span className='text-2xl font-bold text-orange-500'>
//                                                 {formatPrice(product.price)}
//                                             </span>

//                                             <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105'>
//                                                 Sotib olish
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className='text-center py-16'>
//                             <div className='text-gray-400 text-6xl mb-4'>🔍</div>
//                             <h3 className='text-xl font-semibold text-gray-700 mb-2'>
//                                 Mahsulot topilmadi
//                             </h3>
//                             <p className='text-gray-500 mb-6'>
//                                 Qidiruv parametrlaringizni o'zgartirib ko'ring
//                             </p>
//                             <button
//                                 onClick={() => { setSelectedCategory('all'); setSearchTerm('') }}
//                                 className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200'
//                             >
//                                 Barchasini ko'rsatish
//                             </button>
//                         </div>
//                     )}

//                     {/* Load More Button */}
//                     {filteredProducts.length >= 8 && (
//                         <div className='text-center mt-12'>
//                             <button className='bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 font-semibold px-12 py-4 rounded-xl transition-all duration-300 border border-gray-200 hover:border-orange-500'>
//                                 Ko'proq yuklash
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </main>

//             {/* Footer */}
//             <footer className='bg-gray-900 text-white py-12'>
//                 <div className='max-w-7xl mx-auto px-6'>
//                     <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
//                         <div>
//                             <h3 className='text-xl font-bold mb-4 text-orange-500'>JAC Forklift</h3>
//                             <p className='text-gray-400'>
//                                 Professional forklift va yuk ko'tarish mashinalari
//                             </p>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold mb-4'>Kategoriyalar</h4>
//                             <ul className='space-y-2 text-gray-400'>
//                                 {categories.slice(0, 3).map(category => (
//                                     <li key={category.id}>
//                                         <Link href={`/products?category=${category.id}`} className='hover:text-orange-500'>
//                                             {category.name}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold mb-4'>Xizmatlar</h4>
//                             <ul className='space-y-2 text-gray-400'>
//                                 <li><a href="#" className='hover:text-orange-500'>Sotish</a></li>
//                                 <li><a href="#" className='hover:text-orange-500'>Servis</a></li>
//                                 <li><a href="#" className='hover:text-orange-500'>Ehtiyot qismlar</a></li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold mb-4'>Aloqa</h4>
//                             <ul className='space-y-2 text-gray-400'>
//                                 <li>+998 90 123 45 67</li>
//                                 <li>info@jacforklift.uz</li>
//                                 <li>Toshkent, O'zbekiston</li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
//                         <p>&copy; 2025 JAC Forklift. Barcha huquqlar himoyalangan.</p>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default Products