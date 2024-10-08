import React, { useState } from 'react'


function AssignAnswersheets() {


    const [info, setInfo] = useState(
        {
          course: "UG",
          specialization: ""
        }
      )
    
      const [infoData, setInfoData] = useState([
          {
          course: "UG - Engineering",
          
          
          date:"24.08.2022",
          faculties:"Dr.Abhishek",
          students:"30",
          usn:"SUK220204AY001 - SUK220204AY030",
          

        sem:"1st Year - 1st Semester",
        status:<><p className='badge badge-soft-success mr-2'>Accepted</p> 
        <p className='badge badge-soft-success'>Completed</p></>
          },
          {
            course: "UG - Engineering",
            
            
            date:"25.08.2022",
            faculties:"Dr.Abhishek",
            students:"30",
            usn:"SUK220204AY031 - SUK220204AY060",
            
  
          sem:"1st Year - 1st Semester",
          status:<><p className='badge badge-soft-warning mr-2'>Pending</p> 
          <p className='badge badge-soft-danger'>Incompleted</p></>
            },
           
         
      ])
    
    
      const handleDelete = (key) => {
        setInfoData(infoData.slice(0, key))
      }
    


  return (
    <div>
         <div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Assign Answersheets</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Examination</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {" "}
                    Assign Answersheet
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
                        <label htmlFor="">Select Invigilator</label>
                    <select className="form-control" name="invigilator[]" id="">
            <option value="">Select Invigilator</option>
            <option value="">Dr. Srinivas R</option>
            <option value="">Prof. Manjunath H</option>
          </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Number of Students</label>
                          <input type="number" className='form-control' name='number' id="number" />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Date</label>
                          <input type="date" className='form-control' name='year' id="year" />
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
                      <i className="fa fa-save" aria-hidden="true" /> Save
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
                <h4 className='card-title text-uppercase '>List</h4>
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
                        <th>Course-Specialization</th>
                        <th>Course Year - Semester</th>
                        <th>Invigilator</th>

<th> No. of Students</th>
                        <th>Seat Numbers</th>


                        <th>Date</th>

                        
<th>Status</th>

                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>



                      {
                        infoData && infoData?.map((data, key) => {
                          return <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{data.course}</td>
                            <td > {data.sem}</td>

                            <td > {data.faculties}</td>
                            <td className='text-center' > {data.students}</td>

                            <td> {data.usn}</td>
                            <td > {data.date}</td>

                            <td> {data.status}</td>

                            


                            {/* <td>   <a data-toggle="modal"
                                                    data-target="#add"  className='badge badge-light text-dark mr-3'  title="Edit"> <i class="fa fa-plus " aria-hidden="true"></i></a>
                        
                              
                          
                            </td> */}
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

export default AssignAnswersheets