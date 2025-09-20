import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="py-5 mb-4 bg-light rounded-3 mt-1">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Order Your Favourite Food Here</h1>
        <p className="col-md-8 fs-4">We are here to serve you the best food in the town. Just explore and order your food.</p>
        <Link to="/explore"  className="btn btn-primary btn-lg" > Explore</Link>
        </div>
    </div>
  )
}

export default Header