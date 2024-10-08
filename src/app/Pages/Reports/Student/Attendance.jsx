import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig";
import axios from "axios";
import { useState, useEffect } from "react";

const Attendance = () => {
  const navigate = useNavigate();

  let role = sessionStorage.getItem("role");

  useEffect(() => {}, []);
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Attendance Reports</h4>
                </div>
              </div>
            </div>
            <hr />
            <h6>Collection reports</h6>
            <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
              <div className="p-3 d-flex">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN") {
                      navigate(
                        ROUTES.Registar.Reports.Student.AttendanceSemWise
                      );
                    } else if (role == "ADMIN") {
                      navigate(ROUTES.Principal.Reports.AttendanceSemWise);
                    } else if (role == "STAFF") {
                      navigate(ROUTES.Employee.Reports.AttendanceSemWise);
                    }
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/immigration.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Semester Wise</h6>
                  </div>
                </div>
                <div
                  className="card cursor-pointer ml-3"
                  onClick={() => {
                    if (role == "SUPERADMIN") {
                      navigate(ROUTES.Registar.Reports.Student.MonthWise);
                    } else if (role == "ADMIN") {
                      navigate(ROUTES.Principal.Reports.MonthWise);
                    } else if (role == "STAFF") {
                      navigate(ROUTES.Employee.Reports.MonthWise);
                    }
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/immigration.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Month Wise</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
