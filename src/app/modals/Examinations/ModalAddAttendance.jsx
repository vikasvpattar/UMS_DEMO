import React from 'react'
import { useState } from 'react'

function ModalAddAttendance() {

      
  const [infoData, setInfoData] = useState([
    {
    seatno: "1200",
    regno:'2KA16CS002',
   
    name:"Mr.Abhishek Badiger",
    gender:"Male",

  
    },
    {
      seatno: "1201",
      regno:'2KA16CS003',
     
      name:"Mr.Abhishek Badiger",
      gender:"Male",

    
      },
     
])
  return (
    <div>

<>
  {/* assign Students */}
  <div
    className="modal fade"
    id="add"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog mw-100 w-75" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="assign">
            Assign Students
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <div className="row align-items-center ">
                      <div className="col-md-2">
                        <img
                          src="/assets/images/Nexenstial Logo.png"
                          width={150}
                          alt=""
                          srcset=""
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="justify-content-center text-center">
                          <h2 className="text-uppercase mb-3">
                            <b>Swaminarayan University, Kalol</b>
                          </h2>{" "}
                          <br />
                          <h4>Swaminarayan Ayurvedic College, Kallol</h4> <br />
                          <h5>AYURVEDACHARYA(B.A.M.S.)-FOURTH PROFESSIONAL EXAMINATION - September - 2022
</h5>
                        </div>
                      </div>
                      
                    </div>
                    <div className="row mt-4 ">
                      <div className="col-md-12 justify-content-center">
                        <div className="">
                          <h5 className="text-center">
                         Attendance List (Block A)
                          </h5>
                        </div>{" "}
                      </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Seat No.</th>
                                        <th>USN</th>
                                        <th width={"30%"}>Student Name</th>
                                        <th>Gender</th>
                                        <th>Answer Booklet No.</th>
                                        <th width={"20%"}> Attandence </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {
                        infoData && infoData?.map((data, key) => {
                          return <tr key={key}>
                           
                            <td>{data.seatno}</td>
                            <td > {data.regno}</td>
                            <td > {data.name}</td>

                           
                            <td > {data.gender}</td>
                            <td> <input type="text" className='form-control' /></td>
                            <td><>
  <div className="custom-control custom-radio custom-control-inline">
    <input
      type="radio"
      id="present"
      name="attend"
      className="custom-control-input" checked
    />
    <label className="custom-control-label" htmlFor="present">
      Present
    </label>
  </div>
  <div className="custom-control custom-radio custom-control-inline">
    <input
      type="radio"
      id="absent"
      name="attend"
      className="custom-control-input"
    />
    <label className="custom-control-label" htmlFor="absent">
     Absent
    </label>
  </div>
</>
</td>

                  


                          
                          </tr>
                          
                        })
                    }
                    </tbody>
                            </table>
                        </div>
                    </div>

         
        </div>
       
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            name="submit"
            value="subject"
          >
            <i className="fa fa-save" aria-hidden="true" /> &nbsp;Save
          </button>
        </div>
      </div>
    </div>
  </div>
</>

    </div>
  )
}

export default ModalAddAttendance