import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Nodata from "../../../Components/NoData/Nodata";
import { useNavigate } from "react-router-dom";
import { ADVANCE_PAYMENT_DATE_WISE } from "../../../utils/apiConstants";
import { STUDENTS_LIST, STUDENT_SESSION } from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import {
  ACADEMICS_ADD_CLASS,
  ACADEMICS_ADD_SECTION,
  ACADEMICS_ADD_SEMESTER,
} from "../../../utils/Academics.apiConst";
import AdvanceFeeReciept from "../../Accounts/FeeCollection/AdvancePayFeeCollection";

const AdvancePayment = ({ setLoading, collegeId }) => {
  const [user, setUser] = useState({
    from_date: new Date().toISOString().split("T")[0],
    to_date: new Date().toISOString().split("T")[0],
  });

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  const date = new Date().toISOString().split("T")[0];

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [data2, setData2] = useState([]);

  const [a, setA] = useState([]);

  const [classOpt, setClassOpt] = useState([]);

  const [sectionOpt, setSectionOpt] = useState([]);

  const [semesterOpt, setSemesterOpt] = useState([]);

  const navigate = useNavigate();

  const tableRef = useRef();
  const printRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const PrintRecipt1 = useReactToPrint({
    content: () => printRef.current,
  });

  const getAllData = async () => {
    setLoading(1);
    const config1 = {
      method: "get",
      url: STUDENTS_LIST + "?status=active",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config1)
      .then((res) => {
        setData1(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
        url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
      })
        .then((res) => {
          setClassOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),

      await axios({
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
        url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}`,
      })
        .then((res) => {
          setSectionOpt(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
    setLoading(0);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${ADVANCE_PAYMENT_DATE_WISE}?from_date=${user?.from_date}&to_date=${user?.to_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  useEffect(() => {
    getData();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrint = async (i) => {
    setLoading(1);
    let x = [];
    x.push(i);
    await setA(x);
    const config = {
      method: "get",
      url: `${STUDENT_SESSION}?student_id=${i?.user_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(async (res) => {
        console.log(res.data.data);
        await setData2(res.data.data);
        PrintRecipt1();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-content">
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <AdvanceFeeReciept
            mainData={data2[0]?.data}
            studentInfo={data2[0]?.studentInfo}
            data={a}
            collegeId={data2[0]?.studentInfo?.college_id}
            collegeOpt={collegeOpt}
            classData={classOpt}
            class_id={data2[0]?.data?.class_id}
            departmentData={department}
          />
        </div>
      </div>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
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
                <h4 className="mb-0">ADVANCE FEE REPORTS DATE WISE</h4>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="card-title">Select Criteria</div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      name="from_date"
                      onChange={handleChange}
                      className="form-control"
                      value={user?.from_date ? user?.from_date : date}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      name="to_date"
                      onChange={handleChange}
                      className="form-control"
                      value={user?.to_date ? user?.to_date : date}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary rounded-pill"
                      onClick={getData}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <div className="card-title">Fee Reports</div>
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={PrintRecipt}
                  >
                    Export
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-bordered" ref={tableRef}>
                      <tr>
                        <th colSpan={7}>Date : {user?.date}</th>
                      </tr>
                      <tr>
                        <th>Sl.No</th>
                        <th>Name</th>
                        <th>Enrollment No</th>
                        <th>Transaction Id</th>
                        <th>Payment Type</th>
                        <th>Note</th>
                        <th>Amount</th>
                        <th>Collected By</th>
                        <th>Print</th>
                      </tr>

                      {data && data?.length != 0 ? (
                        data?.map((i, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>
                                {data1 &&
                                  data1?.filter(
                                    (s) => s.user_id == i?.user_id
                                  )[0]?.name}
                              </td>
                              <td>{i?.user_id}</td>
                              <td>{i?.fee_id}</td>
                              <td>{i?.mode}</td>
                              <td>{i?.note}</td>
                              <td>{i?.amount}</td>
                              <td>{i?.collector_name}</td>
                              <td>
                                <a
                                  href="javascript:void(0)"
                                  className="badge badge-light"
                                  data-toggle="tooltip"
                                  title=""
                                  data-original-title="Print"
                                  onClick={() => handlePrint(i)}
                                >
                                  {" "}
                                  <i className="fa fa-print" />{" "}
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={10}>
                            <Nodata />
                          </td>
                        </tr>
                      )}

                      {data && data?.length != 0 ? (
                        <tr>
                          <td colSpan={7}>
                            <div className="d-flex justify-content-end">
                              Grand Total &nbsp;&nbsp;: &nbsp;&nbsp;
                              <strong>
                                {data?.reduce(
                                  (acc, current) => acc + current?.amount,
                                  0
                                )}
                              </strong>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancePayment;
