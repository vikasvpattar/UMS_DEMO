import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { STUDENT_COMPLAINT_GET } from "../../../utils/fees.apiConst";
import StudentComplaint from "../../../modals/Students/StudentComplaint";

function Complaints() {
  const [data, setData] = useState([]);
  const [modaldata, setModaldata] = useState([]);

  let clgdata = JSON.parse(localStorage.getItem("COLLEGE"));

  const getData = async () => {
    const config = {
      method: "get",
      url: STUDENT_COMPLAINT_GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };
    axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <div className="main-content">
        <StudentComplaint data={modaldata} />
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h5>Complaints List</h5>
              </div>
              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-body">
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
                          <th>Student Id</th>
                          <th>Name</th>
                          <th>Faculty</th>
                          <th>Complaint</th>
                          <th>Gender</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((item, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item?.student_id}</td>
                                  <td>{item?.name}</td>
                                  <td>
                                    {
                                      clgdata.filter(
                                        (s) => s.id == item?.faculty
                                      )[0]?.name
                                    }
                                  </td>
                                  <td>
                                    {item?.complaint.length > 20
                                      ? item?.complaint.slice(0, 10) + "   ...."
                                      : item?.complaint}
                                  </td>
                                  <td>{item?.gender}</td>
                                  <td>{item?.date.split("T")[0]}</td>
                                  <td className="justify-content-center d-flex">
                                    <a
                                      onClick={() => setModaldata(item)}
                                      data-toggle="modal"
                                      style={{ cursor: "pointer" }}
                                      data-target="#ComplaintModal"
                                    >
                                      <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                      />
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

export default Complaints;
