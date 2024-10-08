import React, { useState,useEffect } from 'react'
import { EMPLOYEE_DOCUMENT_MANAGEMENT } from '../../../utils/apiConstants'
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from '../../../Components/Loader/Loader'
import { getFileUrl } from '../../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'

function DocumnetManagement({type, id, data, reloadData , flow, setLoading, collegeId}) {



    //object for all input values
    const [user, setUser] = useState({
        workflow: '',
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
            reference: '',
            description: '',
            submission_date: '',
            attachment: '',
            remarks: '',
        })
    }

    //Function for document Upload
const addAttachment = async(e) =>{
    try {
        const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${id}_Education`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
        setUser(prevValue => ({
            ...prevValue,
            attachment:d?d:''
        }))
    } catch(error) {
        console.log(error);
    }

}


    //Handle Submit
    const handleSubmit = async(d) =>{
        //config for axios
        const config = {
            method: type==='edit'?'put':'post',
            url: `${EMPLOYEE_DOCUMENT_MANAGEMENT}${type==='edit'?'/'+data.id:''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                "employee_id": id,
                ...user,
                "college_id": collegeId
            }
        };
        console.log(config);
    
    
            setLoading(1)
            await axios(config)
            .then((res)=>{
                setLoading(0)
                toast.success(res.data.message)
                console.log(res);
                reloadData(id)
            })
            .catch(err=>{
                setLoading(0)
                console.log(err);
                toast.error("Something went wrong")
            })
        }



    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setUser({
                    workflow:data.workflow,
                    reference:data.reference,
                    description:data.description,
                    submission_date:data.submission_date.split("T")[0],
                    attachment:data.attachment,
                    remarks:data.remarks,
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])


    const [selectRole, setSelectRole] = useState([]);

    


    return (
        <div className='ModalBank'>
            <div
                className="modal fade"
                id="ModalDocManagement"
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
                                Add Document
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
                                            onChange={handleChange}
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
                                <div className="col-12">
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
                                            onChange={(e)=>{addAttachment(e)}}
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

export default DocumnetManagement