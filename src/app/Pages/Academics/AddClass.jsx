import React, { useState, useEffect } from "react";
import { ACADEMICS_ADD_LESSON, ACADEMICS_ADD_SUBJECT, ACADEMICS_ADD_CLASS } from "../../utils/Academics.apiConst";
import axios from 'axios'
import Select from 'react-select';
import { toast } from 'react-toastify'
import { LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";

function AddClass({ setLoading, collegeId }) {


  const [data, setData] = useState([])

  const departmentOpt = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))?.filter(s=>s?.college_id==collegeId)

  console.log(departmentOpt);

  const [user, setUser] = useState({
    name: "",
    department_id: "",
  })

  const clearData = () => {
    setUser({
      name: '',
      department_id:''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getData = async () => {
    setLoading(1)
    const config = {
      method: "get",
      url: ACADEMICS_ADD_CLASS + `?college_id=${collegeId}`,
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
    setLoading(1)
    const config = {
      method: "post",
      url: ACADEMICS_ADD_CLASS,
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

  const [edit, setEdit] = useState(false)

  const handleEdit = async () => {
    setLoading(1)
    const config = {
      method: "put",
      url: ACADEMICS_ADD_CLASS + `/${user.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user
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


  const handleDelete = async (i) => {
    setLoading(1)
    const config = {
      method: "put",
      url: `${ACADEMICS_ADD_CLASS}/${i?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE"
      },
    }
    axios(config)
      .then(res => {
        setLoading(0)
        toast.success('Data Deleted')
        getData();
      })
      .catch(err => {
        setLoading(0)
        toast.error('Some Error Occured')
      })
  }


  useEffect(() => {
    getData();
  }, [])

  const handleDepartmentChange = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      department_id: selectedOption?.value || null,
    }));
  };



  return (
    <div><div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Add Class</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Academics</a>
                    </li>
                    <li className="breadcrumb-item active"> Add Class</li>
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
                  <div className="row">
                    {" "}
                    <div className="col-sm-6">
                      <h2 className="card-title">Add Criteria</h2>
                      <br />
                    </div>
                    <div className="col-sm-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="validationCustom02">
                          Department<span style={{ color: "red" }}>*</span>
                        </label>
                        {/* <select 
                        name="department_id" 
                        onChange={handleChange}
                        value={user?.department_id}
                        className="form-control"
                        id=""
                        >
                          <option value="">Select Department</option>
                          {
                            departmentOpt?.map((i,key)=>(
                              <option key={key} value={i?.id}>{i?.name}</option>
                            ))
                          }
                        </select> */}

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
                          Add Class<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter Class Name"
                          value={user.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 ml-auto">
                      {
                        edit == false ? <button
                          className="btn btn-nex btn-rounded float-right "
                          type="submit"
                          name="submit"
                          onClick={handleSubmit}
                        >
                          <i className="fa fa-save" aria-hidden="true" /> Save
                        </button> :
                          <button
                            className="btn btn-nex btn-rounded float-right "
                            type="submit"
                            name="Update"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Update
                          </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* end card */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    {" "}
                    <h4 className="card-title"> Class Lists</h4>
                  </div>
                </div>
                <hr />
                <table
                  id="datatable"
                  className="table table-bordered dt-responsive nowrap table-hover "
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th> Sl. No.</th>
                      <th>Department</th>
                      <th>Class</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((d, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{departmentOpt?.find(s=>s?.id==d?.department_id)?.name}</td>
                          <td>{d?.name}</td>
                          <td>
                            <acronym title="Edit">
                              <a href="javascript:void(0)" onClick={() => { setEdit(true); setUser({ ...d }) }}>
                                <i className="fa fa-edit " aria-hidden="true" />
                              </a>
                            </acronym> &nbsp;&nbsp;&nbsp;
                            <acronym title="Inactive">
                              <a
                                href="javascript:void(0)"
                                onClick={() => handleDelete(d)}
                              >
                                <i
                                  className="fa fa-thumbs-down"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                />
                              </a>
                            </acronym>
                            <a href="javascript:void(0)"> </a>
                          </td>
                        </tr>

                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddClass