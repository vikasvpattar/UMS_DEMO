import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { INVENTORY_ITEM_STORE } from '../../../utils/Inventory.apiConst'

function ItemStore({setLoading,collegeId}) {
  const [user, setUser] = useState(
    {
      item_store_name : "",
      item_stock_code: "",
      item_store_desc : "",
    }
  )

  const [data, setData] = useState([])


const [edit,setEdit]= useState(0)
const [editId,setEditId]= useState()

const clearData = () => {
  setUser({
    item_store_name : "",
    item_stock_code: "",
    item_store_desc : "",
    
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
    if(!user?.item_store_name) return toast.error("Store Name  is required") 


    setLoading(1)
    const config = {
      method:'put',
      url:`${INVENTORY_ITEM_STORE}/${editId}`,
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
      url:`${INVENTORY_ITEM_STORE}?college_id=${collegeId}`,
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
    if(!user.item_store_name) return toast.error('Please add store name');
    




   
    const config = {
      method: 'post',
      url: `${INVENTORY_ITEM_STORE}`,
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
      url: `${INVENTORY_ITEM_STORE}/${id}`,
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

  useEffect (() => {
    getdata()
  }, [])

  return (
    <div Classname ='Itemstore'>
    <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Item Store</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Inventory</a>
                </li>
                <li className="breadcrumb-item active"> Item Store</li>
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
                      <label>
                        Item Store Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="item_store_name"
                       
                        value={user.item_store_name}
                        onChange={handleChange}
                        placeholder="Enter Item Store Name"
                       
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Item Stock Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="item_stock_code"
                        value={user.item_stock_code}
                        onChange={handleChange}
                      
                        placeholder="Enter Item Stock Code"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        name="item_store_desc"
                        id="description"
                        cols={30}
                        rows={1}
                        onChange={handleChange}
                        value={user?.item_store_desc}
                      />
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 ">
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
                  <h4 className="card-title">Item Suplier Lists</h4>
                </div>
               
              </div>
              <hr />
              <table
                id=""
                className="table table-bordered dt-responsive nowrap table-hover "
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%"
                }}
              >
                <thead>
                  <tr>
                    <th> Sl. No.</th>
                    <th>Item Store Name</th>
                    <th>Item Stock Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                            data && data?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.item_store_name}</td>
                                <td data-toggle="tooltip" title={data.item_store_desc}> {data.item_stock_code}</td>
                             

                                <td><span className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="Edit" 
                                onClick={()=>{
                                  setUser({
                                    item_store_name:data?.item_store_name,
                                    item_stock_code:data?.item_stock_code,
                                    item_store_desc:data?.item_store_desc,

                                   


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
              <br />
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end row */}
    </div>
  </div>
</div>

    </div>
  )
}

export default ItemStore