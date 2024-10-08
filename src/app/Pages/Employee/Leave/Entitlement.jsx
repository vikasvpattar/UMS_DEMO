import React from 'react'
import EmployeeLeaveEntitlement from '../../../Components/Employee/Leave/Entitlement'

const Entitlement = ({setLoading}) => {
  return (
    <div>
        <EmployeeLeaveEntitlement setLoading={setLoading} />
    </div>
  )
}

export default Entitlement