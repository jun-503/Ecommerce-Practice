// src/components/Layout.jsx

import NavBar from './Header/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '50px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

