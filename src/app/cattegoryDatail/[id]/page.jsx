"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";

const CategoryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [cache, setCache] = useState({});
  const [mounted, setMounted] = useState(false);

  // Kategoriya ma'lumotlari - qisqartirilgan
  const categories = useMemo(
    () => ({
      1: {
        name: "Dizelli transportlar",
        key: "diesel",
        translations: {
          uz: "Dizelli transportlar",
          ru: "Дизельные транспорты",
          en: "Diesel Vehicles",
        },
      },
      2: {
        name: "Elektri transportlar",
        key: "Electric",
        translations: {
          uz: "Elektri transportlar",
          ru: "Электрические транспорты",
          en: "Electric Vehicles",
        },
      },
      3: {
        name: "Benzinli transportlar",
        key: "Petrol",
        translations: {
          uz: "Benzinli transportlar",
          ru: "Бензиновые транспорты",
          en: "Petrol Vehicles",
        },
      },
      4: {
        name: "LPG transportlari",
        key: "lpg",
        translations: {
          uz: "LPG transportlari",
          ru: "LPG транспорты",
          en: "LPG Vehicles",
        },
      },
      5: {
        name: "Elektr pallet yuk mashinasi",
        key: "electric pallet",
        translations: {
          uz: "Elektr pallet yuk mashinasi",
          ru: "Электрические паллетные тележки",
          en: "Electric Pallet Trucks",
        },
      },
      6: {
        name: "Elektr stacker mashinaslari",
        key: "PALLET STACKER",
        translations: {
          uz: "Elektr stacker mashinaslari",
          ru: "Электрические штабелеры",
          en: "Electric Stackers",
        },
      },
      7: {
        name: "Reach truck forklift",
        key: "REACH TRUCK",
        translations: {
          uz: "Reach truck forklift",
          ru: "Ричтраки",
          en: "Reach Truck Forklifts",
        },
      },
      8: {
        name: "Handle pallet forklift",
        key: "Handle Pallets",
        translations: {
          uz: "Qo'lda boshqariladigan pallet",
          ru: "Ручные паллетные тележки",
          en: "Handle Pallet Forklifts",
        },
      },
      9: {
        name: "Texnika extiyot qismlarin",
        key: "spare",
        translations: {
          uz: "Texnika ehtiyot qismlari",
          ru: "Запчасти для техники",
          en: "Spare Parts",
        },
      },
    }),
    []
  );

  // Hydration fix uchun mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  const lang = mounted ? i18n.language : "uz";

  const getText = useCallback(
    (key) => {
      const texts = {
        loading: { uz: "Yuklanmoqda...", ru: "Загрузка...", en: "Loading..." },
        error: { uz: "Xatolik", ru: "Ошибка", en: "Error" },
        back: { uz: "Orqaga", ru: "Назад", en: "Back" },
        no_products: {
          uz: "Mahsulotlar topilmadi",
          ru: "Товары не найдены",
          en: "No products found",
        },
        no_products_desc: {
          uz: "Ushbu kategoriyada mahsulotlar mavjud emas",
          ru: "В данной категории пока нет товаров",
          en: "No products in this category",
        },
        more_info: { uz: "Batafsil", ru: "Подробнее", en: "More Info" },
      };
      return texts[key]?.[lang] || texts[key]?.uz || key;
    },
    [lang]
  );

  const getCategoryName = useCallback(
    (category) => {
      return category?.translations?.[lang] || category?.name || "Kategoriya";
    },
    [lang]
  );

  const getProductName = useCallback(
    (product) => {
      return (
        product[`name_${lang}`] || product.name || product.title || "Mahsulot"
      );
    },
    [lang]
  );

  const fetchProducts = useCallback(
    async (categoryKey) => {
      const key = `${categoryKey}_${lang}`;
      if (cache[key]) {
        setProducts(cache[key]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Make separate calls for forklifts and spare parts
        const [forkliftsResponse, sparePartsResponse] = await Promise.all([
          fetch("https://api.jacforklift.uz/api/api/products/category/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
            body: JSON.stringify({
              category_name: categoryKey,
              lang,
              product_type: "forklifts", // Specify product type
            }),
          }).catch(() => null),

          fetch("https://api.jacforklift.uz/api/api/products/category/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
            body: JSON.stringify({
              category_name: categoryKey,
              lang,
              product_type: "spare_parts", // Specify product type
            }),
          }).catch(() => null),
        ]);

        let allProducts = [];

        // Process forklifts response
        if (forkliftsResponse && forkliftsResponse.ok) {
          const forkliftsData = await forkliftsResponse.json();
          if (forkliftsData.success && forkliftsData.data) {
            allProducts.push(...forkliftsData.data);
          } else if (forkliftsData.forklifts?.results) {
            allProducts.push(...forkliftsData.forklifts.results);
          } else if (Array.isArray(forkliftsData)) {
            allProducts.push(...forkliftsData);
          }
        }

        // Process spare parts response
        if (sparePartsResponse && sparePartsResponse.ok) {
          const sparePartsData = await sparePartsResponse.json();
          if (sparePartsData.success && sparePartsData.data) {
            allProducts.push(...sparePartsData.data);
          } else if (sparePartsData.spare_parts?.results) {
            allProducts.push(...sparePartsData.spare_parts.results);
          } else if (Array.isArray(sparePartsData)) {
            allProducts.push(...sparePartsData);
          }
        }

        // Remove duplicates
        const uniqueProducts = allProducts.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.id === product.id)
        );

        setCache((prev) => ({ ...prev, [key]: uniqueProducts }));
        setProducts(uniqueProducts);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Ma'lumot olishda xatolik");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [lang, cache]
  );

  // Kategoriya ma'lumotlarini olish
  useEffect(() => {
    if (!mounted) return;

    const category = categories[params.id];
    if (!category) {
      const saved = localStorage.getItem("selectedCategory");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCategoryInfo(parsed);
          fetchProducts(parsed.key);
          return;
        } catch (e) {}
      }
      setError("Kategoriya topilmadi");
      setLoading(false);
      return;
    }
    setCategoryInfo(category);
    fetchProducts(category.key);
  }, [params.id, categories, fetchProducts, mounted]);

  // Til o'zgarishi
  useEffect(() => {
    if (mounted && categoryInfo) {
      fetchProducts(categoryInfo.key);
    }
  }, [lang, categoryInfo, fetchProducts, mounted]);

  const handleBack = () => router.push("/");
  const handleProductClick = (productId) => {
    if (!mounted) return;

    const product = products.find((p) => p.id === productId);
    if (product) {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
    }
    router.push(`/karaDetail/${productId}`);
  };

  // Hydration mismatch oldini olish uchun
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">{getText("loading")}</p>
        </div>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">{getText("error")}</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            {getText("back")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="mr-4 p-2 hover:bg-white rounded-lg"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {getCategoryName(categoryInfo)}
            </h1>
          </div>
        </div>

        {/* Products */}
        {!products.length ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg
                fill="currentColor"
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                <circle
                  cx="50"
                  cy="30"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="35"
                  y="45"
                  width="30"
                  height="25"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="50" cy="80" r="5" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {getText("no_products")}
            </h3>
            <p className="text-gray-500 mb-6">{getText("no_products_desc")}</p>
            <button
              onClick={handleBack}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              {getText("back")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id || index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="p-4">
                  {/* Product Image */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].image}
                        alt={getProductName(product)}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : product.image ? (
                      <img
                        src={product.image}
                        alt={getProductName(product)}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}

                    {/* Fallback icon */}
                    <div
                      className="text-gray-300 flex items-center justify-center"
                      style={{
                        display:
                          (product.images && product.images.length > 0) ||
                          product.image
                            ? "none"
                            : "flex",
                      }}
                    >
                      <svg
                        className="w-20 h-20"
                        fill="currentColor"
                        viewBox="0 0 200 150"
                      >
                        <rect
                          x="10"
                          y="80"
                          width="80"
                          height="40"
                          rx="5"
                          fill="#FF6B35"
                        />
                        <rect
                          x="90"
                          y="70"
                          width="30"
                          height="50"
                          rx="3"
                          fill="#FF6B35"
                        />
                        <rect
                          x="40"
                          y="50"
                          width="35"
                          height="30"
                          rx="3"
                          fill="#333"
                          opacity="0.8"
                        />
                        <rect
                          x="115"
                          y="20"
                          width="8"
                          height="80"
                          fill="#666"
                        />
                        <rect
                          x="125"
                          y="25"
                          width="6"
                          height="70"
                          fill="#666"
                        />
                        <rect
                          x="130"
                          y="45"
                          width="40"
                          height="4"
                          fill="#666"
                        />
                        <rect
                          x="130"
                          y="55"
                          width="40"
                          height="4"
                          fill="#666"
                        />
                        <circle cx="25" cy="125" r="12" fill="#333" />
                        <circle cx="65" cy="125" r="12" fill="#333" />
                        <circle cx="105" cy="125" r="8" fill="#333" />
                        <circle cx="25" cy="125" r="8" fill="#666" />
                        <circle cx="65" cy="125" r="8" fill="#666" />
                        <circle cx="105" cy="125" r="5" fill="#666" />
                      </svg>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-semibold text-gray-800 text-base mb-3 line-clamp-2 min-h-[48px]">
                    {getProductName(product)}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    {product.price_usd && parseFloat(product.price_usd) > 0 ? (
                      <p className="text-orange-500 font-bold text-xl">
                        ${parseFloat(product.price_usd).toLocaleString()}
                      </p>
                    ) : product.price ? (
                      <p className="text-orange-500 font-bold text-xl">
                        ${parseFloat(product.price).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-lg">Narx so'rash</p>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2 mb-4">
                    {product.model_number && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Model:</span>
                        <span className="text-gray-700 font-medium">
                          {product.model_number}
                        </span>
                      </div>
                    )}

                    {product.capacity_kg && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Sig'im:</span>
                        <span className="text-gray-700 font-medium">
                          {product.capacity_kg} kg
                        </span>
                      </div>
                    )}

                    {product.engine_type && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dvigatel:</span>
                        <span className="text-gray-700 font-medium">
                          {product.engine_type}
                        </span>
                      </div>
                    )}

                    {product.manufacture_year && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Yil:</span>
                        <span className="text-gray-700 font-medium">
                          {product.manufacture_year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                      Mavjud
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    {getText("more_info")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
