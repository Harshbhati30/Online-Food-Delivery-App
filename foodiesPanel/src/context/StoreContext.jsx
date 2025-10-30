import { createContext, useEffect, useState } from "react";
import { fetchFood } from "../Service/foodService";


export const StoreContext = createContext(null);

export const StoreContextProvider = (prop) =>{

  const [foodList , setFoodList]=useState([]);
  const [quantities, setQuantities]=useState({});
  const [token , setToken]= useState(" ");

const increaseQuantity = (foodId) => {
  setQuantities(prev => ({
    ...prev,
    [foodId]: (prev[foodId] || 0) + 1
  }));
};

const decreaseQuantity = (foodId) => {
  setQuantities(prev => ({
    ...prev,
    [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0
  }));
};

const removeFromCart = (foodId) => {
  setQuantities(prevQuantities => {
    const updatedQuantities ={ ...prevQuantities}
    delete updatedQuantities[foodId];
    return updatedQuantities;
})
};
  const contextValue ={
    foodList,
    increaseQuantity,
    decreaseQuantity,
    quantities,
    removeFromCart,
    token,
    setToken
  }

  useEffect(()=> {
    async function loadData(){
      const data = await fetchFood();
      setFoodList(data);
    }
    loadData();

  } , [])


return(
  <StoreContext.Provider value={contextValue}>
    {prop.children}
  </StoreContext.Provider>
)
}