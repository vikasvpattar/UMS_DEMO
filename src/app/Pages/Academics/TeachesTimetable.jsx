import React from "react";
import { useState } from "react";
import useEmployee from "../../Hooks/Employee/useEmployee";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_CLASS_TIME_TABLE,
} from "../../utils/Academics.apiConst";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import { useEffect } from "react";
import { sessionOpt } from "./../../Data/jsonData/Academics/Academics";

function TeachesTimetable({ collegeId, setLoading }) {
  const [data, setData] = useState([]);

  const [subOpt, setSubOpt] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

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

  // console.log(employeeOpt);
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
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_CLASS_TIME_TABLE +
        `?college_id=${collegeId}&employee_id=${user.employee_id}&session_id=${user.session_id}`,
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

  //Fucntion to get data of classes
  const getSubjectdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setSubOpt(res.data.data);
        console.log('subjects - ', res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //Fucntion to get data of classes
  const getClassdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setClassOpt(res.data.data);
        console.log('class data - ', res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getSubjectdata();
    getClassdata();
  }, []);

  return (
    <div className="TeacherTimeTable">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Teacher Time Table</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Teacher Time Table
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
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Session / Academic Year
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="session_id"
                            className="form-control"
                            value={user.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select year</option>
                            {sessionOpt?.map((i, key) => (
                              <option value={i.id}>{i.name}</option>
                            ))}
                          </select> */}

                          <Select
                            name="session_id"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            options={sessionOpt && sessionOpt.map((data) => ({
                              value: data.id,
                              label: data.name,
                            }))}
                            value={
                              user.session_id
                                ? {
                                  value: user.session_id,
                                  label: sessionOpt.find((data) => data.id == user.session_id)
                                    ?.name,
                                }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                session_id: selectedOption ? selectedOption.value : "",
                              }));
                            }}
                            placeholder="Select Session"
                          />

                        </div>
                      </div>
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
  name="employee_id"
  className="basic-single"
  classNamePrefix="select"
  options={
    sessionStorage.getItem("role") == "STAFF"
      ? employeeOpt
          ?.filter?.(
            (s) => s.id == sessionStorage.getItem("employee_id")
          )
          ?.map((i) => ({
            label: i.first_name + " " + i.last_name,
            value: i.id,
          }))
      : employeeOpt?.map((i) => ({
          label: i.first_name + " " + i.last_name,
          value: i.id,
        }))
  }
  value={
    user.employee_id
      ? {
          label: employeeOpt.find((i) => i.id == user.employee_id)
            ?.first_name + " " + employeeOpt.find((i) => i.id == user.employee_id)?.last_name,
          value: user.employee_id,
        }
      : null
  }
  onChange={(selectedOption) => {
    setUser((prev) => ({
      ...prev,
      employee_id: selectedOption ? selectedOption.value : "",
    }));
  }}
  placeholder="Select Employee"
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
              </div>
            </div>

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

                        {/* <tbody>

                          {data?.map((d, key) => {
                            return (
                              <tr>
                                <td>
                                  <h5 className="text-dark">{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">
                                    {d.time}
                                  </h5>
                                  <h6 class="text-danger"> {d.year}</h6>
                                </td>

                                <td>
                                  <h5 className="text-dark">{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">
                                    {d.time}
                                  </h5>
                                  <h6 class="text-danger"> {d.year}</h6>
                                </td>
                                <td>
                                  <h5 className='text-dark'>{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">{d.time}</h5>
                                  <h6 class="text-danger"> {d.year}</h6>



                                </td>

                                <td>
                                  <h5 className='text-dark'>{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">{d.time}</h5>
                                  <h6 class="text-danger"> {d.year}</h6>



                                </td>

                                <td>
                                  <h5 className='text-dark'>{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">{d.time}</h5>
                                  <h6 class="text-danger"> {d.year}</h6>



                                </td>

                                <td>
                                  <h5 className='text-dark'>{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">{d.time}</h5>
                                  <h6 class="text-danger"> {d.year}</h6>



                                </td>

                                <td>
                                  <h5 className='text-dark'>{d.subject}</h5>

                                  <h5 className="badge badge-success p-2">{d.time}</h5>
                                  <h6 class="text-danger"> {d.year}</h6>



                                </td>

                              </tr>
                            );
                          })}
                        </tbody> */}

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
                                            }
                                          </span>
                                          <div className="margin-10px-top font-size14">
                                            {j?.time_from}&nbsp; &rarr; &nbsp;
                                            {j?.time_to}
                                          </div>
                                          <span className="badge badge-soft-success">
                                            {j?.class_name}
                                          </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachesTimetable;
