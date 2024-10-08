import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routerConfig";

const Reports = () => {
  const navigate = useNavigate();

  const changeDir = (dir) => {
    navigate(dir);
  };

  const role = sessionStorage.getItem("role");
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
                      if (role === "SUPERADMIN") {
                        changeDir(ROUTES.Registar.Reports.StudentDetails1);
                      } else if (role === "ABC") {
                        changeDir(ROUTES.Principal.Reports.StudentDetails1);
                      }
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
                    onClick={() => {
                      if (role === "SUPERADMIN") {
                        changeDir(ROUTES.Registar.Reports.AluminiStudents);
                      } else if (role === "ABC") {
                        changeDir(ROUTES.Principal.Reports.AluminiStudents);
                      }
                    }}
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/graduated.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">
                      Alumini Student Details
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Staff.Home);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/profile.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Staff Details</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    onClick={() => {
                      changeDir(ROUTES.Registar.Reports.Student.Home);
                    }}
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/immigration.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-2">Student Attendance</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    onClick={() => {
                      changeDir(
                        ROUTES.Registar.Reports.Student.StudentAdmissionReport
                      );
                    }}
                    style={{ width: "180px" }}
                  >
                    <img
                      src="/assets/images/reports/immigration.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-2">
                      Student Admission Reports
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(
                      ROUTES.Registar.Reports.StaffAttendance
                        .StaffAttendanceReport
                    );
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/biometrics.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3  ">Staff Attendance</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(
                      ROUTES.Registar.Reports.LessonPlan.LessonPlanReport
                    );
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/learning.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Lesson Plan</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Feedbacks.FeedbacksHome);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/learning.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Feedback</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Fee.Home);
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
                    <h6 className="text-center mt-3">Fees</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Fee.AdvancePaymentHome);
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
                    <h6 className="text-center mt-3">Advance Payment</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Expense.ExpenseReport);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/expenses.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Expenses</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    changeDir(ROUTES.Registar.Reports.Income.IncomeReport);
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
                    <h6 className="text-center mt-3">Income</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/school-bus.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Vehicle Log</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="card cursor-pointer">
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img
                      src="/assets/images/reports/bus.png"
                      className="w-75 "
                      alt=""
                    />
                    <h6 className="text-center mt-3">Vehicle Trip</h6>
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

export default Reports;
