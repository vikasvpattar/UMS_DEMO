import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import { TRANSPORT_DATE_WISE } from "../../../utils/Reports.apiConst";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import {
  LOCAL_DEPARTMENT,
  LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import { college_title } from "../../../Data/main";
import Select from "react-select";

const DateWiseTransportFees = ({ setLoading, collegeId }) => {
  const date = new Date().toISOString().split("T")[0];

  const [user, setUser] = useState({
    date: date,
    to_transaction_date: date,
  });

  const getCollegeData = () => {
    return localStorage.getItem(LOCAL_COLLEGE)
      ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
      : null;
  };

  const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

  // const [faculty1, setFaculty1] = useState("");
  const [faculty1, setFaculty1] = useState({ value: "", label: "ALL" });
  // const [faculty1, setFaculty1] = useState("ALL");

  const [selectedFaculty, setSelectedFaculty] = useState("");

  const [department, setDepartment] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  const [tableRows, setTableRows] = useState(<></>);

  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const getData = async () => {
  //   console.log(user);
  //   setLoading(1);
  //   const config = {
  //     method: "get",
  //     url: `${TRANSPORT_DATE_WISE}?from_date=${user?.date}&to_date=${user?.to_transaction_date}&college_id=${faculty1}`,
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((res) => {
  //       res.data.data.data?.sort((a, b) => {
  //         let arr1 = a.transaction_id.split("/");
  //         let arr2 = b.transaction_id.split("/");
  //         return (
  //           parseInt(arr1[arr1.length - 1]) - parseInt(arr2[arr2.length - 1])
  //         );
  //       });
  //       setSelectedFaculty(faculty1);
  //       if (faculty1) {
  //         setData(
  //           res.data.data.data.filter((item) => item.faculty == faculty1)
  //         );
  //       } else {
  //         setData(res.data.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setLoading(0);
  // };

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${TRANSPORT_DATE_WISE}?from_date=${user?.date}&to_date=${user?.to_transaction_date}&college_id=${faculty1.value}`,  // Use faculty1.value instead of faculty1
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
  
    await axios(config)
      .then((res) => {
        res.data.data.data?.sort((a, b) => {
          let arr1 = a.transaction_id.split("/");
          let arr2 = b.transaction_id.split("/");
          return (
            parseInt(arr1[arr1.length - 1]) - parseInt(arr2[arr2.length - 1])
          );
        });
        setSelectedFaculty(faculty1.value);  // Use faculty1.value instead of faculty1
        if (faculty1.value) {
          setData(
            res.data.data.data.filter((item) => item.faculty === faculty1.value)
          );
        } else {
          setData(res.data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePrint = () => {
    PrintRecipt();
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  useEffect(() => {
    let x = data.filter((item) => item.faculty == faculty1);
    setData(x);
  }, [faculty1]);

  const formatDate = (dateString) => {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString; // return as is if not in expected format
  };

  useEffect(()=> {
    const sortedData = data.slice().sort((a, b) => {
      return a.transaction_id.localeCompare(b.transaction_id);
    });
    setTableRows(sortedData.map((i, key) => ( 
    <>
      {/* <tr key={key}> */}
        <td>{key + 1}</td>
        <td>{i?.date && formatDate(i?.date)}</td>
        <td>{i?.name}</td>
        <td>{i?.usn}</td>
        <td>
          {
            collegeOpt?.filter((s) => s.id == i?.faculty)[0]?.name
          }
        </td>
        <td>
          {
            department?.filter((s) => s.id == i?.department)[0]?.name
          }
        </td>
        <td>{i?.transaction_id}</td>
        <td>{i?.payment_type}</td>
        <td>{i?.note}</td>
        <td className="text-right">{i?.amount}</td>
      {/* </tr> */}
      </>
    )));
  },[data]);

  const options = collegeOpt?.map((i) => ({ value: i.id, label: i.name })) || [];

  useEffect(() => {
    getData();
  }, []);

  const handleFacultyChange = (selectedOption) => {
    if (selectedOption.value == "") {
      console.log("Fetching data for all options and date range");
      setFaculty1({ value: "", label: "ALL" });
    } else {
      setFaculty1(selectedOption);
    }
  };

  return (
    <div>
      <div className="main-content">
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
                  <h4 className="mb-0">TRANSPORT FEE REPORTS DATE WISE</h4>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">Select Criteria</div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Faculty</label>
                      {/* <select
                        name="faculty1"
                        value={faculty1}
                        onChange={(e) => {
                          setFaculty1(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value="">ALL</option>
                        {collegeOpt?.map((i, key) => (
                          <option value={i.id} key={key}>
                            {i.name}
                          </option>
                        ))}
                      </select> */}

                      <Select
                        name="faculty1"
                        className="basic-single"
                        classNamePrefix="select"
                        value={faculty1}
                        onChange={handleFacultyChange}
                        options={[{ value: "", label: "ALL" }, ...options]}
                      />
        
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Date</label>
                      <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.date ? user?.date : date}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Date</label>
                      <input
                        type="date"
                        name="to_transaction_date"
                        onChange={handleChange}
                        className="form-control"
                        value={
                          user?.to_transaction_date
                            ? user?.to_transaction_date
                            : date
                        }
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
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-12 ">
                    {/* <div className="card-title">TRANSPORT FEE REPORTS DATE WISE</div> */}
                    <button
                      className="btn float-right btn-primary rounded-pill"
                      onClick={onDownload}
                    >
                      EXCEL
                    </button>
                    <button
                      className="btn float-right mr-2 btn-primary rounded-pill"
                      onClick={handlePrint}
                    >
                      Pdf
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered" ref={tableRef}>
                        <tr>
                          <th colSpan={10} className="text-center">
                            {" "}
                            DATE WISE TRANSPORT FEE REPORT{" "}
                          </th>
                        </tr>
                        <tr>
                          <th colSpan={10}>{college_title}</th>
                        </tr>
                        <tr>
                          <th colSpan={10}>
                            Date : {user?.date} to {user?.to_transaction_date}
                          </th>
                        </tr>
                        <tr>
                          <th>Sl.No</th>
                          <th>Date</th>
                          <th>Student Name</th>
                          <th>Enrollment No.</th>
                          <th>Faculty</th>
                          <th>Department</th>
                          <th>Transaction Id</th>
                          <th>Payment Type</th>
                          <th>Note</th>
                          <th className="text-right">Amount</th>
                        </tr>

                        {data && data?.length != 0 ? (
                          data?.map((i, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{key + 1}</td>
                                  {/* <td>{i?.date}</td> */}
                                  <td>{i?.date && formatDate(i?.date)}</td>
                                  <td>{i?.name}</td>
                                  <td>{i?.usn}</td>
                                  <td>
                                    {
                                      collegeOpt?.filter(
                                        (s) => s.id == i?.faculty
                                      )[0]?.name
                                    }
                                  </td>
                                  <td>
                                    {
                                      department?.filter(
                                        (s) => s.id == i?.department
                                      )[0]?.name
                                    }
                                  </td>
                                  <td>{i?.transaction_id}</td>
                                  <td>{i?.payment_type}</td>
                                  <td>{i?.note}</td>

                                  <td className="text-right">{i?.amount}</td>
                                </tr>
                              </>
                            );
                          })
                          // {tableRows}
                        ) : (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        )}

                        {data && data?.length != 0 ? (
                          <tr>
                            <td colSpan={10}>
                              <div className="d-flex justify-content-end">
                                Grand Total &nbsp;&nbsp;: &nbsp;&nbsp;
                                <strong>
                                  {data?.reduce(
                                    (acc, current) =>
                                      acc + parseInt(current?.amount),
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
    </div>
  );
};

export default DateWiseTransportFees;
