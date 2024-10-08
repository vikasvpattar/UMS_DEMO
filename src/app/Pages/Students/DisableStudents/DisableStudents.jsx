import React from 'react'

function DisableStudents() {
  return (
    <div className='DisableStudents'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0"> Disable Students Details</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Students Information</a>
                </li>
                <li className="breadcrumb-item active">
                  {" "}
                  Disable Students Details
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Select Criteria</h2>
              <br />
              <form
                className="needs-validation"
                action=""
                method="POST"
                noValidate=""
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Class<span style={{ color: "red" }}>*</span>
                      </label>
                      <select name="class" id="class" className="form-control">
                        <option value=""> Select Class</option>
                        <option value="" />
                        <option value="" />
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor='d"validationCustom01"'>
                        Section <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="section"
                        id="section"
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="" selected="" />
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row float-left">
                  <button
                    className="btn btn-primary btn-rounded  "
                    type="submit"
                    name="submit"
                  >
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
      {/* container-fluid */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <h4 className="card-title">Students Details</h4>
                </div>
                <div className="col-md-8 ">
                  <span className="float-right">
                    <a href="#">
                      <i className="fa fa-file-pdf-o " aria-hidden="true" />
                    </a>{" "}
                    &nbsp;{" "}
                    <a href="#">
                      <i className="fa fa-file-excel-o" aria-hidden="true" />
                    </a>{" "}
                  </span>
                </div>
              </div>
              <div className="table-responsive">
                <hr />
                <table
                  id="datatable"
                  className="table table-bordered  nowrap table-hover"
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    width: "100%"
                  }}
                >
                  <thead>
                    <tr>
                      <th>Admission No.</th>
                      <th>Roll Number</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Guardian Name</th>
                      <th>Date of Birth</th>
                      <th>Gender</th>
                      <th>Mobile Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>
                        <a href="javascript:void(0)">
                          <i className="fa fa-edit " aria-hidden="true" />
                        </a>{" "}
                        &nbsp;{" "}
                        <a href="javascript:void(0)">
                          {" "}
                          <i className="fa fa-eye " aria-hidden="true" />{" "}
                        </a>{" "}
                      </td>
                    </tr>
                    <tr>
                      {" "}
                      <td colSpan={10}>
                        <div align="center" className="text-danger">
                          No data available in table <br /> <br />
                          <img src="/assets/images/addnewitem.svg" width={150} />
                          <br />
                          <br />{" "}
                          <span className="text-success bolds">
                            <i className="fa fa-arrow-left" /> Add new record or
                            search with different criteria.
                          </span>
                          <div />
                        </div>
                      </td>
                    </tr>
                    {/* <tr> <td colspan="9">
                                      <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                                      </tr> </td> </tbody> */}
                    {/* <tr> <td colspan="9">
                                      <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                                      </tr> </td> </tbody> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end row */}
    </div>
    {/* End Page-content */}
  </div>
</div>

    </div>
  )
}

export default DisableStudents