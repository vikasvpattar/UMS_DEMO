import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_COLLEGE } from '../../../utils/LocalStorageConstants';
import { REPORT_CANCELLED_RECEIPTS_DETAILS } from '../../../utils/Reports.apiConst';
import { EMPLOYEE_ALL, STUDENT_DETAILS } from '../../../utils/apiConstants';
import { STUDENT_INFO_GET } from '../../../utils/InfoUploadingApiConstants';
import Nodata from '../../../Components/NoData/Nodata';

function CancelledReceipts({ setLoading }) {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [user, setUser] = useState({
        fromDate: getCurrentDate(), // Set default value for "From Date"
        toDate: getCurrentDate(), // Set default value for "To Date"
    });

    const getCollegeData = () => {
        return localStorage.getItem(LOCAL_COLLEGE)
          ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
          : null;
    };
    
    const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

    const handleChange = (e) => {
        const { name, value } = e.target;    
        
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
       
    };

    const getData = async () => {
        

        if (user?.fromDate && user?.toDate && new Date(user?.toDate) < new Date(user?.fromDate)) {
            toast.error("To Date cannot be earlier than From Date");
            return;
        }

        setLoading(1);

        const config = {
          method: "get",
          url: `${REPORT_CANCELLED_RECEIPTS_DETAILS}?fromDate=${user?.fromDate}&toDate=${user?.toDate}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        };
    
        await axios(config)
          .then((res) => {
            setData(res.data.data);
            console.log("data -",res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(0);
      };

      const getstudentData = async () => {
        setLoading(1);
        const config = {
          method: "get",
          url: `${STUDENT_INFO_GET}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        };
    
        await axios(config)
          .then((res) => {
            setData2(res.data.data);
            // const studData = res.data.data.filter(element => element.status == "INACTIVE" && element.status == "ACTIVE");
            // studData.sort((a, b) => b.id - a.id);
            // console.log(res.data.data);
            // setData2(studData);
            console.log("data2 -",data2);
          })
          .catch((err) => {
            console.log(err);
          });

          const config2 = {
            method: "get",
            url: `${EMPLOYEE_ALL}`,
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
          };
      
          await axios(config2)
            .then((res) => {
              setData3(res.data.data);
              console.log("data3 -",res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });

        setLoading(0);
      };
    
      useEffect(() => {
        getData();
      }, []);

      useEffect(() => {
        getstudentData();
      }, []);


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
                                <h4 className="mb-0"> CANCELLED RECEIPTS REPORT </h4>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">

                            <div className="card-title"> Select Criteria </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="">From Date
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="fromDate"
                                            onChange={handleChange}
                                            className="form-control"
                                            value={user?.fromDate}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="">To Date
                                          <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="toDate"
                                            onChange={handleChange}
                                            className="form-control"
                                            value={user?.toDate}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-10 ml-5">
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={getData}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">

                                                <table className="table table-bordered">

                                                    <thead>
                                                        <th className="text-uppercase text-center" colSpan={9}>
                                                            DATE WISE CANCELLED RECEIPTS REPORTS
                                                        </th>
                                                        <tr>
                                                            <th colSpan={9}>
                                                            Date : {user?.fromDate} to {user?.toDate}
                                                            </th>
                                                        </tr>
                                                        <tr className="bg-dark text-light">
                                                            <th>Sl.No.</th>
                                                            <th>Student Name</th>
                                                            <th>Enrollment No</th>
                                                            <th>Transaction Id</th>
                                                            <th>Payment Type</th>
                                                            <th>Date</th>
                                                            <th>Amount</th>
                                                            <th>Note</th>
                                                            <th>Collected By</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                    {data && data?.length != 0 ? (
                                                        data?.map((item, key) => {
                                                            const paymentDetails = JSON.parse(item?.data1[0].payment_details);
                                                            const collectedBy = paymentDetails[0].collected_by;
                                                            const note = paymentDetails ? paymentDetails[0].note : null;
                                                        return (
                                                        <tr>
                                                            <td>{key + 1}</td>
                                                            <td>{item?.data2[0].name}</td>
                                                            <td>{item?.usn}</td>
                                                            <td>{item?.transaction_id}</td>
                                                            <td>{item?.type}</td>
                                                            <td>{item?.transaction_date}</td>
                                                            <td>{item?.amount}</td>
                                                            <td>{note}</td>
                                                            {/* <td>{JSON.parse(item.data1[0].payment_details)[0].collected_by}</td> */}
                                                            <td>
                                                              {
                                                                data3?.find(
                                                                  (s) => s.id == collectedBy
                                                                )?.first_name
                                                              }
                                                              {' '}
                                                              {
                                                                data3?.find(
                                                                  (s) => s.id == collectedBy
                                                                )?.last_name
                                                              }
                                                            </td>
                                                        </tr>
                                                        )})
                                                        ) : (
                                                         <tr>
                                                           <td colSpan={10}>
                                                             <Nodata/>
                                                           </td>
                                                         </tr>
                                                        )}
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
      
    </div>
  )
}

export default CancelledReceipts;
