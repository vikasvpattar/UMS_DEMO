import React, { useState, useEffect } from "react";
import { ACADEMICS_ADD_LESSON, ACADEMICS_ADD_SUBJECT, ACADEMICS_ADD_CLASS, ACADEMICS_ADD_SEMESTER, ACADEMICS_ADD_SECTION } from "../../utils/Academics.apiConst";
import axios from 'axios'
import { toast } from 'react-toastify'
import Select from 'react-select';
import { LOCAL_DEPARTMENT, LOCAL_PROGRAM } from "../../utils/LocalStorageConstants";
import Nodata from "../../Components/NoData/Nodata";

function AddSection({ setLoading, collegeId }) {

    const [departmentOpt, setDepartmentOpt] = useState(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)))

    const [programOpt, setProgramOpt] = useState(JSON.parse(localStorage.getItem(LOCAL_PROGRAM)))

    const [addNew, setAddNew] = useState(false);


    useEffect(() => {
        setDepartmentOpt(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)).filter(item => item.college_id == collegeId))
        setProgramOpt(JSON.parse(localStorage.getItem(LOCAL_PROGRAM)))

    }, [localStorage.getItem(LOCAL_DEPARTMENT)])


    const [data, setData] = useState([])

    const [classOpt, setClassOpt] = useState([])

    const [semOpt, setSemOpt] = useState([])

    const [user, setUser] = useState({
        name: "",
        class_id: '',
        semester_id: '',
        department_id: ''
    })

    const [edit, setEdit] = useState(false)

    const clearData = () => {
        setUser(prev => ({
            ...prev,
            name: '',
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //get The Inintila Data
    const getData = async (a, b, c) => {
        setLoading(1)
        const config = {
            method: "get",
            url: `${ACADEMICS_ADD_SECTION}?college_id=${collegeId}&&department_id=${a}&&class_id=${b}&&semester_id=${c}`,
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

    const handleSearch = () => {
        if (!user.department_id || !user.class_id || !user.semester_id) return toast.error("Mandatory Fields are required")
        getData(user.department_id, user.class_id, user.semester_id);
    }

    //Add New Data
    const handleSubmit = async () => {
        if (!user.department_id || !user.class_id || !user.semester_id || !user.name) return toast.error("Mandatory Fields are required")
        setLoading(1)
        const config = {
            method: "post",
            url: ACADEMICS_ADD_SECTION,
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
                handleSearch();
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error('Something went wrong')
            })
    }


    const handleEdit = async () => {
        setLoading(1)
        const config = {
            method: "put",
            url: ACADEMICS_ADD_SECTION + `/${user.id}`,
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
                handleSearch();
                setEdit(false)
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
            url: `${ACADEMICS_ADD_SECTION}/${i?.id}`,
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
                handleSearch();
            })
            .catch(err => {
                setLoading(0)
                toast.error('Some Error Occured')
            })
    }


    //Fucntion to get data of classes
    const getClassData = async () => {
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
                setClassOpt(res.data.data)
                setLoading(0)
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error('Something went wrong')
            })
    }

    //Fucntion to get data of classes
    const getSemData = async () => {
        setLoading(1)
        const config = {
            method: "get",
            url: ACADEMICS_ADD_SEMESTER + `?college_id=${collegeId}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
        }

        await axios(config)
            .then(res => {
                setSemOpt(res.data.data)
                setLoading(0)
            })
            .catch(err => {
                setLoading(0)
                console.log(err);
                toast.error('Something went wrong')
            })
    }




    useEffect(() => {
        getData();
        getClassData();
        getSemData();
    }, [])

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




    return (
        <div><div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Add Section</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <a href="javascript: void(0);">Academics</a>
                                        </li>
                                        <li className="breadcrumb-item active"> Add Section</li>
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
                                                    Department <span style={{ color: "red" }}>*</span>
                                                </label>
                                                {/* <select
                                                    className="form-control"
                                                    name='department_id'
                                                    value={user.department_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Department</option>
                                                    {
                                                        departmentOpt?.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}, {programOpt.find(item => i.program_id == item.id)?.name} </option>
                                                        ))
                                                    }
                                                </select> */}

                                                <Select
                                                    className="form-group"
                                                    name='department_id'
                                                    value={departmentOpt.find(option => option.value === user.department_id)}
                                                    onChange={handleDepartmentChange}
                                                    options={departmentOpt.map((i) => {
                                                      const programName = programOpt.find(item => i.program_id === item.id)?.name || 'Program Not Found';
                                                      console.log(`Department ID: ${i.id}, Program Name: ${programName}`);
                                                      return {
                                                        value: i.id,
                                                        label: `${i.name}, ${programName}`
                                                      };
                                                    })}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom02">
                                                    Class<span style={{ color: "red" }}>*</span>
                                                </label>
                                                {/* <select
                                                    className="form-control"
                                                    name='class_id'
                                                    value={user.class_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Class</option>
                                                    {
                                                        classOpt?.filter(s=>s?.department_id==user?.department_id)?.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))
                                                    }
                                                </select> */}

                                                <Select
                                                    options={classOpt
                                                        ?.filter((s) => s?.department_id == user.department_id)
                                                        ?.map((i) => ({ value: i.id, label: i.name }))}
                                                    value={user.class_id ? { value: user.class_id, label: classOpt?.find((i) => i.id == user.class_id)?.name } : null}
                                                    onChange={(selectedOption) => handleChangeSelect('class_id', selectedOption)}
                                                    placeholder="Select Class"
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom02">
                                                    Semester<span style={{ color: "red" }}>*</span>
                                                </label>
                                                {/* <select
                                                    className="form-control"
                                                    name='semester_id'
                                                    value={user.semester_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Semester</option>
                                                    {
                                                        semOpt?.filter(s => (s.class_id == user.class_id))?.map((i, key) => (
                                                            <option value={i.id} key={key}>{i.name}</option>
                                                        ))
                                                    }
                                                </select> */}

                                                <Select
                                                    className="form-group"
                                                    name='semester_id'
                                                    value={
                                                        user.semester_id
                                                        ? {
                                                          value: user.semester_id,
                                                          label: semOpt
                                                          ?.filter((s) => s.class_id === user.class_id)
                                                          ?.find((i) => i.id === user.semester_id)?.name,
                                                        }
                                                        : null
                                                    }
                                                    onChange={(selectedOption) => setUser((prev) => ({ ...prev, semester_id: selectedOption.value }))}
                                                    options={semOpt?.filter(s => s.class_id === user.class_id)?.map((i) => {
                                                      console.log(`Semester ID: ${i.id}, Semester Name: ${i.name}`);
                                                      return {
                                                        value: i.id,
                                                        label: i.name
                                                      };
                                                    })}
/>

                                            </div>
                                        </div>
                                        {
                                            edit || addNew
                                                ?
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom02">
                                                            Add Section<span style={{ color: "red" }}>*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Enter Section Name"
                                                            value={user.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }

                                    </div>
                                    <div className="row ">
                                        <div className="col-md-12 ml-auto">
                                            {/* <button class="btn btn-nex btn-rounded btn-sm " type="submit" name="add" onclick= "return false"><i class="fa fa-plus" aria-hidden="true" ></i> Add lesson</button>
                              <br><br> */}
                                            {
                                                addNew == false && edit == false ?
                                                    <button
                                                        className="btn btn-nex btn-rounded float-lg-right mx-1 "
                                                        type="submit"
                                                        name="submit"
                                                        onClick={handleSearch}
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
                                            <th>Section</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data?.map((d, key) => {
                                            return (
                                                <tr>
                                                    <td>{key + 1}</td>
                                                    <td>{departmentOpt?.filter(item => d?.department_id == item.id)[0]?.name}</td>
                                                    <td>{classOpt?.filter(item => d?.class_id == item.id)[0]?.name}</td>
                                                    <td>{d.name}</td>
                                                    <td>
                                                        <acronym title="Edit">
                                                            <a href="javascript:void(0)" onClick={() => { setEdit(true); setUser({ ...d }) }}>
                                                                <i className="fa fa-edit " aria-hidden="true" />
                                                            </a>
                                                        </acronym> &nbsp;&nbsp;&nbsp;
                                                        {/* <acronym title="Inactive">
                                                            <a
                                                                href="javascript:void(0)"
                                                                onClick={() => { handleDelete(d) }}
                                                            >
                                                                <i
                                                                    className="fa fa-thumbs-down"
                                                                    aria-hidden="true"
                                                                    style={{ color: "red" }}
                                                                />
                                                            </a>
                                                        </acronym> */}
                                                        <a href="javascript:void(0)"> </a>
                                                    </td>
                                                </tr>

                                            );
                                        })}



                                    </tbody>


                                </table>
                                {
                                    data.length == 0 ? <Nodata /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddSection