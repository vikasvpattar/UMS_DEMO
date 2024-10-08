import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig";
import { SessionOpt } from "../../../Data/student/sessionData";
import { GET_EXAM_FORM } from "../../../utils/Examination.apiConst";

function PhdList({ setLoading }) {
  const navigate = useNavigate();

  const [spec, setSpec] = useState("");
  const [session, setSession] = useState("");
  const [data, setData] = useState([]);

  const getData = async (req, res) => {
    setLoading(1);
    if (session) {
      const config = {
        url: `${GET_EXAM_FORM}?discipline=${spec}&session=${session}`,
        method: "get",
        Headers: {
          "content-type": "application/json",
        },
      };

      await axios(config)
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(0);
  };

  useEffect(() => {
    getData();
  }, [spec]);

  return (
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
                          <option value="">All</option>
                          <option value="Pharmacy">Pharmacy</option>
                          <option value="Law">Law</option>
                          <option value="Science">Science</option>
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
                          {SessionOpt.map((i, key) => (
                            <option key={key} value={i.id}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button onClick={getData} className=" btn btn-primary">
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
                      <h4 className="card-title">
                        Ph.D Exam Candidates's List
                      </h4>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tr>
                        <th>Sl No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Faculty</th>
                        <th>Action</th>
                      </tr>
                      {data &&
                        data?.map((item, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{item?.name}</td>
                              <td>{item?.contact}</td>
                              <td>{item?.email}</td>
                              <td>{item?.discipline}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    navigate(
                                      `${ROUTES.Registar.Admission.PhdExamprofile}/${item.regNo}`,
                                      { state: { data: item } }
                                    );
                                  }}
                                >
                                  View
                                </button>
                                <button
                                  className="btn btn-danger ml-3"
                                  onClick={() => {
                                    navigate(
                                      `${ROUTES.Registar.Admission.PhdExamAdmitCard}/${item.regNo}`,
                                      { state: { data: item } }
                                    );
                                  }}
                                >
                                  Print
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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

export default PhdList;
