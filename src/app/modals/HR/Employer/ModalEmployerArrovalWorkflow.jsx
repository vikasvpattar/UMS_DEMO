import React, { useState,useEffect  } from 'react'
import Toggler from '../../../Components/Toggler/Toggler'
import { LOCAL_JOBROLES } from '../../../utils/LocalStorageConstants'

function ModalEmployerArrovalWorkflow() {
    const [LocalJobRoles,setLocalJobRoles] = useState(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))

    const [toggler,setToggler] = useState(1)
    const [code,setCode] = useState()
    const [title,setTitle] = useState()
    const [approver1,setApprover1] = useState()
    const [approver2,setApprover2] = useState()
    const [approver3,setApprover3] = useState()

    useEffect(()=>{
        setLocalJobRoles(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))
    },[])

  return (
    <div className='ModalEmployerArrovalWorkflow'>
        <div
                className="modal fade"
                id="ModalEmployerArrovalWorkflow"
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
                                {/* {props.type === 'edit' ? 'Edit' : 'Add'}  */}
                                Approval Workflow
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
                                        <label htmlFor="">CODE <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder='Enter Code'
                                        value={code}
                                        onChange={(e)=>{setCode(e.target.value)}}
                                         />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">Title <span style={{color:'red'}}>*</span></label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder='Enter Title'
                                        value={title}
                                        onChange={(e)=>{setTitle(e.target.value)}}
                                         />
                                    </div>
                                </div>
                                <br /><br />
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">1st Approver <span style={{color:'red'}}>*</span></label>
                                        <select 
                                        type="text" 
                                        className='form-control'
                                        value={approver1}
                                        onChange={(e)=>{setApprover1(e.target.value)}}
                                         >
                                            <option value='' selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i,key)=>(
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">2nd Approver <span style={{color:'red'}}>*</span></label>
                                        <select 
                                        type="text"
                                        placeholder='Enter Title'
                                        className='form-control'
                                            value={approver2}
                                            onChange={(e)=>{setApprover2(e.target.value)}}
                                         >
                                            <option value="" selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i,key)=>(
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">3rd Approver <span style={{color:'red'}}>*</span></label>
                                        <select 
                                        type="text" 
                                        className='form-control'
                                            value={approver3}
                                            onChange={(e)=>{setApprover3(e.target.value)}}
                                         >
                                            <option value="" selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i,key)=>(
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-12 my-3">
                                    <Toggler 
                                    defaultChecked={true}
                                    checked={toggler}
                                    checkboxValue={(e)=>{setToggler(e.target.checked)}}
                                    label={'Notify on Final approval / rejection'}/>
                                </div>

                            </div>
                            <div className="row d-flex justify-content-between px-2">
                                <button
                                    className='btn btn-danger btn-rounded btn-outline'
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    Cancel
                                </button>
                                <button
                                    className='btn btn-success btn-rounded btn-outline'
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    // onClick={() => { SubmitModal() }}
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

export default ModalEmployerArrovalWorkflow