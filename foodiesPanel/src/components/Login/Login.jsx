import React, { use, useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../Service/authService'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
const Login = () => {
const {setToken} =useContext(StoreContext);

const navigate = useNavigate();

  const [data , setData] = useState({
    email: '',
    password: ''
  })


  const onChangeHandler =(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }


  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try {
      const response = await login(data);
      if(response.status === 200){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate("/");
        toast.success('Login successful!');
      }
      else{
        toast.error('Login failed. Please try again.');
      }
    } 
    catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }

    return (
     <div className="login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" name='email' onChange={onChangeHandler} value={data.email} placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" name='password' onChange={onChangeHandler} value={data.password} id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid mb-2">
                <button className="btn btn-outline-primary btn-login text-uppercase "  type="submit">Sign
                  in</button>
              </div>

              <div class="d-grid mb-2">
                <button class="btn btn-outline-danger btn-login text-uppercase " type="submit">
                  <i class="bi bi-google"></i> Sign in with Google
                </button>
              </div>

              <div className="mt-4">
                Don't have an account <Link to="/register">sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login