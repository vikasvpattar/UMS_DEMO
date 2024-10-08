import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_MEDIA } from "../../utils/AssetsReferenceTypes";
import { ADMISSIONNOTIFICATIONS_UPLOAD, ADMISSION_NOTIFICATIONS_GET, ADMISSION_NOTIFICATIONS_PUT } from "../../utils/InfoUploadingApiConstants";
import { ROUTES } from "../../Router/routerConfig";
import { useNavigate } from "react-router-dom";
import { LOCAL_COLLEGE, LOCAL_DEPARTMENT } from "../../utils/LocalStorageConstants";

function AdmissionNotifications({ setLoading }) {
  const navigate = useNavigate();

  const fileref = useRef(null);

  const [facultyData, setFacultyData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  );

  const [departmentData, setDepartmentData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
  );

  let role = sessionStorage.getItem("role");

  const [data, setData] = useState([]);

  const [info, setInfo] = useState({
    faculty: "",
    department: "",
    title: "",
    date: "",
    lastdate: "",
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
      faculty: "",
      department: "",
      title: "",
      date: "",
      lastdate: "",
      attachments: "",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (
      !info?.faculty ||
      !info?.department ||
      !info?.title ||
      !info?.lastdate ||
      !info?.attachments
    ) {
      toast.error("Please Enter all the required Details");
      return;
    }

    setLoading(1);

    // Get current date
    const currentDate = new Date().toISOString();

    const config = {
      method: "post",
      url: ADMISSIONNOTIFICATIONS_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      data: {
        ...info,
        date: currentDate
      }
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
        url: ADMISSION_NOTIFICATIONS_GET,
        headers: {
            "Content-Type": "application/json",
        },
    };

    await axios(config)
        .then((res) => {
            res.data.data.sort((a, b) => b.id - a.id);
            res.data.data.forEach((element) => {
                element.attachments = JSON.parse(element.attachments);
            });
            console.log(res.data.data)
            setData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

useEffect(() => {
    getData();
}, []);

  const handleApprove = (id) => {
    const config = {
        method: 'put',
        url: `${ADMISSION_NOTIFICATIONS_PUT}/${id}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
        },
        data: {
            status: 'ACTIVE'
        }
    }

    axios(config)
        .then(res => {
            setLoading(0)
            toast.success("Success")
            const updatedData = data.map(item => (item.id === id ? { ...item, status: 'ACTIVE' } : item));
            setData(updatedData);
        })
        .catch(err => {
            setLoading(0)
            toast.error("Something Went Wrong")
        })
}

const handleDelete = (id) => {
  const config = {
      method: 'put',
      url: `${ADMISSION_NOTIFICATIONS_PUT}/${id}`,
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
      },
      data: {
          status: 'INACTIVE'
      }
  }

  axios(config)
      .then(res => {
          setLoading(0)
          toast.success("Success")
          const updatedData = data.map(item => (item.id === id ? { ...item, status: 'INACTIVE' } : item));
          setData(updatedData);
      })
      .catch(err => {
          setLoading(0)
          toast.error("Something Went Wrong")
      })
}

  return (
    <div>

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Admission Notifications</h4>
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
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Faculty <span style={{ color: "red" }}>*</span></label>
                  <select
                    className="form-control"
                    name="faculty"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={info?.faculty}
                  >
                    <option value="">Select Faculty</option>
                    {facultyData?.map((item) => (
                      <option value={item?.id} key={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Department <span style={{ color: "red" }}>*</span></label>
                  <select
                    className="form-control"
                    name="department"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={info?.department}
                  >
                    <option value="">Select Department</option>
                      {departmentData
                      ?.filter(
                        (s) => s.college_id == info?.faculty
                      )
                      ?.map((item) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Notification <span style={{ color: "red" }}>*</span></label>
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
              {/* <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Date</label>
                  <input
                    type="date"
                    placeholder="Enter the Research Title"
                    className="form-control"
                    name="date"
                    value={info?.date}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div> */}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Last Date <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="date"
                    placeholder="Enter the Last Date"
                    className="form-control"
                    name="lastdate"
                    value={info?.lastdate}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Image <span style={{ color: "red" }}>*</span></label>
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
              
              <div className="col-md-12">
                <button
                  className="btn btn-success float-right"
                  id="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              
            </div>

                      </div>
                    </div>
                  </div>

            <div className="row">
              <div className="col-12">

                <div className="card">

                  <div class="card-header">
                    <h5 class="text-primary mt-2"> ADMISSION NOTIFICATIONS LIST </h5>
                  </div>

                  <div className="card-body">
                    
                    <div style={{ overflowX: "auto" }}>

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sl.No.</th>
                            <th>Faculty</th>
                            <th>Department</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>

                          {
                            data && data?.map((item, key) => {
                              return (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>
                                    {
                                      facultyData.find(
                                        (s) => s.id == item?.faculty
                                      )?.name
                                    }
                                  </td>
                                  <td>
                                    {
                                      departmentData.find(
                                        (s) => s.id == item?.department
                                      )?.name
                                    }
                                  </td>
                                  <td>{item?.title}</td>
                                  <td>{item?.date ? item.date.split('T')[0] : null}</td>
                                  <td><a href={item?.attachments} target="_blank"> View Uploaded File </a></td>
                                  <td>{item?.status == "INACTIVE" 
                                      ? 
                                    <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>INACTIVE</button>
                                      : 
                                    <button className="btn btn-success mr-2" onClick={() => handleDelete(item?.id)}>ACTIVE</button>}
                                  </td>
                                </tr>

                              )
                            })
                          }
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
  );
}

export default AdmissionNotifications;
