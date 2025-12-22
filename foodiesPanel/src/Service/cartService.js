import axios from "axios";


const MAIN_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = MAIN_URL + "/cart";

export const addToCart = async (foodId, token) => {
  try {
    await axios.post(API_URL, {foodId} , {headers: {Authorization: `Bearer ${token}`}} );
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
export const removeQtyFromCart = async (foodId, token) => {
  try {
    await axios.post(API_URL+"/remove" , {foodId} , {headers: {Authorization: `Bearer ${token}`}} );
  } catch (error) {
    console.error("Error removing quantity from cart:", error);
  }
}
export const getCart = async (token) => {
  try {
    const response= await axios.get(API_URL , {headers: {Authorization: `Bearer ${token}`}} );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}