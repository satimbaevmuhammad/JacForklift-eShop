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
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language) // Joriy tilni kuzatish

    // Kategoriya ma'lumotlari
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
            console.log('Til o\'zgartirildi:', lng)
            setCurrentLanguage(lng) // Joriy tilni yangilash

            // Til o'zgarganda mahsulotlarni qayta yuklash
            if (categoryInfo) {
                fetchCategoryProducts(categoryInfo.key, lng)
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
                    fetchCategoryProducts(parsedCategory.key, currentLanguage)
                    return
                }
            }

            setError(t('common.error'))
            setLoading(false)
            return
        }

        setCategoryInfo(category)
        fetchCategoryProducts(category.key, currentLanguage)
    }, [params.id, t])

    const fetchCategoryProducts = async (categoryKey, lang = null) => {
        try {
            setLoading(true)
            setError(null)

            // Joriy tilni olish
            const requestLanguage = lang || currentLanguage || i18n.language
            console.log('Mahsulotlar yuklanmoqda, kategoriya:', categoryKey, 'til:', requestLanguage)

            let allProducts = []

            // 1. Birinchi - POST so'rov products/category/ API ga
            try {
                const postResponse = await fetch('https://api.jacforklift.uz/api/api/products/category/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': requestLanguage, // Header qo'shish
                    },
                    body: JSON.stringify({
                        category_name: categoryKey,
                        lang: requestLanguage // Til parametri
                    })
                })

                if (postResponse.ok) {
                    const postData = await postResponse.json()
                    console.log('POST API javob:', postData)

                    // API dan kelgan ma'lumotlarni to'g'ri formatda olish
                    if (postData.forklifts && postData.forklifts.results) {
                        allProducts = [...allProducts, ...postData.forklifts.results]
                    }

                    if (postData.spare_parts && postData.spare_parts.results) {
                        allProducts = [...allProducts, ...postData.spare_parts.results]
                    }

                    if (postData.products && Array.isArray(postData.products)) {
                        allProducts = [...allProducts, ...postData.products]
                    }

                    if (Array.isArray(postData)) {
                        allProducts = postData
                    }
                }
            } catch (postError) {
                console.log('POST so\'rov xatosi:', postError)
            }

            // 2. Agar POST dan yetarli natija kelmasa, GET so'rov forklifts API ga
            if (allProducts.length === 0) {
                console.log('POST so\'rov natijasiz, GET so\'rov sinovdan o\'tkazilmoqda...')

                try {
                    const getResponse = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?category=${encodeURIComponent(categoryKey)}&lang=${requestLanguage}`, {
                        headers: {
                            'Accept-Language': requestLanguage,
                        }
                    })

                    if (getResponse.ok) {
                        const getData = await getResponse.json()
                        console.log('GET API javob:', getData)

                        if (getData.results && Array.isArray(getData.results)) {
                            allProducts = getData.results
                        } else if (Array.isArray(getData)) {
                            allProducts = getData
                        }
                    }
                } catch (getError) {
                    console.log('GET so\'rov xatosi:', getError)
                }
            }

            // 3. Agar hali ham mahsulotlar yo'q bo'lsa, faqat til bilan so'rov
            if (allProducts.length === 0) {
                console.log('Kategoriya bilan so\'rov natijasiz, faqat til bilan urinib ko\'rilmoqda...')

                try {
                    const langResponse = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?lang=${requestLanguage}`, {
                        headers: {
                            'Accept-Language': requestLanguage,
                        }
                    })

                    if (langResponse.ok) {
                        const langData = await langResponse.json()
                        console.log('Faqat til bilan API javob:', langData)

                        let filteredProducts = []

                        if (langData.results && Array.isArray(langData.results)) {
                            filteredProducts = langData.results
                        } else if (Array.isArray(langData)) {
                            filteredProducts = langData
                        }

                        // Kategoriya bo'yicha filter qilish
                        if (filteredProducts.length > 0) {
                            allProducts = filteredProducts.filter(product => {
                                if (!product.category) return false
                                const productCategory = product.category.toLowerCase()
                                const searchCategory = categoryKey.toLowerCase()
                                return productCategory.includes(searchCategory) || searchCategory.includes(productCategory)
                            })
                        }
                    }
                } catch (langError) {
                    console.log('Faqat til bilan so\'rov xatosi:', langError)
                }
            }

            // 4. Agar hali ham mahsulotlar yo'q bo'lsa, fallback mahsulotlar
            if (allProducts.length === 0) {
                console.log('Hech qanday mahsulot topilmadi, fallback ma\'lumotlardan foydalanilmoqda')
                allProducts = generateFallbackProducts(categoryKey, requestLanguage)
            }

            console.log('Yakuniy mahsulotlar soni:', allProducts.length)
            if (allProducts.length > 0) {
                console.log('Birinchi mahsulot:', allProducts[0])
                console.log('Til bo\'yicha nom (current lang):', getProductName(allProducts[0], requestLanguage))
            }

            setProducts(allProducts)

        } catch (err) {
            console.error('API xatosi:', err)
            setError(t('api_error_fallback'))

            // Xato holatida fallback mahsulotlar
            const fallbackProducts = generateFallbackProducts(categoryKey, lang || currentLanguage)
            setProducts(fallbackProducts)
        } finally {
            setLoading(false)
        }
    }

    const generateFallbackProducts = (categoryKey, lang = 'uz') => {
        // Til bo'yicha fallback mahsulotlar
        const fallbackMap = {
            'diesel': {
                'uz': [
                    { id: 'diesel-1', name: 'JAC Dizel Yuklagich 2.5T', name_uz: 'JAC Dizel Yuklagich 2.5T', name_ru: 'JAC Дизельный Погрузчик 2.5Т', name_en: 'JAC Diesel Forklift 2.5T', price_usd: '18500', model_number: 'CPCD25', capacity_kg: '2500', engine_type: 'Dizel', manufacture_year: '2024' },
                    { id: 'diesel-2', name: 'JAC Dizel Yuklagich 3.0T', name_uz: 'JAC Dizel Yuklagich 3.0T', name_ru: 'JAC Дизельный Погрузчик 3.0Т', name_en: 'JAC Diesel Forklift 3.0T', price_usd: '21000', model_number: 'CPCD30', capacity_kg: '3000', engine_type: 'Dizel', manufacture_year: '2024' },
                    { id: 'diesel-3', name: 'JAC Dizel Yuklagich 3.5T', name_uz: 'JAC Dizel Yuklagich 3.5T', name_ru: 'JAC Дизельный Погрузчик 3.5Т', name_en: 'JAC Diesel Forklift 3.5T', price_usd: '24500', model_number: 'CPCD35', capacity_kg: '3500', engine_type: 'Dizel', manufacture_year: '2024' }
                ],
                'ru': [
                    { id: 'diesel-1', name: 'JAC Дизельный Погрузчик 2.5Т', name_uz: 'JAC Dizel Yuklagich 2.5T', name_ru: 'JAC Дизельный Погрузчик 2.5Т', name_en: 'JAC Diesel Forklift 2.5T', price_usd: '18500', model_number: 'CPCD25', capacity_kg: '2500', engine_type: 'Дизель', manufacture_year: '2024' },
                    { id: 'diesel-2', name: 'JAC Дизельный Погрузчик 3.0Т', name_uz: 'JAC Dizel Yuklagich 3.0T', name_ru: 'JAC Дизельный Погрузчик 3.0Т', name_en: 'JAC Diesel Forklift 3.0T', price_usd: '21000', model_number: 'CPCD30', capacity_kg: '3000', engine_type: 'Дизель', manufacture_year: '2024' },
                    { id: 'diesel-3', name: 'JAC Дизельный Погрузчик 3.5Т', name_uz: 'JAC Dizel Yuklagich 3.5T', name_ru: 'JAC Дизельный Погрузчик 3.5Т', name_en: 'JAC Diesel Forklift 3.5T', price_usd: '24500', model_number: 'CPCD35', capacity_kg: '3500', engine_type: 'Дизель', manufacture_year: '2024' }
                ],
                'en': [
                    { id: 'diesel-1', name: 'JAC Diesel Forklift 2.5T', name_uz: 'JAC Dizel Yuklagich 2.5T', name_ru: 'JAC Дизельный Погрузчик 2.5Т', name_en: 'JAC Diesel Forklift 2.5T', price_usd: '18500', model_number: 'CPCD25', capacity_kg: '2500', engine_type: 'Diesel', manufacture_year: '2024' },
                    { id: 'diesel-2', name: 'JAC Diesel Forklift 3.0T', name_uz: 'JAC Dizel Yuklagich 3.0T', name_ru: 'JAC Дизельный Погрузчик 3.0Т', name_en: 'JAC Diesel Forklift 3.0T', price_usd: '21000', model_number: 'CPCD30', capacity_kg: '3000', engine_type: 'Diesel', manufacture_year: '2024' },
                    { id: 'diesel-3', name: 'JAC Diesel Forklift 3.5T', name_uz: 'JAC Dizel Yuklagich 3.5T', name_ru: 'JAC Дизельный Погрузчик 3.5Т', name_en: 'JAC Diesel Forklift 3.5T', price_usd: '24500', model_number: 'CPCD35', capacity_kg: '3500', engine_type: 'Diesel', manufacture_year: '2024' }
                ]
            },
            'Electric': {
                'uz': [
                    { id: 'electric-1', name: 'JAC Elektr Yuklagich 1.5T', name_uz: 'JAC Elektr Yuklagich 1.5T', name_ru: 'JAC Электрический Погрузчик 1.5Т', name_en: 'JAC Electric Forklift 1.5T', price_usd: '15000', model_number: 'CPD15', capacity_kg: '1500', engine_type: 'Elektr', manufacture_year: '2024' },
                    { id: 'electric-2', name: 'JAC Elektr Yuklagich 2.0T', name_uz: 'JAC Elektr Yuklagich 2.0T', name_ru: 'JAC Электрический Погрузчик 2.0Т', name_en: 'JAC Electric Forklift 2.0T', price_usd: '17500', model_number: 'CPD20', capacity_kg: '2000', engine_type: 'Elektr', manufacture_year: '2024' },
                    { id: 'electric-3', name: 'JAC Elektr Yuklagich 2.5T', name_uz: 'JAC Elektr Yuklagich 2.5T', name_ru: 'JAC Электрический Погрузчик 2.5Т', name_en: 'JAC Electric Forklift 2.5T', price_usd: '19500', model_number: 'CPD25E', capacity_kg: '2500', engine_type: 'Elektr', manufacture_year: '2024' }
                ],
                'ru': [
                    { id: 'electric-1', name: 'JAC Электрический Погрузчик 1.5Т', name_uz: 'JAC Elektr Yuklagich 1.5T', name_ru: 'JAC Электрический Погрузчик 1.5Т', name_en: 'JAC Electric Forklift 1.5T', price_usd: '15000', model_number: 'CPD15', capacity_kg: '1500', engine_type: 'Электрический', manufacture_year: '2024' },
                    { id: 'electric-2', name: 'JAC Электрический Погрузчик 2.0Т', name_uz: 'JAC Elektr Yuklagich 2.0T', name_ru: 'JAC Электрический Погрузчик 2.0Т', name_en: 'JAC Electric Forklift 2.0T', price_usd: '17500', model_number: 'CPD20', capacity_kg: '2000', engine_type: 'Электрический', manufacture_year: '2024' },
                    { id: 'electric-3', name: 'JAC Электрический Погрузчик 2.5Т', name_uz: 'JAC Elektr Yuklagich 2.5T', name_ru: 'JAC Электрический Погрузчик 2.5Т', name_en: 'JAC Electric Forklift 2.5T', price_usd: '19500', model_number: 'CPD25E', capacity_kg: '2500', engine_type: 'Электрический', manufacture_year: '2024' }
                ],
                'en': [
                    { id: 'electric-1', name: 'JAC Electric Forklift 1.5T', name_uz: 'JAC Elektr Yuklagich 1.5T', name_ru: 'JAC Электрический Погрузчик 1.5Т', name_en: 'JAC Electric Forklift 1.5T', price_usd: '15000', model_number: 'CPD15', capacity_kg: '1500', engine_type: 'Electric', manufacture_year: '2024' },
                    { id: 'electric-2', name: 'JAC Electric Forklift 2.0T', name_uz: 'JAC Elektr Yuklagich 2.0T', name_ru: 'JAC Электрический Погрузчик 2.0Т', name_en: 'JAC Electric Forklift 2.0T', price_usd: '17500', model_number: 'CPD20', capacity_kg: '2000', engine_type: 'Electric', manufacture_year: '2024' },
                    { id: 'electric-3', name: 'JAC Electric Forklift 2.5T', name_uz: 'JAC Elektr Yuklagich 2.5T', name_ru: 'JAC Электрический Погрузчик 2.5Т', name_en: 'JAC Electric Forklift 2.5T', price_usd: '19500', model_number: 'CPD25E', capacity_kg: '2500', engine_type: 'Electric', manufacture_year: '2024' }
                ]
            },
            'Petrol': {
                'uz': [
                    { id: 'petrol-1', name: 'JAC Benzinli Yuklagich 2.0T', name_uz: 'JAC Benzinli Yuklagich 2.0T', name_ru: 'JAC Бензиновый Погрузчик 2.0Т', name_en: 'JAC Petrol Forklift 2.0T', price_usd: '16500', model_number: 'CPQD20', capacity_kg: '2000', engine_type: 'Benzin', manufacture_year: '2024' },
                    { id: 'petrol-2', name: 'JAC Benzinli Yuklagich 2.5T', name_uz: 'JAC Benzinli Yuklagich 2.5T', name_ru: 'JAC Бензиновый Погрузчик 2.5Т', name_en: 'JAC Petrol Forklift 2.5T', price_usd: '18000', model_number: 'CPQD25', capacity_kg: '2500', engine_type: 'Benzin', manufacture_year: '2024' },
                    { id: 'petrol-3', name: 'JAC Benzinli Yuklagich 3.0T', name_uz: 'JAC Benzinli Yuklagich 3.0T', name_ru: 'JAC Бензиновый Погрузчик 3.0Т', name_en: 'JAC Petrol Forklift 3.0T', price_usd: '20500', model_number: 'CPQD30', capacity_kg: '3000', engine_type: 'Benzin', manufacture_year: '2024' }
                ],
                'ru': [
                    { id: 'petrol-1', name: 'JAC Бензиновый Погрузчик 2.0Т', name_uz: 'JAC Benzinli Yuklagich 2.0T', name_ru: 'JAC Бензиновый Погрузчик 2.0Т', name_en: 'JAC Petrol Forklift 2.0T', price_usd: '16500', model_number: 'CPQD20', capacity_kg: '2000', engine_type: 'Бензин', manufacture_year: '2024' },
                    { id: 'petrol-2', name: 'JAC Бензиновый Погрузчик 2.5Т', name_uz: 'JAC Benzinli Yuklagich 2.5T', name_ru: 'JAC Бензиновый Погрузчик 2.5Т', name_en: 'JAC Petrol Forklift 2.5T', price_usd: '18000', model_number: 'CPQD25', capacity_kg: '2500', engine_type: 'Бензин', manufacture_year: '2024' },
                    { id: 'petrol-3', name: 'JAC Бензиновый Погрузчик 3.0Т', name_uz: 'JAC Benzinli Yuklagich 3.0T', name_ru: 'JAC Бензиновый Погрузчик 3.0Т', name_en: 'JAC Petrol Forklift 3.0T', price_usd: '20500', model_number: 'CPQD30', capacity_kg: '3000', engine_type: 'Бензин', manufacture_year: '2024' }
                ],
                'en': [
                    { id: 'petrol-1', name: 'JAC Petrol Forklift 2.0T', name_uz: 'JAC Benzinli Yuklagich 2.0T', name_ru: 'JAC Бензиновый Погрузчик 2.0Т', name_en: 'JAC Petrol Forklift 2.0T', price_usd: '16500', model_number: 'CPQD20', capacity_kg: '2000', engine_type: 'Petrol', manufacture_year: '2024' },
                    { id: 'petrol-2', name: 'JAC Petrol Forklift 2.5T', name_uz: 'JAC Benzinli Yuklagich 2.5T', name_ru: 'JAC Бензиновый Погрузчик 2.5Т', name_en: 'JAC Petrol Forklift 2.5T', price_usd: '18000', model_number: 'CPQD25', capacity_kg: '2500', engine_type: 'Petrol', manufacture_year: '2024' },
                    { id: 'petrol-3', name: 'JAC Petrol Forklift 3.0T', name_uz: 'JAC Benzinli Yuklagich 3.0T', name_ru: 'JAC Бензиновый Погрузчик 3.0Т', name_en: 'JAC Petrol Forklift 3.0T', price_usd: '20500', model_number: 'CPQD30', capacity_kg: '3000', engine_type: 'Petrol', manufacture_year: '2024' }
                ]
            }
        }

        const categoryProducts = fallbackMap[categoryKey]
        if (categoryProducts && categoryProducts[lang]) {
            return categoryProducts[lang]
        }

        // Agar til topilmasa, o'zbek tilini qaytarish
        return fallbackMap[categoryKey]?.['uz'] || fallbackMap['diesel']['uz']
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

    // Mahsulot nomini ko'rsatish funksiyasi - YANGILANGAN
    const getProductName = (product, lang = null) => {
        // Joriy tilni olish
        const targetLang = lang || currentLanguage || i18n.language

        console.log('Product name olish:', {
            product: product?.name,
            targetLang,
            name_uz: product?.name_uz,
            name_ru: product?.name_ru,
            name_en: product?.name_en
        })

        // Birinchi - til bo'yicha nomlarni tekshirish
        switch (targetLang) {
            case 'uz':
                if (product.name_uz) return product.name_uz
                break
            case 'ru':
                if (product.name_ru) return product.name_ru
                break
            case 'en':
                if (product.name_en) return product.name_en
                break
        }

        // Yoki translations obyektida bo'lsa
        if (product.translations) {
            const translation = product.translations[targetLang]
            if (translation && translation.name) {
                return translation.name
            }
        }

        // Fallback - asosiy name yoki title
        return product.name || product.title || t('product.defaultName')
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
                                                alt={getProductName(product)}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : product.image ? (
                                            <img
                                                src={product.image}
                                                alt={getProductName(product)}
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

                                    {/* Product Title - YANGILANGAN til boshqaruvi bilan */}
                                    <h3 className="font-semibold text-gray-800 text-base mb-3 line-clamp-2 min-h-[48px]">
                                        {getProductName(product, currentLanguage)}
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