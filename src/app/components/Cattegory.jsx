"use client"

import React from 'react'
import Link from 'next/link'

const Categories = () => {
    // Statik kategoriyalar ma'lumotlari
    const categories = [
        {
            id: 1,
            name: "Dizelli transportlar",
            image: "/traktr.png",
            key: "diesel"
        },
        {
            id: 2,
            name: "Elektri transportlar",
            image: "/pts.png",
            key: "Electric"
        },
        {
            id: 3,
            name: "Benzinli transportlar",
            image: "/orn.png",
            key: "Petrol"
        },
        {
            id: 4,
            name: "LPG transportlari",
            image: "/traktr.png",
            key: "lpg"
        },
        {
            id: 5,
            name: "Elektr pallet yuk mashinasi",
            image: "/pall.png",
            key: "electric pallet"
        },
        {
            id: 6,
            name: "Elektr stacker mashinaslari",
            image: "/stacker.png",
            key: "PALLET STACKER"
        },
        {
            id: 7,
            name: "Reach truck forklift",
            image: "/reach-truck.png",
            key: "REACH TRUCK"
        },
        {
            id: 8,
            name: "Handle pallet forklift",
            image: "/handle-pallet.png",
            key: "Handle Pallets"
        },
        {
            id: 9,
            name: "Texnika extiyot qismlarin",
            image: "/spare-parts.png",
            key: "spare"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 md:bg-[url('/bgimg.png')] md:bg-cover py-4 md:py-6 lg:py-12 px-4 md:px-3 lg:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-6 lg:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black text-center md:text-left">
                        Kategoriyalar
                    </h1>
                </div>

                {/* Categories Grid - Mobile: flex column, Desktop: grid */}
                <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10 md:space-y-0">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/cattegoryDatail/${category.id}`}
                            className="bg-white rounded-xl md:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-lg md:hover:shadow-2xl md:hover:shadow-orange-500/20 transition-all duration-300 md:duration-500 cursor-pointer border border-gray-100 hover:border-orange-200 md:transform md:hover:-translate-y-1 lg:hover:-translate-y-2 md:hover:scale-102 lg:hover:scale-105 group
                            /* Mobile: horizontal layout */
                            flex flex-row items-center p-5 min-h-[120px]
                            /* Desktop: vertical layout */
                            md:flex-col md:items-stretch md:p-0 md:min-h-0 block"
                            style={{
                                userSelect: 'none',
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
                            {/* Mobile Layout */}
                            <div className="flex-1 pr-6 md:hidden flex flex-col justify-between h-full">
                                <h3 className="text-xl font-bold text-black leading-tight group-hover:text-orange-600 transition-colors duration-300 mb-4">
                                    {category.name}
                                </h3>
                                <img
                                    src="/jac.png"
                                    alt="JAC"
                                    className="w-16 h-8 object-contain opacity-60 group-hover:opacity-80 transition-opacity duration-300 self-start"
                                />
                            </div>

                            {/* Mobile Image */}
                            <div className="w-32 h-32 bg-transparent rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 md:hidden">
                                {category.image ? (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.nextElementSibling.style.display = 'flex'
                                        }}
                                    />
                                ) : null}

                                {/* Mobile Fallback Icon */}
                                <div
                                    className="w-20 h-20 flex items-center justify-center"
                                    style={{ display: category.image ? 'none' : 'flex' }}
                                >
                                    <svg
                                        className="w-full h-full text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 200 150"
                                    >
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

                            {/* Desktop Layout - Hidden on mobile */}
                            <>
                                {/* Category Header - Desktop */}
                                <div className="hidden md:block p-5 sm:p-6 pb-3">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black leading-tight max-w-[200px] sm:max-w-[250px] group-hover:text-orange-600 transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <div className="flex-shrink-0 ml-4 sm:ml-6">
                                            <img
                                                src="/jac.png"
                                                alt="JAC"
                                                className="w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12 object-contain opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Container - Desktop */}
                                <div className="hidden md:block px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                                    <div className="flex items-center justify-center h-32 sm:h-36 lg:h-40 xl:h-44 rounded-lg sm:rounded-xl overflow-hidden">
                                        {category.image ? (
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                    e.target.nextElementSibling.style.display = 'flex'
                                                }}
                                            />
                                        ) : null}

                                        {/* Fallback Forklift Icon - Desktop */}
                                        <div
                                            className="text-center transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                                            style={{ display: category.image ? 'none' : 'flex' }}
                                        >
                                            <div className="w-24 h-20 sm:w-28 sm:h-22 lg:w-32 lg:h-26 xl:w-36 xl:h-30 mx-auto mb-2 flex items-center justify-center">
                                                <svg
                                                    className="w-full h-full text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                                                    fill="currentColor"
                                                    viewBox="0 0 200 150"
                                                >
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
                                </div>
                            </>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories