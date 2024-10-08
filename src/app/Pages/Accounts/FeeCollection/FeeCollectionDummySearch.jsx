import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sessionOpt } from '../../../Data/jsonData/Academics/Academics'
import { ROUTES } from '../../../Router/routerConfig'
import { ACADEMICS_ADD_CLASS } from '../../../utils/Academics.apiConst'
import { LOCAL_DEPARTMENT, LOCAL_PROGRAM } from '../../../utils/LocalStorageConstants'

const FeeCollectionDummySearch = ({collegeId, setLoading}) => {
    const [session, setSession] = useState('')
    const [department, setDepartment] = useState('')
    const [classId, setClassId] = useState('')

    const getDepartmentOpt = () => localStorage.getItem(LOCAL_DEPARTMENT)?JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(s => s.college_id == collegeId):null;

    const getProgramOpt = () => localStorage.getItem(LOCAL_PROGRAM)?JSON.parse(localStorage.getItem(LOCAL_PROGRAM)):null;

    const [departmentOpt, setDepartmentOpt] = useState(getDepartmentOpt())

    const [classOpt, setClassOpt] = useState([])

    const [programOpt, setProgramOpt] = useState(getProgramOpt())

    useEffect(()=>{
        setDepartmentOpt(getDepartmentOpt())
    },[localStorage.getItem(LOCAL_DEPARTMENT)])

    useEffect(()=>{
        setProgramOpt(getProgramOpt())
    },[localStorage.getItem(LOCAL_PROGRAM)])

    const getData = async() => {
        setLoading(1)
        const config = {
            method:'get',
            url:`${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        await axios(config)
        .then(res=>{
            setClassOpt(res.data.data)
        })
        .catch(err=>toast.error('Something went wrong'))
        setLoading(0)
    }

    const navigate = useNavigate()
    const validateandgo = () =>{
        if(!session) return toast.error('session is required'); 
        if(!department) return toast.error('Department is required'); 
        if(!classId) return toast.error('class is required'); 

        navigate(`${ROUTES.Registar.Accounts.FeeCollection.SearchDue}?session_id=${session}&department_id=${department}&class_id=${classId}`)
    }   

    useEffect(()=>{
        getData()
    },[])

  return (
    <div className='main-content'>
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-title">Search Here</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="">Session</label>
                                            <select
                                                value={session}
                                                onChange={e=>setSession(e.target.value)}
                                                className="form-control"
                                             >
                                                <option value="">Select Session</option>
                                                {
                                                    sessionOpt?.map((i,key)=>(
                                                        <option value={i?.id} key={key}>{i?.name}</option>
                                                    ))
                                                }
                                             </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="">Department</label>
                                            <select 
                                            name="" 
                                            id="" 
                                            className="form-control"
                                            value={department}
                                            onChange={e=>setDepartment(e.target.value)}
                                            >
                                                <option value="">Select Department</option>
                                                {
                                                    departmentOpt?.map((i,key)=>(
                                                        <option value={i?.id} key={key}>{i?.name}, {programOpt?.find(s => s.id == i.program_id)?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="">Class</label>
                                            <select 
                                            name="" 
                                            id="" 
                                            className="form-control"
                                            value={classId}
                                            onChange={e=>setClassId(e.target.value)}
                                            >
                                                <option value="">Class</option>
                                                {
                                                    classOpt?.map((i,key)=>(
                                                        <option value={i?.id}>{i?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-end">
                                            <button onClick={validateandgo} className="btn btn-primary">
                                                Here we go
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

export default FeeCollectionDummySearch