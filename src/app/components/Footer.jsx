'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer className='bg-[#272727] py-6 border-t-4'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Desktop Layout */}
                <div className='hidden md:flex justify-between items-center'>
                    {/* Left: Logo */}
                    <div className='flex items-center'>
                        <img className='w-[108px]' src="/logo.png" alt="JAC Forklift Logo" />
                    </div>

                    {/* Center: Copyright */}
                    <div className='text-center'>
                        <p className='text-gray-300 text-sm'>
                            {t('footer.copyright') || 'JAC Forklift © 2025 Barcha huquqlar himoyalangan'}
                        </p>
                    </div>

                    {/* Right: Contact Info */}
                    <div className='flex items-center gap-6'>
                        {/* Phone */}
                        <a
                            href="tel:+998949876000"
                            className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2'
                        >
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className='text-sm font-medium'>
                                {'+998 94 987 60 00'}
                            </span>
                        </a>

                        {/* Social Icons */}
                        <div className='flex items-center gap-3'>
                            {/* Telegram */}
                            <a
                                href="https://t.me/+998949876000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-400 hover:text-blue-400 transition-colors duration-200'
                                aria-label={t('footer.social.telegram') || 'Telegram'}
                            >
                                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com/jacforklift.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-400 hover:text-pink-400 transition-colors duration-200'
                                aria-label={t('footer.social.instagram') || 'Instagram'}
                            >
                                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.129c-2.686 0-4.857 2.171-4.857 4.858c0 2.686 2.171 4.857 4.857 4.857c2.686 0 4.857-2.171 4.857-4.857C16.874 9.3 14.703 7.129 12.017 7.129zM15.568 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C17.916 15.937 16.865 16.988 15.568 16.988z' />
                                </svg>
                            </a>

                            {/* YouTube */}
                         

                            {/* Facebook */}
                            <a
                                href="https://facebook.com/jacforklift.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-400 hover:text-blue-600 transition-colors duration-200'
                                aria-label={t('footer.social.facebook') || 'Facebook'}
                            >
                                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className='md:hidden flex flex-col space-y-4'>
                    {/* Logo and Phone in one line */}
                    <div className='flex justify-between items-center'>
                        {/* Logo */}
                        <div className='flex items-center'>
                            <img className='w-[80px]' src="/logo.png" alt="JAC Forklift Logo" />
                        </div>

                        {/* Phone */}
                        <a
                            href="tel:+998949876000"
                            className='text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2'
                        >
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className='text-sm font-medium'>
                                {t('call') || 'Qo\'ng\'iroq'}
                            </span>
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className='flex justify-center items-center gap-4'>
                        {/* Telegram */}
                        <a
                            href="https://t.me/+998949876000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-400 hover:text-blue-400 transition-colors duration-200'
                            aria-label={t('footer.social.telegram') || 'Telegram'}
                        >
                            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/jacforklift.uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-400 hover:text-pink-400 transition-colors duration-200'
                            aria-label={t('footer.social.instagram') || 'Instagram'}
                        >
                            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.129c-2.686 0-4.857 2.171-4.857 4.858c0 2.686 2.171 4.857 4.857 4.857c2.686 0 4.857-2.171 4.857-4.857C16.874 9.3 14.703 7.129 12.017 7.129zM15.568 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C17.916 15.937 16.865 16.988 15.568 16.988z' />
                            </svg>
                        </a>

          

                        {/* Facebook */}
                        <a
                            href="https://facebook.com/jacforklift.uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-gray-400 hover:text-blue-600 transition-colors duration-200'
                            aria-label={t('footer.social.facebook') || 'Facebook'}
                        >
                            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                            </svg>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className='text-center'>
                        <p className='text-gray-300 text-sm'>
                            {t('footer.copyright') || 'JAC Forklift © 2025. Barcha huquqlar himoyalangan'}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer