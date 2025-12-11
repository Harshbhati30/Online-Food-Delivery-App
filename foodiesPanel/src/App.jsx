import './App.css'
import Menubar from './components/Menubar/Menubar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Explore from './pages/ExploreFood/Explore'
import Contact from './pages/Contact/Contact'
import FoodDetails from './pages/FoodDetails/FoodDetails'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import { ToastContainer } from 'react-toastify';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import MyOrders from './pages/MyOrders/MyOrders'
import {useContext } from 'react'
import { StoreContext } from './context/StoreContext'

function App() {
  const {token} = useContext(StoreContext);

  return (
    <>
    <div>
      <Menubar/>
      <ToastContainer></ToastContainer>
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/food/:id' element={<FoodDetails/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={token ? <PlaceOrder/> : <Login/> }></Route>
        <Route path='/login' element={token ? <Home/> : <Login/>}></Route>
        <Route path='/register' element={ token ? <Home/> : <Register/>}></Route>
        <Route path='/myorders' element={token ? <MyOrders/> : <Login/>}></Route>

      </Routes>
      
   </div>
    </>
  )
}

export default App
