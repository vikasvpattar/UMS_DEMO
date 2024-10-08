import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { EMPLOYEE_LEGAL_DOCUMENTS } from "../../../utils/apiConstants";
import { ASSET_EMPLOYEE_DOCUMENT } from "../../../utils/AssetsReferenceTypes";
import { getFileUrl } from "../../../Helpers/Helpers";

function ModalStaffLegalDocs({ type, id, data, reloadData, setLoading }) {
  //option array of jobType
  const jobTypeOpt = ["Permanent", "Contracted", "Part Time", "Intership"];

  //object for all input values
  const [user, setUser] = useState({
    document_type: "",
    document_id: "",
    valid_from: "",
    valid_to: "",
    attachment: "",
  });

  const addAttachment = async (e) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_DOCUMENT,
        `${id}_Legal_Document`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setUser((prevValue) => ({
        ...prevValue,
        attachment: d ? d : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  //handleChange for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  //fuction to clear the input fields after completion of any operation
  const clearData = () => {
    setUser({
      document_type: "",
      document_id: "",
      valid_from: "",
      valid_to: "",
      attachment: "",
    });
  };

  //fuction to call after post or put
  const handleSubmit = async (d) => {
    //config for axios
    const config = {
      method: type === "edit" ? "put" : "post",
      url: `${EMPLOYEE_LEGAL_DOCUMENTS}${type === "edit" ? "/" + data.id : ""}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
      },
      data: {
        employee_id: id,
        ...user,
        status: d ? "INACTIVE" : "ACTIVE",
      },
    };

    setLoading(1);

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(res.data.message);
        console.log(res);
        reloadData();
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (type === "edit") {
      if (data) {
        setUser({
          document_type: data.document_type,
          document_id: data.document_id,
          valid_from: data.valid_from.split("T")[0],
          valid_to: data.valid_to.split("T")[0],
          attachment: data.attachment,
        });
      }
    }

    if (type === "add") {
      clearData();
    }
  }, [data]);

  return (
    <div className="ModalStaffLegalDocs">
      <div
        className="modal fade"
        id="ModalStaffLegalDocs"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered mw-100 w-75"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add New Legal Document
              </h5>
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
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Document Type <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      type="text"
                      className="form-control"
                      name="document_type"
                      value={user.document_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Document Type</option>
                      <option value="AADHAR">Aadhar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="VID">Voter ID</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Document Id <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="text"
                      className="form-control"
                      name="document_id"
                      value={user.document_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Valid From <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="date"
                      className="form-control"
                      name="valid_from"
                      value={user.valid_from}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable> Valid To</lable>
                    <input
                      type="date"
                      className="form-control"
                      name="valid_to"
                      value={user.valid_to}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable> Attachment</lable>
                    <input
                      type="file"
                      className="form-control"
                      name="attachement"
                      onChange={(e) => {
                        addAttachment(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <lable> Remark</lable>
                    <textarea
                      className="form-control"
                      name="followup"
                      defaultValue=""
                      placeholder="max 200 characters"
                      id=""
                      readOnly=""
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-between px-2">
                <button
                  className="btn btn-danger btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleSubmit(1);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleSubmit(1);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalStaffLegalDocs;
