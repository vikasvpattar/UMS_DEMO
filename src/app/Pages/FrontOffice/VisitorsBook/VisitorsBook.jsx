import React, { useState, useEffect, useRef } from "react";
import ModalVisitorBook from "../../../modals/FrontOffice/ModalVisitorBook";
import { toast, useToast } from "react-toastify";
import Nodata from "../../../Components/NoData/Nodata";
import { getFileUrl } from "../../../Helpers/Helpers";
import axios from "axios";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";
import {
  FRONT_OFFICE_COMPLAINTS,
  FRONT_OFFICE_SETUP_PURPOSE,
  FRONT_OFFICE_VISITOR_BOOK,
} from "../../../utils/FrontOffice.apiConst";
import { SESSION_COLLEGE_ID } from "../../../utils/sessionStorageContants";

function VisitorsBook({ setLoading }) {
  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : null;
  };

  const fileref = useRef(null);

  const [college_id, setCollegeId] = useState(getCollegeId());

  const [flag, setFlag] = useState(false);

  const [attachment1, setAttachment1] = useState();

  const [purposeOpt, setPurposeOpt] = useState([]);

  const [edit, setEdit] = useState(0);
  const [info, setInfo] = useState({
    purpose: "",
    full_name: "",
    phone: "",
    date: "",
    id_card: "",
    number_of_person: "",
    in_time: "",
    out_time: "",
    note: "",
    attachment: "",
    address: ""
  });

  const addAttachment1 = async (e) => {
    let empId = Math.floor(Math.random() * 100);
    try {
      setAttachment1(e.target.files[0]);
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${empId}_Leave_Application`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setAttachment1("");
      console.log(d);
      info.attachment = d;
    } catch (error) {
      console.log(error);
    }
  };

  const [infoData, setInfoData] = useState([]);

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
      purpose: "",
      full_name: "",
      phone: "",
      date: "",
      id_card: "",
      number_of_person: "",
      in_time: "",
      out_time: "",
      note: "",
      attachment: "",
      address: ""
    });
  };

  const handleSubmit = async (e) => {
    if(!info?.purpose || !info?.full_name || !info?.phone || !info?.in_time) return toast.error("Please fill all the required fields");
    setLoading(1);
    console.log(info);
    const data = {
      ...info,
      college_id: college_id,
    };

    const config = {
      method: edit ? "put" : "post",
      url: `${FRONT_OFFICE_VISITOR_BOOK}/${edit ? info?.id : ""}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setLoading(0);
        clearData();
        getData();
        setEdit(0);
        setFlag(false);
        fileref.current.value = null;
        toast.success("Entry added successfully");
      })
      .catch(function (error) {
        setLoading(0);
        clearData();
        setEdit(0);
        toast.error(error.response.data.message);
      });
  };

  const getData = async (val) => {
    if (!val || val == "undefined") {
      setLoading(1);
    }
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    const [data1, data2] = await Promise.all([
      await axios({ ...config, url: FRONT_OFFICE_VISITOR_BOOK })
        .then(function (response) {
          setInfoData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        }),
      await axios({ ...config, url: FRONT_OFFICE_SETUP_PURPOSE })
        .then(function (response) {
          setLoading(0);
          console.log(response.data.data);
          setPurposeOpt(response.data.data);
        })
        .catch(function (error) {
          setLoading(0);
          console.log(error);
        }),
    ]);
  };

  const handleDelete = async (i) => {
    setLoading(1);

    const config = {
      method: "put",
      url: `${FRONT_OFFICE_VISITOR_BOOK}/${i.id}`,
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
  }, []);

  useEffect(() => {
    setCollegeId(sessionStorage.getItem(SESSION_COLLEGE_ID));
  }, [sessionStorage.getItem(SESSION_COLLEGE_ID)]);

  const change = async (d) => {
    const data = {
      ...d,
      college_id: college_id,
    };

    const config = {
      method: "put",
      url: `${FRONT_OFFICE_VISITOR_BOOK}/${d?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        clearData();
        getData(1);
      })
      .catch(function (error) {
        clearData();
        setEdit(0);
        toast.error(error.response.data.message);
      });
  };

  const save = async () => {
    setFlag(false);
  };

  return (
    <div className="VisitorsBook">
      <ModalVisitorBook />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Visitors Logs</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Front Office</a>
                      </li>
                      <li className="breadcrumb-item active">Visitor Logs</li>
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
                    <h2 className="card-title">Fill Visitors Information</h2>
                    <br />

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom0">
                            Purpose<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="purpose"
                            className="form-control"
                            id="purpose"
                            value={info?.purpose}
                            onChange={handleChange}
                          >
                            <option value="">Select Purpose of Visit</option>
                            {purposeOpt?.map((i, key) => (
                              <option value={i?.id} key={key}>
                                {i?.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Full Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter FullName"
                            name="full_name"
                            value={info?.full_name}
                            onChange={handleChange}
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Phone Number <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Enter Contact Number"
                            value={info?.phone}
                            onChange={handleChange}
                            name="phone"
                            required=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom03">Id Card</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom03"
                            placeholder="ID Card Details"
                            value={info?.id_card}
                            onChange={handleChange}
                            name="id_card"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom04">
                            Number of Person
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="persons"
                            placeholder="Enter Number of persons"
                            value={info?.number_of_person}
                            onChange={handleChange}
                            name="number_of_person"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom05">
                            Date
                          </label>
                          <input
                            className="form-control"
                            id="date"
                            data-provide="datepicker"
                            data-date-autoclose="true"
                            placeholder="date"
                            name="date"
                            value={info?.date.split("T")[0]}
                            onChange={handleChange}
                            required=""
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom03">
                            In Time <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            placeholder="In Time"
                            name="in_time"
                            value={info?.in_time}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom03">
                            Out Time
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            placeholder="In Time"
                            name="out_time"
                            value={info?.out_time}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom03">Note </label>
                          <textarea
                            name="note"
                            id=""
                            cols={1}
                            rows={1}
                            value={info?.note}
                            onChange={handleChange}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">
                            Address
                          </label>
                          <textarea
                            name="address"
                            id=""
                            cols={1}
                            rows={1}
                            value={info?.address}
                            onChange={handleChange}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom03">
                            Attach Documents
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="visitors_doc"
                            ref={fileref}
                            onChange={(e) => addAttachment1(e)}
                            name="attachment"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row float-right">
                      {edit ? (
                        <button
                          className="btn btn-primary btn-rounded"
                          name="submit"
                          value="visitors"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Save Changes
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-rounded"
                          name="submit"
                          value="visitors"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* end card */}
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <h4 className="card-title">Visitors Log List</h4>
                          </div>
                          <div className="col-md-8">
                            <span className="float-right">
                              <button
                                className="btn btn-primary mx-2"
                                onClick={() => {
                                  setFlag(true);
                                }}
                              >
                                Edit
                              </button>
                              {flag == true ? (
                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={() => save()}
                                >
                                  Save
                                </button>
                              ) : null}
                            </span>
                          </div>
                        </div>
                        <hr />
                        <table
                          id="datatable"
                          className="table table-bordered dt-responsive mw-100 w-100 nowrap"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>Sl.No </th>
                              <th>Name</th>
                              <th>Purpose</th>
                              <th>Phone</th>
                              <th>ID Card</th>
                              <th>Date</th>
                              <th>In Time</th>
                              <th style={flag ? { width: "12rem" } : null}>
                                Out Time
                              </th>
                              <th>Number of Persons</th>
                              <th>Note</th>
                              <th>Address</th>
                              <th>Attachment</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {infoData &&
                              infoData?.map((data, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data?.full_name}</td>
                                    <td>{data?.purpose}</td>
                                    <td>{data?.phone}</td>
                                    <td>{data?.id_card || "Not Added"}</td>
                                    <td>{data?.date?.split("T")[0]}</td>
                                    <td>{data?.in_time}</td>
                                    <td>
                                      {data?.out_time && !flag
                                        ? data?.out_time
                                        : !data?.out_time && !flag
                                          ? "Not Entered"
                                          : ""}
                                      {flag == true ? (
                                        <input
                                          type="time"
                                          className="mx-4"
                                          value={data.out_time}
                                          onChange={(e) => {
                                            data.out_time = e.target.value;
                                            change(data, e);
                                          }}
                                        />
                                      ) : null}
                                    </td>
                                    <td>{data?.number_of_person}</td>
                                    <td>{data?.note}</td>
                                    <td>{data?.address}</td>
                                    <td>
                                      {data?.attachment ? (
                                        <span className="badge badge-soft-success p-2">
                                        <a
                                          href={data?.attachment}
                                          target="_blank"
                                        >
                                          <i
                                            class="ri ri-attachment-2" 
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        </span>
                                      ) : (
                                        "Not Added"
                                      )}
                                    </td>
                                    <td>
                                      <span
                                        className="badge badge-light text-dark mr-3"
                                        data-toggle="tooltip"
                                        title="Edit"
                                        onClick={() => {
                                          setEdit(1);
                                          fillAllData(data);
                                        }}
                                      >
                                        {" "}
                                        <i
                                          class="fa fa-edit "
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      {/* <span
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
                                      </span> */}
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
            </div>
            {/* container-fluid */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorsBook;
