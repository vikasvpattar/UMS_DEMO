import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loader from '../../../Components/Loader/Loader';
import Toggler from '../../../Components/Toggler/Toggler';
import { EMPLOYEE_DOCUMENT_APPROVAL_WORKFLOW, HR_WORKFLOW } from '../../../utils/apiConstants';
import {toast} from 'react-toastify'
import { LOCAL_JOBROLES } from '../../../utils/LocalStorageConstants';



function DocumentApprovalWorkflow(props) {

    const [checkbox, setCheckbox] = useState(true);
    const [code, setCode] = useState('')
    const [desc, setDesc] = useState('')
    const [remark, setRemark] = useState('')

    const [LocalJobRoles, setLocalJobRoles] = useState(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))

    const [toggler, setToggler] = useState(true)
    const [title, setTitle] = useState()
    const [approver1, setApprover1] = useState()
    const [approver2, setApprover2] = useState()
    const [approver3, setApprover3] = useState()

    useEffect(() => {
        setLocalJobRoles(JSON.parse(localStorage.getItem(LOCAL_JOBROLES)))
    }, [])


    //Function to clear All the Data's
    const clearData = () => {
        setCode('')
        setTitle('')
        setRemark('')
        setCheckbox(true)
    }

    //Congiguration for axios
    const config = {
        method: props.type === 'edit' ? 'put' : 'post',
        url: `${HR_WORKFLOW}${props.type === 'edit' ? '/' + props.data.id : ''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "type":'DOCUMENT',
            "title": title,
            "approval_1":approver1,
            "approval_2":approver2,
            "approval_3":approver3,
            "remark": remark,
            "status": checkbox ? "ACTIVE" : "INACTIVE",
            "notification":toggler?1:0,
            "college_id":props.collegeId
        }
    };

    //Function Triggers after Save Changes button is pressed
    //This function do post and put request for document approval workflow
    const SubmitModal = async () => {
        props.setLoading(1)
        await axios(config)
            .then((res) => {
                props.setLoading(0)
                console.log(res);
                clearData()
                props.reloadData();
                toast.success("Document Approvals Added")
            })
            .catch(err => {
                props.setLoading(0)
                console.log(err)
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {

        if (props.type === 'edit') {
            if (props.data) {
                setCode(props.data.id)
                setRemark(props.data.remark)
                setTitle(props.data.title)
                setCheckbox(props.data.status === "ACTIVE" ? true : false)
            }
        }

        if (props.type === 'add') {
            clearData()
        }

    }, [props.data, props.type])

    return (
        <div className='ModalCollegeType'>
            <div
                className="modal fade"
                id="ModalDocApproval"
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
                                Document Approval Workflow
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
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Code <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                        />
                                    </div>
                                </div> */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Title <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            name="followup"
                                            value={title}
                                            onChange={(e) => { setTitle(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <Toggler
                                        defaultChecked={true}
                                        checkboxValue={(e) => { setCheckbox(e.target.checked) }}
                                    />
                                </div>

                                <div className="col-12">

                                    <h4>Approved By:</h4>
                                </div> */}

                                <div className="col-12">
                                    <Toggler
                                        defaultChecked={checkbox}
                                        checked={checkbox}
                                        checkboxValue={(e) => { setCheckbox(e.target.checked) }}
                                        title={"Line Manager"}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="">1st Approver <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            type="text"
                                            className='form-control'
                                            value={approver1}
                                            onChange={(e) => { setApprover1(e.target.value) }}
                                        >
                                            <option value='' selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i, key) => (
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">2nd Approver <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            type="text"
                                            placeholder='Enter Title'
                                            className='form-control'
                                            value={approver2}
                                            onChange={(e) => { setApprover2(e.target.value) }}
                                        >
                                            <option value="" selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i, key) => (
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="">3rd Approver <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            type="text"
                                            className='form-control'
                                            value={approver3}
                                            onChange={(e) => { setApprover3(e.target.value) }}
                                        >
                                            <option value="" selected>Select Employee</option>
                                            {
                                                LocalJobRoles.map((i, key) => (
                                                    <option key={key} value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 my-3">
                                    <Toggler
                                        defaultChecked={toggler}
                                        checked={toggler}
                                        checkboxValue={(e) => { setToggler(e.target.checked) }}
                                        label={'Notify on Final approval / rejection'} />
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            value={remark}
                                            onChange={(e) => { setRemark(e.target.value) }}
                                        />
                                    </div>
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
                                    onClick={() => { SubmitModal() }}
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

export default DocumentApprovalWorkflow