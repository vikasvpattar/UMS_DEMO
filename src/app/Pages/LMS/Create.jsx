import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ACADEMICS_ADD_CLASS, ACADEMICS_ADD_SEMESTER, ACADEMICS_ADD_SUBJECT } from '../../utils/Academics.apiConst'
import { LMS } from '../../utils/lms.apiConst'
import { LOCAL_DEPARTMENT } from '../../utils/LocalStorageConstants'

const Create = ({collegeId}) => {

    const departmentOpt = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(s=>s?.college_id==collegeId)

    const [departmentId, setDepartmentId] = useState('')

    const [classOpt, setClassOpt] = useState([])

    const [semOpt, setSemOpt] = useState([])

    const [subjectOpt, setSubjectOpt] = useState([])

    const [user, setUser] = useState({
        title:'',
        class_id:'',
        semester_id:'',
        course_id:'',
        safe_url:"",
        college_id:collegeId,
        description:''
    })


    const handleChange = (e) => {
        const {name, value} = e.target
        setUser(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const getClassData = async() => {
        const config = {
            method:'get',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        const [data1, data2] = await Promise.all([
            axios({...config,url:`${ACADEMICS_ADD_CLASS}?department_id=${departmentId}&college_id=${collegeId}`,})
            .then(res=>{
                return res.data.data
            })
            .catch(err=>{
                console.log(err);
                toast.error("Error while fetching data")
            }),
            axios({...config,url:`${ACADEMICS_ADD_SEMESTER}?department_id=${departmentId}&college_id=${collegeId}`,})
            .then(res=>{
                return res.data.data
            })
            .catch(err=>{
                console.log(err);
            })
        ])

        setClassOpt(data1)
        setSemOpt(data2)
    }

    const getCourseData = async()=> {
        const config = {
            method:'get',
            url:`${ACADEMICS_ADD_SUBJECT}?semester_id=${user?.semester_id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        await axios(config)
        .then(res=>{
            console.log(res);
            setSubjectOpt(res.data.data)
        })
        .catch(err=>{
            console.log(err);
            toast.error("Error while fetching Data")
        })
    }

    const handleSubmit = async() => {
        if(!user?.title || !user?.safe_url) return toast.error("Mandatory fields are required")
        const config = {
            method:'post',
            url:LMS,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
            data:user
        }

        await axios(config)
        .then(res=>{
            console.log(res);
            toast.success("Successfully added LMS Course")
        })
        .catch(err=>{
            console.log(err);
            toast.error("Something went")
        })

    }


    useEffect(()=>{
        console.log(departmentId);
       if(departmentId) getClassData()
    },[departmentId])


    useEffect(()=>{
        if(user?.semester_id) getCourseData()
    },[user?.semester_id])
    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            Add LMS Course
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Department  <span className='text-danger'>*</span></label>
                                                    <select
                                                    value={departmentId}
                                                    onChange={(e)=>{
                                                        setDepartmentId(e.target.value)
                                                    }}
                                                    className="form-control">
                                                        <option value="">Select Department</option>
                                                        {
                                                            departmentOpt?.map((i,key)=>(
                                                                <option value={i?.id}>{i?.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Class</label>
                                                    <select 
                                                    name="class_id" 
                                                    value={user?.class_id}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    >
                                                        <option value="">Select Class</option>
                                                        {
                                                            classOpt?.map((i,key)=>(
                                                                <option value={i?.id}>{i?.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Semester</label>
                                                    <select 
                                                    name="semester_id" 
                                                    className="form-control"
                                                    value={user?.semester_id}
                                                    onChange={handleChange}
                                                    >
                                                        <option value="">Select Semester</option>
                                                        {
                                                            semOpt?.filter(s=>s?.class_id==user?.class_id)?.map((i,key)=>(
                                                                <option value={i?.id}>{i?.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Course</label>
                                                    <select 
                                                    name="course_id" 
                                                    className="form-control"
                                                    value={user?.course_id}
                                                    onChange={handleChange}
                                                    >
                                                        <option value="">Select Course</option>
                                                        {
                                                            subjectOpt?.map((i,key)=>(
                                                                <option value={i?.id}>{i?.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Title  <span className='text-danger'>*</span></label>
                                                    <input 
                                                    type="text"
                                                    value={user?.title}
                                                    onChange={handleChange}
                                                    name="title"
                                                    className='form-control'
                                                    placeholder='Enter Title of the course'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">Description</label>
                                                    <input 
                                                    type="text"
                                                    value={user?.description}
                                                    onChange={handleChange}
                                                    name="description"
                                                    className='form-control'
                                                    placeholder='Enter Description of the course'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="">URL  <span className='text-danger'>*</span></label>
                                                    <input 
                                                    type="text"
                                                    value={user?.safe_url}
                                                    onChange={handleChange}
                                                    name="safe_url"
                                                    className='form-control'
                                                    placeholder='Enter URL of the course'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button onClick={handleSubmit} className="btn btn-success rouded-pill">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create