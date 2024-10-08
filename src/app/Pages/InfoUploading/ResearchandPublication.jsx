import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RESEARCHANDPUBLICATION_UPLOAD, RESEARCH_PUBLICATION_GET, RESEARCH_PUBLICATION_UPDATE } from '../../utils/InfoUploadingApiConstants';

import { getFileUrl } from '../../Helpers/Helpers';
import { ASSET_EMPLOYEE_IMAGE, ASSET_HOMEOMEDIA, ASSET_MEDIA } from '../../utils/AssetsReferenceTypes';

import { ROUTES } from "../../Router/routerConfig"
import { useNavigate } from 'react-router-dom';
import { EMPLOYEE_ALL } from '../../utils/apiConstants';
import DocumentsModal from '../../modals/Students/DocumentsModal';

function ResearchandPublication({ setLoading, collegeId }) {
  const ref = useRef();

  const fileref = useRef(null);

  const college_id = sessionStorage.getItem("college_id");

  const [edit, setEdit] = useState(false);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const role = sessionStorage.getItem("role");
  console.log("role -", role);
  console.log("collegeId -", collegeId);

  const [info, setInfo] = useState({
    title: "",
    researcher: "",
    publishdate: "",
    attachments: "",
  });

  const clearData = () => {
    setInfo({
      title: "",
      researcher: "",
      publishdate: "",
      attachments: "",
    })
  }

  const [data, setData] = useState([]);

  const getData = async () => {
    const collegeid = sessionStorage.getItem("college_id");
    setLoading(1);
    const config = {
      method: "get",
      url: `${RESEARCH_PUBLICATION_GET}?college_id=${collegeid}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        console.log('data - ', res.data.data);
        res.data.data.sort((a, b) => b.id - a.id);
        setData(res.data.data);
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  const handleEdit = async () => {
    setLoading(1)
    const config = {
      method: "put",
      url: RESEARCH_PUBLICATION_UPDATE + `/${info.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...info,
        
      },
    }

    console.log("info -", info);

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
      url: `${RESEARCH_PUBLICATION_UPDATE}/${deletedItem?.id}`,
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

  const handleSubmit = async (i) => {
    

    if (
      !info?.title ||
      !info?.researcher ||
      !info?.attachments ||
      !info?.publishdate 
    ) {
      toast.error("Please Enter all the required Details");
      return;
    }

    info.college_id = await sessionStorage.getItem('college_id');
    
    setLoading(1);
    const config = {
      method: "post",
      url: `${RESEARCHANDPUBLICATION_UPLOAD}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        getData();
        setInfo({
          title: "",
          researcher: "",
          publishdate: "",
          attachments: "",
        });
        ref.current.value = null;
        toast.success("Successfully Added Details");
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
        toast.error("Something went wrong");
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleUpload = async (e, str) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_IMAGE,
        `Employee_${str}`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      console.log(d);
      setInfo((prev) => ({
        ...prev,
        attachments: d ? d : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
    <DocumentsModal title={title} img={link} setLink={setLink}/>
    <div>
      <div className="container-fluid mt-5">
      <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Research and Publication</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Home</a>
                          </li>
                          <li className="breadcrumb-item active">
                            {" "}
                            <a href="javascript:void(0)">Research and Publication</a>
                          </li>
                          
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Title</label>
                  <input
                      className="form-control"
                      placeholder="Enter Research and Publication Title"
                      name="title"
                      id="class"
                      value={info?.title}
                      onChange={(e) => {
                        setInfo((prev) => ({
                          ...prev,
                          ["title"]: e.target.value,
                        }));
                      }}
                      type="text"
                    />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Name of Researcher </label>
                  <input
                      className="form-control"
                      placeholder="Enter Researcher Name"
                      name="researcher"
                      id="class"
                      value={info?.researcher}
                      onChange={(e) => {
                        setInfo((prev) => ({
                          ...prev,
                          ["researcher"]: e.target.value,
                        }));
                      }}
                      type="text"
                    />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Date of Publication</label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    name="publishdate"
                    placeholder="Select Date of Publication"
                    value={info?.publishdate ? info?.publishdate?.split("T")[0] : ""}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   handleChange(e);
                    // }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                  <div className="form-group">
                    <lable>Attachment</lable>
                    <input
                      className="form-control"
                      name="attachments"
                      ref={ref}
                      onChange={(e) => {
                        handleUpload(e, "attachments");
                      }}
                      type="file"
                    />
                    {info?.attachments?.length > 0 ? (
                      <button
                        onClick={() => {
                          setLink(info?.attachments);
                          setTitle("Research and Publication Image");
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
                <button className="btn btn-success float-right" id="submit" onClick={handleSubmit}>Submit</button>
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

      <div className="row">
              <div className="col-12">

                <div className="card">

                  <div class="card-header">
                    <h5 class="text-primary"> RESEARCH AND PUBLICATION LIST </h5>
                  </div>

                  <div className="card-body">
                    <br/>
                    <br/>                     
                    
                    <div style={{ overflowX: "auto" }}>

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th width="2%">Sl.No.</th>
                            <th width="35%">Title</th>
                            <th width="8%">Researcher Name</th>
                            <th width="6%">Attachment</th>
                            <th width="4%">Date</th>
                            <th width="2%">Status</th>
                            <th width="2%">Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>

                          {
                            data && data?.map((item, key) => {
                            
                                return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{item?.title}</td>
                                  <td>{item?.researcher}</td>
                                  <td><a href={item?.attachments} target="_blank"> View Uploaded File </a></td>
                                  <td>{new Date(item?.publishdate).toISOString().split('T')[0]}</td>
                                  <td>{item?.status}</td>
                                  {/* <td>{item?.status == "INACTIVE" 
                                      ? 
                                    <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>INACTIVE</button>
                                      : 
                                    <button className="btn btn-success mr-2" onClick={() => handleDelete(item?.id)}>ACTIVE</button>}
                                  </td> */}

                          <td>
                            
                            {item?.status == "ACTIVE" ? 
                            <><acronym title="Edit">
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
                              </a></acronym></> :
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

    </div>
    </>
  )
}


export default ResearchandPublication;
