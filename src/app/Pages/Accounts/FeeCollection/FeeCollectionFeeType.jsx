import React from 'react'
import { useState } from 'react'
import NoData from './../../../Components/NoData/Nodata'
import axios from 'axios'
import {toast} from 'react-toastify'
import { ACCOUNT_FEE_TYPE } from '../../../utils/Accounts.apiConst'
import { useEffect } from 'react'
import { useRef } from 'react'
import {scrollToRef} from './../../../Helpers/ScrollToRef'

function FeeCollectionFeeType({setLoading, collegeId}) {
  const [data,setData] = useState([])

  const scrollTo = useRef()
  
  const [edit, setEdit] = useState(false)

    const [user,setUser] = useState({
      name:'',
      id:'',
      description:''
    })
  
    const clearData = () =>{
      setUser({
        name:'',
        id:'',
        description:''
      })
    }

    const checkMandatory = () =>{
      if(!user?.name || !user?.id) return false
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
        url: `${ACCOUNT_FEE_TYPE}?college_id=${collegeId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      }
  
      await axios(config)
      .then(res=>{
        setLoading(0)
        setData(res.data.data)
      })
      .catch(err=>{
        setLoading(0)
        console.log(err);
        toast.error('Something went wrong')
      })
    }
  
    const handleSubmit = async() =>{
      if(!checkMandatory()) return toast.error("Mandatory Fields are required")
      setLoading(1)
  
      const config = {
        method: "post",
        url: ACCOUNT_FEE_TYPE,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      data: {
        ...user,
        college_id:collegeId
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
        if(!checkMandatory()) return toast.error("Mandatory Fields are required")
      setLoading(1)
      const config = {
        method: "put",
        url: ACCOUNT_FEE_TYPE + '/' + user?.id,
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
        url: ACCOUNT_FEE_TYPE + '/' + id,
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
      getData()
    },[])

  return (
    <div className='FeeCollectionFeeType'>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Fee Type</h4>
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
          <div className="card" ref={scrollTo}>
            <div className="card-body">
              <h2 className="card-title">Add criteria</h2>
              <br />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Fee Type"
                        value={user.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Fee Code<span style={{ color: "red" }}>*</span>
                        </label>
                      <input
                        type="text"
                        className={`form-control ${edit?'cursor-disable':''}`}
                        name="id"
                        placeholder="Enter Fee Code"
                        readOnly={edit}
                        disabled={edit}
                        value={user.id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor='d"validationCustom01"'>Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        placeholder="Enter Description"
                        cols={30}
                        rows={1}
                        value={user.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
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
                  <h4 className="card-title">Fee Type Lists</h4>
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
                            Fee Codes
                          </th>
                          {/* <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="datatable"
                            rowSpan={1}
                            colSpan={1}
                            style={{ width: "256.005px" }}
                            aria-label="Description: activate to sort column ascending"
                          >
                            Description
                          </th> */}
                          <th>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data&&data.length!=0
                          ?
                          data?.map((i,key)=>(
                            <tr role="row" className="odd">
                          <td className="sorting_1 dtr-control">{key + 1}</td>
                          <td id="edit11">{i.name}</td>
                          <td id="edit11">{i.id}</td>
                          {/* <td id="edit21">{i.description}</td> */}
                          <td id="edit31">
                            {" "}
                            <a
                              data-toggle="tooltip"
                              className="badge badge-light"
                              title=""
                              href="javascript:void(0)"
                              data-original-title="Edit"
                              onClick={()=>{setEdit(true); setUser({...i}); scrollToRef(scrollTo)}}
                            >
                              {" "}
                              <i
                                className="ri-edit-2-line "
                                aria-hidden="true"
                                onclick="changesave(1)"
                              />
                            </a>{" "}
                            &nbsp;{" "}
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

export default FeeCollectionFeeType