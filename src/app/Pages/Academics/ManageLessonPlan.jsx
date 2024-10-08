import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from 'react-select';
import Nodata from "../../Components/NoData/Nodata";
import useEmployee from "../../Hooks/Employee/useEmployee";
import AddLessonPlan from "../../modals/Academics/AddLessonPlan";
import EditLessonPlan from "../../modals/Academics/EditLessonPlan";
import ViewLessonPlan from "../../modals/Academics/ViewLessonPlan";
import {
  ACADEMICS_CLASS_TIME_TABLE,
  ACADEMICS_ADD_LESSON_PLAN,
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_LESSON,
  ACADEMICS_ADD_TOPIC,
} from "../../utils/Academics.apiConst";
import { sessionOpt } from "./../../Data/jsonData/Academics/Academics";

function ManageLessonPlan({ setLoading, collegeId }) {
  var curr = new Date();
  const [firstDate, setFirstDate] = useState(
    curr.getDate() - curr.getDay() + 1
  );
  const [lastDate, setLastDate] = useState(curr.getDate() - curr.getDay() + 7);

  const [week, setWeek] = useState([]);

  const [addData, setAddData] = useState();

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
    console.log("This week", weekNumber);
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

  const [thisWeeek, setThisWeek] = useState(getWeekNumber());

  console.log(firstDayOfThisWeek(getWeekNumber(), 2023));

  const [data, setData] = useState([]);

  const [lessonPlanData, setLessonPlanData] = useState([]);

  const [classData, setClassData] = useState([]);

  const [courseData, setCourseData] = useState([]);

  const [view, setView] = useState();

  const [viewLessonPlan, setViewLessonPlan] = useState();

  const [edit, setEdit] = useState();

  const [firstDayOfWeek, setFirstDayOfWeek] = useState(
    firstDayOfThisWeek(getWeekNumber(), new Date().getFullYear())
  );

  const [addDate, setAddDate] = useState();

  const [lessonData, setLessonData] = useState([]);

  const [topicData, setTopicData] = useState([]);

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
    employee_id: "",
    session_id: "",
  });

  //Sessio or Year
  // const [sessionOpt] = useState([
  //   {
  //     id: 2015,
  //     name: 2015
  //   },
  //   {
  //     id: 2016,
  //     name: 2016
  //   },
  //   {
  //     id: 2017,
  //     name: 2017
  //   },
  //   {
  //     id: 2018,
  //     name: 2018
  //   },
  //   {
  //     id: 2019,
  //     name: 2019
  //   },
  //   {
  //     id: 2020,
  //     name: 2020
  //   },
  //   {
  //     id: 2021,
  //     name: 2021
  //   },
  //   {
  //     id: 2022,
  //     name: 2022
  //   },
  //   {
  //     id: 2023,
  //     name: 2023
  //   },
  //   {
  //     id: 2024,
  //     name: 2024
  //   },
  //   {
  //     id: 2025,
  //     name: 2025
  //   },
  // ])

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
  const getData = async () => {
    if (!user.employee_id)
      return toast.error("Please Select Employee to search");
    if (!user.session_id)
      return toast.error("Please Select Session or Academic Year to search");
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
      axios({
        ...config,
        url:
          ACADEMICS_CLASS_TIME_TABLE +
          `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`,
      })
        .then((res) => {
          setData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),

      axios({
        ...config,
        url:
          ACADEMICS_ADD_LESSON_PLAN +
          `?college_id=${collegeId}&&employee_id=${
            user.employee_id
          }&&session_id=${
            user.session_id
          }&start_date=${week[0]?.toISOString()}&end_date=${week[6]?.toISOString()}`,
      })
        .then((res) => {
          setLessonPlanData(res.data.data);
          console.log("lesson", res);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url:
          ACADEMICS_ADD_CLASS +
          `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`,
      })
        .then((res) => {
          setClassData(res.data.data);
          console.log("lesson", res);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url:
          ACADEMICS_ADD_SUBJECT +
          `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`,
      })
        .then((res) => {
          setCourseData(res.data.data);
          console.log("lesson", res);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url:
          ACADEMICS_ADD_LESSON +
          `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`,
      })
        .then((res) => {
          setLessonData(res.data.data);
          console.log("lesson", res);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),

      axios({
        ...config,
        url:
          ACADEMICS_ADD_TOPIC +
          `?college_id=${collegeId}&&employee_id=${user.employee_id}&&session_id=${user.session_id}`,
      })
        .then((res) => {
          setTopicData(res.data.data);
          console.log("lesson", res);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          // toast.error('Something went wrong')
        }),
    ]);
  };

  const getLessonDataOnWeekChange = () => {
    if (!user.employee_id) return;
    // if (!user.session_id) return;
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_ADD_LESSON_PLAN +
        `?college_id=${collegeId}&&employee_id=${
          user.employee_id
        }&&session_id=${
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
        console.log("lesson", res);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        // toast.error('Something went wrong')
      });
  };

  const handleDelete = (i) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${ACADEMICS_ADD_LESSON_PLAN}/${i}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getLessonDataOnWeekChange();
    console.log(thisWeeek);
  }, [week]);

  useEffect(() => {
    const arr = [];

    for (var i = 0; i < 7; i++) {
      var nextDay = new Date(firstDayOfWeek);
      nextDay.setDate(firstDayOfWeek.getDate() + i);
      arr[i] = nextDay;
    }

    setWeek(arr);
    console.log(arr);
  }, [firstDayOfWeek]);

  useEffect(() => {
    setFirstDayOfWeek(firstDayOfThisWeek(thisWeeek, 2023));
  }, [thisWeeek]);

  console.log(courseData);

  return (
    <div>
      <AddLessonPlan
        data={addData}
        setLoading={setLoading}
        addDate={addDate}
        session_id={user.session_id}
        lessonData={lessonData}
        topicData={topicData}
        getData={getData}
      ></AddLessonPlan>
      <EditLessonPlan
        data={edit}
        setLoading={setLoading}
        lessonData={lessonData}
        topicData={topicData}
        getData={getData}
      ></EditLessonPlan>
      <ViewLessonPlan
        data={view}
        timeTabledata={viewLessonPlan}
        lessonData={lessonData}
        topicData={topicData}
      ></ViewLessonPlan>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Manage Lesson Plan</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Lesson Plan</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Manage Lesson Plan
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
                          <label htmlFor="validationCustom02">
                            Employee<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="employee_id"
                            className="form-control"
                            value={user.employee_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Employee</option>
                            {sessionStorage.getItem("role") == "STAFF"
                              ? employeeOpt
                                  ?.filter?.(
                                    (s) =>
                                      s.id ==
                                      sessionStorage.getItem("employee_id")
                                  )
                                  ?.map((i, key) => (
                                    <option value={i.id} key={key}>
                                      {i.first_name + " " + i.last_name}
                                    </option>
                                  ))
                              : employeeOpt?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.first_name + " " + i.last_name}
                                  </option>
                                ))}
                          </select> */}

                          <Select
                            options={employeeOpt.map(i => ({ value: i.id, label: `${i.first_name} ${i.last_name}` }))}
                            value={user.employee_id ? { value: user.employee_id, label: `${employeeOpt.find(i => i.id === user.employee_id)?.first_name} ${employeeOpt.find(i => i.id === user.employee_id)?.last_name}` } : null}
                            onChange={(selectedOption) => {
                              const selectedEmployeeId = selectedOption ? selectedOption.value : '';
                              setUser(prev => ({ ...prev, employee_id: selectedEmployeeId }));
                            }}
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Session <span className="text-danger">*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            value={user.session_id}
                            onChange={handleChange}
                            name="session_id"
                            id=""
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={sessionOpt.map(i => ({ value: i.id, label: i.name }))}
                            value={user.session_id ? { value: user.session_id, label: sessionOpt.find(i => i.id === user.session_id)?.name } : null}
                            onChange={(selectedOption) => {
                              const selectedSessionId = selectedOption ? selectedOption.value : '';
                              setUser(prev => ({ ...prev, session_id: selectedSessionId }));
                            }}
                          />

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
                              {tabData?.map((i, key) => (
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
                                                  {lessonPlanData?.filter(
                                                    (s) =>
                                                      s?.timetable_id == j?.id
                                                  ).length == 0 ? (
                                                    <a
                                                      href="javascript:void(0)"
                                                      data-toggle="modal"
                                                      data-target=".bs-add-modal-xl"
                                                      className="badge badge-light m-1"
                                                      title="view"
                                                      onClick={() => {
                                                        setAddData(j);
                                                        setAddDate(
                                                          week[key + 1]
                                                        );
                                                      }}
                                                    >
                                                      <i className="ri-add-line" />
                                                    </a>
                                                  ) : (
                                                    <>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1"
                                                        data-toggle="modal"
                                                        data-target=".bs-view-modal-xl"
                                                        title="view"
                                                        onClick={() => {
                                                          setView(
                                                            lessonPlanData.find(
                                                              (s) =>
                                                                s?.timetable_id ==
                                                                j?.id
                                                            )
                                                          );
                                                          setViewLessonPlan(j);
                                                        }}
                                                      >
                                                        <i className="ri-menu-line" />
                                                      </a>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1 text-primary"
                                                        data-toggle="modal"
                                                        data-target=".bs-edit-modal-xl"
                                                        title="Edit"
                                                        onClick={() => {
                                                          setEdit(
                                                            lessonPlanData.find(
                                                              (s) =>
                                                                s?.timetable_id ==
                                                                j?.id
                                                            )
                                                          );
                                                        }}
                                                      >
                                                        <i className="ri-edit-line" />
                                                      </a>
                                                      <a
                                                        href="javascript:void(0)"
                                                        className="badge badge-light m-1 text-danger"
                                                        data-toggle="tooltip"
                                                        title="Delete"
                                                        onClick={() => {
                                                          handleDelete(j?.id);
                                                        }}
                                                      >
                                                        <i className="ri-close-line" />
                                                      </a>
                                                    </>
                                                  )}

                                                  {/* View */}

                                                  {/* Edit */}

                                                  {/* Delete */}
                                                </div>
                                                <div className=" m-2 text-center font-weight-bold">
                                                  <p className="">
                                                    {" "}
                                                    Subject:{" "}
                                                    {
                                                      courseData?.find(
                                                        (s) =>
                                                          s.id == j?.course_id
                                                      )?.name
                                                    }{" "}
                                                    <br />
                                                    Class:{" "}
                                                    {
                                                      classData?.find(
                                                        (s) =>
                                                          s.id == j?.class_id
                                                      )?.name
                                                    }{" "}
                                                    <br />
                                                    {j?.time_from}-{j?.time_to}{" "}
                                                    <br />
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                  </table>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                        {data?.length == 0 ? <Nodata /> : null}
                      </div>
                    </div>
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

export default ManageLessonPlan;
