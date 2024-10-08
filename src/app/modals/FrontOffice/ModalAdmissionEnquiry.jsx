import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FRONT_OFFICE_ADMISSION_ENQUIRRY_WITHOUT_OTP } from '../../utils/FrontOffice.apiConst'
import { LOCAL_PROGRAM } from '../../utils/LocalStorageConstants'

function ModalAdmissionEnquiry({ setLoading, collegeId, sourceOpt, refOpt }) {

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    note: "",
    program_id: "",
    college_id: collegeId,
    source: "",
    reference: "",
    date: "",
    follow_up_date: "",
    assigned_to: '',
  })

  const getProgramData = () => localStorage.getItem(LOCAL_PROGRAM)?JSON.parse(localStorage.getItem(LOCAL_PROGRAM)):null

  const [programOpt, setProgramOpt] = useState(getProgramData())

  const handleSubmit = () =>{
    setLoading(1)
    const config = {
      method: 'post',
      url: FRONT_OFFICE_ADMISSION_ENQUIRRY_WITHOUT_OTP,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data: user
    }

    axios(config)
    .then(res=>{
      setLoading(0)
      console.log(res);
    })
    .catch(err=>{
      setLoading(0)
      console.log(err);
    })
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setUser(prev=>({
      ...prev,
      [name]: value
    }))
  }

  useEffect(()=>{
    setProgramOpt(getProgramData())
  },[localStorage?.getItem(LOCAL_PROGRAM)])

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered mw-100 w-75"
        role="document"
        width="600px"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Admission Enquiry
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
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    name="name"
                    value={user?.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Phone <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    placeholder="Enter Contact Number"
                    name="phone"
                    value={user?.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email Id"
                    value={user?.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* End of  1st Row  */}
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Address</label>
                  <br />
                  <textarea
                    name="address"
                    className="form-control"
                    cols={20}
                    rows={3}
                    value={user?.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Description </label>
                  <br />
                  <textarea
                    name="discription"
                    className="form-control"
                    id="discription"
                    cols={20}
                    rows={3}
                    value={user?.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Note</label>
                  <br />
                  <textarea
                    name="note"
                    id="note"
                    className="form-control"
                    cols={20}
                    rows={3}
                    value={user?.note}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* End of  2nd Row  */}
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={user?.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Next Follow up Date <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control rounded"
                    name="follow_up_date"
                    value={user?.follow_up_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"> Assign to</label>
                  <input
                    type="text"
                    className="form-control"
                    id="assign"
                    name="assigned_to"
                    value={user?.assigned_to}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* End of 3rd Row  */}
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Reference </label>
                  <select 
                  name="reference" 
                  className="form-control"
                  value={user?.reference}
                  onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {
                      refOpt?.map((i,key)=>(
                        <option value={i?.id}>{i?.title}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Source <span style={{ color: "red" }}>*</span>
                  </label>
                  <select 
                  name="source" 
                  className="form-control"
                  value={user?.source}
                  onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {
                      sourceOpt?.map((i,key)=>(
                        <option value={i?.id} key={key}>{i?.title}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Program <span style={{ color: "red" }}>*</span>
                  </label>
                  <select 
                  name="program_id" 
                  className="form-control"
                  value={user?.program_id}
                  onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {
                      programOpt?.map((i,key)=>(
                        <option value={i?.id} key={key}>{i?.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              {/* <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1"></label>
                  <label htmlFor="validationCustom02">
                    Select Class<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="class"
                    className="form-control"
                    id="class"
                    required=""
                  >
                    <option value=""> Select Class </option>
                    <option value="<?= $row1['id']?>">
                    </option>
                  </select>
                </div>
              </div> */}
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success btn-rounded"
                name="submit"
                onClick={handleSubmit}
                data-dismiss="modal"
                aria-label="Close"
              >
                Submit
              </button>
            </div>
            <input
              type="hidden"
              name="page_name"
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalAdmissionEnquiry