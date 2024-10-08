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
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
} from "../../../utils/Transport.apiConst";
import {
  HOSTEL,
  HOSTEL_FLOORS,
  HOSTEL_ROOMS,
  HOSTEL_TYPE,
} from "../../../utils/Hostel.apiConst";
import { ADDHOSTELFEE } from "../../../utils/fees.apiConst";
import Select from "react-select";

import {
    LOCAL_COLLEGE,
    LOCAL_DEPARTMENT,
    LOCAL_PROGRAM,
  } from "../../../utils/LocalStorageConstants";

const AdmissionView = ({
  id,
  setLoading,
  collegeId,
  setStudentDetails,
  studentDetails,
  flag,
}) => {
  const [info, setInfo] = useState({});

  let y = [];

  const fileref = useRef(null);

  const fileref1 = useRef(null);
  const fileref2 = useRef(null);
  const fileref3 = useRef(null);

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

  const localDepartments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));
  const localPrograms = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));
  const localColleges = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

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
    });
  };

  const [user, setUser] = useState();

  const [Id, setId] = useState("");
  const [s_id, setS_Id] = useState("");

//   //Function upload attachment to the s3
//   const addAttachment = async (e, str) => {
//     try {
//       const d = await getFileUrl(
//         ASSET_EMPLOYEE_IMAGE,
//         `Student_${user?.user_id}`,
//         e.target.value.split(".")[1],
//         setLoading,
//         e.target.files[0]
//       );
//       if (str == "Student_Photo") {
//         setUser((prev) => ({
//           ...prev,
//           student_picture: d ? d : "",
//         }));
//       } else if (str == "SSLC_MARKS_CARD") {
//         let sslc_markscard = {
//           link: d,
//           status: "PENDING",
//           reason: "",
//         };

//         setUser((prev) => ({
//           ...prev,
//           sslc_markscard: sslc_markscard ? sslc_markscard : "",
//         }));
//       } else if (str == "PU_MARKS_CARD") {
//         let pu_markscard = {
//           link: d,
//           status: "PENDING",
//           reason: "",
//         };

//         setUser((prev) => ({
//           ...prev,
//           pu_markscard: pu_markscard ? pu_markscard : "",
//         }));
//       } else if (str == "AADHAR_CARD") {
//         let aadhar = {
//           link: d,
//           status: "PENDING",
//           reason: "",
//         };

//         setUser((prev) => ({
//           ...prev,
//           aadhar: aadhar ? aadhar : "",
//         }));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

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

//   const getData = async () => {
//     setLoading(1);
//     const config = {
//       method: "get",
//       url: `${STUDENT_ADMISSION}/${id}`,
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
//         "Content-Type": "application/json",
//       },
//     };

//     await axios(config)
//       .then((res) => {
//         console.log(res.data.data);
//         setUser(res.data.data);
//         setId(res.data.session?.filter((s) => s.status == "ACTIVE")[0]?.id);
//         setS_Id(
//           res.data.session?.filter((s) => s.status == "ACTIVE")[0]?.session_id
//         );
//         setStudentDetails(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error(err.response?.data?.message);
//       });

//     await axios({
//       ...config,
//       url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
//     })
//       .then((res) => {
//         setLoading(0);
//         setRouteData(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error(err);
//       });
//     await axios({
//       ...config,
//       url: `${PICKUP_POINTS}?college_id=${collegeId}`,
//     })
//       .then((res) => {
//         setPickuppointData(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error(err);
//       });
//     await axios({
//       ...config,
//       url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
//     })
//       .then((res) => {
//         setPickuppointData1(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error(err);
//       });
//     await axios({
//       ...config,
//       url: `${GET_TRANSPORT_FEES}?student_id=${searchParams.get("session_id")}`,
//     })
//       .then((res) => {
//         let x = res.data.data;
//         console.log(res.data.data);
//         if (res.data.data.length > 0) {
//           info1.route_id = x[0].route_id;
//           info1.pickuppoint_id = x[0].pickuppoint_id;
//           info1.transport_amount = x[0].amount;
//           let mon = [];
//           x[0].months = JSON.parse(x[0].months);
//           x[0].months.forEach((element) => {
//             mon.push(options[element - 1]);
//           });
//           setSelectedMonths(mon);
//         }
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error(err);
//       });

