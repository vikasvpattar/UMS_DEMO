import axios from "axios";
import React from "react";
import { useState } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import { REPORT_FEE_DETAILS } from "../../../utils/Reports.apiConst";
import * as XLSX from "xlsx/xlsx.mjs";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useNavigate } from "react-router-dom";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { useRef } from "react";
import { college_title } from "../../../Data/main";

const ReportsBha2 = ({ setLoading }) => {
  const [user, setUser] = useState({
    date: "",
  });

  const tableRef = useRef();

  const [data, setData] = useState([]);

  const navigate = useNavigate();

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
      url: `${REPORT_FEE_DETAILS}?transaction_date=${user?.date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  return (
    <div>
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
                      <label htmlFor="">Date</label>
                      <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.date}
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
                    <div className="card-title">Fee Reports</div>
                    <button
                      className="btn btn-primary rounded-pill"
                      onClick={onDownload}
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered" ref={tableRef}>
                        {/* {
                          collegeList?.map((i, key) => (
                            <>
                              <tr>
                                <th>Cllege name : {i?.name}</th>
                              </tr>
                              <tr>
                                <th>Date : {user?.date}</th>
                              </tr>
                              <tr>
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>USN</th>
                                <th>Transaction Id</th>
                                <th>Payment Type</th>
                                <th>Note</th>
                                <th>Amount</th>
                              </tr>
                              {
                                data?.map((i, key) => (
                                  <>
                                    {
                                      i?.newAmount?.map((j, key2) => (
                                        <tr>
                                          <td>{key + 1}</td>
                                          <td>{i?.studentName}</td>
                                          <td>{i?.usn}</td>
                                          <td>{j?.payment_id}</td>
                                          <td>{j?.mode}</td>
                                          <td>{j?.note}</td>
                                          <td>{j?.amount}</td>
                                        </tr>
                                      ))
                                    }
                                  </>
                                ))
                              }
                            </>
                          ))
                        } */}
                        <tr>
                          <th colSpan={7}>{college_title}</th>
                        </tr>
                        <tr>
                          <th colSpan={7}>Date : {user?.date}</th>
                        </tr>
                        <tr>
                          <th>Sl.No</th>
                          <th>Name</th>
                          <th>USN</th>
                          <th>Transaction Id</th>
                          <th>Payment Type</th>
                          <th>Note</th>
                          <th>Amount</th>
                        </tr>

                        {data && data?.length != 0 ? (
                          data?.map((i, key) => (
                            <>
                              {i?.newAmount?.map((j, key2) => (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{i?.studentName}</td>
                                  <td>{i?.usn}</td>
                                  <td>{j?.payment_id}</td>
                                  <td>{j?.mode}</td>
                                  <td>{j?.note}</td>
                                  <td>{j?.amount}</td>
                                </tr>
                              ))}
                            </>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        )}

                        {data && data?.length != 0 ? (
                          <tr>
                            <td colSpan={7}>
                              <div className="d-flex justify-content-end">
                                Grand Total &nbsp;&nbsp;: &nbsp;&nbsp;
                                <strong>
                                  {data?.reduce(
                                    (acc, current) =>
                                      acc +
                                      current?.newAmount?.reduce(
                                        (acc2, current2) =>
                                          acc2 + current2?.amount,
                                        0
                                      ),
                                    0
                                  )}
                                </strong>
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </table>
                    </div>
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

export default ReportsBha2;
