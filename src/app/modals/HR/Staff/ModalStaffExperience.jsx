import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE_EXPERIENCE } from '../../../utils/apiConstants'
import { getFileUrl } from '../../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT, ASSET_EMPLOYEE_EXPERIENCE } from '../../../utils/AssetsReferenceTypes'

function ModalStaffExperience({ type, id, data, reloadData , setLoading}) {


    
    //object for all input values
    const [user, setUser] = useState({
        employer: '',
        job_title: '',
        from: '',
        to: '',
        duration: '',
        salary: '',
        region: '',
        attachment: '',
        remark: '',
    })

    const [attachment,setAttachment] = useState()
    
    //Function upload attachment to the s3
    const addAttachment = async(e) =>{
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${id}_Experience`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
            setUser(prevValue => ({
                ...prevValue,
                attachment:d?d:''
            }))
        } catch(error) {
            console.log(error);
        }

    }

    //handleChange for all input fields
    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    //fuction to clear the input fields after completion of any operation
    const clearData = () =>{
        setUser({
            employer: '',
            job_title: '',
            from: '',
            to: '',
            duration: '',
            salary: '',
            region: '',
            attachment: '',
            remark: '',
        })
    }


    //fuction to call after post or put
    const handleSubmit = async(d) =>{


        //config for axios
        const config = {
            method: type==='edit'?'put':'post',
            url: `${EMPLOYEE_EXPERIENCE}${type==='edit'?'/'+data.id:''}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
            data: {
                "employee_id": id,
                ...user,
                "status":d?"INACTIVE":"ACTIVE"
            }
        };
        console.log(config);
    
    
            setLoading(1)
            await axios(config)
            .then((res)=>{
                toast.success(res.data.message)
                console.log(res);
                setLoading(0)
                reloadData()
            })
            .catch(err=>{
                console.log(err);
                toast.error("Something went wrong")
                setLoading(0)
            })
        }

    useEffect(() => {

        if(type==='edit'){
            if(data){
                setUser({
                    employer:data.employer,
                    job_title:data.job_title,
                    from:data.from.split("-")[0]+'-'+data.from.split("-")[1],
                    to:data.to.split("-")[0]+'-'+data.to.split("-")[1],
                    duration:data.duration,
                    salary:data.salary,
                    region:data.region,
                    attachment:data.attachment,
                    remark:data.remark,
                })
            }
        }

        if(type==='add'){
            clearData()
        }

    }, [data,type])



    return (
        <div className='ModalStaffExperience'>
            <div
                className="modal fade"
                id="ModalStaffExperience"
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
                                Add New Experience
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Employer <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="employer"
                                            value={user.employer}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Job Title<span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="job_title"
                                            value={user.job_title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            From <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="month"
                                            className="form-control"
                                            name="from"
                                            value={user.from}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            To <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="month"
                                            className="form-control"
                                            name="to"
                                            value={user.to}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Duration (Years)
                                        </lable>
                                        <input
                                            className="form-control"
                                            name="duration"
                                            type={'text'}
                                            value={user.duration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Salary
                                        </lable>
                                        <input
                                            className="form-control"
                                            type={'number'}
                                            placeholder='Salary in INR'
                                            name="salary"
                                            value={user.salary}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Country / Region
                                        </lable>
                                        <input
                                            className="form-control"
                                            name="region"
                                            type="text"
                                            value={user.region}
                                            onChange={handleChange}

                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Attachement
                                        </lable>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="attachment"
                                            // value={user.attachment}
                                            onChange={(e)=>{addAttachment(e);}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Remark
                                        </lable>
                                        <textarea
                                            className="form-control"
                                            placeholder='max 200 characters'
                                            name="remark"
                                            value={user.remark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between px-2">
                                <button 
                                className='btn btn-danger btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>{handleSubmit(1)}}
                                >
                                    Delete
                                </button>
                                <button 
                                className='btn btn-success btn-rounded btn-outline'
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>{handleSubmit(0)}}
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

export default ModalStaffExperience