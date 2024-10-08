import React, { useState, useEffect, useRef } from "react";
import {
  ACADEMICS_ADD_LESSON,
  ACADEMICS_ADD_SUBJECT,
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_TOPIC,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_ADD_QUESTION_BANK,
} from "../../utils/Academics.apiConst";
import axios from "axios";
import { toast } from "react-toastify";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_MEDIA } from "../../utils/AssetsReferenceTypes";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Nodata from "../../Components/NoData/Nodata";
import QuestionBankType from "../../modals/Academics/QuestionBankType";
import ModalQuestionBank from "../../modals/Academics/AddQuestionBank";
import CustomToolbar from "../../Components/QuillEditor/CustomToolBar";

function AddQuestionBank({ setLoading, collegeId }) {
  const [text, setText] = useState("");

  const [addNew, setAddNew] = useState(false);
  const [classOpt, setClassOpt] = useState();
  const [semOpt, setSemOpt] = useState([]);
  const [allClassOpt, setAllClassOpt] = useState([]);
  const [subjectOpt, setSubjectOpt] = useState([]);
  const [selectedSubjectOpt, setSelectedSubjectOpt] = useState([]);

  const [lessonOpt, setLessonOpt] = useState([]);
  const [selectedLessonOpt, setSelectedLessonOpt] = useState([]);

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

    const [data1, data2, data3, data4] = await Promise.all([
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
        url: ACADEMICS_ADD_SUBJECT + `?college_id=${collegeId}`,
      })
        .then((res) => {
          console.log("subject opt", res.data.data);
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
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      }).catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      }),
    ]);

    const data = data1.data.data;
    const classData = data4.data.data;
    for (var i of data) {
      let ff = classData?.find((item) => item.id == i.class_id);
      if (ff) {
        i.name = ff.name + " (" + i.name + ") ";
        i.department_id = ff.department_id;
      }
    }
    setClassOpt(data);
    setAllClassOpt(classData);
    setSemOpt(data1.data.data);
  };

  const [topicOpt, setTopicOpt] = useState([]);

  const getTopics = async () => {
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
      url: ACADEMICS_ADD_TOPIC + `?lesson_id=${user?.lesson_id}`,
    }).catch((err) => {
      setLoading(0);
      console.log(err);
      toast.error("Something went wrong");
      return [];
    });

    setLoading(0);
    setTopicOpt(topics?.data?.data);
  };

  const [edit, setEdit] = useState(false);

  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    class_id: "",
    department_id: "",
    semester_id: "",
    question: "",
    name: "",
    answer: "",
    duration: "",
    course_id: "",
    lesson_id: "",
    option: [],
    image: "",
    formula: "",
    question_type: "",
    marks: "",
    topic_id: "",
  });

  const fileUpload = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_MEDIA,
        "media",
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      user.image = d;
    } catch (error) {
      console.log(error);
    }
  };

  const [editorValue, setEditorValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {},
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleChange1 = (value) => {
    setEditorValue(value);
  };
  const clearData = () => {
    user.marks = "";
    user.answer = "";
    user.option = "";
    user.question = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    if (!user.topic_id) {
      return toast.error("Lesson is required");
    }

    setLoading(1);
    const config = {
      method: "get",
      url: ACADEMICS_ADD_QUESTION_BANK + `?topic_id=${user.topic_id}`,
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

  const handleSubmit = async () => {
    setLoading(1);
    const config = {
      method: "post",
      url: ACADEMICS_ADD_QUESTION_BANK,
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
        toast.success("Data added successfully");
        clearData();
        getData();
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
      url: ACADEMICS_ADD_QUESTION_BANK + `/${user.id}`,
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
        toast.success("Data added successfully");
        clearData();
        getData();
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
      url: `${ACADEMICS_ADD_QUESTION_BANK}/${i?.id}`,
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

  const handleSearch = () => {
    getData();
  };

  useEffect(() => {
    // getData();
    getClassData();
  }, []);

  useEffect(() => {
    if (user?.lesson_id) {
      getTopics();
    }
  }, [user?.lesson_id]);

  return (
    <div>
      <QuestionBankType />
      <ModalQuestionBank
        departmentOpt={departmentOpt}
        classOpt={classOpt}
        type={user?.question_type}
        subjectOpt={subjectOpt}
        semOpt={semOpt}
        allClassOpt={allClassOpt}
        lessonOpt={lessonOpt}
        topicOpt={topicOpt}
        collegeId={collegeId}
        setLoading={setLoading}
      />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0"> Add Question Bank</h4>
                  <div dangerouslySetInnerHTML={{ __html: text }}></div>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Lesson Plan</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Add Question Bank
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <p className="alert alert-warning">
              For MCQ Please Dowload our CSV Templete and Upload Topic wise.
              don't mention a),b),c) options only enter options seperated by
              comma in Single given column.{" "}
            </p>
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="card-title">Add Question Bank</h4>
                      </div>
                      <div className="col-md-8">
                        <a
                          className="btn btn-success btn-sm btn-rounded float-right ml-1"
                          data-toggle="modal"
                          data-target="#questionType"
                        >
                          <i className="fa fa-download" aria-hidden="true" />{" "}
                          Download Documents
                        </a>{" "}
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-primary btn-sm btn-rounded float-right"
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                          type="button"
                          name="submit"
                        >
                          <i className="fa fa-upload" aria-hidden="true" />{" "}
                          Upload Documents
                        </button>
                      </div>
                      <hr />
                      <br />
                    </div>
                    {/* <h2 className="card-title">Add Criteria</h2> */}
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Department
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="class"
                            className="form-control"
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
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Year/Semester
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="class_id"
                            id="class"
                            className="form-control"
                            value={user.class_id}
                            onChange={(e) => {
                              handleChange(e);
                              setSelectedSubjectOpt(
                                subjectOpt?.filter(
                                  (item) => item.semester_id == e.target.value
                                )
                              );
                            }}
                          >
                            <option value="">Select Year/Semester</option>
                            {classOpt
                              ?.filter(
                                (s) => s.department_id == user?.department_id
                              )
                              .map((i, key) => (
                                <option key={key} value={i.id}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Subject<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="course_id"
                            className="form-control"
                            value={user.course_id}
                            onChange={(e) => {
                              handleChange(e);
                              setSelectedLessonOpt(
                                lessonOpt.filter(
                                  (item) => item.course_id == e.target.value
                                )
                              );
                            }}
                            name="course_id"
                          >
                            <option value=""> Select Subject</option>
                            {selectedSubjectOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>{" "}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Lesson<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="subject"
                            className="form-control"
                            value={user.lesson_id}
                            onChange={handleChange}
                            name="lesson_id"
                          >
                            <option value=""> Select Lesson</option>
                            {selectedLessonOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>{" "}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Topic<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="subject"
                            className="form-control"
                            value={user.topic_id}
                            onChange={handleChange}
                            name="topic_id"
                          >
                            <option value=""> Select Topics</option>
                            {topicOpt?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>{" "}
                        </div>
                      </div>

                      {/* <CKEditor
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        editor={ClassicEditor}
                        config={{
                          plugins: [EasyImage],
                          toolbar: ["Image", "|", "undo", "redo"],
                          image: {
                            // Configure the CKEditor Image Upload adapter
                            upload: {
                              types: ["jpeg", "png", "gif", "bmp", "webp"],
                              handleUpload: (file) => {
                                return new Promise((resolve, reject) => {
                                  const reader = new FileReader();

                                  reader.onload = (event) => {
                                    const base64data = event.target.result;
                                    resolve({
                                      default: base64data,
                                    });
                                  };

                                  reader.onerror = (error) => {
                                    reject(error);
                                  };

                                  reader.readAsDataURL(file);
                                });
                              },
                            },
                          },
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                        }}
                      /> */}

                      {/* <CKEditor
                        editor={ClassicEditor}
                        config={{
                          // Configure the CKEditor Image Upload adapter
                          ckfinder: {
                            uploadUrl: "YOUR_UPLOAD_ENDPOINT", // Replace with your actual upload endpoint
                          },
                        }}
                        onChange={handleChange1}
                      /> */}
                      {edit || addNew ? (
                        <>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Question Type{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                id="subject"
                                className="form-control"
                                value={user.question_type}
                                onChange={handleChange}
                                name="question_type"
                              >
                                <option value=""> Select Question Type</option>
                                <option value="MCQ">Mcq</option>
                                <option value="SINGLE">Single</option>
                              </select>{" "}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Marks <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="marks"
                                placeholder="Enter the Marks"
                                className="form-control"
                                value={user.marks}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Question <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="question"
                                placeholder="Enter the question"
                                className="form-control"
                                value={user.question}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {user?.question_type == "SINGLE" ? (
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Answer <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  name="answer"
                                  placeholder="Enter the answer"
                                  className="form-control"
                                  value={user?.answer}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          ) : user?.question_type == "MCQ" ? (
                            <>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="validationCustom02">
                                    Options{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="question_option"
                                    placeholder="Enter the options"
                                    className="form-control"
                                    value={user.question_option}
                                    onChange={handleChange}
                                  />
                                  <button
                                    className="btn btn-nex btn-rounded float-lg-right mx-1 mt-2 "
                                    type="submit"
                                    name="submit"
                                    onClick={() =>
                                      setUser((prev) => ({
                                        ...prev,
                                        option: [
                                          ...prev?.option,
                                          prev?.question_option,
                                        ],
                                        question_option: "",
                                      }))
                                    }
                                  >
                                    <i
                                      className="fa fa-add"
                                      aria-hidden="true"
                                    />{" "}
                                    Add
                                  </button>
                                </div>
                                <div className="d-flex">
                                  {user?.option
                                    ? user.option.map((data, key) => {
                                        return (
                                          <span className="d-flex mx-1 p-3 rounded-4 h-fit-content badge badge-primary">
                                            <p className="mb-0 text-lg">
                                              {data}{" "}
                                            </p>
                                          </span>
                                        );
                                      })
                                    : null}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="validationCustom02">
                                    Answer{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <select
                                    name="answer"
                                    placeholder="Select answer"
                                    className="form-control"
                                    value={user?.answer}
                                    onChange={handleChange}
                                  >
                                    <option>Select Option</option>
                                    {user?.option?.map((s) => {
                                      return <option value={s}>{s}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>
                            </>
                          ) : null}
                          {/* <div className="col-md-12" id="react-quill">
                            <CustomToolbar fileUpload={fileUpload} />
                            <ReactQuill
                              value={text}
                              onChange={handleChange2}
                              modules={modules}
                              formats={formats}
                            />
                          </div> */}
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
                              <div className="mt-2">
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
                              </div>
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
                          <th>Sl. No.</th>
                          <th>Topic </th>
                          <th>Question Type</th>
                          <th>Question</th>
                          <th>Marks</th>
                          <th>Options</th>
                          <th>Answer</th>
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
                                  topicOpt?.find(
                                    (item) => item.id == d.topic_id
                                  )?.name
                                }
                              </td>
                              <td>{d?.question_type}</td>
                              <td>{d?.question}</td>
                              <td>{d?.marks}</td>
                              <td>
                                {d?.option
                                  ? d?.option.map((data, key) => (
                                      <>{data + ", "}</>
                                    ))
                                  : null}
                              </td>
                              <td>{d?.answer}</td>
                              <td>
                                <acronym title="Edit">
                                  <a
                                    href="javascript:void(0)"
                                    onClick={(e) => {
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

export default AddQuestionBank;
