import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { getFileUrl } from "../../../Helpers/Helpers";
import { ROUTES } from "../../../Router/routerConfig";
import { EMPLOYEE } from "../../../utils/apiConstants";
import { ASSET_EMPLOYEE_IMAGE } from "../../../utils/AssetsReferenceTypes";
import { HOSTEL } from '../../../utils/Hostel.apiConst';
import {
  ALL_DATA,
  LOCAL_COLLEGE,
  LOCAL_JOBROLES,
  LOCAL_PROGRAM,
} from "../../../utils/LocalStorageConstants";
function AddNewStaff({ setLoading, collegeId }) {
  const [departmentOptions, setDepartmentOptions] = useState(
    JSON.parse(localStorage.getItem(ALL_DATA)).department
  );
  const collegesOpt = JSON.parse(localStorage.getItem(LOCAL_COLLEGE));
  const jobPositionOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES));
  const programOpt = JSON.parse(localStorage.getItem(LOCAL_PROGRAM));

  const [hostelNames, setHostelNames] = useState([]);

  const [x, setX] = useState([]);

  const [y, setY] = useState(false);

  const [z, setZ] = useState();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    department_id: "",
    college_id: "",
    multi_clg_id: [],
    multi_dept_id: [],
    email: "",
    phone: "",
    basic_salary: "",
    date_of_joining: "",
    role: "",
    father_name: "",
    mother_name: "",
    gender: "",
    dob: "",
    marital_status: "",
    current_address: "",
    permanent_address: "",
    qualification: "",
    work_experience: "",
    epf_number: "",
    work_shift: "",
    location: "",
    contract_type: "",
    resume: "",
    joining_letter: "",
    photo: "",
    type: "",
    hostel_id:"",
    designation:"",
  });

  const clearData = () => {
    setUser({
      first_name: "",
      last_name: "",
      department_id: "",
      college_id: "",
      multi_clg_id: [],
      multi_dept_id: [],
      email: "",
      phone: "",
      basic_salary: "",
      date_of_joining: "",
      role: "",
      father_name: "",
      mother_name: "",
      gender: "",
      dob: "",
      marital_status: "",
      current_address: "",
      permanent_address: "",
      qualification: "",
      work_experience: "",
      epf_number: "",
      work_shift: "",
      location: "",
      contract_type: "",
      resume: "",
      joining_letter: "",
      photo: "",
      type: "",
      hostel_id:"",
      designation:"",
    });
  };

  const getHostelData = async() => {
    setLoading(1)
    const config = {
      method:'get',
      url:`${HOSTEL}?college_id=${collegeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
    }
    axios(config)
    .then(res=>{
      setLoading(0)
      console.log('hostel data - ', res.data.data);
      setHostelNames(res.data.data)
    })
    .catch(err=>{
      setLoading(0)
      toast.error("Something Went Wrong")
    })
  }

  //Function upload attachment to the s3
  const addAttachment = async (e, str) => {
    try {
      const d = await getFileUrl(
        ASSET_EMPLOYEE_IMAGE,
        `Employee_${str}`,
        e.target.value.split(".")[1],
        setLoading,
        e.target.files[0]
      );
      setUser((prev) => ({
        ...prev,
        photo: d ? d : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    console.log(user);
    if (
      !user?.date_of_joining ||
      !user?.phone ||
      !user?.first_name ||
      !user?.email ||
      !user?.last_name ||
      !user?.dob ||
      !user?.college_id ||
      !user?.department_id ||
      !user?.gender ||
      !user?.type ||
      !user?.role ||
      !user?.designation
    )
      return toast.error("Mandatory fields are required");
    setLoading(1);
    e.preventDefault();
    const data = { ...user };
    const config = {
      method: "post",
      url: EMPLOYEE,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        setLoading(0);
        toast.success(
          "login username, password is generated automatically and send to staff email."
        );
        clearData();
        // navigate(ROUTES.Registar.HR.ViewStaff);
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const options = collegesOpt?.map((item, key) => ({
    value: item?.id,
    label: item?.name,
  }));

  let options1 = [];
  const setDepartment = async () => {
    options1 = await departmentOptions
      ?.filter(
        (s) =>
          s.college_id == user?.multi_clg_id?.find((t) => t == s.college_id)
      )
      ?.map((item, key) => ({
        label:
          item?.name +
          " , " +
          programOpt.find((s) => s.id == item?.program_id)?.name,
        value: item?.id,
      }));
    console.log(options1);
    setX(options1);
  };

  useEffect(() => {
    setDepartment();
  }, [user?.college_id]);

  useEffect(() => {
    getHostelData();
  },[]);

  useEffect(() => {
    console.log('hostel id - ', user.hostel_id);
  },[user.hostel_id]);

  const handleCollegeSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    user.college_id = selectedValues[0];
    setUser((prevUser) => ({ ...prevUser, multi_clg_id: selectedValues })); // Update user state
  };

  const handleDepartmentSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    user.department_id = selectedValues[0];
    setUser((prevUser) => ({ ...prevUser, multi_dept_id: selectedValues })); // Update user state
  };

  return (
    <div className="AddNewStaff">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Human Resource</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Human Resource</a>
                      </li>
                      <li className="breadcrumb-item active">Add New Staff</li>
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
                      {" "}
                      <div className="col-4">
                        <h4 className="card-title">Basic Information</h4>
                      </div>
                      <div className="col-md-8">
                        <button
                          className="btn btn-success btn-sm btn-rounded float-right"
                          type="submit"
                          name="submit"
                        >
                          <i className="fa fa-download" aria-hidden="true" />{" "}
                          Download Documents
                        </button>
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
                      </div>
                    </div>
                    <hr />
                    <br />
                    <form
                      className="needs-validation"
                      action="javascript:void(0)"
                      method="POST"
                      noValidate=""
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        {/* <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Staff ID <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="staff_id"
                        placeholder=" Enter Staff ID"
                        name="staff_id"
                        required=""
                      />
                    </div>
                  </div> */}
                    
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Role<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              id="role"
                              name="role"
                              className="form-control"
                              required=""
                              autoFocus={true}
                              isMulti={true}
                              onChange={handleChange}
                              value={user.role}
                            >
                              <option value="" selected>
                                {" "}
                                Select Role
                              </option>
                              <option value="HR">HR</option>
                              <option value="CASHIER">CASHIER</option>
                              <option value="STAFF">STAFF</option>
                              <option value="NTSTAFF">NON-TEACHING STAFF</option>
                              <option value="SHR">SUPER HR</option>
                              <option value="ADMIN">ADMIN (PRINCIPAL)</option>
                              <option value="ACC">ACCOUNTANT</option>
                              <option value="SUACC">SUPER ACCOUNTANT</option>
                              <option value="COE">COE</option>
                              <option value="AD-CON">ADMISSION CO-ORDINATOR</option>
                              <option value="OFFICE">OFFICE CLERK</option>
                              <option value="LIB">LIBRARIAN</option>
                              <option value="IT">IT ADMIN</option>
                              <option value="WARDEN">WARDEN</option>
                            </select>
                            <span className="text-danger">Functionalities of UMS is based on role.</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Designation<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              id="deesignation"
                              name="designation"
                              className="form-control"
                              required=""
                              autoFocus={true}
                              isMulti={true}
                              onChange={handleChange}
                              value={user.designation}
                            >
                              <option value="" selected>
                                {" "}
                                Select Designation
                              </option>
                              {jobPositionOpt?.map((i, key) => (
                                <option value={i.id} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {user?.role == "WARDEN" ? <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Hostel
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              id="hostel_id"
                              name="hostel_id"
                              className="form-control"
                              required=""
                              autoFocus={true}
                              isMulti={true}
                              onChange={handleChange}
                              value={user.hostel_id}
                            >
                              <option value="" selected>
                                {" "}
                                Select Option
                              </option>
                              {hostelNames?.map((i,k) => 
                                (
                                  <option value={i.id} key={i.id}>{i.hostel_name}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div> : ""}
                        <div className="col-md-3">
                          <label htmlFor="validationCustom01">
                            {" "}
                            College<span style={{ color: "red" }}>*</span>
                          </label>
                          <Select
                            name="multi_clg_id"
                            value={user.multi_clg_id.map((value) =>
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
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Department <span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              name="multi_dept_id"
                              autoFocus={true}
                              isMulti={true}
                              onChange={handleDepartmentSelect}
                              value={user.multi_dept_id.map((value) =>
                                x.find((option) => option.value === value)
                              )}
                              options={x}
                              getOptionLabel={(option) => option.label} // Set the label display
                              getOptionValue={(option) => option.value}
                            />
                            {/* <option value=""> Select Department</option>
                              {user?.college_id
                                ? departmentOptions &&
                                  departmentOptions
                                    ?.filter(
                                      (s) => s.college_id == user?.college_id
                                    )
                                    ?.map((i, key) => (
                                      <option value={i.id} key={key}>
                                        {i?.name} ,{" "}
                                        {
                                          programOpt.find(
                                            (s) => s?.id == i?.program_id
                                          ).name
                                        }
                                      </option>
                                    ))
                                : departmentOptions?.map((i, key) => (
                                    <option value={i.id} key={key}>
                                      {i?.name} ,{" "}
                                      {
                                        programOpt.find(
                                          (s) => s?.id == i?.program_id
                                        ).name
                                      }
                                    </option>
                                  ))} */}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              First Name<span style={{ color: "red" }}>
                                *
                              </span>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="fname"
                              name="first_name"
                              required=""
                              placeholder=" Enter First Name"
                              value={user.first_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Last Name<span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lname"
                              name="last_name"
                              placeholder=" Enter Last Name"
                              onChange={handleChange}
                              value={user.last_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom02">
                              Father Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="father_name"
                              placeholder=" Enter Father Name"
                              name="father_name"
                              onChange={handleChange}
                              value={user.father_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Mother Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="mother_name"
                              name="mother_name"
                              placeholder=" Enter Mother Name"
                              onChange={handleChange}
                              value={user.mother_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Email-Id <span style={{ color: "red" }}>
                                *
                              </span>{" "}
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder=" Enter Staff Email ID"
                              id="email"
                              name="email"
                              required=""
                              value={user.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Mobile <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="mobile"
                              name="phone"
                              placeholder=" Enter Contact Number"
                              value={user.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Gender <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              className="form-control"
                              name="gender"
                              id="gender"
                              required=""
                              onChange={handleChange}
                              value={user.gender}
                            >
                              <option value=""> Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Date of Birth{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="dob"
                              name="dob"
                              value={user.dob}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Marital Status{" "}
                            </label>
                            <select
                              className="form-control"
                              name="marital_status"
                              value={user.marital_status}
                              onChange={handleChange}
                              id="marital"
                            >
                              <option value=""> Select</option>
                              <option value="single">Single</option>
                              <option value="married">Married</option>
                              <option value="widowed">Widowed</option>
                              <option value="not_specified">
                                Not Specified
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              Current Address
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              cols={1}
                              rows={1}
                              id="c_address"
                              name="current_address"
                              value={user.current_address}
                              placeholder={"Enter Your Current Address"}
                              onChange={handleChange}
                              defaultValue={" "}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Permanent Address
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              cols={1}
                              rows={1}
                              id="p_address"
                              name="permanent_address"
                              value={user.permanent_address}
                              placeholder={"Enter Your permanant Address"}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Qualification
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="qualification"
                              name="qualification"
                              placeholder=" Enter Qualification"
                              onChange={handleChange}
                              value={user.qualification}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Staff Type
                            </label>
                            <select
                              id="section"
                              className="form-control"
                              name="type"
                              value={user?.type}
                              onChange={handleChange}
                            >
                              <option value="select"> Select </option>
                              <option value="Teaching Staff">
                                {" "}
                                Teaching Staff{" "}
                              </option>
                              <option value="Non-Teaching Staff">
                                {" "}
                                Non-Teaching Staff{" "}
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Work Experience
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="experience"
                              name="work_experience"
                              placeholder=" Enter Work Experience"
                              value={user.work_experience}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Date of Joining
                            </label>
                            <span style={{ color: "red" }}>*</span>
                            <input
                              type="date"
                              className="form-control"
                              id="doj"
                              name="date_of_joining"
                              onChange={handleChange}
                              value={user.date_of_joining}
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="validationCustom01">
                              {" "}
                              Staff Photo
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="photo"
                              name="photo"
                              onChange={(e) => {
                                addAttachment(e, "Student_Photo");
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="accordion" id="accordionExample">
                        <div className="card">
                          <div className="card-header" id="headingOne">
                            <button
                              className="btn btn-link cart-title"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <h5 className="mb-0"> Add More Details</h5>
                            </button>
                          </div>
                          <div
                            id="collapseOne"
                            className="collapse "
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              {/* pay roll */}
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0"> Pay Roll </h5>
                                </div>
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          EPF Number
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="epf"
                                          name="epf_number"
                                          value={user.epf_number}
                                          onChange={handleChange}
                                          placeholder=" Enter EPF Number"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Basic Salary
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          id="bsalary"
                                          name="basic_salary"
                                          value={user.basic_salary}
                                          onChange={handleChange}
                                          placeholder=" Enter Basic Salary"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Work Shift
                                        </label>
                                        <span style={{ color: "red" }}>*</span>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="shift"
                                          name="work_shift"
                                          onChange={handleChange}
                                          value={user.work_shift}
                                          placeholder="Enter Work Shift"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Location
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="location"
                                          name="location"
                                          value={user.location}
                                          onChange={handleChange}
                                          placeholder="Enter Work Location"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Contract Type
                                        </label>
                                        <select
                                          name="contract_type"
                                          className="form-control"
                                          id="contract"
                                          value={user.contract_type}
                                          onChange={handleChange}
                                        >
                                          <option value="">
                                            Select Contract Type
                                          </option>
                                          <option value="permanent">
                                            Permanent
                                          </option>
                                          <option value="probation">
                                            Probation
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* end of Payroll */}
                              {/* Bank Details */}
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0"> Bank Details </h5>
                                </div>
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Account Title
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="account"
                                          name="actitle"
                                          placeholder=" Enter Acount Title"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Bank Account Number
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="acnumber"
                                          name="acnumber"
                                          placeholder=" Enter Bank Account Number"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Bank Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="bname"
                                          name="bname"
                                          placeholder="Enter Bank Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          IFSC Code
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="ifsc"
                                          name="ifsc"
                                          placeholder="Enter IFSC Code"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Bank Branch
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="branch"
                                          name="branch"
                                          placeholder="Enter Branch Name"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* end of Bank Details */}
                              {/* Upload Documents */}
                              <div className="card">
                                <div className="card-header" id="headingOne">
                                  <h5 className="mb-0"> Upload Documents </h5>
                                </div>
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          Resume
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          id="resume"
                                          name="resume"
                                          value={user.resume}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          {" "}
                                          Joining Letter
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          id="jletter"
                                          name="joining_letter"
                                          onChange={handleChange}
                                          value={user.joining_letter}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group">
                                        <label htmlFor="validationCustom01">
                                          Other Documents
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          id="other"
                                          name="other"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* end of Document */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row float-right">
                        <button
                          className="btn btn-success btn-rounded btn-outline"
                          type="submit"
                          name="submit"
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <input
                  type="hidden"
                  name="page_name"
                  defaultValue="new_staff"
                />
                {/* end card */}
              </div>
            </div>
          </div>
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
}

export default AddNewStaff;
