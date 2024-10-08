import React from 'react'
import { useState } from 'react'

function DownloadAttendanceList() {
   
    
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

<div className="main-content">
        <div className="page-content">
          <div className="container-fluid"></div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body">
                  <div>
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
                                        <th width={"40%"}>Student Name</th>
                                        <th>Gender</th>
                                        <th>Answer Booklet No.</th>
                                        <th>Student Sign</th>
                                        <th>Invigilator Sign</th>
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
                            <td></td>

<td></td>
<td></td>
                            


                          
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
    </div>
  )
}

export default DownloadAttendanceList