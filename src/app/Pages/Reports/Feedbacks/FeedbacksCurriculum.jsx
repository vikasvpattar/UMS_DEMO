import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify'

import {
    ACADEMICS_ADD_CLASS,
    ACADEMICS_ADD_SECTION,
    ACADEMICS_ADD_SEMESTER,
  } from "../../../utils/Academics.apiConst";

import {
    LOCAL_DEPARTMENT,
    LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";

import {
    REPORT_FEEDBACK_FECTH,
    REPORT_FEEDBACK_QUESTIONS_FECTH
  } from "../../../utils/Reports.apiConst";

import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";

const FeedbacksCurriculum = ({ setLoading, collegeId }) => {

    const [department, setDepartment] = useState(
        JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
    );
    var emp_id = sessionStorage.getItem("employee_id");

    const getCollegeData = () => {
        return localStorage.getItem(LOCAL_COLLEGE)
          ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
          : null;
    };

    const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

    useEffect(() => {
    setDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
    }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

    const [clg, setClg] = useState("");
    const [faculty, setFaculty] = useState("");
    const [session, setSession] = useState("");
    const [classOpt, setClassOpt] = useState([]);
    const [sectionOpt, setSectionOpt] = useState([]);
    const [semesterOpt, setSemesterOpt] = useState([]);

    const [currentclass, setCurrentClass] = useState("");
    const [currentSemester, setCurrentSemester] = useState("");
    const [currentSection, setCurrentSection] = useState("");

    const [feedbackQuestions, setFeedbackQuestions] = useState([]);
    const [feedbackReport, setFeedbackReport] = useState([]);

    const tableRef = useRef();
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Teacher's Feedback Report",
    });

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
        console.log('dropdown data fecthed');
    };

    const getFeedbackData = async() => {
        setLoading(1);

        let obj1 = {};
        obj1['feedback_type'] = "curriculum";
        const config1 = {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            url: `${REPORT_FEEDBACK_QUESTIONS_FECTH}`,
            data:obj1
        };

        await axios(config1)
          .then((res) => {
            console.log('questions fetched - ', res.data.data);
            setFeedbackQuestions(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })

        let obj = {};
        obj['feedback_type'] = "curriculum";
        obj['semester_id'] = currentSemester;
        obj['session'] = session;
        obj['department_id'] = faculty;
        obj['class_id'] = currentclass;
        obj['section_id'] = currentSection;
        if(!currentSemester || !session || !faculty || !currentclass || !currentSection) {
            toast("Please Fill all the Details");
            setLoading(0);
            return;
        }
        const config = {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            url: `${REPORT_FEEDBACK_FECTH}`,
            data:obj
          };

          await axios(config)
          .then((res) => {
            console.log('reports fetched - ', res.data.data);
            setFeedbackReport(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
        setLoading(0);
        
    };

    useEffect(()=> {
        getAllData();
    },[]);

    return (<>
    <div className="main-content">
        <h6 className="my-0"><b>CURRICULUM FEEDBACK</b></h6>
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
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
                                    <select
                                        name="faculty"
                                        id="section"
                                        className="form-control"
                                        value={faculty}
                                        onChange={(e) => {
                                        setFaculty(e.target.value);
                                        }}
                                    >
                                        <option value="" selected>
                                        ALL
                                        </option>
                                        {emp_id == 316
                                        ? department
                                            ?.filter((s) => s.college_id == clg)
                                            ?.map((i, key) => (
                                                <option value={i.id} key={key}>
                                                {i.name}
                                                </option>
                                            ))
                                        : department
                                            ?.filter((s) => s.college_id == collegeId)
                                            ?.map((i, key) => (
                                                <option value={i.id} key={key}>
                                                {i.name}
                                                </option>
                                            ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                    <label htmlFor="">Session</label>
                                    <select
                                        className="form-control"
                                        value={session}
                                        onChange={(e) => {
                                        setSession(e.target.value);
                                        }}
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
                                        className="form-control"
                                        value={currentclass}
                                        onChange={(e) => {
                                        setCurrentClass(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Class</option>
                                        {classOpt
                                        ?.filter((s) => s?.department_id == faculty)
                                        ?.map((i, key) => (
                                            <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                    <label htmlFor="">Semester</label>
                                    <select
                                        className="form-control"
                                        value={currentSemester}
                                        onChange={(e) => {
                                        setCurrentSemester(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Semester</option>
                                        {semesterOpt
                                        ?.filter((s) => s.class_id == currentclass)
                                        ?.map((i, key) => (
                                            <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                    <label htmlFor="">Section</label>
                                    <select
                                        className="form-control"
                                        value={currentSection}
                                        onChange={(e) => {
                                        setCurrentSection(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Section</option>
                                        {sectionOpt
                                        ?.filter((s) => s.semester_id == currentSemester)
                                        ?.map((i, key) => (
                                            <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button
                                        className="btn btn-nex btn-md mr-3"
                                        type="submit"
                                        name="submit"
                                        value="collect"
                                        onClick={getFeedbackData}
                                        style={{ marginTop: 'auto' ,marginLeft: 'auto', width:'30%'}}
                                    >
                                        <i className="fa fa-search" aria-hidden="true" /> Search
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Feedback Results</h2>
                                {/* <br /> */}
                                <div className="table-responsive">
                                    <table
                                        id=""
                                        className="table table-bordered text-wrap table-hover dataTable no-footer"
                                        style={{
                                        borderCollapse: "collapse",
                                        borderSpacing: 0,
                                        width: "100%",
                                        }}
                                        ref={tableRef}
                                    >
                                    <thead className="d-none">
                                    {/* <thead> */}
                                        <tr>
                                        <td colSpan={4}><b>Swaminarayan University</b></td>
                                        </tr>
                                        <tr>
                                        <td colSpan={4}><b>{session}-{session ? (parseInt(session) + 1) : ""}</b></td>
                                        </tr>
                                        <tr>
                                        <td colSpan={4}><b>Department : {department?.find((s) => s.id == faculty)?.name ? department?.find((s) => s.id == faculty).name : ""}</b></td>
                                        </tr>
                                        <tr>
                                        <td colSpan={4}><b>Class : {classOpt?.find((s) => s.id == currentclass)?.name ? classOpt?.find((s) => s.id == currentclass)?.name : ""}</b></td>
                                        </tr>
                                        <tr>
                                        <td colSpan={4}><b>Sem : {semesterOpt?.find((s) => s.id == currentSemester)?.name ? semesterOpt?.find((s) => s.id == currentSemester)?.name : ""}</b></td>
                                        </tr>

                                    </thead>
                                    <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Questions</th>
                                        <th>Votes</th>
                                        <th>Rating</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {feedbackQuestions && feedbackQuestions.length > 0 ? feedbackQuestions?.map((value,index)=> {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{value.question}</td>
                                                    <td>{feedbackReport.find((s)=>s.q_id == value.q_id)?.count?feedbackReport.find((s)=>s.q_id == value.q_id)?.count:"NA"}</td>
                                                    <td><b>{feedbackReport.find((s)=>s.q_id == value.q_id)?.avg?feedbackReport.find((s)=>s.q_id == value.q_id)?.avg:"NA"}</b></td>
                                                </tr>
                                            )
                                        }): (
                                            <tr>
                                            {" "}
                                            <td colSpan={15}>
                                                <div align="center" className="text-danger">
                                                No data available in table <br /> <br />
                                                <img
                                                    src="/assets/images/addnewitem.svg"
                                                    width={150}
                                                />
                                                
                                                </div>
                                            </td>
                                            </tr>
                                        )}
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
    </>)
}

export default FeedbacksCurriculum;