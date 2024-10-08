import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SessionOpt } from "../../../Data/student/sessionData";
import HostelModalFee from "../../../modals/Accounts/FeeCollection/HostelFeeModal";
import HostelReturn from "../../../modals/Accounts/FeeCollection/HostelReturnModal";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { STUDENT_DETAILS, EMPLOYEE_ALL } from "../../../utils/apiConstants";
import {
  FEE_DETAILS,
  ADDHOSTELFEE,
  UPDATE_HOSTEL_FEE_AMOUNT,
  UPDATE_HOSTEL_FEE_STATUS,
} from "../../../utils/fees.apiConst";
import HostelRow from "../../Accounts/FeeCollection/HostelFeeCollectionPaymentRow";
import { useReactToPrint } from "react-to-print";
import HostelPrint from "../../Accounts/FeeCollection/Hostelprint";
import { useRef } from "react";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../../utils/LocalStorageConstants";
import {
  HOSTEL_DETAILS,
  HOSTEL_FLOOR_DETAILS,
  HOSTEL_ROOM_TYPE_DETAILS,
  HOSTEL_ROOMS_DETAILS,
} from "../../../utils/Hostel.apiConst";
import "./style.scss";

const AddHostelFee = ({ setLoading, collegeId }) => {
  const navigate = useNavigate();

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const getDepartmentData = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [departmentData, setDepartmentData] = useState();

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    setCollegeOpt(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  useEffect(() => {
    setDepartmentData(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const [feeData, setFeeData] = useState();

  const [max, setMax] = useState();

  const [fee, setFee] = useState("");

  const [roomId, setRoomID] = useState();

  const [x, setX] = useState(false);

  const [studentData, setStudentData] = useState();

  const [studentSessionData, setStudentSessionData] = useState();

  const [studentSemesterData, setStudentSemesterData] = useState();

  const [hostel, setHostel] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [feeassign, setFeeassign] = useState("");

  const [feeassign1, setFeeassign1] = useState("");

  const [feeid, setFeeid] = useState("");

  const [paid, setPaid] = useState();

  const [classData, setClassData] = useState([]);

  const [emp, setEmp] = useState([]);

  const [addData, setAddData] = useState();

  const [returnData, setReturnData] = useState();

  const [printData, setPrintData] = useState();

  const [printSubData, setPrintSubData] = useState();

  const [prevdata, setPrevdata] = useState([]);

  const [hostelFees, setHostelFees] = useState([]);

  const [paymentdetails, setPaymentdetails] = useState([]);

  const [amount, setAmount] = useState("");

  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrint = async (dd, ss) => {
    await setPrintData(dd);
    await setPrintSubData(ss);
    PrintRecipt();
  };

  const params = useParams();
  const [searchParams] = useSearchParams();

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios({
      ...config,
      url: `${FEE_DETAILS}?student_session_id=${params.id}}`,
    })
      .then((res) => {
        console.log("data = ", res.data.data);
        setFeeData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    await axios({ ...config, url: `${ACADEMICS_ADD_CLASS}` })
      .then((res) => {
        setClassData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });

    setLoading(1);

    await axios({
      ...config,
      url: `${STUDENT_DETAILS}/${searchParams.get("student_id")}`,
    })
      .then((res) => {
        console.log("student data - ", res.data.data);
        console.log("sesion - ", res.data.session);
        console.log("semester - ", res.data.semester);
        setStudentData(res.data.data);
        let sessionData = res.data.session;
        let semesterData = res.data.semester;
        setStudentSessionData(sessionData?.find((s) => s.status == "ACTIVE"));
        setStudentSemesterData(semesterData?.find((s) => s.status == "ACTIVE"));
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(1);
    await axios({
      ...config,
      url: `${ADDHOSTELFEE}?session_id=${
        params.id
      }&department_id=${searchParams.get(
        "department_id"
      )}&student_id=${searchParams.get(
        "student_session_id"
      )}&year=${searchParams.get("year")}`,
    })
      .then((res) => {
        setLoading(0);
        console.log("hostel_fees_data", res.data.data);
        setPaymentdetails(res.data.data[0].payment);
        setRoomID(res.data.data[0].room_id);
        setFeeid(res.data.data[0].id);
        setFeeassign(res.data.data[0].amount);
        setFeeassign1(res.data.data[0].amount);
        setHostelFees(res.data.data);
        setAmount(parseInt(res.data.data[0].amount));
        try {
          let sum = 0;
          for (var i = 0; i < res.data.data[0].payment.length; i++) {
            sum += parseInt(res.data.data[0].payment[i].payment_amount);
          }
          setPaid(sum);
          setMax(parseInt(res.data.data[0].amount) - sum);
        } catch (err) {
          setLoading(0);
          toast.error("Something went wrong");
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios({
      ...config,
      url: `${ADDHOSTELFEE}?department_id=${searchParams.get(
        "department_id"
      )}&student_id=${searchParams.get("student_session_id")}`,
    })
      .then((res) => {
        let x = [];
        for (var i = 0; i < res.data.data.length; i++) {
          let amount = 0;
          for (var j = 0; j < res.data.data[i].payment.length; j++) {
            amount =
              amount + parseInt(res.data.data[i].payment[j].payment_amount);
          }
          // amount = 30000
          if (amount != res.data.data[i].amount) {
            x.push({
              year: SessionOpt.find((s) => s.id == res.data.data[i].session_id)
                ?.name,
              paid: amount,
              total: res.data.data[i].amount,
            });
          }
        }
        setPrevdata(x);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios({ ...config, url: EMPLOYEE_ALL })
      .then((res) => {
        setEmp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(0);
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
        url: `${HOSTEL_DETAILS}`,
      })
        .then((res) => {
          console.log("hostels - ", res.data.data);
          setHostel(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching hostels");
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${HOSTEL_FLOOR_DETAILS}`,
      })
        .then((res) => {
          console.log("hostel floors - ", res.data.data);
          setFloors(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching hostel floors");
          console.log(err);
        }),

      await axios({
        ...config,
        url: `${HOSTEL_ROOM_TYPE_DETAILS}`,
      })
        .then((res) => {
          console.log("hostel room types - ", res.data.data);
          setRoomTypes(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Error while fetching Room types");
          console.log(err);
        }),

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
        }),
    ]);
  };

  useEffect(() => {
    getData();
    getHostelData();
  }, []);

  const submit = async () => {
    const obj = {
      student_id: searchParams.get("student_session_id"),
      session_id: params.id,
      amount: fee,
      department_id: searchParams.get("department_id"),
      room_id: roomId,
    };
    const config = {
      method: "post",
      url: ADDHOSTELFEE,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };
    setLoading(1);
    await axios(config)
      .then(async (res) => {
        console.log(res);
        setLoading(0);
        setFee("");
        await getData();
        toast.success("Successfully added Hostel Fee");
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const submit1 = async () => {
    console.log(feeassign);
    const obj = {
      amount: fee ? fee : feeassign,
      room_id: roomId,
    };
    setLoading(1);
    const config = {
      method: "put",
      url: `${ADDHOSTELFEE}/${feeid}`,
      headers: {
        "Content-type": "application/json",
      },
      data: obj,
    };
    await axios(config)
      .then(async (res) => {
        console.log(res);
        setLoading(0);
        setFee("");
        setFeeassign("");
        setX(!x);
        // await getData();
        toast.error("Something went wrong");
        toast.success("SuccessFully Updated Hostel Fee");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const updateFee = async () => {
    if (!hostelFees[0]?.id) return toast.error("Unable to get Hostel fee");
    if (!amount) return toast.error("Enter a valid amount");
    setLoading(1);
    const config = {
      method: "put",
      url: `${UPDATE_HOSTEL_FEE_AMOUNT}/${hostelFees[0]?.id}`,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        amount: amount,
      },
    };
    console.log(`${UPDATE_HOSTEL_FEE_AMOUNT}/${hostelFees?.id}`);
    await axios(config)
      .then(async (res) => {
        setLoading(0);
        toast.success("Updated hostel fee amount");
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getData();
  // }, [x]);

  return (
    <div className="FeeCollectionAddFee">
      <HostelModalFee
        setLoading={setLoading}
        reloadData={getData}
        maxAmount={max}
      />
      <HostelReturn
        setLoading={setLoading}
        reloadData={getData}
        feeid={feeid}
      />

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <HostelPrint
            mainData={hostelFees}
            empData={emp}
            subData={studentData}
            data={printData}
            collegeOpt={collegeOpt}
            classId={searchParams.get("classId")}
            classData={classData}
            departmentData={departmentData}
          />
        </div>
      </div>

      <div className="main-content">
        <div className="page-content">
          <div className="">
            {/* start page title */}
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center">
                <button
                  className="btn btn-primary d-flex justify-content-center align-items-center rounded-pill mb-2 mr-3"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <h4 className="mb-0">HOSTEL FEE</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <img
                      className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                      src={`${
                        studentData?.student_picture
                          ? studentData?.student_picture
                          : "../../../assets/images/reports/graduated.png"
                      }
                                `}
                      width="50%"
                      style={{ aspectRatio: "1/1" }}
                    />
                    <h6 className="mt-4 text-center">{studentData?.name}</h6>
                    <h6 className="text-center">({studentData?.user_id})</h6>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="text-primary">Student Details</h6>
                      </div>

                      <div className="col-md-6">
                        <h6 className="text-primary">Hostel Details</h6>
                      </div>
                      <div className="col-md-12">
                        <table className="table fee-table table-bordered">
                          <tr>
                            <th>Department</th>
                            <td>
                              {" "}
                              {
                                departmentData?.find(
                                  (s) =>
                                    s.id == studentSessionData?.department_id
                                )?.name
                              }
                            </td>
                            <th width="25%">Hostel (Year)</th>
                            <td width="25%">
                              {" "}
                              {
                                hostel.find(
                                  (s) => s.id == hostelFees[0]?.hostel_id
                                )?.hostel_name
                              }{" "}
                              ({hostelFees[0]?.year})
                            </td>
                          </tr>
                          <tr>
                            <th width="25%">Academic Session </th>
                            <td width="25%">
                              {" "}
                              {studentSessionData?.session_id}-
                              {studentSessionData?.session_id + 1}
                            </td>
                            <th>Floor (Room Type)</th>
                            <td>
                              {" "}
                              {
                                rooms.find(
                                  (s) => s.id == hostelFees[0]?.room_id
                                )?.floor_number
                              }{" "}
                              (
                              {
                                roomTypes?.find(
                                  (s) =>
                                    s.id ==
                                    rooms.find(
                                      (s) => s.id == hostelFees[0]?.room_id
                                    )?.hostel_room_type_id
                                )?.room_type
                              }
                              )
                            </td>
                          </tr>
                          <tr>
                            <th>Class</th>
                            <td>
                              {" "}
                              {studentSessionData?.class_name} (
                              {studentSemesterData?.semester_name})
                            </td>
                            <th>Room (Bed)</th>
                            <td>
                              {
                                rooms.find(
                                  (s) => s.id == hostelFees[0]?.room_id
                                )?.room_name_number
                              }{" "}
                              ({hostelFees[0]?.bed_no})
                            </td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td> {studentData?.gender}</td>
                            <th>Amount</th>
                            <td>
                              {" "}
                              {hostelFees[0]?.amount?.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </tr>
                          <tr>
                            <th>Phone</th>
                            <td> {studentData?.phone}</td>

                            <th>Balance</th>
                            <td>
                              {(
                                hostelFees[0]?.amount -
                                hostelFees[0]?.paid_amount
                              )?.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                                minimumFractionDigits: 0,
                              })}
                              <span
                                className={`ml-1 badge badge-soft-${
                                  hostelFees[0]?.amount -
                                    hostelFees[0]?.paid_amount ==
                                  0
                                    ? "success"
                                    : hostelFees[0]?.amount -
                                        hostelFees[0]?.paid_amount ==
                                      hostelFees[0]?.amount
                                    ? "danger"
                                    : "warning"
                                }`}
                              >
                                {hostelFees[0]?.amount -
                                  hostelFees[0]?.paid_amount ==
                                0
                                  ? "Paid"
                                  : hostelFees[0]?.amount -
                                      hostelFees[0]?.paid_amount ==
                                    hostelFees[0]?.amount
                                  ? "Not Paid"
                                  : "Partial Paid"}
                              </span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {prevdata.length > 1 ? (
              <div className="col-xl-12 mt-3 p-0 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row-gutters">
                      <div className="card-title">
                        Previous Year Hostel Due Fees
                      </div>
                    </div>
                    <div className="table-rep-plugin">
                      <div className="table-responsive mb-0">
                        <table className="table table-hovered text-wrap">
                          <thead>
                            <tr>
                              <th>Year</th>
                              <th>Due Amount</th>
                              <th>Paid Amount</th>
                              <th>Total Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prevdata &&
                              prevdata.map((item, key) => {
                                if (
                                  item?.total - item?.paid != 0 &&
                                  item?.year !=
                                    SessionOpt.find((s) => s.id == params.id)
                                      ?.name
                                ) {
                                  return (
                                    <tr>
                                      <td>{item?.year}</td>
                                      <td>{item?.total - item?.paid}</td>
                                      <td>{item?.paid}</td>
                                      <td>{item?.total}</td>
                                      <td>
                                        {item?.total - item?.paid ==
                                        item?.total ? (
                                          <p className="badge badge-danger">
                                            Unpaid
                                          </p>
                                        ) : (
                                          <p className="badge badge-warning">
                                            Partial
                                          </p>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>{" "}
          <br />
          {/* container-fluid */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* <div className="col-md-4">
                      {" "}
                      <h4 className="card-title">Student Fee Details</h4>
                    </div> */}
                    {role != "CASHIER" ? (
                      <>
                        <div className="col-md-4 ml-4">
                          <div className="row">
                            <label htmlFor="Fee">Fee Amount</label>
                            <input
                              className="ml-2"
                              type="Number"
                              min="0"
                              value={amount}
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />

                            <button
                              autocomplete="off"
                              onClick={() => updateFee()}
                              className="btn btn-nex btn-sm ml-2"
                              type="button"
                            >
                              Update Fee
                            </button>
                          </div>
                        </div>
                        <div className="col-md-7"></div>
                        <hr />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0">
                      <table
                        id="tech-companies-1"
                        className="table table-hovered text-wrap"
                        style={{ width: "100%" }}
                      >
                        {" "}
                        <thead>
                          <tr>
                            <th>Fee Code</th>
                            <th>Due Date</th>
                            <th>status</th>
                            <th>Amount</th>
                            <th>Payment ID</th>
                            <th>Mode</th>
                            <th>Note</th>
                            <th
                              className="text-center"
                              style={{ minWidth: "150px" }}
                            >
                              Date
                            </th>
                            <th>Paid</th>
                            <th>Balance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hostelFees &&
                            hostelFees?.map((i, key) => (
                              <>
                                <tr key={key}>
                                  <td id="data2">Hostel Fees</td>
                                  <td>31.12.2024</td>
                                  <td>
                                    {paid == 0 ? (
                                      <p className="badge badge-danger">
                                        Unpaid
                                      </p>
                                    ) : paid == i?.amount ? (
                                      <p className="badge badge-success">
                                        Paid
                                      </p>
                                    ) : (
                                      <p className="badge badge-warning">
                                        Partial
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    ₹{i?.amount} +{" "}
                                    <span className="text-danger">₹0.00</span>{" "}
                                  </td>
                                  <td />
                                  <td />
                                  <td />
                                  <td />
                                  <td>₹{paid}</td>
                                  <td>₹{parseInt(feeassign1) - paid}</td>
                                  <td width="220px">
                                    {" "}
                                    {parseInt(feeassign1) - paid === 0 &&
                                    sessionStorage.getItem("role") !=
                                      "CASHIER" ? (
                                      <a
                                        href=""
                                        className="badge badge-light"
                                        id="fire"
                                        data-toggle="modal"
                                        data-target="#hostelreturn"
                                        title="Return"
                                        onClick={() => {
                                          setReturnData(i);
                                        }}
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-repeat"
                                          aria-hidden="true"
                                        />
                                      </a>
                                    ) : parseInt(feeassign1) - paid !== 0 ? (
                                      <a
                                        href=""
                                        className="badge badge-light "
                                        data-toggle="modal"
                                        data-target="#addhostelfee"
                                        title="Add Hostel Fee"
                                        onClick={() => {
                                          setAddData(i);
                                        }}
                                      >
                                        <i
                                          className="fa fa-plus"
                                          aria-hidden="true"
                                        />
                                      </a>
                                    ) : null}{" "}
                                  </td>
                                </tr>
                                {paymentdetails?.map((d, k) => (
                                  <HostelRow
                                    data={d}
                                    handlePrint={() => handlePrint(d)}
                                  />
                                ))}
                              </>
                            ))}

                          <input type="hidden" id="sn_count" defaultValue={3} />
                        </tbody>
                        <tfoot>
                          <tr className="table-light">
                            <th colSpan={3}>
                              <p className="float-right">Grand Total Amount</p>
                            </th>
                            <th colSpan={5}>
                              ₹{hostelFees[0]?.amount} +{" "}
                              <span className="text-danger">₹0.00 </span>
                            </th>
                            <th>₹{paid}</th>
                            <th colSpan={2}>₹ {parseInt(feeassign1) - paid}</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
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
    </div>
  );
};

export default AddHostelFee;
