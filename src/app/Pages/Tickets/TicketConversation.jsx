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

import "./tickets.scss";

function TicketConversation({ setLoading }) {
  const fileref = useRef();

  const navigate = useNavigate();

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem("COLLEGE"))
  );

  const locate = useLocation();
  console.log(locate.state.data);

  const params = useParams();

  const [data, setData] = useState([]);
  const [x, setX] = useState();

  let y = locate.state.data?.status;

  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const [user, setUser] = useState({
    ticket_no: locate.state.data?.ticket_no,
    conversation: "",
    conversation_by: sessionStorage.getItem("conversation_by"),
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
      console.log(d);
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

  const updateStatus = async (id) => {
    setX("WORKING");
    setLoading(1);
    const config = {
      method: "put",
      url: `${TICKET}/${locate.state.data?.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        status: "WORKING",
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Successfully Updated Ticket Status");
        getData();
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

  const updateTicket = async () => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${TICKET}/${locate.state.data?.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        status: "COMPLETED",
      },
    };

    axios(config)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(0);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center">
                  <h4 className="mb-0">Ticket Detail</h4>
                </div>
              </div>
            </div>
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
                <hr />

                <div className="row">
                  <div className="col-md-7 border-right">
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
                          locate?.state?.data?.type == "Problem"
                            ? "badge badge-danger ml-2"
                            : "badge badge-warning ml-2"
                        }
                      >
                        {" "}
                        {locate?.state?.data?.type}
                      </span>
                      <span
                        className={
                          locate?.state?.data?.status == "ACTIVE"
                            ? "badge badge-danger ml-2"
                            : locate?.state?.data?.status == "UNDER REVIEW"
                            ? "badge badge-info ml-2"
                            : locate?.state?.data?.status == "WORKING"
                            ? "badge badge-primary ml-2"
                            : "badge badge-success ml-2"
                        }
                      >
                        {locate?.state?.data?.status == "COMPLETED" ? (
                          <i class="ri-award-fill mx-1"></i>
                        ) : locate?.state?.data?.status == "WORKING" ? (
                          <i class="ri-message-3-line mx-1"></i>
                        ) : (
                          <i class="ri-message-3-line mx-1"></i>
                        )}{" "}
                        {locate?.state?.data?.status}
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
                  <div className="col-md-5">
                    <table className="table table-bordered p-0">
                      <tr>
                        <th>Faculty:</th>
                        <td>
                          {
                            college?.find(
                              (s) => s.id == locate.state.data?.faculty
                            )?.name
                          }
                        </td>

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
                        <th>Mobile:</th>
                        <td> {locate.state.data?.mobile}</td>
                      </tr>
                      <tr>
                        <th>Creator Email:</th>
                        <td colSpan={3}> {locate.state.data?.email}</td>
                      </tr>
                      <tr>
                        <th>Created :</th>
                        <td>
                          {locate?.state?.data?.createdAt
                            ?.split("T")[0]
                            .split("-")[2] +
                            "." +
                            locate?.state?.data?.createdAt
                              ?.split("T")[0]
                              .split("-")[1] +
                            "." +
                            locate?.state?.data?.createdAt
                              ?.split("T")[0]
                              .split("-")[0] +
                            " -- " +
                            locate?.state?.data?.createdAt
                              ?.split("T")[1]
                              .split(".")[0]}
                        </td>

                        <th>Updated :</th>
                        <td>
                          {locate?.state?.data?.updatedAt
                            ?.split("T")[0]
                            .split("-")[2] +
                            "." +
                            locate?.state?.data?.updatedAt
                              ?.split("T")[0]
                              .split("-")[1] +
                            "." +
                            locate?.state?.data?.updatedAt
                              ?.split("T")[0]
                              .split("-")[0] +
                            " -- " +
                            locate?.state?.data?.updatedAt
                              ?.split("T")[1]
                              .split(".")[0]}
                        </td>
                      </tr>
                      <tr>
                        <th>Completed Date:</th>

                        <td>
                          {locate.state.data?.status == "COMPLETED"
                            ? locate?.state?.data?.updatedAt
                                ?.split("T")[0]
                                .split("-")[2] +
                              "." +
                              locate?.state?.data?.updatedAt
                                ?.split("T")[0]
                                .split("-")[1] +
                              "." +
                              locate?.state?.data?.updatedAt
                                ?.split("T")[0]
                                .split("-")[0] +
                              " -- " +
                              locate?.state?.data?.updatedAt
                                ?.split("T")[1]
                                .split(".")[0]
                            : "-"}
                        </td>

                        <th>Status:</th>
                        <td>
                          {locate.state.data?.status == "COMPLETED" ? (
                            <span className="badge badge-soft-success">
                              {" "}
                              <i class="fa fa-check mx-1"></i>COMPLETED
                            </span>
                          ) : locate.state.data?.status == "WORKING" ? (
                            <span className="badge badge-soft-primary">
                              {" "}
                              <i class="ri-message-3-line mx-1"></i>WORKING
                            </span>
                          ) : (
                            <span className="badge badge-soft-info">
                              {" "}
                              <i class="ri-message-3-line mx-1"></i>UNDER REVIEW
                            </span>
                          )}
                        </td>
                      </tr>
                      {locate.state.data?.status != "COMPLETED" ? (
                        <tr>
                          <th>
                            {role != "DEVELOPERS"
                              ? " Completed"
                              : " Upload Status of Ticket"}
                          </th>
                          <td>
                            {role != "DEVELOPERS" ? (
                              <button
                                onClick={updateTicket}
                                className="btn btn-sm btn-primary"
                              >
                                Yes
                              </button>
                            ) : (
                              <div
                                className="col-md-4 col-sm-1"
                                style={{ paddingTop: "2rem" }}
                              >
                                <select
                                  onChange={updateStatus}
                                  value={x ? x : y}
                                  className="form-control"
                                >
                                  <option value="">Select Status</option>
                                  <option value="WORKING">WORKING</option>
                                </select>
                              </div>
                            )}
                          </td>

                        </tr>
                      ) : null}
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
                                    {item?.conversation_by != 100
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

                <div className="row mb-2 mt-3">
                  <div className="col-12">
                    <h5>Update Ticket</h5>
                  </div>
                </div>

                <div className="row d-flex align-items-center">
                  <div className="col-md-8 ">
                    <div className="form-group">
                      <label>Details of Updation</label>

                      <textarea
                        name="conversation"
                        rows="2"
                        className="form-control"
                        cols="2"
                        value={user?.conversation}
                        onChange={(e) => handleChange(e)}
                        placeholder="Here..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Details of Updation</label>

                      <input
                        onChange={(e) => addAttachment1(e)}
                        type="file"
                        ref={fileref}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button
                      className="btn btn-success"
                      onClick={() => updateData()}
                    >
                      Submit
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

export default TicketConversation;
