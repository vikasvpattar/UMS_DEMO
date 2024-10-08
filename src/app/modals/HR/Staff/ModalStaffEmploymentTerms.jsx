import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE, EMPLOYEE_EMPLOYEMENT_TERMS } from '../../../utils/apiConstants';

function ModalStaffEmploymentTerms({ type, id, data, reloadData, setLoading }) {


    //option array of Description
    const descriptionOpt = [
        'Confirmed',
        'Pobabtion',
        'Resigned',
        'Dismissed',
        'Contract Ended',
        'Retired',
        'Retreched',
        'Deseased',
    ];

    //option array of jobType
    const jobTypeOpt = [
        'Permanant',
        'Contracted',
        'Part Time',
        'Intership'
    ]

    //object for all input values
    const [user, setUser] = useState({
        effective_date: '',
        job_type: '',
        description: '',
        from: '',
        to: '',
        remark: '',
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
            effective_date: '',
            job_type: '',
            description: '',
            from: '',
            to: '',
            remark: '',
        })
    }

    //fuction to call after post or put
    const handleSubmit = async (d) => {


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${EMPLOYEE_EMPLOYEMENT_TERMS}${type === 'edit' ? '/' + data.id : ''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                "employee_id": id,
                ...user,
                "status": d ? "INACTIVE" : "ACTIVE"
            }
        };
        const config2 = {
            method: 'put',
            url: `${EMPLOYEE}/${id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
            data: {
                status: user.description == 'Confirmed' || user.description == 'Pobabtion'?"ACTIVE":"INACTIVE"
            }
        }

        setLoading(1)

        await axios(config)
            .then(async (res) => {
                // toast.success(res.data.message)
                console.log(res);
                setLoading(0)

                    console.log(user);
                    await axios(config2)
                        .then(res => {
                            console.log(res);
                            toast.success("Succesfull");
                        })
                        .catch(err => {
                            toast.error("Error while disabling the user")
                        })
                        
                reloadData()
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong")
                setLoading(0)
            })
    }

    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setUser({
                    effective_date: data.effective_date.split("T")[0],
                    job_type: data.job_type,
                    description: data.description,
                    from: data.from.split("T")[0],
                    to: data.to.split("T")[0],
                    remark: data.remark,
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])

    return (
        <div className='ModalStaffEmploymentTerms'>
            <div
                className="modal fade"
                id="ModalStaffEmploymentTerms"
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
                                {type === 'add' ? 'Add New' : 'Edit'} Employment Terms
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Effective Date <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="effective_date"
                                            value={user.effective_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Job Type
                                        </lable>
                                        <select
                                            name="job_type"
                                            className='form-control'
                                            value={user.job_type}
                                            onChange={handleChange}
                                        >
                                            <option value="" selected>Select Job Type</option>

                                            {jobTypeOpt.map((data, key) => (
                                                <option key={key} value={data}>{data}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Leave Workflow<span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            defaultValue=""
                                            id=""
                                            readOnly=""
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Workday <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            defaultValue=""
                                            id=""
                                            readOnly=""
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Holiday <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            defaultValue=""
                                            id=""
                                            readOnly=""
                                        />
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Term Start
                                        </lable>
                                        <input
                                            className="form-control"
                                            name="from"
                                            type={'date'}
                                            value={user.from}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Term End
                                        </lable>
                                        <input
                                            className="form-control"
                                            name="to"
                                            type={'date'}
                                            onChange={handleChange}
                                            value={user.to}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Description
                                        </lable>
                                        <select
                                            name="description"
                                            value={user.description}
                                            onChange={handleChange}
                                            className='form-control'
                                        >
                                            <option value="" selected>Select Description</option>
                                            {descriptionOpt.map((data, key) => (
                                                <option key={key} value={data}>{data}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            className="form-control"
                                            name="remark"
                                            placeholder='max 200 characters'
                                            value={user.remark}
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
                                    onClick={() => { handleSubmit(1) }}
                                >
                                    Delete
                                </button>
                                <button
                                    className='btn btn-success btn-rounded btn-outline'
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { handleSubmit(0) }}
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

export default ModalStaffEmploymentTerms