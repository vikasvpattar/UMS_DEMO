import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ModalEmployerDocs from '../../../../modals/HR/Employer/ModalEmployerDocs'
import { DOCUMENT_CATEGORY } from '../../../../utils/apiConstants'
import './../Employer.scss'
import {toast} from 'react-toastify'
import Nodata from '../../../../Components/NoData/Nodata'
import Loader from '../../../../Components/Loader/Loader'

function EmployerDocs({setLoading}) {

    const [data,setData] = useState()
    const [type, setType] = useState()
    const [edit, setEdit] = useState();

    const jobPos = [
        {
            title: 'PAN Card',
            code: 'PAN'
        },
        {
            title: 'Aadhar Card',
            code: 'AADHAR'
        },
        {
            title: 'Voter Id',
            code: 'VOTER'
        },
        {
            title: 'Bank Passbook',
            code: 'BANK'
        },
        {
            title: 'Resume',
            code: 'Resume'
        },
    ]

    const config = {
        method:'get',
        url:DOCUMENT_CATEGORY,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
        },
    }

    const getData = async() =>{
        setLoading(1)
        await axios(config)
        .then((res)=>{
            setLoading(0)
            console.log(res.data.data);
            setData(res.data.data)
        })
        .catch(err=>{
            setLoading(0)
            console.log(err);
            toast.error(err.response.data.message)
        })
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className='EmployerDocs'>
        <div className="main-content">
<ModalEmployerDocs reloadData={getData} type={type} data={edit} setLoading={setLoading}/>
<div className="page-content">
    <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Document Category</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">Employer</li>
                            <li className="breadcrumb-item active">Document Category</li>
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
                        data-target="#ModalEmployerDocs"
                        onClick={() => { setType("add"); setEdit() }}
                        >
                            Add +
                        </button>
                    </div>

                    <div>
                        {data&&data.length!==0
                        ?
                        data.map((i, key) => (
                            <div 
                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                            data-toggle="modal"
                            data-target="#ModalEmployerDocs"
                            onClick={() => { setType("edit"); setEdit(i); }}
                            >
                                <div className="col-11" key={key}>
                                    <div className="role-title">
                                        {i.title}
                                    </div>
                                    <div className="role-code">
                                        {i.code}
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

export default EmployerDocs