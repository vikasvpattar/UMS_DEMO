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
  studentDetails,
  setStudentDetails,
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

  // const getData = async () => {
  //   setLoading(1);
  //   const config = {
  //     method: "get",
  //     url: `${STUDENT_ADMISSION}/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setUser(res.data.data);
  //       setId(res.data.session?.filter((s) => s.status == "ACTIVE")[0]?.id);
  //       setS_Id(
  //         res.data.session?.filter((s) => s.status == "ACTIVE")[0]?.session_id
  //       );
  //       setStudentDetails(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error(err.response?.data?.message);
  //     });

  //   await axios({
  //     ...config,
  //     url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
  //   })
  //     .then((res) => {
  //       setLoading(0);
  //       setRouteData(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error(err);
  //     });
  //   await axios({
  //     ...config,
  //     url: `${PICKUP_POINTS}?college_id=${collegeId}`,
  //   })
  //     .then((res) => {
  //       setPickuppointData(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error(err);
  //     });
  //   await axios({
  //     ...config,
  //     url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
  //   })
  //     .then((res) => {
  //       setPickuppointData1(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error(err);
  //     });
  //   await axios({
  //     ...config,
  //     url: `${GET_TRANSPORT_FEES}?student_id=${searchParams.get("session_id")}`,
  //   })
  //     .then((res) => {
  //       let x = res.data.data;
  //       console.log(res.data.data);
  //       if (res.data.data.length > 0) {
  //         info1.route_id = x[0].route_id;
  //         info1.pickuppoint_id = x[0].pickuppoint_id;
  //         info1.transport_amount = x[0].amount;
  //         let mon = [];
  //         x[0].months = JSON.parse(x[0].months);
  //         x[0].months.forEach((element) => {
  //           mon.push(options[element - 1]);
  //         });
  //         setSelectedMonths(mon);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error(err);
  //     });

  //   await axios({ ...config, url: `${HOSTEL}` })
  //     .then((res) => {
  //       setHostelData(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error("Something went wrong");
  //     });

  //   await axios({ ...config, url: `${HOSTEL_TYPE}?college_id=${collegeId}` })
  //     .then((res) => {
  //       setRoomData(res.data.data);
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error("Something went wrong");
  //     });

  //   await axios({ ...config, url: `${HOSTEL_ROOMS}?status=VACANT` })
  //     .then(async (res) => {
  //       y = res.data.data;
  //       await setData1(res.data.data);
  //       await axios({
  //         ...config,
  //         url: `${ADDHOSTELFEE}?student_id=${searchParams.get("session_id")}`,
  //       })
  //         .then((res) => {
  //           let x = res.data.data;
  //           if (res.data.data.length > 0) {
  //             try {
  //               info1.bed_no = x[0]?.bed_no;
  //               info1.room_name_number = x[0]?.room_id;
  //               let otherInfo = y?.filter(
  //                 (s) => s.hostelRooms.hostel_no_bed == x[0].bed_no
  //               );
  //               info1.room_hostel_id = otherInfo[0]?.hostel.id;
  //               info1.floor_number = otherInfo[0]?.hostelRooms.floor_number;
  //               info1.hostel_room_type_id =
  //                 otherInfo[0]?.hostelRooms.hostel_room_type_id;
  //             } catch (err) {
  //               console.log(err);
  //             }
  //           }
  //           setLoading(0);
  //         })
  //         .catch((err) => {
  //           setLoading(0);
  //           toast.error(err);
  //         });
  //     })
  //     .catch((err) => {
  //       setLoading(0);
  //       toast.error("Something Went Wrong");
  //     });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleChange1 = (e) => {
  //   const { name, value } = e.target;
  //   setInfo1((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const selectAllOption = { label: "Select All", value: "all" };

  const [selectedMonths, setSelectedMonths] = useState([]);

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

  // useEffect(() => {
  //   setStudentDetails({ ...user });
  // }, [user, flag]);

  // useEffect(() => {
  //   getData();
  //   setCountryAndState();
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [flag]);

  // useEffect(() => {
  //   if (info1.hostel_room_type_id || info1.room_hostel_id) {
  //     console.log(info1);
  //     let arr =
  //       data1 &&
  //       data1?.filter(
  //         (s) =>
  //           s.roomType.room_type ==
  //             roomData?.find((s) => s.id == info1.hostel_room_type_id)
  //               ?.room_type &&
  //           s.hostelRooms.room_hostel_id == info1.room_hostel_id
  //       );
  //     let new_set = new Set();
  //     arr.forEach((item) => {
  //       new_set.add(item.hostelRooms.floor_number);
  //     });
  //     arr = Array.from(new_set);
  //     setFloors(arr);
  //   }
  //   if (info1.floor_number) {
  //     let arr1 =
  //       data1 &&
  //       data1?.filter(
  //         (s) =>
  //           s.roomType.room_type ==
  //             roomData?.find((s) => s.id == info1.hostel_room_type_id)
  //               ?.room_type &&
  //           s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
  //           s.hostelRooms.floor_number == info1.floor_number
  //       );
  //     let new_set1 = new Set();
  //     arr1.forEach((item) => {
  //       new_set1.add(item.hostelRooms.room_name_number);
  //     });
  //     arr1 = Array.from(new_set1);
  //     setRooms(arr1);
  //   }

  //   if (info1.room_name_number) {
  //     let arr2 =
  //       data1 &&
  //       data1?.filter(
  //         (s) =>
  //           s.roomType.room_type ==
  //             roomData?.find((s) => s.id == info1.hostel_room_type_id)
  //               ?.room_type &&
  //           s.hostelRooms.room_hostel_id == info1.room_hostel_id &&
  //           s.hostelRooms.floor_number == info1.floor_number &&
  //           s.hostelRooms.room_name_number == info1.room_name_number
  //       );
  //     let new_set2 = new Set();
  //     arr2.forEach((item) => {
  //       new_set2.add(item.hostelRooms.hostel_no_bed);
  //     });
  //     arr2 = Array.from(new_set2);
  //     setBeds(arr2);
  //   }
  // }, [
  //   info1.hostel_room_type_id,
  //   info1.room_hostel_id,
  //   info1.floor_number,
  //   info1.room_name_number,
  //   flag,
  // ]);
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
        <div className="guardianDetails">
            <h6>Guardian Information</h6>
            <div className="row">
              <div className="col-lg-6 col-md-6">
              <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                  <tr>
                    <td className="float-right font-weight-bold">Guardian's Name :</td>
                    <td className="ml-2">{user?.guardian_name || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Occupation :</td>
                    <td className="ml-2">{user?.guardian_occupation || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Mobile (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_phone || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Occupation City (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_occupation_city || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Email (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_email || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Company / Organization :</td>
                    <td className="ml-2">{user?.guardian_company || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">PAN (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_pan || "-"}</td>
                  </tr>
                </table>

                </div>
                <div className="col-lg-6 col-md-6">
                <table  className="p-0 mr-2" style={{ fontSize: '1em' }}>
                  <tr>
                    <td className="float-right font-weight-bold">Industry Type :</td>
                    <td className="ml-2">{user?.guardian_industry_type || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Aadhar No. (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_aadhar_number || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Sector Type :</td>
                    <td className="ml-2">{user?.guardian_sector_type || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Education Qualification :</td>
                    <td className="ml-2">{user?.guardian_education_qualification || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Annual Income (Guardian) :</td>
                    <td className="ml-2">{user?.guardian_annual_income || "-"}</td>
                  </tr>
                  <tr>
                    <td className="float-right font-weight-bold">Designation :</td>
                    <td className="ml-2">{user?.guardian_designation  || "-"}</td>
                  </tr>
                </table>
                </div>
              </div>
            </div>
        </div>

        <hr></hr>
        <div>
        {" "}
        <div className="fatherDetails">
            <h6>Father's Information</h6>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                    <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                      <tr>
                        <td className="float-right font-weight-bold">Father's Name :</td>
                        <td className="ml-2">{user?.father_name || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">Occupation :</td>
                        <td className="ml-2">{user?.father_occupation || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">Mobile (Father) :</td>
                        <td className="ml-2">{user?.father_phone || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">Occupation City (Father) :</td>
                        <td className="ml-2">{user?.father_occupation_city || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">Email (Father) :</td>
                        <td className="ml-2">{user?.father_email || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">Company / Organization :</td>
                        <td className="ml-2">{user?.father_company || "-"}</td>
                      </tr>
                      <tr>
                        <td className="float-right font-weight-bold">PAN (Father) :</td>
                        <td className="ml-2">{user?.father_pan || "-"}</td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <table  className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                      <td className="float-right font-weight-bold">Industry Type :</td>
                      <td className="ml-2">{user?.father_industry_type || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Aadhar No. (Father) :</td>
                      <td className="ml-2">{user?.father_aadhar_number || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Sector Type :</td>
                      <td className="ml-2">{user?.father_sector_type || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Education Qualification :</td>
                      <td className="ml-2">{user?.father_education_qualification || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Annual Income (Father) :</td>
                      <td className="ml-2">{user?.father_annual_income || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Designation :</td>
                      <td className="ml-2">{user?.father_designation || "-"}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <hr></hr>
        <div>
        {" "}
        <div className="motherDetails">
            <h6>Mother's Information</h6>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <table className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                      <td className="float-right font-weight-bold">Mother's Name :</td>
                      <td className="ml-2">{user?.mother_name  || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Occupation :</td>
                      <td className="ml-2">{user?.mother_occupation  || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Mobile (Mother) :</td>
                      <td className="ml-2">{user?.mother_phone  || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Occupation City (Mother) :</td>
                      <td className="ml-2">{user?.mother_occupation_city}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Email (Mother) :</td>
                      <td className="ml-2">{user?.mother_email || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Company / Organization :</td>
                      <td className="ml-2">{user?.mother_company || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">PAN (Mother) :</td>
                      <td className="ml-2">{user?.mother_pan || "-"}</td>
                    </tr>
                    </table>
                    </div>
                    <div className="col-lg-6 col-md-6">
                    <table  className="p-0 mr-2" style={{ fontSize: '1em' }}>
                    <tr>
                      <td className="float-right font-weight-bold">Industry Type :</td>
                      <td className="ml-2">{user?.mother_industry_type || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Aadhar No. (Mother) :</td>
                      <td className="ml-2">{user?.mother_aadhar_number || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Sector Type :</td>
                      <td className="ml-2">{user?.mother_sector_type || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Education Qualification :</td>
                      <td className="ml-2">{user?.mother_education_qualification || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Annual Income (Mother) :</td>
                      <td className="ml-2">{user?.mother_annual_income || "-"}</td>
                    </tr>
                    <tr>
                      <td className="float-right font-weight-bold">Designation :</td>
                      <td className="ml-2">{user?.mother_designation || "-"}</td>
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
