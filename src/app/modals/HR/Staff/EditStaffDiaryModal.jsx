import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { getFileUrl } from "../../../Helpers/Helpers";
import { ASSET_MEDIA } from "../../../utils/AssetsReferenceTypes";
import { STAFF_DAIRY_PUT } from "../../../utils/InfoUploadingApiConstants";

function EditStaffDairy({data,getData,setLoading,flag,setFlag}) {
  const [attachments, setAttachments] = useState(data.attachments || "");

  const fileref = useRef(null);
  // const [info, setInfo] = useState({
  //   title: data?.title,
  //   date: data?.date,
  //   from_time: data?.from_time,
  //   to_time: data?.to_time,
  //   attachments: data?.attachments,
  //   activity: data?.activity,
  //   content: data?.content,
  //   description: data?.description,
  // });

  // Initialize state with the data prop
  const [info, setInfo] = useState({
    title: data?.title || "",
    date: data?.date || "",
    from_time: data?.from_time || "",
    to_time: data?.to_time || "",
    activity: data?.activity || "",
    content: data?.content || "",
    description: data?.description || "",
  });

  // Update state when data prop changes
  useEffect(() => {
    setInfo({
      title: data?.title || "",
      date: data?.date || "",
      from_time: data?.from_time || "",
      to_time: data?.to_time || "",
      activity: data?.activity || "",
      content: data?.content || "",
      description: data?.description || "",
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If the selected activity changes, reset the sub_activity
    if (name === "activity") {
      setInfo((prev) => ({
        ...prev,
        content: "",
      }));
    }
  };

  const handleAttachmentsChange = (e) => {
    setAttachments(e.target.value);
  };

  const clearData = () => {
    setInfo({
      title: "",
      date: "",
      from_time: "",
      to_time: "",
      activity: "",
      content: "",
      attachments: "",
      description: "",
    });
    data.activity = ""
    data.title = ""
    data.from_time = ""
    data.to_time = ""
    data.date = ""
    data.content = ""
    data.attachments = ""
    data.description = ""
    fileref.current.value = null;
  };

  const handleSubmit = async () => {
    setLoading(1);
    if (
      !info?.title &&
      !info?.date &&
      !info?.from_time &&
      !info?.to_time &&
      !info?.activity &&
      !info?.content && !info.description
    ) {
      toast.error("Please Edit and Submit");
      return;
    }

    if (info.activity == 4 && info.content == "Others" && !info.description) {
      toast.error("Please Enter all the required Details");
      return;
    }

    const emp_id = sessionStorage.getItem("employee_id"); // Retrieve role

    const dataToSend = {
      ...info,
      emp_id: emp_id,
      college_id: sessionStorage.getItem("college_id"),
      department_id: sessionStorage.getItem("department_id"),
    };

    const config = {
      method: "put",
      url: `${STAFF_DAIRY_PUT}/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${sessionStorage.getItem('INFO_UPLOADING_AUTH')}`
      },
      data: dataToSend,
    };

    axios(config)
      .then((res) => {
        toast.success("Succesfully Uploaded Details");
        clearData();
        setFlag((flag)=>!flag)
        getData()
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(0);
  };

  const handleChange1 = async (e) => {
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

  let arr1 = [
    {
      id: 1,
      title: "Direct Teaching (Assigned)",
    },
    {
      id: 2,
      title: "Examination Duties",
    },
    {
      id: 3,
      title: "Student Related Co-Curricular Activities",
    },
    {
      id: 4,
      title: "Other Activities",
    },
    {
      id: 5,
      title: "Professional Development Activities",
    },
    {
      id: 6,
      title: "Administrative Responsibility",
    },
    {
      id: 7,
      title: "Research and Academic Contributions",
    },
  ];

  let arr2 = [
    {
      id: 1,
      title: "Theory ",
    },
    {
      id: 1,
      title: "Practical/Lab ",
    },
    {
      id: 1,
      title: "Clinics ",
    },
    {
      id: 1,
      title: "Tutorials ",
    },
    {
      id: 1,
      title: "Non-Lecture ",
    },
    {
      id: 1,
      title: "Project Supervision ",
    },
    {
      id: 1,
      title: "Other Relevant Activities ",
    },
    {
      id: 1,
      title: "Medical Pharmacy ",
    },

    {
      id: 2,
      title: "Question Paper Setting ",
    },
    {
      id: 2,
      title: "Invigilation ",
    },
    {
      id: 2,
      title: "Flying Squad ",
    },
    {
      id: 2,
      title: "Exam Center Arrangement  ",
    },

    {
      id: 2,
      title: "Unfair Menace Committee ",
    },
    {
      id: 2,
      title: "Internal Assessment ",
    },
    {
      id: 2,
      title: "External Assessment ",
    },
    {
      id: 2,
      title: "Re-evaluation ",
    },

    {
      id: 3,
      title: "Field studies/Study tour ",
    },
    {
      id: 3,
      title: "Student Seminar ",
    },
    {
      id: 3,
      title: "Remedial Classes ",
    },
    {
      id: 3,
      title: "Career Counselling ",
    },
    {
      id: 3,
      title: "Quiz, debate, elocution (on subject) ",
    },
    {
      id: 3,
      title: "Essay competition on subject ",
    },
    {
      id: 3,
      title: "Exhibition ",
    },
    {
      id: 3,
      title: "Subject/faculty day celebration ",
    },
    {
      id: 3,
      title: "Survey conduction ",
    },
    {
      id: 3,
      title: "Subject Association Activity ",
    },
    {
      id: 3,
      title: "Cultural program coordinator ",
    },
    {
      id: 3,
      title: "NSS Activities ",
    },
    {
      id: 3,
      title: "Tree Plantation ",
    },
    {
      id: 3,
      title: "Blood Donation Camp ",
    },
    {
      id: 3,
      title: "Public lecture delivered (on subject) ",
    },
    {
      id: 3,
      title: "Talks delivered as guest ",
    },
    {
      id: 3,
      title: "Seminars in public interest ",
    },
    {
      id: 3,
      title: "Organizing subject related event like lecture on special topics ",
    },

    {
      id: 4,
      title: "Mentoring ",
    },
    {
      id: 4,
      title: "Preparation of Study Material ",
    },
    {
      id: 4,
      title: "Sports Convenor ",
    },
    {
      id: 4,
      title: "Medical Camp ",
    },
    {
      id: 4,
      title: "Hospital Duity ",
    },
    {
      id: 4,
      title: "Others",
    },

    {
      id: 5,
      title: "Participation in Seminar/Conference ",
    },
    {
      id: 5,
      title: "Short Term training Course ",
    },
    {
      id: 5,
      title: "Talks/lectures  ",
    },

    {
      id: 6,
      title: "Participation in BOS/Academic Council/Ph.D meeting  ",
    },
    {
      id: 6,
      title: "Resource Person/ Speaker for subject related event  ",
    },
    {
      id: 6,
      title: "Referee/judge for subject related event etc.  ",
    },
    {
      id: 6,
      title: "Admission Committee work  ",
    },
    {
      id: 6,
      title: "Library Committee Meeting  ",
    },
    {
      id: 6,
      title: "SPARSH Committee Meeting  ",
    },

    {
      id: 7,
      title: "Research Paper/Book Writing ",
    },
    {
      id: 7,
      title: "Patent/Technology Transfer Work ",
    },
    {
      id: 7,
      title: "Product Development Work ",
    },
    {
      id: 7,
      title: "Research Project Work ",
    },
    {
      id: 7,
      title: "Research Guidance Work – Masters ",
    },
    {
      id: 7,
      title: "Research Guidance Work – Ph.D. ",
    },
    {
      id: 7,
      title: "Development of e-learning material ",
    },
  ];

  return (
    <div className='EditStaffDairy'>
      <div
      className="modal fade"
                id="EditStaffDairy"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
      >
        <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
                    role="document"
        >
          <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-primary">Edit Staff Diary</h3>
              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="form-control"
                    name="title"
                    value={info?.title ? info?.title : data.title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter Date"
                    className="form-control"
                    name="date"
                    value={info?.date ? info?.date : data.date}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">
                    From Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    placeholder="Enter Time"
                    className="form-control"
                    name="from_time"
                    value={info?.from_time ? info?.from_time : data.from_time}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">
                    To Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    placeholder="Enter Time"
                    className="form-control"
                    name="to_time"
                    value={info?.to_time ? info?.to_time : data.to_time}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">
                    Activity <span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    placeholder="Select Activity"
                    className="form-control"
                    name="activity"
                    value={info?.activity ? info?.activity : data.activity}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">
                      Select Activity <span className="text-danger">*</span>
                    </option>
                    {arr1?.map((item, key) => {
                      return (
                        <option value={item?.id} key={key}>
                          {item?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Sub Activity</label>
                  <select
                    type="text"
                    placeholder="Select  Sub Activity"
                    className="form-control"
                    name="content"
                    value={info?.content ? info?.content : data.content}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option>Select Sub Activity</option>
                    {arr2
                      .filter((s) => s.id === parseInt(info?.activity))
                      .map((item, key) => (
                        <option value={item?.title} key={key}>
                          {item?.title}
                        </option>
                      ))}
                  </select>
                  {info.activity == 4 && info.content == "Others" ? (
                    <span className="text-danger">
                      Please Mention Other Sub Activity in Description
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">Attachments</label>
                  <input
                    type="file"
                    placeholder="Attach the file"
                    className="form-control"
                    name="attachments"
                    // value={info?.attachments ? info?.attachments : data.attachments}
                    ref={fileref}
                    onChange={(e) => {
                      handleChange1(e);
                    }}
                  /> 
                  {/* {data.attachments && (
                    <a href={data.attachments} target="_blank" className="badge badge-pill badge-success">View</a>
                  )}                */}
                    <div>
                      {data.attachments?.split(",")[0] ? (
                        <>
                          Uploaded &nbsp;&nbsp;&nbsp;
                          <span className="badge badge-success text-bg-primary text-light">

                            {data.attachments && (
                              <a href={data.attachments} target="_blank" 
                                 className="badge badge-pill badge-success"
                              >View</a>
                            )} 

                          </span>
                        </>
                      ) : (
                        "Not yet uploaded"
                      )}
                    </div>
                  </div>
              </div>

              <div className="col-md-12 mt-4">
                <div className="form-group">
                  <label htmlFor="">Description</label>
                  <textarea
                    placeholder="Enter Descripion"
                    className="form-control"
                    name="description"
                    value={info?.description ? info?.description : data.description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    id="description"
                    cols="30"
                    rows="3"
                  ></textarea>
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
      </div>
      <br />
      <br />
    </div>
  );
}

export default EditStaffDairy;
