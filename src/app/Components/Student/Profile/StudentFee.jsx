import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FEE_DETAILS, FEE_DETAILS_BY_STUDENT_ID } from '../../../utils/fees.apiConst'

const StudentFee = ({setLoading, id}) => {

  const [feeData, setFeeData] = useState([])

  console.log(feeData);

  const getFeeData = () =>{
    setLoading(1)
    const config = {
      method:'get',
      url:`${FEE_DETAILS_BY_STUDENT_ID}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }
    
    axios(config)
    .then(res=>{
      setLoading(0)
      setFeeData(res.data.data)
    })
    .catch(err=>{
      setLoading(0)
      toast.error('Something went wrong')
    })
    setLoading(0);
  }

  useEffect(()=>{
    getFeeData()
  },[])

  return (
    <div className='StudentFee'>
      <div className="row">
        <h4 className="col-12 my-3">Student Fees</h4>
        <div className="col-12">
        <table className="table table-bordered nowrap overflow-auto">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Academic Year</th>
                        <th>Class</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Paid</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    feeData?.map((i,key)=>(
                      <tr>
                          <td>{key+1}</td>
                          <td>{i?.session_id}</td>
                          <td>{i?.class}</td>
                          <td>₹ {i?.amount}</td>
                          <td>₹ {i?.amount - i?.paid_amount}</td>
                          <td>₹ {i?.paid_amount}</td>
                          <td>
                             <span className={`badge badge-soft-${i?.amount - i?.paid_amount == 0 ? 'success' :i?.paid_amount == 0?'danger':'warning'}`}>
                                {i?.amount - i?.paid_amount == 0 ? 'paid' :i?.paid_amount == 0?'not paid':'partial'}
                              </span> 
                          </td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default StudentFee