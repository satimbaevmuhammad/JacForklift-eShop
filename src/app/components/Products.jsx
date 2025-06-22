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

  // Load more states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

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
    fetchInitialData();
  }, [currentLang]); // Refetch when language changes

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategory]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API request with language parameter
      const productsResponse = await fetch(
        `https://api.jacforklift.uz/api/api/forklifts/?page=1&page_size=10&lang=${currentLang}`
      );

      if (!productsResponse.ok) {
        throw new Error(`HTTP error! status: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      console.log("API Response:", productsData);

      const forklifts = productsData.results || [];
      setAllProducts(forklifts);
      setProducts(forklifts);

      // Check if there are more items
      setHasMore(productsData.next !== null);

      if (!forklifts.length) {
        console.warn("No forklifts found in API response");
      }

      // Fetch all products for categories with language parameter
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
        }));
        setCategories(categoriesData);
      }

      setCurrentPage(1); // Reset page when language changes
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(t('error') || "Ma'lumotlarni yuklashda xato yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;

      // API request with language parameter
      const productsResponse = await fetch(
        `https://api.jacforklift.uz/api/api/forklifts/?page=${nextPage}&page_size=10&lang=${currentLang}`
      );

      if (!productsResponse.ok) {
        throw new Error(`HTTP error! status: ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();
      const newForklifts = productsData.results || [];

      if (newForklifts.length > 0) {
        setAllProducts(prev => [...prev, ...newForklifts]);
        setCurrentPage(nextPage);
        setHasMore(productsData.next !== null);
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    } catch (error) {
      console.error("Error loading more products:", error);
      setLoadingMore(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.forklift_type &&
          product.forklift_type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
            onClick={fetchInitialData}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            {t('retry') || 'Qayta urinish'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
              {t('products') || 'Mahsulotlar'}
            </h1>
            <button
              onClick={() => handleCategoryChange("all")}
              className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors border-2 border-orange-400 hover:border-orange-500 text-sm sm:text-base"
            >
              {t('seeAllResults') || 'Barchasi'} →
            </button>
          </div>
          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base ${selectedCategory === "all"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 border-2 border-orange-400 hover:border-orange-500"
                }`}
            >
              {t('seeAllResults') || 'Hammasi'}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base ${selectedCategory === category.name.toLowerCase()
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 border-2 border-orange-400 hover:border-orange-500"
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

              {/* Load More Button */}
              {hasMore && selectedCategory === "all" && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMoreProducts}
                    disabled={loadingMore}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                        <span>{t('loading') || 'Yuklanmoqda...'}</span>
                      </div>
                    ) : (
                      t('moreResults') || "Показать ещё 10"
                    )}
                  </button>
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