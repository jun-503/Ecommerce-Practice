
import ProductGrid from "../Products/ProductList.js";
import NavBar from "./Navbar.js"; 

const Header = () => {
  return (
    <div>
      <NavBar /> 
      <div className="container mt-5"> 
        <div className="row">
          <div className="col-12">
            <ProductGrid  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
