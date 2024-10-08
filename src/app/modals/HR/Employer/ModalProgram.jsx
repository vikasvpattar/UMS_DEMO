import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Toggler from '../../../Components/Toggler/Toggler';
import {  PROGRAM } from '../../../utils/apiConstants';
import { toast } from 'react-toastify';

function ModalProgram(props) {
    const [code, setCode] = useState('');
    const [name, setName] = useState("");
    const [desc, setDesc] = useState('');
    const [checkbox,setCheckbox] = useState('');

    const config = {
        method: props.type==='edit'?'put':'post',
        url: `${PROGRAM}${props.type==='edit'?'/'+props.data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "name": name,
            "status":checkbox?"ACTIVE":"INACTIVE",
            "description":desc
        }
    };

    const clearData = () =>{
        setCode('')
        setName('')
        setDesc('')
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
                toast.success("Program added successfully")
            })
            .catch(err =>{
                props.setLoading(0)
                console.log(err)})
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
    <div className='ModalProgram'>
        <div
                className="modal fade"
                id="ModalProgram"
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
                                {props.type==='edit'?'Edit':'Add'} Program
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

export default ModalProgram