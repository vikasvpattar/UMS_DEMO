import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LEAVE_ENTITLEMENT } from "../../../../utils/apiConstants";

function ModalAddEntitlment({
  reloadData,
  setLoading,
  empId,
  allData,
  collegeId,
  editType,
  edit,
}) {
  const [type, setType] = useState();
  const [policy, setPolicy] = useState();
  const [fDate, setFDate] = useState();
  const [entitled, setEntitled] = useState();
  const [carried, setCarried] = useState();
  const [year, setYear] = useState("");
  // const [loading,setLoading] = useState(0)

  const years = [
    {
      label: "2023",
      value: "2023",
    },
    {
      label: "2024",
      value: "2024",
    },
    {
      label: "2025",
      value: "2025",
    },
    {
      label: "2026",
      value: "2026",
    },
    {
      label: "2027",
      value: "2027",
    },
    {
      label: "2028",
      value: "2028",
    },
  ];

  function getLastDayOfYear(year) {
    return new Date(year, 11, 31);
  }

  const clearData = () => {
    setType("");
    setPolicy("");
    setFDate("");
    setTDate("2023-12-31");
    setEntitled("");
    setCarried("");
  };

  const [tDate, setTDate] = useState(
    getLastDayOfYear(new Date().getFullYear()).toISOString()?.split("T")[0]
  );

  const submitModal = async () => {
    setLoading(1);
    if (!year) {
      return toast.error("Please Select Mandatory Fields");
    }
    const data = {
      employee_id: empId,
      leave_type: type,
      earning_policy: policy,
      from_date: fDate,
      to_date: tDate,
      entitled_days: entitled,
      carried_over: carried,
      year: year,
    };
    const config = {
      method: editType == "edit" ? "put" : "post",
      url: `${LEAVE_ENTITLEMENT}/${editType == "edit" ? edit.id : ""}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        ...data,
        college_id: collegeId,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("success");
        reloadData(empId);
        clearData();
        setLoading(0);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(0);
      });
  };

  const entitledVAlue = (d) => {
    return ((parseInt(d) * 15) / 365).toFixed(2);
  };

  const calculateDifference = (a1, a2) => {
    var Difference_In_Time = new Date(a2).getTime() - new Date(a1).getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 60 * 60 * 24);

    if (type != "DUTY" && type != "COMP") {
      setEntitled(entitledVAlue(Difference_In_Days + 1));
    }
  };

  const handleDelete = async () => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${LEAVE_ENTITLEMENT}/${edit.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        status: "INACTIVE",
      },
    };
    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("success");
        reloadData(empId);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
        setLoading(0);
      });
  };

  useEffect(() => {
    if (editType == "edit") {
      setType(edit?.leave_type);
      setPolicy(edit?.earning_policy);
      setFDate(edit?.from_date.split("T")[0]);
      setTDate(edit?.to_date.split("T")[0]);
      setEntitled(edit?.entitled_days);
      setCarried(edit?.carried_over);
    } else {
      clearData();
    }
  }, [editType, edit]);

  useEffect(() => {
    if (type == "COMP") {
      setPolicy("IMMEDIATELY");
      setEntitled(1);
    } else if (type === "DUTY") {
      setEntitled(0);
    }
  }, [type]);

  return (
    <div>
      <div
        className="modal fade"
        id="ModalAddEntitlment"
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
                Add Entitlement
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
                      Type <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="">Select Leave Type</option>
                      {allData?.leaveType?.map((i, key) => (
                        <option key={key} value={i.id}>
                          {i.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Earning Policy <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      className="form-control"
                      value={policy}
                      onChange={(e) => {
                        setPolicy(e.target.value);
                      }}
                      disabled={type == "COMP" ? true : false}
                    >
                      <option value="">Select Earning Policy</option>
                      {allData?.earningPolicy?.map((i, key) => (
                        <option key={key} value={i.id}>
                          {i.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Earning Start <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      value={fDate}
                      onChange={(e) => {
                        setFDate(e.target.value);
                        calculateDifference(e.target.value, tDate);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Valid Until <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      value={tDate}
                      onChange={(e) => {
                        setTDate(e.target.value);
                        calculateDifference(fDate, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Select Year <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      className="form-control"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    >
                      <option value="">Select Year</option>
                      {years?.map((item, key) => {
                        return (
                          <option value={item?.value}>{item?.label}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Entiled Days <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Entitled Days"
                      // readOnly={type=="COMP" ? true : false}
                      value={entitled}
                      onChange={(e) => {
                        setEntitled(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Carried Over
                                        </lable>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='Enter carried over Days'
                                            value={carried}
                                            onChange={(e) => { setCarried(e.target.value) }}
                                        />
                                    </div>
                                </div> */}
              </div>
              <div className="row d-flex justify-content-between px-2">
                {editType == "edit" ? (
                  <button
                    className="btn btn-danger btn-rounded btn-outline"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleDelete}
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
                  onClick={submitModal}
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

export default ModalAddEntitlment;
