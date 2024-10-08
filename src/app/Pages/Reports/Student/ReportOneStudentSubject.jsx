import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import avatar from '../../../assets/images/reports/graduated.png'
import { Http } from '../../../Services/Services'
import { REPORT_STUDENT_ATTENDANCE_STAT_STU_SUB } from '../../../utils/Reports.apiConst'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'

const ReportOneStudentSubject = () => {
    const {student_id, course_id} = useParams()

    const [data, setData] = useState([])

    const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

    const getData = async () => {
        Http.get(`${REPORT_STUDENT_ATTENDANCE_STAT_STU_SUB}?course_id=${course_id}&student_id=${student_id}`)
        .then(res=>{
            setData(res.data.data)
        })
        .catch(err=>{
            toast.error("Something went wrong")
        })
    }

    useEffect(()=>{
        getData()
    },[])

    const handleSearch = async () => {
        try {
            const response = await Http.get(`${REPORT_STUDENT_ATTENDANCE_STAT_STU_SUB}?course_id=${course_id}&student_id=${student_id}`);
            const filteredData = response.data.data.attendance
                .filter((item) => {
                    const date = new Date(item.date).getTime();
                    const from = fromDate
                        ? new Date(fromDate).getTime()
                        : 0;
                    const to = toDate
                        ? new Date(toDate).getTime()
                        : Infinity;
                    return date >= from && date <= to;
                });
            setData({...response.data.data, attendance: filteredData});
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(()=>{
        handleSearch(); // Call the handleSearch function on component mount
    },[])

    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-header">
                                            Student Attendance - {student_id}
                                        </h6>
                                        <div className="row mt-5">
                                            <div className="col-md-1">
                                                <img src={data?.student?.student_picture || avatar} className=' rounded-pill' style={{ width: '100px' }} alt="Student Picture" />
                                            </div>
                                            <div className="col-md-11">
                                                <div>
                                                    <b>Name : </b> {data?.student?.student_name} <br />
                                                    <b>Class : </b> {data?.student?.class} <br />
                                                    <b>Semester : </b> {data?.student?.semester} <br />
                                                    <b>Phone : </b> {data?.student?.phone} <br />
                                                    <b>Email : </b> {data?.student?.email} <br />

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
                                            Student Attendance - {student_id}
                                        </h6>

                                        <div className="row">

                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="validationCustom02">
                                                  {" "}
                                                  From Date{" "}
                                                </label>
                                                <input
                                                  type="date"
                                                  className="form-control"
                                                  name="fromDate"
                                                  value={fromDate ? fromDate : new Date().toISOString().split("T")[0]}
                                                  onChange={(e) => {
                                                    setFromDate(e.target.value);
                                                  }}
                                                />
                                              </div>
                                            </div>

                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="validationCustom02">
                                                  {" "}
                                                  To Date{" "}
                                                </label>
                                                <input
                                                  type="date"
                                                  className="form-control"
                                                  id="validationCustom02"
                                                  placeholder="Purpose of Visiting"
                                                  name="toDate"
                                                  value={toDate ? toDate : new Date().toISOString().split("T")[0]}
                                                  onChange={(e) => setToDate(e.target.value)}
                                                />
                                                </div>
                                            </div> 

                                        </div>

                                        <div className="row float-right mr-4">
                                          <button
                                            className="btn btn-primary btn-rounded"
                                            type="submit"
                                            name="submit"
                                            // onClick={getData}
                                            onClick={handleSearch}
                                          >
                                          <i className="fa fa-search" aria-hidden="true" /> Search
                                          </button>
                                        </div>
                                        
                                        <div className="table-responsive">
                                            <table className='table table-bordered'>
                                                <tr>
                                                    <th>status</th>
                                                    <th>date</th>
                                                    <th>time</th>
                                                </tr>
                                                {
                                                    data?.attendance
                                                    // .filter((item) => {
                                                    //     const date = new Date(item.date).getTime();
                                                    //     const from = fromDate
                                                    //       ? new Date(fromDate).getTime()
                                                    //       : 0;
                                                    //     const to = toDate
                                                    //       ? new Date(toDate).getTime()
                                                    //       : Infinity;
                                                    //     return (
                                                    //       date >= from &&
                                                    //       date <= to 
                                                    //     );
                                                    //  })
                                                    ?.map((i,key)=>(
                                                        <tr>
                                                            <td>
                                                                <span  className={`badge badge-soft-${i?.attendance_status=="PRESENT"?"success":"danger"}`}>
                                                                {i?.attendance_status}
                                                                </span>
                                                                </td>
                                                            <td>{i?.date}</td>
                                                            <td>{i?.time_from} - {i?.time_to}</td>
                                                        </tr>
                                                    ))
                                                }
                                                
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
    )
}

export default ReportOneStudentSubject;