import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signup from './assets/pages/Signup'
import Home from './assets/pages/Home'
import Login from './assets/pages/Login'
// import Admin from './assets/pages/Admin'
import ProductDetails from './assets/pages/ProductDetails'
import SearchItem from './assets/pages/SearchItem'
import Logout from './assets/pages/Logout'
import Error from './assets/pages/Error'
import Cart from './assets/pages/Cart'
import { useAuth } from './store/store'
import Footer from './components/Footer'
import AdminLayouts from './components/layouts/Admin-Layouts'
import AdminUsers from './assets/pages/AdminUser'


const App = () => {

  const { isLoggedIn } = useAuth();

  const [cart, setCart] = useState([])

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path='/' element={<Home cart={cart} setCart={setCart} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {isLoggedIn ? <Route path='/admin' element={<AdminLayouts />} />
          :
          <Route path={"*"} element={<Error />} />}


        <Route path={`/product/:id`} element={<ProductDetails cart={cart} setCart={setCart} />} />
        <Route path={`/search/:term`} element={<SearchItem cart={cart} setCart={setCart} />} />
        <Route path={`/logout`} element={<Logout />} />
        <Route path={"*"} element={<Error />} />

        {isLoggedIn ?
          <>
            <Route path={`/cart`} element={<Cart cart={cart} setCart={setCart} />} />
          </>
          :
          <>
            <Route path={"*"} element={<Error />} />
          </>}

        <Route path='/admin' element={<AdminLayouts />}>
          <Route path='users' element={AdminUsers} />
        </Route>
      </Routes>

      <Footer />

    </>
  )
}

export default App