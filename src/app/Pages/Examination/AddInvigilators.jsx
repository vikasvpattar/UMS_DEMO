import React, { useState } from "react";

function AddInvigilators() {
    
    const [info, setInfo] = useState(
        {
          course: "UG",
          Faculty: ""
        }
      )
    
      const [infoData, setInfoData] = useState([
          {
          course: "UG",
          Faculty: "Ayurveda",
          date:"08.2022",
          staffname:"Dr.Abhishek",
          college:"swaminarayan Ayurvedic College, Kalol",

        email:"abhishek@nexenstial.com",
        status: <span className="badge badge-soft-success">Approved</span>,  
          },
      ])
    
    
   



  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0"> Add Invigilators</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Examination</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Add Invigilators
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
                    <div className="col-md-3">
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
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="income source">
                      Faculty<span style={{ color: "red" }}>*</span>
                      </label>
                      <select class="form-control" name="speci" id="speci">
                        <option value="">Select Faculty</option>
                        <option value="Engineering">Engineering</option>
                       


                      </select>
                    </div>
                  </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="income source">
                          First Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text"  className="form-control" name="fname" id="fname" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="income source">
                          Last Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text"   className="form-control" name="lname" id="lname" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="income source">
                         College Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text"   className="form-control" name="collage" id="collage" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="income source">
                         Email<span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text"   className="form-control" name="email" id="email" />
                        </div>
                      </div>
                     
                   
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Year</label>
                          <input type="month" className='form-control' name='year' id="year" />
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
              <th>Course</th>
              <th>Faculty</th>
              <th>Date</th>

              <th>Staff Name</th>
              <th>College Name</th>
              <th>Email-Id</th>

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
                  <td > {data.Faculty}</td>
                  <td > {data.date}</td>

                  <td > {data.staffname}</td>
                  <td > {data.college}</td>

                  <td> {data.email}</td>
                  <td>{data.status}</td>
                  


                  <td>   <a data-toggle="modal"
                                          data-target="#create"  className='badge badge-light text-dark mr-3'  title="Create Timetable"> <i class="fa fa-edit " aria-hidden="true"></i></a>
                                         
             
                    
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
  );
}

export default AddInvigilators;
