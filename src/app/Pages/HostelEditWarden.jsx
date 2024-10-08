import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { ASSET_EMPLOYEE_IMAGE } from '../utils/AssetsReferenceTypes';
import { SESSION_ROLE } from '../utils/sessionStorageContants';
import { indian } from "../Data/Countries/india";
import { international } from "../Data/Countries/international";
import { useSearchParams } from "react-router-dom";
import { SessionOpt } from '../Data/student/sessionData';
import { STUDENT_ADMISSION } from '../utils/apiConstants';
import { ADDHOSTELFEE } from '../utils/fees.apiConst';
import { HOSTEL, HOSTEL_ROOMS,HOSTEL_ROOMS_SQL, HOSTEL_TYPE } from '../utils/Hostel.apiConst';
import { GET_ASSIGNED_PICKUPPOINTS, GET_TRANSPORT_FEES, PICKUP_POINTS, TRANSPORT_ROUTE } from '../utils/Transport.apiConst';
import { getFileUrl } from '../Helpers/Helpers';
import { ROUTES } from '../Router/routerConfig';

const HostelEditWarden = ( 
    {
        id,
        setLoading,
        collegeId,
        setStudentDetails,
        flag,
        employee,
    }
 ) => {

  console.log('id = ',id);
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
    year: ""
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
      year_id:"",
      year:"",
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
        console.log(res.data.data);
        setUser(res.data.data);
        setId(searchParams.get("session_id"));
        setS_Id(searchParams.get("session"));
        setStudentDetails(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response?.data?.message);
      });

    // await axios({
    //   ...config,
    //   url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
    // })
    //   .then((res) => {
    //     setLoading(0);
    //     setRouteData(res.data.data);
    //   })
    //   .catch((err) => {
    //     setLoading(0);
    //     toast.error(err);
    //   });
    // await axios({
    //   ...config,
    //   url: `${PICKUP_POINTS}?college_id=${collegeId}`,
    // })
    //   .then((res) => {
    //     console.log('pickup point - ', res.data.data);
    //     setPickuppointData(res.data.data);
    //   })
    //   .catch((err) => {
    //     setLoading(0);
    //     toast.error(err);
    //   });
    // await axios({
    //   ...config,
    //   url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
    // })
    //   .then((res) => {
    //     setPickuppointData1(res.data.data);
    //   })
    //   .catch((err) => {
    //     setLoading(0);
    //     toast.error(err);
    //   });
    // await axios({
    //   ...config,
    //   url: `${GET_TRANSPORT_FEES}?student_id=${searchParams.get("session_id")}`,
    // })
    //   .then((res) => {
    //     let x = res.data.data;
    //     console.log('x = ', res.data.data);
    //     if (res.data.data.length > 0) {
    //       info1.year_id = x[0].year;
    //       info1.route_id = x[0].route_id;
    //       info1.pickuppoint_id = x[0].pickuppoint_id;
    //       info1.transport_amount = x[0].amount;
    //       let mon = [];
    //       x[0].months = JSON.parse(x[0].months);
    //       x[0].months.forEach((element) => {
    //         mon.push(options[element - 1]);
    //       });
    //       setSelectedMonths(mon);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(0);
    //     toast.error(err);
    //   });

    setLoading(1);
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
        console.log('y - ', res.data.data);
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
      setLoading(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange1 = (e) => {
    console.log('info1 - ', info1);
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
    // if (
    //   (info1.route_id && !info1.pickuppoint_id) ||
    //   (info1.pickuppoint_id && !info1.route_id) ||
    //   (!info1.pickuppoint_id && !info.route_id && months.length > 0)
    // ) {
    //   return toast.error("Both Route and Pickup Point should be Selected");
    // }
    // info1.transport_amount = routeData?.find(
    //   (s) => s.id == info1.route_id
    // )?.fare;
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

    console.log('hi');

    await axios(config)
      .then((res) => {
        toast.success("Success");
        fileref.current.value = null;
        fileref1.current.value = null;
        fileref2.current.value = null;
        fileref3.current.value = null;
        getData();
        setLoading(0);
        console.log(res);
      })
      .catch((err) => {
        setLoading(0);
        clearData();
        toast.error(err);
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
    let f=0;
    SessionOpt?.map((value, index) => {
      if(f==0) {
        yearArr.push((parseInt(value.id) + 1).toString());
        f=1;
      }
      yearArr.push(value.id);
    })
    console.log("year data - ", yearArr);
    setYearData(yearArr);
  }, []);

  useEffect(() => {
    getData();
  }, [flag]);

  useEffect(() => {
    if (info1.hostel_room_type_id || info1.room_hostel_id) {
      console.log(info1);
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

  console.log('data1 - ', data1);
  return (
    <div className="HostelEditWarden">
      <div>
        {" "}
  
        
        <div className="col-lg-6 mt-3">
          
        </div>

        <div className="row">
        <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="class">Year</label>
              <select
                className="form-control"
                name="year"
                id="year"
                value={info1.year}
                onChange={handleChange1}
              >
                <option>Select Year</option>
                {SessionOpt &&
                  SessionOpt?.map((item, key) => {
                    return (
                      <option value={item?.id}>{item?.name?.split('-')[0]}</option>
                    );
                  })}
              </select>
            </div>
          </div>
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
                  {[...new Set(
                  data1
                    ?.filter((s) => s.hostel.id == info1.room_hostel_id)
                    ?.map((i) => i.roomType.id)
                  )].map((uniqueId, key) => {
                    const uniqueItem = data1.find((item) => item.roomType.id === uniqueId);
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
        </div>

      </div>

      <div className="row float-right mr-4">
        <button className="btn btn-success" onClick={handleEdit}>
          Save
        </button>
      </div>

    {/* <div className="row float-right mr-4">
      <button className="btn btn-success" 
        onClick={() => handleEdit(navigate(ROUTES.Warden.StudentDetails))}>
        Save
      </button>
    </div> */}

    </div>
  );
};

export default HostelEditWarden;
