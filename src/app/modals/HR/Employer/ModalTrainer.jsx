import React, { useState, useEffect } from 'react'
import { LOCAL_EMPLOYEE } from './../../../utils/LocalStorageConstants'
import axios from 'axios';
import { toast } from 'react-toastify'
import { TRAINER } from '../../../utils/apiConstants';

function ModalTrainer({ setLoading, type, reloadData, data, collegeId }) {

    const [ext, setExt] = useState(0)
    const [code, setCode] = useState('');
    const [name, setName] = useState("");
    const [desc, setDesc] = useState('');
    const [employee, setEmployee] = useState()
    const [organization, setOrganization] = useState()


    const [employeeopt] = useState(JSON.parse(localStorage.getItem(LOCAL_EMPLOYEE)).filter(item => item.college_id == collegeId))

    const config = {
        method: type === 'edit' ? 'put' : 'post',
        url: `${TRAINER}${type === 'edit' ? '/' + data.id : ''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "code": code,
            "description": desc,
            "is_employee": !ext ? true : false,
            "employee_id": employee,
            "name": name,
            "organization": organization,
        }
    };

    const handleSelectBy = (e) => {
        // setBy(e.target.value);
        setExt(e.target.value === 'ext' ? 1 : 0);
    }

    const clearData = () => {
        setCode('')
        setName('')
        setDesc('')
        setEmployee('')

        setOrganization('')
        setExt(0)
    }


    const SubmitModal = async () => {
        setLoading(1)
        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log(res);
                clearData()
                reloadData();
                toast.success("Program added successfully")
            })
            .catch(err => {
                setLoading(0)
                console.log(err)
            })
    }

    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setName(data.name);
                setCode(data.id)
                setDesc(data.description)
                setEmployee(data.employee_id)
                setOrganization(data.organization)

                setExt(!data.is_employee)
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])

    const handleEmployee = (id) => {
        const emp = employeeopt.find(item => item.id == id)
        setName(emp?.first_name + " " + emp?.last_name)
    }

    return (
        <div className='ModalTrainer'>
            <div
                className="modal fade"
                id="ModalTrainer"
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
                                Add Trainer
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
                                            Code <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Description <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            value={desc}
                                            onChange={(e) => { setDesc(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            By <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            className="form-control"
                                            name='by'
                                            onChange={handleSelectBy}
                                        >
                                            <option value="employee" selected>Employee</option>
                                            <option value="ext">Externel Trainer</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    ext ?
                                        <>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>
                                                        External Trainer <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='External trainer name'
                                                        value={name}
                                                        onChange={(e) => { setName(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>
                                                        External Organization
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='External trainer name'
                                                        value={organization}
                                                        onChange={(e) => { setOrganization(e.target.value) }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="col-12">
                                            <div className="form-group">
                                                <lable>
                                                    {" "}
                                                    Employee <span style={{ color: "red" }}>*</span>
                                                </lable>
                                                <select
                                                    className="form-control"
                                                    name='employee'
                                                    value={employee}
                                                    onChange={(e) => { setEmployee(e.target.value); handleEmployee(e.target.value) }}
                                                >
                                                    <option value={''}>Select Employee</option>
                                                    {
                                                        employeeopt.filter(item => item.college_id == collegeId)?.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.first_name + ' ' + i.last_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                }


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
                                    onClick={SubmitModal}
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

export default ModalTrainer