import React, { useState,useEffect } from 'react'
import { EMPLOYEE_DOCUMENT_MANAGEMENT } from '../../../utils/apiConstants'
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from '../../../Components/Loader/Loader'

function DocumentReview({data, status, reloadData, setLoading , flow}) {


    //object for all input values
    const [user, setUser] = useState({
        workflow: '',
        employee_id:'',
        status: '',
        reference: '',
        description: '',
        submission_date: '',
        attachment: '',
        remarks: '',
    })

    //handleChange for all input fields
    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    //fuction to clear the input fields after completion of any operation
    const clearData = () => {
        setUser({
            workflow: '',
            status: '',
            reference: '',
            description: '',
            submission_date: '',
            attachment: '',
            remarks: '',
        })
    }


    //Handle Submit
    const handleSubmit = async(d) =>{
        //config for axios
        const config = {
            method:'put',
            url: `${EMPLOYEE_DOCUMENT_MANAGEMENT}/${data.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                // "employee_id": id,
                ...user,
            }
        };
        console.log(config);
    
    
            setLoading(1)
            await axios(config)
            .then((res)=>{
                toast.success(res.data.message)
                console.log(res);
                setLoading(0)
                reloadData(status)
            })
            .catch(err=>{
                console.log(err);
                toast.error("Something went wrong")
                setLoading(0)
            })
        }



    useEffect(() => {
            if (data) {
                setUser({
                    workflow:data.workflow,
                    employee_id:data.employee_id,
                    status:data.status,
                    reference:data.reference,
                    description:data.description,
                    submission_date:data.submission_date.split("T")[0],
                    attachment:data.attachment,
                    remarks:data.remarks,
                })
            }

    }, [data])

    return (
        <div className='ModalBank'>
            <div
                className="modal fade"
                id="ModalDocReview"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered mw-100 w-75"
                    role="document"
                >
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Document Review
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
                                        <label htmlFor="validationCustom01">
                                            WorkFlow <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                            id="role"
                                            name="workflow"
                                            value={user.workflow}
                                            className="form-control"
                                            // onChange={handleChange}
                                            readOnly={true}
                                        >
                                            <option value="">Select</option>
                                            {
                                                flow?.map((i,key)=>(
                                                    <option value={i.id}>{i.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Reference <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="reference"
                                            value={user.reference}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Status <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={user.status}
                                            onChange={handleChange}
                                        >
                                        {/* <option value=""></option> */}
                                        <option value="PENDING">PENDING</option>
                                        <option value="APPROVED">APPROVE</option>
                                        <option value="DECLINED">DECLINE</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            Description
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            value={user.description}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            Submission Date <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="submission_date"
                                            value={user.submission_date}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            Attachment <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="attachment"
                                            // value={user.attachment}
                                            // onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <lable>
                                            Remarks
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="remarks"
                                            value={user.remarks}
                                            onChange={handleChange}
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
                                    onClick={handleSubmit}
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

export default DocumentReview