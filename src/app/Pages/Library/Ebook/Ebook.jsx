import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import pdfImg from '../../../assets/images/reports/bha1.png'
import ModalLibraryEbook from '../../../modals/Library/ModalLibraryEbook'
import { LIBRARY_EBOOKS } from '../../../utils/Library.apiConst'
import { LOCAL_DEPARTMENT } from '../../../utils/LocalStorageConstants'

const Ebook = ({collegeId, setLoading}) => {
    const departmentOpt = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(s => s.college_id == collegeId)

    const [data, setData] = useState([])

    const [department, setDepartment] = useState('')

    const getData = async() => {   
        const config = {
            method: 'get',
            url: `${LIBRARY_EBOOKS}?department_id=${department}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        await axios(config)
        .then(res=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className='main-content'>
            <ModalLibraryEbook collegeId={collegeId} setLoading={setLoading} getData={getData}/>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-title">
                                    <div className="d-flex justify-content-between rounded-pill">
                                    Add Ebooks
                                    <button 
                                    className="btn btn-success btn-sm"
                                    data-toggle="modal"
                                    data-target="#ebookadd"
                                    >
                                        + Add Ebook
                                    </button>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="">Search Book by Department</label>
                                            <select 
                                            name="" 
                                            className="form-control"
                                            value={department}
                                            onChange={(e)=>{setDepartment(e.target.value)}}
                                            >
                                                <option value="">Select Department</option>
                                                {
                                                    departmentOpt?.map((i,key)=>(
                                                        <option key={key} value={i?.id}>{i?.name}</option>
                                                    ))
                                                }
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex">
                                        <button onClick={getData} className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3 p-3">
                        <div className="card-title">
                            Ebooks
                        </div>
                        <div className="row">
                            {
                                data&&data?.map((i,key)=>(
                                    <div className="col-md-2 col-sm-6">
                                        <a
                                            href={i?.secure_url}
                                            target="_blank"
                                        >
                                            <div className="card p-2">
                                                <img
                                                    className="card-img-top"
                                                    src={i?.thumbanil||pdfImg}
                                                    alt="Card image cap"
                                                    style={{width:'80%'}}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{i?.name}</h5>
                                                    <p className="card-text" >{i?.author}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ebook