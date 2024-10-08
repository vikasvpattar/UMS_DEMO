import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ModalEmployeeLeaveApplication from "../../../modals/Employee/Leave/Application";
import {
  LEAVE_APPLICATION,
  LEAVE_ENTITLEMENT,
} from "../../../utils/apiConstants";
import { ALL_DATA } from "../../../utils/LocalStorageConstants";
import { SESSION_EMPLOYEE_ID } from "../../../utils/sessionStorageContants";
import Nodata from "../../NoData/Nodata";

function EmployeeLeaveApplication({ setLoading, collegeId }) {
  const [data, setData] = useState([]);
  const employee = JSON.parse(localStorage.getItem(ALL_DATA)).employee;
  const [emp, setEmp] = useState("");
  const [type, setType] = useState("");
  const [edit, setEdit] = useState();
  const [entitlement, setEntitlement] = useState();

  const applicationStatus = "closed";

  const getEmployeeId = () => {
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      ? sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      : null;
  };

  const [employeeId, setEmployeeId] = useState(getEmployeeId);

  const getEntitlement = async (p) => {
    setLoading(1);

    setEmp(p);
    const config = {
      method: "get",
      url: `${LEAVE_ENTITLEMENT}?employee_id=${employeeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        setEntitlement(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const getData = async (p) => {
    setLoading(1);
    setEmp(p);
    const config = {
      method: "get",
      url: `${LEAVE_APPLICATION}?employee_id=${employeeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
        // console.log('data',res);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getData("");
    getEntitlement();
  }, []);

  return (
    <div>
      <ModalEmployeeLeaveApplication
        type={type}
        empId={employeeId}
        data={edit}
        reloadData={(d) => getData(d)}
        setLoading={setLoading}
        entitlement={entitlement}
        collegeId={collegeId}
      />
      {applicationStatus == "closed" ? (
        <div className=" card">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-center mb-5">
                <img
                  src="/assets/images/white-logo.png"
                  style={{ width: "500px", margin: "auto" }}
                  alt=""
                />
              </div>
              <div className="col-md-12 d-flex justify-content-center ">
                <h5 className="alert alert-danger">
                  Leave Management Application is Closed. Please Contact
                  University For Further Details
                </h5>
              </div>
            </div>
            {/* <hr /> */}

            {/* <h2>Contact for more info</h2>
            <p>
              **Department of Research:** <br />
              - Email Address: rd@swaminarayanuniversity.ac.in <br />
              - Mobile Numbers: 9176945090, 9345891984 <br />
              - Dean Research (I/C): Dr. Anita Patel <br />
            </p> */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <>
          <div className="container mt-5">
            <div className="card">
              <div className="card-body">
                <div className="row d-flex justify-content-between p-3">
                  <button
                    className="btn btn-rounded btn-success btn-outline px-4"
                    data-toggle="modal"
                    data-target="#ModalEmployeeLeaveApplication"
                    onClick={() => {
                      setType("add");
                      setEdit();
                    }}
                  >
                    New Application
                  </button>

                  <button className="btn btn-rounded btn-primary btn-outline px-4">
                    Export &uarr;
                  </button>
                </div>

                <div>
                  {data && data.length !== 0 ? (
                    data.map((i, key) => (
                      <div
                        className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-pointer"
                        data-toggle="modal"
                        data-target="#ModalEmployeeLeaveApplication"
                        onClick={() => {
                          setType("edit");
                          setEdit(i);
                        }}
                      >
                        <div className="col-12 row" key={key}>
                          <div className="report-title col-12">
                            {employee.find((j) => j.id === i.employee_id)
                              .first_name +
                              " " +
                              employee.find((j) => j.id === i.employee_id)
                                .last_name}
                          </div>
                          <div className="col-12 d-flex flex-nowrap justify-content-between align-items-center role-parts">
                            <div className="align-self-start text-center col-6">
                              <div>{i.from_date?.split("T")[0]}</div>
                              <div>&darr;</div>
                              <div>{i.to_date?.split("T")[0]}</div>
                              <div
                                className={`${
                                  i.status === "PENDING"
                                    ? "text-danger"
                                    : "text-success"
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
                            <div className=" d-flex justify-content-end align-items-center">
                              A
                            </div>
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
        </>
      )}
    </div>
  );
}

export default EmployeeLeaveApplication;
