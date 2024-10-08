import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckActivePill from "./CheckActivePill";
import "./Navbar.scss";

function Dropdown({ data }) {
  const navigate = useNavigate();
  const drop = "dropdown";
  const stat = "static";
  const sheet = "sheet";

  const location = useLocation();

  const changeDir = (dir) => {
    navigate(dir);
  };
  return (
    <li className="navCustomDropdown nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle arrow-none ${
          CheckActivePill(data, location.pathname) ? "navbarActiveClass" : ""
        }`}
        href="#"
        id="topnav-layout"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {data.icon}
        {data.title}
        <div className="arrow-down" />
      </a>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="topnav-layout"
      >
        {data.drop.map((data2, key) => {
          return data2.type === stat ? (
            <Link
              to={data2.route}
              className={`dropdown-item cursor-pointer ${
                location.pathname === data2.route ? "navbarActiveClass" : ""
              }`}
              key={key}
            >
              {data2.title}
            </Link>
          ) : (
            <div className="dropdown" key={key}>
              <a
                className={`dropdown-item dropdown-toggle arrow-none ${
                  CheckActivePill(data2, location.pathname)
                    ? "navbarActiveClass"
                    : ""
                }`}
                href="#"
                id="topnav-auth"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {data2.title} <div className="arrow-down" />
              </a>
              <div className="dropdown-menu" aria-labelledby="topnav-auth">
                {data2.drop.map((data3, key3) => {
                  return (
                    <Link
                      to={data3.route}
                      className={`dropdown-item cursor-pointer ${
                        location.pathname === data3.route
                          ? "navbarActiveClass"
                          : ""
                      }`}
                      key={key3}
                    >
                      {data3.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
}

export default Dropdown;
