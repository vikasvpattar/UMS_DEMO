import React from "react";
import "./Dashboard.scss";
import ReactApexChart from "react-apexcharts";
import Calender from "../../../Components/Calender/Calender";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { DASHBOARD_HR } from "../../../utils/apiConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";

function DashboardHR({ setLoading, collegeId }) {
  const getCollegeData = () =>
    localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;

  //States
  const [data, setData] = useState();

  const [collegeData, setCollegeData] = useState(getCollegeData());

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
    series: [0, 0, 0, 0, 0],
    labels: ["Ayurveda", "Management", "Engineering", "Law", "Arts"],
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

  //Chart Data 2
  const overviewChartOptions2 = {
    series: [
      {
        name: "Male",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Female",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
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
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [
          "Ayrveda",
          "Engineering",
          "Law",
          "Dental",
          "Management",
          "Arts",
          "Commerce",
        ],
      },
    },
  };

  useEffect(() => {
    getData();
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useState(() => {
    setCollegeData(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);
  return (
    <div className="DashboardHR">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
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
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-6 row d-flex"
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

                  <div className="col-12">
                    <div className="card ">
                      <div
                        className="card-body"
                        style={{ maxHeight: "600px", maxWidth: "600px" }}
                      >
                        <h4 className="card-title mb-4">Male vs Female</h4>
                        <div id="chart">
                          <ReactApexChart
                            options={overviewChartOptions2.options}
                            series={overviewChartOptions2.series}
                            type="bar"
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
                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">
                        Pending Leave Approvals
                      </h4>
                      <div className="row">
                        {/* <div className="col-12">
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
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">Announcements</h4>
                      <div className="row">
                        {/* <div className="col-12">
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
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body ">
                      <h4 className="card-title mb-4">
                        Upcoming employee on Leaves
                      </h4>
                      <div className="row">
                        {/* <div className="col-12">
                                                    {LeaveApplication.map((i, key) => (
                                                        <div key={key} className="announcements row">
                                                            <div className="col-11">
                                                                <div className='announcement-title'>
                                                                    {i.title}
                                                                </div>
                                                                <div className='announcement-desc d-flex justify-content-between align-items-conter'>
                                                                    <div>
                                                                        {i.fromDate}
                                                                    </div>
                                                                    <div>
                                                                        &rarr;
                                                                    </div>
                                                                    <div>
                                                                        {i.toDate}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-1 d-flex align-items-center">
                                                               <a href={i.attachment}><i className='ri-attachment-2'></i></a>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div> */}
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

export default DashboardHR;
