import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader/Loader";
import ModalLeaveReview from "../../../../modals/HR/Leave/ModalLeaveReview";
import {
  LEAVE_APPLICATION,
  LEAVE_ENTITLEMENT,
  LEAVE_REVIEW_EMPLOYEE,
} from "../../../../utils/apiConstants";
import { ALL_DATA } from "../../../../utils/LocalStorageConstants";
import "./../Leave.scss";
import NoData from "./../../../../Components/NoData/Nodata";
import { SESSION_EMPLOYEE_ID } from "../../../../utils/sessionStorageContants";

function LeaveReview({ setLoading, collegeId }) {
  const [data, setData] = useState();
  const [edit, setEdit] = useState();
  const [entitlement, setEntitlement] = useState();

  const getEmployeeId = () => {
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      ? sessionStorage.getItem(SESSION_EMPLOYEE_ID)
      : null;
  };

  const [employeeId, setEmployeeId] = useState(getEmployeeId());

  const getEntitlement = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${LEAVE_ENTITLEMENT}?college_id=${collegeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log('entitlement - ', res.data.data);
        setEntitlement(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const employee = JSON.parse(localStorage.getItem(ALL_DATA)).employee;

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${LEAVE_REVIEW_EMPLOYEE}/${employeeId}?college_id=${collegeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        console.log('data - ', res.data.data);
        setLoading(0);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err.response.data.message);
        toast.error("Error while loading");
      });
  };

  useEffect(() => {
    getData();
    getEntitlement();
  }, []);

  useEffect(() => {
    setEmployeeId(getEmployeeId());
  }, [sessionStorage.getItem(SESSION_EMPLOYEE_ID)]);

  return (
    <div className="LeaveReview Leave-Report">
      <ModalLeaveReview
        empId={employeeId}
        data={edit}
        reloadData={(d) => getData(d)}
        setLoading={setLoading}
        entitlement={entitlement}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Review</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/">Leave</a>
                      </li>
                      <li className="breadcrumb-item active">Review</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}

            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div>
                    {data && data.length !== 0 ? (
                      data?.map((i, key) => (
                        <div className="row my-3 mx-2 p-3 border rounded shadow report-div cursor-normal">
                          <div className="col-12 row" key={key}>
                            <div className="report-title col-12">
                              {employee?.find((j) => j.id === i.employee_id)
                                ?.first_name +
                                " " +
                                employee.find((j) => j.id === i.employee_id)
                                  ?.last_name}
                            </div>
                            <div className="col-12 row d-flex flex-nowrap justify-content-between align-items-center role-parts">
                              <div className="col-10 row">
                                <div className="align-self-start text-center col-6">
                                  <div>{i.from_date?.split("T")[0]}</div>
                                  <div>&darr;</div>
                                  <div>{i.to_date?.split("T")[0]}</div>
                                  <div
                                    className={`${
                                      i?.status === "PENDING"
                                        ? "text-warning"
                                        : i?.status === "APPROVED"
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {i?.status}
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div className="d-flex">{i?.session}</div>
                                  <button className=" w-auto btn btn-dark p-1">
                                    {i?.number_of_days} Day
                                  </button>
                                </div>
                              </div>

                              <div className="col-2 d-flex justify-content-between">
                                <div className=" d-flex justify-content-end align-items-center">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-toggle="modal"
                                    data-target="#ModalLeaveReview"
                                    onClick={() => {
                                      setEdit(i);
                                    }}
                                  >
                                    <i className="ri-pencil-fill"></i>
                                  </button>
                                </div>
                                {/* <div className=" d-flex justify-content-end align-items-center">
                                                                <a
                                                                href={i?.attachament}
                                                                class="btn btn-secondary"
                                                                >
                                                                    <i className='ri-attachment-2'></i>
                                                                </a>
                                                            </div> */}
                                {i?.attachment &&
                                i?.attachment?.split(",")?.length == 1 ? (
                                  <div className=" d-flex justify-content-end align-items-center">
                                    <a
                                      target={"_blank"}
                                      href={i?.attachment?.split(",")[0]}
                                      className="btn btn-secondary"
                                    >
                                      <i className="ri-attachment-2"></i>
                                    </a>
                                  </div>
                                ) : i?.attachment?.split(",")?.length == 2 ? (
                                  <>
                                    <div className=" d-flex justify-content-end align-items-center">
                                      <a
                                        target={"_blank"}
                                        href={i?.attachment?.split(",")[0]}
                                        className="btn btn-secondary"
                                      >
                                        <i className="ri-attachment-2"></i>
                                      </a>
                                    </div>
                                    {i?.attachment?.split(",")[1] ? (
                                      <div className=" d-flex justify-content-end align-items-center">
                                        <a
                                          target={"_blank"}
                                          href={i?.attachment?.split(",")[1]}
                                          className="btn btn-secondary"
                                        >
                                          <i className="ri-attachment-2"></i>
                                        </a>
                                      </div>
                                    ) : null}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoData />
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

export default LeaveReview;
