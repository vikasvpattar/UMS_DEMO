import axios from "axios";
import React from "react";
import { useState } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import { REPORT_FEE_DETAILS, PAYMENT_SQL } from "../../../utils/Reports.apiConst";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { useRef } from "react";
import { EMPLOYEE_ALL } from "../../../utils/apiConstants";
import { college_title } from "../../../Data/main";
import { useEffect } from "react";
import Select from "react-select";

const ReportsBha1 = ({ setLoading }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [user, setUser] = useState({
    date: getCurrentDate(), // Set default value for "From Date"
    to_transaction_date: getCurrentDate(), // Set default value for "To Date"
    collected_by: "All",
    mode: "All",
  });

  const tableRef = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

  // const PrintRecipt = () => {
  //   const input = tableRef.current;

  //   html2canvas(input)
  //     .then((canvas) => {
  //       const pdf = new jsPDF('p', 'pt', 'a4');
  //       const imgData = canvas.toDataURL('image/png');

  //       pdf.addImage(imgData, 'PNG', 0, 0);
  //       pdf.save(filename || 'table.pdf');
  //     });
  // };

  const [data, setData] = useState([]);

  const [emp, setEmp] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the selected option is "All"
    if (name == "collected_by" && value == "") {
      const fromDate = user.date;
      const toDate = user.to_transaction_date;

      console.log(
        "Displaying data for all options and date range:",
        fromDate,
        toDate
      );
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getAllData = async () => {
    const config1 = {
      method: "get",
      url: `${EMPLOYEE_ALL}?status=ACTIVE`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {
        setEmp(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${REPORT_FEE_DETAILS}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}&collected_by=${user?.collected_by}&payment_mode=${user?.mode}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
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
      url: `${PAYMENT_SQL}?transaction_date=${user?.date}&to_transaction_date=${user?.to_transaction_date}&collected_by=${user?.collected_by}&payment_mode=${user?.mode}`,
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
            if(transactionsArray[i].transaction_id == paymentDetails[k].payment_id) {
              transactionsArray[i].collected_by = paymentDetails[k].collected_by;
              transactionsArray[i].note = paymentDetails[k].note;
            }
          }
        }
      }

      console.log('Transactions Array:', transactionsArray);
        setData(transactionsArray);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(0);
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  const handlePrint = () => {
    PrintRecipt();
  };

  const options =
    emp
      ?.filter((s) => s.role == "SUACC" || s.role == "CASHIER")
      ?.map((item) => ({
        value: item?.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })) || [];

  // Add the "All" option
  const allOption = { value: "All", label: "All" };
  const allOptions = [allOption, ...options];
  allOptions.push({
    label: "Student Portal",
    value: "Student",
  });

  const options1 = [
    {
      value: "CASH",
      label: "CASH",
    },
    {
      value: "Cheque",
      label: "Cheque",
    },
    {
      value: "UPI",
      label: "UPI",
    },
    {
      value: "Unified Payments",
      label: "Unified Payments",
    },
    {
      value: "Bank Transfer",
      label: "Bank Transfer",
    },
    {
      value: "Card",
      label: "Card",
    },
  ];

  const allOptions1 = [allOption, ...options1];

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
                  <h4 className="mb-0">FEE REPORTS DATE WISE</h4>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">Select Criteria</div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">From Date</label>
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
                      <label htmlFor="">To Date</label>
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
                      <label htmlFor="">Cashier</label>
                      {/* <select
                        type="text"
                        className="form-control"
                        name="collected_by"
                        value={user?.collected_by}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option value="">All</option>
                        {emp
                          ?.filter(
                            (s) => s.role == "SUACC" || s.role == "CASHIER"
                          )
                          ?.map((item, key) => {
                            return (
                              <option value={item?.id}>
                                {item?.first_name} {item?.last_name}
                              </option>
                            );
                          })}
                      </select> */}

                      {/* <Select
                        name="collected_by"
                        className="basic-single"
                        classNamePrefix="select"
                        value={
                          options.find((option) => option.value === user?.collected_by) || ""
                        }
                        onChange={(selectedOption) =>
                          handleChange({
                            target: { name: "collected_by", value: selectedOption.value },
                          })
                        }
                        options={options}
                      /> */}

                      <Select
                        name="collected_by"
                        className="basic-single"
                        classNamePrefix="select"
                        value={
                          allOptions.find(
                            (option) => option.value == user?.collected_by
                          ) || "All"
                        }
                        onChange={(selectedOption) =>
                          handleChange({
                            target: {
                              name: "collected_by",
                              value: selectedOption.value,
                            },
                          })
                        }
                        options={allOptions}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="">Payment Mode</label>
                      <Select
                        name="collected_by"
                        className="basic-single"
                        classNamePrefix="select"
                        value={
                          allOptions1.find(
                            (option) => option.value == user?.mode
                          ) || "All"
                        }
                        onChange={(selectedOption) =>
                          handleChange({
                            target: {
                              name: "mode",
                              value: selectedOption.value,
                            },
                          })
                        }
                        options={allOptions1}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary rounded-pill"
                        // onClick={getData}
                        onClick={getPaymentData}
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
                    <div className="card-title text-uppercase">
                      {" "}
                      DATE WISE Fee Reports
                    </div>
                    <button
                      className="btn btn-primary rounded-pill"
                      onClick={handlePrint}
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered" ref={tableRef}>
                        <th className="text-uppercase" colSpan={9}>
                          DATE WISE Fee Reports
                        </th>
                        <tr>
                          <th colSpan={9}>{college_title}</th>
                        </tr>
                        <tr>
                          <th colSpan={9}>
                            Date : {user?.date} to {user?.to_transaction_date}
                          </th>
                        </tr>
                        <tr>
                          <th>Sl.No</th>
                          {/* <th>Date </th> */}
                          <th>Student Name</th>
                          <th>Enrollment No.</th>
                          <th>Transaction Id</th>
                          <th>Payment Type</th>
                          <th>Date</th>
                          <th>Note</th>
                          <th className="text-center">Collected By</th>

                          <th className="text-right">Amount (in Rs.)</th>
                        </tr>

                        {data && data?.length != 0 ? (
                          data?.filter((s) => user.collected_by == "All" || s?.collected_by == user.collected_by)
                          ?.filter((s) => user.mode == "All" || s?.transactions[0]?.payment_type == user.mode)?.map((i, key) => (
                            <tr>
                              <td>{key+1}</td>
                              <td>{i?.transactions[0]?.name}</td>
                              <td>{i?.transactions[0]?.usn}</td>
                              <td>{i?.transaction_id}</td>
                              <td>{i?.transactions[0]?.payment_type}</td>
                              <td>{i?.transactions[0]?.transaction_date}</td>
                              <td>{i?.note}</td>
                              <td>{emp.find((s) => s.id == i?.collected_by)?.first_name} {emp.find((s) => s.id == i?.collected_by)?.last_name}</td>
                              <td className="text-right">{parseInt(i?.transactions[0]?.amount)?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10}>
                              <Nodata />
                            </td>
                          </tr>
                        )}

                        {data && data?.length != 0 ? (
                          <tr>
                            <th colSpan={8} className="text-right">
                              Grand Total :
                            </th>
                            <th className="text-right">
                              <strong>
                              {data?.filter((s) => !user.collected_by || user.collected_by == "All" || s?.collected_by == user.collected_by)
                              ?.filter((s) => !user.mode || user.mode == "All" || s?.transactions[0]?.payment_type == user.mode)?.reduce((acc, current) => 
                                acc + (parseInt(current?.transactions[0]?.amount) || 0), 0)?.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0})
                              }
                              </strong>
                            </th>
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

export default ReportsBha1;
