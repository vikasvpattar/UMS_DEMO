import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import Nodata from '../../../Components/NoData/Nodata'
import { REPORT_STAFF_LEAVE } from '../../../utils/Reports.apiConst'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDownloadExcel } from 'react-export-table-to-excel'

const ReportStaffLeave = () => {

    const [user, setUser] = useState({
        from: new Date().toISOString().split('T')[0], // Set to current date
        to: new Date().toISOString().split('T')[0], // Set to current date
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

   // const [from, setFrom] = useState('')
   // const [to, setTo] = useState('')
    const [data, setData] = useState([])

    const tableRef = useRef()

    const getData = async() => {

        // if(!user?.from) return toast.error("From date is mandatory")
        const config = {
            method:'get',
            url:`${REPORT_STAFF_LEAVE}?from=${user?.from}&to=${user?.to ? user?.to : user?.from}`
        }

        await axios(config)
        .then(res=>{
            setData(res.data.data)
        })
        .catch(err=>{
            console.log(err);
            toast.error("Something went wrong")
        })
    }

    useEffect(() => {
        getData();
    },[]);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Staff Leave Reports',
        sheet: 'user'
      });


    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Staff Reports</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    Select Criteria
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">From Date *</label>
                                                            {/* <input 
                                                            type="date" 
                                                            name="" 
                                                            id="" 
                                                            className="form-control" 
                                                            value={from}
                                                            onChange={(e)=>setFrom(e.target.value)}
                                                            /> */}
                                                            <input
                                                              type="date"
                                                              name="from"
                                                              onChange={handleChange}
                                                              className="form-control"
                                                              value={user?.from}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">To Date</label>
                                                            {/* <input 
                                                            type="date" 
                                                            name="" 
                                                            id="" 
                                                            className="form-control" 
                                                            value={to}
                                                            onChange={(e)=>setTo(e.target.value)}
                                                            /> */}

                                                            <input
                                                              type="date"
                                                              name="to"
                                                              onChange={handleChange}
                                                              className="form-control"
                                                              value={user?.to}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex justify-content-end">
                                                    <button onClick={getData} className='btn btn-success'>Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <div className='d-flex justify-content-between align-items-'>
                                                Staff Leave Report
                                                <button onClick={onDownload} className="btn btn-primary">
                                                    Export
                                                </button>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table ref={tableRef} className="table table-bordered">
                                                <tr>
                                                    <th>Sl. No</th>
                                                    <th>Staff Name</th>
                                                    <th>Leave Type</th>
                                                    <th>Number of days</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                </tr>
                                                {
                                                    data&&data?.length!=0?
                                                    data?.map((i,key)=>(
                                                        <tr key={key}>
                                                            <td>{key+1}</td>
                                                            <td>{i?.name}</td>
                                                            <td>{i?.leave_type}</td>
                                                            <td>{i?.days}</td>
                                                            <td>{i?.from_date?.split("T")[0]}</td>
                                                            <td>{i?.to_date?.split("T")[0]}</td>
                                                        </tr>
                                                        
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <Nodata/>
                                                        </td>
                                                    </tr>
                                                }
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
    )
}

export default ReportStaffLeave