"use client"
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  
  // Built-in translations
  const translations = {
    uz: {
      title: "Aloqa",
      subtitle: "JAC Forklift - ishonchli hamkor. Savollaringiz bo'lsa, biz bilan bog'laning!",
      address: {
        title: "Bizning manzilimiz",
        country: "O'zbekiston",
        city: "Toshkent shahri",
        district: "Sergeli tumani",
        street: "Kipchak 56 kesishmasi",
        orderTaxi: "Taksi chaqirish"
      },
      phone: {
        title: "Telefon raqamlarimiz"
      },
      telegram: {
        title: "Telegram"
      },
      email: {
        title: "Email"
      },
      instagram: {
        title: "Instagram"
      },
      workingHours: {
        title: "Ish vaqti",
        weekdays: "Dushanba - Juma",
        saturday: "Shanba",
        sunday: "Yakshanba"
      },
      map: {
        title: "Bizning joylashuvimiz"
      },
      quickContact: {
        title: "Tezkor bog'lanish",
        subtitle: "Sizda shoshilinch savol bormi? Bizning mutaxassislarimiz bilan darhol bog'laning!",
        call: "Qo'ng'iroq qilish",
        telegram: "Telegram orqali"
      }
    },
    ru: {
      title: "Контакты",
      subtitle: "JAC Forklift - надежный партнер. Если у вас есть вопросы, свяжитесь с нами!",
      address: {
        title: "Наш адрес",
        country: "Узбекистан",
        city: "г. Ташкент",
        district: "Сергелийский район",
        street: "Пересечение Кипчак 56",
        orderTaxi: "Заказать такси"
      },
      phone: {
        title: "Телефоны"
      },
      telegram: {
        title: "Telegram"
      },
      email: {
        title: "Email"
      },
      instagram: {
        title: "Instagram"
      },
      workingHours: {
        title: "Режим работы",
        weekdays: "Понедельник - Пятница",
        saturday: "Суббота",
        sunday: "Воскресенье"
      },
      map: {
        title: "Наше местоположение"
      },
      quickContact: {
        title: "Быстрая связь",
        subtitle: "У вас есть срочный вопрос? Свяжитесь с нашими специалистами прямо сейчас!",
        call: "Позвонить",
        telegram: "Написать в Telegram"
      }
    },
    en: {
      title: "Contact",
      subtitle: "JAC Forklift - reliable partner. If you have questions, contact us!",
      address: {
        title: "Our Address",
        country: "Uzbekistan",
        city: "Tashkent city",
        district: "Sergeli district",
        street: "Kipchak 56 intersection",
        orderTaxi: "Order taxi"
      },
      phone: {
        title: "Phone Numbers"
      },
      telegram: {
        title: "Telegram"
      },
      email: {
        title: "Email"
      },
      instagram: {
        title: "Instagram"
      },
      workingHours: {
        title: "Working Hours",
        weekdays: "Monday - Friday",
        saturday: "Saturday",
        sunday: "Sunday"
      },
      map: {
        title: "Our Location"
      },
      quickContact: {
        title: "Quick Contact",
        subtitle: "Do you have an urgent question? Contact our specialists right now!",
        call: "Call",
        telegram: "Write to Telegram"
      }
    }
  };

  // Get current language, fallback to 'uz' if not found
  const currentLang = i18n.language || 'uz';
  const getText = (key) => {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback to uzbek if translation not found
    if (!value) {
      value = translations['uz'];
      for (const k of keys) {
        value = value?.[k];
      }
    }
    
    return value || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {currentLang === 'uz' ? 'Orqaga' : currentLang === 'ru' ? 'Назад' : 'Back'}
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {getText('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {getText('subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {getText('address.title')}
                </h3>
                <div className="text-gray-700 mb-4 leading-relaxed">
                  <p>{getText('address.country')}</p>
                  <p>{getText('address.city')}</p>
                  <p>{getText('address.district')}</p>
                  <p>{getText('address.street')}</p>
                </div>
                <div className="space-y-3">
                  {/* Yandex Taxi */}
                  <button
                    onClick={() => {
                      const address = "Toshkent, Sergeli tumani, Kipchak 56 kesishmasi";
                      const coordinates = "41.238181818299225,69.27453503862179";
                      
                      // Mobile uchun deep link
                      const yandexApp = `yandextaxi://external?service=taxi&end-address=${encodeURIComponent(address)}&end-lat=41.238181818299225&end-lon=69.27453503862179`;
                      // Web uchun URL
                      const yandexWeb = `https://taxi.yandex.uz/?rtext=~${coordinates}`;
                      
                      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                      
                      if (isMobile) {
                        window.location.href = yandexApp;
                        setTimeout(() => {
                          window.open(yandexWeb, '_blank');
                        }, 1500);
                      } else {
                        window.open(yandexWeb, '_blank');
                      }
                    }}
                    className="w-full inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Yandex Taxi
                  </button>
                  
                  {/* MyTaxi (UzbekTaxi) */}
                  <button
                    onClick={() => {
                      const address = "Toshkent, Sergeli tumani, Kipchak 56 kesishmasi";
                      // MyTaxi deep link
                      const myTaxiApp = `mytaxi://order?destination=${encodeURIComponent(address)}&destination_lat=41.238181818299225&destination_lng=69.27453503862179`;
                      window.location.href = myTaxiApp;
                    }}
                    className="w-full inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    MyTaxi
                  </button>
                  
                  {/* Bolt */}
                  <button
                    onClick={() => {
                      const boltApp = `bolt://setPickup?end_lat=41.238181818299225&end_lng=69.27453503862179&end_address=${encodeURIComponent("Toshkent, Sergeli tumani, Kipchak 56 kesishmasi")}`;
                      window.location.href = boltApp;
                    }}
                    className="w-full inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Bolt
                  </button>
                  
                  {/* Maps fallback */}
                  <button
                    onClick={() => {
                      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                      const coordinates = "41.238181818299225,69.27453503862179";
                      
                      if (isMobile) {
                        // Android uchun Google Maps
                        if (/Android/i.test(navigator.userAgent)) {
                          window.location.href = `google.navigation:q=${coordinates}`;
                        } 
                        // iOS uchun Apple Maps
                        else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                          window.location.href = `maps://maps.apple.com/?daddr=${coordinates}`;
                        }
                      } else {
                        // Desktop uchun Google Maps
                        window.open(`https://www.google.com/maps/dir//${coordinates}`, '_blank');
                      }
                    }}
                    className="w-full inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 font-semibold text-sm bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {currentLang === 'uz' ? 'Xaritada ko\'rish' : currentLang === 'ru' ? 'Показать на карте' : 'Show on Map'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Numbers Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {getText('phone.title')}
                </h3>
                <div className="space-y-2">
                  <a href="tel:+998983095550" className="block text-gray-700 hover:text-green-600 transition-colors font-medium">
                    +998 98 309 55 50
                  </a>
                  <a href="tel:+998949876000" className="block text-gray-700 hover:text-green-600 transition-colors font-medium">
                    +998 94 987 60 00
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Telegram Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {getText('telegram.title')}
                </h3>
                <div className="space-y-2">
                  <a 
                    href="https://t.me/+998983095550" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    +998 98 309 55 50
                  </a>
                  <a 
                    href="https://t.me/+998949876000" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    +998 94 987 60 00
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {getText('email.title')}
                </h3>
                <a href="mailto:ilkom08@inbox.ru" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                  ilkom08@inbox.ru
                </a>
              </div>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 p-3 rounded-xl">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {getText('instagram.title')}
                </h3>
                <a 
                  href="https://www.instagram.com/jacforklift.uz" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  @jacforklift.uz
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {getText('workingHours.title')}
                </h3>
                <div className="space-y-1 text-gray-700">
                  <p><span className="font-medium">{getText('workingHours.weekdays')}</span>: 9:00 - 20:00</p>
                  <p><span className="font-medium">{getText('workingHours.saturday')}</span>: 9:00 - 20:00</p>
                  <p><span className="font-medium">{getText('workingHours.sunday')}</span>: 9:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {getText('map.title')}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8234567890123!2d69.27453503862179!3d41.238181818299225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE0JzE3LjUiTiA2OcKwMTYnMjguMyJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={getText('map.title')}
              />
            </div>
          </div>
        </div>

        {/* Quick Contact Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            {getText('quickContact.title')}
          </h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            {getText('quickContact.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+998983095550"
              className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors duration-200 inline-flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-5 h-5" />
              {getText('quickContact.call')}
            </a>
            <a
              href="https://t.me/+998983095550"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {getText('quickContact.telegram')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;