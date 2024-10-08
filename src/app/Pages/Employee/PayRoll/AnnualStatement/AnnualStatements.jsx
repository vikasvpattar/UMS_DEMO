import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../../Components/NoData/Nodata'
import Payslip from '../../../../modals/Employee/Payroll/Payslip'
import ModalPayRollProcess from '../../../../modals/HR/PayRoll/ModalPayRollProcess'
import { PAYROLL_EMPLOYEE_PAYSLIP, PAYROLL_GETALL } from '../../../../utils/apiConstants'
import { LOCAL_EMPLOYEE } from '../../../../utils/LocalStorageConstants'
import { SESSION_EMPLOYEE_ID } from '../../../../utils/sessionStorageContants'

function AnnualStatements({ setLoading }) {


  const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const yearOptions = [2020, 2021, 2022, 2023]

  const [month, setMonth] = useState('09')
  const [year, setYear] = useState(2022)

  const employeeData = JSON.parse(localStorage.getItem(LOCAL_EMPLOYEE))
  const [allData, setAllData] = useState()

  const getEmployeeId = () => {
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID) ? sessionStorage.getItem(SESSION_EMPLOYEE_ID) : null
  }

  const [employeeId, setEmployeeId] = useState(getEmployeeId)

  const [salaryStatement, setSalaryStatement] = useState([])

  const getEmployeePayslip = async (year) => {
    setLoading(1)

    const config = {
      method: 'get',
      url: `${PAYROLL_EMPLOYEE_PAYSLIP}?year=${year}&&employee_id=${employeeId}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
        'Content-Type': 'application/json'
      },
    }

    await axios(config)
      .then((res) => {
        setLoading(0)
        console.log("payslip data", res.data.data);
        setSalaryStatement(res.data.data)
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error(err.response.data.message)
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
                        yearOptions?.map((data) => {
                          if (data === 2022) {
                            return <option value={data} selected key={data}>{data}</option>
                          } else {
                            return <option value={data} key={data}>{data}</option>
                          }

                        }
                        )}
                    </select>
                  </div>

                  <div>
                    {salaryStatement && salaryStatement.length !== 0 ? salaryStatement?.map((i, key) => (
                      <>
                        <Payslip setLoading={setLoading} data={i} id={key} month={month} year={year} employeeData={employeeData?.find(data => data.id == i.employee_id)} allData={allData}/>
                      <div
                        className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                        data-toggle="modal"
                        data-target={`#ModalPayRollProcess-${key}`}
                        key={key}
                      >
                        <div className="col-12 row role-div" key={key}>
                          <div className="role-title col-12 role-title my-3">
                          <strong>{months[parseInt(i.month) - 1]}</strong>
                          </div>
                          <table className='table table-bordered'>
                            <tr>
                              <td>Basic Salary</td>
                              <td>₹ {i.basic_salary}</td>
                            </tr>
                            <tr>
                              <td>Earning</td>
                              <td>₹ {i?.bonus_amount + i?.earning_amount}</td>
                            </tr>
                            <tr>
                              <td>Deduction</td>
                              <td>₹ {i?.deduction_amount + i?.statutory_contribution_amount}</td>
                            </tr>
                            <tr>
                              <td>Net Salary</td>
                              <td>₹  {i.net_salary}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      </>
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

export default AnnualStatements