import React, { useState, useEffect } from 'react'
import { COLLEGES } from '../../../../utils/apiConstants';
import './../Employer.scss'
import axios from 'axios'
import ModalSpecialization from '../../../../modals/HR/Employer/ModalSpecialization';
import ModalCollege from '../../../../modals/HR/Employer/ModalCollege';
import { ALL_DATA } from '../../../../utils/LocalStorageConstants';
import Nodata from '../../../../Components/NoData/Nodata';

function EmployeeCollege({setLoading}) {
    const [data, setData] = useState([]);
    const [type, setType] = useState()
    const [edit, setEdit] = useState();
    const [ctData, setCtData] = useState(JSON.parse(localStorage.getItem(ALL_DATA)).collegeType)


    console.log()

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: COLLEGES,
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
                console.log(err)
                setLoading(0)
            })

    }

    useEffect(() => {
        getData();
    }, [])

    const [collegeData, setCollegeData] = useState([]);

    const selectCollegeType = (id) => {
        console.log(id)
        data.filter(item => console.log(item))
        setCollegeData(data.filter(item => item.college_type_id == id))
    }

    return (
        <div className='EmployeeCollege'>
            <div className="main-content">
                <ModalCollege reloadData={getData} type={type} data={edit} setLoading={setLoading}/>


                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">College</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">College</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* 
                        <div className="row ">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Select Criteria</h2>
                                        <br />
                                        <div className="row d-flex ">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        College Type<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        onChange={(e) => selectCollegeType(e.target.value)}
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {ctData?.map((i, key) => {
                                                            return <option value={i.id} key={key}>{i.name}</option>
                                                        })}
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
                                                    data-target="#ModalSpecialization"
                                                >
                                                    Add +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}


                        <div>
                            <div className="card">
                                <div className="card-body">

                                <div className=" d-flex ml-auto justify-content-end">
                                            <button
                                            onClick={() => { setType("add"); setEdit() }}
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalSpecialization"
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
                                                data-target="#ModalSpecialization"
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.name}
                                                    </div>
                                                    {/* <div className="role-code">
                                                        {i.college_type_id}
                                                    </div> */}
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

export default EmployeeCollege