import React from 'react'

function EditStudentDetails() {
  return (
    <div className='EditStudentDetails'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Students Admission</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Students Information</a>
                </li>
                <li className="breadcrumb-item active">Student Admission</li>
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
              <div className="row">
                <div className="col-md-4">
                  <h4 className="card-title">Register</h4>
                </div>
              </div>
              <form action="" encType="multipart/form-data" method="POST">
                <br />
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Admission Number<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder=" Enter Admission Number"
                        name="number"
                        defaultValue=""
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Admission Date <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        defaultValue=""
                        className="form-control"
                        id="date"
                        name="date"
                        readOnly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Class <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="class"
                        id="class"
                        className="form-control"
                        required=""
                      >
                        <option value=""> Select Class</option>
                        <option value="">s</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Section <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="section"
                        id="section"
                        className="form-control"
                        required=""
                      >
                        <option value="">Select Section</option>
                        <option value="" selected="" />
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
      <br />
      {/* end page title */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4 className="card-title">Personal Details</h4>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      First Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      id="fname"
                      placeholder=" Enter First Name"
                      name="fname"
                      required="required"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Middle Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      id="mname"
                      name="mname"
                      required="required"
                      placeholder="Enter Middle Name"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      {" "}
                      Last Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      id="lname"
                      name="lname"
                      required="required"
                      placeholder="Enter Last Name"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Gender <span style={{ color: "red" }}>*</span>
                    </label>
                    <select name="gender" id="gender" className="form-control">
                      <option value="null">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Date of Birth<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Email<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email ID"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                    >
                      <option> Pleace Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Religion</label>
                    <input
                      type="text"
                      className="form-control"
                      id="religion"
                      name="religion"
                      placeholder="Enter Religion"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Caste</label>
                    <input
                      type="text"
                      className="form-control"
                      id="caste"
                      name="caste"
                      placeholder="Enter Caste"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Mobile<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter Contact Number"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Roll Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="roll"
                      name="roll"
                      placeholder="Enter Roll Number"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Student Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="std_image"
                      name="std_image"
                      defaultValue=""
                    />
                    <a href="#" data-lightbox="photos" target="_blank">
                      <img
                        id="blah"
                        name="std_photo1"
                        width={100}
                        src=""
                        alt="your image"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of Personal Details */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Parent Guardian Details</h4>
              <hr />
              <br />
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Father Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fathername"
                      placeholder=" Enter Full Name"
                      name="fathername"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Contact Number<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="fcontact"
                      name="fphone"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Occupation <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text "
                      className="form-control"
                      id="focupation"
                      name="focupation"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01"> Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="fphoto"
                      name="fphoto"
                      defaultValue=""
                    />
                    <a href="#" data-lightbox="photos" target="_blank">
                      <img
                        id="blah"
                        name="fphoto1"
                        width={100}
                        src=""
                        alt="your image"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Mother Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mothername"
                      placeholder=" Enter Full Name"
                      name="mothername"
                      required="required"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="mcontact"
                      name="mphone"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Occupation </label>
                    <input
                      type="text "
                      className="form-control"
                      id="mocupation"
                      name="mocupation"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group photos">
                    <label htmlFor="validationCustom01"> Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="mphoto"
                      name="mphoto"
                      defaultValue=""
                    />
                    <a href="" data-lightbox="photos" target="_blank">
                      <img
                        id="blah"
                        name="mphoto1"
                        width={100}
                        src=""
                        alt="your image"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-2">
                  <p className="card-title">
                    {" "}
                    Guardian is:<span style={{ color: "red" }}>*</span>
                  </p>
                </div>
                <div className="col-md-10">
                  <input
                    type="radio"
                    name="guardian"
                    id="guardian"
                    defaultValue="Father"
                  />{" "}
                  Father &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="guardian"
                    id="guardian"
                    defaultValue="Mother"
                  />{" "}
                  Mother&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="guardian"
                    id="guardian"
                    defaultValue="Other"
                  />{" "}
                  Other
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Guardian Name </label>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      defaultValue=""
                      type="text "
                      className="form-control"
                      id="gname"
                      name="gname"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Guardian Relation{" "}
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="form-control"
                      id="relation"
                      name="relation"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Guardian Email </label>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      type="text "
                      defaultValue=""
                      className="form-control"
                      id="gemail"
                      name="gemail"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Guardian Photo </label>
                    <input
                      type="file"
                      className="form-control"
                      id="gphoto"
                      name="gphoto"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Guardian Phone </label>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      type="text "
                      className="form-control"
                      id="gphone"
                      name="gphone"
                      required=""
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Guardian Occupation{" "}
                    </label>
                    <input
                      type="text "
                      className="form-control"
                      id="goccupation"
                      name="goccupation"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Address </label>
                    <span style={{ color: "red" }}>*</span>
                    <textarea
                      className="form-control"
                      name="address"
                      id="address"
                      cols={10}
                      rows={1}
                      required=""
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="row float-right">
                <button
                  className="btn btn-success btn-rounded btn-outline"
                  type="submit"
                  name="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
    </div>
    <input type="hidden" name="page_name" defaultValue="std_edit" />
    <input type="hidden" name="fphoto1" defaultValue="" />
    <input type="hidden" name="mphoto1" defaultValue="" />
    <input type="hidden" name="sphoto1" defaultValue="" />
    <input type="hidden" name="stdid" defaultValue="" />
    {/* container-fluid */}
  </div>
  {/* End Page-content */}
</div>

    </div>
  )
}

export default EditStudentDetails