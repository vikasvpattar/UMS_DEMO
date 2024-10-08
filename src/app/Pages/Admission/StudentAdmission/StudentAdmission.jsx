import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ModalStudentAdmission from "../../../modals/Students/ModalStudentAdmission";
import { STUDENT_ADMISSION } from "../../../utils/apiConstants";
import Select from "react-select";
import AdvanceFeeReciept from "../../Accounts/FeeCollection/AdvancePayFeeCollection";
import { useReactToPrint } from "react-to-print";
import { international } from "../../../Data/Countries/international";
import { indian } from "../../../Data/Countries/india";
import {
  HOSTEL,
  HOSTEL_FLOORS,
  HOSTEL_ROOMS,
  HOSTEL_TYPE,
} from "../../../utils/Hostel.apiConst";
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
  GET_ASSIGNED_PICKUPPOINTS,
} from "../../../utils/Transport.apiConst";
import { useRef } from "react";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { SESSION_COLLEGE_ID } from "../../../utils/sessionStorageContants";
import axios from "axios";
import { toast } from "react-toastify";
import {
  sessionOpt,
  sessionOpt as SessionOpt,
} from "../../../Data/jsonData/Academics/Academics";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import { studentAdmissionTemplate } from "./../../../utils/s3assetLinks";
import {
  ASSET_EMPLOYEE_IMAGE,
  ASSET_MEDIA,
} from "../../../utils/AssetsReferenceTypes";
import { getFileUrl } from "../../../Helpers/Helpers";

function StudentAdmission({ setLoading, collegeId }) {
  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [routeData, setRouteData] = useState([]);

  const [pickuppointData, setPickuppointData] = useState([]);

  const [floors, setFloors] = useState([]);

  const [roomType, setRoomType] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [beds, setBeds] = useState([]);

  const [pickuppoints, setPickuppoints] = useState([]);

  const [countries, setCountries] = useState([]);

  const [adv, setAdv] = useState([]);

  const setCountryAndState = async () => {
    let arr = [];
    await international?.map((item, key) => {
      arr.push(item?.country);
    });
    setCountries(arr);
  };

  const getDepartmentData = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [departmentData, setDepartmentData] = useState();

  useEffect(() => {
    setCollegeOpt(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  useEffect(() => {
    setDepartmentData(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrint = async () => {
    PrintRecipt();
  };

  let role = sessionStorage.getItem("role");

  const getLocalProgram = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const getLocalDepartment = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : null;
  };

  const getLocalColleges = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [hostelData, setHostelData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [programOpt, setProgramOpt] = useState(getLocalProgram());

  const [departmentOpt, setDepartmentOpt] = useState(getLocalDepartment());

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setDepartmentOpt(
      JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(
        (itemt) => itemt.college_id == collegeId
      )
    );
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const [semOpt, setSemtOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);
  const [classOpt, setClassOpt] = useState([]);

  const [count, setCount] = useState([0]);

  const [info, setInfo] = useState({
    name: "",
    religion: "",
    is_transferred: "",
    type: "Regular",
    transport_amount: "",
    hostel_amount: "",
    occupied_id: "",
    session_id: "",
    section_id: "",
    class_id: "",
    visa_no: "",
    physically_handiCap: "",
    blood_grp: "",
    visa_expiry: "",
    visa_issue: "",
    passport_no: "",
    email: "",
    phone: "",
    gender: "",
    marital_status: "",
    father_name: "",
    father_phone: "",
    mother_name: "",
    current_address: "",
    permanent_address: "",
    birth_place: "",
    dob: "",
    category: "",
    caste: "",
    sub_caste: "",
    nationality: "",
    country: "",
    district: "",
    state: "",
    city: "",
    student_picture: "",
    aadhar: "",
    sslc_markscard: "",
    date: "",
    joining_date: "",
    section: "",
    current_year: "",
    current_semester: "",
    year_of_admission: "",
    application_status: "",
    fee_status: "",
    college_id: getCollegeId(),
    program_id: "",
    department_id: "",
    ug_university: "",
    ug_university_percentage: "",
    pg_university: "",
    pg_university_percentage: "",
    ug_marksheet: "",
    pg_marksheet: "",
    route_id: "",
    pickuppoint_id: "",
    room_hostel_id: "",
    floor_number: "",
    hostel_room_type_id: "",
    room_name_number: "",
    bed_no: "",
  });

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

  useEffect(() => {
    if (info.room_hostel_id) {
      let arr =
        data1 && data1?.filter((s) => s.hostel.id == info.room_hostel_id);
      let new_set = new Set();
      let final = [];
      arr.forEach((item) => {
        new_set.add(item.roomType.room_type);
      });
      arr = Array.from(new_set);
      arr.forEach((item) => {
        let type_id = data1?.filter(
          (s) =>
            s.hostel.id == info.room_hostel_id && s.roomType.room_type == item
        )[0]?.roomType.id;
        final.push({
          id: type_id,
          roomtype: item,
        });
      });
      setRoomType(final);
    }

    if (info.hostel_room_type_id || info.room_hostel_id) {
      let arr =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info.room_hostel_id
        );
      let new_set = new Set();
      arr.forEach((item) => {
        new_set.add(item.hostelRooms.floor_number);
      });
      arr = Array.from(new_set);
      setFloors(arr);
    }
    if (info.floor_number) {
      let arr1 =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info.room_hostel_id &&
            s.hostelRooms.floor_number == info.floor_number
        );
      let new_set1 = new Set();
      arr1.forEach((item) => {
        new_set1.add(item.hostelRooms.room_name_number);
      });
      arr1 = Array.from(new_set1);
      setRooms(arr1);
    }

    if (info.room_name_number) {
      let arr2 =
        data1 &&
        data1?.filter(
          (s) =>
            s.roomType.room_type ==
              roomData?.find((s) => s.id == info.hostel_room_type_id)
                ?.room_type &&
            s.hostelRooms.room_hostel_id == info.room_hostel_id &&
            s.hostelRooms.floor_number == info.floor_number &&
            s.hostelRooms.room_name_number == info.room_name_number
        );
      let new_set2 = new Set();
      arr2.forEach((item) => {
        new_set2.add(item.hostelRooms.hostel_no_bed);
      });
      arr2 = Array.from(new_set2);
      setBeds(arr2);
    }
  }, [
    info.hostel_room_type_id,
    info.room_hostel_id,
    info.floor_number,
    info.room_name_number,
  ]);

  const selectAllOption = { label: "Select All", value: "all" };

  const [selectedMonths, setSelectedMonths] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [type, setSelectedtype] = useState(null);
  const [transferred, setisTransferred] = useState({
    label: "NO",
    value: "0",
  });

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

  let obj = {};

  const handleChange1 = (e, key) => {
    const { name, value } = e.target;
    if (!obj[key]) {
      obj[key] = {
        note: "",
        amount: "",
        type: "",
        mode: "",
        collected_by: sessionStorage.getItem("employee_id"),
      };
    }
    obj[key][name] = value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearData = () => {
    setInfo({
      type: "Regular",
      name: "",
      email: "",
      phone: "",
      gender: "",
      session_id: "",
      marital_status: "",
      father_name: "",
      father_phone: "",
      mother_name: "",
      current_address: "",
      permanent_address: "",
      country: "",
      passport_no: "",
      visa_no: "",
      visa_expiry: "",
      visa_issue: "",
      birth_place: "",
      dob: "",
      caste: "",
      sub_caste: "",
      nationality: "",
      state: "",
      city: "",
      student_picture: "",
      aadhar: "",
      sslc_markscard: "",
      date: "",
      joining_date: "",
      section: "",
      current_year: "",
      current_semester: "",
      year_of_admission: "",
      application_status: "",
      fee_status: "",
      college_id: getCollegeId(),
      program_id: "",
      department_id: "",
      status: "ACTIVE",
      route_id: "",
      pickuppoint_id: "",
      ug_university: "",
      ug_university_percentage: "",
      pg_university: "",
      pg_university_percentage: "",
      ug_marksheet: "",
      pg_marksheet: "",
      room_hostel_id: "",
      floor_number: "",
      hostel_room_type_id: "",
      room_name_number: "",
      hostel_amount: "",
      bed_no: "",
    });

    obj = {};

    fileref.current.value = null;
    fileref1.current.value = null;
    fileref2.current.value = null;
    fileref3.current.value = null;
  };

  const [user, setUser] = useState();

  const fileref = useRef(null);
  const fileref1 = useRef(null);
  const fileref2 = useRef(null);
  const fileref3 = useRef(null);

  //Function upload attachment to the s3
  const addAttachment = async (e, str) => {
    try {
      const d = await getFileUrl(
        ASSET_MEDIA,
        "media",
        // `Student_${info?.user_id}`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      console.log("File URL (d):", d);
      if (str == "Student_Photo") {
        setInfo((prev) => ({
          ...prev,
          student_picture: d ? d : "",
        }));
      } else if (str == "SSLC_MARKS_CARD") {
        let sslc_markscard = {
          link: d,
          status: "PENDING",
          // status: "APPROVED",
          reason: "",
        };

        setInfo((prev) => ({
          ...prev,
          sslc_markscard: sslc_markscard ? sslc_markscard : "",
        }));
      } else if (str == "PU_MARKS_CARD") {
        let pu_markscard = {
          link: d,
          status: "PENDING",
          // status: "APPROVED",
          reason: "",
        };

        setInfo((prev) => ({
          ...prev,
          pu_markscard: pu_markscard ? pu_markscard : "",
        }));
      } else if (str == "AADHAR_CARD") {
        let aadhar = {
          link: d,
          status: "PENDING",
          // status: "APPROVED",
          reason: "",
        };

        setInfo((prev) => ({
          ...prev,
          aadhar: aadhar ? aadhar : "",
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChange2 = async (e) => {
  //   console.log(e.target.files[0]);
  //   try {
  //     const d = await getFileUrl(
  //       ASSET_MEDIA,
  //       "media",
  //       e.target.value.split(".")[1],
  //       setLoading,
  //       e.target.files[0]
  //     );
  //     info.student_picture = d;
  //     info.aadhar = d;
  //     info.sslc_markscard = d;
  //     info.pu_markscard = d;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Handle Submit Function
  const handleSubmit = async () => {
    let months = selectedValue?.map((item, key) => item.value);
    if (
      (info?.route_id && !info?.pickuppoint_id) ||
      (info?.pickuppoint_id && !info?.route_id) ||
      (!info?.pickuppoint_id && !info?.route_id && months?.length > 0)
    ) {
      return toast.error("Both Route and Pickup Point should be Selected");
    }
    if (routeData?.find((s) => s.id == info.route_id)?.fare > 0) {
      info.transport_amount = routeData?.find(
        (s) => s.id == info.route_id
      )?.fare;
    }
    let feeArray = [];
    if (JSON.parse(sessionStorage.getItem("feedet"))?.length > 0) {
      feeArray = JSON.parse(sessionStorage.getItem("feedet"));
    }
    let x = [];
    if (feeArray.length == 0 && Object.keys(obj).length > 0) {
      feeArray.push(obj);
    }
    if (feeArray?.length > 0) {
      info.isAdvance = 1;
    } else {
      info.isAdvance = 0;
    }
    x = feeArray.map((item) => Object.values(item)[0]);

    if (Object.keys(obj).length > 0) {
      const value = Object.values(obj)[0];
      x.push(value);
    }

    let x1 = x.filter((item, index, arr) => {
      const serializedItem = JSON.stringify(item);
      return (
        index ===
        arr.findIndex((obj) => {
          return JSON.stringify(obj) === serializedItem;
        })
      );
    });

    info.hostel_amount = data1?.filter(
      (s) => s.roomType.id == parseInt(info?.hostel_room_type_id)
    )[0]?.roomType.with_food;
    info.occupied_id = data1?.filter(
      (s) => s.hostelRooms.hostel_no_bed == info?.bed_no
    )[0]?.hostelRooms.id;

    console.log(info);
    setLoading(1);
    const config = {
      method: "post",
      url: STUDENT_ADMISSION,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        info,
        x1,
        months,
      },
    };
    await axios(config)
      .then(async (res) => {
        setLoading(0);
        setFlag((flag) => !flag);
        sessionStorage.removeItem("feedet");
        setData(res.data);
        delete obj[0];
        toast.success(res.data?.message);
        setLoading(0);
        clearData();
        while (count.length > 1) {
          count.pop();
        }
        setAdv(res.data.data5);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setLoading(0);
  };

  //UseEffects

  useEffect(() => {
    setProgramOpt(getLocalProgram());
  }, [localStorage.getItem(LOCAL_PROGRAM)]);

  useEffect(() => {
    setInfo((prevValue) => ({
      ...prevValue,
      college_id: getCollegeId(),
    }));
  }, [sessionStorage.getItem(SESSION_COLLEGE_ID)]);

  const getClassData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data0, data1, data2, data3, data4, data5] = await Promise.all([
      axios({
        ...config,
        url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),
      axios({
        ...config,
        url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSemtOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),

      axios({
        ...config,
        url: ACADEMICS_ADD_SECTION + `?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
          toast.error("Something went wrong");
        }),

      await axios({
        ...config,
        url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
      })
        .then((res) => {
          setRouteData(res.data.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        }),
      await axios({
        ...config,
        url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
      })
        .then((res) => {
          setPickuppointData(res.data.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        }),
      await axios({
        ...config,
        url: `${PICKUP_POINTS}`,
      })
        .then((res) => {
          setLoading(0);
          setPickuppoints(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Something went wrong");
        }),
    ]);

    setLoading(0);
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
        setFloorData(res.data.data); //This line to check if floorData is being updated
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
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

    axios({ ...config, url: `${HOSTEL_ROOMS}?status=VACANT` })
      .then((res) => {
        setLoading(0);
        console.log("Hostel Rooms", res.data.data);
        setData1(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getClassData();
    setCountryAndState();
    getData1();
  }, []);

  useEffect(() => {
    if (adv?.length > 0) {
      handlePrint();
    }
  }, [adv]);

  const handleProgramChange = (selectedOption) => {
    setSelectedProgram(selectedOption);
    setSelectedDepartment(null);
    setSelectedClass(null);
    setSelectedtype({
      value: "Regular",
      label: "Regular",
    });
    setSelectedSemester(null);
    setSelectedSection(null);
    handleChange({
      target: {
        name: "program_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setSelectedClass(null);
    setSelectedSemester(null);
    setSelectedSection(null);
    handleChange({
      target: {
        name: "department_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
    setSelectedSemester(null);
    setSelectedSection(null);
    handleChange({
      target: {
        name: "class_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    setSelectedSection(null);
    handleChange({
      target: {
        name: "semester_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleSectionChange = (selectedOption) => {
    setSelectedSection(selectedOption);
    handleChange({
      target: {
        name: "section_id",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handletypeSet = (selectedOption) => {
    setSelectedtype(selectedOption);
    handleChange({
      target: {
        name: "type",
        value: selectedOption ? selectedOption.value : "Regular",
      },
    });
  };

  const handleisTransferred = (selectedOption) => {
    setisTransferred(selectedOption);
    handleChange({
      target: {
        name: "is_transferred",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const selectedState = indian.find((s) => s.state === info?.state);
  const districtOptions =
    selectedState?.districts.map((item) => ({
      value: item,
      label: item,
    })) || [];

  let ug = [
    {
      value: "Regular",
      label: "Regular",
    },
    {
      value: "D2D",
      label: "D2D",
    },
  ];

  let diploma = [
    {
      value: "Regular",
      label: "Regular",
    },
    {
      value: "C2D",
      label: "C2D",
    },
  ];

  return (
    <div className="StudentAdmission">
      <ModalStudentAdmission
        programOpt={programOpt}
        departmentOpt={departmentOpt}
        sessionOpt={sessionOpt}
        classOpt={classOpt}
        semesterOpt={semOpt}
        sectionOpt={sectionOpt}
        collegeId={collegeId}
        setLoading={setLoading}
      />
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <AdvanceFeeReciept
            mainData={data?.data}
            data={adv}
            collegeId={info?.college_id}
            collegeOpt={collegeOpt}
            classData={classOpt}
            class_id={data?.studentSession?.class_id}
            departmentData={departmentData}
          />
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students Admission</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Students Information</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Student Admission
                      </li>
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
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="card-title">Register</h4>
                      </div>
                      <div className="col-md-8">
                        <a
                          className="btn btn-success btn-sm btn-rounded float-right ml-1"
                          href={studentAdmissionTemplate}
                          download="student"
                        >
                          <i className="fa fa-download" aria-hidden="true" />{" "}
                          Download Bulk Upload Document
                        </a>{" "}
                        &nbsp;&nbsp;
                        {role != "AD-CON" ? (
                          <button
                            className="btn btn-primary btn-sm btn-rounded float-right"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                            type="button"
                            name="submit"
                          >
                            <i className="fa fa-upload" aria-hidden="true" />{" "}
                            Upload Bulk Upload Document
                          </button>
                        ) : null}
                      </div>
                      <hr />
                      <br />
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Transferred from Other College
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="is_transferred"
                            value={transferred}
                            onChange={handleisTransferred}
                            options={[
                              {
                                label: "YES",
                                value: "1",
                              },
                              {
                                label: "NO",
                                value: "0",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Program<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="program_id"
                            id="class"
                            value={info.program_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Program</option>
                            {programOpt.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="program_id"
                            id="class"
                            value={selectedProgram}
                            onChange={handleProgramChange}
                            options={programOpt.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                          />
                        </div>
                      </div>
                      {((info.program_id == "04" || info.program_id == "02") &&
                        collegeId == "1111000") ||
                      collegeId == "1111008" ? (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Type<span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              className="react-select-container"
                              classNamePrefix="react-select"
                              name="type"
                              value={type}
                              onChange={handletypeSet}
                              options={
                                info?.program_id == "04"
                                  ? ug
                                  : info?.program_id == "02"
                                  ? diploma
                                  : null
                              }
                            />
                          </div>
                        </div>
                      ) : null}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="department_id"
                            id="class"
                            value={info.department_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            {departmentOpt
                              ?.filter(
                                (item) => item.program_id == info.program_id
                              )
                              .map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="department_id"
                            id="class"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            options={departmentOpt
                              ?.filter(
                                (item) =>
                                  item.program_id === selectedProgram?.value
                              )
                              .map((i) => ({
                                value: i.id,
                                label: i.name,
                              }))}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Academic Year<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="session_id"
                            id="class"
                            value={info?.session_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic</option>
                            {SessionOpt.map((i, key) => (
                              <option value={i.id} key={key}>
                                {i.name}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            options={SessionOpt?.map((i) => ({
                              value: i.id,
                              label: i.name,
                            }))}
                            value={
                              info?.session_id
                                ? {
                                    value: info?.session_id,
                                    label: SessionOpt?.find(
                                      (i) => i.id == info?.session_id
                                    )?.name,
                                  }
                                : null
                            }
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "session_id",
                                  value: selectedOption?.value,
                                },
                              })
                            }
                            placeholder="Select Session"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="class_id"
                            id="class"
                            value={info.class_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Class</option>
                            {classOpt
                              ?.filter(
                                (s) => s?.department_id == info?.department_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="class_id"
                            id="class"
                            value={selectedClass}
                            onChange={handleClassChange}
                            options={classOpt
                              ?.filter(
                                (s) =>
                                  s?.department_id ==
                                  (selectedDepartment?.value || "")
                              )
                              .map((i) => ({
                                value: i.id,
                                label: i.name,
                              }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Semester<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="semester_id"
                            id="class"
                            value={info.semester_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Academic</option>
                            {semOpt
                              .filter((item) => item.class_id == info.class_id)
                              .map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="semester_id"
                            id="class"
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            options={semOpt
                              .filter(
                                (item) => item.class_id === selectedClass?.value
                              )
                              .map((i) => ({
                                value: i.id,
                                label: i.name,
                              }))}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Section<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="section_id"
                            id="class"
                            value={info.section_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Section</option>
                            {sectionOpt
                              ?.filter(
                                (s) =>
                                  s.department_id == info.department_id &&
                                  s.semester_id == info.semester_id
                              )
                              ?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.name}
                                </option>
                              ))}
                          </select> */}

                          <Select
                            className="react-select-container"
                            classNamePrefix="react-select"
                            name="section_id"
                            id="class"
                            value={selectedSection}
                            onChange={handleSectionChange}
                            options={sectionOpt
                              ?.filter(
                                (s) =>
                                  s.department_id ===
                                    selectedDepartment?.value &&
                                  s.semester_id === selectedSemester?.value
                              )
                              ?.map((i) => ({
                                value: i.id,
                                label: i.name,
                              }))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            <br />
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h4 className="card-title">Personal Details</h4>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Student Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Enter First Name"
                            value={info.name}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="gender"
                            id="gender"
                            className="form-control"
                            value={info.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Maritial Status{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="marital_status"
                            id="gender"
                            className="form-control"
                            value={info.marital_status}
                            onChange={handleChange}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Date of Birth<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={info.dob}
                            name="dob"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Email<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email ID"
                            value={info.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Mobile<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="mobile"
                            name="phone"
                            minLength={1}
                            maxLength={10}
                            value={info.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Religion</label>
                          <select
                            className="form-control"
                            id="religion"
                            name="religion"
                            value={info?.religion}
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Category</label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={info?.category}
                            onChange={handleChange}
                          >
                            <option> Pleace Select Category</option>
                            <option value="General/Open">General/Open</option>
                            <option value="EWS">EWS</option>
                            <option value="SEBC">SEBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Caste</label>
                          <input
                            type="text"
                            className="form-control"
                            value={info?.caste}
                            name="caste"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Sub Caste</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Sub Caste"
                            value={info?.sub_caste}
                            name="sub_caste"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Birth Place
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Birth Place"
                            value={info?.birth_place}
                            name="birth_place"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Blood Group</label>
                          <select
                            value={info?.blood_grp}
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

                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Physically Handicapped ?</label>
                          <select
                            value={info?.physically_handiCap}
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Nationality</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            type="text"
                            name="nationality"
                            className="form-control"
                            placeholder="Enter Nationality"
                            value={info.nationality}
                            onChange={handleChange}
                          >
                            <option value="">Select Nationality</option>
                            <option value="INDIAN">Indian</option>
                            <option value="INTERNATIONAL">
                              International
                            </option>{" "}
                          </select>
                        </div>
                      </div>
                      {info?.nationality == "INTERNATIONAL" ? (
                        <>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="">Country</label>
                              {/* <select
                                type="text"
                                name="country"
                                className="form-control"
                                value={info.country}
                                onChange={handleChange}
                              >
                                <option value="">Select Country</option>
                                {countries &&
                                  countries?.map((item, key) => {
                                    return <option value={item}>{item}</option>;
                                  })}
                              </select> */}

                              <Select
                                name="country"
                                className="basic-single"
                                classNamePrefix="select"
                                value={{
                                  value: info.country,
                                  label: info.country,
                                }}
                                onChange={(selectedOption) =>
                                  handleChange({
                                    target: {
                                      name: "country",
                                      value: selectedOption.value,
                                    },
                                  })
                                }
                                options={countries.map((item) => ({
                                  value: item,
                                  label: item,
                                }))}
                                placeholder="Select Country"
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="">State</label>
                              <span style={{ color: "red" }}>*</span>
                              {/* <select
                                type="text"
                                name="state"
                                className="form-control"
                                value={info.state}
                                onChange={handleChange}
                              >
                                <option value="">Select State</option>
                                {international
                                  ?.filter((s) => s.country == info?.country)[0]
                                  ?.states?.map((item, key) => {
                                    return <option value={item}>{item}</option>;
                                  })}
                              </select> */}

                              <Select
                                name="state"
                                className="basic-single"
                                classNamePrefix="select"
                                value={{ value: info.state, label: info.state }}
                                onChange={(selectedOption) =>
                                  handleChange({
                                    target: {
                                      name: "state",
                                      value: selectedOption.value,
                                    },
                                  })
                                }
                                options={
                                  international
                                    ?.filter(
                                      (s) => s.country == info?.country
                                    )[0]
                                    ?.states?.map((item) => ({
                                      value: item,
                                      label: item,
                                    })) || []
                                }
                                placeholder="Select State"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">State</label>
                            {/* <select
                              type="text"
                              name="state"
                              className="form-control"
                              value={info.state}
                              onChange={handleChange}
                            >
                              <option>Select State</option>
                              {indian &&
                                indian?.map((item, key) => {
                                  return (
                                    <option value={item?.state}>
                                      {item?.state}
                                    </option>
                                  );
                                })}
                            </select> */}

                            <Select
                              name="state"
                              className="basic-single"
                              classNamePrefix="select"
                              value={{ value: info.state, label: info.state }}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "state",
                                    value: selectedOption.value,
                                  },
                                })
                              }
                              options={indian.map((item) => ({
                                value: item?.state,
                                label: item?.state,
                              }))}
                            />
                          </div>
                        </div>
                      )}

                      {info?.nationality == "INDIAN" ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">District</label>
                            <span style={{ color: "red" }}>*</span>
                            {/* <select
                              type="text"
                              name="district"
                              className="form-control"
                              value={info.district}
                              onChange={handleChange}
                            >
                              <option>Select District</option>
                              {indian &&
                                indian
                                  ?.filter((s) => s.state == info?.state)[0]
                                  ?.districts?.map((item, key) => {
                                    return <option value={item}>{item}</option>;
                                  })}
                            </select> */}

                            <Select
                              name="district"
                              className="basic-single"
                              classNamePrefix="select"
                              value={{
                                value: info.district,
                                label: info.district,
                              }}
                              onChange={(selectedOption) =>
                                handleChange({
                                  target: {
                                    name: "district",
                                    value: selectedOption.value,
                                  },
                                })
                              }
                              options={districtOptions}
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            className="form-control"
                            value={info.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {info?.nationality == "INTERNATIONAL" ? (
                        <>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom01">
                                Passport Number
                              </label>
                              <span style={{ color: "red" }}>*</span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Passport Number"
                                value={info?.passport_no}
                                name="passport_no"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom01">
                                Visa Number
                              </label>
                              <span style={{ color: "red" }}>*</span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Visa Number"
                                value={info?.visa_no}
                                name="visa_no"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom01">
                                Visa Issue Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={info?.visa_issue}
                                name="visa_issue"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom01">
                                Visa Expiry Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={info?.visa_expiry}
                                name="visa_expiry"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Current Address
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            value={info?.current_address}
                            name="current_address"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Permanent Address
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            value={info?.permanent_address}
                            name="permanent_address"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-title mb-3">
                      <h4 className="card-title">Upload Documents</h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Upload Student Image
                          </label>
                          <input
                            required
                            type="file"
                            name="student_picture"
                            ref={fileref}
                            onChange={(e) => {
                              addAttachment(e, "Student_Photo");
                            }}
                            className="form-control"
                          />
                          {/* <input type="file"
                            placeholder="Attach the file"
                            className="form-control"
                            name="student_picture"
                            ref={fileref}
                            onChange={(e) => {
                              handleChange2(e);
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Upload Aadhar Card
                          </label>
                          <input
                            type="file"
                            name="aadhar"
                            ref={fileref3}
                            onChange={(e) => {
                              addAttachment(e, "AADHAR_CARD");
                            }}
                            className="form-control"
                          />
                          {/* <input type="file"
                            placeholder="Attach the file"
                            className="form-control"
                            name="aadhar"
                            ref={fileref3}
                            onChange={(e) => {
                              handleChange2(e);
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Upload SSLC Markssheet
                          </label>
                          <input
                            ref={fileref1}
                            name="sslc_markscard"
                            type="file"
                            onChange={(e) => {
                              addAttachment(e, "SSLC_MARKS_CARD");
                            }}
                            className="form-control"
                          />
                          {/* <input type="file"
                            placeholder="Attach the file"
                            className="form-control"
                            name="sslc_markscard"
                            ref={fileref1}
                            onChange={(e) => {
                              handleChange2(e);
                            }}
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Upload PU Markssheet
                          </label>
                          <input
                            type="file"
                            ref={fileref2}
                            name="pu_markscard"
                            onChange={(e) => {
                              addAttachment(e, "PU_MARKS_CARD");
                            }}
                            className="form-control"
                          />
                          {/* <input type="file"
                            placeholder="Attach the file"
                            className="form-control"
                            name="pu_markscard"
                            ref={fileref2}
                            onChange={(e) => {
                              handleChange2(e);
                            }}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-title mb-3">
                      <h4 className="card-title">Guardians Details</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Father Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Father Name"
                            value={info?.father_name}
                            name="father_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Contact Number
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Father Phone"
                            minLength={1}
                            maxLength={10}
                            value={info?.father_phone}
                            name="father_phone"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Mother Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mother Name"
                            value={info?.mother_name}
                            name="mother_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Contact Number
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mother Phone"
                            id="mcontact"
                            name="mphone"
                            minLength={1}
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="card-title mb-3">
                      <h4 className="card-title">Degree Details</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">UG University Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter UG Name"
                            value={info?.ug_university}
                            name="ug_university"
                            onChange={handleChange}
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
                            value={info?.ug_university_percentage}
                            name="ug_university_percentage"
                            onChange={handleChange}
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
                            value={info?.pg_university}
                            name="pg_university"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">PG Marks</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter PG Marks"
                            value={info?.pg_university_percentage}
                            name="pg_university_percentage"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">UG Marksheet</label>
                          <input
                            type="file"
                            className="form-control"
                            placeholder="Enter PG Marks"
                            value={info?.ug_marksheet}
                            name="ug_marksheet"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">PG Marksheet</label>
                          <input
                            type="file"
                            className="form-control"
                            placeholder="Enter PG Marks"
                            value={info?.pg_marksheet}
                            name="pg_marksheet"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-title mb-3">
                      <h4 className="card-title">Transport Fees</h4>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Route List</label>
                            <select
                              type="text"
                              className="form-control"
                              placeholder="Enter UG Name"
                              name="route_id"
                              value={info?.route_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Route</option>
                              {routeData &&
                                routeData?.map((item, key) => {
                                  return (
                                    <option value={item?.id}>
                                      {item?.title}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">Fees</label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                routeData?.find((s) => s.id == info?.route_id)
                                  ?.fare
                              }
                              readOnly={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Pickup Point</label>
                            <select
                              type="text"
                              className="form-control"
                              placeholder="Enter UG Marks"
                              name="pickuppoint_id"
                              value={info?.pickuppoint_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Route</option>
                              {pickuppointData &&
                                pickuppointData
                                  ?.filter((s) => s.route == info?.route_id)
                                  ?.map((i, key) => {
                                    return (
                                      <option value={i.id} key={key}>
                                        {
                                          pickuppoints?.filter(
                                            (s) => s.id == i.pickuppointname
                                          )[0]?.name
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

                      <h4 className="card-title">Hostel Fees</h4>
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
                              value={info.room_hostel_id}
                              onChange={handleChange}
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
                              value={info.hostel_room_type_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Room Type</option>
                              {roomType?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.roomtype}
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
                              value={info.floor_number}
                              onChange={handleChange}
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
                              Room Number / Name{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              placeholder="Enter Hostel Name"
                              name="room_name_number"
                              value={info.room_name_number}
                              required=""
                              onChange={handleChange}
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
                              value={info?.bed_no}
                              onChange={handleChange}
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
                    <br />
                    <div className="card-title mb-3">
                      <h4 className="card-title">Fee Details</h4>
                    </div>
                    {count &&
                      count?.map((item, key) => {
                        return (
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Select Fee Type
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  type="text"
                                  className="form-control"
                                  value={obj[key]?.type}
                                  name="type"
                                  onChange={(e) => handleChange1(e, key)}
                                >
                                  <option value="">Select Type</option>
                                  <option value="ACADEMIC">Academic</option>
                                  <option value="HOSTEL">Hostel</option>
                                  <option value="TRANSPORT">
                                    Transport
                                  </option>{" "}
                                  <option value="OTHER">Other</option>{" "}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Select Mode Of Payment
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  className="form-control"
                                  placeholder="Enter Amount"
                                  value={obj[key]?.mode}
                                  name="mode"
                                  onChange={(e) => handleChange1(e, key)}
                                >
                                  <option value="">Select Mode</option>
                                  <option value="CASH">Cash</option>
                                  <option value="ONLINE">Online</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Enter Amount
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Amount"
                                  value={obj[key]?.amount}
                                  name="amount"
                                  onChange={(e) => handleChange1(e, key)}
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">Note</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Note"
                                  value={obj[key]?.note}
                                  name="note"
                                  onChange={(e) => handleChange1(e, key)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex justify-content-end p-3 ml-1">
                              {count.length == key + 1 ? (
                                <button
                                  className="btn btn-primary btn-small btn-rounded px-3"
                                  type="submit"
                                  name="submit"
                                  onClick={() => {
                                    count.push(1);
                                    let obj1 = JSON.parse(
                                      sessionStorage.getItem("feedet")
                                    );
                                    if (!obj1 && Object.keys(obj).length > 0) {
                                      console.log("Error");
                                      let arr = [];
                                      arr.push(obj);
                                      sessionStorage.setItem(
                                        "feedet",
                                        JSON.stringify(arr)
                                      );
                                    } else if (Object.keys(obj).length > 0) {
                                      obj1 = [...obj1, obj];
                                      obj1 = JSON.stringify(obj1);
                                      sessionStorage.setItem("feedet", obj1);
                                    }
                                    setFlag((flag) => !flag);
                                  }}
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  />{" "}
                                  Add
                                </button>
                              ) : null}
                              {key >= 1 && count.length == key + 1 ? (
                                <>
                                  <button
                                    className="btn btn-danger btn-rounded px-3 ml-3"
                                    type="submit"
                                    name="submit"
                                    onClick={() => {
                                      count.pop();
                                      delete obj[key];
                                      let arr1 = JSON.parse(
                                        sessionStorage.getItem("feedet")
                                      );
                                      arr1?.splice(key, key);
                                      arr1 = JSON.stringify(arr1);
                                      sessionStorage.setItem("feedet", arr1);
                                      setFlag((flag) => !flag);
                                    }}
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    />{" "}
                                    Cancel
                                  </button>
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    <div className="row d-flex justify-content-end p-3">
                      <button
                        className="btn btn-primary btn-rounded px-3"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" name="page_name" defaultValue="std_new" />
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
}

export default StudentAdmission;
