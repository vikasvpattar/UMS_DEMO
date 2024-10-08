import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routerConfig";

const DeanReports = () => {
  const navigate = useNavigate();

  let role = sessionStorage.getItem("role");
  let employee_id = sessionStorage.getItem("employee_id");
  console.log("emp_id",employee_id);

  const changeDir = (dir) => {
    navigate(dir);
  };
  return (
    <div className="">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Reports</h4>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    onClick={() => {
                      role == "ADMIN"
                        ? changeDir(ROUTES.Principal.Reports.StudentDetails1)
                        : changeDir(ROUTES.Employee.Reports.StudentDetails1);
                    }}
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/graduated.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Student Details</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    onClick={() => {
                      role == "ADMIN"
                        ? changeDir(ROUTES.Principal.Reports.Attendance)
                        : changeDir(ROUTES.Employee.Reports.Attendance);
                    }}
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/immigration.png"
                      className="w-75"
                      alt=""
                    />
                    <h6 className="text-center mt-2">Student Attendance</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "ADMIN" && employee_id == "215")
                    changeDir(ROUTES.Principal.Reports.onlineTransaction);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img 
                    src="/assets/images/reports/cash.png"
                    className="w-75 " 
                    alt="" 
                    />
                    <h6 className="text-center mt-3">
                      Online Transaction Report
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Page-content */}
        </div>
        {/* end main content*/}
      </div>
    </div>
  );
};

export default DeanReports;
