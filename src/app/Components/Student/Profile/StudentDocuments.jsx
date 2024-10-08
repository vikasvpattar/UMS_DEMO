import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { STUDENT_ADMISSION } from "../../../utils/apiConstants";
import OtherDocs from "../../../modals/Students/OtherDocs";
import Swal from "sweetalert2";
import DocumentsModal from "../../../modals/Students/DocumentsModal";

const StudentDocuments = ({ id, setLoading, collegeId, setStudentDetails }) => {
  const [info, setInfo] = useState({});

  const [user, setUser] = useState();

  const [link, setLink] = useState("");

  const [title, setTitle] = useState("");

  let type = "";
  function isStringified(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return str;
    }
  }

  const getData = async () => {
    setLoading(1);
    const config = {
      method: "get",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(async (res) => {
        setLoading(0);
        console.log(res.data.data);
        try {
          if (res.data.data.aadhar) {
            res.data.data.aadhar = isStringified(res.data.data?.aadhar);
          }
          if (res.data.data.pu_markscard) {
            res.data.data.pu_markscard = isStringified(
              res.data.data?.pu_markscard
            );
          }
          if (res.data.data.sslc_markscard) {
            res.data.data.sslc_markscard = isStringified(
              res.data.data?.sslc_markscard
            );
          }
          if (res.data.data.other_docs) {
            res.data.data.other_docs = isStringified(res.data.data?.other_docs);
            console.log(res.data.data.other_docs);
          }
        } catch (error) {
          console.log(error);
        }
        await setUser(res.data.data);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response?.data.message);
      });
  };

  let role = sessionStorage.getItem("role");
  const handleEdit = async () => {
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${user?.user_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res.data.data);
        setLoading(0);
        toast.success("Successfully Updated");
        await getData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const handleEdit1 = async (id) => {
    let role = sessionStorage.getItem("role");
    console.log(id, typeof id);
    user?.other_docs?.forEach((element) => {
      if (element.title == id || element.id == id) {
        if (role == "SUPERADMIN") {
          element.status = "APPROVED";
          element.date_of_approval = new Date().toISOString();
        } else {
          element.status = "APPROVED1";
          element.date_of_approval = new Date().toISOString();
        }
      }
    });

    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${user?.user_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res.data.data);
        setLoading(0);
        await getData();
        toast.success("Successfully Updated");
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const handleEdit2 = async () => {
    console.log(type);
    const { value: reason } = await Swal.fire({
      title: "Enter Reason",
      input: "text",
      inputLabel: "Your Reason",
      inputPlaceholder: "Please Enter Reason",
    });

    if (reason) {
      user[type].reason = reason;
      console.log(user[type]);

      setLoading(1);
      const config = {
        method: "put",
        url: `${STUDENT_ADMISSION}/${user?.user_id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: user,
      };

      await axios(config)
        .then(async (res) => {
          console.log(res.data.data);
          setLoading(0);
          toast.success("Successfully Updated");
          await getData();
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        });
    }
  };

  const handleEdit3 = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Enter Reason",
      input: "text",
      inputLabel: "Your Reason",
      inputPlaceholder: "Please Enter Reason",
    });

    if (reason) {
      let role = sessionStorage.getItem("role");

      user?.other_docs?.forEach((element) => {
        if (element.title == id || element.id == id) {
          if (role == "SUPERADMIN") {
            element.status = "REJECTED";
            element.reason = reason;
            element.rejectiondate = new Date().toISOString();
          } else {
            element.status = "REJECTED1";
            element.reason = reason;
            element.rejectiondate = new Date().toISOString();
          }
        }
      });

      setLoading(1);
      const config = {
        method: "put",
        url: `${STUDENT_ADMISSION}/${user?.user_id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: user,
      };

      await axios(config)
        .then(async (res) => {
          console.log(res.data.data);
          setLoading(0);
          toast.success("Successfully Updated");
          await getData();
        })
        .catch((err) => {
          setLoading(0);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="StudentDocuments">
      <OtherDocs
        getData={getData}
        setLoading={setLoading}
        data={user?.other_docs}
        id={user?.user_id}
      />
      <DocumentsModal img={link} title={title} setLink={setLink} />
      <div className="row">
        <div className="col-8 my-2">Documents Attached</div>
        <div className="col-4">
          <button
            className="btn float-right btn-primary btn-sm"
            type="submit"
            data-toggle="modal"
            data-target="#OtherDocs"
            name="submit"
          >
            Upload Other Documents
          </button>
        </div>
        <div className="col-12">
          <table className="table table-bordered nowrap overflow-auto">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Document</th>
                <th>Status</th>
                <th style={{ maxWidth: "100px" }}>Attachment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>10th Marks Sheet</td>
                <td>
                  {user?.sslc_markscard?.status == "APPROVED1"
                    ? <span className = "badge badge-soft-success">APPROVED BY DEAN</span>
                    : user?.sslc_markscard?.status == "REJECTED"
                    ? <span className = "badge badge-soft-danger">REJECTED BY REGISTRAR</span>
                    : user?.sslc_markscard?.status == "REJECTED1"
                    ? <span className = "badge badge-soft-danger">REJECTED BY DEAN</span>
                    : user?.sslc_markscard?.status == "APPROVED"
                    ? <span className = "badge badge-soft-success">APPROVED BY REGISTRAR</span>
                    : user?.sslc_markscard?.link.length > 0
                    ? <span className = "badge badge-soft-danger">PENDING</span>
                    : <span className = "badge badge-soft-danger">NOT UPLOADED</span>}
                </td>
                <td>
                  {user?.sslc_markscard?.link?.length > 0 ? (
                    <button
                      onClick={() => {
                        setLink(user?.sslc_markscard?.link);
                        setTitle("SSLC Marks Card");
                      }}
                      data-toggle="modal"
                      data-target="#DocumentsModal"
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  ) : null}
                </td>
                {user?.sslc_markscard?.link ? (
                  role == "SUPERADMIN" &&
                  (user?.sslc_markscard?.status == "APPROVED" ||
                    user?.sslc_markscard?.status == "REJECTED") ? null : role ==
                    "SUPERADMIN" ? (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "sslc_markscard";
                          if (role == "SUPERADMIN") {
                            user.sslc_markscard.status = "REJECTED";
                            user.sslc_markscard.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.sslc_markscard.status = "REJECTED1";
                            user.sslc_markscard.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.sslc_markscard.status = "APPROVED1";
                            user.sslc_markscard.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.sslc_markscard.status = "APPROVED";
                            user.sslc_markscard.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  ) : role == "ADMIN" &&
                    (user?.sslc_markscard?.status == "APPROVED1" ||
                      user?.sslc_markscard?.status == "APPROVED" ||
                      user?.sslc_markscard?.status == "REJECTED1" ||
                      user?.sslc_markscard?.status == "REJECTED") ? null : (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "sslc_markscard";
                          if (role == "SUPERADMIN") {
                            user.sslc_markscard.status = "REJECTED";
                            user.sslc_markscard.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.sslc_markscard.status = "REJECTED1";
                            user.sslc_markscard.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.sslc_markscard.status = "APPROVED1";
                            user.sslc_markscard.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.sslc_markscard.status = "APPROVED";
                            user.sslc_markscard.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  )
                ) : null}
              </tr>
              <tr>
                <td>2</td>
                <td>12th Marks Sheet</td>
                <td>
                  {user?.pu_markscard?.status == "APPROVED1"
                    ? <span className = "badge badge-soft-success">APPROVED BY DEAN</span>
                    : user?.pu_markscard?.status == "REJECTED"
                    ? <span className = "badge badge-soft-danger">REJECTED BY REGISTRAR</span>
                    : user?.pu_markscard?.status == "REJECTED1"
                    ? <span className = "badge badge-soft-danger">REJECTED BY DEAN</span>
                    : user?.pu_markscard?.status == "APPROVED"
                    ? <span className = "badge badge-soft-success">APPROVED BY REGISTRAR</span>
                    : user?.pu_markscard?.link?.length > 0
                    ? <span className = "badge badge-soft-danger">PENDING</span>
                    : <span className = "badge badge-soft-danger">NOT UPLOADED</span>}
                </td>
                <td>
                  {user?.pu_markscard?.link?.length > 0 ? (
                    <button
                      onClick={() => {
                        setLink(user?.pu_markscard?.link);
                        setTitle("PU Marks Card");
                      }}
                      data-toggle="modal"
                      data-target="#DocumentsModal"
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  ) : null}
                </td>

                {user?.pu_markscard?.link ? (
                  role == "SUPERADMIN" &&
                  (user?.pu_markscard?.status == "APPROVED" ||
                    user?.pu_markscard?.status == "REJECTED") ? null : role ==
                    "SUPERADMIN" ? (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "pu_markscard";
                          if (role == "SUPERADMIN") {
                            user.pu_markscard.status = "REJECTED";
                            user.pu_markscard.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.pu_markscard.status = "REJECTED1";
                            user.pu_markscard.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.pu_markscard.status = "APPROVED1";
                            user.pu_markscard.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.pu_markscard.status = "APPROVED";
                            user.pu_markscard.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  ) : role == "ADMIN" &&
                    (user?.pu_markscard?.status == "APPROVED1" ||
                      user?.pu_markscard?.status == "APPROVED" ||
                      user?.pu_markscard?.status == "REJECTED1" ||
                      user?.pu_markscard?.status == "REJECTED") ? null : (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "pu_markscard";
                          if (role == "SUPERADMIN") {
                            user.pu_markscard.status = "REJECTED";
                            user.pu_markscard.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.pu_markscard.status = "REJECTED1";
                            user.pu_markscard.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.pu_markscard.status = "APPROVED1";
                            user.pu_markscard.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.pu_markscard.status = "APPROVED";
                            user.pu_markscard.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  )
                ) : null}
              </tr>
              <tr>
                <td>3</td>
                <td>Student Photo</td>
                <td>
                  {user?.student_picture?.length > 0
                    ? <span className = "badge badge-soft-success">UPLOADED</span>
                    : <span className = "badge badge-soft-danger">NOT UPLOADED</span>}
                </td>
                <td>
                  {user?.student_picture?.length > 0 ? (
                    <button
                      onClick={() => {
                        setLink(user?.student_picture);
                        setTitle("Student Picture");
                      }}
                      data-toggle="modal"
                      data-target="#DocumentsModal"
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Aadhar Card</td>
                <td>
                  {user?.aadhar?.status == "APPROVED1"
                    ? <span className = "badge badge-soft-success">APPROVED BY DEAN</span>
                    : user?.aadhar?.status == "REJECTED"
                    ? <span className = "badge badge-soft-danger">REJECTED BY REGISTRAR</span>
                    : user?.aadhar?.status == "REJECTED1"
                    ? <span className = "badge badge-soft-danger">REJECTED BY DEAN</span>
                    : user?.aadhar?.status == "APPROVED"
                    ? <span className = "badge badge-soft-success">APPROVED BY REGISTRAR</span>
                    : user?.aadhar?.link?.length > 0
                    ? <span className = "badge badge-soft-danger">PENDING</span>
                    : <span className = "badge badge-soft-danger">NOT UPLOADED</span>}
                </td>
                <td>
                  {user?.aadhar?.link?.length > 0 ? (
                    <button
                      onClick={() => {
                        setLink(user?.aadhar?.link);
                        setTitle("Aadhar Card");
                      }}
                      data-toggle="modal"
                      data-target="#DocumentsModal"
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>
                  ) : null}
                </td>
                {user?.aadhar?.link ? (
                  role == "SUPERADMIN" &&
                  (user?.aadhar?.status == "APPROVED" ||
                    user?.aadhar?.status == "REJECTED") ? null : role ==
                    "SUPERADMIN" ? (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "aadhar";
                          if (role == "SUPERADMIN") {
                            user.aadhar.status = "REJECTED";
                            user.aadhar.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.aadhar.status = "REJECTED1";
                            user.aadhar.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.aadhar.status = "APPROVED1";
                            user.aadhar.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.aadhar.status = "APPROVED";
                            user.aadhar.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  ) : role == "ADMIN" &&
                    (user?.aadhar?.status == "APPROVED1" ||
                      user?.aadhar?.status == "APPROVED" ||
                      user?.aadhar?.status == "REJECTED1" ||
                      user?.aadhar?.status == "REJECTED") ? null : (
                    <td>
                      <a
                        className="badge badge-light text-danger mr-3"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        title="Discard"
                        onClick={() => {
                          type = "aadhar";
                          if (role == "SUPERADMIN") {
                            user.aadhar.status = "REJECTED";
                            user.aadhar.rejectiondate =
                              new Date().toISOString();
                          } else {
                            user.aadhar.status = "REJECTED1";
                            user.aadhar.rejectiondate =
                              new Date().toISOString();
                          }
                          handleEdit2();
                        }}
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </a>
                      <a
                        className="badge badge-light text-success mr-3"
                        data-toggle="tooltip"
                        title="Approve"
                        onClick={() => {
                          if (role == "ADMIN") {
                            user.aadhar.status = "APPROVED1";
                            user.aadhar.date_of_approval =
                              new Date().toISOString();
                          } else {
                            user.aadhar.status = "APPROVED";
                            user.aadhar.date_of_approval =
                              new Date().toISOString();
                          }
                          handleEdit();
                        }}
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </a>
                    </td>
                  )
                ) : null}
              </tr>
              {user?.other_docs?.length > 0
                ? user?.other_docs?.map((item, key) => {
                    return (
                      <tr>
                        <td>{4 + key + 1}</td>
                        <td>{item?.title}</td>
                        <td>
                          {item?.status == "APPROVED1"
                            ? <span className = "badge badge-soft-success">APPROVED BY DEAN</span>
                            : item?.status == "REJECTED"
                            ? <span className = "badge badge-soft-danger">REJECTED BY REGISTRAR</span>
                            : item?.status == "REJECTED1"
                            ? <span className = "badge badge-soft-danger">REJECTED BY DEAN</span>
                            : item?.status == "APPROVED"
                            ? <span className = "badge badge-soft-success">APPROVED BY REGISTRAR</span>
                            : item?.status}
                        </td>
                        <td>
                          {item?.link?.length > 0 ? (
                            <button
                              onClick={() => {
                                setLink(item?.link);
                                setTitle(item?.title);
                              }}
                              data-toggle="modal"
                              data-target="#DocumentsModal"
                              className="btn btn-primary btn-sm"
                            >
                              View
                            </button>
                          ) : null}
                        </td>
                        {role == "SUPERADMIN" &&
                        (item?.status == "APPROVED" ||
                          item?.status == "REJECTED") ? null : role ==
                          "SUPERADMIN" ? (
                          <td>
                            <a
                              className="badge badge-light text-danger mr-3"
                              title="Discard"
                              onClick={() => {
                                item?.id
                                  ? handleEdit3(item?.id)
                                  : handleEdit3(item?.title);
                              }}
                            >
                              <i class="fa fa-minus" aria-hidden="true"></i>
                            </a>
                            <a
                              className="badge badge-light text-success mr-3"
                              title="Approve"
                              onClick={() => {
                                item?.id
                                  ? handleEdit1(item?.id)
                                  : handleEdit1(item?.title);
                              }}
                            >
                              <i class="fa fa-check" aria-hidden="true"></i>
                            </a>
                          </td>
                        ) : role == "ADMIN" &&
                          (item?.status == "APPROVED1" ||
                            item?.status == "APPROVED" ||
                            item?.status == "REJECTED" ||
                            item?.status == "REJECTED1") ? null : (
                          <td>
                            <a
                              className="badge badge-light text-danger mr-3"
                              title="Discard"
                              onClick={() => {
                                item?.id
                                  ? handleEdit3(item?.id)
                                  : handleEdit3(item?.title);
                              }}
                            >
                              <i class="fa fa-minus" aria-hidden="true"></i>
                            </a>
                            <a
                              className="badge badge-light text-success mr-3"
                              title="Approve"
                              onClick={() => {
                                item?.id
                                  ? handleEdit1(item?.id)
                                  : handleEdit1(item?.title);
                              }}
                            >
                              <i class="fa fa-check" aria-hidden="true"></i>
                            </a>
                          </td>
                        )}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDocuments;
