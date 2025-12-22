import axios from "axios";


const MAIN_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = MAIN_URL + "/foods";

export const fetchFood = async () =>{
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log( "Error  " + Error);
    throw error;
  }
}

export const fetchFoodDetails = async (id) =>{
  try {
    const response = await axios.get(API_URL + "/" + id);
    return response.data;
  } catch (error) {
    console.log( "Error  " , error);
    throw error;
  }
}