import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { STUDENT_ADMISSION_REPORT } from "../../../utils/apiConstants";
import * as XLSX from "xlsx/xlsx.mjs";
import { useDownloadExcel } from "react-export-table-to-excel";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../../utils/LocalStorageConstants";
import { useNavigate } from "react-router-dom";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SECTION,
} from "../../../utils/Academics.apiConst";
import Select from "react-select";

const StudentAdmissionReport = ({ setLoading, collegeId }) => {
  let role = sessionStorage.getItem("role");

  const navigate = useNavigate();

  const tableRef = useRef();

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student Admission Report",
    sheet: "Users",
  });

  const [data, setData] = useState([]);

  const date = new Date().toISOString().split("T")[0];
  const [user, setUser] = useState({
    from_date: "",
    faculty: role != "SUPERADMIN" ? collegeId : "",
    to_date: "",
    nationality: "",
    year: "",
  });

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  const getAllData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2, data3] = await Promise.all([
      await axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SEMESTER}`,
      })
        .then((res) => {
          setSemesterOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SECTION}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION_REPORT}?from_date=${user?.from_date}&to_date=${user?.to_date}&faculty=${user?.faculty}&nationality=${user?.nationality}&year=${user?.year}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        const minSessionMap = new Map();

        res.data.data.forEach((item) => {
          const { user_id, session_id } = item;

          if (
            !minSessionMap.has(user_id) ||
            session_id < minSessionMap.get(user_id).session_id
          ) {
            minSessionMap.set(user_id, item);
          }
        });

        const sortedArr = Array.from(minSessionMap.values());

        console.log(sortedArr);

        // Create an array from the map
        setData(sortedArr);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
                <h4 className="mb-0">STUDENT Admission REPORTS DATE WISE</h4>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">Select Criteria</div>

              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="">
                      Faculty <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* <select
                      name="faculty"
                      id="section"
                      className="form-control"
                      disabled={role != "SUPERADMIN" ? true : false}
                      value={user?.faculty}
                      onChange={handleChange}
                    >
                      <option value="" selected>
                        ALL
                      </option>
                      {college?.map((i, key) => (
                        <option value={i.id} key={key}>
                          {i.name}
                        </option>
                      ))}
                    </select> */}

<Select
  name="faculty"
  id="section"
  isDisabled={role !== "SUPERADMIN"}
  value={
    user.faculty
      ? {
          value: user.faculty,
          label: college.find((item) => item.id == user?.faculty)?.name,
        }
      : null
  }
  onChange={(selectedOption) =>
    handleChange({
      target: { name: "faculty", value: selectedOption ? selectedOption.value : "" },
    })
  }
  options={college.map((i) => ({ value: i.id, label: i.name }))}
  placeholder="Select Faculty"
/>
                  
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="">From Date</label>
                    <input
                      type="date"
                      name="from_date"
                      onChange={handleChange}
                      className="form-control"
                      // value={user?.from_date ? user?.from_date : date}
                      value={user?.from_date}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="">To Date</label>
                    <input
                      type="date"
                      name="to_date"
                      onChange={handleChange}
                      className="form-control"
                      // value={user?.to_date ? user?.to_date : date}
                      value={user?.to_date}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="">Nationality</label>
                    <select
                      name="nationality"
                      onChange={handleChange}
                      id="nationality"
                      className="form-control"
                    >
                      <option value="">All</option>
                      <option value="INDIAN">Indian</option>
                      <option value="INTERNATIONAL">International</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="">Year of Admission</label>
                    {/* <select
                      name="year"
                      onChange={handleChange}
                      id="year"
                      className="form-control"
                    >
                      <option value="">Select Admission Year</option>
                      {
                        sessionOpt && sessionOpt?.map((item,key)=>{
                          return(<option value={item?.id}>{item?.name}</option>)
                        })
                      }
                    </select> */}

                    <Select
                      name="year"
                      id="year"
                      onChange={(selectedOption) => handleChange({ target: { name: 'year', value: selectedOption.value } })}
                      options={sessionOpt.map((item) => ({ value: item.id, label: item.name }))}
                      placeholder="Select Admission Year"
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

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    {" "}
                    Student Admission List
                    <button
                      className="btn btn-primary float-right rounded-pill"
                      onClick={onDownload}
                    >
                      Export
                    </button>
                  </div>

                  <div className="table-responsive mt-4">
                    <table className="table table-bordered" ref={tableRef}>
                      <thead className="bg-light">
                        <tr>
                          <th>Sl.No</th>
                          <th>Enrollment No</th>
                          <th>Name</th>
                          <th>email</th>
                          <th>Faculty</th>
                          <th>Department</th>
                          <th>Class</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>Nationality</th>
                          <th>Date</th>
                          <th>Approved By</th>
                        </tr>
                      </thead>

                      {data &&
                        data?.map((item, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{item?.user_id}</td>
                              <td>{item?.name}</td>
                              <td>{item?.email}</td>
                              <td>
                                {item?.college_id
                                  ? college?.filter(
                                      (s) => s.id == item?.college_id
                                    )[0]?.name
                                  : user?.faculty
                                  ? college?.filter(
                                      (s) => s.id == user?.faculty
                                    )[0]?.name
                                  : null}
                              </td>
                              <td>
                                {
                                  department?.filter(
                                    (s) => s.id == item?.department_id
                                  )[0]?.name
                                }
                              </td>
                              <td>
                                {
                                  classOpt?.filter(
                                    (s) => s.id == item?.class_id
                                  )[0]?.name
                                }
                              </td>
                              <td>{item?.phone}</td>
                              <td>{item?.gender}</td>
                              <td>{item?.nationality}</td>
                              <td>{item?.createdAt?.split("T")[0]}</td>
                              <td>
                                <span className="badge badge-soft-success">
                                  {item?.application_status}
                                </span>
                              </td>
                            </tr>
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
  );
};

export default StudentAdmissionReport;
