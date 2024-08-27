import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Button, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; // Assuming you have a NavBar.css for custom styles
import { useAuth } from '../../Context/AuthContext';
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function NavBar() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!currentUser);
  const [searchQuery,setSearchQuery] = useState('')

  useEffect(() => {
    setIsAuthenticated(!!currentUser);
  }, [currentUser]);

  const handleLogout = () => {
    Cookies.remove('idToken') // Clear the cookie

    signOut();
    navigate('/');
  };
  const handleSearch =(e) =>{
    e.preventDefault()
    if (searchQuery.trim()){
      navigate(`/search?q=${searchQuery}`)
    }
  };
  const handleSortChange= (sortOption) => {
  alert('Not implemented yet')
  }

  const handleSelect = (eventKey) => {
    // Navigate to the selected category
    navigate(`/products/${eventKey}`);
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary navbar-custom" fixed="top">
      <Container>
        <Navbar.Brand href="/">Metro Mart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >Products</Nav.Link>
            <NavDropdown title="Sort By" id="sort-nav-dropdown" >
              <NavDropdown.Item onClick={()=>handleSortChange('name')} >Name</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleSortChange('price-asc')} >Price-Asc</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleSortChange('price-desc')} >Price-Desc</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Categories" id="basic-nav-dropdown" onSelect={handleSelect}>
              <NavDropdown.Item eventKey="Mobiles">Mobiles</NavDropdown.Item>
              <NavDropdown.Item eventKey="Clothing">Clothing</NavDropdown.Item>
              <NavDropdown.Item eventKey="Appliances">Appliances</NavDropdown.Item>
              <NavDropdown.Item eventKey="Grocery">Grocery</NavDropdown.Item>
              <NavDropdown.Item eventKey="Laptop">Laptop</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">All products</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuthenticated ? (
            <NavDropdown title={currentUser ? currentUser.email : 'user'} id="user-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button variant="outline-primary" onClick={() => navigate('/signIn')}>Sign In</Button>
          )}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={e=>{setSearchQuery(e.target.value)}}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
