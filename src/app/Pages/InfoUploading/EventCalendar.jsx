import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { EVENTCALENDAR_UPLOAD, EVENT_CALENDAR_GET, EVENT_CALENDAR_PUT } from '../../utils/InfoUploadingApiConstants';
import { getFileUrl } from '../../Helpers/Helpers';
import { ASSET_MEDIA } from '../../utils/AssetsReferenceTypes';
import { ROUTES } from "../../Router/routerConfig"
import { useNavigate } from 'react-router-dom';

function EventCalendar({ setLoading }) {

  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");
  const [info, setInfo] = useState({
    title: "",
    date: "",
    image: "",
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
      image: "",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (!info?.title || !info?.date || !info?.image) {
      toast.error("Please Enter all the required Details");
      return;
    }

    setLoading(1);

    const college_id = sessionStorage.getItem("college_id")

    const config = {
      method: "post",
      url: EVENTCALENDAR_UPLOAD,
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
      info.image = d;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const collegeid = sessionStorage.getItem("college_id");

    const config = {
        method: "get",
        url: EVENT_CALENDAR_GET,
        headers: {
            "Content-Type": "application/json",
        },
    };

    await axios(config)
        .then((res) => {
            res.data.data.sort((a, b) => b.id - a.id);
            res.data.data.forEach((element) => {
                element.image = JSON.parse(element.image);
            });
            console.log(res.data.data)
            setData(res.data.data.filter((item) => item.college_id == collegeid))            

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
      url: `${EVENT_CALENDAR_PUT}/${id}`,
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
          getData();
      })
      .catch(err => {
          setLoading(0)
          toast.error("Something Went Wrong")
      })
}

const handleDelete = (id) => {
const config = {
    method: 'put',
    url: `${EVENT_CALENDAR_PUT}/${id}`,
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
        toast.success("Successfully Deleted")
        const updatedData = data.map(item => (item.id === id ? { ...item, status: 'INACTIVE' } : item));
        setData(updatedData);
        getData();
    })
    .catch(err => {
        setLoading(0)
        toast.error("Something Went Wrong")
    })
}


  return (
    <div>

      <div className="row">
        <div className="col-12 mt-4">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h5 className='ml-4'>Event Calendar</h5>
          </div>
        </div>
      </div>

      <div className="row">
            <div className="col-xl-12 mb-2">
                <div className="card">
                    <div className="card-body">

                        <h2 className="card-title">Select criteria</h2>
                        <br/>

                        <div className="row">

                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="">Title</label>
                  <input type="text"
                    placeholder="Enter the Event Title"
                    className="form-control"
                    name="title"
                    value={info?.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="">Date</label>
                  <input type="date"
                    placeholder="Enter the Event Date"
                    className="form-control"
                    name="date"
                    value={info?.date}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                                </div>
                            </div>

                            <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Image</label>
                  <input type="file"
                    placeholder="Attach the file"
                    ref={fileref}
                    className="form-control"
                    name="image"
                    onChange={(e) => {
                      handleChange1(e);
                    }}
                  />
                </div>
              </div>
                            
                        </div>

                        <div className="row float-right">
                            <button
                              className="btn btn-primary mr-4"
                              type="submit"
                              name="submit"
                              onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                        {/* <div className='col-md-12 mt-2'>
                <button onClick={() => {
                  navigate(ROUTES.ViewEventCalendar)
                }} className='btn btn-primary float-right'>
                  View List
                </button>
              </div> */}
                        <br/>
                        <br/>
                        <br/>

                    </div>
                </div>
            </div>
        </div>

        <div className="row">
              <div className="col-12">

                <div className="card">

                  <div class="card-header">
                    <h5 class="text-primary"> EVENT CALENDAR LIST </h5>
                  </div>

                  <div className="card-body">
                    <br/>                     
                    
                    <div style={{ overflowX: "auto" }}>

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sl.No.</th>
                            <th>Title</th>
                            <th>Images</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>

                          {
                            data && data?.map((item, key) => {
                            
                                return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{item?.title}</td>
                                  <td><a href={item?.image} target="_blank"> View Uploaded File </a></td>
                                  <td>{new Date(item?.date).toISOString().split('T')[0]}</td>
                                  <td>{item?.status == "INACTIVE" 
                                      ? 
                                    <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>INACTIVE</button>
                                      : 
                                    <button className="btn btn-success mr-2" onClick={() => handleDelete(item?.id)}>ACTIVE</button>}
                                  </td>
                                </tr>

                              ); 
                            })
                          }
                        </tbody>
                      </table>

                    </div>
                  </div>

                </div>

            </div>
        </div>

      {/* <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Title</label>
                  <input type="text"
                    placeholder="Enter the Event Title"
                    className="form-control"
                    name="title"
                    value={info?.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Date</label>
                  <input type="date"
                    placeholder="Enter the Event Date"
                    className="form-control"
                    name="date"
                    value={info?.date}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Image</label>
                  <input type="file"
                    placeholder="Attach the file"
                    ref={fileref}
                    className="form-control"
                    name="image"
                    onChange={(e) => {
                      handleChange1(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <button className='btn btn-success float-right' id="submit" onClick={handleSubmit}>Submit</button>
              </div>
              <div className='col-md-12 mt-2'>
                <button onClick={() => {
                  navigate(ROUTES.ViewEventCalendar)
                }} className='btn btn-primary float-right'>
                  View List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default EventCalendar;



