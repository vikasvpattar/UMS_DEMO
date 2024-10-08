import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Nodata from '../../../../Components/NoData/Nodata';
import { PAYROLL_GETALL, PAYROLL_SALARY_ADJUST } from '../../../../utils/apiConstants';
import { SESSION_EMPLOYEE_ID } from '../../../../utils/sessionStorageContants';
import './Salary.scss'

const Salary = ({setLoading}) => {

    const getEmployeeId = () =>{
        return sessionStorage.getItem(SESSION_EMPLOYEE_ID)?sessionStorage.getItem(SESSION_EMPLOYEE_ID):null
    }

    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [employeeId,setEmployeeId] = useState(getEmployeeId())
    const [data,setData] = useState()
    const [allData,setAllData] = useState()

    const getData = async() =>{
        const config = {
            method: 'get',
            url: `${PAYROLL_SALARY_ADJUST}?employee_id=${employeeId}`,
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

    const getAllData = async () => {
        setLoading(1)
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
            setLoading(0)
            console.log(res);
            setAllData(res.data)
          })
          .catch(err => {
            setLoading(0)
            toast.error(err.response.data.message)
          })
      }

    useEffect(()=>{
        getAllData()
        getData()
    },[])

    return (
        <div className='Salary'>
            <div className='SalaryAdjustment'>
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
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

                        <div className="container">
                            <div className="card">
                                <div className="card-body">

                                    <div>
                                        {data&&data.length!==0?data?.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalPayRollSalaryAdjust"
                                            >
                                                <div className="col-12" key={key}>
                                                    <div className="role-title mb-3">
                                                        {i?.effective_date.split("T")[0].split('-')[2] + ' ' +months[i.month-1] + ' ' + i.year}
                                                    </div>
                                                    <table className='table table-bordered'>
                                                                    <tr>
                                                                        <th>Basic Salary</th>
                                                                        <th colSpan={2}>₹ {i?.basic_salary}</th>
                                                                    </tr>
                                                                {
                                                                    i?.earning?.split(',')?.map((j,key2)=>(
                                                                        <tr>
                                                                            {
                                                                            key2==0?<td rowSpan={i?.earning?.split(',')?.length}>
                                                                                Earning
                                                                            </td>
                                                                            :
                                                                            null}
                                                                            <td>{allData?.earning?.find((s)=>s.id===j).description}</td>
                                                                            <td className='custom-table-row-amount'>₹ {allData?.earning?.find((s)=>s.id===j).amount}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                                {
                                                                    i?.bonus?.split(',')?.map((j,key2)=>(
                                                                        <tr>
                                                                            {
                                                                            key2==0?<td rowSpan={i?.bonus?.split(',')?.length}>
                                                                                Bonus
                                                                            </td>
                                                                            :
                                                                            null}
                                                                            <td>{allData?.bonus?.find((s)=>s.id===j).description}</td>
                                                                            <td className='custom-table-row-amount'>₹ {allData?.bonus?.find((s)=>s.id===j).amount}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                                {
                                                                    i?.deduction?.split(',')?.map((j,key2)=>(
                                                                        <tr>
                                                                            {
                                                                            key2==0?<td rowSpan={i?.deduction?.split(',')?.length}>
                                                                                Deduction
                                                                            </td>
                                                                            :
                                                                            null}
                                                                            <td>{allData?.deduction?.find((s)=>s.id===j).description}</td>
                                                                            <td className='custom-table-row-amount'>₹ {allData?.deduction?.find((s)=>s.id===j).amount}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                                {
                                                                    i?.statutory_contribution?.split(',')?.map((j,key2)=>(
                                                                        <tr>
                                                                            {
                                                                            key2==0?<td rowSpan={i?.statutory_contribution?.split(',')?.length}>
                                                                                Statutory Contribution
                                                                            </td>
                                                                            :
                                                                            null}
                                                                            <td>{allData?.statutoryContribution?.find((s)=>s.id===j).title}</td>
                                                                            <td className='custom-table-row-amount'>₹ {allData?.statutoryContribution?.find((s)=>s.id===j).employee_portion}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                    </table>
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
        </div>
    )
}

export default Salary