// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language configuration
export const languages = {
    uz: { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    en: { code: 'en', name: 'English', flag: '🇺🇸' }
};

// Translation resources
const resources = {
    uz: {
        translation: {
            // Categories
            "Dizelli transportlar": "Dizelli transportlar",
            "Elektri transportlar": "Elektri transportlar",
            "Benzinli transportlar": "Benzinli transportlar",
            "LPG transportlari": "LPG transportlari",
            "Elektr pallet yuk mashinasi": "Elektr pallet yuk mashinasi",
            "Elektr stacker mashinaslari": "Elektr stacker mashinaslari",
            "Reach truck forklift": "Reach truck forklift",
            "Handle pallet forklift": "Handle pallet forklift",
            "Texnika extiyot qismlarin": "Texnika extiyot qismlarin",

            // Common
            "categories": "Kategoriyalar",
            "heroTitle": "Yuqori Sifatli Ko'tarish Uskunalari",
            "heroDescription": "Professional xizmat va yuqori sifat kafolati bilan premium sifatli ko'tarish uskunalari.",
            "products": "Mahsulotlar",
            "searchPlaceholder": "Forkliftlarni qidiring...",
            "searchPlaceholderMobile": "Qidirish...",
            "searching": "Qidirilmoqda...",
            "available": "Mavjud",
            "noResults": "Bu kategoriyada mahsulotlar topilmadi",
            "tryOtherKeywords": "Tez orada yangi mahsulotlar qo'shiladi",
            "moreResults": "Yana",
            "resultsCount": "ta natija",
            "seeAllResults": "Barcha natijalarni ko'rish",
            "phone": "+998 94 987 60 00",
            "call": "Qo'ng'iroq qilish",
            "contact": "Bog'lanish",
            "home": "Bosh sahifa",
            "about": "Biz haqimizda",
            "services": "Xizmatlar",
            "gallery": "Galereya",
            "news": "Yangiliklar",
            "catalog": "Katalog",
            "rent": "Ijaraga berish",
            "sale": "Sotish",
            "maintenance": "Texnik xizmat",
            "spare_parts": "Ehtiyot qismlar",
            "consultation": "Konsultatsiya",
            "free_consultation": "Bepul konsultatsiya",
            "order": "Buyurtma berish",
            "more_info": "Batafsil ma'lumot",
            "specifications": "Texnik xususiyatlar",
            "capacity": "Yuk ko'tarish qobiliyati",
            "weight": "Og'irlik",
            "height": "Balandlik",
            "length": "Uzunlik",
            "width": "Kenglik",
            "engine": "Dvigatel",
            "fuel": "Yoqilg'i",
            "speed": "Tezlik",
            "year": "Yil",
            "condition": "Holati",
            "new": "Yangi",
            "used": "Ishlatilgan",
            "excellent": "A'lo",
            "good": "Yaxshi",
            "price": "Narx",
            "currency": "so'm",
            "per_day": "kuniga",
            "per_month": "oyiga",
            "contact_us": "Biz bilan bog'laning",
            "get_quote": "Narx so'rash",
            "view_details": "Batafsil ko'rish",
            "back": "Orqaga",
            "loading": "Yuklanmoqda...",
            "error": "Xatolik",
            "retry": "Qayta urinish",
            "open_menu": "Menyuni ochish",
            "loading_product": "Mahsulot yuklanmoqda...",
            "product_not_found": "Mahsulot topilmadi",
            "description": "Tavsif",
            "features": "Xususiyatlari",
            "model": "Model",
            "place_order": "Buyurtma berish",
            "request_info": "Ma'lumot so'rash",
            "related_products": "O'xshash mahsulotlar",
            "api_error_fallback": "API dan ma'lumot olishda xatolik, mahalliy ma'lumotlar ko'rsatilmoqda",
            "ton": "tonna",

            // Footer tarjimalari
            "footer": {
                "copyright": "JAC Forklift © 2024. Barcha huquqlar himoyalangan",
                "social": {
                    "telegram": "Telegram kanalimiz",
                    "instagram": "Instagram sahifamiz",
                    "youtube": "YouTube kanalimiz",
                    "facebook": "Facebook sahifamiz"
                }
            },

            // Product details
            "product": {
                "defaultName": "Forklift",
                "loading": "Mahsulot yuklanmoqda...",
                "model": "Model",
                "price": "Narx",
                "description": "Tavsif",
                "specifications": "Texnik xususiyatlar",
                "features": "Xususiyatlar",
                "relatedProducts": "O'xshash mahsulotlar",
                "actions": {
                    "placeOrder": "Buyurtma berish",
                    "requestInfo": "Ma'lumot so'rash"
                },
                "errors": {
                    "loadFailed": "Mahsulotni yuklashda xatolik",
                    "notFound": "Mahsulot topilmadi"
                },
                "specs": {
                    "capacity_kg": "Yuk ko'tarish qobiliyati",
                    "lift_height": "Ko'tarish balandligi",
                    "fuel_type": "Yoqilg'i turi",
                    "engine_power": "Dvigatel quvvati",
                    "weight": "Og'irlik",
                    "length": "Uzunlik",
                    "width": "Kenglik",
                    "height": "Balandlik"
                }
            },

            // Common actions
            "common": {
                "back": "Orqaga",
                "retry": "Qayta urinish",
                "loading": "Yuklanmoqda...",
                "error": "Xatolik",
                "success": "Muvaffaqiyatli"
            }
        }
    },
    ru: {
        translation: {
            // Categories
            "Dizelli transportlar": "Дизельные транспортные средства",
            "Elektri transportlar": "Электрические транспортные средства",
            "Benzinli transportlar": "Бензиновые транспортные средства",
            "LPG transportlari": "Транспорт на LPG",
            "Elektr pallet yuk mashinasi": "Электрические паллетные погрузчики",
            "Elektr stacker mashinaslari": "Электрические штабелеры",
            "Reach truck forklift": "Ричтрак погрузчики",
            "Handle pallet forklift": "Ручные паллетные тележки",
            "Texnika extiyot qismlarin": "Запчасти для техники",

            // Common
            "categories": "Категории",
            "heroTitle": "Высококачественное подъёмное оборудование",
            "heroDescription": "Подъёмное оборудование премиум-класса с профессиональным сервисом и гарантией высокого качества.",
            "products": "Товары",
            "searchPlaceholder": "Поиск погрузчиков...",
            "searchPlaceholderMobile": "Поиск...",
            "searching": "Поиск...",
            "available": "Доступно",
            "noResults": "В этой категории товары не найдены",
            "tryOtherKeywords": "Скоро будут добавлены новые товары",
            "moreResults": "Еще",
            "resultsCount": "результатов",
            "seeAllResults": "Посмотреть все результаты",
            "phone": "+998 94 987 60 00",
            "call": "Позвонить",
            "contact": "Контакт",
            "home": "Главная",
            "about": "О нас",
            "services": "Услуги",
            "gallery": "Галерея",
            "news": "Новости",
            "catalog": "Каталог",
            "rent": "Аренда",
            "sale": "Продажа",
            "maintenance": "Техническое обслуживание",
            "spare_parts": "Запчасти",
            "consultation": "Консультация",
            "free_consultation": "Бесплатная консультация",
            "order": "Заказать",
            "more_info": "Подробная информация",
            "specifications": "Технические характеристики",
            "capacity": "Грузоподъемность",
            "weight": "Вес",
            "height": "Высота",
            "length": "Длина",
            "width": "Ширина",
            "engine": "Двигатель",
            "fuel": "Топливо",
            "speed": "Скорость",
            "year": "Год",
            "condition": "Состояние",
            "new": "Новый",
            "used": "Б/У",
            "excellent": "Отличное",
            "good": "Хорошее",
            "price": "Цена",
            "currency": "сум",
            "per_day": "в день",
            "per_month": "в месяц",
            "contact_us": "Свяжитесь с нами",
            "get_quote": "Запросить цену",
            "view_details": "Подробнее",
            "back": "Назад",
            "loading": "Загрузка...",
            "error": "Ошибка",
            "retry": "Повторить",
            "open_menu": "Открыть меню",
            "loading_product": "Загрузка товара...",
            "product_not_found": "Товар не найден",
            "description": "Описание",
            "features": "Особенности",
            "model": "Модель",
            "place_order": "Сделать заказ",
            "request_info": "Запросить информацию",
            "related_products": "Похожие товары",
            "api_error_fallback": "Ошибка получения данных из API, показаны локальные данные",
            "ton": "тонн",

            // Footer tarjimalari
            "footer": {
                "copyright": "JAC Forklift © 2024. Все права защищены",
                "social": {
                    "telegram": "Наш Telegram канал",
                    "instagram": "Наша страница Instagram",
                    "youtube": "Наш YouTube канал",
                    "facebook": "Наша страница Facebook"
                }
            },

            // Product details
            "product": {
                "defaultName": "Погрузчик",
                "loading": "Загрузка товара...",
                "model": "Модель",
                "price": "Цена",
                "description": "Описание",
                "specifications": "Технические характеристики",
                "features": "Особенности",
                "relatedProducts": "Похожие товары",
                "actions": {
                    "placeOrder": "Сделать заказ",
                    "requestInfo": "Запросить информацию"
                },
                "errors": {
                    "loadFailed": "Ошибка загрузки товара",
                    "notFound": "Товар не найден"
                },
                "specs": {
                    "capacity_kg": "Грузоподъемность",
                    "lift_height": "Высота подъема",
                    "fuel_type": "Тип топлива",
                    "engine_power": "Мощность двигателя",
                    "weight": "Вес",
                    "length": "Длина",
                    "width": "Ширина",
                    "height": "Высота"
                }
            },

            // Common actions
            "common": {
                "back": "Назад",
                "retry": "Повторить",
                "loading": "Загрузка...",
                "error": "Ошибка",
                "success": "Успешно"
            }
        }
    },
    en: {
        translation: {
            // Categories
            "Dizelli transportlar": "Diesel Vehicles",
            "Elektri transportlar": "Electric Vehicles",
            "Benzinli transportlar": "Petrol Vehicles",
            "LPG transportlari": "LPG Vehicles",
            "Elektr pallet yuk mashinasi": "Electric Pallet Trucks",
            "Elektr stacker mashinaslari": "Electric Stackers",
            "Reach truck forklift": "Reach Truck Forklifts",
            "Handle pallet forklift": "Manual Pallet Trucks",
            "Texnika extiyot qismlarin": "Machinery Spare Parts",

            // Common
            "categories": "Categories",
            "heroTitle": "High Quality Lifting Equipment",
            "heroDescription": "Premium quality lifting equipment with professional service and high quality guarantee.",
            "products": "Products",
            "searchPlaceholder": "Search forklifts...",
            "searchPlaceholderMobile": "Search...",
            "searching": "Searching...",
            "available": "Available",
            "noResults": "No products found in this category",
            "tryOtherKeywords": "New products will be added soon",
            "moreResults": "More",
            "resultsCount": "results",
            "seeAllResults": "See all results",
            "phone": "+998 94 987 60 00",
            "call": "Call",
            "contact": "Contact",
            "home": "Home",
            "about": "About Us",
            "services": "Services",
            "gallery": "Gallery",
            "news": "News",
            "catalog": "Catalog",
            "rent": "Rent",
            "sale": "Sale",
            "maintenance": "Maintenance",
            "spare_parts": "Spare Parts",
            "consultation": "Consultation",
            "free_consultation": "Free Consultation",
            "order": "Order",
            "more_info": "More Information",
            "specifications": "Specifications",
            "capacity": "Load Capacity",
            "weight": "Weight",
            "height": "Height",
            "length": "Length",
            "width": "Width",
            "engine": "Engine",
            "fuel": "Fuel",
            "speed": "Speed",
            "year": "Year",
            "condition": "Condition",
            "new": "New",
            "used": "Used",
            "excellent": "Excellent",
            "good": "Good",
            "price": "Price",
            "currency": "UZS",
            "per_day": "per day",
            "per_month": "per month",
            "contact_us": "Contact Us",
            "get_quote": "Get Quote",
            "view_details": "View Details",
            "back": "Back",
            "loading": "Loading...",
            "error": "Error",
            "retry": "Retry",
            "open_menu": "Open menu",
            "loading_product": "Loading product...",
            "product_not_found": "Product not found",
            "description": "Description",
            "features": "Features",
            "model": "Model",
            "place_order": "Place Order",
            "request_info": "Request Information",
            "related_products": "Related Products",
            "api_error_fallback": "API data fetch error, showing local data",
            "ton": "ton",

            // Footer tarjimalari  
            "footer": {
                "copyright": "JAC Forklift © 2024. All rights reserved",
                "social": {
                    "telegram": "Our Telegram channel",
                    "instagram": "Our Instagram page",
                    "youtube": "Our YouTube channel",
                    "facebook": "Our Facebook page"
                }
            },

            // Product details
            "product": {
                "defaultName": "Forklift",
                "loading": "Loading product...",
                "model": "Model",
                "price": "Price",
                "description": "Description",
                "specifications": "Specifications",
                "features": "Features",
                "relatedProducts": "Related Products",
                "actions": {
                    "placeOrder": "Place Order",
                    "requestInfo": "Request Information"
                },
                "errors": {
                    "loadFailed": "Failed to load product",
                    "notFound": "Product not found"
                },
                "specs": {
                    "capacity_kg": "Load Capacity",
                    "lift_height": "Lift Height",
                    "fuel_type": "Fuel Type",
                    "engine_power": "Engine Power",
                    "weight": "Weight",
                    "length": "Length",
                    "width": "Width",
                    "height": "Height"
                }
            },

            // Common actions
            "common": {
                "back": "Back",
                "retry": "Retry",
                "loading": "Loading...",
                "error": "Error",
                "success": "Success"
            }
        }
    }
};

// Get saved language from localStorage
const getSavedLanguage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('language') || 'uz';
    }
    return 'uz';
};

// Initialize i18n
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getSavedLanguage(),
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

// Language change function with localStorage sync
export const changeLanguage = (langCode) => {
    if (languages[langCode]) {
        i18n.changeLanguage(langCode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', langCode);
            // Trigger storage event for other tabs
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'language',
                newValue: langCode
            }));
        }
    }
};

export default i18n;