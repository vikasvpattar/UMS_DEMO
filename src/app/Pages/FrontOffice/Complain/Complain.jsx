import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import { getFileUrl } from "../../../Helpers/Helpers";
import ModalComplaints from "../../../modals/FrontOffice/ModalComplaints";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";
import {
  FRONT_OFFICE_COMPLAINTS,
  FRONT_OFFICE_SETUP_COMPLAINT_TYPE,
  FRONT_OFFICE_SETUP_SOURCE,
} from "../../../utils/FrontOffice.apiConst";
import { SESSION_COLLEGE_ID } from "../../../utils/sessionStorageContants";
import Select from "react-select";
import "./Complain.scss";

function Complain({ setLoading, collegeId }) {
  //state to show or hide save and update button at the below form
  const [edit, setEdit] = useState(0);

  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : null;
  };

  const [college_id, setCollegeId] = useState(getCollegeId());

  const [info, setInfo] = useState({
    complain_type: "",
    complain_source: "",
    complain_by: "",
    phone: "",
    date: "",
    email: "",
    assigned: "",
    attachment: "",
    note: "",
  });

  //Function upload attachment to the s3
  const addAttachment1 = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `Postal_Dispatch_${collegeId}`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setInfo((prev) => ({
        ...prev,
        attachment: d,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [infoData, setInfoData] = useState([]);

  const [complainOpt, setComplainOpt] = useState([]);

  const [sourceOpt, setSourceOpt] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const fillAllData = (d) => {
    setInfo(d);
  };

  const clearData = () => {
    setInfo({
      complain_type: "",
      complain_source: "",
      complain_by: "",
      phone: "",
      date: "",
      email: "",
      assigned: "",
      attachment: "",
      note: "",
    });
  };

  //get supporting data for the dropdown
  const getAllData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2] = await Promise.all([
      axios({
        ...config,
        url: `${FRONT_OFFICE_SETUP_COMPLAINT_TYPE}?college_id=${collegeId}`,
      })
        .then((res) => {
          setLoading(0);
          setComplainOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
        }),
      axios({
        ...config,
        url: `${FRONT_OFFICE_SETUP_SOURCE}?college_id=${collegeId}`,
      })
        .then((res) => {
          setLoading(0);
          setSourceOpt(res.data.data);
        })
        .catch((err) => {
          setLoading(0);
        }),
    ]);
  };

  //Add a Data
  const handleSubmit = async (e) => {
    if (!info.complain_by || !info.complain_type || !info.complain_source) {
      toast.error("Please enter all details");
      return;
    }
    setLoading(1);
    const data = edit
      ? {
          ...info,
        }
      : {
          ...info,
          college_id: college_id,
        };

    const config = {
      method: edit ? "put" : "post",
      url: `${FRONT_OFFICE_COMPLAINTS}/${edit ? info.id : ""}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((res) => {
        getData();
        setLoading(0);
        toast.success("Successfully Updated Details")
        setEdit(0);
        clearData();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(0);
      });
  };

  //Get Main Data
  const getData = async () => {
    const config = {
      method: "get",
      url: FRONT_OFFICE_COMPLAINTS,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data.data);
        setInfoData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Delete a Data
  const handleDelete = async (i) => {
    setLoading(1);

    const config = {
      method: "put",
      url: `${FRONT_OFFICE_COMPLAINTS}/${i.id}`,
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

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  useEffect(() => {
    setCollegeId(sessionStorage.getItem(SESSION_COLLEGE_ID));
  }, [sessionStorage.getItem(SESSION_COLLEGE_ID)]);

  const complainTypeOptions = complainOpt?.map((option) => ({
    value: option.id,
    label: option.title,
  })) || [];

  const sourceOptions = sourceOpt?.map((option) => ({
    value: option.id,
    label: option.title,
  })) || [];

  const handleChange1 = (selectedOption, name) => {
    setInfo((prevInfo) => ({ ...prevInfo, [name]: selectedOption.value }));
  };

  return (
    <div className="Complain">
      <ModalComplaints />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Complain</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Front Office</a>
                      </li>
                      <li className="breadcrumb-item active">Complain</li>
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
                          <label htmlFor="validationCustom02">
                            Complain Type<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            className="form-control"
                            name="complain_type"
                            id="complain_type"
                            required=""
                            value={info?.complain_type}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            {complainOpt?.map((i, key) => (
                              <option value={i?.id} key={key}>
                                {i?.title}
                              </option>
                            ))}
                          </select> */}

                          <Select
                            name="complain_type"
                            id="complain_type"
                            value={complainTypeOptions.find((option) => option.value == info.complain_type)}
                            onChange={(selectedOption) => handleChange1(selectedOption, 'complain_type')}
                            options={complainTypeOptions}
                          />

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Source<span style={{ color: "red" }}>*</span>
                          </label>
                          {/* <select
                            name="complain_source"
                            id="complain_source"
                            className="form-control"
                            required=""
                            value={info?.complain_source}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            {sourceOpt?.map((i, key) => (
                              <option value={i?.id} key={key}>
                                {i?.title}
                              </option>
                            ))}
                          </select> */}

<Select
            name="complain_source"
            id="complain_source"
            value={sourceOptions.find((option) => option.value === info.complain_source)}
            onChange={(selectedOption) => handleChange1(selectedOption, 'complain_source')}
            options={sourceOptions}
          />

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Complain By<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            className="form-control"
                            name="complain_by"
                            id="complain_by"
                            value={info?.complain_by}
                            onChange={handleChange}
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Phone</label>
                          <input
                            type="number"
                            className="form-control"
                            id="validationCustom02"
                            value={info?.phone}
                            onChange={handleChange}
                            placeholder="Enter phone Number"
                            name="phone"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="date"
                            id="date"
                            value={info?.date ? info?.date.split("T")[0] : ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={info?.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/*
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Action Taken
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Enter Status"
                            name="action"
                            //   value={info?.action}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                     */}
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Assigned</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Enter Name"
                            name="assigned"
                            value={info?.assigned}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Note</label>{" "}
                          <br />
                          <textarea
                            className="form-control"
                            name="note"
                            id=""
                            cols={1}
                            rows={1}
                            value={info?.note}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Attach document
                          </label>{" "}
                          <br />
                          <input
                            type="file"
                            className="form-control"
                            id="doc"
                            placeholder="attachment"
                            name="attachment"
                            onChange={addAttachment1}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right ">
                      {edit ? (
                        <button
                          className="btn btn-primary btn-rounded "
                          type="submit"
                          name="submit"
                          value="reg_complaint"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <i className="fa fa-save" aria-hidden="true" /> Save
                          Changes
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-rounded "
                          type="submit"
                          name="submit"
                          value="reg_complaint"
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
          </div>
          {/* container-fluid */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">Complain List</h4>
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
                        <th>Complain No </th>
                        <th>Complain Type</th>
                        <th>Source By</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {infoData &&
                        infoData?.map((data, key) => {
                          return (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{data?.complain_type}</td>
                              <td>{data?.complain_source}</td>
                              <td>{data?.complain_by}</td>
                              <td>{data?.phone}</td>
                              <td>{data?.date?.split("T")[0]}</td>

                              <td>
                                {data?.attachment && (
                                  <a
                                    className="badge badge-light text-dark mr-3 cursor-pointer"
                                    href={data?.attachment}
                                    target="_blank"
                                    data-toggle="tooltip"
                                    title="Download Attchment"
                                  >
                                    {" "}
                                    <i
                                      class="ri ri-attachment-2"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                )}
                                <span
                                  className="badge badge-light text-dark mr-3 cursor-pointer"
                                  data-toggle="tooltip"
                                  title="Edit"
                                  onClick={() => {
                                    setEdit(1);
                                    fillAllData(data);
                                  }}
                                >
                                  {" "}
                                  <i class="fa fa-edit" aria-hidden="true"></i>
                                </span>
                                <span
                                  className="badge badge-light text-danger mr-3 cursor-pointer"
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

                                <span
                                  className="badge badge-light text-dark mr-3 cursor-pointer"
                                  data-toggle="tooltip"
                                  title="Edit"
                                  onClick={() => {}}
                                >
                                  {" "}
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {infoData?.length == 0 ? <Nodata></Nodata> : null}
                </div>
              </div>
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end row */}
        </div>
        {/* End Page-content */}
      </div>
      {/* end main content*/}
    </div>
  );
}

export default Complain;
