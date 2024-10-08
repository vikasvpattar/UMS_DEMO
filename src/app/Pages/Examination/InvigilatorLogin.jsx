import React from 'react'

function InvigilatorLogin() {
  return (
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
                                                        src="assets/images/Nexenstial Logo 1.png"

                            height={150}
                            alt="logo"
                          />
                        </a>
                      </div>
                      <h4 className="font-size-18 mt-4">Evaluater Login!</h4>
                      <p className="text-muted">
                        Sign in to continue to Swaminarayan University Exam Evaluation Portal.
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
                           
                            
                          />
                        </div>
                        <div className="form-group auth-form-group-custom mb-4">
                          <i className="ri-calendar-event-line auti-custom-input-icon" />
                          <label htmlFor="userpassword">Date</label>
                          <input
                         type="text"                            className="form-control"
                            id="date"
                            name="date"
                          
                            value={"24.08.2022"}
                            readOnly
                           
                            
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
                          
                          >
                            Log In
                          </button>
                        </div>
                        
                      </form>
                    </div>
                    <div className="mt-5 text-center">
                      <p>
                        © 2021 College Name. Crafted with{" "}
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
          {/* <img src="assets/images/infra_two.jpeg"
 alt="" /> */}
            <div className="bg-overlay" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InvigilatorLogin