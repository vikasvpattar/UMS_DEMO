import React from 'react'

function ModalAddAttendance() {
  return (
    <div>

<>
  {/* assign Students */}
  <div
    className="modal fade"
    id="assign"
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
                  <option value=""> 2015 - 2016</option>
                  <option value=""> 2016 - 2017</option>
                  <option value=""> 2017 - 2018</option>
                  <option value=""> 2018 - 2019</option>
                  <option value=""> 2019 - 2020</option>
                  <option value=""> 2020 - 2021</option>
                  <option value=""> 2021 - 2022</option>
                  <option value=""> 2022 - 2023</option>
                  <option value=""> 2023 - 2024</option>
                  <option value=""> 2024 - 2025</option>
                  <option value=""> 2025 - 2026</option>
                  <option value=""> 2026 - 2027</option>
                  <option value=""> 2027 - 2028</option>
                  <option value=""> 2028 - 2029</option>
                  <option value=""> 2029 - 2030</option>
                  <option value=""> 2030 - 2031</option>
                </select>
              </div>
            </div>
           
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                className="btn btn-primary btn-rounded btn-sm  float-right"
                type="button"
                name="submit"
                onclick="searchStud()"
              >
                <i className="fa fa-search" aria-hidden="true" /> Search
              </button>
            </div>
          </div>
          <br />
          <form>
            <div className="row">
              <div className="col-md-12" id="studdata">
                <table
                  id="datatable"
                  className="table table-bordered dt-responsive nowrap table-hover "
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    width: "100%"
                  }}
                >
                  <thead>
                    <tr>
                      <th width="30px">
                        <input
                          type="checkbox"
                          name="select-all"
                          id="select-all"
                        />{" "}
                        &nbsp;&nbsp;&nbsp;All
                      </th>
                      <th>USN</th>
                      <th>Student Name</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultValue=""
                          name="checkbox-1"
                          id="checkbox-1"
                        />
                      </td>
                      <td>001</td>
                      <td>Abhishek C B</td>
                      <td>Male</td>
                    </tr>
                  </tbody>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
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

export default ModalAddAttendance