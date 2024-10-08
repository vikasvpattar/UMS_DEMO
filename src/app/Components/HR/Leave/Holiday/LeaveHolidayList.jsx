import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ModalHolidayList from '../../../../modals/HR/Leave/ModalHolidayList'
import { LEAVE_HOLIDAY_LIST } from '../../../../utils/apiConstants'
import { LOCAL_HOLIDAY_TYPE } from '../../../../utils/LocalStorageConstants'
import Nodata from '../../../NoData/Nodata'

function LeaveHolidayList({setLoading}) {

    const [htype, setHtype] = useState('')
    const [data, setData] = useState()
    const htypeOpt = JSON.parse(localStorage.getItem(LOCAL_HOLIDAY_TYPE))
    const [type, setType] = useState()
    const [edit, setEdit] = useState();

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

    const getHolidayList = async (s) => {
        setHtype(s)
        setLoading(1)
        console.log(s);
        const config = {
            method: 'get',
            url: `${LEAVE_HOLIDAY_LIST}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        await axios(config)
            .then((res) => {
                setLoading(0)
                // toast.success('Data fetched')
                setData(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                toast.error(err.response.data.message);
            })
    }

    useEffect(()=>{
        getHolidayList()
    },[])


    return (
        <div>
            <ModalHolidayList reloadData={(d) => getHolidayList(d)} type={type} data={edit} id={htype} setLoading={setLoading}/>
            {/* <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Select Holiday Type</h2>
                            <br />
                            <div className="row d-flex ">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                            Holiday Type<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={htype}
                                            onChange={(e) => { getHolidayList(e.target.value) }}
                                        >
                                            <option value="" selected>All</option>
                                            {
                                                htypeOpt?.map((i,key)=>(
                                                    <option value={i.id}>{i.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {
                                htype!==''
                                ?
                                <div className="row ">
                                    <div className="col-md-12 ml-auto">
                                        <button
                                            className="btn btn-nex btn-rounded "
                                            data-toggle="modal"
                                            data-target="#ModalHolidayList"
                                            onClick={() => { setType("add"); setEdit() }}
                                        >
                                            + Add New
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="text-danger">
                                    to add New Holiday select perticular holiday type
                                </div>

                            }

                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="row ">
                            <div className="col-md-12 ml-auto d-flex justify-content-end mb-3">
                                <button
                                    className="btn btn-nex btn-rounded "
                                    data-toggle="modal"
                                    data-target="#ModalHolidayList"
                                    onClick={() => { setType("add"); setEdit() }}
                                >
                                    + Add New
                                </button>
                            </div>
                        </div>

                        <div>
                            {data && data.length !== 0 ? data.map((i, key) => (
                                <div
                                    className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                    data-toggle="modal"
                                    data-target="#ModalHolidayList"
                                    onClick={() => { setType("edit"); setEdit(i); }}
                                >
                                    <div className="col-11" key={key}>
                                        <div className="role-title">
                                            {i.description}
                                        </div>
                                        <div className="role-code">
                                            {i.name}
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                {i.from_date.split("T")[0]}
                                            </div>
                                            <div style={{ fontSize: '18px' }} className='d-flex align-items-center'>
                                                &nbsp;&nbsp; &rarr; &nbsp;&nbsp;
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                {i.to_date.split("T")[0]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 d-flex align-items-center justify-content-end">
                                        {'>'}
                                    </div>
                                </div>
                            ))
                                :
                                <Nodata titleTop={"No data available please add data"}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaveHolidayList