import React, { useState } from 'react'
import ModalExamSchedule from '../../modals/Examinations/ModalExamSchedule'


function ExamSchedule() {

  
    
      const [infoData, setInfoData] = useState([
          {
          course: "UG",
          specialization: "Ayurveda",
          date:"08.2022",
          faculties:"Dr.Abhishek",
        year:"1st Year",

        sem:"1st Semester",
        status: <p className='badge badge-soft-success'>Published   </p>
          },
          {
            course: "UG",
            specialization: "Ayurveda",
            date:"08.2022",
            faculties:"Dr.Abhishek",
          year:"2nd Year",
  
          sem:"1st Semester",
          status: <p className='badge badge-soft-danger'>Not-Published   </p>
            },
      ])
    
    
      const handleDelete = (key) => {
        setInfoData(infoData.slice(0, key))
      }
    



  return (
    <div className='ExamSchedule'>
        <ModalExamSchedule/>

<div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0"> Exams Schedules</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Examination</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {" "}
                     Exams Schedules
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
                      Specialization<span style={{ color: "red" }}>*</span>
                      </label>
                      <select class="form-control" name="speci" id="speci">
                        <option value="">Select Specialization</option>
                        <option value="Engineering">Engineering</option>
                       


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
                      <label htmlFor="">Course Year</label>
                      <select name="sem" className="form-control" id="sem">
                        <option value="">Select Course Year </option>
                        <option value="">1st Year </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group">
                      <label htmlFor="">Semester</label>
                      <select name="sem" className="form-control" id="sem">
                        <option value="">Select </option>
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
      <h4 className='card-title text-uppercase '>Exams List</h4>
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
              <th>Course</th>
              <th>Specialization</th>
              <th>Date</th>

              <th>Faculties</th>

              <th>Course Year</th>

              <th>Semester</th>
              <th>Status</th>




              <th>Action</th>
            </tr>
          </thead>
          <tbody>



            {
              infoData && infoData?.map((data, key) => {
                return <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{data.course}</td>
                  <td > {data.specialization}</td>
                  <td > {data.date}</td>

                  <td > {data.faculties}</td>
                  <td> {data.year}</td>

                  <td> {data.sem}</td>
                  <td> {data.status}</td>

                  


                  <td><a data-toggle="modal" data-target="#view"  className='badge badge-light text-dark mr-3'  title="Edit"> <i class="fa fa-eye " aria-hidden="true"></i></a>
                    <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" onClick={() => handleDelete(key)}> <i class="fa fa-trash " aria-hidden="true"></i></span>
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

export default ExamSchedule