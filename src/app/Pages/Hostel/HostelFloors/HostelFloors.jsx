import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import { HOSTEL, HOSTEL_FLOORS} from '../../../utils/Hostel.apiConst'
import { EMPLOYEE_ALL2} from "../../../utils/apiConstants";

function HostelFloors({setLoading, collegeId}) {

  const role = sessionStorage.getItem("role");
  const emp_id = sessionStorage.getItem("employee_id");
  
  let auth = sessionStorage.getItem("UMS_auth");

    const [user, setUser] = useState(
        {
          hostelname: "",
          floors: "",
        }
      )
    
    const [data, setData] = useState([])
    const [employee, setEmployee] = useState([]);
    const [edit,setEdit]= useState(0)
    const [editId,setEditId]= useState()
    const [hostelData, setHostelData] = useState([])
    
    const clearData = () => {
      setUser({
        hostelname: "",
        floors: "",
      })
    }
    
    
      const handleChange = (e) => {
        const { name, value } = e.target
    
        setUser(prevValue => ({
          ...prevValue,
          [name]: value
        }));
      }

      const getEmpData = async () => {
        const config = {
          method: "get",
          url: `${EMPLOYEE_ALL2}?employee_id=${emp_id}`,
          headers: {
            Authorization: `Bearer ${auth}`,
            "Content-Type": "application/json",
          },
        };
    
        axios(config)
          .then((res) => {
            console.log('emp data - ', res.data.data);
            setEmployee(res.data.data);
            setLoading(0);
          })
          .catch((err) => {
            setLoading(0);
            toast.error("Something Went Wrong",err);
          });
        
      }

      useEffect(() => {
        getdataHostelData();
        getEmpData();
      }, [])      
      
      const getdataHostelData = async() => {
        setLoading(1)
        const config = {
          method: 'get',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        }
          await axios({...config, url: `${HOSTEL}`,})
          .then(res => {
            setLoading(0)
            console.log("Hostel Data",res.data.data);
            setHostelData(res.data.data)
          })
          .catch(err => {
            setLoading(0)
            toast.error("Somethin went wrong")
          })
      }



      const handleSubmit = () => {
        if(!user?.hostelname || !user?.floors){
            toast.error("Please Enter all the required fields");
            return;
        } 
       
        const config = {
          method: 'post',
          url:`${HOSTEL_FLOORS}`,
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

      
      const handleEdit = () => {
        if(!user?.floors) return toast.error("Floor Number  is required");
        setLoading(1)
        const config = {
          method:'put',
          url:`${HOSTEL_FLOORS}/${editId}`,
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
          url:`${HOSTEL_FLOORS}?college_id=${collegeId}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        }
    
        axios(config)
        .then(res=>{
          setLoading(0)
          setData(res.data.data)
          console.log('floors - ', res.data.data);
          // console.log(setData)
        })
        .catch(err=>{
          setLoading(0)
          toast.error("Something Went Wrong")
        })
        }
        
        
        const handleDelete = (id) => {
          const config = {
            method: 'put',
            url: `${HOSTEL_FLOORS}/${id}`,
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
    
      useEffect(()=>{
        if(user?.hostelname) getdata()
        else setData([])
        },[user?.hostelname])

        const handleEditClick = (floorData) => {
          setUser({
            hostelname: floorData.hostelname,
            floors: floorData.floors,
          });
          setEdit(1);
          setEditId(floorData.id);
        }


      const hostelIdToName = {};
        hostelData.forEach(item => {
        hostelIdToName[item.id] = item.hostel_name;
      });
  

  return (
    <div className='HostelFloors'>

        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                {/* Followup */}
                {/* start page title */}

                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Add Hostel Floors</h4>
                      <h4 className="mb-0 mr-5">{role == "WARDEN" && employee && hostelData.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4>
                      <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Hostel</a>
                      </li>
                      <li className="breadcrumb-item active">Hostel Floors</li>
                    </ol>
                  </div>
                    </div>
                  </div>
                </div>
                <>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Criteria</h4>
                                <br/>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="validationCustom02">
                                          Hostel Name<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                          className="form-control"
                                          name="hostelname"
                                          id="hostel"
                                          value={user.hostelname}
                                          onChange={handleChange}
                                        >
                                        <option value="">Select Hostel</option>
                                        {role == "WARDEN" ? 
                                        hostelData?.filter((s)=> s.id == employee[0]?.hostel_id).map((i, key) => (
                                          <option value={i.id} key={key}>
                                            {i.hostel_name}
                                          </option>
                                        ))
                                        : hostelData?.map((i, key) => (
                                          <option value={i.id} key={key}>
                                            {i.hostel_name}
                                          </option>
                                        ))}
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label htmlFor="">
                                        Number of Floors
                                        </label>
                                        <input
                                           type="int"
                                           className="form-control"
                                           placeholder="Enter No Of Floors"
                                           name="floors"
                                           id="floor"
                                           value={user.floors}
                                           required=""
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
                    </div>
                </div>

                {/* container-fluid */}
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">

                        <div className="row">
                          <div className="col-md-6">
                            <h4 className="card-title">Hostel Floors List</h4>
                          </div>
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
                              <th>Hostel Name</th>
                              <th>Number of Floors</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          {role == "WARDEN" && employee[0]?.hostel_id ?(<tbody>
                            {
                              data && data?.filter((s)=> s.hostelfloors.hostelname == employee[0]?.hostel_id).map((data, key) => {
                                return <tr key={key}>
                                  <td>{key + 1}</td>
                                  {/* <td>{item?.hostelname}</td> */}
                                  {/* <td> {data.hostelfloors.hostelname}</td> */}
                                  <td>{hostelIdToName[data.hostelfloors.hostelname]}</td>
                                  {/* <td>{item?.floors}</td> */}
                                  <td> {data.hostelfloors.floors}</td>

                                  <td>
                                    {/* <span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit"  onClick={()=>{
                                      setUser({
                                      hostelname:data?.hostel.id,
                                      floors:data?.hostelfloors.floors,
                                      })
                                      setEdit(1)
                                      setEditId(data?.hostelfloors?.id)
                                      }}> <i class="fa fa-edit " aria-hidden="true"></i>
                                    </span> */}
                                    <span
                                      className='badge badge-light text-dark mr-3'
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => handleEditClick(data.hostelfloors)}
                                    >
                                    <i className="fa fa-edit" aria-hidden="true"></i>Edit
                                    </span>
                                    {/* <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" 
                                      onClick={() => handleDelete(data?.hostelfloors?.id)}><i class="fa fa-trash " aria-hidden="true"></i></span> */}
                                  </td>
                                </tr>
                              })
                            }                         
                         </tbody>) :
                          (<tbody>
                            {
                              data && data?.map((data, key) => {
                                return <tr key={key}>
                                  <td>{key + 1}</td>
                                  {/* <td>{item?.hostelname}</td> */}
                                  {/* <td> {data.hostelfloors.hostelname}</td> */}
                                  <td>{hostelIdToName[data.hostelfloors.hostelname]}</td>
                                  {/* <td>{item?.floors}</td> */}
                                  <td> {data.hostelfloors.floors}</td>

                                  <td>
                                    {/* <span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit"  onClick={()=>{
                                      setUser({
                                      hostelname:data?.hostel.id,
                                      floors:data?.hostelfloors.floors,
                                      })
                                      setEdit(1)
                                      setEditId(data?.hostelfloors?.id)
                                      }}> <i class="fa fa-edit " aria-hidden="true"></i>
                                    </span> */}
                                    <span
                                      className='badge badge-light text-dark mr-3'
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => handleEditClick(data.hostelfloors)}
                                    >
                                    <i className="fa fa-edit" aria-hidden="true"></i>Edit
                                    </span>
                                    {/* <span className='badge badge-light text-danger mr-3' data-toggle="tooltip" title="Delete" 
                                      onClick={() => handleDelete(data?.hostelfloors?.id)}><i class="fa fa-trash " aria-hidden="true"></i></span> */}
                                  </td>
                                </tr>
                              })
                            }                         
                         </tbody>)}
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

export default HostelFloors
