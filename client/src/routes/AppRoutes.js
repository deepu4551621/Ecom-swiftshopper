import React from 'react'
// import Navbar from '../components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Cart from '../pages/Cart';
import AllProducts from '../pages/Products'
import Item from '../pages/Item';
import MainBar from '../HomeLayout/MainBar';
import CheckoutPage from '../pages/checkOut';
const AppRoutes=({uid})=> {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />
    <Route path="/cart" element={<Cart uid={uid} />} />
    <Route path="/products" element={<AllProducts />} />
    <Route path="/products/checkout" element={<CheckoutPage />} />
    <Route path="/products/:id" element={<Item uid={uid} />} />
    <Route path="/categorie/:category" element={<MainBar />} />
</Routes>
  )
}

export default AppRoutes