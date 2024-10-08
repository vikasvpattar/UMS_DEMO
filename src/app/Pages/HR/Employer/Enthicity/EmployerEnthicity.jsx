import React from 'react'
import ModalEnthicity from '../../../../modals/HR/Employer/ModalEnthicity'
import './../Employer.scss'

function EmployerEnthicity() {

    const jobPos = [
        {
            title: 'Assian',
            code: 'ASSIAN'
        },
        {
            title: 'Hawaiian',
            code: 'HAWAIIAN'
        },
        {
            title: 'Latino or Hispanic',
            code: 'LATION'
        },
        {
            title: 'Alaska Native',
            code: 'Alaska'
        },
        {
            title: 'Black',
            code: 'BLACK'
        },
        {
            title: 'White',
            code: 'WHITE'
        },
    ]

  return (
    <div className='EmployerEnthicity'>
        <div className="main-content">
    <ModalEnthicity/>
<div className="page-content">
    <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Enthicity</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">Employer</li>
                            <li className="breadcrumb-item active">Enthicity</li>
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
                        data-target="#ModalEnthicity"
                        >
                            Add +
                        </button>
                    </div>

                    <div>
                        {jobPos.map((i, key) => (
                            <div 
                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                            data-toggle="modal"
                            data-target="#ModalEnthicity"
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

export default EmployerEnthicity