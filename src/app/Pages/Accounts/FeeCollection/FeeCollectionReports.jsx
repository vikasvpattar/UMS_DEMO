import React from "react";
import { useState } from "react";
import NoData from "./../../../Components/NoData/Nodata";
import axios from "axios";
import { toast } from "react-toastify";
import Nodata from "./../../../Components/NoData/Nodata";
import { FEE_DETAILS, FEE_DETAILS_SQL } from "../../../utils/fees.apiConst";
import { useEffect } from "react";
import { ROUTES } from "../../../Router/routerConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
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
import { STUDENT_DETAILS2 } from "../../../utils/apiConstants";

function FeeCollectionReports({ setLoading, collegeId }) {
  const navigate = useNavigate();

  //Query data for easy filtering
  const location = useLocation();
  const query_department = new URLSearchParams(location.search).get(
    "department_id"
  );
  const query_session = new URLSearchParams(location.search).get("session_id");
  const query_class = new URLSearchParams(location.search).get("class_id");

  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [status, setStatus] = useState("All");

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
    category: "",
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

  const downloadExcel = (d) => {
    console.log(d);
    let json_data = [];
    for (const iterator of d) {
      const obj = {
        "Student Registeration Number": iterator?.student?.id,
        "Student Name": iterator?.student?.name,
        "College Name":
          collegeOpt?.find((s) => s.id == collegeId)?.name + "-SUKALOL",
        "Academic Year": sessionOpt?.find((s) => s?.id == user?.session_id)
          ?.name,
        Department: departmentOpt?.find((s) => s.id == user?.department_id)
          ?.name,
        Class: classOpt?.find((s) => s?.id == user?.class_id)?.name,
        FeeAmount: iterator?.feeData?.amount,
        "Paid Amount": iterator?.feeData?.paid_amount,
        Discount: iterator?.feeData?.discount_amount,
        "Due Amount": iterator?.feeData?.pending_amount,
      };
      json_data.push(obj);
    }
    var worksheet = XLSX.utils.json_to_sheet(json_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(
      wb,
      `SUKALOL-${sessionOpt?.find((s) => s?.id == user?.session_id)?.name}-${
        departmentOpt?.find((s) => s.id == user?.department_id)?.name
      }-${classOpt?.find((s) => s?.id == user?.class_id)?.name}.xlsx`
    );
  };

  const clearData = () => {
    setUser({
      session_id: "",
      class_id: "",
      section_id: "",
      department_id: "",
      category: "",
      desiredCategory: "", // Add desiredCategory state
    });
  };

  // Add handleChangeDesiredCategory function to update the desiredCategory state
  const handleChangeDesiredCategory = (e) => {
    setUser((prev) => ({
      ...prev,
      desiredCategory: e.target.value,
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [e.name]: e.value,
      }));
    }
  };

  const handleChangeSelect = (name, selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: selectedOption?.value || null,
    }));
  };

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
      class_id: "", // Reset class_id when department changes
    }));
  };

  const getData1 = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_DETAILS2}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log("student data", res.data.data);
        setData1(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getData1();
  }, []);

  // const getData = async () => {
  //   if (!user.session_id) return toast.error("Session is required");
  //   if (!user.department_id) return toast.error("Department is required");
  //   setLoading(1);
  //   const config = {
  //     method: "get",
  //     // url: `${FEE_DETAILS}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}`,
  //     url: `${FEE_DETAILS}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}&desiredCategory=${user.desiredCategory}`,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((res) => {
  //       setLoading(0);
  //       console.log(res.data);
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       console.log(err);
  //       toast.error("Something went wrong");
  //     });
  // };

  const getData = async () => {
    if (!user.session_id) return toast.error("Session is required");
    if (!user.department_id) return toast.error("Department is required");
    if (!user.class_id) return toast.error("Class is required");
    setLoading(1);
    // const config = {
    //   method: "get",
    //   url: `${FEE_DETAILS}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}`,
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //     "Content-Type": "application/json",
    //   },
    // };
    // await axios(config)
    //   .then((res) => {
    //     let filteredData = res.data.data.filter(
    //       (item) =>
    //       user.category == "" ||
    //       user.category == item?.student?.category
    //       );
    //     filteredData = filteredData.filter((s) => status == "All" || s.student?.status == status);
    //     setLoading(0);
    //     console.log('filtered data - ', filteredData)
    //     setData(filteredData);
    //   })
    //   .catch((err) => {
    //     setLoading(0);
    //     console.log(err);
    //     toast.error("Something went wrong");
    //   });

    const config = {
      method: "get",
      url: `${FEE_DETAILS_SQL}?college_id=${collegeId}&department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("data - ", res.data.data);
        let filteredData = res.data.data.filter(
          (item) => user.category == "" || user.category == item?.category
        );
        filteredData = filteredData.filter(
          (s) => status == "All" || s?.status == status
        );
        setLoading(0);
        console.log("filtered data - ", filteredData);
        setData(filteredData);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = async () => {
    const data = user;

    const config = {
      method: "post",
      url: "",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((res) => {
        toast.success("Data added successfully");
        clearData();
        getData();
      })
      .catch((err) => {
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

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  useEffect(() => {
    getAll();
    // getData()
  }, []);

  const hasDeleted = data?.some(
    (i) => i.status === "DELETED" || i.status === "All"
  );

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
                  <h4 className="mb-0">
                    CLASS AND DATE WISE PENDING FEE REPORT
                  </h4>
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
                            options={
                              sessionOpt &&
                              sessionOpt.map((data) => ({
                                value: data.id,
                                label: data.name,
                              }))
                            }
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
                      <div className="col-md-4">
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
                            options={departmentOpt?.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            value={
                              user.department_id
                                ? {
                                    value: user.department_id,
                                    label: departmentOpt?.find(
                                      (i) => i.id == user.department_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={handleDepartmentChange}
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
                            options={classOpt
                              ?.filter(
                                (s) => s?.department_id == user.department_id
                              )
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.class_id
                                ? {
                                    value: user.class_id,
                                    label: classOpt?.find(
                                      (i) => i.id == user.class_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleChangeSelect("class_id", selectedOption)
                            }
                            placeholder="Select Class"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Category<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={user?.category}
                            onChange={handleChange}
                          >
                            <option value="">All</option>
                            <option value="General/Open">General/Open</option>
                            <option value="EWS">EWS</option>
                            <option value="SEBC">SEBC</option>
                            <option value="OPEN">OPEN</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                            <option value="DELETED">DELETED</option>
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
                                <tr role="row">
                                  <th>Sl. No</th>
                                  <th>Addmision Number</th>

                                  <th>Student Name</th>

                                  <th>Status</th>

                                  {hasDeleted && <th>Reason</th>}

                                  <th>Category</th>
                                  <th>Due Date</th>
                                  <th>Amount</th>
                                  <th>Deposit</th>
                                  <th>Discounts</th>
                                  <th>Fine</th>
                                  <th>Balance</th>
                                </tr>
                              </thead>

                              <tbody>
                                {data && data?.length != 0 ? (
                                  data?.map((i, key) => (
                                    <tr key={key}>
                                      <td>{key + 1}</td>
                                      <td>{i?.student_id}</td>
                                      <td>{i?.name}</td>
                                      <td>
                                        <span
                                          className={`badge badge-soft-${
                                            i.status == "ACTIVE"
                                              ? "success"
                                              : i.status == "INACTIVE"
                                              ? "warning"
                                              : "danger"
                                          }`}
                                        >
                                          {i.status}
                                        </span>
                                      </td>

                                      {/* {i.status == "DELETED" ||
                                        (i.status == "All" && (
                                          <td>{i.deleted_reason}</td>
                                        ))} */}
                                      {hasDeleted && (
                                        <td>{i.deleted_reason}</td>
                                      )}
                                      <td>{i?.category}</td>
                                      <td>{i.due_date?.split("T")[0]}</td>
                                      <td>
                                        {i.amount.toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        })}
                                      </td>
                                      <td>
                                        {i.paid_amount.toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        })}
                                      </td>
                                      <td>
                                        {i.discount.toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        })}
                                      </td>
                                      <td>
                                        {i.fine
                                          ? i.fine.toLocaleString("en-IN", {
                                              style: "currency",
                                              currency: "INR",
                                              minimumFractionDigits: 0,
                                            })
                                          : 0}
                                      </td>
                                      <td>
                                        {(
                                          i.amount -
                                          i.discount -
                                          i.paid_amount
                                        ).toLocaleString("en-IN", {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        })}
                                      </td>
                                    </tr>
                                  ))
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

                                <tr className="bg-dark text-light">
                                  {/* <td colSpan={7}>Grand Total</td> */}

                                  <td colSpan={hasDeleted ? 7 : 6}>
                                    Grand Total
                                  </td>
                                  <td>
                                    {data
                                      ?.reduce(
                                        (acc, curr) => acc + curr?.amount,
                                        0
                                      )
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                  </td>
                                  <td>
                                    {data
                                      ?.reduce(
                                        (acc, curr) => acc + curr?.paid_amount,
                                        0
                                      )
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                  </td>
                                  <td>
                                    {data
                                      ?.reduce(
                                        (acc, curr) => acc + curr?.discount,
                                        0
                                      )
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                  </td>
                                  <td>₹ 0</td>
                                  <td>
                                    {data
                                      ?.reduce(
                                        (acc, curr) =>
                                          acc +
                                          curr?.amount -
                                          curr?.paid_amount -
                                          curr?.discount, 
                                        0
                                      )
                                      .toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                  </td>
                                </tr>
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

export default FeeCollectionReports;
