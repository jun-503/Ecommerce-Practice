import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; // Assuming you have a NavBar.css for custom styles
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCart } from 'react-use-cart';


function NavBar() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { isEmpty, totalUniqueItems, emptyCart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    // Clear local storage related to the cart
    localStorage.removeItem('react-use-cart');
    localStorage.removeItem('react-use-cart-ecommerce-cart');
    
    // Clear the cart state from the context
    emptyCart();
    
    // Clear the cookie
    Cookies.remove('idToken');
    
    // Perform sign-out
    signOut();
    
    // Redirect to home
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleSortChange = (sortOption) => {
    // Logic to handle sorting
    console.log(`Sorting by ${sortOption}`);
    // Add your sorting logic here (update the product list accordingly)
  };

  const handleSelect = (eventKey) => {
    navigate(`/products/${eventKey}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Navbar expand="lg" className="navbar-custom shadow-sm p-3 mb-5 bg-dark text-light" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="text-light fw-bold fs-4">Metro Mart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-light">Home</Nav.Link>
            <Nav.Link href="/products" className="text-light">Products</Nav.Link>

            {/* Sort By Dropdown */}
            <NavDropdown title="Sort By" id="sort-nav-dropdown" className="text-light">
              <NavDropdown.Item onClick={() => handleSortChange('name')}>Name</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSortChange('price-asc')}>Price: Low to High</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSortChange('price-desc')}>Price: High to Low</NavDropdown.Item>
            </NavDropdown>

            {/* Categories Dropdown */}
            <NavDropdown title="Categories" id="categories-nav-dropdown" onSelect={handleSelect} className="text-light">
              <NavDropdown.Item eventKey="Mobiles">Mobiles</NavDropdown.Item>
              <NavDropdown.Item eventKey="Clothing">Clothing</NavDropdown.Item>
              <NavDropdown.Item eventKey="Appliances">Appliances</NavDropdown.Item>
              <NavDropdown.Item eventKey="Grocery">Grocery</NavDropdown.Item>
              <NavDropdown.Item eventKey="Laptop">Laptop</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="all-products">All Products</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-pill"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit" className="rounded-pill">Search</Button>
          </Form>

          {/* User Authentication & Cart Badge */}
          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated && (
              <Nav.Link href="/cart" className="text-light d-flex align-items-center" onClick={handleCartClick}>
              <i className="bi bi-cart2" ></i>
              {!isEmpty && (
                <Badge pill bg="danger" >
                  {totalUniqueItems}
                </Badge>
              )}
            </Nav.Link>
            
            )}

            {isAuthenticated ? (
              <NavDropdown title={currentUser?.email || 'User'} id="user-nav-dropdown" className="text-light">
                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/orders')}>My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-light"
                className="rounded-pill ms-2"
                onClick={() => navigate('/signIn')}
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
