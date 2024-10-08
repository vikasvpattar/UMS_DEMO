import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from 'antd';
import { Table } from "ant-table-extensions";
import { toast } from 'react-toastify';
import Toggler from '../../../Components/Toggler/Toggler';

import {
    ACADEMICS_ADD_CLASS,
    ACADEMICS_ADD_SECTION,
    ACADEMICS_ADD_SEMESTER,
  } from "../../../utils/Academics.apiConst";

import {
    LOCAL_DEPARTMENT,
    LOCAL_COLLEGE,
} from "../../../utils/LocalStorageConstants";
import { sessionOpt } from "../../../Data/jsonData/Academics/Academics";

import {
    REPORT_TRIGGER_FETCH,
    REPORT_TRIGGER_UPDATE
  } from "../../../utils/Reports.apiConst";

import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";

const FeedbackTrigger = ({ setLoading, collegeId }) => {

    const [department, setDepartment] = useState(
        JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
    );
    var emp_id = sessionStorage.getItem("employee_id");
    const getCollegeData = () => {
        return localStorage.getItem(LOCAL_COLLEGE)
          ? JSON.parse(localStorage.getItem(LOCAL_COLLEGE))
          : null;
    };

    const [collegeOpt, setCollegeOpt] = useState(getCollegeData());

    useEffect(() => {
    setDepartment(JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT)));
    }, [localStorage.getItem(LOCAL_DEPARTMENT), collegeId]);

    const [clg, setClg] = useState("");
    const [faculty, setFaculty] = useState("");
    const [classOpt, setClassOpt] = useState([]);
    const [semesterOpt, setSemesterOpt] = useState([]);

    const [session, setSession] = useState("");
    const [currentclass, setCurrentClass] = useState("");
    const [currentSemester, setCurrentSemester] = useState("");

    const [triggerData, setTriggerData] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [modalData, setModalData] = useState({});
    const [toggler, setToggler] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const [checkbox2, setCheckbox2] = useState(true);

    const [addTypes, setAddTypes] = useState(["campus", "curriculum", "teachers"]);
    const [type, setType] = useState("");
    const [from_date, set_from_date] = useState("");
    const [to_date, set_to_date] = useState("");
    const [status, setStatus] = useState("");

    const [from_date_update, set_from_date_update] = useState("");
    const [to_date_update, set_to_date_update] = useState("");

    const getAllData = async () => {
        const config = {
          method: "get",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
            "Content-Type": "application/json",
          },
        };
    
        setLoading(1);
        const [data1, data2, data3] = await Promise.all([
          await axios({
            ...config,
            url:
              emp_id != 316
                ? `${ACADEMICS_ADD_CLASS}?college_id=${collegeId}`
                : `${ACADEMICS_ADD_CLASS}`,
          })
            .then((res) => {
              setClassOpt(res.data.data);
            })
            .catch((err) => {
              setLoading(0);
              console.log(err);
            }),
    
          await axios({
            ...config,
            url:
              emp_id != 316
                ? `${ACADEMICS_ADD_SEMESTER}?college_id=${collegeId}`
                : `${ACADEMICS_ADD_SEMESTER}`,
          })
            .then((res) => {
              setSemesterOpt(res.data.data);
            })
            .catch((err) => {
              setLoading(0);
              console.log(err);
            }),

        ]);
        setLoading(0);
        console.log('dropdown data fecthed');
    };

    const getFeedbackTriggerData = async () => {
        let obj = {};
        obj['semester_id'] = currentSemester;
        obj['class_id'] = currentclass;
        obj['department_id'] = faculty;
        obj['session'] = session;

        setLoading(1);
        const config = {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            url: `${REPORT_TRIGGER_FETCH}`,
            data:obj
        };

        await axios(config)
          .then((res) => {
            console.log('Trigger data - ', res.data.data);
            setTriggerData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })

          setLoading(0);
    }

    const updateTrigger = async() => {
        setLoading(1);
        let obj = {};
        obj['semester_id'] = currentSemester;
        obj['class_id'] = currentclass;
        obj['department_id'] = faculty;
        obj['session'] = session;
        obj['feedback_type'] = modalData?.type;
        obj['from_date'] = from_date_update;
        obj['to_date'] = to_date_update;
        obj['emp_id'] = emp_id;
        obj['trigger'] = checkbox == true ? "ACTIVE" : "INACTIVE";
        console.log('obj - ', obj);
        const config = {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            url: `${REPORT_TRIGGER_UPDATE}`,
            data:obj
        };

        await axios(config)
          .then((res) => {
            console.log('update res - ', res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
        setLoading(0);
        getFeedbackTriggerData();
        setOpen(false);
    }

    const addTrigger = async() => {
        setLoading(1);
        let obj = {};
        obj['semester_id'] = currentSemester;
        obj['class_id'] = currentclass;
        obj['department_id'] = faculty;
        obj['session'] = session;
        obj['feedback_type'] = type;
        obj['from_date'] = from_date;
        obj['to_date'] = to_date;
        obj['emp_id'] = emp_id;
        obj['trigger'] = checkbox2 == true ? "ACTIVE" : "INACTIVE";
        console.log('obj - ', obj);
        const config = {
            method: "post",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
              "Content-Type": "application/json",
            },
            url: `${REPORT_TRIGGER_UPDATE}`,
            data:obj
        };

        await axios(config)
          .then((res) => {
            console.log('update res - ', res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
        setLoading(0);
        getFeedbackTriggerData();
        setOpen2(false);
    }

    const handleModal = (index) => {
        let obj = {};
        obj['from_date'] = triggerData[index].from_date;
        obj['to_date'] = triggerData[index].to_date;
        obj['status'] = triggerData[index].status;
        obj['id'] = triggerData[index].trigger_id;
        obj['type'] = triggerData[index].type_name;
        if(triggerData[index].status == 'ACTIVE') setCheckbox(true);
        else setCheckbox(false);
        setModalData(obj);
        setOpen(true);
    }

    const handleModal2 = () => {
        setOpen2(true);
    }

    useEffect(()=> {
        if(modalData) {
            set_from_date_update(modalData.from_date);
            set_to_date_update(modalData.to_date);
        }
    },[modalData]);
    useEffect(()=> {
        getAllData();
    },[]);

    return (<>
    <div className="main-content">
        <br />
        <h6 className="my-0 ml-4"><b>FEEDBACK</b></h6>
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                            <h2 className="card-title">Select Criteria</h2>
                            <br />
                            <div className="row">
                                {emp_id == 316 ? (
                                <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">
                                    Faculty <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                    name="clg"
                                    id="faculty"
                                    className="form-control"
                                    value={clg}
                                    onChange={(e) => {
                                        setClg(e.target.value);
                                    }}
                                    >
                                    <option value="" selected>
                                        ALL
                                    </option>
                                    {collegeOpt?.map((i, key) => (
                                        <option value={i.id} key={key}>
                                        {i.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                </div>
                                ) : null}
                                <div className="col-md-3">
                                    <div className="form-group">
                                    <label htmlFor="validationCustom01">
                                        Department <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                        name="faculty"
                                        id="section"
                                        className="form-control"
                                        value={faculty}
                                        onChange={(e) => {
                                        setFaculty(e.target.value);
                                        }}
                                    >
                                        <option value="" selected>
                                        ALL
                                        </option>
                                        {emp_id == 316
                                        ? department
                                            ?.filter((s) => s.college_id == clg)
                                            ?.map((i, key) => (
                                                <option value={i.id} key={key}>
                                                {i.name}
                                                </option>
                                            ))
                                        : department
                                            ?.filter((s) => s.college_id == collegeId)
                                            ?.map((i, key) => (
                                                <option value={i.id} key={key}>
                                                {i.name}
                                                </option>
                                            ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                    <label htmlFor="">Session</label>
                                    <select
                                        className="form-control"
                                        value={session}
                                        onChange={(e) => {
                                        setSession(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Session</option>
                                        {sessionOpt?.map((i, key) => (
                                        <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                    <label htmlFor="">Class</label>
                                    <select
                                        className="form-control"
                                        value={currentclass}
                                        onChange={(e) => {
                                        setCurrentClass(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Class</option>
                                        {classOpt
                                        ?.filter((s) => s?.department_id == faculty)
                                        ?.map((i, key) => (
                                            <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                    <label htmlFor="">Semester</label>
                                    <select
                                        className="form-control"
                                        value={currentSemester}
                                        onChange={(e) => {
                                        setCurrentSemester(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Semester</option>
                                        {semesterOpt
                                        ?.filter((s) => s.class_id == currentclass)
                                        ?.map((i, key) => (
                                            <option value={i?.id}>{i?.name}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4"></div>
                                <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <button
                                        className="btn btn-nex mr-3"
                                        type="submit"
                                        name="submit"
                                        value="collect"
                                        onClick={getFeedbackTriggerData}
                                        style={{ marginTop: 'auto' ,marginLeft: 'auto', width:'30%'}}
                                    >
                                        <i className="fa fa-search" aria-hidden="true" /> Search
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-end align-items-end mr-4">
                                    <Button type="primary" onClick={() => handleModal2()}>Add</Button>
                                </div>
                                <br />
                                <div className="table-responsive">
                                    <table
                                        id=""
                                        className="table table-bordered text-wrap table-hover dataTable no-footer"
                                        style={{
                                        borderCollapse: "collapse",
                                        borderSpacing: 0,
                                        width: "100%",
                                        }}
                                    >
                                    <thead>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Type</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {triggerData?.map((value,index)=> {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{value.type_name}</td>
                                                    <td>{value.from_date && value.from_date.split('-').reverse().join('-')}</td>
                                                    <td>{value.to_date && value.to_date.split('-').reverse().join('-')}</td>
                                                    <td style={{ color: value.status === 'INACTIVE' ? 'red' : 'green' }}><b>{value.status}</b></td>
                                                    <td style={{width:'10%'}}><Button type="primary" onClick={() => handleModal(index)}>Update</Button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title="UpdateFeedback"
                    centered
                    open={open}
                    onOk={() => updateTrigger()}
                    onCancel={() => setOpen(false)}
                    width={1000}
                >
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Type : {modalData.type}</div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                    <label htmlFor="">From Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        onChange = {(e)=> {
                                            set_from_date_update(e.target.value)
                                        }}
                                        className="form-control"
                                        value={from_date_update}
                                    />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                    <label htmlFor="">To Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        onChange = {(e)=> {
                                            set_to_date_update(e.target.value)
                                        }}
                                        className="form-control"
                                        value={to_date_update}
                                    />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 my-3">
                                    <div className="form-group">
                                        <label htmlFor=""></label>
                                        <Toggler
                                            defaultChecked={true}
                                            checked={checkbox}
                                            checkboxValue={(e) => { setCheckbox(e.target.checked) }}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                title="AddFeedback"
                centered
                open={open2}
                onOk={() => addTrigger()}
                onCancel={() => setOpen2(false)}
                width={1000}
                >
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                            <label htmlFor="">Type</label>
                            <select
                                className="form-control"
                                value={type}
                                onChange={(e) => {
                                setType(e.target.value);
                                }}
                            >
                                <option value="">Select Type</option>
                                {addTypes?.map((i, key) => (
                                    <option value={i}>{i}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                            <label htmlFor="">From Date</label>
                            <input
                                type="date"
                                name="date"
                                onChange={(e) => {
                                set_from_date(e.target.value);
                                }}
                                className="form-control"
                                value={from_date}
                            />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                            <label htmlFor="">To Date</label>
                            <input
                                type="date"
                                name="date"
                                onChange={(e) => {
                                    set_to_date(e.target.value);
                                }}
                                className="form-control"
                                value={to_date}
                            />
                            </div>
                        </div>
                        <div className="col-md-3 my-3">
                            <div className="form-group">
                                <label htmlFor=""></label>
                                <Toggler
                                    defaultChecked={true}
                                    checked={checkbox2}
                                    checkboxValue={(e) => { setCheckbox2(e.target.checked) }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
        </div>
    </div>
    </div>
    </>)
}

export default FeedbackTrigger;