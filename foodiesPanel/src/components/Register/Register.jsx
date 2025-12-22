import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../Service/authService';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success('Registration successful!');
        navigate("/login");
      } else {
        toast.error('Registration failed.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Header Section */}
      <div className="register-header">
        <span className="header-emoji">🍔</span>
        <div className="container">
          <i className="bi bi-cup-hot-fill logo-icon"></i>
          <h2>Create Account</h2>
          <p>Join us today</p>
        </div>
      </div>

      {/* Form Section */}
      <section className="register-form-section">
        <div className="container">
          <div className="register-card">
            <form onSubmit={onSubmitHandler} className="register-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-register" disabled={loading}>
                {loading ? <span className="spinner"></span> : 'Create Account'}
              </button>
            </form>

            <p className="login-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;