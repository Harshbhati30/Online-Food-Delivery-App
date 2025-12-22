import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { CalculateCartTotals } from '../../util/CartUtils';
import { toast } from 'react-toastify';
import { RAZORPAY_KEY } from '../../util/constants';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { quantities, foodList, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName}, ${data.lastName}, ${data.address}, ${data.city}, ${data.state} - ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItem.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        name: item.name,
        description: item.description
      })),
      amount: total.toFixed(2),
      orderStatus: 'Preparing'
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const result = await response.json();
      
      if (response.status === 201 && result.razorpayOrderId) {
        initiateRazorpayPayment(result);
      } else {
        toast.error('Failed in placing order. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while placing the order. Please try again.');
    }
  };

  const initiateRazorpayPayment = (orderResponse) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: orderResponse.amount * 100,
      currency: "INR",
      name: "FoodLand",
      description: "Food Order Payment",
      order_id: orderResponse.razorpayOrderId,
      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: {
        color: "#8b5cf6"
      },
      modal: {
        ondismiss: async function () {
          toast.error('Payment Cancelled');
          await deleteOrder(orderResponse.id);
        }
      }
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };
    
    try {
      const response = await fetch('http://localhost:8080/api/orders/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });
      
      if (response.status === 200) {
        toast.success('Payment Successful! Order Placed.');
        await clearCart();
        navigate('/myorders');
      } else {
        toast.error('Payment verification failed. Please contact support.');
        navigate('/');
      }
    } catch (error) {
      toast.error('Try Again Later. Something went wrong.');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await fetch('http://localhost:8080/api/orders/' + orderId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      toast.error('Please contact support team.');
    }
  };

  const clearCart = async () => {
    try {
      await fetch('http://localhost:8080/api/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setQuantities({});
    } catch (error) {
      toast.error('Failed to clear cart. Please contact support team.');
    }
  };

  const cartItem = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = CalculateCartTotals(cartItem, quantities);

  return (
    <div className="place-order-container">
      <div className="place-order-header">
        <img src={assets.logo} alt="FoodLand Logo" className="logo" />
        <h2>Checkout</h2>
      </div>

      <div className="checkout-wrapper">
        {/* Billing Form */}
        <div className="billing-section">
          <div className="section-card">
            <h3 className="section-title">Delivery Information</h3>
            <div className="billing-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={data.firstName}
                    onChange={onChangeHandler}
                    required
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    required
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  required
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={data.address}
                  onChange={onChangeHandler}
                  required
                  placeholder="House number, street name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    name="state"
                    className="form-control"
                    value={data.state}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value="">Select State</option>
                    <option>Maharashtra</option>
                    <option>Uttar Pradesh</option>
                    <option>Bihar</option>
                    <option>West Bengal</option>
                    <option>Punjab</option>
                    <option>Haryana</option>
                    <option>Rajasthan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    className="form-control"
                    value={data.city}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value="">Select City</option>
                    <option>Ghaziabad</option>
                    <option>Noida</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Amritsar</option>
                    <option>Meerut</option>
                    <option>Nasik</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="form-control"
                  value={data.zip}
                  onChange={onChangeHandler}
                  required
                  placeholder="6-digit PIN"
                />
              </div>

              <button
                onClick={onSubmitHandler}
                className="checkout-btn"
                disabled={cartItem.length === 0}
              >
                {cartItem.length === 0 ? 'Cart is Empty' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary-section">
          <div className="section-card sticky-card">
            <div className="cart-header">
              <h3 className="section-title">Order Summary</h3>
              <span className="item-count">{cartItem.length} Items</span>
            </div>

            <div className="cart-items">
              {cartItem.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cartItem.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span className="item-qty">Qty: {quantities[item.id]}</span>
                    </div>
                    <span className="item-price">
                      &#8377;{(item.price * quantities[item.id]).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="cart-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>&#8377;{shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%)</span>
                <span>&#8377;{tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>&#8377;{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;