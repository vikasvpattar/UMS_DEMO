import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { REPORT_FEE_DETAILS , PAYMENT_COLLEGE_WISE_SQL} from "../../../utils/Reports.apiConst";
import * as XLSX from "xlsx/xlsx.mjs";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  LOCAL_COLLEGE,
  LOCAL_DEPARTMENT,
} from "../../../utils/LocalStorageConstants";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import { college_title } from "../../../Data/main";

const CollegeWiseCollectionReport = ({ collegeId, setLoading }) => {
  const doc = new jsPDF();

  // const [user, setUser] = useState({
  //   date: "",
  //   to_transaction_date: "",
  // });

  const [user, setUser] = useState({
    date: new Date().toISOString().split('T')[0], // Set to current date
    to_transaction_date: new Date().toISOString().split('T')[0], // Set to current date
  });

  const [clg, setClg] = useState("");
  const [clgid, setClgid] = useState();

  const departmentData = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT));

  const [data3, setData3] = useState([]);

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

  let clgname;
  const getCollege = () => {
    let clgid1 = localStorage.getItem("clg");
    let colleges = JSON.parse(localStorage.getItem("COLLEGE"));
    clgname = colleges && colleges.find((s) => s.id == clgid1)?.code;
    console.log(clgname);
    setClg(clgname);
  };

  useEffect(() => {
    getCollege();
  }, []);

  const tableRef = useRef();

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [all, setAll] = useState("all");

  const [studentSet, setStudentSet] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getData = async () => {
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
      .then(async (res) => {
        console.log("main Data", res.data.data);
        setData(res.data.data);
        let id;
        for (var i = 0; i < res.data.data.length; i++) {
          for (var j = 0; j < res.data.data[i].newAmount.length; j++) {
            if (res.data.data[i].newAmount[j].payment_id.slice(4, 7) == clg) {
              id = res.data.data[i].collegeId;
              break;
            }
          }
        }
        setClgid(id);
        console.log(clgid);
        const stdSet = new Set();
        for (const i of res.data.data) {
          stdSet.add(i?.department_id);
        }
        console.log("stdSet", stdSet);
        const stdArr = Array.from(stdSet);
        setStudentSet(stdArr);
        change();
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
      url: `${PAYMENT_COLLEGE_WISE_SQL}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}&college_id=${collegeId}`,
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


  // useEffect(() => {
  //   getData();
  // }, []);


  const collegeList1 = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const tableRef1 = useRef();


  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = () => {
    PrintRecipt();
  };

  const downloadExcel = () => {
    let json_data = [];
    for (const iterator of data) {
      const obj = {
        "Student Registeration Number": iterator?.usn,
        "Student Name": iterator?.name,
        // "College Name":collegeOpt?.find(s=>s.id==collegeId)?.name+'-SUKALOL',
        // "Academic Year":sessionOpt?.find(s=>s?.id==user?.session_id)?.name,
        // "Department" :departmentOpt?.find(s=>s.id==user?.department_id)?.name ,
        // "Class":classOpt?.find(s=>s?.id==user?.class_id)?.name ,
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

  const change = async (e) => {
    if (e) {
      await setAll(e.target.value);
    }

    let data2 = [];
    for (var i = 0; i < departmentData.length; i++) {
      if (departmentData[i].college_id == clgid) {
        data2.push(departmentData[i]);
      }
    }
    setData3(data2);
    let x = [];
    for (var i = 0; i < data3.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].department_id == data3[i].id) {
          var sum = 0;
          for (var k = 0; k < data[j].newAmount.length; k++) {
            sum += data[j].newAmount[k].amount;
          }
          x.push({
            id: data3[i].id,
            name: data3[i].name,
            amount: sum,
          });
        }
      }
    }

    const resultArray = [];
    const amounts = {};

    await x.forEach((item) => {
      if (amounts[item.name]) {
        amounts[item.name].amount += item.amount;
      } else {
        amounts[item.name] = { id: item.id, amount: item.amount };
      }
    });

    for (const name in amounts) {
      resultArray.push({
        id: amounts[name].id,
        name: name,
        amount: amounts[name].amount,
      });
    }
    console.log(resultArray);
    setData1(resultArray);
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await document.querySelector("#pdf");
    pdf.html(data).then(() => {
      pdf.save("CollegeWiseCollectionReport.pdf");
    });
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
                  <h4 className="mb-0">COLLEGE AND DATE WISE FEE REPORTS</h4>
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

                  {/*
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Select Type</label>
                      <select
                        onChange={(e) => {
                          change(e);
                          setAll(e.target.value);
                        }}
                        defaultValue=""
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>
                */}
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
            <div className="card" id="pdf">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <div className="card-title">
                      COLLEGE AND DATE WISE FEE REPORTS
                    </div>
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

export default CollegeWiseCollectionReport;
