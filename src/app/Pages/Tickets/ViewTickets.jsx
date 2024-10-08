import React from "react";
import { toast } from "react-toastify";
import {
  SESSION_EMPLOYEE_ID,
  SESSION_ROLE,
} from "../../utils/sessionStorageContants";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nodata from "../../Components/NoData/Nodata";
import axios from "axios";
import { ROUTES } from "../../Router/routerConfig";
import { TICKET, TICKET1 } from "../../utils/ticket.apiConst";
import { LOCAL_COLLEGE } from "../../utils/LocalStorageConstants";

const ViewTickets = ({ setLoading, collegeId }) => {
  let emp_id = sessionStorage.getItem("employee_id");
  const navigate = useNavigate();
  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [user, setUser] = useState({
    status: "",
    faculty: role != "SUPERADMIN" ? collegeId : "",
  });

  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url:
        role == "SUPERADMIN"
          ? `${TICKET}?status=${user?.status}&faculty=${user?.faculty}`
          : `${TICKET}?employee_id=${emp_id}&status=${user?.status}&faculty=${user?.faculty}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        res.data.data.sort((a, b) => {
          const priorityOrder = ["HIGH", "MEDIUM", "LOW"];
          const priorityIndexA = priorityOrder.indexOf(a.priority);
          const priorityIndexB = priorityOrder.indexOf(b.priority);

          return priorityIndexA - priorityIndexB;
        });

        res.data.data.sort((a, b) => {
          const ticketNoA = a.ticket_no;
          const ticketNoB = b.ticket_no;

          if (ticketNoA > ticketNoB) {
            return -1; // Return a negative value to sort in decreasing order
          } else if (ticketNoA < ticketNoB) {
            return 1; // Return a positive value to sort in increasing order
          } else {
            return 0; // Leave the order unchanged if they are equal
          }
        });

        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      employee_id: sessionStorage.getItem(SESSION_EMPLOYEE_ID),
    }));
  }, [sessionStorage.getItem(SESSION_EMPLOYEE_ID)]);

  const next = (data) => {
    role == "SUPERADMIN"
      ? sessionStorage.setItem("conversation_by", 187)
      : sessionStorage.setItem("conversation_by", data?.employee_id);
    navigate(`${ROUTES.Registar.ticketConversation}/${data.ticket_no}`, {
      state: { data: data },
    });
  };

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  useEffect(() => {
    setCollege(JSON.parse(localStorage.getItem(LOCAL_COLLEGE)));
  }, [localStorage.getItem(LOCAL_COLLEGE), collegeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">
                            Faculty <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            disabled={role != "SUPERADMIN" ? true : false}
                            value={user?.faculty}
                            onChange={handleChange}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {college?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Status</label>
                          <select
                            name="status"
                            id="section"
                            className="form-control"
                            value={user?.status}
                            onChange={handleChange}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="UNDER REVIEW"> UNDER REVIEW </option>
                            <option value="WORKING">WORKING</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row float-right">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={getData}
                        // onClick={handleFilter}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title"> Tickets List</div>

                    <div className="table-responsive mt-3">
                      <table className="table table-bordered ">
                        <thead className="bg-light">
                          <tr>
                            <th>Sl.no</th>
                            <th>Ticket Id</th>

                            <th>Ticket Date</th>

                            <th>Faculty</th>
                            <th>Raised by</th>
                            <th>Module</th>

                            {/* <td>Description</td> */}
                            <th width="30%">Ticket</th>
                            <th>To Whom</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>

                            {/* <td>Attachment</td> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        {data?.length != 0 ? (
                          data?.map((ticket, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{ticket?.ticket_no}</td>
                              <td>{ticket.created_on?.split("T")[0]}</td>
                              <td>
                                {college?.find((s) => s.id == ticket?.faculty1)
                                  ?.name
                                  ? college?.find(
                                      (s) => s.id == ticket?.faculty1
                                    )?.name
                                  : college?.find(
                                      (s) => s.id == ticket?.faculty
                                    )?.name}
                              </td>

                              <td>{ticket?.employeeName}</td>
                              {/* <td>{ticket?.employeeName}</td> */}
                              {/* <td>{ticket?.description}</td> */}

                              <td>{ticket?.module}</td>
                              <td>{ticket?.title}</td>
                              <td>{ticket?.whom}</td>
                              <td className="text-uppercase">
                                <span
                                  className={
                                    ticket?.type == "Problem"
                                      ? "badge badge-soft-danger"
                                      : "badge badge-soft-warning"
                                  }
                                >
                                  {ticket?.type}
                                </span>
                              </td>

                              <td>
                                <span
                                  className={`badge badge-soft-${
                                    ticket.priority == "LOW"
                                      ? "success"
                                      : ticket.priority == "MEDIUM"
                                      ? "warning"
                                      : "danger"
                                  }`}
                                >
                                  {ticket.priority}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge badge-soft-${
                                    ticket.status == "COMPLETED"
                                      ? "success"
                                      : ticket.status == "WORKING"
                                      ? "primary"
                                      : ticket.status == "UNDER REVIEW"
                                      ? "info"
                                      : "danger"
                                  }`}
                                >
                                  {ticket.status == "COMPLETED" ? (
                                    <span>
                                      <i
                                        className="fa fa-check mx-1 "
                                        aria-hidden="true"
                                      />{" "}
                                      Completed
                                    </span>
                                  ) : ticket.status == "WORKING" ? (
                                    <span>
                                      <i class="ri-message-3-line mx-1"></i>{" "}
                                      WORKING
                                    </span>
                                  ) : ticket.status == "UNDER REVIEW" ? (
                                    <span>
                                      <i class="ri-message-3-line mx-1"></i>{" "}
                                      UNDER REVIEW
                                    </span>
                                  ) : (
                                    <span>
                                      <i
                                        className="fa fa-exclamation mx-1 "
                                        aria-hidden="true"
                                      />{" "}
                                      ACTIVE{" "}
                                    </span>
                                  )}
                                </span>
                              </td>

                              <td className="justify-content-center d-flex">
                                <a
                                  onClick={() => next(ticket)}
                                  data-toggle="modal "
                                  className="cursor badge badge-success text-light p-2"
                                  style={{ cursor: "pointer" }}
                                  data-target="#ComplaintModal"
                                  title="View Ticket Details"
                                >
                                  <i
                                    className="fa fa-eye "
                                    aria-hidden="true"
                                  />
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTickets;
