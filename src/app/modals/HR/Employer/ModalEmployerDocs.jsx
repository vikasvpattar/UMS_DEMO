import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios';
import { DOCUMENT_CATEGORY, TRAINER } from '../../../utils/apiConstants';

function ModalEmployerDocs({setLoading , type, reloadData, data }) {

    const [code, setCode] = useState('');
    const [name, setName] = useState("");
    const [desc, setDesc] = useState('');

    const clearData = () =>{
        setCode('')
        setName('')
        setDesc('')
    }


    const config = {
        method: type==='edit'?'put':'post',
        url: `${DOCUMENT_CATEGORY}${type==='edit'?'/'+data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "title":name,
            "remark": desc,
        }
    };


    const SubmitModal = async () => {
        setLoading(1)
        await axios(config)
        .then((res) => {
                setLoading(0)
                console.log(res);
                clearData()
                reloadData();
                toast.success("Added successfully")
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
                setLoading(0)
            })
    }

    useEffect(() => {

        if(type==='edit'){
            if(data){
                setName(data.title);
                setCode(data.id)
                setDesc(data.remark)
            }
        }

        if(type==='add'){
            clearData()
        }

    }, [data,type])

  return (
    <div className='ModalEmployerDocs'>
        <div
                className="modal fade"
                id="ModalEmployerDocs"
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
                                Add New Document Category
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
                                            value={name}
                                            onChange={(e)=>{setName(e.target.value)}}
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
                                            className="form-control"
                                            name="followup"
                                            value={code}
                                            readOnly={type==='edit'?true:false}
                                            onChange={(e)=>{setCode(e.target.value)}}
                                        />
                                    </div>
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
                                            value={desc}
                                            onChange={(e)=>{setDesc(e.target.value)}}
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
                                onClick={SubmitModal}
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

export default ModalEmployerDocs