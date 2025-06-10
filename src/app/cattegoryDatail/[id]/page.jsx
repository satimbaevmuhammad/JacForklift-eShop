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

    const handleProductClick = (productId) => {
        router.push(`/karaDetail/${productId}`)
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
                        Orqaga qaytish.
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
                            {categoryInfo?.name}
                        </h1>
                    </div>
                    <p className="text-gray-600 ml-14">
                        Jami {products.length} ta mahsulot
                    </p>
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
                                                alt={product.name || product.title || 'Mahsulot'}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}
                                        
                                        {/* Fallback icon */}
                                        <div
                                            className="text-gray-300"
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

                                    {/* Product Title */}
                                    <h3 className="font-semibold text-gray-800 text-base mb-3 line-clamp-2 min-h-[48px]">
                                        {product.name || product.title || 'Mahsulot nomi'}
                                    </h3>
                                    
                                    {/* Price */}
                                    <div className="mb-4">
                                        {product.price_usd && parseFloat(product.price_usd) > 0 ? (
                                            <p className="text-orange-500 font-bold text-xl">
                                                ${parseFloat(product.price_usd).toLocaleString()}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 text-lg">
                                                Narx so'ralsin
                                            </p>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="space-y-2 mb-4">
                                        {product.model_number && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Model:</span>
                                                <span className="text-gray-700 font-medium">{product.model_number}</span>
                                            </div>
                                        )}

                                        {product.capacity_kg && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Yuk ko'tarish:</span>
                                                <span className="text-gray-700 font-medium">{product.capacity_kg} kg</span>
                                            </div>
                                        )}

                                        {product.engine_type && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Dvigatel:</span>
                                                <span className="text-gray-700 font-medium">{product.engine_type}</span>
                                            </div>
                                        )}

                                        {product.manufacture_year && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Yil:</span>
                                                <span className="text-gray-700 font-medium">{product.manufacture_year}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Stock Status */}
                                    <div className="mb-4">
                                        <span className='inline-block px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700'>
                                            Mavjud
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
                                        Batafsil ma'lumot
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