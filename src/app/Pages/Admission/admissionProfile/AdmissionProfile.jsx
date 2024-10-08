import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import OffCanvasStudentProfile from "../../../Components/OffCanvas/Student/OffCanvasStudentProfile";
import BasicInformation from "../../../Components/Admission/Profile/BasicInformation";
import StudentCollegeDetails from "../../../Components/Admission/Profile/StudentCollegeDetails";
import StudentDocuments from "../../../Components/Admission/Profile/StudentDocuments";
import StudentFee from "../../../Components/Admission/Profile/StudentFee";
import StudentProfileSwitches from "../../../Components/Admission/Profile/StudentProfileSwitches";
import StudentStatus from "../../../Components/Admission/Profile/StudentStatus";
import ModalStudentProfileUpload from "../../../modals/Students/ModalStudentProfileUpload";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import "./StudentProfile.scss";
import { STUDENT_ADMISSION_DETAILS } from "../../../utils/apiConstants";
import axios from "axios";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";

function AdmissioProfile({ setLoading, collegeId }) {
  const location = useLocation();

  const [data, setData] = useState("");

  const [basic_data, set_basic_data] = useState("");

  const [form_data, set_form_data] = useState("");

  const [role, setRole] = useState("");

  const getRole = () => {
    return sessionStorage.getItem(SESSION_ROLE)
      ? sessionStorage.getItem(SESSION_ROLE)
      : null;
  };

  const localDepartments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));
  const localPrograms = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));
  const localColleges = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const user_id = useParams().id;
  console.log("params", user_id);

  const [applicatonType, setApplicationType] = useState();

  const selectRoute = (specialization, program, department) => {
    console.log(specialization, program, department);
    switch (specialization + "|" + program) {
      case "1111010|04":
        setApplicationType("Bed");
        break;

      case "1111003|04":
        switch (department) {
          case 36:
            setApplicationType("Nursing Post Basic");
            break;

          case 35:
            setApplicationType("Nursing Bsc");
            break;
        }
        break;

      case "1111011|04":
        setApplicationType("Bsc");
        break;

      case "1111008|04":
        setApplicationType("UGPharmacy");
        break;

      case "1111008|05":
        setApplicationType("PGPharmacy");
        break;

      case "1111005|04" || "1111005|05":
        setApplicationType("Commerce");
        break;

      case "1111003|02":
        setApplicationType("Nursing GNM");
        break;

      case "1111002|04" || "1111002|LAW":
        setApplicationType("Law");
        break;

      case "1111003|05":
        setApplicationType("Nursing Msc");
        break;

      case "1111011|05":
        setApplicationType("Msc");
        break;
      case "1111007|04":
        setApplicationType("Homeopathy");
        break;
      case "1111001|04":
        setApplicationType("Ayurveda");
        break;

      case "1111001|05":
        setApplicationType("AyurvedaPG");
        break;
    }
  };

  const [tab, setTab] = useState("Basic");

  const [classOpt, setClassOpt] = useState([]);
  const [semOpt, setSemOpt] = useState([]);

  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setInfo(prevValue => ({
  //         ...prevValue,
  //         [name]: value,
  //     }))
  // }

  const getBasicData = async (college_id) => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2] = await Promise.all([
      axios({
        ...config,
        url: `${ACADEMICS_ADD_CLASS}?college_id=${college_id}`,
      })
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
        }),
      axios({
        ...config,
        url: `${ACADEMICS_ADD_SEMESTER}?college_id=${college_id}`,
      })
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);

    setClassOpt(data1);
    setSemOpt(data2);
  };

  const getData = () => {
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION_DETAILS}?user_id=${user_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        setData(res.data.data[0]);
        set_basic_data(res?.data?.data[0]?.basic_data);
        set_form_data(res?.data?.data[0]?.form_data);
        selectRoute(
          res.data.data[0].basic_data.college_id,
          res.data.data[0].basic_data.program_id,
          res.data.data[0].basic_data.department_id
        );
        getBasicData(res.data.data[0].basic_data.college_id);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const getAllData = () => {
    const config = {
      method: "get",
      url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
  };

  useEffect(() => {
    getData();
    getAllData();
  }, [role]);

  useEffect(() => {
    setRole(getRole());
  }, [sessionStorage.getItem(SESSION_ROLE)]);

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

                <div>
                  <hr />
                  <h3 className="text-center">
                    {applicatonType} Admission Form
                  </h3>
                  <hr />
                </div>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="box box-primary">
                        <div className="box-body box-profile">
                          <div className="card py-2">
                            <ul className="list-group list-group-unbordered pt-3">
                              <img
                                className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                                src={`${
                                  basic_data?.student_picture
                                    ? basic_data?.student_picture
                                    : "/assets/images/Nexenstial Logo.jpg"
                                }`}
                                width="50%"
                                style={{ aspectRatio: "1/1" }}
                              />
                              <br />
                              <h3 className="profile-username text-center">
                                {basic_data?.name}
                              </h3>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Phone :</b>{" "}
                                <a className="float-right text-aqua">
                                  {basic_data?.phone}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Email :</b>{" "}
                                <a className="float-right text-aqua">
                                  {basic_data?.email}
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Program :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localPrograms?.find(
                                      (s) => s?.id == basic_data?.program_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>College :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localColleges?.find(
                                      (s) => s?.id == basic_data?.college_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Department :</b>{" "}
                                <a className="float-right text-aqua">
                                  {
                                    localDepartments?.find(
                                      (s) => s?.id == basic_data?.department_id
                                    )?.name
                                  }
                                </a>
                              </li>
                              <li className="list-group-item listnoback d-flex justify-content-between">
                                <b>Gender :</b>{" "}
                                <a className="float-right text-aqua">
                                  {basic_data?.gender}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                      <div className="card ">
                        <div className="card-body">
                          <StudentProfileSwitches tab={tab} setTab={setTab} />
                          {tab === "Basic" && (
                            <BasicInformation
                              data={data}
                              basic_data={basic_data}
                              set_basic_data={set_basic_data}
                              setLoading={setLoading}
                              role={role}
                              reloadData={getData}
                              localDepartments={localDepartments}
                              classOpt={classOpt}
                              semOpt={semOpt}
                            />
                          )}
                          {tab === "College Details" && (
                            <StudentCollegeDetails
                              application={applicatonType}
                              form_data={form_data}
                              data={data}
                              setLoading={setLoading}
                              role={role}
                              reloadData={getData}
                            />
                          )}
                          {tab === "Fee" && (
                            <StudentFee
                              setLoading={setLoading}
                              role={role}
                              reloadData={getData}
                            />
                          )}
                          {tab === "Documents" && (
                            <StudentDocuments
                              setLoading={setLoading}
                              data={data}
                              setData={setData}
                              role={role}
                              reloadData={getData}
                            />
                          )}
                          {tab === "Status" && (
                            <StudentStatus
                              data={data}
                              setLoading={setLoading}
                              role={role}
                              reloadData={getData}
                            />
                          )}
                          <div className="tab-content" id="myTabContent">
                            {/* <div
                                                        className="tab-pane fade"
                                                        id="profile"
                                                        role="tabpanel"
                                                        aria-labelledby="profile-tab"
                                                    >
                                                        {" "}
                                                        <br />
                                                        <div className="alert alert-danger">No Record Found </div>
                                                    </div> */}
                            {/* <div
                                                        className="tab-pane fade"
                                                        id="contact"
                                                        role="tabpanel"
                                                        aria-labelledby="contact-tab"
                                                    >
                                                        <div className="timeline-header no-border">
                                                            {" "}
                                                            <br />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-sm float-right"
                                                                data-toggle="modal"
                                                                data-target="#document"
                                                            >
                                                                {" "}
                                                                <i className="fa fa-upload" /> Upload Documents
                                                            </button>
                                                            <br />
                                                            <div
                                                                className="table-responsive"
                                                                style={{ clear: "both" }}
                                                            >
                                                                <br />
                                                                <div className="row"></div>
                                                                <table className="table table-striped table-bordered table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title </th>
                                                                            <th>Name </th>
                                                                            <th className="mailbox-date text-right">
                                                                                Action{" "}
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                colSpan={5}
                                                                                className="text-danger text-center"
                                                                            >
                                                                                No Record Found
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div> */}
                            {/* <div className="tab-pane" id="timelineh">
                                                        <div>
                                                            {" "}
                                                            <input
                                                                type="button"
                                                                id="myTimelineButton"
                                                                className="btn btn-sm btn-primary float-right "
                                                                defaultValue="Add"
                                                            />
                                                        </div>
                                                        <br />
                                                        <div className="timeline-header no-border">
                                                            <div id="timeline_list">
                                                                <br />
                                                                <div className="alert alert-info">
                                                                    No Record Found
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                          </div>
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

export default AdmissioProfile;
