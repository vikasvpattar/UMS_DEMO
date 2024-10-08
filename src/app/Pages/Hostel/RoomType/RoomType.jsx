import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HOSTEL, HOSTEL_TYPE } from "../../../utils/Hostel.apiConst";
import { EMPLOYEE_ALL2} from "../../../utils/apiConstants";

function RoomType({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    room_type: "",
    // cost:"",
    with_food: "",
    without_food: "",
    room_desc: "",
    hostel_id: "",
  });
  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(0);

  const [editId, setEditId] = useState();

  const [employee, setEmployee] = useState([]);

  const [hostelData, setHostelData] = useState([]);

  const clearData = () => {
    setUser({
      room_type: "",
      //cost:"",
      with_food: "",
      without_food: "",
      room_desc: "",
    });
  };

  const role = sessionStorage.getItem("role");
  const emp_id = sessionStorage.getItem("employee_id");
  
  let auth = sessionStorage.getItem("UMS_auth");
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

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${HOSTEL_TYPE}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        console.log('typedata - ', res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });

      await axios({ ...config, url: `${HOSTEL}` })
      .then((res) => {
        // setLoading(0);
        setHostelData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong",err);
      });
  };

  const handleEdit = () => {
    if (!user?.hostel_id) return toast.error("Please select the Hostel");
    if (!user?.room_type) return toast.error("name is required");
    setLoading(1);
    const config = {
      method: "put",
      url: `${HOSTEL_TYPE}/${editId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        getdata();
        clearData();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!user.hostel_id) return toast.error("Please Select Hostel");
    if (!user.room_type) return toast.error("Please Add Room Type");

    const config = {
      method: "post",
      url: `${HOSTEL_TYPE}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

    console.log('data to backend - ', data);
    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        getdata();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleDelete = (id) => {
    const config = {
      method: "put",
      url: `${HOSTEL_TYPE}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        getdata();
        toast.success("Success");
      })
      .catch((err) => {
        setLoading(0);
        getdata();
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getEmpData();
    getdata();
  }, []);

  return (
    <div ClassName="RoomType">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Room Type</h4>
                  <h4 className="mb-0">{role == "WARDEN" && employee && hostelData.find((s)=> s.id == employee[0]?.hostel_id)?.hostel_name}</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Hostel</a>
                      </li>
                      <li className="breadcrumb-item active">Room Type</li>
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
                      <h2 className="card-title">Add Criteria</h2>
                      <br />
                      <div className="row">
                      <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Hostel<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="hostel_id"
                              id="hostel_id"
                              value={user?.hostel_id}
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
                            <label htmlFor="validationCustom02">
                              Room type <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Room Type"
                              name="room_type"
                              id="room"
                              value={user?.room_type}
                              required=""
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="">
                    Cost 
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Cost"
                    name="cost"
                    id="cost"
                    value={user?.cost}
                    required=""
                    onChange={handleChange}
                  />
                </div>
              </div> */}

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">With Food</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Amount"
                              name="with_food"
                              id="withfood"
                              value={user?.with_food}
                              required=""
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Without Food</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Amount"
                              name="without_food"
                              id="withoutfood"
                              value={user?.without_food}
                              required=""
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Description"
                              name="room_desc"
                              value={user?.room_desc}
                              id="description"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row float-right ">
                        {edit ? (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleEdit(e)}
                          >
                            Save Changes
                          </button>
                        ) : (
                          <button
                            className="btn btn-nex btn-rounded float-right  "
                            type="submit"
                            name="submit"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Save
                          </button>
                        )}
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
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Room Type</th>
                            {/* <th>Cost</th> */}
                            <th>With Food</th>
                            <th>Without Food</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          {role == "WARDEN" ? data &&
                            data?.filter((s)=> s.hostel_id == employee[0]?.hostel_id).map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data.room_type}</td>
                                  {/* <td>{data.cost}</td> */}
                                  <td>{data.with_food}</td>
                                  <td>{data.without_food}</td>
                                  <td>{data.room_desc}</td>

                                  <td>
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => {
                                        setUser({
                                          room_type: data?.room_type,
                                          cost: data?.cost,
                                          with_food: data?.with_food,
                                          without_food: data?.without_food,
                                          room_desc: data?.room_desc,
                                        });
                                        setEdit(1);
                                        setEditId(data?.id);
                                      }}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-edit "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <span
                                      className="badge badge-light text-danger mr-3"
                                      data-toggle="tooltip"
                                      title="Delete"
                                      onClick={() => handleDelete(data?.id)}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-trash "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            }) : data &&
                            data?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data.room_type}</td>
                                  {/* <td>{data.cost}</td> */}
                                  <td>{data.with_food}</td>
                                  <td>{data.without_food}</td>
                                  <td>{data.room_desc}</td>

                                  <td>
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => {
                                        setUser({
                                          room_type: data?.room_type,
                                          cost: data?.cost,
                                          with_food: data?.with_food,
                                          without_food: data?.without_food,
                                          room_desc: data?.room_desc,
                                          hostel_id: data?.hostel_id,
                                        });
                                        setEdit(1);
                                        setEditId(data?.id);
                                      }}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-edit "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <span
                                      className="badge badge-light text-danger mr-3"
                                      data-toggle="tooltip"
                                      title="Delete"
                                      onClick={() => handleDelete(data?.id)}
                                    >
                                      {" "}
                                      <i
                                        class="fa fa-trash "
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
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
  );
}

export default RoomType;
