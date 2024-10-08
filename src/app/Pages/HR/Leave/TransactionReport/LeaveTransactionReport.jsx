import React, { useEffect, useState } from "react";
import "./../Leave.scss";
import { CSVDownload } from "react-csv";
import { LEAVE_APPLICATION } from "../../../../utils/apiConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { ALL_DATA } from "../../../../utils/LocalStorageConstants";
import Nodata from "../../../../Components/NoData/Nodata";

function LeaveTransactionReport({ setLoading, collegeId }) {
  const [data, setData] = useState();

  // Add state variables
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const employee = JSON.parse(localStorage.getItem(ALL_DATA)).employee;

  const getData = async (startDate, endDate) => {

    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date");
      return;
    }

    setLoading(1);

    // const currentDate = new Date();
    // const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;

    // const filteredData1 = data.filter(item => {
    //   const isCurrentDate = item.submission_date === currentDateString;
    //   return isCurrentDate;
    // });

    // setData(filteredData1);

    const config = {
      method: "get",
      url: `${LEAVE_APPLICATION}?status=APPROVED&&status=DECLINED&&college_id=${collegeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        // let x = res.data.data.filter((item, key) =>
        //    item?.from_date >= fromDate && item?.to_date <= toDate
        // )
        let x = res.data.data.filter((item, key) => {
          const fromDateObj = new Date(fromDate);
          const toDateObj = new Date(toDate);
          const itemDate = new Date(item.from_date);
        
          return itemDate >= fromDateObj && itemDate <= toDateObj;
        })
        console.log(x)
        x.sort((a, b) => {

          const comparison = a.from_date.localeCompare(b.from_date);
          if (comparison < 0) {
            return 1;
          } else if (comparison > 0) {
            return -1;
          } else {
            return 0;
          }
        });
        setData(x);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err.response.data.message);
        toast.error("Error while loading");
      });
  };

  useEffect(() => {
    if (fromDate && toDate) {
      getData(fromDate, toDate); // Fetch data when dates change
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    setFromDate(currentDateString);
    setToDate(currentDateString);
    getData(currentDateString, currentDateString); // Fetch data for current date
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="LeaveTransactionReport Leave-Report">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Transaction Report</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/">Leave</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Transaction Report
                      </li>
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
              <h2 className="card-title text-info">Transaction Report</h2>
              <br />

              <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="validationCustom02"> From Date </label>
                  <input
                    type="date"
                    className="form-control"
                    id="validationCustom02"
                    placeholder="Purpose of Visiting"
                    name="fdate"
                    defaultValue="<?= $_REQUEST['fdate']?>"
                    value={fromDate}
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
                    placeholder="Purpose of Visiting"
                    name="tdate"
                    defaultValue="<?= $_REQUEST['tdate']?>"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="col-md-4 float-right">
                <button
                  className="btn btn-primary btn-rounded mt-4"
                  type="submit"
                  name="submit"
                  onClick={() => getData()}
                >
                  <i className="fa fa-search" aria-hidden="true" /> Search
                </button>
              </div> */}

              </div>

              </div>
              </div>
              </div>
            </div>


            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-end p-3">
                    <button className="btn btn-rounded btn-success btn-outline px-4">
                      Export &uarr;
                    </button>
                    {/* <button onClick={() => window.open("https://umsapi.nexenstial.com/meTrnPay.php?OrderId=PAY_2NNBNR&amount=100.00&usn=01fe202bcs212&fee_id=1", "payment window", "width=500, height=500, left=500")}>CLICK ME</button> */}
                  </div>

                  <div>
                    {data && data.length !== 0 ? (
                        data?.map((i, key) => (

                          <div className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-normal">
                            <div className="col-12 row" key={key}>
                              <div className="report-title col-12">
                                {employee.find((j) => j.id === i.employee_id)
                                  ?.first_name +
                                  " " +
                                  employee.find((j) => j.id === i.employee_id)
                                    ?.last_name}
                              </div>
                              <div className="col-12 d-flex flex-nowrap justify-content-between align-items-center role-parts">
                                <div className="align-self-start text-center col-6">
                                  <div>{i.from_date.split("T")[0]}</div>
                                  <div>&darr;</div>
                                  <div>{i.to_date.split("T")[0]}</div>
                                  <div
                                    className={`${i.status === "PENDING"
                                      ? "text-warning"
                                      : i.status === "APPROVED"
                                        ? "text-success"
                                        : "text-danger"
                                      }`}
                                  >
                                    {i.status}
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="d-flex">{i.session}</div>
                                  <button className=" w-auto btn btn-dark p-1">
                                    {i.number_of_days} Day
                                  </button>
                                </div>
                                {/* <div className=" d-flex justify-content-end align-items-center">
                                                          A
                                                        </div> */}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <Nodata />
                      )}
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

export default LeaveTransactionReport;
