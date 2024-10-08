import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  UNIVERSITYNOTIFICATIONS_UPLOAD,
  UNIVERSITY_NOTIFICATIONS_GET,
  UNIVERSITY_NOTIFICATIONS_PUT,
} from "../../utils/InfoUploadingApiConstants";
import { getFileUrl } from "../../Helpers/Helpers";
import {
  ASSET_HOMEOMEDIA,
  ASSET_MEDIA,
} from "../../utils/AssetsReferenceTypes";
import { ROUTES } from "../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import HomeoEventModal from "../../modals/Events/HomeoEventModal";
import EventsDocumentsModal from "../../modals/Students/EventsDocumentsModal";

function UniversityNotifications({ setLoading }) {
  const navigate = useNavigate();

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");
  const [data, setData] = useState([]);

  const [types, setTypes] = useState("");

  const [attachments, setAttachments] = useState([]);

  const [data1, setData1] = useState([]);
  const [edit, setEdit] = useState(false);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const [flag, setFlag] = useState(false);

  const [info, setInfo] = useState({
    title: "",
    date: "",
    attachments: "",
    type: "News",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearData = () => {
    setInfo({
      title: "",
      date: "",
      attachments: "",
      type: "News",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (!info?.title || !info?.date || !info?.type) {
      toast.error("Please Enter all the required Details");
      return;
    }

    const college_id = sessionStorage.getItem("college_id");

    setLoading(1);
    const config = {
      method: "post",
      url: UNIVERSITYNOTIFICATIONS_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      data: {
        ...info,
        college_id: college_id,
        attachments: attachments,
      },
    };

    console.log("hi");
    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Succesfully Uploaded Details");
        clearData();
        getData();
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(0);
  };

  const handleChange1 = async (e) => {
    console.log(e.target.files[0]);
    let empId = Math.floor(Math.random() * 100);
    try {
      const d = await getFileUrl(
        ASSET_MEDIA,
        "media",
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      info.attachments = d;
    } catch (error) {
      console.log(error);
    }
  };

  const Change = async (e) => {
    let files = [];
    // return;
    for (let i of e.target.files) {
      console.log(i);
      try {
        const d = await getFileUrl(
          ASSET_HOMEOMEDIA,
          "Homoeopathy_Assets/Events",
          i?.name.split(".")[1],
          setLoading,
          i
        );
        files.push(d);
      } catch (error) {
        console.log(error);
      }
    }
    setAttachments(files);
  };

  const getData = async () => {
    const collegeid = sessionStorage.getItem("college_id");

    const config = {
      method: "get",
      url: UNIVERSITY_NOTIFICATIONS_GET,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("hi");
    await axios(config)
      .then((res) => {
        res.data.data.sort((a, b) => b.id - a.id);
        res.data.data.forEach((element) => {
          element.attachments = JSON.parse(element.attachments);
        });
        console.log(res.data.data);
        // setData(res.data.data);
        setData(res.data.data.filter((item) => item.college_id == collegeid));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data -", data);

  const handleEdit = async () => {
    setLoading(true);

    const existingImages = JSON.parse(localStorage.getItem("event_images"));

    const requestData = {
      ...info,
      attachments: attachments.length > 0 ? attachments : existingImages,
    };

    const config = {
      method: "put",
      url: `${UNIVERSITY_NOTIFICATIONS_PUT}/${info.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    try {
      const response = await axios(config);
      setLoading(false);
      toast.success("Data Updated successfully");
      clearData();
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (deletedItem, status) => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${UNIVERSITY_NOTIFICATIONS_PUT}/${deletedItem?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: status,
      },
    };
    try {
      await axios(config);
      setLoading(0);
      toast.success("Data Deleted");
      getData();
    } catch (error) {
      setLoading(0);
      toast.error("Some Error Occurred");
    }
  };

  console.log("attachments -", info.attachments);

  return (
    <>
      <EventsDocumentsModal title={title} img={link} setLink={setLink} />
      <HomeoEventModal
        flag={flag}
        setFlag={setFlag}
        setLoading={setLoading}
        data={data1}
        getData={getData}
      />
      <div>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">
                      News, Announcements, Achievements and Events
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card-body">
                          <div className="card-title">Select Criteria</div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="">
                                  Title <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter the  Title"
                                  className="form-control"
                                  name="title"
                                  value={info?.title}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="">
                                  {" "}
                                  Date <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="date"
                                  placeholder="Enter the Date"
                                  className="form-control"
                                  name="date"
                                  // value={info?.date}
                                  value={
                                    info?.date ? info?.date?.split("T")[0] : ""
                                  }
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label htmlFor="">
                                  Attachments{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                  type="file"
                                  multiple="multiple"
                                  placeholder="Attach the file"
                                  className="form-control"
                                  name="attachments"
                                  ref={fileref}
                                  // onChange={(e) => {
                                  //   handleChange1(e);
                                  // }}
                                  onChange={(e) => Change(e)}
                                />
                                {info?.attachments?.length > 0 ? (
                                  <button
                                    onClick={() => {
                                      setLink(info?.attachments);
                                      setTitle("Images");
                                    }}
                                    data-toggle="modal"
                                    data-target="#EventsDocumentsModal"
                                    className="btn btn-primary btn-sm my-1"
                                  >
                                    View
                                  </button>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Type <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  name="type"
                                  id="class"
                                  className="form-control"
                                  value={info?.type}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                >
                                  <option value="News">News</option>
                                  <option value="Announcements">
                                    Announcements
                                  </option>
                                  <option value="Events">Events</option>
                                </select>
                              </div>
                            </div>

                            {/* <div className="col-md-12 mt-5">
                            <button
                              className="btn btn-success float-right"
                              id="submit"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </div> */}

                            <div className="row float-right">
                              <div className="col-md-12 ml-auto float-right">
                                {edit == false ? (
                                  <>
                                    <button
                                      className="btn btn-nex btn-rounded float-right "
                                      type="submit"
                                      name="submit"
                                      onClick={handleSubmit}
                                    >
                                      <i
                                        className="fa fa-save"
                                        aria-hidden="true"
                                      />{" "}
                                      Save
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-nex btn-rounded float-right "
                                      type="submit"
                                      name="Update"
                                      onClick={handleEdit}
                                    >
                                      <i
                                        className="fa fa-save"
                                        aria-hidden="true"
                                      />{" "}
                                      Update
                                    </button>
                                    <button
                                      className="btn btn-nex btn-rounded float-lg-right mx-1  p-2 px-3"
                                      type="submit"
                                      name="submit"
                                      // style={{aspectRatio:'1/1'}}
                                      onClick={() => {
                                        setEdit(false);
                                        // setAddNew(false);
                                      }}
                                    >
                                      {"<   "}{" "}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div class="card-header">
                            <h5 class="text-primary mt-2">
                              {" "}
                              UNIVERSITY NOTIFICATIONS LIST{" "}
                            </h5>
                          </div>

                          <div className="card-body">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>
                                  {" "}
                                  Type <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                  name="type"
                                  id="class"
                                  className="form-control"
                                  value={types}
                                  onChange={(e) => setTypes(e.target.value)}
                                >
                                  <option value="">All</option>
                                  <option value="News">News</option>
                                  <option value="Announcements">
                                    Announcements
                                  </option>
                                  <option value="Events">Events</option>
                                </select>
                              </div>
                            </div>
                            <br />
                            <br />

                            <div style={{ overflowX: "auto" }}>
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th width="2%">Sl.No.</th>
                                    <th width="5%">Type</th>
                                    <th width="25%">Title</th>
                                    <th width="4%">Date</th>
                                    <th width="5%">Image</th>
                                    <th width="2%">Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {data &&
                                    data?.map((item, key) => {
                                      const showRow =
                                        types === item?.type || types === "";

                                      return showRow ? (
                                        <tr>
                                          <td>{key + 1}</td>
                                          <td>{item?.type}</td>
                                          <td>{item?.title}</td>
                                          <td>
                                            {item?.date
                                              ? item.date.split("T")[0]
                                              : null}
                                          </td>
                                          <td>
                                            <a
                                              href={item?.attachments}
                                              target="_blank"
                                            >
                                              {" "}
                                              View Uploaded File{" "}
                                            </a>
                                          </td>
                                          {/* <td>
                                          {item?.status == "INACTIVE" ? (
                                            <button
                                              className="btn btn-danger mr-2"
                                              onClick={() =>
                                                handleApprove(item?.id)
                                              }
                                            >
                                              INACTIVE
                                            </button>
                                          ) : (
                                            <button
                                              className="btn btn-success mr-2"
                                              onClick={() =>
                                                handleDelete(item?.id)
                                              }
                                            >
                                              ACTIVE
                                            </button>
                                          )}
                                        </td> */}

                                          <td>
                                            {item?.status == "ACTIVE" ? (
                                              <>
                                                <acronym title="Edit">
                                                  <a
                                                    href="javascript:void(0)"
                                                    onClick={() => {
                                                      setEdit(true);
                                                      setInfo({ ...item });
                                                    }}
                                                  >
                                                    <i
                                                      className="fa fa-edit "
                                                      aria-hidden="true"
                                                    />
                                                  </a>
                                                </acronym>{" "}
                                                &nbsp;&nbsp;&nbsp;
                                                <acronym title="View">
                                                  <a
                                                    href="javascript:void(0)"
                                                    data-toggle="modal"
                                                    data-target="#HomeoEventModal"
                                                    onClick={() => {
                                                      // setFlag((flag) => !flag);
                                                      // setData1(item?.attachments);
                                                      setData1({
                                                        ...item,
                                                        attachments:
                                                          item.attachments ||
                                                          "",
                                                      });
                                                    }}
                                                  >
                                                    <i
                                                      className="fa fa-eye"
                                                      aria-hidden="true"
                                                      style={{ color: "blue" }}
                                                    />
                                                  </a>
                                                </acronym>{" "}
                                                &nbsp;&nbsp;&nbsp;
                                                <acronym title="Inactive">
                                                  <a
                                                    href="javascript:void(0)"
                                                    onClick={() =>
                                                      handleDelete(
                                                        item,
                                                        "INACTIVE"
                                                      )
                                                    }
                                                  >
                                                    <i
                                                      className="fa fa-thumbs-down"
                                                      aria-hidden="true"
                                                      style={{ color: "red" }}
                                                    />
                                                  </a>
                                                </acronym>
                                              </>
                                            ) : (
                                              <>
                                                <acronym title="View">
                                                  <a
                                                    href="javascript:void(0)"
                                                    data-toggle="modal"
                                                    data-target="#HomeoEventModal"
                                                    onClick={() => {
                                                      // setFlag((flag) => !flag);
                                                      // setData1(item?.attachments);
                                                      setData1({
                                                        ...item,
                                                        attachments:
                                                          item.attachments ||
                                                          "",
                                                      });
                                                    }}
                                                  >
                                                    <i
                                                      className="fa fa-eye"
                                                      aria-hidden="true"
                                                      style={{ color: "blue" }}
                                                    />
                                                  </a>
                                                </acronym>{" "}
                                                &nbsp;&nbsp;&nbsp;
                                                <acronym title="active">
                                                  <a
                                                    href="javascript:void(0)"
                                                    onClick={() =>
                                                      handleDelete(
                                                        item,
                                                        "ACTIVE"
                                                      )
                                                    }
                                                  >
                                                    <i
                                                      className="fa fa-thumbs-up"
                                                      aria-hidden="true"
                                                      style={{ color: "green" }}
                                                    />
                                                  </a>
                                                </acronym>
                                              </>
                                            )}
                                            <a href="javascript:void(0)"> </a>
                                          </td>
                                        </tr>
                                      ) : null;
                                    })}
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

              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UniversityNotifications;
