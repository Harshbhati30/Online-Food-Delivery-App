import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { CalculateCartTotals } from '../../util/CartUtils';

const PlaceOrder = () => {

  const {quantities, foodList , setQuantities }=useContext(StoreContext);

  const cartItem = foodList.filter((food) => quantities[food.id] > 0);

  const {subtotal, shipping, tax, total} = CalculateCartTotals(cartItem, quantities);
  
  return (

    <div className="container mt-2">
        <main>

        <div className="py-5 text-center">
        <img className="d-block mx-auto" src={assets.logo} alt="" width="98"height="98"/>
        </div>

      <div class="row g-5">

      {/* Cart  */}
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">{cartItem.length}</span>
          </h4>
          <ul class="list-group mb-3">
           {cartItem.map((item) => (
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">{item.name}</h6>
                <small class="text-body-secondary">Qty: {quantities[item.id]}</small>
              </div>
              <span class="text-body-secondary">&#8377; {(item.price * quantities[item.id]).toFixed(2)}</span>
            </li>
           ))
           }
            <li class="list-group-item d-flex justify-content-between">
              <div>
                <span>Shipping</span>
              </div>
              <span class="text-body-secondary">&#8377;{shipping.toFixed(2)}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <span>Tax(10%)</span>
              </div>
              <span class="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
            </li>
            
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* <!-- Billing Form --> */}
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <label htmlFor="firstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required/>
              </div>

              <div class="col-sm-6">
                <label htmlFor="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" value="" required/>
              </div>

              <div class="col-12">
                <label htmlFor="email" class="form-label">Email</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input type="email" class="form-control" id="email" placeholder="you@example.com" required/>
                </div>
              </div>

              <div class="col-12">
                <label htmlFor="phone" class="form-label">Mobile Number</label>
                <input type="number" class="form-control" id="phone" placeholder="Enter Your Mobile Number" required/>
              </div>

              <div class="col-12">
                <label htmlFor="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required/>
              </div>

              <div class="col-md-5">
                <label htmlFor="country" class="form-label">Country</label>
                <select class="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              </div>

              <div class="col-md-4">
                <label htmlFor="state" class="form-label">State</label>
                <select class="form-select" id="state" required>
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

              <div class="col-md-3">
                <label htmlFor="zip" class="form-label">Zip</label>
                <input type="number" class="form-control" id="zip" placeholder="" required/>
              </div>
            </div>

            <hr class="my-4"/>

            <button class="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItem.length === 0}>Continue to checkout</button>
          </form>
        </div>
      </div>
        </main>
    </div>
  )
}


export default PlaceOrder;