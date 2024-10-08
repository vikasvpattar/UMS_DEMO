import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler';
import { COLLEGE_SPECIALIZATION } from '../../../utils/apiConstants';
import { toast } from 'react-toastify';

function ModalCollegeSpecialization(props) {
    const [college, setCollege] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [program, setProgram] = useState('')
    const [checkbox, setCheckbox] = useState('');

    const CollegeData = JSON.parse(localStorage.getItem("ALL_DATA")).college
    const programData = JSON.parse(localStorage.getItem("ALL_DATA")).program
    const specializationData = JSON.parse(localStorage.getItem("ALL_DATA")).specialization


    const config = {
        method: props.type === 'edit' ? 'put' : 'post',
        url: `${COLLEGE_SPECIALIZATION}${props.type === 'edit' ? '/' + props.data.id : ''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "college_id": college,
            "status": checkbox ? "ACTIVE" : "INACTIVE",
            "specialization_id": specialization,
            "program_id": program
        }
    };

    const clearData = () => {
        setCollege('')
        setProgram('')
        setSpecialization('')
        setCheckbox(true)
    }

    const SubmitModal = async () => {
        await axios(config)
            .then((res) => {
                console.log(res);
                clearData()
                toast.success("New College specialization added successfully")
                props.reloadData();
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        if (props.type === 'edit') {
            if (props.data) {
                setCollege(props.data.college_id)
                setProgram(props.data.program_id)
                setSpecialization(props.data.specialization_id)
                setCheckbox(props.data.status === "ACTIVE" ? true : false)
            }
        }

        if (props.type === 'add') {
            clearData()
        }

    }, [props.data, props.type])
    return (
        <div className='ModalCollegeSpecialization'>
            <div
                className="modal fade"
                id="ModalCollegeSpecialization"
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
                                {props.type === 'edit' ? 'Edit' : 'Add'} College Specializations
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
                                        <lable>
                                            {" "}
                                            College <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className={`form-control ${props.type === 'edit' ? 'cursor-disable' : ''}`}
                                            value={college}
                                            disabled={props.type === 'edit' ? true : false}
                                            onChange={(e) => { setCollege(e.target.value) }}
                                        >
                                            <option value="">Select the College</option>
                                            {CollegeData.map((i, key) => (
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Specialization <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className={`form-control ${props.type === 'edit' ? 'cursor-disable' : ''}`}
                                            value={specialization}
                                            disabled={props.type === 'edit' ? true : false}
                                            onChange={(e) => { setSpecialization(e.target.value) }}
                                        >
                                            <option value="">Select the Specialization</option>
                                            {specializationData.map((i, key) => (
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Program <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className={`form-control ${props.type === 'edit' ? 'cursor-disable' : ''}`}
                                            value={program}
                                            disabled={props.type === 'edit' ? true : false}
                                            onChange={(e) => { setProgram(e.target.value) }}
                                        >
                                            <option value="">Select the College</option>
                                            {programData.map((i, key) => (
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Code <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className={`form-control ${props.type==='edit'?'cursor-disable':''}`}
                                            name="followup"
                                            id=""
                                            readOnly={props.type==='edit'?true:false}
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                        />
                                    </div>
                                </div> */}
                                <div className="col-12 mb-3">
                                    <Toggler
                                        defaultChecked={true}
                                        checkboxValue={(e) => { setCheckbox(e.target.checked) }}
                                    />
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            id=""
                                            readOnly=""
                                            value={desc}
                                            onChange={(e) => { setDesc(e.target.value) }}
                                        />
                                    </div>
                                </div> */}
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

export default ModalCollegeSpecialization