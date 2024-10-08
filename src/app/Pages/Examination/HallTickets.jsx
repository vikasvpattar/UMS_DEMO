import React from "react";

function HallTickets() {
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid"></div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body">
                  <div>
                    <div className="row align-items-center ">
                      <div className="col-md-2">
                        <img
                          src="/assets/images/Nexenstial Logo.png"
                          width={150}
                          alt=""
                          srcset=""
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="justify-content-center text-center">
                          <h2 className="text-uppercase mb-3">
                            <b>Swaminarayan University, Kalol</b>
                          </h2>{" "}
                          <br />
                          <h4>Swaminarayan Ayurvedic College, Kallol</h4> <br />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          calss="img-fluid ml-auto"
                          alt="Maxwell Admin"
                          style={{ borderRadius: "50%" }}
                          width="100"
                        />
                      </div>
                    </div>
                    <div className="row  ">
                      <div className="col-md-12 justify-content-center">
                        <div className="">
                          <h5 className="text-center">
                            Admit Card <br /> (September - 2022)
                          </h5>
                        </div>{" "}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <table className="table table-bordered">
                          <tr>
                            <td>
                              <p>
                                {" "}
                                <b>USN No.:</b> 2KA16CS002
                              </p>
                            </td>

                            <td>
                              <p>
                                {" "}
                                <b>Appearance Type:</b> Fresh
                              </p>
                            </td>
                            <td>
                              <p>
                                {" "}
                                <b>Attempts:</b> Fresh
                              </p>
                            </td>
                            <td>
                              <p>
                                {" "}
                                <b>Seat No:</b> Fresh
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <p>
                                {" "}
                                <b>Student Name:</b>{" "}
                                <span
                                  className="text-uppercase"
                                  style={{
                                    fontSize: "18px",
                                    color: "black",
                                    fontWeight: "500",
                                  }}
                                >
                                  Abhishek Badiger
                                </span>
                              </p>
                            </td>
                            <td colSpan={"2"}>
                              <p>
                                {" "}
                                <b>Gender: </b> Male
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              <p>
                                {" "}
                                <b>Examination Center:</b>{" "}
                                <span
                                  className="text-uppercase"
                                  style={{
                                    fontSize: "18px",
                                    color: "black",
                                    fontWeight: "500",
                                  }}
                                >
                                  Swaminarayan Ayurvedic College, Kalol.
                                </span>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <h5>Theory Paper Details</h5>

                        <table className="table table-bordered" width={"100%"} style={{border:"2px, solid, black"}}>
                          <tr>
                            <th width={"40%"}>Paper Name</th>
                            <th>Date & Time </th>
                            <th> Invigilator Sign</th>
                          </tr>
                          <tr>
                            <td>Kayachikitsa-1</td>
                            <td>12/09/2022 -----09:00 am to 1:00 pm</td>
                            <td></td>
                          </tr>
                          
                          <tr>
                            <td>Kayachikitsa-2</td>
                            <td>13/09/2022 -----09:00 am to 1:00 pm</td>
                            <td></td>
                          </tr>

                        </table>

                        <h5>Practical Paper Details</h5>

<table className="table table-bordered " width={"100%"} style={{border:"2px, solid, black",marginBottom:"100px"}}>
  <tr>
    <th width={"40%"}>Paper Name</th>
   
    <th> Examinar Sign and Date</th>
  </tr>
  <tr>
    <td>Kayachikitsa </td>
 
    <td></td>
  </tr>
  
  <tr>
    <td>Panchakarma</td>
  
    <td></td>
  </tr>

</table>
<div className="row mt-5">
   <div className="col-md-12">
   <div className="d-flex justify-content-between">
    <h6>Signature of Principal  / Director with Stamp </h6>
    <h6>(Controller of Examination)</h6>
   </div>
   </div>
</div>
<div className="row mt-5">
    <div className="col-md-12">
        <h5>Instuctions</h5>
        <hr />
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
      </div>
    </div>
  );
}

export default HallTickets;
