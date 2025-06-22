"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n'

const CategoryDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const { t } = useTranslation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categoryInfo, setCategoryInfo] = useState(null)
    const [currentLang, setCurrentLang] = useState(i18n.language)

    // Kategoriya ma'lumotlari - Categories komponentidagi ma'lumotlar bilan mos kelishi kerak
    const categories = {
        1: { name: "Dizelli transportlar", key: "diesel" },
        2: { name: "Elektri transportlar", key: "Electric" },
        3: { name: "Benzinli transportlar", key: "Petrol" },
        4: { name: "LPG transportlari", key: "lpg" },
        5: { name: "Elektr pallet yuk mashinasi", key: "electric pallet" },
        6: { name: "Elektr stacker mashinaslari", key: "PALLET STACKER" },
        7: { name: "Reach truck forklift", key: "REACH TRUCK" },
        8: { name: "Handle pallet forklift", key: "Handle Pallets" },
        9: { name: "Texnika extiyot qismlarin", key: "spare" },
        101: { name: "Dizelli transportlar", key: "diesel" },
        102: { name: "Elektri transportlar", key: "Electric" },
        103: { name: "Benzinli transportlar", key: "Petrol" },
        104: { name: "LPG transportlari", key: "lpg" },
        105: { name: "Elektr pallet yuk mashinasi", key: "electric pallet" },
        106: { name: "Elektr stacker mashinaslari", key: "PALLET STACKER" },
        107: { name: "Reach truck forklift", key: "REACH TRUCK" },
        108: { name: "Handle pallet forklift", key: "Handle Pallets" },
        109: { name: "Texnika extiyot qismlarin", key: "spare" }
    }

    // Til o'zgarishini kuzatish
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setCurrentLang(lng)
            // Til o'zgarganda mahsulotlarni qayta yuklash
            if (categoryInfo) {
                fetchCategoryProducts(categoryInfo.key)
            }
        }

        i18n.on('languageChanged', handleLanguageChange)

        return () => {
            i18n.off('languageChanged', handleLanguageChange)
        }
    }, [categoryInfo])

    useEffect(() => {
        const categoryId = params.id
        const category = categories[categoryId]

        if (!category) {
            // Agar kategoriya topilmasa, localStorage dan olishga harakat qilish
            if (typeof window !== 'undefined') {
                const savedCategory = localStorage.getItem('selectedCategory')
                if (savedCategory) {
                    const parsedCategory = JSON.parse(savedCategory)
                    setCategoryInfo(parsedCategory)
                    fetchCategoryProducts(parsedCategory.key)
                    return
                }
            }

            setError(t('common.error'))
            setLoading(false)
            return
        }

        setCategoryInfo(category)
        fetchCategoryProducts(category.key)
    }, [params.id, t])

    const fetchCategoryProducts = async (categoryKey) => {
        try {
            setLoading(true)
            setError(null)

            console.log('Mahsulotlar yuklanmoqda, kategoriya:', categoryKey, 'til:', currentLang)

            // API so'roviga til parametrini qo'shish
            let response = await fetch('https://api.jacforklift.uz/api/api/products/category/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category_name: categoryKey,
                    lang: currentLang // Til parametrini qo'shish
                })
            })

            let data = null
            let allProducts = []

            if (response.ok) {
                data = await response.json()
                console.log('POST API javob:', data)

                // API dan kelgan ma'lumotlarni to'g'ri formatda olish
                if (data.forklifts && data.forklifts.results) {
                    allProducts = [...allProducts, ...data.forklifts.results]
                }

                if (data.spare_parts && data.spare_parts.results) {
                    allProducts = [...allProducts, ...data.spare_parts.results]
                }

                if (data.products && Array.isArray(data.products)) {
                    allProducts = [...allProducts, ...data.products]
                }

                if (Array.isArray(data)) {
                    allProducts = data
                }
            }

            // Agar POST so'rov muvaffaqiyatsiz bo'lsa yoki mahsulotlar kam bo'lsa, GET so'rov
            if (allProducts.length === 0) {
                console.log('POST so\'rov natijasiz, GET so\'rov sinovdan o\'tkazilmoqda...')

                try {
                    // GET so'roviga ham til parametrini qo'shish
                    response = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?category=${categoryKey}&lang=${currentLang}`)

                    if (response.ok) {
                        data = await response.json()
                        console.log('GET API javob:', data)

                        if (data.results && Array.isArray(data.results)) {
                            allProducts = data.results
                        } else if (Array.isArray(data)) {
                            allProducts = data
                        }
                    }
                } catch (getError) {
                    console.log('GET so\'rov ham ishlamadi:', getError)
                }
            }

            // Agar hali ham mahsulotlar yo'q bo'lsa, fallback mahsulotlar
            if (allProducts.length === 0) {
                console.log('Hech qanday mahsulot topilmadi, fallback ma\'lumotlardan foydalanilmoqda')
                allProducts = generateFallbackProducts(categoryKey)
            }

            console.log('Yakuniy mahsulotlar soni:', allProducts.length)
            setProducts(allProducts)

        } catch (err) {
            console.error('API xatosi:', err)
            setError(t('api_error_fallback'))

            // Xato holatida fallback mahsulotlar
            const fallbackProducts = generateFallbackProducts(categoryKey)
            setProducts(fallbackProducts)
        } finally {
            setLoading(false)
        }
    }

    const generateFallbackProducts = (categoryKey) => {
        const fallbackMap = {
            'diesel': [
                { id: 'diesel-1', name: 'JAC Dizelli Forklift 2.5T', price_usd: '18500', model_number: 'CPCD25', capacity_kg: '2500', engine_type: 'Dizel', manufacture_year: '2024' },
                { id: 'diesel-2', name: 'JAC Dizelli Forklift 3.0T', price_usd: '21000', model_number: 'CPCD30', capacity_kg: '3000', engine_type: 'Dizel', manufacture_year: '2024' },
                { id: 'diesel-3', name: 'JAC Dizelli Forklift 3.5T', price_usd: '24500', model_number: 'CPCD35', capacity_kg: '3500', engine_type: 'Dizel', manufacture_year: '2024' }
            ],
            'Electric': [
                { id: 'electric-1', name: 'JAC Elektr Forklift 1.5T', price_usd: '15000', model_number: 'CPD15', capacity_kg: '1500', engine_type: 'Elektr', manufacture_year: '2024' },
                { id: 'electric-2', name: 'JAC Elektr Forklift 2.0T', price_usd: '17500', model_number: 'CPD20', capacity_kg: '2000', engine_type: 'Elektr', manufacture_year: '2024' },
                { id: 'electric-3', name: 'JAC Elektr Forklift 2.5T', price_usd: '19500', model_number: 'CPD25E', capacity_kg: '2500', engine_type: 'Elektr', manufacture_year: '2024' }
            ],
            'Petrol': [
                { id: 'petrol-1', name: 'JAC Benzinli Forklift 2.0T', price_usd: '16500', model_number: 'CPQD20', capacity_kg: '2000', engine_type: 'Benzin', manufacture_year: '2024' },
                { id: 'petrol-2', name: 'JAC Benzinli Forklift 2.5T', price_usd: '18000', model_number: 'CPQD25', capacity_kg: '2500', engine_type: 'Benzin', manufacture_year: '2024' },
                { id: 'petrol-3', name: 'JAC Benzinli Forklift 3.0T', price_usd: '20500', model_number: 'CPQD30', capacity_kg: '3000', engine_type: 'Benzin', manufacture_year: '2024' }
            ],
            'lpg': [
                { id: 'lpg-1', name: 'JAC LPG Forklift 2.5T', price_usd: '19000', model_number: 'CPLG25', capacity_kg: '2500', engine_type: 'LPG', manufacture_year: '2024' },
                { id: 'lpg-2', name: 'JAC LPG Forklift 3.0T', price_usd: '21500', model_number: 'CPLG30', capacity_kg: '3000', engine_type: 'LPG', manufacture_year: '2024' }
            ],
            'electric pallet': [
                { id: 'pallet-1', name: 'JAC Elektr Pallet Mashinasi EPT20', price_usd: '8500', model_number: 'EPT20', capacity_kg: '2000', engine_type: 'Elektr', manufacture_year: '2024' },
                { id: 'pallet-2', name: 'JAC Elektr Pallet Mashinasi EPT25', price_usd: '9000', model_number: 'EPT25', capacity_kg: '2500', engine_type: 'Elektr', manufacture_year: '2024' }
            ],
            'PALLET STACKER': [
                { id: 'stacker-1', name: 'JAC Elektr Stacker 1.0T', price_usd: '12000', model_number: 'ES10', capacity_kg: '1000', engine_type: 'Elektr', manufacture_year: '2024' },
                { id: 'stacker-2', name: 'JAC Elektr Stacker 1.5T', price_usd: '14000', model_number: 'ES15', capacity_kg: '1500', engine_type: 'Elektr', manufacture_year: '2024' }
            ],
            'REACH TRUCK': [
                { id: 'reach-1', name: 'JAC Reach Truck 1.5T', price_usd: '22000', model_number: 'CQE15', capacity_kg: '1500', engine_type: 'Elektr', manufacture_year: '2024' },
                { id: 'reach-2', name: 'JAC Reach Truck 2.0T', price_usd: '25000', model_number: 'CQE20', capacity_kg: '2000', engine_type: 'Elektr', manufacture_year: '2024' }
            ],
            'Handle Pallets': [
                { id: 'handle-1', name: 'JAC Qo\'l Pallet Mashinasi', price_usd: '1200', model_number: 'HPT25', capacity_kg: '2500', engine_type: 'Qo\'l', manufacture_year: '2024' },
                { id: 'handle-2', name: 'JAC Qo\'l Pallet Mashinasi', price_usd: '1400', model_number: 'HPT30', capacity_kg: '3000', engine_type: 'Qo\'l', manufacture_year: '2024' }
            ],
            'spare': [
                { id: 'spare-1', name: 'JAC Forklift Ehtiyot Qismlari To\'plami', price_usd: '500', model_number: 'SP-001', manufacture_year: '2024' },
                { id: 'spare-2', name: 'JAC Elektr Motor', price_usd: '2500', model_number: 'EM-15', manufacture_year: '2024' },
                { id: 'spare-3', name: 'JAC Gidravlik Pompa', price_usd: '1800', model_number: 'HP-25', manufacture_year: '2024' }
            ]
        }

        return fallbackMap[categoryKey] || fallbackMap['diesel']
    }

    const handleBackClick = () => {
        router.push('/')
    }

    const handleProductClick = (productId) => {
        // Mahsulot ma'lumotlarini localStorage ga saqlash
        const selectedProduct = products.find(p => p.id === productId)
        if (selectedProduct && typeof window !== 'undefined') {
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct))
        }

        router.push(`/karaDetail/${productId}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">{t('common.loading')}</p>
                </div>
            </div>
        )
    }

    if (error && products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
                        <p className="font-bold">{t('common.error')}</p>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={handleBackClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        {t('common.back')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <button
                            onClick={handleBackClick}
                            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            {t(categoryInfo?.name) || categoryInfo?.name}
                        </h1>
                    </div>
                    <p className="text-gray-600 ml-14">
                        {t('products')}: {products.length}
                    </p>

                    {error && (
                        <div className="ml-14 mt-2 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                            <p className="text-sm">
                                {t('api_error_fallback')}
                            </p>
                        </div>
                    )}
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product.id || index}
                                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => handleProductClick(product.id)}
                            >
                                {/* Product Image */}
                                <div className="p-4">
                                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                                        {(product.images && product.images.length > 0) ? (
                                            <img
                                                src={product.images[0].image}
                                                alt={product.name || product.title || t('product.defaultName')}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name || product.title || t('product.defaultName')}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}

                                        {/* Fallback icon */}
                                        <div
                                            className="text-gray-300 flex items-center justify-center"
                                            style={{
                                                display: (product.images && product.images.length > 0) || product.image ? 'none' : 'flex'
                                            }}
                                        >
                                            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 200 150">
                                                <rect x="10" y="80" width="80" height="40" rx="5" fill="#FF6B35" />
                                                <rect x="90" y="70" width="30" height="50" rx="3" fill="#FF6B35" />
                                                <rect x="40" y="50" width="35" height="30" rx="3" fill="#333" opacity="0.8" />
                                                <rect x="115" y="20" width="8" height="80" fill="#666" />
                                                <rect x="125" y="25" width="6" height="70" fill="#666" />
                                                <rect x="130" y="45" width="40" height="4" fill="#666" />
                                                <rect x="130" y="55" width="40" height="4" fill="#666" />
                                                <circle cx="25" cy="125" r="12" fill="#333" />
                                                <circle cx="65" cy="125" r="12" fill="#333" />
                                                <circle cx="105" cy="125" r="8" fill="#333" />
                                                <circle cx="25" cy="125" r="8" fill="#666" />
                                                <circle cx="65" cy="125" r="8" fill="#666" />
                                                <circle cx="105" cy="125" r="5" fill="#666" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Product Title */}
                                    <h3 className="font-semibold text-gray-800 text-base mb-3 line-clamp-2 min-h-[48px]">
                                        {product.name || product.title || t('product.defaultName')}
                                    </h3>

                                    {/* Price */}
                                    <div className="mb-4">
                                        {product.price_usd && parseFloat(product.price_usd) > 0 ? (
                                            <p className="text-orange-500 font-bold text-xl">
                                                ${parseFloat(product.price_usd).toLocaleString()}
                                            </p>
                                        ) : product.price ? (
                                            <p className="text-orange-500 font-bold text-xl">
                                                ${parseFloat(product.price).toLocaleString()}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 text-lg">
                                                {t('get_quote')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="space-y-2 mb-4">
                                        {product.model_number && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">{t('model')}:</span>
                                                <span className="text-gray-700 font-medium">{product.model_number}</span>
                                            </div>
                                        )}

                                        {product.capacity_kg && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">{t('capacity')}:</span>
                                                <span className="text-gray-700 font-medium">{product.capacity_kg} kg</span>
                                            </div>
                                        )}

                                        {product.engine_type && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">{t('engine')}:</span>
                                                <span className="text-gray-700 font-medium">{product.engine_type}</span>
                                            </div>
                                        )}

                                        {product.manufacture_year && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">{t('year')}:</span>
                                                <span className="text-gray-700 font-medium">{product.manufacture_year}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Stock Status */}
                                    <div className="mb-4">
                                        <span className='inline-block px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700'>
                                            {t('available')}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation() // Karta clickini to'xtatish
                                            handleProductClick(product.id)
                                        }}
                                    >
                                        {t('more_info')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                            <svg fill="currentColor" viewBox="0 0 200 150" className="w-full h-full">
                                <rect x="10" y="80" width="80" height="40" rx="5" fill="currentColor" />
                                <rect x="90" y="70" width="30" height="50" rx="3" fill="currentColor" />
                                <rect x="40" y="50" width="35" height="30" rx="3" fill="currentColor" opacity="0.8" />
                                <circle cx="25" cy="125" r="12" fill="currentColor" />
                                <circle cx="65" cy="125" r="12" fill="currentColor" />
                                <circle cx="105" cy="125" r="8" fill="currentColor" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {t('noResults')}
                        </h3>
                        <p className="text-gray-500">
                            {t('tryOtherKeywords')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryDetailPage