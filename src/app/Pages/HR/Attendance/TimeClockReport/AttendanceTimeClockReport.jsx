import React, { useState } from 'react'
import Nodata from '../../../../Components/NoData/Nodata'
import { LOCAL_JOBROLES } from '../../../../utils/LocalStorageConstants'



function AttendanceTimeClockReport() {
  const [data, setData] = useState(1)

  const getlocalStorage = () => {
    return localStorage.getItem(LOCAL_JOBROLES) ? JSON.parse(localStorage.getItem(LOCAL_JOBROLES)) : []
  }



  const [jobRoleOpt, setJobRoleOpt] = useState(getlocalStorage)



  return (
    <div className='AttendanceTimeClockReport'>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Attendance Report</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Reports</a>
                      </li>
                      <li className="breadcrumb-item active">Attendance Report</li>
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="role">
                            Role <small className="text-danger">*</small>
                          </label>
                          <select name="role" id="role" required="" className="form-control">

                            <option value="">Select</option>
                            {jobRoleOpt?.map((data, key) => {
                              return <option value={data.id}>{data.name}</option>
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="month">
                            Month <small className="text-danger">*</small>
                          </label>
                          <select name="month1" id="month1" required="" className="form-control">
                            <option value="">Select Month</option>
                            <option value="1">JANUARY</option>
                            <option value="2">FEBURARY</option>
                            <option value="3">MARCH</option>
                            <option value="4">APRIL</option>
                            <option value="5">MAY</option>
                            <option value="6">JUNE</option>
                            <option value="7">JULY</option>
                            <option value="8">AUGUST</option>
                            <option value="9">SEPTEMBER</option>
                            <option value="10">OCTOBER</option>
                            <option value="11">NOVEMBER</option>
                            <option value="12">DECEMBER</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="month">
                            Year <small className="text-danger">*</small>
                          </label>
                          <select name="month1" id="month1" required="" className="form-control">
                            <option value="">Year</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>


                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          className="btn btn-success float-right"
                          name="submit"
                          type="submit"
                          value="staff"
                        >
                          Search
                        </button>
                      </div>
                    </div>

                     {false ?  <div className="row mt-3">
                      <div className="col-md-8">
                        <h5>Staff Attendance Report</h5>
                      </div>

                      <div className="col-md-4 d-flex  justify-content-around">
                        <h6>
                          Present:<span className="text-success"> P </span>{" "}
                        </h6>
                        <h6>
                          Late:<span className="text-warning"> L </span>{" "}
                        </h6>
                        <h6>
                          Absent:<span className="text-danger"> A </span>{" "}
                        </h6>
                        <h6>
                          Holiday:<span className="text-secondary"> H</span>{" "}
                        </h6>
                      </div>

                      <div className="col-12">
                        <div className="tabel-responsive">
                          <table className='w-100'>
                            <thead>
                              <tr>
                                <th style={{ width: '100px' }} width="100px">Staff/Date</th>
                                <th style={{ width: '100px' }} width="20px" >%</th>
                                <th style={{ width: '100px' }} width="20px" >P</th>
                                <th style={{ width: '100px' }} width="20px" >L</th>
                                <th style={{ width: '100px' }} width="20px" >Action</th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                <td>
                                  Anand
                                </td>
                                <td>
                                  <span className="badge badge-light"> 85%</span>
                                </td>
                                <td>13</td>
                                <td>33</td>
                                <td><button className="btn btn-primary btn-rounded">Export</button></td>
                              </tr>
                              {/* <tr>
                                <td colspan="12">

                              <div align="center" className="text-danger">
                                No data available in table <br /> <br />
                                <img src="assets/images/addnewitem.svg" width={150} />
                                <br />
                                <br />{" "}
                                <span className="text-success bolds">
                                  <i className="fa fa-arrow-left" /> Add new record or search with different
                                  criteria.
                                </span>
                                <div />
                              </div>
                                </td>
                              </tr> */}

                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div> : <Nodata /> }


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

export default AttendanceTimeClockReport