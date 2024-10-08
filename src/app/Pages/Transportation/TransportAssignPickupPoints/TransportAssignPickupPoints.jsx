import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import {
  GET_ASSIGNED_PICKUPPOINTS,
  PICKUP_POINTS,
  UPDATE_ASSIGNED_PICKUPPOINTS,
  TRANSPORT_ROUTE,
  TRANSPORT_ASSIGN_VEHICLE
} from "../../../utils/Transport.apiConst";
import Swal from "sweetalert2";
import TransportPickUpModal from "../../../modals/Accounts/FeeCollection/TransportPickUpModal";
import EditTransportPickupModal from "../../../modals/Accounts/FeeCollection/EditTransportPickupModal";

function TransportAssignPickupPoints({ setLoading, collegeId }) {
  const [count, setCount] = useState([0]);

  const [data, setData] = useState();

  const [editData, seteditData] = useState([]);

  const [routeData, setRouteData] = useState([]);

  const [pickuppointData, setPickuppointData] = useState([]);

  const [pickuppointData1, setPickuppointData1] = useState([]);

  const [vehicleData, setVehicleData] = useState([]);

  const [vehiclesNumber, setVehiclesNumber] = useState([]);

  const [tableRows, setTableRows] = useState(<></>);

  const getVehicleData = async () => {
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
        setVehicleData(res.data.data);
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
        setLoading(0);
        setRouteData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something went wrong");
      });

    await axios({
      ...config,
      url: `${PICKUP_POINTS}?college_id=${collegeId}`,
    })
      .then((res) => {
        setLoading(0);
        setPickuppointData(res.data.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

      await axios({
        ...config,
        url:`${GET_ASSIGNED_PICKUPPOINTS}`
      }).then((res)=>{
        setLoading(0);
        setPickuppointData1(res.data.data)
      }).catch((err)=>{
        setLoading(0);
        console.log(err)
      })
  };

  const deletePickup = async(item)=>{
    setLoading(1);
    const config = {
      method: "put",
      url:`${UPDATE_ASSIGNED_PICKUPPOINTS}/${item?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data:{
        status:"INACTIVE"
      },
    };

    await axios(config).then((res)=>{
          toast.success("Successfully Deleted PickUp Point Details")
          setLoading(0);
          getdataRouteData()
    }).catch((err)=>{
          setLoading(0);
      console.log(err)
      toast.error("Something went Wrong")
    })
  }

  const tableRef = useRef();
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Pickup Point Details",
    sheet: "Users",
  });

  useEffect(() => {
    getdataRouteData();
    getVehicleData();
  }, []);

  useEffect(()=> {
    let temp = [];
    vehicleData?.map((value, index) => {
      let obj = {};
      obj['route_title'] = value.routes.title;
      obj['vehicle_number'] = value.vehicle.vehicle_number;
      temp.push(obj);
    })
    setVehiclesNumber(temp);
  },[vehicleData]);

  useEffect(()=> {
    console.log("data - ",pickuppointData1);
    const sortedData = pickuppointData1.slice().sort((a, b) => {
      const titleA = routeData?.find((s) => s.id === a?.route)?.title;
      const titleB = routeData?.find((s) => s.id === b?.route)?.title;
      return titleA.localeCompare(titleB);
    });
    const tableRows = sortedData.map((item, key) => (
      <tr key={key}>
        <td>{key + 1}</td>
        <td>{routeData?.find((s) => s.id === item?.route)?.title}</td>
        <td>{pickuppointData?.find((s)=>s.id == item?.pickuppointname)?.name}</td>
        <td>{vehiclesNumber?.find((s) => s.route_title === routeData?.find((s) => s.id === item?.route)?.title)?.vehicle_number}</td>
        <td>{item?.pickup_time}</td>
        <td>{item?.drop_time !== "00:00:00"?item?.drop_time : "-"}</td>
        <td>{item?.distance}</td>
        <td>{item?.fees?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}</td>
        <td className="">
          <a 
          data-toggle="modal"
          data-target="#pickUp"
          onClick={()=>{
            seteditData(item)
          }}
          title="Edit" style={{cursor:'pointer'}}
          className="badge badge-light"
          >
              <i
                className="fa fa-edit"
                aria-hidden="true"
              />
              
              </a>
              <a className="badge badge-light text-danger ml-3" data-toggle="tooltip" title="Delete" style={{cursor:'pointer'}}>
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={()=>{
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "Delete this Pickup Point",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes Delete this Pick Up Point"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setData(item)
                      deletePickup(item)
                    }
                  })
                }}
              />
              </a>
        </td>
      </tr>
    ));
    setTableRows(tableRows);
  }, [pickuppointData1, vehicleData, pickuppointData]);

  return (
    <div>
      <TransportPickUpModal
      setLoading={setLoading}
      routeData={routeData}
      getdataRouteData={getdataRouteData}
      pickuppointData={pickuppointData}
      />
      <EditTransportPickupModal
      data={editData}
      getdataRouteData={getdataRouteData}
      routeData={routeData}
      pickuppointData={pickuppointData}
      setLoading={setLoading}
      />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Assign Pickup Points</h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                        <h2 className="card-title">Pick Up Points List</h2>
                        </div>
                       <div className="col-md-6">
                          <button
                          className="btn btn-nex btn-small btn-rounded px-3 float-right mx-3"
                                        type="submit"
                                        name="submit"
                                        data-toggle="modal"
                            data-target="#ModalPickup"
                          >
                          + Add
                          </button>
                          <button
                            className="btn float-right btn-nex rounded-pill"
                            onClick={onDownload}
                          >
                            EXCEL
                          </button>
                         
                        
                       </div>
                      </div>
                      <br />

                  <table className="table table-bordered table-hover"  ref={tableRef}>
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Route</th>
                      <th>Pickup Point Name</th>
                      <th>Vehicle Number</th>
                      <th>Pick Up Time</th>
                      <th>Drop Time</th>
                      <th>Distance</th>
                      <th>Fees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody>
                  {/* {pickuppointData1 && pickuppointData1?.map((item,key)=>{
                    return(
                      <tr>
                        <td>{key+1}</td>
                        <td>{routeData?.find((s)=>s.id == item?.route)?.title}</td>
                        <td>{pickuppointData?.find((s)=>s.id == item?.pickuppointname)?.name}</td>
                        <td>{vehiclesNumber?.find((s)=>s.route_title == routeData?.find((s)=>s.id == item?.route)?.title)?.vehicle_number}</td>
                        <td>{item?.pickup_time}</td>
                        <td>{item?.drop_time}</td>
                        <td>{item?.distance}</td>
                        <td>{item?.fees?.toLocaleString('en-IN',{style: 'currency',currency: 'INR',minimumFractionDigits: 0})}</td>
                        <td className="">
                                    <a 
                                    data-toggle="modal"
                                    data-target="#pickUp"
                                    onClick={()=>{
                                      seteditData(item)
                                    }}
                                    title="Edit" style={{cursor:'pointer'}}
                                    className="badge badge-light"
                                    >
                                        <i
                                          className="fa fa-edit"
                                          aria-hidden="true"
                                        />
                                        
                                        </a>
                                        <a className="badge badge-light text-danger ml-3" data-toggle="tooltip" title="Delete" style={{cursor:'pointer'}}>
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                          onClick={()=>{
                                            Swal.fire({
                                              title: 'Are you sure?',
                                              text: "Delete this Pickup Point",
                                              icon: 'warning',
                                              showCancelButton: true,
                                              confirmButtonColor: '#3085d6',
                                              cancelButtonColor: '#d33',
                                              confirmButtonText: "Yes Delete this Pick Up Point"
                                            }).then((result) => {
                                              if (result.isConfirmed) {
                                                setData(item)
                                                deletePickup(item)
                                              }
                                            })
                                          }}
                                        />
                                        </a>
                                  </td>
                      </tr>
                    )
                  })} */}
                  {tableRows}
                 </tbody>
                </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default TransportAssignPickupPoints;
