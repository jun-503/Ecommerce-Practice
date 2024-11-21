import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import SignInForm from './components/AuthComponents/SignIn';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Import Bootstrap Icons
// import ProductDesc from './components/Products/ProductDesc';

// import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from 'react-use-cart';

// import Header from './components/Header/header'
// import SignupForm from './components/AuthComponents/signUp';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider id='ecommerce-cart'>
        <App />
      </CartProvider>
    </AuthProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
