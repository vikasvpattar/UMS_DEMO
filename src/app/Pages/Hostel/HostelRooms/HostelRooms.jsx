import axios from "axios";
import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  HOSTEL,
  HOSTEL_FLOORS,
  HOSTEL_ROOMS,
  HOSTEL_ROOMS_SQL,
  HOSTEL_ROOMS_SQL_2,
  HOSTEL_TYPE,
} from "../../../utils/Hostel.apiConst";
import { EMPLOYEE_ALL2} from "../../../utils/apiConstants";
import ModalHostelRooms from "../../../modals/ModalHostelRooms";

function HostelRooms({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    room_name_number: "",
    room_hostel_id: "",
    hostel_room_type_id: "",
    hostel_no_bed: "",
    floor_number: "",
  });

  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [edit, setEdit] = useState(0);
  const [count, setCount] = useState([0]);
  const [flag, setFlag] = useState(false);
  const [editId, setEditId] = useState();
  const [editBed_no, setBed_No] = useState();
  const [hostelData, setHostelData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [floorData, setFloorData] = useState([]);

  const [rowData, setRowData] = useState([]);

  
  const [show2, setShow2] = useState([]);
  const [status, setStatus] = useState("");

  const [filterHostel, setFilterHostel] = useState("");
  const [filterFloor, setFilterFloor] = useState("");
  const [filterType, setFilterType] = useState("");

  const clearData = () => {
    setUser({
      room_name_number: "",
      room_hostel_id: "",
      hostel_room_type_id: "",
      hostel_no_bed: "",
      floor_number: "",
    });

    obj = {};
  };

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
  const emp_id = sessionStorage.getItem("employee_id");
  
  let auth = sessionStorage.getItem("UMS_auth");
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
      setLoading(0)
  };
 
  const handleSubmit = () => {
    if (!user.room_name_number) return toast.error("Please Add Room Number");
    if (!user.room_hostel_id) return toast.error("Please Add Hostel Name");
    
    if (!user.floor_number) return toast.error("Please Add Floor Number");

    if (!user.hostel_room_type_id) return toast.error("Please Add Room Type");
  
    let Array1 = [];
    if (JSON.parse(sessionStorage.getItem("beds"))?.length > 0) {
      Array1 = JSON.parse(sessionStorage.getItem("beds"));
    }
  
    let x = [];
  
    if (Array1.length > 0) {
      x = Array1.map((item) => Object.values(item)[0]);
    }
  
    if (Object.keys(obj).length > 0) {
      const value = Object.values(obj)[0];
      x.push(value);
    }
  
    let bed_numbers = x?.map((item, key) => item?.bed_no);
  
    for (let i of data) {
      if (
        i.hostelRooms.room_hostel_id == user.room_hostel_id &&
        bed_numbers.includes(i.hostelRooms.hostel_no_bed)
      ) {
        clearData();
        while (count.length > 1) {
          count.pop();
        }
        sessionStorage.removeItem("beds");
        return toast.error(
          `Bed Number is already added - ${i.hostelRooms.hostel_no_bed}`
        );
      }
    }
  
    if (x.length === 0) {
      // Removed this block
      // return toast.error("Please Add Bed Number");
    }
  
    setLoading(1);
    const config = {
      method: "post",
      url: `${HOSTEL_ROOMS}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
        x,
      },
    };
  
    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        clearData();
        sessionStorage.removeItem("beds");
        while (count.length > 1) {
          count.pop();
        }
        getdata();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong", err);
      });
  };
 

  const handleEdit = () => {
    if (!user?.room_name_number) return toast.error("Room Number is required");
    let Array1 = [];
    if (JSON.parse(sessionStorage.getItem("beds"))?.length > 0) {
      Array1 = JSON.parse(sessionStorage.getItem("beds"));
    }
    let x = [];

    if (Array1.length > 0) {
      x = Array1.map((item) => Object.values(item)[0]);
    }

    if (Object.keys(obj).length > 0) {
      const value = Object.values(obj)[0];
      x.push(value);
    }

    let bed_numbers = x?.map((item, key) => item?.bed_no);
   
    for (let i of data) {
      if (
        i.hostelRooms.room_hostel_id == user.room_hostel_id &&
        bed_numbers.includes(i.hostelRooms.hostel_no_bed)
      ) {
        return toast.error("Bed Number is already added");
      }
    }

    if(x.length == 0)
    {
    //  return toast.error("Please Add Bed Number");
    }
  
    setLoading(1);
    const config = {
      method: "put",
      url: `${HOSTEL_ROOMS}/${editId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        x
      },
    };

    console.log("user",user);
    console.log("x",x);

    axios(config)
      .then((res) => {
        setLoading(0);
        getdata();
        clearData();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong",err);
      });
  };

  let obj = {};

  const handleChange1 = (e, key) => {
    setBed_No("")
    const { name, value } = e.target;
    if (!obj[key]) {
      obj[key] = {
        bed_no: "",
      };
    }
    obj[key][name] = value;
  };

  const getdata = async () => {
    console.log('called getdata');
    setLoading(1);
    const config = {
      method: "get",
      url: `${HOSTEL_ROOMS_SQL_2}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    console.log('hi2')
    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log('hostel beds - ', res.data.data);
        // res.data.data.sort((a, b) => {
        //   const roomNumberA = a.hostelRooms.hostel_no_bed;
        //   const roomNumberB = b.hostelRooms.hostel_no_bed;
        //   return roomNumberA.localeCompare(roomNumberB);
        // })  
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something Went Wrong", err);
      });
  };

  const handleDelete = (id) => {
    const config = {
      method: "put",
      url: `${HOSTEL_ROOMS}/${id}`,
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
        getdata();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        getdata();
        toast.error("Something Went Wrong",err);
      });
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
  }, [user?.room_hostel_id]);

  useEffect(() => {
    const hostelfloorsValues = [];

    for (const item of floorData) {
      const value = item.hostelfloors;
      hostelfloorsValues.push(value);
    }

    let x = hostelfloorsValues?.filter(
      (s) => s.hostelname == filterHostel
    )[0]?.floors;
    let arr = [];
    let cnt = 1;
    while (x) {
      arr.push(cnt);
      cnt++;
      x--;
    }
    setShow2(arr);
  }, [filterHostel]);

  useEffect(() => {

  })

  useEffect(() => {
    console.log('row data - ', rowData);
  },[rowData]);
  
  useEffect(() => {
    getEmpData();
    getdata();
    getData1();
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
              />
            </div>
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Hostel Room</h4>
                  <h4 className="mb-0">{role == "WARDEN" && employee && hostelData.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Hostel</a>
                      </li>
                      <li className="breadcrumb-item active">Hostel Room</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Add Criteria</h2>
                      <br />
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Hostel<span style={{ color: "red" }}>*</span>
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
                              hostelData?.filter((s)=> s.id == employee[0]?.hostel_id).map((i, key) => (
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
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="floor_number"
                              id="floornumber"
                              value={user.floor_number}
                              onChange={handleChange}
                            >
                              <option value="">Select Floor</option>
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
                              Room Type<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="hostel_room_type_id"
                              id="type"
                              value={user.hostel_room_type_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Room Type</option>
                              {roomData?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.room_type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Room Number / Name{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Hostel Name"
                              name="room_name_number"
                              id="room_number"
                              value={user.room_name_number}
                              required=""
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {count?.map((item, key) => {
                          return (
                            <>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="validationCustom02">
                                    Bed Number {key + 1}
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Bed Number"
                                    name="bed_no"
                                    value={ editBed_no ? editBed_no : obj[key]?.bed_no}
                                    onChange={(e) => handleChange1(e, key)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                              {count.length == key + 1 ?
                                <button
                                  className="btn btn-primary btn-sm px-3 ml-3 mt-3"
                                  type="submit"
                                  name="submit"
                                  style={{ height: "60px" }}
                                  onClick={() => {
                                    count.push(1);
                                    let obj1 = JSON.parse(
                                      sessionStorage.getItem("beds")
                                    );
                                    if (!obj1 && Object.keys(obj).length > 0) {
                                      let arr = [];
                                      arr.push(obj);
                                      sessionStorage.setItem(
                                        "beds",
                                        JSON.stringify(arr)
                                      );
                                    } else if (Object.keys(obj).length > 0) {
                                      obj1 = [...obj1, obj];
                                      obj1 = JSON.stringify(obj1);
                                      sessionStorage.setItem("beds", obj1);
                                    }
                                    setFlag((flag) => !flag);
                                  }}
                                >
                                  + Add
                                </button>:null}

                                {count.length > 1  ? (
                                  <button
                                    className="btn btn-primary btn-sm px-3 ml-3 mt-3"
                                    type="submit"
                                    name="submit"
                                    style={{ height: "60px" }}
                                    onClick={() => {
                                      count.pop();
                                      delete obj[key];
                                      let arr1 = JSON.parse(
                                        sessionStorage.getItem("beds")
                                      );
                                      arr1?.splice(key, key);
                                      arr1 = JSON.stringify(arr1);
                                      sessionStorage.setItem("beds", arr1);
                                      setFlag((flag) => !flag);
                                    }}
                                  >
                                    - Cancel
                                  </button>
                                ) : null}
                              </div> 
                            </>
                          );
                        })}
                      </div>
                      <div className="row float-right ">
                        {edit ? (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleEdit(e)}
                          >
                            Save Changes
                          </button>
                        ) : (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Save
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* end card */}
                </div>
              </div>
              {/* container-fluid */}
              {/* Fetch Data / Display Data List */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      {/* <div className="row">
                        <div className="col-md-6">
                          <h4 className="card-title">Hostel List</h4>
                        </div>
                        <div className="col-md-6"></div>
                      </div> */}
                      <div className="row mb-3">
                          <div className="col-md-12 d-flex justify-content-between align-items-center">
                            <div className="card-title text-uppercase">
                              {" "}
                              <h6> HOSTEL ROOMS LIST</h6>
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
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Hostel
                              </label>
                              <select
                                className="form-control"
                                value={filterHostel}
                                onChange={(e) => {
                                  setFilterHostel(e.target.value);
                                  setFilterFloor("");
                                }}
                              >
                                <option value="">All</option>
                                {role == "WARDEN" ? 
                                hostelData?.filter((s)=> s.id == employee[0]?.hostel_id).map((i, key) => (
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
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Floor
                              </label>
                              <select
                                className="form-control"
                                value={filterFloor}
                                onChange={(e) => setFilterFloor(e.target.value)}
                              >
                                <option value="">All</option>
                                {show2 &&
                                  show2?.map((item, key) => (
                                    <option value={item}>{item}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Room Type
                              </label>
                              <select
                                className="form-control"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                              >
                                <option value="">All</option>
                                {roomData?.filter((s) => s.hostel_id == filterHostel)?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.room_type}
                                </option>
                              ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Status
                              </label>
                              <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">All</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      <hr />
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
                            <th>Room Number / Name</th>
                            <th>Room Type</th>
                            <th>Bed Number</th>
                            {/* <th>Cost per Bed</th> */}
                            <th>Floor Number</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                          {role == "WARDEN" && employee[0]?.hostel_id ? (<tbody>
                          {data &&
                            data?.filter((s)=> s.room_hostel_id == employee[0]?.hostel_id 
                            && (!filterHostel || s.room_hostel_id == filterHostel) 
                            && (!filterFloor || s.floor_number == filterFloor) 
                            && (!filterType || s.hostel_room_type_id == filterType) 
                            && (!status || (status == "ACTIVE" && s.status != "INACTIVE") || (status == "INACTIVE" && s.status == "INACTIVE")))?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td> {data?.hostel_name}</td>
                                  <td>{data?.room_name_number}</td>
                                  <td> {data?.room_type}</td>
                                  <td> {data?.hostel_no_bed}</td>
                                  <td>{data?.floor_number}</td>

                                  { role == "WARDEN" ? (
                                  
                                  <td>  {data?.status !== "INACTIVE" ? <span className="badge badge-soft-success"
                                    data-toggle="modal"
                                    data-target="#ModalHostelRooms" onClick={()=>setRowData(data)}>ACTIVE</span> 
                                  : <span className="badge badge-soft-danger">INACTIVE</span>}</td>

                                  ) : (
                                    <td>  {data?.status !== "INACTIVE" ? <span className="badge badge-soft-success">ACTIVE</span> 
                                  : <span className="badge badge-soft-danger">INACTIVE</span>}</td>
                                  )
                                  
                                  }

                                  <td>
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => {
                                        setUser({
                                          room_name_number:
                                            data?.room_name_number,
                                          room_hostel_id: data?.id,
                                          hostel_room_type_id:
                                            data?.id,
                                          hostel_desc:
                                            data?.hostel_desc,
                                          floor_number:
                                            data?.floor_number,
                                          // hostel_no_bed: 
                                          //   data?.hostelRooms.hostel_no_bed,
                                        });
                                          setBed_No(data?.hostel_no_bed)
                                        setEdit(1);
                                        setEditId(data?.id);
                                      }}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-edit "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <span
                                      className="badge badge-light text-danger mr-3"
                                      data-toggle="tooltip"
                                      title="Delete"
                                      onClick={() =>
                                        handleDelete(data?.id)
                                      }
                                    >
                                      <i
                                        class="fa fa-trash "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>) :
                        (<tbody>
                          {data &&
                            data?.filter((s) => (!filterHostel || s.room_hostel_id == filterHostel) 
                            && (!filterFloor || s.floor_number == filterFloor)
                            && (!filterType || s.hostel_room_type_id == filterType) 
                            && (!status || (status == "ACTIVE" && s.status != "INACTIVE") || (status == "INACTIVE" && s.status == "INACTIVE")))?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td> {data?.hostel_name}</td>
                                  <td>{data?.room_name_number}</td>
                                  <td> {data?.room_type}</td>
                                  <td> {data?.hostel_no_bed}</td>
                                  <td>{data?.floor_number}</td>

                                  {/* { role == "WARDEN" ? (
                                  
                                  <td>  {data?.status == "VACANT" ? <span className="badge badge-soft-success"
                                    data-toggle="modal"
                                    data-target="#ModalHostelRooms" onClick={()=>setRowData(data)}>VACANT</span> 
                                  : data?.status == "OCCUPIED" ? <span className="badge badge-soft-warning">OCCUPIED</span> : null}</td>

                                  ) : (
                                    <td>  {data?.status == "VACANT" ? <span className="badge badge-soft-success">VACANT</span> 
                                  : data?.status == "OCCUPIED" ? <span className="badge badge-soft-warning">OCCUPIED</span> : null}</td>
                                  )
                                  
                                  } */}

                                  { role == "WARDEN" ? (
                                  
                                  <td>  {data?.status !== "INACTIVE" ? <span className="badge badge-soft-success"
                                    data-toggle="modal"
                                    data-target="#ModalHostelRooms" onClick={()=>setRowData(data)}>ACTIVE</span> 
                                  : <span className="badge badge-soft-danger">INACTIVE</span>}</td>

                                  ) : (
                                    <td>  {data?.status !== "INACTIVE" ? <span className="badge badge-soft-success">ACTIVE</span> 
                                  : <span className="badge badge-soft-danger">INACTIVE</span>}</td>
                                  )
                                  
                                  }

                                  <td>
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => {
                                        setUser({
                                          room_name_number:
                                            data?.room_name_number,
                                          room_hostel_id: data?.id,
                                          hostel_room_type_id:
                                            data?.id,
                                          hostel_desc:
                                            data?.hostel_desc,
                                          floor_number:
                                            data?.floor_number,
                                          // hostel_no_bed: 
                                          //   data?.hostelRooms.hostel_no_bed,
                                        });
                                          setBed_No(data?.hostel_no_bed)
                                        setEdit(1);
                                        setEditId(data?.id);
                                      }}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-edit "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <span
                                      className="badge badge-light text-danger mr-3"
                                      data-toggle="tooltip"
                                      title="Delete"
                                      onClick={() =>
                                        handleDelete(data?.id)
                                      }
                                    >
                                      <i
                                        class="fa fa-trash "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>)}
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

export default HostelRooms;
