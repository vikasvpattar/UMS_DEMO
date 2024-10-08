import React, { useState, useEffect } from "react";
import axios from "axios";
import Toggler from "../../../Components/Toggler/Toggler";
import {
  COLLEGE_SPECIALIZATION,
  DEPARTMENTS,
} from "../../../utils/apiConstants";
import { toast } from "react-toastify";

function ModalDepartments(props) {
  const [College, setCollege] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [program, setProgram] = useState("");
  const [checkbox, setCheckbox] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const CollegeData = JSON.parse(localStorage.getItem("ALL_DATA")).college;
  const allProgramData = JSON.parse(localStorage.getItem("ALL_DATA")).program;
  const allSpecializationData = JSON.parse(
    localStorage.getItem("ALL_DATA")
  ).specialization;

  const config = {
    method: props.type === "edit" ? "put" : "post",
    url: `${DEPARTMENTS}${props.type === "edit" ? "/" + props.data.id : ""}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    },
    data: {
      name: name,
      description: desc,
      college_id: College,
      status: checkbox ? "ACTIVE" : "INACTIVE",
      department_id: specialization,
      program_id: program,
    },
  };

  const clearData = () => {
    setCollege("");
    setProgram("");
    setSpecialization("");
    setCheckbox(true);
    setName("");
    setDesc("");
  };

  const SubmitModal = async () => {
    props.setLoading(1);

    await axios(config)
      .then((res) => {
        props.setLoading(0);
        console.log(res);
        clearData();
        toast.success("Department added successfully Successfully");
        props.reloadData();
      })
      .catch((err) => {
        props.setLoading(0);
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.type === "edit") {
      if (props.data) {
        setName(props.data.name);
        setDesc(props.data.description);
        setCollege(props.data.college_id);
        setProgram(props.data.program_id);
        setSpecialization(props.data.department_id);
        setCheckbox(props.data.status === "ACTIVE" ? true : false);
      }
    }

    if (props.type === "add") {
      clearData();
    }
  }, [props.data, props.type]);

  // const [programData, setProgramData] = useState([]);

  // const selectProgram = (id) => {
  //     console.log(id)
  //     // setProgramDat(allSpecializationData.filter(item.colleg_type_id => item.program_id == id));
  // }

  return (
    <div className="ModalDepartments">
      <div
        className="modal fade"
        id="ModalDepartments"
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
                {props.type === "edit" ? "Edit" : "Add"} Department
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
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Name <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Department Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Code <span style={{ color: "red" }}>*</span>
                    </lable>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Department Code"
                      value={specialization}
                      onChange={(e) => {
                        setSpecialization(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      College <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name=""
                      className={`form-control ${
                        props.type === "edit" ? "cursor-disable" : ""
                      }`}
                      value={College}
                      disabled={props.type === "edit" ? true : false}
                      onChange={(e) => {
                        setCollege(e.target.value);
                      }}
                    >
                      <option value="">Select the College</option>
                      {CollegeData?.map((i, key) => (
                        <option value={i.id} key={key}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <lable>
                      {" "}
                      Program <span style={{ color: "red" }}>*</span>
                    </lable>
                    <select
                      name=""
                      className={`form-control ${
                        props.type === "edit" ? "cursor-disable" : ""
                      }`}
                      value={program}
                      disabled={props.type === "edit" ? true : false}
                      onChange={(e) => {
                        setProgram(e.target.value);
                      }}
                    >
                      <option value="">Select the College</option>
                      {allProgramData.map((i, key) => (
                        <option value={i.id} key={key}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Specialization <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <select
                                            name=""
                                            className={`form-control ${props.type === 'edit' ? 'cursor-disable' : ''}`}
                                            value={specialization}
                                            disabled={props.type === 'edit' ? true : false}
                                            onChange={(e) => { setSpecialization(e.target.value) }}
                                        >
                                            <option value="">Select the Specialization</option>
                                            {specializationData.map((i, key) => (
                                                <option value={i.id} key={key}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}
                {/* <div className="col-12">
                                    <div className="form-group">
                                        <lable>
                                            {" "}
                                            Code <span style={{ color: "red" }}>*</span>
                                        </lable>
                                        <input
                                            type="text"
                                            className={`form-control ${props.type==='edit'?'cursor-disable':''}`}
                                            name="followup"
                                            id=""
                                            readOnly={props.type==='edit'?true:false}
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                        />
                                    </div>
                                </div> */}
                <div className="col-12 mb-3">
                  <Toggler
                    defaultChecked={checkbox}
                    checked={checkbox}
                    checkboxValue={(e) => {
                      setCheckbox(e.target.checked);
                    }}
                  />
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <lable> Remark</lable>
                    <textarea
                      type="text"
                      className="form-control"
                      name="followup"
                      id=""
                      readOnly=""
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-between px-2">
                <button
                  className="btn btn-danger btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-rounded btn-outline"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    SubmitModal();
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

export default ModalDepartments;
