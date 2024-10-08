import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler';
import { COLLEGES } from '../../../utils/apiConstants';
import { toast } from 'react-toastify';

function ModalCollege(props) {
    const [location, setLocation] = useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [ctype, setCtype] = useState('');
    const [checkbox, setCheckbox] = useState(true);

    const ctypeData = JSON.parse(localStorage.getItem("ALL_DATA")).collegeType
    // console.log(ctypeData);

    const config = {
        method: props.type === 'edit' ? 'put' : 'post',
        url: `${COLLEGES}${props.type === 'edit' ? '/' + props.data.id : ''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "name": name,
            "status": checkbox ? "ACTIVE" : "INACTIVE",
            "college_type_id": ctype,
            "location": location,
            "phone": phone,
            "email": email
        }
    };

    const clearData = () => {
        setName('')
        setCtype('')
        setLocation('')
        setPhone('')
        setEmail('')
        setCheckbox(true)
    }

    const SubmitModal = async () => {
        props.setLoading(1)
        await axios(config)
            .then((res) => {
                props.setLoading(0)
                console.log(res);
                clearData()
                props.reloadData();
                toast.success("College Added Successfully")
            })
            .catch(err => {
                props.setLoading(0)
                console.log(err)})
    }


    useEffect(() => {

        if (props.type === 'edit') {
            if (props.data) {
                setName(props.data.name);
                setCtype(props.data.college_type_id)
                setEmail(props.data.email)
                setPhone(props.data.phone)
                setLocation(props.data.location)
                setCheckbox(props.data.status === "ACTIVE" ? true : false)
            }
        }

        if (props.type === 'add') {
            clearData()
        }

    }, [props.data, props.type])
    return (
        <div className='ModalCollege'>
            <div
                className="modal fade"
                id="ModalSpecialization"
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
                                {props.type === 'edit' ? 'Edit' : 'Add'} Colleges
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
                                            Name <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            id=""
                                            readOnly=""
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                            placeholder="Enter name"
                                        />
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
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            College Type <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className={`form-control ${props.type === 'edit' ? 'cursor-disable' : ''}`}
                                            value={ctype}
                                            disabled={props.type === 'edit' ? true : false}
                                            onChange={(e) => { setCtype(e.target.value) }}
                                        >
                                            <option value="">Select the College type</option>
                                            {ctypeData.map((i, key) => (
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Location
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            id=""
                                            readOnly=""
                                            value={location}
                                            onChange={(e) => { setLocation(e.target.value) }}
                                            placeholder="Enter the location"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Phone
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            id=""
                                            readOnly=""
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value) }}
                                            placeholder="Enter Phone"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Email
                                        </lable>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="followup"
                                            id=""
                                            readOnly=""
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <Toggler
                                        defaultChecked={checkbox}
                                        checked={checkbox}
                                        checkboxValue={(e) => { setCheckbox(e.target.checked) }}
                                    />
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

export default ModalCollege