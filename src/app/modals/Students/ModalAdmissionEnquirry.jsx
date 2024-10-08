import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { STUDENT_ADMISSION_ENQUIRRY } from "../../utils/apiConstants";
import axios from "axios";
import { toast } from "react-toastify";

const ModalAdmissionEnquirry = ({ data, setLoading, reloadData }) => {
  const [status, setStatus] = useState(data?.status);
  const [note, setNote] = useState(data?.note);
  const [date, setDate] = useState(
    data?.date ? data?.date?.split("T")[0] : data?.createdAt?.split("T")[0]
  );
  const [followUpDate, setFollowUpDate] = useState(
    data?.follow_up_date?.split("T")[0]
  );
  const [response, setResponse] = useState(data?.response);
  const [dailyNotes, setDailyNotes] = useState([]);
  const [todayNotes, setTodayNotes] = useState("");

  const clearData = () => {
    setDate("");
    setFollowUpDate("");
    setNote("");
    setResponse("");
    setStatus("");
    setDailyNotes([]);
    setTodayNotes("");
  };

  const setConfirm = () => {
    const arr = [...dailyNotes];
    arr.push({ note: todayNotes, date: new Date().toISOString() });
    if (!data || !followUpDate || !status || !todayNotes)
      return toast.error("Mandatory fields are required");
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION_ENQUIRRY}/${data?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: status,
        date: date,
        follow_up_date: followUpDate,
        response: response,
        note: note,
        daily_progress: JSON.stringify(arr),
      },
    };
    axios(config)
      .then((res) => {
        setLoading(0);
        reloadData();
        toast.success(res.data.message);
        clearData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    setStatus(data?.status);
    setNote(data?.note);
    setDate(data?.date?.split("T")[0]);
    setFollowUpDate(data?.follow_up_date?.split("T")[0]);
    setResponse(data?.response);
    setDailyNotes(data?.daily_progress ? JSON.parse(data?.daily_progress) : []);
    setTodayNotes("");
  }, [data]);
  return (
    <div
      className="modal fade text-left"
      id="ModalAdmissionEnquirry"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Follow up Admission Enquiry
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Date <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="date"
                        className="form-control"
                        name="followup"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Next Follow Up Date{" "}
                        <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="date"
                        className="form-control"
                        name="nextfollowup"
                        value={followUpDate}
                        onChange={(e) => {
                          setFollowUpDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Response <span style={{ color: "red" }}>*</span>
                      </lable>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Response"
                        name="response"
                        value={response}
                        onChange={(e) => {
                          setResponse(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable> Note </lable>
                      <input
                        type="text"
                        className="form-control"
                        name="note"
                        placeholder="Enter Note"
                        id="note"
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <h6 className="text-primary">Daily Notes</h6>
                    {dailyNotes?.length != 0 ? (
                      dailyNotes?.map((item, index) => (
                        <div className="row mb-2" key={index}>
                          <div className="col-md-12 mb-0">
                            <p className="mb-0">
                              Date : {item?.date?.split("T")[0]}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p>Notes : {item?.note}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mb-3">No Daily Notes added</p>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="">
                        Today Notes <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Today Notes"
                        value={todayNotes}
                        onChange={(e) => {
                          setTodayNotes(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <lable>
                        {" "}
                        Status <span style={{ color: "red" }}>*</span>
                      </lable>
                      <select
                        name=""
                        id=""
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value="">Select Status</option>
                        <option value="ACTIVE">PENDING</option>
                        <option value="APPROVED">APPROVE</option>
                        <option value="DECLINED">DECLINE</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="hidden" name="enquiry_id" id="enquiry_id" />
                      <input
                        type="hidden"
                        defaultValue="enquiry_followup"
                        name="page_name"
                      />
                      <button
                        onClick={() => {
                          setConfirm();
                        }}
                        type="button float-right"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <section className="experience pb-100" id="experience">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8 mx-auto text-center">
                        <div className="section-title"></div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12" id="followdetails"></div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdmissionEnquirry;
