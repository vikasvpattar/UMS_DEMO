import React, { useState, useEffect } from 'react'
import { PAYROLL_EMPLOYEE_PAYSLIP } from '../../../utils/apiConstants'
import axios from "axios"
import { toast } from 'react-toastify'
import Nodata from '../../NoData/Nodata'


function AnnualSalaryStatement({ employee, setLoading, collegeId }) {


    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const year = [2020, 2021, 2022, 2023]


    const [salaryStatement, setSalaryStatement] = useState([])

    const getEmployeePayslip = async (year) => {
        setLoading(1)

        const config = {
            method: 'get',
            url: `${PAYROLL_EMPLOYEE_PAYSLIP}?year=${year}&&employee_id=${employee}&&college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }

        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log("payslip data", res.data.data);
                // setData(res.data.data)
                setSalaryStatement(res.data.data)
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
      getEmployeePayslip(2022)
    }, [])
    

    return (
        <div className='AnnualSalaryStatement'>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Annual Salary Statement</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">PayRoll</a>
                                            </li>
                                            <li className="breadcrumb-item active">Annual Salary Statement</li>
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
                                        <select name="" id="" className='form-control col-sm-6 col-lg-3 col-md-4'
                                         onChange={(e) => getEmployeePayslip(e.target.value)}
                                         >
                                            <option value="null">Select Year</option>
                                            {
                                                year?.map((data) => {
                                                     if(data === 2022){
                                                         return <option value={data} selected key={data}>{data}</option> 
                                                    }else{
                                                        return <option value={data} key={data}>{data}</option>
                                                    }
                                                    
                                                }
                                                )}
                                        </select>
                                    </div>

                                    <div>
                                        {salaryStatement && salaryStatement.length!==0 ? salaryStatement?.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                            >
                                                <div className="col-12 row role-div" key={key}>
                                                    <div className="role-title col-12 role-title">
                                                        {months[parseInt(i.month) - 1]}
                                                    </div>
                                                    <div className="role-code col-12 row">

                                                        <div className="col-md-6 my-1" >
                                                            <div className="text-secondary">
                                                                Basic Salary
                                                            </div>
                                                            <div>
                                                               ₹ {i.basic_salary}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 my-1" >
                                                            <div className="text-secondary">
                                                                Earning
                                                            </div>
                                                            <div>
                                                               ₹ {i?.bonus_amount + i?.earning_amount}
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className="role-code col-12 row">

                                                        <div className="col-md-6 my-1" >
                                                            <div className="text-secondary">
                                                                Deduction
                                                            </div>
                                                            <div>
                                                               ₹ {i?.deduction_amount + i?.statutory_contribution_amount}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 my-1" >
                                                            <div className="text-secondary">
                                                                Net Salary
                                                            </div>
                                                            <div>
                                                              ₹  {i.net_salary}
                                                            </div>
                                                        </div>


                                                    </div>
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

export default AnnualSalaryStatement