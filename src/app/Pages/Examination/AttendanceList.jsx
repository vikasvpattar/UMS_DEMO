import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalAddAttendance from '../../modals/Examinations/ModalAddAttendance';

import { ROUTES } from '../../Router/routerConfig'


function AttendanceList() {


 
const navigate=useNavigate();

    
    
      const [infoData, setInfoData] = useState([
          {
          course: "UG-Engineering-ComputerScience",
          date:'Sept-2022',
         
         
          year:"1st Year - 2nd Sem",

        block:"A",
        students:"35"

       
          },
          {
            course: "UG-Engineering-ComputerScience",
            date:'Sept-2022',
           
           
            year:"1st Year - 2nd Sem",
  
          block:"B",
          students:"35"
  
         
            },
         
      ])
    
    
      const handleDelete = (key) => {
        setInfoData(infoData.slice(0, key))
      }
    

  return (
    <div className="AttendanceList">

      <ModalAddAttendance/>

      <div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Attendance List</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Examination</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {" "}
                    Attendance List
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
                <h2 className="card-title">Select Criteria</h2>
                <br />

                <div className="row">
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="income source">
                      Course<span style={{ color: "red" }}>*</span>
                      </label>
                      <select class="form-control" name="course" id="course">
                        <option value="">Select Course</option>
                        <option value="UG">UG</option>
                        <option value="PG">PG</option>
                        <option value="Diploma">Diploma</option>


                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="income source">
                      Faculty<span style={{ color: "red" }}>*</span>
                      </label>
                      <select class="form-control" name="speci" id="speci">
                        <option value="">Select Faculty</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Ayurveda">Ayurveda</option>

                       


                      </select>
                    </div>
                  </div>
                  
                      <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="">Course Year</label>
                      <select name="sem" className="form-control" id="sem">
                        <option value="">Select Course Year </option>
                        <option value="">1st Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="">Semester</label>
                      <select name="sem" className="form-control" id="sem">
                        <option value="">Select Semester </option>
                        <option value="">1st Semester</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Date</label>
                          <input type="month" className='form-control' name='year' id="year" />
                        </div>
                      </div>
                      <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="">Exam Name</label>
                      <select name="sem" className="form-control" id="sem">
                        <option value="">Select Exam </option>
                        <option value="">1st Semester</option>
                      </select>
                    </div>
                  </div>
                     
                </div>
                <div className="row ">
                  <div className="col-md-12 ">
                    <button
                      className="btn btn-nex btn-rounded float-right  "
                      type="submit"
                      name="submit"
                      
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
                
              <hr />

                <div className="table-responsive">

                  <table
                    id="table_id"
                    className="display table table-bordered  nowrap table-hover "
                    style={{ borderCollapse: "collapse", borderSpacing: 0, width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th> Sl. No.</th>
                        <th>Course - Faculty</th>
                        

                        

                      
                       
                        <th>Exam Year</th>
                      
                        <th>Course Year - Semester</th>
                        <th>Total Number of Students</th>
                        <th>Block</th>



                        


                        
<th>Action</th>

                       
                      </tr>
                    </thead>
                    <tbody>



                      {
                        infoData && infoData?.map((data, key) => {
                          return <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{data.course}</td>
                            <td > {data.date}</td>
                          

                           
                            <td > {data.year}</td>

                            <td> {data.students}</td>
                            <td> {data.block}</td>

                           

                            


                            <td>   <a data-toggle="modal" data-target="#add" className='badge badge-light text-dark mr-3'  title="Add Attendance"> <i class="fa fa-plus" aria-hidden="true"></i></a>
                        
                        <a  data-toggle="tooltip" onClick={()=>{navigate(ROUTES.Examination.DownloadAttendanceList)}}
                                                   className='badge badge-danger text-white  mr-3' title="Print Attendance Sheet"> <i class="fa fa-print " aria-hidden="true"></i></a>
                              
                          
                            </td>
                          </tr>
                          
                        })


                      }
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
  )
}

export default AttendanceList