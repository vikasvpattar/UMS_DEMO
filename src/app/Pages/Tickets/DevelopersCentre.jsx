import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routerConfig";
import { TICKET } from "../../utils/ticket.apiConst";

function DevelopersCentre({ setLoading }) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [ticketCount, setTicketCount] = useState(0);
  const [underReview, setUnderReview] = useState(0);
  const [pending, setPending] = useState(0);
  const [working, setWorking] = useState(0);
  const [active, setActive] = useState(0);

  const getData = async () => {
    let role = sessionStorage.getItem("role");
    setLoading(1);
    const config = {
      method: "get",
      url: role == "IT" ? `${TICKET}?whom=IT` : TICKET,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        let tickets = res.data.data;
        setTicketCount(tickets.filter((s)=> s.status != "COMPLETED").length);
        setPending(tickets.filter((s)=> s.status == "PENDING").length);
        setUnderReview(tickets.filter((s)=> s.status == "UNDER REVIEW").length);
        setWorking(tickets.filter((s)=> s.status == "WORKING").length);
        setActive(tickets.filter((s)=> s.status == "ACTIVE").length)
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const next = (data) => {
    sessionStorage.setItem("conversation_by", 100);
    navigate(`${ROUTES.developersConversation}/${data.ticket_no}`, {
      state: { data: data },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5>Pending Tickets List</h5>
              </div>
              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-body">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h6>Number of Tickets - {ticketCount}</h6>
                      </div>
                      <div className="col-md-3">
                        <h6>Active - {active}</h6>
                      </div>
                      <div className="col-md-3">
                        <h6>Working - {working}</h6>
                      </div>
                      <div className="col-md-3">
                        <h6>Under Review - {underReview}</h6>
                      </div>
                      {/* <div className="col-md-3">
                      <h6>Pending - {pending}</h6>
                      </div> */}
                    </div>
                  </div>
                    <table
                      className="table table-bordered dt-responsive nowrap table-hover"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Sl.No</th>
                          <th>Ticket No.</th>
                          <th>Ticket Received From</th>
                          <th>Title</th>
                          <th>Module</th>
                          <th>Description</th>
                          <th>Priority</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Attachment</th>
                          <th>Ticket Conversation</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        {data &&
                          data?.map((item, key) => {
                            if (item.status != "COMPLETED") {
                              return (
                                <>
                                  <tr>
                                    <td>{key + 1}</td>
                                    <td>{item?.ticket_no}</td>
                                    <td>{item?.employeeName}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.module}</td>
                                    <td>
                                      {item?.description.length > 30
                                        ? item?.description.slice(0, 10) +
                                          "   ...."
                                        : item?.description}
                                    </td>
                                    <td>{item?.priority}</td>
                                    <td>{item?.created_on.split("T")[0]}</td>
                                    <td></td>
                                    <td>{item?.status}</td>
                                    <td className="">
                                      <span className="mr-2 ">
                                        {item?.attachment ? (
                                          <a
                                            title="View Attachments"
                                            className="badge badge-primary text-light p-2"
                                            href={item?.attachment}
                                            target="_blank"
                                          >
                                            <i
                                              className="fa fa-link"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        ) : (
                                          " "
                                        )}
                                      </span>
                                      <a
                                        onClick={() => next(item)}
                                        className="badge badge-success p-2 text-light"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i
                                          className="fa fa-eye pl-3"
                                          aria-hidden="true"
                                        />
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          })}
                      </tbody> */}
                      <tbody>
                        {data &&
                          data?.filter((item) => item.status != "COMPLETED").map((item, key) => {
                              return (
                                <>
                                  <tr>
                                    <td>{key + 1}</td>
                                    <td>{item?.ticket_no}</td>
                                    <td>{item?.employeeName}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.module}</td>
                                    <td>
                                      {item?.description.length > 30
                                        ? item?.description.slice(0, 10) +
                                          "   ...."
                                        : item?.description}
                                    </td>
                                    <td>
                                      <span className={
                                        item?.priority === 'HIGH' ? 'badge badge-soft-danger' :
                                        item?.priority === 'MEDIUM' ? 'badge badge-soft-warning' :
                                        item?.priority === 'LOW' ? 'badge badge-soft-success' :
                                        'badge bg-secondary' 
                                      }>
                                        {item?.priority}
                                      </span>
                                    </td>
                                    <td>{item?.created_on.split("T")[0]}</td>
                                    <td>{item?.status}</td>
                                    <td>
                                    <span className="mr-2 ">
                                        {item?.attachment ? (
                                          <a
                                            title="View Attachments"
                                            className="badge badge-primary text-light p-2"
                                            href={item?.attachment}
                                            target="_blank"
                                          >
                                            <i
                                              className="fa fa-link"
                                              aria-hidden="true"
                                            />
                                          </a>
                                        ) : (
                                          " "
                                        )}
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        onClick={() => next(item)}
                                        className="badge badge-success p-2 text-light"
                                        style={{ cursor: "pointer" }}
                                      >
                                      <i
                                          className="fa pr-1 fa-eye"
                                          aria-hidden="true"
                                        />
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                </>
                              );
                          })}
                      </tbody>
                    </table>
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

export default DevelopersCentre;
