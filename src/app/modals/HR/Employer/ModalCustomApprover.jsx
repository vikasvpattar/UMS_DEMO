import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler';
import { COLLEGE_SPECIALIZATION, CUSTOM_APPROVER, DEPARTMENTS } from '../../../utils/apiConstants';
import { toast } from 'react-toastify'
import useEmployee from './../../../Hooks/Employee/useEmployee'

function ModalCustomApprover(props) {

    const [name, setName] = useState('')
    const employeeOpt = props.employeeOpt
    const [employee, setEmployee] = useState('')

    console.log(employeeOpt);

    const config = {
        method: props.type === 'edit' ? 'put' : 'post',
        url: `${CUSTOM_APPROVER}${props.type === 'edit' ? '/' + props.data.id : ''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "name": name,
            "employee_id": employee,
            "college_id":props?.collegeId
        }
    };

    const clearData = () => {
        setName('')
        setEmployee('')
    }

    const handleSubmit = async() => {
        props.setLoading(1)
        await axios(config)
        .then(res=>{
            console.log(res);
            toast.success('Success')
            props.reloadData()
            clearData()
        })
        .catch(err=>{
            console.log(err);
            toast.error(err?.response?.data?.message)
        })
        props.setLoading(0)
    }

    const handleDelete = async() =>{
        props.setLoading(1)
        const config = {
            method: 'put',
            url: `${CUSTOM_APPROVER}/${props?.data?.id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                status:'INACTIVE'
            }
        }
        await axios(config)
        .then(res=>{
            toast.success('success')
            props.reloadData()
        })
        .catch(err=>{
            toast.error('Something went wrong')
        })
        props.setLoading(0)
    }

    useEffect(() => {

        if (props?.type === 'edit') {
            if (props?.data) {
                setName(props?.data?.name)
                setEmployee(props?.data?.employee_id)
            }
        }

        if (props.type === 'add') {
            clearData()
        }

    }, [props.data, props.type])


    // const [programData, setProgramData] = useState([]);

    // const selectProgram = (id) => {
    //     console.log(id)
    //     // setProgramDat(allSpecializationData.filter(item.colleg_type_id => item.program_id == id));
    // }

    return (
        <div className='ModalDepartments'>
            <div
                className="modal fade"
                id="ModalCustomApprover"
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
                                {props.type === 'edit' ? 'Edit' : 'Add'} Custom Approver
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
                                        <label htmlFor="">Title</label>
                                        <input 
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter Title of the Approver'
                                        value={name}
                                        onChange={e=>{setName(e.target.value)}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Employee</label>
                                        <select 
                                        name="" 
                                        id=""
                                        className='form-control'
                                        value={employee}
                                        onChange={e=>setEmployee(e.target.value)}
                                        >
                                            <option value="">Select Employee</option>
                                            {
                                                employeeOpt?.map((i,key)=>(
                                                    <option value={i?.id}>{i?.first_name + ' ' + i?.last_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between px-2">
                                {
                                    props?.type=='edit'
                                    ?
                                    <button
                                        className='btn btn-danger btn-rounded btn-outline'
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                    :
                                    <button
                                        className='btn btn-danger btn-rounded btn-outline'
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        Cancel
                                    </button>
                                }
                                <button
                                    className='btn btn-success btn-rounded btn-outline'
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { handleSubmit() }}
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

export default ModalCustomApprover