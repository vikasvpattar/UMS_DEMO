import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { TRANSPORT_ROUTE } from '../../../utils/Transport.apiConst'
// import Nodata from '../../Components/NoData/Nodata'

function TransportRoute({setLoading, collegeId}) {

  const [user, setUser] = useState(
    {
      title : "",
      fare: ""
    }
  )

  const [data, setData] = useState([])

const [edit,setEdit]= useState(0)
const [editId,setEditId]= useState()

const clearData = () => {
  setUser({
    title : "",
      fare: ""
  })
}


  const handleChange = (e) => {
    const { name, value } = e.target

    setUser(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }



  
  
  const handleEdit = () => {
    if(!user?.title) return toast.error("Title is required");
    setLoading(1)
    const config = {
      method:'put',
      url:`${TRANSPORT_ROUTE}/${editId}`,
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
      getdata()
      clearData()
      toast.success("Success")
    })
    .catch(err=>{
      setLoading(0)
      toast.error("Something went wrong")
    })
  }




  const getdata = async() => {
    setLoading(1)
    const config = {
      method:'get',
      url:`${TRANSPORT_ROUTE}?college_id=${collegeId}`,
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
    if(!user.title) return toast.error('Please Select Route');
   
    const config = {
      method: 'post',
      url: `${TRANSPORT_ROUTE}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId
      }
    }

    axios(config)
      .then(res => {
        setLoading(0)
        toast.success("Success")
        getdata()
      })
      .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
      })
  }


  const handleDelete = (id) => {
    const config = {
      method: 'put',
      url: `${TRANSPORT_ROUTE}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: 'INACTIVE'
      }
    }

    axios(config)
      .then(res => {
        setLoading(0)
        getdata()
        toast.success("Success")
      })
      .catch(err => {
        setLoading(0)
        getdata()
        toast.error("Something Went Wrong")
      })
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className='TransportRoute'>
      <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* Followup */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Route</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Transport</a>
                </li>
                <li className="breadcrumb-item active">Route</li>
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
        <form
          className="needs-validation"
          noValidate=""
          method="POST"
          action="javascript:void(0)"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">
                  Route Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Room Type"
                  name="title"
                  
                 value={user.title}
                 onChange={handleChange}

                  
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Fare</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description No"
                  name="fare"
                  value={user.fare}
                  onChange={handleChange}
               
                />
              </div>
            </div>
          </div>
          <div className="row float-right ">
          {
                          edit
                          ?
                          <button
                          className="btn btn-nex btn-rounded float-right  "
                          type="submit"
                          name="submit"
                          onClick={(e) => handleEdit(e)}
                        >
                           Save Changes
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
        </form>
      </div>
    </div>
  </div>
</div>
<>
  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="card-title">Route List</h4>
            </div>
            <div className="col-md-6"></div>
          </div>
          <hr />
          <table
            id="datatable"
            className="table table-bordered dt-responsive nowrap"
            style={{
              borderCollapse: "collapse",
              borderSpacing: 0,
              width: "100%"
            }}
          >
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Route Title</th>
                <th>Fare</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
            {
                            data && data?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.title}</td>
                                <td> {data.fare}</td>
                             

                                <td><span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit" 
                                onClick={()=>{
                                  setUser({
                                    title:data?.title,
                                    fare:data?.fare,

                                  })
                                  setEdit(1)
                                  setEditId(data?.id)
                                }}> <i class="fa fa-edit cursor-pointer" aria-hidden="true"></i></span>
                                  <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" onClick={() => {
                                    handleDelete(data?.id)}}> <i class="fa fa-trash cursor-pointer" aria-hidden="true"></i></span>
                                </td>
                              </tr>
                            })
                          }
                         
            </tbody>
          </table>
        </div>
      </div>
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end row */}
</>

    </div>
  </div>
</div>

    </div>
  )
}

export default TransportRoute