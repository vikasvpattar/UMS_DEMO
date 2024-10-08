import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler';
import {  SPECIALIZATION } from '../../../utils/apiConstants';
import { toast } from 'react-toastify';

function ModalSpecialization(props) {
    const [code, setCode] = useState('');
    const [name, setName] = useState("");
    const [desc, setDesc] = useState('');
    const [program, setProgram] = useState('');
    const [checkbox,setCheckbox] = useState('');

    const programData = JSON.parse(localStorage.getItem("ALL_DATA")).program
    console.log(programData);

    const config = {
        method: props.type==='edit'?'put':'post',
        url: `${SPECIALIZATION}${props.type==='edit'?'/'+props.data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "name": name,
            "status":checkbox?"ACTIVE":"INACTIVE",
            "program_id":program,
            "description":desc
        }
    };

    const clearData = () =>{
        setCode('')
        setName('')
        setDesc('')
        setProgram('')
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
                toast.success("Specialization successfully added")
            })
            .catch(err => {
                console.log(err)
                props.setLoading(0)
            })
    }


    useEffect(() => {

        if(props.type==='edit'){
            if(props.data){
                setName(props.data.name);
                setCode(props.data.id)
                setDesc(props.data.description)
                setProgram(props.data.program_id)
                setCheckbox(props.data.status==="ACTIVE"?true:false)
            }
        }

        if(props.type==='add'){
            clearData()
        }

    }, [props.data,props.type])
  return (
    <div className='ModalSpecialization'>
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
                                {props.type==='edit'?'Edit':'Add'} Specialization
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
                                            Title <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="followup"
                                            defaultValue={name} 
                                            id=""
                                            readOnly=""
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
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
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Program <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select 
                                        name="" 
                                        className={`form-control ${props.type==='edit'?'cursor-disable':''}`}
                                        value={program}
                                        disabled={props.type==='edit'?true:false}
                                        onChange={(e)=>{setProgram(e.target.value)}}
                                        >
                                            <option value="">Select the Program</option>
                                            {programData.map((i,key)=>(
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                            <Toggler 
                                            defaultChecked={checkbox}
                                            checked={checkbox}
                                            checkboxValue={(e)=>{setCheckbox(e.target.checked)}}
                                            />
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
                                            id=""
                                            readOnly=""
                                            value={desc}
                                            onChange={(e) => { setDesc(e.target.value) }}
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

export default ModalSpecialization