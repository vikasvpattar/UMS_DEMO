import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_SUBJECT,
} from "../../../utils/Academics.apiConst";
import { STUDENT_SESSION } from "../../../utils/apiConstants";
import { STUDENT_MIDTERM } from "../../../utils/Examination.apiConst";
import { LOCAL_DEPARTMENT } from "../../../utils/LocalStorageConstants";

function StudentMidtermExam({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    session_id: "",
    department_id: "",
    class_id: "",
    semester_id: "",
    course_id: "",
    midterm_max_marks: "",
    midterm_min_marks: "",
  });

  const [editData, setEditData] = useState();

  const departmentOpt = JSON.parse(
    localStorage.getItem(LOCAL_DEPARTMENT)
  )?.filter((s) => s?.college_id == collegeId);

  const [classOpt, setClassOpt] = useState([]);

  const [semOpt, setSemOpt] = useState([]);

  const [data, setData] = useState();

  const [subjectOpt, setSubjectOpt] = useState([]);

  const [studentData, setStudentData] = useState([]);

  const [mainData, setMainData] = useState([]);

  const [isPrev, setIsPrev] = useState(false);

  const [subSelected, setSubSelected] = useState();

  ///////////Helping functions ///////////
  const handleChange = (id, name, value) => {
    console.log(id, name, value);

    const arr = [];

    for (const el in mainData) {
      if (mainData[el]?.student_id == id) {
        if (name === "marks" && value < 0) {
          toast.error("Marks cannot be negative");
          return; // Return if validation fails
        }

        if (name === "marks" && mainData[el]?.absent) {
          toast.error("Cannot enter marks for an absent student");
          return; // Return if validation fails
        }

        // if (
        //   name === "marks" &&
        //   subjectOpt?.find((s) => s?.id == subSelected)?.midterm_max_marks <=
        //     0 &&
        //   subjectOpt?.find((s) => s?.id == subSelected)?.midterm_min_marks <= 0
        // ) {
        //   toast.error("Please Add Midterm Max and Min Marks in Add Subject");
        //   return;
        // }

        if (
          name === "marks" &&
          (subjectOpt?.find((s) => s?.id == subSelected)?.midterm_max_marks ===
            undefined ||
            subjectOpt?.find((s) => s?.id == subSelected)?.midterm_min_marks ===
              undefined)
        ) {
          toast.error("Please Add Midterm Max and Min Marks in Add Subject");
          return;
        }

        const obj = {
          ...mainData[el],
          [name]: value,
        };
        // Add validation for marks
        if (
          name === "marks" &&
          value >
            subjectOpt?.find((s) => s?.id == subSelected)?.midterm_max_marks
        ) {
          toast.error(
            `Marks cannot be greater than internal max marks (${
              subjectOpt?.find((s) => s?.id == subSelected)?.midterm_max_marks
            })`
          );
          return; // Return if validation fails
        }
        arr.push(obj);
      } else {
        arr.push(mainData[el]);
      }
    }

    setMainData([...arr]);
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_MIDTERM}?session_id=${user?.session_id}&course_id=${user?.course_id}&status=ACTIVE`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("dta", res);
        setSubSelected(user?.course_id);
        setData(res.data.data);
        if (res?.data?.length != 0) {
          setMainData(res.data);
          setIsPrev(true);
        } else {
          setIsPrev(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      });
    setLoading(0);
  };

  const getStudentsData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_SESSION}?session_id=${user?.session_id}&class_id=${user?.class_id}&semester_id=${user?.semester_id}&status_student=ACTIVE&status=ACTIVE`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(async (res) => {
        setStudentData(res.data.data);
        await setMainData(
          res?.data?.data?.map((s) => {
            const obj = {
              student_id: s.user_id,
              course_id: user?.course_id,
              session_id: user?.session_id,
              semester_id: user?.semester_id,
              marks: "",
              absent: "",
              remark: "",
              midterm_max_marks: "",
              midterm_min_marks: "",
            };
            return obj;
          })
        );
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const getClassAndSemData = async () => {
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
        url: `${ACADEMICS_ADD_CLASS}?department_id=${user?.department_id}`,
      })
        .then((res) => {
          console.log(res);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
        }),
      await axios({
        ...config,
        url: `${ACADEMICS_ADD_SEMESTER}?department_id=${user?.department_id}`,
      })
        .then((res) => {
          console.log(res);
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);

    setClassOpt(data1);
    setSemOpt(data2);
    console.log(data1, data2);

    setLoading(0);
  };

  const getSubjects = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ACADEMICS_ADD_SUBJECT}?class_id=${user?.class_id}&semester_id=${user?.semester_id}&getInactive=0`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setSubjectOpt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const handleSubmit = async () => {
    for (const i of mainData) {
      if (!i?.marks && !i?.absent)
        return toast.error(`Missing marks for student (${i?.student_id})`);
      if (i?.absent && !i?.remark)
        return toast.error(
          `Student (${i?.student_id}) is absent but deosn't added note`
        );
    }
    setLoading(1);
    const config = {
      method: "post",
      url: `${STUDENT_MIDTERM}/all`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        data: mainData,
      },
    };

    await axios(config)
      .then((res) => {
        toast.success("Success");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const handleEdit = async () => {
    if (
      (editData?.absent == "true" || editData?.absent == true) &&
      !editData?.remark
    )
      return toast.error("Note shold be added for absent students");
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_MIDTERM}/${editData?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: editData,
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Success");
        getStudentsData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  useEffect(() => {
    getClassAndSemData();
  }, [user?.department_id]);

  useEffect(() => {
    if (!user?.semester_id) setSubjectOpt([]);
    else getSubjects();
  }, [user?.semester_id]);

  return (
    <div>
      <div
        className="modal fade"
        id="modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Marks
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
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Enrollment Number</label>
                    <input
                      type="text"
                      value={editData?.student_id}
                      className="form-control"
                      readOnly={true}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Student Name</label>
                    <input
                      type="text"
                      value={
                        studentData?.find(
                          (s) => s?.data?.student_id == editData?.student_id
                        )?.studentInfo?.name
                      }
                      className="form-control"
                      readOnly={true}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="col-md-4"></div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Attendance</label>
                    <select
                      name=""
                      id=""
                      value={editData?.absent}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          absent: e.target.value,
                        }));
                        if (e.target.value == "true") {
                          setEditData((prev) => ({
                            ...prev,
                            marks: 0,
                          }));
                        }
                      }}
                      className="form-control"
                    >
                      <option value={"false"} selected>
                        Present
                      </option>
                      <option value={"true"}>Absent</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">marks</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editData?.marks}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          marks: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">remarks</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData?.remark}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          remark: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex mt-3">
                <button
                  className="btn btn-primary"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleEdit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card p-2">
                  <div className="card-title">Select Criteria</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Department</label>
                          <select
                            name="department_id"
                            value={user?.department_id}
                            onChange={handleChange2}
                            className="form-control"
                          >
                            <option value="">select department</option>
                            {departmentOpt?.map((i, key) => (
                              <option key={key} value={i?.id}>
                                {i?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Session</label>
                          <select
                            name="session_id"
                            value={user?.session_id}
                            onChange={handleChange2}
                            className="form-control"
                          >
                            <option value="">select Session</option>
                            {sessionOpt?.map((i, key) => (
                              <option key={key} value={i?.id}>
                                {i?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Class</label>
                          <select
                            name="class_id"
                            value={user?.class_id}
                            onChange={handleChange2}
                            className="form-control"
                          >
                            <option value="">select Class</option>
                            {classOpt
                              ?.filter(
                                (s) => s?.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option key={key} value={i?.id}>
                                  {i?.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Semester</label>
                          <select
                            name="semester_id"
                            value={user?.semester_id}
                            onChange={handleChange2}
                            className="form-control"
                          >
                            <option value="">select Semester</option>
                            {semOpt
                              ?.filter((s) => s?.class_id == user?.class_id)
                              ?.map((i, key) => (
                                <option value={i?.id}>{i?.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Subject</label>
                          <select
                            name="course_id"
                            value={user?.course_id}
                            onChange={handleChange2}
                            className="form-control"
                          >
                            <option value="">select Subject</option>
                            {subjectOpt?.map((i, key) => (
                              <option value={i?.id}>
                                {i?.name}-({i?.type})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={getStudentsData}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="card col-12 p-2">
                    <div className="card-title">Student Mid-term Marks</div>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tr>
                          <th>Sl</th>
                          <th>Student Name</th>
                          <th>Enrollment Number</th>
                          <th>Subject</th>
                          <th>Type</th>
                          <th>Max Marks</th>
                          <th>Min Marks</th>
                          <th>Is absent</th>
                          <th>Obt Marks</th>
                          <th>remarks</th>
                          {isPrev ? <th>action</th> : null}
                        </tr>

                        {mainData?.map((i, key) => (
                          <tr>
                            <td>{key + 1}</td>
                            <td>
                              {
                                studentData?.find(
                                  (s) => s?.user_id == i?.student_id
                                )?.name
                              }
                            </td>
                            <td>{i?.student_id}</td>
                            <td>
                              {
                                subjectOpt?.find((s) => s?.id == subSelected)
                                  ?.name
                              }
                            </td>
                            <td>
                              {
                                subjectOpt?.find((s) => s?.id == subSelected)
                                  ?.type
                              }
                            </td>
                            <td>
                              {
                                subjectOpt?.find((s) => s?.id == subSelected)
                                  ?.midterm_max_marks
                              }
                            </td>
                            <td>
                              {
                                subjectOpt?.find((s) => s?.id == subSelected)
                                  ?.midterm_min_marks
                              }
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                name="absent"
                                id="absent"
                                value={i?.absent}
                                onChange={(e) => {
                                  if (e.target.checked == true) {
                                    handleChange(i?.student_id, "marks", 0);
                                    console.log(e.target.checked);
                                  }
                                  handleChange(
                                    i?.student_id,
                                    e.target.name,
                                    e.target.checked
                                  );
                                }}
                              />
                              <label htmlFor="absent">Absent</label>
                            </td>
                            <td>
                              <input
                                type="number"
                                name="marks"
                                id=""
                                className="form-control"
                                required
                                value={i?.marks}
                                onChange={(e) => {
                                  handleChange(
                                    i?.student_id,
                                    e.target.name,
                                    e.target.value
                                  );
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="remark"
                                className="form-control"
                                value={i?.remark}
                                onChange={(e) => {
                                  handleChange(
                                    i?.student_id,
                                    e.target.name,
                                    e.target.value
                                  );
                                }}
                              />
                            </td>
                            {isPrev ? (
                              <td className="d-flex align-items-center justify-content-center">
                                <div
                                  className="badge badge-soft-primary p-2 cursor-pointer"
                                  data-target="#modal"
                                  data-toggle="modal"
                                  onClick={() => {
                                    setEditData(i);
                                  }}
                                >
                                  <i className="ri ri-edit-line"></i>
                                </div>
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </table>
                      {!isPrev ? (
                        <div className="row d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      ) : null}
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

export default StudentMidtermExam;
