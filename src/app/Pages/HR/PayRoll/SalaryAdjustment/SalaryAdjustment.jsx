import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import AnnualSalaryStatement from '../../../../Components/HR/Payroll/AnnualSalaryStatement'
import SalaryAdjustments from '../../../../Components/HR/Payroll/SalaryAdjustments'
import SalaryAdjustmentSwitcher from '../../../../Components/HR/Payroll/SalaryAdjustmentSwitcher'
import Loader from '../../../../Components/Loader/Loader'
import { PAYROLL_EMPLOYEE_PAYSLIP, PAYROLL_GETALL, PAYROLL_SALARY_ADJUST } from '../../../../utils/apiConstants'
import { ALL_DATA } from './../../../../utils/LocalStorageConstants'
import Multiselect from 'multiselect-react-dropdown';
import useEmployee from '../../../../Hooks/Employee/useEmployee'

function SalaryAdjustment({setLoading, collegeId}) {
    const [tab, setTab] = useState('Salary Adjustment')
    const [role, setRole] = useState('')
    const [employee, setEmployee] = useState('')
    const [data, setData] = useState()
    const [allData, setAllData] = useState()
    const roleOptions = JSON.parse(localStorage.getItem(ALL_DATA))?.jobRoles
    const [empOptions, setEmpOptions] = useState([])

    const [salaryStatement, setSalaryStatement] = useState([])

    const [employees] = useEmployee(collegeId)


    const selectRole = (role) => {
        setEmpOptions(employees.filter(d => d.role === role))
    }

    //Function Triggers when user Selects Employee
    //Function calls api to get Employee statements
    const selectEmployee = async (s) => {
        setEmployee(s)
        setLoading(1)



        const config = {
            method: 'get',
            url: `${PAYROLL_SALARY_ADJUST}?employee_id=${s}&&college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }

        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log('yo',res.data.data);
                setData(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error(err.response.data.message)
            })
    }





    return (
        <div className='SalaryAdjustment'>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

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
                                                        Job Position<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        onChange={(e) => { setRole(e.target.value); selectRole(e.target.value) }}
                                                        value={role}
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {
                                                            roleOptions?.map((i, key) => (
                                                                <option key={key} value={i.id}>{i.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                role !== ''
                                                &&
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">
                                                            Employee<span style={{ color: "red" }}>*</span>
                                                        </label>
                                                        <select
                                                            id="role"
                                                            name="role"
                                                            className="form-control"
                                                            value={employee}
                                                            onChange={(e) => { selectEmployee(e.target.value) }}
                                                        >
                                                            <option value="" selected>Select</option>
                                                            {
                                                                empOptions?.map((i, key) => (
                                                                    <option key={key} value={i.id}>{i.first_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                        {/* <div className="row ">
                                                    <div className="col-md-12 ml-auto">
                                                        <button
                                                            className="btn btn-nex btn-rounded "
                                                            type="submit"
                                                            name="submit"
                                                        >
                                                            <i className="fa fa-search" aria-hidden="true" /> Search
                                                        </button>
                                                    </div>
                                                </div> */}
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Employer Salary</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">PayRoll</a>
                                            </li>
                                            <li className="breadcrumb-item active">Employer Salary</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}

                        <SalaryAdjustmentSwitcher tab={tab} setTab={setTab} />
                        {tab === 'Salary Adjustment' && <SalaryAdjustments data={data} employee={employee} setLoading={setLoading} reloadData={(d) => { selectEmployee(d) }} collegeId={collegeId}/>}
                        {tab === 'Annual Salary Statement' && <AnnualSalaryStatement employee={employee} setLoading={setLoading} collegeId={collegeId}/>}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalaryAdjustment