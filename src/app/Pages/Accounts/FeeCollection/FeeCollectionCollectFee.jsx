import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import { SessionOpt } from "../../../Data/student/sessionData";
import { ROUTES } from "../../../Router/routerConfig";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { FEE_DETAILS } from "../../../utils/fees.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import Select from 'react-select';
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

function FeeCollectionCollectFee({ collegeId, setLoading }) {
  const getDepartmentData = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    catch {
      return "";
    }
  }

  const getProgramtData = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const [session, setSession] = useState("");

  const [userId, setUserId] = useState("");

  const [data, setData] = useState([]);

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [departmentOpt, setDepartmentOpt] = useState(getDepartmentData());

  const [programOpt, setProgramOpt] = useState(getProgramtData());

  const [departmentId, setDepartmentId] = useState("");

  const [classId, setClassId] = useState("");

  const [classOpt, setClassOpt] = useState([]);

  useState(() => {
    setDepartmentOpt(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  useState(() => {
    setProgramOpt(getProgramtData());
  }, [localStorage.getItem(LOCAL_PROGRAM)]);

  const navigate = useNavigate();

  const changeDir = (dir, id) => {
    navigate(`${dir}/${id}`);
  };

  const getAllDropData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((res) => {
        setClassOpt(res.data.data);
      })
      .catch((err) => {
        toast.error("Sonething went wrong");
      });
    setLoading(0);
  };

  const handleSearch = () => {
    if (!userId) return toast.error("USN is mandatory");
    setLoading(1);
    const config = {
      method: "get",
      url: `${FEE_DETAILS}?college_id=${collegeId}&session_id=${session}&student_id=${userId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        if(res.data.data?.length == 0) {
          toast.error("Fee is not added");
        }
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useEffect(() => {
    getAllDropData();
  }, []);
  return (
    <div className="FeeCollectionCollegeFee">
      {/* <ModalFeeBulkUpload setLoading={setLoading} collegeId={collegeId} /> */}

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            {/* <div className="row">
              <div className="col-12 ">
                <a
                  className="btn btn-success btn-sm btn-rounded float-right ml-1"
                  href={studentCollectFeeTemplate}
                  download=""
                >
                  <i className="fa fa-download" aria-hidden="true" /> Download
                  Documents
                </a>{" "}
                &nbsp;&nbsp;
                <button
                  className="btn btn-primary btn-sm btn-rounded float-right"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  type="button"
                  name="submit"
                >
                  <i className="fa fa-upload" aria-hidden="true" /> Upload
                  Documents
                </button>
              
              </div>
              <div className="col-12 mt-3">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Collect Fee</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active">Collect Fees</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div> */}
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                      {/* <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Department</label>
                          <select
                            name=""
                            id=""
                            className="form-control"
                            value={departmentId}
                            onChange={(e) => { setDepartmentId(e.target.value) }}
                          >
                            <option value="">Select Department</option>
                            {
                              departmentOpt?.filter(s => s?.college_id == collegeId)?.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}, {programOpt?.find(s => s.id == i?.program_id)?.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div> */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Session</label>
                          {/* <select
                            name=""
                            id=""
                            className="form-control"
                            value={session}
                            onChange={(e) => {
                              setSession(e.target.value);
                            }}
                          >
                            <option value="">Select Session</option>
                            {SessionOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={SessionOpt.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            value={
                              session
                              ? {
                                value: session,
                                label: SessionOpt.find((i) => i.id === session)?.name || '',
                              }
                              : null
                            }
                            onChange={(selectedOption) => setSession(selectedOption.value)}
                            placeholder="Select Session"
                          />

                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          <select
                            name=""
                            id=""
                            className="form-control"
                            value={classId}
                            onChange={(e) => { setClassId(e.target.value) }}
                          >
                            <option value="">Select Class</option>
                            {
                              classOpt?.filter(s=>s?.department_id==departmentId)?.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div> */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Student USN</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Student USN"
                            value={userId}
                            onChange={(e) => {
                              setUserId(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-5">
                      <button
                        className="btn btn-primary  btn-sm  "
                        type="submit"
                        name="submit"
                        value="collect"
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
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
                        <h4 className="card-title">Students Details</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <a href="#">
                            <i
                              className="fa fa-file-pdf-o "
                              aria-hidden="true"
                            />
                          </a>{" "}
                          &nbsp;{" "}
                          <a href="#">
                            <i
                              className="fa fa-file-excel-o"
                              aria-hidden="true"
                            />
                          </a>{" "}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <table
                      id="datatable"
                      className="table table-bordered dt-responsive nowrap table-hover dataTable no-footer"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_asc"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "156.005px" }}
                            aria-sort="ascending"
                            aria-label="Addmision Number: activate to sort column descending"
                          >
                            Addmision Number
                          </th>
                          {/* <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="datatable"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "99.0046px" }}
                                    aria-label="Roll  Number: activate to sort column ascending"
                                  >
                                    Roll Number
                                  </th> */}
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "116.005px" }}
                            aria-label="Student Name: activate to sort column ascending"
                          >
                            Student Name
                          </th>
                          {/* <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="datatable"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "36.0046px" }}
                                    aria-label="DOB: activate to sort column ascending"
                                  >
                                    DOB
                                  </th> */}
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "75.0046px" }}
                            aria-label="Due Date: activate to sort column ascending"
                          >
                            Due Date
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "67.0046px" }}
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Amount
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "63.0046px" }}
                            aria-label="Deposit: activate to sort column ascending"
                          >
                            Deposit
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "81.0046px" }}
                            aria-label="Discounts: activate to sort column ascending"
                          >
                            Discounts
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "35.0046px" }}
                            aria-label="Fine: activate to sort column ascending"
                          >
                            Fine
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "67.0046px" }}
                            aria-label="Balance: activate to sort column ascending"
                          >
                            Balance
                          </th>
                          {role != "ADMIN" &&
                          sessionStorage.getItem("employee_id") != 337 &&
                          role != "AD-CON" ? (
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "54.0046px" }}
                              aria-label="Action: activate to sort column ascending"
                            >
                              Action
                            </th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {data && data?.length == 0 ? (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        ) : (
                          data?.map((i, key) => (
                            <tr key={key}>
                              <td>{i?.student?.id}</td>
                              <td>{i?.student?.name}</td>
                              {/* <td>{i?.student?.dob?.split("T")[0]}</td> */}
                              <td>{formatDate(i?.feeData?.due_date?.split('T')[0])}</td>
                              <td>₹ {i?.feeData?.amount}</td>
                              <td>₹ {i?.feeData?.paid_amount}</td>
                              <td>₹ {i?.feeData?.discount_amount}</td>
                              <td>₹ {i?.feeData?.additional_amount}</td>
                              <td>₹ {i?.feeData?.pending_amount}</td>
                              {role != "ADMIN" &&
                              i?.student?.student_session_id &&
                              role != "AD-CON" &&
                              sessionStorage.getItem("employee_id") != 337 ? (
                                <td>
                                  <button
                                    onClick={() => {
                                      role == "SUACC"
                                        ? changeDir(
                                            ROUTES.Accountant.AddFee,
                                            i?.student?.student_session_id
                                          )
                                        : role == "SUPERADMIN"
                                        ? changeDir(
                                            ROUTES.Registar.Accounts
                                              .FeeCollection.AddFee,
                                            i?.student?.student_session_id
                                          )
                                        : role == "ADMIN"
                                        ? changeDir(
                                            ROUTES.Principal.Accounts
                                              .FeeCollection.AddFee,
                                            i?.student?.student_session_id
                                          )
                                        : role == "CASHIER"
                                        ? changeDir(
                                            ROUTES.Cashier.AddFee,
                                            i?.student?.student_session_id
                                          )
                                        : changeDir("/");
                                    }}
                                    className="btn btn-nex btn-sm btn-rounded"
                                    type="button"
                                  >
                                    Add Fee
                                  </button>
                                </td>
                              ) : role != "AD-CON" &&
                                sessionStorage.getItem("employee_id") != 337 ? (
                                "Not Assigned"
                              ) : null}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
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

export default FeeCollectionCollectFee;
