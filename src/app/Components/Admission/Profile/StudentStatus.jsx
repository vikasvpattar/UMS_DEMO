import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROUTES } from '../../../Router/routerConfig'
import { STUDENT_ADMISSION_DETAILS } from '../../../utils/apiConstants'

const StudentStatus = ({data,reloadData,setLoading, role}) => {


    const navigate = useNavigate()
    const handleSubmit = (i,d) =>{


        console.log(data);
        if(data?.basic_data?.aadhar?.link && !(data?.basic_data?.aadhar?.status == "APPROVED")){
            return toast.error('All documents are not yet Approved')
        }
        if(data?.basic_data?.sslc_markscard?.link && !(data?.basic_data?.sslc_markscard?.status == "APPROVED")){
            return toast.error('All documents are not yet Approved')
        }
        if(data?.basic_data?.pu_markscard?.link && !(data?.basic_data?.pu_markscard?.status == "APPROVED")){
            return toast.error('All documents are not yet Approved')
        }
        setLoading(1)
        
        const config = {
            method:'put',
            url:`${STUDENT_ADMISSION_DETAILS}/${data?.basic_data?.user_id}`,
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
                'Content-Type': 'application/json'
            },
            data:{
                basic_data:{
                    application_status:i?d:'DECLINED',
                },
                form_data:{

                }
            }
        }

        console.log(config);
        
        axios(config)
        .then(res=>{
            setLoading(0)
            toast.success(res.data.message)
            reloadData()
            if(d=='APPROVED_REGISTRAR')
            {
                navigate(ROUTES.Registar.Admission.AdmissionDetails)
            }
            // reloadData()
        })
        .catch(err=>{
            setLoading(0)
            toast.error(err.response.data.message)
        })
        setLoading(0)
    }


  return (
    
    <div className='StudentStatus'>
        {
            role=='ADMIN'
            ?
            <div className="row mt-3">
                <h4 className='col-12'>Admission Status of The Students</h4>

                <div className="col-12 d-flex justify-content-end my-3" style={{gap:'10px'}}>
                    {
                        data?.basic_data?.application_status == 'SUBMITTED'
                        ?
                        <>
                            <button className='btn btn-danger' onClick={()=>{handleSubmit(0)}}>DECLINE</button>
                            <button className='btn btn-success' onClick={()=>{handleSubmit(1,'APPROVED_FACULTY')}}>APPROVE</button>
                        </>
                        :
                        null
                    }
                </div>

                <table className="table table-bordered nowrap overflow-auto">
                    <thead>
                        <tr>
                            <th>User Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Faculty Approval</td>
                            <td>
                                <div className={`badge ${data?.basic_data?.application_status=='APPROVED_FACULTY'?'badge-success':data?.basic_data?.application_status=='SUBMITTED'?'badge-danger':'badge-success'}`}>
                                    {data?.basic_data?.application_status=='APPROVED_FACULTY'?'APPROVED':data?.basic_data?.application_status=='SUBMITTED'?'PENDING':'APPROVED'}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Registrar Approval</td>
                            <td>
                                <div className={`badge ${data?.basic_data?.application_status=='APPROVED_FACULTY'?'badge-danger':data?.basic_data?.application_status=='SUBMITTED'?'badge-warning':data?.basic_data?.application_status=='APPROVED_REGISTRAR'?'badge-success':'text-warning'}`}>
                                {data?.basic_data?.application_status=='APPROVED_FACULTY'?'PENDING':data?.basic_data?.application_status=='SUBMITTED'?'Waitiong for Approval from faculty':data?.basic_data?.application_status=='APPROVED_REGISTRAR'?'Approved':'Hm have to look for it'}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            role=='SUPERADMIN'
            ?
            <div className="row mt-3">
                <h4 className='col-12'>Admission Status of The Students</h4>

                <div className="col-12 d-flex justify-content-end my-3" style={{gap:'10px'}}>
                    {
                        data?.basic_data?.application_status == 'SUBMITTED'
                        ?
                        <div>
                            <div className="text-left self-align-left badge badge-warning">
                                You cannot submit until Dean Reviews the application
                            </div>
                        </div>
                        :
                        data?.basic_data?.application_status == 'APPROVED_FACULTY'
                        ?
                        <>
                            <button className='btn btn-danger' onClick={()=>{handleSubmit(0)}}>DECLINE</button>
                            <button className='btn btn-success' onClick={()=>{handleSubmit(1,'APPROVED_REGISTRAR')}}>APPROVE</button>
                        </>
                        :
                        null
                    }
                </div>

                <table className="table table-bordered nowrap overflow-auto">
                    <thead>
                        <tr>
                            <th>User Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Faculty Approval</td>
                            <td>
                                <div className={`badge ${data?.basic_data?.application_status=='APPROVED_FACULTY'?'badge-success':data?.basic_data?.application_status=='SUBMITTED'?'badge-danger':'badge-success'}`}>
                                    {data?.basic_data?.application_status=='APPROVED_FACULTY'?'APPROVED':data?.basic_data?.application_status=='SUBMITTED'?'PENDING':'APPROVED'}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Registrar Approval</td>
                            <td>
                                <div className={`badge ${data?.basic_data?.application_status=='APPROVED_FACULTY'?'badge-danger':data?.basic_data?.application_status=='SUBMITTED'?'badge-warning':data?.basic_data?.application_status=='APPROVED_REGISTRAR'?'badge-success':'text-warning'}`}>
                                {data?.basic_data?.application_status=='APPROVED_FACULTY'?'PENDING':data?.basic_data?.application_status=='SUBMITTED'?'Waitiong for Approval from faculty':data?.basic_data?.application_status=='APPROVED_REGISTRAR'?'Approved':'Hm have to look for it'}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            :
            <div>Only Admins can view and respond</div>
        }
    </div>
  )
}

export default StudentStatus