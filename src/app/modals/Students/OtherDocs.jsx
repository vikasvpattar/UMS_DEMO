import React from "react";
import { useState, useRef } from "react";
import { ASSET_EMPLOYEE_IMAGE } from "../../utils/AssetsReferenceTypes";
import { getFileUrl } from "../../Helpers/Helpers";
import { toast } from "react-toastify";
import { STUDENT_ADMISSION } from "../../utils/apiConstants";
import axios from "axios";

function OtherDocs({ getData, setLoading, data, id }) {
  const fileref = useRef(null);

  const modalRef = useRef(null);

  const [info, setInfo] = useState({
    title: "",
    link: "",
    status: "PENDING",
    reason: "",
  });

  function isStringified(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return str;
    }
  }

  const handleSubmit = async () => {
    if (isStringified(data)) {
      info.id = data.length + 1;
      data.push(info);
    } else {
      data = [];
      info.id = 1;
      data.push(info);
    }

    console.log(data);
    // return;
    setLoading(1);
    const config = {
      method: "put",
      url: `${STUDENT_ADMISSION}/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: {
        other_docs: data,
      },
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        toast.success("Successfully Updated Details");
        modalRef.current && modalRef.current.click();
        getData();
        setInfo({
          title: "",
          link: "",
          status: "PENDING",
          reason: "",
        });
        fileref.current.value = null;
      })
      .catch((err) => {
        console.log(err);
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

  const handleChange1 = async (e) => {
    setLoading(1);
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_IMAGE,
        "STUDENT_OTHER_DOCS",
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setInfo((prev) => ({
        ...prev,
        link: d,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="OtherDocs">
      <div
        className="modal fade"
        id="OtherDocs"
        ref={modalRef}
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
              <h3 className="text-primary">Upload Other Documents</h3>
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
                      value={info?.title}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      Link <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="date"
                      ref={fileref}
                      onChange={(e) => {
                        handleChange1(e);
                      }}
                    />
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

export default OtherDocs;
