import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
} from "../../utils/Academics.apiConst";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import Nodata from "../../Components/NoData/Nodata";

function AddSubjects({ collegeId, setLoading }) {
  const [departmentOpt, setDepartmentOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );
  const [programOpt, setProgramOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );

  useEffect(() => {
    setDepartmentOpt(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), , collegeId]);

  const [classOpt, setClassOpt] = useState();
  const [semOpt, setSemOpt] = useState();
  const [selectedSemOpt, setSelectedSemOpt] = useState();

  //Fucntion to get data of classes
  const getClassData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2] = await Promise.all([
      await axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),

      await axios({
        ...config,
        url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSemOpt(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),
    ]);
  };

  // const semOpt = [
  //   {
  //     name: '1st Sem',
  //     id: 1
  //   },
  //   {
  //     name: '2nd Sem',
  //     id: 2
  //   },
  //   {
  //     name: '3rd Sem',
  //     id: 3
  //   },
  //   {
  //     name: '4th Sem',
  //     id: 4
  //   },
  //   {
  //     name: '5th Sem',
  //     id: 5
  //   },
  //   {
  //     name: '6th Sem',
  //     id: 6
  //   },
  //   {
  //     name: '7th Sem',
  //     id: 7
  //   },
  //   {
  //     name: '8th Sem',
  //     id: 8
  //   },
  //   {
  //     name: '9th sem',
  //     id: 9
  //   },
  //   {
  //     name: '10th sem',
  //     id: 10
  //   }
  // ]

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(false);

  const [addNew, setAddNew] = useState(false);

  const [user, setUser] = useState({
    name: "",
    semester_id: "",
    class_id: "",
    college_id: "",
    department_id: "",
    type: "",
    code: "",
    credit: "",
    internal_max_marks: "",
    internal_min_marks: "",
    viva_max_marks: "",
    viva_min_marks: "",
    midterm_max_marks: "",
    midterm_min_marks: "",
  });

  const clearData = () => {
    setUser((prev) => ({
      ...prev,
      name: "",
      code: "",
      type: "",
      credit: "",
      internal_max_marks: "",
      internal_min_marks: "",
      viva_max_marks: "",
      viva_min_marks: "",
      midterm_max_marks: "",
      midterm_min_marks: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async (a, b, c) => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ACADEMICS_ADD_SUBJECT}?college_id=${collegeId}&&department_id=${a}&&class_id=${b}&&semester_id=${c}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        // res.data.data.sort((a, b) => b.status - a.status);
        res.data.data.sort((a, b) => {
          if (a.status === "ACTIVE" && b.status === "INACTIVE") {
            return -1; // a comes before b
          }
          if (a.status === "INACTIVE" && b.status === "ACTIVE") {
            return 1; // b comes before a
          }
          return 0; // no change in order
        });
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleSearch = () => {
    if (!user.department_id || !user.class_id || !user.semester_id)
      return toast.error("Mandatory Fields are required");
    getData(user.department_id, user.class_id, user.semester_id);
  };

  const handleSubmit = async () => {
    setLoading(1);
    user["program_id"] = departmentOpt?.find(
      (s) => s.id == user.department_id
    )?.program_id;
    const config = {
      method: "post",
      url: ACADEMICS_ADD_SUBJECT,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

    console.log("user - ", user);
    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data added successfully");
        handleSearch();
        clearData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleEdit = async () => {
    setLoading(1);
    const config = {
      method: "put",
      url: ACADEMICS_ADD_SUBJECT + `/${user.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        setEdit(false);
        handleSearch();
        clearData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleDelete = async (i, status) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${ACADEMICS_ADD_SUBJECT}/${i?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        // status: "INACTIVE",
        status: status,
      },
    };
    axios(config)
      .then((res) => {
        setLoading(0);
        handleSearch();
        // toast.success("Data Updated");
        if (status === "ACTIVE") {
          toast.success("Data ACTIVE Successfully");
        } else if (status === "INACTIVE") {
          toast.success("Data INACTIVE Successfully");
        } else {
          toast.success("Data Updated");
        }
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Some Error Occured");
      });
  };

  useEffect(() => {
    getData();
    getClassData();
  }, []);

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
      class_id: "", // Reset class_id when department changes
    }));
  };

  const handleChangeSelect = (name, selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: selectedOption?.value || null,
    }));
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
                  <h4 className="mb-0">Add Subjects</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active"> Add Subjects</li>
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Department
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            id="class"
                            className="form-control"
                            value={user.department_id}
                            onChange={(e) => {
                              setUser((prev) => ({
                                ...prev,
                                department_id: e.target.value,
                                program_id: departmentOpt?.find(
                                  (s) => s.id == e.target.value
                                )?.program_id,
                              }));
                            }}
                          >
                            <option value="">Select Department</option>
                            {departmentOpt?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name},{" "}
                                {
                                  programOpt?.find((s) => s.id == i.program_id)
                                    .name
                                }
                              </option>
                            ))}
                          </select> */}

                          <Select
                            className="form-group"
                            name="department_id"
                            value={departmentOpt.find(
                              (option) => option.value === user.department_id
                            )}
                            onChange={handleDepartmentChange}
                            options={departmentOpt.map((i) => {
                              const programName =
                                programOpt.find(
                                  (item) => i.program_id === item.id
                                )?.name || "Program Not Found";
                              console.log(
                                `Department ID: ${i.id}, Program Name: ${programName}`
                              );
                              return {
                                value: i.id,
                                label: `${i.name}, ${programName}`,
                              };
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Class
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="class_id"
                            id="class"
                            className="form-control"
                            value={user.class_id}
                            onChange={(e) => {
                              handleChange(e);
                              setSelectedSemOpt(
                                semOpt.filter(
                                  (item) => item.class_id == e.target.value
                                )
                              );
                            }}
                          >
                            <option value="">Select Class</option>
                            {classOpt
                              ?.filter(
                                (s) => s?.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option key={key} value={i.id}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            options={classOpt
                              ?.filter(
                                (s) => s?.department_id == user.department_id
                              )
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              user.class_id
                                ? {
                                    value: user.class_id,
                                    label: classOpt?.find(
                                      (i) => i.id == user.class_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleChangeSelect("class_id", selectedOption)
                            }
                            placeholder="Select Class"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Semester
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="semester_id"
                            id="semester_id"
                            className="form-control"
                            value={user.semester_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Semester</option>
                            {selectedSemOpt?.map((i, key) => (
                              <option key={key} value={i.id}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            className="form-group"
                            name="semester_id"
                            value={
                              user.semester_id
                                ? {
                                    value: user.semester_id,
                                    label: semOpt
                                      ?.filter(
                                        (s) => s.class_id === user.class_id
                                      )
                                      ?.find((i) => i.id === user.semester_id)
                                      ?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              setUser((prev) => ({
                                ...prev,
                                semester_id: selectedOption.value,
                              }))
                            }
                            options={semOpt
                              ?.filter((s) => s.class_id === user.class_id)
                              ?.map((i) => {
                                console.log(
                                  `Semester ID: ${i.id}, Semester Name: ${i.name}`
                                );
                                return {
                                  value: i.id,
                                  label: i.name,
                                };
                              })}
                          />
                        </div>
                      </div>
                      {addNew || edit ? (
                        <>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Subject Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Subject Name"
                                value={user.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Subject Code
                              </label>
                              <input
                                type="text"
                                name="code"
                                value={user.code}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Subject Code"
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Select Subject Type
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="type"
                                id="class"
                                className="form-control"
                                value={user.type}
                                onChange={handleChange}
                              >
                                <option value="">Select Subject Type</option>
                                <option value="LECTURE">Theory</option>
                                <option value="NON_LECTURE">Non Lecture</option>
                                <option value="PRACTICAL">Practical</option>
                                <option value="SGT">SGT</option>
                                <option value="SDL">SDL</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Credits
                              </label>
                              <input
                                type="number"
                                name="credit"
                                value={user.credit}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Subject Credits"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Internal Max Marks
                              </label>
                              <input
                                type="number"
                                name="internal_max_marks"
                                value={user.internal_max_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Internal Maximum Marks"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Internal Min Marks
                              </label>
                              <input
                                type="number"
                                name="internal_min_marks"
                                value={user.internal_min_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Internal Minimum Marks"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Viva Max Marks
                              </label>
                              <input
                                type="number"
                                name="viva_max_marks"
                                value={user.viva_max_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Viva Maximum Marks"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Viva Min Marks
                              </label>
                              <input
                                type="number"
                                name="viva_min_marks"
                                value={user.viva_min_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Viva Minimum Marks"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Midterm Max Marks
                              </label>
                              <input
                                type="number"
                                name="midterm_max_marks"
                                value={user.midterm_max_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Midterm Maximum Marks"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Midterm Min Marks
                              </label>
                              <input
                                type="number"
                                name="midterm_min_marks"
                                value={user.midterm_min_marks}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter Midterm Minimum Marks"
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ml-auto">
                        {/* <button class="btn btn-nex btn-rounded btn-sm " type="submit" name="add" onclick= "return false"><i class="fa fa-plus" aria-hidden="true" ></i> Add lesson</button>
                              <br><br> */}
                        {addNew == false && edit == false ? (
                          <button
                            className="btn btn-nex btn-rounded float-lg-right mx-1 "
                            type="submit"
                            name="submit"
                            onClick={handleSearch}
                          >
                            <i className="fa fa-search" aria-hidden="true" />{" "}
                            Search
                          </button>
                        ) : null}

                        {edit == false ? (
                          <>
                            {addNew == false ? (
                              <button
                                className="btn btn-nex btn-rounded float-lg-right mx-1 "
                                type="submit"
                                name="submit"
                                onClick={() => setAddNew(true)}
                              >
                                <i className="fa fa-add" aria-hidden="true" /> +
                                Add New
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-nex btn-rounded float-lg-right mx-1"
                                  type="submit"
                                  name="submit"
                                  onClick={handleSubmit}
                                >
                                  <i
                                    className="fa fa-save"
                                    aria-hidden="true"
                                  />{" "}
                                  Save
                                </button>
                                <button
                                  className="btn btn-nex btn-rounded float-lg-right mx-1  p-2 px-3"
                                  type="submit"
                                  name="submit"
                                  // style={{aspectRatio:'1/1'}}
                                  onClick={() => {
                                    setEdit(false);
                                    setAddNew(false);
                                  }}
                                >
                                  {"<   "}&nbsp;&nbsp;&nbsp;{" "}
                                  <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                  />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <button
                            className="btn btn-nex btn-rounded float-lg-right mx-1"
                            type="submit"
                            name="submit"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* container-fluid */}

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title"> Subjects Lists</h4>
                      </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <table
                        id="datatable"
                        className="table table-bordered text-wrap table-hover "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th> Sl. No.</th>
                            <th>Department</th>
                            <th>class</th>
                            <th>Semester</th>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Subject Type</th>
                            <th>Credits</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((d, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>
                                  {
                                    departmentOpt.find(
                                      (item) => item.id == d.department_id
                                    )?.name
                                  }
                                </td>

                                <td>
                                  {
                                    classOpt?.find(
                                      (item) => item.id == d.class_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    semOpt?.find(
                                      (item) => item.id == d.semester_id
                                    )?.name
                                  }
                                </td>
                                <td>{d.name}</td>
                                <td>{d.code}</td>
                                <td>{d.type}</td>
                                <td>{d.credit}</td>
                                <td>{d.createdAt.split("T")[0]}</td>
                                <td>{d.updatedAt.split("T")[0]}</td>
                                <td>
                                  <span
                                    className={`badge badge-soft-${
                                      d.status == "ACTIVE"
                                        ? "success"
                                        : "danger"
                                    }`}
                                  >
                                    {d.status}
                                  </span>
                                </td>

                                <td>
                                  <acronym title="Edit">
                                    <a
                                      href="javascript:void(0)"
                                      className="badge badge-light"
                                      onClick={() => {
                                        setEdit(true);
                                        setUser({ ...d });
                                      }}
                                    >
                                      <i
                                        className="fa fa-edit "
                                        aria-hidden="true"
                                      />
                                    </a>
                                  </acronym>
                                  {/* <acronym title="Inactive">
                                    <a
                                      href="javascript:void(0)"
                                      className=" badge badge-light ml-2"
                                      onClick={() => {
                                        handleDelete(d);
                                      }}
                                    >
                                      <i
                                        className="fa fa-thumbs-down"
                                        aria-hidden="true"
                                        style={{ color: "red" }}
                                      />
                                    </a>
                                  </acronym> */}
                                  {d.status == "ACTIVE" ? (
                                    <acronym title="Inactive">
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() =>
                                          handleDelete(d, "INACTIVE")
                                        }
                                      >
                                        <i
                                          className="fa fa-thumbs-down"
                                          aria-hidden="true"
                                          style={{ color: "red" }}
                                        />
                                      </a>
                                    </acronym>
                                  ) : (
                                    <acronym title="active">
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() =>
                                          handleDelete(d, "ACTIVE")
                                        }
                                      >
                                        <i
                                          className="fa fa-thumbs-up"
                                          aria-hidden="true"
                                          style={{ color: "green" }}
                                        />
                                      </a>
                                    </acronym>
                                  )}
                                  <a href="javascript:void(0)"> </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {data?.length == 0 ? <Nodata /> : null}
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

export default AddSubjects;
