import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig";
import { STUDENT_ADMISSION_DETAILS } from "../../../utils/apiConstants";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import ModalAdmissionDetails from "../../../modals/Students/ModalAdmissionDetails";
import NoData from "./../../../Components/NoData/Nodata";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";

const AdmissionDetails = ({ setLoading, collegeId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reason, setReason] = useState("");
  const [data, setData] = useState();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState();
  const [year, setYear] = useState("");
  const [edit, setEdit] = useState();

  const getLocalColleges = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const getLocalPrograms = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const getLocalDepartments = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const getRole = () => {
    return sessionStorage.getItem(SESSION_ROLE)
      ? sessionStorage.getItem(SESSION_ROLE)
      : null;
  };

  const [localColleges] = useState(getLocalColleges());
  const [localPrograms] = useState(getLocalPrograms());
  const [localDepartments] = useState(getLocalDepartments());

  const changeDir = (i) => {
    console.log(i);
    // navigate(
    //   `${ROUTES.Registar.Admission.AdmissionProfile}/${i?.basic_data?.user_id}`
    // );
    switch (location?.pathname?.split("/")[1]) {
      case "registrar" || "registar" || "Registar" || "Registrar":
        console.log("Helllo");
        navigate(
          `${ROUTES.Registar.Admission.AdmissionProfile}/${i?.basic_data?.user_id}`,
          { state: { data: i } }
        );
        break;

      case "Principal" || "principal":
        navigate(
          `${ROUTES.Principal.Admission.AdmissionProfile}/${i?.basic_data?.user_id}`,
          { state: { data: i } }
        );
        break;

      case "Admin" || "admin":
        navigate(
          `${ROUTES.Admin.Admission.AdmissionProfile}/${i?.basic_data?.user_id}`,
          { state: { data: i } }
        );
        break;
      default:
        break;
    }
  };

  const getData = (stat) => {
    if (!status) return;
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION_DETAILS}?college_id=${collegeId}&application_status=${stat}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const updateData = async (application_id, studentId) => {
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION_DETAILS}/${studentId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        data: {
          reason_for_rejection: reason,
          status: "REJECTED",
        },
        application_no: application_id,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Successfully Updated Details");
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    setRole(getRole());
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useEffect(() => {
    if (role) {
      setStatus(role == "SUPERADMIN" ? "APPROVED_FACULTY" : "SUBMITTED");
    }
  }, [role]);

  useEffect(() => {
    if (status) {
      getData(status);
    }
  }, [status]);

  return (
    <div className="AdmissionDetails">
      <ModalAdmissionDetails
        data={edit}
        reloadData={getData}
        setLoading={setLoading}
      />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    {collegeId == 1111013 ? (
                      <>
                        <div className="d-flex justify-content-end">
                          <button
                            onClick={() => {
                              if (role == "SUPERADMIN") {
                                navigate(
                                  ROUTES.Registar.Admission.PhdAdmissions
                                );
                              } else if (role == "ADMIN") {
                                navigate(ROUTES.Principal.PhdAdmissions);
                              }
                            }}
                            className="btn btn-primary mb-3 ml-auto"
                          >
                            Go to Phd Admissions
                          </button>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            onClick={() => {
                              if (role == "SUPERADMIN") {
                                navigate(ROUTES.Registar.Admission.PhdExamList);
                              } else if (role == "ADMIN") {
                                navigate(ROUTES.Principal.PhdExamList);
                              }
                            }}
                            className="btn btn-primary mb-3 ml-auto"
                          >
                            Go to Phd Exam Forms
                          </button>
                        </div>
                      </>
                    ) : null}
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <form method="POST" className="needs-validation">
                      <div className="row">
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Source </label>
                                                        <select name="source" id="" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="\" />
                                                            <option value="Front Office">Front Office</option>
                                                            <option value="Front Office">Front Office</option>
                                                            <option value="Front Office">Front Office</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">Status</label>
                            <select
                              name="status"
                              className="form-control"
                              value={status}
                              onChange={(e) => {
                                setStatus(e.target.value);
                              }}
                            >
                              <option value="">Select Status</option>
                              <option
                                value={`${
                                  role == "SUPERADMIN"
                                    ? "APPROVED_FACULTY"
                                    : "SUBMITTED"
                                }`}
                                selected
                              >
                                Pending by you
                              </option>
                              {role == "ADMIN" ? (
                                <option value="APPROVED_FACULTY">
                                  Pending with Super Admin
                                </option>
                              ) : null}
                              {role == "SUPERADMIN" ? (
                                <option value="SUBMITTED">
                                  Pending with Dean
                                </option>
                              ) : null}
                              <option value="APPROVED_REGISTRAR">
                                Approved
                              </option>
                              <option value="DECLINED">Declined</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Year of Admission
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Admission Year"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label 
                                                        htmlFor="validationCustom01"
                                                        >
                                                            Year
                                                        </label>
                                                        <input 
                                                        type="number" 
                                                        placeholder='Enter Year'
                                                        className="form-control" 
                                                        value={year}
                                                        onChange={(e)=>{setYear(e.target.value)}}
                                                        />
                                                    </div>
                                                </div> */}
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">College</label>
                                                        <select name="status" className="form-control">
                                                            <option value="">Select College</option>
                                                            <option value="Active">Active</option>
                                                            <option value="passive">Passive</option>
                                                            <option value="win">Win</option>
                                                            <option value="loss">Loss</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                        {/* <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Program</label>
                                                        <select name="status" className="form-control">
                                                            <option value="">Select Program</option>
                                                            <option value="Active">Active</option>
                                                            <option value="passive">Passive</option>
                                                            <option value="win">Win</option>
                                                            <option value="loss">Loss</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                      </div>
                      {/* <div className="row float-right">
                                                <button
                                                    className="btn btn-primary btn-rounded"
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>
                                            </div> */}
                    </form>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="card-title">Admission Details</h4>
                      </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <table
                        id="datatable"
                        className="table table-bordered nowrap overflow-auto"
                        style={{ borderCollapse: "", borderSpacing: 0 }}
                      >
                        <thead>
                          <tr>
                            <th>Sl.No.</th>
                            <th style={{ minWidth: "200px" }}>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Program</th>
                            <th style={{ minWidth: "200px" }}>College</th>
                            <th>Department</th>
                            <th>Class</th>
                            {/* <th style={{minWidth:'100px'}}>Fees</th>
                                                        <th>Payment</th> */}
                            <th style={{ minWidth: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {data && data?.length !== 0 ? (
                            data
                              ?.filter((s) =>
                                status == "APPROVED_REGISTRAR"
                                  ? s?.basic_data?.year_of_admission == year
                                  : s
                              )
                              ?.map((i, key) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{key + 1}</td>
                                      <td>{i?.basic_data?.name}</td>
                                      <td>{i?.basic_data?.email}</td>
                                      <td>{i?.basic_data?.phone}</td>
                                      <td>
                                        {
                                          localPrograms.find(
                                            (s) =>
                                              s.id === i?.basic_data?.program_id
                                          )?.name
                                        }
                                      </td>
                                      <td>
                                        {
                                          localColleges.find(
                                            (s) =>
                                              s.id === i?.basic_data?.college_id
                                          )?.name
                                        }
                                      </td>
                                      <td>
                                        {
                                          localDepartments?.find(
                                            (s) =>
                                              s?.id ==
                                              i?.basic_data?.department_id
                                          )?.name
                                        }
                                      </td>
                                      <td>1st Year</td>
                                      {/* <td>
                                                                            ₹ 89,000
                                                                        </td>
                                                                        <td>
                                                                            PAID
                                                                        </td> */}
                                      <td style={{ minWidth: "120px" }}>
                                        <abb title="View">
                                          <a
                                            className="badge badge-light p-2"
                                            onClick={() => {
                                              changeDir(i);
                                            }}
                                          >
                                            {" "}
                                            <i
                                              className="fa fa-eye "
                                              aria-hidden="true"
                                            />{" "}
                                          </a>
                                        </abb>{" "}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={11}>
                                <NoData />
                              </td>
                            </tr>
                          )}
                        </tbody>
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
};

export default AdmissionDetails;
