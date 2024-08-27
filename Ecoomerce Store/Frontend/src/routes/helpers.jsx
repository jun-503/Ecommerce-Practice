import { redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';

export const isAuthenticated = async () => {
  const token = Cookies.get('idToken')
  if (token) throw redirect("/");
  return null;
};


const productsLoader = async ({ params }) => {
  const { category } = params;
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${category ? `category/${category}/` : ''}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default productsLoader
