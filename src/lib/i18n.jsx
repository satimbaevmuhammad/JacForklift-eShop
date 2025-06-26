// lib/i18n.js - To'liq versiya
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
            // Kategoriyalar
            "Dizelli transportlar": "Dizelli transportlar",
            "Elektri transportlar": "Elektri transportlar", 
            "Benzinli transportlar": "Benzinli transportlar",
            "LPG transportlari": "LPG transportlari",
            "Elektr pallet yuk mashinasi": "Elektr pallet yuk mashinasi",
            "Elektr stacker mashinaslari": "Elektr stacker mashinaslari",
            "Reach truck forklift": "Reach truck forklift",
            "Handle pallet forklift": "Handle pallet forklift",
            "Texnika extiyot qismlarin": "Texnika extiyot qismlarin",

            // Asosiy
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
            "phone": "+998983095550",
            "call": "Qo'ng'iroq qilish",
            "contact": "Bog'lanish",
            
            // Navigatsiya
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
            
            // Texnik xususiyatlar
            "specifications": "Texnik xususiyatlar",
            "technical_specifications": "Texnik xususiyatlari",
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
            
            // Harakatlar
            "contact_us": "Biz bilan bog'laning",
            "get_quote": "Narx so'rash",
            "view_details": "Batafsil ko'rish",
            "back": "Orqaga",
            "loading": "Yuklanmoqda...",
            "error": "Xatolik",
            "retry": "Qayta urinish",
            "open_menu": "Menyuni ochish",
            "loading_product": "Mahsulot yuklanmoqda...",
            
            // Mahsulot tafsilotlari
            "product_not_found": "Mahsulot topilmadi",
            "product_not_available": "Ushbu mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin",
            "return_to_products": "Barcha mahsulotlarga qaytish",
            "go_back": "Orqaga qaytish",
            "description": "Tavsif",
            "features": "Xususiyatlar",
            "model": "Model",
            "lifting_capacity": "Ko'tarish qobiliyati",
            "fuel_type": "Yoqilg'i turi",
            "engine_type": "Dvigatel",
            "manufacture_year": "Ishlab chiqarilgan yili",
            "availability": "Mavjudligi",
            "place_order": "Buyurtma berish",
            "request_info": "Ma'lumot so'rash",
            "related_products": "Mahsulotlar",
            "purchase": "Sotib olish",
            
            // Modal va formalar
            "phone_number": "Telefon raqam",
            "enter_phone": "Sotib olish uchun telefon raqamingizni qoldiring!",
            "contact_message": "Telefon raqamingizni yuboring. Biz siz bilan tez orada bog'lanamiz",
            "successfully_sent": "Muvaffaqiyatli yuborildi!",
            "will_contact_soon": "Tez orada siz bilan bog'lanamiz",
            "window_closes": "Bu oyna 3 soniyadan keyin yopiladi...",
            "submitting": "Yuborilmoqda...",
            "enter_full_phone": "Telefon raqamini to'liq kiriting",
            "phone_incomplete": "Telefon raqam to'liq emas",
            "message_send_error": "Xabar yuborishda xatolik yuz berdi",
            "network_error": "Internet aloqasida xatolik. Qaytadan urinib ko'ring.",
            
            // Xususiyatlar
            "ton_capacity": "ton ko'tarish qobiliyati",
            "economic_fuel": "Ekonomik yoqilg'i sarfi",
            "eco_clean": "Ekologik toza ishlash",
            "ergonomic_panel": "Ergonomik boshqaruv paneli",
            "safety_system": "Xavfsizlik tizimi",
            "easy_maintenance": "Oson texnik xizmat ko'rsatish",
            "diesel_engine": "dvigatel",
            "electric_tractor": "ELEKTR TRAKTOR",
            "distance_between_centers": "YUKI MARKAZLARI ORASIDAGI MASOFA",
            
            // API va xatolar
            "api_error_fallback": "API dan ma'lumot olishda xatolik, mahalliy ma'lumotlar ko'rsatilmoqda",
            "ton": "tonna",
            
            // Footer
            "footer": {
                "copyright": "JAC Forklift © 2024. Barcha huquqlar himoyalangan",
                "social": {
                    "telegram": "Telegram kanalimiz",
                    "instagram": "Instagram sahifamiz",
                    "youtube": "YouTube kanalimiz",
                    "facebook": "Facebook sahifamiz"
                }
            },
            
            // Umumiy
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
            // Kategoriyalar
            "Dizelli transportlar": "Дизельный вилочный погрузчик",
            "Elektri transportlar": "Электрические транспортные средства",
            "Benzinli transportlar": "Бензиновые транспортные средства",
            "LPG transportlari": "Транспорт на LPG",
            "Elektr pallet yuk mashinasi": "Электрические паллетные погрузчики",
            "Elektr stacker mashinaslari": "Электрические штабелеры",
            "Reach truck forklift": "Ричтрак погрузчики",
            "Handle pallet forklift": "Ручные паллетные тележки",
            "Texnika extiyot qismlarin": "Запчасти для техники",

            // Asosiy
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
            "phone": "+998983095550",
            "call": "Позвонить",
            "contact": "Контакт",
            
            // Navigatsiya
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
            
            // Texnik xususiyatlar
            "specifications": "Технические характеристики",
            "technical_specifications": "Технические характеристики",
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
            
            // Harakatlar
            "contact_us": "Свяжитесь с нами",
            "get_quote": "Запросить цену",
            "view_details": "Подробнее",
            "back": "Назад",
            "loading": "Загрузка...",
            "error": "Ошибка",
            "retry": "Повторить",
            "open_menu": "Открыть меню",
            "loading_product": "Загрузка товара...",
            
            // Mahsulot tafsilotlari
            "product_not_found": "Товар не найден",
            "product_not_available": "Данный товар недоступен или может быть удален",
            "return_to_products": "Вернуться ко всем товарам",
            "go_back": "Вернуться назад",
            "description": "Описание",
            "features": "Особенности",
            "model": "Модель",
            "lifting_capacity": "Грузоподъемность",
            "fuel_type": "Тип топлива",
            "engine_type": "Двигатель",
            "manufacture_year": "Год производства",
            "availability": "Наличие",
            "place_order": "Сделать заказ",
            "request_info": "Запросить информацию",
            "related_products": "Похожие товары",
            "purchase": "Покупка",
            
            // Modal va formalar
            "phone_number": "Номер телефона",
            "enter_phone": "Оставьте свой номер телефона для покупки!",
            "contact_message": "Отправьте свой номер телефона. Мы свяжемся с вами в ближайшее время",
            "successfully_sent": "Успешно отправлено!",
            "will_contact_soon": "Мы свяжемся с вами в ближайшее время",
            "window_closes": "Это окно закроется через 3 секунды...",
            "submitting": "Отправка...",
            "enter_full_phone": "Введите полный номер телефона",
            "phone_incomplete": "Номер телефона неполный",
            "message_send_error": "Произошла ошибка при отправке сообщения",
            "network_error": "Ошибка интернет-соединения. Попробуйте еще раз.",
            
            // Xususiyatlar
            "ton_capacity": "тонн грузоподъемность",
            "economic_fuel": "Экономичный расход топлива",
            "eco_clean": "Экологически чистая работа",
            "ergonomic_panel": "Эргономичная панель управления",
            "safety_system": "Система безопасности",
            "easy_maintenance": "Легкое техническое обслуживание",
            "diesel_engine": "двигатель",
            "electric_tractor": "ЭЛЕКТРИЧЕСКИЙ ТРАКТОР",
            "distance_between_centers": "РАССТОЯНИЕ МЕЖДУ ЦЕНТРОМ НАГРУЗКИ",
            
            // API va xatolar
            "api_error_fallback": "Ошибка получения данных из API, показаны локальные данные",
            "ton": "тонн",
            
            // Footer
            "footer": {
                "copyright": "JAC Forklift © 2024. Все права защищены",
                "social": {
                    "telegram": "Наш Telegram канал",
                    "instagram": "Наша страница Instagram",
                    "youtube": "Наш YouTube канал",
                    "facebook": "Наша страница Facebook"
                }
            },
            
            // Umumiy
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
            // Kategoriyalar
            "Dizelli transportlar": "Diesel Vehicles",
            "Elektri transportlar": "Electric Vehicles",
            "Benzinli transportlar": "Petrol Vehicles",
            "LPG transportlari": "LPG Vehicles",
            "Elektr pallet yuk mashinasi": "Electric Pallet Trucks",
            "Elektr stacker mashinaslari": "Electric Stackers",
            "Reach truck forklift": "Reach Truck Forklifts",
            "Handle pallet forklift": "Manual Pallet Trucks",
            "Texnika extiyot qismlarin": "Machinery Spare Parts",

            // Asosiy
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
            "phone": "+998983095550",
            "call": "Call",
            "contact": "Contact",
            
            // Navigatsiya
            "home": "Home",
            "about": "About Us",
            "services": "Services",
            "gallery": "Gallery",
            "news": "News",
            "catalog": "Catalog",
            "rent": "Rental",
            "sale": "Sale",
            "maintenance": "Maintenance",
            "spare_parts": "Spare Parts",
            "consultation": "Consultation",
            "free_consultation": "Free Consultation",
            "order": "Place Order",
            "more_info": "More Information",
            
            // Texnik xususiyatlar
            "specifications": "Specifications",
            "technical_specifications": "Technical Specifications",
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
            
            // Harakatlar
            "contact_us": "Contact Us",
            "get_quote": "Get Quote",
            "view_details": "View Details",
            "back": "Back",
            "loading": "Loading...",
            "error": "Error",
            "retry": "Retry",
            "open_menu": "Open menu",
            "loading_product": "Loading product...",
            
            // Mahsulot tafsilotlari
            "product_not_found": "Product Not Found",
            "product_not_available": "This product is not available or may have been removed",
            "return_to_products": "Return to All Products",
            "go_back": "Go Back",
            "description": "Description",
            "features": "Features",
            "model": "Model",
            "lifting_capacity": "Lifting Capacity",
            "fuel_type": "Fuel Type",
            "engine_type": "Engine Type",
            "manufacture_year": "Manufacturing Year",
            "availability": "Availability",
            "place_order": "Place Order",
            "request_info": "Request Information",
            "related_products": "Related Products",
            "purchase": "Purchase",
            
            // Modal va formalar
            "phone_number": "Phone Number",
            "enter_phone": "Leave your phone number to purchase!",
            "contact_message": "Send your phone number. We will contact you soon",
            "successfully_sent": "Successfully Sent!",
            "will_contact_soon": "We will contact you soon",
            "window_closes": "This window will close in 3 seconds...",
            "submitting": "Submitting...",
            "enter_full_phone": "Enter complete phone number",
            "phone_incomplete": "Phone number is incomplete",
            "message_send_error": "Error occurred while sending message",
            "network_error": "Network connection error. Please try again.",
            
            // Xususiyatlar
            "ton_capacity": "ton lifting capacity",
            "economic_fuel": "Economic fuel consumption",
            "eco_clean": "Eco-friendly operation",
            "ergonomic_panel": "Ergonomic control panel",
            "safety_system": "Safety system",
            "easy_maintenance": "Easy maintenance",
            "diesel_engine": "engine",
            "electric_tractor": "ELECTRIC TRACTOR",
            "distance_between_centers": "DISTANCE BETWEEN LOAD CENTERS",
            
            // API va xatolar
            "api_error_fallback": "API data fetch error, showing local data",
            "ton": "ton",
            
            // Footer
            "footer": {
                "copyright": "JAC Forklift © 2024. All rights reserved",
                "social": {
                    "telegram": "Our Telegram channel",
                    "instagram": "Our Instagram page",
                    "youtube": "Our YouTube channel",
                    "facebook": "Our Facebook page"
                }
            },
            
            // Umumiy
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