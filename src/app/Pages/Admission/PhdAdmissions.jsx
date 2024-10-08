import React from "react";
import { PHD_ADMISSIONS, PHD_ADMISSIONS_SQL } from "../../utils/apiConstants";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ROUTES } from "../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";
import { SESSION_ROLE } from "../../utils/sessionStorageContants";

function PhdAdmissions({ setLoading, collegeId }) {
  const [data, setData] = useState([]);

  const [showData, setShowData] = useState([]);

  const [spec, setSpec] = useState("All");
  const [role, setRole] = useState("");

  const [session, setSession] = useState("2024");

  const navigate = useNavigate();

  useEffect(() => {
    setRole(getRole());
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  const getRole = () => {
    return sessionStorage.getItem(SESSION_ROLE)
      ? sessionStorage.getItem(SESSION_ROLE)
      : null;
  };

  const getData = async () => {
    if (!session) return toast.error("Session is Required");
    setLoading(1);
    const config = {
      method: "get",
      url: `${PHD_ADMISSIONS_SQL}?student_application_session=${session}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(async (res) => {
        const sortedData = res.data.data.sort((a, b) => {
          return (
            new Date(b.application_submission_date) -
            new Date(a.application_submission_date)
          );
        });
        setData(sortedData);
        setShowData(sortedData);
        // setData(res.data.data);
        // setShowData(res.data.data);

        console.log(showData);
        setLoading(0);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  console.log("showData -", showData);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">Filter</div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Specialisation</label>
                          <select
                            name="application_for"
                            id=""
                            className="form-control"
                            value={spec}
                            onChange={(e) => setSpec(e.target.value)}
                          >
                            <option value="All">All</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Pharmacy">Pharmacy</option>
                            <option value="Law">Law</option>
                            <option value="Science">Science</option>
                            <option value="Nursing">Nursing</option>
                            <option value="Education">Education</option>
                            <option value="Commerce Management">
                              Commerce &amp; Management
                            </option>
                            <option value="Ayurveda">Ayurveda</option>
                            <option value="Homoeopathy">Homoeopathy</option>
                            <option value="Sanskrit">Sanskrit</option>
                            <option value="Arts Humanities">
                              Arts &amp; Humanities
                            </option>
                            <option value="IT Computer Science">
                              IT &amp; Computer Science
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Session <span className="text-danger">*</span>
                          </label>
                          <select
                            name="application_for"
                            id=""
                            className="form-control"
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                          >
                            <option value="">Select session</option>
                            {sessionOpt.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 mt-4">
                        <button onClick={getData} className="btn btn-nex ">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="card-title">Ph.D Admission's List</h4>
                      </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tr>
                          <th>Sl No</th>
                          <th>Candidate Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Faculty</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        {showData
                          ?.filter(
                            (s) => spec == "All" || s.application_for == spec
                          )
                          ?.map((i, key) => (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{i?.candidate_name}</td>
                              <td>{i?.phone}</td>
                              <td>{i?.email}</td>
                              <td>{i?.application_for}</td>
                              <td>
                                {i?.application_submission_date.split("T")[0]}
                              </td>
                              {/* <td>
                                <span
                                  className={`badge badge-soft-${
                                    i.payment_status === "Success"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {i.payment_status}
                                </span>
                              </td> */}
                              <td>
                                <span
                                  className={`badge badge-soft-${
                                    i.actual_payment_status === "Success"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {i.actual_payment_status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    if (role == "SUPERADMIN") {
                                      navigate(
                                        ROUTES.Registar.Admission
                                          .PhdAdmissionsprofile,
                                        { state: { data: i } }
                                      );
                                    } else if (role == "ADMIN") {
                                      navigate(
                                        ROUTES.Principal.PhdAdmissionsprofile,
                                        { state: { data: i } }
                                      );
                                    }
                                  }}
                                >
                                  View
                                </button>
                                <button
                                  className="btn btn-danger ml-3"
                                  onClick={() => {
                                    {
                                      if (role == "SUPERADMIN") {
                                        navigate(
                                          ROUTES.Registar.Admission
                                            .PhdAdmitCard +
                                            "/" +
                                            (key + 1),
                                          { state: { data: i } }
                                        );
                                      } else if (role == "ADMIN") {
                                        navigate(
                                          ROUTES.Principal.PhdAdmitCard +
                                            "/" +
                                            (key + 1),
                                          { state: { data: i } }
                                        );
                                      }
                                    }
                                  }}
                                >
                                  Print
                                </button>
                              </td>
                            </tr>
                          ))}
                      </table>
                    </div>
                  </div>
                  {/* end col */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhdAdmissions;
