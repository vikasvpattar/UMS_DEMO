import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  TRANSPORT_ASSIGN_VEHICLE,
  TRANSPORT_ROUTE,
  TRANSPORT_VEHICLE,
} from "../../../utils/Transport.apiConst";
import Select from "react-select";

function TransportAssignVehicles({ setLoading, collegeId }) {
  const [user, setUser] = useState({
    route_id: "",
    vehicle_id: "",
  });

  const [data, setData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  const [edit, setEdit] = useState(0);
  const [editId, setEditId] = useState();

  useEffect(() => {
    getdata();
  }, []);

  const clearData = () => {
    setUser({
      route_id: "",
      vehicle_id: "",
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setUser((prevValue) => ({
  //     ...prevValue,
  //     [name]: value,
  //   }));
  // };

  const handleEdit = () => {
    if (!user?.vehicle_id) return toast.error("Title is required");
    setLoading(1);
    const config = {
      method: "put",
      url: `${TRANSPORT_ASSIGN_VEHICLE}/${editId}`,
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

  const getdata = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${TRANSPORT_ASSIGN_VEHICLE}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        console.log("data - ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const getdataRouteData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };
    await axios({
      ...config,
      url: `${TRANSPORT_ROUTE}?college_id=${collegeId}`,
    })
      .then((res) => {
        setRouteData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Somethin went wrong");
      });

      const config1 = {
        method: "get",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
      };
      await axios({
        ...config1,
        url: `${TRANSPORT_VEHICLE}?college_id=${collegeId}`,
      })
        .then((res) => {
          setLoading(0);
          setVehicleData(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
          toast.error("Somethin went wrong");
        });
  };

  const handleSubmit = () => {
    // if(!user.vehicle_number) return toast.error('Please Enter Vehicle Number');

    const config = {
      method: "post",
      url: `${TRANSPORT_ASSIGN_VEHICLE}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        college_id: collegeId,
      },
    };

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
      url: `${TRANSPORT_ASSIGN_VEHICLE}/${id}`,
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
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getdataRouteData();
  }, []);

  const routeOptions = routeData?.map((option) => ({
    value: option.id,
    label: option.title,
  })) || [];

  const vehicleOptions = vehicleData?.map((option) => ({
    value: option.id,
    label: option.vehicle_number,
  })) || [];

  const handleChange = (selectedOption, name) => {
    setUser((prevUser) => ({ ...prevUser, [name]: selectedOption.value }));
  };

  return (
    <div className="TransportAssignVehicles">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Vehicle Route</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Transport</a>
                      </li>
                      <li className="breadcrumb-item active">Vehicle Route</li>
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
                              Route<span style={{ color: "red" }}>*</span>
                            </label>
                            {/* <select
                              name="route_id"
                              id="route_id"
                              className="form-control"
                              value={user?.route_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Route</option>
                              {routeData?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.title}
                                </option>
                              ))}
                            </select>{" "} */}

                            <Select
                              name="route_id"
                              id="route_id"
                              value={routeOptions.find((option) => option.value == user.route_id)}
                              onChange={(selectedOption) => handleChange(selectedOption, 'route_id')}
                              options={routeOptions}
                            />

                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">
                              Select Vehicle{" "}
                              <small className="text-danger">*</small>
                            </label>
                            {/* <select
                              name="vehicle_id"
                              id="vehicle_id"
                              className="form-control"
                              value={user?.vehicle_id}
                              onChange={handleChange}
                            >
                              <option value="">Select Vehicle</option>
                              {vehicleData?.map((i, key) => (
                                <option value={i.id} key={key}>
                                  {i.vehicle_number}
                                </option>
                              ))}
                            </select>{" "} */}

                            <Select
                              name="vehicle_id"
                              id="vehicle_id"
                              value={vehicleOptions.find((option) => option.value == user.vehicle_id)}
                              onChange={(selectedOption) => handleChange(selectedOption, 'vehicle_id')}
                              options={vehicleOptions}
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
                          <h4 className="card-title"> List</h4>
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
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Sl. No.</th>
                            <th>Route</th>
                            <th>Vehicle</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{data.routes.title}</td>
                                  <td> {data.vehicle.vehicle_number}</td>

                                  <td>
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      title="Edit"
                                      onClick={() => {
                                        setUser({
                                          route_id: data?.vehicleRoutes.route_id,
                                          vehicle_id: data?.vehicleRoutes.vehicle_id,
                                        });
                                        setEdit(1);
                                        setEditId(data?.vehicleRoutes.id);
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

export default TransportAssignVehicles;