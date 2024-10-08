import React from "react";
import "./Navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";
import CheckActivePill from "./CheckActivePill";

function Sheet({ data }) {
  const navigate = useNavigate();

  const changeDir = (dir) => {
    navigate(dir);
  };

  const location = useLocation();

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle arrow-none"
        href="#"
        id="topnav-uielement"
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
        className="dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl"
        aria-labelledby="topnav-uielement"
      >
        <div className="row">
          {data.drop.map((sheet, key2) => {
            return (
              <div className={`col-lg-${12 / data.drop.length}`} key={key2}>
                <div>
                  <h5 className="font-size-14 ml-4 text-danger">
                    {sheet.title}
                  </h5>
                  <hr />
                  {sheet.elements.map((sheetElement, key3) => {
                    return (
                      <div
                        onClick={() => {
                          changeDir(sheetElement.route);
                        }}
                        href="#"
                        className={`dropdown-item cursor-pointer ${
                          CheckActivePill(sheetElement, location.pathname)
                            ? "navbarActiveClass"
                            : ""
                        }`}
                        key={key3}
                      >
                        {sheetElement.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default Sheet;
