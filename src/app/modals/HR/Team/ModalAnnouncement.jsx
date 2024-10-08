import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getFileUrl } from '../../../Helpers/Helpers'
import { TEAM_ANNOUNCEMENTS } from '../../../utils/apiConstants'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'

function ModalAnnouncement({ type, data, reloadData, setLoading, collegeId}) {

    const [id, setId] = useState()

    //object for all input values
    const [user, setUser] = useState({
        title: '',
        date: '',
        attachment: '',
        content: '',
    })

    //Function upload attachment to the s3
    const addAttachment = async(e) =>{
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${id}_Team_Announcements`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
            setUser(prevValue => ({
                ...prevValue,
                attachment:d?d:''
            }))
        } catch(error) {
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
            title: '',
            date: '',
            attachment: '',
            content: '',
        })
    }


    //fuction to call after post or put
    const handleSubmit = async (d) => {
        setLoading(1)

        //config for axios
        const config = {
            method: type === 'edit' ? 'put' : 'post',
            url: `${TEAM_ANNOUNCEMENTS}${type==='edit'?'/'+data.id:''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                ...user,
                college_id:collegeId
            }
        };
        console.log(config);

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
                    title: data.title,
                    date: data.date.split("T")[0],
                    attachment: data.attachment,
                    content: data.content,
                })
                setId(data.id)
            }
        }

        if (type === 'add') {
            clearData()
        }

    }, [data, type])


    return (
        <div className='ModalAnnouncement'>
            <div
                className="modal fade"
                id="ModalAnnouncement"
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
                                Add Announcement
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
                                {/* <div className="col-10 mt-4 d-flex justify-content-between">

                                    <h5> Published</h5>
                                    <input type="checkbox" name="published" className='' id="" />

                                </div> */}
                                <div className="col-10 mb-3 mt-4 d-flex justify-content-between">

                                    <h5> Notify Employees</h5>
                                    <input type="checkbox" name="notify" className='' id="" />

                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
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
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Content
                                        </lable>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="content"
                                            placeholder='Content(5000 charecter max)'
                                            onChange={handleChange}
                                            value={user.content}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row d-flex justify-content-end px-2 m-2">
                                <button
                                    className='btn btn-danger btn-rounded btn-outline mr-3'
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

export default ModalAnnouncement