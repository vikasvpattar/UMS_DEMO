import axios from "axios";
import React, { useState } from "react";
import { STUDENT_CONFIRM_PASSWORD } from "../../utils/apiConstants";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

function ForgotPassword1({ setCollegeId, changeCollege }) {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [loading, setLoading] = useState(0);

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const handeResetPassword = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Password is Required");
    if (!cpassword) return toast.error("Confirm Password is Required");
    if (password !== cpassword)
      return toast.error("New Password and Confirm Password should be same");
    setLoading(1);
    const config = {
      method: "post",
      url: STUDENT_CONFIRM_PASSWORD,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
      },
      data: {
        id: searchParams.get("id"),
        password: password,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success(res?.data?.message);
        setCPassword("");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    setLoading(0);
  };

  return (
    <div className="Login">
      <Loader loading={loading} />
      <>
        <div>
          <div className="container-fluid p-0 ">
            <div className="row no-gutters">
              <div className="col-lg-4 m-auto">
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <div className="row justify-content-center">
                      <div className="col-lg-9">
                        <div>
                          <div className="text-center">
                            <div>
                              <a href="javascript:void(0)" className="logo">
                                <img
                                  src="/assets/images/Nexenstial Logo.png"
                                  height={80}
                                  alt="logo"
                                />
                              </a>
                            </div>
                            <h4 className="font-size-18 mt-4">Welcome !</h4>
                            <p className="text-muted">
                              Sign in to continue to <br /> Swaminarayan
                              University Portal.
                            </p>
                          </div>
                          <div className="p-2 mt-5">
                            <form className="form-horizontal">
                              <div className="form-group auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon" />
                                <label htmlFor="userpassword">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Enter New Password"
                                  value={password}
                                  onChange={(e) => {
                                    setPassword(e.target.value);
                                  }}
                                />
                              </div>

                              <div className="form-group auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon" />
                                <label htmlFor="userpassword">
                                  Confirm Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Confirm New Password"
                                  value={cpassword}
                                  onChange={(e) => {
                                    setCPassword(e.target.value);
                                  }}
                                />
                              </div>

                              <div className="mt-4 text-center">
                                <button
                                  className="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                  name="submit"
                                  value="login"
                                  onClick={handeResetPassword}
                                >
                                  Reset Password
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="mt-5 text-center">
                            <p>
                              © {new Date().getFullYear()} Swaminarayan
                              University.
                              <br /> Crafted with{" "}
                              <i className="mdi mdi-heart text-danger" /> by{" "}
                              <a href="https://www.nexenstial.com/">
                                {" "}
                                Nexenstial{" "}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-8 d-sm-flex justify-content-center align-items-center d-none "
                style={{ maxHeight: "100vh", overflow: "hidden" }}
              >
                <div
                  id="carousel-example-1z"
                  className="carousel slide mb-5"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carousel-example-1z"
                      data-slide-to={0}
                      className="active"
                    />
                    <li data-target="#carousel-example-1z" data-slide-to={1} />
                    <li data-target="#carousel-example-1z" data-slide-to={2} />
                    <li data-target="#carousel-example-1z" data-slide-to={3} />
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <div
                      className="carousel-item active"
                      style={{ height: "100vh" }}
                    >
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/IMG_9760.JPG"
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/IMG_9752.JPG"
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/IMG_5983.JPG"
                        alt="Third slide"
                      />
                    </div>
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/Screenshot+2023-01-21+at+17.58.43.png"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carousel-example-1z"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carousel-example-1z"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ForgotPassword1;
