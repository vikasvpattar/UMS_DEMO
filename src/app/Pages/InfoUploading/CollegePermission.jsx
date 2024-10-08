import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  COLLEGE_PERMISSION_GET,
  COLLEGE_PERMISSION_PUT,
  COLLEGE_PERMISSION_UPLOAD,
} from "../../utils/InfoUploadingApiConstants";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_MEDIA } from "../../utils/AssetsReferenceTypes";
import { ROUTES } from "../../Router/routerConfig";
import { useNavigate } from "react-router-dom";

function CollegePermission({ setLoading }) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [types, setTypes] = useState("");

  // Initialize a counter outside the mapping function
  let serialNumber = 0;

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");
  const [info, setInfo] = useState({
    type: "",
    title: "",
    attachments: "",
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
      type: "",
      title: "",
      attachments: "",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    // if (!info?.title || !info?.attachments) {
    //   toast.error("Please Enter all the required Details");
    //   return;

    // }

    setLoading(1);

    // Retrieve college_id from session storage
    const college_id = sessionStorage.getItem("college_id");
    console.log("college_id", college_id);

    const config = {
      method: "post",
      url: COLLEGE_PERMISSION_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      // data: info,
      data: {
        ...info,
        college_id: college_id, // Add college_id to the data
      },
    };

    axios(config)
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

  const getData = async () => {
    const config = {
      method: "get",
      url: COLLEGE_PERMISSION_GET,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        // res.data.data.sort((a, b) => b.id - a.id);
        // res.data.data.forEach((element) => {
        //     element.attachments = JSON.parse(element.attachments);
        // });
        // console.log(res.data.data)
        // setData(res.data.data);
        const data1 = res.data.data.filter(
          (item) => item.college_id == sessionStorage.getItem("college_id")
        );
        setData(data1);
        data1.sort((a, b) => b.id - a.id);
        data1.forEach((element) => {
          element.attachments = JSON.parse(element.attachments);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const config = {
      method: "put",
      //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
      url: `${COLLEGE_PERMISSION_PUT}/${id}`,
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
        toast.success("Success");
        const updatedData = data.map((item) =>
          item.id == id ? { ...item, status: "INACTIVE" } : item
        );
        setData(updatedData);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleApprove = (id) => {
    const config = {
      method: "put",
      //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
      url: `${COLLEGE_PERMISSION_PUT}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        status: "ACTIVE",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success("Success");
        const updatedData = data.map((item) =>
          item.id == id ? { ...item, status: "ACTIVE" } : item
        );
        setData(updatedData);
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div>
      <div className="container-fluid mt-3 ">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 mt-4">Upload Permission Letters</h4>
              {/* <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Home</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            <a href="javascript:void(0)">Upload Permission and Affiliation Letter</a>
                          </li>
                          
                        </ol>
                      </div> */}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row d-flex align-items-center">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="">Year of Permission </label>
                  <input
                    type="text"
                    placeholder="example : 2022-2023"
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
                    <option value="">Select Type</option>
                    <option value="College Permission">
                      College Permission
                    </option>
                    <option value="College Affiliation">
                      College Affiliation
                    </option>
                    <option value="Recognition">Recognition Letter</option>
                    <option value="Reg Letter">Registration Letter</option>
                    <option value="UGC Permission Letter">
                      UGC Permission Letter
                    </option>
                  </select>
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Description</label>
                  <input type="text"
                    placeholder="Enter the Description"
                    className="form-control"
                    name="description"
                    value={info?.description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div> */}
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="">Attachments</label>
                  <input
                    type="file"
                    placeholder="Attach the file"
                    className="form-control"
                    name="attachments"
                    ref={fileref}
                    onChange={(e) => {
                      handleChange1(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row float-right">
              <button
                className="btn btn-success mr-5"
                id="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>

              {/* <button onClick={() => {
                  navigate(ROUTES.ViewCollegePermission)
                }} className='btn btn-primary ml-3  '>
                  View List
                </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='col-12'> */}

      {/* <div className="container-fluid ">
                  <div className="row"> */}

      <div className="card">
        <div class="card-header">
          <h6 class="text-primary"> PERMISSION LETTERS LIST </h6>
        </div>

        <div className="card-body">
          {/* <h6 className="text-danger">Search Field</h6>
                      <br/> */}
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
                <option value="College Permission">College Permission</option>
                <option value="College Affiliation">College Affiliation</option>
                <option value="Recognition">Recognition Letter</option>
                <option value="Reg Letter">Registration Letter</option>
                <option value="UGC Permission Letter">
                  UGC Permission Letter
                </option>
              </select>
            </div>
          </div>
          <br />
          <br />

          <table className="table table-bordered">
            <tr>
              <th>Sl.No.</th>
              <th>Title</th>
              <th>Type</th>
              <th>Attachments</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            <tbody>
              {data &&
                data?.map((item, key) => {
                  const showRow = types === item?.type || types === "";

                  // Increment the serial number for all items
                  if (showRow) {
                    serialNumber++;
                  }

                  return showRow ? (
                    <tr>
                      {/* <td>{key + 1}</td> */}
                      <td>{serialNumber}</td>
                      <td>{item?.title}</td>
                      <td>{item?.type}</td>
                      <td>
                        <a href={item?.attachments} target="_blank">
                          View Attachments
                        </a>
                      </td>
                      <td>{item?.status}</td>
                      <td>
                        {item?.status == "INACTIVE" ? (
                          <button
                            className="btn btn-danger mr-2"
                            onClick={() => handleApprove(item?.id)}
                          >
                            DELETE
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mr-2"
                            onClick={() => handleDelete(item?.id)}
                          >
                            ACTIVE
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : null;
                })}
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* </div>
              </div> */}

      {/* </div> */}
    </div>
  );
}

export default CollegePermission;
