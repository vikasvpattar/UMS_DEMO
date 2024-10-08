import React from "react";
import "./Navbar.scss";
// import { navbarData } from '../../Data/navbar/Admin/navbarData'
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Sheet from "./Sheet";
import Static from "./Static";
import { useLocation } from "react-router-dom";

function Navbar({ data: navbarData }) {
  const drop = "dropdown";
  const stat = "static";
  const sheet = "sheet";
  const location = useLocation();

  return (
    location.pathname !== "/login" && (
      <div className="Navbar sticky-top">
        <div className="topnav">
          <div className="container-fluid">
            <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
              <div
                className="collapse navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav d-flex flex-wrap justify-content-around">
                  {navbarData?.map((data, key) => {
                    return data.type === stat ? (
                      <Static data={data} key={key} />
                    ) : data.type === sheet ? (
                      <Sheet data={data} key={key} />
                    ) : data.type === drop ? (
                      <Dropdown data={data} key={key} />
                    ) : (
                      <li>typo error in type</li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  );
}

export default Navbar;
