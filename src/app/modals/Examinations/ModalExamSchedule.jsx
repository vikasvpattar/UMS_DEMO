import React, { useState } from 'react'


function ModalCreateTimetable() {


    
    const [infoData, setInfoData] = useState([
        {
        type: "Selective",
        subject: "Sharira Kriya",
        date:"01.08.2022",
        from:"10:00 AM",
        to:"12:00 PM",
        duration:"180",

      min:"50",

      max:"100",
      invigilator:"Dr. Abhishek C B"
      
        },
        {
            type: "Selective",
            subject: "Sharira Rachana",
            date:"01.08.2022",
            from:"10:00 AM",
            to:"12:00 PM",
            duration:"180",
    
          min:"50",
    
          max:"100",
          invigilator:"Dr. Abhishek C B"
          
            },
       
    ])
  return (
    <div
    className="modal fade"
    id="view"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
                  <div className="modal-dialog mw-100 w-100 ">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
                                  Time Table
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
                            <div className="row">
                                <div className="col-md-2">
                                    <label htmlFor="">Course</label>
                                    <input type="text" name='course' id="course" readOnly value={"UG"} className="form-control" />
                                </div>
                                <div className="col-md-2">
                                <label htmlFor="">Specialization</label>

                                    <input type="text" name="speci" id="speci"  readOnly value={"Ayurveda"} className="form-control" />
                                </div>
                                <div className="col-md-2">
                                <label htmlFor="">Course Year</label>

                                    <input type="text" name="year" id="year" readOnly value={"1st Year"} className="form-control" />
                                </div>
                                <div className="col-md-2">
                                <label htmlFor="">Semester</label>

                                    <input type="text" name="sem" id="sem" readOnly value={"1st Semester"} className="form-control" />
                                </div>
                                <div className="col-md-2">
                                <label htmlFor="">Date</label>

                                    <input type="text" name="date" id="date" readOnly value={"08.2022"} className="form-control" />
                                </div>
                                <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="validationCustom02">
                   Academic Year
                </label>
                <input type="text" name="academic_year" value={"2021-22"} readOnly className="form-control" />
              </div>
            </div>
                            </div>
                            
           
          
                             <div className="row mt-4">
                                <div className="col-md-12">
                                <button className="btn btn-danger float-right">Print</button>

                                </div>
                             <div className="col-lg-12  mt-3 table-responsive ">
  <table className="table table-bordered nowrap table-hover " id="tab_logic">
    <thead>
      <tr>
        <th>Subject Type</th>
        <th>Subjects</th>
        <th>Date</th>
        <th> From</th>
        <th> To</th>
        <th>
          Duration <br /> (in min)
        </th>
      
        <th> Max Marks</th>
        <th>Min Marks</th>
        <th>Invigilator Name</th>
       
      </tr>
    </thead>
    <tbody>
   
            {
              infoData && infoData?.map((data, key) => {
                return <tr key={key}>
                  
                  <td>{data.type}</td>
                  <td > {data.subject}</td>
                  <td > {data.date}</td>

                  <td > {data.from}</td>
                  <td> {data.to}</td>

                  <td> {data.duration}</td>
                  <td> {data.max}</td>

                  <td> {data.min}</td>
                  <td> {data.invigilator}</td>



                  


                  
                </tr>
                
              })


            }
          </tbody>
  </table>
</div>

                             </div>


                          </div>
                          <div className="modal-footer">
                          <button type="button" class="btn btn-primary">Publish Exam</button>
                          </div>
                      </div>

                      {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
              </div>
  )
}

export default ModalCreateTimetable