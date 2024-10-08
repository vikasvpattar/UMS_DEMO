import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import {
  HOMEO_EVENT_UPLOAD,
  HOMEO_GET,
  HOMEO_UPDATE,
} from "../../utils/InfoUploadingApiConstants";
import { AWS_URL_GENERATOR } from "../../utils/apiConstants";
import { getFileUrl } from "../../Helpers/Helpers";
import { ASSET_HOMEOMEDIA } from "../../utils/AssetsReferenceTypes";
import { EMPLOYEE_ALL } from "../../utils/apiConstants";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import HomeoEventModal from "../../modals/Events/HomeoEventModal";
import DocumentsModal from "../../modals/Students/DocumentsModal";
import EventsDocumentsModal from "../../modals/Students/EventsDocumentsModal";

const HomeoInfo = ({ setLoading, collegeId }) => {
  const fileref = useRef(null);

  const [attachments, setAttachments] = useState([]);

  const [insertedimages, setInsertedImages] = useState([]);

  const [data, setData] = useState([]);

  const [flag, setFlag] = useState(false);

  const [data1, setData1] = useState([]);
  const [edit, setEdit] = useState(false);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  let modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  let formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const [info, setInfo] = useState({
    title: "",
    date: "",
    description: "",
    attachments: "",
  });

  const clearData = () => {
    setInfo({
      title: "",
      date: "",
      description: "",
      attachments: "",
    });
    fileref.current.value = null;
    localStorage.removeItem("event_images");
  };

  const handleSubmit = async () => {
    if (!info?.date || !info?.title || !info?.description) {
      toast.error("Please Enter all the required Details");
      return;
    }

    let existingImages = JSON.parse(localStorage.getItem("event_images"));
    if (attachments && existingImages) {
      existingImages = [...existingImages, ...attachments];
    }
    setLoading(1);
    // Retrieve college_id from session storage
    const college_id = sessionStorage.getItem("college_id");
    const config = {
      method: "post",
      url: HOMEO_EVENT_UPLOAD,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        ...info,
        attachments: existingImages
          ? existingImages
          : attachments
          ? attachments
          : "",
        college_id: college_id,
      },
    };

    axios(config)
      .then((res) => {
        // console.log("college_id"+res);
        toast.success("Succesfully Updated Details");
        clearData();
        getData();
        setLoading(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(0);
      });

    const config1 = {
      method: "get",
      url: EMPLOYEE_ALL,
      // url: EMPLOYEE_ALL? `${EMPLOYEE_ALL}/${"college_id"}`:null,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config1)
      .then((res) => {
        console.log(res.data.data);
        // setData1(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const Change = async (e) => {
  //   let files = [];
  //   // return;
  //   for (let i of e.target.files) {
  //     console.log(i);
  //     try {
  //       const d = await getFileUrl(
  //         ASSET_HOMEOMEDIA,
  //         "Homoeopathy_Assets/Events",
  //         i?.name.split(".")[1],
  //         setLoading,
  //         i
  //       );
  //       files.push(d);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   setAttachments(files);
  // };

  //Only Images are allowed
  const Change = async (e) => {
    let files = [];

    for (let i of e.target.files) {
      if (i.type === "application/pdf") {
        toast.error("PDF files are not allowed.");
        continue;
      }
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
    setLoading(1);
    const collegeid = sessionStorage.getItem("college_id");

    const config = {
      method: "get",
      url: HOMEO_GET,
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
        console.log(res.data.data);
        setLoading(0);
        setData(res.data.data.filter((item) => item.college_id == collegeid));
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApprove = (id) => {
    const config = {
      method: "put",
      url: `${HOMEO_UPDATE}/${id}`,
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
        toast.success("Successfully ACTIVE");
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: "ACTIVE" } : item
        );
        setData(updatedData);
        getData();
      })
      .catch((err) => {
        setLoading(0);
        toast.error("Something Went Wrong");
      });
  };

  const handleEdit = async () => {
    setLoading(true);

    const existingImages = JSON.parse(localStorage.getItem("event_images"));

    const requestData = {
      ...info,
      attachments: attachments.length > 0 ? attachments : existingImages,
    };

    const config = {
      method: "put",
      url: `${HOMEO_UPDATE}/${info.id}`,
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
      url: `${HOMEO_UPDATE}/${deletedItem?.id}`,
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

  const handleChangeQuill = (content, delta, source, editor) => {
    const insertedImages = delta.ops.filter(
      (op) => op.insert && op.insert.image
    );

    let textWithImages = editor.getHTML();
    if (insertedImages.length > 0) {
      setInsertedImages([...insertedimages, textWithImages]);
      handleImageUpload(insertedImages);
    } else {
      let textWithoutImages = editor.getHTML();
      insertedimages.forEach((image) => {
        textWithoutImages = textWithoutImages.replace(image, "");
      });
      handleTextInsertion(textWithoutImages);
    }
  };

  function dataURItoBlob(dataURI) {
    // Convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(",")[1]);

    // Separate the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // Write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob with the ArrayBuffer
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  const handleImageUpload = async (images) => {
    // Function to handle image upload
    setLoading(1);
    let x = images[0].insert.image.indexOf(";");
    const imgType = images[0].insert.image.slice(5, x);
    const binaryData = images[0].insert.image;
    const file = new File([dataURItoBlob(binaryData)], "HomeoPathyEventImage", {
      type: imgType,
    });

    let existingImages = JSON.parse(localStorage.getItem("event_images"));
    let url;
    const config = {
      method: "post",
      url: AWS_URL_GENERATOR,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        referenceId: "Homoeopathy_Assets/Events",
        fileExtension: "HomeoPathyEventImage",
        referenceType: ASSET_HOMEOMEDIA,
        fileType: file.type,
      },
    };

    await axios(config)
      .then(async (res) => {
        const config2 = {
          method: "put",
          url: res.data.url,
          headers: {
            "Content-Type": file.type,
          },
          data: file,
        };

        await axios(config2)
          .then((data) => {
            url = res.data.url.split("?")[0];
            if (existingImages) {
              existingImages.push(url);
              existingImages = JSON.stringify(existingImages);
            } else {
              existingImages = [];
              existingImages.push(url);
              existingImages = JSON.stringify(existingImages);
            }
            localStorage.setItem("event_images", existingImages);
            toast.success("Image or Document Successfully Uploaded");
            setLoading(0);
          })
          .catch((err) => {
            console.log(err);
            setLoading(0);
            toast.error("Something went wrong");
          });
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleTextInsertion = (text) => {
    // Function to handle text insertion
    setInfo((prev) => ({
      ...prev,
      ["description"]: text,
    }));
  };

  console.log("data1 -", data1);

  return (
    <div>
      <EventsDocumentsModal title={title} img={link} setLink={setLink} />
      {/* {flag || !flag ? <HomeoEventModal data={data1} /> : null} */}
      <HomeoEventModal
        flag={flag}
        setFlag={setFlag}
        setLoading={setLoading}
        data={data1}
        getData={getData}
      />
      <div className="row">
        <div className="col-12 mt-4">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h5 className="ml-4">Upload Event Details</h5>
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
                  <div className="form-group">
                    <label>
                      {" "}
                      Title <span style={{ color: "red" }}>*</span>
                    </label>
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
                    <label>
                      {" "}
                      Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      placeholder="Enter Title Of the Subject"
                      // value={info?.date}
                      value={info?.date ? info?.date?.split("T")[0] : ""}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">
                      Attachments<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      multiple="multiple"
                      type="file"
                      className="form-control"
                      name="attachments"
                      placeholder="Enter Title Of the Subject"
                      ref={fileref}
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
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <ReactQuill
                      theme="snow"
                      // value={value}
                      value={info?.description}
                      onChange={handleChangeQuill}
                      modules={modules}
                      formats={formats}
                      style={{ height: "100px" }} // Adjust the height value as needed
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />

              {/* <div className="row  mr-5 mt-5 float-right">
                <button
                  className="btn btn-nex btn-rounded btn-primary float-right "
                  type="submit"
                  name="submit"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-save" aria-hidden="true" />
                  Save
                </button>
              </div> */}

              <div className="row mr-5">
                <div className="col-md-12 ml-auto">
                  {edit == false ? (
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
                  ) : (
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
              <h5 class="text-primary"> EVENTS LIST </h5>
            </div>

            <div className="card-body">
              <br />

              <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="1%">Sl.No.</th>
                      <th width="10%">Title</th>
                      <th width="50%">Description</th>
                      {/* <th width="4%">Attachments</th> */}
                      <th width="6%">Date</th>
                      <th width="2%">Status</th>
                      <th width="6%">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      data?.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item?.title}</td>
                            <td>{item?.description}</td>

                            <td>
                              {new Date(item?.date).toISOString().split("T")[0]}
                            </td>

                            {/* <td>{item?.status}</td> */}
                            <td>
                              {item?.status === "ACTIVE" ? (
                                <span className="badge badge-soft-success">
                                  {item?.status}
                                </span>
                              ) : (
                                <span className="badge badge-soft-danger">
                                  {item?.status}
                                </span>
                              )}
                            </td>

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
                                          attachments: item.attachments || "",
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
                                        handleDelete(item, "INACTIVE")
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
                                          attachments: item.attachments || "",
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
                                        handleDelete(item, "ACTIVE")
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
                            {/* <td>
                              <button
                                className="btn btn-primary btn-sm ml-3"
                                data-toggle="modal"
                                data-target="#HomeoEventModal"
                                onClick={() => {
                                  setFlag((flag) => !flag);
                                  setData1(item?.attachments);
                                }}
                              >
                                {" "}
                                View File{" "}
                              </button>
                            </td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeoInfo;
