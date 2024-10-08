import axios from "axios";
import React from "react";
import { useState } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import { useReactToPrint } from "react-to-print";
import { REPORT_COLLEGE_WISE_FEE_DETAILS } from "../../../utils/Reports.apiConst";
import * as XLSX from "xlsx/xlsx.mjs";
import { useNavigate } from "react-router-dom";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { feeJsonData } from "../../../Data/jsonData/Fee/FeeJsonData";
import { useDownloadExcel } from "react-export-table-to-excel";
import { toast } from "react-toastify";
import { useRef } from "react";
import { college_title } from "../../../Data/main";

const ReportsBha4 = ({ setLoading }) => {
  const [user, setUser] = useState({
    date: new Date().toISOString().split("T")[0], // Set to current date
    to_transaction_date: new Date().toISOString().split("T")[0], // Set to current date
  });

  // const [user, setUser] = useState({
  //   date: "",
  //   to_transaction_date: "",
  // });

  const tableRef = useRef();

  const collegeList = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const [data, setData] = useState([]);

  const tableRef1 = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = () => {
    PrintRecipt();
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    if (!user.date || !user.to_transaction_date)
      return toast.error("From and to date is required");
    const config = {
      method: "get",
      url: `${REPORT_COLLEGE_WISE_FEE_DETAILS}?transaction_date=${user?.date}&transaction_date_to=${user?.to_transaction_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log("payment data - ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (err) {
      return dateString;
    }
  }

  const downloadExcel = () => {
    let json_data = [];

    Object.keys(data).map((i, key) => {
      const obj = {
        "College Name": collegeList?.find((s) => s?.id == i)?.name,
        Amount: data[i]?.reduce(
          (acc, current) => acc + Number(current.amount),
          0
        ),
      };
      json_data.push(obj);
    });
    var worksheet = XLSX.utils.json_to_sheet(json_data);
    worksheet.wrire(0, 0, "THis is chk");
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `SUKALOL-Fee Details.xlsx`);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const getGrandTotal = () => {
    // console.log('ehre');
    var sum = 0;
    for (const key in data) {
      data[key].forEach((element) => {
        sum += Number(
          element?.newAmount?.reduce(
            (acc, current) => acc + Number(current.amount),
            0
          )
        );
        // console.log(element?.newAmount);
      });
    }
    return sum;
  };

  const handleSeparateAmount = (obj) => {
    const arr = [];
    for (const i of feeJsonData) {
      let sum = 0;
      for (const j of obj) {
        if (i.id == "Cash") {
          j?.newAmount?.forEach((el) => {
            sum += el.mode == "CASH" || el.mode == "Cash" ? el?.amount : 0;
          });
        } else {
          j?.newAmount?.forEach((el) => {
            sum += el.mode == i?.id ? el?.amount : 0;
          });
        }
      }
      const newObj = {
        id: i.id,
        sum: sum,
      };
      arr.push(newObj);
    }
    return arr;
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center">
                  <button
                    className="btn btn-nex d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h4 className="mb-0">FEE REPORT FACULTY WISE</h4>
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
                  <div className="col-md-4">
                    <div className="d-flex">
                      <button className="btn btn-nex mt-4" onClick={getData}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-nex"
                        onClick={getData}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="card-title">Faculty Wise Fee Report</div>
                  </div>
                  {/* <div
                    className="d-flex justify-content-center align-items-center px-2"
                    style={{ background: "white" }}
                  >
                    <img
                      src={"/assets/images/logoWide.png"}
                      alt=""
                      className=""
                      style={{ display: "n" }}
                      width={180}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <button
                      className="btn float-right btn-nex rounded-pill"
                      onClick={onDownload}
                    >
                      EXCEL
                    </button>
                    <button
                      className="btn float-right mr-2 btn-nex rounded-pill"
                      onClick={handlePrint}
                    >
                      Pdf
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered" ref={tableRef}>
                        <thead>
                          <tr>
                            <th colSpan={10}>{college_title}</th>
                          </tr>
                          <tr>
                            <th colSpan={10}>
                              Faculty Wise Fee Report : {formatDate(user?.date)}{" "}
                              TO {formatDate(user?.to_transaction_date)}
                            </th>
                          </tr>
                          <tr>
                            <th>Sl.No</th>
                            <th>College Name</th>
                            <th colSpan={7}>Mode</th>
                          </tr>
                          <tr>
                            <th></th>
                            <th></th>
                            <th>Cash</th>
                            <th>Cheque</th>
                            <th>DD</th>
                            <th>UPI</th>
                            <th>Card</th>
                            <th>Bank Transfer</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegeList
                            ?.filter((s) => s.status == "ACTIVE")
                            ?.map((i, k) => {
                              return (
                                <tr>
                                  <td>{k + 1}</td>
                                  <td>{i?.name}</td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id &&
                                          s.type == "CASH"
                                      )?.amount
                                        ? data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              s.type == "CASH"
                                          )?.amount
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id &&
                                          s.type == "Cheque"
                                      )?.amount
                                        ? data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              s.type == "Cheque"
                                          )?.amount
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id && s.type == "DD"
                                      )?.amount
                                        ? data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              s.type == "DD"
                                          )?.amount
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id &&
                                          (s.type == "UPI" || s.type == "Unified Payments")
                                      )?.amount
                                        ? (data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                            (s.type == "UPI")
                                          )?.amount || 0) + (data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                            (s.type == "Unified Payments")
                                          )?.amount || 0)
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id &&
                                          (s.type == "Card" || s.type == "Credit Card")
                                      )?.amount
                                        ? data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              (s.type == "Card" || s.type == "Credit Card")
                                          )?.amount
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td>
                                    {parseInt(
                                      data?.find(
                                        (s) =>
                                          s.college_id == i.id &&
                                          (s.type == "Bank Transfer" || s.type == "Net Banking")
                                      )?.amount
                                        ? (data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              s.type == "Bank Transfer"
                                          )?.amount || 0) + (data?.find(
                                            (s) =>
                                              s.college_id == i.id &&
                                              s.type == "Net Banking"
                                          )?.amount || 0)
                                        : 0
                                    )?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <th>
                                    {data
                                      ?.filter((s) => s.college_id == i.id)
                                      ?.reduce(
                                        (total, i) =>
                                          total + parseInt(i?.amount),
                                        0
                                      )
                                      ?.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                  </th>
                                </tr>
                              );
                            })}
                          <tr>
                            <th></th>
                            <th>Total</th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "CASH")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "Cheque")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "DD")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "UPI" || s.type == "Unified Payments")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "Card" || s.type == "Credit Card")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.filter((s) => s.type == "Bank Transfer" || s.type == "Net Banking")
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                            <th>
                              {data
                                ?.reduce(
                                  (total, i) => total + parseInt(i?.amount),
                                  0
                                )
                                ?.toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                  minimumFractionDigits: 0,
                                })}
                            </th>
                          </tr>
                        </tbody>
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

export default ReportsBha4;
