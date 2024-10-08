import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";
import {
  ACADEMICS_GET_ASSIGN_STU,
  ACADEMICS_GET_BATCH,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_CLASS,
} from "../../utils/Academics.apiConst";
import { STUDENT_SESSION } from "../../utils/apiConstants";
import { LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";

const ViewAssignedStudents = ({ setLoading, collegeId }) => {
  const locate = useLocation();
  console.log(locate?.state);
  const [data, setData] = useState([]);

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const [faculty, setFaculty] = useState(locate?.state?.faculty);

  const [currentclass, setCurrentClass] = useState(locate?.state?.class);

  const [currentSemester, setCurrentSemester] = useState("");

  const [currentSection, setCurrentSection] = useState("");

  const [sectionOpt, setSectionOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [students, setStudents] = useState([]);

  const [batches, setBatches] = useState("");

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [session, setSession] = useState("");

  const getAllData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2, data3, data4] = await Promise.all([
      await axios({
        ...config,
        url: `${ACADEMICS_GET_BATCH}?class_id=${locate?.state?.class}&department_id=${locate?.state?.faculty}`,
      })
        .then((res) => {
          setBatches(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
      await axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`,
      })
        .then((res) => {
          setSemesterOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          console.log(err);
          setLoading(0);
        }),
    ]);
  };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios({
      ...config,
      url: `${ACADEMICS_GET_ASSIGN_STU}?class_id=${locate?.state?.class}&session=${session}&batch_id=${locate?.state?.batch_id}`,
    })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios({
      ...config,
      url: `${STUDENT_SESSION}?class_id=${locate?.state?.class}&department_id=${faculty}&session_id=${session}`,
    })
      .then((res) => {
        console.log(res.data.data);
        setStudents(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Assign Students</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        <a href="javascript:void(0)"> Add Batch</a>
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
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            disabled={true}
                            value={faculty}
                            onChange={(e) => {
                              setFaculty(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {department?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          <select
                            className="form-control"
                            value={currentclass}
                            disabled={true}
                            onChange={(e) => {
                              setCurrentClass(e.target.value);
                            }}
                          >
                            <option value="">Select Class</option>
                            {classOpt
                              ?.filter((s) => s?.department_id == faculty)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">Batch</label>
                          <select
                            className="form-control"
                            value={locate?.state?.batch_id}
                            disabled={true}
                          >
                            <option>Select Batch</option>
                            {batches &&
                              batches
                                ?.filter(
                                  (s) => s.college_id == locate?.state?.college
                                )
                                ?.map((item, key) => {
                                  return (
                                    <option value={item?.id}>
                                      {item?.batch_name}
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          <select
                            className="form-control"
                            value={currentSemester}
                            onChange={(e) => {
                              setCurrentSemester(e.target.value);
                            }}
                          >
                            <option value="">Select Semester</option>
                            {semesterOpt
                              ?.filter((s) => s.class_id == currentclass)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Section</label>
                          <select
                            className="form-control"
                            value={currentSection}
                            onChange={(e) => {
                              setCurrentSection(e.target.value);
                            }}
                          >
                            <option value="">Select Section</option>
                            {sectionOpt &&
                              sectionOpt
                                ?.filter(
                                  (s) => s.semester_id == currentSemester
                                )
                                ?.map((i, key) => (
                                  <option value={i?.id}>{i?.name}</option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">Session</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setSession(e.target.value);
                            }}
                          >
                            <option>Select Session</option>
                            {sessionOpt &&
                              sessionOpt?.map((item, key) => {
                                return (
                                  <option value={item?.id}>{item?.name}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-1">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={getData}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title"> Students List</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <acronym title="PDF">
                            {" "}
                            <a href="#">
                              <i
                                className="fa fa-file-pdf-o "
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a> &nbsp;{" "}
                          <acronym title="Excel">
                            <a href="#">
                              {" "}
                              <i
                                className="fa fa-file-excel-o"
                                aria-hidden="true"
                              />
                            </a>
                          </acronym>
                          <a href="#"> </a>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <table
                      id="datatable"
                      className="table table-bordered dt-responsive nowrap table-hover "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th> Sl. No.</th>
                          <th>Enrollment No</th>
                          <th>Name</th>
                          <th>Batch Name</th>
                          <th>Department</th>
                          <th>Class</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((item, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{item?.user_id}</td>
                                <td>
                                  {students &&
                                    students?.filter(
                                      (s) => s.user_id == item?.user_id
                                    )[0]?.name}
                                </td>
                                <td>
                                  {
                                    batches?.filter(
                                      (s) => s.id == item?.batch_id
                                    )[0]?.batch_name
                                  }
                                </td>
                                <td>
                                  {department &&
                                    department?.filter(
                                      (s) => s.id == locate?.state?.faculty
                                    )[0]?.name}
                                </td>
                                <td>
                                  {classOpt &&
                                    classOpt?.filter(
                                      (s) => s.id == item?.class_id
                                    )[0]?.name}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <br />
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignedStudents;
