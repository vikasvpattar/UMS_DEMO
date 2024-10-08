import { setRef } from '@fullcalendar/core'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../../Components/NoData/Nodata'
import useEmployee from '../../../../Hooks/Employee/useEmployee'
import ModalCustomApprover from '../../../../modals/HR/Employer/ModalCustomApprover'
import { CUSTOM_APPROVER, EMPLOYEE } from '../../../../utils/apiConstants'

function LeaveCustomApprover({setLoading, collegeId}) {

    // const [employeeOpt] = useEmployee(collegeId)
    const [employeeOpt, setEmployeeOpt] = useState([])

    const [data, setData] = useState([])

    const [type, setType] = useState('')

    const [edit, setEdit] = useState('')

    const [role, setRole] = useState(sessionStorage.getItem('role') ? sessionStorage.getItem('role') : null)


    const getData = async() => {
        setLoading(0)
        const config={
            method:'get',
            url:`${CUSTOM_APPROVER}?college_id=${collegeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        await axios(config)
        .then(res=>{
            setData(res.data.data)
        })
        .catch(err=>{
            toast.error('Something went wrong')
        })
        setLoading(0)
    }

    const getEmployee = async() => {
        const config={
            method:'get',
            url:`${EMPLOYEE}?college_id=${collegeId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        await axios(config)
        .then(res=>{
            setEmployeeOpt(res.data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }



    useEffect(()=>{
        getEmployee()
        getData()
        
    },[])

    useEffect(() => {
        setRole(sessionStorage.getItem('role') ? sessionStorage.getItem('role') : null)
    }, [])

  return (
    <div className='LeaveCustomApprover'>
        <ModalCustomApprover employeeOpt={employeeOpt} setLoading={setLoading} collegeId={collegeId} reloadData={getData} data={edit} type={type}/>
        <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Custom Approver</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">Employer</a>
                                            </li>
                                            <li className="breadcrumb-item active">Custom Approver</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}


                        <div className="container">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row d-flex justify-content-end p-3">
                                        {
                                            role !== 'ADMIN' ? <button
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalCustomApprover"
                                            onClick={()=>{setEdit();setType('add')}}
                                        >
                                            Add +
                                        </button> : null
                                        }
                                    </div>

                                    <div>
                                        {data
                                        &&
                                        data?.length!==0
                                        ?
                                        data.map((i, key) => (
                                            role !== 'ADMIN' ? 
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalCustomApprover"
                                                onClick={()=>{ setEdit(i);setType('edit')}}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.name}
                                                    </div>
                                                    <div className="role-code">
                                                        {employeeOpt?.find(s=>s.id==i?.employee_id)?.first_name+ ' '+ employeeOpt?.find(s=>s.id==i?.employee_id)?.last_name}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                            : <div
                                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                            // data-toggle="modal"
                                            // data-target="#ModalCustomApprover"
                                            // onClick={role !== 'ADMIN' ? ()=>{ setEdit(i);setType('edit')} : null}
                                        >
                                            <div className="col-11" key={key}>
                                                <div className="role-title">
                                                    {i.name}
                                                </div>
                                                <div className="role-code">
                                                    {employeeOpt?.find(s=>s.id==i?.employee_id)?.first_name+ ' '+ employeeOpt?.find(s=>s.id==i?.employee_id)?.last_name}
                                                </div>
                                            </div>
                                            <div className="col-1 d-flex align-items-center justify-content-end">
                                                {'>'}
                                            </div>
                                        </div>
                                        ))
                                        :
                                        <Nodata/>
                                        }
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

export default LeaveCustomApprover