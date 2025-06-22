// app/layout.js yoki app/providers.js
"use client"

import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../lib/i18n'

const AppProvider = ({ children }) => {
    useEffect(() => {
        // Load saved language from localStorage on app start
        if (typeof window !== 'undefined') {
            const savedLang = localStorage.getItem('language')
            if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
                i18n.changeLanguage(savedLang)
            }
        }
    }, [])

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}

export default AppProvider