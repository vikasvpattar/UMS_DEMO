import React from "react";

function StudentComplaint({ data }) {
  let clgdata = JSON.parse(localStorage.getItem("COLLEGE"));

  var dateObject = new Date(data?.date);

  // Format the date as "YYYY-MM-DD"
  var year = dateObject.getFullYear();
  var month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  var day = ("0" + dateObject.getDate()).slice(-2);
  var formattedDate = year + "-" + month + "-" + day;

  return (
    <div
      className="modal fade text-left"
      id="ComplaintModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Student Complaint
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Student ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="student_id"
                        readOnly
                        value={data?.student_id}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Name </label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        name="name"
                        value={data?.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Faculty </label>
                      <input
                        type="text"
                        className="form-control"
                        name="faculty"
                        value={
                          clgdata?.filter((s) => s.id == data?.faculty)[0]?.name
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label> Complaint </label>
                      <textarea
                        type="textbox"
                        className="form-control"
                        name="complaint"
                        readOnly
                        value={data?.complaint}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="">Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data?.gender}
                        name="gender"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="">Date Of Birth</label>
                      <input
                        type="date"
                        readOnly
                        className="form-control"
                        value={data.dob ? data?.dob.split("T")[0] : null}
                        name="dob"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="">Date Of Complaint Submission</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formattedDate}
                        name="date"
                      />
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

export default StudentComplaint;
