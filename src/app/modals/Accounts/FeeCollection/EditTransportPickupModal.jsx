import React from 'react';
import { useState } from 'react';
import { toast } from "react-toastify";
import { UPDATE_ASSIGNED_PICKUPPOINTS } from '../../../utils/Transport.apiConst';
import axios from 'axios';

const EditTransportPickupModal = ({data,pickuppointData,routeData,setLoading,getdataRouteData}) => {

    const [info, setInfo] = useState({
        route: data?.route,
        pickuppointname: data?.pickuppointname,
        pickup_time: data?.pickup_time,
        drop_time: data?.drop_time,
        distance: data?.distance,
        fees: data?.fees,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setInfo((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
        data.distance="";
      };

      const clearData = () =>{
        setInfo({
            route: "",
            pickuppointname: "",
            pickup_time: "",
            drop_time: "",
            distance: "",
            fees: "",
        })

        data.route = ""
        data.pickuppointname = ""
        data.pickup_time = ""
        data.drop_time = ""
        data.distance = ""
        data.fees = ""
      }

    const handlesubmit = async(e)=>{
        e.preventDefault()
        setLoading(1);
        const config = {
            method: "put",
            url:`${UPDATE_ASSIGNED_PICKUPPOINTS}/${data?.id}`,
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            data:info
          };

          await axios(config).then((res)=>{
            setLoading(0);
            clearData()
            getdataRouteData()
            toast.success("Successsfully Updated Details")
          }).catch((err)=>{
            setLoading(0);
            console.log(err);
          })
    }

    return (
        <div className="ModalPickup">
      <div
        className="modal fade"
        id="pickUp"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addfee"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addfee1">
                Transport Fees
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <h2 className="card-title">Add Criteria</h2>
                      </div>
                      <br />
                      <form>
                        <div className="row">
                          <div className="col-3">
                            <div className="form-group">
                              <label htmlFor="validationCustom02">
                                Route<span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="route"
                                className="form-control"
                                value={info?.route ? info?.route : data?.route}
                                onChange={handleChange}
                              >
                                <option value="">Select Route</option>
                                {routeData?.map((i, key) => (
                                  <option value={i.id} key={key}>
                                    {i.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                              <div className="row">
                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="validationCustom02">
                                      Select Pickup Points
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                      type="text"
                                      name="pickuppointname"
                                      id="pickuppointname"
                                      className="form-control"
                                      value={info?.pickuppointname ? info?.pickuppointname : data?.pickuppointname}
                                      onChange={(e) => handleChange(e)}
                                    >
                                      <option value="">
                                        Select Pickup Point
                                      </option>{" "}
                                      {pickuppointData?.map((i, key) => (
                                        <option value={i.id} key={key}>
                                          {i.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="validationCustom02">
                                      {" "}
                                      Pickup time
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                      type="time"
                                      name="pickup_time"
                                      className="form-control"
                                      value={info?.pickup_time ? info?.pickup_time : data?.pickup_time}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </div>
                                </div>

                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor="validationCustom02">
                                      {" "}
                                      Drop Time
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                      type="time"
                                      className="form-control"
                                      name="drop_time"
                                      value={info?.drop_time ? info?.drop_time : data?.drop_time}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </div>
                                </div>

                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor=""> Distance </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Distance"
                                      name="distance"
                                      value={info?.distance ? info?.distance : data?.distance}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </div>
                                </div>

                                <div className="col-2">
                                  <div className="form-group">
                                    <label htmlFor=""> Monthly Fees </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Fees Amount"
                                      name="fees"
                                      value={info?.fees ? info?.fees : data?.fees}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </div>
                                </div>
                              </div>

                        <div className="row float-right ">
                          <button
                            className="btn btn-success mt-4"
                            type="button"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => handlesubmit(e)}
                          >
                            {" "}
                            Submit{" "}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default EditTransportPickupModal;
