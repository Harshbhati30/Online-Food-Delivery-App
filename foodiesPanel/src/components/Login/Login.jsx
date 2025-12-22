import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Service/authService';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        await loadCartData(response.data.token);
        navigate("/");
        toast.success('Login successful!');
      } else {
        toast.error('Login failed.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-page">
    <div className="login-header">
      <div className="container">
        <i className="bi bi-cup-hot-fill logo-icon"></i>
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>
    </div>

    <section className="login-form-section">
      <div className="container">
        <div className="login-card">
          <form onSubmit={onSubmitHandler} className="login-form">
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
                placeholder="Enter your password"
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

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>

        </div>
      </div>
    </section>
  </div>
  );
}

export default Login;