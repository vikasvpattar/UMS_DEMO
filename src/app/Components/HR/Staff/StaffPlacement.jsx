import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalStaffPlacement from '../../../modals/HR/Staff/ModalStaffPlacement'
import { EMPLOYEE_PLACEMENT } from '../../../utils/apiConstants'
import { LOCAL_DEPARTMENT } from '../../../utils/LocalStorageConstants'
import Loader from '../../Loader/Loader'
import Nodata from '../../NoData/Nodata'
import './EditStaff.scss'

function StaffPlacement({ tab,id, setLoading }) {

    const [placementsData,setPlacementsData] = useState([])
    const [type,setType] = useState('')
    const [edit,setEdit] = useState()
    const [localDepartment,setLocalDepartment] = useState(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)))
    console.log(localDepartment);
    

    const getData = async() => {

        setLoading(1)
        
        const config = {
            method: 'get',
            url: `${EMPLOYEE_PLACEMENT}?employee_id=${id}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}` ,
                'Content-Type': 'application/json'
            },
        }
        
        
        await axios(config)
        .then((res)=>{
            console.log(res);
            setPlacementsData(res.data.data)
            // toast.success("data fetched")
            setLoading(0)
        })
        .catch(err=>{
            toast.error(err.response.data.message)
            setLoading(0)
        })
    }


    useEffect(() => {
        getData();
    },[tab])

    useEffect(()=>{
        setLocalDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)))
    },[localStorage.getItem(LOCAL_DEPARTMENT)])
    return (
        <div className='Placement Staff'>
            <ModalStaffPlacement type={type} id={id} data={edit} reloadData={getData} setLoading={setLoading}/>
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
                                    data-target="#ModalStaffPlacement"
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
                                    {placementsData&&placementsData?.length!==0?placementsData?.map((i, key) => (
                                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12 crd rowData" key={key}>
                                            <div
                                                className="rounded border card-default card cursor-pointer"
                                                data-toggle="modal"
                                                data-target="#ModalStaffPlacement"
                                                onClick={()=>{setType('edit');setEdit(i)}}
                                            >
                                                <div className="row  p-3">


                                                    <div className="col-12 fs-5">
                                                        {i?.effective_date?.split("T")[0]}
                                                    </div>
                                                    <div className="col-12 fs-1 jobPos">
                                                        {i?.job_position}
                                                    </div>
                                                    <div className="col-md-6 fs-6 text-secondary">
                                                        <div>
                                                            Job Position
                                                        </div>
                                                        <selcet className></selcet>
                                                        <div>
                                                            {i?.job_position_id ? i?.job_position_id : '__'}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 fs-6">
                                                        <div>
                                                            Department
                                                        </div>
                                                        <div>
                                                            {i?.department_id ? localDepartment?.find((s)=>s?.id===i?.department_id)?.name : '__'}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6 fs-6">
                                                        <div>
                                                            Branch
                                                        </div>
                                                        <div>
                                                            {i.Branch ? i.Branch : '__'}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 fs-6">
                                                        <div>
                                                            Line Manager
                                                        </div>
                                                        <div>
                                                            {i.Level ? i.Level : '__'}
                                                        </div>
                                                    </div> */}
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
                    <input type="hidden" name="page_name" />
                    <input type="hidden" name="staffid" />
                    {/* end card */}
                </div>
            </div>
        </div>
    )
}

export default StaffPlacement