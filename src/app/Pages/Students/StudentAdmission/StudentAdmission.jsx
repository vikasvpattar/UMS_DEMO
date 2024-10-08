import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ModalStudentAdmission from "../../../modals/Students/ModalStudentAdmission";
import { STUDENT_ADMISSION } from "../../../utils/apiConstants";
import {
  LOCAL_DEPARTMENT,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
import { SESSION_COLLEGE_ID } from "../../../utils/sessionStorageContants";
import axios from "axios";
import { toast } from "react-toastify";

function StudentAdmission({ setLoading }) {
  const getLocalProgram = () => {
    return localStorage.getItem(LOCAL_PROGRAM)
      ? JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
      : null;
  };

  const getLocalDepartment = () => {
    return localStorage.getItem(LOCAL_DEPARTMENT)
      ? JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
      : null;
  };

  const getCollegeId = () => {
    return sessionStorage.getItem(SESSION_COLLEGE_ID)
      ? sessionStorage.getItem(SESSION_COLLEGE_ID)
      : null;
  };

  const [programOpt, setProgramOpt] = useState(getLocalProgram());
  const [departmentOpt, setDepartmentOpt] = useState(getLocalDepartment());

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    marital_status: "",
    father_name: "",
    physically_handiCap: "",
    blood_grp: "",
    father_phone: "",
    mother_name: "",
    address: "",
    birth_place: "",
    dob: "",
    caste: "",
    sub_caste: "",
    nationality: "",
    state: "",
    city: "",
    student_picture: "",
    aadhar: "",
    sslc_markscard: "",
    date: "",
    joining_date: "",
    section: "",
    current_year: "",
    current_semester: "",
    year_of_admission: "",
    application_status: "",
    fee_status: "",
    college_id: getCollegeId(),
    program_id: "",
    department_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  console.log("Correct");

  //Handle Submit Function
  const handleSubmit = async () => {
    setLoading(1);

    const config = {
      method: "post",
      url: STUDENT_ADMISSION,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: info,
    };

    await axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(0);
        toast.error(err.response.data.message);
      });
  };

  //UseEffects

  useEffect(() => {
    setProgramOpt(getLocalProgram());
  }, [localStorage.getItem(LOCAL_PROGRAM)]);

  useEffect(() => {
    setDepartmentOpt(getLocalDepartment());
  }, [localStorage.getItem(LOCAL_DEPARTMENT)]);

  useEffect(() => {
    setInfo((prevValue) => ({
      ...prevValue,
      college_id: getCollegeId(),
    }));
  }, [sessionStorage.getItem(SESSION_COLLEGE_ID)]);

  return (
    <div className="StudentAdmission">
      <ModalStudentAdmission />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Students Admission</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Students Information</a>
                      </li>
                      <li className="breadcrumb-item active">
                        Student Admission
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="card-title">Register</h4>
                      </div>
                      <div className="col-md-8">
                        <a
                          className="btn btn-success btn-sm btn-rounded float-right ml-1"
                          href="assets/sample_students.csv"
                          download=""
                        >
                          <i className="fa fa-download" aria-hidden="true" />{" "}
                          Download Documents
                        </a>{" "}
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-primary btn-sm btn-rounded float-right"
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                          type="button"
                          name="submit"
                        >
                          <i className="fa fa-upload" aria-hidden="true" />{" "}
                          Upload Documents
                        </button>
                        {/* Modal */}
                      </div>
                      <hr />
                      <br />
                    </div>
                    <form action="" encType="" method="">
                      <br />
                      <div className="row">
                        {/* <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Admission Number<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder=" Enter Admission Number"
                        name="number"
                        required="required"
                      />
                    </div>
                  </div> */}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Admission Date{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={info.joining_date}
                              name="joining_date"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Program</label>
                            <select
                              className="form-control"
                              value={info.program_id}
                              name="program_id"
                              onChange={handleChange}
                            >
                              <option value="" selected>
                                Select Program
                              </option>
                              {programOpt &&
                                programOpt?.map((i, key) => (
                                  <option key={key} value={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Department</label>
                            <select
                              className="form-control"
                              value={info.department_id}
                              name="department_id"
                              onChange={handleChange}
                            >
                              <option value="" selected>
                                Select Department
                              </option>
                              {departmentOpt &&
                                departmentOpt?.map((i, key) => (
                                  <option key={key} value={i.id}>
                                    {i.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Class Year<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Class Year"
                              className="form-control"
                              value={info.current_year}
                              name="current_year"
                              onChange={(e) => {
                                setInfo((prev) => ({
                                  ...prev,
                                  year_of_admission: e.target.value,
                                  current_year: e.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Section <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              value={info.current_semester}
                              name="current_semester"
                              onChange={handleChange}
                            >
                              <option value=""> Select Section</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
            <br />
            {/* end page title */}
            <div className="row">
              <div className="col-md-4">
                <div className="box box-primary">
                  <div className="box-body box-profile">
                    <div className="card py-2">
                      <ul className="list-group list-group-unbordered pt-3">
                        <img
                          className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                          src={`/assets/images/Nexenstial Logo.jpg`}
                          width="50%"
                          style={{ aspectRatio: "1/1" }}
                        />
                        <br />
                        <h3 className="profile-username text-center">
                          {info?.name}
                        </h3>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>Phone :</b>{" "}
                          <a className="float-right text-aqua">{info?.phone}</a>
                        </li>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>Email :</b>{" "}
                          <a className="float-right text-aqua">{info?.email}</a>
                        </li>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>Program :</b>{" "}
                          <a className="float-right text-aqua">
                            {
                              programOpt?.find((s) => s.id == info?.program_id)
                                ?.name
                            }
                          </a>
                        </li>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>College :</b>{" "}
                          <a className="float-right text-aqua">
                            {info?.college_id}
                          </a>
                        </li>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>Department :</b>{" "}
                          <a className="float-right text-aqua">
                            {
                              departmentOpt?.find(
                                (s) => s.id == info?.department_id
                              )?.name
                            }
                          </a>
                        </li>
                        <li className="list-group-item listnoback d-flex justify-content-between">
                          <b>Gender :</b>{" "}
                          <a className="float-right text-aqua">
                            {info?.gender}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h4 className="card-title">Personal Details</h4>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            First Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Enter First Name"
                            value={info.name}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="gender"
                            id="gender"
                            className="form-control"
                            value={info.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Maritial Status{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="marital_status"
                            id="gender"
                            className="form-control"
                            value={info.marital_status}
                            onChange={handleChange}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Date of Birth<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={info.dob}
                            name="dob"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Email<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email ID"
                            value={info.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Mobile<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="mobile"
                            name="phone"
                            minLength={1}
                            maxLength={10}
                            value={info.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                    >
                      <option> Pleace Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="validationCustom01">Religion</label>
                    <input
                      type="text"
                      className="form-control"
                      id="religion"
                      name="religion"
                      placeholder="Enter Religion"
                    />
                  </div>
                </div> */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Caste</label>
                          <input
                            type="text"
                            className="form-control"
                            value={info?.caste}
                            name="caste"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Sub Caste</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Sub Caste"
                            value={info?.sub_caste}
                            name="sub_caste"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Birth Place
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Birth Place"
                            value={info?.birth_place}
                            name="birth_place"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Blood Group</label>
                          <select
                            value={info?.blood_grp}
                            onChange={handleChange}
                            name="blood_grp"
                            id=""
                            className="form-control"
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Physically Handicapped ?</label>
                          <select
                            value={info?.physically_handiCap}
                            onChange={handleChange}
                            name="physically_handiCap"
                            className="form-control"
                          >
                            <option value="">Select</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Nationality</label>
                          <input
                            type="text"
                            name="nationality"
                            className="form-control"
                            placeholder="Enter Nationality"
                            value={info.nationality}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">State</label>
                          <input
                            type="text"
                            name="state"
                            placeholder="Enter State"
                            className="form-control"
                            value={info.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            className="form-control"
                            value={info.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Address</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Address"
                            value={info?.address}
                            name="address"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Student Photo
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="std_image"
                            placeholder="Add Student Image"
                            name="student_picture"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-title my-3">
                      <h4 className="card-title">Guardians Details</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Father Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Father Name"
                            value={info?.father_name}
                            name="father_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Contact Number
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Father Phone"
                            minLength={1}
                            maxLength={10}
                            value={info?.father_phone}
                            name="father_phone"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Occupation <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text "
                            className="form-control"
                            id="focupation"
                            name="focupation"
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Photo</label>
                          <input
                            type="file"
                            className="form-control"
                            id="fphoto"
                            name="fphoto"
                          />
                        </div>
                      </div> */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Mother Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mother Name"
                            value={info?.mother_name}
                            name="mother_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Contact Number
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mother Phone"
                            id="mcontact"
                            name="mphone"
                            minLength={1}
                            maxLength={10}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Occupation </label>
                          <input
                            type="text "
                            className="form-control"
                            id="mocupation"
                            name="mocupation"
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Photo</label>
                          <input
                            type="file"
                            className="form-control"
                            id="mphoto"
                            name="mphoto"
                          />
                        </div>
                      </div> */}
                    </div>
                    <br />
                    {/* <div className="row">
                      <div className="col-md-2">
                        <p className="card-title">
                          {" "}
                          Guardian is:<span style={{ color: "red" }}>*</span>
                        </p>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="radio"
                          name="guardian"
                          id="guardian"
                          defaultValue="Father"
                        />{" "}
                        Father &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name="guardian"
                          id="guardian"
                          defaultValue="Mother"
                        />{" "}
                        Mother&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name="guardian"
                          id="guardian"
                          defaultValue="Other"
                        />{" "}
                        Other
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Guardian Name </label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text "
                            className="form-control"
                            id="gname"
                            name="gname"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Guardian Relation{" "}
                          </label>
                          <input
                            type="text "
                            className="form-control"
                            id="relation"
                            name="relation"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Guardian Email </label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text "
                            className="form-control"
                            id="gemail"
                            name="gemail"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Guardian Photo </label>
                          <input
                            type="file"
                            className="form-control"
                            id="gphoto"
                            name="gphoto"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Guardian Phone </label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text "
                            className="form-control"
                            id="gphone"
                            name="gphone"
                            required=""
                            minLength={1}
                            maxLength={10}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Guardian Occupation{" "}
                          </label>
                          <input
                            type="text "
                            className="form-control"
                            id="goccupation"
                            name="goccupation"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Address </label>
                          <span style={{ color: "red" }}>*</span>
                          <textarea
                            className="form-control"
                            name="address"
                            id="address"
                            cols={10}
                            rows={1}
                            required=""
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="row">
                      <h3 className="card-title col-12 my-3">
                        Documents Required
                      </h3>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Aadhar</label>
                          <input
                            type="file"
                            name="aadhar"
                            className="form-control"
                            placeholder="Attach Aadhar"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">SSLC Marks Sheet</label>
                          <input
                            type="file"
                            name="sslc_markscard"
                            className="form-control"
                            placeholder="Attach Aadhar"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-end p-3">
                      <button
                        className="btn btn-primary btn-rounded px-3"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="hidden" name="page_name" defaultValue="std_new" />
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
}

export default StudentAdmission;
