import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SessionOpt } from "../../Data/student/sessionData";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
  ACADEMICS_PROMOTE_STUDENT,
} from "../../utils/Academics.apiConst";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../utils/LocalStorageConstants";

import Nodata from "../../Components/NoData/Nodata";
import { STUDENT_SESSION } from "../../utils/apiConstants";
import {
  ALUMINI_UPLOAD,
  STUDENT_INFO_PUT,
  STUDENT_SESSION_GET,
  STUDENT_SESSION_PUT,
  STUDENT_SESSION_SEM_GET,
  STUDENT_SESSION_SEM_PUT,
} from "../../utils/InfoUploadingApiConstants";

function PromoteStudents({ setLoading, collegeId }) {
  // const [departmentOpt, setDepartmentOpt] = useState(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)))
  // const [programOpt, setProgramOpt] = useState(JSON.parse(localStorage.getItem(LOCAL_PROGRAM)))

  // useEffect(() => {
  //   setDepartmentOpt(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(item => item.college_id == collegeId))
  // }, [localStorage.getItem(LOCAL_DEPARTMENT)])

  // const [classOpt, setClassOpt] = useState([])

  // const [semOpt, setSemtOpt] = useState([])

  // const [sectionOpt, setSectionOpt] = useState([])

  // const [data, setData] = useState([])

  // const [sessionTo, setSessionTo] = useState()

  // const [classTo, setClassTo] = useState()

  // const [semesterTo, setSemesterTo] = useState()

  // const [sectionTo, setSectionTo] = useState()

  // const [promotes, setPromotes] = useState([]);

  // const [status, setStatus] = useState("ACTIVE");

  // const [selectAllChecked, setSelectAllChecked] = useState(false);

  // const [user, setUser] = useState({
  //   class_id: '',
  //   semester_id: '',
  //   department_id: '',
  //   section_id: '',
  //   course_id: '',
  //   employee_id: '',
  //   time_from: "",
  //   time_to: "",
  //   session_id: '',
  //   to_session_id: '',
  //   to_semester_id: '',
  //   to_section_id: ''
  // })

  // const getClassData = async () => {
  //   setLoading(1)
  //   const config = {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   }

  //   const [data1, data2, data3] = await Promise.all([
  //     axios({ ...config, url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}` })
  //       .then(res => {
  //         setSemtOpt(res.data.data)
  //       })
  //       .catch(err => {
  //         setLoading(0)
  //         console.log(err);
  //         toast.error('Something went wrong')
  //       }),

  //     axios({ ...config, url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}` })
  //       .then(res => {
  //         setSectionOpt(res.data.data)
  //       })
  //       .catch(err => {
  //         setLoading(0)
  //         console.log(err);
  //         toast.error('Something went wrong')
  //       }),
  //     axios({ ...config, url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}` })
  //       .then(res => {
  //         setClassOpt(res.data.data)
  //       })
  //       .catch(err => {
  //         setLoading(0)
  //         console.log(err);
  //         toast.error('Something went wrong')
  //       }),
  //   ])

  //   setLoading(0)
  // }

  // const getData = async () => {

  //   if(!user.session_id || !user.semester_id || !user.class_id || !user.department_id || !status) {
  //     toast.error("Please Enter Required Details");
  //     return;
  //   }

  //   setLoading(1)
  //   const config = {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //     url: ACADEMICS_PROMOTE_STUDENT + '/all' + `?session_id=${user.session_id}&section_id=${user?.section_id}&semester_id=${user?.semester_id}&class_id=${user?.class_id}&department_id=${user?.department_id}&status=${status}`
  //   }

  //   await axios(config).then(
  //     res => {
  //       setData(res.data.data)
  //       console.log('data - ', res.data.data)
  //     }
  //   ).catch(err => {
  //     setLoading(0)
  //     console.log(err);
  //     toast.error('Something went wrong')
  //   })
  //   setLoading(0)

  // }

  // const promoteStudent = async (id, studentInfo, status) => {
  //   if (!classTo || !semesterTo || !sectionTo || !sessionTo) {
  //     return toast.error('Please choose the where to promote');
  //   }

  //   setLoading(1);
  //   // console.log('userr_id : ', id);
  //   // console.log('studentInfo : ', studentInfo);
  //   // console.log('status : ', status);

  //   const config = {
  //     method: 'post',
  //     url: `${ACADEMICS_PROMOTE_STUDENT}/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       "session_id": sessionTo,
  //       "student_id": id,
  //       "department_id": user?.department_id,
  //       "class_id": classTo,
  //       "semester_id": semesterTo,
  //       "section_id": sectionTo,
  //       "batch_id": null,
  //       "route_id": null,
  //       "hostel_room_id": null,
  //       "status": status
  //     }
  //   }
  //   console.log('data to backend - ',{
  //     "session_id": sessionTo,
  //     "student_id": id,
  //     "department_id": user?.department_id,
  //     "class_id": classTo,
  //     "semester_id": semesterTo,
  //     "section_id": sectionTo,
  //     "batch_id": null,
  //     "route_id": null,
  //     "hostel_room_id": null,
  //     "status": status
  //   });

  //   axios(config)
  //     .then(res => {
  //       toast.success("Success")
  //       getData()
  //     })
  //     .catch(err => {
  //       toast.error("Something went wrong")
  //     })

  //   setLoading(0);
  // }

  // const passAll = () => {

  //   if(promotes.length == 0) {
  //     return toast.error("No Students Selected");
  //   }
  //   promotes?.map((item, index)=> {
  //     promoteStudent(item.id, item.studentInfo, "PASSED");
  //   })
  // }

  // const failAll = () => {
  //   if(promotes.length == 0) {
  //     return toast.error("No Students Selected");
  //   }
  //   promotes?.map((item, index)=> {
  //     promoteStudent(item.id, item.studentInfo, "FAILED");
  //   })
  // }

  // const toggleSelectAll = () => {
  //   setSelectAllChecked((prev) => !prev);
  //   console.log('data - ', data);
  //   const updatedPromotes = data.filter(d => !(d.sem_status == "PASSED" || d.sem_status == "FAILED")).map((d) => ({
  //     id: d.user_id,
  //     studentInfo: d,
  //     status: "PASSED",
  //   }));
  //   setPromotes(selectAllChecked ? [] : updatedPromotes);
  // };

  // const togglePromotion = (id, studentInfo, status) => {

  //   const isPromoted = promotes?.some((student) => student.id === id);

  //   if (isPromoted) {
  //     setPromotes((prevPromotes) => prevPromotes?.filter((student) => student.id !== id));
  //   } else {
  //     setPromotes((prevPromotes) => [...prevPromotes, { id, studentInfo, status }]);
  //   }
  // };

  // useEffect(() => {
  //   console.log('promotes - ', promotes);
  // }, [promotes]);

  // useEffect(() => {
  //   getClassData()
  // }, [])

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setUser(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  const [departmentOpt, setDepartmentOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );
  const [programOpt, setProgramOpt] = useState(
    JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
  );

  useEffect(() => {
    setDepartmentOpt(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(
        (item) => item.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const [classOpt, setClassOpt] = useState([]);

  const [semOpt, setSemtOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [data, setData] = useState([]);

  const [sessionTo, setSessionTo] = useState(
    SessionOpt?.find((s) => s.status == "ACTIVE")?.id
  );

  const [classTo, setClassTo] = useState();

  const [semesterTo, setSemesterTo] = useState();

  const [sectionTo, setSectionTo] = useState();

  const [promotes, setPromotes] = useState([]);

  const [status, setStatus] = useState("ACTIVE");

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");
  const [data5, setData5] = useState("");
  const [data6, setData6] = useState("");
  const [data7, setData7] = useState("");

  const [user, setUser] = useState({
    class_id: "",
    semester_id: "",
    department_id: "",
    section_id: "",
    course_id: "",
    employee_id: "",
    time_from: "",
    time_to: "",
    session_id: SessionOpt?.find((s) => s.status == "ACTIVE")?.id,
    to_session_id: "",
    to_semester_id: "",
    to_section_id: "",
  });

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
      })
        .then((res) => {
          setSemtOpt(res.data.data);
        })
        .catch((err) => {
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
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),
      axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),
    ]);

    setLoading(0);
  };

  const getData = async () => {
    if (
      !user.session_id ||
      !user.semester_id ||
      !user.class_id ||
      !user.department_id ||
      !status
    ) {
      toast.error("Please Enter Required Details");
      return;
    }

    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      url:
        ACADEMICS_PROMOTE_STUDENT +
        "/all" +
        `?session_id=${user.session_id}&section_id=${user?.section_id}&semester_id=${user?.semester_id}&class_id=${user?.class_id}&department_id=${user?.department_id}&status=${status}`,
    };

    await axios(config)
      .then((res) => {
        setData(res.data.data);
        console.log("data - ", res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(0);
  };

  const promoteStudent = async (id, studentInfo, status) => {
    if (!classTo || !semesterTo || !sectionTo || !sessionTo) {
      return toast.error("Please choose the where to promote");
    }

    setLoading(1);
    // console.log('userr_id : ', id);
    // console.log('studentInfo : ', studentInfo);
    // console.log('status : ', status);

    const config = {
      method: "post",
      url: `${ACADEMICS_PROMOTE_STUDENT}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        session_id: sessionTo,
        student_id: id,
        department_id: user?.department_id,
        class_id: classTo,
        semester_id: semesterTo,
        section_id: sectionTo,
        batch_id: null,
        route_id: null,
        hostel_room_id: null,
        status: status,
      },
    };
    console.log("data to backend - ", {
      session_id: sessionTo,
      student_id: id,
      department_id: user?.department_id,
      class_id: classTo,
      semester_id: semesterTo,
      section_id: sectionTo,
      batch_id: null,
      route_id: null,
      hostel_room_id: null,
      status: status,
    });

    axios(config)
      .then((res) => {
        toast.success("Success");
        getData();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    setLoading(0);
  };

  const passAll = () => {
    if (promotes.length == 0) {
      return toast.error("No Students Selected");
    }
    promotes?.map((item, index) => {
      promoteStudent(item.id, item.studentInfo, "PASSED");
    });
  };

  const failAll = () => {
    if (promotes.length == 0) {
      return toast.error("No Students Selected");
    }
    promotes?.map((item, index) => {
      promoteStudent(item.id, item.studentInfo, "FAILED");
    });
  };

  const toggleSelectAll = () => {
    setSelectAllChecked((prev) => !prev);
    console.log("data - ", data);
    const updatedPromotes = data
      .filter((d) => !(d.sem_status == "PASSED" || d.sem_status == "FAILED"))
      .map((d) => ({
        id: d.user_id,
        studentInfo: d,
        status: "PASSED",
      }));
    setPromotes(selectAllChecked ? [] : updatedPromotes);
  };

  const togglePromotion = (id, studentInfo, status) => {
    const isPromoted = promotes?.some((student) => student.id === id);

    if (isPromoted) {
      setPromotes((prevPromotes) =>
        prevPromotes?.filter((student) => student.id !== id)
      );
    } else {
      setPromotes((prevPromotes) => [
        ...prevPromotes,
        { id, studentInfo, status },
      ]);
    }
  };

  useEffect(() => {
    console.log("promotes - ", promotes);
  }, [promotes]);

  useEffect(() => {
    getClassData();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department_id") {
      // Reset class, semester, and section when department changes
      setUser({
        ...user,
        department_id: value,
        class_id: "",
        semester_id: "",
        section_id: "",
      });
    } else if (name === "class_id") {
      // Reset semester and section when class changes
      setUser({
        ...user,
        [name]: value,
        semester_id: "",
        section_id: "",
      });
    } else if (name === "semester_id") {
      // Reset section when semester changes
      setUser({
        ...user,
        [name]: value,
        section_id: "",
      });
    } else {
      // General case for other inputs
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const getData2 = async () => {
    setLoading(1);

    const config2 = {
      method: "get",
      url: STUDENT_SESSION,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config2)
      .then((res) => {
        setData2(res.data.data);
        console.log("data2 - ", res.data.data);
        // You may want to update the state or perform any other actions here
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    const config3 = {
      method: "get",
      url: STUDENT_SESSION_GET,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config3)
      .then((res) => {
        setData3(res.data.data);
        console.log("data3 - ", res.data.data);
        // You may want to update the state or perform any other actions here
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    const config4 = {
      method: "get",
      url: STUDENT_SESSION_SEM_GET,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config4)
      .then((res) => {
        setData4(res.data.data);
        console.log("data4 - ", res.data.data);
        // You may want to update the state or perform any other actions here
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
  };

  useEffect(() => {
    getData2();
  }, []);

  const handleSubmit1 = async (d) => {
    if (sessionTo || classTo || semesterTo || sectionTo) {
      toast.error("Please do not select 'Promote To' fields for alumni.");
      return;
    }
    let studentData = [];
    console.log("d - ", d);

    const currentDate = new Date();

    let obj = {
      student_session_id: d.student_session_id,
      student_id: d.user_id,
      student_name: d.name,
      college_id: d.college_id,
      department_id: d.department_id,
      session_id: d.year_of_admission,
      date: currentDate,
      passout_year: d.session_id,
    };
    studentData.push(obj);
    console.log("stud data - ", studentData);

    const config1 = {
      method: "post",
      url: ALUMINI_UPLOAD,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        students: studentData,
      },
    };

    await axios(config1)
      .then((res) => {
        setData1(studentData);
        console.log("data1 - ", studentData);
        toast.success("Success");

        // Loop through each user_id and call handleUpdate
        studentData.forEach((d) => {
          handleUpdate(d.student_id);
        });

        studentData.forEach((d) => {
          handleUpdate2(d.student_session_id);
        });

        studentData.forEach((d) => {
          handleUpdate3(d.student_id);
        });
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
  };
  const handleSubmit = async () => {
    if (sessionTo || classTo || semesterTo || sectionTo) {
      toast.error("Please do not select 'Promote To' fields for alumni.");
      return;
    }
    setLoading(1);

    const currentDate = new Date();

    const studentData = promotes.map((d) => {
      return {
        student_session_id: d.studentInfo.student_session_id,
        student_id: d.studentInfo.user_id,
        student_name: d.studentInfo.name,
        college_id: d.studentInfo.college_id,
        department_id: d.studentInfo.department_id,
        session_id: d.studentInfo.year_of_admission,
        date: currentDate,
        passout_year: d.studentInfo.session_id,
      };
    });

    const config1 = {
      method: "post",
      url: ALUMINI_UPLOAD,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        students: studentData,
      },
    };

    await axios(config1)
      .then((res) => {
        setData1(studentData);
        console.log("data1 - ", studentData);
        toast.success("Success");

        // Loop through each user_id and call handleUpdate
        promotes.forEach((d) => {
          handleUpdate(d.studentInfo.user_id);
        });

        promotes.forEach((d) => {
          handleUpdate2(d.studentInfo.student_session_id);
        });

        promotes.forEach((d) => {
          handleUpdate3(d.studentInfo.user_id);
        });
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
  };

  const handleUpdate = async (student_id) => {
    setLoading(1);

    const config5 = {
      method: "put",
      url: `${STUDENT_SESSION_PUT}/${student_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "PASSED",
      },
    };

    await axios(config5)
      .then((res) => {
        setData5(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
  };

  const handleUpdate2 = async (student_session_id) => {
    setLoading(1);

    const config5 = {
      method: "put",
      url: `${STUDENT_SESSION_SEM_PUT}/${student_session_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "PASSED",
      },
    };

    await axios(config5)
      .then((res) => {
        setData6(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
  };

  const handleUpdate3 = async (user_id) => {
    setLoading(1);

    const config5 = {
      method: "put",
      url: `${STUDENT_INFO_PUT}/${user_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    await axios(config5)
      .then((res) => {
        setData7(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });

    setLoading(0);
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
                  <h4 className="mb-0">Promote Students</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Academics</a>
                      </li>
                      <li className="breadcrumb-item active">
                        {" "}
                        Promote Students
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Pomote Student from</h2>
                      <br />
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Department<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="department_id"
                              id="class"
                              value={user.department_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Department</option>
                              {departmentOpt.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name},{" "}
                                  {
                                    programOpt.find(
                                      (item) => item.id == i.program_id
                                    )?.name
                                  }
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Academic Year
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="session_id"
                              id="class"
                              value={user.session_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Academic</option>
                              {SessionOpt.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Class<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="class_id"
                              id="class"
                              value={user.class_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Class</option>
                              {classOpt
                                ?.filter(
                                  (s) => s?.department_id == user?.department_id
                                )
                                ?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Semester<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="semester_id"
                              id="class"
                              value={user.semester_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Semester</option>
                              {semOpt
                                ?.filter((s) => s?.class_id == user?.class_id)
                                ?.map((i, key) => (
                                  <option value={i?.id} key={key}>
                                    {i.name}
                                  </option>
                                ))}
                              {/* {
                                classOpt?.map((i, key) => (
                                  <option value={i.id}>{i.name}</option>
                                ))
                              } */}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Section<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="section_id"
                              id="class"
                              value={user?.section_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Section</option>
                              {sectionOpt
                                ?.filter(
                                  (s) =>
                                    s.department_id == user.department_id &&
                                    s.semester_id == user.semester_id
                                )
                                ?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">
                              Status<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              value={status}
                              onChange={(e) => {
                                setStatus(e.target.value);
                              }}
                            >
                              <option value="">Select Status</option>
                              <option value="ACTIVE">Active</option>
                              <option value="INACTIVE">Inactive</option>
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-md-4"></div> */}
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4 d-flex align-items-center justify-content-end">
                          <button
                            className="btn btn-nex btn-rounded float-lg-left "
                            onClick={getData}
                            // style={{maxHeight:'40px'}}
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
              {/* container-fluid */}
            </>

            {/* end card */}
            {/* container-fluid */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Promote Students To</h4>
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
                    </div>{" "}
                    <hr />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Academic Year<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="to_session_id"
                            id="class"
                            value={sessionTo}
                            onChange={(e) => {
                              setSessionTo(e.target.value);
                            }}
                          >
                            <option value="">Select Academic</option>
                            {SessionOpt.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="to_section_id"
                            id="class"
                            value={classTo}
                            // onChange={(e) => {
                            //   setClassTo(e.target.value);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;
                              setClassTo(value);
                              setSemesterTo(""); // Reset semester field
                              setSectionTo(""); // Reset section field
                            }}
                          >
                            <option value="">Select Class</option>
                            {classOpt
                              ?.filter(
                                (s) => s?.department_id == user?.department_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Semester<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="to_semester_id"
                            id="class"
                            value={semesterTo}
                            // onChange={(e) => {
                            //   setSemesterTo(e.target.value);
                            // }}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSemesterTo(value); // Reset semester field
                              setSectionTo(""); // Reset section field
                            }}
                          >
                            <option value="">Select Semester</option>
                            {semOpt
                              ?.filter((s) => s.class_id == classTo)
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Section<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="to_semester_id"
                            id="class"
                            value={sectionTo}
                            onChange={(e) => {
                              setSectionTo(e.target.value);
                            }}
                          >
                            <option value="">Select Section</option>
                            {sectionOpt
                              ?.filter((s) => s.semester_id == semesterTo)
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr /> {/* <button>Pass</button> */}
                    <div className="table-responsive dt-responsive">
                      <table
                        id="datatable"
                        className="table  nowrap table-hover  "
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          boarder: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                id="select-all"
                                checked={selectAllChecked}
                                onChange={toggleSelectAll}
                              />
                            </th>
                            <th>Promote All</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>
                              <button
                                className="btn btn-success"
                                onClick={passAll}
                              >
                                Pass
                              </button>{" "}
                              {"   "}
                              <button
                                className="btn btn-danger ml-3"
                                onClick={failAll}
                              >
                                Fail
                              </button>
                              <button
                                className="btn btn-primary ml-3"
                                onClick={handleSubmit}
                              >
                                Alumni
                              </button>
                            </th>
                          </tr>
                          <tr>
                            <th></th>
                            <th className="text-wrap">
                              Admission <br /> Number
                            </th>
                            <th className="text-wrap">Name</th>
                            {/* <th>Date of Birth</th> */}
                            <th>Class</th>
                            <th>Semester</th>
                            <th>Section</th>
                            <th>Next Session Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {
                            data && data.map((d, k) => (
                              <tr>
                                <td>
                                  <input type="checkbox" name="checkbox[]" defaultValue={489} />
                                </td>
                                <td className="text-wrap">{d?.data?.student_id}</td>
                                <td className="text-wrap">{d?.studentInfo?.name}</td>
                                <td>{d?.semesterData[0]?.semester_id ? semOpt?.find(s => s.id == d?.semesterData[0]?.semester_id)?.name : null} </td>
                                <td>
                                  {d.semesterData[0]?.section_id ? sectionOpt?.find(s => s.id == d.semesterData[0]?.section_id)?.name : "no data"}
                                </td>
                                <td>
                                  {" "}
                                  {
                                    d?.semesterData[0]?.status == "PASSED" ?
                                      <>PASSED</> : null}

                                  {
                                    d?.semesterData[0]?.status == "FAILED" ?
                                      <>FAILED</> : null
                                  }

                                  <>{
                                    d?.semesterData[0]?.status != "FAILED" && d?.semesterData[0]?.status != "PASSED" ? <>
                                      <button className='btn-primary btn mx-2' onClick={() => promoteStudent(d?.data?.student_id, d?.data, "PASSED")}>Pass</button>
                                      <button className='btn-primary btn' onClick={() => promoteStudent(d?.data?.student_id, d?.data, "FAILED")}>Fail</button>
                                    </>
                                      : null
                                  }</>

                                </td>
                              </tr>
                            ))
                          } */}
                          {data &&
                            data.map((d, k) => (
                              <tr>
                                <td>
                                  {d?.sem_status == "PASSED" ||
                                  d?.sem_status == "FAILED" ? (
                                    <input
                                      type="checkbox"
                                      name="checkbox[]"
                                      // value={d.user_id}
                                      // checked={promotes?.some((student) => student.id === d.user_id)}
                                      // onChange={() => togglePromotion(d.user_id, d, "PASSED")}
                                      checked={false}
                                      disabled={true}
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      name="checkbox[]"
                                      value={d.user_id}
                                      checked={promotes?.some(
                                        (student) => student.id === d.user_id
                                      )}
                                      onChange={() =>
                                        togglePromotion(d.user_id, d, "PASSED")
                                      }
                                    />
                                  )}
                                </td>
                                <td className="text-wrap">{d?.user_id}</td>
                                <td className="text-wrap">{d?.name}</td>
                                <td>{d?.class_name}</td>
                                <td>
                                  {d?.semester_id
                                    ? semOpt?.find(
                                        (s) => s.id == d?.semester_id
                                      )?.name
                                    : null}
                                </td>
                                <td>
                                  {d?.section_id
                                    ? sectionOpt?.find(
                                        (s) => s.id == d?.section_id
                                      )?.name
                                    : null}
                                </td>
                                <td>
                                  {" "}
                                  {d?.sem_status == "PASSED" ? (
                                    <>PASSED</>
                                  ) : null}
                                  {d?.sem_status == "FAILED" ? (
                                    <>FAILED</>
                                  ) : null}
                                  <>
                                    {d?.sem_status != "FAILED" &&
                                    d?.sem_status != "PASSED" ? (
                                      <>
                                        <button
                                          className="btn-success btn mx-2"
                                          disabled={selectAllChecked}
                                          onClick={() =>
                                            promoteStudent(
                                              d?.user_id,
                                              d,
                                              "PASSED"
                                            )
                                          }
                                        >
                                          Pass
                                        </button>
                                        <button
                                          className="btn-danger btn"
                                          disabled={selectAllChecked}
                                          onClick={() =>
                                            promoteStudent(
                                              d?.user_id,
                                              d,
                                              "FAILED"
                                            )
                                          }
                                        >
                                          Fail
                                        </button>
                                      </>
                                    ) : null}

                                    <button
                                      className="btn btn-primary ml-3"
                                      disabled={selectAllChecked}
                                      onClick={() => handleSubmit1(d)}
                                    >
                                      Alumni
                                    </button>
                                  </>
                                </td>
                              </tr>
                            ))}
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
    </div>
  );
}

export default PromoteStudents;
