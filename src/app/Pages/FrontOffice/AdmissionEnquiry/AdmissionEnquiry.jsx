import React, {useState} from 'react'
import ModalAdmissionEnquiry from '../../../modals/FrontOffice/ModalAdmissionEnquiry'
import './AdmissionEnquiry.scss'
import ModalAdmissionEnquirryFollowUp from '../../../modals/FrontOffice/ModalAdmissionEnquirryFollowUp'
import { FRONT_OFFICE_ADMISSION_ENQUIRRY, FRONT_OFFICE_ADMISSION_ENQUIRRY_WITHOUT_OTP, FRONT_OFFICE_SETUP_REFERENCE, FRONT_OFFICE_SETUP_SOURCE } from '../../../utils/FrontOffice.apiConst'
import Nodata from '../../../Components/NoData/Nodata'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'

function AdmissionEnquiry({setLoading, collegeId}) {

    const [data,setData] = useState()

    const [refOpt, setRefOpt] = useState([])

    const [sourceOpt, setSourceOpt] = useState([])

    const getData = async() =>{
        setLoading(1)
        const config = {
            method:'get',
            url:FRONT_OFFICE_ADMISSION_ENQUIRRY + `?college_id=${collegeId}&&status=ACTIVE`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
              }
        }

        await axios(config)
        .then(res=>{
            setLoading(0)
            console.log(res.data.data);
            setData(res.data.data)
        })
        .catch(err=>{
            setLoading(0)
            toast.error(err.response.data.message)
        })
    }

    const getAllData = async() => {
        setLoading(1)
        const config = {
            method:'get',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
              }
        }

        const [data1,data2] = await Promise.all([
            axios({...config,url:`${FRONT_OFFICE_SETUP_SOURCE}?college_id=${collegeId}`})
            .then(res=>{
                console.log(res);
                setSourceOpt(res.data.data)
            })
            .catch(err=>{
                console.log(err);
            })
            ,
            axios({...config,url:`${FRONT_OFFICE_SETUP_REFERENCE}?college_id=${collegeId}`})
            .then(res=>{
                setLoading(0)
                setRefOpt(res.data.data)
                console.log(res);
            })
            .catch(err=>{
                setLoading(0)
                console.log(err);
            })
        ])
    }


    useEffect(()=>{
        getData()
        getAllData()
    },[])
    

    return (
        <div className='AdmissionEnquiry'>
            <ModalAdmissionEnquiry setLoading={setLoading} collegeId={collegeId} sourceOpt={sourceOpt} refOpt={refOpt}/>


            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">Select Criteria</h2>
                                        <br />
                                        <form method="POST" className="needs-validation">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom02">Enquiry From Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="validationCustom02"
                                                            placeholder="Purpose of Visiting"
                                                            name="fdate"
                                                            defaultValue="<?= $_REQUEST['fdate']?>"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom02">Enquiry To Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="validationCustom02"
                                                            placeholder="Purpose of Visiting"
                                                            name="tdate"
                                                            o
                                                            defaultValue="<?= $_REQUEST['tdate']?>"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Source </label>
                                                        <select name="source" id="" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="\" />
                                                            {/* <option value="Front Office">Front Office</option>
                                             <option value="Front Office">Front Office</option>
                                             <option value="Front Office">Front Office</option> */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom01">Status</label>
                                                        <select name="status" className="form-control">
                                                            <option value="">Select</option>
                                                            <option value="Active">Active</option>
                                                            <option value="passive">Passive</option>
                                                            <option value="win">Win</option>
                                                            <option value="loss">Loss</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row float-right">
                                                <button
                                                    className="btn btn-primary btn-rounded"
                                                    type="submit"
                                                    name="submit"
                                                >
                                                    <i className="fa fa-search" aria-hidden="true" /> Search
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="card-title">Admission Enquiry</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <button
                                                    className="btn btn-primary btn-sm btn-rounded float-right"
                                                    type="submit"
                                                    data-toggle="modal"
                                                    data-target="#exampleModalCenter"
                                                    name="add  "
                                                >
                                                    <i className="fa fa-plus" aria-hidden="true" /> Add New
                                                </button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="table-responsive">
                                            <table
                                                id="datatable"
                                                className="table table-bordered nowrap"
                                                style={{ borderCollapse: "collapse", borderSpacing: 0, width: "100%" }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Sl.No.</th>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Source</th>
                                                        <th>Enquiry Date</th>
                                                        <th>
                                                            Last <br />
                                                            Follow-up Date
                                                        </th>
                                                        <th>
                                                            Next <br />
                                                            Follow-up Date
                                                        </th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {data && data ?
                                                        data?.map((i, key) => {
                                                            return (
                                                                <>
                                                                    <tr>

                                                                        <th>
                                                                            {key}
                                                                        </th>
                                                                        <th>
                                                                            {i.name}
                                                                        </th>
                                                                        <th>
                                                                            {i.phone}
                                                                        </th>
                                                                        <th>
                                                                            {i.source}
                                                                        </th>
                                                                        <th>
                                                                            {i.EDate}
                                                                        </th>
                                                                        <th>
                                                                            {i.LDate}
                                                                        </th>
                                                                        <th>
                                                                            {i.NDate}
                                                                        </th>
                                                                        <th>
                                                                            {i.status}
                                                                        </th>
                                                                        <td>
                                                                            <abb title="Follow Up">
                                                                                <button
                                                                                    className="btn badge badge-light p-2 mr-3 "
                                                                                    data-toggle="modal"
                                                                                    data-target={`#followup-${key}`}
                                                                                >
                                                                                    {" "}
                                                                                    <i
                                                                                        className="fa fa-phone text-success"
                                                                                        aria-hidden="true"
                                                                                    />{" "}
                                                                                </button>
                                                                            </abb>{" "}
                                                                            <abb title="Delete">
                                                                                <a href="#" className="badge badge-light p-2">
                                                                                    {" "}
                                                                                    <i
                                                                                        className="fa fa-trash text-danger"
                                                                                        aria-hidden="true"
                                                                                    />{" "}
                                                                                </a>
                                                                            </abb>{" "}
                                                                        </td>
                                                                    </tr>
                                                                    {/* <ModalAdmissionEnquirryFollowUp key={key}/> */}
                                                                    {/* <div
                                                                        className="modal fade text-left"
                                                                        id={`followup-${key}`}
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
                                                                                        Follow up Admission Enquiry
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
                                                                                            <div className="col-md-8">
                                                                                                <div className="row">
                                                                                                    <div className="col-md-6">
                                                                                                        <div className="form-group">
                                                                                                            <lable>
                                                                                                                {" "}
                                                                                                                Follow Up Date <span style={{ color: "red" }}>*</span>
                                                                                                            </lable>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                name="followup"
                                                                                                                defaultValue=""
                                                                                                                id=""
                                                                                                                readOnly=""
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-md-6">
                                                                                                        <div className="form-group">
                                                                                                            <lable>
                                                                                                                {" "}
                                                                                                                Next Follow Up Date{" "}
                                                                                                                <span style={{ color: "red" }}>*</span>
                                                                                                            </lable>
                                                                                                            <input
                                                                                                                type="date"
                                                                                                                className="form-control"
                                                                                                                name="nextfollowup"
                                                                                                                id="nextfollowup"
                                                                                                                required=""
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-md-6">
                                                                                                        <div className="form-group">
                                                                                                            <lable>
                                                                                                                {" "}
                                                                                                                Response <span style={{ color: "red" }}>*</span>
                                                                                                            </lable>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                name="response"
                                                                                                                id="response"
                                                                                                                required=""
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-md-6">
                                                                                                        <div className="form-group">
                                                                                                            <lable> Note </lable>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                name="note"
                                                                                                                id="note"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-md-12">
                                                                                                        <div className="form-group">
                                                                                                            <input type="hidden" name="enquiry_id" id="enquiry_id" />
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                defaultValue="enquiry_followup"
                                                                                                                name="page_name"
                                                                                                            />
                                                                                                            <button
                                                                                                                type="button float-right"
                                                                                                                className="btn btn-primary"
                                                                                                            >
                                                                                                                Save
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <h4>Follow Up (Manju)</h4>
                                                                                                <section className="experience pb-100" id="experience">
                                                                                                    <div className="container">
                                                                                                        <div className="row">
                                                                                                            <div className="col-xl-8 mx-auto text-center">
                                                                                                                <div className="section-title"></div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="row">
                                                                                                            <div className="col-xl-12" id="followdetails"></div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </section>
                                                                                            </div>
                                                                                            <div className="col-md-4 bg-light">
                                                                                                <div className="row">
                                                                                                    <div className="col-md-12 mt-3">
                                                                                                        <div className="form-group">
                                                                                                            <div className="container">
                                                                                                                <div className="row">
                                                                                                                    <div className="col-md-8">
                                                                                                                        <h3 className="card-title"> Summarry</h3>
                                                                                                                        <p
                                                                                                                            className="text-mute text-sm"
                                                                                                                            style={{ fontSize: 12 }}
                                                                                                                        >
                                                                                                                            Created by:
                                                                                                                            <span id="data15" />
                                                                                                                        </p>
                                                                                                                    </div>
                                                                                                                    <div className="col-md-4 ">
                                                                                                                        <h3 className="card-title "> Status</h3>
                                                                                                                        <select
                                                                                                                            name=""
                                                                                                                            onchange="updateStatus(this.value)"
                                                                                                                            id="data14"
                                                                                                                            className="form-control"
                                                                                                                        >
                                                                                                                            <option value="Active">Active</option>
                                                                                                                            <option value="Passive">Passive</option>
                                                                                                                            <option value="Won">Won</option>
                                                                                                                            <option value="Lost">Lost</option>
                                                                                                                        </select>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <hr />
                                                                                                                <p className="" style={{ fontSize: 13 }}>
                                                                                                                    <i className="fa fa-calendar-check-o" /> Enquiry Date:
                                                                                                                    <span id="data2" />
                                                                                                                </p>
                                                                                                                <p className="" style={{ fontSize: 13 }}>
                                                                                                                    <i className="fa fa-calendar-check-o" /> Last Follow-Up
                                                                                                                    Date:
                                                                                                                    <span id="data3" />
                                                                                                                </p>
                                                                                                                <p className="" style={{ fontSize: 13 }}>
                                                                                                                    <i className="fa fa-calendar-check-o" /> Next Follow-Up
                                                                                                                    Date:
                                                                                                                    <span id="data4" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Phone:</b> <span id="data5" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Address:</b> <span id="data6" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Refernce:</b> <span id="data7" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> note:</b> <span id="data8" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Source:</b> <span id="data9" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Assignd to:</b> <span id="data10" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Email:</b> <span id="data11" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> Class:</b> <span id="data12" />
                                                                                                                </p>
                                                                                                                <p className="text-dark" style={{ fontSize: 14 }}>
                                                                                                                    <b> No. of Child:</b> <span id="data13" />
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                </>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            {" "}
                                                            <td colSpan={10}>
                                                                <Nodata/>
                                                            </td>
                                                        </tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* end col */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdmissionEnquiry