import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { LOCAL_DEPARTMENT } from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import { useState } from "react";
import { Http } from "../../../Services/Services";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
} from "../../../utils/Academics.apiConst";
import axios from "axios";
import { useEffect } from "react";
import { REPORT_STUDENT_ATTENDANCE_MONTHWISE } from "../../../utils/Reports.apiConst";
import { ROUTES } from "../../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import "./reportsStyle.css";
import PaginationTable from "./PaginationTable";
import Select from "react-select";

const MonthWiseAttendance = ({ setLoading, collegeId }) => {
  const departmentData = JSON.parse(
    localStorage.getItem(LOCAL_DEPARTMENT)
  )?.filter((s) => s.college_id == collegeId);
  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    year_id: "",
    class_id: "",
    semester_id: "all",
    section_id: "",
    month_id: "",
    subject_id: "All",
  });

  const [classData, setClassData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [data, setData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [sessionYear, setSessionYear] = useState([]);
  const [numberofDays, setNumberofDays] = useState(0);
  const [data2, setData2] = useState([]);
  const navigate = useNavigate();
  const [isTableVisible, setIsTableVisible] = useState(false);

  const monthFull = [
    { id: "01", label: "January" },
    { id: "02", label: "February" },
    { id: "03", label: "March" },
    { id: "04", label: "April" },
    { id: "05", label: "May" },
    { id: "06", label: "June" },
    { id: "07", label: "July" },
    { id: "08", label: "August" },
    { id: "09", label: "September" },
    { id: "10", label: "October" },
    { id: "11", label: "November" },
    { id: "12", label: "December" },
  ];
  let days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let role = sessionStorage.getItem("role");

  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const [originalEntries, setOriginalEntries] = useState(50);

  const handlePrint = async () => {
    await setOriginalEntries(1000000); // max we can set is 9007199254740990
    PrintRecipt();
    await setOriginalEntries(50);
  };

  const changeDir = (dd) => {
    if (role == "SUPERADMIN") {
      navigate(ROUTES.Registar.Reports.Student.StudentStat, {
        state: { data: dd },
      });
    } else if (role == "ADMIN") {
      navigate(ROUTES.Principal.Reports.StudentStat, {
        state: { data: dd },
      });
    } else if (role == "STAFF") {
      navigate(ROUTES.Employee.Reports.StudentStat, {
        state: { data: dd },
      });
    }
  };

  const getData = async () => {
    setLoading(true);
    const [data1, data2, data3] = await Promise.all([
      Http.get(`${ACADEMICS_ADD_CLASS}?department_id=${user.department_id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
          return [];
        }),
      Http.get(`${ACADEMICS_ADD_SEMESTER}?department_id=${user.department_id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
          return [];
        }),
      Http.get(`${ACADEMICS_ADD_SECTION}?department_id=${user.department_id}`)
        .then((res) => {
          setLoading(false);
          return res.data.data;
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          return [];
        }),
    ]);
    setClassData(data1);
    setSemesterData(data2);
    setSectionData(data3);
  };

  const getSubjects = async () => {
    setLoading(true);
    console.log(user.department_id);
    console.log(user.semester_id);
    await Http.get(
      `${ACADEMICS_ADD_SUBJECT}?department_id=${user.department_id}&semester_id=${user.semester_id}`
    )
      .then((res) => {
        console.log(subjectData);
        setSubjectData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getAttendance = async () => {
    setLoading(1);
    let x = JSON.stringify(subjectData);
    const config = {
      method: "post",
      url: `${REPORT_STUDENT_ATTENDANCE_MONTHWISE}?session_id=${user.session_id}&semester_id=${user.semester_id}&year_id=${user.year_id}&month_id=${user.month_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        subjectData: x,
      },
    };
    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
    // await Http.get(
    //   `${REPORT_STUDENT_ATTENDANCE_MONTHWISE}?session_id=${user.session_id}&semester_id=${user.semester_id}&year_id=${user.year_id}&month_id=${user.month_id}&subjectData=${x}`
    // )
    //   .then((res) => {
    //     setData(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const handelChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  // };

  const handelChange = (e) => {
    const { name, value } = e.target;
      
    // Reset semester_id to an empty string when class changes
    const updatedUser = name == "class_id" ? { ...user, semester_id: "" } : user;
  
    setUser({ ...updatedUser, [name]: value });
  };

  useEffect(() => {
    if (user.department_id) {
      getData();
    }
  }, [user.department_id]);

  useEffect(() => {
    if (user.session_id)
      setSessionYear([
        user.session_id,
        (parseInt(user.session_id, 10) + 1).toString(),
      ]);
    if (user.month_id)
      setNumberofDays(
        new Date(user.year_id, parseInt(user.month_id), 0).getDate()
      );
    // if(data) setData([]);
  }, [user.session_id, user.month_id, user.year_id]);

  useEffect(() => {
    getSubjects();
  }, [user.semester_id, user.class_id, user.year_id, user.department_id]);

  const tableStyles = {
    column1: "column1-class",
    column2: "column2-class",
  };
  useEffect(() => {
    let y = {};
    setLoading(1);
    if (user.subject_id !== "All") {
      let col = [
        {
          label: "Student Id",
          field: "student_id",
          sort: "asc",
          className: "column1-class",
          // width: 150
        },
        {
          label: "Student Name",
          field: "student_name",
          sort: "asc",
          // width: 150
        },
        {
          label: "Subject",
          field: "subject_id",
          sort: "asc",
          // width: 150
        },
        {
          label: "P/A",
          field: "pa_id",
          sort: "asc",
          // width: 150
        },
        {
          label: "Total",
          field: "total_id",
          sort: "asc",
          // width: 150
        },
      ];
      for (let i = 1; i <= numberofDays; i++) {
        const dt = new Date(
          user.year_id + "-" + user.month_id + "-" + i.toString()
        );
        if (dt.getDay() === 0) {
          let obj = {
            label: i,
            field: i,
            sort: "asc",
            // width: 50
          };
          col.push(obj);
        } else {
          let obj = {
            label: i,
            field: i,
            sort: "asc",
            // width: 50
          };
          col.push(obj);
        }
      }

      y.columns = col;

      let temp = [];
      data?.map((i, key) => {
        let obj = {};
        {
          subjectData?.map((sub, key2) => {
            let cnt = 0,
              p = 0,
              a = 0,
              total = 0;
            if (user.subject_id === sub.name) {
              let attendanceCells = [];
              i.attendance[
                subjectData
                  .map((subject) => subject.name)
                  .indexOf(user.subject_id)
              ]?.forEach((value, index) => {
                if (value === "A") a = a + 1;
                else if (value === "P") p = p + 1;
                cnt = cnt + 1;
                if (cnt <= numberofDays) {
                  const dt = new Date(
                    user.year_id +
                      "-" +
                      user.month_id +
                      "-" +
                      (index + 1).toString()
                  );
                  if (dt.getDay() === 0) {
                    attendanceCells.push("H");
                  } else {
                    attendanceCells.push(value);
                  }
                }
              });
              total = p + a;
              let att = [];
              let percent = total
                ? Number.isInteger((p * 100) / total)
                  ? ((p * 100) / total).toString() + "%"
                  : ((p * 100) / total).toFixed(2).toString() + "%"
                : "0%";
              obj = {
                student_id: i.student_id,
                student_name: i.student_name,
                subject_id: user.subject_id,
                pa_id: p + "--" + a,
                total_id: total.toString() + " (" + percent + ")",
              };
              for (let x = 1; x <= attendanceCells.length; x++) {
                obj[x] = attendanceCells[x - 1];
              }
              temp.push(obj);
            }
          });
        }
      });
      temp.sort((a, b) => {
        const studentIdA = a.student_id;
        const studentIdB = b.student_id;

        if (studentIdA < studentIdB) {
          return -1;
        } else if (studentIdA > studentIdB) {
          return 1;
        } else {
          return 0;
        }
      });
      y.rows = temp;
      setData2(y);
    } else {
      let col = [
        {
          label: "Student Id",
          field: "student_id",
          sort: "asc",
          // width: 150
        },
        {
          label: "Student Name",
          field: "student_name",
          sort: "asc",
          // width: 150
        },
        {
          label: "Subject",
          field: "subject_id",
          sort: "asc",
          // width: 150
        },
        {
          label: "P/A",
          field: "pa_id",
          sort: "asc",
          // width: 150
        },
        {
          label: "Total",
          field: "total_id",
          sort: "asc",
          // width: 150
        },
      ];

      for (let i = 1; i <= numberofDays; i++) {
        const dt = new Date(
          user.year_id + "-" + user.month_id + "-" + i.toString()
        );
        if (dt.getDay() === 0) {
          let obj = {
            label: i,
            field: i,
            sort: "asc",
            // width: 50
          };
          col.push(obj);
        } else {
          let obj = {
            label: i,
            field: i,
            sort: "asc",
            // width: 50
          };
          col.push(obj);
        }
      }

      y.columns = col;

      let temp = [];
      data?.map((i, key) => {
        i.attendance?.map((att, index) => {
          let arr = [];
          let attendanceCells = [];
          let cnt = 0,
            p = 0,
            a = 0,
            total = 0;
          att?.map((value, idx) => {
            if (value === "A") a = a + 1;
            else if (value === "P") p = p + 1;
            cnt = cnt + 1;
            if (cnt <= numberofDays) {
              const dt = new Date(
                user.year_id + "-" + user.month_id + "-" + (idx + 1).toString()
              );
              if (dt.getDay() === 0) {
                attendanceCells.push("H");
              } else {
                attendanceCells.push(value);
              }
            }
          });
          total = p + a;
          let percent = total
            ? Number.isInteger((p * 100) / total)
              ? ((p * 100) / total).toString() + "%"
              : ((p * 100) / total).toFixed(2).toString() + "%"
            : "0%";
          let obj = {
            student_id: i.student_id,
            student_name: i.student_name,
            subject_id: subjectData[index].name,
            pa_id: p + "--" + a,
            total_id: total.toString() + " (" + percent + ")",
          };
          for (let x = 1; x <= attendanceCells.length; x++) {
            obj[x] = attendanceCells[x - 1];
          }
          temp.push(obj);
        });
      });
      temp.sort((a, b) => {
        const studentIdA = a.student_id;
        const studentIdB = b.student_id;

        if (studentIdA < studentIdB) {
          return -1;
        } else if (studentIdA > studentIdB) {
          return 1;
        } else {
          return 0;
        }
      });
      y.rows = temp;
      setData2(y);
    }
    setLoading(0);
  }, [data]);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center">
                  <button
                    className="btn btn-nex d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h4 className="mb-0">Attendance Report Month-Wise</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-header">Select Criteria</h6>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Department</label>
                          {/* <select
                            name="department_id"
                            id=""
                            className="form-control"
                            value={user.department_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Department</option>
                            {departmentData?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="department_id"
                            options={departmentData
                              ?.filter((s) => s.college_id == collegeId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.department_id
                              ? {
                                  value: user.department_id,
                                  label: departmentData?.find((i) => i.id == user.department_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "department_id",
                                  value: selectedOption ? selectedOption.value : "",
                                },
                              });
                            }}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Session</label>
                          {/* <select
                            name="session_id"
                            id=""
                            className="form-control"
                            value={user.session_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="session_id"
                            options={sessionOpt
                              // ?.filter((s) => s.college_id == collegeId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.session_id
                              ? {
                                  value: user.session_id,
                                  label: sessionOpt?.find((i) => i.id == user.session_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                name: "session_id",
                                value: selectedOption.value,
                                },
                              });
                            }}

                            placeholder="Select Session"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          {/* <select
                            name="class_id"
                            id=""
                            className="form-control"
                            value={user.class_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Class</option>
                            {classData?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="class_id"
                            options={classData?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.class_id
                              ? {
                                value: user.class_id,
                                label: classData?.find((i) => i.id == user.class_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "class_id",
                                  value: selectedOption ? selectedOption.value : "",
                                },
                              });
                            }}
                            placeholder="Select Class"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          {/* <select
                            name="semester_id"
                            id=""
                            className="form-control"
                            value={user.semester_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Semester</option>
                            {semesterData
                              ?.filter((s) => s.class_id == user.class_id)
                              ?.map((i, key) => (
                                <option key={key} value={i.id}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            name="semester_id"
                            options={semesterData
                              ?.filter((s) => s.class_id == user.class_id)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.semester_id
                              ? {
                                  value: user.semester_id,
                                  label: semesterData?.find((i) => i.id == user.semester_id)?.name,
                              }
                              : null
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "semester_id",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            placeholder="Select Semester"
                          />

                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Subject</label>
                          {/* <select
                            name="subject_id"
                            id=""
                            className="form-control"
                            value={user.subject_id}
                            onChange={handelChange}
                          >
                            
                            <option value="All">All</option>
                            {subjectData.map((i, key) => {
                              return (
                                <option key={key} value={i.name}>
                                  {i.name}
                                </option>
                              );
                            })}
                          </select> */}

                          <Select
                            name="subject_id"
                            options={[
                              { value: 'All', label: 'All' },
                              ...subjectData.map((i) => ({ value: i.name, label: i.name })),
                            ]}
                            value={
                              user.subject_id
                                ? { value: user.subject_id, label: user.subject_id }
                                : { value: 'All', label: 'All' } // Set 'All' as the default value
                            }
                            onChange={(selectedOption) => {
                              handelChange({
                                target: {
                                  name: "subject_id",
                                  value: selectedOption ? selectedOption.value : "",
                                },
                              });
                            }}
                            placeholder="Select Subject"
                          />

                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Year</label>
                          <select
                            name="year_id"
                            id=""
                            className="form-control"
                            value={user.year_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Year</option>
                            {sessionYear.map((year, index) => {
                              return <option key={index}>{year}</option>;
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Month</label>
                          {/* <select
                            name="month_id"
                            id=""
                            className="form-control"
                            value={user.month_id}
                            onChange={handelChange}
                          >
                            <option value="">Select Month</option>
                            {monthFull.map((month, index) => {
                              return (
                                <option key={index} value={month.id}>
                                  {month.label}
                                </option>
                              );
                            })}
                          </select> */}

<Select
      name="month_id"
      options={monthFull.map((month) => ({ value: month.id, label: month.label }))}
      value={
        user.month_id
          ? { value: user.month_id, label: monthFull.find((m) => m.id == user.month_id)?.label }
          : null
      }
      onChange={(selectedOption) => {
        handelChange({
          target: {
            name: "month_id",
            value: selectedOption ? selectedOption.value : "",
          },
        });
      }}
      placeholder="Select Month"
    />

                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-nex"
                            onClick={getAttendance}
                          >
                            Get Report
                          </button>
                        </div>
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
                    <h6 className="card-header">
                      Attendance Report (
                      {user.month_id
                        ? monthFull.find((month) => month.id == user.month_id)
                            .label
                        : ""}
                      )
                    </h6>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-end">
                        {/* <button className="btn btn-primary rounded-pill" onClick={PrintRecipt} >
                            Export
                          </button> */}
                        {/* <button className="btn btn-primary rounded-pill" onClick={handlePrint} >
                            Export
                          </button> */}
                      </div>
                    </div>
                    {data2 ? (
                      <PaginationTable
                        data={data2.rows}
                        numberofDays={numberofDays}
                        year_id={user.year_id}
                        month_id={user.month_id}
                        days={days}
                        setLoading={setLoading}
                        department_id={user.department_id}
                        college_id={collegeId}
                        session_id={user.session_id}
                        classData={
                          classData
                            ? classData.find(
                                (class1) => class1.id == user.class_id
                              )
                            : ""
                        }
                        semesterData={
                          semesterData
                            ? semesterData.find(
                                (sem) => sem.id == user.semester_id
                              )
                            : ""
                        }
                      />
                    ) : (
                      ""
                    )}

                    {/* <div className = "table-responsive">
                      <MDBDataTable key={originalEntries} responsive striped bordered small data={data2} ref={tableRef} entriesOptions={[10, 20, 50, 100]} entries={originalEntries} style = {tableStyles} noBottomColumns/>
                    </div> */}

                    {/* <div className="table-responsive">
                      < className="table table-bordered" style={{ display: 'table' }} ref={tableRef}>
                        <tr>
                          <th>
                            {user.department_id && departmentData ? ((departmentData.find(dept => dept.id == user.department_id)).name) : ("")}
                          </th>
                          <th>{user.session_id ? (user.session_id + "-" + (parseInt(user.session_id)+1).toString()) : ("") }</th>
                          <th>
                            {(user.class_id && classData && classData.find) ? ((classData.find(clas => clas.id == user.class_id)) ? (classData.find(clas => clas.id == user.class_id).name) : ("")) : ("")}
                          </th>
                          <th>
                            {user.semester_id && semesterData && semesterData.find ? ((semesterData.find(sem => sem.id == user.semester_id)) ? (semesterData.find(sem => sem.id == user.semester_id).name) : ("")) : ("")}

                          </th>
                          <th>
                            {user.month_id ? ((monthFull.find(month => month.id == user.month_id)).label) : ("")}
                          </th>
                        </tr>
                        <tr>
                          <th>Student Id</th>
                          <th>Student Name</th>
                          <th>Subject</th>
                          <th>P/A</th>
                          {days.slice(0,numberofDays)?.map((i, key) => {
                            const dt = new Date(user.year_id+"-"+user.month_id+"-"+(i).toString());
                            if (dt.getDay() === 0) {
                              return (
                                <th className="bg-light-danger">
                                    <span>{i}</span>
                                </th>
                              )
                            }
                            else return (<th key={key}>{i}</th>)
                          })}
                        </tr>
                        {data?.map((i, key) => {
                          {setLoading(true)}
                          if(user.subject_id === "All") {
                            setLoading(false)
                            return (
                              <>
                                
                                <td
                                  className="text-primary"
                                  rowspan = {subjectData.length+1}
                                >
                                  {i.student_id}
                                </td>
                                <td 
                                  className="text-primary"
                                  rowspan = {subjectData.length+1}
                                >
                                  {i.student_name}
                                </td>
                                {i.attendance?.map((att,index) => {
                                  let arr = [];
                                  let attendanceCells = [];
                                  let cnt = 0, p = 0, a = 0;
                                  {att?.map((value,idx) => {
                                    if (value === "A") a = a + 1;
                                    else if (value === "P") p = p + 1;
                                    cnt = cnt+1;
                                    if(cnt <= numberofDays) {
                                      const dt = new Date(user.year_id + "-" + user.month_id + "-" + (idx + 1).toString());
                                      if (dt.getDay() === 0) {
                                        attendanceCells.push(
                                          <td key={idx} className="bg-light-danger">
                                              <span className={`badge badge-soft-danger`}>H</span>
                                          </td>
                                      );
                                      }
                                      else {
                                        attendanceCells.push(<td key={index}>
                                          <span className={`badge badge-soft-${value=="P"?"success":(value=="A"?"danger":"secondary")}`} >{value}</span>
                                        </td>)
                                      }
                                    
                                    }
                                  })}
                                  
                                  setLoading(false);
                                  return (
                                    <>
                                      <tr>
                                      <td>{subjectData[index].name}</td>
                                      <td>{p}/{a}</td>
                                      {attendanceCells}
                                      </tr>
                                    </>
                                  )
                                })}

                                
                              </>
                            )

                          }
                          else {
                            return (
                              <>
                              <tr key={key}>
                                <td
                                  className="text-primary"
                                >
                                  {i.student_id}
                                </td>
                                <td 
                                  className="text-primary"
                                >
                                  {i.student_name}
                                </td>
                                
                                {subjectData?.map((sub, key2) => {
                                  let cnt = 0, p = 0, a = 0;
    
                                  if (user.subject_id === sub.name) {
                                      const attendanceCells = [];
    
                                      i.attendance[subjectData.map(subject => subject.name).indexOf(user.subject_id)]?.forEach((value, index) => {
                                          if (value === "A") a = a + 1;
                                          else if (value === "P") p = p + 1;
                                          cnt = cnt + 1;
                                          if(cnt <= numberofDays) {
                                            const dt = new Date(user.year_id + "-" + user.month_id + "-" + (index + 1).toString());
                                            if (dt.getDay() === 0) {
                                                attendanceCells.push(
                                                    <td key={index} className="bg-light-danger">
                                                        <span className={`badge badge-soft-danger`}>H</span>
                                                    </td>
                                                );
                                            } else {
                                                attendanceCells.push(
                                                    <td key={index}>
                                                        <span className={`badge badge-soft-${value === "P" ? "success" : (value === "A" ? "danger" : "secondary")}`}>{value}</span>
                                                    </td>
                                                );
                                            }
                                          }
                                      });
                                      
                                      setLoading(false);
                                      return (
                                          <>
                                              <td key={key2}>{sub.name}</td>
                                              <td>{p}/{a}</td>
                                              {attendanceCells}
                                          </>
                                      );
                                  }
                              })}
                              </tr>
                              </>
                            )
                          }
                        })}
                      </MBDTable>
                    </div> */}

                    {/* <MDBDataTable responsive striped bordered small data={data2} ref={(el) => (tableRef = el)} entries={50} /> */}
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

export default MonthWiseAttendance;
