import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ROUTES } from '../../Router/routerConfig'
import Swal from 'sweetalert2'
import { useEffect } from 'react';


function AnswersheetChecking() {

    const navigate= useNavigate()


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

      const LoadData = () =>{
        Swal.fire({
            title: 'Confirmation',
            html :"Date: 22.08.2022 <br/> Total Number of Students: 30",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Accept!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Accepted!',
                '30 Students Assigned Succesfully',
                'success'
              )
            }
          })
    }

    useEffect(()=>{
        LoadData()
    },[])
    
  return (
    <div>
         <div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Answersheet Evaluation</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Examination</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {" "}
                    Answersheet Evaluation
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

                            <td><button className="btn text-primary" onClick={()=>{navigate(ROUTES.Admin.Examination.StudentList)}  } >  {data.usn} </button></td>
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

export default AnswersheetChecking