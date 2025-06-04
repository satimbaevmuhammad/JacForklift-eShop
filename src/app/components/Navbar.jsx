'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isCallOpen, setIsCallOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef(null)
    const mobileSearchRef = useRef(null)

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
    }, [searchQuery])

    // Search API function
    const searchForklifts = async (query) => {
        if (!query || query.trim().length < 2) return

        setIsLoading(true)
        try {
            console.log('Searching for:', query)
            const response = await fetch(`https://api.jacforklift.uz/api/api/forklifts/?search=${encodeURIComponent(query)}`, {
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
            console.log('Search results:', data)

            const results = data.results || data.data || data || []
            setSearchResults(Array.isArray(results) ? results : [])
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
        console.log('Search query changed:', value)
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

        console.log('Product clicked:', productId)
        console.log('Navigating to:', `/karaDetail/${productId}`)

        setTimeout(() => {
            setShowResults(false)
            setIsSearchOpen(false)
            setSearchQuery('')
            router.push(`/karaDetail/${productId}`)
        }, 100)
    }

    // Handle input focus va click
    const handleInputFocus = () => {
        if (searchQuery.trim().length > 0) {
            setShowResults(true);
        }
    };

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideDropdown = event.target.closest('.search-dropdown')

            if (isClickInsideDropdown) {
                return
            }

            if (searchRef.current && !searchRef.current.contains(event.target)) {
                console.log('Closing desktop search dropdown');
                setShowResults(false)
            }

            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                console.log('Closing mobile search dropdown');
                setShowResults(false)
                setIsSearchOpen(false)
            }
        }

        if (showResults || isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside)

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
                document.removeEventListener('touchstart', handleClickOutside)
            }
        }
    }, [showResults, isSearchOpen])

    // Image error handler
    const handleImageError = (e) => {
        e.target.style.display = 'none'
        const placeholder = e.target.parentNode.querySelector('.image-placeholder')
        if (placeholder) {
            placeholder.style.display = 'flex'
        }
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
                        <p className="text-gray-600 mt-3 text-sm">Qidirilmoqda...</p>
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10z" />
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
                                            Mavjud
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-orange-500 mb-1">
                                            36 500 so'm
                                        </div>
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
                                    Va yana <span className="font-semibold text-blue-600">{searchResults.length - 5}</span> ta natija...
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
                                    Barcha natijalarni ko'rish
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
                        <p className="text-gray-600 text-sm font-medium">Hech narsa topilmadi</p>
                        <p className="text-gray-400 text-xs mt-1">Boshqa kalit so'z bilan qidiring</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <nav className='px-4 md:px-[100px] py-4 fixed top-0 left-0 right-0' style={{ zIndex: 9999 }}>
            {/* Background with gradient */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-[60px]'></div>

            <div className='relative flex justify-between items-center' style={{ zIndex: 10000 }}>
                {/* Logo */}
                <Link href='/main'>
                    <div className='logo_box'>
                        <img
                            className='w-[80px] md:w-[108px]'
                            src="/logo.png"
                            alt="Logo"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation - Centered Search */}
                <div className='hidden md:flex items-center justify-center flex-1'>
                    <div className='relative' ref={searchRef} style={{ zIndex: 10001 }}>
                        <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-[12px] w-[363px] px-4 py-3 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200'>
                            <svg className='w-5 h-5 text-white/70' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Forklift qidiring...'
                                className='bg-transparent outline-none text-white placeholder-white/60 flex-1 text-left text-base'
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
                            {isLoading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/50"></div>
                            )}
                        </div>
                        <SearchResults />
                    </div>
                </div>

                {/* Desktop Phone Number */}
                <div className='hidden md:block'>
                    <a
                        href="tel:+998991234567"
                        className='flex items-center gap-3 hover:opacity-80 transition-opacity duration-200'
                    >
                        <div className='w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center'>
                            <svg className='w-5 h-5 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                            </svg>
                        </div>
                        <p className='text-white font-medium text-lg'>
                            +998 99 123-45-67
                        </p>
                    </a>
                </div>

                {/* Mobile Icons */}
                <div className='md:hidden flex items-center gap-3'>
                    {/* Search Icon - Mobile */}
                    <div className='relative' ref={mobileSearchRef} style={{ zIndex: 10001 }}>
                        <button
                            className='bg-white/15 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/25 hover:bg-white/20 transition-all duration-200'
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsSearchOpen(!isSearchOpen)
                            }}
                        >
                            <svg className='w-5 h-5 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Mobile Search Overlay */}
                        {isSearchOpen && (
                            <div className="fixed top-0 left-0 right-0 h-[100px] bg-black/30 backdrop-blur-[60px]" style={{ zIndex: 10000 }}>
                                {/* Search input container */}
                                <div className="flex justify-center items-center h-full px-4">
                                    <div className="relative w-full max-w-[343px]" style={{ zIndex: 10001 }}>
                                        <div
                                            className='flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-[12px] px-4 py-3 shadow-lg border border-white/30 hover:bg-white/25 transition-all duration-200'
                                            style={{
                                                height: '48px',
                                                paddingTop: '14px',
                                                paddingRight: '16px',
                                                paddingBottom: '14px',
                                                paddingLeft: '16px',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <svg className='w-5 h-5 text-white/70' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder='Qidiruv...'
                                                className='bg-transparent outline-none text-white placeholder-white/60 flex-1 text-left text-base'
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
                                            {isLoading && (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/50"></div>
                                            )}
                                            <button
                                                className='text-white/70 hover:text-white transition-colors duration-200'
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className='relative'>
                        <button
                            className='bg-yellow-400/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-yellow-300/30 hover:bg-yellow-400 transition-all duration-200'
                            onClick={() => setIsCallOpen(!isCallOpen)}
                        >
                            <svg className='w-5 h-5 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                            </svg>
                        </button>

                        {/* Mobile Call Dropdown */}
                        {isCallOpen && (
                            <div className='absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/30 p-4 whitespace-nowrap' style={{ zIndex: 10000 }}>
                                <a
                                    href="tel:+998991234567"
                                    className='flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200'
                                >
                                    <svg className='w-4 h-4 text-gray-600' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                                    </svg>
                                    <p className='text-gray-700 font-medium'>
                                        +998 99 123-45-67
                                    </p>
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