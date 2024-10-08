import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import Nodata from '../../../Components/NoData/Nodata'
import { HOSTEL } from '../../../utils/Hostel.apiConst'

function Hostel({setLoading,collegeId}) {
  
  const [user, setUser] = useState(
    {
      hostel_name : "",
      hostel_type: "",
      hostel_address:"",
      hostel_intake:"",
    hostel_desc:""
    }
  )

  const [data, setData] = useState([])


  const [edit, setEdit] = useState(0)

  const [editId, setEditId] = useState()

  const clearData = () => {
    setUser({
      hostel_name : "",
      hostel_type: "",
      hostel_address:"",
      hostel_intake:"",
    hostel_desc:""
    })
  }



  
  const handleEdit = () => {
      if(!user?.hostel_name) return toast.error("name is required");
      setLoading(1)
      const config = {
        method:'put',
        url:`${HOSTEL}/${editId}`,
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
  
  



  const handleChange = (e) => {
    const { name, value } = e.target

    setUser(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  const getdata = async() => {
    setLoading(1)
    const config = {
      method:'get',
      url:`${HOSTEL}?college_id=${collegeId}`,
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
    if(!user.hostel_name) return toast.error('Please Add Hostel Name');
    if(!user.hostel_type) return toast.error('Please Add Hostel Type');
    if(!user.hostel_address) return toast.error('Please Add Hostel Address');
    if(!user.hostel_intake) return toast.error('Please Add Hostel Intake');

  
    const config = {
      method: 'post',
      url: `${HOSTEL}`,
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
      url: `${HOSTEL}/${id}`,
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
    <div className='Hostel'>
       <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* Followup */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Hostel Type</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Hostel</a>
                </li>
                <li className="breadcrumb-item active">Hostel Type</li>
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
              <h2 className="card-title">Add Criteria</h2>
              <br />
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Hostel Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Hostel Name"
                        name="hostel_name"
                        id="hostel"
                     value={user?.hostel_name}
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Type<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        className="form-control"
                        name="hostel_type"
                        id="type"
                        required=""
                     value={user?.hostel_type}

                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Girls">Girls</option>
                        <option value="Boys">Boys</option>
                        <option value="Combine">Combine</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Address <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        name="hostel_address"
                        value={user?.hostel_address}

                        id="address"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02" >Intake <span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Intake Count"
                        name="hostel_intake"
                        value={user?.hostel_intake}

                        id="intake"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Description"
                        name="hostel_desc"
                        value={user?.hostel_desc}

                        id="description"
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
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
    </div>
    {/* container-fluid */}
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h4 className="card-title">Hostel List</h4>
              </div>
              <div className="col-md-6"></div>
            </div>
            <hr />
            <table
              id=""
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
                  <th>Hostel Name</th>
                  <th>Type</th>
                  <th>Address</th>
                  <th>Intake</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
            {
                            data && data?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.hostel_name}</td>
                                <td> {data.hostel_type}</td>
                                <td> {data.hostel_address}</td>
                                <td> {data.hostel_intake}</td>
                                <td> {data.hostel_desc}</td>



                             

                                <td><span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit"
                                onClick={()=>{
                                  setUser({
                                    hostel_name:data?.hostel_name,
                                    hostel_type:data?.hostel_type,
                                    hostel_address:data?.hostel_address,

                                    hostel_intake:data?.hostel_intake,
                                    hostel_desc:data?.hostel_desc


                                  })
                                  setEdit(1)
                                  setEditId(data?.id)
                                }}> <i class="fa fa-edit " aria-hidden="true"></i></span>
                                  <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" onClick={() => handleDelete(data?.id)}> <i class="fa fa-trash " aria-hidden="true"></i></span>
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
  </div>
</div>


    </div>
  )
}

export default Hostel