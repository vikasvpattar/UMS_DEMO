import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routerConfig"
import Nodata from "../../../Components/NoData/Nodata";
import { getFileUrl } from "../../../Helpers/Helpers";
import ModalPostalRecieve from "../../../modals/FrontOffice/ModalPostalRecieve";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";
import { FRONT_OFFICE_POSTAL } from "../../../utils/FrontOffice.apiConst";
import { SESSION_COLLEGE_ID } from "../../../utils/sessionStorageContants";
import "./PostalRecieve.scss";

function PostalRecieve({ setLoading, collegeId }) {
  //state to show or hide save and update button at the below form
  const [edit, setEdit] = useState(0);

  const navigate = useNavigate();

  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : null;
  };

  const [college_id, setCollegeId] = useState(getCollegeId());

  const [info, setInfo] = useState({
    from: "",
    to: "",
    subject: "",
    reference_number: "",
    address: "",
    date: "",
    mode: "",
    attachment: "",
    note: "",
    type: "RECIEVE",
  });

  //Function upload attachment to the s3
  const addAttachment1 = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `Postal_Recieve_${collegeId}`,
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
      from: "",
      to: "",
      subject: "",
      reference_number: "",
      address: "",
      date: "",
      attachment: "",
      note: "",
      type: "RECIEVE",
      mode: "",
    });
  };

  const getData = async () => {
    setLoading(1);
    const currentDate = new Date().toISOString().split('T')[0];
    const config = {
      method: "get",
      url: `${FRONT_OFFICE_POSTAL}?type=RECIEVE`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        const filteredData = res.data.data.filter(item => item.date.split('T')[0] === currentDate); // Filter data by current date
        setInfoData(filteredData);
        // setInfoData(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (e) => {
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
      url: `${FRONT_OFFICE_POSTAL}/${edit ? info.id : ""}`,
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
      })
      .catch(function (error) {
        setLoading(0);
        toast.error(error.response.data.message);
      });
  };

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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCollegeId(sessionStorage.getItem(SESSION_COLLEGE_ID));
  }, [sessionStorage.getItem(SESSION_COLLEGE_ID)]);

  return (
    <div className="PostalRecieve">
      <ModalPostalRecieve />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* Followup */}
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Add Postal Receive</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="#">Front Office</a>
                      </li>
                      <li className="breadcrumb-item active">Postal Receive</li>
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
                            Subject<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter From title"
                            name="subject"
                            id="subject"
                            value={info?.subject}
                            onChange={handleChange}
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Title<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter From title"
                            name="from"
                            id="from"
                            value={info?.from}
                            onChange={handleChange}
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Reference No.
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Referance No"
                            name="reference_number"
                            value={info?.reference_number}
                            onChange={handleChange}
                            id="reference_number"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Address</label>
                          <textarea
                            className="form-control"
                            name="address"
                            id=""
                            cols={1}
                            rows={1}
                            value={info?.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">To Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter title"
                            name="to"
                            id="to"
                            value={info?.to}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Note</label>
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
                            Date<span style={{ color: "red" }}>*</span>
                          </label>{" "}
                          <br />
                          <input
                            className="form-control"
                            id="date"
                            data-provide="datepicker"
                            data-date-format="dd.mm.yyyy"
                            data-date-autoclose="true"
                            type="date"
                            value={info?.date}
                            onChange={handleChange}
                            placeholder="date"
                            name="date"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Select Mode<span style={{ color: "red" }}>*</span>
                          </label>{" "}
                          <br />
                          <select
                            className="form-control"
                            name="mode"
                            value={info?.mode}
                            onChange={handleChange}
                          >
                            <option value="">Select Mode</option>
                            <option value="Air">By Air</option>
                            <option value="Courier">By Courier</option>
                            <option value="Post">By Post</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Attach Document
                          </label>{" "}
                          <br />
                          <input
                            type="file"
                            className="form-control"
                            id="attachment"
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
                          value="postal_receive"
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
                          value="postal_receive"
                          onClick={(e) => handleSubmit(e)}
                        >
                          <i className="fa fa-save" aria-hidden="true" /> Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">Postal Recieve List</h4>
                    </div>
                    <div className="col-md-6">
                    <button onClick={() => {
                        navigate(ROUTES.Registar.frontOffice.ViewPostalDispatchRecieve)
                      }} className='btn btn-success float-right'>
                        View List
                      </button>
                    {/* <button className="btn btn-success float-right"> View List </button> */}
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
                        <th>Reference No</th>
                        <th>From</th>
                        <th>Subject</th>

                        <th>To </th>
                        {/* <th>Address</th> */}
                        <th>Note</th>
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
                              <td>{data?.reference_number}</td>
                              <td>{data?.from}</td>
                              <td>{data?.subject}</td>

                              <td>{data?.to}</td>
                              {/* <td>{data?.address}</td> */}
                              <td>{data?.note}</td>
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
                                  className="badge badge-light text-dark mr-3"
                                  data-toggle="tooltip"
                                  title="Edit"
                                  onClick={() => {
                                    setEdit(1);
                                    fillAllData(data);
                                  }}
                                >
                                  {" "}
                                  <i class="fa fa-edit " aria-hidden="true"></i>
                                </span>
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
    </div>
  );
}

export default PostalRecieve;
