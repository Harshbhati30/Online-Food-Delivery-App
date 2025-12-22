import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
import "./Menubar.css";

const Menubar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  const uniqueCartItems = Object.values(quantities).filter(qty => qty > 0).length;

  return (
    <nav className="navbar-wrapper">
      <div className="container">
        <div className="navbar-main">
          {/* Logo */}
          <Link to="/" className="logo-section">
            <img src={assets.logo} alt="Logo" className="logo-img" />
            <span className="brand-name">Foodies</span>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#mobileNav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links - Desktop */}
          <ul className="nav-links">
            <li>
              <Link 
                className={`nav-link ${active === "home" ? "active" : ""}`} 
                to="/" 
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                className={`nav-link ${active === "explore" ? "active" : ""}`} 
                to="/explore" 
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link 
                className={`nav-link ${active === "contact-us" ? "active" : ""}`} 
                to="/contact" 
                onClick={() => setActive("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Cart */}
            <Link to="/cart" className="cart-icon-wrapper">
              <i className="bi bi-cart3"></i>
              {uniqueCartItems > 0 && (
                <span className="cart-count">{uniqueCartItems}</span>
              )}
            </Link>

            {/* Auth / Profile */}
            {!token ? (
              <div className="auth-buttons">
                <button 
                  className="btn-nav btn-login-nav" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button 
                  className="btn-nav btn-register-nav" 
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="dropdown">
                <button 
                  className="profile-btn" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <img 
                    src={assets.profile} 
                    alt="Profile" 
                    className="profile-pic" 
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end profile-menu">
                  <li>
                    <button 
                      className="dropdown-item profile-menu-item" 
                      onClick={() => navigate("/myorders")}
                    >
                      <i className="bi bi-bag"></i>
                      My Orders
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item profile-menu-item" 
                      onClick={logout}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="collapse" id="mobileNav">
          <div className="mobile-nav">
            <Link 
              className={`mobile-nav-link ${active === "home" ? "active" : ""}`} 
              to="/" 
              onClick={() => setActive("home")}
            >
              <i className="bi bi-house-door"></i>
              Home
            </Link>
            <Link 
              className={`mobile-nav-link ${active === "explore" ? "active" : ""}`} 
              to="/explore" 
              onClick={() => setActive("explore")}
            >
              <i className="bi bi-compass"></i>
              Explore
            </Link>
            <Link 
              className={`mobile-nav-link ${active === "contact-us" ? "active" : ""}`} 
              to="/contact" 
              onClick={() => setActive("contact-us")}
            >
              <i className="bi bi-envelope"></i>
              Contact Us
            </Link>
            
            {token && (
              <>
                <div className="mobile-divider"></div>
                <Link 
                  className="mobile-nav-link" 
                  to="/myorders"
                >
                  <i className="bi bi-bag"></i>
                  My Orders
                </Link>
                <button 
                  className="mobile-nav-link mobile-logout" 
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;