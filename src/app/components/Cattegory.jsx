"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // Listen to language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [currentLang]);

  // Kategoriya key va nomlarini mapping qilish - har til uchun
  const getCategoryMapping = () => {
    const categoryMapping = {
      // Diesel kategoriyalari
      diesel: {
        uz: "Dizel vilkali yuklagich",
        en: "Diesel Forklifts",
        ru: "Дизельные погрузчики",
      },
      Diesel: {
        uz: "Dizel vilkali yuklagich",
        en: "Diesel Forklifts",
        ru: "Дизельные погрузчики",
      },
      // Electric kategoriyalari
      Electric: {
        uz: "Elektr vilkali yuklagich",
        ru: "Электрический вилочный погрузчик",
        en: "Electric Forklifts",
      },
      electric: {
        uz: "Elektr vilkali yuklagich",
        ru: "Электрический вилочный погрузчик",
        en: "Electric Forklifts",
      },
      // Petrol kategoriyalari
      Petrol: {
        uz: "Gazobenzin vilkali yuklagich",
        ru: "Газобензиновый вилочный погрузчик",
        en: "LPG Forklifts",
      },
      petrol: {
        uz: "Gazobenzin vilkali yuklagich",
        ru: "Газобензиновый вилочный погрузчик",
        en: "Gazpetrol Forklifts",
      },
      // Electric pallet
      "electric pallet": {
        uz: "Elektr pallet yuklagich",
        en: "Electric Pallet Forklifts",
        ru: "Электрический транспалет (рохля)",
      },
      "Electric pallet": {
        uz: "Elektr pallet yuklagich",
        en: "Electric Pallet Forklifts",
        ru: "Электрический транспалет (рохля)",
      },
      // Pallet stacker
      "PALLET STACKER": {
        uz: "Elektr shtabelyor",
        en: "Electric Stacker Forklifts",
        ru: "Электрические штабелеры",
      },
      "pallet stacker": {
        uz: "Elektr shtabelyor",
        en: "Electric Stacker Forklifts",
        ru: "Электрические штабелеры",
      },
      // Reach truck
      "REACH TRUCK": {
        uz: "Reach truck vilkali yuklagich",
        en: "Reach Truck Forklifts",
        ru: "Ричтрак погрузчики",
      },
      "reach truck": {
        uz: "Reach truck vilkali yuklagich",
        en: "Reach Truck Forklifts",
        ru: "Ричтрак погрузчики",
      },
      "Reach truck forklift": {
        uz: "Reach truck vilkali yuklagich",
        en: "Reach Truck Forklifts",
        ru: "Ричтрак погрузчики",
      },
      // Spare parts
      spare: {
        uz: "Vilkali yuklagich ehtiyot qismlari",
        ru: "Запчасти для вилочных погрузчиков",
        en: "Forklift Spare Parts",
      },
      "spare parts": {
        uz: "Vilkali yuklagich ehtiyot qismlari",
        ru: "Запчасти для вилочных погрузчиков",
        en: "Forklift Spare Parts",
      },
      "Texnika extiyot qismlarin": {
        uz: "Vilkali yuklagich ehtiyot qismlari",
        ru: "Запчасти для вилочных погрузчиков",
        en: "Forklift Spare Parts",
      },
      // Handle pallets
      "Handle Pallets": {
        uz: "Qo'lda boshqariladigan pallet",
        en: "Manual Pallet Trucks",
        ru: "Ручные паллетные тележки",
      },
      "handle pallets": {
        uz: "Qo'lda boshqariladigan pallet",
        en: "Manual Pallet Trucks",  
        ru: "Ручные паллетные тележки",
      }
    };

    return categoryMapping;
  };

  // Key yoki nom bo'yicha to'g'ri kategoriya nomini topish
  const getCorrectCategoryName = (key, originalName) => {
    const mapping = getCategoryMapping();

    // Avval key bo'yicha qidirish
    if (mapping[key] && mapping[key][currentLang]) {
      return mapping[key][currentLang];
    }

    // Agar key topilmasa, originalName bo'yicha qidirish
    if (mapping[originalName] && mapping[originalName][currentLang]) {
      return mapping[originalName][currentLang];
    }

    // Key va originalName ni kichik harfda qidirish
    const lowerKey = key?.toLowerCase();
    const lowerName = originalName?.toLowerCase();

    for (const [mappingKey, translations] of Object.entries(mapping)) {
      if (
        mappingKey.toLowerCase() === lowerKey ||
        mappingKey.toLowerCase() === lowerName ||
        mappingKey.toLowerCase().includes(lowerKey) ||
        lowerKey?.includes(mappingKey.toLowerCase())
      ) {
        return translations[currentLang] || originalName;
      }
    }

    // Agar hech narsa topilmasa, originalName qaytarish
    return originalName;
  };

  // Static kategoriyalar ro'yxati - LPG olib tashlandi, 8 ta qoldi
  const getStaticCategories = () => {
    const staticCategories = [
      {
        id: 101,
        key: "diesel",
        image: "/traktr.png",
      },
      {
        id: 102,
        key: "Electric",
        image: "/ev.png",
      },
      {
        id: 103,
        key: "Petrol",
        image: "/gaz.png",
      },
      {
        id: 105,
        key: "electric pallet",
        image: "/pall.png",
      },
      {
        id: 106,
        key: "pallet stacker",
        image: "/stacker.png",
      },
      {
        id: 107,
        key: "reach truck",
        image: "/reach-truck.png",
      },
      {
        id: 108,
        key: "spare",
        image: "/spare-parts.png",
      },
      {
        id: 109,
        key: "handle pallets",
        image: "/handle-pallet.png",
      }
    ];

    return staticCategories.map((cat) => ({
      ...cat,
      name: getCorrectCategoryName(cat.key, cat.key),
    }));
  };

  // Rasm yo'lini tekshirish va to'g'rilash funksiyasi
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;

    // Agar rasm yo'li to'liq URL bo'lsa
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Agar rasm yo'li / bilan boshlanmasa, qo'shish
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.log("Fetching categories with lang:", currentLang);

      const response = await fetch(
        `https://api.jacforklift.uz/api/api/forklifts/?lang=${currentLang}`
      );

      if (!response.ok) {
        throw new Error("Kategoriyalarni yuklashda xatolik");
      }

      const data = await response.json();
      console.log("API response:", data);

      // API dan kelgan ma'lumotlarni to'g'ri handle qilish
      let itemsArray = [];

      if (data.results && Array.isArray(data.results)) {
        itemsArray = data.results;
      } else if (Array.isArray(data)) {
        itemsArray = data;
      } else {
        console.log("Unexpected API response format, using static categories");
        setCategories(getStaticCategories());
        setError(null);
        setLoading(false);
        return;
      }

      let formattedCategories = [];

      if (itemsArray.length > 0) {
        // Kategoriyalar uchun unikal ma'lumotlarni ajratib olish
        const categoryMap = new Map();

        itemsArray.forEach((item, index) => {
          const categoryKey =
            item.category || item.type || item.fuel_type || "other";
          const categoryName =
            item.category_name ||
            item.type_name ||
            item.fuel_type ||
            categoryKey;

          // Kerakmas kategoriyalarni bloklash (LPG ham qo'shildi)
          const isBlockedCategory =
            // Elektr seriyasi
            categoryName === "Elektr seriyasi" ||
            categoryName === "Электр серияси" ||
            categoryName === "Электрическая серия" ||
            categoryName === "Electric series" ||
            categoryKey === "elektr_seriyasi" ||
            categoryKey === "electric_series" ||
            categoryName?.toLowerCase().includes("elektr seriyasi") ||
            categoryName?.toLowerCase().includes("электр серияси") ||
            categoryName?.toLowerCase().includes("электрическая серия") ||
            categoryName?.toLowerCase().includes("electric series") ||
            categoryName?.toLowerCase().includes("электрическая") ||
            categoryName?.toLowerCase().includes("электрическ") ||
            // Paletalar bilan ishlov berish - barcha variantlari
            categoryName === "Paletalar bilan ishlov berish" ||
            categoryName === "Обработка паллет" ||
            categoryName === "Pallet Handling" ||
            categoryKey === "pallet_handling" ||
            categoryKey === "pallet handling" ||  
            categoryName?.toLowerCase().includes("paletalar bilan ishlov") ||
            categoryName?.toLowerCase().includes("обработка паллет") ||
            categoryName?.toLowerCase().includes("pallet handling") ||
            // LPG kategoriyasini bloklash
            categoryName === "LPG" ||
            categoryName === "lpg" ||
            categoryKey === "lpg" ||
            categoryKey === "LPG" ||
            categoryName?.toLowerCase().includes("lpg") ||
            categoryName?.toLowerCase() === "lpg vilkali yuklagich" ||
            categoryName?.toLowerCase() === "lpg погрузчики" ||
            categoryName?.toLowerCase() === "lpg forklifts";

          if (isBlockedCategory) {
            console.log("🚫 BLOKLANGAN KATEGORIYA:", categoryName);
            return;
          }

          if (!categoryMap.has(categoryKey)) {
            // To'g'ri nom olish
            const correctName = getCorrectCategoryName(
              categoryKey,
              categoryName
            );

            categoryMap.set(categoryKey, {
              id: categoryMap.size + 1,
              name: correctName,
              originalName: categoryName,
              image: getImagePath(item.image || item.photo),
              key: categoryKey,
              description: item.description || null,
            });
          } else {
            const existing = categoryMap.get(categoryKey);
            // Rasm yangilash
            if (!existing.image && (item.image || item.photo)) {
              existing.image = getImagePath(item.image || item.photo);
            }
          }
        });

        formattedCategories = Array.from(categoryMap.values());
      }

      // Agar API dan kam kategoriya kelsa yoki bo'sh bo'lsa, faqat static kategoriyalarni ishlatish
      if (formattedCategories.length < 5) {
        console.log("Using static categories instead of API data");
        setCategories(getStaticCategories());
      } else {
        // API dan kelgan kategoriyalar bilan static kategoriyalarni birlashtirish
        const staticCategories = getStaticCategories();
        const existingKeys = formattedCategories.map((cat) => cat.key);

        for (const staticCat of staticCategories) {
          if (!existingKeys.includes(staticCat.key)) {
            formattedCategories.push(staticCat);
          }
        }

        // Faqat 8 ta kategoriyani olib qolish (LPG olib tashlanganidan keyin)
        setCategories(formattedCategories.slice(0, 8));
      }

      setError(null);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xato:", error);
      setError(error.message);

      // Fallback - Static kategoriyalar
      setCategories(getStaticCategories());
    } finally {
      setLoading(false);
    }
  };

  // Kategoriya bosilganda ishlaydigan funksiya
  const handleCategoryClick = (category) => {
    // Kategoriya ma'lumotlarini localStorage ga saqlash
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedCategory",
        JSON.stringify({
          id: category.id,
          name: category.name,
          key: category.key,
          image: category.image,
        })
      );
    }

    console.log("Category clicked:", category);
  };

  // Rasm yuklashda xatolik bo'lganida ishlaydi
  const handleImageError = (e, category) => {
    console.log(
      `Image failed to load for category: ${category.name}`,
      category.image
    );
    e.target.style.display = "none";
    const fallbackElement = e.target.nextElementSibling;
    if (fallbackElement) {
      fallbackElement.style.display = "flex";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 md:bg-[url('/bgimg.png')] md:bg-cover py-4 md:py-6 lg:py-12 px-4 md:px-3 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-6 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black text-center md:text-left">
              {t("categories")}
            </h1>
          </div>

          {/* Loading skeleton - 8 ta */}
          <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10 md:space-y-0">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-5 animate-pulse"
              >
                <div className="flex flex-row items-center md:flex-col">
                  <div className="flex-1 pr-6 md:pr-0 md:mb-4">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="w-16 h-8 bg-gray-200 rounded md:hidden"></div>
                  </div>
                  <div className="w-32 h-32 bg-gray-200 rounded-lg md:w-full md:h-40"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:bg-[url('/bgimg.png')] md:bg-cover py-4 md:py-6 lg:py-12 px-4 md:px-3 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-6 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black text-center md:text-left">
            {t("categories")}
          </h1>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              <p className="text-sm">{t("api_error_fallback")}</p>
            </div>
          )}
        </div>

        {/* Categories Grid - 8 ta kategoriya */}
        <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-10 md:space-y-0">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cattegoryDatail/${category.id}`}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-xl md:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-lg md:hover:shadow-2xl md:hover:shadow-orange-500/20 transition-all duration-300 md:duration-500 cursor-pointer border border-gray-100 hover:border-orange-200 md:transform md:hover:-translate-y-1 lg:hover:-translate-y-2 md:hover:scale-102 lg:hover:scale-105 group
                            flex flex-row items-center p-5 min-h-[120px]
                            md:flex-col md:items-stretch md:p-0 md:min-h-0 block"
              style={{
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
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
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => handleImageError(e, category)}
                  />
                )}

                {/* Mobile Fallback Icon */}
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{ display: category.image ? "none" : "flex" }}
                >
                  <svg
                    className="w-full h-full text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 200 150"
                  >
                    <rect
                      x="10"
                      y="80"
                      width="80"
                      height="40"
                      rx="5"
                      fill="#10B981"
                    />
                    <rect
                      x="90"
                      y="70"
                      width="30"
                      height="50"
                      rx="3"
                      fill="#10B981"
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
                    <rect x="115" y="20" width="8" height="80" fill="#666" />
                    <rect x="125" y="25" width="6" height="70" fill="#666" />
                    <rect x="130" y="45" width="40" height="4" fill="#666" />
                    <rect x="130" y="55" width="40" height="4" fill="#666" />
                    <rect
                      x="15"
                      y="85"
                      width="20"
                      height="12"
                      rx="2"
                      fill="#FFF"
                      opacity="0.9"
                    />
                    <rect
                      x="17"
                      y="87"
                      width="16"
                      height="8"
                      rx="1"
                      fill="#10B981"
                    />
                    <rect x="35" y="89" width="2" height="4" fill="#FFF" />
                    <circle cx="25" cy="125" r="12" fill="#333" />
                    <circle cx="65" cy="125" r="12" fill="#333" />
                    <circle cx="105" cy="125" r="8" fill="#333" />
                    <circle cx="25" cy="125" r="8" fill="#666" />
                    <circle cx="65" cy="125" r="8" fill="#666" />
                    <circle cx="105" cy="125" r="5" fill="#666" />
                  </svg>
                </div>
              </div>

              {/* Desktop Layout */}
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
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                        onError={(e) => handleImageError(e, category)}
                      />
                    )}

                    {/* Fallback Forklift Icon - Desktop */}
                    <div
                      className="text-center transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110"
                      style={{ display: category.image ? "none" : "flex" }}
                    >
                      <div className="w-24 h-20 sm:w-28 sm:h-22 lg:w-32 lg:h-26 xl:w-36 xl:h-30 mx-auto mb-2 flex items-center justify-center">
                        <svg
                          className="w-full h-full text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 200 150"
                        >
                          <rect
                            x="10"
                            y="80"
                            width="80"
                            height="40"
                            rx="5"
                            fill={
                              category.key === "Electric"
                                ? "#10B981"
                                : "#FF6B35"
                            }
                          />
                          <rect
                            x="90"
                            y="70"
                            width="30"
                            height="50"
                            rx="3"
                            fill={
                              category.key === "Electric"
                                ? "#10B981"
                                : "#FF6B35"
                            }
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

                          {category.key === "Electric" && (
                            <>
                              <rect
                                x="15"
                                y="85"
                                width="20"
                                height="12"
                                rx="2"
                                fill="#FFF"
                                opacity="0.9"
                              />
                              <rect
                                x="17"
                                y="87"
                                width="16"
                                height="8"
                                rx="1"
                                fill="#10B981"
                              />
                              <rect
                                x="35"
                                y="89"
                                width="2"
                                height="4"
                                fill="#FFF"
                              />
                            </>
                          )}

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
  );
};

export default Categories;