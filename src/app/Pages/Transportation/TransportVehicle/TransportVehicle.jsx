import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TRANSPORT_VEHICLE } from '../../../utils/Transport.apiConst'

function TransportVehicle({setLoading, collegeId}) {
  const [user, setUser] = useState(
    {
      vehicle_number : "",
      vehicle_model: "",
      year_made : "",
      driver_name: "",
      driver_license : "",
      driver_contact: "",
      note : "",
      
    }
  )

  const [data, setData] = useState([])


const [edit,setEdit]= useState(0)
const [editId,setEditId]= useState()

const clearData = () => {
  setUser({
    vehicle_number : "",
      vehicle_model: "",
      year_made : "",
      driver_name: "",
      driver_license : "",
      driver_contact: "",
      note : "",
      
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
    if(!user?.vehicle_number) return toast.error("Title is required");
    setLoading(1)
    const config = {
      method:'put',
      url:`${TRANSPORT_VEHICLE}/${editId}`,
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
      url:`${TRANSPORT_VEHICLE}?college_id=${collegeId}`,
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
    if(!user.vehicle_number) return toast.error('Please Enter Vehicle Number');
    




   
    const config = {
      method: 'post',
      url: `${TRANSPORT_VEHICLE}`,
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
      url: `${TRANSPORT_VEHICLE}/${id}`,
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
    <div className='TransportVehicle'>
      <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* Followup */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Vehicle</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Transport</a>
                </li>
                <li className="breadcrumb-item active">Vehicle</li>
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
                  Vehicle Number<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Vehicle Number"
                  name="vehicle_number"
                  id="vehicle_number"
                onChange={handleChange}
                  required=""
                  value={user.vehicle_number}

                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Vehicle Model</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Vehicle Model"
                  name="vehicle_model"
                 onChange={handleChange}
                  id="vehicle_model"
                  value={user.vehicle_model}

                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Year Made</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Bus Year Made"
                  name="year_made"
                  onChange={handleChange}
                  id="year_made"
                  value={user.year_made}

                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Driver Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Driver Name"
                  name="driver_name"
                 onChange={handleChange}
                  id="driver_name"
                  value={user.driver_name}

                />
              </div>
            </div>{" "}
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Driver License</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Driver License Number"
                  name="driver_license"
                  onChange={handleChange}
                  value={user.driver_license}

                  id="license"
                />
              </div>
            </div>{" "}
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Driver Contact</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Driver  Contact No"
                  name="driver_contact"
                onChange={handleChange}
                  id="driver_contact"
                  value={user.driver_contact}

                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="validationCustom02">Note</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description No"
                  name="note"
                  value={user.note}

                onChange={handleChange}
                  id="note"
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
              <h4 className="card-title">Room Type List</h4>
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
                <th>Vehicle Number</th>
                <th>Vehicle Model</th>
                <th>Year Made</th>
                <th>Driver Name</th>
                <th>Driver License</th>
                <th>Driver Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            
            {
                            data && data?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.vehicle_number}</td>
                                <td> {data.vehicle_model}</td>
                                <td> {data.year_made}</td>                                
                               
                                <td> {data.driver_name}</td>
                                <td> {data.driver_license}</td>
                                
                                <td> {data.driver_contact}</td>


                             

                                <td><span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit" 
                                onClick={()=>{
                                  setUser({
                                    vehicle_number:data?.vehicle_number,
                                    year_made:data?.year_made,
                                    driver_name:data?.driver_name,
                                    driver_license:data?.driver_license,
                                    driver_contact:data?.driver_contact,
                                    note:data?.note,


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
  {/* End Page-content */}
 
</>

    </div>
  </div>
</div>

    </div>
  )
}

export default TransportVehicle