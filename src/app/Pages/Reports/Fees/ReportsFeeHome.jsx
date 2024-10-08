import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import logo from "./../../../assets/images/reports/cash.png";
import logo2 from "./../../../assets/images/reports/duePayment.png";

const ReportsFeeHome = () => {
  const navigate = useNavigate();

  const changeDir = (dir, type) => {
    navigate(dir, { state: { type1: type } });
  };

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">FEE REPORTS</h4>
                </div>
              </div>
            </div>
            <hr />
            <h6>Collection reports</h6>
            <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.BHA1);
                    if (role == "SUACC") changeDir(ROUTES.Accountant.report2);
                    if (role == "CASHIER") changeDir(ROUTES.Cashier.report2);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3">Date Wise</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.BHA4);
                    if (role == "SUACC") changeDir(ROUTES.Accountant.report3);
                    if (role == "CASHIER") changeDir(ROUTES.Cashier.report3);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">Faculty Wise</h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.BHA7);
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.onlineTransaction);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.onlineTransaction);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3">
                      Online Transaction Report
                    </h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.hostelfeeFacultyWise,
                        "Male"
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.hostelfeeFacultyWise);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.hostelfeeFacultyWise);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Faculty Wise Hostel Fee Report
                    </h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.collegewiseCllection
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.collegewiseCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.collegewiseCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      College wise Collection Reports
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.departmentwiseCllection
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.departmentwiseCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.departmentwiseCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Deparment wise Collection Reports
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.programwiseCllection
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.programwiseCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.programwiseCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Program wise Collection Reports
                    </h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.hostelfeeCollection
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.hostelfeeCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.hostelfeeCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Hostel Fee Report(Consolidated)
                    </h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.hostelfeeCollection,
                        "Male"
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.hostelfeeCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.hostelfeeCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Hostel Fee Report(Boys)
                    </h6>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(
                        ROUTES.Registar.Reports.Fee.hostelfeeCollection,
                        "Female"
                      );
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.hostelfeeCollection);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.hostelfeeCollection);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Hostel Fee Report(Girls)
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.Transport);
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.TransportDateWise);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.TransportDateWise);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3">
                      Transport Reports Date Wise
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.CancelledReceipts);
                    if (role == "SUACC") changeDir(ROUTES.Accountant.CancelledReceipts);
                    // if (role == "CASHIER") changeDir(ROUTES.Cashier.report2);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo} className="w-75 " alt="" />
                    <h6 className="text-center mt-3">Cancelled Receipt Reports</h6>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h6>Pending Reports</h6>
            <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUACC") changeDir(ROUTES.Accountant.report1);
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.BHA0);
                    if (role == "CASHIER") changeDir(ROUTES.Cashier.report1);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo2} className="w-75 " alt="" />
                    <h6 className="text-center mt-3">Class Wise Due</h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.Pending);
                    if (role == "SUACC") changeDir(ROUTES.Accountant.report4);
                    if (role == "CASHIER") changeDir(ROUTES.Cashier.report4);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo2} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Department wise pending report
                    </h6>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="card cursor-pointer"
                  onClick={() => {
                    if (role == "SUPERADMIN")
                      changeDir(ROUTES.Registar.Reports.Fee.PendingCollegewise);
                    if (role == "SUACC")
                      changeDir(ROUTES.Accountant.PendingCollegewise);
                    if (role == "CASHIER")
                      changeDir(ROUTES.Cashier.PendingCollegewise);
                  }}
                >
                  <div
                    className="card-body d-flex flex-column align-items-center"
                    style={{ width: "170px" }}
                  >
                    <img src={logo2} className="w-75 " alt="" />
                    <h6 className="text-center mt-3  ">
                      Pending College Reports
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

export default ReportsFeeHome;
