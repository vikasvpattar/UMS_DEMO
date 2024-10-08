import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { ACCOUNT_FEE_TYPE_AMOUNT } from "../../../utils/Accounts.apiConst";
import { STUDENT_ADMISSION } from "../../../utils/apiConstants";
import { FEE_STUDENT } from "../../../utils/fees.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";

const FeeCollectionAssignFee = ({ setLoading, collegeId }) => {
  //Master is Fetching using States of useLocation

  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  const [feeTypeOpt, setFeeTypeOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [nationality, setNationality] = useState("");

  const [filteredStudentData, setFilteredStudentData] = useState([true]);

  const [class_id, setClassId] = useState("");

  const [selectedArr, setSelectedArr] = useState([]);

  const [studentFeeData, setStudentFeeData] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

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

  const departmentOpt = getDepartmentOpt().filter(
    (s) => s.college_id == collegeId
  );
  const programOpt = getProgramOpt();

  const getAllDatas = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2] = await Promise.all([
      axios({ ...config, url: ACCOUNT_FEE_TYPE_AMOUNT })
        .then((res) => {
          setLoading(0);
          setFeeTypeOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error(err.response.data.message);
        }),
      axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      })
        .then((res) => {
          setLoading(0);
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error(err.response.data.message);
        }),
    ]);
    setLoading(0);
  };

  // const getStudentsData = async () => {
  //   setLoading(1);
  //   console.log('hi');
  //   const config = {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   // setLoading(1);
  //   const [data1] = await Promise.all([
  //     axios({
  //       url: `${STUDENT_ADMISSION}/session/all?college_id=${collegeId}&department_id=${department}&class_id=${class_id}&session_id=${session}&nationality=${nationality}&status_student=${status}`,
  //       ...config,
  //     })
  //       .then((res) => {
  //         console.log('student data - ', res.data.data);
  //         console.log('data - ', data);
  //         setStudentData(res.data.data);
  //         const d = [];
  //         setStudentFeeData(res.data.data.filter((s) => s?.ss_fee_id == data?.id));
  //         for (const i of res.data.data) {
  //           if (i?.ss_fee_id == data?.id) {
  //             d.push(i.user_id);
  //           }
  //         }
  //         console.log("arr d",d);
  //         setSelectedArr(d);
  //         setLoading(0);
  //       })
  //       .catch((err) => {
  //         setLoading(0);
  //         toast.error(err.response.data.message);
  //       }),
  //   ]);
  //   // setLoading(0);

  //   // Filter the data based on nationality
  //   const filteredData = studentData.filter(
  //     (i) => !nationality || i?.nationality == nationality
  //   );
  //   setFilteredStudentData(filteredData);
  //   setLoading(0);

  // };

  const getStudentsData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    try {
      // Fetch all data
      const response = await axios({
        url: `${STUDENT_ADMISSION}/session/all?college_id=${collegeId}&department_id=${department}&class_id=${class_id}&session_id=${session}&nationality=${nationality}&status_student=${status}`,
        ...config,
      });

      const responseData = response.data.data;

      console.log('student data - ', response.data.data);
      // Store all data in the state variable
      setStudentData(responseData);
      setStudentFeeData(responseData.filter((s) => s?.ss_fee_id == data?.id));
      const selectedUserIds = responseData
        .filter((i) => i?.ss_fee_id == data?.id)
        .map((i) => i.user_id);
      setSelectedArr(selectedUserIds);

      // Filter the data based on nationality
      const filteredData = responseData.filter(
        (i) =>
          (!nationality || i?.nationality == nationality) &&
          (!status || i?.status == status)
      );
      setFilteredStudentData(filteredData);
      setLoading(0);
    } catch (err) {
      setLoading(0);
      toast.error(err.response.data.message);
    }
  };

  // Call getStudentsData when the search button is clicked
  const handleSearchClick = () => {
    getStudentsData();
  };


  useEffect(() => {}, [selectedArr]);

  const handleSelectedArr = (e, eid) => {
    if (e.target.checked == false) {
      if (selectedArr.length == 0) return;
      if (selectedArr.length == 1) {
        setSelectedArr([]);
        return;
      }
      const d = [];
      for (let index = 0; index < selectedArr.length; index++) {
        if (eid !== selectedArr[index]) {
          d.push(selectedArr[index]);
        }
      }
      setSelectedArr(d);
    }
    if (e.target.checked == true) {
      setSelectedArr([...selectedArr, eid]);
    }
  };

  const handleSubmit = async (i) => {
    setLoading(1);
    console.log('selected array - ', selectedArr);
    const config = {
      method: "post",
      url: FEE_STUDENT,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        student_ids: selectedArr,
        fee_id: data.id,
        session_id: session,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        getStudentsData();
        toast.success("success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
    
  };

  useEffect(() => {
    if (selectAll == true) {
      if (studentData.length != 0) {
        setSelectedArr(studentData?.filter((s)=>s.ss_fee_id == null).map((i) => i?.user_id));
      }
    } else {
      setSelectedArr([]);
    }
  }, [selectAll]);

  useEffect(() => {
    getAllDatas();
  }, []);

  return (
    <div className="FeeCollectionAssignFee">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
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
                <h4 className="mb-0">Fee Master</h4>
              </div>
            </div>
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Assign Students</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        <a href="javascript:void(0)"> Fee Master</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Assign Students
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">
                            Academic Session
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            value={session}
                            onChange={(e) => {
                              setSession(e.target.value);
                            }}
                            className="form-control"
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            value={department}
                            onChange={(e) => {
                              setDepartment(e.target.value);
                            }}
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
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            value={class_id}
                            onChange={(e) => {
                              setClassId(e.target.value);
                            }}
                            className="form-control"
                          >
                            <option value=""> Select Class</option>
                            {classOpt
                              ?.filter((s) => s?.department_id == department)
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Nationality</label>
                          <select
                            className="form-control"
                            value={nationality}
                            onChange={(e) => {
                              setNationality(e.target.value);
                            }}
                          >
                            <option value="">All</option>
                            <option value="INDIAN">Indian</option>
                            <option value="INTERNATIONAL">International</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Status</label>
                          <select
                            className="form-control"
                            value={status}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
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
                          className="btn btn-nex float-right"
                          type="submit"
                          name="submit"
                          value="fees"
                          onClick={handleSearchClick}
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
                        <h4 className="card-title">Assign Fee Groups</h4>
                      </div>
                      {/* <div class="col-md-8 "><span class="float-right"><a href="#"><i class="fa fa-file-pdf-o " aria-hidden="true"></i></a> &nbsp; <a href="#"><i class="fa fa-file-excel-o" aria-hidden="true"></i></a> </span></div> */}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="table-responsive">
                          <h5> 1st Year General</h5>
                        </div>
                        <br />
                        <table
                          id="datatable"
                          className="table   nowrap table-hover "
                          style={{
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                            width: "100%",
                          }}
                        >
                          <tbody>
                            {data?.fee_type?.map((i, key) => (
                              <tr key={key}>
                                <th>
                                  <b>
                                    {
                                      feeTypeOpt.find((s) => s.id == i)
                                        ?.fee_type_id
                                    }
                                  </b>
                                </th>
                                <th>
                                  {" "}
                                  <b>
                                    ₹{" "}
                                    {feeTypeOpt.find((s) => s.id == i)?.amount}
                                  </b>
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <div className="col-md-8">
                        {/* <div > */}
                        <table id="datatable" className="table table-hover ">
                          <tbody>
                            <tr>
                              <th>Sl.No</th>
                              <th>
                                <div className="checkbox mb0 mt0">
                                  <input
                                    type="checkbox"
                                    name="select-all"
                                    id="select-all"
                                    className="checkbox"
                                    checked={selectAll}
                                    onChange={(e) =>
                                      setSelectAll(e.target.checked)
                                    }
                                  />{" "}
                                  All
                                </div>
                              </th>
                              <th>Admission No</th>
                              <th>Student Name</th>
                              <th>Class</th>
                              <th>Nationality</th>
                              <th>Status</th>
                              {/* <th>Action</th> */}
                            </tr>
                            {/* {studentData
                            // ?.filter((i) => !nationality || i?.nationality == nationality)
                            ?.map((i, key) => ( */}
                            {filteredStudentData?.map((i, key) => (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>
                                  <div className="checkbox d-flex mb0 mt0">
                                    <input
                                      type="checkbox"
                                      name="select-all"
                                      id="select-all"
                                      className="checkbox"
                                      disabled={
                                        i?.ss_fee_id
                                            ? "disabled"
                                            : ""
                                      }
                                      checked={
                                        i?.ss_fee_id ? false : selectedArr.find((s) => s == i?.user_id)
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        handleSelectedArr(e, i?.user_id);
                                      }}
                                    />
                                    {selectedArr.find(
                                      (s) => s == i?.user_id
                                    ) && !i?.ss_fee_id ? (
                                      ""
                                    ) : i?.session_id == session ? (
                                      i?.ss_fee_id ? (
                                          "Already Assigned"
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                                <td>{i?.user_id}</td>
                                <td>{i?.name}</td>
                                <td>
                                  {
                                    classOpt.find(
                                      (item) => item.id == i?.class_id
                                    )?.name
                                  }
                                </td>
                                <td>{i?.nationality}</td>
                                <td>{i?.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {studentData.length == 0 ? <Nodata /> : null}
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 ">
                      <input type="hidden" name="id" defaultValue={8} />
                      <button
                        type="submit"
                        className="allot-fees btn btn-primary btn-sm pull-right"
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-save " /> Save{" "}
                      </button>
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
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© College Name</div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Crafted with <i className="mdi mdi-heart text-danger" /> by{" "}
                  <a href="https://www.nexenstial.com" target="_blank">
                    Nexenstial LLP.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>{" "}
      </div>
    </div>
  );
};

export default FeeCollectionAssignFee;
