import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFileUrl } from "../../../Helpers/Helpers";
import { LEAVE_APPLICATION } from "../../../utils/apiConstants";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";

function EmployeeLeaveApplication({
  type,
  empId,
  data,
  reloadData,
  setLoading,
  entitlement,
  collegeId,
}) {
  const [balance, setBalance] = useState(0);
  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");

  // let currentYear = new Date().getFullYear()

  // useEffect(()=>{
  //   let y = []

  // },[])
  console.log(entitlement);
  entitlement = entitlement?.filter(
    (s) =>
      s.from_date.split("T")[0].slice(0, 4) == new Date().getFullYear() ||
      s.to_date.split("T")[0].slice(0, 4) == new Date().getFullYear()
  );
  console.log(entitlement);

  let date = new Date();
  let role = sessionStorage.getItem("role");

  //object for all input values
  const [user, setUser] = useState({
    entitlement: "",
    from_date: "",
    to_date: "",
    college_id: sessionStorage.getItem("college_id"),
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
      entitlement: "",
      from_date: "",
      to_date: "",
      number_of_days: 0,
      session: "",
      reason: "",
      attachment: "",
      submission_date: new Date(),
      remark: "",
      approver_1: true,
      approver_2: true,
      approver_3: true,
      college_id: sessionStorage.getItem("college_id"),
      notification: true,
    });
    setBalance(0);
  };

  //fuction to call after post or put
  const handleSubmit = async (d) => {
    if (
      !user?.entitlement ||
      !user?.submission_date ||
      !user?.from_date ||
      !user?.to_date ||
      !user?.session ||
      !user?.attachment ||
      !user?.reason
    )
      return toast.error("Mandatory Fields are required");
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
        college_id: sessionStorage.getItem("college_id"),
      },
    };

    setLoading(1);
    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(res.data.message);
        console.log(res);
        reloadData(empId);
        clearData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
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

  const checkBalance = (a) => {
    setBalance(entitlement.find((s) => s.id == a)?.balance);
  };

  const calculateDifference = (a1, a2, e) => {
    var Difference_In_Time = new Date(a2).getTime() - new Date(a1).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);
    // if(!balance) return toast.error("Balace is not defined")
    if (Difference_In_Days + 1 < 0)
      return toast.error("To date cannot be less then From date");
    if (Difference_In_Days + 1 > balance && user?.session == "full_day")
      return toast.error("Number of days cannot be Greater then balance Days");
    if (
      Difference_In_Days + 1 > 5 &&
      entitlement?.find((s) => s.id == user?.entitlement).leave_type == "CASUAL"
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
    if (user?.session && user?.from_date && user?.to_date) {
      calculateDifference(user?.from_date, user?.to_date);
    }
  }, [user?.session, user?.from_date, user?.to_date]);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      attachment: attachment1 + "," + attachment2,
    }));
  }, [attachment1, attachment1]);

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
        });
        setBalance(data.balance);
        setAttachment1(data?.attachment?.split(",")[0]);
        setAttachment2(data?.attachment?.split(",")[1]);
      }
      checkBalance(user?.entitlement);
    }

    if (type === "add") {
      clearData();
    }
  }, [data, type]);

  useEffect(() => {
    if (user?.entitlement) checkBalance(user?.entitlement);
  }, [user?.entitlement]);

  useEffect(() => {
    if (!user?.status) {
      console.log("here");

      // if (user?.from_date) {
      //     var Difference_In_Time = new Date(user?.from_date).getTime() - new Date().getTime();
      //     var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);
      //     if (Difference_In_Days < 1 && user?.session == "full_day") {
      //         setUser(prevValue => ({ ...prevValue, from_date: "", to_date: "" }))

      //         toast.error("full day leave can't be applied for next day")
      //     }
      // }
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
    <div className="EmployeeLeaveApplication">
      <div
        className="modal fade"
        id="ModalEmployeeLeaveApplication"
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
                  Leave Application Policy
                  <ol style={{ margin: 0 }}>
                    <li className="text-danger">
                      For Leaves Less than 1 Day, Apply ANYTIME.
                    </li>
                    <li className="text-danger">
                      For Leave of 1 Day Applying Immediately on next day, Half
                      Day will be sanctioned.
                    </li>
                    <li className="text-danger">
                      For Leave of 1 Day, Apply 1 Day Prior.
                    </li>
                    <li className="text-danger">
                      For Leaves of n Days, Apply n Days Prior.
                    </li>
                  </ol>
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Entitlement <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name="entitlement"
                      className="form-control"
                      value={user.entitlement}
                      onChange={(e) => {
                        handleChange(e);
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
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Session <span style={{ color: "red" }}>*</span>
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
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      From <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      name="from_date"
                      min={
                        role !== "SUPERADMIN"
                          ? date.toISOString().split("T")[0]
                          : null
                      }
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
                      min={
                        role !== "SUPERADMIN"
                          ? date.toISOString().split("T")[0]
                          : null
                      }
                      value={user.to_date}
                      onChange={(e) => {
                        calculateDifference(user.from_date, e.target.value, e);
                      }}
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
                      Reason <span style={{ color: "red" }}>*</span>
                    </lable>
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
                    <lable>Remark</lable>
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

                {type == "edit" ? null : (
                  <button
                    className="btn btn-success btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeaveApplication;
