import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader';
import DocumnetManagement from '../../../../modals/HR/DocumentWorkflow/DocumentManagement'
import { EMPLOYEE, EMPLOYEE_DOCUMENT_MANAGEMENT, HR_WORKFLOW } from '../../../../utils/apiConstants';
import './../DocumentWorkflow.scss'
import Nodata from '../../../../Components/NoData/Nodata';
import { LOCAL_JOBROLES } from '../../../../utils/LocalStorageConstants';
import useEmployee from './../../../../Hooks/Employee/useEmployee'

function DocManagement({ setLoading, collegeId}) {
  const [data, setData] = useState([]);
  const [type, setType] = useState()
  const [edit, setEdit] = useState();
  const [employee, setEmployee] = useState()
  const [role, setRole] = useState('')
  const [employeeOpt] = useEmployee(collegeId)
  const [flow, setFlow] = useState()

  const roleOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES))
  // console.log(roleOpt);



  //This function calls when user select USER type in the dropdown
  //This calls an get api for dropdown of employee for filetering based on role
  // const SetRoleAndSearchEmployee = async (e) => {
  //   setLoading(1)
  //   setRole(e.target.value)

  //   const config = {
  //     method: 'get',
  //     url: `${EMPLOYEE}?role=${e.target.value}&&college_id=${collegeId}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
  //     },
  //   }

  //   await axios(config)
  //     .then((res) => {
  //       setEmployeeOpt(res.data.data)
  //       console.log(res.data.data);
  //       setLoading(0)
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.message);
  //       setLoading(0)
  //     })
  // }

  //This function calls when user select Employee type in the dropdown
  //This calls an get api for data of that employee
  const getData = async (employeeId) => {
    if (!role) return toast.error("Role is Required")
    if (!employeeId) return toast.error("Employee is Required")
    setEmployee(employeeId)
    setLoading(1)
    const config = {
      method: 'get',
      url: `${EMPLOYEE_DOCUMENT_MANAGEMENT}?employee_id=${employeeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0)
        console.log(res.data.data);
        setData(res.data.data)
        toast.success("Data Fetched Success ")
      })
      .catch(err => {
        setLoading(0)
        console.log(err)
      }
      )

  }


  const getDataFlow = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: `${HR_WORKFLOW}?type=DOCUMENT`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0)
        console.log(res.data.data);
        setFlow(res.data.data)
        // toast.success("Data Fetched Success ")
      })
      .catch(err => {
        setLoading(0)
        console.log(err)
      })


  }

  useEffect(() => {
    getDataFlow()
  }, [])


  return (
    <div className='DocManagement'>
      <DocumnetManagement type={type} data={edit} id={employee} flow={flow} reloadData={(employeeId) => getData(employeeId)} setLoading={setLoading} collegeId={collegeId}/>
      <div className="container-fluid">

        {/* start page title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between mt-3">
              <h4 className="mb-0">Document Management </h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Human Resource</a>
                  </li>
                  <li className="breadcrumb-item active"> Document Management </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* end page title */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Select Employee</h2>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Role <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        autoComplete="off"
                      >
                        <option value="">Select Role</option>
                        {
                          roleOpt?.map((i, key) => (
                            <option key={key} value={i.id}>{i.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Employee <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={employee}
                        onChange={(e) => { getData(e.target.value) }}
                        className="form-control"
                        autoComplete="off"
                      >
                        <option value="">Select</option>
                        {
                          employeeOpt?.filter(s=>s.role==role)?.map((i, key) => (
                            <option key={key} value={i.id}>{i.first_name + ' ' + i.last_name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                </div>
                {employee &&
                  <div className="row ">
                    <div className="col-md-12 ml-auto">
                      <button
                        className="btn btn-nex btn-rounded "
                        data-toggle="modal"
                        data-target="#ModalDocManagement"
                        onClick={() => { setType("add"); setEdit() }}
                      >
                        + Add New
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
            {/* end card */}
          </div>
        </div>


        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {" "}
                  <div className="col-4">
                    <h4 className="card-title">Employee Data</h4>
                  </div>
                </div>

                <hr />
                <br />

                <div className="row">
                  <div className="row px-5 w-100 gap-5">
                    {
                      !employee
                        ?
                        <div className='mb-3 col-12'>
                          <Nodata titleTop={'Please select employee to add and read documents'} />
                        </div>
                        :
                        <div
                          className="col-12 crd rowData"
                        >
                          {
                            data && data.length !== 0
                              ?
                              data?.map((i, key) => (
                                <div className="rounded border card-default card cursor-pointer">
                                  <div className="row p-3 align-items-center d-flex">
                                    <div className="col-10 row">
                                      <div className="col-12">
                                        {i.description}  <strong>({i.submission_date.split("T")[0]})</strong>
                                      </div>
                                      <div className="col-12 text-danger">
                                        {i.status}
                                      </div>
                                    </div>
                                    <div className='col-2 d-flex justify-content-end justify-self-end' style={{fontSize:'18px'}}>


                                      {i.attachment &&
                                        <div className='px-1 rounded secondary mr-2'>
                                          <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                        </div>
                                      }
                                      <div
                                        className='px-1 rounded text-secondary cursor-pointer'
                                        data-toggle="modal"
                                        data-target="#ModalDocManagement"
                                        onClick={() => { setType('edit'); setEdit(i) }}
                                      >
                                        <i className="ri-edit-box-line"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))

                              :
                              <Nodata titleTop={'No Data Available for your search'} />
                          }
                        </div>
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

export default DocManagement