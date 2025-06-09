"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const CategoryDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categoryInfo, setCategoryInfo] = useState(null)

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
        9: { name: "Texnika extiyot qismlarin", key: "spare" }
    }

    useEffect(() => {
        const categoryId = params.id
        const category = categories[categoryId]
        
        if (!category) {
            setError("Kategoriya topilmadi")
            setLoading(false)
            return
        }

        setCategoryInfo(category)
        fetchCategoryProducts(category.key)
    }, [params.id])

    const fetchCategoryProducts = async (categoryKey) => {
        try {
            setLoading(true)
            const response = await fetch('https://api.jacforklift.uz/api/api/products/category/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category_name: categoryKey
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            
            // API dan kelgan ma'lumotlarni to'g'ri formatda olish
            let allProducts = []
            
            // Forklifts va spare_parts ni birlashtirish
            if (data.forklifts && data.forklifts.results) {
                allProducts = [...allProducts, ...data.forklifts.results]
            }
            
            if (data.spare_parts && data.spare_parts.results) {
                allProducts = [...allProducts, ...data.spare_parts.results]
            }
            
            // Agar boshqa formatda kelsa
            if (data.products && Array.isArray(data.products)) {
                allProducts = [...allProducts, ...data.products]
            }
            
            // Agar to'g'ridan-to'g'ri array bo'lsa
            if (Array.isArray(data)) {
                allProducts = data
            }
            
            console.log('Olingan mahsulotlar:', allProducts) // Debug uchun
            setProducts(allProducts)
            
        } catch (err) {
            console.error('API xatosi:', err)
            setError('Mahsulotlarni yuklashda xatolik yuz berdi')
        } finally {
            setLoading(false)
        }
    }

    const handleBackClick = () => {
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Mahsulotlar yuklanmoqda...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
                        <p className="font-bold">Xatolik yuz berdi!</p>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={handleBackClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Orqaga qaytish
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 md:bg-[url('/bgimg.png')] md:bg-cover py-4 md:py-6 lg:py-12 px-4 md:px-3 lg:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8 lg:mb-12">
                    <div className="flex items-center mb-4">
                        <button
                            onClick={handleBackClick}
                            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black">
                            {categoryInfo?.name}
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg md:text-xl ml-14">
                        Jami {products.length} ta mahsulot
                    </p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {products.map((product, index) => (
                            <div
                                key={product.id || index}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1 hover:scale-105 group"
                            >
                                {/* Product Image */}
                                <div className="p-4 pb-2">
                                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                                        {(product.images && product.images.length > 0) ? (
                                            <img
                                                src={product.images[0].image}
                                                alt={product.name || product.title || 'Mahsulot'}
                                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}
                                        
                                        {/* Fallback icon */}
                                        <div
                                            className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300"
                                            style={{ display: (product.images && product.images.length > 0) ? 'none' : 'flex' }}
                                        >
                                            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 200 150">
                                                <rect x="10" y="80" width="80" height="40" rx="5" fill="currentColor" />
                                                <rect x="90" y="70" width="30" height="50" rx="3" fill="currentColor" />
                                                <rect x="40" y="50" width="35" height="30" rx="3" fill="currentColor" opacity="0.8" />
                                                <circle cx="25" cy="125" r="12" fill="currentColor" />
                                                <circle cx="65" cy="125" r="12" fill="currentColor" />
                                                <circle cx="105" cy="125" r="8" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4 pt-2">
                                    <h3 className="font-bold text-lg text-black group-hover:text-orange-600 transition-colors duration-300 mb-2 line-clamp-2">
                                        {product.name || product.title || 'Mahsulot nomi'}
                                    </h3>
                                    
                                    {/* Model raqami */}
                                    {product.model_number && (
                                        <p className="text-gray-500 text-sm mb-2">
                                            Model: {product.model_number}
                                        </p>
                                    )}
                                    
                                    {/* Yuk ko'tarish qobiliyati */}
                                    {product.capacity_kg && (
                                        <p className="text-blue-600 font-semibold text-sm mb-2">
                                            Yuk ko'tarish: {product.capacity_kg} kg
                                        </p>
                                    )}
                                    
                                    {/* Narx */}
                                    {product.price_usd && parseFloat(product.price_usd) > 0 && (
                                        <p className="text-orange-600 font-bold text-xl mb-2">
                                            ${parseFloat(product.price_usd).toLocaleString()}
                                        </p>
                                    )}
                                    
                                    {/* Tavsif */}
                                    {product.description && (
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Qo'shimcha ma'lumotlar */}
                                    <div className="text-xs text-gray-500 space-y-1 mb-3">
                                        {product.engine_type && (
                                            <div className="flex justify-between">
                                                <span>Dvigatel:</span>
                                                <span>{product.engine_type}</span>
                                            </div>
                                        )}
                                        {product.manufacture_year && (
                                            <div className="flex justify-between">
                                                <span>Yil:</span>
                                                <span>{product.manufacture_year}</span>
                                            </div>
                                        )}
                                        {product.forklift_type && (
                                            <div className="flex justify-between">
                                                <span>Turi:</span>
                                                <span className="capitalize">{product.forklift_type}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Omborda mavjudligi */}
                                    <div className="mb-3">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                            product.in_stock > 0 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.in_stock > 0 ? 'Omborda bor' : 'Tugagan'}
                                        </span>
                                    </div>

                                    {/* Action button */}
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium">
                                            Batafsil ko'rish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
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
                            Bu kategoriyada mahsulotlar topilmadi
                        </h3>
                        <p className="text-gray-500">
                            Tez orada yangi mahsulotlar qo'shiladi
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryDetailPage