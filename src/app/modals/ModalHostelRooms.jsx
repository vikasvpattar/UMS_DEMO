import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { ROUTES } from '../Router/routerConfig';
import { STUDENT_ADMISSION, STUDENT_ADVANCE_PAY, STUDENT_DETAILS2, STUDENT_GENDER, STUDENT_SESSION, STUDENT_SESSION_UPDATE } from '../utils/apiConstants';
import { SESSION_ROLE } from '../utils/sessionStorageContants';
import { useReactToPrint } from 'react-to-print';
import { LOCAL_COLLEGE, LOCAL_DEPARTMENT } from '../utils/LocalStorageConstants';
import { ACADEMICS_ADD_CLASS, ACADEMICS_ADD_SECTION, ACADEMICS_ADD_SEMESTER } from '../utils/Academics.apiConst';
import { SessionOpt } from '../Data/student/sessionData';
import { HOSTEL, HOSTEL_FLOORS, HOSTEL_ROOMS, HOSTEL_ROOMS1, HOSTEL_TYPE } from '../utils/Hostel.apiConst';
import { ADDHOSTELFEE } from '../utils/fees.apiConst';
import { STUDENT_SESSION_PUT } from '../utils/InfoUploadingApiConstants';

function ModalHostelRooms( {setLoading, collegeId, vacantData, year, getData} ) {

    const buttonRef = useRef(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      console.log('close modal called');
      getData();
      setStudentData([]);
      setUserId("");
      if (buttonRef.current) {
        buttonRef.current.click();
      }
      setModalOpen(false);
    };

    // const [enrollmentNumberEntered, setEnrollmentNumberEntered] = useState(false);

    // console.log('hostel data - ', vacantData);
    let role = sessionStorage.getItem(SESSION_ROLE);
    const locate = useLocation();

    // const [adv, setAdv] = useState([]);
    // const [data, setData] = useState([]);
  
    const [clg, setClg] = useState("");
  
    var emp_id = sessionStorage.getItem("employee_id");
  
  
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
  
    
    const [sectionOpt, setSectionOpt] = useState([]);  
    const [userId, setUserId] = useState("");
    const [studentData, setStudentData] = useState([]);

    const [data5, setData5] = useState("");



    
  
    const getStudentData = async () => {
      setLoading(1);
      // setData([]);
      console.log('userid - ', userId);
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
           console.log("student data ------- ", res.data);
           console.log('student session id - ', res.data.semester[0].student_session_id);
           console.log('session id - ', res.data.semester[0].session_id);
          //  setStudentSessionId(res.data.semester[0].student_session_id);
          //  setSession1(res.data.semester[0].session_id);
          let temp = res?.data;
          let activeSession = temp?.session?.filter((s) => s?.status == "ACTIVE");
          // setFaculty(res?.data?.college_id);
          // setCurrentClass(activeSession[0]?.class_id);
          // setSession(activeSession[0]?.session_id);
          let obj = {};
          obj["id"] = temp?.data?.id;
          obj["department_id"] = temp?.data?.department_id;
          obj["class_id"] = activeSession[0]?.class_id;
          obj["session_id"] = activeSession[0]?.session_id;
          obj["semester_id"] =
            temp?.semester[temp?.semester.length - 1]?.semester_id;
          obj["section_id"] =
            temp?.semester[temp?.semester.length - 1]?.section_id;
          obj["student_id"] = temp?.data?.user_id;
          obj["name"] = temp?.data?.name;
          obj["email"] = temp?.data?.email;
          obj["phone"] = temp?.data?.phone;
          obj["dob"] = temp?.data?.dob?.substring(0, 10);
          obj["gender"] = temp?.data?.gender;
          obj["category"] = temp?.data?.category;
          obj["is_hostel"] = activeSession[0]?.is_hostel;
          obj["is_transport"] = activeSession[0]?.is_transport;
          obj["status"] = temp?.data?.status;
          obj["student_session_id"] = activeSession[0]?.id;
          obj["college_name"] = collegeOpt.find(
            (s) => s.id == temp?.data?.college_id
          ).name;
          obj["department_name"] = department.find(
            (s) => s.id == temp?.data?.department_id
          )?.name;
          obj["class_name"] = activeSession[0]?.class_name;
          obj["semester_name"] = temp?.semester[temp?.semester.length - 1]?.semester_name;
          obj["section_name"] = sectionOpt.find(
            (s) => s.semester_id == temp?.semester[temp?.semester.length - 1]?.semester_id
          )?.name;
          setStudentData(obj);
          setLoading(0);
          // setEnrollmentNumberEntered(true);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        });
  
    };

    // const allocate = async () => {
    //   console.log('vacant data - ', vacantData);
    //   console.log('student data - ', studentData);

    //   if(!studentData) {
    //     return toast.error("Please enter Student details");
    //   }
    //   if(!vacantData) {
    //     return toast.error("Unable to fetch hostel details");
    //   }

    //   let obj = {};
    //   obj['student_id'] = studentData.student_session_id;
    //   obj['session_id'] = studentData.session_id;
    //   obj['year'] = year;
    //   obj['amount'] = vacantData.with_food;
    //   obj['payment'] = [];
    //   obj['department_id'] = studentData.department_id;
    //   obj['note'] = "";
    //   obj['room_id'] = vacantData.room_name_number;
    //   obj['bed_no'] = vacantData.hostel_no_bed;
    //   obj['hostel_id'] = vacantData.room_hostel_id;

    //   const config = {
    //     method: "post",
    //     url:
    //       ADDHOSTELFEE,
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //       "Content-Type": "application/json",
    //     },
    //     data:obj
    // };

    // await axios(config).then((res)=>{
    //     toast.success("Successfully Allocated");
    //     closeModal();
    //     setLoading(0);
    // }).catch((err)=>{
    //     setLoading(0);
    //     closeModal();
    //     toast.error("Unable to Allocate");
    //     console.log(err);
    // })
    // }

    const allocate = async () => {
      console.log('vacant data - ', vacantData);
      console.log('student data - ', studentData);

      if(!studentData) {
        return toast.error("Please enter Student details");
      }
      if(!vacantData) {
        return toast.error("Unable to fetch hostel details");
      }

      let obj = {};
      obj['student_id'] = studentData.student_session_id;
      obj['session_id'] = studentData.session_id;
      obj['year'] = year;
      obj['amount'] = vacantData.with_food;
      obj['payment'] = [];
      obj['department_id'] = studentData.department_id;
      obj['note'] = "";
      obj['room_id'] = vacantData.room_name_number;
      obj['bed_no'] = vacantData.hostel_no_bed;
      obj['hostel_id'] = vacantData.room_hostel_id;

      const config = {
        method: "post",
        url:
          ADDHOSTELFEE,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data:obj
    };

    await axios(config).then((res)=>{
        toast.success("Successfully Allocated");
        closeModal();

        const students = Array.isArray(studentData) ? studentData : [studentData];

        students.forEach((d) => {
          handleUpdate(d.student_id);
        });

        setLoading(0);
    }).catch((err)=>{
        setLoading(0);
        closeModal();
        toast.error("Unable to Allocate");
        console.log(err);
    })
    }

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
          is_hostel: "1",
        }
      };
    
      await axios(config5)
        .then((res) => {
          setData5(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error('Something went wrong');
        });
  
      setLoading(0);
    };
      
    useEffect(() => {
        setStudentData([]);
        setUserId("");
        console.log('hi');
    },[]);

  return (
    <div className="ModalHostelRooms">
      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        id="ModalHostelRooms"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={!isModalOpen}
      >
            <div
                className="modal-dialog modal-dialog-centered mw-100 w-75"
                role="document"
            >
                <div className="modal-content">

                    <div className="row">
                        <div className="col-12">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle"> 
                                  Student Details </h5>
                                <button
                                    ref={buttonRef}
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeModal}
                                >
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="container">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    {/* <label> Student Enrollment Number </label> */}
                                    <div className="input-group mb-3 col-md-4">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Student Enrollment No."
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

                            {(studentData?.student_id) && (          
                                <table
                                    id="datatable"
                                    className="table table-bordered  text-wrap table-hover"
                                    style={{
                                        borderCollapse: "collapse",
                                        borderSpacing: 0,
                                        width: "100%",
                                    }}
                                >
                                {/* <thead> */}
                                  <tr>
                                    <th>Enrollment No : </th>
                                    <td>{studentData?.student_id}</td>
                                    <th>Name : </th>
                                    <td>{studentData?.name}</td>
                                    <th>Email : </th>
                                    <td>{studentData?.email}</td>
                                    <td rowSpan="3"> <img
                                        className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                                        src={`${studentData?.student_picture
                                          ? studentData?.student_picture
                                          : "/assets/images/Nexenstial Logo.jpg"
                                        }`} width="100"
                                        
                                      /></td>
                                  </tr>
                                  <tr>
                                    <th>Session : </th>
                                    <td>{studentData?.session_id ? (studentData?.session_id + " - " + (parseInt(studentData?.session_id) + 1)) : ""}
                                    </td>
                                    <th>College : </th>
                                    <td>{studentData?.college_name}</td>  
                                    <th>Department</th>
                                    <td>{studentData?.department_name}</td>                                                
                                  </tr>
                                  <tr>
                                    <th>Class : </th>
                                    <td>{studentData?.class_name}</td>
                                    <th>Semester</th>
                                    <td>{studentData?.semester_name}</td>
                                    <th>Phone</th>
                                    <td>{studentData?.phone}</td>
                                  </tr>
                                {/* </thead> */}
                                </table>
                                      
                            
                            )}
                            <div>
                            <hr></hr>
                                <div className="row  ml-1">
                                  <div className="col-lg-12">
                                    <h5>Hostel Details</h5>
                                  </div>
                                  <div>
                                  <table className="table table-bordered table-responsive nowrap">
                                    <tbody>
                                      <tr>
                                        <td><strong>Hostel :</strong></td>
                                        <td>{vacantData?.hostel_name}</td>
                                      
                                        
                                      
                                        <td><strong>Floor Number :</strong></td>
                                        <td>{vacantData?.floor_number}</td>

                                        <td><strong>Room Name/Number :</strong></td>
                                        <td>{vacantData?.room_name_number}</td>
                                      </tr>
                                      <tr>

                                      <td><strong>Room Type :</strong></td>
                                        <td>{vacantData?.room_type}</td>
                                        
                                      
                                        <td><strong>Bed Number :</strong></td>
                                        <td>{vacantData?.hostel_no_bed}</td>
                                      
                                        <td><strong>Year :</strong></td>
                                        <td>{year}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  </div>
                                </div>
                                
                                <div className="row float-right mr-1">
                                    <button className="btn btn-success"
                                      onClick={allocate}
                                    >
                                        Allocate
                                    </button>
                                </div>
                            </div>
                         
                            <br/>                         

                        </div></div>
                    </div>

                </div>
            </div>
        </div>   
      
    </div>
  )
}

export default ModalHostelRooms;
