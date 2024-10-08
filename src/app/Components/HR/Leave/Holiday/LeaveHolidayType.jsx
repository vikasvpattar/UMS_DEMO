import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalLeaveHoliday from '../../../../modals/HR/Leave/ModalLeaveHoliday';
import { LEAVE_HOLIDAY_TYPE } from '../../../../utils/apiConstants';
import { LOCAL_HOLIDAY_TYPE } from '../../../../utils/LocalStorageConstants';
import Loader from '../../../Loader/Loader';

function LeaveHolidayType() {
    const dept = [
        {
            title: 'Holiday',
            code: 'Custom'
        },
        {
            title: 'Sunday',
            code: 'Default'
        },
    ]
    const [data,setData] = useState();
    const [loading,setLoading] = useState(0)
    const [type, setType] = useState()
    const [edit, setEdit] = useState();

    const getData = async() =>{
        setLoading(1)
        const config = {
            method:'get',
            url:LEAVE_HOLIDAY_TYPE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        await axios(config)
        .then((res)=>{
            console.log(res);
            setLoading(0);
            setData(res.data.data)
            localStorage.setItem(LOCAL_HOLIDAY_TYPE,JSON.stringify(res.data.data))
        })
        .catch((err)=>{
            console.log(err);
            setLoading(0)
        })
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <ModalLeaveHoliday reloadData={getData} type={type} data={edit}/>
        <Loader loading={loading}/>

            <div className="container">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row d-flex justify-content-end p-3">
                                        <button
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalLeaveHoliday"
                                            onClick={() => { setType("add"); setEdit() }}
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {data&&data.length!==0?data.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalLeaveHoliday"
                                                onClick={() => { setType("edit"); setEdit(i); }}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.description}
                                                    </div>
                                                    <div className="role-code">
                                                        {i.name}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        )):
                                        <h3>
                                            No Leave Types added
                                        </h3>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    </div>
  )
}

export default LeaveHolidayType