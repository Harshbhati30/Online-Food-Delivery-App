import { assets } from '../../assets/assets';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Orders.css';

const MAIN_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = MAIN_URL + "/orders";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL + "/all");
      const orders = await response.json();
      setData(orders);
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const response = await fetch(
        `${API_URL}/status/${orderId}?status=${event.target.value}`,
        { method: 'PATCH' }
      );
      if (response.status === 200) {
        toast.success("Order status updated");
        await fetchOrders();
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Food Preparing':
        return 'status-preparing';
      case 'On the way':
        return 'status-delivery';
      case 'Delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  // Filter logic
  const filteredOrders = data.filter((order) => {
    const matchesSearch = order.userAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderedItems.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: data.length,
    'Food Preparing': data.filter(o => o.orderStatus === 'Food Preparing').length,
    'On the way': data.filter(o => o.orderStatus === 'On the way').length,
    'Delivered': data.filter(o => o.orderStatus === 'Delivered').length,
  };

  return (
    <div className="orders-container">
      {/* Header */}
      <div className="orders-header">
        <div>
          <h2 className="page-title">
            <i className="bi bi-cart"></i>
            Orders Management
          </h2>
          <p className="page-subtitle">Track and manage all customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card-orders">
          <i className="bi bi-box-seam"></i>
          <div>
            <div className="stat-number">{statusCounts.all}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card-orders preparing">
          <i className="bi bi-hourglass-split"></i>
          <div>
            <div className="stat-number">{statusCounts['Food Preparing']}</div>
            <div className="stat-label">Preparing</div>
          </div>
        </div>
        <div className="stat-card-orders delivery">
          <i className="bi bi-truck"></i>
          <div>
            <div className="stat-number">{statusCounts['On the way']}</div>
            <div className="stat-label">On the Way</div>
          </div>
        </div>
        <div className="stat-card-orders delivered">
          <i className="bi bi-check-circle"></i>
          <div>
            <div className="stat-number">{statusCounts['Delivered']}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box-orders">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by address or items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {['all', 'Food Preparing', 'On the way', 'Delivered'].map((status) => (
            <button
              key={status}
              className={`status-tab ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>

        <button className="refresh-btn-orders" onClick={fetchOrders}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="loading-state-orders">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state-orders">
          <i className="bi bi-inbox"></i>
          <h3>No orders found</h3>
          <p>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order, index) => (
            <div key={index} className="order-card-item">
              <div className="order-card-header">
                <div className="order-icon-section">
                  <img src={assets.parcel} alt="parcel" />
                </div>
                <div className="order-id-section">
                  <span className="order-label">Order</span>
                  <span className="order-id">#{index + 1}</span>
                </div>
                <div className="order-amount-section">
                  <span className="amount-label">Total Amount</span>
                  <span className="amount-value">&#8377;{order.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items-section">
                  <h4>
                    <i className="bi bi-basket"></i>
                    Items ({order.orderedItems.length})
                  </h4>
                  <div className="items-list">
                    {order.orderedItems.map((item, idx) => (
                      <span key={idx} className="item-tag">
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="order-address-section">
                  <h4>
                    <i className="bi bi-geo-alt"></i>
                    Delivery Address
                  </h4>
                  <p>{order.userAddress}</p>
                </div>
              </div>

              <div className="order-card-footer">
                <div className="status-update-section">
                  <label>Update Status:</label>
                  <select
                    className={`status-select ${getStatusColor(order.orderStatus)}`}
                    onChange={(event) => updateStatus(event, order.id)}
                    value={order.orderStatus}
                  >
                    <option value="Food Preparing">Food Preparing</option>
                    <option value="On the way">On the way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Info */}
      {!loading && filteredOrders.length > 0 && (
        <div className="results-info-orders">
          Showing {filteredOrders.length} of {data.length} orders
        </div>
      )}
    </div>
  );
};

export default Orders;