import React from "react";
import { toast } from "react-toastify";
import {
  SESSION_EMPLOYEE_ID,
  SESSION_ROLE,
} from "../../utils/sessionStorageContants";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE1 } from "../../utils/apiConstants";
import Nodata from "../../Components/NoData/Nodata";
import axios from "axios";
import { ROUTES } from "../../Router/routerConfig";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../utils/AssetsReferenceTypes";
import { TICKET } from "../../utils/ticket.apiConst";

const Tickets = ({ setLoading, collegeId }) => {
  const fileref = useRef(null);

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem("COLLEGE"))
  );

  let emp_id = sessionStorage.getItem("employee_id");
  const navigate = useNavigate();
  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [user, setUser] = useState({
    title: "",
    description: "",
    module: "",
    priority: "",
    attachment: "",
    type: "",
    whom: "ERP",
    faculty: collegeId,
    employee_id: parseInt(sessionStorage.getItem(SESSION_EMPLOYEE_ID)),
    created_on: new Date(),
  });

  const [whom, setWhom] = useState("");

  const [data, setData] = useState([]);

  const [emp, setEmp] = useState([]);

  const modules = [
    "HR Leave",
    "HR Payroll",
    "HR Other",
    "Fees",
    "Admission",
    "Examination",
    "Library",
    "Hostel",
    "Transport",
    "Academics",
    "Attendence",
    "Other",
  ];

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const clearValues = () => {
    setUser((prev) => ({
      ...prev,
      title: "",
      description: "",
      module: "",
      priority: "",
    }));
  };

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      faculty: collegeId,
    }));
  }, [collegeId]);

  const getEmployee = async () => {
    const config = {
      method: "get",
      url: `${EMPLOYEE1}?employee_id=${user?.employee_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };
    await axios(config)
      .then(async (res) => {
        console.log("Employee Information", res.data.data);
        setEmp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);
  const getData = async () => {
    setLoading(1);
    console.log(role);
    const config = {
      method: "get",
      url:
        role == "SUPERADMIN"
          ? TICKET
          : role == "IT"
          ? `${TICKET}?whom="IT"`
          : `${TICKET}?employee_id=${user?.employee_id}`,
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
        let x = res.data.data.filter((s) => s.status != "COMPLETED");
        setData(x);
        clearValues();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const handleSubmit = async () => {
    if (!user.employee_id)
      return toast.error("Please login back to raise a ticket");
    if (!user.title || !user.description || !user.priority || !user.whom)
      return toast.error("Please fill all the fields");
    setLoading(1);

    const config = {
      method: "post",
      url: TICKET,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        role,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Ticket raised successfully");
        clearValues();
        fileref.current.value = null;
        getData();
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

  useEffect(() => {
    if (user.employee_id) getData();
  }, [user.employee_id]);

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

  const next = (data) => {
    role == "SUPERADMIN"
      ? sessionStorage.setItem("conversation_by", 187)
      : sessionStorage.setItem("conversation_by", data?.employee_id);
    navigate(`${ROUTES.Registar.ticketConversation}/${data.ticket_no}`, {
      state: { data: data },
    });
  };

  const arr = [
    {
      id: 1,
      name: "Problem",
    },
    {
      id: 2,
      name: "Change Request",
    },
    {
      id: 3,
      name: "Clarification",
    },
    {
      id: 4,
      name: "Data Correction",
    },
    {
      id: 5,
      name: "New Feature",
    },
    {
      id: 6,
      name: "Not Specified",
    },
    {
      id: 7,
      name: "Old",
    },
  ];

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h4>Raise Tickets</h4>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">Create New Ticket</div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="modulename">Select Faculty</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            className="form-control"
                            value={user.faculty}
                            disabled={role != "SUPERADMIN" ? true : false}
                            onChange={handleChange}
                            name="faculty"
                          >
                            <option value="">Select Faculty</option>
                            {college.map((item, key) => (
                              <option value={item?.id}>{item?.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="ticketname">Title of Ticket</label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            id="ticketname"
                            placeholder="Enter Ticket Name"
                            value={user.title}
                            onChange={handleChange}
                            name="title"
                          />
                        </div>
                      </div>
                      {user?.whom != "IT" ? (
                        <>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="modulename">Select Module</label>
                              <span style={{ color: "red" }}>*</span>
                              <select
                                className="form-control"
                                id="modulename"
                                value={user.module}
                                onChange={handleChange}
                                name="module"
                              >
                                <option value="HR">Select Module</option>
                                {modules.map((module, index) => (
                                  <option key={index} value={module}>
                                    {module}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="priority">Select Type</label>
                              <span style={{ color: "red" }}>*</span>
                              <select
                                className="form-control"
                                value={user.type}
                                onChange={handleChange}
                                name="type"
                              >
                                <option value="">Select Type</option>
                                {arr?.map((item, key) => {
                                  return (
                                    <option id={item?.id}>{item?.name}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </>
                      ) : null}
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="priority">Select Priority</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            id="priority"
                            className="form-control"
                            value={user.priority}
                            onChange={handleChange}
                            name="priority"
                          >
                            <option value="">Select Priority</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Document </label>
                          <input
                            type="file"
                            className="form-control"
                            name="document"
                            ref={fileref}
                            onChange={(e) => addAttachment1(e)}
                            id="document"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <span style={{ color: "red" }}>*</span>
                          <textarea
                            className="form-control"
                            id="description"
                            placeholder="Enter Ticket Description"
                            value={user.description}
                            onChange={handleChange}
                            name="description"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mt-3">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary float-right"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card-title"> Tickets List</div>
                      </div>
                      <div className="col-md-6">
                        <button
                          onClick={() => {
                            navigate(ROUTES.ViewTickets);
                          }}
                          className="btn btn-success float-right"
                        >
                          View Tickets
                        </button>
                      </div>
                    </div>
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
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>

                            {/* <td>Attachment</td> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        {data?.length != 0 ? (
                          data?.map((ticket, index) =>
                            ticket.status != "COMPLETED" ? (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ticket?.ticket_no}</td>
                                <td>{ticket.created_on?.split("T")[0]}</td>
                                <td>
                                  {college?.find(
                                    (s) => s.id == ticket?.faculty1
                                  )?.name
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
                            ) : null
                          )
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

export default Tickets;
