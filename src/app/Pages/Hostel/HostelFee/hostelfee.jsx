import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { toast } from "react-toastify";
import { ROUTES } from "../../../Router/routerConfig.js";
import Nodata from "../../../Components/NoData/Nodata";
import { SessionOpt } from "../../../Data/student/sessionData";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import ModalFeeBulkUpload from "../../../modals/Accounts/FeeCollection/ModalFeeBulkUpload.jsx";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { HOSTEL } from "../../../utils/Hostel.apiConst";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import { STUDENT_SESSION, STUDENT_DETAILS2 } from "../../../utils/apiConstants";
import { ADDHOSTELFEE1 } from "../../../utils/fees.apiConst";
import { EMPLOYEE_ALL2} from "../../../utils/apiConstants";
import { HOSTEL_DETAILS, HOSTEL_FLOOR_DETAILS, HOSTEL_ROOM_TYPE_DETAILS, HOSTEL_ROOMS_DETAILS } from '../../../utils/Hostel.apiConst';

function HostelFee({ collegeId, setLoading }) {
  const tableRef = useRef();

  const emp_id = sessionStorage.getItem("employee_id");
  let empHostelId = sessionStorage.getItem("HOSTEL_ID");
  
  let auth = sessionStorage.getItem("UMS_auth");
  const getDepartmentData = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };
  const getProgramtData = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };
  const [session, setSession] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [hostel, setHostel] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [nextRoute, setNextRoute] = useState(
    role == "SUACC"
      ? ROUTES.Accountant.Hostel.addhostelFee
      : role == "SUPERADMIN"
      ? ROUTES.Registar.Hostel.addhostelFee
      : role == "CASHIER"
      ? ROUTES.Cashier.addhostelFee
      : role == "WARDEN"
      ? ROUTES.Warden.addhostelFee
      : null
  );

  const [userId, setUserId] = useState("");

  const [faculty, setFaculty] = useState("");

  const [data1, setData1] = useState([]);

  const [data, setData] = useState([]);

  const [student, setStudent] = useState([]);

  const [employee, setEmployee] = useState([]);

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  const [type, setType] = useState("all");

  const [searchClicked, setSearchClicked] = useState(false);


  const [filteredHosteldataView, setFilteredHosteldataView] = useState("")

  const [session_data, setSessionData] = useState([]);

  const [data2, setData2] = useState([]);

  const [departmentOpt, setDepartmentOpt] = useState(getDepartmentData());

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const [programOpt, setProgramOpt] = useState(getProgramtData());

  const [classOpt, setClassOpt] = useState([]);

  const [semOpt, setSemOpt] = useState([]);

  const [hosteldata, setHostelData] = useState([]);

  const [hosteldataView, setHosteldataView] = useState([]);

  const [paid, setPaid] = useState([]);

  const [year, setYear] = useState("");

  let count = 0;

  useState(() => {
    setDepartmentOpt(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  useState(() => {
    setProgramOpt(getProgramtData());
  }, [localStorage.getItem(LOCAL_PROGRAM)]);

  const navigate = useNavigate();

  const getFee = async (student_id) => {
    const feeassign = hosteldata?.find((item) => item.student_id == student_id)
      ? "assigned"
      : "not-assigned";
    return feeassign;
  };

  const changeDir1 = async (id, student_id, department_id, class_id, year, m) => {
    const x = await getFee(m);
    console.log('m - ', m);
    if (x == "assigned" || x == "not-assigned") {
      navigate(
        `${nextRoute}/${id}?student_id=${student_id}&department_id=${department_id}&classId=${class_id}&fee=${x}&student_session_id=${m}&year=${year}`
      );
    }
  };

  let x;

  const getAllDropData = async () => {
    setLoading(1);
    

    const config1 = {
      method: "get",
      url: `${HOSTEL}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {
        setData1(res.data.data);
        console.log('data1 - ', res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
    setLoading(0);
  };

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
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setType((prevValue) => ({
  //     ...prevValue,
  //     [name]: value,
  //   }));
  // };

  // const handleSearch = async () => {
  //   if (!year) {
  //     toast.error("Please Select Year");
  //     return;
  //   }
  //   if(!type) return toast.error("Please Select the hostel");
  //   setLoading(1);
  //   let url1;
  //   userId
  //     ? (url1 = `${ADDHOSTELFEE1}?year=${year}&student_id=${userId}&college_id=${faculty}`)
  //     : (url1 = `${ADDHOSTELFEE1}?year=${year}&college_id=${faculty}&hostel_id=${type}`);

  //     console.log("url1 -", url1);
      
  //   const config2 = {
  //     method: "get",
  //     url: url1,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  
  //   await axios(config2)
  //     .then((res) => {
  //       setLoading(0);
  //       setSearchClicked(true);
  //       setHostelData(res.data.data);
  //       console.log('hostel data - ', res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       console.log(err);
  //       toast.error("Something went wrong");
  //     });
  //   setLoading(0);
  // };

  const handleSearch = async () => {
    if (!year) {
      toast.error("Please Select Year");
      return;
    }
    if (!type) {
      toast.error("Please Select the hostel");
      return;
    }
    setLoading(true);
    let url1;
    userId
      ? (url1 = `${ADDHOSTELFEE1}?year=${year}&student_id=${userId}&college_id=${faculty}&status=${status}`)
      : (url1 = `${ADDHOSTELFEE1}?year=${year}&college_id=${faculty}&hostel_id=${type}&status=${status}`);
  
    try {
      const response = await axios.get(url1, {
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data.data);
      console.log(type);
      if(type == "all") {
        setHostelData(response.data.data);
        console.log(response.data.data);
      }
      else {
        setHostelData(response.data.data?.filter((s) => s.hostel_id == type));
      }
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.error("Error fetching hostel data:", error);
      toast.error("Something went wrong");
    }
  };


  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Student Fee Collection - Hostel Fee Details",
    sheet: "Users",
  });

  const changeDir = async (dir, i) => {
    setLoading(1);
    let navData = [];
    const config = {
      method: "get",
      url:
        STUDENT_SESSION +
        `?college_id=${collegeId}&department_id=${i?.department_id}&class_id=${i?.class_id}&section_id=${i?.section_id}&semester_id=${i?.semester_id}&session_id=${i?.session_id}&status_student=ACTIVE`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log("Data Main - ", res.data.data);
        setLoading(0);
        navData = res.data.data;
        setSessionData(res.data.data);
        console.log("session data - ", session_data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Some Error Occured");
      });

    navigate(
      `${dir}/${i?.user_id}?session_id=${i?.student_session_id}&depart=${i?.department_id}&session=${i?.session_id}&class=${i?.class_id}&sem=${i?.semester_id}&section=${i?.section_id}&hos=1`,
      {
        state: {
          data: session_data.length > 0 ? session_data : navData,
          student: student,
        },
      }
    );
  };

  const getHostelData = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    const [data1, data2, data3] = await Promise.all([
    await axios({
    ...config,
    url: `${HOSTEL_DETAILS}`
    })
    .then((res) => {
        console.log('hostels - ', res.data.data);
        setHostel(res.data.data);
    })
    .catch((err) => {
        setLoading(0);
        toast.error("Error while fetching hostels");
        console.log(err);
    }),

    await axios({
        ...config,
        url: `${HOSTEL_FLOOR_DETAILS}`
        })
        .then((res) => {
            console.log('hostel floors - ', res.data.data);
            setFloors(res.data.data);
        })
        .catch((err) => {
            setLoading(0);
            toast.error("Error while fetching hostel floors");
            console.log(err);
        }),

    await axios({
        ...config,
        url: `${HOSTEL_ROOM_TYPE_DETAILS}`
        })
        .then((res) => {
            console.log('hostel room types - ', res.data.data);
            setRoomTypes(res.data.data);
        })
        .catch((err) => {
            setLoading(0);
            toast.error("Error while fetching Room types");
            console.log(err);
        }),

    await axios({
        ...config,
        url: `${HOSTEL_ROOMS_DETAILS}`
        })
        .then((res) => {
            console.log('hostel rooms - ', res.data.data);
            setRooms(res.data.data);
        })
        .catch((err) => {
            setLoading(0);
            toast.error("Error while fetching Hostel rooms");
            console.log(err);
        })
    ]);
  };

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useEffect(() => {
    // getEmpData();
    getAllDropData();
    getHostelData();
  }, []);

  // const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = () => {
    PrintRecipt();
  };

  // useEffect(() => {
  //   if (searchClicked) {
  //     setFilteredHosteldataView(hosteldataView?.filter((s) => {
  //       const selectedHostel = hostel.find(hostelItem => hostelItem.id == type);
  //       if (type === "all") {
  //         return true;
  //         // return s.college_id == collegeId;
  //       } else if (selectedHostel) {
  //         if (selectedHostel.hostel_type === "Boys") {
  //           return s.hostel_id == type && (s.gender === "male" || s.gender === "MALE");
  //         } else if (selectedHostel.hostel_type === "Girls") {
  //           return s.hostel_id == type && (s.gender === "female" || s.gender === "FEMALE");
  //         }
  //       }
        
  //       return s.hostel_id == type 
  //         && (s.gender === "female" || s.gender === "FEMALE" || 
  //             s.gender === "male" || s.gender === "MALE" || s.gender === "" || s.gender == null);
  //     }));
  //   }
  // }, [searchClicked, type, hostel, hosteldataView]);

  // useEffect(()=> {
    
  //   if(searchClicked){

  //   let temp = [];
  //   hosteldata?.map((i,key)=> {
  //     let obj = i;
  //     let amt = 0;
  //     obj.payment?.map((j,index)=> {
  //       amt = amt + parseInt(j.payment_amount);
  //     })
  //     obj['paid'] = amt;
  //     temp.push(obj);
  //   })
  //   setHosteldataView(temp);
  //   console.log('view data - ', temp);

  //   }
  // },[searchClicked, hosteldata]);


  // useEffect(()=> {
  //   if(type) {
  //   }
  // },[type]);


  // console.log("type -", type);

  return (
    <div className="FeeCollectionCollegeFee">
      <ModalFeeBulkUpload setLoading={setLoading} collegeId={collegeId} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12 mt-3">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Hostel Fees</h4>
                  <h4 className="mb-0">{role == "WARDEN" && employee && data1.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active">Hostel Fees</li>
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
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Select Year<span style={{ color: "red" }}>*</span></label>{" "}
                          <select
                            className="form-control"
                            name="selectedYear"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Select Year</option>
                            {SessionOpt?.map((i, key) => (
                              <option value={i?.id}>{i?.name.substring(0,4)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Select Hostel</label>{" "}
                          <span style={{ color: "red" }}>*</span>
                          <select
                            className="form-control"
                            name=""
                            id=""
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            
                            {role !== "WARDEN" ?
                            <option value="all">All</option>
                            : <option value="">Select Hostel</option>}
                            {role == "WARDEN" ? 
                              data1?.filter((s)=> s.id == empHostelId)?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.hostel_name}
                                </option>
                              ))
                              : data1 &&
                              data1?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.hostel_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Student Enrollment No.</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Student Enrollment No."
                            value={userId}
                            onChange={(e) => {
                              setUserId(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            College <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="faculty"
                            id="section"
                            className="form-control"
                            value={faculty}
                            disabled={
                              role == "STAFF" || role == "ADMIN" ? true : false
                            }
                            onChange={(e) => {
                              console.log("faculty = ", e.target.value);
                              setFaculty(e.target.value);
                            }}
                          >
                            <option value="" selected>
                              ALL
                            </option>
                            {college?.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-2">
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
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row float-right">
                      <button
                        className="btn btn-nex   "
                        type="submit"
                        name="submit"
                        value="collect"
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search mr-2" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* container-fluid */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Students Hostel Details</h4>
                      </div>
                      {data.length >= 0 ? (
                        <div className="col-md-8 ">
                          <span className="float-right">
                            <button
                              className="btn btn-primary rounded-pill mr-2"
                              onClick={handlePrint}
                            >
                              Export PDF
                            </button>
                            <button
                              className="btn btn-primary rounded-pill"
                              onClick={onDownload}
                            >
                              Export Excel
                            </button>
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="row">
                      {/* <div className="col-md-4">
                        <h4 className="card-title">
                          Total Number - {hosteldata.length}
                        </h4>
                      </div> */}
                    </div>
                    <hr />
                    <div style={{ overflowX: "auto" }}>
                      <table
                        ref={tableRef}
                        id="datatable"
                        className="table table-bordered  tex-wrap table-hover dataTable no-footerr"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                          overflowX: "auto", // Add this line to enable horizontal scrolling
                        }}
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "26.005px" }}
                              aria-sort="ascending"
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              Sl.No
                            </th>
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "106.005px" }}
                              aria-sort="ascending"
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              Student Id
                            </th>
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "126.005px" }}
                              aria-sort="ascending"
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              Name
                            </th>
                            <th
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ maxWidth: "2rem" }}
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              College
                            </th>
                            <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "26.005px" }}
                              aria-sort="ascending"
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              Class
                            </th>
                            {/* <th
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "26.005px" }}
                              aria-sort="ascending"
                              aria-label="Addmision Number: activate to sort column descending"
                            >
                              Semester
                            </th> */}
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "116.005px" }}
                              aria-label="Student Name: activate to sort column ascending"
                            >
                              Session
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "116.005px" }}
                              aria-label="Student Name: activate to sort column ascending"
                            >
                              Year
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "67.0046px" }}
                              aria-label="Amount: activate to sort column ascending"
                            >
                              Gender
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "116.005px" }}
                              aria-label="Student Name: activate to sort column ascending"
                            >
                              Room No.
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "116.005px" }}
                              aria-label="Student Name: activate to sort column ascending"
                            >
                              Bed Number
                            </th>
                            {/* <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "116.005px" }}
                              aria-label="Student Name: activate to sort column ascending"
                            >
                              Bed Number
                            </th> */}
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "67.0046px" }}
                              aria-label="Amount: activate to sort column ascending"
                            >
                              Total Amount
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "63.0046px" }}
                              aria-label="Deposit: activate to sort column ascending"
                            >
                              Fee Paid
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "67.0046px" }}
                              aria-label="Amount: activate to sort column ascending"
                            >
                              Fee Balance
                            </th>
                            {role == "WARDEN" ? <></> : <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="datatable"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "81.0046px" }}
                              aria-label="Discounts: activate to sort column ascending"
                            >
                              Action
                            </th>}
                          </tr>
                        </thead>
                        <tbody>
                        {hosteldata && hosteldata?.length == 0 ? (
                            <tr>
                              <td colSpan={14}>
                                <Nodata />
                              </td>
                            </tr>
                          ) : (type) ? 
                          (
                            hosteldata?.map((i,key)=> {
                              return (
                                <tr>
                                  <td>{key+1}</td>
                                  <td>{i.user_id}</td>
                                  <td>{i.name}</td>
                                  <td>{collegeOpt.find((s) => s.id == i.college_id).name}</td>
                                  <td>{i.class_name}</td>
                                  <td>{i.session_id}-{i.session_id+1}</td>
                                  <td>{year}</td>
                                  <td>{i.gender}</td>
                                  <td>{i.room_id ? rooms.find((s) => s.id == i.room_id)?.room_name_number : "Not Assigned"}</td>
                                  <td>{i.bed_no ? i.bed_no:"Not Assigned"}</td>
                                  <td>{i.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  <td>{i.paid?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  <td>{(i.amount-i.paid)?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  {role == "WARDEN" ? <></> : <td className="d-flex">
                                          <button
                                            onClick={() => {
                                              changeDir1(
                                                i?.session_id,
                                                i?.user_id,
                                                i?.department_id,
                                                i?.class_id,
                                                year,
                                                i?.student_session_id
                                              );
                                            }}
                                            className="btn btn-nex btn-sm"
                                            type="button"
                                          >
                                            Collect Fee
                                          </button>
                                  </td>}
                                </tr>
                              )
                            })
                          )
                          
                              : (
                                <></>
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
          {/* End Page-content */}
        </div>
        {/* end main content*/}
      </div>
    </div>
  );
}

export default HostelFee;

