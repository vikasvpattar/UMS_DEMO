import React, { useState, useEffect } from 'react'
import { PROGRAM } from '../../../../utils/apiConstants';
import axios from 'axios'
import ModalProgram from '../../../../modals/HR/Employer/ModalProgram';
import './../Employer.scss'
import Nodata from '../../../../Components/NoData/Nodata';

function EmployeeProgram({setLoading}) {
    const [data, setData] = useState(
        [
            {
                name: 'UG',
                id: 'UG'
            },
            {
                name: 'PG',
                id: 'PG'
            },
            {
                name: 'PHD',
                id: 'PHD'
            },
            {
                name: 'DIPLOMA',
                id: 'DIP'
            },
        ]
    );
    const [type, setType] = useState()
    const [edit, setEdit] = useState();

    // const dept = [
    //     {
    //         title: 'Accountant',
    //         code: 'ACT'
    //     },
    //     {
    //         title: 'Admin Specialist',
    //         code: 'APT'
    //     },
    //     {
    //         title: 'Chief Executive Officer',
    //         code: 'CEO'
    //     },
    //     {
    //         title: 'Customer Support Specialist',
    //         code: 'CS'
    //     },
    //     {
    //         title: 'HR Specialist',
    //         code: 'HR'
    //     },
    // ]

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: PROGRAM,
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
                console.log(err)})

    }

    useEffect(() => {
          getData();
    }, [])
    return (
        <div className='EmployeeProgram'>
            <div className="main-content">
                <ModalProgram reloadData={getData} type={type} data={edit} setLoading={setLoading}/>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Program</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Program</li>
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
                                            onClick={() => { setType("add"); setEdit() }}
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalProgram"
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {data && data.length !== 0 ? data.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                onClick={() => { setType("edit"); setEdit(i); }}
                                                data-toggle="modal"
                                                data-target="#ModalProgram"
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.name}
                                                    </div>
                                                    <div className="role-code">
                                                       Unique Code : {i.id}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        )) :
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

export default EmployeeProgram