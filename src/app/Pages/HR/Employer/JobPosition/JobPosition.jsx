import React, { useEffect, useState } from 'react'
import ModalJobPositions from '../../../../modals/HR/Employer/ModalJobPositions'
import { JOB_POSITIONS } from '../../../../utils/apiConstants';
import axios from 'axios'
import './../Employer.scss'
import Nodata from '../../../../Components/NoData/Nodata';

function JobPosition({setLoading}) {

    const [jobPos, SetJobPos] = useState([]);
    const [type,setType] = useState()
    const [edit,setEdit] = useState();

    const config = {
        method: 'get',
        url: JOB_POSITIONS,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
    };

    const getData = async () => {
        setLoading(1)
            await axios(config)
            .then((res) => {
                setLoading(0)
                console.log(res);
                SetJobPos(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                console.log(err)})
    }

    useEffect(() => {
        getData();
    },[])


    return (
        <div className='JobPosition'>
            <ModalJobPositions reloadData={getData} type={type} data={type==='edit'?edit:null} setLoading={setLoading}/>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Job Positions</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Job Position</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row d-flex justify-content-end p-3">
                                        <button
                                            onClick={()=>{setType("add");setEdit()}}
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalJobPositions"
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {jobPos.length !== 0 ? jobPos.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                onClick={()=>{setType("edit"); setEdit(i);}}
                                                data-toggle="modal"
                                                data-target="#ModalJobPositions"
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.name}
                                                    </div>
                                                    <div className="role-code">
                                                        {i.id}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        ))
                                            :
                                            <div className='mt-3'>
                                                <Nodata titleTop={'No data available for your search'}/>
                                            </div>
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

export default JobPosition