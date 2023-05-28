import React from 'react'
import Header from '../components/Header'
import HomeComponent from '../components/HomeComponent'
import Products from '../components/Products'

const Home = () => {
  return (
    <div>
        <Header/>
        <HomeComponent/>
        <Products/>
    </div>
  )
}

export default Home