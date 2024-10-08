import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../utils/AssetsReferenceTypes";
import {
  TICKET_CONVERSATION,
  TICKET_CREATE_CONVO,
  TICKET,
} from "../../utils/ticket.apiConst";
import { toast } from "react-toastify";

function DevelopersConversation({ setLoading }) {
  const fileref = useRef();

  const navigate = useNavigate();

  const locate = useLocation();

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem("COLLEGE"))
  );

  const params = useParams();

  const [data, setData] = useState([]);
  const [x, setX] = useState();

  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const [user, setUser] = useState({
    ticket_no: locate.state.data?.ticket_no,
    conversation: "",
    conversation_by: sessionStorage.getItem("conversation_by")
      ? sessionStorage.getItem("conversation_by")
      : sessionStorage.getItem("employee_id"),
    attachment: "",
    date_and_time: new Date(),
    module: locate.state.data?.module,
    role: role,
    created_by: locate.state.data?.employee_id,
  });

  const addAttachment1 = async (e) => {
    let empId = Math.floor(Math.random() * 100);
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${empId}_Bug_Fixing`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      user.attachment = d;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${TICKET_CONVERSATION}?id=${params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const getUpdatedData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${TICKET}?ticket_id=${params.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("Update", res.data.data);
        locate.state.data.status = res.data.data[0].status;
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const updateStatus = async (sta) => {
    if (sta == "UNDER REVIEW" && locate?.state?.data?.status != "WORKING") {
      return toast.error("Your Ticket Status Should be Working");
    }

    let obj = {
      status: sta,
      empEmail: locate?.state?.data?.email,
      empName: locate?.state?.data?.employeeName,
      module: locate?.state?.data?.module,
    };
    sessionStorage.setItem("TICKET_STATUS", "WORKING");
    setLoading(1);
    const config = {
      method: "put",
      url: `${TICKET}/${locate.state.data.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };

    await axios(config)
      .then(async (res) => {
        toast.success("Successfully Updated Ticket Status");
        await getData();
        await getUpdatedData();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const updateData = async () => {
    setLoading(1);
    const config = {
      method: "post",
      url: `${TICKET_CREATE_CONVO}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    };

    await axios(config)
      .then((res) => {
        toast.success("Successfully Updated Ticket");
        fileref.current.value = null;
        setUser({
          ticket_no: locate.state.data?.ticket_no,
          conversation: "",
          conversation_by: sessionStorage.getItem("conversation_by"),
          attachment: "",
          date_and_time: new Date(),
          module: locate.state.data?.module,
          role: role,
          created_by: locate.state.data?.conversation_by,
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="row px-3 d-flex justify-content-between align-items-center">
                  <h4 className="text-success text-uppercase">
                    <i class="fa fa-file-text mr-2"></i>
                    {locate.state.data?.title}
                  </h4>
                  <button
                    className="btn btn-info shadow-lg btn-sm d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i className="ri-arrow-left-line"></i>Back
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-8 border-right">
                    <div className="d-flex flex-row">
                      <span
                        className={
                          locate?.state?.data?.priority == "LOW"
                            ? "badge badge-info"
                            : locate?.state?.data?.priority == "MEDIUM"
                            ? "badge badge-warning"
                            : "badge badge-danger"
                        }
                      >
                        {locate?.state?.data?.priority}{" "}
                      </span>
                      <span
                        className={
                          locate?.state?.data?.status == "ACTIVE"
                            ? "badge badge-danger ml-2"
                            : "badge badge-success ml-2"
                        }
                      >
                        {locate?.state?.data?.status == "COMPLETED" ? (
                          <i className="fa fa-check mx-1" aria-hidden="true" />
                        ) : (
                          <i
                            className="fa fa-exclamation mx-1 "
                            aria-hidden="true"
                          />
                        )}{" "}
                        {locate?.state?.data?.status}
                      </span>
                      <span
                        className={
                          locate?.state?.data?.type == "Bug"
                            ? "badge badge-danger ml-2"
                            : "badge bdage-warning ml-2"
                        }
                      >
                        {" "}
                        {locate?.state?.data?.type}
                      </span>
                    </div>
                    {locate?.state?.data?.attachment ? (
                      <p className="mt-3">
                        <b>Attachment : </b>
                        <a
                          href={locate?.state?.data?.attachment}
                          target="_blank"
                        >
                          {locate?.state?.data?.attachment}
                        </a>
                      </p>
                    ) : null}

                    <p className="mt-3">
                      <b>
                        Description : <br></br>
                      </b>
                      {locate?.state?.data?.description}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <table className="table p-0">
                      <tr>
                        <th>Faculty:</th>
                        <td>
                          {
                            college?.find(
                              (s) => s.id == locate.state.data?.faculty
                            )?.name
                          }
                        </td>
                      </tr>
                      <tr>
                        <th>Module:</th>
                        <td>{locate.state.data?.module}</td>
                      </tr>
                      <tr>
                        <th>Creator:</th>
                        <td>
                          {" "}
                          {locate.state.data?.employee_id != 100
                            ? locate.state.data?.employeeName
                            : "Developers"}
                        </td>
                      </tr>
                      <tr>
                        <th>Creator Email:</th>
                        <td> {locate.state.data?.email}</td>
                      </tr>
                      <tr>
                        <th>Created Date:</th>
                        <td>{locate.state.data?.createdAt?.split("T")[0]}</td>
                      </tr>
                      <tr>
                        <th>Updated Date:</th>
                        <td>{locate.state.data?.updatedAt?.split("T")[0]}</td>
                      </tr>
                      <tr>
                        <th>Completed Date:</th>
                        <td>
                          {locate.state.data?.status == "COMPLETED"
                            ? locate.state.data?.updatedAt?.split("T")[0]
                            : "Not yet"}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <h5 class="caption-subject text-danger text-uppercase">
                  <i class="fa fa-list mr-2"></i>Activities
                </h5>
                <hr />
                <p>
                  <b>
                    <i>
                      <span className="text-info">
                        {" "}
                        <i class="fa fa-user mr-2"></i>
                        {locate.state.data?.employee_id != 100
                          ? locate.state.data?.employeeName
                          : "Developers"}
                      </span>
                    </i>
                  </b>{" "}
                  initiated the ticket on{" "}
                  <b>
                    <i>
                      <span className="text-info">
                        {" "}
                        <i class="fa fa-calendar mx-2"></i>
                        {locate.state.data?.createdAt?.split("T")[0]}
                      </span>
                    </i>
                  </b>{" "}
                </p>
                {locate.state.data?.attachment ? (
                  <a
                    className=" "
                    href={locate?.state?.data?.attachment}
                    target="_blank"
                    style={{ width: "40%" }}
                  >
                    <p
                      className="text-truncate border rounded p-2"
                      style={{ width: "40%" }}
                    >
                      <i class="fa fa-image text-info mr-2"></i>
                      {locate?.state?.data?.attachment}
                    </p>
                  </a>
                ) : null}

                <hr />

                <div className="">
                  {data &&
                    data?.map((item, key) => {
                      if (key > 0) {
                        return (
                          <div>
                            <p>
                              <b>
                                <i>
                                  <span className="text-info">
                                    {" "}
                                    <i class="fa fa-user mr-2"></i>
                                    {item?.conversation_by == 327
                                      ? "IT Department"
                                      : item?.conversation_by != 100
                                      ? item?.employeeName
                                      : "Team Nexenstial Development"}
                                  </span>
                                </i>
                              </b>{" "}
                              Updated on{" "}
                              <b>
                                <i>
                                  <span className="text-info">
                                    {" "}
                                    <i class="fa fa-calendar mx-2"></i>
                                    {item?.createdAt?.split("T")[0]}
                                  </span>
                                </i>
                              </b>{" "}
                            </p>
                            <p>{item?.conversation}</p>
                            {item?.attachment ? (
                              <a
                                className=" "
                                href={item?.attachment}
                                target="_blank"
                                style={{ width: "40%" }}
                              >
                                <p
                                  className="text-truncate border rounded p-2"
                                  style={{ width: "40%" }}
                                >
                                  <i class="fa fa-image text-info mr-2"></i>
                                  {item?.attachment}
                                </p>
                              </a>
                            ) : null}
                          </div>
                        );
                      }
                    })}
                </div>
                <hr />

                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-12">
                    <h5 style={{ paddingLeft: "4rem" }}>Update Ticket</h5>
                  </div>
                </div>
                <div className="row col-md-12" style={{ paddingTop: "2rem" }}>
                  <div className="col-md-4 col-sm-1">
                    <h5 style={{ textAlign: "center" }}>Details of Updation</h5>
                  </div>
                  <div className="col-md-4 col-sm-1">
                    <h5 style={{ textAlign: "center" }}>Upload Attachment</h5>
                  </div>
                  {role != "DEVELOPERS" && role != "IT" ? (
                    <div className="col-md-4 col-sm-1">
                      <h5 style={{ textAlign: "center" }}>
                        Satisfied With the Result ? (Tap Yes to Close the
                        Ticket)
                      </h5>
                    </div>
                  ) : (
                    <div className="col-md-4 col-sm-1">
                      <h5 style={{ textAlign: "center" }}>
                        Upload Status of Ticket
                      </h5>
                    </div>
                  )}
                </div>
                <div className="row col-md-12 col-sm-1">
                  <div
                    className="col-md-4 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <div className="form-group">
                      <textarea
                        name="conversation"
                        rows="5"
                        className="form-control"
                        cols="50"
                        value={user?.conversation}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                    </div>
                  </div>
                  <div
                    className="col-md-4 col-sm-1 d-flex"
                    style={{ justifyContent: "center" }}
                  >
                    <div className="form-group">
                      <input
                        onChange={(e) => addAttachment1(e)}
                        type="file"
                        ref={fileref}
                        style={{ marginTop: "2rem" }}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div
                    className="col-md-4 col-sm-1"
                    style={{ paddingTop: "2rem" }}
                  >
                    <select
                      onChange={(e) => {
                        updateStatus(e.target.value);
                      }}
                      value={
                        x
                          ? x
                          : locate.state.data?.status == "ACTIVE"
                          ? ""
                          : locate.state.data?.status
                      }
                      className="form-control"
                    >
                      <option value="">Select Status</option>
                      <option value="WORKING">WORKING</option>
                      <option value="UNDER REVIEW">UNDER REVIEW</option>
                    </select>
                  </div>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-4">
                    <button
                      className="btn btn-primary btn-lg"
                      style={{ marginLeft: "3.2rem", marginTop: "1rem" }}
                      onClick={() => updateData()}
                    >
                      Update
                    </button>
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
export default DevelopersConversation;
