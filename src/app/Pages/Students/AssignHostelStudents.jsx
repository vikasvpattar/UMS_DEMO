import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";
import Select from "react-select";
import ModalHostelAssign from "./StudentDetails/ModalHostelAssign";
import ModalTransportAssign from "./StudentDetails/ModalTransportAssign";
import { SESSION_ROLE } from "../../utils/sessionStorageContants";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../utils/LocalStorageConstants";
import {
  EMPLOYEE_ALL2,
  STUDENT_ADMISSION,
  STUDENT_SESSION,
} from "../../utils/apiConstants";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../utils/Academics.apiConst";
import {
  HOSTEL_DETAILS,
  HOSTEL_FLOOR_DETAILS,
  HOSTEL_ROOM_TYPE_DETAILS,
  HOSTEL_ROOMS_DETAILS,
} from "../../utils/Hostel.apiConst";
import { ROUTES } from "../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
  GET_ASSIGNED_PICKUPPOINTS,
} from "../../utils/Transport.apiConst";

function AssignHostelStudents({ setLoading, collegeId }) {
  // State to manage the modal visibility
  const [isStudentProfileModalVisible, setIsStudentProfileModalVisible] =
    useState(false);
  const [selectedStudentData, setSelectedStudentData] = useState(null);

  let role = sessionStorage.getItem(SESSION_ROLE);
  const locate = useLocation();

  const [data, setData] = useState([]);

  const [clg, setClg] = useState("");

  const [gender, setGender] = useState("");

  const [student, setStudent] = useState([]);

  const navigate = useNavigate();

  const [routeData, setRouteData] = useState([]);
  const [pickuppointData, setPickuppointData] = useState([]);
  const [pickuppoints, setPickupPoints] = useState([]);

  const changeDir = (dir, i) => {
    console.log("i -- ", i);
    navigate(
      `${dir}/${i?.user_id}?session_id=${i?.student_session_id}&depart=${i?.department_id}&session=${i?.session_id}&class=${i?.class_id}&sem=${i?.semester_id}&section=${i?.section_id}`,
      {
        state: {
          data: data,
          student: student,
        },
      }
    );
  };

  var emp_id = sessionStorage.getItem("employee_id");

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

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [session, setSession] = useState("");

  const [selectedStudent, setSelectedStudent] = useState([]);

  const [userId, setUserId] = useState("");
  const [studentData, setStudentData] = useState([]);

  const [hostel, setHostel] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hostelData, setHostelData] = useState([]);
  const [employee, setEmployee] = useState([]);

  let auth = sessionStorage.getItem("UMS_auth");

  let empHostelId = sessionStorage.getItem("HOSTEL_ID");

  const getEmpData = async () => {
    const config = {
      method: "get",
      url: `${EMPLOYEE_ALL2}?employee_id=${emp_id}`,
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("emp data - ", res.data.data);
        setEmployee(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong", err);
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
    const [data1, data2, data3] = await Promise.all([
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
    ]);
    setLoading(0);
  };

  const getHostelData = async () => {
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
        url: `${HOSTEL_DETAILS}`,
      })
        .then((res) => {
          // console.log('hostels - ', res.data.data);
          setHostel(res.data.data);
          let tempData = res.data.data;
          setGender(
            tempData?.find((s) => s.id == empHostelId)?.hostel_type
              ? tempData?.find((s) => s.id == empHostelId)?.hostel_type ==
                "Girls"
                ? "FEMALE"
                : "MALE"
              : ""
          );
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching hostels");
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${HOSTEL_FLOOR_DETAILS}`,
      })
        .then((res) => {
          // console.log('hostel floors - ', res.data.data);
          setFloors(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching hostel floors");
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${HOSTEL_ROOM_TYPE_DETAILS}`,
      })
        .then((res) => {
          // console.log('hostel room types - ', res.data.data);
          setRoomTypes(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching Room types");
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${HOSTEL_ROOMS_DETAILS}`,
      })
        .then((res) => {
          // console.log('hostel rooms - ', res.data.data);
          setRooms(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching Hostel rooms");
          console.log(err);
        }),
    ]);
  };

  const getTransportData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({
      ...config,
      url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
    })
      .then((res) => {
        console.log("routes - ", res.data.data);
        setRouteData(res.data.data);
      })
      .catch((err) => {
        toast.error("Unable to fetch Transport routes");
        console.log(err);
      });

    await axios({
      ...config,
      url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        console.log("assigned pickup points - ", res.data.data);
        setPickuppointData(res.data.data);
      })
      .catch((err) => {
        toast.error("Unable to fetch pickup points");
        console.log(err);
      });

    await axios({
      ...config,
      url: `${PICKUP_POINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        console.log("pickup points - ", res.data.data);
        setPickupPoints(res.data.data);
      })
      .catch((err) => {
        toast.error("Unable to fetch pickup points");
        console.log(err);
      });
  };

  const getData = async (x) => {
    setStudentData([]);
    console.log("data", selectedDepartment);
    if ((!faculty || !currentclass || !session || !selectedSection) && !x)
      return toast.error("Mandatory fields are required");
    let url = `${STUDENT_SESSION}?college_id=${collegeId}&department_id=${selectedDepartment?.value}&class_id=${selectedClass?.value}&section_id=${selectedSection?.value}&semester_id=${selectedSemester?.value}&session_id=${selectedSession?.value}&status=${status}`;
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log("Data Main - ", res.data.data);
        setStudent(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error Occured");
      });
    setLoading(0);
  };

  const getStudentData = async () => {
    setLoading(1);
    setData([]);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION}/${userId}`,
      data: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer  ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("student data - ", res.data);
        let temp = res.data;
        let activeSession = temp?.session?.filter((s) => s.status == "ACTIVE");
        setFaculty(res.data.college_id);
        setCurrentClass(activeSession[0]?.class_id);
        setSession(activeSession[0].session_id);
        let obj = {};
        obj["id"] = temp?.data.id;
        obj["department_id"] = temp?.data.department_id;
        obj["class_id"] = activeSession[0]?.class_id;
        obj["class_name"] = activeSession[0]?.class_name;
        obj["session_id"] = activeSession[0]?.session_id;
        obj["student_session_id"] = activeSession[0]?.id;
        obj["semester_id"] =
          temp?.semester[temp?.semester.length - 1]?.semester_id;
        obj["semester"] =
          temp?.semester[temp?.semester.length - 1]?.semester_name;
        obj["section_id"] =
          temp?.semester[temp?.semester.length - 1]?.section_id;
        obj["user_id"] = temp?.data.user_id;
        obj["name"] = temp?.data.name;
        obj["student_picture"] = temp?.data.student_picture;
        obj["email"] = temp?.data.email;
        obj["phone"] = temp?.data.phone;
        obj["dob"] = temp?.data.dob.substring(0, 10);
        obj["gender"] = temp?.data.gender;
        obj["category"] = temp?.data.category;
        obj["is_hostel"] = activeSession[0].is_hostel;
        // obj["is_transport"] = activeSession[0].is_transport;
        obj["status"] = temp?.data.status;
        obj["college_name"] = collegeOpt.find(
          (s) => s.id == temp?.data.college_id
        ).name;
        obj["dept_name"] = department.find(
          (s) => s.id == temp?.data.department_id
        )?.name;
        console.log("obj - ", obj);
        setStudentData(obj);
        setStudent(obj);
        let targetDiv = document.getElementById("datatable");
        targetDiv.scrollIntoView({ behavior: "smooth" });
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData();
    getEmpData();
    getHostelData();
    getTransportData();
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

  const getStudentHostelData = async () => {
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION}/${userId}`,
      data: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer  ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((res) => {
        console.log("Data Main - ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error Occured");
      });
    setLoading(0);
  };

  return (
    <div className="StudentDetails">
      <ModalTransportAssign
        pickuppoints={pickuppoints}
        routeData={routeData}
        setLoading={setLoading}
        selectedStudent={selectedStudent}
        pickuppointData={pickuppointData}
      />
      <ModalHostelAssign
        setRooms={setRooms}
        setLoading={setLoading}
        selectedStudent={selectedStudent}
        hostel={hostel}
        floors={floors}
        roomTypes={roomTypes}
        rooms={rooms}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students Details</h4>
                  {/* <h4 className="mb-0 mr-5">{role == "WARDEN" && employee && hostel.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4> */}
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
                    <h2 className="card-title">Search By Enrollment Number</h2>
                    <br />

                    <div className="input-group mb-3 col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student Enrollment No"
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value);
                        }}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-nex  btn-md"
                          type="submit"
                          name="submit"
                          value="collect"
                          onClick={getStudentData}
                        >
                          <i className="fa fa-search mr-1" aria-hidden="true" />{" "}
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />

                    <div className="row">
                      {/* {emp_id == 316 ? (
                        <div className="col-md-4">
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
                      ) : null} */}
                      <div className="col-md-4">
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Session <span style={{ color: "red" }}>*</span>
                          </label>
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Class <span style={{ color: "red" }}>*</span>
                          </label>
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Semester <span style={{ color: "red" }}>*</span>
                          </label>
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Section <span style={{ color: "red" }}>*</span>
                          </label>
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

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Status <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            value={status}
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
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
                    </div>
                    <div className="table-responsive">
                      <hr />
                      <table
                        id="datatable"
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
                            <th>Department</th>
                            <th>Class</th>
                            <th>Session</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th width="10%" className="text-center">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 ? (
                            data
                              // ?.filter((s)=> (status == "INACTIVE" || s.sem_status == "ACTIVE"))
                              ?.filter((s) => {
                                const selectedHostel = hostel.find(
                                  (hostelItem) =>
                                    hostelItem.id == employee[0]?.hostel_id
                                );
                                if (role !== "WARDEN") return true;
                                if (
                                  selectedHostel &&
                                  selectedHostel.hostel_type === "Boys"
                                ) {
                                  return (
                                    (status == "INACTIVE" ||
                                      s.sem_status == "ACTIVE") &&
                                    (s.gender === "male" || s.gender === "MALE")
                                  );
                                } else {
                                  return (
                                    (status == "INACTIVE" ||
                                      s.sem_status == "ACTIVE") &&
                                    (s.gender === "female" ||
                                      s.gender === "FEMALE")
                                  );
                                }
                              })
                              ?.map((i, key) => (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>
                                    <a
                                      style={{
                                        cursor: "pointer",
                                        color: "#0E86D4",
                                      }}
                                      onClick={() => {
                                        if (role === "SUACC") {
                                          changeDir(
                                            ROUTES.Accountant
                                              .ViewStudentProfile,
                                            i
                                          );
                                        }
                                        if (role === "WARDEN") {
                                          changeDir(
                                            ROUTES.Warden.ViewStudentProfile,
                                            i
                                          );
                                        }
                                      }}
                                    >
                                      {i?.user_id}
                                    </a>
                                  </td>
                                  <td>{i?.name}</td>
                                  <td>{i?.dept_name}</td>
                                  <td>
                                    {i?.class_name} ({i?.semester})
                                  </td>
                                  <td>
                                    {i?.session_id}-{i?.session_id + 1}
                                  </td>
                                  <td>{i?.phone}</td>
                                  <td>{i?.gender}</td>
                                  <td>
                                    <div className="d-flex align-items-center justify-content-between">
                                      <button className="btn btn-sm btn-primary">
                                        <a
                                          onClick={() => {
                                            if (role === "SUACC") {
                                              changeDir(
                                                ROUTES.Accountant
                                                  .ViewStudentProfile,
                                                i
                                              );
                                            }
                                            if (role === "WARDEN") {
                                              changeDir(
                                                ROUTES.Warden
                                                  .ViewStudentProfile,
                                                i
                                              );
                                            }
                                          }}
                                        >
                                          View Profile
                                        </a>
                                      </button>
                                      <div
                                        data-toggle="modal"
                                        data-target="#ModalHostelAssign"
                                        onClick={() => setSelectedStudent(i)}
                                        style={{ width: "60%" }}
                                      >
                                        <button className="btn btn-sm btn-success ml-2">
                                          Assign Hostel
                                        </button>
                                      </div>
                                      {role != "WARDEN" && (
                                        <div
                                          data-toggle="modal"
                                          data-target="#ModalTransportAssign"
                                          onClick={() => setSelectedStudent(i)}
                                          style={{ width: "60%" }}
                                        >
                                          <button className="btn btn-sm btn-info ml-2">
                                            Assign Transport
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                          ) : studentData.length !== 0 ? (
                            <tr>
                              <td>1</td>
                              <td>
                                <a
                                  style={{
                                    cursor: "pointer",
                                    color: "#0E86D4",
                                  }}
                                  onClick={() => {
                                    if (role === "SUACC") {
                                      changeDir(
                                        ROUTES.Accountant.ViewStudentProfile,
                                        studentData
                                      );
                                    }
                                    if (role === "WARDEN") {
                                      changeDir(
                                        ROUTES.Warden.ViewStudentProfile,
                                        studentData
                                      );
                                    }
                                  }}
                                >
                                  {studentData?.user_id}
                                </a>
                              </td>
                              <td>{studentData?.name}</td>
                              <td>{studentData?.dept_name}</td>
                              <td>
                                {studentData?.class_name} (
                                {studentData?.semester})
                              </td>
                              <td>
                                {studentData?.session_id}-
                                {studentData?.session_id + 1}
                              </td>
                              <td>{studentData?.phone}</td>
                              <td>{studentData?.gender}</td>
                              <td>
                                <div className="d-flex align-items-center justify-content-between">
                                  <button className="btn btn-sm btn-primary">
                                    <a
                                      onClick={() => {
                                        if (role === "SUACC") {
                                          changeDir(
                                            ROUTES.Accountant
                                              .ViewStudentProfile,
                                            studentData
                                          );
                                        }
                                        if (role === "WARDEN") {
                                          changeDir(
                                            ROUTES.Warden.ViewStudentProfile,
                                            studentData
                                          );
                                        }
                                      }}
                                    >
                                      View Profile
                                    </a>
                                  </button>
                                  <div
                                    data-toggle="modal"
                                    data-target="#ModalHostelAssign"
                                    onClick={() =>
                                      setSelectedStudent(studentData)
                                    }
                                    style={{ width: "60%" }}
                                  >
                                    <button className="btn btn-sm btn-success ml-2">
                                      Assign Hostel
                                    </button>
                                  </div>
                                  {role != "WARDEN" && (
                                    <div
                                      data-toggle="modal"
                                      data-target="#ModalTransportAssign"
                                      onClick={() =>
                                        setSelectedStudent(studentData)
                                      }
                                      style={{ width: "60%" }}
                                    >
                                      <button className="btn btn-sm btn-info ml-2">
                                        Assign Transport
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={15}>
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

export default AssignHostelStudents;
