"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18n from '../../lib/i18n'

const ProductDetail = () => {
    const { t } = useTranslation()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [currentLang, setCurrentLang] = useState(i18n.language)
    const router = useRouter()
    const params = useParams()
    const productId = params.id

    // Listen to language changes
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setCurrentLang(lng)
        }

        i18n.on('languageChanged', handleLanguageChange)

        return () => {
            i18n.off('languageChanged', handleLanguageChange)
        }
    }, [])

    useEffect(() => {
        if (productId) {
            fetchProductDetails()
        }
    }, [productId, currentLang]) // Refetch when language changes

    const fetchProductDetails = async () => {
        try {
            setLoading(true)

            // Single product details with language parameter
            const productResponse = await fetch(`https://api.jacforklift.uz/api/api/forklifts/${productId}/?lang=${currentLang}`)

            if (!productResponse.ok) {
                throw new Error(t('product.errors.loadFailed') || 'Mahsulotni yuklashda xatolik')
            }

            const productData = await productResponse.json()

            // Format API data to product format
            const formattedProduct = {
                id: productData.id,
                name: productData.name || productData.title || t('product.defaultName') || 'Forklift',
                model: productData.model || productData.model_name || productData.model_number || null,
                price: productData.price_usd || productData.price || productData.cost || null,
                description: productData.description || productData.desc || null,
                image: productData.image || productData.photo || null,
                images: productData.images || productData.photos || [],
                category_id: productData.category_id || productData.category || productData.forklift_type || null,
                specifications: productData.specifications || productData.specs || {
                    capacity_kg: productData.capacity_kg,
                    lift_height: productData.lift_height,
                    fuel_type: productData.fuel_type || productData.forklift_type,
                    engine_power: productData.engine_power,
                    weight: productData.weight,
                    length: productData.length,
                    width: productData.width,
                    height: productData.height
                },
                features: productData.features || [],
                capacity_kg: productData.capacity_kg,
                forklift_type: productData.forklift_type
            }

            setProduct(formattedProduct)

            // Fetch related products with language parameter
            if (formattedProduct.category_id || formattedProduct.forklift_type) {
                try {
                    let relatedUrl = `https://api.jacforklift.uz/api/api/forklifts/?lang=${currentLang}&page_size=4`

                    // Add category or type filter
                    if (formattedProduct.category_id) {
                        relatedUrl += `&category=${formattedProduct.category_id}`
                    } else if (formattedProduct.forklift_type) {
                        relatedUrl += `&forklift_type=${formattedProduct.forklift_type}`
                    }

                    const relatedResponse = await fetch(relatedUrl)

                    if (relatedResponse.ok) {
                        const relatedData = await relatedResponse.json()

                        // Handle API response format
                        let relatedItems = []
                        if (relatedData.results && Array.isArray(relatedData.results)) {
                            relatedItems = relatedData.results
                        } else if (Array.isArray(relatedData)) {
                            relatedItems = relatedData
                        }

                        // Filter out current product and format
                        const formattedRelated = relatedItems
                            .filter(p => p.id !== parseInt(productId))
                            .slice(0, 3)
                            .map(item => ({
                                id: item.id,
                                name: item.name || item.title || t('product.defaultName') || 'Forklift',
                                price: item.price_usd || item.price || item.cost || null,
                                image: item.images && item.images.length > 0 ? item.images[0].image : (item.image || item.photo || null)
                            }))

                        setRelatedProducts(formattedRelated)
                    } else {
                        // Fallback: get all products with language parameter
                        const allProductsResponse = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?lang=${currentLang}&page_size=4`)
                        if (allProductsResponse.ok) {
                            const allProductsData = await allProductsResponse.json()

                            let allItems = []
                            if (allProductsData.results && Array.isArray(allProductsData.results)) {
                                allItems = allProductsData.results
                            } else if (Array.isArray(allProductsData)) {
                                allItems = allProductsData
                            }

                            const formattedRelated = allItems
                                .filter(p => p.id !== parseInt(productId))
                                .slice(0, 3)
                                .map(item => ({
                                    id: item.id,
                                    name: item.name || item.title || t('product.defaultName') || 'Forklift',
                                    price: item.price_usd || item.price || item.cost || null,
                                    image: item.images && item.images.length > 0 ? item.images[0].image : (item.image || item.photo || null)
                                }))
                            setRelatedProducts(formattedRelated)
                        }
                    }
                } catch (relatedError) {
                    console.error('O\'xshash mahsulotlarni yuklashda xato:', relatedError)
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
        router.push(`/karaDetail/${relatedProductId}`)
    }

    const formatPrice = (price) => {
        if (!price) return null
        const numPrice = parseFloat(price)
        return isNaN(numPrice) ? null : numPrice
    }

    const getProductImage = (imageData) => {
        if (typeof imageData === 'string') return imageData
        if (imageData && imageData.image) return imageData.image
        return null
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-gray-300 border-t-orange-500"></div>
                    <p className="text-gray-600 text-sm sm:text-base text-center">
                        {t('product.loading') || 'Mahsulot yuklanmoqda...'}
                    </p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                    <p className="text-red-600 mb-4 text-sm sm:text-base">
                        {error || t('product.errors.notFound') || 'Mahsulot topilmadi'}
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base w-full"
                        >
                            {t('common.retry') || 'Qayta urinish'}
                        </button>
                        <button
                            onClick={handleBackToProducts}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm sm:text-base w-full"
                        >
                            {t('common.back') || 'Orqaga'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Prepare product images
    const productImages = []
    if (product.image) productImages.push(product.image)
    if (product.images && product.images.length > 0) {
        product.images.forEach(img => {
            const imageUrl = getProductImage(img)
            if (imageUrl && !productImages.includes(imageUrl)) {
                productImages.push(imageUrl)
            }
        })
    }

    // Add mock images if no images available
    if (productImages.length === 0) {
        productImages.push(null, null, null, null)
    }

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
                        {t('common.back') || 'Orqaga'}
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
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.nextElementSibling.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}

                                    {/* Fallback icon */}
                                    <div
                                        className="w-32 h-32 flex items-center justify-center text-gray-400"
                                        style={{ display: productImages[selectedImage] ? 'none' : 'flex' }}
                                    >
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
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {productImages.slice(0, 4).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors flex items-center justify-center ${selectedImage === index
                                                ? 'border-orange-500'
                                                : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                        >
                                            {image ? (
                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 text-gray-300">
                                                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 200 150">
                                                        <rect x="10" y="80" width="80" height="40" rx="5" fill="currentColor" />
                                                        <rect x="90" y="70" width="30" height="50" rx="3" fill="currentColor" />
                                                        <circle cx="25" cy="125" r="12" fill="currentColor" />
                                                        <circle cx="65" cy="125" r="12" fill="currentColor" />
                                                    </svg>
                                                </div>
                                            )}
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
                                            {t('product.model') || 'Model'}: <span className="font-semibold">{product.model}</span>
                                        </p>
                                    )}
                                </div>
                                <img
                                    src="/jac.png"
                                    alt="JAC"
                                    className="w-12 h-6 object-contain opacity-70"
                                />
                            </div>

                            {/* Capacity Badge */}
                            {product.capacity_kg && (
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                        {t('product.specs.capacity_kg') || 'Yuk ko\'tarish qobiliyati'}: {(product.capacity_kg / 1000).toFixed(1)} {t('ton') || 'ton'}
                                    </span>
                                </div>
                            )}

                            {/* Price */}
                            {formatPrice(product.price) && (
                                <div className="mb-6">
                                    <span className="text-3xl md:text-4xl font-bold text-orange-600">
                                        ${formatPrice(product.price).toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-black mb-2">
                                        {t('product.description') || 'Tavsif'}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-black mb-3">
                                        {t('product.specifications') || 'Texnik xususiyatlar'}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {Object.entries(product.specifications).map(([key, value]) => {
                                            if (!value) return null
                                            return (
                                                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-sm text-gray-600 capitalize">
                                                        {t(`product.specs.${key}`) !== `product.specs.${key}`
                                                            ? t(`product.specs.${key}`)
                                                            : key.replace(/_/g, ' ')
                                                        }
                                                    </div>
                                                    <div className="font-semibold text-black">
                                                        {typeof value === 'number' ? value.toLocaleString() : value}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-black mb-3">
                                        {t('product.features') || 'Xususiyatlar'}
                                    </h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold text-lg">
                                    {t('product.actions.placeOrder') || 'Buyurtma berish'}
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold">
                                    {t('product.actions.requestInfo') || 'Ma\'lumot so\'rash'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-black mb-6">
                            {t('product.relatedProducts') || 'O\'xshash mahsulotlar'}
                        </h2>
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
                                                    onError={(e) => {
                                                        e.target.style.display = 'none'
                                                        e.target.nextElementSibling.style.display = 'flex'
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback icon */}
                                            <div
                                                className="w-16 h-16 flex items-center justify-center text-gray-400"
                                                style={{ display: relatedProduct.image ? 'none' : 'flex' }}
                                            >
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
                                        </div>

                                        <h3 className="text-lg font-semibold text-black leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 mb-2">
                                            {relatedProduct.name}
                                        </h3>

                                        {formatPrice(relatedProduct.price) && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-bold text-orange-600">
                                                    ${formatPrice(relatedProduct.price).toLocaleString()}
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