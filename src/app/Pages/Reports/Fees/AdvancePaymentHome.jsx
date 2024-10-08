import React from "react";
import { ROUTES } from "../../../Router/routerConfig";
import logo from "./../../../assets/images/reports/cash.png";
import { useNavigate } from "react-router-dom";

const AdvancePaymentHome = () => {
  const navigate = useNavigate();

  const changeDir = (dir) => {
    navigate(dir);
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">ADVANCE PAYMENT FEE REPORTS</h4>
              </div>
            </div>
          </div>
          <hr />
          <h6>Collection reports</h6>
          <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
            <div className="p-3">
              <div
                className="card cursor-pointer"
                onClick={() =>
                  changeDir(ROUTES.Registar.Reports.Fee.AdvancePayment)
                }
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
          </div>
        </div>
        {/* End Page-content */}
      </div>
      {/* end main content*/}
    </div>
  );
};

export default AdvancePaymentHome;
