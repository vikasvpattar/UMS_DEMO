import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE_TRAINING, TRAINER } from '../../../utils/apiConstants'
import { getFileUrl } from '../../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'

function ModalStaffTraining({ type, id, data, reloadData, setLoading }) {




    const [user, setUser] = useState({
        date: '',
        course: '',
        trainer_id: '',
        result: '',
        attachment: '',
        remark: '',
    })


    //Function for document Upload
    const addAttachment = async (e) => {
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT, `${id}_Education`, e.target.value.split(".")[1], setLoading, e.target.files[0]);
            setUser(prevValue => ({
                ...prevValue,
                attachment: d ? d : ''
            }))
        } catch (error) {
            console.log(error);
        }

    }

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
            date: '',
            course: '',
            trainer_id: '',
            result: '',
            attachment: '',
            remark: '',
        })
    }


    //fuction to call after post or put
    const handleSubmit = async (d) => {


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${EMPLOYEE_TRAINING}${type === 'edit' ? '/' + data.id : ''}`,
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
        console.log(config);


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


    useEffect(() => {

        if (type === 'edit') {
            if (data) {
                setUser({
                    date: data.date,
                    course: data.course,
                    trainer_id: data.trainer_id,
                    result: data.result,
                    attachment: data.attachment,
                    remark: data.remark,
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])

    const [trainerOption, setTrainerOption] = useState([])

    const getData = async () => {

        setLoading(1)

        const config = {
            method: 'get',
            url: `${TRAINER}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }





        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log(res);
                setTrainerOption(res.data.data)
                // toast.success("data fetched")
            })
            .catch(err => {
                setLoading(0)
                console.log(err)
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className='ModalStaffTraining'>
            <div
                className="modal fade"
                id="ModalStaffTraining"
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
                                Add New Training
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
                                            Date <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={user.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Course <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="course"
                                            value={user.course}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Trainer <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name="trainer_id"
                                            value={user.trainer_id}
                                            onChange={handleChange}
                                            className="form-control">
                                            <option value="" selected>Select The Trainer</option>
                                            {
                                                trainerOption?.map((i, key) => (
                                                    <option value={i.id} key={key}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Result
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="result"
                                            value={user.result}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Attachment
                                        </lable>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="attachment"
                                            onChange={(e) => { addAttachment(e); }}
                                        />
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
                                    onClick={() => { handleSubmit(1) }}
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

export default ModalStaffTraining