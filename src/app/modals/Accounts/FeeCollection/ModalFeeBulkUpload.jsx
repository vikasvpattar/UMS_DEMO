import React, { useState } from 'react'
import papa from 'papaparse'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ACCOUNT_FEE_BULK } from '../../../utils/Accounts.apiConst';
import axios from 'axios';

import { SessionOpt } from '../../../Data/student/sessionData'

function ModalStudentAdmission(
    { setLoading, collegeId }) {

    const [user, setUser] = useState({
        college_id: collegeId,
        session_id: ''
    })

    const [data, setData] = useState()

    var commonConfig = { delimiter: "," };

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const checkReadOnly = () => {
        if (!user?.session_id) return false
        return true

    }

    const clearData = () => {
        setData()
        setUser({})
    }

    const handleUpload = async () => {

        console.log("uploading")
        setLoading(1)
        const config = {
            method: 'post',
            url: ACCOUNT_FEE_BULK,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
            data: { data: data }
        }

        console.log(config);

        await axios(config)
            .then(res => toast.success('Success'))
            .catch(err => toast.error('Something went wrong'))

        setLoading(0)
        // clearData()
    }

    const handleProcessCSV = (d) => {
        const arr = []
        for (const i of d) {
            const obj = {
                session_id: user?.session_id,
                student_id: i?.admission_number,
                amount: i?.fee_amount,
                date: i?.date
            }

            arr.push(obj)
        }

        console.log('arr', arr)
        setData(arr)
    }

    const handleFileUpload = async (e) => {
        const files = e.target.files
        console.log("hello")
        if (files) {
            papa.parse(
                files[0],
                {
                    ...commonConfig,
                    header: true,
                    complete: (async (res) => {
                        console.log('com', res);
                        await handleProcessCSV(res.data)
                    })
                })
        }
    }

    return (
        <div>
            <div
                className="modal fade"
                id="exampleModalLong"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                Import CSV File
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ol>
                                <li>
                                    Your CSV data should be in the format below. The
                                    first line of your CSV file should be the column
                                    headers as in the table example. Also make sure
                                    that your file is UTF-8 to avoid unnecessary
                                    encoding problems.
                                </li>
                                <li>
                                    If the column you are trying to import is date
                                    make sure that is formatted in format Y-m-d
                                    (2018-06-06).{" "}
                                </li>
                                <li>
                                    Duplicate "Admission Number" (unique) and "Roll
                                    Number" (unique in class) rows will not be
                                    imported.
                                </li>
                                <li>
                                    For student "Gender" use Male, Female value.
                                </li>
                                <li>
                                    For "If Guardian Is" user father,mother,other
                                    value.
                                </li>
                            </ol>
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom02">
                                            Select Session
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            name="session_id"
                                            value={user?.session_id}
                                            onChange={handleChange}
                                        >
                                            <option value=""> Select session</option>
                                            {
                                                SessionOpt?.map((i, key) => (
                                                    <option value={i?.id} key={key}>{i?.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom02">
                                            Select Department
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            name="department_id"
                                            value={user?.department_id}
                                            onChange={handleChange}
                                        >
                                            <option value=""> Select Department</option>
                                            {
                                                departmentOpt?.filter(s => s?.program_id == user?.program_id)?.map((i, key) => (
                                                    <option value={i?.id}>{i?.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div> */}

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom02">
                                            Select CSV File
                                            <span style={{ color: "red" }}>*</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept=".csv"
                                            readOnly={!checkReadOnly()}
                                            disabled={!checkReadOnly()}
                                            onChange={handleFileUpload}
                                        />
                                        {
                                            !checkReadOnly()
                                                ?
                                                <div className='text-danger'>Fill above fields first to upload document</div>
                                                :
                                                <div className='text-warning'>Only csv format is allowed</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => clearData()}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                name="submit"
                                value="bulk"
                                onClick={handleUpload}
                                data-dismiss="modal"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalStudentAdmission