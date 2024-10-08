import React from 'react'

function ModalCreateSeatingArreangements() {
  return (
    <div
    className="modal fade"
    id="create"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
                  <div className="modal-dialog mw-100 w-100 ">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
                                  Seating Arrangements
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

                                    <input type="text" name="speci" id="speci"  readOnly value={"Engineering"} className="form-control" />
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
                            
           <div className="row mt-3">
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="">Departments</label>
                    <select name="department" id="depatment" className='form-control'>
                        <option value="">Select Departments</option>
                        <option value="">Computer Science</option>
                        <option value="">Electronics and coummunications </option>
                    </select>
                </div>
            </div>
            <div className="col-md-3">  <div className="form-group">
                <label htmlFor="">No. of Students</label>
                <input type="text" name="total_student" id="total_student" readOnly value={"60"} className="form-control" />
            </div></div>
            
          <div className="col-md-3">  <div className="form-group">
                <label htmlFor="">Class Capacity</label>
                <input type="text" name="capacity" id="capacity" value={"25"}className="form-control" />
            </div></div>
            <div className="col-md-3">  <div className="form-group">
                <label htmlFor="">Total Exam Blocks</label>
                <input type="text" name="total_blocks" id="total_blocks" readOnly value={"3"} className="form-control" />
            </div></div>
           </div>
          
                             <div className="row mt-4">
                                <div className="col-md-12">
                                <button className="btn btn-danger float-right">Create</button>

                                </div>
                             <div className="col-lg-12  mt-3 table-responsive ">
 
</div>

                             </div>


                          </div>
                          
                      </div>

                      {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
              </div>
  )
}

export default ModalCreateSeatingArreangements