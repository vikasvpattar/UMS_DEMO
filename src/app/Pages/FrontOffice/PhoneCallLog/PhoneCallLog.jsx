import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import Nodata from '../../../Components/NoData/Nodata';
import ModalPhoneCallLog from '../../../modals/FrontOffice/ModalPhoneCallLog'
import { FRONT_OFFICE_CALL_LOG } from '../../../utils/FrontOffice.apiConst';
import { SESSION_COLLEGE_ID } from '../../../utils/sessionStorageContants';
import './PhoneCallLog.scss'

function PhoneCallLog({setLoading}) {


    //state to show or hide save and update button at the below form
    const [edit,setEdit] = useState(0)

    const getCollegeId = () =>{
      return sessionStorage.getItem(SESSION_COLLEGE_ID)?sessionStorage.getItem(SESSION_COLLEGE_ID):null
    }
  
    const [college_id,setCollegeId] = useState(getCollegeId())

    const [info, setInfo] = useState({
      purpose: "",
      name: "",
      phone: "",
      date: "",
      description: "",
      follow_up: "",
      call_duration: "",
      note: "",
      call_type: "",
    });
  
    const [infoData, setInfoData] = useState([]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setInfo((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    };

    const fillAllData = (d) =>{
      setInfo(d)
    }

    const cleardata = () =>{
      setInfo({
        purpose: "",
        name: "",
        phone: "",
        date: "",
        description: "",
        follow_up: "",
        call_duration: "",
        note: "",
        call_type: "",
      })
    }
  
    //Adding and editing data
    const handleSubmit = async (e) => {
      setLoading(1)
  
      const data = edit?{
        ...info
      }:
      {
        ...info,
        college_id:college_id
      }
  
      const config = {
        method: edit?"put":"post",
        url: `${FRONT_OFFICE_CALL_LOG}/${edit?info.id:''}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
  
      await  axios(config)
        .then(function (response) {
          setLoading(0)
          getData()
          toast.success(response.data.message)
          cleardata()
        })
        .catch(function (error) {
          setLoading(0)
          toast.error(error.response.data.message)
        });
    };
  

    //getting Data
    const getData = async () => {
      setLoading(1)
      const config = {
        method: "get",
        url: FRONT_OFFICE_CALL_LOG,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        }
      };
  
      await axios(config)
      .then(function (response) {
          setLoading(0)
          setInfoData(response.data.data);
          
        })
        .catch(function (error) {
          setLoading(0)
          console.log(error);
        });
    };
  

    //Deleteing Data
    const handleDelete = async(i) => {
      setLoading(1)
  
      const config = {
        method: 'put',
        url: `${FRONT_OFFICE_CALL_LOG}/${i.id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: {
          status:"INACTIVE"
        },
      };
  
      await axios(config)
      .then(res=>{
        getData()
        setLoading(0)
      })
      .catch(err=>{
        toast.error(err.response.data.message)
        setLoading(0)

      })
    };
  
    useEffect(() => {
      getData()
    }, [])

    useEffect(()=>{
      setCollegeId(sessionStorage.getItem(SESSION_COLLEGE_ID))
    },[sessionStorage.getItem(SESSION_COLLEGE_ID)])
   
  

    
  return (
    <div className='PhoneCallLog'>
      <ModalPhoneCallLog/>
        <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* Followup */}
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Add Phone Call Log</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Front Office</a>
                </li>
                <li className="breadcrumb-item active">Phone Call Logs</li>
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
              <h2 className="card-title">Add Criteria</h2>
              <br />
             
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Enter Name"
                        name="name"
                        value={info?.name}
                            onChange={handleChange}
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Phone<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={info?.phone}
                        onChange={handleChange}
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Date</label>
                      <input
                        readOnly=""
                        className="form-control"
                        type='date'
                        data-date-format="dd.mm.yyyy"
                        id="date"
                        data-provide="datepicker"
                        data-date-autoclose="true"
                        value={info?.date}
                        onChange={handleChange}
                        placeholder="Enter Call Date"
                        name="date"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id=""
                        cols={1}
                        rows={1}
                        defaultValue={""}
                        value={info?.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Next Follow Up Date
                      </label>
                      <input
                        readOnly=""
                        className="form-control"
                        id="followupdate"
                        type='date'
                        data-provide="datepicker"
                        data-date-format="dd.mm.yyyy"
                        data-date-autoclose="true"
                        placeholder="Enter Next Follow up date"
                        name="follow_up"
                        value={info?.follow_up}
                            onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Call Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        placeholder="e.g. 30:00"
                        name="call_duration"
                        value={info?.call_duration}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">Note</label>
                      <textarea
                        className="form-control"
                        name="note"
                        id=""
                        cols={1}
                        rows={1}
                        value={info?.note}
                            onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="validationCustom02">
                        Call Types<span style={{ color: "red" }}>*</span>
                      </label>{" "}
                      <br />
                      <input
                        type="radio"
                        name="call_type"
                        id="type"
                        required=""
                        value='Incoming'
                            onChange={handleChange}
                      />{" "}
                      <label htmlFor="">Incoming </label>{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="call_type"
                        id="type"
                        required=""
                        value='Outgoing'
                        onChange={handleChange}
                      />{" "}
                      <label htmlFor="">Outgoing </label>
                    </div>
                  </div>
                </div>
                <div className="row float-right">
                  {
                    edit
                    ?
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        value="phone_call"
                        onClick={() => handleSubmit()}
                      >
                        <i className="fa fa-save" aria-hidden="true" /> Save Changes
                      </button>
                    :
                      <button
                        className="btn btn-primary btn-rounded"
                        type="submit"
                        name="submit"
                        value="phone_call"
                        onClick={(e) => handleSubmit(e)}
                      >
                        <i className="fa fa-save" aria-hidden="true" /> Save
                      </button>

                  }
                  
                 
             
                </div>
            
            </div>
          </div>
          {/* end card */}
        </div>
      </div>
      {/* container-fluid */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title">Phone Call Log List</h4>
                </div>
                <div className="col-md-6"></div>
              </div>
              <hr />
              <table
                id="datatable"
                className="table table-bordered dt-responsive nowrap"
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%"
                }}
              >
                <thead>
                  <tr>
                    <th>Sl.No </th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Next Follow Up Date</th>
                    <th>Call Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
             
                <tbody className="">
                            {infoData &&
                              infoData?.map((data, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data?.name}</td>
                                    <td>{data?.phone}</td>

                                  
                                    <td>{data?.date?.split("T")[0]}</td>
                                    <td>{data?.follow_up?.split("T")[0]}</td>
                                    <td>{data.call_type}</td>

                                    <td>
                                      <span
                                        className="badge badge-light text-dark mr-3"
                                        data-toggle="tooltip"
                                        title="Edit"
                                        onClick={()=>{setEdit(1);fillAllData(data)}}
                                      >
                                        {" "}
                                        <i
                                          class="fa fa-edit "
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <span
                                        className="badge badge-light text-danger mr-3"
                                        data-toggle="tooltip"
                                        title="Delete"
                                        onClick={() => handleDelete(data)}
                                      >
                                        {" "}
                                        <i
                                          class="fa fa-trash "
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        {infoData?.length == 0 ? <Nodata></Nodata> : null}
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end row */}
    </div>
    {/* End Page-content */}
  </div>
</div>


    </div>
  )
}

export default PhoneCallLog