//     await axios({ ...config, url: `${HOSTEL}` })
//       .then((res) => {
//         setHostelData(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error("Something went wrong");
//       });

//     await axios({ ...config, url: `${HOSTEL_TYPE}?college_id=${collegeId}` })
//       .then((res) => {
//         setRoomData(res.data.data);
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error("Something went wrong");
//       });

//     await axios({ ...config, url: `${HOSTEL_ROOMS}?status=VACANT` })
//       .then(async (res) => {
//         y = res.data.data;
//         await setData1(res.data.data);
//         await axios({
//           ...config,
//           url: `${ADDHOSTELFEE}?student_id=${searchParams.get("session_id")}`,
//         })
//           .then((res) => {
//             let x = res.data.data;
//             if (res.data.data.length > 0) {
//               try {
//                 info1.bed_no = x[0]?.bed_no;
//                 info1.room_name_number = x[0]?.room_id;
//                 let otherInfo = y?.filter(
//                   (s) => s.hostelRooms.hostel_no_bed == x[0].bed_no
//                 );
//                 info1.room_hostel_id = otherInfo[0]?.hostel.id;
//                 info1.floor_number = otherInfo[0]?.hostelRooms.floor_number;
//                 info1.hostel_room_type_id =
//                   otherInfo[0]?.hostelRooms.hostel_room_type_id;
//               } catch (err) {
//                 console.log(err);
//               }
//             }
//             setLoading(0);
//           })
//           .catch((err) => {
//             setLoading(0);
//             toast.error(err);
//           });
//       })
//       .catch((err) => {
//         setLoading(0);
//         toast.error("Something Went Wrong");
//       });
//   };

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

//   const handleEdit = async () => {
//     let months = selectedValue?.map((item, key) =>
//       item.value ? item?.value : item
//     );
//     if (
//       (info1.route_id && !info1.pickuppoint_id) ||
//       (info1.pickuppoint_id && !info1.route_id) ||
//       (!info1.pickuppoint_id && !info.route_id && months.length > 0)
//     ) {
//       return toast.error("Both Route and Pickup Point should be Selected");
//     }
//     info1.transport_amount = routeData?.find(
//       (s) => s.id == info1.route_id
//     )?.fare;
//     info1.student_session_id = Id;
//     info1.session_id = s_id;
//     info1.hostel_amount = data1?.filter(
//       (s) => s.roomType.id == parseInt(info1.hostel_room_type_id)
//     )[0]?.roomType.with_food;
//     info1.occupied_id = data1?.filter(
//       (s) => s.hostelRooms.hostel_no_bed == info1.bed_no
//     )[0]?.hostelRooms.id;
//     setLoading(1);
//     const config = {
//       method: "put",
//       url: `${STUDENT_ADMISSION}/${id}`,
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
//         "Content-Type": "application/json",
//       },
//       data: {
//         ...user,
//         ...info1,
//         months,
//       },
//     };

//     await axios(config)
//       .then(async (res) => {
//         fileref.current.value = null;
//         fileref1.current.value = null;
//         fileref2.current.value = null;
//         fileref3.current.value = null;
//         toast.success("Update Success");
//         await getData();
//         setLoading(0);
//         console.log(res);
//       })
//       .catch((err) => {
//         setLoading(0);
//         clearData();
//         toast.error(err.response.data.message);
//       });
//   };

  const selectAllOption = { label: "Select All", value: "all" };

  const [selectedMonths, setSelectedMonths] = useState([]);

//   const handleSelectChange = (selectedValues) => {
//     if (selectedValues.includes(selectAllOption)) {
//       setSelectedMonths(options.map((option) => option.value));
//     } else {
//       setSelectedMonths(
//         selectedValues.filter((val) => val !== selectAllOption)
//       );
//     }
//   };

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

//   useEffect(() => {
//     setStudentDetails({ ...user });
//   }, [user, flag]);

//   useEffect(() => {
//     getData();
//     setCountryAndState();
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [flag]);

//   useEffect(() => {
//     if (info1.hostel_room_type_id || info1.room_hostel_id) {
//       console.log(info1);
//       let arr =
//         data1 &&
//         data1?.filter(
//           (s) =>
//             s.roomType.room_type ==
//               roomData?.find((s) => s.id == info1.hostel_room_type_id)
//                 ?.room_type &&
//             s.hostelRooms.room_hostel_id == info1.room_hostel_id
//         );
//       let new_set = new Set();
//       arr.forEach((item) => {
//         new_set.add(item.hostelRooms.floor_number);
//       });
//       arr = Array.from(new_set);
//       setFloors(arr);
//     }
//     if (info1.floor_number) {
//       let arr1 =
//         data1 &&
//         data1?.filter(
//           (s) =>
//             s.roomType.room_type ==
//               roomData?.find((s) => s.id == info1.hostel_room_type_id)
//                 ?.room_type &&
//             s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
//             s.hostelRooms.floor_number == info1.floor_number
//         );
//       let new_set1 = new Set();
//       arr1.forEach((item) => {
//         new_set1.add(item.hostelRooms.room_name_number);
//       });
//       arr1 = Array.from(new_set1);
//       setRooms(arr1);
//     }

//     if (info1.room_name_number) {
//       let arr2 =
//         data1 &&
//         data1?.filter(
//           (s) =>
//             s.roomType.room_type ==
//               roomData?.find((s) => s.id == info1.hostel_room_type_id)
//                 ?.room_type &&
//             s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
//             s.hostelRooms.floor_number == info1.floor_number &&
//             s.hostelRooms.room_name_number == info1.room_name_number
//         );
//       let new_set2 = new Set();
//       arr2.forEach((item) => {
//         new_set2.add(item.hostelRooms.hostel_no_bed);
//       });
//       arr2 = Array.from(new_set2);
//       setBeds(arr2);
//     }
//   }, [
//     info1.hostel_room_type_id,
//     info1.room_hostel_id,
//     info1.floor_number,
//     info1.room_name_number,
//     flag,
//   ]);
//   return (<>hi</>)
//   {console.log(user)}
const [componentLoaded, setComponentLoaded] = useState(false);
useEffect(() => {
    if (!componentLoaded) {
      console.log(studentDetails);
      setUser(studentDetails);
      setComponentLoaded(true);
    }
  }, [componentLoaded]);
  return (
    <div className="BasicInformation">
      <div>
        {" "}
        <br />
        <br />
        <div className="row">
        <div className="col-lg-6 col-md-6">
            <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
            <tr>
                <td className="float-right font-weight-bold">Enrollment No. :</td>
                <td className="ml-2">{user?.user_id?user.user_id:"-"}</td>
            </tr>
            <tr>
                <td className="float-right font-weight-bold">Application No. :</td>
                <td className="ml-2">{user?.application_number?user.application_number:"-"}</td>
            </tr>
            <tr>
                <td className="float-right font-weight-bold">College :</td>
                <td className="ml-2">
                {
                    localColleges?.find((s) => s?.id == user?.college_id)?.name? localColleges?.find((s) => s?.id == user?.college_id)?.name : "-"
                }
                </td>
            </tr>
            <tr>
                <td className="float-right font-weight-bold">Department :</td>
                <td className="ml-2">
                {
                    localDepartments?.find((s) => s?.id == user?.department_id)?.name? localDepartments?.find((s) => s?.id == user?.department_id)?.name : "-"
                }
                </td>
            </tr>
            <tr>
                <td className="float-right font-weight-bold">Program :</td>
                <td className="ml-2">
                {
                    localPrograms?.find((s) => s?.id == user?.program_id)?.name? localPrograms?.find((s) => s?.id == user?.program_id)?.name : "-"
                }
                </td>
            </tr>
            <tr>
                <td className="float-right font-weight-bold">Admission Year :</td>
                <td className="ml-2">{user?.year_of_admission? user.year_of_admission:"-"}</td>
            </tr>
            </table>
            </div>
            <div className="col-lg-6 col-md-6">
            <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                <tr>
                    <td className="float-right font-weight-bold">Admission Quota :</td>
                    <td className="ml-2">{user?.quota? user.quota:"-"}</td>
                </tr>
                <tr>
                    <td className="float-right font-weight-bold">Admission Sub Quota :</td>
                    <td className="ml-2">{user?.sub_quota? user.sub_quota:"-"}</td>
                </tr>
                <tr>
                    <td className="float-right font-weight-bold">Date of Admission :</td>
                    <td className="ml-2">{user?.createdAt? user.createdAt.substring(0, 10) : "-"}</td>
                </tr>
                <tr>
                    <td className="float-right font-weight-bold">Domicile State :</td>
                    <td className="ml-2">{user?.state? user.state : "-"}</td>
                </tr>
                <tr>
                    <td className="float-right font-weight-bold">Current Semester :</td>
                    <td className="ml-2">{user?.curr_sem? user.curr_sem:"-"}</td>
                </tr>
                <tr>
                    <td className="float-right font-weight-bold">Date of Application :</td>
                    <td className="ml-2">{user?.appliedAt? user.appliedAt.substring(0, 10) : "-"}</td>
                </tr>
            </table>
        </div>
        </div>
        <hr></hr>
        <div className="12thDetails">
            <h6> 12th Details</h6>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                    <td className="float-right font-weight-bold">12th Board :</td>
                    <td className="ml-2">{user?.pu_board? user.pu_board:"-"}</td>
                    </tr>
                    <tr>
                    <td className="float-right font-weight-bold">12th Pass Month :</td>
                    <td className="ml-2">{user?.pu_pass_month? user.pu_pass_month:"-"}</td>
                    </tr>
                </table>
                </div>
                <div className="col-lg-6 col-md-6">
                <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                    <td className="float-right font-weight-bold">12th Percentage :</td>
                    <td className="ml-2">{user?.pu_perce? user.pu_perce:"-"}</td>
                    </tr>
                    <tr>
                    <td className="float-right font-weight-bold">12th Seat No. :</td>
                    <td className="ml-2">{user?.pu_seat_no? user.pu_seat_no:"-"}</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className="10thDetails">
            <h6> 10th Details</h6>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                        <td className="float-right font-weight-bold">10th Board :</td>
                        <td className="ml-2">{user?.sslc_board? user.sslc_board:"-"}</td>
                    </tr>
                    <tr>
                        <td className="float-right font-weight-bold">10th Pass Month :</td>
                        <td className="ml-2">{user?.sslc_pass_month?user.sslc_pass_month:"-"}</td>
                    </tr>
                    </table>
                </div>
                <div className="col-lg-6 col-md-6">
                    <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                        <td className="float-right font-weight-bold">10th Percentage :</td>
                        <td className="ml-2">{user?.sslc_perce?user.sslc_perce:"-"}</td>
                    </tr>
                    <tr>
                        <td className="float-right font-weight-bold">10th Seat No. :</td>
                        <td className="ml-2">{user?.sslc_seat_no?user.sslc_seat_no:"-"}</td>
                    </tr>
                    </table>
                </div>
            </div>
        </div>
        </div>
        </div>
  );
};

export default AdmissionView;
