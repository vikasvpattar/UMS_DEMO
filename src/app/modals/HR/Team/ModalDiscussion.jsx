import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { getFileUrl } from '../../../Helpers/Helpers'
import { TEAM_DISCUSSION } from '../../../utils/apiConstants'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'
import { SESSION_EMPLOYEE_ID } from './../../../utils/sessionStorageContants'

function ModalDiscussion({reloadData,setLoading, collegeId}) {

    const [title,setTitle] = useState()
    const [attachment,setAttachment] = useState()
    const [content,setContent] = useState()

    const clearData = () =>{
        setTitle('')
        setAttachment('')
        setContent('')
    }

    const getEmployeeId = () =>{
        return sessionStorage.getItem(SESSION_EMPLOYEE_ID)?sessionStorage.getItem(SESSION_EMPLOYEE_ID):null
    }

    const [id,setId] = useState(getEmployeeId())

    //Function upload attachment to the s3
    const addAttachment = async(e) =>{
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${id}_Team_Discussion`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
            setAttachment(d?d:'')
        } catch(error) {
            console.log(error);
        }

    }

    const submitModal = () =>{
        setLoading(1)
        const config = {
            method : 'post',
            url:TEAM_DISCUSSION,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data:{
                "title":title,
                "attachment":attachment,
                "content":content,
                "college_id":collegeId
            }
        }
        axios(config)
        .then(res=>{
            setLoading(0)
            console.log(res);
            toast.success(res.data.message)
            clearData();
            reloadData();
        })
        .catch(err=>{
            setLoading(0)
            toast.error(err.response.data.message)
            clearData()
        })
    }
  return (
    <div className='ModalDiscussion'>
        <div
                className="modal fade"
                id="ModalDiscussion"
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
                                Add New Topic
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
                                            value={title}
                                            onChange={(e)=>setTitle(e.target.value)}
                                            
                                        />
                                    </div>
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
                                            value={content}
                                            onChange={(e)=>setContent(e.target.value)}
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
                                onClick={submitModal}
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

export default ModalDiscussion