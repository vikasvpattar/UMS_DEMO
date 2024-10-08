import React, { useState } from 'react'
import ModalEvalutionSheet from '../../modals/Examinations/ModalEvalutionSheet'

function Studentslist() {

  const [info, setInfo] = useState(
    {
      course: "UG",
      specialization: ""
    }
  )

  const [infoData, setInfoData] = useState([
    {
      course: "UG - Engineering",


      date: "24.08.2022",
      faculty: "Dr.Abhishek",
      students: "30",
      usn: "xxxxxxxxxxx001",


      sem: "1st Year - 1st Semester",
      total: "80",

      status:
        <p className='badge badge-soft-success'>Completed</p>
    },
    {

      faculty: "Dr.Abhishek",
      students: "30",
      usn: "xxxxxxxxxxx002",


      sem: "1st Year - 1st Semester",
      total: "0",

      status:
        <p className='badge badge-soft-warning'>Pending</p>
    },



  ])


  const handleDelete = (key) => {
    setInfoData(infoData.slice(0, key))
  }

  return (
    <div className='Studentslist'>
      <ModalEvalutionSheet />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students List</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Examination</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Students List
                      </li>
                    </ol>
                  </div>
                </div>
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
                            <th>Seat Number</th>

                            <th>Evaluater</th>


                            <th>Total Marks</th>





                            <th>Status</th>

                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>



                          {
                            infoData && infoData?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td><button className='btn' data-toggle="modal" data-target="#add"> {data.usn} </button></td>
                                <td> {data.faculty}</td>
                                <td> {data.total}</td>



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

      </div></div>
  )
}

export default Studentslist