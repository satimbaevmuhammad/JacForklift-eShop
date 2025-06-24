'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18n, { languages, changeLanguage } from '../../lib/i18n'

const Navbar = () => {
    const router = useRouter()
    const { t } = useTranslation()

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isCallOpen, setIsCallOpen] = useState(false)
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [currentLang, setCurrentLang] = useState(i18n.language)

    const searchRef = useRef(null)
    const mobileSearchRef = useRef(null)
    const langRef = useRef(null)

    // Flag images mapping
    const flagImages = {
        uz: '/uzb.png',
        ru: '/rus.png',
        en: '/eng.png'
    }

    // Listen to language changes
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setCurrentLang(lng)
        }

        i18n.on('languageChanged', handleLanguageChange)
        return () => i18n.off('languageChanged', handleLanguageChange)
    }, [])

    // Current language info
    const currentLangInfo = languages[currentLang] || languages.uz

    // Handle language change with page refresh
    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode)
        setIsLangOpen(false)
        
        // Sahifani qayta yuklash uchun
        setTimeout(() => {
            window.location.reload()
        }, 100)
    }

    // Debounce search function
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchQuery.trim().length > 1) {
                searchForklifts(searchQuery)
            } else {
                setSearchResults([])
                setShowResults(false)
            }
        }, 300)

        return () => clearTimeout(delayedSearch)
    }, [searchQuery, currentLang])

    // Search API function
    const searchForklifts = async (query) => {
        if (!query || query.trim().length < 2) return

        setIsLoading(true)
        try {
            const response = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?search=${encodeURIComponent(query)}&lang=${currentLang}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            // Handle different API response formats
            let results = []
            if (data.results && Array.isArray(data.results)) {
                results = data.results
            } else if (data.data && Array.isArray(data.data)) {
                results = data.data
            } else if (Array.isArray(data)) {
                results = data
            }

            setSearchResults(results)
            setShowResults(true)
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults([])
            setShowResults(false)
        } finally {
            setIsLoading(false)
        }
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (value.trim().length === 0) {
            setShowResults(false)
            setSearchResults([])
        }
    }

    // Handle product click
    const handleProductClick = (productId, event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }

        setTimeout(() => {
            setShowResults(false)
            setIsSearchOpen(false)
            setSearchQuery('')
            router.push(`/karaDetail/${productId}`)
        }, 100)
    }

    // Handle input focus
    const handleInputFocus = () => {
        if (searchQuery.trim().length > 0) {
            setShowResults(true)
        }
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideDropdown = event.target.closest('.search-dropdown') ||
                event.target.closest('.lang-dropdown')

            if (isClickInsideDropdown) return

            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false)
            }

            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                setShowResults(false)
                setIsSearchOpen(false)
            }

            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false)
            }
        }

        if (showResults || isSearchOpen || isLangOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside)

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
                document.removeEventListener('touchstart', handleClickOutside)
            }
        }
    }, [showResults, isSearchOpen, isLangOpen])

    // Image error handlers
    const handleImageError = (e) => {
        e.target.style.display = 'none'
        const placeholder = e.target.parentNode.querySelector('.image-placeholder')
        if (placeholder) placeholder.style.display = 'flex'
    }

    const handleFlagImageError = (e) => {
        e.target.style.display = 'none'
        const textFallback = e.target.parentNode.querySelector('.flag-text-fallback')
        if (textFallback) textFallback.style.display = 'inline-block'
    }

    // Search Results Component
    const SearchResults = ({ isMobile = false }) => {
        if (!showResults || searchQuery.trim().length < 2) return null

        return (
            <div
                className={`search-dropdown absolute ${isMobile ? 'left-0 right-0 top-full mt-3' : 'left-0 top-full mt-2 w-full'} bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[450px] overflow-y-auto`}
                style={{ zIndex: 999999 }}
            >
                {isLoading ? (
                    <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-600 mt-3 text-sm">{t('searching')}</p>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {searchResults.slice(0, 5).map((forklift) => (
                            <div
                                key={forklift.id}
                                className="p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer focus:bg-gray-50 focus:outline-none group"
                                onClick={(event) => handleProductClick(forklift.id, event)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleProductClick(forklift.id, e)
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label={`${forklift.name} mahsulotiga o'tish`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
                                        {forklift.images && forklift.images.length > 0 ? (
                                            <>
                                                <img
                                                    src={forklift.images[0].image}
                                                    alt={forklift.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    onError={handleImageError}
                                                    loading="lazy"
                                                />
                                                <div className="image-placeholder absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                                                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10z" />
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-8 h-8 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2-2v10z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                                            {forklift.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {forklift.capacity_kg ? `${(forklift.capacity_kg / 1000).toFixed(1)} ton` : 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium mt-1.5 flex items-center gap-1">
                                            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                                            {t('available')}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <div className="flex items-center justify-end">
                                            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {searchResults.length > 5 && (
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-center border-t border-gray-100">
                                <p className="text-sm text-gray-700 mb-2">
                                    {t('moreResults')} <span className="font-semibold text-blue-600">{searchResults.length - 5}</span> {t('resultsCount')}
                                </p>
                                <div
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        setShowResults(false)
                                        setIsSearchOpen(false)
                                        setSearchQuery('')
                                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
                                    }}
                                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {t('seeAllResults')}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 text-sm font-medium">{t('noResults')}</p>
                        <p className="text-gray-400 text-xs mt-1">{t('tryOtherKeywords')}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <nav className="px-4 md:px-[100px] py-4 fixed top-0 left-0 right-0" style={{ zIndex: 9999 }}>
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-[60px]"></div>

            <div className="relative flex justify-between items-center" style={{ zIndex: 10000 }}>
                {/* Logo */}
                <Link href="/main">
                    <div className="logo_box">
                        <img className="w-[80px] md:w-[108px]" src="/logo.png" alt="Logo" />
                    </div>
                </Link>

                {/* Desktop Navigation - Centered Search */}
                <div className="hidden md:flex items-center justify-center flex-1">
                    <div className="relative" ref={searchRef} style={{ zIndex: 10001 }}>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-[12px] w-[363px] px-4 py-3 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200">
                            <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder={t("searchPlaceholder")}
                                className="bg-transparent outline-none text-white placeholder-white/60 flex-1 text-left text-base"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={handleInputFocus}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleInputFocus()
                                }}
                                autoComplete="off"
                                spellCheck="false"
                            />
                            {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/50"></div>}
                        </div>
                        <SearchResults />
                    </div>
                </div>

                {/* Desktop Right Side - Language + Phone */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Selector - Desktop */}
                    <div className="relative" ref={langRef}>
                        <button
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20 hover:bg-white/15 transition-all duration-200"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white/20">
                                <img
                                    src={flagImages[currentLang] || flagImages.uz}
                                    alt={currentLangInfo.name}
                                    className="w-full h-full object-cover"
                                    onError={handleFlagImageError}
                                />
                                <span className="flag-text-fallback hidden text-xs font-bold text-white">
                                    {currentLang.toUpperCase()}
                                </span>
                            </div>
                            <span className="text-white text-sm font-medium">{currentLangInfo.name}</span>
                            <svg className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Language Dropdown - Desktop */}
                        {isLangOpen && (
                            <div className="lang-dropdown absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[140px]" style={{ zIndex: 10000 }}>
                                {Object.values(languages).map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${currentLang === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                                        onClick={() => handleLanguageChange(lang.code)}
                                    >
                                        <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                                            <img
                                                src={flagImages[lang.code]}
                                                alt={lang.name}
                                                className="w-full h-full object-cover"
                                                onError={handleFlagImageError}
                                            />
                                            <span className="flag-text-fallback hidden text-xs font-bold text-gray-600">
                                                {lang.code.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="font-medium text-sm">{lang.name}</span>
                                        {currentLang === lang.code && (
                                            <svg className="w-4 h-4 text-blue-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <button
                            className="bg-yellow-400/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-yellow-300/30 hover:bg-yellow-400 transition-all duration-200"
                            onClick={() => setIsCallOpen(!isCallOpen)}
                        >
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                            </svg>
                        </button>

                        {/* Mobile Call Dropdown */}
                        {isCallOpen && (
                            <div className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/30 p-4 whitespace-nowrap" style={{ zIndex: 10000 }}>
                                <a href="https://t.me/+998983095550" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                                    </svg>
                                    <p className="text-gray-700 font-medium">{t("phone")}</p>
                                </a>
                                 <a href="https://t.me/+998949876000" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                                    </svg>
                                    <p className="text-gray-700 font-medium">+998949876000</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Icons */}
                <div className="md:hidden flex items-center gap-3">
                    {/* Language Selector - Mobile */}
                    <div className="relative" ref={langRef}>
                        <button
                            className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-200"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                        >
                            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white/20">
                                <img
                                    src={flagImages[currentLang] || flagImages.uz}
                                    alt={currentLangInfo.name}
                                    className="w-full h-full object-cover"
                                    onError={handleFlagImageError}
                                />
                                <span className="flag-text-fallback hidden text-xs font-bold text-white">
                                    {currentLang.toUpperCase()}
                                </span>
                            </div>
                        </button>

                        {/* Mobile Language Dropdown */}
                        {isLangOpen && (
                            <div className="lang-dropdown absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[120px]" style={{ zIndex: 10000 }}>
                                {Object.values(languages).map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${currentLang === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                                        onClick={() => handleLanguageChange(lang.code)}
                                    >
                                        <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                                            <img
                                                src={flagImages[lang.code]}
                                                alt={lang.name}
                                                className="w-full h-full object-cover"
                                                onError={handleFlagImageError}
                                            />
                                            <span className="flag-text-fallback hidden text-xs font-bold text-gray-600">
                                                {lang.code.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="font-medium text-xs">{lang.name}</span>
                                        {currentLang === lang.code && (
                                            <svg className="w-3 h-3 text-blue-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Icon - Mobile */}
                    <div className="relative" ref={mobileSearchRef} style={{ zIndex: 10001 }}>
                        <button
                            className="bg-white/15 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/25 hover:bg-white/20 transition-all duration-200"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsSearchOpen(!isSearchOpen)
                            }}
                        >
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Mobile Search Overlay */}
                        {isSearchOpen && (
                            <div className="fixed top-0 left-0 right-0 h-[100px] bg-black/30 backdrop-blur-[60px]" style={{ zIndex: 10000 }}>
                                <div className="flex justify-center items-center h-full px-4">
                                    <div className="relative w-full max-w-[343px]" style={{ zIndex: 10001 }}>
                                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-[12px] px-4 py-3 shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200">
                                            <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder={t("searchPlaceholderMobile")}
                                                className="bg-transparent outline-none text-white placeholder-white/60 flex-1 text-left text-base"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                onFocus={handleInputFocus}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleInputFocus()
                                                }}
                                                autoFocus
                                                autoComplete="off"
                                                spellCheck="false"
                                                style={{ zIndex: 10002 }}
                                            />
                                            {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/50"></div>}
                                            <button
                                                className="text-white/70 hover:text-white transition-colors duration-200"
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Search Results for Mobile */}
                                        <SearchResults isMobile={true} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Call Icon - Mobile */}
                    <div className="relative">
                        <button
                            className="bg-yellow-400/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-yellow-300/30 hover:bg-yellow-400 transition-all duration-200"
                            onClick={() => setIsCallOpen(!isCallOpen)}
                        >
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                            </svg>
                        </button>

                        {/* Mobile Call Dropdown */}
                        {isCallOpen && (
                            <div className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/30 p-4 whitespace-nowrap" style={{ zIndex: 10000 }}>
                                <a href="tel:+998983095550" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                                    </svg>
                                    <p className="text-gray-700 font-medium">{t("phone")}</p>
                                </a>
                                   <a href="tel:+998949876000" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                                    </svg>
                                    <p className="text-gray-700 font-medium">+998949876000</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar