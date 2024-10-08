import React, { useState, useEffect } from "react";
import Select from 'react-select';
import {
  ACADEMICS_ADD_LESSON,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
} from "../../utils/Academics.apiConst";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import Nodata from "../../Components/NoData/Nodata";

function AddLessons({ setLoading, collegeId }) {
  const [subject, setSubject] = useState([]);

  const [semOpt, setSemOpt] = useState();
  const [subjectOpt, setSubjectOpt] = useState();

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

  const [selectedSubjectOpt, setSelectedSubjectOpt] = useState();

  const getClassData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2, data3] = await Promise.all([
      axios({
        ...config,
        url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}&getInactive=0`,
      })
        .then((res) => {
          setSubjectOpt(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),
      axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),
    ]);

    const data = data1.data.data;
    const classData = data3.data.data;

    for (var i of data) {
      let ff = classData?.find((item) => item.id == i.class_id);
      if (ff) {
        i.name = ff.name + " (" + i.name + ") ";
        i.department_id = ff.department_id;
      }
    }

    setSemOpt(data);
  };

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(false);

  const [addNew, setAddNew] = useState(false);

  const [user, setUser] = useState({
    department_id: "",
    class_id: "",
    name: "",
    duration: "",
    course_id: "",
  });

  const clearData = () => {
    setUser({
      ...user,
      name: "",
      duration: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    if (!user.class_id) return toast.error("Class is required");
    if (!user.course_id) return toast.error("Subject is required");
    setLoading(1);
    const config = {
      method: "get",
      url:
        ACADEMICS_ADD_LESSON +
        `?college_id=${collegeId}&&class_id=${user?.class_id}&&course_id=${user?.course_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
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
    getData(user.class_id, user.course_id);
  };

  const handleSubmit = async () => {
    if (!user.class_id || !user.course_id || !user.name)
      return toast.error("Mandatory fields are required");
    setLoading(1);
    const config = {
      method: "post",
      url: ACADEMICS_ADD_LESSON,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
        created_by: sessionStorage.getItem("employee_id"),
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data added successfully");
        clearData();
        handleSearch();
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
      url: ACADEMICS_ADD_LESSON + `/${user.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Updated successfully");
        clearData();
        getData();
        setEdit(false);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //To dalete Data
  const handleDelete = async (i) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${ACADEMICS_ADD_LESSON}/${i?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };
    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Data Deleted");
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Some Error Occured");
      });
  };

  const handleSubjectSearch = () => {
    subjectOpt.filter((item) => {
      if (
        item.department_id == user.department_id &&
        item.class_id == user.class_id
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    // getData();
    getClassData();
  }, []);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add lessons</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">lesson Plan</a>
                      </li>
                      <li className="breadcrumb-item active"> Add lessons</li>
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
                          <label htmlFor="validationCustom02">
                            Select Department
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            id="class"
                            className="form-control  selectpicker"
                            value={user.department_id}
                            onChange={(e) => {
                              setUser((prev) => ({
                                ...prev,
                                department_id: e.target.value,
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
                            value={
                              user?.department_id
                                ? {
                                  value: user?.department_id,
                                  label: departmentOpt.find((data) => data.id == user?.department_id)
                                    ?.name,
                                }
                                : null
                            }
                            onChange={(selectedOption) => {
                              setUser((prev) => ({
                                ...prev,
                                department_id: selectedOption ? selectedOption.value : "",
                              }));
                            }}
                            options={departmentOpt.map((i) => ({
                              value: i.id,
                              label: `${i.name}, ${programOpt?.find((s) => s.id === i.program_id)?.name}`,
                            }))}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Year/Semester
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="class_id"
                            id="class"
                            className="form-control"
                            value={user.class_id}
                            onChange={(e) => {
                              handleChange(e);
                              setSelectedSubjectOpt(
                                subjectOpt.filter(
                                  (item) => item.semester_id == e.target.value
                                )
                              );
                            }}
                          >
                            <option value="">Select Class</option>
                            {semOpt
                              ?.filter(
                                (s) => s.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option key={key} value={i.id}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

<Select
      value={
        user?.class_id
          ? {
              value: user?.class_id,
              label: semOpt.find((data) => data.id == user?.class_id)?.name,
            }
          : null
      }
      onChange={(selectedOption) => {
        handleChange({ target: { name: "class_id", value: selectedOption ? selectedOption.value : "" } });
        setSelectedSubjectOpt(
          subjectOpt.filter(
            (item) => item.semester_id == selectedOption.value
          )
        );
      }}
      options={semOpt
        ?.filter(
          (s) => s.department_id == user?.department_id
        )
        ?.map((i) => ({
          value: i.id,
          label: i.name,
        }))}
      placeholder="Select Year/Semester"
    />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Subject<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            id="subject"
                            className="form-control"
                            value={user.course_id}
                            onChange={handleChange}
                            name="course_id"
                          >
                            <option value=""> Select Subject</option>
                            {subjectOpt
                              ?.filter((item) => {
                                if (
                                  item.department_id == user.department_id &&
                                  item.semester_id == user.class_id
                                ) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select>{" "} */}

<Select
      value={
        user?.course_id
          ? {
              value: user?.course_id,
              label: subjectOpt.find((data) => data.id == user?.course_id)?.name,
            }
          : null
      }
      onChange={(selectedOption) => {
        handleChange({ target: { name: "course_id", value: selectedOption ? selectedOption.value : "" } });
      }}
      options={subjectOpt
        ?.filter((item) => {
          if (
            item.department_id == user.department_id &&
            item.semester_id == user.class_id
          ) {
            return true;
          } else {
            return false;
          }
        })
        ?.map((i) => ({
          value: i.id,
          label: i.name,
        }))}
      placeholder="Select Subject"
    />
    
                        </div>
                      </div>
                      {addNew || edit ? (
                        <>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Name <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name of the lesson"
                                value={user.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Duration (in Hours)
                              </label>
                              <input
                                type="text"
                                name="duration"
                                placeholder="Enter the duration in Hours"
                                className="form-control"
                                value={user.duration}
                                onChange={handleChange}
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
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title"> Lessons List</h4>
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
                          <th>Subject</th>
                          <th>Lesson</th>
                          <th>Duration ( in hrs )</th>
                          {sessionStorage.getItem("role") != "STAFF" ? (
                            <th>Action</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((d, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>
                                {
                                  subjectOpt?.find(
                                    (item) => item.id == d?.course_id
                                  )?.name
                                }
                              </td>
                              <td>{d?.name}</td>
                              <td>{d?.duration}</td>
                              {sessionStorage.getItem("role") != "STAFF" ? (
                                <td>
                                  <acronym title="Edit">
                                    <a
                                      href="javascript:void(0)"
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
                                  <a href="javascript:void(0)"> </a> &nbsp;
                                  <acronym title="Inactive">
                                    <a
                                      href="javascript:void(0)"
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
                                  </acronym>
                                  <a href="javascript:void(0)"> </a>
                                </td>
                              ) : null}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default AddLessons;
