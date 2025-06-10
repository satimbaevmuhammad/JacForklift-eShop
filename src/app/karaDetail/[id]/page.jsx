"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ShoppingCart, Heart, Share2, Star, X } from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const ProductDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [error, setError] = useState(null)
    const [imageError, setImageError] = useState({})

    // Modal states
    const [showModal, setShowModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState('')

    useEffect(() => {
        if (params.id) {
            fetchProductDetail()
            fetchRelatedProducts()
        }
    }, [params.id])

    const fetchProductDetail = async () => {
        try {
            setLoading(true)
            setError(null)

            console.log('Fetching product with ID:', params.id)

            const response = await fetch(`https://api.jacforklift.uz/api/api/forklifts/${params.id}/`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            console.log('Response status:', response.status)

            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Mahsulot topilmadi (404)')
                    setError('Mahsulot topilmadi')
                    setProduct(null)
                    setLoading(false)
                    return
                }
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const contentType = response.headers.get("content-type")
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Response is not JSON")
            }

            const productData = await response.json()
            console.log('Product data received:', productData)
            setProduct(productData)
            setLoading(false)
        } catch (error) {
            console.error('Mahsulot ma\'lumotlarini yuklashda xato:', error)
            setError('Mahsulot ma\'lumotlarini yuklashda xato yuz berdi')
            setProduct(null)
            setLoading(false)
        }
    }

    const fetchRelatedProducts = async () => {
        try {
            const response = await fetch('https://api.jacforklift.uz/api/api/forklifts/', {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const contentType = response.headers.get("content-type")
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Response is not JSON")
            }

            const data = await response.json()
            // Get 4 random related products, excluding current product
            const filtered = data.results.filter(product => product.id !== parseInt(params.id))
            const shuffled = filtered.sort(() => 0.5 - Math.random())
            setRelatedProducts(shuffled.slice(0, 4))
        } catch (error) {
            console.error('Tegishli mahsulotlarni yuklashda xato:', error)
            setRelatedProducts([])
        }
    }

    // Get fallback image based on forklift type
    const getFallbackImage = (forkliftType) => {
        const imageMap = {
            'diesel': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
            'electric': 'https://images.unsplash.com/photo-1558618666-4c3b3b8c7b3a?w=800&h=600&fit=crop&auto=format',
            'gas': 'https://images.unsplash.com/photo-1558618666-f4d3b3b8c7b3?w=800&h=600&fit=crop&auto=format'
        }
        return imageMap[forkliftType] || imageMap['diesel']
    }

    // Get product images with fallback
    const getProductImages = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images.map(img => img.image)
        }
        // If no images available, return fallback images
        const fallback = getFallbackImage(product.forklift_type)
        return [fallback, fallback, fallback, fallback]
    }

    // Get image for related products
    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0].image
        }
        return getFallbackImage(product.forklift_type)
    }

    // Handle image error
    const handleImageError = (index) => {
        setImageError(prev => ({
            ...prev,
            [index]: true
        }))
    }

    // Check if product is in stock (convert 0/1 to boolean)
    const isInStock = (stockValue) => {
        return stockValue === 1 || stockValue === true
    }

    // Generate features from product data
    const generateFeatures = (product) => {
        const features = []
        if (product.capacity_kg) features.push(`${product.capacity_kg / 1000} ton ko'tarish qobiliyati`)
        if (product.forklift_type === 'diesel') features.push('Ekonomik yoqilg\'i sarfi')
        if (product.forklift_type === 'electric') features.push('Ekologik toza ishlash')
        features.push('Ergonomik boshqaruv paneli')
        features.push('Xavfsizlik tizimi')
        features.push('Oson texnik xizmat ko\'rsatish')
        if (product.engine_type) features.push(`${product.engine_type} dvigatel`)
        return features.slice(0, 6) // Maksimum 6 ta feature
    }

    // Handle purchase button click
    const handleAddToCart = () => {
        setShowModal(true)
    }

    // Telefon raqam formatini to'g'irlash
    const formatPhoneNumber = (value) => {
        // Faqat raqamlarni qoldirish
        const cleaned = value.replace(/\D/g, '')

        // Agar bo'sh bo'lsa, faqat +998 qaytarish
        if (cleaned.length === 0) {
            return '+998'
        }

        // Agar 998 bilan boshlansa
        if (cleaned.startsWith('998')) {
            const numbers = cleaned.slice(3) // 998 dan keyingi raqamlar
            let formatted = '+998'

            if (numbers.length > 0) {
                formatted += ' ' + numbers.slice(0, 2) // XX
                if (numbers.length > 2) {
                    formatted += ' ' + numbers.slice(2, 5) // XXX
                    if (numbers.length > 5) {
                        formatted += ' ' + numbers.slice(5, 7) // XX
                        if (numbers.length > 7) {
                            formatted += ' ' + numbers.slice(7, 9) // XX
                        }
                    }
                }
            }
            return formatted
        }

        // Agar 998 bilan boshlanmasa, avtomatik qo'shish
        if (cleaned.length > 0) {
            const numbers = cleaned.slice(0, 9) // Maksimum 9 ta raqam
            let formatted = '+998'

            if (numbers.length > 0) {
                formatted += ' ' + numbers.slice(0, 2) // XX
                if (numbers.length > 2) {
                    formatted += ' ' + numbers.slice(2, 5) // XXX
                    if (numbers.length > 5) {
                        formatted += ' ' + numbers.slice(5, 7) // XX
                        if (numbers.length > 7) {
                            formatted += ' ' + numbers.slice(7, 9) // XX
                        }
                    }
                }
            }
            return formatted
        }

        return '+998'
    }

    // Handle phone number input
    const handlePhoneChange = (e) => {
        const value = e.target.value
        const formatted = formatPhoneNumber(value)
        setPhoneNumber(formatted)
    }

    // Telefon raqam validation
    const isValidPhone = (phone) => {
        const cleaned = phone.replace(/\D/g, '')
        // Kamida 12 ta raqam bo'lishi kerak (998 + 9 ta raqam)
        return cleaned.length >= 12 && cleaned.startsWith('998')
    }

    // Handle form submission
    const handleSubmitPurchase = async (e) => {
        e.preventDefault()

        // Telefon raqam tekshirish
        if (!phoneNumber.trim() || phoneNumber.trim() === '+998' || phoneNumber.trim() === '+998 ') {
            setSubmitError('Telefon raqamini to\'liq kiriting')
            return
        }

        const cleaned = phoneNumber.replace(/\D/g, '')
        if (cleaned.length < 12) {
            setSubmitError('Telefon raqam to\'liq emas')
            return
        }

        setIsSubmitting(true)
        setSubmitError('')

        try {
            // Telefon raqamdan faqat raqamlarni olib qoldirish
            const cleanPhone = phoneNumber.replace(/\D/g, '')

            const requestData = {
                phone: cleanPhone, // Faqat raqamlar: 998901234567
                product_id: parseInt(params.id),
                product_type: "forklift"
            }

            console.log('Yuborilayotgan ma\'lumotlar:', requestData)

            const response = await fetch('https://api.jacforklift.uz/api/api/send_message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            })

            console.log('Server javobi status:', response.status)

            if (response.ok) {
                const responseData = await response.json()
                console.log('Muvaffaqiyatli javob:', responseData)

                setSubmitSuccess(true)
                setTimeout(() => {
                    setShowModal(false)
                    setSubmitSuccess(false)
                    setPhoneNumber('')
                    setSubmitError('')
                }, 3000)
            } else {
                let errorMessage = 'Xabar yuborishda xatolik yuz berdi'
                try {
                    const errorData = await response.json()
                    console.log('Server xatosi:', errorData)
                    errorMessage = errorData.message || errorData.detail || errorMessage
                } catch (parseError) {
                    console.log('JSON parse xatosi:', parseError)
                    errorMessage = `Server xatosi: ${response.status} ${response.statusText}`
                }
                setSubmitError(errorMessage)
            }
        } catch (error) {
            console.error('Network xatosi:', error)
            setSubmitError('Internet aloqasida xatolik. Qaytadan urinib ko\'ring.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Close modal
    const closeModal = () => {
        setShowModal(false)
        setPhoneNumber('')
        setSubmitError('')
        setSubmitSuccess(false)
    }

    // Handle related product navigation
    const handleRelatedProductClick = (productId) => {
        // Navigate to the new product
        router.push(`/karaDetail/${productId}`)
        // Reset states
        setSelectedImage(0)
        setImageError({})
        window.scrollTo(0, 0)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-orange-500"></div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!product || error) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-md mx-auto px-4">
                        <div className="text-6xl mb-4">😔</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            {error || 'Mahsulot topilmadi'}
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Ushbu mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="/products"
                                className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Barcha mahsulotlarga qaytish
                            </Link>
                            <button
                                onClick={() => router.back()}
                                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Orqaga qaytish
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const productImages = getProductImages(product)
    const productFeatures = generateFeatures(product)

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header/Navbar */}
            <Navbar />

            {/* Purchase Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl relative animate-in fade-in-0 zoom-in-95 duration-300 w-full max-w-md">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal content */}
                        <div className="px-6 py-8">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Sotib olish uchun telefon raqamingizni qoldiring!
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Telefon raqamingizni yuboring.<br />
                                    Biz siz bilan tez orada bog'lanamiz
                                </p>
                            </div>

                            {submitSuccess ? (
                                <div className="text-center py-8">
                                    <div className="text-green-500 text-5xl mb-4 animate-bounce">✓</div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                        Muvaffaqiyatli yuborildi!
                                    </h4>
                                    <p className="text-gray-600">
                                        Tez orada siz bilan bog'lanamiz
                                    </p>
                                    <div className="mt-4 text-sm text-gray-500">
                                        Bu oyna 3 soniyadan keyin yopiladi...
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitPurchase} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Telefon raqam
                                        </label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            placeholder="+998"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black outline-none"
                                            required
                                            maxLength={17}
                                        />
                                    </div>

                                    {submitError && (
                                        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || phoneNumber.trim() === '+998' || phoneNumber.replace(/\D/g, '').length < 12}
                                            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Yuborilmoqda...
                                                </div>
                                            ) : (
                                                'Sotib olish'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 w-full bg-gray-50">
                {/* Back Button Section */}
                <div className="bg-white shadow-sm w-full">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-2"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Orqaga
                        </button>
                    </div>
                </div>

                {/* Main Product Section */}
                <div className="w-full max-w-7xl mx-auto px-4 py-6">
                    {/* Mobile Layout */}
                    <div className="lg:hidden">
                        {/* Main Image */}
                        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src={imageError[selectedImage] ? getFallbackImage(product.forklift_type) : productImages[selectedImage]}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={() => handleImageError(selectedImage)}
                                />
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-2 mb-6">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                                        ? 'border-orange-500 ring-2 ring-orange-200'
                                        : 'border-gray-200 hover:border-orange-300'
                                        }`}
                                >
                                    <img
                                        src={imageError[index] ? getFallbackImage(product.forklift_type) : image}
                                        alt={`${product.name} - ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={() => handleImageError(index)}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Product Info */}
                        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex flex-wrap items-center space-x-3 text-sm text-gray-600">
                                {product.capacity_kg && <span>{product.capacity_kg / 1000} ton</span>}
                                {product.capacity_kg && product.forklift_type && <span>•</span>}
                                {product.forklift_type && <span className="capitalize">{product.forklift_type}</span>}
                                {product.model_number && (
                                    <>
                                        <span>•</span>
                                        <span>{product.model_number}</span>
                                    </>
                                )}
                            </div>

                            <div className="text-gray-700 leading-relaxed text-sm">
                                <p>{product.description || 'Bu yuqori sifatli forklift har qanday sanoat korxonasida samarali ishlash uchun mo\'ljallangan. Zamonaviy texnologiya va ishonchli mexanizm bilan jihozlangan.'}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Xususiyatlar</h3>
                                <ul className="space-y-2">
                                    {productFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700 text-sm">
                                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className={`w-3 h-3 rounded-full ${isInStock(product.in_stock) ? 'bg-green-500' : 'bg-green-500'}`}></div>
                                    <span className={`text-sm font-medium ${isInStock(product.in_stock) ? 'text-green-600' : 'text-green-600'}`}>
                                        {isInStock(product.in_stock) ? 'Mavjud' : 'Mavjud'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-lg font-medium text-gray-600">
                                        Mavjud
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        style={{ width: '145px', height: '48px' }}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>Sotib olish</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 w-full">
                        {/* Left Side - Images */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                                    <img
                                        src={imageError[selectedImage] ? getFallbackImage(product.forklift_type) : productImages[selectedImage]}
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain"
                                        onError={() => handleImageError(selectedImage)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                                            ? 'border-orange-500 ring-2 ring-orange-200'
                                            : 'border-gray-200 hover:border-orange-300'
                                            }`}
                                    >
                                        <img
                                            src={imageError[index] ? getFallbackImage(product.forklift_type) : image}
                                            alt={`${product.name} - ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={() => handleImageError(index)}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {product.name}
                                </h1>
                                <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-4">
                                    {product.capacity_kg && <span>{product.capacity_kg / 1000} ton</span>}
                                    {product.capacity_kg && product.forklift_type && <span>•</span>}
                                    {product.forklift_type && <span className="capitalize">{product.forklift_type}</span>}
                                    {product.model_number && (
                                        <>
                                            <span>•</span>
                                            <span>{product.model_number}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="text-gray-700 leading-relaxed mb-6">
                                <p>{product.description || 'Bu yuqori sifatli forklift har qanday sanoat korxonasida samarali ishlash uchun mo\'ljallangan. Zamonaviy texnologiya va ishonchli mexanizm bilan jihozlangan bu transport vositasi ishonchli va samarali ishlaydi.'}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Xususiyatlar</h3>
                                <ul className="space-y-3">
                                    {productFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Texnik xususiyatlari</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {product.capacity_kg && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-600">Ko'tarish qobiliyati:</span>
                                            <span className="font-medium text-black">{product.capacity_kg / 1000} ton</span>
                                        </div>
                                    )}
                                    {product.model_number && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-600">Model:</span>
                                            <span className="font-medium text-black">{product.model_number}</span>
                                        </div>
                                    )}
                                    {product.forklift_type && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-600">Yoqilg'i turi:</span>
                                            <span className="font-medium capitalize text-black">{product.forklift_type}</span>
                                        </div>
                                    )}
                                    {product.engine_type && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-600">Dvigatel:</span>
                                            <span className="font-medium text-black">{product.engine_type}</span>
                                        </div>
                                    )}
                                    {product.manufacture_year && (
                                        <div className="flex gap-4">
                                            <span className="text-gray-600">Ishlab chiqarilgan yili:</span>
                                            <span className="font-medium text-black">{product.manufacture_year}</span>
                                        </div>
                                    )}
                                    <div className="flex gap-4">
                                        <span className="text-gray-600">Mavjudligi:</span>
                                        <span className="font-medium text-green-600">
                                            Mavjud
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                                    <div>
                                        <span className="text-2xl font-medium text-gray-600">
                                            Mavjud
                                        </span>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm font-medium text-green-600">
                                                Mavjud
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        style={{ width: '145px', height: '48px' }}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>Sotib olish</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="bg-[url('/bgimg.png')] py-8 lg:py-16 w-full">
                    <div className="w-full max-w-7xl mx-auto px-4">
                        <div className="flex flex-row justify-between items-center mb-6">
                            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                                Mahsulotlar
                            </h2>
                            <Link
                                href="/products"
                                className="bg-white hover:bg-gray-50 text-gray-800 font-medium transition-colors border border-yellow-500 hover:border-yellow-600 px-4 py-2 rounded-xl text-sm flex items-center justify-center"
                            >
                                Barchasi →
                            </Link>
                        </div>

                        {relatedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <div
                                        key={relatedProduct.id}
                                        onClick={() => handleRelatedProductClick(relatedProduct.id)}
                                        className="block h-full cursor-pointer"
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 h-full flex flex-col">
                                            {/* Image Container */}
                                            <div className="relative bg-gray-50 flex items-center justify-center p-3 h-32 lg:h-48">
                                                <img
                                                    src={getProductImage(relatedProduct)}
                                                    alt={relatedProduct.name}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        e.target.src = getFallbackImage(relatedProduct.forklift_type)
                                                    }}
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-3 lg:p-6 flex flex-col justify-between flex-1">
                                                <div className="mb-2 lg:mb-4">
                                                    <h3 className="text-gray-900 font-semibold text-sm lg:text-lg leading-tight mb-1 line-clamp-2 min-h-[2rem] lg:min-h-[3rem]">
                                                        {relatedProduct.name}
                                                    </h3>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm lg:text-base font-medium text-gray-600">
                                                        bor
                                                    </span>
                                                    {relatedProduct.capacity_kg && (
                                                        <span className="text-xs lg:text-sm text-gray-500">
                                                            {relatedProduct.capacity_kg / 1000}T
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Tegishli mahsulotlar topilmadi</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ProductDetailPage