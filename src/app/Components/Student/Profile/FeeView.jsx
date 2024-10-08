import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { FEE_DETAILS, FEE_DETAILS_BY_STUDENT_ID, FEE_DETAILS_BY_STUDENT_ID_VIEW } from '../../../utils/fees.apiConst'
import {
    TRANSPORT_ROUTE,
    PICKUP_POINTS,
    GET_ASSIGNED_PICKUPPOINTS,
  } from "../../../utils/Transport.apiConst";
import { STUDENT_SESSION } from "../../../utils/apiConstants";
import { ADDTRANSPORTFEE } from "../../../utils/fees.apiConst";
import { update } from "lodash";

import { ADDHOSTELFEE1 } from "../../../utils/fees.apiConst";

const FeeView = ({id, setLoading}) => {
    const [feeType, setFeeType] = useState("Academic");
    const [studentSessions, setStudentSessions] = useState([]);
    const [feeData, setFeeData] = useState([]);
    const [feeData2, setFeeData2] = useState([]);

    const [feeToBeCollected, setFeeToBeCollected] = useState("");
    const [paidFee, setPaidFee] = useState(0);
    const [pendingFee, setPendingFee] = useState(0);
    const [currPaidFee, setCurrPaidFee] = useState(0);
    const [currPendingFee, setCurrPendingFee] = useState(0);

    const [transportFeeToBeCollected, setTransportFeeToBeCollected] = useState("");
    const [transportPaidFee, setTransportPaidFee] = useState(0);
    const [transportPendingFee, setTransportPendingFee] = useState(0);
    const [transportCurrPaidFee, setTransportCurrPaidFee] = useState(0);
    const [transportCurrPendingFee, setTransportCurrPendingFee] = useState(0);

    const [hostelFeeToBeCollected, setHostelFeeToBeCollected] = useState("");
    const [hostelPaidFee, setHostelPaidFee] = useState(0);
    const [hostelPendingFee, setHostelPendingFee] = useState(0);
    const [hostelCurrPaidFee, setHostelCurrPaidFee] = useState(0);
    const [hostelCurrPendingFee, setHostelCurrPendingFee] = useState(0);

    const [session, setSession] = useState("");
    const [data, setData] = useState([]);
    const [transportdata, setTransportData] = useState([]);
    const [transportTotal, setTransportTotal] = useState([]);
    const [paid, setPaid] = useState();
    const [routeData, setRouteData] = useState();
    const [pickuppointData1, setPickuppointData1] = useState([]);
    const [pickuppointData, setPickuppointData] = useState([]);

    const [hostelData, setHostelData] = useState([]);
    const [hostelTotal, setHostelTotal] = useState([]);

    console.log(feeData);

    async function getFeeData() {
        setLoading(1)
        const config = {
        method:'get',
        url:`${FEE_DETAILS_BY_STUDENT_ID}/${id}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
        },
        }
        
        await axios(config)
        .then(res=>{
            setLoading(0)
            console.log('fee data 1 - ', res.data.data);
            let temp = [];
            for(let i in res.data.data) {
                temp.push(res.data.data[i].session_id);
            }
            console.log('sessions - ', temp);
            setStudentSessions(temp);
            setFeeData(res.data.data);
        })
        .catch(err=>{
        setLoading(0)
        toast.error('Something went wrong')
        })

        console.log('hi');
        const config1 = {
            method:'get',
            url:`${FEE_DETAILS_BY_STUDENT_ID_VIEW}/${id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }
        setLoading(1);
        await axios(config1)
        .then(res=>{
        setLoading(0);
        console.log('fee data 2 - ', res.data.data);
        setFeeData2(res.data.data)
        })
        .catch(err=>{
        setLoading(0)
        toast.error('Something went wrong')
        })
    }

    const setFeeValues = () => {
        console.log("feeData",feeData)
        let amount = 0;
        let paid = 0;
        let currPaid=0,currPending=0;
        feeData?.map((value, idx) => {
            amount = amount + value.amount;
            paid = paid + value.paid_amount;
            currPaid = feeData[feeData.length-1]?.paid_amount;
            currPending = feeData[feeData.length-1]?.amount - feeData[feeData.length-1]?.paid_amount;
        });

        feeData2?.filter((s) => !studentSessions.includes(s.session_id)).map((i,key)=> {
            console.log('hihi');
            amount = amount + i.amount;
            currPending = currPending + i.amount;
        });

        const formattedAmount = amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
          });
        setFeeToBeCollected(formattedAmount);

        const formattedPaid = paid.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
          });
        setPaidFee(formattedPaid);

        const formattedPending = (amount-paid).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
          });
        setPendingFee(formattedPending);

        const formattedCurrPaid = (currPaid).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
          });
          setCurrPaidFee(formattedCurrPaid);
        
        const formattedCurrPending = (currPending).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
          });
        setCurrPendingFee(formattedCurrPending);
    }

    let x;

    const getTransportFeeData = async () => {
    
        setLoading(1);
        const config = {
          method: "get",
          url: `${STUDENT_SESSION}?session_id=${session}&student_id=${id}&transport=1&route_id=${""}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        };
    
        await axios(config)
          .then((res) => {
            console.log("Gender Data", res.data.data);
            setData(res.data.data);
            x =
              res.data.data &&
              res.data.data.filter((s) => s.user_id == id);

            setLoading(0);
          })
          .catch((err) => {
            console.log(err);
            setLoading(0);
            //toast.error("Something went wrong");
          });

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
            url: `${TRANSPORT_ROUTE}?college_id=${""}`,
        })
            .then((res) => {
            console.log(res.data.data);
            console.log("Route data - ", res.data.data);
            setRouteData(res.data.data);
            })
            .catch((err) => {
            console.log(err);
            });
        
            await axios({
                ...config1,
                url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${""}`,
              })
                .then((res) => {
                  setLoading(0);
                  console.log(res.data.data);
                  console.log("pickup points - ", res.data.data);
                  setPickuppointData1(res.data.data);
                })
                .catch((err) => {
                  setLoading(0);
                  //toast.error("Something went wrong");
                });
                setLoading(1);
              await axios({
                ...config1,
                url: `${PICKUP_POINTS}?college_id=${""}`,
              })
                .then((res) => {
                  setLoading(0);
                  console.log(res.data.data);
                  console.log("pickup point data names - ", res.data.data);
                  setPickuppointData(res.data.data);
                })
                .catch((err) => {
                  setLoading(0);
                  //toast.error("Something went wrong");
                });
            setLoading(0);
            let url1;
        
            id
            ? (url1 = `${ADDTRANSPORTFEE}?session_id=${session}&student_id=${x[0]?.student_session_id}&route_id=${""}&pickuppoint_id=${""}`)
            : (url1 = `${ADDTRANSPORTFEE}?session_id=${session}&route_id=${""}&pickuppoint_id=${""}`);
            
            setLoading(1);
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
                console.log("Transport Data -", res.data.data);
                setTransportData(res.data.data);
                // let amount = [];
                // try {
                // for (var i = 0; i < res.data.data.length; i++) {
                //     let sum = 0;
                //     for (var j = 0; j < res.data.data[i].payment.length; j++) {
                //     sum += parseInt(res.data.data[i].payment[j].payment_amount);
                //     }
                //     amount.push({
                //     id: res.data.data[i].student_id,
                //     amt: sum,
                //     });
                // }
                // setPaid(amount);
                // } catch (err) {
                // console.log(err);
                // }
            })
            .catch((err) => {
                setLoading(0);
                console.log(err);
                //toast.error("Something went wrong");
            });
        setLoading(0);
        // try {
        //   const pickupPointsResponse = await axios({
        //     method: "get",
        //     url: `${GET_ASSIGNED_PICKUPPOINTS}?college_id=${""}&route_id=${""}`, /////////////////////////////////////////
        //     headers: {
        //       Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        //       "Content-Type": "application/json",
        //     },
        //   });
    
        //   setPickuppointData1(pickupPointsResponse.data.data);
        //   console.log("pickup point data - ", pickupPointsResponse.data.data);
        //   setLoading(0);
        // } catch (error) {
        //   console.error("Error fetching pickup points data:", error);
        //   toast.error("Something went wrong while fetching pickup points data");
        // }
    };


    const getHostelFeeData = async() => {
        let main = [];
        setLoading(1);
        console.log("hi1");
        // const config = {
        // method: "get",
        // url: `${STUDENT_SESSION}?session_id=${session}&student_id=${id}&hostel=1`,
        // headers: {
        //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        //     "Content-Type": "application/json",
        // },
        // };
        // await axios(config)
        // .then((res) => {
        //     main = res.data.data;
        //     // setHostelData(res.data.data);
        //     console.log("DATA - ",res.data.data);
        //     x =
        //     res.data.data &&
        //     res.data.data.filter((s) => s.data.student_id == id);
        // })
        // .catch((err) => {
        //     console.log("hi1 end");
        //     console.log(err);
        //     setLoading(0);
        //     toast.error("Something went wrong");
        // });

        let url1;

        id
        ? (url1 = `${ADDHOSTELFEE1}?student_id=${id}&college_id=${""}`)
        : (url1 = `${ADDHOSTELFEE1}?session_id=${session}&college_id=${""}`);

        console.log("HI2");
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
            console.log("Hostel data - ", res.data.data);
            setHostelData(res.data.data);
            // if (faculty) {
            // let xyz = main?.filter(
            //     (s) =>
            //     s.data.student_id ==
            //         res.data.data?.find((t) => t.user_id == s.data.student_id)
            //         ?.user_id ||
            //     (s.studentInfo.college_id == faculty && s.data.is_hostel == 1)
            // );

            // }
        //     let amount = [];
        //     try {
        //     for (var i = 0; i < res.data.data.length; i++) {
        //         let sum = 0;
        //         for (var j = 0; j < res.data.data[i].payment.length; j++) {
        //         sum += parseInt(res.data.data[i]?.payment[j]?.payment_amount);
        //         }
        //         amount.push({
        //         id: res.data.data[i].student_id,
        //         amt: sum,
        //         });
        //     }
        //     setPaid(amount);
        //     } catch (err) {
        //     console.log(err);
        //     }
        })
        .catch((err) => {
            console.log("hi2 end");
            setLoading(0);
            console.log(err);
            // toast.error("Something went wrong");
        });
  };

  
  const handleSearch = async () => {
    if (!session) {
    //   toast.error("Please Enter Required Details");
      return;
    }
    let main = [];
    setLoading(1);
    // const config = {
    //   method: "get",
    //   url: `${STUDENT_SESSION}?session_id=${session}&student_id=${id}&hostel=1`,
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //     "Content-Type": "application/json",
    //   },
    // };
    // await axios(config)
    //   .then((res) => {
    //     main = res.data.data;
    //     console.log("data1 - ", res.data.data);
    //     setHostelData(res.data.data);
    //     console.log("DATA - ",res.data.data);
    //     x =
    //       res.data.data &&
    //       res.data.data.filter((s) => s.user_id == id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(0);
    //     // toast.error("Something went wrong");
    //   });

    let url1;

    id
      ? (url1 = `${ADDHOSTELFEE1}?session_id=${session}&student_id=${id}&college_id=${""}`)
      : (url1 = `${ADDHOSTELFEE1}?session_id=${session}&college_id=${""}`);

    if(id) {

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
        console.log("Hostel data - ", res.data.data);
        setHostelData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        // toast.error("Something went wrong");
      });
    }
  };

    useEffect(()=>{
        getFeeData();
        getTransportFeeData();
        // handleSearch();
        // getHostelFeeData();
    },[]);

    useEffect(()=>{
        setFeeValues();
        console.log("id", id);
        setSession(feeData[0]?.session_id);
        handleSearch();
    },[feeData]);

    useEffect(()=> {
        setFeeValues();
    },[feeData2]);

    useEffect(()=> {
        let newData = []
        const updatedData = transportdata?.map((value,idx) => {
            let amt = 0;
            value.payment?.map((v,index)=> {
                amt = amt + parseInt(v.payment_amount);
            })
            return { ...value, total: amt};
        })
        console.log("updated transport data - ", updatedData);
        setTransportTotal(updatedData);
        // handleSearch();
    },[transportdata]);

    useEffect(()=> {
        let newData = []
        const updatedData = hostelData?.map((value,idx) => {
            let amt = 0;
            value.payment?.map((v,index)=> {
                amt = amt + parseInt(v.payment_amount);
            })
            return { ...value, total: amt};
        })
        console.log("updated hostel data - ", updatedData);
        setHostelTotal(updatedData);
    },[hostelData]);

    useEffect(()=> {
        let feeCollected = 0;
        let paid = 0;
        let bal = 0;
        let currPaid=0;
        let currBal=0;
        transportTotal?.map((i,key)=>{
            feeCollected = feeCollected + parseInt(i.amount);
            paid = paid +  i.total;
            bal = bal + (i.amount - i.total);
        })
        currPaid = transportTotal?[transportTotal.length-1].total:0;
        currBal = transportTotal?[transportTotal.length-1].amount:0 - transportTotal?[transportTotal.length-1].total:0;
        setTransportCurrPaidFee(currPaid);
        setTransportCurrPendingFee(currBal);
        setTransportFeeToBeCollected(feeCollected);
        setTransportCurrPaidFee(paid);
        setTransportCurrPendingFee(bal);
        console.log('transport total - ', transportTotal);
    },[transportTotal]);

    useEffect(()=> {
        let feeCollected = 0;
        let paid = 0;
        let bal = 0;
        let currPaid=0;
        let currBal=0;
        hostelTotal?.map((i,key)=>{
            feeCollected = feeCollected + parseInt(i.amount);
            paid = paid +  i.total;
            bal = bal + (i.amount - i.total);
        })
        currPaid = hostelTotal?[hostelTotal.length-1].total:0;
        currBal = hostelTotal?[hostelTotal.length-1].amount:0 - hostelTotal?[hostelTotal.length-1].total:0;
        setHostelCurrPaidFee(currPaid);
        setHostelCurrPendingFee(currBal);
        setHostelFeeToBeCollected(feeCollected);
        setHostelCurrPaidFee(paid);
        setHostelCurrPendingFee(bal);
        console.log('hostel total - ', hostelTotal);
    },[hostelTotal]);

    if(feeType === "Academic" && (feeData.length !== 0 || feeData2.length !== 0)) return (
        <div>
            <div className="pt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Academic" && "active"}`}
                         onClick={() => setFeeType("Academic")}
                        >Academic</a>
                        
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Hostel" && "active"}`}
                        onClick={() => setFeeType("Hostel")}
                        >Hostel</a>
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Transport" && "active"}`}
                        onClick={() => setFeeType("Transport")}
                        >Trasport</a>
                    </li>     
                </ul>
            </div>
            <div className="d-flex justify-content-between pt-3">
                <div className="card mx-3">
                    <div className="card-body p-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{currPaidFee}</p>
                        <hr className="bg-success my-1" style={{ height: '2px'}} />
                        <p className="text-success pl-2 small">Current Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-warning" style={{ fontSize: '1.2em' }}>{currPendingFee}</p>
                        <hr className="bg-warning my-1" style={{ height: '2px'}} />
                        <p className="text-warning pl-2 small">Current Pending Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-primary" style={{ fontSize: '1.2em' }}>{feeToBeCollected}</p>
                        <hr className="bg-primary my-1 mt-0" style={{ height: '2px'}} />
                        <p className="text-primary pl-2 small">Fees to be Collected</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{paidFee}</p>
                        <hr className="bg-success my-1" style={{ height: '2px' }} />
                        <p className="text-success pl-2 small">Total Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-danger" style={{ fontSize: '1.2em' }}>{pendingFee}</p>
                        <hr className="bg-danger my-1" style={{ height: '2px' }} />
                        <p className="text-danger pl-2 small">Total Pending Amount</p>
                    </div>
                </div>
                
            </div>
            <div className='StudentFee'>
                <div className="row">
                    <div className="col-12 table-responsive">
                    <table className="table table-bordered nowrap overflow-auto">
                            <thead>
                                <tr>
                                    <th>Academic Year</th>
                                    <th>Class</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                feeData?.map((i,key)=>(
                                <tr>
                                    <td>{i?.session_id}</td>
                                    <td>{i?.class}</td>
                                    <td>{i?.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{(i?.amount - i?.paid_amount)?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i?.paid_amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>
                                        <span className={`badge badge-soft-${i?.amount - i?.paid_amount == 0 ? 'success' :i?.paid_amount == 0?'danger':'warning'}`}>
                                            {i?.amount - i?.paid_amount == 0 ? 'Paid' :i?.paid_amount == 0?'Not Paid':'partial'}
                                        </span> 
                                    </td>
                                </tr>
                                ))
                            }
                            {
                                feeData2?.filter((s) => !studentSessions.includes(s.session_id)).map((i,key)=>(
                                    <tr>
                                        <td>{i?.session_id}</td>
                                        <td>{i?.class}</td>
                                        <td>{i?.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>{i?.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                        <td>₹0</td>
                                        <td>
                                            <span className={`badge badge-soft-danger`}>
                                                Not Paid
                                            </span> 
                                        </td>
                                    </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
        else if(feeType === "Transport" && transportTotal.length !== 0) return(
            <div>
            <div className="pt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Academic" && "active"}`}
                         onClick={() => setFeeType("Academic")}
                        >Academic</a>
                        
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Hostel" && "active"}`}
                        onClick={() => setFeeType("Hostel")}
                        >Hostel</a>
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Transport" && "active"}`}
                        onClick={() => setFeeType("Transport")}
                        >Trasport</a>
                    </li>     
                </ul>
            </div>
            <div className="d-flex justify-content-between pt-3">
                <div className="card mx-3">
                    <div className="card-body p-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{transportCurrPaidFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-success my-1" style={{ height: '2px'}} />
                        <p className="text-success pl-2 small">Current Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-warning" style={{ fontSize: '1.2em' }}>{transportCurrPendingFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-warning my-1" style={{ height: '2px'}} />
                        <p className="text-warning pl-2 small">Current Pending Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-primary" style={{ fontSize: '1.2em' }}>{transportFeeToBeCollected.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-primary my-1" style={{ height: '2px'}} />
                        <p className="text-primary pl-2 small">Fees to be Collected</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{transportCurrPaidFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-success my-1" style={{ height: '2px' }} />
                        <p className="text-success pl-2 small">Total Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-danger" style={{ fontSize: '1.2em' }}>{transportCurrPendingFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-danger my-1" style={{ height: '2px' }} />
                        <p className="text-danger pl-2 small">Total Pending Amount</p>
                    </div>
                </div>
                
            </div>
            <div className='StudentFee'>
                <div className="row">
                    <div className="col-12 table-responsive">
                    <table className="table table-bordered nowrap overflow-auto">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Academic Year</th>
                                    <th>Route</th>
                                    <th>Pickup Point</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                transportTotal.map((i,key)=>(
                                <tr>
                                    <td>{key+1}</td>
                                    <td>{i?.session_id}</td>
                                    <td>{routeData?.find(obj => obj.id == i.route_id)?.title}</td>
                                    <td>{pickuppointData?.find(obj => obj.id == i.pickuppoint_id)?.name}</td>
                                    <td>{i.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{(i.amount - i.total)?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i.total?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>
                                        <span className={`badge badge-soft-${i.amount - i.total == 0 ? 'success' :i?.total == 0?'danger':'warning'}`}>
                                            {i.amount - i.total == 0 ? 'Paid' :i?.total == 0?'Not Paid':'partial'}
                                        </span> 
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>            
        )
        else if(feeType === "Hostel" && hostelTotal.length !== 0) return (
            <div>
            <div className="pt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Academic" && "active"}`}
                         onClick={() => setFeeType("Academic")}
                        >Academic</a>
                        
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Hostel" && "active"}`}
                        onClick={() => setFeeType("Hostel")}
                        >Hostel</a>
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Transport" && "active"}`}
                        onClick={() => setFeeType("Transport")}
                        >Trasport</a>
                    </li>     
                </ul>
            </div>
            <div className="d-flex justify-content-between pt-3">
                <div className="card mx-3">
                    <div className="card-body p-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{hostelCurrPaidFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-success my-1" style={{ height: '2px'}} />
                        <p className="text-success pl-2 small">Current Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-warning" style={{ fontSize: '1.2em' }}>{hostelCurrPendingFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-warning my-1" style={{ height: '2px'}} />
                        <p className="text-warning pl-2 small">Current Pending Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-primary" style={{ fontSize: '1.2em' }}>{hostelFeeToBeCollected.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-primary my-1 mt-0" style={{ height: '2px'}} />
                        <p className="text-primary pl-2 small">Fees to be Collected</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-success" style={{ fontSize: '1.2em' }}>{hostelCurrPaidFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-success my-1" style={{ height: '2px' }} />
                        <p className="text-success pl-2 small">Total Paid Amount</p>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body p-1 px-1">
                        <p className="mt-2 pl-2 text-danger" style={{ fontSize: '1.2em' }}>{hostelCurrPendingFee.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</p>
                        <hr className="bg-danger my-1" style={{ height: '2px' }} />
                        <p className="text-danger pl-2 small">Total Pending Amount</p>
                    </div>
                </div>
                
            </div>
            <div className='StudentFee'>
                <div className="row">
                    <div className="col-12 table-responsive">
                    <table className="table table-bordered nowrap overflow-auto">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Session</th>
                                    <th>Year</th>
                                    {/* <th>Route</th> */}
                                    {/* <th>Pickup Point</th> */}
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                hostelTotal.map((i,key)=>(
                                <tr>
                                    <td>{key+1}</td>
                                    <td>{i?.session_id}</td>
                                    <td>{i?.year}</td>
                                    {/* <td>{routeData?.find(obj => obj.id == i.route_id).title}</td> */}
                                    {/* <td>{pickuppointData?.find(obj => obj.id == i.pickuppoint_id).name}</td> */}
                                    <td>{i.amount?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{(i.amount - i.total)?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>{i.total?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                                    <td>
                                        <span className={`badge badge-soft-${i.amount - i.total == 0 ? 'success' :i?.total == 0?'danger':'warning'}`}>
                                            {i.amount - i.total == 0 ? 'Paid' :i?.total == 0?'Not Paid':'partial'}
                                        </span> 
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        )
        else return (
            <div>
            <div className="pt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Academic" && "active"}`}
                         onClick={() => setFeeType("Academic")}
                        >Academic</a>
                        
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Hostel" && "active"}`}
                        onClick={() => setFeeType("Hostel")}
                        >Hostel</a>
                    </li>
                    <li className="nav-item cursor-pointer">
                        <a className={`nav-link ${feeType === "Transport" && "active"}`}
                        onClick={() => setFeeType("Transport")}
                        >Trasport</a>
                    </li>     
                </ul>
            </div>
            <div className="pt-3">
                <h6 className="text-danger">Data Not Found</h6>
            </div>
            </div>
    )
}

export default FeeView;