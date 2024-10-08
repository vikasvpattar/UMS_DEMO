import React, { useState, useEffect } from 'react'
import { SPECIALIZATION } from '../../../../utils/apiConstants';
import './../Employer.scss'
import axios from 'axios'
import ModalSpecialization from '../../../../modals/HR/Employer/ModalSpecialization';
import Nodata from '../../../../Components/NoData/Nodata';

function EmployeeSpecialization({setLoading}) {
    const [data, setData] = useState([]);
    const [type, setType] = useState()
    const [edit, setEdit] = useState();
    const programData = JSON.parse(localStorage.getItem("ALL_DATA")).program

    const [specializationData, setSpecializationData] = useState([])

    const getData = async () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: SPECIALIZATION,
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


    const selectProgram = (id) => {

        setSpecializationData(data.filter(item => item.program_id == id))
    }

    return (
        <div className='EmployeeSpecialization'>
            <div className="main-content">
                <ModalSpecialization reloadData={getData} type={type} data={edit} setLoading={setLoading}/>
                <div className="page-content">
                    <div className="container-fluid">



                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Specialization</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Specialization</li>
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
                                                        Program<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        onChange={(e) => selectProgram(e.target.value)}
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {programData.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-12 d-flex justify-content-between">
                                                {/* <button
                                                    className="btn btn-nex btn-rounded "
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button> */}

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
                                {/* end card */}
                            </div>
                        </div>

                        <div className="">
                            <div className="card">
                                <div className="card-body">

                                    <div>
                                        {specializationData && specializationData.length !== 0 ? specializationData.map((i, key) => (
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
                                                        {i.id}
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

export default EmployeeSpecialization