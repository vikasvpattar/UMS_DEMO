import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { LEAVE_APPLICATION } from "../../../utils/apiConstants";
import { SESSION_EMPLOYEE_ID } from "../../../utils/sessionStorageContants";

function ModalLeaveReview({
  type,
  empId,
  data,
  reloadData,
  setLoading,
  entitlement,
}) {
  const [balance, setBalance] = useState(0);

  const [employeeId, setEmployeeId] = useState(
    sessionStorage.getItem(SESSION_EMPLOYEE_ID)
  );

  useEffect(() => {
    setEmployeeId(sessionStorage.getItem(SESSION_EMPLOYEE_ID));
  }, [sessionStorage.getItem(SESSION_EMPLOYEE_ID)]);

  //object for all input values
  const [user, setUser] = useState({
    employee_id: "",
    entitlement: "",
    from_date: "",
    to_date: "",
    number_of_days: 0,
    session: "",
    reason: "",
    submission_date: "",
    remark: "",
    status: "",
  });

  const Difference_In_Time =
    new Date(user.to_date).getTime() - new Date(user.from_date).getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  //fuction to clear the input fields after completion of any operation
  const clearData = () => {
    setUser({
      employee_id: "",
      entitlement: "",
      from_date: "",
      to_date: "",
      number_of_days: 0,
      session: "",
      reason: "",
      submission_date: "",
      remark: "",
      status: "",
    });
    setBalance(0);
  };

  //fuction to call after post or put
  const handleSubmit = async (d) => {
    //config for axios
    const config = {
      method: "put",
      url: `${LEAVE_APPLICATION}/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        approved_by: empId,
        approver_id: empId,
        status: "APPROVED",
      },
    };
    console.log(config);

    setLoading(1);
    await axios(config)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res);
        setLoading(0);
        reloadData(empId);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(0);
      });
  };

  const handleDecline = async (d) => {
    //config for axios
    const config = {
      method: "put",
      url: `${LEAVE_APPLICATION}/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        approved_by: empId,
        approver_id: empId,
        status: "DECLINED",
      },
    };
    console.log(config);

    setLoading(1);
    await axios(config)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res);
        setLoading(0);
        reloadData(empId);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(0);
      });
  };

  const checkBalance = (a) => {
    setBalance(entitlement.find((s) => s.id == a)?.balance);
  };

  const calculateDifference = (a1, a2, e) => {
    var Difference_In_Time = new Date(a2).getTime() - new Date(a1).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);
    if (!balance) return toast.error("Balace is not defined");
    if (Difference_In_Days + 1 < 0)
      return toast.error("To date cannot be less then From date");
    if (Difference_In_Days + 1 > balance)
      return toast.error("Number of days cannot be Greater then balance Days");
    handleChange(e);
    setUser((prevValue) => ({
      ...prevValue,
      number_of_days: Difference_In_Days + 1,
    }));
  };

  useEffect(() => {
    if (data) {
      setUser({
        employee_id: data?.employee_id,
        entitlement: data?.entitlement,
        from_date: data?.from_date?.split("T")[0],
        to_date: data?.to_date?.split("T")[0],
        number_of_days: data?.number_of_days,
        session: data?.session,
        reason: data?.reason,
        submission_date: data?.submission_date?.split("T")[0],
        remark: data?.remark,
        status: data?.status,
      });
      // setBalance(data.balance)
      checkBalance(data.entitlement);
    }
  }, [data]);

  return (
    <div className="ModalLeaveReview">
      <div
        className="modal fade"
        id="ModalLeaveReview"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Application
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Entitlement<span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name="entitlement"
                      className="form-control"
                      value={user.entitlement}
                      onChange={(e) => {
                        handleChange(e);
                        checkBalance(e.target.value);
                      }}
                    >
                      <option value="">Select Entitlement</option>
                      {entitlement?.map((i, key) => (
                        <option value={i.id}>
                          {i.leave_type} , {i.entitled_days}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>Balance</lable>
                    <input
                      type="text"
                      className="form-control cursor-disable"
                      value={!balance ? "0" + " Day" : balance + " Day"}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      From <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      name="from_date"
                      value={user.from_date}
                      onChange={(e) => {
                        calculateDifference(e.target.value, user.to_date, e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      To <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      name="to_date"
                      value={user.to_date}
                      onChange={(e) => {
                        calculateDifference(user.from_date, e.target.value, e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable> Day</lable>
                    <input
                      type="text"
                      className="form-control cursor-disable"
                      value={user.number_of_days}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Session<span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name="session"
                      className="form-control"
                      value={user.session}
                      onChange={handleChange}
                    >
                      <option value="">Select Session</option>
                      <option value="Full Day">Full Day</option>
                      <option value="1st Half Day">1st Half Day</option>
                      <option value="2nd Half Day">2nd Half Day</option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable> Reason</lable>
                    <textarea
                      type="text"
                      className="form-control cursor-disable"
                      name="reason"
                      value={user.reason}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Submission Date<span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control cursor-disable"
                      name="submission_date"
                      value={user.submission_date}
                      readOnly={true}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Remark <span style={{ color: "red" }}>*</span>
                    </lable>
                    <textarea
                      type="text"
                      className="form-control"
                      name="remark"
                      value={user.remark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-between px-2">
                <button
                  className="btn btn-danger btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                {user.status !== "DECLINED" && user?.status !== "APPROVED" && (
                  <div
                    className="d-flex align-items-center justify-content-end"
                    style={{ gap: "20px" }}
                  >
                    <button
                      className="btn btn-outline-danger btn-rounded btn-outline"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleDecline}
                    >
                      Decline
                    </button>
                    <button
                      className="btn btn-success btn-rounded btn-outline"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleSubmit}
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLeaveReview;
