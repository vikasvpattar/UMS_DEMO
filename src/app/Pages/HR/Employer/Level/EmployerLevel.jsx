import React from 'react'
import ModalLevel from '../../../../modals/HR/Employer/ModalLevel'
import './../Employer.scss'

function EmployerLevel() {


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
        <div className='EmployerLevel'>
            <ModalLevel />
            <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Level</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Level</li>
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
                                            data-target="#ModalLevel"
                                        >
                                            Add +
                                        </button>
                                    </div>

                                    <div>
                                        {dept.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalLevel"
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

export default EmployerLevel