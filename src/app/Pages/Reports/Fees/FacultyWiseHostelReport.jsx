import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Nodata from "../../../Components/NoData/Nodata";
import * as XLSX from "xlsx/xlsx.mjs";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { LOCAL_COLLEGE } from "../../../utils/LocalStorageConstants";
import { feeJsonData } from "../../../Data/jsonData/Fee/FeeJsonData";
import { useDownloadExcel } from "react-export-table-to-excel";
import { GET_HOSTELFEES_FACULTY_WISE } from "../../../utils/Hostel.apiConst";
import { toast } from "react-toastify";
import { college_title } from "../../../Data/main";

const FacultyWiseHostelReport = ({ setLoading }) => {
  // const [user, setUser] = useState({
  //   date: "",
  //   to_transaction_date: "",
  // });

  const [user, setUser] = useState({
    date: new Date().toISOString().split('T')[0], // Set to current date
    to_transaction_date: new Date().toISOString().split('T')[0], // Set to current date
  });

  const tableRef = useRef();

  const collegeList = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const [data, setData] = useState([]);

  const [total, setTotal] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    if (!user?.date || !user?.to_transaction_date) {
      toast.error("Please Enter all Details");
      return;
    }
    setLoading(1);
    const config = {
      method: "get",
      url: `${GET_HOSTELFEES_FACULTY_WISE}?from=${user?.date}&to=${user?.to_transaction_date}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((res) => {
        res.data.data.forEach((element) => {
          let j = Object.keys(element)[0];
          element[j]?.forEach((i) => {
            console.log(i);
            if (i.mode == "CASH") {
              i.mode = "Cash";
            }
          });
        });
        let data1 = {};
        res.data.data.forEach((element) => {
          let j = Object.keys(element)[0];
          element[j]?.forEach((i) => {
            if (data1[i?.mode]) {
              data1[i?.mode].amount += parseInt(i?.amount);
            } else {
              data1[i?.mode] = {
                mode: i?.mode,
                amount: parseInt(i?.amount),
              };
            }
          });
        });
        let data2 = Object.values(data1);
        console.log(data2);
        setTotal(data2);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  const tableRef1 = useRef();

  const PrintRecipt = useReactToPrint({
    content: () => tableRef.current,
  });

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

  const downloadExcel = () => {
    let json_data = [];

    Object.keys(data).map((i, key) => {
      const obj = {
        "College Name": collegeList?.find((s) => s?.id == i)?.name,
        Amount: data[i]?.reduce(
          (acc, current) => acc + Number(current.amount),
          0
        ),
      };
      json_data.push(obj);
    });
    var worksheet = XLSX.utils.json_to_sheet(json_data);
    worksheet.wrire(0, 0, "THis is chk");
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `SUKALOL-Fee Details.xlsx`);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  return (
    <div>
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
                    <h4 className="mb-0">HOSTEL FEE REPORTS COLLEGE WISE</h4>
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
                      <div className="card-title">
                        {" "}
                        Faculty Wise Hostel Fee Reports
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
                            <td colSpan={10}>{college_title}</td>
                          </tr>
                          <tr>
                            <td colSpan={10}>Date : {user?.date}</td>
                          </tr>
                          <tr>
                            <th>Sl.No</th>
                            <th>College Name</th>
                            <th colSpan={7} className="text-center">
                              Mode
                            </th>
                            <th>Amount</th>
                          </tr>
                          <tr>
                            <th></th>
                            <th></th>
                            {feeJsonData.map((i, key) => (
                              <th>{i.name}</th>
                            ))}
                            <th></th>
                          </tr>
                          <tbody>
                            {data &&
                              data?.map((item, key) => {
                                let clg = Object.keys(item)[0];
                                return (
                                  <>
                                    <tr>
                                      <td>{key + 1}</td>
                                      <td>
                                        {
                                          collegeList.find((s) => s.id == clg)
                                            ?.name
                                        }
                                      </td>
                                      {feeJsonData?.map((i, k) => {
                                        return (
                                          <>
                                            <td>
                                              {item[clg]?.filter(
                                                (s) => s.mode == i?.id
                                              )[0]?.amount
                                                ? item[clg]?.filter(
                                                    (s) => s.mode == i?.id
                                                  )[0]?.amount
                                                : "-"}
                                            </td>
                                          </>
                                        );
                                      })}
                                      <td>
                                        {item[clg]?.reduce(
                                          (acc, it) => acc + it.amount,
                                          0
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            <tr>
                              <td></td>
                              <td>
                                <h5>Total</h5>
                              </td>
                              {feeJsonData &&
                                feeJsonData?.map((item, key) => {
                                  return (
                                    <>
                                      <td>
                                        {
                                          total?.find((s) => s.mode == item?.id)
                                            ?.amount
                                        }
                                      </td>
                                    </>
                                  );
                                })}
                              <td>
                                {total.reduce((acc, it) => acc + it.amount, 0)}
                              </td>
                            </tr>
                          </tbody>
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
    </div>
  );
};

export default FacultyWiseHostelReport;
