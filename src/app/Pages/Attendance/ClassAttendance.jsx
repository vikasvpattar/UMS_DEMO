import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Nodata from "../../Components/NoData/Nodata";
import useEmployee from "../../Hooks/Employee/useEmployee";
import {
  ACADEMICS_CLASS_TIME_TABLE,
  ACADEMICS_ADD_LESSON_PLAN,
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../utils/Academics.apiConst";
import { STUDENT_SESSION } from "../../utils/apiConstants";
import {
  STUDENTS_ATTENDANCE_ALL,
  STUDENT_UPDATE_ATT,
} from "../../utils/attendance.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import { SESSION_EMPLOYEE_ID } from "../../utils/sessionStorageContants";
import AttendanceRow from "./AttendanceRow";
import { sessionOpt } from "./../../Data/jsonData/Academics/Academics";
import Select from "react-select";

function ClassAttendance({ setLoading, collegeId }) {
  var curr = new Date();

  const [edit, setEdit] = useState(false);

  const [edit1, setEdit1] = useState(false);

  const [prevatt, setPrevatt] = useState(false);

  const [flag1, setFlag1] = useState(false);

  const [firstDate, setFirstDate] = useState(
    curr.getDate() - curr.getDay() + 1
  );
  const [lastDate, setLastDate] = useState(curr.getDate() - curr.getDay() + 7);

  const getDepartementOpt = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const getProgramOpt = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const [week, setWeek] = useState([]);

  const [date, setDate] = useState("");

  const setWeekDays = (type) => {
    if (type == "next") {
      setFirstDate(firstDate + 7);
      setLastDate(lastDate + 7);
    } else {
      setFirstDate(firstDate - 7);
      setLastDate(lastDate - 7);
    }
  };

  const getWeekNumber = () => {
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  function firstDayOfThisWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  const getEmployeeId = () =>
    sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      ? sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      : null;

  const [employeeId, setEmployeeId] = useState(getEmployeeId());

  const [thisWeeek, setThisWeek] = useState(getWeekNumber());

  const [departmentOpt, setDepartmentOpt] = useState(getDepartementOpt());

  const [programOpt, setProgramOpt] = useState(getProgramOpt());

  const [data, setData] = useState([]);

  const [lessonPlanData, setLessonPlanData] = useState([]);

  const [classData, setClassData] = useState([]);

  const [x, setX] = useState([]);

  const [y, setY] = useState([]);

  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const [semesterData, setSemesterData] = useState([]);

  const [sectionData, setSectionData] = useState([]);

  const [courseData, setCourseData] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    firstDayOfThisWeek(getWeekNumber(), new Date().getFullYear())
  );

  //attendance
  const [attendanceDate, setAttendanceDate] = useState("");

  const [attendanceData, setAttendanceData] = useState();

  const [visibility, setVisibility] = useState(false);

  const [defaultAttendance, setDefaultAttendance] = useState("PRESENT");

  const [presentArray, setPresentArray] = useState([]);

  const [absentArray, setAbsentArray] = useState([]);

  const [idAttendenceTaken, setIsAttendenceTaken] = useState();

  //DayData
  const tabData = [
    {
      name: "Monday",
      id: "MONDAY",
      color: "bg-sky",
    },
    {
      name: "Tuesday",
      id: "TUESDAY",
      color: "bg-green",
    },
    {
      name: "Wednesday",
      id: "WEDNESDAY",
      color: "bg-yellow",
    },
    {
      name: "Thursday",
      id: "THURSDAY",
      color: "bg-lightred",
    },
    {
      name: "Friday",
      id: "FRIDAY",
      color: "bg-purple",
    },
    {
      name: "Saturday",
      id: "SATURDAY",
      color: "bg-pink",
    },
    {
      name: "Sunday",
      id: "SUNDAY",
    },
  ];

  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    class_id: "",
    section_id: "",
  });

  const navigateToCreate = () => {
    setVisibility((prev) => !prev);
    setEdit(false);
    setDefaultAttendance("PRESENT");
  };

  //Employee
  const [employeeOpt] = useEmployee(collegeId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //get The Inintila Data
  const getDataAllData = async () => {
    // if (!user.employee_id) return toast.error('Please Select Employee to search')
    // if (!user.session_id) return toast.error('Please Select Session or Academic Year to search')
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2, data3, data4] = await Promise.all([
      // axios({ ...config, url: ACADEMICS_CLASS_TIME_TABLE + `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`, })
      //     .then(res => {
      //         setData(res.data.data)
      //         setLoading(0)
      //     })
      //     .catch(err => {
      //         setLoading(0)
      //         console.log(err);
      //         toast.error('Something went wrong')
      //     })

      // ,
      axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setCourseData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSemesterData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),
    ]);
  };

  const getData = async () => {
    if (!user?.section_id || !user?.session_id)
      return toast.error("Mandatory fields are required");
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
      url:
        ACADEMICS_CLASS_TIME_TABLE +
        `?college_id=${collegeId}&section_id=${user?.section_id}&session_id=${user?.session_id}`,
    })
      .then((res) => {
        setData(res.data.data);
        setVisibility(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });

    await axios({
      ...config,
      url:
        STUDENT_SESSION +
        `?section_id=${user?.section_id}&class_id=${user?.class_id}&session_id=${user?.session_id}&status=ACTIVE`,
    })
      .then((res) => {
        console.log(res.data.data.length);
        console.log('student data - ', studentData);
        setStudentData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const getLessonDataOnWeekChange = () => {
    if (!user.employee_id) return;
    if (!user.session_id) return;
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_ADD_LESSON_PLAN +
        `?college_id=${collegeId}&&employee_id=${
          user.employee_id
        }&&session_is=${
          user.session_id
        }&start_date=${week[0]?.toISOString()}&end_date=${week[6]?.toISOString()}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLessonPlanData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        // toast.error('Something went wrong')
      });
  };

  //Attendence

  const checkAndSetStudentData = async () => {
    if (defaultAttendance == "ABSENT") {
      await setPresentArray([]);
      if (studentData && studentData.length != 0) {
        const arr = [];
        for (const it of studentData) {
          const obj = {
            student_session_id: it?.session_id,
            student_id: it?.user_id,
          };
          arr.push(obj);
        }
        await setAbsentArray(arr);
      }
    } else if (defaultAttendance == "PRESENT") {
      await setAbsentArray([]);
      if (studentData && studentData.length != 0) {
        const arr = [];
        for (const it of studentData) {
          const obj = {
            student_session_id: it?.session_id,
            student_id: it?.user_id,
          };
          arr.push(obj);
        }
        await setPresentArray(arr);
      }
    }
  };

  const HandleAttendenceSubmit = async () => {
    setDefaultAttendance("");
    console.log(presentArray, absentArray);
    const originalDate = new Date(attendanceDate);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const config = {
      method: "post",
      url: STUDENTS_ATTENDANCE_ALL,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        college_id: collegeId,
        course_timetable_id: attendanceData?.id,
        date: date,
        created_by: employeeId,
        present_students: presentArray,
        absent_students: absentArray,
      },
    };

    Swal.fire({
      title: "Do you want to save the attendence",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (s) => {
      if (s.isConfirmed) setLoading(1);
      await axios(config)
        .then(() => {
          toast.success("Added");
          if (role == "SUPERADMIN" || role == "ADMIN") {
            setPrevatt(true);
          } else {
            setPrevatt(false);
          }
          setEdit1(false);
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
      setLoading(0);
    });
  };

  const updateAtt = async () => {
    let data = [];
    try {
      for (let i of presentArray) {
        let id = await x?.find((s) => s.student_id == i?.student_id)?.id;
        if (!id) {
          id = await y?.find((s) => s.student_id == i?.student_id)?.id;
        }
        if (id) {
          let obj = {
            id: id,
            attendance_status: "PRESENT",
          };
          data.push(obj);
        }
      }
      for (let i of absentArray) {
        let id = await y?.find((s) => s.student_id == i?.student_id)?.id;
        if (!id) {
          id = await x?.find((s) => s.student_id == i?.student_id)?.id;
        }
        if (id) {
          let obj = {
            id: id,
            attendance_status: "ABSENT",
          };
          data.push(obj);
        }
      }
    } catch (err) {
      console.log(err);
    }
    console.log(data);

    const config = {
      method: "post",
      url: STUDENT_UPDATE_ATT,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    Swal.fire({
      title: "Do you want to save the attendence",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then(async (s) => {
      if (s.isConfirmed) setLoading(1);
      await axios(config)
        .then(() => {
          toast.success("Updated");
          setEdit(false);
          if (role == "SUPERADMIN" || role == "ADMIN") {
            setPrevatt(true);
          } else {
            setPrevatt(false);
          }
          setEdit1(false);
          getAttendenceData();
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
      setLoading(0);
    });
  };

  const getAttendenceData = async (atData, d, val) => {
    setLoading(1);
    const originalDate = new Date(d);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    const config = {
      method: "get",
      url: `${STUDENTS_ATTENDANCE_ALL}?course_timetable_id=${atData?.id}&date=${date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then(async (res) => {
        console.log('res - ', res.data.data);
        if (
          res?.data?.data?.absent_students?.length == 0 &&
          res?.data?.data?.present_students?.length == 0
        ) {
          checkAndSetStudentData();
        } else {
          await setAbsentArray(res?.data?.data?.absent_students);
          await setPresentArray(res?.data?.data?.present_students);
          console.log('x - ', res?.data?.data?.present_students);
          console.log('y - ', res?.data?.data?.absent_students);
          setX(res?.data?.data?.present_students);
          setY(res?.data?.data?.absent_students);
        }
        if (val) {
          if (
            res?.data?.data?.absent_students?.length > 0 ||
            res?.data?.data?.present_students?.length > 0
          ) {
            setEdit1(false);
            if (role == "SUPERADMIN" || role == "ADMIN") {
              setPrevatt(true);
            } else {
              setPrevatt(false);
            }
            setDefaultAttendance("");
          } else {
            setEdit1(true);
            setPrevatt(false);
          }
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  useEffect(() => {
    getLessonDataOnWeekChange();
  }, [week]);

  useEffect(() => {
    const arr = [];

    for (var i = 0; i < 7; i++) {
      var nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i);
      arr[i] = nextDay;
    }
    setWeek(arr);
  }, [firstDayOfWeek]);

  useEffect(() => {
    setFirstDayOfWeek(firstDayOfThisWeek(thisWeeek, 2023));
  }, [thisWeeek]);

  useEffect(() => {
    setDepartmentOpt(getDepartementOpt());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  useEffect(() => {
    setProgramOpt(getProgramOpt());
  }, [localStorage.getItem(LOCAL_PROGRAM)]);

  useEffect(() => {
    getDataAllData();
  }, []);

  useEffect(() => {
    setEmployeeId(getEmployeeId());
  }, [sessionStorage.getItem(SESSION_EMPLOYEE_ID)]);

  useEffect(() => {
    checkAndSetStudentData();
  }, [defaultAttendance, studentData]);

  useEffect(() => {
    // if (attendanceData && attendanceDate) getAttendenceData()
  }, [attendanceData, attendanceDate]);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Class Attendance</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Attendance</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Class Attendance
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
                          <label htmlFor="">Department</label>
                          <select
                            value={user?.department_id}
                            name="department_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Department</option>
                            {departmentOpt
                              ?.filter((s) => s?.college_id == collegeId)
                              ?.map((i, key) => (
                                <option value={i?.id}>
                                  {i?.name},
                                  {
                                    programOpt?.find(
                                      (p) => p?.id == i?.program_id
                                    )?.name
                                  }
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Session</label>
                          <select
                            value={user?.session_id}
                            name="session_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option value={i?.id}>{i?.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          <select
                            value={user?.class_id}
                            name="class_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Class</option>
                            {classData
                              ?.filter(
                                (s) => s?.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option value={i?.id} key={key}>
                                  {i?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          <select
                            value={user?.semester_id}
                            name="semester_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Semester</option>
                            {semesterData
                              ?.filter((s) => s?.class_id == user?.class_id)
                              ?.map((i, key) => (
                                <option value={i?.id} key={key}>
                                  {i?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Section</label>
                          <select
                            value={user?.section_id}
                            name="section_id"
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="">Select Section</option>
                            {sectionData
                              ?.filter(
                                (s) => s?.semester_id == user?.semester_id
                              )
                              ?.map((i, key) => (
                                <option value={i?.id} key={key}>
                                  {i?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-md-12 ml-auto">
                        <button
                          className="btn btn-nex btn-rounded float-right "
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
            <>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    {!visibility ? (
                      <div className="card-body">
                        <div className="row ">
                          <div className="col-md-12 d-flex align-items-center justify-content-center">
                            <h5 className="text-center d-flex align-items-center justify-content-center">
                              {" "}
                              <a
                                href="javascript:void(0)"
                                className=""
                                onClick={() => setThisWeek(thisWeeek - 1)}
                              >
                                <i className="ri-arrow-left-s-line" />
                              </a>{" "}
                              &nbsp;&nbsp;
                              {week.length != 0 && (
                                <>
                                  {week[0]?.toDateString()} To{" "}
                                  {week[6]?.toDateString()}
                                </>
                              )}
                              &nbsp;&nbsp;
                              <a
                                href="javascript:void(0)"
                                className=""
                                onClick={() => setThisWeek(thisWeeek + 1)}
                              >
                                <i className="ri-arrow-right-s-line" />
                              </a>{" "}
                            </h5>
                          </div>
                          <div className="col-md-6"></div>
                        </div>
                        <hr />
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="font-weight-bold ">
                              <tr>
                                {week?.map((d, k) => (
                                  <td className="text-center">
                                    {/* Monday <br /> */}
                                    {d.toDateString()}
                                  </td>
                                ))}
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                {tabData?.map((i, key) => {
                                  return (
                                    <td key={key} width="15%">
                                      <table
                                        style={{ width: "100%" }}
                                        className="table-row-gap"
                                      >
                                        {data
                                          ?.filter((s) => s.day == i.id)
                                          ?.map((j, key2) => (
                                            <tr key={key2} className="mb-2">
                                              <td>
                                                <div className="row bg-light m-2">
                                                  <div className="col-md-12">
                                                    <div className="d-flex  justify-content-around  m-2">
                                                      {}
                                                      {/* Add */}
                                                      {/* {lessonPlanData?.filter(
                                                    (s) =>
                                                      s?.timetable_id == j?.id
                                                  ).length == 0 ? ( */}
                                                      <a
                                                        href="javascript:void(0)"
                                                        data-toggle="modal"
                                                        data-target=".bs-add-modal-xl"
                                                        className="badge badge-light m-1"
                                                        title="view"
                                                        onClick={async () => {
                                                          await setAttendanceDate(
                                                            week[key]
                                                          );
                                                          await setAttendanceData(
                                                            j
                                                          );
                                                          getAttendenceData(
                                                            j,
                                                            week[key],
                                                            1
                                                          );
                                                          navigateToCreate();
                                                        }}
                                                      >
                                                        <i className="ri-add-line" />
                                                      </a>
                                                      {/* ) 
                                                  : (
                                                    <>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1"
                                                        data-toggle="modal"
                                                        data-target=".bs-view-modal-xl"
                                                        title="view"
                                                        // onClick={() => { setView(lessonPlanData.find(s => s?.timetable_id == j?.id)); setViewLessonPlan(j) }}
                                                      >
                                                        <i className="ri-menu-line" />
                                                      </a>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1 text-primary"
                                                        data-toggle="modal"
                                                        data-target=".bs-edit-modal-xl"
                                                        title="Edit"
                                                        // onClick={() => { setEdit(lessonPlanData.find(s => s?.timetable_id == j?.id)); }}
                                                      >
                                                        <i className="ri-edit-line" />
                                                      </a>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1 text-danger"
                                                        data-toggle="tooltip"
                                                        title="Delete"
                                                        // onClick={() => { handleDelete(j?.id) }}
                                                      >
                                                        <i className="ri-close-line" />
                                                      </a>
                                                    </>
                                                  )} */}

                                                      {/* View */}

                                                      {/* Edit */}

                                                      {/* Delete */}
                                                    </div>
                                                    <div className=" m-2 text-center">
                                                      <p className="">
                                                        {" "}
                                                        <strong>
                                                          {
                                                            courseData?.find(
                                                              (s) =>
                                                                s.id ==
                                                                j?.course_id
                                                            )?.name
                                                          }
                                                        </strong>
                                                        <br />
                                                        <br />
                                                        {/* Class: {classData?.find(s => s.id == j?.class_id)?.name} <br /> */}
                                                        {j?.time_from}-
                                                        {j?.time_to} <br />
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                      </table>
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                          {data?.length == 0 ? <Nodata /> : null}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="col-md-12 m-3">
                          <span>
                            <button
                              className="btn btn-primary rounded-circle"
                              onClick={navigateToCreate}
                            >
                              <i className="ri-arrow-left-line"></i>
                            </button>
                          </span>
                          <span className="float-right mr-4">
                            {prevatt ? (
                              !edit ? (
                                <button
                                  className="btn btn-nex float-right"
                                  onClick={() => {
                                    if (
                                      presentArray.length > 0 ||
                                      absentArray.length > 0
                                    ) {
                                      setEdit(!edit);
                                      setEdit1(true);
                                    } else {
                                      alert("Please Add Attendance To Edit");
                                    }
                                  }}
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  className="btn btn-nex float-right"
                                  onClick={() => {
                                    setEdit(!edit);
                                    setFlag1(!flag1);
                                    setPresentArray(x);
                                    setEdit1(false);
                                    setAbsentArray(y);
                                  }}
                                >
                                  Cancel
                                </button>
                              )
                            ) : null}
                          </span>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              {" "}
                              <h4 className="card-title">Students List</h4>
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
                          </div>{" "}
                          <hr />
                          <div className="row">
                            {edit1 ? (
                              <div className="col-md-12 d-flex justify-content-between">
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success btn-rounded btn-sm"
                                    type="button"
                                    name="submit"
                                    id="holiday"
                                  >
                                    <i
                                      className="fa fa-check"
                                      aria-hidden="true"
                                    />{" "}
                                    Mark as Holiday
                                  </button>
                                  <div className="col-md-6">
                                    <select
                                      id="default"
                                      value={defaultAttendance}
                                      onChange={(e) => {
                                        setDefaultAttendance(e.target.value);
                                      }}
                                    >
                                      <option value="PRESENT">
                                        Default Present
                                      </option>
                                      <option value="ABSENT">
                                        Default Absent
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-nex btn-rounded btn-sm"
                                  type="button"
                                  onClick={
                                    edit ? updateAtt : HandleAttendenceSubmit
                                  }
                                >
                                  <i
                                    className="fa fa-save"
                                    aria-hidden="true"
                                  />{" "}
                                  Save Attendance
                                </button>
                              </div>
                            ) : null}
                          </div>
                          <input
                            type="submit"
                            id="submit"
                            name="submit"
                            defaultValue="stud_attendance"
                            style={{ display: "none" }}
                          />
                          <hr />{" "}
                          <h6>Total Students -  {studentData?.length? studentData?.length : 0}</h6>
                          <div className="table-responsive dt-responsive">
                            <table
                              className="table nowrap table-hover"
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
                                  <th>Student ID</th>
                                  <th>Name</th>
                                  <th>Attendance</th>
                                  <th>Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {studentData && studentData?.length != 0 ? (
                                  studentData?.map((i, key) => (
                                    <AttendanceRow
                                      data={i}
                                      flag={edit}
                                      studentData={studentData}
                                      attendanceData={attendanceData}
                                      attendanceDate={attendanceDate}
                                      setLoading={setLoading}
                                      collegeId={collegeId}
                                      employeeId={employeeId}
                                      defaultAttendance={defaultAttendance}
                                      key={key}
                                      uniqueId={key}
                                      presentArray={presentArray}
                                      setPresentArray={setPresentArray}
                                      absentArray={absentArray}
                                      setAbsentArray={setAbsentArray}
                                    />
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={13}>
                                      <Nodata />
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            <br />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>{" "}
                {/* end col */}
              </div>{" "}
              {/* end row */}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassAttendance;
