import React from 'react'

const StudentFee = () => {
  return (
    <div className='StudentFee'>
      <div className="row">
        <h4 className="col-12 my-3">Student Fees</h4>
        <div className="col-12">
        <table className="table table-bordered nowrap overflow-auto">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Fees Type</th>
                        <th>Amout</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>Application Fees</td>
                        <td>₹ 200</td>
                        <td className='text-success'>PAID</td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>College Fees</td>
                        <td>₹ 89700</td>
                        <td className='text-danger'>PENDING</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default StudentFee