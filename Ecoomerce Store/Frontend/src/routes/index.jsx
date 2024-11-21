import { RouterProvider } from "react-router-dom";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";


import Start from '../components/Startpage'
import SignInForm from "../components/AuthComponents/SignIn";
import SignupForm from "../components/AuthComponents/signUp";
import Protected from "./protected";

import CartContext from '../components/Cart/CartContext'
import { isAuthenticated } from "./helpers";

import ProductPage from "../components/Products/ProductPage";
import  productsLoader  from "./helpers";
import Layout from "../components/Main";
import SearchResults from "../components/Products/search/Search";
import ProductDesc from "../components/Products/ProductDesc";
import Checkout from "../components/Checkout/checkout";





const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >        
      <Route index element={<Start />} />
      
      <Route path="signup" element={<SignupForm />} loader={isAuthenticated} />
      <Route path="signIn" element={<SignInForm />} loader={isAuthenticated}/>
      <Route path="products" element={<ProductPage/>} loader={productsLoader}/>
      <Route path="products/:category" element={<ProductPage />} loader={productsLoader} />
      
      <Route path="search" element={<SearchResults />} />
    
      <Route element={<Protected />}>
        
        <Route path='products/product/:id' element={<ProductDesc />}/>
        <Route path="cart" element={<CartContext />} />
        <Route path="/checkout" element={<Checkout />} />

        

      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
      
    </Route>
    
  )
);



const Index = () => {
  return <RouterProvider router={Router} />;
};

export default Index;
