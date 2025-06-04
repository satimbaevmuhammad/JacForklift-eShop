"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const ProductDetail = () => {
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const router = useRouter()
    const params = useParams()
    const productId = params.id

    useEffect(() => {
        if (productId) {
            fetchProductDetails()
        }
    }, [productId])

    const fetchProductDetails = async () => {
        try {
            // Product ma'lumotlarini olish
            const productResponse = await fetch(`http://localhost:5000/products/${productId}`)
            if (!productResponse.ok) {
                throw new Error('Mahsulot ma\'lumotlarini yuklashda xatolik')
            }
            const productData = await productResponse.json()
            setProduct(productData)

            // O'xshash mahsulotlarni olish
            if (productData.category_id) {
                const relatedResponse = await fetch(`http://localhost:5000/products?categoryId=${productData.category_id}&limit=4`)
                if (relatedResponse.ok) {
                    const relatedData = await relatedResponse.json()
                    // Joriy mahsulotni olib tashlash
                    const filteredRelated = relatedData.filter(p => p.id !== parseInt(productId))
                    setRelatedProducts(filteredRelated.slice(0, 3))
                }
            }

            setLoading(false)
        } catch (error) {
            console.error('Ma\'lumotlarni yuklashda xato:', error)
            setError(error.message)
            setLoading(false)
        }
    }

    const handleBackToProducts = () => {
        try {
            router.back()
        } catch (error) {
            router.push('/categories')
        }
    }

    const handleRelatedProductClick = (relatedProductId) => {
        router.push(`/product/${relatedProductId}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-orange-500"></div>
                    <p className="text-gray-600 text-sm sm:text-base text-center">Mahsulot yuklanmoqda...</p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                    <p className="text-red-600 mb-4 text-sm sm:text-base">{error || 'Mahsulot topilmadi'}</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base w-full"
                        >
                            Qayta urinish
                        </button>
                        <button
                            onClick={handleBackToProducts}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm sm:text-base w-full"
                        >
                            Orqaga
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Mock multiple images (aslida API dan kelishi kerak)
    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image
    ].filter(Boolean)

    return (
        <div className="min-h-screen bg-gray-50 md:bg-[url('/bgimg.png')] md:bg-cover py-4 md:py-6 lg:py-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with Back Button */}
                <div className="mb-6 md:mb-8">
                    <button
                        onClick={handleBackToProducts}
                        className="flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200 mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Orqaga
                    </button>
                </div>

                {/* Product Detail Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Images Section */}
                        <div className="p-6">
                            {/* Main Image */}
                            <div className="mb-4">
                                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                                    {productImages[selectedImage] ? (
                                        <img
                                            src={productImages[selectedImage]}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 flex items-center justify-center text-gray-400">
                                            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 200 150">
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
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {productImages.slice(0, 4).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                                                    ? 'border-orange-500'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info Section */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
                                        {product.name}
                                    </h1>
                                    {product.model && (
                                        <p className="text-lg text-gray-600 mb-2">
                                            Model: <span className="font-semibold">{product.model}</span>
                                        </p>
                                    )}
                                </div>
                                <img
                                    src="/jac.png"
                                    alt="JAC"
                                    className="w-12 h-6 object-contain opacity-70"
                                />
                            </div>

                            {/* Price */}
                            {product.price && (
                                <div className="mb-6">
                                    <span className="text-3xl md:text-4xl font-bold text-orange-600">
                                        ${product.price.toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-black mb-2">Tavsif</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-black mb-3">Texnik xususiyatlari</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-600 capitalize">
                                                    {key.replace(/_/g, ' ')}
                                                </div>
                                                <div className="font-semibold text-black">
                                                    {value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold text-lg">
                                    Buyurtma berish
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold">
                                    Ma'lumot so'rash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-black mb-6">O'xshash mahsulotlar</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    onClick={() => handleRelatedProductClick(relatedProduct.id)}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1 hover:scale-105 group"
                                >
                                    <div className="p-4">
                                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                                            {relatedProduct.image ? (
                                                <img
                                                    src={relatedProduct.image}
                                                    alt={relatedProduct.name}
                                                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 flex items-center justify-center text-gray-400">
                                                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 200 150">
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
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-black leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 mb-2">
                                            {relatedProduct.name}
                                        </h3>

                                        {relatedProduct.price && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-orange-600">
                                                    ${relatedProduct.price.toLocaleString()}
                                                </span>
                                                <img
                                                    src="/jac.png"
                                                    alt="JAC"
                                                    className="w-8 h-4 object-contain opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetail