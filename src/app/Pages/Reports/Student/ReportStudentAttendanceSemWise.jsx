import React from "react";
import { LOCAL_DEPARTMENT } from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import { useState } from "react";
import { Http } from "../../../Services/Services";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
} from "../../../utils/Academics.apiConst";
import { useEffect } from "react";
import {
  REPORT_STUDENT_ATTENDANCE,
  REPORT_STUDENT_ATTENDANCE_STAT,
} from "../../../utils/Reports.apiConst";
import { ROUTES } from "../../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const ReportStudentAttendanceSemWise = ({ setLoading, collegeId }) => {
  const departmentData = JSON.parse(
    localStorage.getItem(LOCAL_DEPARTMENT)
  )?.filter((s) => s.college_id == collegeId);
  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    class_id: "",
    semester_id: "",
    section_id: "",
  });
  const [classData, setClassData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [data, setData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();

  let role = sessionStorage.getItem("role");
  const changeDir = (dd) => {
    if (role == "SUPERADMIN") {
      navigate(ROUTES.Registar.Reports.Student.StudentStat, {
        state: { data: dd },
      });
    } else if (role == "ADMIN") {
      navigate(ROUTES.Principal.Reports.StudentStat, {
        state: { data: dd },
      });
    } else if (role == "STAFF") {
      navigate(ROUTES.Employee.Reports.StudentStat, {
        state: { data: dd },
      });
    }
  };

  const getData = async () => {
    setLoading(true);
    const [data1, data2, data3] = await Promise.all([
      Http.get(`${ACADEMICS_ADD_CLASS}?department_id=${user.department_id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        }),
      Http.get(`${ACADEMICS_ADD_SEMESTER}?department_id=${user.department_id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        }),
      Http.get(`${ACADEMICS_ADD_SECTION}?department_id=${user.department_id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        }),
    ]);
    setClassData(data1);
    setSemesterData(data2);
    setSectionData(data3);
    setLoading(false);
  };

  const getAttendance = async () => {
    setLoading(true);
    console.log(user.department_id);
    console.log(user.semester_id);
    await Http.get(
      `${ACADEMICS_ADD_SUBJECT}?department_id=${user.department_id}&semester_id=${user.semester_id}&status=ACTIVE`
    )
      .then((res) => {
        setSubjectData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);

    await Http.get(
      `${REPORT_STUDENT_ATTENDANCE_STAT}?session_id=${user.session_id}&semester_id=${user.semester_id}`
    )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handelChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  // };

  const handelChange = (e) => {
    const { name, value } = e.target;
  
    // Reset semester_id to an empty string when class changes
    const updatedUser = name == "class_id" ? { ...user, semester_id: "" } : user;
  
    setUser({ ...updatedUser, [name]: value });
  };

  useEffect(() => {
    if (user.department_id) {
      getData();
    }
  }, [user.department_id]);
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Attendance Report Sem-Wise</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-header">Select Criteria</h6>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Department</label>
                          {/* <select
                            name="department_id"
                            id=""
                            className="form-control"
                            value={user.department_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Department</option>
                            {departmentData?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="department_id"
                            options={departmentData
                              ?.filter((s) => s.college_id == collegeId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.department_id
                              ? {
                                  value: user.department_id,
                                  label: departmentData?.find((i) => i.id == user.department_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "department_id",
                                  value: selectedOption ? selectedOption.value : "",
                                },
                              });
                            }}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Session</label>
                          {/* <select
                            name="session_id"
                            id=""
                            className="form-control"
                            value={user.session_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="session_id"
                            options={sessionOpt
                              // ?.filter((s) => s.college_id == collegeId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.session_id
                              ? {
                                  value: user.session_id,
                                  label: sessionOpt?.find((i) => i.id == user.session_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                name: "session_id",
                                value: selectedOption.value,
                                },
                              });
                            }}

                            placeholder="Select Session"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          {/* <select
                            name="class_id"
                            id=""
                            className="form-control"
                            value={user.class_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Class</option>
                            {classData?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="class_id"
                            options={classData?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                            user.class_id
                              ? {
                              value: user.class_id,
                              label: classData?.find((i) => i.id == user.class_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "class_id",
                                  value: selectedOption ? selectedOption.value : "",
                                },
                              });
                            }}
                            placeholder="Select Class"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          {/* <select
                            name="semester_id"
                            id=""
                            className="form-control"
                            value={user.semester_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Semester</option>
                            {semesterData
                              ?.filter((s) => s.class_id == user.class_id)
                              ?.map((i, key) => (
                                <option key={key} value={i.id}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            name="semester_id"
                            options={semesterData
                              ?.filter((s) => s.class_id == user.class_id)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.semester_id
                              ? {
                                  value: user.semester_id,
                                  label: semesterData?.find((i) => i.id == user.semester_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "semester_id",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            placeholder="Select Semester"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={getAttendance}
                          >
                            Get Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-header">Attendance Report</h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tr>
                          <th>Student Id</th>
                          <th>Student Name</th>
                          {subjectData?.map((i, key) => (
                            <th key={key}>{i.name}</th>
                          ))}
                        </tr>
                        {data?.map((i, key) => (
                          <tr key={key}>
                            <td
                              className="text-primary cursor-pointer"
                              onClick={() => {
                                changeDir(i);
                              }}
                            >
                              {i.student_id}
                            </td>
                            <td
                              className="text-primary cursor-pointer"
                              onClick={() => {
                                changeDir(i);
                              }}
                            >
                              {i.student_name}
                            </td>
                            {subjectData?.map((j, key) => {
                              const present = i?.data?.find(
                                (s) => s.course_id == j.id
                              )?.present;
                              const absent = i?.data?.find(
                                (s) => s.course_id == j.id
                              )?.absent;
                              const percent =
                                !present && !absent
                                  ? 0
                                  : (Number(present) /
                                      (Number(present) + Number(absent))) *
                                    100;
                              return (
                                <td key={key}>
                                  {!present && !absent ? (
                                    <span className="badge badge-soft-secondary">
                                      NA
                                    </span>
                                  ) : percent < 85 && percent >= 60 ? (
                                    <span
                                      className="badge badge-soft-warning cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.Registar.Reports.Student
                                            .StudentSubStat +
                                            "/" +
                                            i.student_id +
                                            "/" +
                                            j.id
                                        );
                                      }}
                                    >
                                      {percent?.toFixed(2)}%
                                    </span>
                                  ) : percent < 60 ? (
                                    <span
                                      className="badge badge-soft-danger cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.Registar.Reports.Student
                                            .StudentSubStat +
                                            "/" +
                                            i.student_id +
                                            "/" +
                                            j.id
                                        );
                                      }}
                                    >
                                      {percent?.toFixed(2)}%
                                    </span>
                                  ) : percent >= 85 ? (
                                    <span
                                      className="badge badge-soft-success cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.Registar.Reports.Student
                                            .StudentSubStat +
                                            "/" +
                                            i.student_id +
                                            "/" +
                                            j.id
                                        );
                                      }}
                                    >
                                      {percent?.toFixed(2)}%
                                    </span>
                                  ) : null}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
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

export default ReportStudentAttendanceSemWise;
