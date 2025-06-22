// layout.js (for Next.js App Router) or _app.js (for Pages Router)
'use client'
import { LanguageProvider } from '../contexts/LanguageContext'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    )
}

// OR for Pages Router (_app.js):
/*
import { LanguageProvider } from '../contexts/LanguageContext'

export default function App({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <Component {...pageProps} />
        </LanguageProvider>
    )
}
*/