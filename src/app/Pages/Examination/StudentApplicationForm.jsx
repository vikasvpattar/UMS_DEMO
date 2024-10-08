import React, { useState } from "react";

function StudentApplicationForm() {
  const [infoData, setInfoData] = useState([
    {
      subcode: "ML-01",
      subject: "Machine Learning",

      status: <p className="badge badge-soft-success">Applied</p>,
    },
    {
      subcode: "CN-02",
      subject: "Computer Networking",

      status: <p className="badge badge-soft-danger">Not-Applied</p>,
    },
  ]);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Student Application Form</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Examination</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Student Application Form
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Student Details</h2>
                    <br />
                    <table className="table table-bordered text-center ">
                      <tr className="bg-secondary text-white">
                        <th> Reg. Number</th>
                        <th>Student Name</th>
                        <th>Course-Faculty</th>
                        <th>Branch</th>
                        <th>Student Photo</th>
                      </tr>
                      <tr>
                        <td>2KA16CS002</td>
                        <td>Abhishek Badiger</td>
                        <td>UG-Engineering</td>
                        <td>Computer Science</td>
                        <td rowSpan={3}>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            calss="img-fluid ml-auto"
                            alt="Maxwell Admin"
                            style={{ borderRadius: "50%" }}
                            width="20%"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-secondary text-white">
                          College Name
                        </th>
                        <td colSpan={3}>
                          Swaminarayana Ayurvedic College,Kallol.
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-secondary text-white">Course Year</th>
                        <td>1st Year - 2nd Semester </td>
                        <th className="bg-secondary text-white">Date</th>
                        <td className="">Sept-2022</td>
                      </tr>
                    </table>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">Subject List</h1>
                    <br />
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>Subject Code</th>
                          <th>Subject Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {infoData &&
                          infoData?.map((data, key) => {
                            return (
                              <tr key={key}>
                                <td>{data.subcode}</td>
                                <td>{data.subject}</td>

                                <td>{data.status}</td>

                                <td>
                                  <button className="btn btn-danger">
                                    <i
                                      class="fa fa-check "
                                      aria-hidden="true"
                                    ></i>{" "}
                                    Apply
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5> Fee Detials</h5>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered text-center ">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th>Sl. No.</th>
                          <th>Description</th>
                          <th>Fee (Rs.)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Examination Fees</td>
                          <td>200</td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Marks Card Fees</td>
                          <td>20</td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Application Fee</td>
                          <td>20</td>
                        </tr>
                        <tr>
                          <td>04</td>
                          <td>Penalty Fee</td>
                          <td>0</td>
                        </tr>
                        <tr className="bg-light">
                          <th className="text-right " colSpan={2}>
                            Total Amount (Rs.):
                          </th>
                          <th>240</th>
                        </tr>
                      </tbody>
                    </table>
                    <div className="row mt-5 mb-5">
                      <div className="col-md-12">
                        <h5>Disclaration</h5>
                        <p className="ml-5">
                          {" "}
                          The Subjects Listed in this Application are the only
                          Subjects wish to apply for September-2022 Examination.
                          Further I Understand this Application Overrides any
                          Previous Applications. I may have Submitted.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-6">
                        <h6>Date: 06.09.2022</h6>
                      </div>
                      <div className="col-md-5">
                        <button className="btn btn-success float-right">
                          {" "}
                          Submit
                        </button>
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

export default StudentApplicationForm;
