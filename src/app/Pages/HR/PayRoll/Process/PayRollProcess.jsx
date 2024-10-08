import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader'
import Nodata from '../../../../Components/NoData/Nodata'
import { sessionOpt } from '../../../../Data/jsonData/Academics/Academics'
import useEmployee from '../../../../Hooks/Employee/useEmployee'
import ModalPayRollProcess from '../../../../modals/HR/PayRoll/ModalPayRollProcess'
import { PAYROLL_GETALL, PAYROLL_PAY_SLIP } from '../../../../utils/apiConstants'
import { LOCAL_EMPLOYEE} from '../../../../utils/LocalStorageConstants'


function PayRollProcess({setLoading, collegeId}) {

    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [data, setData] = useState()
    const [viewData, setViewData] = useState()
    const [employeeData] = useEmployee(collegeId)
    const [allData,setAllData] = useState()

    console.log('hey',employeeData)

    const search = async () => {
        console.log('here');
        if (!year) return toast.error('Year is Required');
        if (!month) return toast.error('Month is Required');
        setLoading(1)


        const config = {
            method: 'get',
            url: `${PAYROLL_PAY_SLIP}?month=${month}&&year=${year}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
            },
        }

        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log(res.data.employeeDetails);
                setData(res.data.employeeDetails);
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error(err.response.message)
            })
    }


    const getAllData = async () => {
        const config = {
            method: 'get',
            url: PAYROLL_GETALL,
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
        <div className='PayRollProcess'>
            <div className="main-content">
                {/* <ModalPayRollProcess data={viewData}/> */}
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Process</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">PayRoll</a>
                                            </li>
                                            <li className="breadcrumb-item active">Process</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Select Criteria</h2>
                                        <br />
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        Year<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        value={year}
                                                        onChange={(e) => { setYear(e.target.value) }}
                                                    >
                                                        <option value="">Select year</option>
                                                        {sessionOpt?.map((data, key) => {
                                                            return <option key={key} value={data.id}>{data.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        Select Month<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        value={month}
                                                        onChange={(e) => { setMonth(e.target.value) }}
                                                    >
                                                        <option value="">Select Month</option>
                                                        <option value='01'>January</option>
                                                        <option value='02'>February</option>
                                                        <option value='03'>March</option>
                                                        <option value='04'>April</option>
                                                        <option value='05'>May</option>
                                                        <option value='06'>June</option>
                                                        <option value='07'>July</option>
                                                        <option value='08'>August</option>
                                                        <option value='09'>September</option>
                                                        <option value='10'>October</option>
                                                        <option value='11'>November</option>
                                                        <option value='12'>December</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>



                                        <div className="row ">
                                            <div className="col-md-12 ml-auto">
                                                <button
                                                    className="btn btn-nex btn-rounded "
                                                    type="submit"
                                                    name="submit"
                                                    onClick={search}
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Select Employee</h3>
                                                <div className="row d-flex justify-content-end">
                                                    <div className="col-md-4 d-flex justify-content-end">
                                                        <button className='btn btn-primary btn-rounded'>Export &nbsp;&uarr;</button>
                                                    </div>
                                                </div>
                                                <div className="container">
                                                    <div className="row">

                                                        <div className="col-12 p-3 row">
                                                            {data && data.length !== 0
                                                                ?
                                                                data?.map((i, key) => (
                                                                    <>
                                                                        <ModalPayRollProcess setLoading={setLoading} data={i} id={key} month={month} year={year} employeeData={employeeData?.find(data => data.id == i?.employee_id)} allData={allData} reloadData={search} collegeId={collegeId}/>

                                                                        <div
                                                                            className="col-12 border row py-3 rounded cursor-pointer my-3"
                                                                            data-toggle="modal"
                                                                            data-target={`#ModalPayRollProcess-${key}`}
                                                                            key={key}
                                                                            onClick={() => { setViewData(i) }}
                                                                        >
                                                                            <div className="col-8 row">
                                                                                <div className="col-12 text-primary">
                                                                                    <h3>
                                                                                        {
                                                                                           employeeData?.find(data => data?.id == i.employee_id)?.first_name + " " + employeeData?.find(data => data.id == i.employee_id)?.last_name
                                                                                        }
                                                                                    </h3>
                                                                                </div>
                                                                                <div className="col-12">
                                                                                    ₹ {i.basic_salary}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4 d-flex justify-content-end align-items-center">
                                                                                <div className={`btn btn-primary btn-rounded ${i.status === 'PENDING' ? 'btn-warning' : i.status === 'PAID' ? 'btn-success' : 'btn-primary'}`}>
                                                                                    {i.status}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))
                                                                :
                                                                <div className='mt-3 col-12'>
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
                                {/* end card */}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayRollProcess