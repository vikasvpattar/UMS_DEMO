import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { Http } from "../../../Services/Services";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
} from "../../../utils/Academics.apiConst";
import {
  REPORT_STUDENT_ATTENDANCE_ALL
} from "../../../utils/Reports.apiConst";

const AttendanceView = ({id, setLoading}) => {


    //all attendance data
    const [attendanceData, setAttendanceData] = useState([]);

    //sessions set
    const [sessionsSet, setSessionsSet] = useState(new Set());

    //all sessions array
    const [sessions, setSessions] = useState([]);

    //session selected
    const [sessionType, setSessionType] = useState([]);

    //semesters all
    const [semesterOpt, setSemesterOpt] = useState([]);

    //semesters of selected class
    const [semesters, setSemesters] = useState([]);

    //semester selected
    const [semester, setSemester] = useState("");

    //display data 
    const [displayData, setDisplayData] = useState([]);
    
    const getAttendance = async () => {
        setLoading(1);
        await Http.get(
            `${REPORT_STUDENT_ATTENDANCE_ALL}?student_id=${id}`
        )
        .then((res)=> {
            setLoading(0);
            console.log('attendance data - ', res.data.data);
            setAttendanceData(res.data.data);
        })
        .catch((err)=> {
            setLoading(0);
            console.log(err);
        })
    }

    useEffect(()=> {
        attendanceData?.forEach((value, index) => {
            setSessionsSet((prev)=> new Set([...prev, value.student_session_id]));
        })
        if(attendanceData && attendanceData.length !== 0) {
            getSemesters(attendanceData[0]?.college_id);
        }
    }, [attendanceData]);

    const getSemesters = async (college_id)=> {
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
            url: `${ACADEMICS_ADD_SEMESTER}?college_id=${college_id}`,
          })
            .then((res) => {
              setLoading(0);
              setSemesterOpt(res.data.data);
            })
            .catch((err) => {
                setLoading(0);
              console.log(err);
            })
    }

    useEffect(()=> {
        if(sessions.length !== 0) {
            setSessionType(sessions[0]);
        }

    },[sessions]);

    useEffect(()=> {
        if(sessionType && semesterOpt) {
            let clas = attendanceData?.find((s) => s.student_session_id == sessionType);
            let arr = semesterOpt?.filter((s)=> s.class_id == clas?.class_id);
            let semNames = arr?.map((value, idx) => {
                return value.name;
            })
            setSemesters(semNames);
        }
    }, [sessionType, semesterOpt]);

    useEffect(()=> {
        if(semesters) {
            setSemester(semesters[0]);
        }
    }, [semesters]);

    useEffect(()=> {
        const arr = Array.from(sessionsSet);
        arr.sort((a, b) => b - a);
        setSessions(arr);
    }, [sessionsSet]);

    useEffect(()=> {
        getAttendance();
    }, []);

    useEffect(()=> {
        let temp = attendanceData.filter((s)=> s.semester == semester && s.student_session_id == sessionType)
        setDisplayData(temp);
    }, [semester, sessionType]);

    return (<>
        <div className="row">
            <div className="pt-3">
                <ul className="nav nav-tabs">
                    {sessions?.map((value, index)=> {
                        return (
                            <li className="nav-item cursor-pointer">
                                <a className={`nav-link ${sessionType === value && "active"}`}
                                onClick={() => setSessionType(value)}
                                >{value}-{value+1}</a>  
                            </li>
                        )
                    })}
                </ul>
                <br />
                <ul className="nav nav-tabs">
                    {semesters?.map((value, index)=> {
                        return (
                            <li className="nav-item cursor-pointer">
                                <a className={`nav-link ${semester === value && "active"}`}
                                onClick={() => setSemester(value)}
                                >{value}</a>  
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        <br />
        <div>
            <table className="table table-bordered nowrap table-hover">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Course</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Total</th>
                        <th>Present%</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData && displayData.length > 0 ? displayData?.map((value, key) => {
                        let percentage = 0;
                        if(parseInt(value.present) + parseInt(value.absent) !== 0) {
                            percentage = (parseInt(value.present)*100/(parseInt(value.present) + parseInt(value.absent))).toFixed(2);
                        }
                        let color = '#CCFFCD';
                        if(percentage < 60) color = '#FFCCCB';
                        else if(percentage < 85 && percentage >= 60) color = '#fffdd0';
                        return (
                            <tr>
                                <td>{key+1}</td>
                                <td>{value.course}</td>
                                <td className="text-success"><b>{value.present}</b></td>
                                <td className="text-danger"><b>{value.absent}</b></td>
                                <td className="text-primary"><b>{parseInt(value.present) + parseInt(value.absent)}</b></td>
                                <td style={{backgroundColor:color}}><b>{percentage}%</b></td>
                            </tr>
                        )
                    }) : (
                        <tr>
                            {" "}
                            <td colSpan={13}>
                            <div align="center" className="text-danger">
                                No data available in table <br /> <br />
                                <img
                                src="/assets/images/addnewitem.svg"
                                width={150}
                                />
                                <br />
                                <br />{" "}
                                {/* <span className="text-success bolds">
                                <i className="fa fa-arrow-left" /> Add new
                                record or search with different criteria.
                                </span> */}
                                <div />
                            </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)
}

export default AttendanceView;