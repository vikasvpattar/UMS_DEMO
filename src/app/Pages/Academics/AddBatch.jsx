import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routerConfig";
import axios from "axios";
import Select from 'react-select';
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_BATCH,
  ACADEMICS_GET_BATCH,
  ACADEMICS_UPDATE_BATCH,
} from "./../../utils/Academics.apiConst";
import { LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";
import { toast } from "react-toastify";

function AddBatch({ collegeId, setLoading }) {
  const navigate = useNavigate();

  const [classOpt, setClassOpt] = useState([]);

  const [id1, setId1] = useState();

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [bname, setBname] = useState("");

  const [batches, setBatches] = useState([]);

  const [edit, setEdit] = useState(true);

  const clearData = () => {
    setCurrentClass("");
    setFaculty("");
    setBname("");
  };

  const navigateToAssign = (state) => {
    const role = sessionStorage.getItem("role");

    if (role === "SUPERADMIN") {
      navigate(ROUTES.Registar.Student.assignStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    } else if (role === "ADMIN") {
      navigate(ROUTES.Principal.Student.AssignStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    } else {
      navigate(ROUTES.Employee.Student.AssignStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    }
  };

  const navigateToView = (state) => {
    // navigate(ROUTES.Registar.Academics.ViewPracStudents, {
    //   state: {
    //     faculty: state?.department_id,
    //     class: state?.class_id,
    //     college: state?.college_id,
    //     batch_id: state?.id,
    //     session: state?.session,
    //   },
    // });

    const role = sessionStorage.getItem("role");

    if (role === "SUPERADMIN") {
      navigate(ROUTES.Registar.Academics.ViewPracStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    } else if (role === "ADMIN") {
      navigate(ROUTES.Principal.Academics.ViewPracStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    } else {
      navigate(ROUTES.Employee.Academics.ViewPracStudents, {
        state: {
          faculty: state?.department_id,
          class: state?.class_id,
          college: state?.college_id,
          batch_id: state?.id,
        },
      });
    }
  };

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const getAllData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1] = await Promise.all([
      await axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  };

  const getBatches = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: ACADEMICS_GET_BATCH,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        setBatches(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  const handleSubmit = async () => {
    if (!bname || !currentclass || !faculty || !collegeId) {
      return toast.error("Please Enter Mandatory Details");
    }
    setLoading(1);
    let obj = {
      batch_name: bname,
      class_id: currentclass,
      department_id: faculty,
      college_id: collegeId,
    };
    const config = {
      method: "post",
      data: obj,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({ ...config, url: ACADEMICS_ADD_BATCH })
      .then((res) => {
        console.log(res);
        toast.success("Successfully Created Batch");
        clearData();
        getBatches();
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  var url, data;
  const updateBatch = async (id, status) => {
    await setId1(id?.id);
    if (status == "INACTIVE") {
      url = `${ACADEMICS_UPDATE_BATCH}/${id}?status=INACTIVE`;
      const config = {
        method: "put",
        data: data,
        url: url,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      };

      await axios(config)
        .then((res) => {
          toast.success("Successfully Updated Batch");
          console.log(res);
          clearData();
          getBatches();
        })
        .catch((err) => {
          console.log(err);
          setLoading(0);
        });
    } else {
      setEdit(!edit);
      await setCurrentClass(id?.class_id);
      await setBname(id?.batch_name);
      await setFaculty(id?.department_id);
    }
  };

  const x = async () => {
    url = `${ACADEMICS_UPDATE_BATCH}/${id1}`;
    data = {
      batch_name: bname,
      class_id: currentclass,
      department_id: faculty,
      college_id: collegeId,
    };
    const config = {
      method: "put",
      data: data,
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Successfully Updated Batch");
        console.log(res);
        setEdit(!edit);
        getBatches();
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  useEffect(() => {
    getAllData();
    getBatches();
  }, []);

  const handleDepartmentChange = async (selectedOption) => {
    setFaculty(selectedOption?.value || null);
    setCurrentClass(""); // Reset class_id when department changes
  };

  const handleChangeSelect = (name, selectedOption) => {
    setCurrentClass(selectedOption?.value || null);
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Batch</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active"> Add Batch</li>
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
                    <h2 className="card-title">Add Criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            value={faculty}
                            onChange={(e) => {
                              setFaculty(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              Select Department
                            </option>
                            {department?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={department?.map((i) => ({ value: i.id, label: i.name }))}
                            value={faculty ? { value: faculty, label: department?.find((i) => i.id === faculty)?.name } : null}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          {/* <select
                            className="form-control"
                            value={currentclass}
                            onChange={(e) => {
                              setCurrentClass(e.target.value);
                            }}
                          >
                            <option value="">Select Class</option>
                            {classOpt
                              ?.filter((s) => s?.department_id == faculty)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select> */}

                          <Select
                            options={classOpt
                              ?.filter((s) => s?.department_id == faculty)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={currentclass ? { value: currentclass, label: classOpt?.find((i) => i.id == currentclass)?.name } : null}
                            onChange={(selectedOption) => handleChangeSelect('currentclass', selectedOption)}
                            placeholder="Select Class"
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Batch Name</label>
                          <input
                            type="text"
                            name="bname"
                            value={bname}
                            onChange={(e) => setBname(e.target.value)}
                            className="form-control"
                            placeholder="Enter Bacth Name"
                            required=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-auto">
                      {edit ? (
                        <div className="ml-auto">
                          <button
                            className="btn btn-nex btn-rounded"
                            type="submit"
                            onClick={() => {
                              handleSubmit();
                            }}
                            name="submit"
                            value="batch"
                          >
                            <i className="fa fa-save" aria-hidden="true" />
                            Save
                          </button>
                        </div>
                      ) : null}
                      {!edit ? (
                        <div className="row float-right">
                          <button
                            className="btn btn-nex btn-rounded mr-2"
                            type="submit"
                            onClick={() => {
                              setEdit(true);
                              clearData();
                            }}
                            name="submit"
                            value="batch"
                          >
                            <i className="fa fa-save" aria-hidden="true" />
                            Cancel
                          </button>
                          <button
                            className="btn btn-nex btn-rounded mr-2"
                            type="submit"
                            onClick={() => {
                              x();
                            }}
                            name="submit"
                            value="batch"
                          >
                            <i className="fa fa-save" aria-hidden="true" />
                            Update
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          {" "}
                          <h4 className="card-title"> Subjects Lists</h4>
                        </div>
                        <div className="col-md-8 ">
                          <span className="float-right">
                            <acronym title="PDF">
                              {" "}
                              <a href="#">
                                <i
                                  className="fa fa-file-pdf-o "
                                  aria-hidden="true"
                                />
                              </a>
                            </acronym>
                            <a href="#"> </a> &nbsp;{" "}
                            <acronym title="Excel">
                              <a href="#">
                                {" "}
                                <i
                                  className="fa fa-file-excel-o"
                                  aria-hidden="true"
                                />
                              </a>
                            </acronym>
                            <a href="#"> </a>
                          </span>
                        </div>
                      </div>
                      <hr />
                      <table
                        id="datatable"
                        className="table table-bordered dt-responsive nowrap table-hover "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th> Sl. No.</th>
                            <th> Batch Name</th>
                            <th>Department</th>
                            <th>Class</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches &&
                            batches
                              ?.filter((s) => s.college_id == collegeId)
                              ?.map((item, key) => {
                                return (
                                  <tr>
                                    <td>{key + 1}</td>
                                    <td>{item?.batch_name}</td>
                                    <td>
                                      {department &&
                                        department?.filter(
                                          (s) => s.id == item?.department_id
                                        )[0]?.name}
                                    </td>
                                    <td>
                                      {classOpt &&
                                        classOpt?.filter(
                                          (s) => s.id == item?.class_id
                                        )[0]?.name}
                                    </td>
                                    <td>
                                      {" "}
                                      <a
                                        onClick={() => {
                                          navigateToAssign(item);
                                        }}
                                        className="badge badge-light"
                                        data-toggle="tooltip"
                                        title="Assign Students"
                                      >
                                        <i className="ri-price-tag-3-fill" />
                                      </a>{" "}
                                      &nbsp;{" "}
                                      <a
                                        href="javascript:void(0)"
                                        className="badge badge-light"
                                        data-toggle="tooltip"
                                        title="Edit"
                                        onClick={() => {
                                          updateBatch(item);
                                        }}
                                      >
                                        <i
                                          className="fa fa-edit "
                                          aria-hidden="true"
                                        />{" "}
                                      </a>{" "}
                                      &nbsp;
                                      <a
                                        className="badge badge-light"
                                        data-toggle="tooltip"
                                        title="deactive"
                                        onClick={() => {
                                          updateBatch(item?.id, "INACTIVE");
                                        }}
                                        href="javascript:void(0)"
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-thumbs-down"
                                          aria-hidden="true"
                                          style={{ color: "red" }}
                                        />{" "}
                                      </a>
                                      &nbsp;{" "}
                                      <a
                                        className="badge badge-light"
                                        data-toggle="tooltip"
                                        onClick={() => {
                                          navigateToView(item);
                                        }}
                                      >
                                        <i
                                          className="fa fa-eye"
                                          aria-hidden="true"
                                        />
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                      <br />
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
              </div>{" "}
              {/* end row */}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBatch;
