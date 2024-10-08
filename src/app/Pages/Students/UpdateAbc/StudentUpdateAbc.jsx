import React, { useEffect, useState } from "react";
import { LOCAL_DEPARTMENT } from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { toast } from "react-toastify";
import axios from "axios";
import { GET_STUDENT_ABC_INFO } from "../../../utils/apiConstants";
import bulkcsv from "../../../assets/template/bulk_abc_update.csv";
import papa from "papaparse";

const StudentUpdateAbc = ({ collegeId, setLoading }) => {
  const Department = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(
    (s) => s.college_id == collegeId
  );

  const [classOpt, setClassOpt] = useState([]);

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState("");

  const [editAbcNumber, setEditAbcNumber] = useState("");

  const [bulkData, setBulkData] = useState([]);

  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    class_id: "",
  });

  var commonConfig = { delimiter: "," };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleProcessCSV = (d) => {
    const arr = [];
    for (const i of d) {
      const obj = {
        abc_number: i["abc_number"],
        student_id: i["student_id"],
      };
      arr.push(obj);
    }

    console.log(arr);
    setBulkData(arr);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files) {
      papa.parse(files[0], {
        ...commonConfig,
        header: true,
        complete: async (res) => {
          console.log("com", res);
          await handleProcessCSV(res.data);
        },
      });
    }
  };

  const getClassData = async () => {
    if (!user.department_id) return;
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      method: "get",
      url: `${ACADEMICS_ADD_CLASS}?department_id=${user.department_id}`,
    };

    await axios(config)
      .then((res) => {
        setClassOpt(res.data.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });

    setLoading(false);
  };

  const getData = async () => {
    if (!user.department_id || !user.session_id || !user.class_id)
      return toast.error("Please select all fields");
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      method: "get",
      url: `${GET_STUDENT_ABC_INFO}?department_id=${user.department_id}&session_id=${user.session_id}&class_id=${user.class_id}`,
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!editAbcNumber) return toast.error("Please enter ABC number");
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      method: "put",
      url: `${GET_STUDENT_ABC_INFO}/${edit}`,
      data: {
        abc_number: editAbcNumber,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success(res.data.message);
        setEditAbcNumber("");
        setEdit("");
        getData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
    setLoading(false);
  };

  const handleBulkSubmit = async () => {
    if (bulkData?.length == 0) return toast.error("No Data");

    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      method: "post",
      url: `${GET_STUDENT_ABC_INFO}/bulk`,
      data: {
        data: bulkData,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success(res.data.message);
        setBulkData([]);
        getData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
    setLoading(false);
  };
  useEffect(() => {
    if (user.department_id) getClassData();
  }, [user.department_id]);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* Bulk update modal */}
          <div
            className="modal fade text-left"
            id={"bulk"}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered mw-100 w-50"
              role="document"
            >
              <div className="modal-content ">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Edit ABC Number
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h6>
                        Download the sample csv from{" "}
                        <a
                          href="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/bulk_abc_update.e211cabc24b83e2adebd.csv"
                          download
                        >
                          here
                        </a>{" "}
                        and fill the data{" "}
                      </h6>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="">Upload CSV Here</label>
                        <input
                          onChange={handleFileUpload}
                          type="file"
                          name=""
                          id=""
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="table-reponsive">
                        <table className="table table-bordered">
                          <tr>
                            <th>Student Id</th>
                            <th>ABC Number</th>
                          </tr>
                          {bulkData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.student_id}</td>
                              <td>{item.abc_number}</td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                    {bulkData.length > 0 && (
                      <div className="col-md-12 mt-4 d-flex justify-content-between align-items-center">
                        <button
                          data-dismiss="modal"
                          aria-label="Close"
                          className="btn btn-outline-danger btn-sm"
                        >
                          Cancel
                        </button>
                        <button
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={handleBulkSubmit}
                          className="btn btn-success btn-sm"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-header">Student Update ABC</h6>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Department</label>
                        <select
                          onChange={handleChange}
                          className="form-control"
                          name="department_id"
                          id=""
                        >
                          <option value="">Select Department</option>
                          {Department.map((s, i) => (
                            <option key={i} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Session</label>
                        <select
                          className="form-control"
                          onChange={handleChange}
                          name="session_id"
                          id=""
                        >
                          <option value="">Select Session</option>
                          {sessionOpt.map((s, i) => (
                            <option key={i} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Class</label>
                        <select
                          className="form-control"
                          onChange={handleChange}
                          name="class_id"
                          id=""
                        >
                          <option value="">Select Class</option>
                          {classOpt?.map((s, i) => (
                            <option key={i} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        onClick={getData}
                        className="btn btn-success float-right"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="   align-items-center">
                        Update ABC Number
                      </h6>
                    </div>
                    <div className="col-md-4 ">
                      {data?.length > 0 && (
                        <button
                          data-target="#bulk"
                          data-toggle="modal"
                          className="btn btn-success   float-right btn-sm"
                        >
                          Bulk Update
                        </button>
                      )}
                      <a
                        href="https://s3.ap-south-1.amazonaws.com/documents.swaminarayanuniversity.ac.in/university-assets/bulk_abc_update.e211cabc24b83e2adebd.csv"
                        download
                      >
                        <button className="btn btn-success  float-right mr-3 btn-sm">
                          Download Templete
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="table-responsive mt-3">
                    <table className="table table-bordered">
                      <tr>
                        <th>Sl. No</th>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>ABC Number</th>
                        <th>Action</th>
                      </tr>
                      {data?.map((i, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{i.student_id}</td>
                          <td>{i.name}</td>
                          <td>{i.abc_number}</td>
                          <td>
                            <button
                              onClick={() => setEdit(i.student_id)}
                              data-target={"#m" + i.student_id}
                              data-toggle="modal"
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </button>
                            <div
                              className="modal fade text-left"
                              id={"m" + i.student_id}
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered mw-100 w-50"
                                role="document"
                              >
                                <div className="modal-content ">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Edit ABC Number
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <label htmlFor="">Student Id</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={i.student_id}
                                            disabled
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div>
                                          <label htmlFor="">
                                            Student ABC Number
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Enter ABC Number here"
                                            className="form-control"
                                            value={editAbcNumber}
                                            onChange={(e) => {
                                              setEditAbcNumber(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12 mt-4 d-flex justify-content-between align-items-center">
                                        <button
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          onClick={handleSubmit}
                                          className="btn btn-success"
                                        >
                                          Save
                                        </button>
                                        <button
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          className="btn btn-outline-danger"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
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
};

export default StudentUpdateAbc;
