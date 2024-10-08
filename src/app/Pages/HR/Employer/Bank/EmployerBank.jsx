import React from 'react'
import ModalBank from '../../../../modals/HR/Employer/ModalBank'
import './../Employer.scss'

function EmployerBank() {


    const dept = [
        {
            title: 'Accountant',
            code: 'ACT'
        },
        {
            title: 'Admin Specialist',
            code: 'APT'
        },
        {
            title: 'Chief Executive Officer',
            code: 'CEO'
        },
        {
            title: 'Customer Support Specialist',
            code: 'CS'
        },
        {
            title: 'HR Specialist',
            code: 'HR'
        },
    ]

  return (
    <div className='EmployerBank'>
        <div className="main-content">
            <ModalBank/>
<div className="page-content">
    <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Bank</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">Employer</li>
                            <li className="breadcrumb-item active">Bank</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

        <div className="container">
            <div className="card">
                <div className="card-body">

                    <div className="row d-flex justify-content-end p-3">
                        <button 
                        className="btn btn-rounded btn-success btn-outline px-4"
                        data-toggle="modal"
                        data-target="#ModalBank"
                        >
                            Add +
                        </button>
                    </div>

                    <div>
                        {dept.map((i, key) => (
                            <div 
                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                            data-toggle="modal"
                            data-target="#ModalBank"
                            >
                                <div className="col-11" key={key}>
                                    <div className="role-title">
                                        {i.title}
                                    </div>
                                    <div className="role-code">
                                        {i.code}
                                    </div>
                                </div>
                                <div className="col-1 d-flex align-items-center justify-content-end">
                                    {'>'}
                                </div>
                            </div>
                        ))
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

export default EmployerBank