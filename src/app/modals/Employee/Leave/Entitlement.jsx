import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { LEAVE_APPLICATION, LEAVE_ENTITLEMENT } from '../../../../utils/apiConstants'

function ModalAddEntitlment({reloadData,setLoading,empId,allData}) {
    const [type,setType] = useState()
    const [policy,setPolicy] = useState()
    const [fDate,setFDate] = useState()
    const [tDate,setTDate] = useState()
    const [entitled,setEntitled] = useState()
    const [carried,setCarried] = useState()
    // const [loading,setLoading] = useState(0)

    // const submitModal = async() =>{
    //     setLoading(1)
    //     const data = {
    //         "employee_id": empId,
    //         "leave_type": type,
    //         "earning_policy": policy,
    //         "from_date": fDate,
    //         "to_date": tDate,
    //         "entitled_days": entitled,
    //         "carried_over": carried
    //     }
    //     const config = {
    //         method:'post',
    //         url:LEAVE_ENTITLEMENT,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
    //         },
    //         data:data
    //     }

    //     await axios(config)
    //     .then((res)=>{
    //         console.log(res.data.data);
    //         reloadData(empId)
    //         setLoading(0)
    //     })
    //     .catch(err=>{
    //         toast.error(err.response.data.message)
    //         setLoading(0)
    //     })
    // }

  return (
    <div>
         <div
                className="modal fade"
                id="ModalAddEntitlment"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-xl"
                    role="document"
                >
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Add Entitlement
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Type <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select 
                                        name="" 
                                        id="" 
                                        className="form-control"
                                        value={type}
                                        onChange={(e)=>{setType(e.target.value)}}
                                        >
                                            <option value="">Select Leave Type</option>
                                            {
                                                allData?.leaveType?.map((i,key)=>(
                                                    <option key={key} value={i.id}>{i.description}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Earning Policy <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select 
                                        className='form-control'
                                        value={policy}
                                        onChange={(e)=>{setPolicy(e.target.value)}}
                                        >
                                            <option value="">Select Earning Policy</option>
                                            {
                                                 allData?.earningPolicy?.map((i,key)=>(
                                                    <option key={key} value={i.id}>{i.description}</option>
                                                ))
                                            }
                                            </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Earning Start <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input 
                                        type="date" 
                                        className="form-control"
                                        value={fDate}
                                        onChange={(e)=>{setFDate(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Valid Untill <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input 
                                        type="date" 
                                        className="form-control"
                                        value={tDate}
                                        onChange={(e)=>{setTDate(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Entiled Days <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='Enter Entitled Days'
                                            value={entitled}
                                            onChange={(e)=>{setEntitled(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Carried Over <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder='Enter Entitled Days'
                                            value={carried}
                                            onChange={(e)=>{setCarried(e.target.value)}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between px-2">
                                <button 
                                className='btn btn-danger btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                >
                                    Cancel
                                </button>
                                <button 
                                className='btn btn-success btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ModalAddEntitlment