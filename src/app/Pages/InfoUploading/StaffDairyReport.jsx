import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { STAFF_DAIRY_GET1 } from "../../utils/InfoUploadingApiConstants";

function StaffDairyReport({ setLoading }) {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  let date = new Date().toISOString().split("T")[0];

  function calculateTimeDifference(fromTimeStr, toTimeStr) {
    const fromDate = new Date(`2000-01-01T${fromTimeStr}`);
    const toDate = new Date(`2000-01-01T${toTimeStr}`);

    if (toDate < fromDate) {
      toDate.setDate(toDate.getDate() + 1); // Handle cases where 'to' is on the next day
    }

    return toDate - fromDate;
  }

  const getData = async () => {
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date");
      return;
    }

    setLoading(1);

    const config = {
      method: "get",
      url: STAFF_DAIRY_GET1,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        from_date: fromDate,
        to_date: toDate,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        const activities = {};

        for (const entry of res.data.data) {
          if (entry?.from_time && entry?.to_time) {
            const activity = entry.activity;
            const timeDifference = calculateTimeDifference(
              entry.from_time,
              entry.to_time
            );
            if (!activities[activity]) {
              activities[activity] = 0;
            }
            activities[activity] += timeDifference;
          }
        }

        const aggregatedData = [];

        for (const activity in activities) {
          const totalMilliseconds = activities[activity];
          const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
          const totalMinutes = Math.floor(
            (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );

          aggregatedData.push({
            activity: parseInt(activity),
            totalTime: `${totalHours} hours ${totalMinutes} minutes`,
            status: "ACTIVE",
          });
        }
        setData(aggregatedData);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  let arr1 = [
    {
      id: 1,
      title: "Direct Teaching (Assigned)",
    },
    {
      id: 2,
      title: "Examination Duties",
    },
    {
      id: 3,
      title: "Student Related Co-Curricular Activities",
    },
    {
      id: 4,
      title: "Other Activities",
    },
    {
      id: 5,
      title: "Professional Development Activities",
    },
    {
      id: 6,
      title: "Administrative Responsibility",
    },
    {
      id: 7,
      title: "Research and Academic Contributions",
    },
  ];

  return (
    <div className="StaffDairyReport">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0"> StaffDiary Report </h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title"> Select Criteria </h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            {" "}
                            From Date{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            name="fromDate"
                            // value={fromDate}
                            value={fromDate ? fromDate : date}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02"> To Date </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            name="toDate"
                            // value={toDate}
                            value={toDate ? toDate : date}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row float-right">
                      <button
                        className="btn btn-primary btn-rounded mr-3"
                        type="submit"
                        name="submit"
                        onClick={getData}
                      >
                        <i className="fa fa-search" aria-hidden="true" />
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Display List Start*/}
            <div class="card">
              <div className="card-body">
                <h4> StaffDiary Report List </h4>
                <hr />
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th> Sl No </th>
                      <th> Activity Name </th>
                      <th> Total Time </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      data.map((item, index) => {
                        if (item.status === "ACTIVE") {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {
                                  arr1.filter(
                                    (s) => s.id === parseInt(item?.activity)
                                  )[0]?.title
                                }
                              </td>
                              <td>{item?.totalTime}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDairyReport;
