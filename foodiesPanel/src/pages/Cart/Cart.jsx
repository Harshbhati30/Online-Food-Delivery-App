import React, { useContext } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { CalculateCartTotals } from "../../util/CartUtils";

const Cart = () => {
  const navigate = useNavigate();

  const { foodList, increaseQuantity, decreaseQuantity, quantities, removeFromCart } =
    useContext(StoreContext);

  const cartItem = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shipping, tax, total } = CalculateCartTotals(cartItem, quantities);

  return (
    <div className="cart-page">
      {/* Header Section */}
      <div className="cart-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 className="cart-title">
                <i className="bi bi-cart3"></i>
                Shopping Cart
              </h1>
              <p className="cart-subtitle">
                {cartItem.length} {cartItem.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link to="/explore" className="btn-continue-shopping">
              <i className="bi bi-arrow-left"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container cart-container">
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            {cartItem.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">
                  <i className="bi bi-cart-x"></i>
                </div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <Link to="/explore" className="btn-start-shopping">
                  <i className="bi bi-search"></i>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="cart-items-wrapper">
                {cartItem.map((food) => (
                  <div key={food.id} className="cart-item-card">
                    {/* Image */}
                    <div className="cart-item-image">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="food-image"
                      />
                    </div>

                    {/* Details */}
                    <div className="cart-item-details">
                      <h5 className="item-name">{food.name}</h5>
                      <span className="item-category">
                        <i className="bi bi-tag"></i>
                        {food.category}
                      </span>
                      <p className="item-price-mobile">
                        ₹{food.price} × {quantities[food.id]}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="cart-item-quantity">
                      <div className="quantity-controls-cart">
                        <button
                          className="btn-qty btn-decrease-cart"
                          onClick={() => decreaseQuantity(food.id)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="quantity-value">{quantities[food.id]}</span>
                        <button
                          className="btn-qty btn-increase-cart"
                          onClick={() => increaseQuantity(food.id)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="cart-item-actions">
                      <p className="item-total-price">
                        ₹{(food.price * quantities[food.id]).toFixed(2)}
                      </p>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="col-lg-4">
            <div className="order-summary-card">
              <h5 className="summary-title">
                <i className="bi bi-receipt"></i>
                Order Summary
              </h5>

              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span className="summary-value">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-value">₹{total.toFixed(2)}</span>
              </div>

              <button
                className="btn-checkout"
                disabled={cartItem.length === 0}
                onClick={() => navigate("/order")}
              >
                <i className="bi bi-credit-card"></i>
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-item">
                  <i className="bi bi-shield-check"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="trust-item">
                  <i className="bi bi-truck"></i>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;