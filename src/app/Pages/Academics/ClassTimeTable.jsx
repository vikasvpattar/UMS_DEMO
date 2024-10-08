import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Select from 'react-select';
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_CLASS_TIME_TABLE,
} from "../../utils/Academics.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import useEmployee from "../../Hooks/Employee/useEmployee";
import "./TimeTable.scss";
import Nodata from "../../Components/NoData/Nodata";
import TimetableDaySwitches from "../../Components/Academics/TimetableDaySwitches";
import { sessionOpt } from "./../../Data/jsonData/Academics/Academics";

import "rc-time-picker/assets/index.css";
import moment from "moment";

function ClassTimeTable({ collegeId, setLoading }) {
  let role = sessionStorage.getItem("role");

  const [visibility, setVisibility] = useState(true);

  const now = moment().hour(0).minute(0);

  function onChange(value) {
    console.log(value && value.format(format));
  }

  const format = "h:mm a";

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

  const [employeeOpt] = useEmployee(collegeId);

  const mapTime = (time) => {
    var hoursTime = parseInt(time?.split(":")[0]);
    var minutesTime = parseInt(time?.split(":")[1]);
    var timeFormat = "";

    if (hoursTime > 12) {
      hoursTime = hoursTime - 12;
      timeFormat = "pm";
    } else {
      timeFormat = "am";
    }

    return hoursTime + ":" + minutesTime + " " + timeFormat;
  };

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

  const [departmentOpt, setDepartmentOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );
  const [programOpt, setProgramOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );

  useEffect(() => {
    setDepartmentOpt(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(
        (item) => item.college_id == collegeId
      )
    );
    setProgramOpt(JSON.parse(localStorage.getItem(LOCAL_PROGRAM)));
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const [classopt, setClassOpt] = useState([]);

  const [sectionopt, setSectionOpt] = useState([]);

  const [subOpt, setSubOpt] = useState([]);

  const [edit, setEdit] = useState(false);

  const [editId, setEditId] = useState();

  const navigateToCreate = () => {
    if (
      !user.department_id ||
      !user?.session_id ||
      !user?.semester_id ||
      !user?.section_id
    ) {
      return toast.error("Please Select All Fields");
    }
    setVisibility((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //get The Inintila Data
  const getData = async () => {
    if (!user.section_id) return toast.error("Please Select Section to search");
    if (!user.session_id)
      return toast.error("Please Select Session or Academic Year ");
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_CLASS_TIME_TABLE +
        `?college_id=${collegeId}&section_id=${user.section_id}&session_id=${user.session_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setData(res.data.data);
        console.log('data - ', res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

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
      axios({
        ...config,
        url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}&getInactive=0`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),
      axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),
      axios({
        ...config,
        url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),
    ]);

    setLoading(0);

    setSubOpt(data2?.data.data);
    setSectionOpt(data4?.data.data);

    const data = data1.data.data;
    const classData = data3.data.data;

    for (var i of data) {
      let ff = classData?.find((item) => item.id == i.class_id);
      if (ff) {
        i.name = ff.name + " (" + i.name + ") ";
      }
    }

    setClassOpt(data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const [tab, setTab] = useState(tabData[0].id);
  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    day: tab,
    class_id: "",
    semester_id: "",
    department_id: "",
    section_id: "",
    course_id: "",
    employee_id: "",
    time_from: "",
    time_to: "",
    session_id: "",
  });

  useEffect(() => {
    setUser({ ...user, day: tab });
  }, [tab]);

  const clearData = () => {
    setUser((prev) => ({
      ...prev,
      employee_id: "",
      time_from: "",
      time_to: "",
      course_id: "",
    }));
  };

  //get The Inintila Data
  const getDataCreate = async () => {
    if (!user.section_id) return toast.error("Please Select Section to search");
    if (!user.session_id)
      return toast.error("Please Select Session or Academic Year ");
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_CLASS_TIME_TABLE +
        `?college_id=${collegeId}&&section_id=${user.section_id}&&session_id=${user.session_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //Add New Data
  const handleSubmit = async () => {
    setLoading(1);
    const config = {
      method: "post",
      url: ACADEMICS_CLASS_TIME_TABLE,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data added successfully");
        clearData();
        getDataCreate();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  //Add New Data
  const handleEdit = async () => {
    setLoading(1);
    const config = {
      method: "put",
      url: ACADEMICS_CLASS_TIME_TABLE + "/" + editId,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data added successfully");
        clearData();
        getData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setEdit(false);
  };

  //Delete Data
  const handleDelete = async (i) => {
    setLoading(1);
    const config = {
      method: "put",
      url: ACADEMICS_CLASS_TIME_TABLE + "/" + i.id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data Deleted successfully");
        // clearData();
        getData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    clearData();
  }, [tab]);

  return (
    <div className="ClassTimeTable">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Academics</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Create Time Table
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <h2 className="card-title">Select Criteria</h2>

                        {role != "STAFF" ? (
                          <button
                            onClick={navigateToCreate}
                            type="button"
                            className="btn btn-primary btn-rounded btn-sm float-lg-right"
                            name="submit"
                          >
                            {visibility ? (
                              <>
                                <i className="fa fa-plus" aria-hidden="true" />{" "}
                                Add more{" "}
                              </>
                            ) : (
                              <>View</>
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="department_id"
                            id="class"
                            value={user.department_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            {departmentOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name},{" "}
                                {
                                  programOpt.find(
                                    (item) => item.id == i.program_id
                                  )?.name
                                }
                              </option>
                            ))}
                          </select> */}

                          <Select
                            value={
                              user?.department_id
                                ? {
                                  value: user?.department_id,
                                  label: departmentOpt.find((data) => data.id == user?.department_id)
                                    ?.name,
                                }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                department_id: selectedOption ? selectedOption.value : "",
                              }));
                            }}
                            options={departmentOpt.map((i) => ({
                              value: i.id,
                              label: `${i.name}, ${programOpt?.find((s) => s.id === i.program_id)?.name}`,
                            }))}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Session / Academic Year
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="session_id"
                            id="class"
                            value={user.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

      <Select
        value={
          user?.session_id
            ? {
                value: user?.session_id,
                label: sessionOpt.find((data) => data.id === user?.session_id)?.name,
              }
            : null
        }
        onChange={(selectedOption) => {
          setUser((prev) => ({
            ...prev,
            session_id: selectedOption ? selectedOption.value : "",
          }));
        }}
        options={sessionOpt.map((i) => ({
          value: i.id,
          label: i.name,
        }))}
        placeholder="Select Session"
      />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Semester<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="semester_id"
                            id="class"
                            value={user.semester_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Semester</option>
                            {classopt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

      <Select
        value={
          user?.semester_id
            ? {
                value: user?.semester_id,
                label: classopt.find((data) => data.id === user?.semester_id)?.name,
              }
            : null
        }
        onChange={(selectedOption) => {
          setUser((prev) => ({
            ...prev,
            semester_id: selectedOption ? selectedOption.value : "",
          }));
        }}
        options={classopt.map((i) => ({
          value: i.id,
          label: i.name,
        }))}
        placeholder="Select Semester"
      />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Section<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="section_id"
                            value={user.section_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Section</option>
                            {sectionopt
                              ?.filter(
                                (s) =>
                                  s.semester_id == user.semester_id &&
                                  s.department_id == user.department_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

      <Select
        value={
          user?.section_id
            ? {
                value: user?.section_id,
                label: sectionopt
                  ?.filter(
                    (s) =>
                      s.semester_id === user.semester_id &&
                      s.department_id === user.department_id
                  )
                  ?.find((data) => data.id === user?.section_id)?.name,
              }
            : null
        }
        onChange={(selectedOption) => {
          setUser((prev) => ({
            ...prev,
            section_id: selectedOption ? selectedOption.value : "",
          }));
        }}
        options={sectionopt
          ?.filter(
            (s) =>
              s.semester_id === user.semester_id && s.department_id === user.department_id
          )
          ?.map((i) => ({
            value: i.id,
            label: i.name,
          }))}
        placeholder="Select Section"
      />

                        </div>
                      </div>
                    </div>
                    {visibility ? (
                      <div className="row ">
                        <div className="col-md-12 ml-auto">
                          <button
                            className="btn btn-nex btn-rounded float-lg-right "
                            type="submit"
                            name="submit"
                            onClick={getData}
                          >
                            <i className="fa fa-search" aria-hidden="true" />{" "}
                            Search
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="row ">
                        <div className="col-md-12 ml-auto">
                          <button
                            className="btn btn-nex btn-rounded float-lg-right "
                            type="submit"
                            name="submit"
                            onClick={getDataCreate}
                          >
                            <i className="fa fa-search" aria-hidden="true" />{" "}
                            Search
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            {visibility ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div class="table-responsive">
                        <table class="table table-bordered text-center">
                          <thead class="bg-dark text-light">
                            <tr>
                              <th class="text-uppercase">Monday</th>
                              <th class="text-uppercase">Tuesday</th>
                              <th class="text-uppercase">Wednesday</th>
                              <th class="text-uppercase">Thursday</th>
                              <th class="text-uppercase">Friday</th>
                              <th class="text-uppercase">Saturday</th>
                              <th class="text-uppercase">Sunday</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              {tabData?.map((i, key) => (
                                <td key={key}>
                                  <table
                                    style={{ width: "100%" }}
                                    className="table-row-gap"
                                  >
                                    {data
                                      ?.filter((s) => s.day == i.id)
                                      ?.map((j, key2) => (
                                        <tr key={key2} className="mb-2">
                                          <td>
                                            <span
                                              className={`${i.color} padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13`}
                                            >
                                              {
                                                subOpt?.find(
                                                  (s) => s.id == j.course_id
                                                )?.name
                                              }{" "}
                                              {subOpt?.find(
                                                (s) => s.id == j.course_id
                                              )?.status == "INACTIVE" ? (
                                                <span className="badge badge-soft-danger">
                                                  Subject Deleted
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </span>
                                            <div className="margin-10px-top font-size14">
                                              {/* {mapTime(j.time_from)}&nbsp;
                                              &rarr; &nbsp;{mapTime(j.time_to)} */}
                                              {j.time_from}&nbsp; &rarr; &nbsp;
                                              {j.time_to}
                                            </div>
                                            <div className="font-size13 text-danger">
                                              {employeeOpt?.find(
                                                (s) => s.id == j.employee_id
                                              )?.first_name +
                                                " " +
                                                employeeOpt?.find(
                                                  (s) => s.id == j.employee_id
                                                )?.last_name}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <>
                        <TimetableDaySwitches
                          tabData={tabData}
                          tab={tab}
                          setTab={setTab}
                        />
                        <div
                          class="table-responsive mb-0"
                          data-pattern="priority-columns"
                        >
                          <table
                            id="tech-companies-1"
                            class="table"
                            width="100%"
                          >
                            <thead>
                              <tr>
                                <th>Subject</th>
                                <th>Teacher</th>
                                <th> From Time </th>
                                <th>To Time</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <select
                                    name="course_id"
                                    id="subject"
                                    className="form-control"
                                    value={user.course_id}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Subject</option>
                                    {subOpt
                                      ?.filter(
                                        (s) => s.semester_id == user.semester_id
                                      )
                                      ?.map((i, key) => (
                                        <option value={i.id} key={key}>
                                          {i.name}
                                        </option>
                                      ))}
                                  </select>
                                </td>

                                <td>
                                  <select
                                    name="employee_id"
                                    className="form-control"
                                    value={user.employee_id}
                                    onChange={handleChange}
                                  >
                                    <option value="">Select Teacher</option>
                                    {employeeOpt?.map((i, key) => (
                                      <option value={i.id} key={key}>
                                        {i?.first_name + " " + i?.last_name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    name="time_from"
                                    id="from"
                                    className="form-control"
                                    value={user.time_from}
                                    onChange={handleChange}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    name="time_to"
                                    id="from"
                                    className="form-control"
                                    value={user.time_to}
                                    onChange={handleChange}
                                  />
                                  {/* <TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    onChange={onChange}
    format={format}
    use12Hours
    inputReadOnly
  /> */}
                                </td>
                                <td>
                                  {edit ? (
                                    <button
                                      class="btn btn-success"
                                      onclick="saveTimetable('sa')"
                                      type="button"
                                      onClick={handleEdit}
                                    >
                                      <i
                                        class="fa fa-check"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success"
                                      onclick="saveTimetable('sa')"
                                      type="button"
                                      onClick={handleSubmit}
                                    >
                                      <i
                                        class="fa fa-check"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                              {data && data.length != 0 ? (
                                data
                                  ?.filter((s) => s.day == tab)
                                  ?.map((i, key) => (
                                    <tr key={key}>
                                      <td style={{ verticalAlign: "inherit" }}>
                                        <font
                                          style={{ verticalAlign: "inherit" }}
                                        >
                                          {
                                            subOpt?.find(
                                              (s) => s.id == i.course_id
                                            )?.name
                                          }
                                        </font>
                                      </td>
                                      <td style={{ verticalAlign: "inherit" }}>
                                        <font
                                          style={{ verticalAlign: "inherit" }}
                                        >
                                          {employeeOpt?.find(
                                            (s) => s.id == i.employee_id
                                          )?.first_name +
                                            " " +
                                            employeeOpt?.find(
                                              (s) => s.id == i.employee_id
                                            )?.last_name}
                                        </font>
                                      </td>
                                      <td style={{ verticalAlign: "inherit" }}>
                                        <font
                                          style={{ verticalAlign: "inherit" }}
                                        >
                                          {i?.time_from}
                                        </font>
                                      </td>
                                      <td style={{ verticalAlign: "inherit" }}>
                                        <font
                                          style={{ verticalAlign: "inherit" }}
                                        >
                                          {i?.time_to}
                                        </font>
                                      </td>
                                      <td>
                                        <abbr title="Edit">
                                          {" "}
                                          <button
                                            className="btn"
                                            onClick={() => {
                                              setEdit(true);
                                              setEditId(i?.id);
                                              setUser(i);
                                            }}
                                          >
                                            <i
                                              className="fa fa-pencil text-primary"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </abbr>
                                        <abbr title="Delete">
                                          <button
                                            className="btn"
                                            id="sa-del"
                                            onClick={() => {
                                              handleDelete(i);
                                            }}
                                          >
                                            <i
                                              className="fa fa-trash text-danger"
                                              aria-hidden="true"
                                            />{" "}
                                          </button>
                                        </abbr>
                                      </td>
                                    </tr>
                                  ))
                              ) : (
                                <tr>
                                  <td colSpan={10}>
                                    <Nodata />
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassTimeTable;
