import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import TransportFeeModal from "../../../modals/Accounts/FeeCollection/TransportFeeModal";
import TransportReturn from "../../../modals/Accounts/FeeCollection/TransportReturn";
import { ACADEMICS_ADD_CLASS } from "../../../utils/Academics.apiConst";
import { ACCOUNT_FEE_MASTER } from "../../../utils/Accounts.apiConst";
import { STUDENT_DETAILS, EMPLOYEE_ALL } from "../../../utils/apiConstants";
import { FEE_DETAILS, ADDTRANSPORTFEE } from "../../../utils/fees.apiConst";
import HostelRow from "../../Accounts/FeeCollection/HostelFeeCollectionPaymentRow";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import TransportPrint from "../../Accounts/FeeCollection/Transportprint";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../../utils/LocalStorageConstants";

const AddTransportFee = ({ setLoading, collegeId }) => {
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function inWords(num) {
    if (!num) return;
    if ((num = num.toString()).length > 9) return "overflow";
    var n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          "only "
        : "";
    return str;
  }

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

  useEffect(() => {
    setCollegeOpt(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  useEffect(() => {
    setDepartmentData(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const [feeData, setFeeData] = useState();

  const [emp, setEmp] = useState([]);

  const [fee, setFee] = useState("");

  const [studentData, setStudentData] = useState();

  const [feeassign, setFeeassign] = useState("");

  const [feeassign1, setFeeassign1] = useState("");

  const [feeid, setFeeid] = useState("");

  const [paid, setPaid] = useState();

  const [classData, setClassData] = useState([]);

  const [addData, setAddData] = useState();

  const [returnData, setReturnData] = useState();

  const [printData, setPrintData] = useState();

  const [printSubData, setPrintSubData] = useState();

  const [feeDetails, setFeeDetails] = useState([]);

  const [hostelFees, setHostelFees] = useState([]);

  const [paymentdetails, setPaymentdetails] = useState([]);

  const printRef = useRef();

  const printRef2 = useRef();

  const PrintAll = useReactToPrint({
    content: () => printRef2.current,
  });

  const PrintRecipt = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrint = async (dd, ss) => {
    await setPrintData(dd);
    await setPrintSubData(ss);
    PrintRecipt();
  };

  const handlePrintAll = () => {
    document.getElementsByClassName("printAll")[0].style.display = "block";
    PrintAll();
    document.getElementsByClassName("printAll")[0].style.display = "none";
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

    const [data1, data2, data3, data4, data5] = await Promise.all([
      axios({
        ...config,
        url: `${FEE_DETAILS}?student_session_id=${searchParams.get(
          "student_session_id"
        )}`,
      })
        .then((res) => {
          setFeeData(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        }),
      axios({ ...config, url: `${ACADEMICS_ADD_CLASS}` })
        .then((res) => {
          setLoading(0);
          setClassData(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),
      axios({
        ...config,
        url: `${ACCOUNT_FEE_MASTER}?id=${searchParams.get("fee_id")}`,
      })
        .then((res) => {
          setLoading(0);
          setFeeDetails(res.data.data[0]);
          // setClassData(res.data.data)
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        }),
      axios({
        ...config,
        url: `${STUDENT_DETAILS}/${searchParams.get("student_id")}`,
      })
        .then((res) => {
          setLoading(0);
          setStudentData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      axios({
        ...config,
        url: `${ADDTRANSPORTFEE}?session_id=${
          params.id
        }&department_id=${searchParams.get(
          "department_id"
        )}&student_id=${searchParams.get("student_session_id")}`,
      })
        .then((res) => {
          setLoading(0);
          console.log("transport fees - ", res.data.data);
          setPaymentdetails(res.data.data[0].payment);
          setFeeid(res.data.data[0].id);
          setFeeassign(res.data.data[0].amount);
          setFeeassign1(res.data.data[0].amount);
          let y = res.data.data;
          for (let x in y) {
            y[x]["user_id"] = searchParams.get("student_id");
          }
          console.log("y - ", y);
          setHostelFees(res.data.data);
          setHostelFees(res.data.data);
          try {
            let sum = 0;
            for (var i = 0; i < res.data.data[0].payment.length; i++) {
              sum += parseInt(res.data.data[0].payment[i].payment_amount);
            }
            setPaid(sum);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({ ...config, url: EMPLOYEE_ALL })
        .then((res) => {
          setEmp(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = async () => {
    const obj = {
      student_id: searchParams.get("student_session_id"),
      session_id: params.id,
      amount: fee,
      department_id: searchParams.get("department_id"),
    };
    const config = {
      method: "post",
      url: ADDTRANSPORTFEE,
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    };
    setLoading(1);
    await axios(config)
      .then((res) => {
        console.log(res);
        setLoading(0);
        getData();
        setFee("");
        toast.success("Successfully added Transport Fee");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit1 = async () => {
    const obj = {
      amount: fee,
    };
    setLoading(1);
    const config = {
      method: "put",
      url: `${ADDTRANSPORTFEE}/${feeid}`,
      headers: {
        "Content-type": "application/json",
      },
      data: obj,
    };
    await axios(config)
      .then((res) => {
        console.log(res);
        setFee("");
        toast.success("SuccessFully Updated Transport Fees");
        setFeeassign("");
        getData();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="FeeCollectionAddFee">
      <TransportFeeModal setLoading={setLoading} reloadData={getData} />
      <TransportReturn
        setLoading={setLoading}
        reloadData={getData}
        feeid={feeid}
      />

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <TransportPrint
            mainData={hostelFees}
            empData={emp}
            subData={studentData}
            data={printData}
            // collegeId={collegeId}
            collegeOpt={collegeOpt}
            classId={searchParams.get("classId")}
            classData={classData}
            departmentData={departmentData}
          />
        </div>
      </div>

      <div className="main-content">
        <div className="page-content">
          <div className="container">
            {/* start page title */}
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar text-center">
                          <img
                            src={
                              feeData?.student?.student_picture
                                ? feeData?.student?.student_picture
                                : "https://bootdey.com/img/Content/avatar/avatar7.png"
                            }
                            class="img-fluid ml-auto"
                            alt="Maxwell Admin"
                            style={{ borderRadius: "50%", aspectRatio: "1/1" }}
                            width="50%"
                          />
                        </div>
                        <br />
                        <h5 className="user-name text-center">
                          {studentData?.name}
                        </h5>
                        <h6 className="user-email text-center">
                          {
                            classData?.find(
                              (s) => s.id === feeData?.student?.class_id
                            )?.name
                          }
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                        <hr />
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="fullName">Father Name</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="fullName"
                            value={studentData?.father_name}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="eMail">Email</label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            id="eMail"
                            value={studentData?.email}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="phone"
                            value={studentData?.phone}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="website">Category</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="class"
                            value={studentData?.caste}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="website">Admission Number</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="class"
                            value={studentData?.user_id}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="website">Gender</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="class"
                            value={studentData?.gender}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      {/* <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="website">Roll Number</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="class"
                      value={studentData?.user_id}
                      readOnly={true}
                    />
                  </div>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sessionStorage.getItem("role") != "CASHIER" ? (
              <div className="col-xl-12 mt-3 p-0 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row-gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Add Transport Fee</h6>
                        <hr />
                      </div>
                      <div className="col-xl-4 col-lg-3 d-flex col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="Fee">Fee</label>
                          <input
                            type="Number"
                            className="form-control form-control-sm"
                            min="0"
                            value={fee ? fee : feeassign ? feeassign : ""}
                            onChange={(e) => {
                              setFee(e.target.value);
                              setFeeassign("");
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          {feeassign1 ? (
                            <button
                              autocomplete="off"
                              onClick={() => submit1()}
                              className="btn btn-nex mt-4 ml-3 align-items-center items-center my-[2rem] btn-sm btn-rounded"
                              type="button"
                            >
                              Update Fee
                            </button>
                          ) : (
                            <button
                              autocomplete="off"
                              onClick={() => submit()}
                              className="btn items-center mt-4 ml-3 btn-nex mx-[1rem] my-[2rem] btn-sm btn-rounded"
                              type="button"
                            >
                              Add Fee
                            </button>
                          )}
                        </div>
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
                    <div className="col-md-4">
                      {" "}
                      <h4 className="card-title">Student Fee Details</h4>
                    </div>
                    <div className="col-md-8 ">
                      <button
                        className=" btn btn-nex float-right"
                        onClick={handlePrintAll}
                      >
                        Print All Receipts
                      </button>
                      {/* <span className="float-right">
                        <a href="#">
                          <i className="fa fa-file-pdf-o " aria-hidden="true" />
                        </a>{" "}
                        &nbsp;{" "}
                        <a href="#">
                          <i
                            className="fa fa-file-excel-o"
                            aria-hidden="true"
                          />
                        </a>{" "}
                      </span> */}
                    </div>
                  </div>
                  <hr />
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
                                  <td id="data2">Transport Fees</td>
                                  <td>31.08.2022</td>
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
                                        id="fire"
                                        data-toggle="modal"
                                        data-target="#addhostelfee"
                                        title="Collect Transport Fee"
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
                                    handlePrint={() => handlePrint(d, i)}
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
                              ₹{hostelFees[0]?.amount}+{" "}
                              <span className="text-danger">₹0 </span>
                            </th>
                            <th>₹{paid}</th>
                            <th colSpan={2}>₹ {parseInt(feeassign1) - paid}</th>
                          </tr>
                        </tfoot>
                        {/* <tr> <td colspan="9">
                                      <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                                      </tr> </td> </tbody> */}
                      </table>
                    </div>
                  </div>

                  {/* div used to print all Receipts */}
                  <div
                    className="printAll"
                    style={{ display: "none" }}
                    ref={printRef2}
                  >
                    <div className="container" style={{ padding: "20px" }}>
                      <div className="row">
                        <div className="col-sm-2">
                          <img
                            src="/assets/images/Nexenstial Logo.png"
                            alt=""
                            width={120}
                            className="ml-3"
                          />
                        </div>
                        <div className="col-sm-10">
                          <div
                            style={{ fontSize: "15px", textAlign: "center" }}
                          >
                            Swaminarayan University, Kalol
                          </div>
                          <div
                            style={{ textAlign: "center", fontSize: "17px" }}
                          >
                            {
                              collegeOpt?.find(
                                (s) => s.id == studentData?.college_id
                              )?.name
                            }
                          </div>
                          <div
                            style={{ textAlign: "center", fontSize: "17px" }}
                          >
                            Contact : +91 8908908908
                          </div>
                          <div
                            style={{ textAlign: "center", fontSize: "17px" }}
                          >
                            Email : info@Swaminarayanuniversity.ac.in
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 bg-dark py-2">
                        <div
                          className="col-sm-12"
                          style={{
                            fontSize: "15px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          RECEIPT{" "}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-12 row">
                          <div className="col-sm-6">
                            <div>
                              <b>Enrollment No: {hostelFees[0]?.user_id}</b>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            Name: {studentData?.name}
                          </div>
                          <div className="col-sm-6">
                            <div>
                              Department:{" "}
                              {
                                departmentData?.find(
                                  (s) => s.id == studentData?.department_id
                                )?.name
                              }
                            </div>
                            <div>Year : {hostelFees[0]?.year}</div>
                          </div>
                          <div className="col-sm-6">
                            <div>
                              Class :{" "}
                              {classData &&
                                classData.find(
                                  (s) => s.id == searchParams.get("classId")
                                )?.name}
                            </div>
                            <div>Session : {hostelFees[0]?.session_id}</div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive mb-0 mt-4">
                        <table
                          id="tech-companies-1"
                          className="table table-hovered text-wrap"
                          style={{ width: "100%" }}
                        >
                          <thead className="thead-dark">
                            <tr>
                              <td>
                                <b>Fee Name</b>
                              </td>
                              <td>
                                <b>Amount</b>
                              </td>
                              <td>
                                <b>Payment Id</b>
                              </td>
                              <td>
                                <b>Date</b>
                              </td>
                              <td>
                                <b>Collected By</b>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentdetails?.map((data, k) => (
                              <tr key={k}>
                                {k === 0 ? (
                                  <td rowSpan={paymentdetails.length}>
                                    Transport Fees
                                  </td>
                                ) : null}
                                <td>₹ {data?.payment_amount}</td>
                                <td>{data.id}</td>
                                <td>
                                  <p style={{ whiteSpace: "none" }}>
                                    {data?.date?.split("T")[0]}
                                  </p>
                                </td>
                                <td>
                                  {emp?.filter(
                                    (s) => s.id == data?.collected_by
                                  )[0]?.first_name +
                                  emp?.filter(
                                    (s) => s.id == data?.collected_by
                                  )[0]?.last_name
                                    ? emp?.filter(
                                        (s) => s.id == data?.collected_by
                                      )[0]?.first_name +
                                      emp?.filter(
                                        (s) => s.id == data?.collected_by
                                      )[0]?.last_name
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row mb-5">
                        <div className="col-sm-12 row">
                          <div className="col-9">Grand Total : ₹{paid}</div>
                        </div>
                        <div className="col-sm-12 row">
                          <div className="col-9">
                            In Words : {inWords(paid)} rupees only
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-sm-6 row float-right"
                        style={{ textAlign: "center" }}
                      >
                        <div className="col-sm-12">For Admin</div>
                        <hr />
                        <div className="col-sm-12">
                          <strong>Recievers Signature</strong>
                        </div>
                      </div>
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

export default AddTransportFee;
