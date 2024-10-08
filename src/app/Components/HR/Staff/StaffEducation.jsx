import React,{useState, useEffect} from 'react'
import ModalStaffEducation from '../../../modals/HR/Staff/ModalStaffEducation'
import { EMPLOYEE_EDUCATION } from '../../../utils/apiConstants'
import './EditStaff.scss'
import {toast} from 'react-toastify'
import Loader from '../../Loader/Loader'
import axios from 'axios'
import NoData from './../../NoData/Nodata'

function StaffEducation({tab,id, setLoading}) {

    const [data,setData] = useState([])
    const [type,setType] = useState('')
    const [edit,setEdit] = useState()

    const getData = async() => {

        setLoading(1)
        
        const config = {
            method: 'get',
            url: `${EMPLOYEE_EDUCATION}?employee_id=${id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}` ,
                'Content-Type': 'application/json'
            },
        }
        
        
        await axios(config)
        .then((res)=>{
            setLoading(0)
            console.log(res);
            setData(res.data.data)
            // toast.success("data fetched")
        })
        .catch(err=>{
            setLoading(0)
            toast.error(err.response.data.message)
        })
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='StaffEducation Staff'>
        <ModalStaffEducation  type={type} id={id} data={edit} reloadData={getData} setLoading={setLoading}/>
        <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {" "}
                                <div className="col-4">
                                    <h4 className="card-title">{tab}</h4>
                                </div>
                            </div>
                            <hr />
                            <br />

                            <div className="row float-right">
                                <button
                                 className='btn btn-success btn-rounded btn-outline'
                                 data-toggle="modal"
                                 data-target="#ModalStaffEducation"
                                 onClick={()=>{setType('add');setEdit()}}
                                 >
                                    Add New +
                                </button>
                            </div>

                            <br />
                            <br />
                            <br />

                            <div className="row">
                                <div className="row px-5 w-100 gap-5">
                                    {data&&data.length!==0?data?.map((i, key) => (
                                        <div 
                                        className="col-lg-6 col-xl-4 col-md-6 col-sm-12 crd rowData"
                                        key={key}
                                        >
                                            <div 
                                            className="rounded border card-default card "
                                            >
                                                <div className="row  p-3">


                                                <div className="col-12 fs-5 d-flex justify-content-between align-items-center">
                                                        <div>
                                                            {i.school}
                                                        </div>
                                                        <div className='d-flex justify-content-between'>


                                                            {i.attachment &&
                                                                <div className='px-1 rounded secondary mr-2'>
                                                                    <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                                                </div>
                                                            }
                                                            <div 
                                                            className='px-1 rounded text-secondary cursor-pointer'
                                                            data-toggle="modal"
                                                            data-target="#ModalStaffEducation"
                                                            onClick={() => { setType('edit'); setEdit(i) }}
                                                            >
                                                                <i className="ri-edit-box-line"></i>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-12 fs-5 jobPos">
                                                        {i.from_year?i.from_year+'-':''}{i.to_year}
                                                    </div>
                                                    <div className="col-md-6 fs-6 text-secondary">
                                                        <div>
                                                            Degree
                                                        </div>
                                                        <div>
                                                            {i.degree ? i.degree : '__'}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 fs-6">
                                                        <div>
                                                            Grade
                                                        </div>
                                                        <div>
                                                            {i.grade ? i.grade : '__'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                :
                                <div className="col-12">

                                    <NoData/>
                                </div>
                                }
                                </div>

                            </div>



                        </div>
                    </div>
                    <input type="hidden" name="page_name"  />
                    <input type="hidden" name="staffid"  />
                    {/* end card */}
                </div>
            </div>
    </div>
  )
}

export default StaffEducation