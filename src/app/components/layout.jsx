import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'JacForklift - Eng sifatli yuk ko\'tarish texnikalari',
    description: 'Professional forklift va yuk ko\'tarish texnikalari',
}

export default function RootLayout({ children }) {
    return (
        <html lang="uz">
            <body className={inter.className}>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    )
}