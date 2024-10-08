import React from "react";
import ReactApexChart from "react-apexcharts";
import Calender from "../../Components/Calender/Calender";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { DASHBOARD_HR } from "../../utils/apiConstants";
import { SESSION_ROLE } from "../../utils/sessionStorageContants";
import { LOCAL_COLLEGE } from "../../utils/LocalStorageConstants";
import Swal from "sweetalert2";

function DashboardAccountant({ setLoading }) {
  const getCollegeData = () =>
    localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;

  //States
  const [data, setData] = useState();

  const [collegeData, setCollegeData] = useState(getCollegeData());

  console.log(data?.college_staff?.map((s) => s?.count));
  console.log(data?.college_staff?.map((s) => String(s.college_id)));

  //Get Data
  const getData = () => {
    setLoading(1);
    const config = {
      method: "get",
      url: DASHBOARD_HR + "?role=" + sessionStorage.getItem(SESSION_ROLE),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  //Chart Data 1
  const overviewChartOptions = {
    series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    labels: collegeData?.map((item) => item.name),
    chart: {
      width: 180,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100px",
            height: "100px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

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

  useEffect(() => {
    getData();
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useState(() => {
    setCollegeData(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);
  return (
    <div className="DashboardAccountant">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Dashboard</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">Home</li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* <h4 className='mb-2'>Welcome to Swaminarayan University HR Portal!!</h4> */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="media">
                            <div className="media-body overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2">
                                {" "}
                                Total Fee Collected Today
                              </p>
                              <h4 className="mb-0">
                                ₹{" "}
                                {data?.fee?.todayCol
                                  ? String(data?.fee?.todayCol)?.replace(
                                      /(\d)(?=(\d\d)+\d$)/g,
                                      "$1,"
                                    )
                                  : "0"}
                              </h4>
                            </div>
                            <div className="text-primary">
                              <i className="ri-currency-line font-size-24"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="media">
                            <div className="media-body overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2">
                                Total Fee collected for the month
                              </p>
                              <h4 className="mb-0">
                                ₹{" "}
                                {data?.fee?.past30
                                  ? String(data?.fee?.past30)?.replace(
                                      /(\d)(?=(\d\d)+\d$)/g,
                                      "$1,"
                                    )
                                  : "0"}
                              </h4>
                            </div>
                            <div className="text-primary">
                              <i className="ri-currency-line font-size-24"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row">
                      <div
                        className="col-md-12 row d-flex"
                        style={{ maxwidth: "500px" }}
                      >
                        <div className="col-12">
                          <div className="card ">
                            <div
                              className="card-body p-5"
                              style={{ maxHeight: "600px", maxWidth: "600px" }}
                            >
                              <h4 className="card-title mb-4">Overview</h4>
                              <div id="chart">
                                <ReactApexChart
                                  options={overviewChartOptions}
                                  series={overviewChartOptions.series}
                                  type="donut"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="col-md-12 mb-3">
                    <div className="card p-3 w-100">
                      <h3 className="my-3">Event Calendar</h3>
                      <Calender setLoading={setLoading} />
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

export default DashboardAccountant;
