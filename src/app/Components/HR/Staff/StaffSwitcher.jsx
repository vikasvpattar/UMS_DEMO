import React from "react";
import { staffSwitches } from "../../../Data/jsonData/HR/Staff";

function StaffSwitcher(props) {
  return (
    <div className="StaffSwitcher">
      <div className="row">
        <div className="col-md-12 ">
          <div className="card setup-office">
            <div className="card-body">
              {/* Nav tabs */}
              <ul
                className="nav nav-pills justify-content-around"
                role="tablist"
              >
                {staffSwitches.map((i, key) => (
                  <li
                    className="nav-item waves-effect waves-light"
                    onClick={() => {
                      props.setTab(i);
                    }}
                    key={key}
                  >
                    <a
                      className={`nav-link ${props.tab === i ? "active" : ""}`}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home" />
                      </span>
                      <span className="d-none d-sm-block">{i}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffSwitcher;
