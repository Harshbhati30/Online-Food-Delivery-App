import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { deleteFood, getFoodList } from '../../services/foodService';

const ListFood = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error in fetching food list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const success = await deleteFood(id);
        if (success) {
          toast.success("Food Item Deleted Successfully");
          await fetchList();
        } else {
          toast.error("Error in deleting food item");
        }
      } catch (error) {
        toast.error("Error in deleting food item");
      }
    }
  };

  // Filter logic
  const filteredList = list.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(list.map(item => item.category))];

  return (
    <div className="list-food-container">
      {/* Header */}
      <div className="list-food-header">
        <div>
          <h2 className="page-title">
            <i className="bi bi-list-ul"></i>
            Food Items List
          </h2>
          <p className="page-subtitle">Manage your menu items</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <i className="bi bi-box"></i>
            <div>
              <div className="stat-number">{list.length}</div>
              <div className="stat-label">Total Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <i className="bi bi-funnel"></i>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <button className="refresh-btn" onClick={fetchList}>
          <i className="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading food items...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h3>No items found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <table className="food-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="food-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                  </td>
                  <td>
                    <div className="food-name">{item.name}</div>
                  </td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>
                    <span className="price">&#8377;{item.price}</span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => removeFood(item.id, item.name)}
                      title="Delete item"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Results Info */}
      {!loading && filteredList.length > 0 && (
        <div className="results-info">
          Showing {filteredList.length} of {list.length} items
        </div>
      )}
    </div>
  );
};

export default ListFood;