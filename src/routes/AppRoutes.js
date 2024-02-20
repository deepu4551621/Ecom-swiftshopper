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

const AppRoutes=({uid})=> {
    //     const [Products, setProducts]=useState([])
    //     useEffect(()=>{
    //     // fetching data 
    //         fetch('https://dummyjson.com/products')
    //           .then(res => res.json())
    //           .then(data => {
    //             // Set products state with fetched data
    //             setProducts(data.products);
    //             console.log('p:',data)
    //           });
    //      // fetching categorie data
    //      fetch('https://dummyjson.com/products/categories')
    //      .then(res => res.json())
    //      .then(data => setCategories(data))
    //      .catch(error => console.error('Error fetching categories:', error));
    // },[])
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />
    <Route path="/cart" element={<Cart uid={uid} />} />
    <Route path="/products" element={<AllProducts />} />
    <Route path="/products/:id" element={<Item uid={uid} />} />
    <Route path="/categorie/:category" element={<MainBar />} />
</Routes>
  )
}

export default AppRoutes