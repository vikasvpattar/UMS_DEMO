import axios from 'axios';
import React, { useState } from 'react'
import { LOGIN } from '../../utils/apiConstants';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(0)

  const navigate = useNavigate();


  const signinObj = {
    "email": userName,
    "password": password
  };

  var config = {
    method: 'post',
    url: LOGIN,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : signinObj
  };


  const signup = async () =>{
    setLoading(1)
    await axios(config)
    .then(res=>{
      console.log(res);
      sessionStorage.setItem('role',res.data.data.role)
      sessionStorage.setItem('UMS_auth',res.data.data.token)
      navigate('/dashboard')
      toast.success(`Logged in SuccessFully as ${res.data.data.role}`)
      setLoading(0)
    })
    .catch(err=>{
      console.log(err);
      
      setLoading(0)
    })
  }

  const hadleSubmit = (e) =>{
    e.preventDefault();
    if(!userName){
      toast.error("UserName is required");
      return;
    }
    if(!password){
      toast.error("Password is required");
      return;
    }

    signup();

  }

  return (
    <div className='Login'>
      <>
  <div>
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-4">
          <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
            <div className="w-100">
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div>
                    <div className="text-center">
                      <div>
                        <a href="javascript:void(0)" className="logo">
                          <img
                            src="assets/images/Nexenstial TM.jpg"
                            height={50}
                            alt="logo"
                          />
                        </a>
                      </div>
                      <h4 className="font-size-18 mt-4">Welcome Back!</h4>
                      <p className="text-muted">
                        Sign in to continue to Swaminarayan University Portal.
                      </p>
                    </div>
                    <div className="p-2 mt-5">
                      <form
                        className="form-horizontal"
                      >
                        <div className="form-group auth-form-group-custom mb-4">
                          <i className="ri-user-2-line auti-custom-input-icon" />
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={userName}
                            onChange={(e)=>{setUserName(e.target.value)}}
                          />
                        </div>
                        <div className="form-group auth-form-group-custom mb-4">
                          <i className="ri-lock-2-line auti-custom-input-icon" />
                          <label htmlFor="userpassword">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            name="userpassword"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                          />
                        </div>
                        {/*  <div class="custom-control custom-checkbox">
                                                  <input type="checkbox" class="custom-control-input" id="customControlInline">
                                                  <label class="custom-control-label" for="customControlInline">Remember me</label>
                                              </div> */}
                        <div className="mt-4 text-center">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                            name="submit"
                            value="login"
                            onClick={hadleSubmit}
                          >
                            Log In
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <a href="/" className="text-muted">
                            <i className="mdi mdi-lock mr-1" /> Forgot your
                            password?
                          </a>
                        </div>
                      </form>
                    </div>
                    <div className="mt-5 text-center">
                      <p>
                        © 2023 College Name. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger" /> by{" "}
                        <a href="https://www.nexenstial.com/"> Nexenstial </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="authentication-bg">
            <div className="bg-overlay" />
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    </div>
  )
}

export default Login