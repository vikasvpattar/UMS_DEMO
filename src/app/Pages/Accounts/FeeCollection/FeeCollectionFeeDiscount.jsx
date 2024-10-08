import React from 'react'
import { useState } from 'react'
import NoData from './../../../Components/NoData/Nodata'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { ACCOUNT_FEE_DIS } from '../../../utils/Accounts.apiConst'
import { sessionOpt } from '../../../Data/jsonData/Academics/Academics'

function FeeCollectionFeeDiscount({collegeId , setLoading}) {

  const [data,setData] = useState([])

  const [edit, setEdit] = useState(false)

  const [user,setUser] = useState({
    name:'',
    id:'',
    amount:'',
    description:'',
    session_id:''
  })

  //Clears reusable states after edit/new request
  const clearData = () =>{
    setUser({
      name:'',
      id:'',
      amount:'',
      description:''
    })
  }

  //check all madatory fields
  const checkMandatory = () => {
    if(!user?.name || !user?.id || !user?.amount || !user?.session_id) return false
    return true
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const getData = async() => {
    setLoading(1)
    const config = {
      method: "get",
      url: `${ACCOUNT_FEE_DIS}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }

    await axios(config)
    .then(res=>{
      setData(res.data.data)
      setLoading(0)
    })
    .catch(err=>{
      setLoading(0)
      console.log(err);
      toast.error('Something went wrong')
    })
  }

  const handleSubmit = async() =>{
    if(!checkMandatory()) return toast.error('Mandatory fields are required')
    setLoading(1)
    const config = {
      method: "post",
      url: ACCOUNT_FEE_DIS,
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
    .then(res=>{
      setLoading(0)
      toast.success("Data added successfully")
      clearData();
      getData();
    })
    .catch(err=>{
      setLoading(0)
      console.log(err);
      toast.error('Something went wrong')
    })
  }

  const handleEdit = async() => {
    if(!checkMandatory()) return toast.error('Mandatory fields are required')
    setLoading(1)
    const config = {
      method: "put",
      url: ACCOUNT_FEE_DIS + '/' + user?.id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user
    }

    await axios(config)
    .then(res=>{
      toast.success("success")
      getData()
      clearData()
    })
    .catch(err=>{
      toast.error("Something went wrong")
    })
    setLoading(0)
    setEdit(false)
  }

  const handleDelete = async(id) => {
    setLoading(1)
    const config = {
      method: "put",
      url: ACCOUNT_FEE_DIS + '/' + id,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status:"INACTIVE",
      },
    }

    await axios(config)
    .then(res=>{
      toast.success("success")
      getData()
    })
    .catch(err=>{
      toast.error("Something went wrong")
    })
    setLoading(0)
  }

useEffect(()=>{
  getData();
},[])

  return (
    <div className='FeeCollectionFeeDiscount'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Fee Discount</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Fee Collection</a>
                </li>
                <li className="breadcrumb-item active"> Fee Type</li>
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
              <h2 className="card-title">Add criteria</h2>
              <br />
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Session<span style={{ color: "red" }}>*</span>
                      </label>
                      <select 
                      name="session_id"
                      className="form-control"
                      value={user?.session_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Session</option>
                        {
                          sessionOpt?.map((i,key)=>(
                            <option value={i.id}>{i.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Discount Name"
                        value={user.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Discount Code</label>
                      <input
                        type="text"
                        className={`form-control ${edit?'cursor-disable':''}`}
                        name="id"
                        placeholder="Enter Discount Codes"
                        value={user.id}
                        onChange={handleChange}
                        readOnly={edit?true:false}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        cols={30}
                        placeholder="Enter Description"
                        rows={1}
                        value={user.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 ">
                  {
                      !edit
                      ?
                      <button
                        className="btn btn-nex btn-rounded float-right  "
                        type="submit"
                        name="submit"
                        value="feegroups"
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-save" aria-hidden="true" /> Save
                      </button>
                    :
                    <button
                      className="btn btn-nex btn-rounded float-right  "
                      type="submit"
                      name="submit"
                      value="feegroups"
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
                  <h4 className="card-title">Fee Discount Lists</h4>
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
                            Name
                          </th>
                          <th>
                            Amount
                          </th>
                          <th>
                            Discount Code
                          </th>
                          <th>
                            Description
                          </th>
                          <th>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data&&data.length!=0
                        ?

                          data.map((i,key)=>(
                            <tr role="row" className="odd">
                            <td className="sorting_1 dtr-control">{key+1}</td>
                            <td id="edit11">{i?.name}</td>
                            <td id="edit11">{i?.amount}</td>
                            <td id="edit11" >{i?.id}</td>
                            <td id="edit21" >{i?.description}</td>
                            <td id="edit31">
                              <a
                                data-toggle="tooltip"
                                className="badge badge-light"
                                title=""
                                href="javascript:void(0)"
                                data-original-title="Edit"
                                onClick={()=>{setEdit(true); setUser({...i})}}
                              >
                                {" "}
                                <i
                                  className="ri-edit-2-line "
                                  aria-hidden="true"
                                />
                              </a>
                              &nbsp;&nbsp;&nbsp;
                              <a
                                className="badge badge-light text-danger "
                                data-toggle="tooltip"
                                title=""
                                href="javascript:void(0)"
                                data-original-title="Delete"
                                onClick={()=>{handleDelete(i?.id)}}
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
                              <NoData/>
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

export default FeeCollectionFeeDiscount