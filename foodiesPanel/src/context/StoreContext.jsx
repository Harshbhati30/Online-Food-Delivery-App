import { createContext, useEffect, useState } from "react";
import { fetchFood } from "../Service/foodService";


export const StoreContext = createContext(null);

export const StoreContextProvider = (prop) =>{

  const [foodList , setFoodList]=useState([]);

  const contextValue ={
    foodList
  }

  useEffect(()=> {
    async function loadData(){
      const data = await fetchFood();
      console.log("Fetched food data:", data);
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