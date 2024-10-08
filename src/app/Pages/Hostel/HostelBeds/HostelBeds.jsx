import axios from "axios";
import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { SessionOpt } from "../../../Data/student/sessionData";
import {
  HOSTEL,
  HOSTEL_FLOORS,
  HOSTEL_ROOMS,
  HOSTEL_TYPE,
  HOSTEL_BEDS,
  HOSTEL_BED_DETAILS
} from "../../../utils/Hostel.apiConst";
import {
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import ModalHostelRooms from "../../../modals/ModalHostelRooms";
import { EMPLOYEE_ALL2} from "../../../utils/apiConstants";
import { Button, Popover } from 'antd';

function HostelBeds({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    room_name_number: "",
    room_hostel_id: "",
    hostel_room_type_id: "",
    hostel_no_bed: "",
    floor_number: "",
  });

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const emp_id = sessionStorage.getItem("employee_id");
  
  let auth = sessionStorage.getItem("UMS_auth");
  let empHostelId = sessionStorage.getItem("HOSTEL_ID");

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const [edit, setEdit] = useState(0);
  const [count, setCount] = useState([0]);
  const [flag, setFlag] = useState(false);
  const [editId, setEditId] = useState();
  const [editBed_no, setBed_No] = useState();
  const [hostelData, setHostelData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [showRoomData, setShowROomData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [year, setYear] = useState("");
  const [employee, setEmployee] = useState([]);

  const bedStatusArr = ['VACANT', 'OCCUPIED'];
  const [bedStatus, setBedStatus] = useState("");

  const [rowData, setRowData] = useState([]);

  const [show, setShow] = useState([]);

  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = () => {
    PrintRecipt();
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: " Hostel Rooms Report ",
    sheet: "Users",
  });

  const role = sessionStorage.getItem("role");
  // console.log("role", role);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const getData1 = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({ ...config, url: `${HOSTEL_FLOORS}` })
      .then((res) => {
        // setLoading(0);
        setFloorData(res.data.data); //This line to check if floorData is being updated
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong",err);
      });

    await axios({ ...config, url: `${HOSTEL}` })
      .then((res) => {
        // setLoading(0);
        setHostelData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong",err);
      });

    await axios({ ...config, url: `${HOSTEL_TYPE}?college_id=${collegeId}` })
      .then((res) => {
        // setLoading(0);
        setRoomData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      })
      setLoading(0);
  };
 
  const getData = async () => {

    if(!year) {
      return toast.error("Please Enter Year");
    }
    if(!user.room_hostel_id) {
      return toast.error("Please Select Hostel");
    }

    const obj = {
      year : year,
      hostel_id: user.hostel_id,
      floor_number: user.floor_number,
      room_type: user.room_type
    }
    const config = {
      method: "get",
      url: `${HOSTEL_BED_DETAILS}?year=${year}&hostel_id=${user.room_hostel_id}&floor_number=${user.floor_number}&room_type=${user.hostel_room_type_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(1);
    axios(config)
      .then((res) => {
        setLoading(0);
        console.log('bed data - ', res.data.data);
        let temp = res.data.data;
        if(bedStatus) {
          if(bedStatus == "VACANT") {
            temp = temp.filter((s)=> s.status == "INACTIVE");
          }
          else if(bedStatus == "OCCUPIED") {
            temp = temp.filter((s)=> s.status == "ACTIVE");
          }
        }
        setDisplayData(temp);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong",err);
      });

  }

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

  useEffect(() => {
    const hostelfloorsValues = [];

    for (const item of floorData) {
      const value = item.hostelfloors;
      hostelfloorsValues.push(value);
    }

    let x = hostelfloorsValues?.filter(
      (s) => s.hostelname == user?.room_hostel_id
    )[0]?.floors;
    let arr = [];
    let cnt = 1;
    while (x) {
      arr.push(cnt);
      cnt++;
      x--;
    }
    setShow(arr);

    let roomtypes = roomData?.filter((s)=> {

    })

    // console.log('room data - ', roomData);
  }, [user?.room_hostel_id]);

  // useEffect(() => {
  //   let temp = data;
  //   if(user.room_hostel_id) {
  //     temp = temp.filter((s) => s.room_hostel_id == user.room_hostel_id);
  //   }
  //   if(user.floor_number) {
  //     temp = temp.filter((s)=> s.floor_number == user.floor_number);
  //   }
  //   if(user.hostel_room_type_id) {
  //     temp = temp.filter((s)=> s.hostel_room_type_id == user.hostel_room_type_id);
  //   }
  //   if(bedStatus) {
  //     temp = temp.filter((s)=> s.bed_status == bedStatus);
  //   }
  //   setDisplayData(temp);
  // },[user.floor_number, user.room_hostel_id, user.hostel_room_type_id, bedStatus]);

  useEffect(() => {
    setData([]);
    setDisplayData([]);
  },[year]);
  
  useEffect(() => {
    getData1();
    // getEmpData();
  }, []);


  return (
    <div ClassName="HostelRoom">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div>
              <ModalHostelRooms
                setLoading={setLoading}
                vacantData = {rowData}
                year = {year}
                getData = {getData}
              />
            </div>
            <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Bed List</h4>
                      <h4 className="mb-0 mr-5">{role == "WARDEN" && employee && hostelData.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4>
                    </div>
                  </div>
                </div>
            {/* Followup */}
            {/* start page title */}
            <>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Search Criteria</h2>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Select Year <span style={{ color: "red" }}>*</span></label>{" "}
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
                            <label htmlFor="validationCustom02">
                              Hostel <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="room_hostel_id"
                              id="hostel"
                              value={user.room_hostel_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Hostel</option>
                              {role == "WARDEN" ? 
                              hostelData?.filter((s) => s.id == empHostelId)?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.hostel_name}
                                </option>
                              ))
                              : hostelData?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.hostel_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Floor Number{" "}
                            </label>
                            <select
                              className="form-control"
                              name="floor_number"
                              id="floornumber"
                              value={user.floor_number}
                              onChange={handleChange}
                            >
                              <option value="">All</option>
                              {show &&
                                show?.map((item, key) => (
                                  <option value={item}>{item}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Room Type
                            </label>
                            <select
                              className="form-control"
                              name="hostel_room_type_id"
                              id="type"
                              value={user.hostel_room_type_id}
                              onChange={handleChange}
                            >
                              <option value="">All</option>
                              {roomData?.filter((s) => s.hostel_id == user.room_hostel_id)?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.room_type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Select Status</label>{" "}
                            <select
                              className="form-control"
                              name="selectedYear"
                              value={bedStatus}
                              onChange={(e) => setBedStatus(e.target.value)}
                            >
                              <option value="">All</option>
                              {bedStatusArr?.map((i, key) => (
                                <option value={i}>{i}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row float-right mr-4">
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={getData}
                          > Search
                          </button>
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
                      <div className="row mb-3">
                          <div className="col-md-12 d-flex justify-content-between align-items-center">
                            <div className="card-title text-uppercase">
                              {" "}
                              <h6>Bed List</h6>
                            </div>
                            <span>
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
                        </div>
                      <hr />
                      <h6>Total Beds = {displayData?.length}</h6>
                      <table
                        id="datatable"
                        className="table table-bordered dt-responsive nowrap"
                        ref={tableRef}
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Hostel</th>
                            <th>Floor</th>
                            <th>Type</th>
                            <th>Room</th>
                            <th>Bed</th>
                            <th>Amount with Food</th>
                            <th>Amount without Food</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {displayData &&
                            displayData?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data?.hostel_name}</td>
                                  <td>{data?.floor_number}</td>
                                  <td>{data?.room_type}</td>
                                  <td>{data?.room_name_number}</td>
                                  <td> {data?.hostel_no_bed}</td>
                                  <td>{data?.with_food?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  <td>{data?.without_food?.toLocaleString('en-IN', {style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                  <td>
                                    {data?.status == "ACTIVE" 
                                    ? <span className="badge badge-soft-warning" style={{cursor: "pointer"}}>
                                      <Popover content={
                                        <div>
                                          <table>
                                            <tr>
                                              <th width="30%" style={{fontSize:"12px"}}>Name</th>
                                              <td width="70%" style={{fontSize:"12px"}}>: {data?.name}</td>
                                            </tr>
                                            <tr>
                                              <th width="30%" style={{fontSize:"12px"}}>Enrollment No</th>
                                              <td width="70%" style={{fontSize:"12px"}}>: {data?.student_id}</td>
                                            </tr>
                                            <tr>
                                              <th width="30%" style={{fontSize:"12px"}}>College</th>
                                              <td width="70%" style={{fontSize:"12px"}}>: {collegeOpt?.find((s) => s.id == data?.college_id)?.name}</td>
                                            </tr>
                                            <tr>
                                              <th width="30%" style={{fontSize:"12px"}}>Acadmeic Year</th>
                                              <td width="70%" style={{fontSize:"12px"}}>: {data?.session_id}-{data?.session_id + 1}</td>
                                            </tr>
                                            <tr>
                                              <th width="30%" style={{fontSize:"12px"}}>Class</th>
                                              <td width="70%" style={{fontSize:"12px"}}>: {data?.class_name}</td>
                                            </tr>
                                          </table>
                                        </div>
                                      }>
                                        OCCUPIED
                                      </Popover>
                                        
                                      </span> 
                                    : <span className="badge badge-soft-success">VACANT</span>}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>{" "}
                {/* end col */}
              </div>{" "}
              {/* end row */}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelBeds;
