import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sessionOpt } from '../../../Data/jsonData/Academics/Academics';
import AdvanceFeeReciept from '../../Accounts/FeeCollection/AdvancePayFeeCollection';
import Select from "react-select";
import { useReactToPrint } from 'react-to-print';
import { ROUTES } from '../../../Router/routerConfig';
import { SESSION_ROLE } from '../../../utils/sessionStorageContants';
import { LOCAL_COLLEGE, LOCAL_DEPARTMENT } from '../../../utils/LocalStorageConstants';
import { STUDENT_ADMISSION, STUDENT_ADVANCE_PAY, STUDENT_DETAILS2, STUDENT_GENDER, STUDENT_SESSION, STUDENT_SESSION_UPDATE } from '../../../utils/apiConstants';
import { ACADEMICS_ADD_CLASS, ACADEMICS_ADD_SECTION, ACADEMICS_ADD_SEMESTER } from '../../../utils/Academics.apiConst';
import StudentProfile1 from '../../../modals/StudentProfile1';



function StudentDetailsHostel( { setLoading, collegeId } ) {

   // State to manage the modal visibility
   const [isStudentProfileModalVisible, setIsStudentProfileModalVisible] = useState(false);
   const [selectedStudentData, setSelectedStudentData] = useState(null);
 
   const setStudentDataForProfile = (studentData) => {
     setSelectedStudentData(studentData);
   };

  let role = sessionStorage.getItem(SESSION_ROLE);
  const locate = useLocation();

  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const [adv, setAdv] = useState([]);
  const [data, setData] = useState([]);

  const [clg, setClg] = useState("");

  var emp_id = sessionStorage.getItem("employee_id");

  const handlePrint = async (i, studentData) => {
    if (studentData) {
      let real = await adv?.filter((s) => s.user_id == studentData?.student_id);
      setA(real);
      await setSubdata(i);
      PrintRecipt();
    } else {
      let real = await adv?.filter((s) => s.user_id == i?.user_id);
      setA(real);
      await setSubdata(i);
      PrintRecipt();
    }
  };

  const navigate = useNavigate();

  // const changeDir = (dir, i) => {
  //   navigate(
  //     `${dir}/${i?.user_id}?session_id=${i?.student_sesson_id}&depart=${selectedDepartment}&session=${session}&class=${currentclass}&sem=${currentSemester}&section=${currentSection}`,
  //     {
  //       state: {
  //         data: data,
  //         student: student,
  //       },
  //     }
  //   );
  // };

  const changeDir = (dir, i) => {
    console.log('student data - ', i);
    navigate(
      `${dir}/${i?.user_id}?session_id=${i?.student_session_id}&depart=${i?.department_id}&session=${i?.session_id}&class=${i?.class_id}&sem=${i?.semester_id}&section=${i?.section}`,
      {
        state: {
          data: data,
          student: student,
        },
      }
    );
  };

  const changeDir1 = (dir, obj) => {
    console.log('obj - ', obj);
    navigate(
      `${dir}/${obj?.student_id}?session_id=${obj?.student_session_id}&depart=${obj?.department_id}&session=${obj?.session_id}&class=${obj?.class_id}&sem=${obj?.semester_id}&section=${obj?.section_id}`,
      {
        state: {
          data: data,
          student: student,
        },
      }
    );
  };

  const [x, setX] = useState(false);

  const [z, setZ] = useState(false);
  const [y, setY] = useState(false);

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const [gender, setGender] = useState([]);

  const [flag, setFlag] = useState(false);

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [faculty, setFaculty] = useState("");

  const [currentclass, setCurrentClass] = useState("");

  const [currentSemester, setCurrentSemester] = useState("");

  const [currentSection, setCurrentSection] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [session, setSession] = useState("");

  const [student, setStudent] = useState([]);

  const [subdata, setSubdata] = useState([]);

  const [a, setA] = useState([]);

  const [flag1, setFlag1] = useState(false);

  const [userId, setUserId] = useState("");
  const [studentData, setStudentData] = useState([]);

  const getData = async (x) => {
    setStudentData([]);
    console.log("data",selectedDepartment);
    if ((!faculty || !currentclass || !session) && !x)
      return toast.error("Mandatory fields are required");
    setLoading(1);
    var url;
    if (emp_id == 316) {
      url =
        STUDENT_SESSION +
        `?college_id=${clg}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&status=${status}`;
    } else {
      url =
        STUDENT_SESSION +
        `?college_id=${collegeId}&department_id=${selectedDepartment.value}&class_id=${selectedClass.value}&section_id=${selectedSection.value}&semester_id=${selectedSemester.value}&session_id=${selectedSession.value}&status=${status}`;
    }
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const config1 = {
      method: "get",
      url: `${STUDENT_DETAILS2}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("Data Main - ", res.data.data);
        setData(res.data.data);
        let data = [];
        for (var i = 0; i < res.data.data.length; i++) {
          data.push({
            id: res.data.data[i].user_id,
            gender: res.data.data[i].gender,
          });
        }
        setGender(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some Error Occured");
      });

    await axios(config1)
      .then((res) => {
        setLoading(0);
        console.log(res.data.data);
        setStudent(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };
 
  const getAllData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(1);
    const [data1, data2, data3, data4] = await Promise.all([
      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_CLASS}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_SEMESTER}`,
      })
        .then((res) => {
          setSemesterOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url:
          emp_id != 316
            ? `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`
            : `${ACADEMICS_ADD_SECTION}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),

      await axios({
        ...config,
        url: STUDENT_ADVANCE_PAY,
      })
        .then((res) => {
          setLoading(0);
          setAdv(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),
    ]);
  };

  const handleEdit = async (id, stat) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: stat,
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Update Success");
        console.log(res);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (locate?.state) {
      setCurrentClass(locate.state?.class);
      setCurrentSection(locate.state?.section);
      setCurrentSemester(locate.state?.sem);
      setSession(locate.state?.session);
      setFaculty(locate.state?.depart);
    }
  }, [locate?.state]);

  const edit2 = async (id, gender1) => {
    setY(true);
    for (var i = 0; i < gender.length; i++) {
      if (gender[i].id == id) {
        gender[i].gender = gender1.target.value;
        console.log(gender[i]);
      }
    }
  };

  const save = async () => {
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].gender == "" ||
        data[i].gender == null
      ) {
        toast.error("Gender is required for all Students");
        return;
      }
    }

    if (!x && !y) {
      toast.error("Nothing Changed");
      setFlag(false);
      return;
    }

    setFlag(false);

    const config = {
      method: "post",
      url: `${STUDENT_GENDER}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: gender,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res);
        await getData(true);
        toast.success("Successfully Updated Details");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleChange = async (sid, h, t) => {
    setX(true);
    const config = {
      method: "put",
      url: `${STUDENT_SESSION_UPDATE}/${sid}`,
      data: {
        hostel: h,
        transport: t,
        session_id: session,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudentData = async () => {
    setLoading(1);
    setData([]);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION}/${userId}`,
      data: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer  ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const config1 = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("student data - ", res.data);
        let temp = res.data;
        let activeSession = temp?.session?.filter((s) => s.status == "ACTIVE");
        setFaculty(res.data.college_id);
        setCurrentClass(activeSession[0]?.class_id);
        setSession(activeSession[0].session_id);
        let obj = {};
        obj["id"] = temp?.data.id;
        obj["department_id"] = temp?.data.department_id;
        obj["class_id"] = activeSession[0]?.class_id;
        obj["session_id"] = activeSession[0]?.session_id;
        obj["semester_id"] =
          temp?.semester[temp?.semester.length - 1]?.semester_id;
        obj["section_id"] =
          temp?.semester[temp?.semester.length - 1]?.section_id;
        obj["student_id"] = temp?.data.user_id;
        obj["name"] = temp?.data.name;
        obj["email"] = temp?.data.email;
        obj["phone"] = temp?.data.phone;
        obj["dob"] = temp?.data?.dob?.substring(0, 10);
        obj["gender"] = temp?.data.gender;
        obj["category"] = temp?.data.category;
        obj["is_hostel"] = activeSession[0].is_hostel;
        obj["is_transport"] = activeSession[0].is_transport;
        obj["status"] = temp?.data.status;
        obj["college_name"] = collegeOpt.find(
          (s) => s.id == temp?.data.college_id
        ).name;
        obj["department_name"] = department.find(
          (s) => s.id == temp?.data.department_id
        )?.name;
        obj['student_session_id'] = activeSession[0].id;
        console.log("obj - ", obj);
        setStudentData(obj);
        let targetDiv = document.getElementById("datatable");
        targetDiv.scrollIntoView({ behavior: "smooth" });
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    await axios({
      ...config1,
      url: STUDENT_ADVANCE_PAY,
    })
      .then((res) => {
        console.log("adv - ", res.data.data);
        setAdv(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleDepartmentChange = (selectedOption) => {
    console.log("Selected Department:", selectedOption);
    setSelectedDepartment(selectedOption);
    setSelectedClass(null); 
    setSelectedSemester(null); 
    setSelectedSection(null); 
  };

  const handleClassChange = (selectedOption) => {
    console.log("Selected Class:", selectedOption);
    setSelectedClass(selectedOption);
    setSelectedSemester(null); 
    setSelectedSection(null);     
  };

  const handleSemesterChange = (selectedOption) => {
    console.log("Selected Semester:", selectedOption);
    setSelectedSemester(selectedOption);
    setSelectedSection(null);    
  };

  const handleSectionChange = (selectedOption) => {
    console.log("Selected Section:", selectedOption);
    setSelectedSection(selectedOption);   
  };

  const handleSessionChange = (selectedOption) => {
    console.log("Selected Session:", selectedOption);
    setSelectedSession(selectedOption);    
  };
  

  return (
    <div className="StudentDetails">
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <AdvanceFeeReciept
            mainData={subdata?.data}
            studentInfo={subdata?.studentInfo}
            data={a}
            collegeId={subdata?.studentInfo?.college_id}
            collegeOpt={collegeOpt}
            classData={classOpt}
            class_id={subdata?.data?.class_id}
            departmentData={department}
          />
        </div>
      </div>
      {isStudentProfileModalVisible && (
        <StudentProfile1
          setLoading={setLoading}
          collegeId={collegeId}
          selectedStudentData={selectedStudentData}
        />
      )}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students Details</h4>
                  {/* <h4 className="mb-0 mr-5">{role == "WARDEN" && employee && hostelData.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4> */}
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Students Information</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Students Details
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
                    <h2 className="card-title">Search By Enrollment Number</h2>
                    <br />
                    
                    <div className="input-group mb-3 col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student Enrollment No"
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value);
                        }}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-nex  btn-md"
                          type="submit"
                          name="submit"
                          value="collect"
                          onClick={getStudentData}
                        >
                          <i className="fa fa-search mr-1" aria-hidden="true" />{" "}
                          Search
                        </button>
                      </div>
                    </div>

                    
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />

                    <div className="row">
                      {emp_id == 316 ? (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Faculty <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              name="clg"
                              id="faculty"
                              className="form-control"
                              value={clg}
                              onChange={(e) => {
                                setClg(e.target.value);
                              }}
                            >
                              <option value="" selected>
                                ALL
                              </option>
                              {collegeOpt?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ) : null}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="faculty"
                            id="section"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            options={
                              emp_id == 316
                                ? department
                                    ?.filter((s) => s.college_id == clg)
                                    ?.map((i) => ({ label: i.name, value: i.id }))
                                : department
                                    ?.filter((s) => s.college_id == collegeId)
                                    ?.map((i) => ({ label: i.name, value: i.id }))
                            }
                          />

                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="">Session</label>
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="session"
                            id="session"
                            value={selectedSession}
                            onChange={handleSessionChange}
                            options={
                              sessionOpt?.map((i) => ({ label: i.name, value: i.id }))
                            }
                          />

                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="">Class</label>
                      <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentclass"
                            id="class"
                            value={selectedClass}
                            onChange={handleClassChange}
                            options={
                              classOpt
                                ?.filter((s) => s.department_id == selectedDepartment?.value)
                                ?.map((i) => ({ label: i.name, value: i.id }))
                            }
                          />

                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="">Semester</label>
                      <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentSemester"
                            id="semester"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            options={
                              semesterOpt
                                ?.filter((s) => s.class_id == selectedClass?.value)
                                ?.map((i) => ({ label: i.name, value: i.id }))
                            }
                          />

                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                                <label htmlFor="">Section</label>
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="currentSection"
                            id="section"
                            value={selectedSection}
                            onChange={handleSectionChange}
                            options={
                              sectionOpt
                                ?.filter((s) => s.semester_id == selectedSemester?.value)
                                ?.map((i) => ({ label: i.name, value: i.id }))
                            }
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Status</label>
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
                    </div>
                    <div className="row float-right mr-3">
                      
                      <button
                        className="btn btn-nex  btn-md"
                        type="submit"
                        name="submit"
                        value="collect"
                        onClick={getData}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Students Details</h4>
                      </div>
                      <div className="col-md-8">
                        <span className="float-right">
                          <button
                            className="btn btn-primary mx-2"
                            onClick={() => {
                              setFlag(true);
                              setX(false);
                              setY(false);
                            }}
                          >
                            Edit
                          </button>
                          {(flag == true && data.length != 0) ||
                          (flag == true && studentData.length != 0) ? (
                            <button
                              className="btn btn-primary mx-2"
                              onClick={() => save()}
                            >
                              Save
                            </button>
                          ) : null}
                        </span>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <hr />
                      <table
                        id="datatable"
                        className="table table-bordered  nowrap table-hover"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Enrollment No.</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Department</th>
                            <th>Session</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th style={{ width: "10rem" }}>Gender</th>
                            {role != "STAFF" ? (
                              <>
                                <th>Category</th>
                                <th>Hostel</th>
                                <th>Transport</th>
                                <th style={{ minWidth: "100px" }}>Action</th>
                              </>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length !== 0 && student.length != 0 ? (
                            data?.map((i, key) => (
                              <tr>
                                <td>{key + 1}</td>
                                <td>{i?.user_id}</td>
                                <td>{i?.name}</td>
                                <td>
                                  {
                                    collegeOpt.find(
                                      (s) => s.id == i?.college_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    department.find(
                                      (s) => s.id == i?.department_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {i?.session_id}-
                                  {i?.session_id + 1}
                                </td>
                                <td>
                                  {student &&
                                  student.find(
                                    (s) => s.user_id == i?.user_id
                                  )?.email
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.email
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find(
                                    (s) => s.user_id == i?.user_id
                                  )?.phone
                                    ? student.find(
                                        (s) => s.user_id == i?.user_id
                                      )?.phone
                                    : " "}
                                </td>
                                <td>
                                  {student &&
                                  student.find(
                                    (s) => s.user_id == i?.user_id
                                  )?.dob
                                    ? student
                                        .find(
                                          (s) =>
                                            s.user_id == i?.user_id
                                        )
                                        ?.dob?.split("T")[0]
                                    : " "}
                                </td>
                                <td>
                                  {i?.gender}
                                </td>
                                <td>{i?.category}</td>
                                {role != "STAFF" ? (
                                  <>
                                    <td>
                                      <input
                                        disabled={
                                          flag == true ? "" : "disabled"
                                        }
                                        type="checkbox"
                                        checked={i.is_hostel}
                                        onChange={() => {
                                          i.is_hostel == 1
                                            ? (i.is_hostel = 0)
                                            : (i.is_hostel = 1);
                                          setFlag1((flag1) => !flag1);
                                          handleChange(
                                            i?.user_id,
                                            i.is_hostel,
                                            i.is_transport
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={i.is_transport}
                                        disabled={
                                          flag == true ? "" : "disabled"
                                        }
                                        className={
                                          flag == false ? "hidden" : ""
                                        }
                                        onChange={() => {
                                          i.is_transport == 1
                                            ? (i.is_transport = 0)
                                            : (i.is_transport = 1);
                                          setFlag1((flag1) => !flag1);
                                          handleChange(
                                            i?.student_id,
                                            i.is_hostel,
                                            i.is_transport
                                          );
                                        }}
                                      />
                                    </td>
                                    <td className="flex-nowrap justify-content-between">
                                      <a

                                        data-toggle="modal"
                                        data-target="#StudentProfile1"
                                        title="Assign Hostel"
                                        onClick={() => {
                                          console.log(i);
                                          // setIsStudentProfileModalVisible(true);
                                          
                                            if (role == "WARDEN")
                                            changeDir(
                                              ROUTES.Warden.StudentProfile,
                                              i
                                            );
                                          
                                          }
                                        }
                                      >
                                        <i
                                          className="fa fa-tags"
                                          aria-hidden="true"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </a>{" "}
                                      &nbsp; &nbsp;{" "}
                                      <a
                                      title="Student Details"
                                      onClick={() => {
                                        changeDir(ROUTES.Warden.ViewStudentProfile,i)
                                      }}
                                    >
                                      <i
                                        className="fas fa-eye mr-2"
                                        aria-hidden="true"
                                        style={{ cursor: "pointer" }}
                                      />
                                    </a>
                                    </td>
                                  </>
                                ) : null}
                              </tr>
                            ))
                          ) : studentData.length !== 0 ? (
                            <tr>
                              <td>1</td>
                              <td>{studentData?.student_id}</td>
                              <td>{studentData?.name}</td>
                              <td>{studentData?.college_name}</td>
                              <td>{studentData?.department_name}</td>
                              <td>
                                {studentData?.session_id}-
                                {studentData?.session_id + 1}
                              </td>
                              <td>{studentData?.email}</td>
                              <td>{studentData?.phone}</td>
                              <td>{studentData?.dob}</td>
                              <td>{studentData?.gender}</td>
                              <td>{studentData?.category}</td>

                              {role != "STAFF" ? (
                                <>
                                  <td>
                                    <input
                                      disabled={flag == true ? "" : "disabled"}
                                      type="checkbox"
                                      checked={studentData?.is_hostel}
                                      onChange={() => {
                                        studentData?.is_hostel == 1
                                          ? (studentData.is_hostel = 0)
                                          : (studentData.is_hostel = 1);
                                        setFlag1((flag1) => !flag1);
                                        handleChange(
                                          studentData?.student_id,
                                          studentData?.is_hostel,
                                          studentData?.is_transport
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={studentData?.is_transport}
                                      disabled={flag == true ? "" : "disabled"}
                                      className={flag == false ? "hidden" : ""}
                                      onChange={() => {
                                        studentData?.is_transport == 1
                                          ? (studentData.is_transport = 0)
                                          : (studentData.is_transport = 1);
                                        setFlag1((flag1) => !flag1);
                                        handleChange(
                                          studentData?.student_id,
                                          studentData?.is_hostel,
                                          studentData?.is_transport
                                        );
                                      }}
                                    />
                                  </td>
                                  <td className="flex-nowrap justify-content-between">
                                    <a
                                      data-toggle="modal"
                                      data-target="#StudentProfile1"
                                      title="Assign Hostel"
                                      onClick={() => {
                                        setIsStudentProfileModalVisible(true);

                                          if (role == "WARDEN")
                                          changeDir1(
                                            ROUTES.Warden.StudentProfile,
                                            studentData
                                          );
                                      }}
                                    >
                                      <i
                                        className="fa fa-tags"
                                        aria-hidden="true"
                                        style={{ cursor: "pointer" }}
                                      />
                                    </a>{" "}
                                    &nbsp; &nbsp;{" "}
                                    <a
                                      // data-toggle="modal"
                                      // data-target="#StudentProfile1"
                                      title="Student Details"
                                      onClick={() => {
                                        // setIsStudentProfileModalVisible(true);

                                        if (role == "WARDEN")
                                          changeDir1(
                                            ROUTES.Warden.ViewStudentProfile,
                                            studentData
                                          );
                                      }}
                                    >
                                      <i
                                        className="fas fa-eye mr-2"
                                        aria-hidden="true"
                                        style={{ cursor: "pointer" }}
                                      />
                                    </a>
                                  </td>
                                </>
                              ) : null}
                            </tr>
                          ) : (
                            <tr>
                              {" "}
                              <td colSpan={15}>
                                <div align="center" className="text-danger">
                                  No data available in table <br /> <br />
                                  <img
                                    src="/assets/images/addnewitem.svg"
                                    width={150}
                                  />
                                  <br />
                                  <br />{" "}
                                  <span className="text-success bolds">
                                    <i className="fa fa-arrow-left" /> Add new
                                    record or search with different criteria.
                                  </span>
                                  <div />
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailsHostel;