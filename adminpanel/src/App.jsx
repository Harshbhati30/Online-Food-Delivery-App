import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar';
import Menubar from './components/MenuBar/Menubar';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="admin-wrapper" id="wrapper">
      <Sidebar sidebarVisible={sidebarVisible} />

      <div 
        id="page-content-wrapper" 
        className={`page-content ${sidebarVisible ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <Menubar toggleSidebar={toggleSidebar} />
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="admin-main-content">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/list" element={<ListFood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;