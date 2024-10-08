import React from 'react'
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";

function ModalCreateTimetable() {
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
                                  Create Time Table
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
                   Academic Year<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="section"
                  className="form-control"
                  id="section"
                  required=""
                >
                  <option value=""> Select Academic Year </option>
                  {sessionOpt &&
                    sessionOpt?.map((item, key) => {
                      return (
                        <option value={item?.id}>{item?.name}</option>
                      );
                    })}
                </select>
              </div>
            </div>
                            </div>
                            
           
          
                             <div className="row mt-4">
                             <div className="col-lg-12  table-responsive ">
  <table className="table table-bordered nowrap table-hover " id="tab_logic">
    <thead>
      <tr>
        <th>Subject Type</th>
        <th>Subjects</th>
        <th>Date</th>
        <th>Time From</th>
        <th>Time To</th>
        <th>
          Duration <br /> (in min)
        </th>
      
        <th> Marks (Max..)</th>
        <th>Marks (Min..)</th>
       
        <th />
      </tr>
    </thead>
    <tbody id="examsub">
      {/* <div></div> */}
      <tr id="addr0">
        <td>
          <select name="subtype[]" className="form-control">
            <option value="">Subject Type</option>
            <option value="">Elective</option>
            <option value="">Non-Elective</option>
          </select>
        </td>
        <td>
          <select name="sub[]" className="form-control">
            <option value="">Select Subject</option>
          </select>
        </td>
        <td>
          <input type="date" name="date[]" id="" className="form-control" />
        </td>
        <td>
          <input type="time" name="timefrom[]" id="" className="form-control" />
        </td>
        <td>
          <input
            type="time"
            name="timeto[]"
            id=""
            className="form-control"
            placeholder=""
          />
        </td>
        <td>
          <input
            type="number"
            name="duration[]"
            id=""
            className="form-control"
            placeholder={1}
            readOnly="readOnly"
            value={"180"}
          />
        </td>
        
        <td>
          <input
            type="number"
            name="max[]"
            id=""
            className="form-control"
            placeholder="Maximum Marks "
          />
        </td>
        <td>
          <input
            type="number"
            name="min[]"
            id=""
            className="form-control"
            placeholder="Minimum Marks"
          />
        </td>
       
        <td>
          <a
            id="delete_row"
            className="pull-right btn btn-danger text-white btn-sm"
          >
            Delete{" "}
          </a>
        </td>
      </tr>
      <tr id="addr1" />
    </tbody>
  </table>
</div>

                             </div>
<a id="add_row" className="btn btn-primary btn-sm text-white float-right">Add Row</a>

                          </div>
                          <div className="modal-footer">
                          <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                      </div>

                      {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
              </div>
  )
}

export default ModalCreateTimetable