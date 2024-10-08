import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Http } from '../Services/Services.js';
import { STUDENT_SESSION } from '../utils/apiConstants';
import { LOCAL_COLLEGE, LOCAL_DEPARTMENT, LOCAL_PROGRAM } from '../utils/LocalStorageConstants';
import ModalStudentProfileUpload from './Students/ModalStudentProfileUpload.jsx';
import { Drawer } from 'antd';
import { ROUTES } from '../Router/routerConfig.js';
import { toast } from "react-toastify";
import StudentProfileSwitches from '../Components/Admission/Profile/StudentProfileSwitches.jsx';
import HostelEditWarden from '../Pages/HostelEditWarden.jsx';
import StudentFee from '../Components/Student/Profile/StudentFee.jsx';
import StudentDocuments from '../Components/Student/Profile/StudentDocuments.jsx';
import StudentStatus from '../Components/Student/Profile/StudentStatus.jsx';
import OffCanvasStudentProfile from '../Components/OffCanvas/Student/OffCanvasStudentProfile.jsx';
import StudentProfileSwitchesHostel from '../Components/Admission/Profile/StudentProfileSwitchesHostel.jsx';
import { ACADEMICS_ADD_CLASS, ACADEMICS_ADD_SECTION, ACADEMICS_ADD_SEMESTER } from '../utils/Academics.apiConst.js';
import { EMPLOYEE_ALL2} from "../utils/apiConstants";


