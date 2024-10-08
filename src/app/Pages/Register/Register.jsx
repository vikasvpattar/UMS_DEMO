import axios from "axios";
import React, { useState } from "react";
import { LOGIN, RESET_PASSWORD } from "../../utils/apiConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import {
  SESSION_AUTH,
  SESSION_COLLEGE_ID,
  SESSION_EMPLOYEE_ID,
  SESSION_EMPLOYEE_REVIEW,
  SESSION_ROLE,
} from "../../utils/sessionStorageContants";
import { ROUTES } from "../../Router/routerConfig";

function Register({ setCollegeId, changeCollege }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(0);

  const [selected, setSelected] = useState("login");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const signinObj = {
    email: userName,
    password: password,
  };

  var config = {
    method: "post",
    url: LOGIN,
    headers: {
      "Content-Type": "application/json",
    },
    data: signinObj,
  };

  const signup = async () => {
    setLoading(1);

    await axios(config)
      .then(async (res) => {
        await sessionStorage.setItem(SESSION_ROLE, res.data.data?.role);
        sessionStorage.setItem("department_id", res.data.data?.department_id);
        sessionStorage.setItem("emp_name", res.data.data?.name);
        sessionStorage.setItem("college_id", res.data.data?.college_id);
        sessionStorage.setItem(SESSION_AUTH, res.data.data?.token);
        sessionStorage.setItem(SESSION_EMPLOYEE_ID, res.data.data?.employee_id);
        setLoading(0);
        switch (res.data.data.role) {
          case "CASHIER":
            sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            navigate("/cashier/dashboard");
            break;
          case "IT":
            navigate("/IT/ticketscentre");
            break;
          case "DEVELOPERS":
            sessionStorage.setItem("role", "DEVELOPERS");
            navigate("/ticketscentre");
            break;
          case "UNIWEBSITE":
            navigate("/mediaInfo");
            break;
          case "LIB":
            navigate("/Library/Dashboard");
            break;
          case "HOMOWEB":
            navigate("/Events");
            break;
          case "ENGGWEB":
            navigate("/Events");
            break;
          case "PHAWEB":
            navigate("/Events");
            break;
          case "SCIWEB":
            navigate("/Events");
            break;
          case "AYUWEB":
            navigate("/Events");
            break;
          case "MEDWEB":
            navigate("/StudentsResults");
            break;
          case "EDUWEB":
            navigate("/Events");
            break;
          case "LAWWEB":
            navigate("/Events");
            break;
          case "ARTSWEB":
            navigate("/ResearchandPublication");
            break;
          case "COMWEB":
            navigate("/ResearchandPublication");
            break;
          case "ITWEB":
            navigate("/ResearchandPublication");
            break;
          case "NURWEB":
            navigate("/Events");
            break;
          case "PHYWEB":
            navigate("/Events");
            break;
          case "DESWEB":
            navigate("/Events");
            break;

          case "WARDEN":
            sessionStorage.setItem("HOSTEL_ID", res?.data?.data?.hostel_id);
            navigate("/warden/hostelrooms");
            break;

          case "STAFF":
            navigate("/dashboard/employee");
            sessionStorage.setItem(
              SESSION_COLLEGE_ID,
              res?.data?.data?.college_id
            );
            sessionStorage.setItem(
              "REVIEW_APPLICATION",
              res?.data?.data?.review
            );
            changeCollege(res?.data?.data?.college_id);
            sessionStorage.setItem(
              SESSION_EMPLOYEE_REVIEW,
              res?.data?.data?.review_application
            );
            break;

          case "HR":
            navigate("/dashboard/hr");
            sessionStorage.setItem(
              SESSION_COLLEGE_ID,
              res?.data?.data?.college_id
            );
            changeCollege(res?.data?.data?.college_id);
            break;

          case "SHR":
            navigate("/dashboard/hr");
            sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            changeCollege(1111000);
            break;
          case "OFFICE":
            navigate("/frontOffice/admissionEnquiry");
            if (res.data.data.college_id != 1111012) {
              sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            }
            changeCollege(1111000);
            break;
          case "SUPERADMIN":
            navigate(ROUTES.Registar.dashboard);
            sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            changeCollege(1111000);
            break;

          case "ADMIN":
            navigate(ROUTES.Principal.dashboard);
            sessionStorage.setItem(
              SESSION_COLLEGE_ID,
              res?.data?.data?.college_id
            );
            changeCollege(res?.data?.data?.college_id);
            break;

          case "ACC":
            navigate(ROUTES.Accountant.Dashboard);
            sessionStorage.setItem(
              SESSION_COLLEGE_ID,
              res?.data?.data?.college_id
            );
            changeCollege(res?.data?.data?.college_id);
            break;

          case "SUACC":
            navigate(ROUTES.Accountant.Dashboard);
            changeCollege(1111000);
            sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            break;

          case "AD-CON":
            navigate(ROUTES.AdConsult.AdmissionEnquiry);
            changeCollege(1111000);
            sessionStorage.setItem(SESSION_COLLEGE_ID, 1111000);
            break;

          default:
            break;
        }
        toast.success(`Logged in SuccessFully as ${res.data.data.role}`);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response?.data?.message || "failed to login");
        console.log(err);
      });
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    setShowPassword(false);
    if (!userName) {
      toast.error("UserName is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    signup();
  };

  const handeResetPassword = async (e) => {
    e.preventDefault();
    setLoading(1);
    if (!email) return toast.error("Email is Required");
    const config = {
      method: "post",
      url: RESET_PASSWORD,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success(res?.data?.message);
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
                            {selected === "login" ? (
                              <form className="form-horizontal">
                                <div className="form-group auth-form-group-custom mb-4">
                                  <i className="ri-user-2-line auti-custom-input-icon" />
                                  <label htmlFor="username">Username</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={userName}
                                    onChange={(e) => {
                                      setUserName(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="form-group auth-form-group-custom mb-4">
                                  <i className="ri-lock-2-line auti-custom-input-icon" />
                                  <i
                                    className={`${
                                      showPassword
                                        ? "ri-eye-line"
                                        : "ri-eye-close-line"
                                    } password-toggler`}
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      right: "15px",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                      transform: "translateY(-25%)",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                  ></i>
                                  <label htmlFor="userpassword">Password</label>
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="userpassword"
                                    name="userpassword"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => {
                                      setPassword(e.target.value);
                                    }}
                                    style={{
                                      paddingRight: "35px",
                                    }}
                                  />
                                </div>
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
                                  <a
                                    onClick={() => {
                                      setSelected("forgot");
                                    }}
                                    className="cursor-pointer text-muted"
                                  >
                                    <i className="mdi mdi-lock mr-1" /> Forgot
                                    your password?
                                  </a>
                                </div>

                                {/* <div className="mt-4 text-center">
                                                                    <a href='JavaScript:Void(0)' className="text-muted" onClick={() => setSelected("register")}>
                                                                        Register
                                                                    </a>
                                                                </div> */}
                              </form>
                            ) : (
                              <form className="form-horizontal">
                                <div className="form-group auth-form-group-custom mb-4">
                                  <i className="ri-lock-2-line auti-custom-input-icon" />
                                  <label htmlFor="userpassword">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => {
                                      setEmail(e.target.value);
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
                                    Send Reset Link
                                  </button>
                                </div>

                                <div className="mt-5 text-center">
                                  <a
                                    onClick={() => {
                                      setSelected("login");
                                    }}
                                    className=" cursor-pointer text-muted"
                                  >
                                    Go to Login
                                  </a>
                                </div>
                              </form>
                            )}
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
                  {/*Indicators*/}
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
                  {/*/.Indicators*/}
                  {/*Slides*/}
                  <div className="carousel-inner" role="listbox">
                    {/*First slide*/}
                    <div
                      className="carousel-item active"
                      style={{ height: "100vh" }}
                    >
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/verification.nexenstial.com/university-assets/UMS-Assets/WhatsApp+Image+2023-09-03+at+5.40.25+PM.jpeg"
                        alt="First slide"
                      />
                    </div>
                    {/*/First slide*/}
                    {/*Second slide*/}
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/IMG_9752.JPG"
                        alt="Second slide"
                      />
                    </div>
                    {/*/Second slide*/}
                    {/*Third slide*/}
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/IMG_9760.JPG"
                        alt="Third slide"
                      />
                    </div>
                    {/*/Third slide*/}
                    {/*Third slide*/}
                    <div className="carousel-item" style={{ height: "100vh" }}>
                      <img
                        className="d-block w-100 h-100"
                        src="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/UMS-Assets/Screenshot+2023-01-21+at+17.58.43.png"
                        alt="Third slide"
                      />
                    </div>
                    {/*/Third slide*/}
                  </div>
                  {/*/.Slides*/}
                  {/*Controls*/}
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
                  {/*/.Controls*/}
                </div>
              </div>
              {/* <div className="col-lg-8 d-flex align-items-center justify-content-center">
                                    <img src="/assets/images/univ/add.png" alt="" />
                                <div className="authentication-bg">
                                    <div className="bg-overlay" />
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Register;
