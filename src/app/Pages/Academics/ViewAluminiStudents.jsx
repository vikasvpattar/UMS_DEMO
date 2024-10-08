import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import { SessionOpt } from "../../Data/student/sessionData";
import { ALUMINI_STUDENTS_GET } from "../../utils/InfoUploadingApiConstants";
import Nodata from "../../Components/NoData/Nodata";
import { SESSION_ROLE } from "../../utils/sessionStorageContants";
import { ROUTES } from "../../Router/routerConfig";
import Select from "react-select";

function ViewAluminiStudents({ setLoading, collegeId }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    college_id: "",
  });

  const [data, setData] = useState("");
  const [studentData, setStudentData] = useState([]);

  const [student, setStudent] = useState([]);

  let role = sessionStorage.getItem(SESSION_ROLE);

  const [collegeOpt, setCollegeOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );
  const [departmentOpt, setDepartmentOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );
  const [programOpt, setProgramOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );

  console.log("collegeId -", collegeId);

  useEffect(() => {
    setDepartmentOpt(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  useEffect(() => {
    // Set default values for college and department selections
    setUser({
      department_id: "ALL",
      session_id: "",
      college_id: "All",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    setStudentData([]);

    if (!user.session_id || !user.department_id) {
      toast.error("Please Select Required Details");
      return;
    }

    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      url:
        user?.college_id == "All" && user?.department_id == "ALL"
          ? `${ALUMINI_STUDENTS_GET}?session_id=${user.session_id}`
          : user?.department_id == "ALL"
          ? `${ALUMINI_STUDENTS_GET}?college_id=${user.college_id}&session_id=${user.session_id}`
          : `${ALUMINI_STUDENTS_GET}?college_id=${user.college_id}&department_id=${user.department_id}&session_id=${user.session_id}`,
    };

    await axios(config)
      .then((res) => {
        setData(res.data.data);
        console.log("data - ", res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const handleCollegeChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      college_id: selectedOption?.value || null,
      department_id: "", // Reset department_id when college changes
    }));
  };

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
    }));
  };

  const changeDir1 = (dir, d) => {
    navigate(
      `${dir}/${d?.student_id}?session_id=${d?.id}&depart=${d?.department_id}&session=${d?.session_id}&class=${d?.class_id}&sem=${d?.semester_id}&section=${d?.section_id}`,
      {
        state: {
          data: data,
          student: student,
        },
      }
    );
  };

  console.log("user?.college_id -", user?.college_id);
  console.log("user?.department_id -", user?.department_id);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Alumni Students</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            College<span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            className="form-group"
                            name="college_id"
                            value={collegeOpt.find(
                              (option) => option.value === user.college_id
                            )}
                            onChange={handleCollegeChange}
                            options={[
                              { value: "All", label: "ALL" },
                              ...collegeOpt.map((i) => ({
                                value: i.id,
                                label: i.name,
                              })),
                            ]}
                            placeholder="Select College"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            className="form-group"
                            name="department_id"
                            options={[
                              { value: "ALL", label: "ALL" },
                              ...departmentOpt
                                ?.filter(
                                  (s) => s?.college_id == user?.college_id
                                )
                                ?.map((i) => ({
                                  value: i.id,
                                  label: i.name,
                                })),
                            ]}
                            value={
                              user.department_id
                                ? departmentOpt.find(
                                    (option) =>
                                      option.value == user.department_id
                                  )
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
                            Academic Year<span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            options={SessionOpt?.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            value={
                              user?.session_id
                                ? {
                                    value: user?.session_id,
                                    label: SessionOpt?.find(
                                      (i) => i.id == user?.session_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "session_id",
                                  value: selectedOption?.value,
                                },
                              })
                            }
                            placeholder="Select Academic Year"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-nex btn-rounded float-lg-left "
                        onClick={getData}
                        // style={{maxHeight:'40px'}}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title"> ALUMNI STUDENTS LIST </h4>
                      </div>
                    </div>
                    <br />

                    <div className="table table-responsive dt-responsive table-bordered nowrap table-hove">
                      <table
                        id="datatable"
                        className="table  nowrap table-hover  "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          boarder: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl.No.</th>

                            <th>Enrollment No</th>
                            <th>Name</th>
                            <th>Academic Year</th>
                            <th>Passed Year</th>
                            <th>Faculty</th>
                            <th>Department</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.map((d, k) => (
                              <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{d?.student_id}</td>
                                <td>{d?.student_name}</td>
                                <td>{d?.session_id}</td>
                                <td>{d?.passout_year}</td>
                                <td>
                                  {d?.college_id
                                    ? collegeOpt?.find(
                                        (s) => s.id == d?.college_id
                                      )?.name
                                    : null}
                                </td>
                                <td>
                                  {d?.department_id
                                    ? departmentOpt?.find(
                                        (s) => s.id == d?.department_id
                                      )?.name
                                    : null}
                                </td>

                                <td>
                                  <a
                                    onClick={() => {
                                      if (role == "ADMIN")
                                        changeDir1(
                                          ROUTES.Principal.Student
                                            .ViewStudentProfile,
                                          d
                                        );
                                      if (role == "SUPERADMIN")
                                        changeDir1(
                                          ROUTES.Registar.Student
                                            .ViewStudentProfile,
                                          d
                                        );
                                      if (role == "SUACC") {
                                        changeDir1(
                                          ROUTES.Accountant.ViewStudentProfile,
                                          d
                                        );
                                      }
                                    }}
                                  >
                                    <i
                                      className="fas fa-eye mr-2"
                                      aria-hidden="true"
                                      style={{ cursor: "pointer" }}
                                    />
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {data?.length == 0 ? <Nodata /> : null}
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

export default ViewAluminiStudents;
