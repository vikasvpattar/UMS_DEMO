import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Toggler from '../../../Components/Toggler/Toggler'
import { PAYROLL_DEDUCTION } from '../../../utils/apiConstants'

function ModalPayRollDeduction({ type, data, reloadData, setLoading }) {


    //object for all input values
    const [user, setUser] = useState({
        title: '',
        description: '',
        id: '',
        amount: '',
        quantity: '',
        status: true,
        statutory: false,
        tax: false
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
            amount: '',
            quantity: '',
            status: true,
            statutory: false,
            tax: false
        })
    }


    //fuction to call after post or put
    const handleSubmit = async () => {


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${PAYROLL_DEDUCTION}${type === 'edit' ? '/' + data.id : ''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                ...user
            }
        };
        console.log(config);


        setLoading(1)
        await axios(config)
            .then((res) => {
                toast.success(res.data.message)
                console.log(res);
                setLoading(0)
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
                    title: data.title,
                    description: data.description,
                    id: data.id,
                    amount: data.amount,
                    quantity: data.quantity,
                    status: data.status === "ACTIVE" ? true : false,
                    statutory: data.statutory,
                    tax: data.tax
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])

    return (
        <div className='ModalPayRollDeduction'>
            <div
                className="modal fade"
                id="ModalPayRollDeduction"
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
                                {type === 'edit' ? 'Edit' : 'Add New'} Deduction
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
                                            disabled={type === 'edit' ? true : false}
                                            name="id"
                                            value={user.id}
                                            onChange={handleChange}
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
                                            name="description"
                                            value={user.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <Toggler
                                        defaultChecked={user.status}
                                        checked={user.status}
                                        checkboxValue={(e) => {
                                            setUser(prevValue => ({
                                                ...prevValue,
                                                status: e.target.checked
                                            }));
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Enter Amount'
                                        className="form-control"
                                        name='amount'
                                        value={user.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder='Enter Quantity'
                                        className="form-control"
                                        name='quantity'
                                        value={user.quantity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 my-4">
                                    <Toggler label={'Tax'}
                                    defaultChecked={user.tax}
                                    checked={user.tax}
                                    checkboxValue={(e) => {
                                        setUser(prevValue => ({
                                            ...prevValue,
                                            tax: e.target.checked
                                        }));
                                    }}
                                    />
                                </div>
                                <div className="col-12 my-3">
                                    <Toggler label={'Other Statutory'}
                                    defaultChecked={user.statutory}
                                    checked={user.statutory}
                                    checkboxValue={(e) => {
                                        setUser(prevValue => ({
                                            ...prevValue,
                                            statutory: e.target.checked
                                        }));
                                    }}
                                    />
                                </div>

                                {/* <br /><br />
                                <br /><br />
                                <div className="col-12">
                                    <Toggler label="Tax"/>
                                </div>
                                <br /><br />
                                <div className="col-12">
                                    <Toggler label="Other Statutory"/>
                                </div>
                                <br /><br /> */}
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

export default ModalPayRollDeduction