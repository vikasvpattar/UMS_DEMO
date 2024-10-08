import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { STUDENTS_RESULTS_GET, STUDENTS_RESULTS_PUT, STUDENTS_RESULTS_UPLOAD } from '../../utils/InfoUploadingApiConstants';
import { getFileUrl } from '../../Helpers/Helpers';
import { ROUTES } from "../../Router/routerConfig"
import { useNavigate } from 'react-router-dom';
import { ASSET_MEDIA } from '../../utils/AssetsReferenceTypes';
import DocumentsModal from '../../modals/Students/DocumentsModal';

function HomeopathyResults({ setLoading, college_id }) {

  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(false);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");
  const [info, setInfo] = useState({
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
      url: STUDENTS_RESULTS_UPLOAD,
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
        url: STUDENTS_RESULTS_GET,
        headers: {
            "Content-Type": "application/json",
        },
    };

    await axios(config)
        .then((res) => {
            
            // console.log(res.data.data)
            // setData(res.data.data);
            const data3 = res.data.data.filter(item => item.college_id == sessionStorage.getItem("college_id"));
            setData(data3);
            data3.sort((a, b) => b.id - a.id);
            data3.forEach((element) => {
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

const handleDeletes = (id) => {
  const config = {
      method: 'put',
      url: `${STUDENTS_RESULTS_PUT}/${id}`,
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
      url: `${STUDENTS_RESULTS_PUT}/${id}`,
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

const handleEdit = async () => {
  setLoading(1)
  const config = {
    method: "put",
    url: STUDENTS_RESULTS_PUT + `/${info.id}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      "Content-Type": "application/json",
    },
    data: {
      ...info,
      
    },
  }

  await axios(config)
    .then((res) => {
      setLoading(0)
      toast.success("Data Updated successfully");
      clearData();
      getData();
    })
    .catch(err => {
      setLoading(0)
      console.log(err);
      toast.error('Something went wrong')
    })
}

const handleDelete = async (deletedItem, status) => {
  setLoading(1);
  const config = {
    method: "put",
    url: `${STUDENTS_RESULTS_PUT}/${deletedItem?.id}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      "Content-Type": "application/json",
    },
    data: {
      status: status
    },
  };
  try {
    await axios(config);
    setLoading(0);
    toast.success('Data Deleted');
    getData();
  } catch (error) {
    setLoading(0);
    toast.error('Some Error Occurred');
  }
}


  return (
    <div>
      <>
      <DocumentsModal title={title} img={link} setLink={setLink}/>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
              <div class="card-header">
                <h2 class="text-primary"> STUDENTS RESULTS </h2>
              </div>
            <div className="row">              
              <div className="col-md-12">
                <br/>
                <br/>
                <div className="form-group">
                  <label htmlFor="">Title</label>
                  <input type="text"
                    placeholder="Enter the Title"
                    className="form-control"
                    name="title"
                    value={info?.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
              <div className="col-md-12">
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

                                    {info?.attachments?.length > 0 ? (
                                      <button
                                        onClick={() => {
                                          setLink(info?.attachments);
                                          setTitle("Uploaded file");
                                        }}
                                        data-toggle="modal"
                                        data-target="#DocumentsModal"
                                        className="btn btn-primary btn-sm my-1"
                                      >
                                        View
                                      </button>
                                    ) : null}

                </div>
              </div>
              {/* <div className="col-md-12">
                <button className='btn btn-success float-right' id="submit" onClick={handleSubmit}>Submit</button>
              </div> */}
              {/* <div className='col-md-12 mt-2'>
                <button onClick={() => {
                  navigate(ROUTES.ViewHomeopathyResults)
                }} className='btn btn-primary float-right'>
                  View List
                </button>
              </div> */}
            </div>

            <div className="row ">
                    <div className="col-md-12 ml-auto">
                      {
                        edit == false ? 
                        <>
                        <button
                          className="btn btn-nex btn-rounded float-right "
                          type="submit"
                          name="submit"
                          onClick={handleSubmit}
                        >
                          <i className="fa fa-save" aria-hidden="true" /> Save
                        </button>
                        </>
                         :
                         <>
                          <button
                            className="btn btn-nex btn-rounded float-right "
                            type="submit"
                            name="Update"
                            onClick={handleEdit}
                          >
                            <i className="fa fa-save" aria-hidden="true" /> Update
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
                      }
                    </div>
                        </div>

          </div>
        </div>
      </div>

      {/* <div className="container register mt-5">
                  <div className="row"> */}

                    <div className='card'>
                    

                    <div class="card-header">
                      <h4 class="text-primary"> Students Results </h4>
                    </div>

                    <div className='card-body'>

                    <table className="table table-bordered">
                      <tr>
                        <th>Sl.No.</th>
                        <th>Title</th>
                        <th>Attachments</th>
                        <th>Action</th>
                        <th>Status</th>                       
                      </tr>

                      <tbody>

                        {
                          data && data?.map((item, key) => {
                            return (

                              <tr >
                                <td>{key + 1}</td>
                                <td>{item?.title}</td>
                                <td><a href={item?.attachments} target="_blank">View Uploaded File</a></td>

                                <td>
                            
                                    {item?.status == "ACTIVE" ? 
                                      <>
                                        <acronym title="Edit">
                                        <a href="javascript:void(0)" onClick={() => { setEdit(true); setInfo({ ...item }) }}>
                                          <i className="fa fa-edit " aria-hidden="true" />
                                        </a>
                                        </acronym> &nbsp;&nbsp;&nbsp;
                                        <acronym title="Inactive">
                                        <a
                                          href="javascript:void(0)"
                                          onClick={() => handleDelete(item, "INACTIVE")}
                                        >
                                          <i
                                            className="fa fa-thumbs-down"
                                            aria-hidden="true"
                                            style={{ color: "red" }}
                                          />
                                        </a>
                                        </acronym>
                                      </> 
                                      :
                                        <acronym title="active">
                                        <a
                                          href="javascript:void(0)"
                                          onClick={() => handleDelete(item, "ACTIVE")}
                                        >
                                          <i
                                            className="fa fa-thumbs-up"
                                            aria-hidden="true"
                                            style={{ color: "green" }}
                                          />
                                        </a>
                                        </acronym>}
                                        <a href="javascript:void(0)"> </a>
                                  </td>
                                
                                <td>{item?.status == "INACTIVE" ? <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>DELETE</button>
                                    : <button className="btn btn-success mr-2" onClick={() => handleDeletes(item?.id)}>ACTIVE</button>}</td>                                     
                              </tr>

                            )
                          })
                        }
                      </tbody>

                    </table>

                  </div>
                </div>

              {/* </div>
              </div> */}
    </>
              
    </div>
  )
}

export default HomeopathyResults
