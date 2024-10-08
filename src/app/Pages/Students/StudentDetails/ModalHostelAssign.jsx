import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Toggler from "../../../Components/Toggler/Toggler";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { HOSTEL_ASSIGN } from "../../../utils/Hostel.apiConst";
import {
  UPDATE_HOSTEL_FEE_STATUS
} from "../../../utils/fees.apiConst";
import { HR_ASSIGN_WORKFLOW } from "../../../utils/apiConstants";
import { getDateMeta } from "@fullcalendar/react";
import { SessionOpt } from "../../../Data/student/sessionData";
import Select from "react-select";
import {
  HOSTEL_STUDENT_DATA,
  HOSTEL_ROOMS_DETAILS,
  HOSTEL_FEE_YEAR,
} from "../../../utils/Hostel.apiConst";

function ModalHostelAssign({
  setLoading,
  selectedStudent,
  hostel,
  floors,
  roomTypes,
  rooms,
  setRooms,
}) {
  var emp_id = sessionStorage.getItem("employee_id");
  const role = sessionStorage.getItem("role");

  let empHostelId = sessionStorage.getItem("HOSTEL_ID");

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

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [studentHostelData, setStudentHostelData] = useState([]);
  const isSelectAllSelected = selectedMonths.length === options.length;
  const [show, setShow] = useState([]);
  const [hostelFee, setHostelFee] = useState([]);
  const [edit, setEdit] = useState(false);

  const selectAllOption = { label: "Select All", value: "all" };

  let selectedValue = isSelectAllSelected ? [...options] : selectedMonths;

  const [collegeOpt, setCollegeOpt] = useState(
    localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null
  );

  const [user, setUser] = useState({
    year: "",
    months: [],
  });

  const handleSelectChange = (selectedValues) => {
    if (selectedValues.includes(selectAllOption)) {
      setSelectedMonths(options.map((option) => option.value));
      setUser({ ...user, months: options.map((option) => option) });
    } else {
      setSelectedMonths(
        selectedValues.filter((val) => val !== selectAllOption)
      );
      setUser({
        ...user,
        months: selectedValues.filter((val) => val !== selectAllOption),
      });
    }
  };

  const getRooms = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({
      ...config,
      url: `${HOSTEL_ROOMS_DETAILS}`,
    })
      .then((res) => {
        console.log("hostel rooms - ", res.data.data);
        setRooms(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Error while fetching Hostel rooms");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("user hi - ", user);
  }, [user]);

  const getStudentHostelData = async (year) => {
    if (!year) return;
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    console.log(user.year);
    console.log(selectedStudent?.student_session_id);
    await axios({
      ...config,
      url: `${HOSTEL_STUDENT_DATA}?year=${year}&student_id=${selectedStudent?.student_session_id}`,
    })
      .then((res) => {
        console.log("student hostel - ", res.data.data);
        setStudentHostelData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Error while fetching Student hostel Data");
        console.log(err);
      });
    setLoading(0);
  };

  const getHostelFeeDataYear = async (year) => {
    if (!year) return;
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    console.log(user.year);
    console.log(selectedStudent?.student_session_id);
    await axios({
      ...config,
      url: `${HOSTEL_FEE_YEAR}?year=${year}`,
    })
      .then((res) => {
        console.log("hostel year wise - ", res.data.data);
        setHostelFee(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Error while fetching Hostel year wise data");
        console.log(err);
      });
    setLoading(0);
  };

  const handleSubmit = async () => {
    // const ids = user.months;
    // let arr = ids?.map((i,k) => {
    //     return i.value
    // })
    // console.log('months selected - ',ids);
    // console.log('arr - ',arr);
    // const monthsString = `[${arr.join(',')}]`;
    if (!user.year) return toast.error("Please Select Year");
    if (!user.hostel_id) return toast.error("Please Select Hostel");
    if (!user.floor) return toast.error("Please Select Floor");
    if (!user.amount)
      return toast.error("Please Select Room type and Food type");
    if (
      !selectedStudent?.student_session_id ||
      !selectedStudent?.department_id ||
      !selectedStudent?.session_id
    )
      return toast.error("Unable to get student Id");
    // if(!monthsString) return toast.error("Please Select Months");
    if (!user.room_id || !user.bed_no) return toast.error("Please Select Room");

    // console.log(monthsString);

    console.log("user - ", {
      ...user,
      // months: monthsString,
      department_id: selectedStudent?.department_id,
      student_id: selectedStudent?.student_session_id,
      session_id: selectedStudent?.session_id,
    });

    const config = {
      method: "post",
      url: `${HOSTEL_ASSIGN}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        department_id: selectedStudent?.department_id,
        student_id: selectedStudent?.student_session_id,
        session_id: selectedStudent?.session_id,
      },
    };

    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log("success");
        //   getRooms();
        setUser({
          year: "",
          // months: [],
          amount: "",
          floor: "",
          hostel_id: "",
          room_id: "",
          room_type: "",
          bed_no: "",
        });
        setStudentHostelData([]);
        //   setSelectedMonths([]);
        toast.success("Hostel Assigned");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
    setLoading(0);
  };

  const updateHostelFeeStatus = async (status) => {
    if (!studentHostelData[0]?.id) return toast.error("Unable to get Hostel fee");
    setLoading(1);
    const config = {
      method: "put",
      url: `${UPDATE_HOSTEL_FEE_STATUS}/${studentHostelData[0]?.id}`,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        status: status,
      },
    };
    await axios(config)
      .then(async (res) => {
        setLoading(0);
        toast.success(`${status == "INACTIVE" ? "Hostel inactivated " : "Hostel activated "} succesfully`);
        setUser({
          year: "",
          // months: [],
          amount: "",
          floor: "",
          hostel_id: "",
          room_id: "",
          room_type: "",
          bed_no: "",
        });
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const handleEdit = async () => {
    // const ids = user.months;
    // let arr = ids?.map((i,k) => {
    //     return i.value
    // })
    // console.log('months selected - ',ids);
    // console.log('arr - ',arr);
    // const monthsString = `[${arr.join(',')}]`;

    if (!user.hostel_id) return toast.error("Please Select Hostel");
    if (!user.floor) return toast.error("Please Select Floor");
    if (!user.amount)
      return toast.error("Please Select Room type and Food type");
    if (
      !selectedStudent?.student_session_id ||
      !selectedStudent?.department_id ||
      !selectedStudent?.session_id
    )
      return toast.error("Unable to get student Id");
    // if(!monthsString) return toast.error("Please Select Months");
    if (!user.room_id || !user.bed_no) return toast.error("Please Select Room");

    // console.log(monthsString);

    console.log("user - ", {
      ...user,
      // months: monthsString,
      department_id: selectedStudent?.department_id,
      student_id: selectedStudent?.student_session_id,
      session_id: selectedStudent?.session_id,
    });

    const config = {
      method: "put",
      url: `${HOSTEL_ASSIGN}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        // months: monthsString,
        department_id: selectedStudent?.department_id,
        student_id: selectedStudent?.student_session_id,
        session_id: selectedStudent?.session_id,
      },
    };

    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log("success");
        //   getRooms();
        setUser({
          year: "",
          // months: [],
          amount: "",
          floor: "",
          hostel_id: "",
          room_id: "",
          room_type: "",
          bed_no: "",
        });
        //   setStudentHostelData([]);
        //   setSelectedMonths([]);
        toast.success("Edited");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
    setLoading(0);
  };

  useEffect(() => {
    const hostelfloorsValues = [];

    // for (const item of floorData) {
    //   const value = item.hostelfloors;
    //   hostelfloorsValues.push(value);
    // }

    let x = floors?.filter((s) => s.hostelname == user?.hostel_id)[0]?.floors;
    let arr = [];
    let cnt = 1;
    while (x) {
      arr.push(cnt);
      cnt++;
      x--;
    }
    setShow(arr);
  }, [user?.hostel_id]);

  return (
    <div className="ModalHostelAssign">
      <div className="ModalHostelAssign">
        <div
          className="modal fade"
          id="ModalHostelAssign"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered mw-100 w-75"
            role="document"
          >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Assign Hostel
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setUser({
                      year: "",
                      // months: [],
                      amount: "",
                      floor: "",
                      hostel_id: "",
                      room_id: "",
                      room_type: "",
                      bed_no: "",
                    });
                    setStudentHostelData([]);
                    setEdit(false);
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <br />
                <div className="row">
                  <div className="col-md-3">
                    <img
                      className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                      src={`${
                        selectedStudent?.student_picture
                          ? selectedStudent?.student_picture
                          : "../../../assets/images/reports/graduated.png"
                      }
                                `}
                      width="50%"
                      style={{ aspectRatio: "1/1" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-6">
                        <table>
                          <tr>
                            <th>Enrollment No </th>
                            <td> : {selectedStudent?.user_id}</td>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <td> : {selectedStudent?.name}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td> : {selectedStudent?.gender}</td>
                          </tr>
                          <tr>
                            <th>Phone</th>
                            <td> : {selectedStudent?.phone}</td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <table>
                          <tr>
                            <th>Session </th>
                            <td>
                              {" "}
                              : {selectedStudent?.session_id}-
                              {selectedStudent?.session_id + 1}
                            </td>
                          </tr>
                          <tr>
                            <th>Department</th>
                            <td> : {selectedStudent?.dept_name}</td>
                          </tr>
                          <tr>
                            <th>Class</th>
                            <td> : {selectedStudent?.class_name}</td>
                          </tr>
                          <tr>
                            <th>Semester</th>
                            <td> : {selectedStudent?.semester}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="class">
                        Select Year <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        className="form-control"
                        name="year"
                        id="year"
                        value={user.year}
                        disabled={edit}
                        onChange={(e) => {
                          setUser({ ...user, year: e.target.value });
                          if (e.target.value) {
                            getStudentHostelData(e.target.value);
                            getHostelFeeDataYear(e.target.value);
                          }
                          setEdit(false);
                        }}
                      >
                        <option value="">Select Year</option>
                        {SessionOpt &&
                          SessionOpt?.map((item, key) => {
                            return (
                              <option value={item?.id}>
                                {item?.name?.split("-")[0]}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  {studentHostelData?.length > 0 ? (
                    edit ? (
                      //options for edit
                      <>
                        {/* <div className="col-md-4">
                                <div className="form-group">
                                <label>Select Months <span style={{ color: "red" }}>*</span></label>
                                <Select
                                    isMulti
                                    options={[selectAllOption, ...options]}
                                    value={selectedValue}
                                    onChange={handleSelectChange}
                                />
                                </div>
                            </div> */}
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">
                              Select Hostel{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="hostel_id"
                              id="hostel_id"
                              value={user.hostel_id}
                              onChange={(e) =>
                                setUser({ ...user, hostel_id: e.target.value })
                              }
                            >
                              <option>Select Hostel</option>
                              {role == "WARDEN"
                                ? hostel
                                    ?.filter((s) => s.id == empHostelId)
                                    ?.map((i, key) => (
                                      <option value={i.id} key={key}>
                                        {i.hostel_name}
                                      </option>
                                    ))
                                : hostel?.map((i, key) => (
                                    <option value={i.id} key={key}>
                                      {i.hostel_name}
                                    </option>
                                  ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">
                              Select Floor{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="floor"
                              id="floor"
                              value={
                                user.floor
                                  ? user.floor
                                  : rooms?.find((s) => s.id == user.room_id)
                                      ?.floor_number
                              }
                              onChange={(e) =>
                                setUser({ ...user, floor: e.target.value })
                              }
                            >
                              <option>Select Floor</option>
                              {show &&
                                show?.map((item, key) => (
                                  <option value={item}>{item}</option>
                                ))}
                              {/* {floors &&
                                    floors?.filter((s) => s.hostelname == user.hostel_id)?.map((item, key) => {
                                        return (
                                        <option value={item?.id}>{item?.floors}</option>
                                        );
                                    })} */}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">
                              Select Room Type{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="room_type"
                              id="room_type"
                              type="text"
                              value={
                                user.room_type
                                  ? user.room_type
                                  : roomTypes?.find(
                                      (f) =>
                                        f.id ==
                                        rooms.find((s) => s.id == user.room_id)
                                          ?.hostel_room_type_id
                                    )?.room_type
                              }
                              onChange={(e) =>
                                setUser({ ...user, room_type: e.target.value })
                              }
                            >
                              {console.log(
                                user.room_type
                                  ? user.room_type
                                  : roomTypes?.find(
                                      (f) =>
                                        f.id ==
                                        rooms.find((s) => s.id == user.room_id)
                                          ?.hostel_room_type_id
                                    )?.room_type
                              )}
                              <option value="">Select Room type</option>
                              {roomTypes &&
                                roomTypes
                                  ?.filter((s) => s.hostel_id == user.hostel_id)
                                  ?.map((item, key) => {
                                    return (
                                      <option value={item?.id}>
                                        {item?.room_type}
                                      </option>
                                    );
                                  })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">
                              Select Food type{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="amount"
                              id="amount"
                              value={user.amount}
                              onChange={(e) =>
                                setUser({ ...user, amount: e.target.value })
                              }
                            >
                              <option value="">Select Food type</option>
                              {roomTypes?.find((s) => s.id == user.room_type)
                                ?.with_food ? (
                                <option
                                  value={
                                    roomTypes?.find(
                                      (s) => s.id == user.room_type
                                    )?.with_food
                                  }
                                >
                                  Food (₹
                                  {
                                    roomTypes?.find(
                                      (s) => s.id == user.room_type
                                    )?.with_food
                                  }
                                  )
                                </option>
                              ) : (
                                ""
                              )}
                              {roomTypes?.find((s) => s.id == user.room_type)
                                ?.without_food ? (
                                <option
                                  value={
                                    roomTypes?.find(
                                      (s) => s.id == user.room_type
                                    )?.without_food
                                  }
                                >
                                  Without Food (₹
                                  {
                                    roomTypes?.find(
                                      (s) => s.id == user.room_type
                                    )?.without_food
                                  }
                                  )
                                </option>
                              ) : (
                                ""
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">
                              Select Bed <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="room"
                              id="room"
                              value={user.room_id}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  room_id: e.target.value,
                                  bed_no: rooms.find(
                                    (s) => s.id == e.target.value
                                  )?.hostel_no_bed,
                                })
                              }
                            >
                              <option>Select Bed</option>
                              {rooms &&
                                rooms
                                  ?.filter(
                                    (s) =>
                                      s.id == studentHostelData[0]?.room_id ||
                                      (s.floor_number == user.floor &&
                                        s.hostel_room_type_id == user.room_type)
                                  )
                                  ?.filter(
                                    (item) =>
                                      item.id ==
                                        studentHostelData[0]?.room_id ||
                                      !hostelFee.some(
                                        (data) =>
                                          data.bed_no === item.hostel_no_bed &&
                                          data.room_id == item.id
                                      )
                                  )
                                  ?.map((item, key) => {
                                    return (
                                      <option value={item?.id}>
                                        Bed {item?.hostel_no_bed} (Room{" "}
                                        {item?.room_name_number})
                                      </option>
                                    );
                                  })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="class">Amount </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amount"
                              value={user.amount}
                              disabled={
                                role == "SUPERADMIN" || role == "SUACC"
                                  ? false
                                  : true
                              }
                              onChange={(e) =>
                                setUser({ ...user, amount: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      //Display hostel assigned to student for particular year
                      <div className="col-md-12">
                        <p className="alert alert-danger text-center ml-5 mr-5">
                          <b>
                            Hostel assigned to student for the year {user.year}
                          </b>
                        </p>
                        <div className="row">
                          <div className="col-md-3"></div>
                          <div className="col-md-9">
                            <div className="row">
                              <div className="col-md-6">
                                <table>
                                  <tr>
                                    <th>Hostel</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {
                                        hostel?.find(
                                          (s) =>
                                            s.id ==
                                            studentHostelData[0].hostel_id
                                        )?.hostel_name
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Floor</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {
                                        rooms?.find(
                                          (s) =>
                                            s.id == studentHostelData[0].room_id
                                        )?.floor_number
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Room Type</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {
                                        roomTypes?.find(
                                          (s) =>
                                            s.id ==
                                            rooms.find(
                                              (s) =>
                                                s.id ==
                                                studentHostelData[0].room_id
                                            )?.hostel_room_type_id
                                        )?.room_type
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Room number</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {
                                        rooms?.find(
                                          (s) =>
                                            s.id == studentHostelData[0].room_id
                                        )?.room_name_number
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Bed number</th>
                                    <td> : {studentHostelData[0]?.bed_no}</td>
                                  </tr>
                                </table>
                              </div>
                              <div className="col-md-6">
                                <table>
                                  <tr>
                                    <th>Year</th>
                                    <td> : {studentHostelData[0]?.year}</td>
                                  </tr>
                                  <tr>
                                    <th>Amount</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {studentHostelData[0]?.amount?.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        }
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Paid amount</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {studentHostelData[0]?.paid_amount?.toLocaleString(
                                        "en-IN",
                                        {
                                          style: "currency",
                                          currency: "INR",
                                          minimumFractionDigits: 0,
                                        }
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Balance</th>
                                    <td>
                                      {" "}
                                      :{" "}
                                      {(
                                        studentHostelData[0]?.amount -
                                        studentHostelData[0]?.paid_amount
                                      )?.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                      })}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Fee Status</th>
                                    <td>
                                      {" "}
                                      :
                                      <span
                                        className={`ml-1 badge badge-soft-${
                                          studentHostelData[0]?.amount -
                                            studentHostelData[0]?.paid_amount ==
                                          0
                                            ? "success"
                                            : studentHostelData[0]?.amount -
                                                studentHostelData[0]
                                                  ?.paid_amount ==
                                              studentHostelData[0]?.amount
                                            ? "danger"
                                            : "warning"
                                        }`}
                                      >
                                        {studentHostelData[0]?.amount -
                                          studentHostelData[0]?.paid_amount ==
                                        0
                                          ? "Paid"
                                          : studentHostelData[0]?.amount -
                                              studentHostelData[0]
                                                ?.paid_amount ==
                                            studentHostelData[0]?.amount
                                          ? "Not Paid"
                                          : "Partial"}
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    // Dropdown for assigning neew hostel
                    <>
                      {/* <div className="col-md-4">
                        <div className="form-group">
                        <label>Select Months <span style={{ color: "red" }}>*</span></label>
                        <Select
                            isMulti
                            options={[selectAllOption, ...options]}
                            value={selectedValue}
                            onChange={handleSelectChange}
                        />
                        </div>
                    </div> */}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Select Hostel{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="hostel_id"
                            id="hostel_id"
                            value={user.hostel_id}
                            onChange={(e) =>
                              setUser({ ...user, hostel_id: e.target.value })
                            }
                          >
                            <option>Select Hostel</option>
                            {role == "WARDEN"
                              ? hostel
                                  ?.filter((s) => s.id == empHostelId)
                                  ?.map((i, key) => (
                                    <option value={i.id} key={key}>
                                      {i.hostel_name}
                                    </option>
                                  ))
                              : hostel?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.hostel_name}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Select Floor <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="floor"
                            id="floor"
                            value={user.floor}
                            onChange={(e) =>
                              setUser({ ...user, floor: e.target.value })
                            }
                          >
                            <option>Select Floor</option>
                            {show &&
                              show?.map((item, key) => (
                                <option value={item}>{item}</option>
                              ))}
                            {/* {floors &&
                            floors?.filter((s) => s.hostelname == user.hostel_id)?.map((item, key) => {
                                return (
                                <option value={item?.id}>{item?.floors}</option>
                                );
                            })} */}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Select Room Type{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="room_type"
                            id="room_type"
                            value={user.room_type}
                            onChange={(e) =>
                              setUser({ ...user, room_type: e.target.value })
                            }
                          >
                            <option>Select Room type</option>
                            {roomTypes &&
                              roomTypes
                                ?.filter((s) => s.hostel_id == user.hostel_id)
                                ?.map((item, key) => {
                                  return (
                                    <option value={item?.id}>
                                      {item?.room_type}
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Select Food type{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="amount"
                            id="amount"
                            value={user.amount}
                            onChange={(e) =>
                              setUser({ ...user, amount: e.target.value })
                            }
                          >
                            <option>Select Food type</option>
                            {roomTypes?.find((s) => s.id == user.room_type)
                              ?.with_food ? (
                              <option
                                value={
                                  roomTypes?.find((s) => s.id == user.room_type)
                                    ?.with_food
                                }
                              >
                                Food (₹
                                {
                                  roomTypes?.find((s) => s.id == user.room_type)
                                    ?.with_food
                                }
                                )
                              </option>
                            ) : (
                              ""
                            )}
                            {roomTypes?.find((s) => s.id == user.room_type)
                              ?.with_food ? (
                              <option
                                value={
                                  roomTypes?.find((s) => s.id == user.room_type)
                                    ?.without_food
                                }
                              >
                                Without Food (₹
                                {
                                  roomTypes?.find((s) => s.id == user.room_type)
                                    ?.without_food
                                }
                                )
                              </option>
                            ) : (
                              ""
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Select Bed <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="room"
                            id="room"
                            value={user.room_id}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                room_id: e.target.value,
                                bed_no: rooms.find(
                                  (s) => s.id == e.target.value
                                )?.hostel_no_bed,
                              })
                            }
                          >
                            <option>Select Bed</option>
                            {rooms &&
                              rooms
                                ?.filter(
                                  (s) =>
                                    s.floor_number == user.floor &&
                                    s.hostel_room_type_id == user.room_type
                                )
                                ?.filter(
                                  (item) =>
                                    !hostelFee.some(
                                      (data) =>
                                        data.bed_no === item.hostel_no_bed &&
                                        data.room_id == item.id
                                    )
                                )
                                ?.map((item, key) => {
                                  return (
                                    <option value={item?.id}>
                                      Bed {item?.hostel_no_bed} (Room{" "}
                                      {item?.room_name_number})
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="class">
                            Amount <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Amount"
                            value={user.amount}
                            disabled={
                              role == "SUPERADMIN" || role == "SUACC"
                                ? false
                                : true
                            }
                            onChange={(e) =>
                              setUser({ ...user, amount: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="row px-2">
                <button
                  className="btn btn-primary btn-outline ml-3 mr-3 "
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setUser({
                      year: "",
                      months: [],
                      amount: "",
                      floor: "",
                      hostel_id: "",
                      room_id: "",
                      room_type: "",
                      bed_no: "",
                    });
                    setStudentHostelData([]);
                    setSelectedMonths([]);
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
                {studentHostelData?.length > 0 ? (
                  edit ? (
                    <button
                      className="btn btn-success float-right btn-outline mr-3"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setEdit(true);
                        handleEdit();
                      }}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <>
                    <button
                      className="btn btn-primary btn-outline mr-3 float-right"
                      onClick={() => {
                        setEdit(true);
                        // let studentMonths = JSON.parse(studentHostelData[0]?.months) ? JSON.parse(studentHostelData[0]?.months) : [];
                        // let tempMonths = [];
                        // for(let i in studentMonths) {
                        //     tempMonths.push({label: options.find((s) => s.value == studentMonths[i])?.label, value: studentMonths[i]});
                        // }
                        // console.log('temp months - ', tempMonths);
                        // handleSelectChange(tempMonths);
                        setUser({
                          hostel_id: studentHostelData[0]?.hostel_id,
                          year: studentHostelData[0]?.year,
                          bed_no: studentHostelData[0]?.bed_no,
                          room_id: parseInt(studentHostelData[0]?.room_id),
                          amount: studentHostelData[0]?.amount,
                          room_type: rooms.find(
                            (s) => s.id == studentHostelData[0]?.room_id
                          )?.hostel_room_type_id,
                          floor: rooms?.find(
                            (s) => s.id == studentHostelData[0]?.room_id
                          )?.floor_number,
                          // months: tempMonths
                        });
                        console.log("edit user - ", {
                          hostel_id: studentHostelData[0]?.hostel_id,
                          year: studentHostelData[0]?.year,
                          bed_no: studentHostelData[0]?.bed_no,
                          room_id: parseInt(studentHostelData[0]?.room_id),
                          amount: studentHostelData[0]?.amount,
                          room_type: rooms.find(
                            (s) => s.id == studentHostelData[0]?.room_id
                          )?.hostel_room_type_id,
                          floor: rooms?.find(
                            (s) => s.id == studentHostelData[0]?.room_id
                          )?.floor_number,
                          // months: tempMonths
                        });
                      }}
                    >
                      Edit
                    </button>
                    {studentHostelData[0]?.status == "ACTIVE" ? (
                      <button
                        title="Inactive Hostel"
                        data-dismiss="modal"
                      aria-label="Close"
                        className="btn btn-danger float-right"
                        onClick={() => updateHostelFeeStatus("INACTIVE")}
                      >
                        Delete
                      </button>
                    ) : studentHostelData[0]?.status == "INACTIVE" ? (
                      <button
                        title="Active Hostel"
                        className="btn btn-nex float-right"
                        onClick={() => updateHostelFeeStatus("ACTIVE")}
                      >
                        <i class="fa fa-thumbs-up text-success"></i>
                      </button>
                    ) : (
                      <></>
                    )}
                    </>
                  )
                ) : (
                  <button
                    className="btn btn-success btn-outline mr-3"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleSubmit();
                      setEdit(false);
                    }}
                  >
                    Assign
                  </button>
                )}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalHostelAssign;
