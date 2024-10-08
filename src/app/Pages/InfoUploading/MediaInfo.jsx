import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loader from "../../Components/Loader/Loader";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_MEDIA } from "../../utils/AssetsReferenceTypes";
import { toast } from "react-toastify";
import { MEDIA_GET, MEDIA_UPDATE, MEDIA_UPLOAD } from "../../utils/InfoUploadingApiConstants";
import HomeoInfo from "./HomeoInfo";
import { type } from "@testing-library/user-event/dist/type";

function MediaInfo({ setLoading, college_id  }) {
  const fileref = useRef(null);
  let role = sessionStorage.getItem("role");

  const [data, setData] = useState([]);

  const [info, setInfo] = useState({
    title: "",
    date: "",
    attachment: "",
    video: "",
    type: "",
  });

  const [types, setTypes] = useState("");

  // Initialize a counter outside the mapping function
  let serialNumber = 0;


  const [type, setType] = useState("");

  const [fileType, setFileType] = useState("Attachments");

  const handleChange = (e) => {
    const { name, value } = e.target;

     // If the file type is changed, update the state
  if (name === "link") {
    setFileType(value);
  }

    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearData = () => {
    setInfo({
      title: "",
      date: "",
      attachment: "",
      video: "",
      type: "",
    });
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    if (!info?.date  || !info?.title || !info?.type) {
      toast.error("Please Enter all the required Details");
      return;
    }
    setLoading(1);

    // Retrieve college_id from session storage
    const college_id = sessionStorage.getItem("college_id")
    console.log("college_id",college_id);

    const config = {
      method: "post",
      url: MEDIA_UPLOAD,
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
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
        getData();
        clearData();
      })
      .catch((err) => {
        console.log(err);
      //  toast.error("Something Went Wrong");
      });

    setLoading(0);
  };

  // const handleChange1 = async (e) => {
  //   console.log(e.target.files[0]);
  //   let empId = Math.floor(Math.random() * 100);
  //   try {
  //     const d = await getFileUrl(
  //       ASSET_MEDIA,
  //       "media",
  //       e.target.value.split(".")[1],
  //       setLoading,
  //       e.target.files[0]
  //     );
  //     info.attachment = d;
  //    // info.video = d;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  
      // Determine if the input is for attachment or video
      const isAttachment = e.target.name === "attachment";
  
      setInfo((prev) => ({
        ...prev,
        [isAttachment ? "attachment" : "video"]: d,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ekk");

  const getData = async () => {
    const collegeid = sessionStorage.getItem("college_id");

    
    const config = {
        method: "get",
        url: MEDIA_GET,
        headers: {
            "Content-Type": "application/json",
        },
    };
    console.log('hi')
    await axios(config)
        .then((res) => {
            res.data.data.sort((a, b) => b.id - a.id);
            // res.data.data.forEach((element) => {
            //     element.attachment = JSON.parse(element.attachment);
            // });
            console.log(res.data.data)
            // setData(res.data.data);
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
        url: `${MEDIA_UPDATE}/${id}`,
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
            toast.success("Successfully ACTIVE")
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
      url: `${MEDIA_UPDATE}/${id}`,
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
          toast.success("Successfully INACTIVE")
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
      {role == "UNIWEBSITE" ? (
        <>

<div>

<div className="row">
    <div className="col-12 mt-4">
        <div className="page-title-box d-flex align-items-center justify-content-between">
            <h5 className='ml-4'>UPLOAD MEDIA DOCUMENTS</h5>
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
                            <label> Title <span style={{ color: "red" }}>*</span></label>
                            <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title Of the Subject"
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
                        <label> Date <span style={{ color: "red" }}>*</span></label>
                        <input
                        type="date"
                        className="form-control"
                        name="date"
                        placeholder="Enter Description Of the Subject"
                        value={info?.date}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Select File Type<span style={{ color: "red" }}>*</span></label>
                            <select
                        id="section"
                        className="form-control"  
                        name="link"                     
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option value="Attachments"> Attachments </option>
                        <option value="Video Link"> Video Link </option>
                      </select>
                        </div>
                    </div>

                    {fileType === "Video Link" && (
  <>
                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Video Info<span style={{ color: "red" }}>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Video Link"
                              name="video"
                              value={info?.video}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Thumbnail<span style={{ color: "red" }}>*</span></label>
                            <input
            type="file"
            className="form-control"
            name="attachment"
            placeholder="Enter Title Of the Subject"
            ref={fileref}
            onChange={(e) => handleChange1(e)}
          />
                        </div>
                      </div>
  </>
)}

                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Type<span style={{ color: "red" }}>*</span></label>
                            <select

                        id="section"
                        className="form-control"
                        name="type"
                        value={info?.type}
                        onChange={(e) => {
                          // setType(e.target.value)
                          handleChange(e);
                        }}
                      >
                        <option value="select"> Select </option>
                        <option value="Media"> Media </option>
                        <option value="Events"> Events </option>
                      </select>
                        </div>
                      </div>
              
                {fileType === "Attachments" && (

<div className="col-md-4">
<div className="form-group">
    <label htmlFor="">Attachment<span style={{ color: "red" }}>*</span></label>
    <input
                        type="file"
                        className="form-control"
                        name="attachment"
                        placeholder="Enter Title Of the Subject"
                        ref={fileref}
                        onChange={(e) => handleChange1(e)}
                      />
</div>
</div>
                )}
                    
                </div>

                <div className="row float-right">
                    {/* <button
                      className="btn btn-primary mr-4"
                      type="submit"
                      name="submit"
                      onClick={handleSubmit}
                    >
                        Save
                    </button> */}

                        <button
                          className="btn btn-nex btn-rounded float-right mr-5"
                          type="submit"
                          name="submit"
                          onClick={handleSubmit}
                        >
                          <i className="fa fa-save" aria-hidden="true" /> Save
                        </button>

                </div>
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
            <h5 class="text-primary"> UPLOADED MEDIA LIST </h5>
          </div>

          <div className="card-body">
          <div className="col-md-4">
                            <div className="form-group">
                                <label> Type <span style={{ color: "red" }}>*</span></label>
                                <select
                                    name="type"
                                    id="class"
                                    className="form-control"
                                    value={types}
                                    onChange={(e) => setTypes(e.target.value)}
                                >
                                  <option value="">All</option>
                                  <option value="Media"> Media </option>
                                  <option value="Events"> Events </option>                               
                                </select>
                            </div>
                      </div>
                      <br/>
                      <br/>                    
            
            <div style={{ overflowX: "auto" }}>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="2%">Sl.No.</th>
                    <th width="5%">Type</th>
                    <th width="35%">Title</th>
                    <th width="8%">Attachments</th>
                    <th width="8%">Video Link</th>
                    <th width="5%">Date</th>
                    <th width="2%">Action</th>
                  </tr>
                </thead>
                
                <tbody>

                  {
                    data && data?.map((item, index) => {

                      const showRow =
                            (types === item?.type) ||
                            (types === "" );

                      // Increment the serial number for all items
                      if (showRow) {
                        serialNumber++;
                      }
                    
                      return showRow ? (
                        <tr key={index}>
                          {/* <td>{index + 1}</td> */}
                          <td>{serialNumber}</td>
                          <td>{item?.type}</td>
                          <td>{item?.title}</td>
                          <td><a href={item?.attachment} target="_blank"> View Uploaded File </a></td>
                          {item?.video ? <td><a href={item?.video} target="_blank"> View Uploaded Video </a></td> : <td>Not Uploaded</td>}
                          {/* <td><a href={item?.video} target="_blank"> View Uploaded Video </a></td> */}
                          <td>{new Date(item?.date).toISOString().split('T')[0]}</td>
                          <td>{item?.status == "INACTIVE" 
                              ? 
                            <button className="btn btn-danger mr-2" onClick={() => handleApprove(item?.id)}>INACTIVE</button>
                              : 
                            <button className="btn btn-success mr-2" onClick={() => handleDelete(item?.id)}>ACTIVE</button>}
                          </td>
                        </tr>

                      ) : null
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

        {/* <div className="col-xl-12 p-0 col-lg-9 d-flex col-md-12 col-sm-12"
             style={{ justifyContent: "center", alignItems: "center" }} >
          <div className="card w-25" style={{ marginTop: "2rem" }}>
            <div className="card-body">
              <div className="row-gutters mt-4">
                <h4 className="text-center">Upload Media Documents</h4>
                <div style={{ marginTop: "3rem" }}>
                  <h5>Title</h5>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title Of the Subject"
                        name="title"
                        value={info?.title}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "3rem" }}>
                  <h5>Date</h5>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        placeholder="Enter Description Of the Subject"
                        value={info?.date}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "3rem" }}>
                  <h5>Select File Type</h5>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        id="section"
                        className="form-control"  
                        name="link"                     
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option value="Attachments"> Attachments </option>
                        <option value="Video Link"> Video Link </option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {fileType === "Video Link" && (
  <>
    <div style={{ marginTop: "3rem" }}>
      <h5>Video Info</h5>
      <div className="col-md-12">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Video Link"
            name="video"
            value={info?.video}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </div>
    </div>
    <div style={{ marginTop: "3rem" }}>
      <h5>Thumb nail</h5>
      <div className="col-md-12">
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="attachment"
            placeholder="Enter Title Of the Subject"
            ref={fileref}
            onChange={(e) => handleChange1(e)}
          />
        </div>
      </div>
    </div>
  </>
)}
                <div style={{ marginTop: "3rem" }}>
                  <h5>Type</h5>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select

                        id="section"
                        className="form-control"
                        name="type"
                        value={info?.type}
                        onChange={(e) => {
                          // setType(e.target.value)
                          handleChange(e);
                        }}
                      >
                        <option value="select"> Select </option>
                        <option value="Media"> Media </option>
                        <option value="Events"> Events </option>
                      </select>
                    </div>
                  </div>
                </div>
                {fileType === "Attachments" && (
                <div style={{ marginTop: "3rem" }}>
                  <h5>Attachment</h5>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control"
                        name="attachment"
                        placeholder="Enter Title Of the Subject"
                        ref={fileref}
                        onChange={(e) => handleChange1(e)}
                      />
                    </div>
                  </div>
                </div>
                )}
                
                

                <div className="form-group" style={{ marginTop: "3rem" }}>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        </>

      ) : (
       <HomeoInfo setLoading={setLoading} />
       )} 
    </div>
  );
}

export default MediaInfo;
