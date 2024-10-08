import React,{useState} from 'react'
import LeaveHolidayList from '../../../../Components/HR/Leave/Holiday/LeaveHolidayList'
import LeaveHolidaySwitches from '../../../../Components/HR/Leave/Holiday/LeaveHolidaySwitches'
import LeaveHolidayType from '../../../../Components/HR/Leave/Holiday/LeaveHolidayType'
import ModalLeaveHoliday from '../../../../modals/HR/Leave/ModalLeaveHoliday'

function LeaveHoliday({setLoading}) {
    const [tab,setTab] = useState('Holiday Type')
    
  return (
    <div className='LeaveHoliday'>
        {/* <ModalLeaveHoliday/> */}
        <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">HoliDay</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">Leave</a>
                                            </li>
                                            <li className="breadcrumb-item active">HoliDay</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}

                        {/* <LeaveHolidaySwitches tab={tab} setTab={setTab}/>
                        {tab==='Holiday List'&&<LeaveHolidayList/>}
                        {tab==='Holiday Type'&&<LeaveHolidayType/>} */}
                        <LeaveHolidayList setLoading={setLoading}/>
                        
                    </div>
                </div>
            </div>
    </div>
  )
}

export default LeaveHoliday