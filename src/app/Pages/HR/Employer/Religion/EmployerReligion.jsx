import React from 'react'
import ModalReligion from '../../../../modals/HR/Employer/ModalReligion'
import './../Employer.scss'

function EmployerReligion() {

    const jobPos = [
        {
            title: 'Hindu',
            code: 'HINDU'
        },
        {
            title: 'Christian',
            code: 'CHRISTIAN'
        },
        {
            title: 'Muslim',
            code: 'MUSLIM'
        },
        {
            title: 'Jain',
            code: 'JAIN'
        },
    ]

  return (
    <div className='EmployerReligion'>
        <div className="main-content">
 <ModalReligion/>
<div className="page-content">
    <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Religions</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">Employer</li>
                            <li className="breadcrumb-item active">Religion</li>
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
                        data-target="#ModalReligion"
                        >
                            Add +
                        </button>
                    </div>

                    <div>
                        {jobPos.map((i, key) => (
                            <div 
                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                            data-toggle="modal"
                            data-target="#ModalReligion"
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

export default EmployerReligion