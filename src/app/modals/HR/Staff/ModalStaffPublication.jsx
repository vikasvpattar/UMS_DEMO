import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE_EXPERIENCE, EMPLOYEE_PUBLICATION } from '../../../utils/apiConstants'
import { getFileUrl } from '../../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT, ASSET_EMPLOYEE_EXPERIENCE } from '../../../utils/AssetsReferenceTypes'



function ModalStaffPublication({ type, id, data, reloadData, setLoading }) {



    //object for all input values
    const [user, setUser] = useState({
        name: '',
        attachment: '',
        date: '',
    })

    const [attachment, setAttachment] = useState()

    //Function upload attachment to the s3
    const addAttachment = async (e) => {
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT, `${id}_Experience`, e.target.value.split(".")[1], setLoading, e.target.files[0]);
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
            [`${name}`]: value
        }));
    }

    //fuction to clear the input fields after completion of any operation
    const clearData = () => {
        setUser({
            name: '',
            attachment: '',
            date: '',
        })
    }


    //fuction to call after post or put
    const handleSubmit = async (d) => {


        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${EMPLOYEE_PUBLICATION}${type === 'edit' ? '/' + data.id : ''}`,
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
                    name: data.name,
                    attachment: data.attachment,
                    date: data.date?.split("T")[0],
                })
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])



    return (
        <div className='ModalStaffPublication'>
            <div
                className="modal fade"
                id="ModalStaffPublication"
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
                                Add New Publication
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
                                        <label htmlFor="">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='name'
                                            value={user?.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name='date'
                                            value={user.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Attachement
                                        </lable>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="attachment"
                                            // value={user.attachment}
                                            onChange={(e) => { addAttachment(e); }}
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

export default ModalStaffPublication