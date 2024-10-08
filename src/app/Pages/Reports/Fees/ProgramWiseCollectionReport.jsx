import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import { REPORT_FEE_DETAILS , PAYMENT_PROGRAM_WISE_SQL} from "../../../utils/Reports.apiConst";
import * as XLSX from "xlsx/xlsx.mjs";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import { toast } from "react-toastify";
import { college_title } from "../../../Data/main";
import Select from "react-select";

const ProgramWiseCollectionReport = ({ setLoading, collegeId }) => {
  const [user, setUser] = useState({
    date: new Date().toISOString().split('T')[0], // Set to current date
    to_transaction_date: new Date().toISOString().split('T')[0], // Set to current date
  });

  let count = 0;

  const tableRef = useRef();

  let amount = 0;

  const [data, setData] = useState([]);

  const [dates, setDates] = useState([]);

  const [program, setProgram] = useState("");
  const [selectedprogram, setSelectedProgram] = useState("");

  const programData = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));
  const facultyData = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));
  const departmentData = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));

  const [studentSet, setStudentSet] = useState([]);

  const navigate = useNavigate();
  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    catch(err) {
      console.log(err);
      return dateString;
    }
  }

  const handlePrint = () => {
    PrintRecipt();
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
    if (!program) return toast.error("Please Select Program");
    setLoading(1);
    const config = {
      method: "get",
      url: `${REPORT_FEE_DETAILS}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        const m = res.data.data.filter(
          (s) => s?.program_id == program && s?.collegeId == collegeId
        );

        const result = [];

        setData(m);
        const stdSet = new Set();
        for (const i of m) {
          stdSet.add(i?.department_id);
        }

        const stdArr = Array.from(stdSet);
        setStudentSet(stdArr);

        stdArr?.map((item, key) => {
          m?.filter((s) => s.department_id == item)?.map((item1, key1) => {
            let y = result.find((s) => s.department_id == item1?.department_id);
            if (y) {
              item1?.newAmount?.map((item2, key) => {
                let z = y.nestedArray.find((s) => s.date == item2?.date);
                if (z) {
                  y.nestedArray.find((s) => s.date == item2?.date).total +=
                    item2?.amount;
                } else {
                  result
                    .find((s) => s.department_id == item1?.department_id)
                    .nestedArray.push({
                      date: item2?.date,
                      total: item2?.amount,
                    });
                }
              });
            } else {
              result.push({
                department_id: item1.department_id,
                nestedArray: [
                  {
                    date: item1?.newAmount[0]?.date,
                    total: item1?.newAmount[0]?.amount,
                  },
                ],
              });
            }
          });
        });
        console.log(result);
        setDates(result);
        setSelectedProgram(program);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  };

  const getPaymentData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${PAYMENT_PROGRAM_WISE_SQL}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}&program_id=${program}&college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log('payment data - ', res.data.data);
        let tempData = res.data.data;
        const groupedTransactions = tempData.reduce((acc, curr) => {
          if (!acc[curr.transaction_id]) {
              acc[curr.transaction_id] = [];
          }
          acc[curr.transaction_id].push(curr);
          return acc;
      }, {});
      
      const transactionsArray = Object.keys(groupedTransactions).map(transactionId => ({
          transaction_id: transactionId,
          transactions: groupedTransactions[transactionId]
      }));

      for(let i in transactionsArray) {
        for(let j in transactionsArray[i].transactions) {
          let paymentDetails = JSON.parse(transactionsArray[i].transactions[j].payment_details);
          for(let k in paymentDetails) {
            if(transactionsArray[i].transaction_id == paymentDetails[k]?.payment_id) {
              transactionsArray[i].collected_by = paymentDetails[k]?.collected_by;
              transactionsArray[i].note = paymentDetails[k]?.note;
              transactionsArray[i].amount = paymentDetails[k]?.amount;
              transactionsArray[i].dept_id = transactionsArray[i]?.transactions[j]?.department_id;
            }
          }
        }
      }

      console.log('Transactions Array:', transactionsArray);

      const deptTransactions = transactionsArray.reduce((acc, curr) => {
        if (!acc[curr.dept_id]) {
            acc[curr.dept_id] = [];
            
        }
        acc[curr.dept_id].push(curr);

        return acc;
    }, {});

    const deptData = Object.keys(deptTransactions).map(dept_id => ({
      dept_id: dept_id,
      transactions: deptTransactions[dept_id]
  }));

    for(let i in deptData) {
      deptData[i].sum = 0;
      for(let j in deptData[i].transactions) {
        deptData[i].sum = deptData[i].sum + parseInt(deptData[i].transactions[j].amount);
      }
    }

    console.log('dept data - ', deptData);
      
      setData(deptData);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  }

  const collegeList1 = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const downloadExcel = () => {
    let json_data = [];
    for (const iterator of data) {
      const obj = {
        "Student Registeration Number": iterator?.usn,
        "Student Name": iterator?.name,
        Amount: iterator?.amount,
        "Transaction Id": iterator?.transaction_id,
        "Transaction Type": iterator?.type,
      };
      json_data.push(obj);
    }
    var worksheet = XLSX.utils.json_to_sheet(json_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `SUKALOL-Fee Details.xlsx`);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const options = programData?.map((i) => ({ value: i.id, label: i.name })) || [];

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
                  <h4 className="mb-0">PROGRAM AND DATE WISE FEE REPORTS</h4>
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
                        name="date"
                        onChange={handleChange}
                        className="form-control"
                        value={user?.date}
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
                        value={user?.to_transaction_date}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Program</label>
                      {/* <select
                        type="date"
                        name="to_transaction_date"
                        onChange={(e) => setProgram(e.target.value)}
                        className="form-control"
                        value={program}
                      >
                        <option value="">Select Program</option>
                        {programData?.map((i, key) => (
                          <option key={key} value={i?.id}>
                            {i?.name}
                          </option>
                        ))}
                      </select> */}

                      <Select
                        name="program"
                        className="basic-single"
                        classNamePrefix="select"
                        value={options.find((option) => option.value == program) || ""}
                        onChange={(selectedOption) => setProgram(selectedOption.value)}
                        options={options}
                        placeholder="Select Program"
                      />

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-nex"
                        onClick={getPaymentData}
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
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <div className="card-title">Fee Reports</div>
                    <div className="col-md-6">
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
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                    <table className="table table-bordered" ref={tableRef}>
                        <tr>
                          <th colSpan={8}>{college_title}</th>
                        </tr>
                        <tr>
                          <th>Sl.No</th>
                          <th>Student Name</th>
                          <th>Enrollment No.</th>
                          <th>Transaction Id</th>
                          <th>Payment Type</th>
                          <th>Date</th>
                          <th>Note</th>
                          <th className="text-right">Amount</th>
                        </tr>

                        {data?.map((i,k) => {
                          return (<>
                            <tr>
                              <td colSpan={7} className="bg-dark text-white">
                                {departmentData?.find((s) => s.id == i?.dept_id)?.name}
                              </td>
                              <td className="bg-dark text-white text-right">
                                {i?.sum?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})}
                              </td>
                            </tr>
                            {i?.transactions?.map((j,key) => {
                              return (<tr>
                                <td>{key+1}</td>
                                <td>{j?.transactions[0]?.name}</td>
                                <td>{j?.transactions[0]?.usn}</td>
                                <td>{j?.transaction_id}</td>
                                <td>{j?.transactions[0]?.payment_type}</td>
                                <td>{formatDate(j?.transactions[0]?.transaction_date)}</td>
                                <td>{j?.note}</td>
                                <td className="text-right">{parseInt(j?.transactions[0]?.amount)?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})}</td>
                              </tr>)
                            })}
                        
                          </>)
                        })}

                        {data && data?.length != 0 ? (
                          <tr>
                            <td colSpan={8}>
                              <div
                                className="d-flex justify-content-end"
                                style={{ paddingRight: "auto" }}
                              >
                                Grand Total &nbsp;&nbsp;: &nbsp;&nbsp;
                                <strong>
                                {data?.reduce((acc, current) => 
                                acc + (parseInt(current?.sum) || 0), 0)?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})
                              }
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

export default ProgramWiseCollectionReport;
