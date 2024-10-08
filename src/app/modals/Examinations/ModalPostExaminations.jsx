import React from 'react'
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";

function ModalPostExaminations() {
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
         Add Details
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
              <div className="form-group">
                <label htmlFor="validationCustom02">Course</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue="UG"
                  id="course"
                  name="course" readOnly
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="validationCustom02">Specialization</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue="Ayurveda"
                  id="speci"
                  name="speci" readOnly
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="validationCustom02">Course Year</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue="1stYear"
                  id="year"
                  name="year" readOnly
                />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="validationCustom02">Semester</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue="1st Sem"
                  id="sem"
                  name="sem" readOnly
                />
              </div>
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
           
           <div className="col-md-2">
            <div className="form-group">
                <label htmlFor="">Invigilator</label>
                <input type="text" name='invigilator' value={"Abhishek"} readOnly className="form-control" />
            </div>
           </div>
          </div>
          
          <br />
       <div className="row mt-3">
        <div className="col-md-3">
            <div className="form-group">
                <label htmlFor="">Total No. of Answers Booklets Given</label>
                <input type="number" name='booklets_given' className="form-control" />

            </div>
        </div>
        <div className="col-md-3">
            <div className="form-group">
                <label htmlFor="">Total No. of Answers Booklets Left</label>
                <input type="number" name='booklets_left' className="form-control" />

            </div>
        </div>
        <div className="col-md-3">
            <div className="form-group">
                <label htmlFor="">Total No. of Supplementary Given</label>
                <input type="number" name='sup_given' className="form-control" />

            </div>
        </div>
        <div className="col-md-3">
            <div className="form-group">
                <label htmlFor="">Total No. of Supplementary Left</label>
                <input type="number" name='sup_left' className="form-control" />

            </div>
        </div>
       </div>
       <div className="row">
    <div className="col-md-3">
        <div className="form-group">
            <label htmlFor="">Number of Absent Students</label>
            <input type="number" className='form-control' />
        </div>

    </div>

    <div className="col-md-3">
        <div className="row">
            <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="">Enter Seat Number</label>
            <input type="text" className='form-control'  />
        </div>
            </div>
            <div className="col-md-12">
                <button className="btn btn-success btn-sm float-right">+</button>
            </div>
        </div>

    </div>
</div>
       <div className="row">
    <div className="col-md-3">
        <div className="form-group">
            <label htmlFor="">Number of Malpractice Case</label>
            <input type="number" className='form-control' />
        </div>

    </div>

    <div className="col-md-3">
        <div className="row">
            <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="">Enter Seat Number</label>
            <input type="text" className='form-control'  />
        </div>
            </div>
            <div className="col-md-12">
                <button className="btn btn-success btn-sm float-right">+</button>
            </div>
        </div>

    </div>
</div>


        </div>

<br />



        <input type="hidden" name="id" defaultValue="" />
        <input type="hidden" name="examid" id="examid1" defaultValue="" />
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

export default ModalPostExaminations