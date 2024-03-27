import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "./User";
import '../pageStyles/navbar.css'
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { logout } from "../features/user/userSlice";
import { removeCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// const useParams from
const logo = require("./swiftshopper.jpg");
const NavbarComponent = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const cartLength = useSelector((state) => state.cart.items.length);
  const wishlist= useSelector(state=>state.cart.wishlist)
  const isLoggedIn= useSelector(state=>state.user.isAuthenticated)
//  console.log('w', Object.keys(wishlist).length)
  const handleLogout = async () => {
    try {
      console.log('logout......');
  
      // Show loading toast while logging out
      const logoutToast = toast.loading('Logging out user...');
  
      // Remove the authentication token
      Cookies.remove('authToken');
  
      // Dispatch the logout action to update Redux state
      dispatch(logout());
      dispatch(removeCart())
      // Navigate to the login page
      navigate('/login');
       toast.dismiss(logoutToast)
    } catch (error) {
      console.error('Error logging out user:', error);
      toast.error('Error logging out user!');
    }
  };
  
  return (
    <Navbar expand="lg" className="nav"  sticky="top">
      <Nav.Link as={Link} to="/">
        <img src={logo} className="logoImg" alt="swiftshopper logo" />
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav mx-5" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar mx-2">
      <div className="navLinks">
        {
          isLoggedIn?(<Nav.Link as={Link} onClick={handleLogout}>
          Logout
        </Nav.Link>):(
          <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        )
        }
          
          <Nav.Link as={Link} to="/cart">
              <GiShoppingCart size={40}/>
              <span
                style={{
                  position: "relative",
                  right: "-40px",
                  top: "-40px",
                  background: "grey",
                  width: "15px",
                  height:'15px',
                  color:'#fff', 
                  borderRadius: "50%" /* Change to 50% for a circle */,
                  fontSize: "10px",
                  display:'block',
                }}
              >
                {cartLength}
              </span>
          </Nav.Link>
          <Nav.Link as={Link} to="/wishlist">
              <FaHeart size={40} color="silver" />
              <span
                style={{
                  position: "relative",
                  right: "-40px",
                  top: "-40px",
                  background: "grey",
                  width: "15px",
                  height:'15px',
                  color:'#fff', 
                  borderRadius: "50%" /* Change to 50% for a circle */,
                  fontSize: "10px",
                  display:'block',
                  
                }}
              >
                {Object.keys(wishlist).length}
              </span>
          </Nav.Link>
        </div>
        <div className="user">
        <User />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
