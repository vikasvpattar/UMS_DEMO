import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { STUDENT_ADMISSION_DETAILS } from '../../../utils/apiConstants'
// import { STUDENT_ADMISSION_DETAILS } from '../../utils/apiConstants'

const StudentStatus = ({data,reloadData,setLoading}) => {


    const handleSubmit = () =>{
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
                    application_status:'APPROVED_REGISTRAR',
                    department_id:data?.basic_data?.department_id
                },
                form_data:{

                }
            }
        }
        
        axios(config)
        .then(res=>{
            setLoading(0)
            toast.success(res.data.message)
            reloadData()
        })
        .catch(err=>{
            setLoading(0)
            toast.error(err.response.data.message)
        })
    }


  return (
    <div className='StudentStatus'>
        <div className="row mt-3">
            <h4 className='col-12'>Admission Status of The Studentsdf</h4>

            <div className="col-12 d-flex justify-content-end my-3" style={{gap:'10px'}}>
                <button className='btn btn-danger'>DECLINE</button>
                <button className='btn btn-success' onClick={()=>{handleSubmit()}}>APPROVE</button>
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
                        <td className='text-success'>APPROVED</td>
                    </tr>
                    <tr>
                        <td>Registrar Approval</td>
                        <td className='text-danger'>PENDING</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StudentStatus