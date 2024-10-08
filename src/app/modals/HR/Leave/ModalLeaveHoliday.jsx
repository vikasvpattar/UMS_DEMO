import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler'
import { LEAVE_HOLIDAY_TYPE } from '../../../utils/apiConstants'

function ModalLeaveHoliday(props) {
    const [code,setCode] = useState('')
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [checkbox,setCheckbox] = useState(true);
    const [data,setData] = useState()



    const config = {
        method: props.type==='edit'?'put':'post',
        url: `${LEAVE_HOLIDAY_TYPE}${props.type==='edit'?'/'+props.data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "name":name,
            "description":desc,
            "status":checkbox?"ACTIVE":"INACTIVE",
        }
    };

    const clearData = () =>{
        setName('')
        setCode('')
        setDesc('')
        setCheckbox(true)
    }


    const SubmitModal = async () => {
        await axios(config)
            .then((res) => {
                console.log(res);
                clearData()
                props.reloadData();
                toast.success("Holiday Type Added Successfully")
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        if(props.type==='edit'){
            if(props.data){
                setName(props.data.name);
                setCode(props.data.id)
                setDesc(props.data.description)
                setCheckbox(props.data.status==="ACTIVE"?true:false)
            }
        }

        if(props.type==='add'){
            clearData()
        }

    }, [props.data,props.type])

    return (
        <div className='ModalLeaveHoliday'>
            <div
                className="modal fade"
                id="ModalLeaveHoliday"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-xl"
                    role="document"
                >
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Add Holiday
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
                            <div className="row mb-3">
                                <div className="col-12">
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
                                            onChange={(e)=>{setCode(e.target.value)}}
                                        />
                                    </div>
                                </div>
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
                                            value={name}
                                            onChange={(e)=>{setName(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Description <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            value={desc}
                                            onChange={(e)=>{setDesc(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                            <Toggler 
                                            defaultChecked={checkbox}
                                            checkboxValue={(e)=>{setCheckbox(e.target.checked)}}
                                            />
                                </div>
                                {/* <div className="col-12">
                                    <div className="form-control bg-secondary text-light my-3">
                                        Holidays
                                    </div>
                                </div> */}
                                {/* <div className="col-12">
                                    <label htmlFor="">year</label>
                                    <select name="" id="" className='form-control'>
                                        <option value="">Select Year</option>
                                        <option value="">2018</option>
                                        <option value="">2019</option>
                                        <option value="">2020</option>
                                        <option value="">2021</option>
                                        <option value="">2022</option>
                                    </select>
                                </div> */}
                                {/* <div className="col-12 border my-3 p-2">
                                    <div className="row p-3 px-3">
                                        {
                                            data.map((i,key)=>(
                                                <div className="col-12 row border my-3" key={key}>
                                                    <div className="col-12">Date : {i.date}</div>
                                                    <div className="col-12">Description : {i.desc}</div>
                                                    <div className="col-12">Remark : {i.Remark}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className=" d-flex justify-content-end">
                                        {
                                            newYear?
                                            <button className="btn btn-danger " onClick={() => { setNewYear(0) }}>
                                            cancel
                                        </button>
                                        :
                                        <button className="btn btn-primary " onClick={() => { setNewYear(1) }}>
                                        Add
                                    </button>
                                        }
                                        
                                        
                                    </div>
                                    {newYear?
                                        <div className="row bg-secondary mt-2 text-light py-3">
                                            <div className="col-md-3 mt-3">
                                                <label htmlFor="">date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={date}
                                                    onChange={(e)=>{setDate(e.target.value)}}
                                                />
                                            </div>
                                            <div className="col-md-3 mt-3">
                                                <label htmlFor="">Desciption</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={desc}
                                                    onChange={(e)=>{setDesc(e.target.value)}}
                                                />
                                            </div>
                                            <div className="col-md-5 mt-3">
                                                <label htmlFor="">Remark</label>
                                                <textarea 
                                                name="" 
                                                id="" 
                                                className="form-control" 
                                                rows={1} 
                                                placeholder='Enter Description Here'
                                                onChange={(e)=>{setRemark(e.target.value)}}
                                                >

                                                </textarea>
                                            </div>
                                            <div className="col-md-1 mt-3 d-flex flex-column justify-content-end">
                                                <button className='btn btn-light' onClick={() => { addNewYear() }}> + </button>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
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

export default ModalLeaveHoliday