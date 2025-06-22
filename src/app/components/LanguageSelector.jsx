// components/LanguageSelector.js
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageSelector = ({ className = '', variant = 'default' }) => {
    const { currentLang, changeLanguage, t, languages } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Click outside yopish
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Variant asosida style
    const getButtonStyle = () => {
        switch (variant) {
            case 'navbar':
                return 'flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-[12px] px-3 py-2 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-200'
            case 'mobile':
                return 'bg-white/15 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/25 hover:bg-white/20 transition-all duration-200'
            case 'footer':
                return 'flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-200'
            default:
                return 'flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors duration-200'
        }
    }

    const getDropdownStyle = () => {
        switch (variant) {
            case 'navbar':
            case 'mobile':
                return 'absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/30 overflow-hidden min-w-[160px]'
            case 'footer':
                return 'absolute bottom-full left-0 mb-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden min-w-[160px]'
            default:
                return 'absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[160px]'
        }
    }

    const getTextColor = () => {
        switch (variant) {
            case 'navbar':
            case 'mobile':
                return 'text-white/80'
            case 'footer':
                return 'text-gray-200'
            default:
                return 'text-gray-700'
        }
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                className={getButtonStyle()}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Tilni tanlash"
            >
                {variant === 'mobile' ? (
                    <span className='text-lg'>{t.flag}</span>
                ) : (
                    <>
                        {variant !== 'footer' && (
                            <svg className={`w-5 h-5 ${variant === 'navbar' ? 'text-white/70' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 8C14.5 8 16 10 16 12C16 14 14.5 16 12 16C9.5 16 8 14 8 12C8 10 9.5 8 12 8Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 2V22" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        )}
                        <span className={`text-sm font-medium ${getTextColor()}`}>
                            {t.flag} {variant !== 'mobile' && t.name}
                        </span>
                        <svg className={`w-4 h-4 ${variant === 'navbar' ? 'text-white/60' : variant === 'footer' ? 'text-gray-400' : 'text-gray-500'} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={getDropdownStyle()} style={{ zIndex: 10000 }}>
                    {Object.values(languages).map((lang) => (
                        <button
                            key={lang.code}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                                currentLang === lang.code 
                                    ? variant === 'footer' 
                                        ? 'bg-gray-700 text-blue-400' 
                                        : 'bg-blue-50 text-blue-600'
                                    : variant === 'footer' 
                                        ? 'text-gray-200' 
                                        : 'text-gray-700'
                            }`}
                            onClick={() => {
                                changeLanguage(lang.code)
                                setIsOpen(false)
                            }}
                        >
                            <span className='text-lg'>{lang.flag}</span>
                            <span className='font-medium text-sm'>{lang.name}</span>
                            {currentLang === lang.code && (
                                <svg className={`w-4 h-4 ml-auto ${variant === 'footer' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSelector