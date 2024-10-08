import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nodata from "./../../../Components/NoData/Nodata";
import { FEE_DETAILS, FEE_DETAILS_SQL } from "../../../utils/fees.apiConst";
import { useEffect } from "react";
import { ROUTES } from "../../../Router/routerConfig";
import * as XLSX from "xlsx/xlsx.mjs";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
} from "./../../../utils/Academics.apiConst";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

function FeeCollectionSearchDue({ setLoading, collegeId }) {
  const navigate = useNavigate();

  //Query data for easy filtering
  const location = useLocation();
  const query_department = new URLSearchParams(location.search).get(
    "department_id"
  );
  const query_session = new URLSearchParams(location.search).get("session_id");
  const query_class = new URLSearchParams(location.search).get("class_id");

  const [role, setRole] = useState("");

  const tableRef = useRef();

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  const [nextRoute, setNextRoute] = useState(
    ROUTES.Registar.Accounts.FeeCollection.AddFee
  );

  useEffect(() => {
    if (role == "SUPERADMIN") {
      setNextRoute(ROUTES.Registar.Accounts.FeeCollection.AddFee);
    } else if (role == "SUACC") {
      setNextRoute(ROUTES.Accountant.AddFee);
    } else if (role == "CASHIER") {
      setNextRoute(ROUTES.Cashier.AddFee);
    }
  }, [role]);

  const [data, setData] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

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

  console.log(collegeId);
  const departmentOpt = getDepartmentOpt().filter(
    (s) => s.college_id == collegeId
  );
  const programOpt = getProgramOpt();

  const [user, setUser] = useState({
    session_id: query_session ? query_session : "",
    class_id: query_class ? query_class : "",
    section_id: "",
    department_id: query_department ? query_department : "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (location.search)
      setUser({
        session_id: query_session ? query_session : "",
        class_id: query_class ? query_class : "",
        section_id: "",
        department_id: query_department ? query_department : "",
      });
  }, [location.search]);

  const changeDir = (id, feeId, usn) => {
    navigate(
      `${nextRoute}/${id}?fee_id=${feeId}&session_id=${
        user?.session_id
      }&student_id=${usn}&class_id=${user?.class_id}&getInactive=${
        user?.status == "ACTIVE" ? 0 : 1
      }`
    );
  };

  const clearData = () => {
    setUser({
      session_id: "",
      class_id: "",
      section_id: "",
      department_id: "",
      status: "ACTIVE",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    if (!user.session_id) return toast.error("Session is required");
    if (!user.department_id) return toast.error("Department is required");
    if(!user.class_id) return toast.error('Class is required');

    setLoading(1);
    // const config = {
    //   method: "get",
    //   url: `${FEE_DETAILS}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}&status=${user?.status}`,
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //     "Content-Type": "application/json",
    //   },
    // };

    const config = {
      method: "get",
      url: `${FEE_DETAILS_SQL}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}&status=${user?.status}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log('search due fee data - ', res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const getAll = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    const [data1, data2] = await Promise.all([
      axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      })
        .then((res) => {
          console.log(res);
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          {
            console.log(err);
          }
        }),

      axios({
        ...config,
        url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`,
      })
        .then((res) => {
          setLoading(0);
          console.log(res);
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          {
            setLoading(0);
            console.log(err);
            toast.error("Some Error Occured");
          }
        }),
    ]);
  };

  const downloadExcel = () => {
    let json_data = [];
    for (const iterator of data) {
      const obj = {
        "Student Registeration Number": iterator?.usn,
        "Student Name": iterator?.name,
        Amount: iterator?.amount,
        "Transaction Id": iterator?.transaction_id,
        "Transaction Type": iterator?.type,
      };
      json_data.push(obj);
    }
    var worksheet = XLSX.utils.json_to_sheet(json_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `SUKALOL-Fee Details.xlsx`);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student Fee Collection Fee Details",
    sheet: "Users",
  });

  useEffect(() => {
    getAll();
    // getData()
  }, []);

  useEffect(() => {
    // Fetch class options based on the selected department
    const fetchClasses = async () => {
      setLoading(1);
      try {
        const response = await axios({
          method: "get",
          url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}&department_id=${user.department_id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        });
        setClassOpt(response.data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(0);
      }
    };

    // Only fetch classes if a department is selected
    if (user.department_id) {
      fetchClasses();
    } else {
      // Reset class options if no department is selected
      setClassOpt([]);
    }
  }, [user.department_id]);

  return (
    <div className="FeeCollectionSearchDue">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Search Due Fee</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Search Due Fee
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
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
                            options={sessionOpt.map((data) => ({
                              value: data.id,
                              label: data.name,
                            }))}
                            value={
                              user.session_id
                                ? {
                                    value: user.session_id,
                                    label: sessionOpt.find(
                                      (data) => data.id == user.session_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                session_id: selectedOption
                                  ? selectedOption.value
                                  : "",
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
                            value={
                              user?.department_id
                                ? {
                                    value: user?.department_id,
                                    label: departmentOpt.find(
                                      (data) => data.id == user?.department_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                department_id: selectedOption
                                  ? selectedOption.value
                                  : "",
                              }));
                            }}
                            options={departmentOpt.map((i) => ({
                              value: i.id,
                              label: `${i.name}, ${
                                programOpt?.find((s) => s.id === i.program_id)
                                  ?.name
                              }`,
                            }))}
                            placeholder="Select Department"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            type="text"
                            className="form-control"
                            name="class_id"
                            value={user.class_id}
                            onChange={handleChange}
                            required="required"
                          >
                            <option value=""> Select Class</option>
                            {classOpt
                              ?.filter(
                                (s) => s?.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            type="text"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={
                              user.class_id
                                ? {
                                    value: user.class_id,
                                    label: classOpt.find(
                                      (i) => i.id == user.class_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                class_id: selectedOption
                                  ? selectedOption.value
                                  : "",
                              }));
                            }}
                            options={classOpt.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            placeholder="Select Class"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <select
                            id=""
                            className="form-control"
                            name="status"
                            value={user?.status}
                            onChange={handleChange}
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
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
                        <div className="card-title">
                          Students Due Fee Details
                        </div>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <button
                            className="btn btn-primary rounded-pill"
                            onClick={onDownload}
                          >
                            Export
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
                              ref={tableRef}
                              aria-describedby="datatable_info"
                            >
                              <thead>
                                <tr role="row">
                                  <th>Sl No</th>
                                  <th>Addmision Number</th>
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
                                  <th>Student Name</th>
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
                                  <th>Due Date</th>
                                  <th>Amount</th>
                                  <th>Deposit</th>
                                  <th>Discounts</th>
                                  <th>Fine</th>
                                  <th>Balance</th>
                                  {role == "ADMIN" ||
                                  role == "AD-CON" ||
                                  sessionStorage.getItem("employee_id") ==
                                    337 ? null : (
                                    <th>Action</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {data && data?.length != 0 ? (
                                  // data?.map((i, key) => {
                                  //   if (i?.student?.status == user?.status) {
                                  //     return (
                                  //       <tr key={key}>
                                  //         <td>{key + 1}</td>
                                  //         <td>{i?.student?.id}</td>
                                  //         <td>{i?.student?.name}</td>
                                  //         {/* <td>{i?.student?.dob?.split("T")[0]}</td> */}
                                  //         <td>
                                  //           {
                                  //             i?.feeData?.due_date?.split(
                                  //               "T"
                                  //             )[0]
                                  //           }
                                  //         </td>
                                  //         <td>₹ {i?.feeData?.amount}</td>
                                  //         <td>₹ {i?.feeData?.paid_amount}</td>
                                  //         <td>
                                  //           ₹ {i?.feeData?.discount_amount}
                                  //         </td>
                                  //         <td>₹ 0</td>
                                  //         <td>
                                  //           ₹{" "}
                                  //           {i?.feeData?.amount -
                                  //             i?.feeData?.paid_amount -
                                  //             i?.feeData?.discount_amount}
                                  //         </td>
                                  //         {role == "ADMIN" ||
                                  //         role == "AD-CON" ||
                                  //         sessionStorage.getItem(
                                  //           "employee_id"
                                  //         ) == 337 ? null : (
                                  //           <td>
                                  //             {i?.student
                                  //               ?.student_session_id ? (
                                  //               <button
                                  //                 onClick={() => {
                                  //                   changeDir(
                                  //                     i?.student
                                  //                       ?.student_session_id,
                                  //                     i?.student?.fee_id,
                                  //                     i?.student?.id
                                  //                   );
                                  //                 }}
                                  //                 className="btn btn-nex btn-sm btn-rounded"
                                  //                 type="button"
                                  //               >
                                  //                 Collect Fee
                                  //               </button>
                                  //             ) : (
                                  //               "Not Assigned"
                                  //             )}
                                  //           </td>
                                  //         )}
                                  //       </tr>
                                  //     );
                                  //   }
                                  // }
                                  data?.map((i, key) => {
                                    return (
                                      <tr>
                                        <td>{key+1}</td>
                                        <td>{i.student_id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.due_date?.split('T')[0]}</td>
                                        <td>{(i.amount).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>{(i.paid_amount).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>{(i.discount).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>{i.fine ? (i.fine).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0}) : 0}</td>
                                        <td>{(i.amount - i.discount - i.paid_amount).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>
                                            {i?.student_session_id ? (
                                            <button
                                              onClick={() => {
                                                changeDir(
                                                  i?.student_session_id,
                                                  i?.fee_id,
                                                  i?.student_id
                                                );
                                                }}
                                                className="btn btn-nex btn-sm btn-rounded"
                                                type="button"
                                              >
                                              Collect Fee
                                              </button>
                                          ) : (
                                              "Not Assigned"
                                            )}
                                        </td>
                                      </tr>
                                    )
                                  }
                                  )
                                ) : (
                                  <tr className="odd">
                                    <td
                                      valign="top"
                                      colSpan={11}
                                      className="dataTables_empty"
                                    >
                                      <Nodata />
                                    </td>
                                  </tr>
                                )}
                                {data && data?.length != 0 ? (
                                  <tr className="bg-dark text-light">
                                    <td colSpan={4}>Grand Total</td>
                                    <td>
                                      {(data?.reduce(
                                        (acc, curr) =>
                                          acc + curr?.amount,
                                        0
                                      )).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}
                                    </td>
                                    <td>
                                      {data?.reduce(
                                        (acc, curr) =>
                                          acc + curr?.paid_amount,
                                        0
                                      ).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}
                                    </td>
                                    <td>
                                      {data?.reduce(
                                        (acc, curr) =>
                                          acc + curr?.discount,
                                        0
                                      ).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}
                                    </td>
                                    <td>₹ 0</td>
                                    <td>
                                      {data?.reduce(
                                        (acc, curr) =>
                                          acc +
                                          curr?.amount -
                                          curr?.paid_amount -
                                          curr?.discount,
                                        0
                                      ).toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}
                                    </td>
                                    {role == "ADMIN" ? null : <td></td>}
                                  </tr>
                                ) : null}
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

export default FeeCollectionSearchDue;
