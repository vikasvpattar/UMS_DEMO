import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { RECRUITMENT_GET, RECRUITMENT_PUT, RECRUITMENT_UPLOAD } from '../../utils/InfoUploadingApiConstants';
import { getFileUrl } from '../../Helpers/Helpers';
import { ASSET_MEDIA } from '../../utils/AssetsReferenceTypes';
import Select from "react-select";
import { ROUTES } from "../../Router/routerConfig"
import { useNavigate } from 'react-router-dom';
import { LOCAL_COLLEGE } from '../../utils/LocalStorageConstants';

function Recruitment({ setLoading }) {

  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");

  const collegesOpt = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));

  const options = collegesOpt?.map((item, key) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleCollegeSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    info.college_id = selectedValues[0];
    setInfo((prev) => ({ ...prev, multi_clg_id: selectedValues })); // Update user state
  };

  const [info, setInfo] = useState({
    title: "",
    date: "",
    image: "",
    multi_clg_id: [],
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
      multi_clg_id: [],
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (!info?.title || !info?.date || !info.image) {
      toast.error("Please Enter all the required Details");
      return;

    }

    setLoading(1);

    const college_id = sessionStorage.getItem("college_id")
    console.log("college_id",college_id);
    
    const config = {
      method: "post",
      url: RECRUITMENT_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      // data: info,
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
    const config = {
        method: "get",
        url: RECRUITMENT_GET,
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
        url: `${RECRUITMENT_PUT}/${id}`,
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
      url: `${RECRUITMENT_PUT}/${id}`,
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
    <div className="Recruitment">

        <div className="row">
            <div className="col-12 mt-4">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h5 className='ml-4'>RECRUITMENTS</h5>
                </div>
            </div>
        </div>

            <div className="row">
              <div className="col-xl-12 mb-2">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Select criteria</h2>
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                          <label htmlFor="validationCustom01">
                            {" "}
                            College<span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            name="multi_clg_id"
                            value={info.multi_clg_id.map((value) =>
                              options.find((option) => option.value === value)
                            )}
                            onChange={handleCollegeSelect}
                            autoFocus={true}
                            isMulti={true}
                            options={options}
                            getOptionLabel={(option) => option.label} // Set the label display
                            getOptionValue={(option) => option.value} // Set the value to use for selection
                          />
                        </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="">Title</label>
                          <input type="text"
                            placeholder="Enter the Recruitment Title"
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
                            placeholder="Enter the Recruitment Date"
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
                            className="form-control"
                            name="image"
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
                        className="btn btn-primary mr-4"
                        type="submit"
                        name="submit"
                        onClick={handleSubmit}
                      >
                       Save
                      </button>
                    </div>

                  </div>
                </div>
                {/* end card */}
              </div>
            </div>

            <div className="row">
              <div className="col-12">

                <div className="card">

                  <div class="card-header">
                    <h3 class="text-primary"> Recruitments List </h3>
                  </div>

                  <div className="card-body">
                    <div style={{ overflowX: "auto" }}>

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sl.No.</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        
                        <tbody>

                          {
                            data && data?.map((item, key) => {
                              return (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item?.title}</td>
                                  <td>{item?.date ? item.date.split('T')[0] : null}</td>
                                  <td><a href={item?.image} target="_blank"> View Uploaded File </a></td>
                                  <td>{item?.status}</td>
                                  <td>{item?.status == "INACTIVE" 
                                      ? 
                                    <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>DELETE</button>
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

            <br></br>
            <br></br>
                               
    </div>

  )
}

export default Recruitment;



