import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { CalculateCartTotals } from '../../util/CartUtils';
import axios from 'axios';
import { toast } from 'react-toastify'
import { RAZORPAY_KEY } from '../../util/constants';
import { useNavigate } from 'react-router-dom';
// import Razorpay from 'razorpay'; 

const PlaceOrder = () => {

  const {quantities, foodList , setQuantities , token }=useContext(StoreContext);
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
    const value=event.target.value;
    setData((data) => ({...data, [name]:value}));
  }

  const onSubmitHandler = async (event) =>{
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
      const response = await axios.post('http://localhost:8080/api/orders/create', orderData, {headers: {Authorization: `Bearer ${token}`}});
      if(response.status === 201 && response.data.razorpayOrderId){
        initiateRazorpayPayment(response.data);
      }
      else{
        toast.error('Failed in placing order. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while placing the order. Please try again.');
    }

  }

  const initiateRazorpayPayment = (orderResponse) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: orderResponse.amount * 100,
      currency: "INR",
      name: "FoodLand",
      description: " Food Order Payment",
      order_id: orderResponse.razorpayOrderId,
      handler: async function  (razorpayResponse) {
        await verifyPayment( razorpayResponse);
      },
      prefill:{
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme:{
        color: "#3399cc"
      },
      modal: {
        ondismiss: async function(){
          toast.error('Payment Canclled');
          await deleteOrder(order.id);
        }
      }
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };
    try {
          const response = await axios.post('http://localhost:8080/api/orders/verify', paymentData, {headers: {Authorization: `Bearer ${token}`}})
        if(response.status === 200){
          toast.success('Payment Successful! Order Placed.');
          await clearCart();
          navigate('/myorders');
        }
        else{
          toast.error('Payment verification failed. Please contact support.');
          navigate('/');
        }
    } catch (error) {
      toast.error('Try Again Later. Something went wrong.');
    }

  }


  const deleteOrder = async (orderId) => {
    try {
      await axios.delete('http://localhost:8080/api/orders/' + orderId , {headers: {Authorization: `Bearer ${token}`}});

    } catch (error) {
      toast.error('Please contact support team.');
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:8080/api/cart', {headers: {Authorization: `Bearer ${token}`}});
      setQuantities({});
    } catch (error) {
      toast.error('Failed to clear cart. Please contact support team.');
    }
  }

  const cartItem = foodList.filter((food) => quantities[food.id] > 0);

  const {subtotal, shipping, tax, total} = CalculateCartTotals(cartItem, quantities);
  
  return (

    <div className="container mt-2">
        <main>

        <div className="py-5 text-center">
        <img className="d-block mx-auto" src={assets.logo} alt="" width="98"height="98"/>
        </div>

      <div className="row g-5">

      {/* Cart  */}
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItem.length}</span>
          </h4>
          <ul className="list-group mb-3">
           {cartItem.map((item) => (
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
              </div>
              <span className="text-body-secondary">&#8377; {(item.price * quantities[item.id]).toFixed(2)}</span>
            </li>
           ))
           }
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <span>Shipping</span>
              </div>
              <span className="text-body-secondary">&#8377;{shipping.toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <span>Tax(10%)</span>
              </div>
              <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* <!-- Billing Form --> */}
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" className="form-control" id="firstName" required name='firstName' onChange={onChangeHandler} value={data.firstName}/>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" name='lastName' value={data.lastName} onChange={onChangeHandler} required/>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" value={data.email} name='email' onChange={onChangeHandler} required/>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="phone" className="form-label">Mobile Number</label>
                <input type="number" className="form-control" id="phone" placeholder="Enter Your Mobile Number" value={data.phoneNumber} name='phoneNumber' onChange={onChangeHandler} required/>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={data.address} name='address' onChange={onChangeHandler} required/>
              </div>

              <div className="col-md-5">
                <label htmlFor="country" className="form-label">State</label>
                <select className="form-select" id="country" required name='state' onChange={onChangeHandler} value={data.state}>
                  <option value="">Choose...</option>
                  <option>Maharashtra</option>
                  <option>Uttar Pradesh</option>
                  <option>Bihar</option>
                  <option>West Bengal</option>
                  <option>Punjab</option>
                  <option>Haryana</option>
                  <option>Rajasthan</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="state" className="form-label">City</label>
                <select className="form-select" id="state" required name='city' onChange={onChangeHandler} value={data.city}>
                  <option value="">Choose...</option>
                  <option>Ghaziabad</option>
                  <option>Noida</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Amritsar</option>
                  <option>Meerut</option>
                  <option>Nasik</option>
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input type="number" className="form-control" id="zip" placeholder="" value={data.zip} name='zip' onChange={onChangeHandler} required/>
              </div>
            </div>

            <hr className="my-4"/>

            <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItem.length === 0}>Continue to checkout</button>
          </form>
        </div>
      </div>
        </main>
    </div>
  )
}


export default PlaceOrder;