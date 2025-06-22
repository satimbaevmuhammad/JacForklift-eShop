'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

// Tillar ma'lumotlari
export const languages = {
    uz: {
        code: 'uz',
        name: 'O\'zbekcha',
        flag: '🇺🇿'
    },
    ru: {
        code: 'ru',
        name: 'Русский',
        flag: '🇷🇺'
    },
    en: {
        code: 'en',
        name: 'English',
        flag: '🇺🇸'
    }
}

// Tarjimalar - barcha kerakli so'zlar qo'shildi
const translations = {
    uz: {
        // Header
        heroTitle: "Yuqori Sifatli Ko'tarish Uskunalari",
        heroDescription: "Professional xizmat va yuqori sifat kafolati bilan premium sifatli ko'tarish uskunalari.",
        products: "Mahsulotlar",
        categories: "Kategoriyalar",

        // Kategoriyalar - asl nomlar
        "Dizelli transportlar": "Dizelli transportlar",
        "Elektri transportlar": "Elektri transportlar",
        "Benzinli transportlar": "Benzinli transportlar",
        "LPG transportlari": "LPG transportlari",
        "Elektr pallet yuk mashinasi": "Elektr pallet yuk mashinasi",
        "Elektr stacker mashinaslari": "Elektr stacker mashinaslari",
        "Reach truck forklift": "Reach truck forklift",
        "Handle pallet forklift": "Handle pallet forklift",
        "Texnika extiyot qismlarin": "Texnika extiyot qismlarin",

        // Navbar
        searchPlaceholder: "Forklift qidiruv...",
        searchPlaceholderMobile: "Qidiruv...",
        flag: "🇺🇿",

        // Search results
        searching: "Qidirilmoqda...",
        available: "Mavjud",
        noResults: "Hech narsa topilmadi",
        tryOtherKeywords: "Boshqa kalit so'zlarni sinab ko'ring",
        moreResults: "Yana",
        resultsCount: "ta natija",
        seeAllResults: "Barcha natijalarni ko'rish",

        // Common
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        contact: "Aloqa",
        services: "Xizmatlar",
        news: "Yangiliklar",
        category: "Kategoriya",
        brand: "Brend",
        price: "Narx",
        capacity: "Yuk ko'tarish qobiliyati",
        year: "Yil",
        condition: "Holati",
        location: "Joylashgan joy",
        details: "Batafsil",
        specifications: "Texnik xususiyatlari",
        description: "Tavsif",
        images: "Rasmlar",
        similar: "O'xshash mahsulotlar",
        recommend: "Tavsiya etamiz",
        new: "Yangi",
        used: "Ishlatilgan",
        ton: "tonna",
        kg: "kg",
        mm: "mm",
        loading: "Yuklanmoqda...",
        error: "Xatolik yuz berdi",
        retry: "Qayta urinish",
        success: "Muvaffaqiyatli",
        warning: "Ogohlantirish",
        info: "Ma'lumot",
        back: "Orqaga",

        // Product detail
        model: "Model",
        features: "Xususiyatlar",
        place_order: "Buyurtma berish",
        request_info: "Ma'lumot so'rash",
        related_products: "O'xshash mahsulotlar",
        loading_product: "Mahsulot yuklanmoqda...",
        product_not_found: "Mahsulot topilmadi",
        api_error_fallback: "API dan ma'lumot olishda xatolik, mahalliy ma'lumotlar ko'rsatilmoqda"
    },

    ru: {
        // Header
        heroTitle: "Высококачественное подъёмное оборудование",
        heroDescription: "Подъёмное оборудование премиум-класса с профессиональным сервисом и гарантией высокого качества.",
        products: "Продукция",
        categories: "Категории",

        // Kategoriyalar - rus tilida
        "Dizelli transportlar": "Дизельные транспортные средства",
        "Elektri transportlar": "Электрические транспортные средства",
        "Benzinli transportlar": "Бензиновые транспортные средства",
        "LPG transportlari": "Транспорт на LPG",
        "Elektr pallet yuk mashinasi": "Электрические паллетные погрузчики",
        "Elektr stacker mashinaslari": "Электрические штабелеры",
        "Reach truck forklift": "Ричтрак погрузчики",
        "Handle pallet forklift": "Ручные паллетные тележки",
        "Texnika extiyot qismlarin": "Запчасти для техники",

        // Navbar
        searchPlaceholder: "Поиск погрузчика...",
        searchPlaceholderMobile: "Поиск...",
        flag: "🇷🇺",

        // Search results
        searching: "Поиск...",
        available: "Доступно",
        noResults: "Ничего не найдено",
        tryOtherKeywords: "Попробуйте другие ключевые слова",
        moreResults: "Еще",
        resultsCount: "результатов",
        seeAllResults: "Посмотреть все результаты",

        // Common
        home: "Главная",
        about: "О нас",
        contact: "Контакты",
        services: "Услуги",
        news: "Новости",
        category: "Категория",
        brand: "Бренд",
        price: "Цена",
        capacity: "Грузоподъемность",
        year: "Год",
        condition: "Состояние",
        location: "Местоположение",
        details: "Подробнее",
        specifications: "Технические характеристики",
        description: "Описание",
        images: "Изображения",
        similar: "Похожие товары",
        recommend: "Рекомендуем",
        new: "Новый",
        used: "Б/у",
        ton: "тонн",
        kg: "кг",
        mm: "мм",
        loading: "Загрузка...",
        error: "Произошла ошибка",
        retry: "Повторить",
        success: "Успешно",
        warning: "Предупреждение",
        info: "Информация",
        back: "Назад",

        // Product detail
        model: "Модель",
        features: "Особенности",
        place_order: "Сделать заказ",
        request_info: "Запросить информацию",
        related_products: "Похожие товары",
        loading_product: "Загрузка товара...",
        product_not_found: "Товар не найден",
        api_error_fallback: "Ошибка получения данных из API, показаны локальные данные"
    },

    en: {
        // Header
        heroTitle: "High Quality Lifting Equipment",
        heroDescription: "Premium quality lifting equipment with professional service and high quality guarantee.",
        products: "Products",
        categories: "Categories",

        // Kategoriyalar - ingliz tilida
        "Dizelli transportlar": "Diesel Vehicles",
        "Elektri transportlar": "Electric Vehicles",
        "Benzinli transportlar": "Petrol Vehicles",
        "LPG transportlari": "LPG Vehicles",
        "Elektr pallet yuk mashinasi": "Electric Pallet Trucks",
        "Elektr stacker mashinaslari": "Electric Stackers",
        "Reach truck forklift": "Reach Truck Forklifts",
        "Handle pallet forklift": "Manual Pallet Trucks",
        "Texnika extiyot qismlarin": "Machinery Spare Parts",

        // Navbar
        searchPlaceholder: "Search forklift...",
        searchPlaceholderMobile: "Search...",
        flag: "🇺🇸",

        // Search results
        searching: "Searching...",
        available: "Available",
        noResults: "No results found",
        tryOtherKeywords: "Try other keywords",
        moreResults: "More",
        resultsCount: "results",
        seeAllResults: "See all results",

        // Common
        home: "Home",
        about: "About",
        contact: "Contact",
        services: "Services",
        news: "News",
        category: "Category",
        brand: "Brand",
        price: "Price",
        capacity: "Load capacity",
        year: "Year",
        condition: "Condition",
        location: "Location",
        details: "Details",
        specifications: "Specifications",
        description: "Description",
        images: "Images",
        similar: "Similar products",
        recommend: "Recommended",
        new: "New",
        used: "Used",
        ton: "ton",
        kg: "kg",
        mm: "mm",
        loading: "Loading...",
        error: "An error occurred",
        retry: "Retry",
        success: "Success",
        warning: "Warning",
        info: "Information",
        back: "Back",

        // Product detail
        model: "Model",
        features: "Features",
        place_order: "Place Order",
        request_info: "Request Information",
        related_products: "Related Products",
        loading_product: "Loading product...",
        product_not_found: "Product not found",
        api_error_fallback: "API data fetch error, showing local data"
    }
}

// Context yaratish
const LanguageContext = createContext()

// Provider component
export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState('uz')

    // Sahifa yuklanganida localStorage'dan tilni o'qish
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('language')
            if (savedLang && languages[savedLang]) {
                setCurrentLang(savedLang)
            }
        }
    }, [])

    // Tilni o'zgartirish funksiyasi
    const changeLanguage = (langCode) => {
        if (languages[langCode]) {
            setCurrentLang(langCode)
            if (typeof window !== 'undefined') {
                localStorage.setItem('language', langCode)
            }
        }
    }

    // Hozirgi tilning tarjimasini olish
    const t = translations[currentLang] || translations.uz

    // Context qiymati
    const value = {
        currentLang,
        changeLanguage,
        t,
        languages,
        translations
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

// Hook'ni export qilish
export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export default LanguageContext