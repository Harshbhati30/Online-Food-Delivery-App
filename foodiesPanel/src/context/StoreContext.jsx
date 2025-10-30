import { createContext, useEffect, useState } from "react";
import { fetchFood } from "../Service/foodService";
import axios from "axios";
import { addToCart, getCart,removeQtyFromCart } from "../Service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));

    await addToCart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    });
  };
  const decreaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token); 
  };

  

  const loadCartData =async (token) => {
    const items = await getCart(token);
    setQuantities(items);
  }


  const contextValue = {
    foodList,
    increaseQuantity,
    decreaseQuantity,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  

  useEffect(() => {
    async function loadData() {
      const data = await fetchFood();
      setFoodList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
