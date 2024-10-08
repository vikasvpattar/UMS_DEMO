import React from 'react'

function DesignHallTicket() {
  return (
    <div ClassName ="DesignHallTicket">
    <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Hall Ticket </h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Examinations</a>
                </li>
                <li className="breadcrumb-item active"> Hall Ticket</li>
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
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Templete Name</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control  "
                        id="templete"
                        placeholder=" Enter Templete Name"
                        name="templete"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Heading</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="heading"
                        placeholder=" Enter Heading"
                        name="heading"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="title"
                        placeholder=" Enter Title"
                        name="title"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Exam Name</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="exam_name"
                        placeholder=" Enter Exam Name"
                        name="exam_name"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">College Name</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="school_name"
                        placeholder=" Enter College Name"
                        name="school_name"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Exam Center</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="exam_center"
                        placeholder=" Enter Exam Center "
                        name="exam_center"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Footer Text</label>
                      <input
                        type="text"
                        className="form-control  "
                        id="footer"
                        placeholder=" Enter Footer Text "
                        name="footer"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Left Logo</label>
                      <input
                        type="file"
                        className="form-control  "
                        id="left_logo"
                        placeholder=" Enter Footer Text "
                        name="left_logo"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Right Logo</label>
                      <input
                        type="file"
                        className="form-control  "
                        id="right_logo"
                        name="right_logo"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Signature</label>
                      <input
                        type="file"
                        className="form-control  "
                        id="sign"
                        name="sign"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="">Background Image</label>
                      <input
                        type="file"
                        className="form-control  "
                        id="background"
                        name="background"
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Name :
                    </label>
                    <div className="form-check ">
                      <input type="checkbox" id="switch1" switch="success" />
                      <label
                        htmlFor="switch1"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="" className="ml-4">
                      {" "}
                      Mother Name :
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch2"
                        switch="success"
                        defaultValue="Mother Name"
                        v=""
                      />
                      <label
                        htmlFor="switch2"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-2 justify-item-center">
                    <label htmlFor="" className="ml-4">
                      Father Name :
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch3"
                        switch="success"
                        defaultValue="Father Name"
                      />
                      <label
                        htmlFor="switch3"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      DOB
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch4"
                        switch="success"
                        defaultValue="DOB"
                      />
                      <label
                        htmlFor="switch4"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="" className="ml-4">
                      Admission No
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch5"
                        switch="success"
                        defaultValue="Admission No"
                      />
                      <label
                        htmlFor="switch5"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Roll No
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch6"
                        switch="success"
                        defaultValue="Roll No"
                      />
                      <label
                        htmlFor="switch6"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Address
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch7"
                        switch="success"
                        defaultValue="Address"
                      />
                      <label
                        htmlFor="switch7"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Gender
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch8"
                        switch="success"
                        defaultValue="Gender"
                      />
                      <label
                        htmlFor="switch8"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Photo
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch9"
                        switch="success"
                        defaultValue="Photo"
                      />
                      <label
                        htmlFor="switch9"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Class
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch10"
                        switch="success"
                        defaultValue="Class"
                      />
                      <label
                        htmlFor="switch10"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <label htmlFor="" className="ml-4">
                      Section
                    </label>
                    <div className="form-check ">
                      <input
                        type="checkbox"
                        id="switch11"
                        switch="success"
                        defaultValue="Section"
                      />
                      <label
                        htmlFor="switch11"
                        data-on-label="Yes"
                        data-off-label="No"
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 ml-auto">
                    {/* <button class="btn btn-nex btn-rounded btn-sm " type="submit" name="add" onclick= "return false"><i class="fa fa-plus" aria-hidden="true" ></i> Add lesson</button>
                              <br><br> */}
                    <button
                      className="btn btn-nex btn-rounded float-lg-right "
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
                  <h4 className="card-title">Certificates Lists</h4>
                </div>
                <div className="col-md-8 ">
                  <span className="float-right">
                    {" "}
                    <a href="#" data-toggle="tooltip" title="PDF">
                      <i className="fa fa-file-pdf-o " aria-hidden="true" />
                    </a>{" "}
                    &nbsp;{" "}
                    <a href="#" data-toggle="tooltip" title="Excel">
                      {" "}
                      <i
                        className="fa fa-file-excel-o"
                        aria-hidden="true"
                      />{" "}
                    </a>
                  </span>
                </div>
              </div>
              <hr />
              <table
                id="datatable"
                className="table table-bordered dt-responsive  table-hover text-center "
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%"
                }}
              >
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Certificate Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <a href="">Sample Certificate</a>
                    </td>
                    <td>
                      <a
                        href=""
                        data-toggle="modal"
                        data-target="#preview"
                        title="View Certificate"
                        className="badge badge-success"
                      >
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>{" "}
                      <a
                        href=""
                        data-toggle="tooltip"
                        title="Edit Certificate"
                        className="badge badge-success"
                      >
                        <i className="fa fa-pencil" aria-hidden="true" />
                      </a>{" "}
                      <a
                        href=""
                        data-toggle="tooltip"
                        title="Delete Certificate"
                        className="badge badge-danger"
                      >
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>{" "}
                    </td>
                  </tr>
                  {/* <tr> <td colspan="6">
                          <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                         </td>  </tr>  */}
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
  </div>
</div>

    </div>
  )
}

export default DesignHallTicket