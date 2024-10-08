import React from 'react'
import { useState } from 'react'
import NoData from './../../../Components/NoData/Nodata'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Select from 'react-select';
import { ACCOUNT_FEE_DIS, ACCOUNT_FEE_TYPE, ACCOUNT_FEE_TYPE_AMOUNT } from '../../../utils/Accounts.apiConst'
import { sessionOpt } from './../../../Data/jsonData/Academics/Academics'
import { useRef } from 'react'
import { scrollToRef } from '../../../Helpers/ScrollToRef'
import { ACADEMICS_ADD_CLASS } from '../../../utils/Academics.apiConst'
import { LOCAL_DEPARTMENT } from '../../../utils/LocalStorageConstants'

const FeeCollectionFeeTypeAmount = ({ collegeId, setLoading }) => {

  const scrollTo = useRef()

  const [data, setData] = useState([])

  const [feeTypes, setFeetypes] = useState([])

  const [classData, setClassData] = useState([])

  const [addNew, setAddNew] = useState(false);

  const [edit, setEdit] = useState(false)

  const [user, setUser] = useState({
    fee_type_id: '',
    session_id: '',
    class_id: '',
    amount: '',
  })

  const clearData = () => {
    setUser(prev => ({
      ...prev,
      fee_type_id: '',
      amount: '',
    }))
    setDepartmentId('')
  }

  const [departmentId,setDepartmentId] = useState('')

  const departmentOpt = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(s=>s?.college_id==collegeId)


  const checkMandatory = () => {
    if(!user?.session_id || !user?.amount || !user?.class_id || !user?.fee_type_id) return false
    return true
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser(prev => ({
  //     ...prev,
  //     [name]: value
  //   }))
  // }

  const getData = async () => {
    if (!user.session_id) return toast.error('Session is Required')
    setLoading(1)
    const config = {
      method: "get",
      url: `${ACCOUNT_FEE_TYPE_AMOUNT}?college_id=${collegeId}&session_id=${user.session_id}&class_id=${user?.class_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    await axios(config)
      .then(res => {
        setData(res.data.data)
        setLoading(0)
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
  }

  const handleSubmit = async () => {
    if(!checkMandatory()) return toast.error('Manadatory fields are required')
    setLoading(1)
    const config = {
      method: "post",
      url: `${ACCOUNT_FEE_TYPE_AMOUNT}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId
      },
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Data added successfully")
        clearData();
        getData();
      })
      .catch(err => {
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
  }

  const getAllData = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    const [data1, data2] = await Promise.all([
      axios({ ...config, url: `${ACCOUNT_FEE_TYPE}?college_id=${collegeId}`, })
        .then(res => {
          setFeetypes(res.data.data)
        })
        .catch(err => {
          toast.error(err.response.data.message)
        })
      ,
      axios({ ...config, url: `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`, })
        .then(res => {
          setLoading(0)
          setClassData(res.data.data)
        })
        .catch(err => {
          setLoading(0)
          toast.error(err.response.data.message)
        })

    ])


  }

  const handleEdit = async() => {
    if(!checkMandatory()) return toast.error('Manadatory fields are required')
    setLoading(1)
    const config = {
      method: "put",
      url: ACCOUNT_FEE_TYPE_AMOUNT + '/' + user?.id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user
    }

    await axios(config)
      .then(res => {
        toast.success("success")
        getData()
        clearData()
        setEdit(0)
      })
      .catch(err => {
        toast.error("Something went wrong")
        setEdit(0)
      })
    setLoading(0)
  }

  const handleDelete = async(id) => {
    setLoading(1)
    const config = {
      method: "put",
      url: ACCOUNT_FEE_TYPE_AMOUNT + '/' + id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE"
      },
    }

    await axios(config)
      .then(res => {
        toast.success("success")
        getData()
      })
      .catch(err => {
        toast.error("Something went wrong")
      })
    setLoading(0)
  }

  useEffect(() => {
    // getData();
    getAllData()
  }, [])

  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSessionChange = (selectedOption) => {
    setSelectedSession(selectedOption);
    setUser((prev) => ({
      ...prev,
      session_id: selectedOption?.value,
    }));
  };

  // const handleDepartmentChange = (selectedOption) => {
  //   setSelectedDepartment(selectedOption);
  //   setDepartmentId(selectedOption?.value);
  // };

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
      class_id: "", // Reset class_id when department changes
    }));
  };

  const handleChangeSelect = (name, selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: selectedOption?.value || null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target || {}; // Use default empty object to handle undefined e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='FeeCollectionFeeTypeAmount'>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Fee Type Amount</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Fee Collection</a>
                      </li>
                      <li className="breadcrumb-item active"> Fee Type Amount</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card" ref={scrollTo}>
                  <div className="card-body">
                    <h2 className="card-title">Add criteria</h2>
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Year</label>
                          {/* <select
                            name="session_id"
                            className={`form-control ${edit?'cursor-disable':''}`}
                            value={user.session_id}
                            onChange={handleChange}
                            disabled={edit?true:false}
                          >
                            <option value="">Select Session</option>
                            {
                              sessionOpt.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select> */}

                          <Select
                            name="session_id"
                            options={sessionOpt.map((i) => ({ value: i.id, label: i.name }))}
                            value={selectedSession}
                            onChange={handleSessionChange}
                            placeholder="Select Year"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            value={departmentId}
                            onChange={(e)=>{setDepartmentId(e.target.value)}}
                          >
                            <option value="">Select Department</option>
                            {
                              departmentOpt?.map((i, key) => (
                                <option value={i.id}>{i.name}</option>
                              ))
                            }
                          </select> */}

                          {/* <Select
                            options={departmentOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          /> */}

                          <Select
                            options={departmentOpt?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.department_id ? { value: user.department_id, label: departmentOpt?.find((i) => i.id == user.department_id)?.name } : null}
                            onChange={handleDepartmentChange}
                            placeholder="Select Department"
                          />

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Class<span style={{ color: "red" }}>*</span>
                          </label>
                                {/* <select
                                  name="class_id"
                                  className={`form-control ${edit?'cursor-disable':''}`}
                                  value={user.class_id}
                                  onChange={handleChange}
                                  disabled={edit?true:false}

                                >
                                  <option value="">Select Class</option>
                                  {
                                    classData?.filter(s=>s?.department_id==departmentId)?.map((i, key) => (
                                      <option value={i.id}>{i.name}</option>
                                    ))
                                  }
                                </select> */}

                          {/* <Select
                            options={classData
                              ?.filter((s) => s?.department_id == departmentId)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.class_id ? { value: user.class_id, label: classData?.find((i) => i.id == user.class_id)?.name } : null}
                            onChange={(selectedOption) => handleChangeSelect('class_id', selectedOption)}
                            placeholder="Select Class"
                          /> */}

                          <Select
                            options={classData
                              ?.filter((s) => s?.department_id == user.department_id)
                              ?.map((i) => ({ value: i.id, label: i.name }))}
                            value={user.class_id ? { value: user.class_id, label: classData?.find((i) => i.id == user.class_id)?.name } : null}
                            onChange={(selectedOption) => handleChangeSelect('class_id', selectedOption)}
                            placeholder="Select Class"
                          />

                              </div>
                            </div>
                      {
                        edit || addNew
                          ?
                          <>
                            
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Fee Type<span style={{ color: "red" }}>*</span>
                                </label>
                                {/* <select
                                  name="fee_type_id"
                                  className={`form-control ${edit?'cursor-disable':''}`}
                                  value={user.fee_type_id}
                                  onChange={handleChange}
                                  disabled={edit?true:false}

                                >
                                  <option value="">Select Fee Type</option>
                                  {
                                    feeTypes?.map((i, key) => (
                                      <option value={i.id}>{i.name}</option>
                                    ))
                                  }
                                </select> */}

                                <Select
                                  name="fee_type_id"
                                  isDisabled={edit}
                                  options={feeTypes.map((i) => ({ value: i.id, label: i.name }))}
                                  value={{ value: user.fee_type_id, label: feeTypes?.find((i) => i.id === user.fee_type_id)?.name }}
                                  onChange={(selectedOption) => handleChangeSelect('fee_type_id', selectedOption)}
                                  placeholder="Select Fee Type"
                                />

                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="validationCustom02">
                                  Amount <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="amount"
                                  placeholder="Enter Amount"
                                  value={user.amount}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </>
                          :
                          null
                      }

                    </div>
                    <div className="row ">
                      <div className="col-md-12 ">
                        {
                          addNew == false && edit == false ?
                            <button
                              className="btn btn-nex btn-rounded float-lg-right mx-1 "
                              type="submit"
                              name="submit"
                              onClick={getData}
                            >
                              <i className="fa fa-search" aria-hidden="true" /> Search
                            </button>
                            :
                            null
                        }

                        {
                          edit == false ?

                            <>
                              {
                                addNew == false ?
                                  <button
                                    className="btn btn-nex btn-rounded float-lg-right mx-1 "
                                    type="submit"
                                    name="submit"
                                    onClick={() => setAddNew(true)}
                                  >
                                    <i className="fa fa-add" aria-hidden="true" /> + Add New
                                  </button>
                                  :
                                  <>
                                    <button
                                      className="btn btn-nex btn-rounded float-lg-right mx-1"
                                      type="submit"
                                      name="submit"
                                      onClick={handleSubmit}
                                    >
                                      <i className="fa fa-save" aria-hidden="true" /> Save
                                    </button>
                                    <button
                                      className="btn btn-nex btn-rounded float-lg-right mx-1  p-2 px-3"
                                      type="submit"
                                      name="submit"
                                      // style={{aspectRatio:'1/1'}}
                                      onClick={() => { setEdit(false); setAddNew(false); }}
                                    >
                                      {'<   '}&nbsp;&nbsp;&nbsp; <i className="fa fa-search" aria-hidden="true" />
                                    </button>

                                  </>
                              }
                            </>
                            :
                            <button
                              className="btn btn-nex btn-rounded float-lg-right mx-1"
                              type="submit"
                              name="submit"
                              onClick={handleEdit}
                            >
                              <i className="fa fa-save" aria-hidden="true" /> Edit
                            </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            {/* container-fluid */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        {" "}
                        <h4 className="card-title">Fee Type Amount</h4>
                      </div>
                      <div className="col-md-8 ">
                        <span className="float-right">
                          <acronym title="PDF">
                            {" "}
                            <a href="#">
                              <i className="fa fa-file-pdf-o " aria-hidden="true" />
                            </a>
                          </acronym>
                          <a href="#"> </a> &nbsp;{" "}
                          <acronym title="Excel">
                            <a href="#">
                              {" "}
                              <i className="fa fa-file-excel-o" aria-hidden="true" />
                            </a>
                          </acronym>
                          <a href="#"> </a>
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div
                      id="datatable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="datatable"
                            className="table table-bordered dt-responsive nowrap table-hover dataTable no-footer dtr-inline"
                            style={{
                              borderCollapse: "collapse",
                              borderSpacing: 0,
                              width: "100%"
                            }}
                            role="grid"
                            aria-describedby="datatable_info"
                          >
                            <thead>
                              <tr role="row">
                                <th>
                                  {" "}
                                  Sl. No.
                                </th>
                                <th>
                                  Fee Type
                                </th>
                                <th>
                                  Amount
                                </th>
                                <th>
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length != 0
                                ?

                                data.map((i, key) => (
                                  <tr role="row" className="odd">
                                    <td className="sorting_1 dtr-control">{key + 1}</td>
                                    <td id="edit11">{feeTypes?.find(s => s?.id == i?.fee_type_id)?.name}</td>
                                    <td id="edit11">{i.amount}</td>
                                    <td id="edit31">
                                      {" "}
                                      <a
                                        data-toggle="tooltip"
                                        className="badge badge-light"
                                        title=""
                                        href="javascript:void(0)"
                                        data-original-title="Edit"
                                        onClick={() => { setEdit(true); setUser({ ...i }); scrollToRef(scrollTo) }}
                                      >
                                        {" "}
                                        <i
                                          className="ri-edit-2-line "
                                          aria-hidden="true"
                                        />
                                      </a>{" "}
                                      &nbsp;{" "}
                                      <a
                                        className="badge badge-light text-danger "
                                        data-toggle="tooltip"
                                        title=""
                                        href="javascript:void(0)"
                                        data-original-title="Delete"
                                        onClick={() => { handleDelete(i?.id) }}
                                      >
                                        {" "}
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                        />{" "}
                                      </a>{" "}
                                    </td>
                                  </tr>
                                ))
                                :
                                <tr>
                                  <td colSpan={10}>
                                    <NoData />
                                  </td>
                                </tr>

                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>
          {/* End Page-content */}
        </div>
        {/* end main content*/}
      </div>

    </div>
  )
}

export default FeeCollectionFeeTypeAmount