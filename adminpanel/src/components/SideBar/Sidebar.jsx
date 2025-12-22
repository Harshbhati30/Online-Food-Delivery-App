import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './SideBar.css';

const Sidebar = ({ sidebarVisible }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`admin-sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <img src={assets.logo} alt="Logo" className="sidebar-logo" />
        <span className="sidebar-brand">Foodies Admin</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Menu</span>
          
          <Link 
            to="/add" 
            className={`sidebar-link ${isActive('/add') ? 'active' : ''}`}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Food</span>
          </Link>

          <Link 
            to="/list" 
            className={`sidebar-link ${isActive('/list') ? 'active' : ''}`}
          >
            <i className="bi bi-list-ul"></i>
            <span>List Food</span>
          </Link>

          <Link 
            to="/orders" 
            className={`sidebar-link ${isActive('/orders') ? 'active' : ''}`}
          >
            <i className="bi bi-cart"></i>
            <span>Orders</span>
          </Link>
        </div>


      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <i className="bi bi-shield-check"></i>
          <div>
            <div className="footer-title">Admin Panel</div>
            <div className="footer-subtitle">v1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;