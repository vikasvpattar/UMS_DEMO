import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routerConfig";
import { sessionOpt } from "../../Data/jsonData/Academics/Academics";
import {
  ACADEMICS_GET_BATCH,
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_GET_ASSIGN_STU,
  ACADEMICS_ASSIGN_BATCH,
} from "../../utils/Academics.apiConst";
import { STUDENT_SESSION } from "../../utils/apiConstants";
import { LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";
import { toast } from "react-toastify";

function AssignStudents({ collegeId, setLoading }) {
  //useStates
  const navigate = useNavigate();

  const locate = useLocation();

  console.log(locate?.state);

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

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [currentSemester, setCurrentSemester] = useState("");

  const [currentSection, setCurrentSection] = useState("");

  const [data, setData] = useState([]);

  const [all, setAll] = useState(false);

  const [flag, setFlag] = useState(false);

  const [count, setCount] = useState(0);

  const [batches, setBatches] = useState("");

  const [session, setSession] = useState("");

  const [batch, setBatch] = useState(locate?.state?.batch_id);

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const getAllData = async () => {
    setCurrentClass(locate?.state?.class);
    setFaculty(locate?.state?.faculty);
    if (collegeId != locate?.state?.college) {
      navigate(ROUTES.Registar.Academics.AddBatch);
    }
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    const [data1, data2, data3, data4, data5] = await Promise.all([
      await axios({ ...config, url: ACADEMICS_GET_BATCH })
        .then((res) => {
          setBatches(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
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

      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`,
      })
        .then((res) => {
          setSemesterOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${ACADEMICS_GET_ASSIGN_STU}?college_id=${collegeId}&session=${session}&batch_id=${batch}&class_id=${currentclass}`,
      })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data.length > 0) {
            let x = data?.filter(
              (s) =>
                !res.data.data.some(
                  (obj2) => s.data.id === obj2.student_session_id
                )
            );
            setData(x);
          }
          setLoading(0);
        })
        .catch((err) => {
          console.log(err);
          setLoading(0);
        }),
    ]);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleSearch = async () => {
    let newD = [];
    setLoading(1);
    const config = {
      method: "get",
      url:
        STUDENT_SESSION +
        `?college_id=${collegeId}&department_id=${faculty}&class_id=${currentclass}&section_id=${currentSection}&semester_id=${currentSemester}&session_id=${session}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        newD = res.data.data;
        console.log('student data - ', res.data.data);
        for(let i in res.data.data)
          res.data.data[i]['assigned'] = 0;
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });

    await axios({
      ...config,
      url: `${ACADEMICS_GET_ASSIGN_STU}?college_id=${collegeId}&session=${session}&batch_id=${batch}&class_id=${currentclass}`,
    })
      .then((res) => {
        console.log('assigned students - ', res.data.data);

        if (res.data.data.length > 0) {
          let x = newD?.filter(
            (s) =>
              !res.data.data.some(
                (obj2) => s.student_session_id === obj2.student_session_id
              )
          );
          for(let i in x) {
            x[i]['assigned'] = 1;
          }
          setData(x);
        }
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  const submitAll = async () => {
    setLoading(1);
    let data1 = [];
    data?.forEach((item) => {
      data1.push({
        student_session_id: item?.student_session_id,
        class_id: item?.class_id,
        batch_id: batch,
        user_id: item?.user_id,
        session: session,
      });
    });
    const config = {
      method: "post",
      url: ACADEMICS_ASSIGN_BATCH,
      data: data1,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Successfully Assigned Students");
        getAllData();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  const submitCountwise = async () => {
    setLoading(1);
    let data1 = [];
    let cnt = count;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (cnt == 0) {
        break;
      }
      data1.push({
        student_session_id: item?.student_session_id,
        class_id: item?.class_id,
        batch_id: batch,
        user_id: item?.user_id,
        session: session,
      });
      cnt--;
    }

    const config = {
      method: "post",
      url: ACADEMICS_ASSIGN_BATCH,
      data: data1,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Successfully Assigned Students");
        setCount(0);
        getAllData();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  const submit = async () => {
    if (all == true) {
      submitAll();
      return;
    }
    if (count > 0) {
      submitCountwise();
      return;
    }
    let data1 = [];
    data?.forEach((item) => {
      if (item?.data?.assigned) {
        data1.push({
          student_session_id: item?.student_session_id,
          class_id: item?.class_id,
          batch_id: batch,
          user_id: item?.user_id,
          session: session,
        });
      }
    });

    const config = {
      method: "post",
      url: ACADEMICS_ASSIGN_BATCH,
      data: data1,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Successfully Assigned Students");
        getAllData();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  useEffect(()=> {
    console.log('all - ', all);
  },[all]);

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Assign Students</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        <a href="javascript:void(0)"> Add Batch</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Assign Students
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
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            disabled={true}
                            value={faculty}
                            onChange={(e) => {
                              setFaculty(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {department?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
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
                            value={currentclass}
                            disabled={true}
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
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">Batch</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setBatch(e.target.value);
                            }}
                            value={locate?.state?.batch_id}
                            disabled={true}
                          >
                            <option>Select Batch</option>
                            {batches &&
                              batches
                                ?.filter(
                                  (s) => s.college_id == locate?.state?.college
                                )
                                ?.map((item, key) => {
                                  return (
                                    <option value={item?.id}>
                                      {item?.batch_name}
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          <select
                            className="form-control"
                            value={currentSemester}
                            onChange={(e) => {
                              setCurrentSemester(e.target.value);
                            }}
                          >
                            <option value="">Select Semester</option>
                            {semesterOpt
                              ?.filter((s) => s.class_id == currentclass)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Section</label>
                          <select
                            className="form-control"
                            value={currentSection}
                            onChange={(e) => {
                              setCurrentSection(e.target.value);
                            }}
                          >
                            <option value="">Select Section</option>
                            {sectionOpt &&
                              sectionOpt
                                ?.filter(
                                  (s) => s.semester_id == currentSemester
                                )
                                ?.map((i, key) => (
                                  <option value={i?.id}>{i?.name}</option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">Session</label>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              setSession(e.target.value);
                            }}
                          >
                            <option>Select Session</option>
                            {sessionOpt &&
                              sessionOpt?.map((item, key) => {
                                return (
                                  <option value={item?.id}>{item?.name}</option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-1">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-4 d-flex">
                        {" "}
                        <h4 className="card-title">Students Details</h4>
                        <input
                          type="number"
                          className="ml-4"
                          value={count}
                          onChange={(e) => {
                            setCount(e.target.value);
                            setFlag(!flag);
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <span className="float-right">
                          <button
                            className="btn btn-success float-right"
                            onClick={() => submit()}
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table
                        id="datatable"
                        className="table  nowrap table-hover "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>
                              <div className="checkbox mb0 mt0">
                                <input
                                  type="checkbox"
                                  onClick={() => {
                                    setAll(!all);
                                  }}
                                  id="select-all"
                                  className="checkbox"
                                  onchange="checkbox(this.checked)"
                                />{" "}
                                All
                              </div>
                            </th>
                            <th>Sl.No</th>
                            <th>Enrollment No</th>
                            <th>Student Name</th>
                            <th>Session</th>
                            <th>Department</th>
                            <th>Class</th>
                            <th>Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((d, key) => {
                            return (
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={
                                      all
                                        ? true
                                        : count > 0 && count >= key + 1
                                        ? true
                                        : d.assigned == 1
                                        ? true
                                        : false
                                    }
                                    className="checkbox"
                                    onClick={() => {
                                      setFlag(!flag);
                                      d.assigned == 1
                                        ? (d.assigned = 0)
                                        : (d.assigned = 1);
                                    }}
                                  />{" "}
                                </td>
                                <td>{key + 1}</td>
                                <td>{d?.user_id}</td>
                                <td>{d?.name}</td>
                                <td>{d?.session_id}</td>
                                <td>
                                  {
                                    department?.find(
                                      (s) => s.id == d?.department_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    classOpt?.find(
                                      (s) => s.id == d?.class_id
                                    )?.name
                                  }
                                </td>
                                <td>{d?.gender}</td>
                              </tr>
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
    </div>
  );
}

export default AssignStudents;
