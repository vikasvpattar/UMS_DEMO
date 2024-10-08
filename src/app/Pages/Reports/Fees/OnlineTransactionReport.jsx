import axios from "axios";
import React from "react";
import { REPORT_ONLINE_TRANSACTION_DETAILS } from "../../../utils/Reports.apiConst";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function OnlineTransactionReport({ setLoading, collegeId }) {
  const navigate = useNavigate();
  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = () => {
    PrintRecipt();
  };
  const [data, setData] = useState([]);
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [user, setUser] = useState({
    date: getCurrentDate(), // Set default value for "From Date"
    to_transaction_date: getCurrentDate(), // Set default value for "To Date"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${REPORT_ONLINE_TRANSACTION_DETAILS}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center">
                  <button
                    className="btn btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h4 className="mb-0">FEE REPORTS DATE WISE</h4>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">Select Criteria</div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">From Date</label>
                      <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.date}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">To Date</label>
                      <input
                        type="date"
                        name="to_transaction_date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.to_transaction_date}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary rounded-pill"
                        onClick={getData}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <div className="card-title text-uppercase">
                      {" "}
                      DATE WISE Fee Reports
                    </div>
                    <button
                      className="btn btn-primary rounded-pill"
                      onClick={handlePrint}
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered" ref={tableRef}>
                        <th className="text-uppercase" colSpan={10}>
                          Date Wise Online Transaction Fee Reports
                        </th>
                        <tr>
                          <th colSpan={10}>
                            Date : {user?.date} to {user?.to_transaction_date}
                          </th>
                        </tr>
                        <tr>
                          <th>Sl.No</th>
                          {/* <th>Date </th> */}
                          <th>Student Name</th>
                          <th>Enrollment No.</th>
                          <th>Faculty</th>
                          <th>Department</th>
                          <th>Class</th>
                          <th>Transaction Id</th>
                          <th>Order Id</th>
                          <th>Payment Status</th>
                          <th>Amount</th>
                        </tr>
                        {data &&
                          data?.map((item, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{item?.student_name}</td>
                                <td>{item?.usn}</td>
                                <td>{item?.college}</td>
                                <td>{item?.department}</td>
                                <td>{item?.class}</td>
                                <td>{item?.tracking_id}</td>
                                <td>{item?.order_id}</td>
                                <td>
                                  {item?.order_status
                                    ? item?.order_status
                                    : "Failure"}
                                </td>
                                <td>{item?.amount}</td>
                              </tr>
                            );
                          })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineTransactionReport;