function  StudentProfile1( { setLoading, collegeId,
  selectedStudentData } ) {

    const emp_id = sessionStorage.getItem("employee_id");
  
    let auth = sessionStorage.getItem("UMS_auth");

    const location = useLocation();

    const navigate = useNavigate();
  
    const [searchParams] = useSearchParams();
  
    const [data, setData] = useState(location?.state?.data);
    const [data2, setData2] = useState();
    const [data3, setData3] = useState();
    const [data4, setData4] = useState();

    const [employee, setEmployee] = useState([]);

  
    const [studentDetails, setStudentDetails] = useState();
  
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  
    const [flag, setFlag] = useState(false);
  
    const [allStudentsDetails, setAllStudentsDetails] = useState([]);
  
    const [allstudentloading, setAllStudentLoading] = useState(false);
  
    const currentSemester = searchParams.get('sem');
    const currentDepartemnt = searchParams.get('depart');
    const currentSession = searchParams.get('session');
    const currentClass = searchParams.get('class');
    const currentSection = searchParams.get('section');
  
    const getData = async () => {
      setAllStudentLoading(true)
      await Http.get(`${STUDENT_SESSION}?class_id=${currentClass}&semester_id=${currentSemester}&session_id=${currentSession}`)
      .then(res=>{
        setAllStudentsDetails(res.data.data)
        setAllStudentLoading(false)
      })
    }
  
    const getData1 = async()=>{
      setAllStudentLoading(true)
      await Http.get(`${STUDENT_SESSION}?class_id=${searchParams.get('class')}&semester_id=${searchParams.get('sem')}&session_id=${searchParams.get('session')}`)
      .then(res=>{
        setAllStudentsDetails(res.data.data)
        setAllStudentLoading(false)
      })
    }
  
    const onClose = () => {
      setIsDrawerVisible(false);
    };
  
    const OpenDrawer = () => {
      setIsDrawerVisible(true);
    };
  
    let role = sessionStorage.getItem("role");
  
    const localDepartments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));
    const localPrograms = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));
    const localColleges = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));
  
    const [tab, setTab] = useState(" ");
  
    const changeDir = (dir, i) => {
      console.log('i - ', i);
      navigate(
        `${dir}/${i?.data?.student_id}?session_id=${i.id}&depart=${currentDepartemnt}&session=${currentSession}&class=${currentClass}&sem=${currentSemester}&section=${currentSection}`,
        {
          state: {
            data: allStudentsDetails,
          },
        }
      );
    };
  
    const id = useParams().id;
    // console.log("id",id);
  
  // console.log(id)
    useEffect(() => {
      setData(location?.state?.data);
    }, [location.state]);

    useEffect(() => {
      setStudentDetails(selectedStudentData);
    }, [selectedStudentData]);
  
  
    useEffect(()=>{
      if(currentClass && currentSemester && currentSession) 
      {
        getData()
      }
    },[currentSemester, currentClass, currentSession])

    
  const getEmpData = async () => {
    const config = {
      method: "get",
      url: `${EMPLOYEE_ALL2}?employee_id=${emp_id}`,
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log('emp data - ', res.data.data);
        setEmployee(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong",err);
      });
    
  }
  
  
    useEffect(()=>{
      // console.log("Hello")
        getData1();
        getEmpData();
    },[])

    const getData2 = async () => {
      setLoading(1);
  
      const config = {
        method: "get",
        url: `${ACADEMICS_ADD_CLASS}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      await axios(config)
        .then((res) => {
          setLoading(0);
          setData2(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        });

        const config1 = {
          method: "get",
          url: `${ACADEMICS_ADD_SECTION}`,
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        await axios(config1)
          .then((res) => {
            setLoading(0);
            setData3(res.data.data);
          })
          .catch((err) => {
            setLoading(0);
            console.log(err);
          });

          const config2 = {
            method: "get",
            url: `${ACADEMICS_ADD_SEMESTER}`,
            headers: {
              "Content-Type": "application/json",
            },
          };
      
          await axios(config2)
            .then((res) => {
              setLoading(0);
              setData4(res.data.data);
            })
            .catch((err) => {
              setLoading(0);
              console.log(err);
            });

    };

    useEffect(() => {
      getData2();
    },[]);

    const getSemesterName = () => {
      const classId = studentDetails?.department_id;

      // console.log("classId:", classId);
    
      // Check if classId is defined before using it
      if (classId !== undefined && classId !== null) {
        const semester = data4?.find((s) => s?.class_id == classId)?.name;

        // console.log("Semester:", semester);
    
        // Check if semester is found before accessing its name
        if (semester) {
          // console.log('Semester name:', semester);
          return semester;
        }
      }
    
      // Return a default value if classId is undefined, null, or if semester is not found
      return "N/A";
    };
  
    return (
      <>
        <div className="StudentProfile1">
          <>
            {/* <ModalStudentProfileUpload /> */}
            <Drawer
              title="Students with similar class"
              placement={'right'}
              width={500}
              onClose={onClose}
              open={isDrawerVisible}
            >
              <div className="row">
                <div className="col-md-12">
                  {/* {console.log(allStudentsDetails)} */}
                  { 
                    allStudentsDetails?.map((i, key)=>(
                      <div className="d-flex p-2 px-3 card rounded cursor-pointer"
                        onClick={()=>{
                            if(role=="WARDEN"){
                              setIsDrawerVisible(false)
                               setTab(" ")
                               setFlag((flag)=>!flag)
                               changeDir(ROUTES.Warden.ViewStudentProfile,i);
                            }
                        }}
                      >
                        <h6>
                        {i.studentInfo?.name}
                        </h6>
                        <p className="mb-0">
                          {i.data?.student_id}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Drawer>
                
            <div
                className="modal fade"
                id="StudentProfile1"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
            <div
                className="modal-dialog modal-dialog-centered mw-100 w-50"
                role="document"
            >
            <div className="modal-content">

                  {/* start page title */}
                  <div className="row">
                    <div className="col-12">
                      <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLongTitle">
                          Student Profile
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            if(role == "SUPERADMIN") {
                              navigate(ROUTES.Registar.Student.StudentDetails)
                            }
                            else if(role == "SUACC") {
                              navigate(ROUTES.Accountant.StudentDetails)
                            }
                            else {
                              navigate(ROUTES.Warden.StudentDetails)
                            }
                          }}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* end page title */}
                  <div className="col-12">
                    <div className="modal-title-box d-flex align-items-center">
                    {
                        !searchParams.get("hos") && !searchParams.get("trans") ?<>
                      <button
                        className="btn btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                        onClick={() => {
                          role == "WARDEN"
                            ? navigate(ROUTES.Warden.StudentDetails, {
                              state: {
                                depart: searchParams.get("depart"),
                                class: searchParams.get("class"),
                                session: searchParams.get("session"),
                                section: searchParams.get("section"),
                                sem: searchParams.get("sem"),
                              },
                            })
                            :  navigate(ROUTES.Accountant.StudentDetails, {
                              state: {
                                depart: searchParams.get("depart"),
                                class: searchParams.get("class"),
                                session: searchParams.get("session"),
                                section: searchParams.get("section"),
                                sem: searchParams.get("sem"),
                              },
                            });
                        }}
                      >
                        <i className="ri-arrow-left-line"></i>
                      </button>
                      
                      
                      <h4 className="mb-0">STUDENT LIST</h4></> : null
  }
                      {
                        searchParams.get("hos") == 1 ?
                      <>
                      <button
                        className="btn ml-3 btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                        onClick={() => {
                          role == "WARDEN"
                            ? navigate(ROUTES.Warden.HostelFees)
                            : navigate(ROUTES.Accountant.Hostel.hostelFee);
                        }}
                      >
                        <i className="ri-arrow-left-line"></i>
                      </button>
                      <h4 className="mb-0">HOSTEL LIST</h4> </> :  null
                      }  
                
                    </div>
                  </div>
                  <div>
                    <hr />
                    <h3 className="text-center">Student Profile</h3>
                    <hr />
                  </div>
  
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <div className="box box-primary">
                          <div className="box-body box-profile">
                            <div className="card py-2">
                              <ul className="list-group list-group-unbordered pt-3">
                                <img
                                  className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                                  src={`${studentDetails?.student_picture
                                      ? studentDetails?.student_picture
                                      : "/assets/images/Nexenstial Logo.jpg"
                                    }`}
                                  width="15%"
                                  style={{ aspectRatio: "1/1" }}
                                />
                                <br />
                                <h5 className="profile-username text-center">
                                  {studentDetails?.name}
                                  <br/> 
                                  <p><h6> ({studentDetails?.user_id}) </h6></p>
                                </h5>
                                
                          
                                <li className="list-group-item listnoback d-flex justify-content-between">
                                  <b>Program : {
                                      localPrograms?.find(
                                        (s) => s?.id == studentDetails?.program_id
                                      )?.name
                                    }
                                  </b>{" "}
                                  <b>College : {
                                      localColleges?.find(
                                        (s) => s?.id == studentDetails?.college_id
                                      )?.name
                                    }
                                  </b>{" "}  
                                </li>
                                <li className="list-group-item listnoback d-flex justify-content-between">
                                  <b>Department : {
                                      localDepartments?.find(
                                        (s) =>
                                          s?.id == studentDetails?.department_id
                                      )?.name
                                    }
                                  </b>{" "}
                                  <b>Class : {
                                      data2?.find(
                                        (s) =>
                                          s?.id == studentDetails?.department_id
                                      )?.name
                                    }
                                  </b>{" "}
                                </li>
                                <li className="list-group-item listnoback d-flex justify-content-between">
                                  {/* <b>Semester : {
                                    data4?.find(
                                      (s) => s?.class_id == (data2?.find(
                                        (s) => s?.id == studentDetails?.department_id
                                      )?.id)
                                    )?.name
                                  }
                                  </b>{" "} */}
                                  <b>Semester : {getSemesterName()}</b>{" "}
                                  <b>Section : {
                                      data3?.find(
                                        (s) =>
                                          s?.id == studentDetails?.department_id
                                      )?.name
                                    }
                                  </b>{" "}
                                </li>
                                
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card ">
                          <div className="card-body">
                            <StudentProfileSwitchesHostel
                              // tab={tab}
                              // setTab={setTab}
                              setLoading={setLoading}
                              collegeId={collegeId}
                              OpenDrawer={OpenDrawer}
                              allstudentloading={allstudentloading}
                              // data = {[" "]}
                            />
                            {/* {tab == " " && */}
                              <HostelEditWarden
                                setLoading={setLoading}
                                flag={flag}
                                id={id}
                                setStudentDetails={setStudentDetails}
                                employee = {employee}
                              />
                            {/* } */}
                            
      
                            <div className="tab-content" id="myTabContent"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card */}

                </div>
              </div>
              {/* container-fluid */}
              <OffCanvasStudentProfile />
  
              <div className="rightbar-overlay" />
            </div>
          </>
        </div>
      </>
    );
    
  }

export default StudentProfile1;
