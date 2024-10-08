import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Toggler from '../../../Components/Toggler/Toggler'
import { PAYROLL_STATUTORY_CONTRIBUTION } from '../../../utils/apiConstants'

function ModalPayRollStationary({ type, data, reloadData, setLoading }) {


    //object for all input values
    const [user, setUser] = useState({
        title: '',
        id: '',
        // amount: '',
        // quantity: '',
        status: "ACTIVE",
        employer_amount_type: "",
        employer_portion: "",
        employee_amount_type: "",
        employee_portion: ""
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
            title: '',
            description: '',
            id: '',
            employer_amount_type: "",
            employer_portion: "",
            employee_amount_type: "",
            employee_portion: "",
            status: "ACTIVE"
        })
    }


    //fuction to call after post or put
    const handleSubmit = async () => {
        setLoading(1)


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${PAYROLL_STATUTORY_CONTRIBUTION}${type === 'edit' ? '/' + data.id : ''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                ...user
            }
        };
        console.log(config);


        await axios(config)
            .then((res) => {
                toast.success(res.data.message)
                console.log(res);
                setLoading(0)
                reloadData()
            })
            .catch(err => {
                console.log(err);
                toast.error("Somethint wrong")
                setLoading(0)
            })
    }



    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setUser({
                    title: data.title,
                    description: data.description,
                    id: data.id,
                    employer_amount_type: data.employer_amount_type,
                    employer_portion: data.employer_portion,
                    employee_amount_type: data.employee_amount_type,
                    employee_portion: data.employee_portion,
                    status: data.status === "ACTIVE" ? true : false
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])
    return (
        <div className='ModalPayRollStationary'>
            <div
                className="modal fade"
                id="ModalPayRollStationary"
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
                                Add New Statutory Contribution
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
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Title <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={user.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Code <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="id"
                                            value={user.id}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <br /><br />
                                <div className="col-12">
                                    <Toggler
                                        defaultChecked={user.status === "ACTIVE" ? true : false}
                                        checked={user.status === "ACTIVE" ? true : false}
                                        checkboxValue={(e) => {
                                            setUser(prevValue => ({
                                                ...prevValue,
                                                status: e.target.checked === true ? "ACTIVE" : "INACTIVE"
                                            }));
                                        }}
                                    />
                                </div>
                                <br /><br />
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="">Employer Amount type</label>
                                    <select name="" id="" className="form-control" value={user.employer_amount_type}>
                                        <option value="">Not Applicable</option>
                                        <option value="AMOUNT">Amount</option>
                                        <option value="GROSS_INCOME">% Gross Income</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="">Employer portion</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="employer_portion"
                                        value={user.employer_portion}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="">Employee Amount type</label>

                                    <select name="" id="" className="form-control" value={user.employee_amount_type} >
                                        <option value="">Not Applicable</option>
                                        <option value="">Amount</option>
                                        <option value="">% Gross Income</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label htmlFor="">Employee Portion</label>
                                    <input
                                        type="number"
                                        name='employee_portion'
                                        className="form-control"
                                        onChange={handleChange}
                                        value={user.employee_portion}
                                    />
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

export default ModalPayRollStationary