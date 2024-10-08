import React from "react";

function ModalAdmissionEnquirryFollowUp({ key }) {
  return (
    <div
      className="modal fade"
      id={`followup-${key}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
        role="document"
      >
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Follow up Admission Enquiry
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
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Follow Up Date <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="text"
                        className="form-control"
                        name="followup"
                        id=""
                        readOnly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Next Follow Up Date{" "}
                        <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="date"
                        className="form-control"
                        name="nextfollowup"
                        id="nextfollowup"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Response <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="text"
                        className="form-control"
                        name="response"
                        id="response"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable> Note </lable>
                      <input
                        type="text"
                        className="form-control"
                        name="note"
                        id="note"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="hidden" name="enquiry_id" id="enquiry_id" />
                      <input type="hidden" name="page_name" />
                      <button
                        type="button float-right"
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <h4>Follow Up (Manju)</h4>
                <section className="experience pb-100" id="experience">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8 mx-auto text-center">
                        <div className="section-title"></div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12" id="followdetails"></div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-md-4 bg-light">
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <div className="form-group">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-8">
                            <h3 className="card-title"> Summarry</h3>
                            <p
                              className="text-mute text-sm"
                              style={{ fontSize: 12 }}
                            >
                              Created by:
                              <span id="data15" />
                            </p>
                          </div>
                          <div className="col-md-4 ">
                            <h3 className="card-title "> Status</h3>
                            <select
                              name=""
                              onchange="updateStatus(this.value)"
                              id="data14"
                              className="form-control"
                            >
                              <option value="Active">Active</option>
                              <option value="Passive">Passive</option>
                              <option value="Won">Won</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </div>
                        </div>
                        <hr />
                        <p className="" style={{ fontSize: 13 }}>
                          <i className="fa fa-calendar-check-o" /> Enquiry Date:
                          <span id="data2" />
                        </p>
                        <p className="" style={{ fontSize: 13 }}>
                          <i className="fa fa-calendar-check-o" /> Last
                          Follow-Up Date:
                          <span id="data3" />
                        </p>
                        <p className="" style={{ fontSize: 13 }}>
                          <i className="fa fa-calendar-check-o" /> Next
                          Follow-Up Date:
                          <span id="data4" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Phone:</b> <span id="data5" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Address:</b> <span id="data6" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Refernce:</b> <span id="data7" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> note:</b> <span id="data8" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Source:</b> <span id="data9" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Assignd to:</b> <span id="data10" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Email:</b> <span id="data11" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> Class:</b> <span id="data12" />
                        </p>
                        <p className="text-dark" style={{ fontSize: 14 }}>
                          <b> No. of Child:</b> <span id="data13" />
                        </p>
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
  );
}

export default ModalAdmissionEnquirryFollowUp;
