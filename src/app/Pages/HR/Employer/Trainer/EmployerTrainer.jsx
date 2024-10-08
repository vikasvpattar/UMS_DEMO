import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../../Components/NoData/Nodata'
import ModalTrainer from '../../../../modals/HR/Employer/ModalTrainer'
import { TRAINER } from '../../../../utils/apiConstants'
import Loader from './../../../../Components/Loader/Loader'
import './../Employer.scss'

function EmployerTrainer({ setLoading, collegeId }) {

    const [data, setData] = useState()
    const [type, setType] = useState()
    const [edit, setEdit] = useState();


    const getData = () => {
        setLoading(1)
        const config = {
            method: 'get',
            url: TRAINER,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        axios(config)
            .then(res => {
                setLoading(0)
                console.log(res);
                setData(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='EmployerTrainer'>
            <div className="main-content">
                <ModalTrainer reloadData={getData} type={type} data={edit} setLoading={setLoading} collegeId={collegeId} />
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Trainer</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Trainer</li>
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
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalTrainer"
                                            onClick={() => { setType("add"); setEdit() }}
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {data && data.legth !== 0 ? data?.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalTrainer"
                                                onClick={() => { setType("edit"); setEdit(i); }}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.name}
                                                    </div>
                                                    <div className="role-code">
                                                        {i.code}, {i.description}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        ))
                                            :
                                            <Nodata />
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

export default EmployerTrainer