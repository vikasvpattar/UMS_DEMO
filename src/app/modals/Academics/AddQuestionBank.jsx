import React, { useState } from "react";
import papa from "papaparse";
import { useRef } from "react";
import { toast } from "react-toastify";
import { STUDENT_QUESTION_UPLOAD_BULK } from "../../utils/apiConstants";
import axios from "axios";
import { ACADEMICS_ADD_TOPIC } from "../../utils/Academics.apiConst";

function ModalQuestionBank({
  departmentOpt,
  subjectOpt,
  lessonOpt,
  collegeId,
  classOpt,
  allClassOpt,
  semOpt,
  setLoading,
}) {
  const fileref = useRef(null);
  const [user, setUser] = useState({
    college_id: collegeId,
    department_id: "",
    session_id: "",
    class_id: "",
    semester_id: "",
    lesson_id: "",
    subject_id: "",
    topic_id: "",
  });

  const [data, setData] = useState();

  const [type, setType] = useState("");

  var commonConfig = { delimiter: "," };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkReadOnly = () => {
    if (
      !user?.department_id ||
      !user?.class_id ||
      !user?.subject_id ||
      !user?.subject_id ||
      !user?.lesson_id
    )
      return false;
    return true;
  };

  const clearData = () => {
    setData();
    setUser({
      college_id: collegeId,
      department_id: "",
      session_id: "",
      class_id: "",
      semester_id: "",
      subject_id: "",
      lesson_id: "",
      topic_id: "",
    });
  };

  const [topicOpt, setTopicOpt] = useState([]);

  const getTopics = async (lid) => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    const topics = await axios({
      ...config,
      url: ACADEMICS_ADD_TOPIC + `?lesson_id=${lid}`,
    }).catch((err) => {
      setLoading(0);
      console.log(err);
      toast.error("Something went wrong");
      return [];
    });

    setLoading(0);
    console.log("topics", topics);
    setTopicOpt(topics?.data?.data);
  };

  const handleUpload = async () => {
    setLoading(1);
    const config = {
      method: "post",
      url: STUDENT_QUESTION_UPLOAD_BULK,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: { data: data, type: type },
    };

    await axios(config)
      .then((res) => toast.success("Success"))
      .catch((err) => toast.error("Something went wrong"));

    setLoading(0);
    // clearData();
    fileref.current.value = null;
  };

  console.log(type);
  const handleProcessCSV = (d) => {
    const arr = [];
    console.log(d);
    for (const i of d) {
      if (type == "SINGLE") {
        const obj = {
          topic_id: user?.topic_id,
          question_type: "SINGLE",
          marks: i["Marks"],
          question: i["Question"],
          option: [],
          answer: "",
          status: "ACTIVE",
        };
        arr.push(obj);
      } else if (type == "MCQ") {
        let arr1 = [];
        arr1.push(i["Option"]);
        const obj = {
          topic_id: user?.topic_id,
          question_type: "MCQ",
          marks: i["Marks"],
          question: i["Question"],
          option: arr1,
          answer: i["Answer"],
          status: "ACTIVE",
        };
        arr.push(obj);
      }
    }
    setData(arr);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (files) {
      papa.parse(files[0], {
        ...commonConfig,
        header: true,
        complete: async (res) => {
          await handleProcessCSV(res.data);
        },
      });
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Import CSV File
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
              <br />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select Department
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="department_id"
                      value={user?.department_id}
                      onChange={handleChange}
                    >
                      <option value=""> Select Department</option>
                      {departmentOpt?.map((i, key) => (
                        <option value={i?.id} key={key}>
                          {i?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select Year
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="class_id"
                      value={user?.class_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      {allClassOpt
                        ?.filter((s) => s.department_id == user?.department_id)
                        ?.map((i, key) => (
                          <option key={key} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select Semester
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="semester_id"
                      value={user?.semester_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Semester</option>
                      {semOpt
                        ?.filter((s) => s.class_id == user.class_id)
                        ?.map((i, key) => (
                          <option key={key} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select Subject
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="subject_id"
                      value={user?.subject_id}
                      onChange={handleChange}
                    >
                      <option value=""> Select Subject</option>
                      {subjectOpt
                        ?.filter((s) => s.semester_id == user?.semester_id)
                        ?.map((i, key) => (
                          <option value={i.id} key={key}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select Lesson
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="lesson_id"
                      value={user?.lesson_id}
                      onChange={(e) => {
                        handleChange(e);
                        getTopics(e.target.value);
                      }}
                    >
                      <option value=""> Select Lesson</option>
                      {lessonOpt
                        ?.filter((s) => s.course_id == user?.subject_id)
                        ?.map((i, key) => (
                          <option value={i?.id} key={key}>
                            {i?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">
                      Select Topic <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      value={user?.topic_id}
                      name="topic_id"
                      onChange={handleChange}
                    >
                      <option value="">Select Topic</option>
                      {topicOpt?.map((i, key) => (
                        <option value={i?.id} key={key}>
                          {i?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Question Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="subject"
                      className="form-control"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      name="question_type"
                    >
                      <option value=""> Select Question Type</option>

                      <option value="MCQ">Mcq</option>
                      <option value="SINGLE">Single</option>
                    </select>{" "}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="validationCustom02">
                      Select CSV File
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="file"
                      ref={fileref}
                      className="form-control"
                      accept=".csv"
                      readOnly={!checkReadOnly()}
                      disabled={!checkReadOnly()}
                      onChange={handleFileUpload}
                    />
                    {!checkReadOnly() ? (
                      <div className="text-danger">
                        Fill above fields first to upload document
                      </div>
                    ) : (
                      <div className="text-warning">
                        Only csv format is allowed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={clearData}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                name="submit"
                value="bulk"
                onClick={handleUpload}
                data-dismiss="modal"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalQuestionBank;
