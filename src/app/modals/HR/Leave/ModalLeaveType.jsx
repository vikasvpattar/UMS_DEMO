import React,{useState,useEffect} from 'react'
import Toggler from '../../../Components/Toggler/Toggler'
import {LEAVE_LEAVE_TYPE} from './../../../utils/apiConstants'
import axios from 'axios'
import {toast} from 'react-toastify'
import Loader from '../../../Components/Loader/Loader';

function ModalLeaveType(props) {
    const [code, setCode] = useState('');
    const [desc, setDesc] = useState("");
    const [dayCount, setDayCount] = useState("");
    const [active,setActive] = useState(1);
    const [paid, setPaid] = useState(1);
    const [negative, setNegative] = useState(1);
    const [reason , setReason ] = useState(1);
    const [attachment,setAttachment ] = useState(1)


    //Function to clear the data
    const clearData = () =>{
        setCode('')
        setDesc('')
        setDayCount('')
        setActive(1)
        setPaid(1)
        setNegative(1)
        setReason(1)
        setAttachment(1)
    }



    //Config for axios to send requests
    const config = {
        method: props.type==='edit'?'put':'post',
        url: `${LEAVE_LEAVE_TYPE}${props.type==='edit'?'/'+props.data.id:''}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
        data: {
            "id": code,
            "status":active?"ACTIVE":"INACTIVE",
            "description":desc,
            "day_count":dayCount,
            "negative_balance":negative,
            "paid_leave":paid,
            "reason_required":reason
        }
    };


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
                toast.error(err.response.data.message)
            })
    }


    useEffect(() => {

        if(props.type==='edit'){
            if(props.data){
                setCode(props.data.id)
                setDesc(props.data.description)
                setDayCount('')
                setActive(props.data.status==="ACTIVE"?true:false)
                setPaid(props.data.paid_leave)
                setNegative(props.data.negative_balance)
                setReason(props.data.reason_required)
                setAttachment(props.data.attachment_required)
            }
        }

        if(props.type==='add'){
            clearData()
        }

    }, [props.data,props.type])


  return (
    <div className='ModalLeaveType'>
        <div
                className="modal fade"
                id="ModalLeaveType"
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
                                Add Leave Type
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
                                    defaultChecked={active}
                                    checked={active}
                                    checkboxValue={(e)=>{setActive(e.target.checked)}}
                                    />
                                </div>
                                    <br /><br />
                                <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Day Count
                                        </lable>
                                        <select
                                         className='form-control'
                                         value={dayCount}
                                         onChange={(e)=>{setDayCount(e.target.value)}}
                                         >
                                            <option value="" selected>Select Day Count</option>
                                            <option value="WorkDay">WorkDay</option>
                                            <option value="Calender day">Calender day</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <Toggler 
                                    label={'Paid Leave'}
                                    defaultChecked={paid}
                                    checked={paid}
                                    checkboxValue={(e)=>{setPaid(e.target.checked)}}
                                    />
                                </div>
                                <br />
                                <br />
                                <br />
                                <div className="col-12">
                                    <Toggler 
                                    label={'Allow Negative Balance'}
                                    defaultChecked={negative}
                                    checked={negative}
                                    checkboxValue={(e)=>{setNegative(e.target.checked)}}
                                    />
                                </div>
                                <br /><br /><br />
                                <div className="col-12">
                                    <Toggler 
                                    label={'Reason Required'}
                                    defaultChecked={reason}
                                    checked={reason}
                                    checkboxValue={(e)=>{setReason(e.target.checked)}}
                                    />
                                </div>
                                <br /><br /><br />
                                <div className="col-12">
                                    <Toggler 
                                    label={'Attachment Required'}
                                    defaultChecked={attachment}
                                    checked={attachment}
                                    checkboxValue={(e)=>{setAttachment(e.target.checked)}}
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

export default ModalLeaveType