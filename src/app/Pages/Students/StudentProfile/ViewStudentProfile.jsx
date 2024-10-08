import React from "react";
import { useEffect } from "react";
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
import AdmissionView from "../../../Components/Student/Profile/AdmissionView";
import StudentDocuments from "../../../Components/Student/Profile/StudentDocuments";
import StudentFee from "../../../Components/Student/Profile/StudentFee";
import StudentProfileSwitches from "../../../Components/Student/Profile/StudentProfileSwitches";
import StudentStatus from "../../../Components/Student/Profile/StudentStatus";
import ModalStudentProfileUpload from "../../../modals/Students/ModalStudentProfileUpload";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import "./StudentProfile.scss";

function ViewStudentProfile({ setLoading, collegeId }) {
  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState(location?.state?.data);

  const [studentDetails, setStudentDetails] = useState();

  let role = sessionStorage.getItem("role");

  const localDepartments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));
  const localPrograms = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));
  const localColleges = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  // const [applicatonType, setApplicationType] = useState()

  // const selectRoute = (specialization, program, department) => {

  //     switch (specialization + "|" + program) {

  //         case "1111010|04":
  //             setApplicationType('Bed')
  //             break;

  //         case "1111003|04":

  //             switch (department) {
  //                 case 36:
  //                     setApplicationType('Nursing Post Basic')
  //                     break;

  //                 case 35:
  //                     setApplicationType('Nursing Bsc')
  //                     break;
  //             }

  //         case "1111011|04":
  //             setApplicationType('Bsc')
  //             break;

  //         case "1111005|04" || "1111005|05":
  //             setApplicationType('Commerce')
  //             break;

  //         case "1111003|02":
  //             setApplicationType('Nursing GNM')
  //             break;

  //         case "1111002|04" || "1111002|LAW":
  //             setApplicationType('Law')
  //             break;

  //         case "1111003|05":
  //             setApplicationType('Nursing Msc')
  //             break;

  //         case "1111011|05":
  //             setApplicationType('Msc')
  //             break;

  //     }

  // }

  const [tab, setTab] = useState("Basic");

  const id = useParams().id;
  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setInfo(prevValue => ({
  //         ...prevValue,
  //         [name]: value,
  //     }))
  // }

  useEffect(() => {
    setData(location?.state?.data);
    // selectRoute(location?.state?.data?.basic_data?.college_id, location?.state?.data?.basic_data?.program_id, location?.state?.data?.basic_data?.department_id)
  }, [location.state]);

  return (
    <>
      <div className="StudentProfile">
        <>
          <ModalStudentProfileUpload />
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
                            <a
                              href=""
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
                                  : navigate(
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
                                    );
                              }}
                            >
                              {" "}
                              Students Details
                            </a>
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
                    <button
                      className="btn btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                      onClick={() => {
                        role == "SUPERADMIN"
                          ? navigate(ROUTES.Registar.Student.StudentDetails, {
                              state: {
                                depart: searchParams.get("depart"),
                                class: searchParams.get("class"),
                                session: searchParams.get("session"),
                                section: searchParams.get("section"),
                                sem: searchParams.get("sem"),
                              },
                            })
                          : navigate(ROUTES.Principal.Student.StudentDetails, {
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
                      <i className="ri-arrow-left-line mr-2"></i> Back
                    </button>
                  </div>
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
                              <p className="text-center text-danger">
                                <b>( {studentDetails?.user_id} )</b>
                              </p>
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
                                  href="mailto: {studentDetails?.email}"
                                  className="float-right text-aqua"
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
                                <a className="float-right text-aqua text-uppercase">
                                  {studentDetails?.gender}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Admission Date :</b>{" "}
                                <a className="float-right text-aqua">
                                  {studentDetails?.createdAt?.split("T")[0]}
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
                          />
                          {tab === "Basic" && (
                            <BasicInformation
                              setLoading={setLoading}
                              id={id}
                              setStudentDetails={setStudentDetails}
                            />
                          )}
                          {tab === "Admission" && (
                            <AdmissionView
                              id={id}
                              setLoading={setLoading}
                              setStudentDetails={setStudentDetails}
                            />
                          )}
                          {tab === "Fee" && (
                            <StudentFee id={id} setLoading={setLoading} />
                          )}
                          {tab === "Documents" && <StudentDocuments />}
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

export default ViewStudentProfile;
