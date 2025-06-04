import React from 'react'
import Navbar from './Navbar'

const Header = () => {
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

            {/* Navbar - Fixed positioning with higher z-index */}
            <Navbar />

            {/* Content */}
            <div className='relative flex items-center min-h-screen px-6 py-20' style={{ zIndex: 1 }}>
                <div className='max-w-7xl mx-auto w-full'>
                    {/* Desktop Layout */}
                    <div className='hidden lg:grid grid-cols-2 gap-12 items-center'>
                        {/* Left Content */}
                        <div className='space-y-8'>
                            <h1 className='text-6xl font-bold text-white leading-tight drop-shadow-lg'>
                                Eng sifatli yuk <br />
                                ko'tarish texnikalari
                            </h1>

                            <p className='text-white/90 text-lg leading-relaxed max-w-lg drop-shadow-md'>
                                Eng sifatli yuk ko'tarish texnikalari. Eng sifatli yuk
                                ko'tarish texnikalari. Eng sifatli yuk ko'tarish
                                texnikalari. Eng sifatli yuk ko'tarish texnikalari
                            </p>

                            <button className='bg-[#FABF26] hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                                Mahsulotlar
                            </button>
                        </div>

                        {/* Right side - forklift image area */}
                        <div className='relative'>
                            {/* Bu qism fon rasmi orqali ko'rsatiladi */}
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className='lg:hidden flex flex-col items-center text-center space-y-8 pt-20'>
                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg'>
                            Eng sifatli yuk <br />
                            ko'tarish texnikalari
                        </h1>

                        <p className='text-white/90 text-base sm:text-lg leading-relaxed max-w-md px-4 drop-shadow-md'>
                            Eng sifatli yuk ko'tarish texnikalari.
                            Eng sifatli yuk ko'tarish texnikalari.
                            Eng sifatli yuk ko'tarish texnikalari.
                            Eng sifatli yuk ko'tarish texnikalari
                        </p>

                        <button className='bg-[#FABF26] hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs'>
                            Mahsulotlar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header