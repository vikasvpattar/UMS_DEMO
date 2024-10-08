import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import { ROUTES } from "../../../Router/routerConfig";
import { EMPLOYEE, EMPLOYEE_DELETE } from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_JOBROLES,
} from "../../../utils/LocalStorageConstants";
import { Http } from "../../../Services/Services";
import Swal from "sweetalert2";

function ViewStaff({ setLoading, collegeId }) {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const local_departments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));

  const [Employee, setEmployee] = useState([]);

  const [employeeData, setEmployeeData] = useState([]);

  const jobPositionOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES));

  const [status, setStatus] = useState("ACTIVE");
  const getJobRoles = () => {
    return localStorage.getItem(LOCAL_JOBROLES)
      ? JSON.parse(localStorage.getItem(LOCAL_JOBROLES))
      : [];
  };

  const [modalData, setModalData] = useState(null);

  const [flag, setFlag] = useState(false);

  const [jobRoles, setJobRoles] = useState(getJobRoles);

  const changeDir = (dir, key) => {
    navigate(`${dir}/${key}`);
  };

  const getData = () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${EMPLOYEE}?college_id=${collegeId}&status=${status}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        setEmployee(res.data.data);
        setFlag((flag) => !flag);
        setEmployeeData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  const deleteEmployee = async () => {
    var url;

    if (modalData.status == "ACTIVE") {
      url = EMPLOYEE_DELETE + `/${modalData.id}` + `?status=INACTIVE`;
    } else if (modalData.status == "INACTIVE") {
      url = EMPLOYEE_DELETE + `/${modalData.id}` + `?status=ACTIVE`;
    }

    console.log(url);
    let auth = sessionStorage.getItem("UMS_auth");

    const config = {
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setFlag((flag) => !flag);
        if (modalData.status == "ACTIVE") {
          toast.success("Employee Deleted Successfully");
          Swal.fire("Deleted!", "Employee Has been deleted", "success");
        } else if (modalData.status == "INACTIVE") {
          toast.success("Employee Activated Successfully");
          Swal.fire("Activated!", "Employee Has been Activated", "success");
        }
        getData();
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || "Can't able to delete Employee"
        );
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [status]);

  const selectRole = (id) => {
    if (id == "all") {
      return setEmployeeData(Employee);
    }

    setEmployeeData(Employee.filter((item) => item.role == id));
  };

  return (
    <div className="ViewStaff">
      <>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <form action="" method="POST">
                {/* start page title */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">View Staff </h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Human Resource</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            View Staff{" "}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-body">
                        <h2 className="card-title">Select Criteria</h2>
                        <br />
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom01">
                                Designation
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                id="role"
                                name="role"
                                className="form-control"
                                autoComplete="off"
                                onChange={(e) => selectRole(e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="all">ALL</option>

                                {jobRoles?.map((data, key) => {
                                  return (
                                    <option value={data.id}>{data.name}</option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="">Status</label>
                              <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row ">
                                                    <div className="col-md-12 ml-auto">
                                                        <button
                                                            className="btn btn-nex btn-rounded "
                                                            type="submit"
                                                            name="submit"
                                                        >
                                                            <i className="fa fa-search" aria-hidden="true" /> Search
                                                        </button>
                                                    </div>
                                                </div> */}
                      </div>
                    </div>
                    {/* end card */}
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <h2 className="card-title">Staff List</h2>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            id="myFilter"
                            className="form-control"
                            placeholder="Search Employee with name"
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row" id="myItems">
                        {employeeData && employeeData.length !== 0 ? (
                          employeeData
                            ?.filter((post) => {
                              if (search === "") {
                                return post;
                              } else if (
                                (
                                  post.first_name.toLowerCase() +
                                  " " +
                                  post.last_name.toLowerCase()
                                ).includes(search.toLowerCase())
                              ) {
                                return post;
                              }
                            })
                            .map((data, key) => {
                              return (
                                <>
                                  <div
                                    className="col-lg-6 col-xl-4 col-md-6 col-sm-12 crd"
                                    key={key}
                                  >
                                    <div className="card card-default p-2">
                                      <a
                                        href=""
                                        className="media text-secondary"
                                        data-toggle="modal"
                                        data-target={`#modal-contact-open`}
                                        onClick={() => setModalData(data)}
                                      >
                                        <img
                                          src={`${
                                            data?.photo
                                              ? data?.photo
                                              : "assets/images/Nexenstial Logo.jpg"
                                          }`}
                                          className="mr-3 img-fluid rounded-circle"
                                          alt="Avatar Image"
                                          width="30%"
                                          style={{ aspectRatio: "1/1" }}
                                        />
                                        <div className="media-body">
                                          <h5 className="mt-0 mb-2 text-dark">
                                            {data.first_name +
                                              " " +
                                              data.last_name}
                                          </h5>
                                          <ul className="list-unstyled text-smoke text-smoke">
                                            <li className="d-flex">
                                              <i className="mdi mdi-map mr-1" />
                                              <span>
                                                {
                                                  local_departments.find(
                                                    (s) =>
                                                      s.id ===
                                                      data.department_id
                                                  )?.name
                                                }
                                              </span>
                                            </li>
                                            <li className="d-flex">
                                              <i className="mdi mdi-account mr-1" />
                                              <span>
                                                {
                                                  jobPositionOpt?.find(
                                                    (s) => s?.id == data?.role
                                                  )?.name
                                                }
                                              </span>
                                            </li>
                                            <li className="d-flex">
                                              <i className="mdi mdi-phone mr-1" />
                                              <span>{data.phone}</span>
                                            </li>
                                          </ul>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                        ) : (
                          <div className="col-12">
                            <Nodata titleTop={"No Employees Added"} />
                          </div>
                        )}

                        {/* MODAL START */}
                        {modalData ? (
                          <div
                            className="modal fade"
                            id={`modal-contact-open`}
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered modal-lg"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header justify-content-end border-bottom-0">
                                  <button
                                    type="submit"
                                    className="btn-edit-icon btn-primary btn"
                                    onClick={() => {
                                      changeDir(
                                        ROUTES.HR.Employee.EditStaffRoute,
                                        modalData.id
                                      );
                                    }}
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i className="mdi mdi-pencil" />
                                  </button>
                                  &nbsp;&nbsp; &nbsp;
                                  <button
                                    type="button"
                                    className=" btn btn-danger btn-close-icon"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i className="mdi mdi-close" />
                                  </button>
                                </div>
                                <div className="modal-body pt-0">
                                  <div className="row no-gutters">
                                    <div className="col-md-6">
                                      <div className="profile-content-left px-4">
                                        <div className="card text-center px-0 border-0">
                                          <div className="card-img mx-auto">
                                            <img
                                              className="rounded-circle"
                                              src={`${
                                                modalData?.photo
                                                  ? modalData?.photo
                                                  : "assets/images/Nexenstial Logo.jpg"
                                              }`}
                                              alt="user image"
                                              width="30%"
                                              style={{ aspectRatio: "1/1" }}
                                            />
                                          </div>
                                          <div className="card-body">
                                            <h4 className="py-2">
                                              {modalData?.first_name +
                                                " " +
                                                modalData?.last_name}
                                            </h4>
                                            <p>
                                              {
                                                jobPositionOpt?.find(
                                                  (s) => s?.id == modalData.role
                                                )?.name
                                              }
                                            </p>
                                          </div>
                                        </div>
                                        {sessionStorage.getItem("role") ==
                                        "SUPERADMIN" ? (
                                          <button
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            className="btn btn-outline-danger w-100"
                                            onClick={() => {
                                              Swal.fire({
                                                title: "Are you sure?",
                                                text: "You won't be able to revert this!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText:
                                                  modalData.status == "ACTIVE"
                                                    ? "Yes, delete it!"
                                                    : "Yes, Turn to Active !",
                                              }).then((result) => {
                                                if (result.isConfirmed) {
                                                  deleteEmployee();
                                                }
                                              });
                                            }}
                                          >
                                            {modalData?.status == "ACTIVE"
                                              ? "Delete Employee"
                                              : "Turn Employee Status to Active"}
                                          </button>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="contact-info px-4">
                                        <h4 className="mb-1">Details</h4>
                                        <p className="text-dark font-weight-medium pt-4 mb-2">
                                          Department
                                        </p>
                                        <p>
                                          {
                                            local_departments.find(
                                              (s) =>
                                                s.id ===
                                                modalData?.department_id
                                            )?.name
                                          }
                                        </p>
                                        <p className="text-dark font-weight-medium pt-4 mb-2">
                                          Email address
                                        </p>
                                        <p>{modalData?.email}</p>
                                        <p className="text-dark font-weight-medium pt-4 mb-2">
                                          Phone Number
                                        </p>
                                        <p>{modalData?.phone}</p>
                                        <p className="text-dark font-weight-medium pt-4 mb-2">
                                          Date of Birth
                                        </p>
                                        <p>{modalData?.dob?.split("T")[0]}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {/* MODAL END */}
                      </div>
                    </div>
                  </div>
                  {/* end card */}
                </div>
              </div>
              {/* view Modal */}
            </div>
          </div>
        </div>
        {/* End Page-content */}
      </>
    </div>
  );
}

export default ViewStaff;
