import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { STUDENT_DETAILS2 } from "../../../utils/apiConstants";
import { SessionOpt } from "../../../Data/student/sessionData";
import {
  TRANSPORT_ROUTE,
  PICKUP_POINTS,
  GET_ASSIGNED_PICKUPPOINTS,
} from "../../../utils/Transport.apiConst";
import { ROUTES } from "../../../Router/routerConfig";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import { SESSION_ROLE } from "../../../utils/sessionStorageContants";
import ModalFeeBulkUpload from "../../../modals/Accounts/FeeCollection/ModalFeeBulkUpload";
import { STUDENT_SESSION } from "../../../utils/apiConstants";
import { ADDTRANSPORTFEE1 } from "../../../utils/fees.apiConst";

function TransportFee({ collegeId, setLoading }) {
  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [faculty, setFaculty] = useState("");

  const [userId, setUserId] = useState("");

  const [session_data, setSessionData] = useState([]);

  const [year, setYear] = useState([]);

  const [data1, setData1] = useState([]);

  const [pickuppointData, setPickuppointData] = useState([]);

  const [pickuppointData1, setPickuppointData1] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedRouteName, setSelectedRouteName] = useState("");

  // Function to filter pickup points by route
  const [paid, setPaid] = useState();

  const [role, setRole] = useState(sessionStorage.getItem(SESSION_ROLE));

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  useEffect(() => {
    setDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
  }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

  const [transportdata, setTransportData] = useState([]);
  const [transportDataTotal, setTransportDataTotal] = useState([]);

  const [student, setStudent] = useState([]);

  const [college, setCollege] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  const navigate = useNavigate();

  const getFee = async (student_id) => {
    const feeassign = transportdata.find((item) => item.id == student_id)
      ? "assigned"
      : "not-assigned";
    return feeassign;
  };

  const changeDir1 = async (
    id,
    student_id,
    department_id,
    class_id,
    session_id,
    m
  ) => {
    const x = await getFee(m?.id);
    const nextRoute =
      role == "SUPERADMIN"
        ? ROUTES.Registar.Transport.addtransportFee
        : role == "SUACC"
        ? ROUTES.Accountant.Transport.addtransportFee
        : role == "CASHIER"
        ? ROUTES.Cashier.addtransportFee
        : null;
    if (x == "assigned" || x == "not-assigned") {
      if (nextRoute)
        navigate(
          `${nextRoute}/${id}?student_id=${student_id}&department_id=${department_id}&fee=${x}&classId=${class_id}&student_session_id=${m?.id}&session=${session_id}`
        );
    }
  };

  const changeDir = async (dir, i) => {
    setLoading(1);
    let navData = [];
    // const config = {
    //   method: "get",
    //   url:
    //     STUDENT_SESSION +
    //     `?college_id=${collegeId}&department_id=${i?.data?.department_id}&class_id=${i?.data?.class_id}&section_id=${i?.semesterData[0]?.section_id}&semester_id=${i?.semesterData[0]?.semester_id}&session_id=${i?.data?.session_id}&status_student=ACTIVE`,
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //     "Content-Type": "application/json",
    //   },
    // };

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
        console.log("Data Main", res.data.data);
        setLoading(0);
        navData = res.data.data;
        setSessionData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        toast.error("Some Error Occured");
      });

    navigate(
      // `${dir}/${i?.data?.student_id}?session_id=${i.data?.id}&depart=${i?.data?.department_id}&session=${i?.data?.session_id}&class=${i?.data?.class_id}&sem=${i?.semesterData[0]?.semester_id}&section=${i?.semesterData[0]?.section_id}&trans=1`,
      `${dir}/${i?.student_id}?session_id=${i?.id}&depart=${i?.department_id}&session=${i?.session_id}&class=${i?.class_id}&sem=${i?.semester_id}&section=${i?.section_id}&trans=1`,
      {
        state: {
          data: session_data.length > 0 ? session_data : navData,
          student: student,
        },
      }
    );
  };

  const getAllDropData = async () => {
    setLoading(1);

    const config1 = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios({
      ...config1,
      url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
    })
      .then((res) => {
        setData1(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios({
      ...config1,
      url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setPickuppointData1(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        //toast.error("Something went wrong");
      });

    await axios({
      ...config1,
      url: `${PICKUP_POINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setPickuppointData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        //toast.error("Something went wrong");
      });

    const config3 = {
      method: "get",
      url: `${STUDENT_DETAILS2}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config3)
      .then((res) => {
        setLoading(0);
        console.log("Student Here", res.data);
        setStudent(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Some Error Occured");
      });
  };

  const handleSearch = async () => {
    // if (!session) {
    //   toast.error("Please Enter Required Details");
    //   return;
    // }
    // console.log('year - ', year);
    setLoading(1);
    // const config = {
    //   method: "get",
    //   url: `${STUDENT_SESSION}?year_id=${year}&session_id=${session}&student_id=${userId}&transport=1&route_id=${selectedRoute}`,
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //     "Content-Type": "application/json",
    //   },
    // };

    // let filteredData;
    // await axios(config)
    //   .then((res) => {
    //     filteredData = res.data.data;
    //     if(faculty) {
    //       filteredData = res.data.data.filter((s)=> s.studentInfo.college_id == faculty);
    //     }
    //     console.log("filtered data - ", filteredData);
    //     console.log("Gender Data", res.data.data);
    //     // setData(res.data.data);
    //     setData(filteredData);
    //     x =
    //       res.data.data &&
    //       res.data.data.filter((s) => s.data.student_id == userId);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(0);
    //     //toast.error("Something went wrong");
    //   });

    let url1;

    // userId
    //   ? (url1 = `${ADDTRANSPORTFEE1}?year_id=${year}&student_id=${userId}&route_id=${selectedRouteName}&pickuppoint_id=${selectedPickupPointName}&college_id=${faculty}`)
    //   : (url1 = `${ADDTRANSPORTFEE1}?year_id=${year}&route_id=${selectedRouteName}&pickuppoint_id=${selectedPickupPointName}&college_id=${faculty}`);

    userId
      ? (url1 = `${ADDTRANSPORTFEE1}?year_id=${year}&student_id=${userId}&route_id=${selectedRouteName}&pickuppoint_id=${selectedPickupPointName}&college_id=${faculty}`)
      : (url1 = `${ADDTRANSPORTFEE1}?year_id=${year}&route_id=${selectedRouteName}&pickuppoint_id=${selectedPickupPointName}&college_id=${faculty}`);

    const config2 = {
      method: "get",
      url: url1,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config2)
      .then((res) => {
        setLoading(0);
        console.log("Transport Data -", res.data.data);
        setTransportData(res.data.data);
        let amount = [];
        try {
          for (var i = 0; i < res.data.data.length; i++) {
            let sum = 0;
            for (var j = 0; j < res.data.data[i].payment.length; j++) {
              sum += parseInt(res.data.data[i].payment[j].payment_amount);
            }
            amount.push({
              id: res.data.data[i].student_id,
              amt: sum,
            });
          }
          console.log("paid - ", paid);
          setPaid(amount);
        } catch (err) {
          setLoading(0);
          console.log(err);
        }
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        //toast.error("Something went wrong");
      });

    try {
      setLoading(1);
      const pickupPointsResponse = await axios({
        method: "get",
        url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${collegeId}&route_id=${selectedRoute}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      });
      setLoading(0);
      console.log("pickup point data - ", pickupPointsResponse.data.data);
      setPickuppointData1(pickupPointsResponse.data.data);
    } catch (error) {
      setLoading(0);
      console.error("Error fetching pickup points data:", error);
      toast.error("Something went wrong while fetching pickup points data");
    }
  };

  useEffect(() => {
    if (transportdata) {
      const updatedData = transportdata?.map((value, index) => {
        let payment = JSON.parse(value.payment);
        let totalAmount = payment.reduce(
          (total, payment) => total + parseInt(payment.payment_amount),
          0
        );
        return { ...value, total: totalAmount };
      });
      setTransportDataTotal(updatedData);
    } else {
      setTransportDataTotal([]);
    }
  }, [transportdata]);

  useEffect(() => {
    setRole(sessionStorage.getItem(SESSION_ROLE));
  }, [sessionStorage.getItem(SESSION_ROLE)]);

  useEffect(() => {
    getAllDropData();
  }, []);

  const [selectedPickupPointId, setSelectedPickupPointId] = useState([]);
  const [selectedPickupPointName, setSelectedPickupPointName] = useState([]);

  useEffect(() => {
    setSelectedPickupPointName("");
    data1?.map((i, key) => {
      if (i.id == selectedRoute) {
        setSelectedRouteName(i.title);
      }
    });
  }, [selectedRoute]);

  useEffect(() => {
    setSelectedPickupPointName(
      pickuppointData?.find((s) => s.id == selectedPickupPointId)?.name
        ? pickuppointData?.find((s) => s.id == selectedPickupPointId)?.name
        : ""
    );
  }, [selectedPickupPointId]);

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
                  <h4 className="mb-0">Transport Fees</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active">Transport Fees</li>
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
                    <h2 className="card-title">
                      Search By Student Enrollment Number
                    </h2>

                    {/* <br /> */}
                    <div className="row">
                      <div className="input-group mb-3 col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Student Enrollment No"
                          value={userId}
                          onChange={(e) => {
                            setUserId(e.target.value);
                          }}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-nex ml-3 btn-md"
                            type="submit"
                            name="submit"
                            value="collect"
                            onClick={() => {
                              setSelectedPickupPointName("");
                              setSelectedRouteName("");
                              setFaculty("");
                              handleSearch();
                            }}
                          >
                            <i
                              className="fa fa-search mr-1"
                              aria-hidden="true"
                            />{" "}
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Select Faculty</label>{" "}
                          <select
                            className="form-control"
                            name="selectedFaculty"
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Select Year</label>{" "}
                          <select
                            className="form-control"
                            name="selectedYear"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option value="">Select Year</option>
                            {SessionOpt?.map((i, key) => (
                              <option value={i?.id}>{i?.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Select Route</label>{" "}
                          <select
                            className="form-control"
                            name="selectedRoute"
                            value={selectedRoute}
                            onChange={(e) => setSelectedRoute(e.target.value)}
                          >
                            <option value="">Select Route</option>
                            {data1 &&
                              data1?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.title}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Select Pickup Point</label>
                          <select
                            className="form-control"
                            name="selectedPickupPointId"
                            value={selectedPickupPointId}
                            onChange={(e) =>
                              setSelectedPickupPointId(e.target.value)
                            }
                          >
                            <option value="">Select Pickup Point</option>
                            {pickuppointData1
                              ?.filter((s) => s.route == selectedRoute)
                              ?.map((i, key) => (
                                <option value={i.pickuppointname} key={key}>
                                  {
                                    pickuppointData?.filter(
                                      (s) => s.id == i.pickuppointname
                                    )[0]?.name
                                  }
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row float-right mr-3">
                      <button
                        className="btn btn-nex  btn-md"
                        type="submit"
                        name="submit"
                        value="collect"
                        onClick={() => {
                          setUserId("");
                          handleSearch();
                        }}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
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
                        <h4 className="card-title">Students Details</h4>
                      </div>

                      <div className="col-md-8 ">
                        <span className="float-right">
                          <a href="#">
                            <i
                              className="fa fa-file-pdf-o "
                              aria-hidden="true"
                            />
                          </a>{" "}
                          &nbsp;{" "}
                          <a href="#">
                            <i
                              className="fa fa-file-excel-o"
                              aria-hidden="true"
                            />
                          </a>{" "}
                        </span>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-md-4">
                        <h4 className="card-title">
                          Total Number - {transportdata.length}
                        </h4>
                      </div>
                    </div>
                    <hr /> */}
                    <div className="table-responsive">
                      <table
                        id=""
                        className="table table-bordered text-wrap table-hover dataTable no-footer"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr role="row">
                            <th>Sl.No</th>
                            <th>Student Id</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Department</th>
                            <th>Session</th>
                            <th>Route</th>
                            <th>PickUp Point</th>
                            <th>Year</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transportDataTotal?.map((i, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{i.student_id}</td>
                                <td>{i.name}</td>
                                <td>
                                  {
                                    collegeOpt.find(
                                      (s) => s.id == i?.college_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {
                                    department.find(
                                      (s) => s.id == i?.department_id
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {i?.session_id}-{i?.session_id + 1}
                                </td>
                                <td>{i.route_name}</td>
                                <td>{i.pickup_name}</td>
                                <td>{i.year}</td>
                                <td>
                                  {i.amount?.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                  })}
                                </td>
                                <td>
                                  {i.total?.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                  })}
                                </td>
                                <td>
                                  <span
                                    className={`badge badge-soft-${
                                      i.amount - i.total == 0
                                        ? "success"
                                        : i?.total == 0
                                        ? "danger"
                                        : "warning"
                                    }`}
                                  >
                                    {i.amount - i.total == 0
                                      ? "paid"
                                      : i?.total == 0
                                      ? "not paid"
                                      : "partial"}
                                  </span>
                                </td>
                                <td className="d-flex">
                                  {sessionStorage.getItem("role") !=
                                  "CASHIER" ? (
                                    <button
                                      onClick={() => {
                                        console.log(i);
                                        if (role == "ADMIN")
                                          changeDir(
                                            ROUTES.Principal.Student
                                              .StudentProfile,
                                            i
                                          );
                                        if (role == "SUPERADMIN")
                                          changeDir(
                                            ROUTES.Registar.Student
                                              .StudentProfile,
                                            i
                                          );
                                        if (role == "SUACC") {
                                          changeDir(
                                            ROUTES.Accountant.StudentProfile,
                                            i
                                          );
                                        }
                                        if (role == "CASHIER") {
                                          changeDir(
                                            ROUTES.Cashier.StudentProfile,
                                            i
                                          );
                                        }
                                      }}
                                      className="btn btn-nex btn-sm btn-rounded mr-2"
                                    >
                                      Edit
                                    </button>
                                  ) : null}
                                  <button
                                    target="_blank"
                                    onClick={() => {
                                      changeDir1(
                                        i?.id,
                                        i?.student_id,
                                        i?.department_id,
                                        i?.class_id,
                                        i?.session_id,
                                        i
                                      );
                                    }}
                                    className="btn btn-nex btn-sm btn-rounded"
                                    type="button"
                                  >
                                    Collect Fee
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/* <table
                      id="datatable"
                      className="table table-bordered dt-responsive nowrap table-hover dataTable no-footer"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
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
                            style={{ width: "156.005px" }}
                            aria-sort="ascending"
                            aria-label="Addmision Number: activate to sort column descending"
                          >
                            Student Id
                          </th> */}
                    {/* <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="datatable"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "99.0046px" }}
                                    aria-label="Roll  Number: activate to sort column ascending"
                                  >
                                    Roll Number
                                  </th> */}
                    {/* <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "81.0046px" }}
                            aria-label="Discounts: activate to sort column ascending"
                          >
                            Name
                          </th>
                          <th
                            className="sorting_asc"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "156.005px" }}
                            aria-sort="ascending"
                            aria-label="Addmision Number: activate to sort column descending"
                          >
                            Route
                          </th>
                          <th
                            className="sorting_asc"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "156.005px" }}
                            aria-sort="ascending"
                            aria-label="Addmision Number: activate to sort column descending"
                          >
                            PickUp Point
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
                          </th> */}
                    {/* <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="datatable"
                                    rowSpan={1}
                                    colSpan={1}
                                    style={{ width: "36.0046px" }}
                                    aria-label="DOB: activate to sort column ascending"
                                  >
                                    DOB
                                  </th> */}

                    {/* <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "67.0046px" }}
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Amount
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
                            Paid
                          </th>

                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "81.0046px" }}
                            aria-label="Discounts: activate to sort column ascending"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data?.length == 0 ? (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        ) : (
                          data &&
                          data?.map((i, key) => {
                            let cells = [];
                            count = count+1;
                            {transportdata?.find((s) => s.student_id == i?.data?.id)
                              ? cells.push(<tr key={key + 1}>
                                <td>{count}</td>
                                <td>{i?.data?.student_id}</td>
                                <td>{i?.studentInfo?.name}</td>
                                <td>
                                  {
                                    data1?.filter(
                                      (s) =>
                                        s.id ==
                                        transportdata?.find(
                                          (s) => s.student_id == i?.data?.id
                                        )?.route_id
                                    )[0]?.title
                                  }
                                </td>
                                <td>
                                  {pickuppointData.find(
                                    (point) =>
                                      point.id ===
                                      transportdata?.find(
                                        (s) => s.student_id == i?.data?.id
                                      )?.pickuppoint_id
                                  )?.name || "Not Assigned"}
                                </td>
                                <td>{year}</td>
                                <td>
                                  {transportdata &&
                                  transportdata.find(
                                    (s) => s.student_id == i?.data?.id
                                  )?.amount
                                    ? transportdata.find(
                                        (s) => s.student_id == i?.data?.id
                                      )?.amount
                                    : 0}
                                </td>
                                <td>
                                  {paid &&
                                    paid.find((s) => s.id == i?.data?.id)?.amt}
                                </td>
                                <td className="d-flex">
                                  {sessionStorage.getItem("role") !=
                                  "CASHIER" ? (
                                    <button
                                      onClick={() => {
                                        console.log(i);
                                        if (role == "ADMIN")
                                          changeDir(
                                            ROUTES.Principal.Student
                                              .StudentProfile,
                                            i
                                          );
                                        if (role == "SUPERADMIN")
                                          changeDir(
                                            ROUTES.Registar.Student
                                              .StudentProfile,
                                            i
                                          );
                                        if (role == "SUACC") {
                                          changeDir(
                                            ROUTES.Accountant.StudentProfile,
                                            i
                                          );
                                        }
                                        if (role == "CASHIER") {
                                          changeDir(
                                            ROUTES.Cashier.StudentProfile,
                                            i
                                          );
                                        }
                                      }}
                                      className="btn btn-nex btn-sm btn-rounded mr-2"
                                    >
                                      Edit
                                    </button>
                                  ) : null}
                                  <button
                                    target="_blank"
                                    onClick={() => {
                                      changeDir1(
                                        i?.data?.session_id,
                                        i?.data?.student_id,
                                        i?.data?.department_id,
                                        i?.data?.class_id,
                                        i
                                      );
                                    }}
                                    className="btn btn-nex btn-sm btn-rounded"
                                    type="button"
                                  >
                                    Collect Fee
                                  </button>
                                </td>
                              </tr>):count=count-1}
                            return (
                              cells
                              // <tr key={key + 1}>
                              //   <td>{count}</td>
                              //   <td>{i?.data?.student_id}</td>
                              //   <td>{i?.studentInfo?.name}</td>
                              //   <td>
                              //     {
                              //       data1?.filter(
                              //         (s) =>
                              //           s.id ==
                              //           transportdata?.find(
                              //             (s) => s.student_id == i?.data?.id
                              //           )?.route_id
                              //       )[0]?.title
                              //     }
                              //   </td>
                              //   <td>
                              //     {pickuppointData.find(
                              //       (point) =>
                              //         point.id ===
                              //         transportdata?.find(
                              //           (s) => s.student_id == i?.data?.id
                              //         )?.pickuppoint_id
                              //     )?.name || "Not Assigned"}
                              //   </td>
                              //   <td>{i?.data?.session_id}</td>
                              //   <td>
                              //     {transportdata &&
                              //     transportdata.find(
                              //       (s) => s.student_id == i?.data?.id
                              //     )?.amount
                              //       ? transportdata.find(
                              //           (s) => s.student_id == i?.data?.id
                              //         )?.amount
                              //       : 0}
                              //   </td>
                              //   <td>
                              //     {paid &&
                              //       paid.find((s) => s.id == i?.data?.id)?.amt}
                              //   </td>
                              //   <td className="d-flex">
                              //     {sessionStorage.getItem("role") !=
                              //     "CASHIER" ? (
                              //       <button
                              //         onClick={() => {
                              //           console.log(i);
                              //           if (role == "ADMIN")
                              //             changeDir(
                              //               ROUTES.Principal.Student
                              //                 .StudentProfile,
                              //               i
                              //             );
                              //           if (role == "SUPERADMIN")
                              //             changeDir(
                              //               ROUTES.Registar.Student
                              //                 .StudentProfile,
                              //               i
                              //             );
                              //           if (role == "SUACC") {
                              //             changeDir(
                              //               ROUTES.Accountant.StudentProfile,
                              //               i
                              //             );
                              //           }
                              //           if (role == "CASHIER") {
                              //             changeDir(
                              //               ROUTES.Cashier.StudentProfile,
                              //               i
                              //             );
                              //           }
                              //         }}
                              //         className="btn btn-nex btn-sm btn-rounded mr-2"
                              //       >
                              //         Edit
                              //       </button>
                              //     ) : null}
                              //     <button
                              //       target="_blank"
                              //       onClick={() => {
                              //         changeDir1(
                              //           i?.data?.session_id,
                              //           i?.data?.student_id,
                              //           i?.data?.department_id,
                              //           i?.data?.class_id,
                              //           i
                              //         );
                              //       }}
                              //       className="btn btn-nex btn-sm btn-rounded"
                              //       type="button"
                              //     >
                              //       Collect Fee
                              //     </button>
                              //   </td>
                              // </tr>
                            );
                          })
                        )}
                        <tr></tr>
                      </tbody>
                    </table> */}
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

export default TransportFee;
