import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Service from './pages/Service'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminApp from './pages/Admin/AdminApp'
import List from './pages/Admin/List'
import AdminOrders from './pages/Admin/AdminOrder'
import AdminService from './pages/Admin/AdminService'
import Add from './pages/Admin/Add'
import AdminOrder from './pages/Admin/AdminOrder'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/service' element={<Service/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      


      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/admin/dasbord' element={<AdminApp />} />
      <Route path='/admin/add' element={<Add />} />
      <Route path="/admin/list" element={<List />} />
      <Route path='/admin/service' element={<AdminService />} />
      <Route path='/admin/orders' element={<AdminOrder />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
