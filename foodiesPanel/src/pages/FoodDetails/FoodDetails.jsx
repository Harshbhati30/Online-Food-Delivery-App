import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchFoodDetails } from '../../Service/foodService';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const { increaseQuantity, decreaseQuantity, quantities } = useContext(StoreContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        setLoading(true);
        const FoodData = await fetchFoodDetails(id);
        setData(FoodData);
      } catch (error) {
        toast.error("Error while loading food details");
      } finally {
        setLoading(false);
      }
    };
    loadFoodDetails();
  }, [id]);

  const addtocart = () => {
    increaseQuantity(data.id);
    toast.success("Item added to cart");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading delicious details...</p>
      </div>
    );
  }

  return (
    <div className="food-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i> Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/explore">Explore</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="details-section">
        <div className="container">
          <div className="details-card">
            <div className="row g-4 align-items-center">
              {/* Image Section */}
              <div className="col-lg-6">
                <div className="image-wrapper">
                  <img
                    className="food-detail-image"
                    src={data.imageUrl}
                    alt={data.name}
                  />
                  <div className="image-overlay">
                    <div className="rating-badge">
                      <i className="bi bi-star-fill"></i>
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="col-lg-6">
                <div className="details-content">
                  {/* Category Badge */}
                  <div className="category-section">
                    <span className="category-badge">
                      <i className="bi bi-tag-fill"></i>
                      {data.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="food-title">{data.name}</h1>

                  {/* Price */}
                  <div className="price-section">
                    <span className="currency">₹</span>
                    <span className="price">{data.price}</span>
                    <span className="price-suffix">.00</span>
                  </div>

                  {/* Rating */}
                  <div className="rating-section">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                    <span className="rating-text">4.5 (250+ reviews)</span>
                  </div>

                  {/* Description */}
                  <div className="description-section">
                    <h3 className="section-heading">
                      <i className="bi bi-info-circle"></i>
                      Description
                    </h3>
                    <p className="description-text">{data.description}</p>
                  </div>

                  {/* Features */}
                  <div className="features-section">
                    <div className="feature-item">
                      <i className="bi bi-clock"></i>
                      <span>Ready in 30 mins</span>
                    </div>
                    <div className="feature-item">
                      <i className="bi bi-fire"></i>
                      <span>Fresh & Hot</span>
                    </div>
                    <div className="feature-item">
                      <i className="bi bi-shield-check"></i>
                      <span>Quality Assured</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-section">
                    {quantities[data.id] > 0 ? (
                      <div className="quantity-action-wrapper">
                        <div className="quantity-controls-detail">
                          <button
                            className="btn-quantity-detail btn-decrease-detail"
                            onClick={() => decreaseQuantity(data.id)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="quantity-display-detail">{quantities[data.id]}</span>
                          <button
                            className="btn-quantity-detail btn-increase-detail"
                            onClick={() => increaseQuantity(data.id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                        <button
                          className="btn-view-cart"
                          type="button"
                          onClick={() => navigate('/cart')}
                        >
                          <i className="bi bi-cart-check"></i>
                          View Cart
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn-add-to-cart-detail"
                        type="button"
                        onClick={addtocart}
                      >
                        <i className="bi bi-cart-plus"></i>
                        Add to Cart
                      </button>
                    )}
                    <button
                      className="btn-back"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      <i className="bi bi-arrow-left"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;