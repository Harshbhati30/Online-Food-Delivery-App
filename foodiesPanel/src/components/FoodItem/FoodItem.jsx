import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ name, id, description, imageUrl, price }) => {
  const { increaseQuantity, decreaseQuantity, quantities } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="food-card">
        <div className="food-card-image-wrapper">
          <Link to={`/food/${id}`}>
            <img
              src={imageUrl}
              className="food-card-image"
              alt={name}
            />
          </Link>
          {quantities[id] > 0 && (
            <div className="food-card-badge">
              <span className="badge-quantity">
                {quantities[id]} in cart
              </span>
            </div>
          )}
        </div>

        <div className="food-card-body">
          <Link to={`/food/${id}`} className="food-card-title-link">
            <h5 className="food-card-title">{name}</h5>
          </Link>
          <p className="food-card-description">{description}</p>

          <div className="food-card-info">
            <div className="food-card-price">
              <span className="currency">₹</span>
              <span className="amount">{price}</span>
            </div>
            <div className="food-card-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <span className="rating-text">4.5</span>
            </div>
          </div>
        </div>

        <div className="food-card-footer">
          <Link className="btn-view-details" to={`/food/${id}`}>
            <i className="bi bi-eye me-2"></i>
            View Details
          </Link>

          {quantities[id] > 0 ? (
            <div className="quantity-controls">
              <button
                className="btn-quantity btn-decrease"
                onClick={() => decreaseQuantity(id)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="quantity-display">{quantities[id]}</span>
              <button
                className="btn-quantity btn-increase"
                onClick={() => increaseQuantity(id)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn-add-to-cart"
              onClick={() => increaseQuantity(id)}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;