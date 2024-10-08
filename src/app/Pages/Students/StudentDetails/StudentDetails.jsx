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
import ModalHostelAssign from "./ModalHostelAssign";
import ModalTransportAssign from "./ModalTransportAssign";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import StudentProfile1 from "../../../modals/StudentProfile1";
import {
  STUDENT_ADMISSION,
  STUDENT_DETAILS2,
  STUDENT_SESSION_UPDATE,
  STUDENT_GENDER,
  STUDENT_SESSION,
  STUDENT_ADVANCE_PAY,
  STUDENT_SESSION_UPDATE_STATUS,
  STUDENT_INFO_UPDATE_STATUS,
  STUDENT_SESSION2,
  GET_STUDENT_SESSION,
} from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import {
  HOSTEL_DETAILS,
  HOSTEL_FLOOR_DETAILS,
  HOSTEL_ROOM_TYPE_DETAILS,
  HOSTEL_ROOMS_DETAILS,
} from "../../../utils/Hostel.apiConst";
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
  GET_ASSIGNED_PICKUPPOINTS,
} from "../../../utils/Transport.apiConst";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

function StudentDetails({ setLoading, collegeId }) {
  let role = sessionStorage.getItem(SESSION_ROLE);
  const locate = useLocation();

  const roles = sessionStorage.getItem("role");

  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const [adv, setAdv] = useState([]);
  const [data, setData] = useState([]);

  const [clg, setClg] = useState("");

  const [hostel, setHostel] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [routeData, setRouteData] = useState([]);
  const [pickuppointData, setPickuppointData] = useState([]);
  const [pickuppoints, setPickupPoints] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState([]);

  var emp_id = sessionStorage.getItem("employee_id");

  const handlePrint = async (i, studentData) => {
    if (studentData) {
      let real = await adv?.filter((s) => s.user_id == studentData?.user_id);
      setA(real);
      await setSubdata(i);
      PrintRecipt();
    } else {
      let real = await adv?.filter((s) => s.user_id == i?.data?.user_id);
      setA(real);
      await setSubdata(i);
      PrintRecipt();
    }
  };

  const navigate = useNavigate();

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

  const changeDir1 = (dir, obj) => {
    navigate(
      `${dir}/${obj?.user_id}?session_id=${obj?.id}&depart=${obj?.department_id}&session=${obj?.session_id}&class=${obj?.class_id}&sem=${obj?.semester_id}&section=${obj?.section_id}`,
      {
        state: {
          data: data,
          student: student,
        },
      }
    );
  };

  let empHostelId = sessionStorage.getItem("HOSTEL_ID");

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
          // setLoading(0);
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
          // setLoading(0);
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
          // setLoading(0);
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
          // setLoading(0);
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

  const [gender, setGender] = useState([]);

  const [flag, setFlag] = useState(false);

  const [selectedStudentData, setSelectedStudentData] = useState(null);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [currentSemester, setCurrentSemester] = useState("");

  const [currentSection, setCurrentSection] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [session, setSession] = useState("");

  const [student, setStudent] = useState([]);

  const [subdata, setSubdata] = useState([]);

  const [a, setA] = useState([]);

  const [hostelYear, setHostelYear] = useState("");

  const [flag1, setFlag1] = useState(false);

  const [isStudentProfileModalVisible, setIsStudentProfileModalVisible] =
    useState(false);

  const [userId, setUserId] = useState("");
  const [studentData, setStudentData] = useState([]);

  const employee_id = sessionStorage.getItem("employee_id");

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
        GET_STUDENT_SESSION +
        `?college_id=${clg}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&status=${status}&international=1`;
    } else {
      url =
        GET_STUDENT_SESSION +
        `?college_id=${collegeId}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&status=${status}`;
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
      url: `${STUDENT_DETAILS2}`,
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

  const handleEdit = async (id, stat) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: stat,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Update Success");
        console.log(res);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  console.log("studentData -", studentData);

  // Get current date and time in local timezone
  const getCurrentLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const currentLocalDateTime = getCurrentLocalDateTime();

  const handleDelete = async (id, stat) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_INFO_UPDATE_STATUS}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "DELETED",
        deleted_by: employee_id,
        deleted_date: currentLocalDateTime,
        deleted_reason: "ADMISSION CANCELLED",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        // toast.success("Update Success");
        toast.success(`Student admission ${id} deleted successfully`);
        console.log(res);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });

    setLoading(1);
    const config2 = {
      method: "put",
      url: `${STUDENT_SESSION_UPDATE_STATUS}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "DELETED",
      },
    };

    await axios(config2)
      .then((res) => {
        setLoading(0);
        // toast.success("Update Success");
        console.log(res);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
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

  const save = async () => {
    setLoading(1);
    for (var i = 0; i < data.length; i++) {
      if (data[i].gender == "" || data[i].gender == null) {
        toast.error("Gender is required for all Students");
        return;
      }
    }

    if (!x && !y) {
      toast.error("Nothing Changed");
      setFlag(false);
      return;
    }

    setFlag(false);

    const config = {
      method: "post",
      url: `${STUDENT_GENDER}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: gender,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res);
        // await getData2(true);
        toast.success("Successfully Updated Details");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setLoading(0);
  };

  const handleChange = async (sid, h, t) => {
    setX(true);
    const config = {
      method: "put",
      url: `${STUDENT_SESSION_UPDATE}/${sid}`,
      data: {
        hostel: h,
        transport: t,
        session_id: session,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

    const config1 = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("student data - ", res?.data);
        let temp = res?.data;
        let activeSession = temp?.session?.filter((s) => s?.status == "ACTIVE");
        setFaculty(res?.data?.college_id);
        setCurrentClass(activeSession[0]?.class_id);
        setSession(activeSession[0]?.session_id);
        let obj = {};
        // obj["id"] = temp?.data?.id;
        obj["id"] =
          temp?.semester[temp?.semester.length - 1]?.student_session_id;
        obj["class_name"] = temp?.session[temp?.session.length - 1]?.class_name;
        obj["department_id"] = temp?.data?.department_id;
        obj["class_id"] = activeSession[0]?.class_id;
        obj["session_id"] = activeSession[0]?.session_id;
        obj["student_session_id"] = activeSession[0]?.id;
        obj["semester_id"] =
          temp?.semester[temp?.semester.length - 1]?.semester_id;
        obj["semester"] =
          temp?.semester[temp?.semester.length - 1]?.semester_name;
        obj["section_id"] =
          temp?.semester[temp?.semester.length - 1]?.section_id;
        obj["user_id"] = temp?.data?.user_id;
        obj["name"] = temp?.data?.name;
        obj["email"] = temp?.data?.email;
        obj["phone"] = temp?.data?.phone;
        obj["dob"] = temp?.data?.dob?.substring(0, 10);
        obj["gender"] = temp?.data?.gender;
        obj["category"] = temp?.data?.category;
        obj["is_hostel"] = activeSession[0]?.is_hostel;
        obj["is_transport"] = activeSession[0]?.is_transport;
        obj["status"] = temp?.data?.status;
        obj["application_status"] = temp?.data?.application_status;
        obj["college_name"] = collegeOpt.find(
          (s) => s.id == temp?.data?.college_id
        ).name;
        obj["dept_name"] = department.find(
          (s) => s.id == temp?.data?.department_id
        )?.name;
        console.log("obj - ", obj);
        setStudentData(obj);
        let targetDiv = document.getElementById("datatable");
        targetDiv.scrollIntoView({ behavior: "smooth" });
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    await axios({
      ...config1,
      url: STUDENT_ADVANCE_PAY,
    })
      .then((res) => {
        console.log("adv - ", res.data.data);
        setAdv(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData();
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
        {isStudentProfileModalVisible && (
          <StudentProfile1
            setLoading={setLoading}
            collegeId={collegeId}
            selectedStudentData={selectedStudentData}
          />
        )}
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
                      {emp_id == 316 ? (
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
                      ) : null}
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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

                      <div className="col-md-4">
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
                    <h6>
                      Total Students -{" "}
                      {data?.length > 0 ? data?.length : studentData ? 1 : 0}
                    </h6>
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
                            <th>College</th>
                            <th>Dept</th>
                            <th>Class</th>
                            <th>Session</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th style={{ width: "10rem" }}>Gender</th>
                            {role != "STAFF" ? (
                              <>
                                <th>Category</th>
                                <th>Is Hostel</th>
                                <th>Is Transport</th>
                                <th style={{ minWidth: "100px" }}>Action</th>
                              </>
                            ) : null}
                            <th>Advance Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 ? (
                            data?.map((i, key) => (
                              <tr>
                                <td>{key + 1}</td>
                                <td>
                                  <a
                                    style={{
                                      cursor: "pointer",
                                      color: "#0E86D4",
                                    }}
                                    onClick={() => {
                                      if (role == "ADMIN")
                                        changeDir(
                                          ROUTES.Principal.Student
                                            .ViewStudentProfile,
                                          i
                                        );
                                      if (role == "SUPERADMIN")
                                        changeDir(
                                          ROUTES.Registar.Student
                                            .ViewStudentProfile,
                                          i
                                        );
                                      if (role == "SUACC") {
                                        changeDir(
                                          ROUTES.Accountant.ViewStudentProfile,
                                          i
                                        );
                                      }
                                    }}
                                    title="View Profile"
                                  >
                                    {i?.user_id}
                                  </a>
                                </td>
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
                                </td>
                                <td>{i?.category}</td>
                                {role != "STAFF" ? (
                                  <>
                                    <td>
                                      {i?.is_hostel == 1 ? "Yes" : "No"}
                                      {/* <a
                                        data-toggle="modal"
                                        data-target="#StudentProfile1"
                                        title="Assign Hostel"
                                        onClick={() => {
                                          setIsStudentProfileModalVisible(true);

                                          if (role == "SUPERADMIN")
                                            changeDir(
                                              ROUTES.Registar.Student
                                                .StudentProfile1,
                                              i
                                            );
                                          if (role == "SUACC")
                                            changeDir(
                                              ROUTES.Accountant.StudentProfile1,
                                              i
                                            );
                                        }}
                                      > */}
                                      {/* <i
                                          className="fa fa-tags"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </a> */}
                                    </td>
                                    <td>
                                      {i.is_transport == 1 ? "Yes" : "No"}
                                      {/* <input
                                        type="checkbox"
                                        checked={i?.is_transport}
                                        disabled={
                                          flag == true ? "" : "disabled"
                                        }
                                        className={
                                          flag == false ? "hidden" : ""
                                        }
                                        onChange={() => {
                                          i?.is_transport == 1
                                            ? (i?.is_transport = 0)
                                            : (i?.is_transport = 1);
                                          setFlag1((flag1) => !flag1);
                                          handleChange(
                                            i?.user_id,
                                            i?.is_hostel,
                                            i?.is_transport
                                          );
                                        }}
                                      /> */}
                                    </td>
                                    <td className="flex-nowrap justify-content-between">
                                      <a
                                        onClick={() => {
                                          if (role == "ADMIN")
                                            changeDir(
                                              ROUTES.Principal.Student
                                                .StudentProfile,
                                              i
                                            );
                                          if (role == "SUPERADMIN")
                                            changeDir(
                                              ROUTES.Registar.Student
                                                .StudentProfile,
                                              i
                                            );
                                          if (role == "WARDEN")
                                            changeDir(
                                              ROUTES.Warden.ViewStudentProfile,
                                              i
                                            );
                                          if (role == "SUACC") {
                                            changeDir(
                                              ROUTES.Accountant.StudentProfile,
                                              i
                                            );
                                          }
                                        }}
                                        title="Edit"
                                      >
                                        <i
                                          className="fa fa-edit mr-2"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </a>
                                      <a
                                        onClick={() => {
                                          if (role == "ADMIN")
                                            changeDir(
                                              ROUTES.Principal.Student
                                                .ViewStudentProfile,
                                              i
                                            );
                                          if (role == "SUPERADMIN")
                                            changeDir(
                                              ROUTES.Registar.Student
                                                .ViewStudentProfile,
                                              i
                                            );
                                          if (role == "SUACC") {
                                            changeDir(
                                              ROUTES.Accountant
                                                .ViewStudentProfile,
                                              i
                                            );
                                          }
                                        }}
                                        title="View Profile"
                                      >
                                        <i
                                          className="fas fa-eye mr-2"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </a>
                                      {i?.application_status ==
                                        "APPROVED_REGISTRAR" &&
                                      role == "ADMIN" ? (
                                        <></>
                                      ) : (
                                        <a title="Inactive Student">
                                          {i?.status === "INACTIVE" ? (
                                            <i
                                              className="fa fa-thumbs-up"
                                              style={{
                                                color: "green",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                handleEdit(
                                                  i?.user_id,
                                                  "ACTIVE"
                                                );
                                              }}
                                            />
                                          ) : (
                                            <i
                                              className="fa fa-thumbs-down"
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                handleEdit(
                                                  i?.user_id,
                                                  "INACTIVE"
                                                );
                                              }}
                                            />
                                          )}
                                        </a>
                                      )}

                                      {roles == "SUPERADMIN" ||
                                      roles == "SUACC" ? (
                                        <a>
                                          {i?.status === "INACTIVE" ? (
                                            <i
                                              className="fa fa-trash ml-2"
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                handleDelete(i?.user_id);
                                              }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </a>
                                      ) : (
                                        <></>
                                      )}

                                      {role === "SUPERADMIN" &&
                                      role === "SUACC" ? (
                                        <>
                                          <a
                                            data-toggle="modal"
                                            data-target="#ModalHostelAssign"
                                            onClick={() =>
                                              setSelectedStudent(i)
                                            }
                                            title="Assign Hostel"
                                          >
                                            <i
                                              className="fa fa-bed mr-2"
                                              aria-hidden="true"
                                              style={{ cursor: "pointer" }}
                                            />
                                          </a>
                                          <a
                                            title="Assign Transport"
                                            data-toggle="modal"
                                            data-target="#ModalTransportAssign"
                                            onClick={() =>
                                              setSelectedStudent(i)
                                            }
                                          >
                                            <i
                                              className="fa fa-bus mr-2"
                                              aria-hidden="true"
                                              style={{ cursor: "pointer" }}
                                            />
                                          </a>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                    <td>
                                      {adv &&
                                      adv?.filter(
                                        (s) => s.user_id == i?.user_id
                                      ).length > 0 ? (
                                        <a
                                          href="javascript:void(0)"
                                          className="badge badge-light"
                                          data-toggle="tooltip"
                                          title=""
                                          data-original-title="Print"
                                          onClick={() => handlePrint(i)}
                                        >
                                          {" "}
                                          <i className="fa fa-print" />{" "}
                                        </a>
                                      ) : (
                                        "Not Paid"
                                      )}
                                    </td>
                                  </>
                                ) : null}
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
                                    if (role == "ADMIN")
                                      changeDir1(
                                        ROUTES.Principal.Student
                                          .ViewStudentProfile,
                                        studentData
                                      );
                                    if (role == "SUPERADMIN")
                                      changeDir1(
                                        ROUTES.Registar.Student
                                          .ViewStudentProfile,
                                        studentData
                                      );
                                    if (role == "SUACC") {
                                      changeDir1(
                                        ROUTES.Accountant.ViewStudentProfile,
                                        studentData
                                      );
                                    }
                                  }}
                                >
                                  {studentData?.user_id}
                                </a>
                              </td>
                              <td>{studentData?.name}</td>
                              <td>{studentData?.college_name}</td>
                              <td>{studentData?.dept_name}</td>
                              <td>{studentData?.class_name}</td>

                              <td>
                                {studentData?.session_id}-
                                {studentData?.session_id + 1}
                              </td>
                              <td>{studentData?.email}</td>
                              <td>{studentData?.phone}</td>
                              <td>{studentData?.dob}</td>
                              <td>{studentData?.gender}</td>
                              <td>{studentData?.category}</td>

                              {role != "STAFF" ? (
                                <>
                                  <td>
                                    {studentData?.is_hostel == 1 ? "Yes" : "No"}
                                  </td>
                                  <td>
                                    {studentData?.is_transport == 1
                                      ? "Yes"
                                      : "No"}
                                  </td>
                                  <td className="flex-nowrap justify-content-between">
                                    <a
                                      onClick={() => {
                                        if (role == "ADMIN")
                                          changeDir1(
                                            ROUTES.Principal.Student
                                              .StudentProfile,
                                            studentData
                                          );
                                        if (role == "SUPERADMIN")
                                          changeDir1(
                                            ROUTES.Registar.Student
                                              .StudentProfile,
                                            studentData
                                          );
                                        if (role == "SUACC") {
                                          changeDir1(
                                            ROUTES.Accountant.StudentProfile,
                                            studentData
                                          );
                                        }
                                      }}
                                    >
                                      <i
                                        className="fa fa-edit mr-2"
                                        aria-hidden="true"
                                        style={{ cursor: "pointer" }}
                                      />
                                    </a>
                                    <a
                                      onClick={() => {
                                        if (role == "ADMIN")
                                          changeDir1(
                                            ROUTES.Principal.Student
                                              .ViewStudentProfile,
                                            studentData
                                          );
                                        if (role == "SUPERADMIN")
                                          changeDir1(
                                            ROUTES.Registar.Student
                                              .ViewStudentProfile,
                                            studentData
                                          );
                                        if (role == "SUACC") {
                                          changeDir1(
                                            ROUTES.Accountant
                                              .ViewStudentProfile,
                                            studentData
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
                                    {studentData?.application_status ==
                                      "APPROVED_REGISTRAR" &&
                                    role == "ADMIN" ? (
                                      <></>
                                    ) : (
                                      <a>
                                        {studentData?.status === "INACTIVE" ? (
                                          <i
                                            className="fa fa-thumbs-up"
                                            style={{
                                              color: "green",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              handleEdit(
                                                studentData?.user_id,
                                                "ACTIVE"
                                              );
                                            }}
                                          />
                                        ) : (
                                          <i
                                            className="fa fa-thumbs-down"
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              handleEdit(
                                                studentData?.user_id,
                                                "INACTIVE"
                                              );
                                            }}
                                          />
                                        )}
                                      </a>
                                    )}

                                    {roles == "SUPERADMIN" ||
                                    roles == "SUACC" ? (
                                      <a>
                                        {studentData?.status === "INACTIVE" ? (
                                          <i
                                            className="fa fa-trash ml-2"
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              handleDelete(
                                                studentData?.user_id
                                              );
                                            }}
                                          />
                                        ) : (
                                          <></>
                                        )}
                                      </a>
                                    ) : (
                                      <></>
                                    )}

                                    {role === "SUPERADMIN" &&
                                    role === "SUACC" ? (
                                      <>
                                        <a
                                          data-toggle="modal"
                                          data-target="#ModalHostelAssign"
                                          onClick={() =>
                                            setSelectedStudent(studentData)
                                          }
                                          title="Assign Hostel"
                                        >
                                          <i
                                            className="fa fa-bed mr-2"
                                            aria-hidden="true"
                                            style={{ cursor: "pointer" }}
                                          />
                                        </a>
                                        <a
                                          title="Assign Transport"
                                          data-toggle="modal"
                                          data-target="#ModalTransportAssign"
                                          onClick={() =>
                                            setSelectedStudent(studentData)
                                          }
                                        >
                                          <i
                                            className="fa fa-bus mr-2"
                                            aria-hidden="true"
                                            style={{ cursor: "pointer" }}
                                          />
                                        </a>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                  <td>
                                    {adv &&
                                    adv?.filter(
                                      (s) => s.user_id == studentData.user_id
                                    ).length > 0 ? (
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-light"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Print"
                                        onClick={() =>
                                          handlePrint({}, studentData)
                                        }
                                      >
                                        {" "}
                                        <i className="fa fa-print" />{" "}
                                      </a>
                                    ) : (
                                      "Not Paid"
                                    )}
                                  </td>
                                </>
                              ) : null}
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

export default StudentDetails;
