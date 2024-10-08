import React,{useState,useEffect} from 'react'
import ModalLeaveType from '../../../../modals/HR/Leave/ModalLeaveType'
import { LEAVE_LEAVE_TYPE } from '../../../../utils/apiConstants';
import axios from 'axios';
import {toast} from 'react-toastify'
import Nodata from '../../../../Components/NoData/Nodata';

function LeaveLeaveType({setLoading}) {

    const [data, setData] = useState([]);
    const [type, setType] = useState()
    const [edit, setEdit] = useState();

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: LEAVE_LEAVE_TYPE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        };
        
        await axios(config)
        .then((res) => {
                setLoading(0)
                console.log(res.data.data);
                setData(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                console.log(err)
            })

    }


    useEffect(() => {
        getData();
    }, [])

  return (
    <div className='LeaveLeaveType'>
        <ModalLeaveType reloadData={getData} type={type} data={edit} setLoading={setLoading}/>
        <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">HoliDay</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">Leave</a>
                                            </li>
                                            <li className="breadcrumb-item active">HoliDay</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}


                        <div className="container">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row d-flex justify-content-end p-3">
                                        <button
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalLeaveType"
                                            onClick={() => { setType("add"); setEdit() }}
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {data && data.length !== 0 ?data.map((i, key) => (
                                            <div
                                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                            data-toggle="modal"
                                            data-target="#ModalLeaveType"
                                            onClick={() => { setType("edit"); setEdit(i); }}
                                            >
                                                <div className="col-11 d-flex justify-content-between" key={key}>
                                                    <div className="role-title mb-1">
                                                        {i.description}
                                                    </div>
                                                    <div className="role-code">
                                                        <button className='btn btn-rounded btn-primary'>
                                                        {i.id}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <Nodata/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default LeaveLeaveType