import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { STUDENTS_LIST_GET, STUDENTS_LIST_PUT, STUDENTS_LIST_UPLOAD } from '../../utils/InfoUploadingApiConstants';
import { getFileUrl } from '../../Helpers/Helpers';
import { ASSET_MEDIA } from '../../utils/AssetsReferenceTypes';
import { ROUTES } from "../../Router/routerConfig"
import { useNavigate } from 'react-router-dom';

function HomeopathyStudentsList({ setLoading, college_id }) {

  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");
  const [info, setInfo] = useState({
    title: "",
    attachments: "",
  });

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
      attachments: "",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (!info?.title || !info?.attachments) {
      toast.error("Please Enter all the required Details");
      return;

    }

    setLoading(1);

    // Retrieve college_id from session storage
    const college_id = sessionStorage.getItem("college_id")
    console.log("college_id",college_id);

    const config = {
      method: "post",
      url: STUDENTS_LIST_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      data: {
        ...info,
        college_id: college_id,
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

  const getData = async () => {
    const config = {
        method: "get",
        url: STUDENTS_LIST_GET,
        headers: {
            "Content-Type": "application/json",
        },
    };

    await axios(config)
        .then((res) => {
            const data1 = res.data.data.filter(item => item.college_id == sessionStorage.getItem("college_id"));
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
      method: 'put',
      //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
      url: `${STUDENTS_LIST_PUT}/${id}`,
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

const handleApprove = (id) => {
  const config = {
      method: 'put',
      //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
      url: `${STUDENTS_LIST_PUT}/${id}`,
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


  return (
    <div>
      <div className="container-fluid mt-5">
      <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Upload Student List</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Home</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            <a href="javascript:void(0)">Upload Student List</a>
                          </li>
                          
                        </ol>
                      </div>
                    </div>
                  </div>
                 
                </div>
        <div className="card">
          <div className="card-body">
            <div className="row d-flex align-items-center">
            
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Year</label>
                  <input type="text"
                    placeholder="Example 2021-2022"
                    className="form-control"
                    name="title"
                    value={info?.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Date</label>
                  <input type="date"
                    placeholder="Enter the Recruitment Date"
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
                  <label htmlFor="">Attachments</label>
                  <input type="file"
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

              {/* <div className="col-md-4">
                <br></br>
                <button className='btn btn-success ' id="submit" onClick={handleSubmit}>Submit</button>
                
                <button onClick={() => {
                  navigate(ROUTES.ViewHomeoStudentsList)
                }} className='btn btn-primary  ml-3'>
                  View List
                </button>

              </div> */}
             
            </div>

            <div className="row  mr-5 mt-2 float-right">
              <button
                className="btn btn-nex btn-rounded float-right "
                type="submit"
                name="submit"
                onClick={handleSubmit}
              >
                <i className="fa fa-save" aria-hidden="true" /> 
                Save
              </button>
            </div>
            <br/>
            <br/>

          </div>
        </div>
      </div>

      <div className='col-12'>

                    <div className='card'>
                    

                    <div class="card-header">
                      <h4 class="text-primary"> STUDENTS LIST </h4>
                    </div>

                    <div className='card-body'>

                    <table className="table table-bordered">
                      <tr>
                        <th><h5>Sl.No.</h5></th>
                        <th><h5>Title</h5></th>
                        <th><h5>Attachments</h5></th>
                        <th><h5>Status</h5></th>
                        <th><h5>Action</h5></th>                                               
                      </tr>

                      <tbody>

                        {
                          data && data?.map((item, key) => {
                            return (

                              <tr >                                
                                <td>{key + 1}</td>
                                <td>{item?.title}</td>
                                <td><a href={item?.attachments} target="_blank">View Uploaded File</a></td>
                                <td>{item?.status}</td>
                                <td>{item?.status == "INACTIVE" ? <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>DELETE</button>
                                    : <button className="btn btn-success mr-2" onClick={() => handleDelete(item?.id)}>ACTIVE</button>}</td>                                    
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
  )
}

export default HomeopathyStudentsList
