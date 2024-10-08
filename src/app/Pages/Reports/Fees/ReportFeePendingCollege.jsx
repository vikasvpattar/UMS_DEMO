import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import { FEE_PENDING_COLLEGE_WISE, FEE_REPORT_CLG } from "../../../utils/fees.apiConst";
import { useDownloadExcel } from "react-export-table-to-excel";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";

const ReportFeePendingCollege = ({ setLoading }) => {
  const getColleges = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };


  const [data, setData] = useState([]);
  const [hosteldata, sethostelData] = useState([]);
  const [collegeOpt, setCollegeOpt] = useState(getColleges);
  const [status, setStatus] = useState('');
  
  const [studentType, setStudentType] = useState('');

  const [totalDue, setTotalDue] = useState(0);

  const [session, setSession] = useState("");

  const [collegeTotalDue, setCollegeTotalDue] = useState(0);
  const [hostelTotalDue, setHostelTotalDue] = useState(0);

  const navigate = useNavigate();

  const tableRef = useRef();

  const getData = async () => {
    if (!session) return toast.error("Session is required");
    console.log("session_id",session);
    setLoading(1);

    const config = {
      method: "get",
      url: `${FEE_PENDING_COLLEGE_WISE}/${session}`,
    };

    await axios(config)
      .then((res) => {

        console.log("Error Data", res.data.data);

        setData(res.data.data.CollegeFees);
        sethostelData(res.data.data.HostelFees);
        console.log("API response:", res.data.data.CollegeFees);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const getData2 = async () => {
    if (!session) return toast.error("Session is required");
    setLoading(1);
    const config = {
      method: "get",
      url: `${FEE_REPORT_CLG}?status=${status}&session_id=${session}&studentType=${studentType}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log('data - ', res.data.data);
        let tempData = res.data.data;
        let sum = 0;
        for(let i in tempData) {
          sum = sum + tempData[i]?.amount - tempData[i]?.paid_amount - tempData[i]?.discount
        }
        setTotalDue(sum);
        setData(res.data.data);
        setLoading(0);
        let filteredData = res.data.data;
        // filteredData = filteredData.filter((s) => status == "" || s?.status == status);
        console.log('f1 - ', filteredData.length)
        setLoading(0);
        let groupedData = [];

      for (let i in filteredData) {
        let college_id = filteredData[i]?.college_id;
        let existingGroup = groupedData.find(group => group.college_id === college_id);

        if (!existingGroup) {
          existingGroup = {
            college_id: college_id,
            amount: filteredData[i].amount,
            paid_amount: filteredData[i].paid_amount,
            discount: filteredData[i].discount,
            fine: filteredData[i].fine,
            balance: filteredData[i].amount - filteredData[i].paid_amount,
            hostel_amount: filteredData[i].hostel_amount,
            hostel_payment_amount: 0,
            hostel_balance: 0,
            students: []
          };
          groupedData.push(existingGroup);
        }
        else {
          existingGroup.amount +=  filteredData[i].amount;
          existingGroup.paid_amount += filteredData[i].paid_amount;
          existingGroup.discount += filteredData[i].discount;
          existingGroup.fine += filteredData[i].fine;
          existingGroup.balance += filteredData[i].amount - filteredData[i].paid_amount;
          existingGroup.hostel_amount += filteredData[i].hostel_amount;
          // existingGroup.hostel_payment_amount += filteredData[i].hostel_payment_amount;
          // existingGroup.hostel_balance += filteredData[i].hostel_amount - filteredData[i].hostel_payment_amount;
        }

        // let x = 0;
        // let arr = JSON.parse(filteredData[i].hostel_payment);
        // for (let j in arr) {
        //   x = x + parseInt(arr[j].payment_amount);
        // }
        // filteredData[i].hostel_payment_amount = x;
        // existingGroup.hostel_payment_amount += x;
        // existingGroup.hostel_balance += filteredData[i].hostel_amount - x;
        // existingGroup.students.push(filteredData[i]);
      }
      groupedData.sort((a, b) => a.college_id - b.college_id);
      console.log('filtered data - ', groupedData);
      setData(groupedData);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  // useEffect(() => {
  //   let total = 0;
  //   hosteldata?.map((value, index) => {
  //     total = total + value.pending;
  //   });
  //   setHostelTotalDue(total);
  // }, [hosteldata]);

  // useEffect(() => {
  //   let total = 0;
  //   data?.map((value, index) => {
  //     total = total + value.pending;
  //   });
  //   setCollegeTotalDue(total);
  // }, [data]);
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
                  <h4 className="mb-0">FEE REPORTS SESSION WISE</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 p-2">
                      College and Hostel Wise Due Fees Report
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card p-3">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Session</label>
                        <select
                          name=""
                          id=""
                          value={session}
                          onChange={(e) => setSession(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Select Session</option>
                          {sessionOpt.map((i, key) => (
                            <option key={key} value={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Status<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Student Type<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={studentType}
                            onChange={(e) => setStudentType(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="0">REGULAR</option>
                            <option value="1">SCHOLARSHIP</option>
                          </select>
                        </div>
                      </div> */}
                      <div className="col-md-3 mt-5">
                        <button
                          onClick={getData2}
                          className="btn btn-primary rounded-pill float-right mr-3"
                        >
                          Search
                        </button>
                      </div>
                  </div>
                </div>

                <div className="p-3 card">
                  <div className="card-title">College wise due fees</div>
                  {data?.length != 0 ? (
                    <div className="row my-3">
                      <div className="col-md-12 d-flex justify-content-end">
                        <button
                          onClick={onDownload}
                          className="btn btn-success"
                        >
                          Export
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="card-contend">
                    <div className="table-responsive">
                      <table ref={tableRef} className="table table-bordered">
                        <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>College</th>
                          <th className="text-right">College Due Fees</th>
                          {/* <th>Hostel Due Fees</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((i,k) => {
                          return (<tr>
                            <td>{k+1}</td>
                            <td>{collegeOpt?.find((s) => s.id == i.college_id)?.name}</td>
                            <td className="text-right">{(i?.amount - i?.paid_amount - i?.discount)?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                            {/* <td>{0}</td> */}
                          </tr>)
                        })}
                        <tr>
                          <th></th>
                          <th>Total</th>
                          <th className="text-right">{totalDue?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})}</th>
                          {/* <th>{0}</th> */}
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

export default ReportFeePendingCollege;
