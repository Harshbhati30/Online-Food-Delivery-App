import React from "react";
import "./Menubar.css";

const Menubar = ({ toggleSidebar }) => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">

        {/* Left Section */}
        <div className="admin-navbar-left">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <h1 className="admin-title">Delhi Cafe</h1>
        </div>

        {/* Right Section */}
        <div className="admin-navbar-right">
          {/* Notifications */}
          <button className="admin-icon-btn">
            <i className="bi bi-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          {/* Settings */}
          <button className="admin-icon-btn">
            <i className="bi bi-gear"></i>
          </button>

          {/* Profile */}
          <div className="admin-profile">
            <div className="admin-profile-info">
              <span className="admin-name">Delhi Cafe</span>
              <span className="admin-role">Administrator</span>
            </div>
            <div className="admin-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;