import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE_PLACEMENT } from '../../../utils/apiConstants'

function ModalStaffPlacement({ type, id, data, reloadData, setLoading }) {
    const [date, setDate] = useState()
    const [job, setJob] = useState()
    const [department, setDepartment] = useState()
    const [remark, setRemark] = useState()
    const [remove, setRemove] = useState(0)
    const deptOptions = JSON.parse(localStorage.getItem("ALL_DATA")).department
    const programOptions = JSON.parse(localStorage.getItem("ALL_DATA")).program

    const jobRoleOptions = JSON.parse(localStorage.getItem("ALL_DATA")).jobRoles

    console.log('dept');
    // console.log(deptOptions);
    console.log(department);





    //fuction to call after post or put
    const handleSubmit = async (d) => {


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${EMPLOYEE_PLACEMENT}${type === 'edit' ? '/' + data.id : ''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                "employee_id": id,
                "job_position_id": job,
                "effective_date": date,
                "department_id": department,
                "remark": remark,
                "status": d ? "INACTIVE" : "ACTIVE"
            }
        };


        setLoading(1)
        await axios(config)
            .then((res) => {
                setLoading(0)
                toast.success(res.data.message)
                console.log(res);
                reloadData()
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error("Something went wrong")
            })
    }

    //fuction to clear the input fields after completion of any operation
    const clearData = () => {
        setDate('')
        setJob('')
        setDepartment('')
        setRemark('')
    }

    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setDate(data.effective_date.split("T")[0])
                setJob(data.job_position_id)
                setDepartment(data.department_id)
                setRemark(data.remark)
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])
    return (
        <div className='ModalStaffPlacement'>
            <div
                className="modal fade"
                id="ModalStaffPlacement"
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
                                {type === 'add' ? 'Add New' : 'Edit'} Placement
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
                                            name="followup"
                                            value={date}
                                            onChange={(e) => { setDate(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Job Position <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className="form-control"
                                            value={job}
                                            onChange={(e) => { setJob(e.target.value) }}
                                        >
                                            <option value="" selected>Select Job Roles</option>
                                            {
                                                jobRoleOptions.map((i, key) => (
                                                    <option value={i.id} key={key}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Line Manager
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Department<span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className="form-control"
                                            value={department}
                                            onChange={(e) => { setDepartment(e.target.value) }}
                                        >
                                            <option value="" selected>Select Department</option>
                                            {
                                                deptOptions.map((i, key) => (
                                                    <option value={i.id} key={key}>{i.name}, {programOptions?.find(item => item.id == i.program_id)?.name} </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Branch <span style={{ color: "red" }}>*</span>
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
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Level <span style={{ color: "red" }}>*</span>
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            className="form-control"
                                            name="followup"
                                            placeholder='max 200 characters'
                                            value={remark}
                                            onChange={(e) => { setRemark(e.target.value) }}
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

export default ModalStaffPlacement