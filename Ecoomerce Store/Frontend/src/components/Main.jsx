// src/components/Layout.jsx

import NavBar from './Header/Navbar';
import { Outlet } from 'react-router-dom';  // in routing v6 <Outlet /> is used to handle children i.e component to display 
import {handleSortChange} from './Products/ProductPage'
const Layout = () => {
  // Debug statement
  return (
    <>
      <NavBar onSortChange={handleSortChange} />
      <main><Outlet /></main>
    </>
  );
};

export default Layout;
