import React, { useEffect, useState } from 'react'
import { COLLEGE_SPECIALIZATION } from '../../../../utils/apiConstants';
import axios from 'axios'
import './../Employer.scss'
import ModalCollegeSpecialization from '../../../../modals/HR/Employer/ModalCollegeSpecialization';


function EmployeeCollegeSpecialization() {
    const [data, setData] = useState([]);
    const [type, setType] = useState()
    const [edit, setEdit] = useState();
    const collegeData = JSON.parse(localStorage.getItem("ALL_DATA")).college

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
        const config = {
            method: 'get',
            url: COLLEGE_SPECIALIZATION,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        };

        await axios(config)
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        // getData();
    }, [])
    return (
        <div className='EmployeeCollegeSpecialization'>
            <div className="main-content">
                <ModalCollegeSpecialization reloadData={getData} type={type} data={edit} />
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">College Specializations</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">College Specialization</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Select Criteria</h2>
                                        <br />
                                        <div className="row d-flex ">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        College<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        autoComplete="off"
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {collegeData?.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-12 d-flex justify-content-between">
                                                <button
                                                    className="btn btn-nex btn-rounded "
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>

                                                <button
                                                    onClick={() => { setType("add"); setEdit() }}
                                                    className="btn btn-rounded btn-success btn-outline px-4"
                                                    data-toggle="modal"
                                                    data-target="#ModalCollegeSpecialization"
                                                >
                                                    Add +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>

                        <div className="">
                            <div className="card">
                                <div className="card-body">


                                    <div>
                                        {data && data.length !== 0 ? data.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                onClick={() => { setType("edit"); setEdit(i); }}
                                                data-toggle="modal"
                                                data-target="#ModalCollegeSpecialization"
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
                                            <h1>No Data Is Availale for display</h1>
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

export default EmployeeCollegeSpecialization