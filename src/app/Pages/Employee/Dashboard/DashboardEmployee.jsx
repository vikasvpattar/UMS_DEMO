import React from "react";
import Calender from "../../../Components/Calender/Calender";
import "./DashboardEmployee.scss";
import Swal from "sweetalert2";
import { useEffect } from "react";

function DashboardEmployee({ setLoading }) {
  // function showModal() {
  //   if(!sessionStorage.getItem("modalClosed")) {
  //     Swal.fire({
  //       title: "Attentation",
  //       html: "We regret to inform you that, the software will no longer be operational from Midnight of <strong>February 11 2024</strong>. The software will be suspended<br /> We apologize for any inconvenience caused.",
  //       icon: "warning",
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "OK"
  //     }).then((result) => {
  //       sessionStorage.setItem("modalClosed", "true");
  //     });
  //   }
  // }

  // useEffect(() => {
  //   showModal();
  // },[])
  return (
    <div className="DashboardEmployee">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Dashboard</h4>
                  <h4 className="mb-0">
                    Hello , {sessionStorage.getItem("emp_name")}
                  </h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">Home</li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* <h4 className='mb-2'>Welcome to Swaminarayan University Employee Portal!!</h4> */}
            <div className="container-fluid"></div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="card p-3 w-100">
                    <h3 className="my-3">Event Calendar</h3>
                    <Calender setLoading={setLoading} />
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">Pending Leave Approvals</h4>
                      <div className="row">
                        <div className="col-12">
                          {latestNews.map((i, key) => (
                            <div key={key} className="announcements row">
                              <div className="col-11">
                                <div className='announcement-title'>
                                  {i.title}
                                </div>
                                <div className='announcement-desc'>
                                  {i.desc}
                                </div>
                              </div>
                              <div className="col-1 d-flex align-items-center">
                                {'>'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div></div>
                </div>

                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">Announcements</h4>
                      <div className="row">
                        <div className="col-12">
                          {announcements.map((i, key) => (
                            <div key={key} className="announcements row">
                              <div className="col-11">
                                <div className='announcement-title'>
                                  {i.title}
                                </div>
                                <div className='announcement-desc'>
                                  {i.Desc}
                                </div>
                              </div>
                              <div className="col-1 d-flex align-items-center">
                                {'>'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div></div>
                </div>
                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">Discussions</h4>
                      <div id="chart8"></div>
                    </div></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
