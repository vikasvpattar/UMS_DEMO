import React, { useEffect, useState } from 'react'
import { COLLEGE_TYPE } from '../../../../utils/apiConstants';
import axios from 'axios'
import ModalCollegeType from '../../../../modals/HR/Employer/ModalCollegeType';
import './../Employer.scss'
import Nodata from '../../../../Components/NoData/Nodata';

function EmployeeCollegeType({setLoading}) {

    const [data, setData] = useState([]);
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
            url: COLLEGE_TYPE,
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
        <div className='EmployeeCollegeType'>
            <ModalCollegeType reloadData={getData} type={type} data={edit} setLoading={setLoading}/>
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">College Types</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">College Type</li>
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
                                            data-target="#ModalCollegeType"
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
                                                data-target="#ModalCollegeType"
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
                                        )) :
                                            <div className='mt-3'>
                                                <Nodata titleTop={'No data available for your search'} />
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

export default EmployeeCollegeType