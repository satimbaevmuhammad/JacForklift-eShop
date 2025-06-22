import React from 'react'
import Category from '../components/Cattegory'
import Footer from '../components/Footer'
import Products from '../components/Products'
import Header from '../components/Header'
import { LanguageProvider } from '../contexts/LanguageContext'

const page = () => {
    return (
        <LanguageProvider>
            <div>
                <Header />
                <Category />
                <Products />
                <Footer />
            </div>
        </LanguageProvider>
    )
}

export default page