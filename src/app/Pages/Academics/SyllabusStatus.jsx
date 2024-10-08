import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_LESSON,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_UPDATE_SYLLABUS,
  ACADEMICS_ADD_SYLLABUS,
  ACADEMICS_ADD_TOPIC,
} from "../../utils/Academics.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
import Toggler from "./../../Components/Toggler/Toggler";
import swal from "sweetalert";
import Nodata from "../../Components/NoData/Nodata";
import { sessionOpt } from "./../../Data/jsonData/Academics/Academics";
import Select from "react-select";

function SyllabusStatus({ collegeId, setLoading }) {
  const [semOpt, setSemOpt] = useState([]);
  const [classOpt, setClassOpt] = useState([]);
  const [subjectOpt, setSubjectOpt] = useState([]);
  const [sectionOpt, setSectionOpt] = useState([]);
  const [lessonOpt, setLessonOpt] = useState([]);
  const [session, setSession] = useState("");

  const [selectedSubjectOpt, setSelectedSubjectOpt] = useState([]);
  const [selectedSectionOpt, setSelectedSectionOpt] = useState([]);
  const [selectedLessonOpt, setSelectedLessonOpt] = useState([]);

  const [classId, setClassId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [departmentOpt, setDepartmentOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );
  const [programOpt, setProgramOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );

  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [user, setUser] = useState({
    department_id: "",
    session_id: "",
    semester_id: "",
    section_id: "",
    lesson_id: "",
    course_id: "",
  });

  const getOtherData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2, data3, data4, data5] = await Promise.all([
      axios({
        ...config,
        url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}`,
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
        url: ACADEMICS_ADD_LESSON + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setLessonOpt(res.data.data);
          setLoading(0);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),

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
        url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
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
        console.log(err);
        toast.error("Something went wrong");
        return null;
      }),
    ]);

    // console.log(data3, data5)

    const data = data3?.data.data;

    // for (var i of data) {
    //   let ff = classData?.find(item => item.id == i.class_id)
    //   if (ff) {
    //     i.name = ff.name + " (" + i.name + ") "
    //   }
    // }
    setClassOpt(data5?.data.data);
    setSemOpt(data);
  };

  const getData = async () => {
    if (!user?.lesson_id) return toast.error("Mandatory fields are required");
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
        url:
          ACADEMICS_ADD_TOPIC +
          `?college_id=${collegeId}&&lesson_id=${user.lesson_id}`,
      }).catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        return [];
      }),
      await axios({
        ...config,
        url:
          ACADEMICS_ADD_SYLLABUS +
          `?college_id=${collegeId}&&lesson_id=${user.lesson_id}&&session_id=${user.session_id}`,
      }).catch((err) => {
        // setLoading(0)
        console.log(err);
        toast.error("Something went wrong");
        return null;
      }),
    ]);

    let cData = data2.data.data;
    let ncData = data1.data.data;
    console.log(cData, ncData);
    setData1(cData);
    cData = cData?.filter((s) => s.status == "ACTIVE");
    const processedCData = [];
    const processedNCData = [];

    const completeId = cData?.map((item) => item.topic_id);

    for (var j of ncData) {
      if (completeId.includes(j.id)) {
        console.log("exists");
      } else {
        const lObj = {
          id: j.id,
          complete: false,
          completion_date: null,
          session_id: j?.session_id,
          name: j.name,
        };

        processedCData.push(lObj);
      }
    }

    for (var k of cData) {
      const pObj = {
        id: k.topic_id,
        complete: true,
        completion_date: k?.completion_date,
        session_id: k?.session_id,
        name: ncData.find((item) => item.id == k.topic_id)?.name,
      };

      processedNCData.push(pObj);
      // setData(item => [...item, pObj])
    }

    setData([...processedCData, ...processedNCData]);
    setLoading(0);
  };

  const completeTopic = async (d) => {
    console.log("Hello");
    const obj = {
      section_id: user.section_id,
      session_id: user.session_id,
      course_id: user.course_id,
      lesson_id: user.lesson_id,
      topic_id: d.id,
      college_id: collegeId,
      completion_date: new Date().toLocaleString(),
    };

    const config = {
      method: "post",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: obj,
    };

    swal({
      title: "Are you sure?",
      text: "Once Completed, cannot be changed else contact higher authority",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(1);
        axios({ ...config, url: ACADEMICS_ADD_SYLLABUS })
          .then((data) => {
            setLoading(0);
            toast.success("Marked as Completed");
            getData();
          })
          .catch((err) => {
            console.log(err);
            setLoading(0);
            toast.error("Something went wrong");
          });
      } else {
        swal("Not Changed");
      }
    });
  };

  const deleteTopic = async (d) => {
    console.log(d.id);
    let id = data1?.filter(
      (s) => s?.topic_id == d.id && s?.session_id == parseInt(user?.session_id)
    )[0];
    console.log(id);
    let obj = {};
    if (id.status == "ACTIVE") {
      obj.status = "INACTIVE";
    } else {
      obj.status = "ACTIVE";
    }
    const config = {
      method: "put",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: obj,
    };

    swal({
      title: "Are you sure?",
      text: "Once Completed, cannot be changed else contact higher authority",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(1);
        axios({ ...config, url: `${ACADEMICS_UPDATE_SYLLABUS}/${id.id}` })
          .then((data) => {
            setLoading(0);
            toast.success("Marked as InCompleted");
            getData();
          })
          .catch((err) => {
            console.log(err);
            getData();
            setLoading(0);
            toast.error("Something went wrong");
          });
      } else {
        swal("Not Changed");
      }
    });
  };

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    const formatter = new Intl.DateTimeFormat("en-IN", options);
    return formatter.format(date);
  };

  const handleSearch = () => {
    getData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setDepartmentOpt(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), , collegeId]);

  useEffect(() => {
    getOtherData();
  }, []);

  const handleDepartmentChange = (selectedOption) => {
    setDepartmentId(selectedOption?.value);
  };

  const handleSessionChange = (selectedOption) => {
    setSession(selectedOption?.value);
  };

  const handleClassChange = (selectedOption) => {
    setClassId(selectedOption?.value);
  };

  const handleSemesterChange = (selectedOption) => {
    // Handle the change as needed
    setSelectedSectionOpt(
      sectionOpt?.filter((item) => item.semester_id == selectedOption?.value)
    );
    setSelectedSubjectOpt(
      subjectOpt?.filter((item) => item.semester_id == selectedOption?.value)
    );
  };

  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <form action="" method="POST"> */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Syllabus Status</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Lession Plan</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Syllabus Status
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
                          <label htmlFor="validationCustom02">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            value={departmentId}
                            onChange={(e) => {
                              setDepartmentId(e.target.value);
                            }}
                          >
                            <option value=""> Select Department</option>

                            {departmentOpt?.map((d, k) => (
                              <option value={d.id} key={k}>
                                {d.name},{" "}
                                {
                                  programOpt.find(
                                    (item) => item.id == d.program_id
                                  )?.name
                                }
                              </option>
                            ))}
                          </select>{" "} */}

                          <Select
                            options={departmentOpt?.map((d) => ({
                              value: d.id,
                              label: `${d.name}, ${programOpt.find((item) => item.id == d.program_id)?.name}`,
                            }))}
                            value={
                              departmentId
                              ? {
                                value: departmentId,
                                label: `${departmentOpt.find((d) => d.id == departmentId)?.name}, ${
                                  programOpt.find((item) => item.id == departmentOpt.find((d) => d.id == departmentId)?.program_id)?.name
                                }`
                              }
                              : null
                            }
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Session<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="session_id"
                            id="section"
                            className="form-control"
                            onChange={handleChange}
                          >
                            <option value="">Please Select</option>
                            {sessionOpt?.map((i, key) => (
                              <option key={key} value={i?.id}>
                                {i?.name}
                              </option>
                            ))}
                          </select>{" "} */}

                          <Select
                            name="session_id"
                            options={sessionOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={
                              session
                              ? {
                                value: session,
                                label: sessionOpt?.find((i) => i.id == session)?.name,
                              }
                              : null
                            }
                            onChange={handleSessionChange}
                            placeholder="Select Session"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            value={classId}
                            onChange={(e) => {
                              setClassId(e.target.value);
                            }}
                          >
                            <option value="">Please Select Class</option>
                            {classOpt
                              ?.filter((s) => s?.department_id == departmentId)
                              ?.map((d, k) => (
                                <option value={d.id} key={k}>
                                  {d.name}
                                </option>
                              ))}
                          </select>{" "} */}

                          <Select
                            className="form-group"
                            value={
                              classId
                              ? {
                                value: classId,
                                label: classOpt?.find((d) => d.id == classId)?.name,
                              }
                              : null
                            }
                            onChange={handleClassChange}
                            options={
                              classOpt
                              ?.filter((s) => s?.department_id == departmentId)
                              ?.map((d) => ({ value: d.id, label: d.name }))
                            }
                            placeholder="Select Class"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Semester<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="session_id"
                            id="section"
                            className="form-control"
                            required=""
                            onChange={(e) => {
                              setSelectedSectionOpt(
                                sectionOpt?.filter(
                                  (item) => item.semester_id == e.target.value
                                )
                              );
                              setSelectedSubjectOpt(
                                subjectOpt?.filter(
                                  (item) => item.semester_id == e.target.value
                                )
                              );
                            }}
                          >
                            <option value="">Please Select</option>
                            {semOpt
                              ?.filter((s) => s?.class_id == classId)
                              ?.map((d, k) => (
                                <option value={d.id} key={k}>
                                  {d.name}
                                </option>
                              ))}
                          </select>{" "} */}

                          <Select
                            name="session_id"
                            id="section"
                            className="form-group"
                            required
                            onChange={handleSemesterChange}
                            options={
                              semOpt
                              ?.filter((s) => s?.class_id == classId)
                              ?.map((d) => ({ value: d.id, label: d.name }))
                            }
                            placeholder="Select Semester"
                          />
                                                
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Section<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="section_id"
                            id="subject"
                            className="form-control"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            <option value="">Select Section</option>
                            {selectedSectionOpt?.map((d, k) => (
                              <option value={d.id} key={k}>
                                {d.name}
                              </option>
                            ))}
                          </select>{" "} */}

                          <Select
                            name="section_id"
                            id="subject"
                            className="form-group"
                            onChange={(selectedOption) => {
                              handleChange({
                                target: {
                                  name: "section_id",
                                  value: selectedOption?.value,
                                },
                              });
                            }}
                            options={
                              selectedSectionOpt?.map((d) => ({ value: d.id, label: d.name }))
                            }
                            placeholder="Select Section"
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Subject<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="course_id"
                            id="subject"
                            className="form-control"
                            required=""
                            onChange={(e) => {
                              setSelectedLessonOpt(
                                lessonOpt?.filter(
                                  (item) => item.course_id == e.target.value
                                )
                              );
                              handleChange(e);
                            }}
                          >
                            <option value=""> Select Subject</option>
                            {selectedSubjectOpt?.map((d, k) => (
                              <option value={d.id} key={k}>
                                {d.name}
                              </option>
                            ))}
                          </select>{" "} */}

                          <Select
                            name="course_id"
                            id="subject"
                            className="form-group"
                            required
                            onChange={(selectedOption) => {
                              const selectedSubjectId = selectedOption?.value;
                                setSelectedLessonOpt(
                                  lessonOpt?.filter((item) => item.course_id == selectedSubjectId)
                                );
                                handleChange({
                                  target: {
                                    name: "course_id",
                                    value: selectedSubjectId,
                                  },
                                });
                            }}
                            options={
                              selectedSubjectOpt?.map((d) => ({ value: d.id, label: d.name }))
                            }
                            placeholder="Select Subject"
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Lesson<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="lesson_id"
                            id="subject"
                            className="form-control"
                            onChange={handleChange}
                          >
                            <option value=""> Select Lesson</option>
                            {selectedLessonOpt?.map((d, k) => (
                              <option value={d.id} key={k}>
                                {d.name}
                              </option>
                            ))}
                          </select>{" "} */}

                          <Select
                            name="lesson_id"
                            id="subject"
                            className="form-group"
                            onChange={(selectedOption) => {
                              handleChange({
                                target: {
                                  name: "lesson_id",
                                  value: selectedOption?.value,
                                },
                              });
                            }}
                            options={
                              selectedLessonOpt?.map((d) => ({ value: d.id, label: d.name }))
                            }
                            placeholder="Select Lesson"
                          />

                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 ml-auto">
                        <button
                          className="btn btn-nex btn-rounded float-right"
                          // type="submit"
                          // name="submit"
                          onClick={() => handleSearch()}
                        >
                          <i className="fa fa-search" aria-hidden="true" />{" "}
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* </form> */}

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
                          <th>Topics</th>
                          <th>Topic Completion Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data?.map((d, key) => {
                            return (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{d.name}</td>
                                {/* <td>{d.complete ? d.completion_date : 'Incomplete'}</td> */}
                                <td>
                                  {d.complete
                                    ? // new Date(d.completion_date).toLocaleString('en-IN', {
                                      //   timeZone:'Asia/Calcutta'
                                      // })

                                      convertDate(d.completion_date)
                                    : "Incomplete"}
                                </td>
                                <td>
                                  {d.complete ? "Complete" : "Incomplete"}
                                </td>
                                <td>
                                  {d.complete ? (
                                    <Toggler
                                      label={""}
                                      checkedData={data1}
                                      id={d.id}
                                      session={user?.session_id}
                                      // defaultchecked={d.complete}
                                      checkboxValue1={() => deleteTopic(d)}
                                      checkboxValue={() => completeTopic(d)}
                                      checked={d.complete}
                                    />
                                  ) : (
                                    <Toggler
                                      label={""}
                                      checkedData={data1}
                                      id={d.id}
                                      session={user?.session_id}
                                      checked={false}
                                      checkboxValue1={() => deleteTopic(d)}
                                      checkboxValue={() => completeTopic(d)}
                                    />
                                  )}
                                </td>
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

export default SyllabusStatus;
