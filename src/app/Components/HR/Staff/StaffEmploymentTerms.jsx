import React, { useEffect, useState } from 'react'
import ModalStaffEmploymentTerms from '../../../modals/HR/Staff/ModalStaffEmploymentTerms'
import { EMPLOYEE_EMPLOYEMENT_TERMS } from '../../../utils/apiConstants'
import './EditStaff.scss'
import axios from 'axios'
import {toast} from 'react-toastify'
import Loader from '../../Loader/Loader'
import Nodata from '../../NoData/Nodata'

function StaffEmploymentTerms({tab , id, setLoading}) {

    const [data,setData] = useState([])
    const [type,setType] = useState('')
    const [edit,setEdit] = useState()

    const getData = async() => {

        setLoading(1)
        
        const config = {
            method: 'get',
            url: `${EMPLOYEE_EMPLOYEMENT_TERMS}?employee_id=${id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}` ,
                'Content-Type': 'application/json'
            },
        }
        
        
        await axios(config)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
            // toast.success("data fetched")
            setLoading(0)
        })
        .catch(err=>{
            toast.error(err.response.data.message)
            setLoading(0)
        })
    }

    useEffect(()=>{
        if(tab==='Employment Terms') getData()
    },[tab])

  return (
    <div>
        <div className="row Staff">
            <ModalStaffEmploymentTerms type={type} id={id} data={edit} reloadData={getData} setLoading={setLoading}/>
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
                                 data-target="#ModalStaffEmploymentTerms"
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
                                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 crd rowData" key={key}>
                                            <div 
                                            className="rounded border card-default card cursor-pointer"
                                            data-toggle="modal"
                                            data-target="#ModalStaffEmploymentTerms"
                                            onClick={()=>{setType('edit');setEdit(i)}}
                                            >
                                                <div className="row  p-3">


                                                    <div className="col-12 fs-5">
                                                        {i.effective_date.split("T")[0]}
                                                    </div>
                                                    <div className="col-12 fs-1 jobPos">
                                                        {i.job_type}
                                                    </div>
                                                    <div className="col-md-6 fs-6 text-secondary">
                                                        <div>
                                                            Job Status
                                                        </div>
                                                        <div>
                                                            {i.description == 'Confirmed' || i.description=='Pobabtion' ?  "ACTIVE": 'INACTIVE'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="col-12">
                                        <Nodata/>
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

export default StaffEmploymentTerms