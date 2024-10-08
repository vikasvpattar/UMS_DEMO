import React from "react";
import { useEffect } from "react";
import { useEffectOnce } from "../../../Hooks/useEffectOnce.tsx";
import { useState } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig.js";
import OffCanvasStudentProfile from "../../../Components/OffCanvas/Student/OffCanvasStudentProfile";
import BasicInformation from "../../../Components/Student/Profile/BasicInformation";
import StudentDocuments from "../../../Components/Student/Profile/StudentDocuments";
import StudentFee from "../../../Components/Student/Profile/StudentFee";
import StudentProfileSwitches from "../../../Components/Student/Profile/StudentProfileSwitches";
import StudentStatus from "../../../Components/Student/Profile/StudentStatus";
import ModalStudentProfileUpload from "../../../modals/Students/ModalStudentProfileUpload";
// import
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import "./StudentProfile.scss";
import { Drawer } from "antd";
import { Http } from "../../../Services/Services.js";
import { STUDENT_SESSION } from "../../../utils/apiConstants.js";

function StudentProfile({ setLoading, collegeId }) {
  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState(location?.state?.data);

  const [studentDetails, setStudentDetails] = useState();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [flag, setFlag] = useState(false);

  const [allStudentsDetails, setAllStudentsDetails] = useState([]);

  const [allstudentloading, setAllStudentLoading] = useState(false);

  const currentSemester = searchParams.get("sem");
  const currentDepartemnt = searchParams.get("depart");
  const currentSession = searchParams.get("session");
  const currentClass = searchParams.get("class");
  const currentSection = searchParams.get("section");

  const getData = async () => {
    setAllStudentLoading(true);

    await Http.get(
      `${STUDENT_SESSION}?class_id=${currentClass}&semester_id=${currentSemester}&session_id=${currentSession}`
    )
      .then((res) => {
        setAllStudentsDetails(res.data.data);
        setAllStudentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setAllStudentLoading(false)
      });
  };

  const getData1 = async () => {
    setAllStudentLoading(true);
    if (
      searchParams.get("class") &&
      searchParams.get("sem") &&
      searchParams.get("session")
    ) {
      await Http.get(
        `${STUDENT_SESSION}?class_id=${searchParams.get(
          "class"
        )}&semester_id=${searchParams.get("sem")}&session_id=${searchParams.get(
          "session"
        )}&section_id=${searchParams.get(
          "section"
        )}&department_id=${searchParams.get("depart")}`
      )
        .then((res) => {
          setAllStudentsDetails(res.data.data);
          setAllStudentLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setAllStudentLoading(false)
        });
    }
  };

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

  const [tab, setTab] = useState("Basic");

  const changeDir = (dir, i) => {
    navigate(
      `${dir}/${i?.user_id}?depart=${currentDepartemnt}&session=${currentSession}&class=${currentClass}&sem=${currentSemester}&section=${currentSection}`,
      {
        state: {
          data: allStudentsDetails,
        },
      }
    );
  };

  const id = useParams().id;

  useEffect(() => {
    setData(location?.state?.data);
  }, [location.state]);

  useEffect(() => {
    if (currentClass && currentSemester && currentSession) {
      getData();
    }
  }, [currentSemester, currentClass, currentSession]);

  useEffect(() => {
    getData1();
  }, []);

  return (
    <>
      <div className="StudentProfile">
        <>
          <ModalStudentProfileUpload />
          <Drawer
            title="Students with similar class"
            placement={"right"}
            width={500}
            onClose={onClose}
            open={isDrawerVisible}
          >
            <div className="row">
              <div className="col-md-12">
                { 
                  allStudentsDetails?.map((i, key)=>(
                    <div className="d-flex p-2 px-3 card rounded cursor-pointer"
                      onClick={()=>{
                        if(role=="ADMIN"){
                           setIsDrawerVisible(false);
                           setTab("Basic")
                           setFlag((flag)=>!flag)
                           changeDir(ROUTES.Principal.Student.StudentProfile,i);
                          }
                        if(role=="SUPERADMIN"){
                          setIsDrawerVisible(false)
                           setTab("Basic")
                           setFlag((flag)=>!flag)
                           changeDir(ROUTES.Registar.Student.StudentProfile,i);
                          }
                      }}
                    >
                      <div className="row">
                        <div className="col-md-8">
                          <h6>
                          {i?.name}
                          </h6>
                          <p className="mb-0">
                            {i?.user_id}
                          </p>
                        </div>
                        <div className="col-md-4">
                        <img
                          className="profile-user-img img-responsive rounded mx-auto d-block"
                          src={`${i?.student_picture
                              ? i?.student_picture
                              : "/assets/images/Nexenstial Logo.jpg"
                            }`}
                          width="50%"
                          style={{ aspectRatio: "1/1" }}
                                />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Drawer>
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Student Profile</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Student</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            <a href="javascript:void(0)"> Students Details</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            Students Profile
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center">
                    {!searchParams.get("hos") && !searchParams.get("trans") ? (
                      <>
                        <button
                          className="btn btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                          onClick={() => {
                            role == "SUPERADMIN"
                              ? navigate(
                                  ROUTES.Registar.Student.StudentDetails,
                                  {
                                    state: {
                                      depart: searchParams.get("depart"),
                                      class: searchParams.get("class"),
                                      session: searchParams.get("session"),
                                      section: searchParams.get("section"),
                                      sem: searchParams.get("sem"),
                                    },
                                  }
                                )
                              : role == "ADMIN"
                              ? navigate(
                                  ROUTES.Principal.Student.StudentDetails,
                                  {
                                    state: {
                                      depart: searchParams.get("depart"),
                                      class: searchParams.get("class"),
                                      session: searchParams.get("session"),
                                      section: searchParams.get("section"),
                                      sem: searchParams.get("sem"),
                                    },
                                  }
                                )
                              : navigate(ROUTES.Accountant.StudentDetails, {
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

                        <h4 className="mb-0">STUDENT LIST</h4>
                      </>
                    ) : null}
                    {searchParams.get("hos") == 1 ? (
                      <>
                        <button
                          className="btn ml-3 btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                          onClick={() => {
                            role == "SUPERADMIN"
                              ? navigate(ROUTES.Registar.Hostel.hostelFee)
                              : navigate(ROUTES.Accountant.Hostel.hostelFee);
                          }}
                        >
                          <i className="ri-arrow-left-line"></i>
                        </button>
                        <h4 className="mb-0">HOSTEL LIST</h4>{" "}
                      </>
                    ) : null}

                    {searchParams.get("trans") == 1 ? (
                      <>
                        <button
                          className="btn ml-3 btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                          onClick={() => {
                            role == "SUPERADMIN"
                              ? navigate(ROUTES.Registar.Transport.transportFee)
                              : navigate(
                                  ROUTES.Accountant.Transport.transportFee
                                );
                          }}
                        >
                          <i className="ri-arrow-left-line"></i>
                        </button>
                        <h4 className="mb-0">TRANSPORT LIST</h4>{" "}
                      </>
                    ) : null}
                  </div>
                </div>
                <div>
                  <hr />
                  <h3 className="text-center">Student Profile</h3>
                  <hr />
                </div>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="box box-primary">
                        <div className="box-body box-profile">
                          <div className="card py-2">
                            <ul className="list-group list-group-unbordered pt-3">
                              <img
                                className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                                src={`${
                                  studentDetails?.student_picture
                                    ? studentDetails?.student_picture
                                    : "/assets/images/Nexenstial Logo.jpg"
                                }`}
                                width="50%"
                                style={{ aspectRatio: "1/1" }}
                              />
                              <br />
                              <h5 className="profile-username text-center">
                                {studentDetails?.name}
                              </h5>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Enrollment No. :</b>{" "}
                                <a className="float-right text-aqua">
                                  {studentDetails?.user_id}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Phone :</b>{" "}
                                <a
                                  className="float-right text-aqua"
                                  href="tel:{studentDetails?.phone}"
                                >
                                  {studentDetails?.phone}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Email :</b>{" "}
                                <a
                                  className="float-right text-aqua"
                                  href="mailto:{studentDetails?.email}"
                                >
                                  {studentDetails?.email}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Program :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localPrograms?.find(
                                      (s) => s?.id == studentDetails?.program_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>College :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localColleges?.find(
                                      (s) => s?.id == studentDetails?.college_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Department :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localDepartments?.find(
                                      (s) =>
                                        s?.id == studentDetails?.department_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Gender :</b>{" "}
                                <a className="float-right text-aqua">
                                  {studentDetails?.gender}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Admission Date :</b>{" "}
                                <a className="float-right text-aqua">
                                  {studentDetails?.createdAt?.split("T")[1]}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                      <div className="card ">
                        <div className="card-body">
                          <StudentProfileSwitches
                            tab={tab}
                            setTab={setTab}
                            setLoading={setLoading}
                            collegeId={collegeId}
                            OpenDrawer={OpenDrawer}
                            allstudentloading={allstudentloading}
                            data={["Basic", "Fee", "Documents"]}
                          />
                          {tab == "Basic" && (
                            <BasicInformation
                              setLoading={setLoading}
                              flag={flag}
                              id={id}
                              setStudentDetails={setStudentDetails}
                            />
                          )}
                          {tab === "Fee" && (
                            <StudentFee id={id} setLoading={setLoading} />
                          )}
                          {tab === "Documents" && (
                            <StudentDocuments setLoading={setLoading} id={id} />
                          )}
                          {tab === "Status" && (
                            <StudentStatus
                              data={data}
                              setLoading={setLoading}
                            />
                          )}
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

export default StudentProfile;
