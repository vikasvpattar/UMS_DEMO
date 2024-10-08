import React, { useState } from 'react'
import ModalDownloadQuestionPaper from '../../modals/Examinations/ModalDownloadQuestionPaper'


function DownloadQuestionPaper() {

    
    const [info, setInfo] = useState(
        {
          course: "UG",
          specialization: ""
        }
      )
    
      const [infoData, setInfoData] = useState([
          {
          course: "UG",
          specialization: "Engineering",
          
          date:"08.2022",
          faculties:"Dr.Abhishek",
          year:"1st Year",

        sem:"1st Semester",
        status:<p className='badge badge-soft-success'>Downloaded</p>
          },
          {
            course: "UG",
            specialization: "Ayurveda",
            
            date:"08.2022",
            faculties:"Dr.Abhishek",
            year:"1st Year",
  
          sem:"1st Semester",
          status:<p className='badge badge-soft-danger'>Not-Downloaded</p>
            },
      ])
    
    
      const handleDelete = (key) => {
        setInfoData(infoData.slice(0, key))
      }
    

  return (
    <div className='DownloadQuestionPaper'>
        <ModalDownloadQuestionPaper/>



<div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Download Question Paper</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0)">Examination</a>
                </li>
                <li className="breadcrumb-item active"> Download Question Paper </li>
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
                            <td > {data.year}</td>

                            <td> {data.sem}</td>
                            <td> {data.status}</td>

                            


                            <td>   <button data-toggle="modal"
                                                    data-target="#download"  className='btn btn-success btn-rounded text-white '  title="download">   <i className="fa fa-download" aria-hidden="true" /> Download </button>
                        
                              
                          
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

export default DownloadQuestionPaper