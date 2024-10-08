import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import AdvanceFeeReciept from "../../Accounts/FeeCollection/AdvancePayFeeCollection";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Select from "react-select";
import { ROUTES } from "../../../Router/routerConfig";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import {
  STUDENT_ADMISSION,
  STUDENT_DETAILS2,
  STUDENT_SESSION_UPDATE,
  STUDENT_GENDER,
  STUDENT_SESSION,
  STUDENT_ADVANCE_PAY,
  STUDENT_DETAILS3,
  STUDENT_SESSION2,
  EMPLOYEE_ALL,
} from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import { useDownloadExcel } from "react-export-table-to-excel";

function StudentDetails1({ setLoading, collegeId }) {
  let role = sessionStorage.getItem(SESSION_ROLE);
  const locate = useLocation();

  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const [empData, setEmpData] = useState([]);

  const [adv, setAdv] = useState([]);
  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [clg, setClg] = useState("");

  var emp_id = sessionStorage.getItem("employee_id");

  const navigate = useNavigate();

  const [x, setX] = useState(false);

  const [z, setZ] = useState(false);
  const [y, setY] = useState(false);

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const getEmpData = async () => {
    const config = {
      method: "get",
      url: EMPLOYEE_ALL,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        res.data.data.sort((a, b) => b.id - a.id);

        console.log(res.data.data);
        setEmpData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmpData();
  }, []);

  console.log("empData -", empData);

  const [gender, setGender] = useState([]);

  const [flag, setFlag] = useState(false);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [currentSemester, setCurrentSemester] = useState("");

  const [currentSection, setCurrentSection] = useState("");

  const [religions, setReligion] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [session, setSession] = useState("");

  const [student, setStudent] = useState([]);

  const [subdata, setSubdata] = useState([]);

  const [a, setA] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const getData = async (x) => {
    setStudentData([]);
    if (
      !selectedClass ||
      !selectedSession ||
      !selectedDepartment ||
      !selectedClass ||
      !selectedSection ||
      !selectedDepartment
    ) {
      toast.error("All the fields are required");
      return;
    }

    setLoading(1);
    var url;
    if (emp_id == 316) {
      url =
        STUDENT_SESSION2 +
        `?college_id=${clg}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&religion=${religions}&status=${status}&international=1`;
    } else {
      url =
        STUDENT_SESSION2 +
        `?college_id=${collegeId}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&religion=${religions}&status=${status}`;
    }
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const config1 = {
      method: "get",
      // url: `${STUDENT_DETAILS2}`,
      url: `${STUDENT_DETAILS3}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    console.log("url - ", url);
    await axios(config)
      .then((res) => {
        console.log("Data Main", res.data.data);
        setData(res.data.data);
        console.log("data -", res.data.data);
        let data = [];
        for (var i = 0; i < res.data.data.length; i++) {
          data.push({
            id: res.data.data[i].user_id,
            gender: res.data.data[i].gender,
          });
        }
        setGender(data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Some Error Occured");
      });

    await axios(config1)
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        setStudent(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const getAllData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(1);
    const [data1, data2, data3, data4] = await Promise.all([
      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_CLASS}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_SEMESTER}`,
      })
        .then((res) => {
          setSemesterOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_SECTION}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url: STUDENT_ADVANCE_PAY,
      })
        .then((res) => {
          setLoading(0);
          setAdv(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),
    ]);
  };

  useEffect(() => {
    if (locate?.state) {
      setCurrentClass(locate.state?.class);
      setCurrentSection(locate.state?.section);
      setCurrentSemester(locate.state?.sem);
      setSession(locate.state?.session);
      setFaculty(locate.state?.depart);
    }
  }, [locate?.state]);

  const edit2 = async (id, gender1) => {
    setY(true);
    for (var i = 0; i < gender.length; i++) {
      if (gender[i].id == id) {
        gender[i].gender = gender1.target.value;
        console.log(gender[i]);
      }
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleDepartmentChange = (selectedOption) => {
    console.log("Selected Department:", selectedOption);
    setSelectedDepartment(selectedOption);
    setSelectedClass(null);
    setSelectedSemester(null);
    setSelectedSection(null);
  };

  const handleClassChange = (selectedOption) => {
    console.log("Selected Class:", selectedOption);
    setSelectedClass(selectedOption);
    setSelectedSemester(null);
    setSelectedSection(null);
  };

  const handleSemesterChange = (selectedOption) => {
    console.log("Selected Semester:", selectedOption);
    setSelectedSemester(selectedOption);
    setSelectedSection(null);
  };

  const handleSectionChange = (selectedOption) => {
    console.log("Selected Section:", selectedOption);
    setSelectedSection(selectedOption);
  };

  const handleSessionChange = (selectedOption) => {
    console.log("Selected Session:", selectedOption);
    setSelectedSession(selectedOption);
  };

  const getData2 = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: STUDENT_DETAILS2,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setData1(res.data.data);
        console.log("data1", res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getData2();
  }, []);

  const rowRef = useRef();

  const { onDownload } = useDownloadExcel({
    currentTableRef: rowRef.current,
    filename: " Students Data List ",
    sheet: "Users",
  });

  const hasDeleted = data?.some((i) => i.status === "DELETED");

  return (
    <div className="StudentDetails">
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <AdvanceFeeReciept
            mainData={subdata?.data}
            studentInfo={subdata?.studentInfo}
            data={a}
            collegeId={subdata?.studentInfo?.college_id}
            collegeOpt={collegeOpt}
            classData={classOpt}
            class_id={subdata?.data?.class_id}
            departmentData={department}
          />
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students Details</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Students Information</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Students Details
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
                      {emp_id == 316 ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Faculty <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              name="clg"
                              id="faculty"
                              className="form-control"
                              value={clg}
                              onChange={(e) => {
                                setClg(e.target.value);
                              }}
                            >
                              <option value="" selected>
                                ALL
                              </option>
                              {collegeOpt?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ) : null}
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="faculty"
                            id="section"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            options={
                              emp_id == 316
                                ? department
                                    ?.filter((s) => s.college_id == clg)
                                    ?.map((i) => ({
                                      label: i.name,
                                      value: i.id,
                                    }))
                                : department
                                    ?.filter((s) => s.college_id == collegeId)
                                    ?.map((i) => ({
                                      label: i.name,
                                      value: i.id,
                                    }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Session</label>

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="session"
                            id="session"
                            value={selectedSession}
                            onChange={handleSessionChange}
                            options={sessionOpt?.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Class</label>

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentclass"
                            id="class"
                            value={selectedClass}
                            onChange={handleClassChange}
                            options={classOpt
                              ?.filter(
                                (s) =>
                                  s.department_id == selectedDepartment?.value
                              )
                              ?.map((i) => ({ label: i.name, value: i.id }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentSemester"
                            id="semester"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            options={semesterOpt
                              ?.filter(
                                (s) => s.class_id == selectedClass?.value
                              )
                              ?.map((i) => ({ label: i.name, value: i.id }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Section</label>

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentSection"
                            id="section"
                            value={selectedSection}
                            onChange={handleSectionChange}
                            options={sectionOpt
                              ?.filter(
                                (s) => s.semester_id == selectedSemester?.value
                              )
                              ?.map((i) => ({ label: i.name, value: i.id }))}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Religion</label>
                          <select
                            className="form-control"
                            id="religion"
                            value={religions}
                            onChange={(e) => {
                              setReligion(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              {" "}
                              All
                            </option>
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                            <option value="Buddha">Buddha</option>
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
                            <option value="">Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="DELETED">DELETED</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-3">
                      <button
                        className="btn btn-nex  btn-md"
                        type="submit"
                        name="submit"
                        value="collect"
                        onClick={getData}
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
                        <h4 className="card-title">Students Details</h4>
                      </div>
                      <div className="col-md-8">
                        <span>
                          <button
                            className="btn btn-primary rounded-pill ml-1 float-right"
                            onClick={onDownload}
                          >
                            Export Excel
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <hr />
                      <table
                        id="datatable1"
                        className="table table-bordered  nowrap table-hover"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                          display: "none",
                        }}
                        ref={rowRef}
                      >
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Enrollment No.</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Dept</th>
                            <th>Class</th>
                            <th>Session</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Category</th>
                            <th>Adhaar Number</th>
                            <th>Address</th>

                            <th>Birth Place</th>
                            <th>Blood Group</th>
                            <th>Caste</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Current Address</th>

                            <th>District</th>
                            {/* <th>DOB</th> */}
                            <th>Father Name</th>
                            <th>Father Phone</th>

                            <th>Marital Status</th>
                            <th>Mother Name</th>
                            <th>Mother Phone</th>
                            <th>Nationality</th>
                            <th>Passport No</th>
                            <th>Permanent Address</th>

                            <th>Phone</th>
                            <th>Physically Handicap</th>
                            <th>Pin</th>

                            <th>Religion</th>

                            <th>State</th>

                            <th>Sub Caste</th>
                            <th>Taluk</th>

                            <th>Visa Expiry</th>
                            <th>Visa Issue</th>
                            <th>Visa No</th>
                            <th>Year Of Admission</th>
                            <th>Status</th>
                            {hasDeleted && (
                              <>
                                <th>Reason</th>
                                <th>Deleted By</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 ? (
                            data?.map((i, key) => (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{i?.user_id}</td>
                                <td>{i?.name}</td>
                                <td>
                                  {
                                    collegeOpt.find(
                                      (s) => s.id == i?.college_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    department.find(
                                      (s) => s.id == i?.department_id
                                    )?.name
                                  }
                                </td>
                                <td>{i?.class_name}</td>
                                <td>
                                  {i?.session_id}-{i?.session_id + 1}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.email
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.email
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.phone
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.phone
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.dob
                                    ? student
                                        .find((s) => s.user_id == i?.user_id)
                                        ?.dob?.split("T")[0]
                                    : " "}
                                </td>
                                {/* <td>
                                  <div className="">
                                    {(i?.gender == "Male" ||
                                      i?.gender == "male") &&
                                    !flag ? (
                                      <div className="">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "male" ||
                                            i?.gender == "Male"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag === false ? "d-none" : ""
                                          }
                                          value={
                                            i?.gender == "Male"
                                              ? i?.gender
                                              : "Male"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Male
                                      </div>
                                    ) : (i?.gender == "Female" ||
                                        i?.gender == "female") &&
                                      !flag ? (
                                      <div className="">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "Female" ||
                                            i?.gender == "female"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag == false ? "d-none" : ""
                                          }
                                          value={
                                            i?.gender == "Female"
                                              ? i?.gender
                                              : "Female"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Female
                                      </div>
                                    ) : (i?.gender == null ||
                                        i?.gender == "") &&
                                      !flag ? (
                                      <div>Not Assigned</div>
                                    ) : (
                                      <div className="flex-row d-flex justify-content-between">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "male" ||
                                            i?.gender == "Male"
                                              ? 1
                                              : 0
                                          }
                                          value={
                                            i?.gender == "Male"
                                              ? i?.gender
                                              : "Male"
                                          }
                                          className={
                                            flag == false ? "hidden" : ""
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Male
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "Female" ||
                                            i?.gender == "female"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag == false ? "hidden" : ""
                                          }
                                          value={
                                            i?.gender == "Female"
                                              ? i?.gender
                                              : "Female"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Female
                                      </div>
                                    )}
                                  </div>
                                </td> */}
                                <td>{i?.gender ? i?.gender : ""}</td>
                                <td>{i?.category}</td>
                                <td>{i?.aadhar_number}</td>
                                <td>{i?.address}</td>

                                <td>{i?.birth_place}</td>
                                <td>{i?.blood_grp}</td>
                                <td>{i?.caste}</td>
                                <td>{i?.city}</td>
                                <td>{i?.country}</td>
                                <td>{i?.current_address}</td>

                                <td>{i?.district}</td>
                                {/* <td>
                                  
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.dob
                                    ? student
                                        .find((s) => s.user_id == i?.user_id)
                                        ?.dob?.split("T")[0]
                                    : " "}
                                </td> */}
                                <td>{i?.father_name}</td>
                                <td>{i?.father_phone}</td>

                                <td>{i?.marital_status}</td>
                                <td>{i?.mother_name}</td>
                                <td>{i?.mother_phone}</td>
                                <td>{i?.nationality}</td>
                                <td>{i?.passport_no}</td>
                                <td>{i?.permanent_address}</td>

                                <td>{i?.phone}</td>
                                <td>{i?.physically_handiCap}</td>
                                <td>{i?.pin}</td>

                                <td>{i?.religion}</td>

                                <td>{i?.state}</td>

                                <td>{i?.sub_caste}</td>
                                <td>{i?.taluk}</td>

                                <td>{i?.visa_expiry}</td>
                                <td>{i?.visa_issue}</td>
                                <td>{i?.visa_no}</td>
                                <td>{i?.year_of_admission}</td>
                                <td>
                                  {/* {i?.status} */}
                                  <span
                                    className={`badge badge-soft-${
                                      i?.status == "ACTIVE"
                                        ? "success"
                                        : "danger"
                                    }`}
                                  >
                                    {i?.status}
                                  </span>
                                </td>
                                {hasDeleted && (
                                  <>
                                    <td>{i?.deleted_reason}</td>
                                    <td>
                                      {empData.find(
                                        (s) => s.id == i?.deleted_by
                                      )?.first_name +
                                        " " +
                                        empData.find(
                                          (s) => s.id == i?.deleted_by
                                        )?.last_name}
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={16}>
                                <div align="center" className="text-danger">
                                  No data available in table <br /> <br />
                                  <img
                                    src="/assets/images/addnewitem.svg"
                                    width={150}
                                  />
                                  <br />
                                  <br /> <div />
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <h6>
                      Total Students -{" "}
                      {data?.length > 0 ? data?.length : studentData ? 1 : 0}
                    </h6>
                    <div className="table-responsive">
                      <hr />
                      <table
                        // id="datatable"
                        className="table table-bordered  nowrap table-hover"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Enrollment No.</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Dept</th>
                            <th>Class</th>
                            <th>Session</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th style={{ width: "10rem" }}>Gender</th>
                            <th>Category</th>
                            <th>Religion</th>
                            <th>Status</th>
                            {hasDeleted && (
                              <>
                                <th>Reason</th>
                                <th>Deleted By</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 && student.length != 0 ? (
                            data?.map((i, key) => (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{i?.user_id}</td>
                                <td>{i?.name}</td>
                                <td>
                                  {
                                    collegeOpt.find(
                                      (s) => s.id == i?.college_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    department.find(
                                      (s) => s.id == i?.department_id
                                    )?.name
                                  }
                                </td>
                                <td>{i?.class_name}</td>
                                <td>
                                  {i?.session_id}-{i?.session_id + 1}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.email
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.email
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.phone
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.phone
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find((s) => s.user_id == i?.user_id)
                                    ?.dob
                                    ? student
                                        .find((s) => s.user_id == i?.user_id)
                                        ?.dob?.split("T")[0]
                                    : " "}
                                </td>
                                <td>
                                  {i?.gender == "female" ||
                                  i?.gender == "FEMALE"
                                    ? "FEMALE"
                                    : i?.gender == "male" || i?.gender == "MALE"
                                    ? "MALE"
                                    : ""}
                                </td>
                                {/* <td>
                                  <div className="">
                                    {(i?.gender == "Male" ||
                                      i?.gender == "male") &&
                                    !flag ? (
                                      <div className="">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "male" ||
                                            i?.gender == "Male"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag === false ? "d-none" : ""
                                          }
                                          value={
                                            i?.gender == "Male"
                                              ? i?.gender
                                              : "Male"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Male
                                      </div>
                                    ) : (i?.gender == "Female" ||
                                        i?.gender == "female") &&
                                      !flag ? (
                                      <div className="">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "Female" ||
                                            i?.gender == "female"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag == false ? "d-none" : ""
                                          }
                                          value={
                                            i?.gender == "Female"
                                              ? i?.gender
                                              : "Female"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Female
                                      </div>
                                    ) : (i?.gender == null ||
                                        i?.gender == "") &&
                                      !flag ? (
                                      <div>Not Assigned</div>
                                    ) : (
                                      <div className="flex-row d-flex justify-content-between">
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "male" ||
                                            i?.gender == "Male"
                                              ? 1
                                              : 0
                                          }
                                          value={
                                            i?.gender == "Male"
                                              ? i?.gender
                                              : "Male"
                                          }
                                          className={
                                            flag == false ? "hidden" : ""
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Male
                                        <input
                                          type="radio"
                                          checked={
                                            i?.gender == "Female" ||
                                            i?.gender == "female"
                                              ? 1
                                              : 0
                                          }
                                          className={
                                            flag == false ? "hidden" : ""
                                          }
                                          value={
                                            i?.gender == "Female"
                                              ? i?.gender
                                              : "Female"
                                          }
                                          onChange={(e) => {
                                            edit2(i?.user_id, e);
                                            i.gender = e.target.value;
                                            setZ(!z);
                                          }}
                                        />
                                        Female
                                      </div>
                                    )}
                                  </div>
                                </td> */}
                                <td>{i?.category}</td>
                                <td>{i?.religion}</td>
                                <td>
                                  {/* {i?.status} */}
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

                                {hasDeleted && (
                                  <>
                                    <td>{i?.deleted_reason}</td>
                                    <td>
                                      {empData.find(
                                        (s) => s.id == i?.deleted_by
                                      )?.first_name +
                                        " " +
                                        empData.find(
                                          (s) => s.id == i?.deleted_by
                                        )?.last_name}
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))
                          ) : studentData.length !== 0 ? (
                            <tr>
                              <td>1</td>
                              <td>{studentData?.user_id}</td>
                              <td>{studentData?.name}</td>
                              <td>{studentData?.college_name}</td>
                              <td>{studentData?.department_name}</td>
                              <td>{studentData?.class_name}</td>

                              <td>
                                {studentData?.session_id}-
                                {studentData?.session_id + 1}
                              </td>
                              <td>{studentData?.email}</td>
                              <td>{studentData?.phone}</td>
                              <td>{studentData?.dob}</td>
                              <td>
                                {studentData?.gender
                                  ? studentData?.gender
                                  : " "}
                              </td>
                              <td>{studentData?.category}</td>
                              <td>{studentData?.religion}</td>
                              <td>
                                {/* {studentData?.status} */}
                                <span
                                  className={`badge badge-soft-${
                                    studentData.status == "ACTIVE"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {studentData.status}
                                </span>
                              </td>

                              {hasDeleted && (
                                <>
                                  <td>{studentData?.deleted_reason}</td>
                                  <td>
                                    {empData.find(
                                      (s) => s.id == studentData?.deleted_by
                                    )?.first_name +
                                      " " +
                                      empData.find(
                                        (s) => s.id == studentData?.deleted_by
                                      )?.last_name}
                                  </td>
                                </>
                              )}
                            </tr>
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={16}>
                                <div align="center" className="text-danger">
                                  No data available in table <br /> <br />
                                  <img
                                    src="/assets/images/addnewitem.svg"
                                    width={150}
                                  />
                                  <br />
                                  <br />{" "}
                                  <span className="text-success bolds">
                                    <i className="fa fa-arrow-left" /> Add new
                                    record or search with different criteria.
                                  </span>
                                  <div />
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails1;
