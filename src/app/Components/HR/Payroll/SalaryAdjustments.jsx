import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ModalPayRollSalaryAdjust from '../../../modals/HR/PayRoll/ModalPayRollSalaryAdjust'
import { PAYROLL_GETALL } from '../../../utils/apiConstants'
import Nodata from '../../NoData/Nodata'

function SalaryAdjustments({ data, employee, setLoading, reloadData, collegeId }) {
    // const [loading,setLoading] = useState(0)
    const [type, setType] = useState('')
    const [edit, setEdit] = useState()
    const [allData, setAllData] = useState()
    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const getAllData = async () => {
        const config = {
            method: 'get',
            url: `${PAYROLL_GETALL}?college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }

        await axios(config)
            .then((res) => {
                console.log(res);
                setAllData(res.data)
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <div className='SalaryAdjustments'>
            <div className="main-content">
                <ModalPayRollSalaryAdjust type={type} id={employee} setLoading={setLoading} data={edit} reloadData={(d) => reloadData(d)} allData={allData} collegeId={collegeId} />
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Salary Adjustment</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">PayRoll</a>
                                            </li>
                                            <li className="breadcrumb-item active">Salary Adjustment</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}


                        <div className="container">
                            <div className="card">
                                <div className="card-body">
                                    {employee ? data &&
                                        data.length !== 0
                                        ?
                                        null
                                        : <div className="row d-flex justify-content-end p-3">
                                            <button
                                                className="btn btn-rounded btn-success btn-outline px-4"
                                                data-toggle="modal"
                                                data-target="#ModalPayRollSalaryAdjust"
                                                onClick={() => { setType('add'); setEdit() }}
                                            >
                                                Add +
                                            </button>
                                        </div>
                                        : null
                                    }


                                    <div>
                                        {data && data.length !== 0 ? data?.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalPayRollSalaryAdjust"
                                                onClick={() => { setType('edit'); setEdit(i) }}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        Basic Salary
                                                    </div>
                                                    <div className="role-code">
                                                        ₹ {i.basic_salary}
                                                    </div>
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                        ))
                                            :
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

export default SalaryAdjustments