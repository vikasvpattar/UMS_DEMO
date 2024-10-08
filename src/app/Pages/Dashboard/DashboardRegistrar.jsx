import React from "react";
import "./Dashboard.scss";
import ReactApexChart from "react-apexcharts";
import Calender from "../../Components/Calender/Calender";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LEAVE_APPLICATION } from "../../utils/apiConstants";
import { DASHBOARD_REGISTRAR } from "../../utils/apiConstants";
import { SESSION_ROLE } from "../../utils/sessionStorageContants";
import { LOCAL_COLLEGE } from "../../utils/LocalStorageConstants";
import Swal from "sweetalert2";

function DashboardRegistrar({ setLoading, collegeId }) {
  const getCollegeData = () =>
    localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;

  //States
  const [data, setData] = useState();
  const [pending, setPending] = useState(0);
  const [upcoming, setUpcoming] = useState(0);

  const [collegeData, setCollegeData] = useState(getCollegeData());

  //Get Data
  const getData = async () => {
    let count = 0,
      count1 = 0;
    if (!collegeId || collegeId == undefined) return;
    setLoading(1);
    const config = {
      method: "get",
      url:
        DASHBOARD_REGISTRAR +
        "?role=" +
        sessionStorage.getItem(SESSION_ROLE) +
        "&college_id=" +
        collegeId,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });

    const config1 = {
      url: LEAVE_APPLICATION + "?status=PENDING",
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const date = new Date();

    await axios(config1)
      .then((res) => {
        setLoading(0);
        try {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].status == "PENDING") {
              count++;
            }
            const dateComp = new Date(res.data.data[i].from_date.split("T")[0]);
            if (
              date.getTime() < dateComp.getTime() &&
              res.data.data[i].status == "APPROVED"
            ) {
              count1++;
            }
          }
          setPending(count);
          setUpcoming(count1);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const overviewChartOptions = {
    series: [
      {
        name: "Students",
        data: data?.studentsCount?.map((s) => s.total) || [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: data?.studentsCount?.map((s) => s.college_code),
        position: "top",
        display: false,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: "",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };

  //Chart Data 2
  const overviewChartOptions2 = {
    series: [
      {
        name: "Male",
        data: data?.studentsCount?.map((s) => s.male),
      },
      {
        name: "Female",
        data: data?.studentsCount?.map((s) => s.female),
      },
      // {
      //     name: 'Not Updated',
      //     data: data?.studentsCount?.map(s => s.other)
      // }
    ],
    // options: {
    //     chart: {
    //         type: 'bar',
    //         height: 430
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: true,
    //             dataLabels: {
    //                 position: 'top',
    //             },
    //         }
    //     },
    //     dataLabels: {
    //         enabled: true,
    //         offsetX: -6,
    //         style: {
    //             fontSize: '12px',
    //             colors: ['#fff']
    //         }
    //     },
    //     stroke: {
    //         show: true,
    //         width: -2,
    //         colors: ['#fff']
    //     },
    //     tooltip: {
    //         shared: true,
    //         intersect: false
    //     },
    //     xaxis: {
    //         categories: data?.studentsCount?.map(s => s.college_name),
    //     },
    // },
    options: {
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: -1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: data?.studentsCount?.map((s) => s.college_name),
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

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
    <div className="DashboardHR">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">
                    Hello , {sessionStorage.getItem(SESSION_ROLE)}
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
            <div className="row px-3 mb-2">
              <h6>Employee Overview</h6>
            </div>
            {/* <h4 className='mb-2'>Welcome to Swaminarayan University HR Portal!!</h4> */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Total Number of Staff
                          </p>
                          <h4 className="mb-0">{data?.number_of_staff}</h4>
                        </div>
                        <div className="text-primary">
                          <i className="ri-user-line font-size-24"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            Today Present Staff
                          </p>
                          <h4 className="mb-0">0</h4>
                        </div>
                        <div className="text-primary">
                          <i className="ri-user-heart-line font-size-24"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Total Number of Teaching Staff
                          </p>
                          <h4 className="mb-0">0</h4>
                        </div>
                        <div className="text-primary">
                          <i className="ri-user-2-fill font-size-24"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Total Number of Non Teaching Staff
                          </p>
                          <h4 className="mb-0">0</h4>
                        </div>
                        <div className="text-primary">
                          <i className="ri-user-follow-line font-size-24"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row px-3 mb-2">
                  <h6>Employee Leave Overview</h6>
                </div>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card ">
                        <div className="card-body ">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Pending Leave Approvals
                          </p>
                          <div className="row">
                            <h4 className="pl-3">{pending}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="card ">
                        <div className="card-body ">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Upcoming Employee on Leaves
                          </p>
                          <div className="row">
                            <h4 className="pl-3">{upcoming}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3 mb-2 mt-3  ">
              <h6>Overall University Fees Overview</h6>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Today Fee Collection
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.today
                              ? String(data?.fee?.today)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Yesterday Fee Collection
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.yesterday
                              ? String(data?.fee?.yesterday)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Fee Collected in last 7 days
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.past10
                              ? String(data?.fee?.past10)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Fee Collected in last 30 days
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
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3 mb-2 mt-3  ">
              <h6>
                {collegeData?.find((s) => s.id == collegeId)?.name} Fees
                Overview
              </h6>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Today Fee Collection
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
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Yesterday Fee Collection
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.yesterdayCol
                              ? String(data?.fee?.yesterdayCol)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Fee Collected in last 7 days
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.past10Col
                              ? String(data?.fee?.past10Col)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2">
                            {" "}
                            Fee Collected in last 30 days
                          </p>
                          <h4 className="mb-0">
                            ₹{" "}
                            {data?.fee?.past30Col
                              ? String(data?.fee?.past30Col)?.replace(
                                  /(\d)(?=(\d\d)+\d$)/g,
                                  "$1,"
                                )
                              : "0"}
                          </h4>
                        </div>
                        <div className="text-primary font-size-24">₹</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 row d-flex">
                  <div className="col-12">
                    <div className="card ">
                      <div className="card-body p-5">
                        <h4 className="card-title mb-4">Student Overview</h4>
                        <div id="chart">
                          <ReactApexChart
                            options={overviewChartOptions.options}
                            series={overviewChartOptions.series}
                            type="bar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="card ">
                      <div className="card-body">
                        <h4 className="card-title mb-4">Male Female Ratio</h4>
                        <div id="chart">
                          <ReactApexChart
                            options={overviewChartOptions2.options}
                            series={overviewChartOptions2.series}
                            type="bar"
                            height={500}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card p-3 w-100">
                    <h3 className="my-3">Event Calendar</h3>
                    <Calender setLoading={setLoading} collegeId={collegeId} />
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

export default DashboardRegistrar;
