import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useLocation } from "react-router-dom";

function Static({ data }) {
  const location = useLocation();
  return (
    <li className="nav-item dropdown">
      <Link
        to={data.route}
        className={`nav-link dropdown-toggle arrow-none cursor-pointer ${
          location.pathname === data.route
            ? "navbarActiveClass"
            : data.route == "/homeoEvents" && data?.title == "Events"
            ? "navbarActiveClass"
            : ""
        }`}
      >
        {data.icon}
        {data.title}
      </Link>
    </li>
  );
}

export default Static;
