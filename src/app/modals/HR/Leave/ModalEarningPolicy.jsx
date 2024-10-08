import React,{useState,useEffect} from 'react'
import Toggler from '../../../Components/Toggler/Toggler'
import { LEAVE_EARNING_POLICY } from '../../../utils/apiConstants';
import axios from 'axios';
import {toast} from 'react-toastify'
import Loader from '../../../Components/Loader/Loader';

function ModalEarningPolicy(props) {
    const [code, setCode] = useState('');
    const [desc, setDesc] = useState("");
    const [checkbox,setCheckbox] = useState(true);
    const [method, setMethod] = useState('');
    const [period, setPeriod] = useState('');
    const [earnAt, setEarnAt] = useState('');


    //Config for axios to send requests
    
    const config = {
        method: props.type==='edit'?'put':'post',
        url: `${LEAVE_EARNING_POLICY}${props.type==='edit'?'/'+props.data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "status":checkbox?"ACTIVE":"INACTIVE",
            "description":desc,
            "method":method,
            "accrual_period":period,
            "earned_at":earnAt
        }
    };

    //Function to clear the data
    const clearData = () =>{
        setCode('')
        setDesc('')
        setMethod('')
        setPeriod('')
        setEarnAt('')
        setCheckbox(true)
    }

    //Function which triggers when user save changes 
    //function hit the end points with put or post requests
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
                console.log(err)
            })
    }


    useEffect(() => {

        if(props.type==='edit'){
            if(props.data){
                setCode(props.data.id)
                setDesc(props.data.description)
                setMethod(props.data.method)
                setPeriod(props.data.accrual_period)
                setEarnAt(props.data.earned_at)
                // setCheckbox(true)
                setCheckbox(props.data.status==="ACTIVE"?true:false)
            }
        }

        if(props.type==='add'){
            clearData()
        }

    }, [props.data,props.type])

  return (
    <div className='ModalEarningPolicy'>
        <div
                className="modal fade"
                id="ModalEarningPolicy"
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
                                Add Earning Policy
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
                                    checked={checkbox}
                                    checkboxValue={(e)=>{setCheckbox(e.target.checked)}}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">Method</label>
                                    <select 
                                    className='form-control'
                                    value={method}
                                    onChange={(e)=>{setMethod(e.target.value)}}
                                    >
                                        <option value="" selected>Select Method</option>
                                        <option value="Earned Immediately">Earned Immediately</option>
                                        <option value="Prorated">Prorated</option>
                                        <option value="Custom Monthly Allocation">Custom Monthly Allocation</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">Accrual Period</label>
                                    <select 
                                    name="" 
                                    id="" 
                                    className='form-control'
                                    value={period}
                                    onChange={(e)=>{setPeriod(e.target.value)}}
                                    >
                                        <option value="" selected>Select Accural Period</option>
                                        <option value="Monthly" >Monthly</option>
                                        <option value="Daily">Daily</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">Earn At</label>
                                    <select 
                                    name="" 
                                    id="" 
                                    className='form-control'
                                    value={earnAt}
                                    onChange={(e)=>{setEarnAt(e.target.value)}}
                                    >
                                        <option value="" selected>Select Earning At</option>
                                        <option value="End of Accrual Period" >End of Accrual Period</option>
                                        <option value="End of Accrual Period" >End of Accrual Period</option>
                                    </select>
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

export default ModalEarningPolicy