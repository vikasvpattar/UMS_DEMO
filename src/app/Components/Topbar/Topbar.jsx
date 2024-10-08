import React from "react";
import "./Topbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import india from "../../assets/images/flags/india.png";
import us from "../../assets/images/flags/us.png";
import karnataka from "../../assets/images/flags/karnataka.png";

import { LOCAL_COLLEGE } from "./../../utils/LocalStorageConstants";
import {
  SESSION_COLLEGE_ID,
  SESSION_EMPLOYEE_ID,
} from "../../utils/sessionStorageContants";
import { ROUTES } from "../../Router/routerConfig";
import { EMPLOYEE } from "../../utils/apiConstants";
import axios from "axios";
function Topbar({ changeCollege }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [collegeTitle, setCollegeTitle] = useState("College");
  // const [collegeOpt, setCollegeOpt] = useState()
  const [dropdownOpen, setDropdownOpen] = useState();

  const [employeeId, setEmployeeId] = useState(
    sessionStorage.getItem(SESSION_EMPLOYEE_ID)
  );

  const Logout = () => {
    console.log("enterd function");
    sessionStorage.clear();
    navigate("/");
  };

  const getUserRole = () => {
    return sessionStorage.getItem("role")
      ? sessionStorage.getItem("role")
      : null;
  };

  const getColleges = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const checkRoleAndNavigateToTicket = () => {
    if (role == "SUPERADMIN") navigate(ROUTES.Registar.Ticket);

    if (role == "ADMIN") {
      navigate(ROUTES.Principal.Ticket);
    }

    if (role == "STAFF") navigate(ROUTES.Employee.Ticket);

    if (role == "SUACC" || role == "ACC") navigate(ROUTES.Accountant.Ticket);

    if (role == "LIB") navigate(ROUTES.Library.ticket);
  };

  const [localCollege, setLocalCollege] = useState();

  const [empDetails, setEmpDetails] = useState();

  const [collegeOpt, setCollegeOpt] = useState(getColleges);

  useEffect(() => {
    setRole(getUserRole());
  }, [sessionStorage.getItem("role")]);

  useEffect(() => {
    setCollegeOpt(getColleges);
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : "1111000";
  };

  const [selectedCollege, setSelectedCollege] = useState(getCollegeId);

  const changeCollegeId = (id) => {
    setSelectedCollege(id);
    changeCollege(id);
  };

  const paths = location?.pathname?.split("/");

  const getEmployee = async () => {
    const config = {
      method: "get",
      url: `${EMPLOYEE}/${employeeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setEmpDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (employeeId) getEmployee();
  }, [employeeId]);

  return (
    location.pathname !== "/login" && (
      <div className="Topbar">
        <header id="page-topbar">
          <div className=" d-flex justify-content-between">
            <div className="d-flex justify-content-start mh-100">
              <div className="d-flex justify-content-start">
                <Link
                  to="#"
                  className="d-flex justify-content-center align-items-center px-2"
                  style={{ background: "white" }}
                >
                  <img
                    src={"/assets/images/logoWide.png"}
                    alt=""
                    className=""
                    width={180}
                  />
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 font-size-24 d-lg-none header-item"
                data-toggle="collapse"
                data-target="#topnav-menu-content"
                style={{ marginLeft: "auto" }}
              >
                <i className="ri-menu-2-line align-middle" />
              </button>
            </div>
            <div className="d-flex">
              {role === "REGISTRAR" ||
              role === "SHR" ||
              role === "SUPERADMIN" ||
              role === "SUACC" ||
              role === "CASHIER" ||
              role === "WARDEN" ||
              (role === "AD-CON" && paths.find((s) => s == "con")) ? (
                <div>
                  <select
                    className="header-item text-right  bg-transparent text-light  border-0 d-sm-block d-none"
                    style={{ outline: "none" }}
                    value={selectedCollege}
                    onChange={(e) => {
                      changeCollegeId(e.target.value);
                      localStorage.setItem("clg", e.target.value);
                    }}
                  >
                    {collegeOpt?.map((i, key) => (
                      <option className="text-secondary" value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {role === "STAFF" ? (
                <a
                  href="https://nexenstial.in/unversity_assests/Staff%20Manual.pdf#toolbar=0"
                  target="_blank"
                  className="btn  text-light d-flex align-items-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Staff Manual"
                >
                  <i class="ri-newspaper-line mr-1"></i>Manual
                </a>
              ) : null}
              <button
                onClick={checkRoleAndNavigateToTicket}
                className="btn  text-light d-flex align-items-center"
              >
                <i className="ri ri-coupon-line mr-1"></i> Ticket
              </button>

              <div className="d-flex">
                <button
                  className="btn action-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    className="rounded-circle header-profile-user"
                    src="/assets/images/users/avatar-2.jpg"
                    alt="Header Avatar"
                  />
                  <span className="d-none d-xl-inline-block ml-1"></span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </button>
                {dropdownOpen ? (
                  <div className="action-list">
                    <ul>
                      {role == "STAFF" && (
                        <>
                          <li>
                            <button
                              type="submit"
                              className="dropdown-item"
                              onClick={() => {
                                navigate(ROUTES.Employee.Profile);
                              }}
                            >
                              <i className="ri-user-line align-middle mr-1" />{" "}
                              Profile
                            </button>
                          </li>
                        </>
                      )}
                      <li>
                        <div
                          className="dropdown-item text-danger w-100 cursor-pointer"
                          onClick={() => {
                            Logout();
                          }}
                        >
                          <i className="ri-shut-down-line align-middle mr-1 text-danger" />{" "}
                          Logout
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  );
}

export default Topbar;
