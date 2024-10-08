import React from 'react'
import { useEffect } from 'react'
import { SESSION_COLLEGE_ID } from '../../utils/sessionStorageContants'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../Router/routerConfig'

const AdmissionConsultanttoHR = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        sessionStorage.setItem(SESSION_COLLEGE_ID, 1111012)
        navigate(ROUTES.HR.Home)
    },[])
  return (
    <div>
        <div className="main-contnet">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-header">
                                        Please wait while we redirect to the HR portal ......................
                                    </h6>
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

export default AdmissionConsultanttoHR