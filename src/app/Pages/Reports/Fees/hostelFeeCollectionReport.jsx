import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { HOSTELPAYMENTDATA } from "../../../utils/fees.apiConst";
import { useDownloadExcel } from "react-export-table-to-excel";
import { college_title } from "../../../Data/main";

function HostelFeeCollectionReport({ setLoading }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  // const [user, setUser] = useState({
  //   from_date: "",
  //   to_date: "",
  // });

  const [user, setUser] = useState({
    from_date: new Date().toISOString().split('T')[0], // Set to current date
    to_date: new Date().toISOString().split('T')[0], // Set to current date
  });

  const { type1 } = state;

  console.log(type1);

  const [dates, setDates] = useState([]);

  let count = 0;

  const [details, setDetails] = useState([]);
  const [sum, setSum] = useState();

  const tableRef = useRef();

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
      url: `${HOSTELPAYMENTDATA}?to_date=${user?.to_date}&from_date=${user?.from_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config).then((res) => {
      setLoading(0);

      console.log(res.data.data);
      setDetails(res.data.data.data);

      if (type1 == "Male") {
        let x = 0;
        let data = res.data.data.data.filter(
          (s) => s.gender == "Male" || s.gender == "male"
        );
        for (var i = 0; i < data.length; i++) {
          x += parseInt(data[i].amount);
        }
        setSum(x);

        const result = {};
        for (var i = 0; i < data.length; i++) {
          if (!result[data[i].date]) {
            result[data[i].date] = {
              date: data[i].date,
              totalAmount: parseInt(data[i].amount),
            };
          } else {
            result[data[i].date].totalAmount += parseInt(data[i].amount);
          }
        }
        const groupedArray = Object.values(result);
        groupedArray.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setDates(groupedArray);
      } else if (type1 == "Female") {
        let x = 0;
        let data = res.data.data.data.filter(
          (s) => s.gender == "Female" || s.gender == "female"
        );
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          x += parseInt(data[i].amount);
        }
        setSum(x);

        const result = {};
        for (var i = 0; i < data.length; i++) {
          if (!result[data[i].date]) {
            result[data[i].date] = {
              date: data[i].date,
              totalAmount: parseInt(data[i].amount),
            };
          } else {
            result[data[i].date].totalAmount += parseInt(data[i].amount);
          }
        }
        const groupedArray = Object.values(result);
        groupedArray.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setDates(groupedArray);
      } else {
        const result = {};
        for (var i = 0; i < res.data.data.data.length; i++) {
          if (!result[res.data.data.data[i].date]) {
            result[res.data.data.data[i].date] = {
              date: res.data.data.data[i].date,
              totalAmount: parseInt(res.data.data.data[i].amount),
            };
          } else {
            result[res.data.data.data[i].date].totalAmount += parseInt(
              res.data.data.data[i].amount
            );
          }
        }
        const groupedArray = Object.values(result);
        groupedArray.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
        setDates(groupedArray);
        setSum(res.data.data.total);
      }
    });
  };

  useEffect (() => {
    getData();
  },[]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Hostel Fee Collection",
    sheet: "Users",
  });

  return (
    <div>
      {" "}
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
                  <h4 className="mb-0">{type1} HOSTEL DATE WISE FEE REPORTS</h4>
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
                        name="from_date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.from_date}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Date</label>
                      <input
                        type="date"
                        name="to_date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.to_date}
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
                    <div className="card-title">{type1} Hostel Fee Reports</div>
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
                        <tr>
                          <th>Sl.No</th>
                          <th>Date</th>
                          <th>Student Name</th>
                          <th>Enrollment No.</th>
                          <th>Transaction Id</th>
                          <th>Payment Type</th>
                         
                          <th>Note</th>
                          <th>Amount</th>
                        </tr>

                        <tr className="bg-dark text-light">
                          <td colSpan={7}>Hostel Fees</td>
                          <td>{sum > 0 ? sum : 0}</td>
                        </tr>
                        {dates &&
                          dates.map((d, i) => {
                            return (
                              <>
                                <tr className="">
                                  <td colSpan={8}>{college_title}</td>
                                </tr>
                                <tr className="bg-dark text-light">
                                  <td colSpan={7}>Date: {d?.date}</td>
                                  <td>{d?.totalAmount}</td>
                                </tr>
                                {details &&
                                  details.map((item, key) => {
                                    if (type1 === "Male") {
                                      if (
                                        item?.gender === "Male" ||
                                        item?.gender === "male"
                                      ) {
                                        {
                                          count = count + 1;
                                        }
                                        if (item?.date == d?.date) {
                                          return (
                                            <tr key={key}>
                                              <td>{count}</td>
                                              <td>{item?.date}</td>
                                              <td>{item?.name}</td>
                                              <td>{item?.usn}</td>
                                              <td>{item?.transaction_id}</td>
                                              <td>{item?.payment_type}</td>
                                             
                                              <td>{item?.note}</td>
                                              <td>{item?.amount}</td>
                                            </tr>
                                          );
                                        }
                                      }
                                    } else if (type1 === "Female") {
                                      if (
                                        item?.gender === "Female" ||
                                        item?.gender === "female"
                                      ) {
                                        {
                                          count = count + 1;
                                        }
                                        if (item?.date == d?.date) {
                                          return (
                                            <tr key={key}>
                                              <td>{count}</td>
                                              <td>{item?.date}</td>
                                              <td>{item?.name}</td>
                                              <td>{item?.usn}</td>
                                              <td>{item?.transaction_id}</td>
                                              <td>{item?.payment_type}</td>
                                             
                                              <td>{item?.note}</td>
                                              <td>{item?.amount}</td>
                                            </tr>
                                          );
                                        }
                                      }
                                    } else {
                                      {
                                        count = count + 1;
                                      }
                                      if (item?.date == d?.date) {
                                        return (
                                          <tr key={key}>
                                            <td>{count}</td>
                                            <td>{item?.date}</td> 
                                            <td>{item?.name}</td>
                                            <td>{item?.usn}</td>
                                            <td>{item?.transaction_id}</td>
                                            <td>{item?.payment_type}</td>
                                        
                                            <td>{item?.note}</td>
                                            <td>{item?.amount}</td>
                                          </tr>
                                        );
                                      }
                                    }
                                    return null;
                                  })}
                              </>
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
    </div>
  );
}

export default HostelFeeCollectionReport;
