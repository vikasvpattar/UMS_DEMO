import React from 'react'

function AddDesignation() {
  return (
    <div className='AddDesignation'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Designation</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Human Resource</a>
                </li>
                <li className="breadcrumb-item active"> Add Designation</li>
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
              <h2 className="card-title">Add Criteria</h2>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Add Designation<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Designation Name"
                      name="designation"
                      id="designation"
                      required="required"
                    />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 ml-auto">
                  <button
                    className="btn btn-nex btn-rounded float-right "
                    type="submit"
                    name="submit"
                  >
                    <i className="fa fa-save" aria-hidden="true" /> Save
                  </button>
                </div>
              </div>
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
                  <h4 className="card-title"> Designation Lists</h4>
                </div>
                <div className="col-md-8 ">
                  <span className="float-right">
                    <acronym title="PDF">
                      {" "}
                      <a href="#">
                        <i className="fa fa-file-pdf-o " aria-hidden="true" />
                      </a>
                    </acronym>
                    <a href="#"> </a> &nbsp;{" "}
                    <acronym title="Excel">
                      <a href="#">
                        {" "}
                        <i className="fa fa-file-excel-o" aria-hidden="true" />
                      </a>
                    </acronym>
                    <a href="#"> </a>
                  </span>
                </div>
              </div>
              <hr />
              <table
                id="datatable-buttons"
                className="table table-bordered dt-responsive nowrap table-hover "
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%"
                }}
              >
                <thead>
                  <tr>
                    <th> Sl. No.</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td />
                    <td>
                      <a href="javascript:void(0)">
                        {" "}
                        <i className="fa fa-trash" aria-hidden="true" />{" "}
                      </a>{" "}
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td colSpan={5}>
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
                </tbody>
              </table>
              <br />
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

export default AddDesignation