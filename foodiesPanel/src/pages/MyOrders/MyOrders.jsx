import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './MyOrders.css';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  const fetchOrders = async () => {
    const response = await fetch(API_URL + '/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const orders = await response.json();
    setData(orders);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <h2>My Orders</h2>
        <button className="refresh-btn" onClick={fetchOrders}>
          <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-bag-x"></i>
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="orders-wrapper">
          {data.map((order, orderIndex) => (
            <div key={orderIndex} className="order-section">
              <div className="order-header-card">
                <div className="order-info">
                  <img src={assets.delivery} alt="delivery" className="delivery-icon" />
                  <div>
                    <h3>Order #{orderIndex + 1}</h3>
                    <span className={`status-badge status-${order.orderStatus.toLowerCase()}`}>
                      <span className="status-dot">●</span>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="order-total">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount">&#8377;{order.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderedItems.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="item-name">{item.name}</td>
                        <td className="item-quantity">x {item.quantity}</td>
                        <td className="item-price">&#8377;{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;