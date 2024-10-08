import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ModalAddFee from "../../../modals/Accounts/FeeCollection/ModalAddFee";
import ModalCollectFee from "../../../modals/Accounts/FeeCollection/ModalCollectFee";
import ModalReturnFee from "../../../modals/Accounts/FeeCollection/ModalReturnFee";
import AddOtherFee from "../../../modals/Fee/AddOtherFee";
import { PREVIOUS_YEAR_DUE_FEES } from "../../../utils/fees.apiConst";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import { ACCOUNT_FEE_MASTER } from "../../../utils/Accounts.apiConst";
import { FEE_DETAILS } from "../../../utils/fees.apiConst";
import FeeCollectionPaymentRow from "./FeeCollectionPaymentRow";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import FeeCollectionFeeReciept from "./FeeCollectionFeeReciept";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../../utils/LocalStorageConstants";
import {
  STUDENT_ADVANCE_PAY,
  STUDENT_SESSION,
} from "../../../utils/apiConstants";

const FeeCollectionAddFee = ({ setLoading, collegeId }) => {
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

  useEffect(() => {
    setCollegeOpt(getCollegeData());
  }, [localStorage.getItem(LOCAL_COLLEGE)]);

  useEffect(() => {
    setDepartmentData(getDepartmentData());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  const [feeData, setFeeData] = useState();

  const [classData, setClassData] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const [show, setShow] = useState(false);
  const [addData, setAddData] = useState();

  const [returnData, setReturnData] = useState();

  const [selectedArr, setSelectedArr] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const [printData, setPrintData] = useState();

  const [printSubData, setPrintSubData] = useState();

  const [feeDetails, setFeeDetails] = useState([]);

  const [adv, setAdv] = useState([]);

  const [sessionData, setSessionData] = useState([]);

  const [prevdata, setPrevdata] = useState([]);

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

    const [data1, data2, data3, data4, data5, data6, data7] = await Promise.all(
      [
        await axios({
          ...config,
          url: `${FEE_DETAILS}?student_session_id=${params.id}&status=${
            searchParams.get("getInactive") == 1 ? "INACTIVE" : "ACTIVE"
          }`,
        })
          .then((res) => {
            console.log("Main", res.data.data);
            setFeeData(res.data.data[0]);
          })
          .catch((err) => {
            console.log(err);
            // toast.error('Something wentwrong')
          }),
        axios({ ...config, url: `${ACADEMICS_ADD_CLASS}` })
          .then((res) => {
            setLoading(0);
            setClassData(res.data.data);
          })
          .catch((err) => {
            setLoading(0);
            console.log(err);
            // toast.error('Something wentwrong')
          }),
        axios({
          ...config,
          url: `${ACCOUNT_FEE_MASTER}?id=${searchParams.get("fee_id")}`,
        })
          .then((res) => {
            setLoading(0);
            setFeeDetails(res.data.data[0]);
          })
          .catch((err) => {
            setLoading(0);
            console.log(err);
            // toast.error('Something wentwrong')
          }),

        await axios({
          ...config,
          url: `${PREVIOUS_YEAR_DUE_FEES}?student_id=${searchParams.get(
            "student_id"
          )}`,
        })
          .then((res) => {
            setPrevdata(res.data.data);
            for (let i = 0; i < res.data.data.length; i++) {
              if (
                res.data.data[i].balance > 0 &&
                searchParams.get("session_id") != res.data.data[i].session
              ) {
                setShow(true);
                break;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          }),

        axios({
          ...config,
          url: `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`,
        })
          .then((res) => {
            setSemesterOpt(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          }),

        await axios({
          ...config,
          url: `${STUDENT_ADVANCE_PAY}?session_id=${params.id}`,
        })
          .then((res) => {
            console.log(res.data.data);
            setAdv(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          }),

        await axios({
          ...config,
          url: `${STUDENT_SESSION}?studentID=${params.id}`,
        })
          .then((res) => {
            console.log("Session Data", res.data.data);
            setSessionData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          }),
      ]
    );
  };

  const handleSelectedArr = (e, eid) => {
    if (e.target.checked == false) {
      if (selectedArr.length == 0) return;
      if (selectedArr.length == 1) {
        setSelectedArr([]);
        return;
      }
      const d = [];
      for (let index = 0; index < selectedArr.length; index++) {
        if (eid !== selectedArr[index]) {
          d.push(selectedArr[index]);
          // setSelectAll(false)
          // setSelectedArr([...d])
        }
      }
      setSelectedArr(d);
    }
    if (e.target.checked == true) {
      setSelectedArr([...selectedArr, eid]);
    }
  };

  useEffect(() => {
    if (selectAll == true) {
      if (feeData?.feeDetails?.length != 0) {
        setSelectedArr(feeData?.feeDetails?.map((i) => i?.fee_type_id));
      }
    } else {
      setSelectedArr([]);
    }
  }, [selectAll]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="FeeCollectionAddFee">
      {!feeData ? null : (
        <>
          <AddOtherFee
            setLoading={setLoading}
            getData1={getData}
            mainData={feeData?.feeDetails}
            collegeId={collegeId}
            session={searchParams.get("session_id")}
            class_id={searchParams.get("class_id")}
          />
          <ModalAddFee
            data={addData}
            mainData={feeData}
            setLoading={setLoading}
            reloadData={getData}
            discount={feeDetails?.fee_discount_details}
            collegeId={collegeId}
          />
          <ModalReturnFee
            data={returnData}
            mainData={feeData}
            reloadData={getData}
            setLoading={setLoading}
            collegeId={collegeId}
          />
          <ModalCollectFee
            mainData={feeData}
            selectedArr={selectedArr}
            setLoading={setLoading}
            reloadData={getData}
            collegeId={collegeId}
          />
          <div style={{ display: "none" }}>
            <div ref={printRef}>
              <FeeCollectionFeeReciept
                mainData={feeData}
                data={printData}
                subData={printSubData}
                collegeId={collegeId}
                collegeOpt={collegeOpt}
                classData={classData}
                departmentData={departmentData}
              />
            </div>
          </div>
        </>
      )}

      <div className="main-content">
        <div className="page-content">
          <div className="container">
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
                <h4 className="mb-0">Student List</h4>
              </div>
            </div>
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
                            calss="img-fluid ml-auto"
                            alt="Maxwell Admin"
                            style={{ borderRadius: "50%", aspectRatio: "1/1" }}
                            width="50%"
                          />
                        </div>
                        <br />
                        <h5 className="user-name text-center">
                          {feeData?.student?.name}
                        </h5>
                        <h6 className="user-email text-center">
                          {
                            classData?.find(
                              (s) => s.id == feeData?.student?.class_id
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
                            value={feeData?.student?.father_name}
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
                            value={feeData?.student?.email}
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
                            value={feeData?.student?.phone}
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
                            value={feeData?.student?.caste}
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
                            value={feeData?.student?.id}
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

              {prevdata.length > 1 && show ? (
                <div className="col-xl-12 mt-3 p-0 col-lg-9 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row-gutters">
                        <div className="card-title">
                          Previous Year Academic Due Fees
                        </div>
                      </div>
                      <div className="table-rep-plugin">
                        <div className="table-responsive mb-0">
                          <table className="table table-hovered text-wrap">
                            <thead>
                              <tr>
                                <th>Year</th>
                                <th>Class</th>
                                <th>Semester</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Due Amount</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prevdata &&
                                prevdata.map((item, key) => {
                                  if (
                                    item?.session !=
                                      searchParams.get("session_id") &&
                                    item?.balance > 0
                                  ) {
                                    return (
                                      <tr>
                                        <td>{item?.session}</td>
                                        <td>
                                          {
                                            classData?.find(
                                              (s) => s.id == item?.class_id
                                            )?.name
                                          }
                                        </td>
                                        <td>
                                          {
                                            semesterOpt?.find(
                                              (s) => s.id == item?.semester_id
                                            )?.name
                                          }
                                        </td>
                                        <td>{item?.total}</td>
                                        <td>{item?.paid}</td>
                                        <td>{item?.balance}</td>
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

              {adv.length > 1 ? (
                <div className="col-xl-12 mt-3 p-0 col-lg-9 col-md-12 col-sm-12 col-12">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="row-gutters">
                        <div className="card-title">
                          Advance Payment Details
                        </div>
                      </div>
                      <div className="table-rep-plugin">
                        <div className="table-responsive mb-0">
                          <table className="table table-hovered text-wrap">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Fee Id</th>
                                <th>Session</th>
                                <th>Class</th>
                                <th>Semester</th>
                                <th>Type</th>
                                <th>Mode</th>
                                <th>Amount</th>
                                <th>Note</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {adv &&
                                adv.map((item, key) => {
                                  return (
                                    <tr>
                                      <td>{item?.date?.split("T")[0]}</td>
                                      <td>{item?.fee_id}</td>
                                      <td>
                                        {sessionData[0]?.data?.session_id}
                                      </td>
                                      <td>
                                        {
                                          classData?.find(
                                            (s) =>
                                              s.id ==
                                              sessionData[0]?.data?.class_id
                                          )?.name
                                        }
                                      </td>
                                      <td>
                                        {
                                          semesterOpt?.find(
                                            (s) =>
                                              s.id ==
                                              sessionData[0]?.semesterData[0]
                                                ?.semester_id
                                          )?.name
                                        }
                                      </td>
                                      <td>{item?.type}</td>
                                      <td>{item?.mode}</td>
                                      <td>{item?.amount}</td>
                                      <td>{item?.note}</td>
                                      <td>
                                        <p className="badge badge-success">
                                          Paid
                                        </p>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
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
                      {sessionStorage.getItem("role") != "CASHIER" ? (
                        <span className="float-right">
                          <button
                            data-toggle="modal"
                            data-target="#otherfee"
                            className="btn btn-sm btn-rounded btn-nex"
                          >
                            Add Other Fees
                          </button>
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <hr />
                  {selectedArr.length != 0 && (
                    <div className="row">
                      <div className="col-md-12 mb-4 ">
                        {/* <a class="btn btn-nex btn-sm" href="javascript:void(0)" > <i class="fa fa-print"></i> Print Selected</a> */}
                        <button
                          className="btn btn-warning btn-sm"
                          data-toggle="modal"
                          data-target="#collectfee"
                          onclick=" collectselectedfee()"
                        >
                          {" "}
                          <i className="fa fa-money" /> Collect Selected
                        </button>
                      </div>
                    </div>
                  )}
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
                            <th>
                              {" "}
                              <input
                                type="checkbox"
                                name="select-all"
                                id="select-all"
                                onChange={(e) => setSelectAll((prev) => !prev)}
                              />
                            </th>
                            <th> Fee Group</th>
                            <th>Fee Code</th>
                            <th>Due Date</th>
                            <th>status</th>
                            <th>Amount</th>
                            <th>Payment ID</th>
                            <th>Mode</th>
                            <th
                              className="text-center"
                              style={{ minWidth: "150px" }}
                            >
                              Date
                            </th>
                            <th>Discounts</th>
                            <th>Fine</th>
                            <th>Paid</th>
                            <th>Balance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeData?.feeDetails &&
                            feeData?.feeDetails?.map((i, key) => (
                              <>
                                <tr key={key}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name="checked[]"
                                      id="checked2"
                                      checked={
                                        selectedArr?.find(
                                          (s) => s == i?.fee_type_id
                                        )
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        handleSelectedArr(e, i?.fee_type_id);
                                      }}
                                    />
                                  </td>
                                  <td id="data1">
                                    {feeData?.student?.fee_group}
                                  </td>
                                  <td id="data2">{i?.fee_type_name}</td>
                                  <td>31.08.2022</td>
                                  <td>
                                    {i?.paid_amount == 0 ? (
                                      <p className="badge badge-danger">
                                        Unpaid
                                      </p>
                                    ) : i?.paid_amount + i?.discount_amount ==
                                      i?.amount ? (
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
                                  <td> ₹ {i?.discount_amount} </td>
                                  <td>₹ 0 </td>
                                  <td>₹{i?.paid_amount}</td>
                                  <td>
                                    ₹
                                    {i?.amount -
                                      i?.paid_amount -
                                      i?.discount_amount}
                                  </td>
                                  <td width="220px">
                                    {" "}
                                    {i?.paid_amount + i?.discount_amount ==
                                      i?.amount &&
                                    sessionStorage.getItem("role") !=
                                      "CASHIER" ? (
                                      <a
                                        href=""
                                        className="badge badge-light "
                                        id="fire"
                                        data-toggle="modal"
                                        data-target="#return"
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
                                    ) : i?.paid_amount + i?.discount_amount !=
                                      i?.amount ? (
                                      <a
                                        href=""
                                        className="badge badge-light "
                                        id="fire"
                                        data-toggle="modal"
                                        data-target="#addfee"
                                        title="Add Fee"
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
                                {i?.payment_details.map((d, k) => (
                                  <FeeCollectionPaymentRow
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
                            <th colSpan={5}>
                              <p className="float-right">Grand Total Amount</p>
                            </th>
                            <th colSpan={4}>
                              ₹{feeData?.feeData?.amount}+{" "}
                              <span className="text-danger">₹0 </span>
                            </th>
                            <th>{feeData?.feeData?.discount_amount}</th>
                            <th>₹0</th>
                            <th>₹{feeData?.feeData?.paid_amount}</th>
                            <th colSpan={2}>
                              ₹ {feeData?.feeData?.pending_amount}
                            </th>
                          </tr>
                        </tfoot>
                        {/* <tr> <td colspan="9">
                                      <div align="center" class="text-danger">No data available in table <br> <br><img src="assets/images/addnewitem.svg" width="150"><br><br> <span class="text-success bolds"><i class="fa fa-arrow-left"></i> Add new record or search with different criteria.</span><div></div></div>
                                      </tr> </td> </tbody> */}
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

export default FeeCollectionAddFee;
