 import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import OffCanvasStudentProfile from '../../../Components/OffCanvas/Student/OffCanvasStudentProfile'
import BasicInformation from '../../../Components/Student/Profile/BasicInformation'
import StudentCollegeDetails from '../../../Components/Student/Profile/StudentCollegeDetails'
import StudentDocuments from '../../../Components/Student/Profile/StudentDocuments'
import StudentFee from '../../../Components/Student/Profile/StudentFee'
import StudentProfileSwitches from '../../../Components/Student/Profile/StudentProfileSwitches'
import StudentStatus from '../../../Components/Student/Profile/StudentStatus'
import ModalStudentProfileUpload from '../../../modals/Students/ModalStudentProfileUpload'
import { LOCAL_COLLEGE, LOCAL_DEPARTMENT, LOCAL_PROGRAM } from '../../../utils/LocalStorageConstants'
import './StudentProfile.scss'

function AdmissioProfile() {

    const location = useLocation()

    const [data, setData] = useState(location?.state?.data)

    const [basic_data, set_basic_data] = useState(location?.state?.data?.basic_data)

    const [form_data, set_form_data] = useState(location?.state?.data?.form_data)

    const localDepartments = JSON.parse(localStorage.getItem(LOCAL_DEPARTMENT))
    const localPrograms = JSON.parse(localStorage.getItem(LOCAL_PROGRAM))
    const localColleges = JSON.parse(localStorage.getItem(LOCAL_COLLEGE))


    const [applicatonType, setApplicationType] = useState()

    const selectRoute = (specialization, program, department) => {

        switch (specialization + "|" + program) {

            case "1111010|04":
                setApplicationType('Bed')
                break;

            case "1111003|04":

                switch (department) {
                    case 36:
                        setApplicationType('Nursing Post Basic')
                        break;

                    case 35:
                        setApplicationType('Nursing Bsc')
                        break;
                }


            case "1111011|04":
                setApplicationType('Bsc')
                break;


            case "1111005|04" || "1111005|05":
                setApplicationType('Commerce')
                break;


            case "1111003|02":
                setApplicationType('Nursing GNM')
                break;


            case "1111002|04" || "1111002|LAW":
                setApplicationType('Law')
                break;

            case "1111003|05":
                setApplicationType('Nursing Msc')
                break;

            case "1111011|05":
                setApplicationType('Msc')
                break;


        }

    }

    const [tab, setTab] = useState('Basic')

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setInfo(prevValue => ({
    //         ...prevValue,
    //         [name]: value,
    //     }))
    // }

    useEffect(() => {
        setData(location.state.data)
        set_basic_data(location?.state?.data?.basic_data)
        set_form_data(location?.state?.data?.form_data)
        selectRoute(location.state.data.basic_data.college_id, location.state.data.basic_data.program_id, location.state.data.basic_data.department_id)
    }, [location.state])

    return (<>
        <div className='StudentProfile'>
            <>
                <ModalStudentProfileUpload />
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            {/* start page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">Student Profile</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <a href="javascript: void(0);">Student</a>
                                                </li>
                                                <li className="breadcrumb-item active">
                                                    {" "}
                                                    <a href="javascript:void(0)"> Students Details</a>
                                                </li>
                                                <li className="breadcrumb-item active"> Students Profile</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}

                            <div>
                                <hr />
                                <h3 className='text-center'>{applicatonType} Admission Form</h3>
                                <hr />
                            </div>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="box box-primary">
                                            <div className="box-body box-profile">
                                                <div className="card py-2">
                                                <ul className="list-group list-group-unbordered pt-3">
                                                    <img
                                                        className="profile-user-img img-responsive rounded-circle mx-auto d-block"
                                                        src={`${basic_data?.student_picture ? basic_data?.student_picture : '/assets/images/Nexenstial Logo.jpg'}`}
                                                        width="50%"
                                                        style={{ aspectRatio: '1/1' }}
                                                    />
                                                    <br />
                                                    <h3 className="profile-username text-center">{basic_data?.name}</h3>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>Phone :</b> <a className="float-right text-aqua">{basic_data?.phone}</a>
                                                    </li>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>Email :</b> <a className="float-right text-aqua">{basic_data?.email}</a>
                                                    </li>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>Program :</b> <a className="float-right text-aqua">{localPrograms?.find(s=>s?.id==basic_data?.program_id)?.name}</a>
                                                    </li>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>College :</b> <a className="float-right text-aqua">{localColleges?.find(s=>s?.id==basic_data?.college_id)?.name}</a>
                                                    </li>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>Department :</b> <a className="float-right text-aqua" >{localDepartments?.find(s=>s?.id==basic_data?.department_id)?.name}</a>
                                                    </li>
                                                    <li className="list-group-item listnoback d-flex justify-content-between">
                                                        <b>Gender :</b> <a className="float-right text-aqua">{basic_data?.gender}</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                                        <div className="card ">
                                            <div className="card-body">
                                                <StudentProfileSwitches tab={tab} setTab={setTab} />
                                                {tab === 'Basic' && <BasicInformation data={data} basic_data={basic_data} set_basic_data={set_basic_data} />}
                                                {tab === 'College Details' && <StudentCollegeDetails application={applicatonType} form_data={form_data} data={data}/>}
                                                {tab === 'Fee' && <StudentFee />}
                                                {tab === 'Documents' && <StudentDocuments />}
                                                {tab === 'Status' && <StudentStatus data={data}/>}
                                                <div className="tab-content" id="myTabContent">
                                                    {/* <div
                                                        className="tab-pane fade"
                                                        id="profile"
                                                        role="tabpanel"
                                                        aria-labelledby="profile-tab"
                                                    >
                                                        {" "}
                                                        <br />
                                                        <div className="alert alert-danger">No Record Found </div>
                                                    </div> */}
                                                    {/* <div
                                                        className="tab-pane fade"
                                                        id="contact"
                                                        role="tabpanel"
                                                        aria-labelledby="contact-tab"
                                                    >
                                                        <div className="timeline-header no-border">
                                                            {" "}
                                                            <br />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-sm float-right"
                                                                data-toggle="modal"
                                                                data-target="#document"
                                                            >
                                                                {" "}
                                                                <i className="fa fa-upload" /> Upload Documents
                                                            </button>
                                                            <br />
                                                            <div
                                                                className="table-responsive"
                                                                style={{ clear: "both" }}
                                                            >
                                                                <br />
                                                                <div className="row"></div>
                                                                <table className="table table-striped table-bordered table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Title </th>
                                                                            <th>Name </th>
                                                                            <th className="mailbox-date text-right">
                                                                                Action{" "}
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                colSpan={5}
                                                                                className="text-danger text-center"
                                                                            >
                                                                                No Record Found
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="tab-pane" id="timelineh">
                                                        <div>
                                                            {" "}
                                                            <input
                                                                type="button"
                                                                id="myTimelineButton"
                                                                className="btn btn-sm btn-primary float-right "
                                                                defaultValue="Add"
                                                            />
                                                        </div>
                                                        <br />
                                                        <div className="timeline-header no-border">
                                                            <div id="timeline_list">
                                                                <br />
                                                                <div className="alert alert-info">
                                                                    No Record Found
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                    </div>
                    {/* container-fluid */}
                    <OffCanvasStudentProfile />

                    <div className="rightbar-overlay" />
                </div>
            </>

        </div>
    </>
    )
}

export default AdmissioProfile