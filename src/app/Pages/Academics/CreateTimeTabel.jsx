  import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import TimetableDaySwitches from '../../Components/Academics/TimetableDaySwitches'
import Nodata from '../../Components/NoData/Nodata'
import { ACADEMICS_ADD_SECTION, ACADEMICS_ADD_SEMESTER, ACADEMICS_ADD_SUBJECT, ACADEMICS_CLASS_TIME_TABLE } from '../../utils/Academics.apiConst'
import { LOCAL_DEPARTMENT } from '../../utils/LocalStorageConstants'
import useEmployee from './../../Hooks/Employee/useEmployee'
import {sessionOpt} from './../../Data/jsonData/Academics/Academics'

function CreateTimeTabel({ setLoading, collegeId }) {


  //Dropdown Options Array

  //DayData
  const tabData = [
    {
      name: 'Monday',
      id: 'MONDAY'
    },
    {
      name: 'Tuesday',
      id: 'TUESDAY'
    },
    {
      name: 'Wednesday',
      id: 'WEDNESDAY'
    },
    {
      name: 'Thursday',
      id: 'THURSDAY'
    },
    {
      name: 'Friday',
      id: 'FRIDAY'
    },
    {
      name: 'Saturday',
      id: 'SATURDAY'
    },
    {
      name: 'Sunday',
      id: 'SUNDAY'
    },
  ]

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

  //Employee List
  const [employeeOpt] = useEmployee(collegeId)

  //Dpartments
  const [departmentOpt, setDepartmentOpt] = useState(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)))

  //CLass
  const [classOpt, setClassOpt] = useState([])

  //Semeseter
  const [semOpt, setSemtOpt] = useState([])

  //Section
  const [sectionOpt, setSectionOpt] = useState([])

  //Subject
  const [courseOpt, setCourseOpt] = useState([])

  useEffect(() => {
    setDepartmentOpt(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(item => item.college_id == collegeId))
  }, [localStorage.getItem(LOCAL_DEPARTMENT)])


  //States
  const [data, setData] = useState([])

  const [tab, setTab] = useState(tabData[0].id)

  const [user, setUser] = useState({
    day: tab,
    class_id: '',
    semester_id: '',
    department_id: '',
    section_id: '',
    course_id: '',
    employee_id: '',
    time_from: "",
    time_to: "",
    session_id: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearData = () => {
    setUser(prev => ({
      ...prev,
      employee_id: '',
      time_from: '',
      time_to: '',
      course_id: ''
    }))
  }

  //get The Inintila Data
  const getData = async () => {
    if (!user.section_id) return toast.error('Please Select Section to search')
    if (!user.session_id) return toast.error('Please Select Session or Academic Year ')
    setLoading(1)
    const config = {
      method: "get",
      url: ACADEMICS_CLASS_TIME_TABLE + `?college_id=${collegeId}&&section_id=${user.section_id}&&session_is=${user.session_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    await axios(config)
      .then(res => {
        setData(res.data.data)
        setLoading(0)
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
  }

  //Add New Data
  const handleSubmit = async () => {
    setLoading(1)
    const config = {
      method: "post",
      url: ACADEMICS_CLASS_TIME_TABLE,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId
      },
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Data added successfully")
        clearData();
        getData();
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
  }

  //Delete Data
  const handleDelete = async(i) =>{
    setLoading(1)
    const config = {
      method: "put",
      url: ACADEMICS_CLASS_TIME_TABLE+'/'+i.id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE"
      },
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Data Deleted successfully")
        // clearData();
        getData();
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
  }

  //GetRequests for all basic Info for the dropdowns
  //Fucntion to get data of Semester
  //Fucntion to get data of classes
  const getClassData = async () => {
    setLoading(1)
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    const [data1, data2, data3] = await Promise.all([
      axios({ ...config, url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}` })
        .then(res => {
          setSemtOpt(res.data.data)
          setLoading(0)
        })
        .catch(err => {
          setLoading(0)
          console.log(err);
          toast.error('Something went wrong')
        }),

      axios({ ...config, url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}` })
        .then(res => {
          setSectionOpt(res.data.data)
          setLoading(0)
        })
        .catch(err => {
          setLoading(0)
          console.log(err);
          toast.error('Something went wrong')
        }),

      axios({ ...config, url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}` })
        .then(res => {
          setCourseOpt(res.data.data)
          setLoading(0)
        })
        .catch(err => {
          setLoading(0)
          console.log(err);
          toast.error('Something went wrong')
        }),
    ])


  }

  useEffect(() => {
    getClassData()
  }, [])

  //useEffect to change Class id based on the semester
  useEffect(() => {
    if (user.semester_id)
      setUser(prev => ({
        ...prev,
        class_id: semOpt?.find(s => s.id == user.semester_id)?.class_id
      }))
  }, [user.semester_id])


  //user data day chages when tab changes Changes w
  useEffect(() => {
    setUser(prev => ({
      ...prev,
      day: tab
    }))
  }, [tab])



  return (
    <div>


      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Create Class Time Table</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript:void(0)">Class Time Table</a>
                      </li>
                      <li className="breadcrumb-item active"> Create Class Time Table</li>
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
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="department_id"
                            id="class"
                            value={user.department_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            {
                              departmentOpt.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Academic Year<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="session_id"
                            id="class"
                            value={user.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic</option>
                            {
                              sessionOpt.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Semester<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="semester_id"
                            id="class"
                            value={user.semester_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic</option>
                            {
                              semOpt.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Section<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="section_id"
                            id="class"
                            value={user.section_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Section</option>
                            {
                              sectionOpt?.filter(s => (s.department_id == user.department_id && s.semester_id == user.semester_id))?.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ml-auto">
                        <button
                          className="btn btn-nex btn-rounded float-lg-right "
                          onClick={getData}
                        >
                          <i className="fa fa-search" aria-hidden="true" /> Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>



            <div className="row">

              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <>
                      <TimetableDaySwitches tabData={tabData} tab={tab} setTab={setTab} />
                      <div class="table-responsive mb-0" data-pattern="priority-columns">
                        <table id="tech-companies-1" class="table" width="100%">
                          <thead>

                            <tr>
                              <th>Subject</th>
                              <th >Teacher</th>
                              <th > From Time </th>
                              <th >To Time</th>
                              <th >Action</th>

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
                                  {
                                    courseOpt?.filter(s => s.semester_id == user.semester_id)?.map((i, key) => (
                                      <option value={i.id} key={key}>{i.name}</option>
                                    ))
                                  }
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
                                  {
                                    employeeOpt?.map((i, key) => (
                                      <option value={i.id} key={key}>{i.first_name + ' ' + i.last_name}</option>
                                    ))
                                  }
                                </select>
                              </td>
                              <td>
                                <input
                                  type="time"
                                  name='time_from'
                                  id="from"
                                  className="form-control"
                                  value={user.time_from}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="time"
                                  name='time_to'
                                  id="from"
                                  className="form-control"
                                  value={user.time_to}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <button
                                  class="btn btn-success"
                                  onclick="saveTimetable('sa')"
                                  type="button"
                                  onClick={handleSubmit}
                                >
                                  <i class="fa fa-check" aria-hidden="true"></i>
                                </button>
                              </td>

                            </tr>
                            {data &&
                              data.length != 0
                              ?
                              data?.filter(s=>s.day==user.day)?.map((i, key) => (
                                <tr key={key}>
                                  <td style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>{courseOpt?.find(s => s.id == i.course_id).name}</font>
                                  </td>
                                  <td style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>{employeeOpt?.find(s => s.id == i.employee_id).first_name + ' ' + employeeOpt?.find(s => s.id == i.employee_id).last_name}</font>
                                  </td>
                                  <td style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>{i?.time_from}</font>
                                  </td>
                                  <td style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>{i?.time_to}</font>
                                  </td>
                                  <td>
                                    <abbr title="Delete">
                                      {" "}
                                      <button
                                        className="btn btn-danger  "
                                        id="sa-del"
                                        onClick={()=>{handleDelete(i)}}
                                      >
                                        <i className="fa fa-trash" aria-hidden="true" />{" "}
                                      </button>{" "}
                                    </abbr>
                                  </td>
                                </tr>
                              ))
                              :
                              <tr>
                                <td colSpan={10}>
                                  <Nodata />
                                </td>
                              </tr>
                            }

                            

                          </tbody>
                        </table>
                      </div>
                    </>


                  </div>
                </div>

              </div>
            </div>


          </div>
        </div>
      </div>


    </div>
  )
}

export default CreateTimeTabel