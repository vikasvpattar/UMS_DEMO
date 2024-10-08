import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getFileUrl } from '../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../utils/AssetsReferenceTypes'
import { LIBRARY_EBOOKS } from '../../utils/Library.apiConst'
import { LOCAL_DEPARTMENT } from '../../utils/LocalStorageConstants'

const ModalLibraryEbook = ({ collegeId, setLoading, getData }) => {
    const departmentOpt = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(s => s.college_id == collegeId)

    

    const [user, setUser] = useState({
        name: '',
        author: '',
        secure_url: '',
        department_id: '',
        thumbnail: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //Function upload attachment to the s3
    const addAttachment = async (e,a) => {
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT, `Library_Books_ebooks`, e.target.value.split(".")[1], setLoading, e.target.files[0]);
            setUser(prev => ({
                ...prev,
                [a]: d ? d : ''
            }))
        } catch (error) {
            console.log(error);
        }

    }

    
        
    const handleSubmit = async () => {
        const config = {
            method: 'post',
            url: LIBRARY_EBOOKS,
            data: user,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        await axios(config)
        .then(res=>{
            console.log(res);
            toast.success("Added successfully")
            getData()
        })
        .catch(err=>{
            console.log(err);
            toast.error("Something went wrong while adding ebook")
        })
    }


    return (
        <div
            className="modal fade"
            id="ebookadd"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered mw-100 w-75"
                role="document"
                width="600px"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Add Ebook
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
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter Title of the book'
                                        name='name'
                                        value={user?.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter Author of the book'
                                        name='author'
                                        value={user?.author}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Department</label>
                                    <select
                                        name="department_id"
                                        value={user?.department_id}
                                        onChange={handleChange}
                                        className='form-control'
                                    >
                                        <option value="">Select Department</option>
                                        {
                                            departmentOpt?.map((i, key) => (
                                                <option key={key} value={i.id}>{i.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Upload Ebook</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder='Enter Title of the book'
                                        onChange={(e)=>addAttachment(e,"secure_url")}
                                        name="secure_url"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="">Thumbanail</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        placeholder='Enter Title of the book'
                                        onChange={(e)=>addAttachment(e,'thumbnail')}
                                        name="thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button data-dismiss="modal" onClick={handleSubmit} className="btn btn-success">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLibraryEbook