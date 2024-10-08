import React from 'react'
import ModalCourse from '../../../../modals/HR/Employer/ModalCourse'
import './../Employer.scss'

function EmployerCourse() {

    const collegeData = JSON.parse(localStorage.getItem("ALL_DATA")).college
    const dData = JSON.parse(localStorage.getItem("ALL_DATA")).department

    const dept = [
        {
            title: 'OS',
            code: 'OS'
        },
        {
            title: 'Data Structures and Algorithms',
            code: 'DSA'
        },
        {
            title: 'Data Science',
            code: 'DS'
        },
        {
            title: 'Object Oriented Programming',
            code: 'OOPS'
        },
        {
            title: 'Machine Learning',
            code: 'ML'
        },
        {
            title: 'Computer Vision',
            code: 'CV'
        },
    ]


  return (
    <div className='EmployerCourse'>
        <div className="main-content">
            <ModalCourse/>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Course</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Course</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Select Criteria</h2>
                                        <br />
                                        <div className="row d-flex ">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        College<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        autoComplete="off"
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {collegeData.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="validationCustom01">
                                                        Department<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        className="form-control"
                                                        autoComplete="off"
                                                    >
                                                        <option value="" selected>Select</option>
                                                        {dData.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-12 d-flex justify-content-between">
                                                <button
                                                    className="btn btn-nex btn-rounded "
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>

                                                <button
                                                    // onClick={() => { setType("add"); setEdit() }}
                                                    className="btn btn-rounded btn-success btn-outline px-4"
                                                    data-toggle="modal"
                                                    data-target="#ModalCourse"
                                                >
                                                    Add +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>


                        <div className="">
                            <div className="card">
                                <div className="card-body">

                                    <div>
                                        {dept.map((i, key) => (
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalCourse"
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

export default EmployerCourse