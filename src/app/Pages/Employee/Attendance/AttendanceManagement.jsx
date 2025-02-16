import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import Nodata from '../../../Components/NoData/Nodata'
import { EMPLOYEE, EMPLOYEE_ATTENDANCE, JOB_POSITIONS } from '../../../utils/apiConstants'
import { ALL_DATA, LOCAL_JOBROLES } from '../../../utils/LocalStorageConstants'
import { SESSION_EMPLOYEE_ID } from '../../../utils/sessionStorageContants'
import AttendanceTabelRow from './AttendanceTabelRow'

function AttendanceManagement() {
  const [data, setData] = useState(1)
  const [absent, setAbsent] = useState(0)
  const [inTime, setInTime] = useState('')
  const [outTime, setOutTime] = useState('')
  const [employees, setEmployees] = useState()
  const [attendees, setAttendees] = useState([])
  const [mainData, setMainData] = useState([])


  const [loading, setLoading] = useState(0)



  const [role, setRole] = useState()
  const [day, setDay] = useState({
    month: 0,
    year: 0,
  })


  const putAttendance = () => {

  }

  const setTime = (t) => {
    console.log(t);
    if (t === 'in') {
      if (inTime === "") {
        setInTime(String(new Date()).slice(16, 25))
      }
    }
    else {
      if (inTime === "") return alert("Intime Not Set Yet")
      if (outTime === "") {
        setOutTime(String(new Date()).slice(16, 25))
      }
    }
  }

  // const [flag, setFlag] = useState(0)
  const compareData = (a, b) => {
    var flag = 0
    setMainData()
    const d = [];
    for (const i of a) {
      flag = 0
      for (const j of b) {
        if (j.employee_id === i.id) {
          // setFlag(1)
          const obj = {
            id: j.id,
            employee_id: i.id,
            absent: j.absent,
            present: j.absent,
            in_time: j.in_time,
            out_time: j.out_time,
            role: i.role,
            name: i.first_name + ' ' + i.last_name,
            day: j.day,
            month: j.month,
            year: j.year,
            paid_leave: j.paid_leave,
            unpaid_leave: j.unpaid_leave,
            remark: j.remark,

          }
          d.push(obj)
          flag = 1
          break;
        }
      }
      if (flag === 0) {
        const obj = {
          employee_id: i.id,
          absent: null,
          present: null,
          in_time: null,
          out_time: null,
          role: i.role,
          name: i.first_name + ' ' + i.last_name,
          day: null,
          month: null,
          year: null,
          paid_leave: null,
          unpaid_leave: null,
          remark: null,

        }
        d.push(obj)
      }
    }
    setMainData([...d])
  }



  const getEmployeeId = () => {
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID) ? sessionStorage.getItem(SESSION_EMPLOYEE_ID) : null
  }


  const [employeeId, setEmployeeId] = useState(getEmployeeId)

  const getAttendanceReport = async () => {
    setLoading(1)

    const config2 = {
      method: 'get',
      url: `${EMPLOYEE_ATTENDANCE}/details?month=${day.month}&&year=${day.year}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    }

    await axios(config2)
      .then((res) => {
        // toast.success("Data Feched SuccessFully")
        setLoading(0)
        console.log(res);
        setAttendees(res.data.data)
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
      })

  }


  useEffect(() => {
    console.log(mainData);
  }, [mainData])

  return (
    <div className='AttendanceManagement'>
      <Loader loading={loading} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Attendance Managment</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/attendanceManagement">Attendance</a>
                      </li>
                      <li className="breadcrumb-item active">Attendance Managment</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="role">Select Date</label>
                          <input
                            type="month"
                            className="form-control"
                            data-date-format="mm-yy"
                            id="date"
                            onChange={(e) => {
                              console.log(e.target.value)
                              setDay({
                              //   // day: e.target.value.split("-")[2],
                                month: e.target.value.split("-")[1],
                                year: e.target.value.split("-")[0]
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button className="btn btn-success float-right" onClick={getAttendanceReport}>Search</button>
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
                    <h4>Attendance</h4>
                    <hr />
                    <div className="table-responsive mt-3">
                      <table className="table table-bordered">

                        <tr>
                          <th>Sl.No.</th>
                          <th>Date</th>
                          {/* <th></th>
                          <th>Role</th> */}
                          <th className="text-center">Attendance <br /> <h6><span className='mr-5'>In time</span> <span>Out time</span></h6></th>
                          <th>Note</th>
                        </tr>
                        {
                          attendees && attendees.length !== 0 ? attendees?.map((i, key) => <AttendanceTabelRow key={key} sl={key} data={i} setLoading={setLoading} reloadData={getAttendanceReport} day={day} />)
                            :
                            <tr>
                              <td colSpan={10}>

                                <Nodata />
                              </td>
                            </tr>
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
    </div >
  )
}

export default AttendanceManagement