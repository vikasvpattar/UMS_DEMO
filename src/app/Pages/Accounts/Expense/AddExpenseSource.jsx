import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../Components/NoData/Nodata'
import { FEE_EXPENSE_SOURCE } from '../../../utils/fees.apiConst'

  function AddExpenseSource({collegeId, setLoading}) {


    const [user, setUser] = useState({
      name: "",
      description: ""
    })
  
    const [data, setData] = useState([])

    const [edit, setEdit] = useState(0)
  
    const handleChange = (e) => {
      const { name, value } = e.target
  
      setUser(prevValue => ({
        ...prevValue,
        [name]: value
      }));
    }
  
    const clearData = () =>{
      setUser({
        name: "",
        description: ""
      })
    }
  
    const getData = () =>{
  
  
      const config = {
        method:'get',
        url:`${FEE_EXPENSE_SOURCE}?college_id=${collegeId}}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      }
  
      axios(config)
      .then(res=>{
        setLoading(0)
        setData(res.data.data)
      })
      .catch(err=>{
        setLoading(0)
        toast.error("Something Went Wrong")
      })
    }
  
    const handleSubmit = () => {
      if(!user?.name) return toast.error("name is required");
      setLoading(1)
      const config = {
        method:'post',
        url:`${FEE_EXPENSE_SOURCE}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data:{
          ...user,
          college_id:collegeId
        }
      }
      
      axios(config)
      .then(res=>{
        setLoading(0)
        getData()
        toast.success("Success")
        clearData()
      })
      .catch(err=>{
        setLoading(0)
        toast.error("Something went wrong")
      })
    }

    const handleEdit = () => {
      if(!user?.name) return toast.error("name is required");
      setLoading(1)
      const config = {
        method:'put',
        url:`${FEE_EXPENSE_SOURCE}/${user?.id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data:{
          ...user,
        }
      }
      
      axios(config)
      .then(res=>{
        setLoading(0)
        getData()
        toast.success("Success")
        clearData()
      })
      .catch(err=>{
        setLoading(0)
        toast.error("Something went wrong")
      })
    }
  
    const handleDelete = (id) =>{
      const config = {
        method:'put',
        url:`${FEE_EXPENSE_SOURCE}/${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data:{
          status:"INACTIVE"
        }
      }
      
      axios(config)
      .then(res=>{
        setLoading(0)
        getData()
        toast.success("Success")
      })
      .catch(err=>{
        setLoading(0)
        toast.error("Something went wrong")
      })
    }
  
    useEffect(()=>{
      getData()
    },[])
  
  
  
    return (
      <div className='AddIncomeSource'>
  
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Source of Expense</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Expense</a>
                        </li>
                        <li className="breadcrumb-item active">
                          {" "}
                          Add Source of Expense
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Add Criteria</h2>
                      <br />
  
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="income source">
                              Expense Source<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Enter Name of Expense Source"
                              value={user?.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor='d"description"'>Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              id="description"
                              placeholder='Enter Description'
                              cols={30}
                              rows={1}
                              defaultValue={""}
                              value={user?.description}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-12 ">
                          {
                            edit?
                            <button
                              className="btn btn-nex btn-rounded float-right  "
                              type="submit"
                              name="submit"
                              onClick={(e) => handleEdit(e)}
                            >
                              <i className="fa fa-save" aria-hidden="true" /> Save Changes
                            </button>
                            :
                            <button
                              className="btn btn-nex btn-rounded float-right  "
                              type="submit"
                              name="submit"
                              onClick={(e) => handleSubmit(e)}
                            >
                              <i className="fa fa-save" aria-hidden="true" /> Save
                            </button>

                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card */}
                </div>
              </div>
  
  
              <div className="row">
  
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className='card-title text-uppercase '>Expense Sources</h4>
                      <hr />
  
                      <div className="table-responsive">
  
                        <table
                          id="table_id"
                          className="display table table-bordered  nowrap table-hover "
                          style={{ borderCollapse: "collapse", borderSpacing: 0, width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th> Sl. No.</th>
                              <th>Source of Expense</th>
                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
  
  
  
                            {
                              data 
                              &&
                              data?.length==0
                              ?
                              <tr>
                                <td colSpan={10}>
                                  <Nodata/>
                                </td>
                              </tr>
                              :
                              data?.map((data, key) => {
                                return <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data?.name}</td>
                                  <td> {data?.description}</td>
                                  <td><span 
                                  className='badge badge-light text-dark mr-3' 
                                  data-toggle="tooltip" 
                                  title="Edit"
                                  onClick={()=>{
                                    setEdit(1)
                                    setUser(data)
                                  }}
                                  > <i class="fa fa-edit " aria-hidden="true"></i></span>
                                    <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" onClick={() => handleDelete(data?.id)}> <i class="fa fa-trash " aria-hidden="true"></i></span>
                                  </td>
                                </tr>
                              })
  
  
                            }
                          </tbody>
                        </table>
                      </div>
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


export default AddExpenseSource