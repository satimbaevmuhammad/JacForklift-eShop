'use client'
import React from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import { useTranslation } from 'react-i18next' // useLanguage o'rniga useTranslation ishlatamiz

const Header = () => {
    const { t } = useTranslation() // Bu Navbar bilan bir xil hook

    return (
        <div className='w-full min-h-screen relative overflow-hidden'>
            {/* Background Image */}
            <div
                className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                style={{
                    backgroundImage: `url('/bgImage.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Overlay for better text readability */}
                <div className='absolute inset-0 bg-black/30'></div>
            </div>

            <Navbar />

            {/* Main Content */}
            <div className='relative flex items-center min-h-screen px-6 py-20' style={{ zIndex: 1 }}>
                <div className='max-w-7xl mx-auto w-full'>
                    {/* Desktop Layout */}
                    <div className='hidden lg:grid grid-cols-2 gap-12 items-center'>
                        {/* Left Content Section */}
                        <div className='space-y-8'>
                            <h1 className='text-6xl font-bold text-white leading-tight drop-shadow-lg'>
                                {t('heroTitle')} {/* t() function sifatida ishlatamiz */}
                            </h1>

                            <p className='text-white/90 text-lg leading-relaxed max-w-lg drop-shadow-md'>
                                {t('heroDescription')}
                            </p>

                            <Link href="/products">
                                <button className='bg-[#FABF26] hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                                    {t('products')}
                                </button>
                            </Link>
                        </div>

                        {/* Right side - Equipment image area */}
                        <div className='relative'>
                            {/* This section displays equipment through background image */}
                        </div>
                    </div>

                    {/* Mobile/Tablet Layout */}
                    <div className='lg:hidden flex flex-col items-center text-center space-y-8 pt-20'>
                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg px-4'>
                            {t('heroTitle')}
                        </h1>

                        <p className='text-white/90 text-base sm:text-lg leading-relaxed max-w-md px-4 drop-shadow-md'>
                            {t('heroDescription')}
                        </p>

                        <Link href="/products">
                            <button className='bg-[#FABF26] hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs mx-4'>
                                {t('products')}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header