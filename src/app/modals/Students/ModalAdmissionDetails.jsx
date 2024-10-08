import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { STUDENT_ADMISSION_DETAILS } from '../../utils/apiConstants'

const ModalAdmissionDetails = ({data,reloadData,setLoading}) => {

    const handleSubmit = (j) =>{
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
                    application_status:j,
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
        <div
            className="modal fade text-left"
            id='ModalAdmissionDetails'
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
                            Follow up Admission Enquiry
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
                        <div className='text-danger'>Warning : Once Approved or Declined cannot be changed ,you have to contact technical team to get back</div>
                        <div className='d-flex justify-content-between mt-3'>
                            <button 
                            className='btn btn-danger'
                            onClick={()=>handleSubmit('DECLINED')}
                            data-dismiss="modal"
                            aria-label="Close"
                            >Decline</button>
                            <button 
                            className='btn btn-success' 
                            onClick={()=>handleSubmit('APPROVED_REGISTRAR')}
                            data-dismiss="modal"
                            aria-label="Close"
                            >Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAdmissionDetails