import './App.css'
import Menubar from './components/Menubar/Menubar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Explore from './pages/ExploreFood/Explore'
import Contact from './pages/Contact/Contact'
import FoodDetails from './pages/FoodDetails/FoodDetails'

function App() {


  return (
    <>
    <div>
      <Menubar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/food/:id' element={<FoodDetails/>}></Route>
      </Routes>
      
   </div>
    </>
  )
}

export default App
