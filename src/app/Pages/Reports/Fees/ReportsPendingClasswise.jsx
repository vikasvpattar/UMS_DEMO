import React from "react";
import { useState } from "react";
import NoData from "./../../../Components/NoData/Nodata";
import axios from "axios";
import { toast } from "react-toastify";
import Nodata from "./../../../Components/NoData/Nodata";
import { FEE_DETAILS, FEE_DETAILS_SQL, FEE_REPORT_DEPT } from "../../../utils/fees.apiConst";
import { useEffect } from "react";
import { ROUTES } from "../../../Router/routerConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "./../../../utils/Academics.apiConst";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import * as XLSX from "xlsx/xlsx.mjs";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import Select from "react-select";

function ReportsPendingClasswise({ setLoading, collegeId }) {
  const navigate = useNavigate();

  //Query data for easy filtering
  const location = useLocation();
  const query_department = new URLSearchParams(location.search).get(
    "department_id"
  );
  const query_session = new URLSearchParams(location.search).get("session_id");
  const query_class = new URLSearchParams(location.search).get("class_id");

  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [semData, setSemData] = useState([]);
  const [status, setStatus] = useState('All');

  const tableRef = useRef();

  const getDepartmentOpt = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };
  const getProgramOpt = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };
  const getCollegeOpt = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const departmentOpt = getDepartmentOpt().filter(
    (s) => s.college_id == collegeId
  );
  const programOpt = getProgramOpt();
  const collegeOpt = getCollegeOpt();

  const [user, setUser] = useState({
    session_id: query_session ? query_session : "",
    class_id: query_class ? query_class : "",
    section_id: "",
    department_id: query_department ? query_department : "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    catch(err) {
      return dateString;
    }
  }
  // const getData = async () => {
  //   if (!user.session_id) return toast.error("Session is required");
  //   if (!user.department_id) return toast.error("Department is required");
  //   setLoading(1);
  //   const config = {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const [data1, data2, data3] = await Promise.all([
  //     axios({
  //       ...config,
  //       url: `${FEE_DETAILS}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}`,
  //     })
  //       .then((res) => {
  //         console.log("This is Data", res.data.data);
  //         return res.data.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Something went wrong");
  //       }),
  //     axios({
  //       ...config,
  //       url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}&department_id=${user.department_id}`,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         return res.data.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Something went wrong");
  //       }),
  //     axios({
  //       ...config,
  //       url: `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}&department_id=${user.department_id}`,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         return res.data.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Something went wrong");
  //       }),
  //   ]);

  //   setLoading(0);

  //   setData(data1);
  //   setClassData(data2);
  //   setSemData(data3);
  // };

  const getClassData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}&department_id=${user.department_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
    .then((res) => {
      console.log('class data - ', res.data.data);
      setClassData(res.data.data);
      setLoading(0);
    })
    .catch((err) => {
      toast.error("Error while fetching classes");
      console.log(err);
      setLoading(0);
    })
    
  }

  const getData = async () => {
    if (!user.session_id) return toast.error("Session is required");
    if (!user.department_id) return toast.error("Department is required");
    setLoading(1);
    const config = {
      method: "get",
      url: `${FEE_REPORT_DEPT}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log('data - ', res.data.data);
        let filteredData = res.data.data;
        filteredData = filteredData.filter((s) => status == "All" || s?.status == status);
        console.log('f1 - ', filteredData.length)
        setLoading(0);
        let groupedData = [];

      for (let i in filteredData) {
        let classId = filteredData[i]?.class_id;
        let existingGroup = groupedData.find(group => group.classId === classId);

        if (!existingGroup) {
          existingGroup = {
            classId: classId,
            amount: filteredData[i].amount,
            paid_amount: filteredData[i].paid_amount,
            discount: filteredData[i].discount,
            fine: filteredData[i].fine,
            balance: filteredData[i].amount - filteredData[i].paid_amount - filteredData[i].discount,
            hostel_amount: filteredData[i].hostel_amount,
            hostel_paid_amount: filteredData[i].hostel_paid_amount,
            hostel_balance: filteredData[i].hostel_amount - filteredData[i].hostel_paid_amount,
            students: []
          };
          groupedData.push(existingGroup);
        }
        else {
          existingGroup.amount +=  filteredData[i].amount;
          existingGroup.paid_amount += filteredData[i].paid_amount;
          existingGroup.discount += filteredData[i].discount;
          existingGroup.fine += filteredData[i].fine;
          existingGroup.balance += filteredData[i].amount - filteredData[i].paid_amount - filteredData[i].discount;
          existingGroup.hostel_amount += filteredData[i].hostel_amount;
          existingGroup.hostel_paid_amount += filteredData[i].hostel_paid_amount;
          existingGroup.hostel_balance += filteredData[i].hostel_amount - filteredData[i].hostel_paid_amount;
        }

        // let x = 0;
        // let arr = JSON.parse(filteredData[i].hostel_payment);
        // for (let j in arr) {
        //   x = x + parseInt(arr[j].payment_amount);
        // }
        // filteredData[i].hostel_payment_amount = x;
        // existingGroup.hostel_payment_amount += x;
        // existingGroup.hostel_balance += filteredData[i].hostel_amount - x;
        existingGroup.students.push(filteredData[i]);
      }
      groupedData.sort((a, b) => a.classId - b.classId);
      console.log('filtered data - ', groupedData);
      setData(groupedData);

        getClassData();
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

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
    }));
  };

  return (
    <div className="FeeCollectionReports">
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
                  <h4 className="mb-0">Department Wise Pending Fee Report</h4>
                </div>
              </div>
            </div>
            {/* start page title */}
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Session <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="session_id"
                            id="fee_grp"
                            className="form-control"
                            value={user.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Session</option>
                            {sessionOpt &&
                              sessionOpt.map((data, key) => {
                                return (
                                  <option value={data?.id}>{data.name}</option>
                                );
                              })}
                          </select> */}

                          <Select
                            name="session_id"
                            id="fee_grp"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={sessionOpt && sessionOpt.map((data) => ({
                              value: data.id,
                              label: data.name,
                            }))}
                            value={
                              user.session_id
                                ? {
                                  value: user.session_id,
                                  label: sessionOpt.find((data) => data.id == user.session_id)
                                    ?.name,
                                }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                session_id: selectedOption ? selectedOption.value : "",
                              }));
                            }}
                            placeholder="Select Session"
                          />
          
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            value={user?.department_id}
                            name="department_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Department</option>
                            {departmentOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name},{" "}
                                {
                                  programOpt?.find((s) => s.id == i.program_id)
                                    ?.name
                                }
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={departmentOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.department_id ? { value: user.department_id, label: departmentOpt?.find((i) => i.id == user.department_id)?.name } : null}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />

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
                            <option value="All">All</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ">
                        <button
                          className="btn btn-nex btn-rounded float-right  "
                          type="submit"
                          name="submit"
                          onClick={getData}
                        >
                          <i className="fa fa-search" aria-hidden="true" />{" "}
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* container-fluid */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Students Due Fee Details</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <button
                            className="btn btn-primary rounded-pill"
                            onClick={() => onDownload()}
                          >
                            Export{" "}
                            <i
                              className="fa fa-file-excel-o"
                              aria-hidden="true"
                            />
                          </button>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <div
                        id="datatable_wrapper"
                        className="dataTables_wrapper dt-bootstrap4 no-footer"
                      >
                        <div className="row">
                          <div className="col-sm-12">
                            <table
                              id="datatable"
                              className="table table-bordered dt-responsive table-hover no-wrap dataTable no-footer dtr-inline"
                              style={{ width: "100%" }}
                              role="grid"
                              aria-describedby="datatable_info"
                              ref={tableRef}
                            >
                              <thead>
                                <tr>
                                  <th colSpan={13}>
                                    Faculty :{" "}
                                    {
                                      collegeOpt?.find((s) => s.id == collegeId)
                                        ?.name
                                    }
                                  </th>
                                </tr>
                                <tr>
                                  <th colSpan={13}>
                                    Department :{" "}
                                    {
                                      departmentOpt?.find(
                                        (s) => s.id == user?.department_id
                                      )?.name
                                    }
                                  </th>
                                </tr>
                                <tr>
                                  <th colSpan={13}>
                                    Academic Year :{" "}
                                    {
                                      sessionOpt?.find(
                                        (s) => s.id == user?.session_id
                                      )?.name
                                    }
                                  </th>
                                </tr>
                                <tr>
                                  <td colSpan={3}></td>
                                  <td
                                    colSpan={7}
                                    style={{ textAlign: "center" }}
                                  >
                                    <h5>College Fees</h5>
                                  </td>
                                  <td
                                    colSpan={3}
                                    style={{ textAlign: "center" }}
                                  >
                                    <h5>Hostel Fees</h5>
                                  </td>
                                </tr>
                                <tr role="row">
                                  <th>Sl. No</th>
                                  <th>Addmision Number</th>
                                  <th>Student Name</th>
                                  <th>Category</th>
                                  <th>Due Date</th>
                                  <th>Amount</th>
                                  <th>Deposit</th>
                                  <th>Discounts</th>
                                  <th>Fine</th>
                                  <th>Balance</th>
                                  <th>Amount</th>
                                  <th>Deposit</th>
                                  <th>Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data && data?.map((j,k) => {
                                  return (<>
                                  <tr className="bg-dark text-light">
                                    <td colSpan={5}>{classData?.find((s) => s.id == j.classId)?.name}</td>
                                    <td>{j?.amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.paid_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.discount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.fine?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.balance?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.hostel_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.hostel_paid_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{j?.hostel_balance?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  </tr>
                                  {j?.students?.map((i,key) => {
                                    return (<tr>
                                    <td>{key+1}</td>
                                    <td>{i?.student_id}</td>
                                    <td>{i?.name}</td>
                                    <td>{i?.category ? i?.category : "NA"}</td>
                                    <td>{formatDate(i?.due_date?.split('T')[0])}</td>
                                    <td>{i?.amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.paid_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.discount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.fine?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{(i?.amount - i?.paid_amount - i?.discount)?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.hostel_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.hostel_paid_amount?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{(i?.hostel_amount - i?.hostel_paid_amount)?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  </tr>)
                                  })}
                                  </>)
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
          {/* End Page-content */}
        </div>
        {/* end main content*/}
      </div>
    </div>
  );
}

export default ReportsPendingClasswise;
