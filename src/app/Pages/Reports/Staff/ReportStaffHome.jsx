import React from 'react'
import logo from './../../../assets/images/reports/profile.png'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../Router/routerConfig'

const ReportStaffHome = () => {

    const navigate = useNavigate()

    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Staff Reports</h4>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start justify-content-center align-items-center flex-wrap">
                            <div className='p-3'>
                                <div className="card cursor-pointer" onClick={()=>{
                                    navigate(ROUTES.Registar.Reports.Staff.StaffDetails)
                                }}>
                                    <div className="card-body d-flex flex-column align-items-center" style={{ width: '170px' }}>
                                        <img
                                            src={logo}
                                            className="w-75 "
                                            alt=""
                                        />
                                        <h6 className="text-center mt-3">Staff Details</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='p-3'>
                                <div className="card cursor-pointer" onClick={()=>{
                                    navigate(ROUTES.Registar.Reports.Staff.Leave)
                                }}>
                                    <div className="card-body d-flex flex-column align-items-center" style={{ width: '170px' }}>
                                        <img
                                            src={logo}
                                            className="w-75 "
                                            alt=""
                                        />
                                        <h6 className="text-center mt-3">Leave Reports</h6>
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

export default ReportStaffHome