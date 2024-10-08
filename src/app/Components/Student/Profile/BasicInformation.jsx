import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { STUDENT_ADMISSION } from "../../../utils/apiConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import { getFileUrl } from "./../../../Helpers/Helpers";
import {
  GET_ASSIGNED_PICKUPPOINTS,
  GET_TRANSPORT_FEES,
} from "../../../utils/Transport.apiConst";
import { indian } from "../../../Data/Countries/india";
import { international } from "../../../Data/Countries/international";
import { useSearchParams } from "react-router-dom";
import { ASSET_EMPLOYEE_IMAGE } from "./../../../utils/AssetsReferenceTypes";
import { SessionOpt } from "../../../Data/student/sessionData";
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
} from "../../../utils/Transport.apiConst";
import {
  HOSTEL,
  HOSTEL_ROOMS,
  HOSTEL_TYPE,
} from "../../../utils/Hostel.apiConst";
import { ADDHOSTELFEE } from "../../../utils/fees.apiConst";
import Select from "react-select";

const BasicInformation = ({
  id,
  setLoading,
  collegeId,
  setStudentDetails,
  flag,
}) => {
  const roles = sessionStorage.getItem("role");
  console.log("roles -", roles);
  const [info, setInfo] = useState({});
  let y = [];

  const fileref = useRef(null);

  const fileref1 = useRef(null);
  const fileref2 = useRef(null);
  const fileref3 = useRef(null);

  const [yearData, setYearData] = useState([]);

  const [routeData, setRouteData] = useState([]);

  const [pickuppointData1, setPickuppointData1] = useState([]);

  const [searchParams] = useSearchParams();

  const [pickuppointData, setPickuppointData] = useState([]);

  //Hostel Beds
  const [floors, setFloors] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [beds, setBeds] = useState([]);

  const [roomData, setRoomData] = useState([]);

  const [hostelData, setHostelData] = useState([]);

  const [data1, setData1] = useState([]);

  const options = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const [info1, setInfo1] = useState({
    transport_amount: "",
    occupied_id: "",
    route_id: "",
    pickuppoint_id: "",
    ug_university: "",
    session_id: "",
    ug_university_percentage: "",
    pg_university: "",
    pg_university_percentage: "",
    ug_marksheet: "",
    pg_marksheet: "",
    student_session_id: "",
    room_hostel_id: "",
    floor_number: "",
    hostel_room_type_id: "",
    room_name_number: "",
    bed_no: "",
    hostel_amount: "",
    year_id: "",
    year: "",
  });

  const clearData = () => {
    setInfo1({
      transport_amount: "",
      route_id: "",
      pickuppoint_id: "",
      transport_amount: "",
      ug_university: "",
      session_id: "",
      ug_university_percentage: "",
      pg_university: "",
      pg_university_percentage: "",
      ug_marksheet: "",
      pg_marksheet: "",
      student_session_id: "",
      room_hostel_id: "",
      floor_number: "",
      hostel_room_type_id: "",
      room_name_number: "",
      bed_no: "",
      hostel_amount: "",
      year_id: "",
      year: "",
    });
  };

  const [user, setUser] = useState();

  const [Id, setId] = useState("");
  const [s_id, setS_Id] = useState("");

  //Function upload attachment to the s3
  const addAttachment = async (e, str) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_IMAGE,
        `Student_${user?.user_id}`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      if (str == "Student_Photo") {
        setUser((prev) => ({
          ...prev,
          student_picture: d ? d : "",
        }));
      } else if (str == "SSLC_MARKS_CARD") {
        let sslc_markscard = {
          link: d,
          status: "PENDING",
          reason: "",
        };

        setUser((prev) => ({
          ...prev,
          sslc_markscard: sslc_markscard ? sslc_markscard : "",
        }));
      } else if (str == "PU_MARKS_CARD") {
        let pu_markscard = {
          link: d,
          status: "PENDING",
          reason: "",
        };

        setUser((prev) => ({
          ...prev,
          pu_markscard: pu_markscard ? pu_markscard : "",
        }));
      } else if (str == "AADHAR_CARD") {
        let aadhar = {
          link: d,
          status: "PENDING",
          reason: "",
        };

        setUser((prev) => ({
          ...prev,
          aadhar: aadhar ? aadhar : "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));
  const [editor, setEditor] = useState(true);

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE), flag]);

  useEffect(() => {
    if (role == "ADMIN" || role == "SUPERADMIN") {
      setEditor(false);
    } else {
      setEditor(true);
    }
  }, [role, flag]);

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setUser(res.data.data);
        setId(searchParams.get("session_id"));
        setS_Id(searchParams.get("session"));
        setStudentDetails(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response?.data?.message);
      });

    await axios({
      ...config,
      url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
    })
      .then((res) => {
        setLoading(0);
        setRouteData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err);
      });
    await axios({
      ...config,
      url: `${PICKUP_POINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setPickuppointData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err);
      });
    await axios({
      ...config,
      url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setPickuppointData1(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err);
      });
    await axios({
      ...config,
      url: `${GET_TRANSPORT_FEES}?student_id=${searchParams.get("session_id")}`,
    })
      .then((res) => {
        let x = res.data.data;
        if (res.data.data.length > 0) {
          info1.year_id = x[0].year;
          info1.route_id = x[0].route_id;
          info1.pickuppoint_id = x[0].pickuppoint_id;
          info1.transport_amount = x[0].amount;
          let mon = [];
          x[0].months = JSON.parse(x[0].months);
          x[0].months.forEach((element) => {
            mon.push(options[element - 1]);
          });
          setSelectedMonths(mon);
        }
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err);
      });

    await axios({ ...config, url: `${HOSTEL}` })
      .then((res) => {
        setHostelData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });

    await axios({ ...config, url: `${HOSTEL_TYPE}?college_id=${collegeId}` })
      .then((res) => {
        setRoomData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });

    await axios({ ...config, url: `${HOSTEL_ROOMS}?status=VACANT` })
      .then(async (res) => {
        y = res.data.data;
        await setData1(res.data.data);
        await axios({
          ...config,
          url: `${ADDHOSTELFEE}?student_id=${searchParams.get("session_id")}`,
        })
          .then((res) => {
            let x = res.data.data;
            if (res.data.data.length > 0) {
              try {
                info1.bed_no = x[0]?.bed_no;
                info1.year = x[0]?.year;
                info1.room_name_number = x[0]?.room_id;
                let otherInfo = y?.filter(
                  (s) => s.hostelRooms.hostel_no_bed == x[0].bed_no
                );
                info1.room_hostel_id = otherInfo[0]?.hostel.id;
                info1.floor_number = otherInfo[0]?.hostelRooms.floor_number;
                info1.hostel_room_type_id =
                  otherInfo[0]?.hostelRooms.hostel_room_type_id;
              } catch (err) {
                console.log(err);
              }
            }
            setLoading(0);
          })
          .catch((err) => {
            setLoading(0);
            toast.error(err);
          });
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInfo1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    let months = selectedValue?.map((item, key) =>
      item.value ? item?.value : item
    );
    if (
      (info1.route_id && !info1.pickuppoint_id) ||
      (info1.pickuppoint_id && !info1.route_id) ||
      (!info1.pickuppoint_id && !info.route_id && months.length > 0)
    ) {
      return toast.error("Both Route and Pickup Point should be Selected");
    }
    info1.transport_amount = routeData?.find(
      (s) => s.id == info1.route_id
    )?.fare;
    info1.student_session_id = Id;
    info1.session_id = s_id;
    info1.hostel_amount = data1?.filter(
      (s) => s.roomType.id == parseInt(info1.hostel_room_type_id)
    )[0]?.roomType.with_food;
    info1.occupied_id = data1?.filter(
      (s) => s.hostelRooms.hostel_no_bed == info1.bed_no
    )[0]?.hostelRooms.id;
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        ...info1,
        months,
      },
    };

    await axios(config)
      .then(async (res) => {
        fileref.current.value = null;
        fileref1.current.value = null;
        fileref2.current.value = null;
        fileref3.current.value = null;
        toast.success("Update Success");
        await getData();
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        clearData();
        toast.error(err.response.data.message);
      });
  };

  const selectAllOption = { label: "Select All", value: "all" };

  const [selectedMonths, setSelectedMonths] = useState([]);

  const handleSelectChange = (selectedValues) => {
    if (selectedValues.includes(selectAllOption)) {
      setSelectedMonths(options.map((option) => option.value));
    } else {
      setSelectedMonths(
        selectedValues.filter((val) => val !== selectAllOption)
      );
    }
  };

  const isSelectAllSelected = selectedMonths.length === options.length;

  const selectedValue = isSelectAllSelected ? [...options] : selectedMonths;

  const [countries, setCountries] = useState([]);

  const setCountryAndState = async () => {
    let arr = [];
    await international?.map((item, key) => {
      arr.push(item?.country);
    });
    setCountries(arr);
  };

  useEffect(() => {
    setStudentDetails({ ...user });
  }, [user, flag]);

  useEffect(() => {
    getData();
    setCountryAndState();
    let yearArr = [];
    let f = 0;
    SessionOpt?.map((value, index) => {
      if (f == 0) {
        yearArr.push((parseInt(value.id) + 1).toString());
        f = 1;
      }
      yearArr.push(value.id);
    });
    setYearData(yearArr);
  }, []);

  useEffect(() => {
    getData();
  }, [flag]);

  useEffect(() => {
    if (info1.hostel_room_type_id || info1.room_hostel_id) {
      let arr =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info1.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info1.room_hostel_id
        );
      let new_set = new Set();
      arr.forEach((item) => {
        new_set.add(item.hostelRooms.floor_number);
      });
      arr = Array.from(new_set);
      setFloors(arr);
    }
    if (info1.floor_number) {
      let arr1 =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info1.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
            s.hostelRooms.floor_number == info1.floor_number
        );
      let new_set1 = new Set();
      arr1.forEach((item) => {
        new_set1.add(item.hostelRooms.room_name_number);
      });
      arr1 = Array.from(new_set1);
      setRooms(arr1);
    }

    if (info1.room_name_number) {
      let arr2 =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info1.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
            s.hostelRooms.floor_number == info1.floor_number &&
            s.hostelRooms.room_name_number == info1.room_name_number
        );
      let new_set2 = new Set();
      arr2.forEach((item) => {
        new_set2.add(item.hostelRooms.hostel_no_bed);
      });
      arr2 = Array.from(new_set2);
      setBeds(arr2);
    }
  }, [
    info1.hostel_room_type_id,
    info1.room_hostel_id,
    info1.floor_number,
    info1.room_name_number,
    flag,
  ]);

  useEffect(() => {
    console.log("info1 - ", info1);
  }, [info1]);

  return (
    <div className="BasicInformation">
      <div>
        {" "}
        <br />
        <br />
        <div className="row">
          {roles == "SUPERADMIN" ? (
            <div className="col-lg-12">
              <div className="form-group">
                <label>Name of Student</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="form-control"
                  value={user?.name}
                  readOnly={editor}
                  onChange={handleChange}
                  placeholder="Student Full Name*"
                />
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="form-group">
                <label>Name of Student</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="form-control"
                  value={user?.name}
                  readOnly={true}
                  // readOnly
                  onChange={handleChange}
                  placeholder="Student Full Name*"
                />
              </div>
            </div>
          )}

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Mobile Number</label>

              <input
                required
                type="text"
                value={user?.phone}
                readOnly={editor}
                name="phone"
                onChange={handleChange}
                className="form-control"
                placeholder="Mobile Number"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Parents Mobile Number</label>

              <input
                required
                type="text"
                value={user?.father_phone}
                onChange={handleChange}
                name="father_phone"
                className="form-control"
                placeholder="Parent Mobile Number *"
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Date of Birth</label>

              <div className="input-group">
                <input
                  type="date"
                  placeholder="Date of Birth*"
                  name="dob"
                  value={user?.dob?.split("T")[0]}
                  onChange={handleChange}
                  className="form-control"
                  id="date"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Email of Student</label>

              <input
                required
                type="email"
                value={user?.email}
                readOnly={editor}
                name="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Email ID*"
              />
            </div>
          </div>

          <div
            className="col-lg-6 col-md-6 program-level"
            style={{ marginBottom: 0 }}
          >
            <div className="form-group">
              <p className="mb-1">
                <b> Marital Status</b>
              </p>
              {/* <div class="form-check"> */}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  value={"single"}
                  readOnly={editor}
                  name="marital"
                  required
                  type="radio"
                  id="inlineCheckbox1"
                  defaultValue="single"
                  checked={user?.marital_status == "single" ? true : false}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      marital_status: "single",
                    }));
                  }}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Single
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  value={"married"}
                  readOnly={editor}
                  name="marital"
                  required
                  type="radio"
                  id="inlineCheckbox2"
                  defaultValue="married"
                  checked={user?.marital_status == "married" ? true : false}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      marital_status: "married",
                    }));
                  }}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">
                  Married
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={user?.gender}
                onChange={handleChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label htmlFor="validationCustom01">Religion</label>
              <select
                className="form-control"
                id="religion"
                name="religion"
                value={user?.religion}
                onChange={handleChange}
              >
                <option value=""> Please Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Buddha">Buddha</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Category</label>
              <select
                value={user?.category}
                onChange={handleChange}
                name="category"
                className="form-control"
              >
                <option value="">Select Category</option>
                <option value="OPEN">OPEN</option>
                <option value="SEBC">SEBC</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
                <option value="OPEN_EWS">OPEN_EWS</option>
                <option value="OTHERS">OTHERS</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Caste</label>
              <input
                required
                type="text"
                value={user?.caste}
                onChange={handleChange}
                name="caste"
                className="form-control"
                placeholder="Caste *"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Sub Caste</label>
              <input
                required
                type="text"
                value={user?.sub_caste}
                onChange={handleChange}
                name="sub_caste"
                className="form-control"
                placeholder="Sub-Caste*"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Blood Group</label>
              <select
                value={user?.blood_grp}
                onChange={handleChange}
                name="blood_grp"
                id=""
                className="form-control"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Physically Handicapped ?</label>
              <select
                value={user?.physically_handiCap}
                onChange={handleChange}
                name="physically_handiCap"
                className="form-control"
              >
                <option value="">Select</option>
                <option value="1">YES</option>
                <option value="0">NO</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label htmlFor="">Nationality</label>
              <span style={{ color: "red" }}>*</span>
              <select
                type="text"
                name="nationality"
                className="form-control"
                placeholder="Enter Nationality"
                value={user?.nationality}
                onChange={handleChange}
              >
                <option value="">Select Nationality</option>
                <option value="INDIAN">Indian</option>
                <option value="INTERNATIONAL">International</option>{" "}
              </select>
            </div>
          </div>
          {user?.nationality == "INTERNATIONAL" ? (
            <>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="">Country</label>
                  <select
                    type="text"
                    name="country"
                    className="form-control"
                    value={user?.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries &&
                      countries?.map((item, key) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="">State</label>
                  <span style={{ color: "red" }}>*</span>
                  <select
                    type="text"
                    name="state"
                    className="form-control"
                    value={user?.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {international
                      ?.filter((s) => s.country == user?.country)[0]
                      ?.states?.map((item, key) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label htmlFor="">State</label>
                <select
                  type="text"
                  name="state"
                  className="form-control"
                  value={user?.state}
                  onChange={handleChange}
                >
                  <option>Select State</option>
                  {indian &&
                    indian?.map((item, key) => {
                      return <option value={item?.state}>{item?.state}</option>;
                    })}
                </select>
              </div>
            </div>
          )}

          {user?.nationality == "INDIAN" ? (
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label htmlFor="">District</label>
                <span style={{ color: "red" }}>*</span>
                <select
                  type="text"
                  name="district"
                  className="form-control"
                  value={user?.district}
                  onChange={handleChange}
                >
                  <option>Select District</option>
                  {indian &&
                    indian
                      ?.filter((s) => s.state == user?.state)[0]
                      ?.districts?.map((item, key) => {
                        return <option value={item}>{item}</option>;
                      })}
                </select>
              </div>
            </div>
          ) : null}

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                className="form-control"
                value={user?.city}
                onChange={handleChange}
              />
            </div>
          </div>
          {user?.nationality == "INTERNATIONAL" ? (
            <>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="validationCustom01">Passport Number</label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Passport Number"
                    value={user?.passport_no}
                    name="passport_no"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="validationCustom01">Visa Number</label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Visa Number"
                    value={user?.visa_no}
                    name="visa_no"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="validationCustom01">Visa Issue Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={user?.visa_issue}
                    name="visa_issue"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="validationCustom01">Visa Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={user?.visa_expiry}
                    name="visa_expiry"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          ) : null}
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label htmlFor="validationCustom01">Current Address</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={user?.current_address}
                name="current_address"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label htmlFor="validationCustom01">Permanent Address</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={user?.permanent_address}
                name="permanent_address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Pin Code</label>
              <input
                required
                type="text"
                value={user?.pin}
                onChange={handleChange}
                name="pin"
                className="form-control"
                placeholder="Pin Code"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <label>Aadhar Number</label>
              <input
                required
                type="text"
                value={user?.aadhar_number}
                onChange={handleChange}
                name="aadhar_number"
                className="form-control"
                placeholder="Aadhar Number *."
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <h5>Upload Student Image</h5>
              <input
                required
                type="file"
                ref={fileref}
                onChange={(e) => {
                  addAttachment(e, "Student_Photo");
                }}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <h5>Upload SSLC Markssheet</h5>
              <input
                ref={fileref1}
                type="file"
                onChange={(e) => {
                  addAttachment(e, "SSLC_MARKS_CARD");
                }}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <h5>Upload PU Markssheet</h5>
              <input
                type="file"
                ref={fileref2}
                onChange={(e) => {
                  addAttachment(e, "PU_MARKS_CARD");
                }}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <h5>Upload Aadhar Card</h5>
              <input
                type="file"
                ref={fileref3}
                onChange={(e) => {
                  addAttachment(e, "AADHAR_CARD");
                }}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <h4>Degree Details</h4>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">UG University Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter UG Name"
                value={info1?.ug_university}
                name="ug_university"
                onChange={handleChange1}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">UG Marks</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter UG Marks"
                value={info1?.ug_university_percentage}
                name="ug_university_percentage"
                onChange={handleChange1}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">PG University Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter PG Name"
                value={info1?.pg_university}
                name="pg_university"
                onChange={handleChange1}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">PG Marks</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter PG Marks"
                value={info1?.pg_university_percentage}
                name="pg_university_percentage"
                onChange={handleChange1}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">UG Marksheet</label>
              <input
                type="file"
                className="form-control"
                placeholder="Enter PG Marks"
                value={info1?.ug_marksheet}
                name="ug_marksheet"
                onChange={handleChange1}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">PG Marksheet</label>
              <input
                type="file"
                className="form-control"
                placeholder="Enter PG Marks"
                value={info1?.pg_marksheet}
                name="pg_marksheet"
                onChange={handleChange1}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <h4>Transport Fees</h4>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">Year</label>
              <select
                type="text"
                className="form-control"
                placeholder="Enter Year"
                name="year_id"
                value={info1?.year_id}
                onChange={handleChange1}
              >
                <option value="">Select Year</option>
                {yearData?.map((i, key) => (
                  <option value={i} key={key}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">Route List</label>
              <select
                type="text"
                className="form-control"
                placeholder="Enter UG Name"
                name="route_id"
                value={info1?.route_id}
                onChange={handleChange1}
              >
                <option value="">Select Route</option>
                {routeData &&
                  routeData?.map((item, key) => {
                    return <option value={item?.id}>{item?.title}</option>;
                  })}
              </select>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="validationCustom02">Fees</label>
              <input
                type="text"
                className="form-control"
                value={routeData?.find((s) => s.id == info1?.route_id)?.fare}
                // value={
                //   selectedRoute
                //     ? (routeData?.find((s) => s.id == selectedRoute)?.fare || 0)
                //     : (routeData?.find((s) => s.id == info1?.route_id)?.fare || 0)
                // }
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">Pickup Point</label>
              <select
                type="text"
                className="form-control"
                placeholder="Enter UG Marks"
                name="pickuppoint_id"
                value={info1?.pickuppoint_id}
                onChange={handleChange1}
              >
                <option value="">Select Pickup Point</option>
                {pickuppointData1 &&
                  pickuppointData1
                    ?.filter((s) => s.route == info1?.route_id)
                    ?.map((i, key) => {
                      return (
                        <option
                          value={
                            pickuppointData?.find(
                              (s) => s.id == i.pickuppointname
                            )?.id
                          }
                          key={key}
                        >
                          {
                            pickuppointData?.find(
                              (s) => s.id == i.pickuppointname
                            )?.name
                          }
                        </option>
                      );
                    })}
              </select>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Fees Month</label>
              <Select
                isMulti
                options={[selectAllOption, ...options]}
                value={selectedValue}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-lg-6 mt-3">
          <h4>Hostel Fees</h4>
        </div> */}
        {/* <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="validationCustom02">
                Hostel<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                name="room_hostel_id"
                id="hostel"
                value={info1.room_hostel_id}
                onChange={handleChange1}
              >
                <option value="">Select Hostel</option>
                {hostelData?.map((i, key) => (
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
                Room Type<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                name="hostel_room_type_id"
                id="type"
                value={info1.hostel_room_type_id}
                onChange={handleChange1}
              >
                <option value="">Select Room Type</option>
                {[
                  ...new Set(
                    data1
                      ?.filter((s) => s.hostel.id == info1.room_hostel_id)
                      ?.map((i) => i.roomType.id)
                  ),
                ].map((uniqueId, key) => {
                  const uniqueItem = data1.find(
                    (item) => item.roomType.id === uniqueId
                  );
                  return (
                    <option value={uniqueItem.roomType.id} key={key}>
                      {uniqueItem.roomType.room_type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="validationCustom02">
                Floor Number <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                name="floor_number"
                value={info1.floor_number}
                onChange={handleChange1}
              >
                <option value="">Select Floor</option>
                {floors &&
                  floors?.map((item, key) => (
                    <option value={item}>{item}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="validationCustom02">
                Room Number / Name <span style={{ color: "red" }}>*</span>
              </label>
              <select
                type="text"
                className="form-control"
                placeholder="Enter Hostel Name"
                name="room_name_number"
                value={info1.room_name_number}
                onChange={handleChange1}
              >
                <option value="">Select Room Number</option>
                {rooms &&
                  rooms?.map((item, key) => (
                    <option value={item}>{item}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="validationCustom02">
                Bed Number
                <span style={{ color: "red" }}>*</span>{" "}
              </label>
              <select
                type="text"
                className="form-control"
                placeholder="Enter Bed Number"
                name="bed_no"
                value={info1?.bed_no}
                onChange={handleChange1}
              >
                <option value="">Select Bed Number</option>
                {beds &&
                  beds?.map((item, key) => (
                    <option value={item}>{item}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">
                Year<span style={{ color: "red" }}>*</span>
              </label>{" "}
              <select
                className="form-control"
                name="year"
                value={info1?.year}
                onChange={handleChange1}
              >
                <option value="">Select Year</option>
                {SessionOpt?.map((i, key) => (
                  <option value={i?.id}>{i?.name.substring(0, 4)}</option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
      </div>
      <div className="row">
        <button className="btn btn-success" onClick={handleEdit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
