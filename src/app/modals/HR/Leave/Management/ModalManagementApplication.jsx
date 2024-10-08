import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toggler from "../../../../Components/Toggler/Toggler";
import { getFileUrl } from "../../../../Helpers/Helpers";
import { LEAVE_APPLICATION } from "../../../../utils/apiConstants";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../../utils/AssetsReferenceTypes";

function ModalManagementApplication({
  type,
  emp1,
  empId,
  employee,
  data,
  reloadData,
  setLoading,
  entitlement,
}) {
  const [balance, setBalance] = useState(0);
  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");

  const date = new Date();
  let role = sessionStorage.getItem("role");

  //object for all input values
  const [user, setUser] = useState({
    entitlement: "",
    from_date: "",
    to_date: "",
    halfdaySession: "",
    number_of_days: 0,
    session: "",
    reason: "",
    submission_date: "",
    attachment: attachment1 + "," + attachment2,
    remark: "",
    approver_1: true,
    approver_2: true,
    approver_3: true,
    notification: true,
  });

  //Function upload attachment to the s3
  const addAttachment1 = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${empId}_Leave_Application`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setAttachment1(d ? d : "");
    } catch (error) {
      console.log(error);
    }
  };

  //Function upload attachment to the s3
  const addAttachment2 = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${empId}_Leave_Application`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setAttachment2(d ? d : "");
    } catch (error) {
      console.log(error);
    }
  };

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
      entitlement: "",
      from_date: "",
      to_date: "",
      halfdaySession: "",
      number_of_days: 0,
      session: "",
      reason: "",
      submission_date: date?.toISOString()?.split("T")[0],
      attachment: "",
      remark: "",
      approver_1: true,
      approver_2: true,
      approver_3: true,
      notification: true,
    });
    setBalance(0);
  };

  const handleDelete = async () => {
    setLoading(1);
    const config = {
      method: "delete",
      url: `${LEAVE_APPLICATION}/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const [msg, setMsg] = useState("");

  useEffect(() => {
    for (let element of emp1) {
      let date1 = element.from_date.split("T")[0];
      let date2 = user?.from_date;
      if (date1.localeCompare(date2) == 0 && element.status != "APPROVED") {
        employee?.find((s) => s.id == element.approved_by)
          ? setMsg(
              `Your Application on ${date2} is still under Review by ${
                employee?.find((s) => s.id == element.approved_by)?.first_name +
                " " +
                employee?.find((s) => s.id == element.approved_by)?.last_name
              } `
            )
          : setMsg(`Your Application on ${date2} is still under Review`);
      } else {
        setMsg("");
      }
    }
  }, [user?.from_date]);

  //fuction to call after post or put
  const handleSubmit = async (d) => {
    // console.log(user);
    // if (type == "edit" && sessionStorage.getItem("role") == "SHR") {
    //   return toast.error("Not Authorised to perform the action");
    // }
    if (user?.session == "full_day") {
      user.halfdaySession = "";
    } else if (user?.session == "half_day" && !user?.halfdaySession) {
      return toast.error("Please Enter Half Day Session");
    }
    let x = new Date().toISOString().split("T")[0];
    if (
      user.from_date.localeCompare(x) < 0 &&
      sessionStorage.getItem("role") != "SUPERADMIN"
    ) {
      return toast.error("Your Application Date should start from today");
    }
    for (let element of emp1) {
      let date1 = element.from_date.split("T")[0];
      let date2 = user?.from_date;
      if (date1.localeCompare(date2) == 0) {
        return toast.error(
          `Your Application on ${date2} is still under Review by ${element.status}`
        );
      }
    }
    if (
      !user?.entitlement ||
      !user?.submission_date ||
      !user?.from_date ||
      !user?.to_date
    )
      return toast.error("Mandatory fields are required");
    //config for axios
    const config = {
      method: type === "edit" ? "put" : "post",
      url: `${LEAVE_APPLICATION}${type === "edit" ? "/" + data.id : ""}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        employee_id: empId,
        ...user,
        approved_by: sessionStorage.getItem("employee_id"),
        college_id: sessionStorage.getItem("college_id"),
      },
    };
    setLoading(1);
    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(res.data.message);
        reloadData(empId);
        clearData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const checkBalance = (a) => {
    setBalance(entitlement?.find((s) => s.id == a)?.balance);
  };

  const calculateDifference = (a1, a2, e) => {
    var Difference_In_Time = new Date(a2).getTime() - new Date(a1).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);
    if (!balance) return toast.error("Balace is not defined");
    if (Difference_In_Days + 1 < 0)
      return toast.error("To date cannot be less then From date");
    if (Difference_In_Days + 1 > balance && user?.session == "full_day")
      return toast.error("Number of days cannot be Greater then balance Days");
    if (
      Difference_In_Days + 1 > 5 &&
      entitlement?.find((s) => s.id == user?.entitlement).leave_type ==
        "CASUAL" &&
      sessionStorage.getItem("role") != "SUPERADMIN"
    )
      return toast.error(
        "More 5 days of casual leave require another leave application"
      );
    if (e) handleChange(e);
    if (user?.session == "half_day" && Difference_In_Days == 0) {
      setUser((prevValue) => ({
        ...prevValue,
        number_of_days: 0.5,
      }));
    } else if (user?.session == "full_day") {
      setUser((prevValue) => ({
        ...prevValue,
        number_of_days: Difference_In_Days + 1,
      }));
    } else {
      setUser((prevValue) => ({
        ...prevValue,
        number_of_days: Difference_In_Days + 1,
      }));
    }
  };

  useEffect(() => {
    if (type === "edit") {
      if (data) {
        setUser({
          entitlement: data?.entitlement,
          from_date: data?.from_date?.split("T")[0],
          to_date: data?.to_date?.split("T")[0],
          number_of_days: data?.number_of_days,
          session: data?.session,
          reason: data?.reason,
          submission_date: data?.submission_date?.split("T")[0],
          remark: data?.remark,
          approver_1: data?.approver_1,
          approver_2: data?.approver_2,
          approver_3: data?.approver_3,
          notification: data?.notification,
          status: data?.status,
        });
        setBalance(data?.balance);
        setAttachment1(data?.attachment?.split(",")[0]);
        setAttachment2(data?.attachment?.split(",")[1]);
      }
      checkBalance(data?.entitlement);
    }

    if (type === "add") {
      clearData();
    }
  }, [data, type]);

  useEffect(() => {
    if (user?.session && user?.from_date && user?.to_date)
      calculateDifference(user?.from_date, user?.to_date);
  }, [user?.session]);

  useEffect(() => {
    setUser((prevValue) => ({
      ...prevValue,
      attachment: attachment1 + "," + attachment2,
    }));
  }, [attachment1, attachment2]);

  useEffect(() => {
    if (!user?.status) {
      if (user?.entitlement == "CASUAL") {
        if (user?.from_date && user?.to_date) {
          var Difference_In_Time =
            new Date(user?.from_date).getTime() - new Date().getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);

          var Difference_In_Time_1 =
            new Date(user?.to_date).getTime() -
            new Date(user?.from_date).getTime();
          var Difference_In_Days_1 =
            Difference_In_Time_1 / (1000 * 60 * 60 * 24);

          console.log(Difference_In_Days, Difference_In_Days_1);

          if (
            Math.round(Difference_In_Days) <=
              Math.round(Difference_In_Days_1 + 1) &&
            user?.session == "full_day"
          ) {
            setUser((prevValue) => ({
              ...prevValue,
              from_date: "",
              to_date: "",
              number_of_days: "",
            }));

            toast.error(
              `leave can be applied ${Math.round(
                Difference_In_Days_1 + 1
              )} days prior`
            );
          }
        }
      }
    }
  }, [user?.from_date, user?.to_date]);

  return (
    <div className="ModalManagementApplication">
      <div
        className="modal fade"
        id="ModalManagementApplication"
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
              <br />
              {msg ? <h4 className="alert alert-danger">{msg}</h4> : null}
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
                          {i?.leave_type} , {i?.balance}
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
                      <option value="full_day">Full Day</option>
                      <option value="half_day">Half Day</option>
                    </select>
                    {/* <div className='text-danger'>Only valid for one day leave else it will be considered as full day leave</div> */}
                  </div>
                </div>
                {user?.session == "half_day" ? (
                  <div className="col-12">
                    <div className="form-group">
                      <label>
                        {" "}
                        Select Half Day Session
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="halfdaySession"
                        className="form-control"
                        value={user?.halfdaySession}
                        onChange={handleChange}
                      >
                        <option value="">Select Half Day Session</option>
                        <option value="1">Morning</option>
                        <option value="2">Evening</option>
                      </select>
                      {/* <div className='text-danger'>Only valid for one day leave else it will be considered as full day leave</div> */}
                    </div>
                  </div>
                ) : null}
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      From <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      min={
                        role !== "SUPERADMIN"
                          ? date.toISOString().split("T")[0]
                          : null
                      }
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
                      min={
                        role !== "SUPERADMIN"
                          ? date.toISOString().split("T")[0]
                          : null
                      }
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Attachment 1 <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      className="form-control"
                      onChange={(e) => {
                        addAttachment1(e);
                      }}
                    />
                    <div>
                      {user?.attachment?.split(",")[0] ? (
                        <>
                          Uploaded &nbsp;&nbsp;&nbsp;
                          <span className="badge badge-success text-bg-primary text-light">
                            <a
                              className="text-light"
                              href={user?.attachment?.split(",")[0]}
                            >
                              View
                            </a>
                          </span>
                        </>
                      ) : (
                        "Not yet uploaded"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Attachment 2</label>
                    <input
                      type="file"
                      name=""
                      className="form-control"
                      onChange={(e) => {
                        addAttachment2(e);
                      }}
                    />
                    <div>
                      {user?.attachment?.split(",")[1] ? (
                        <>
                          Uploaded &nbsp;&nbsp;&nbsp;
                          <span className="badge badge-success text-bg-primary text-light">
                            <a
                              className="text-light"
                              href={user?.attachment?.split(",")[1]}
                            >
                              View
                            </a>
                          </span>
                        </>
                      ) : (
                        "Not yet uploaded"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable> Reason</lable>
                    <textarea
                      type="text"
                      className="form-control"
                      name="reason"
                      value={user.reason}
                      onChange={handleChange}
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
                      className="form-control"
                      name="submission_date"
                      // defaultValue={date?.split('T')[0]}
                      value={user.submission_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {type == "edit" ? (
                  <div className="col-12">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={user?.status}
                        onChange={handleChange}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="DECLINED">Rejected</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ) : null}
                {/* <div className="col-12 my-2">
                                    <Toggler
                                    label={'Approver 1'}
                                    defaultchecked={user.approver_1}
                                    checked={user.approver_1}
                                    checkboxValue={(e)=>{
                                        setUser(prevValue => ({
                                        ...prevValue,
                                        approver_1: e.target.checked
                                    }));}}
                                    />
                                </div>
                                <div className="col-12 my-2">
                                    <Toggler
                                    label={'Approver 2'}
                                    defaultchecked={user.approver_2}
                                    checked={user.approver_2}
                                    checkboxValue={(e)=>{
                                        setUser(prevValue => ({
                                        ...prevValue,
                                        approver_2: e.target.checked
                                    }));}}
                                    />
                                </div>
                                <div className="col-12 my-2">
                                    <Toggler
                                    label={'Approver 3'}
                                    defaultchecked={user.approver_3}
                                    checked={user.approver_3}
                                    checkboxValue={(e)=>{
                                        setUser(prevValue => ({
                                        ...prevValue,
                                        approver_3: e.target.checked
                                    }));}}
                                    />
                                </div> */}
                <div className="col-12 my-2">
                  <Toggler
                    label={"Notify Employee After Final Approval/Rejection"}
                    defaultchecked={user.notification}
                    checked={user.notification}
                    checkboxValue={(e) => {
                      setUser((prevValue) => ({
                        ...prevValue,
                        notification: e.target.checked,
                      }));
                    }}
                  />
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
                {type == "edit" ? (
                  <button
                    className="btn btn-danger btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="btn btn-danger btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="btn btn-success btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalManagementApplication;
