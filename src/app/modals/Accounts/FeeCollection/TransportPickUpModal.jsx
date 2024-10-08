import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ASSIGN_PICKUPPOINTS } from "../../../utils/Transport.apiConst";

const TransportPickUpModal = ({setLoading,routeData,pickuppointData,getdataRouteData}) => {

   const [count, setCount] = useState([0]);

  const [data, setData] = useState([]);

  let obj = {};

  const [flag, setFlag] = useState(false);

  const [flag1, setFlag1] = useState(false);

  const [info, setInfo] = useState({
    route: "",
    pickuppointname: "",
    ptime: "",
    dtime: "",
    distance: "",
    fees: "",
  });

  const clearData = () => {
    setInfo({
      route: "",
      pickuppointname: "",
      ptime: "",
      dtime: "",
      distance: "",
      fees: "",
      status: "ACTIVE",
    });

    obj = {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let Array1 = [];
    if (JSON.parse(sessionStorage.getItem("pickpoint"))?.length > 0) {
      Array1 = JSON.parse(sessionStorage.getItem("pickpoint"));
    }
    let x = [];

    if(Array1.length > 0){
    x = Array1.map((item) => Object.values(item)[0]);
    }

    if (Object.keys(obj).length > 0) {
      const value = Object.values(obj)[0];
      x.push(value);
    }

    for (let i of x) {
      i.route = info?.route;
    }
    console.log(x)

    if(x?.length == 0)
    {
      return toast.error("Please enter Mandatory Details")
    }

    for(let i of x)
    {
      if(!i.fees || !i.route || !i.pickuppointname)
      {
        return toast.error("Please Enter Mandatory Details")
      }
    }
    
    setLoading(1);
    const config = {
      method: "post",
      url: ASSIGN_PICKUPPOINTS,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: x,
    };

    await axios(config)
      .then(async (res) => {
        setLoading(0);
        setFlag((flag) => !flag);
        sessionStorage.removeItem("pickpoint");
        getdataRouteData()
        setFlag1(true)
        setData(res.data);
        delete obj[0];
        toast.success(res.data.message);
        setLoading(0);
        clearData();
        while (count.length > 1) {
          count.pop();
        }
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleChange1 = (e, key) => {
    const { name, value } = e.target;
    if (!obj[key]) {
      obj[key] = {
        pickuppointname: "",
        pickup_time: "",
        drop_time: "",
        distance: "",
        fees: "",
      };
    }
    obj[key][name] = value;
  };

  return (
    <div className="ModalPickup">
      <div
        className="modal fade"
        id="ModalPickup"
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
                                value={info?.route}
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

                        {count &&
                          count?.map((item, key) => {
                            return (
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
                                      className="form-control"
                                      value={obj[key]?.pickuppointname}
                                      onChange={(e) => handleChange1(e, key)}
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
                                      value={obj[key]?.pickup_time}
                                      onChange={(e) => handleChange1(e, key)}
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
                                      value={obj[key]?.drop_time}
                                      onChange={(e) => handleChange1(e, key)}
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
                                      value={obj[key]?.distance}
                                      onChange={(e) => handleChange1(e, key)}
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
                                      value={obj[key]?.fees}
                                      onChange={(e) => handleChange1(e, key)}
                                    />
                                  </div>
                                </div>

                                <div className="col-2 mt-4">
                                  {count.length == key + 1 ? (
                                    <button
                                      className="btn btn-primary btn-small btn-rounded px-3"
                                      type="submit"
                                      name="submit"
                                      onClick={() => {
                                        count.push(1);
                                        let obj1 = JSON.parse(
                                          sessionStorage.getItem("pickpoint")
                                        );
                                        if (
                                          !obj1 &&
                                          Object.keys(obj).length > 0
                                        ) {
                                          let arr = [];
                                          arr.push(obj);
                                          sessionStorage.setItem(
                                            "pickpoint",
                                            JSON.stringify(arr)
                                          );
                                        } else if (
                                          Object.keys(obj).length > 0
                                        ) {
                                          obj1 = [...obj1, obj];
                                          obj1 = JSON.stringify(obj1);
                                          sessionStorage.setItem(
                                            "pickpoint",
                                            obj1
                                          );
                                        }
                                        setFlag((flag) => !flag);
                                      }}
                                    >
                                      <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      />{" "}
                                      Add
                                    </button>
                                  ) : null}
                                  {key >= 1 && count.length == key + 1 ? (
                                    <>
                                      <button
                                        className="btn btn-danger btn-rounded px-3 ml-3"
                                        type="submit"
                                        name="submit"
                                        onClick={() => {
                                          count.pop();
                                          delete obj[key];
                                          let arr1 = JSON.parse(
                                            sessionStorage.getItem("pickpoint")
                                          );
                                          arr1?.splice(key, key);
                                          arr1 = JSON.stringify(arr1);
                                          sessionStorage.setItem(
                                            "pickpoint",
                                            arr1
                                          );
                                          setFlag((flag) => !flag);
                                        }}
                                      >
                                        <i
                                          className="fa fa-minus"
                                          aria-hidden="true"
                                        />{" "}
                                        Cancel
                                      </button>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}

                        <div className="row float-right ">
                          <button
                            className="btn btn-success mt-4"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={(e) => handleSubmit(e)}
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
};

export default TransportPickUpModal;
