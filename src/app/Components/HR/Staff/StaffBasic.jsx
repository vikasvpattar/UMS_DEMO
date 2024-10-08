import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CUSTOM_APPROVER, EMPLOYEE, HR_WORKFLOW } from './../../../utils/apiConstants'
import { toast } from 'react-toastify'
import Loader from '../../Loader/Loader';
import { ALL_DATA, LOCAL_COLLEGE, LOCAL_JOBROLES } from '../../../utils/LocalStorageConstants';
import { getFileUrl } from '../../../Helpers/Helpers';
import { ASSET_EMPLOYEE_IMAGE } from '../../../utils/AssetsReferenceTypes';
import { SESSION_ROLE } from '../../../utils/sessionStorageContants';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../Router/routerConfig';
import "./EditStaff.scss";

function StaffBasic({ tab, id, setLoading, collegeId }) {

  const navigate = useNavigate()

  const departmentOptions = JSON.parse(localStorage.getItem(ALL_DATA))?.department
  const userRolesOpt = JSON.parse(localStorage.getItem(ALL_DATA))?.userRoles
  const collegesOpt = JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
  const jobPositionOpt = JSON.parse(localStorage.getItem(LOCAL_JOBROLES))
  const userRole = sessionStorage.getItem(SESSION_ROLE)

  const [approvers, setApprovers] = useState([])


  const [user, setUser] = useState();

  //Function upload attachment to the s3
  const addAttachment = async (e, str) => {
    try {
      const d = await getFileUrl(ASSET_EMPLOYEE_IMAGE, `Employee_${str}`, e.target.value.split(".")[1], setLoading, e.target.files[0]);
      setUser(prev => ({
        ...prev,
        photo: d ? d : ''
      }))
    } catch (error) {
      console.log(error);
    }
  }

  //get request for approvals info
  const getApprovals = async () => {
    const config = {
      method: 'get',
      url: `${HR_WORKFLOW}?college_id=${collegeId}&type=LEAVE`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
        'Content-Type': 'application/json'
      },
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        setApprovers(res.data.data)
      })
      .catch(err => {
        toast.error('Something went wrong')
      })
  }

  //get Request for getting employee information
  const getData = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: `${EMPLOYEE}/${id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
        'Content-Type': 'application/json'
      },
    };


    await axios(config)
      .then((res) => {
        console.log(res);
        // toast.success("Data Success");
        setUser(res.data.data)
        setLoading(0)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data.message)
        setLoading(0)
      })

  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }


  const handleSubmit = (e) => {
    setLoading(1)
    e.preventDefault();

    // for (const i in user) {
    //   if(user[i]==='') setFlag(1)
    //   console.log(user[i]);
    // }

    // if(!flag) return alert("Mandatory Fields are required")

    const data = { ...user }

    const config = {
      method: 'put',
      url: `${EMPLOYEE}/${id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    console.log('staff data - ', data);

    axios(config)
      .then((res) => {
        setLoading(0)
        console.log(res.data.data);
        toast.success("Edited Success");
        setUser(res.data.data)
        getData()

      })
      .catch(err => {
        setLoading(0)
        console.log(err)
        toast.error(err.response.data.message)
      })
  }


  useEffect(() => {
    getData();
    getApprovals();
  }, [])

  return (
    <div className='StaffBasic Staff'>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {" "}
                <div className="col-4">
                  <h4 className="card-title">{tab}</h4>
                </div>
              </div>
              <hr />
              <br />
              <form
                className="needs-validation"
              >
                <div className="row">
                  <div className="col-lg-4 row p-3 d-flex justify-content-center align-items-center mb-3">
                    <div>
                      <img
                        src={`${user?.photo ? user?.photo : '/assets/images/Nexenstial Logo.png'}`}
                        className='rounded-circle'
                        style={{ maxWidth: '300px', aspectRatio: '1/1' }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 row">
                    <div className="row col-12">
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">
                            Staff ID <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control cursor-disable"
                            placeholder=" Enter Staff ID"
                            name="staff_id"
                            value={user?.user_id}
                            readOnly={true}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Designation<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="role"
                            name="role"
                            className="form-control"
                            required=""
                            onChange={handleChange}
                            value={user?.role}
                          >
                            <option value="" selected> Select Designation</option>
                            {
                              jobPositionOpt?.map((i, key) => (
                                <option value={i.id} key={i.id}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            {" "}
                            College<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="designation"
                            name="college_id"
                            type="text"
                            onChange={handleChange}
                            value={user?.college_id}
                            className="form-control"
                          >
                            <option value=""> Select College</option>
                            {
                              collegesOpt?.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            Department <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="department_id"
                            id="department"
                            required=""
                            onChange={handleChange}
                            value={user?.department_id}

                          >
                            <option value=""> Select Department</option>
                            {
                              departmentOptions?.filter(s=>s.college_id==user?.college_id)?.map((i, key) => (
                                <option value={i.id} key={key}>{i.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            {" "}
                            First Name<span style={{ color: "red" }}>*</span>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="fname"
                            name="first_name"
                            required=""
                            placeholder=" Enter First Name"
                            value={user?.first_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
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
                            value={user?.last_name}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom02">Father Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="father_name"
                            placeholder=" Enter Father Name"
                            name="father_name"
                            onChange={handleChange}
                            value={user?.father_name}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Mother Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="mother_name"
                            name="mother_name"
                            placeholder=" Enter Mother Name"
                            onChange={handleChange}
                            value={user?.mother_name}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            {" "}
                            Email-Id <span style={{ color: "red" }}>*</span>{" "}
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder=" Enter Staff Email ID"
                            id="email"
                            name="email"
                            required=""
                            value={user?.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Mobile </label>
                          <input
                            type="text "
                            className="form-control"
                            id="mobile"
                            name="phone"
                            placeholder=" Enter Contact Number"
                            value={user?.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">Gender </label>
                          <select
                            className="form-control"
                            name="gender"
                            id="gender"
                            required=""
                            onChange={handleChange}
                            value={user?.gender}
                          >
                            <option value=""> Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={user?.dob?.split("T")[0]}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01">
                            {" "}
                            Marital Status{" "}
                          </label>
                          <select
                            className="form-control"
                            name="marital_status"
                            value={user?.marital_status}
                            onChange={handleChange}
                            id="marital"
                          >
                            <option value=""> Select</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="not_specified">Not Specified</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
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
                            value={user?.current_address}
                            placeholder={'Enter Your Current Address'}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
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
                            value={user?.permanent_address}
                            placeholder={'Permanant Address'}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Qualification</label>
                          <input
                            type="text"
                            className="form-control"
                            id="qualification"
                            name="qualification"
                            placeholder=" Enter Qualification"
                            onChange={handleChange}
                            value={user?.qualification}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
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
                            value={user?.work_experience}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
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
                            value={user?.date_of_joining?.split("T")[0]}
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Staff Photo</label>
                          <input
                            type="file"
                            className="form-control"
                            id="photo"
                            name="photo"
                            onChange={(e) => { addAttachment(e, 'Student_Photo') }}
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-sm-4 col-xl-4">
                        <div className="form-group">
                          <label htmlFor="validationCustom01"> Status </label>
                          <select
                            className="form-control"
                            value={user?.status}
                            name="status"
                            onChange={handleChange}
                          >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </div>
                      </div> */}
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
                                    value={user?.epf_number}
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
                                    type="text"
                                    className="form-control"
                                    id="bsalary"
                                    name="basic_salary"
                                    value={user?.basic_salary}
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
                                    value={user?.work_shift}
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
                                    value={user?.location}
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
                                    value={user?.contract_type}
                                    onChange={handleChange}
                                  >
                                    <option value="">
                                      Select Contract Type
                                    </option>
                                    <option value="permanent">Permanent</option>
                                    <option value="probation">Probation</option>
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
                                    name="account_title"
                                    value={user?.account_title}
                                    onChange={handleChange}
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
                                    name="account_number"
                                    value={user?.account_number}
                                    onChange={handleChange}
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
                                    name="bank_name"
                                    value={user?.bank_name}
                                    onChange={handleChange}
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
                                    name="ifsc_code"
                                    value={user?.ifsc_code}
                                    onChange={handleChange}
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
                                    name="bank_branch"
                                    value={user?.bank_branch}
                                    onChange={handleChange}
                                    placeholder="Enter Branch Name"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end of Bank Details */}
                        {/* Leave */}
                        <div className="card">
                          <div className="card-header" id="headingOne">
                            <h5 className="mb-0"> Leave Details </h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="validationCustom01">
                                    {" "}
                                    Leave Approval Workflow
                                  </label>
                                  <div className="d-flex">

                                  <select
                                    type="text"
                                    className="form-control"
                                    id="account"
                                    name="leave_approval_workflow_id"
                                    value={user?.leave_approval_workflow_id}
                                    onChange={handleChange}
                                    >
                                    <option value=''>Select Option</option>
                                    {approvers?.map((i, key) => (
                                      <option value={i?.id} key={key}>{i?.title}</option>
                                    ))}
                                  </select>
                                  <button 
                                        className="btn btn-success ml-2"
                                        onClick={()=>navigate('/leaveApprovalWorkflow')}
                                        >+</button>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of leave */}
                        {/* Upload Documents */}
                        {/* <div className="card">
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
                                  // value={user.resume}
                                  // onChange={handleChange}
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
                                  // onChange={handleChange}
                                  // value={user.joining_letter}
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
                        </div> */}
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
          {/* end card */}
        </div>
      </div>
    </div>
  )
}

export default StaffBasic