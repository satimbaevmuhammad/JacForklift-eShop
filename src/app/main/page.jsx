import React from 'react'
import Header from '../components/Header'
import Category from '../components/Cattegory'
import Footer from '../components/Footer'
import Products from '../components/Products'
const page = () => {
    return (
        <div>
            <Header />
            <Category />
            <Products/>
            <Footer/>
        </div>
    )
}

export default page