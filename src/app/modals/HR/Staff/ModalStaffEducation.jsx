import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'
import { EMPLOYEE_EDUCATION } from '../../../utils/apiConstants'
import { getFileUrl } from '../../../Helpers/Helpers'
import { ASSET_EMPLOYEE_DOCUMENT } from '../../../utils/AssetsReferenceTypes'

function ModalStaffEducation({ type, id, data, reloadData ,setLoading}) {

    //object for all input values
    const [user, setUser] = useState({
        school: '',
        field: '',
        degree: '',
        grade: '',
        from_year: '',
        to_year: '',
        attachment: '',
        remark: '',
    })


    //Function for document Upload
    const addAttachment = async(e) =>{
        try {
            const d = await getFileUrl(ASSET_EMPLOYEE_DOCUMENT,`${id}_Education`,e.target.value.split(".")[1],setLoading,e.target.files[0]);
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
            school: '',
            field: '',
            degree: '',
            grade: '',
            from_year: '',
            to_year: '',
            attachment: '',
            remark: '',
        })
    }


    //fuction to call after post or put
    const handleSubmit = async(d) =>{
        //config for axios
        const config = {
            method: type==='edit'?'put':'post',
            url: `${EMPLOYEE_EDUCATION}${type==='edit'?'/'+data.id:''}`,
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
                setLoading(0)
                toast.success(res.data.message)
                console.log(res);
                reloadData()
            })
            .catch(err=>{
                setLoading(0)
                console.log(err);
                toast.error("Something went wrong")
            })
        }


    useEffect(() => {

        if(type==='edit'){
            if(data){
                setUser({
                    school:data.school,
                    field:data.field,
                    degree:data.degree,
                    grade:data.grade,
                    from_year:data.from_year,
                    to_year:data.to_year,
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
        <div className='ModalStaffEducation'>
            <div
                className="modal fade"
                id="ModalStaffEducation"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered mw-100 w-75"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Add New Education
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
                                            School/College <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="school"
                                            value={user.school}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Field of Study <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="field"
                                            value={user.field}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Degree<span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="degree"
                                            value={user.degree}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Grade
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="grade"
                                            value={user.grade}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            From (Year)
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="from_year"
                                            value={user.from_year}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            To (Year)<span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="to_year"
                                            value={user.to_year}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Attachment
                                        </lable>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="attachment"
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
                                            name="remark"
                                            placeholder='max 200 characters'
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

export default ModalStaffEducation