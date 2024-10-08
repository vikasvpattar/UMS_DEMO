import React from 'react'
import { useState } from 'react'
import OverAllBooks from './OverAll/LibraryReport'
import LibraryReportsBorrowed from './OverAll/LibraryReportsBorrowed'
import LibraryReportsReturned from './OverAll/LibraryReportsReturned'

const Reports = ({setLoading}) => {
    const [tab, setTab] = useState(1)
    return (
        <div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Libarary Report</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <ul
                                            className="nav nav-pills mb-3 justify-content-start"
                                            id="pills-tab"
                                            role="tablist"
                                        >
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link cursor-pointer ${tab==1?'active':''}`}
                                                    onClick={()=>{setTab(1)}}
                                                    >
                                                    Overall Books
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link cursor-pointer ${tab==2?'active':''}`}
                                                    onClick={()=>{setTab(2)}}
                                                    >
                                                    Borrowed Books
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link cursor-pointer ${tab==3?'active':''}`}
                                                    onClick={()=>{setTab(3)}}
                                                >
                                                    Returned Report
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="tab-content" id="pills-tabContent">
                                            {
                                                tab==1
                                                ?
                                                <OverAllBooks  setLoading={setLoading}/>
                                                :
                                                tab==2
                                                ?
                                                <LibraryReportsBorrowed  setLoading={setLoading}/>
                                                :
                                                <LibraryReportsReturned  setLoading={setLoading}/>

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

export default Reports