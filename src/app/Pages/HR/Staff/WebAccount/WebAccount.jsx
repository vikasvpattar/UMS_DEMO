import React, { useState } from 'react'
import Disabled from '../../../../Components/HR/Staff/WebStaff/Disabled'
import Enabled from '../../../../Components/HR/Staff/WebStaff/Enabled'
import NoAccount from '../../../../Components/HR/Staff/WebStaff/NoAccount'
import NoMail from '../../../../Components/HR/Staff/WebStaff/NoMail'
import StaffWebSwitcher from '../../../../Components/HR/Staff/WebStaff/StaffWebSwitcher'

function WebAccount() {
    const [tab,setTab] = useState('Enabled')
  return (
    <div className='WebAccount'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Human Resource</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/">Human Resource</a>
                </li>
                <li className="breadcrumb-item active">Manage Web Accounts</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

        {/* switcher */}
        <StaffWebSwitcher setTab={setTab} tab={tab}/>


        {/* {tab==='No Mail'&&<NoMail tab={tab}/>}
        {tab==='No Account'&&<NoAccount tab={tab}/>} */}
        {tab==='Enabled'&&<Enabled tab={tab}/>}
        {tab==='Disabled'&&<Disabled tab={tab}/>}

    </div>
    </div>
    </div>
    </div>
  )
}

export default WebAccount