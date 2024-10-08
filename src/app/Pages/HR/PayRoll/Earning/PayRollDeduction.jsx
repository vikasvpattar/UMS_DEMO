import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader'
import Nodata from '../../../../Components/NoData/Nodata'
import ModalPayRollDeduction from '../../../../modals/HR/PayRoll/ModalPayRollDeduction'
import { PAYROLL_DEDUCTION } from '../../../../utils/apiConstants'

function PayRollDeduction({setLoading}) {

    const [data,setData] = useState([])
    const [type,setType] = useState('')
    const [edit,setEdit] = useState()

    const getData = async() => {

        setLoading(1)
        
        const config = {
            method: 'get',
            url: `${PAYROLL_DEDUCTION}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}` ,
                'Content-Type': 'application/json'
            },
        }
        
        
        await axios(config)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
            // toast.success("data fetched")
            setLoading(0)
        })
        .catch(err=>{
            toast.error(err.response.data.message)
            setLoading(0)
        })
    }

    useEffect(()=>{
        getData()
    },[])
    
  return (
    <div className='PayRollDeduction'>
        <div className="main-content">
            <ModalPayRollDeduction type={type} data={edit} reloadData={getData} setLoading={setLoading}/>
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Deduction</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">PayRoll</a>
                                            </li>
                                            <li className="breadcrumb-item active">Deduction</li>
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
                                            data-target="#ModalPayRollDeduction"
                                            onClick={()=>{setType('add');setEdit()}}
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                    {data&&data.length!==0?data?.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalPayRollDeduction"
                                                onClick={()=>{setType('edit');setEdit(i)}}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.title}
                                                    </div>
                                                    <div className="role-code">
                                                        {i.description}
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

export default PayRollDeduction