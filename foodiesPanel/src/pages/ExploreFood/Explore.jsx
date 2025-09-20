import React from 'react'
import { categories } from '../../assets/assets'
import FoodItem from '../../components/FoodItem/FoodItem'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { useState } from 'react'


const Explore = () => {

  const [category,setCategory]=useState('All');
  const [searchText,setSearchText]=useState('');

  return (
    <>
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => {e.preventDefault()}}>
            <div className="input-group mb-3">
              <select className='form-select mt-2' style={{"maxWidth": "150px"}} onChange={(e) => {setCategory(e.target.value)}}>
                <option value="All">All</option>
                <option value="Biryani">Biryani</option>
                <option value="Cake">Cake</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Spring Rolls">Spring Rolls</option>
                <option value="Ice-Cream">Ice-Cream</option>
                <option value="Salad">Salad</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              <input type="text" className='form-control mt-2' placeholder='Search your favourite food...' 
              onChange={(e) => setSearchText(e.target.value )} value={searchText}/>
              <button className='btn btn-primary mt-2' type='submit' > <i class="bi bi-search"></i> </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <FoodDisplay category={category} searchText={searchText}/>
    </>
  )
}

export default Explore