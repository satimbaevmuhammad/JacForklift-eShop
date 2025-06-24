"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import i18n from '../../lib/i18n';

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);
  const itemsPerPage = 8; // Items per page

  // Listen to language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [currentLang, selectedCategory]); // Refetch when language or category changes

  const fetchProducts = async (page = 1) => {
    try {
      setLoadingPage(page !== 1);
      if (page === 1) setLoading(true);
      setError(null);

      // Build API URL with filters
      let apiUrl = `https://api.jacforklift.uz/api/api/forklifts/?page=${page}&page_size=${itemsPerPage}&lang=${currentLang}`;
      
      if (selectedCategory !== "all") {
        apiUrl += `&forklift_type=${selectedCategory}`;
      }

      const productsResponse = await fetch(apiUrl);

      if (!productsResponse.ok) {
        throw new Error(`HTTP error! status: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      console.log("API Response:", productsData);

      const forklifts = productsData.results || [];
      setProducts(forklifts);
      setFilteredProducts(forklifts);

      // Calculate pagination info
      setTotalProducts(productsData.count || 0);
      setTotalPages(Math.ceil((productsData.count || 0) / itemsPerPage));
      setCurrentPage(page);

      if (!forklifts.length && page === 1) {
        console.warn("No forklifts found in API response");
      }

      // Fetch categories only on initial load
      if (page === 1 && categories.length === 0) {
        await fetchCategories();
      }

      setLoading(false);
      setLoadingPage(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(t('error') || "Ma'lumotlarni yuklashda xato yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
      setLoading(false);
      setLoadingPage(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const allProductsResponse = await fetch(
        `https://api.jacforklift.uz/api/api/forklifts/?page_size=1000&lang=${currentLang}`
      );

      if (allProductsResponse.ok) {
        const allProductsData = await allProductsResponse.json();
        const allForklifts = allProductsData.results || [];

        const uniqueTypes = [
          ...new Set(allForklifts.map((forklift) => forklift.forklift_type).filter(Boolean)),
        ];
        const categoriesData = uniqueTypes.map((type, index) => ({
          id: index + 1,
          name: type.charAt(0).toUpperCase() + type.slice(1),
          value: type,
        }));
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    // Products bo'limiga scroll qilish
    const productsElement = document.getElementById('products');
    if (productsElement) {
      // Agar fixed header bo'lsa, uning balandligini hisobga olish
      const headerHeight = document.querySelector('header')?.offsetHeight || 60;
      const elementPosition = productsElement.offsetTop;
      const offsetPosition = elementPosition - headerHeight - 20; // 20px qo'shimcha bo'shliq
      
      window.scrollTo({
        top: Math.max(0, offsetPosition), // Manfiy qiymat bo'lmasligi uchun
        behavior: 'smooth'
      });
    } else {
      // Agar products elementi topilmasa, sahifa yuqorisiga scroll qilish
      window.scrollTo({
        top: 200, // Sahifa yuqorisidan 200px pastga
        behavior: 'smooth'
      });
    }
    
    // Yangi ma'lumotlarni yuklash
    fetchProducts(page);
  }
};

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= 4) {
        // Show first pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show last pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const getCategoryName = (forkliftType) => {
    // Try to get translated category name, fallback to original
    const translatedName = t(forkliftType);
    return translatedName !== forkliftType
      ? translatedName
      : forkliftType
        ? forkliftType.charAt(0).toUpperCase() + forkliftType.slice(1)
        : t('category') || "Noma'lum kategoriya";
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice)
      ? "N/A"
      : `${numPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
  };

  const isProductAvailable = (product) => {
    return parseFloat(product.price_usd) > 0;
  };

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].image;
    }
    const imageMap = {
      diesel:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format",
      electric:
        "https://images.unsplash.com/photo-1558618666-4c3b3b8c7b3a?w=400&h=300&fit=crop&auto=format",
      gas: "https://images.unsplash.com/photo-1558618666-f4d3b3b8c7b3?w=400&h=300&fit=crop&auto=format",
    };
    return (
      imageMap[product.forklift_type] ||
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
    );
  };

  const getImageAltText = (product) => {
    if (product.images && product.images.length > 0 && product.images[0].alt_text) {
      return product.images[0].alt_text;
    }
    return product.name || t('product.defaultName') || "Forklift image";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-orange-500"></div>
          <p className="text-gray-600 text-sm sm:text-base text-center">
            {t('loading') || 'Yuklanmoqda...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-lg sm:text-xl font-semibold text-red-600 mb-4">{error}</h3>
          <button
            onClick={() => fetchProducts(1)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            {t('retry') || 'Qayta urinish'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="products" className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
              {t('products') || 'Mahsulotlar'}
            </h1>
            <div className="text-sm text-gray-600">
              {totalProducts > 0 && (
                <span>
                  {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalProducts)} {t('of') || 'dan'} {totalProducts}
                </span>
              )}
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t('all') || 'Barchasi'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  selectedCategory === category.value
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getCategoryName(category.name)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Loading overlay for page changes */}
          {loadingPage && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                <span className="text-gray-700">{t('loading') || 'Yuklanmoqda...'}</span>
              </div>
            </div>
          )}

          {/* Products Grid - Mobile Responsive */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-7">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/karaDetail/${product.id}`} className="block">
                    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-orange-200 hover:border-orange-300 w-full h-auto min-h-[280px] sm:w-[295px] sm:h-[392px] sm:mx-auto cursor-pointer">
                      {/* Image Container - Mobile Responsive */}
                      <div className="relative bg-white flex items-center justify-center p-4 sm:p-6 h-[180px] sm:h-[250px]">
                        <img
                          src={getProductImage(product)}
                          alt={getImageAltText(product)}
                          className="w-full h-full object-contain drop-shadow-md"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format";
                          }}
                        />
                        {/* Capacity Badge */}
                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          {product.capacity_kg ? `${product.capacity_kg / 1000}T` : "N/A"}
                        </div>
                      </div>

                      {/* Product Info - Mobile Optimized */}
                      <div className="px-3 pb-3 sm:px-6 sm:pb-6 flex flex-col justify-between h-[100px] sm:h-[142px]">
                        <h3
                          className="text-gray-900 font-bold text-sm sm:text-lg leading-tight sm:leading-6 mb-2 sm:mb-4 overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {product.name || t('product.defaultName') || "Unnamed Product"}
                        </h3>

                        <div className="flex justify-between items-center mt-auto">
                          {isProductAvailable(product) ? (
                            <span className="text-lg sm:text-2xl font-bold text-yellow-500">
                              {formatPrice(product.price_usd)}$
                            </span>
                          ) : (
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                              {t('available') || 'Mavjud'}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {product.model_number || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Advanced Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 sm:mt-12">
                  <div className="flex items-center space-x-1 bg-white rounded-lg shadow-sm border px-2 py-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ←
                    </button>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-sm text-gray-500">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-orange-500 text-white border border-orange-500"
                                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}

              {/* Pagination Info */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-gray-600">
                  {t('page') || 'Sahifa'} {currentPage} {t('of') || 'dan'} {totalPages} 
                  {totalProducts > 0 && (
                    <span className="ml-2">
                      ({totalProducts} {t('total') || 'jami'} {t('products') || 'mahsulot'})
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 sm:py-16 bg-white rounded-xl border-2 border-orange-200 mx-2 sm:mx-0">
              <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                {t('noResults') || 'Mahsulot topilmadi'}
              </h3>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base px-4">
                {t('tryOtherKeywords') || "Qidiruv parametrlaringizni o'zgartirib ko'ring"}
              </p>
              <button
                onClick={() => handleCategoryChange("all")}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 border-2 border-orange-400 hover:border-orange-500 text-sm sm:text-base"
              >
                {t('seeAllResults') || 'Barchasini ko\'rsatish'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;