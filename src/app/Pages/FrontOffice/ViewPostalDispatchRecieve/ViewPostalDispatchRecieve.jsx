import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Nodata from "../../../Components/NoData/Nodata";
import { FRONT_OFFICE_POSTAL } from '../../../utils/FrontOffice.apiConst';

function ViewPostalDispatchRecieve( { setLoading } ) {


    const [infoData, setInfoData] = useState([]);

    // let date = new Date().toISOString().split("T")[0];

    const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
    const [postalType, setPostalType] = useState("ALL");

    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({}); 
     

    const getData = async () => {
        setLoading(1);
        const config = {
          method: "get",
          url: `${FRONT_OFFICE_POSTAL}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
          params: {
            fromDate,
            toDate,
            type: postalType === "ALL" ? undefined : postalType, // Include type only if not ALL
          },
        };
    
        try {
          const res = await axios(config);
          setLoading(0);
          setInfoData(res.data.data);
        } catch (error) {
          setLoading(0);
          toast.error(error.response.data.message);
        }
      };

        useEffect(() => {
        getData();
        }, []);
    
    //   useEffect(() => {
    //     getData();
    //   }, [fromDate, toDate, postalType]);

    //Delete a Data
    const handleDelete = async (i) => {
    setLoading(1);

    const config = {
      method: "put",
      url: `${FRONT_OFFICE_POSTAL}/${i.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "INACTIVE",
      },
    };

    await axios(config)
      .then((res) => {
        getData();
        setLoading(0);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(0);
      });
  };

  const handleEdit = (data) => {
    setEditMode(true);
    setEditedData(data);
  };

  const handleSave = async () => {
    setLoading(1);

    const config = {
      method: "put",
      url: `${FRONT_OFFICE_POSTAL}/${editedData.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: editedData,
    };

    try {
      const res = await axios(config);
      getData();
      setEditMode(false);
      setLoading(0);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(0);
    }
  };
      
  return (
    
    <div>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">

                  <h4 className="mb-0">View Postal Dispatch and Recieve List </h4>

                </div>
              </div>
            </div>    

            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select Criteria</h2>
                    <br />
                    <div className="row">

                    <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">                            
                            Select Postal
                          </label>
                          <select
                            type="text"
                            className="form-control"
                            name="postal"
                            value={postalType}
                            onChange={(e) => setPostalType(e.target.value)}
                          >
                            <option value="ALL"> ALL </option>
                            <option value="DISPATCH"> DISPATCH </option>
                            <option value="RECIEVE"> RECIEVE </option>
                          </select>  
                        </div>
                      </div>
                    
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            {" "}
                            From Date{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="fromDate"
                            // value={fromDate ? fromDate : date}
                            value={fromDate ? fromDate : new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              setFromDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            {" "}
                            To Date{" "}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Purpose of Visiting"
                            name="toDate"
                            // value={toDate ? toDate : date}
                            value={toDate ? toDate : new Date().toISOString().split("T")[0]}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right">
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        onClick={getData}
                      >
                        <i className="fa fa-search" aria-hidden="true" /> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
            {infoData.length >= 0 && (
            <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">Postal Dispatch List</h4>
                    </div>
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
                        <th>Subject</th>
                        <th>From</th>
                        <th>Reference No</th>
                        <th>To </th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody className="">
                      {infoData && infoData
                      .filter((data) => {
                        const dataDate = new Date(data.date).getTime();
                        const from = fromDate
                          ? new Date(fromDate).getTime()
                          : 0;
                        const to = toDate
                          ? new Date(toDate).getTime()
                          : Infinity;
                        return (
                          dataDate >= from &&
                          dataDate <= to
                        );
                      })
                        .map((data, key) => {
                          return (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{data?.subject}</td>
                              <td>{data?.from}</td>
                              <td>{data?.reference_number}</td>

                              <td>{data?.to}</td>
                              <td>{data?.address}</td>
                              <td>{data?.note}</td>
                              <td>{data?.date?.split("T")[0]}</td>
                              <td>{data?.type}</td>
                              <td>
                                {/* <span
                                  className="badge badge-light text-dark mr-3"
                                  data-toggle="tooltip"
                                  title="Edit"
                                >
                                  {" "}
                                  <i class="fa fa-edit " aria-hidden="true"></i>
                                </span> */}
                                <span
                                  className="badge badge-light text-danger mr-3"
                                  data-toggle="tooltip"
                                  title="Delete"
                                  onClick={() => handleDelete(data)}
                                >
                                  {" "}
                                  <i
                                    class="fa fa-trash "
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </td>
                               {/* <td>
                                  {editMode ? (
                                    <button
                                      className="btn btn-success"
                                      onClick={handleSave}
                                    >
                                    Save
                                    </button>
                                    ) : (
                                    <span
                                      className="badge badge-light text-dark mr-3"
                                      data-toggle="tooltip"
                                      title="Edit"
                                      onClick={() => handleEdit(data)}
                                    >
                                    <i className="fa fa-edit" aria-hidden="true"></i>
                                    </span>
                                    )}
                                    <span
                                      className="badge badge-light text-danger mr-3"
                                      data-toggle="tooltip"
                                      title="Delete"
                                      onClick={() => handleDelete(data)}
                                    >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                    </span>
                                </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {/* {infoData?.length == 0 ? <Nodata></Nodata> : null} */}
                </div>
              </div>
            </div>{" "}
            {/* end col */}
          </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default ViewPostalDispatchRecieve;
