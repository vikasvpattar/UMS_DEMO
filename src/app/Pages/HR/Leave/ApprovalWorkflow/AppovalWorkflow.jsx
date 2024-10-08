import React,{useState, useEffect} from 'react'
import ModalApprovalWorkFlow from '../../../../modals/HR/Leave/ModalApprovalWorkFlow'
import './ApprovalWorkflow.scss'
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from '../../../../Components/Loader/Loader'
import { CUSTOM_APPROVER, HR_WORKFLOW } from '../../../../utils/apiConstants'
import Nodata from '../../../../Components/NoData/Nodata'


function AppovalWorkflow({setLoading, collegeId}) {


    const [data, setData] = useState([])
    const [type, setType] = useState('')
    const [edit, setEdit] = useState()

    const [approvers, setApprovers] = useState([])

    const [role, setRole] = useState(sessionStorage.getItem('role') ? sessionStorage.getItem('role') : null)


    const getApprovers = async() => {
        setLoading(1)
        const config = {
            method: 'get',
            url: `${CUSTOM_APPROVER}?college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }
        await axios(config)
        .then(res=>{
            setApprovers(res.data.data)
        })
        .catch(err=>{
            toast.error('Something went wrong')
        })
        setLoading(0)
    }

    const getData = async () => {

        setLoading(1)

        const config = {
            method: 'get',
            url: `${HR_WORKFLOW}?type=LEAVE&college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }


        await axios(config)
            .then((res) => {
                setLoading(0)
                console.log(res);
                setData(res.data.data)
                // toast.success("data fetched")
            })
            .catch(err => {
                setLoading(0)
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        getData()
        getApprovers()
    }, [])

    return (
        <div className='AppovalWorkflow'>
            <ModalApprovalWorkFlow type={type} data={edit} reloadData={getData} setLoading={setLoading} approvers={approvers} collegeId={collegeId}/>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Approval Workflow</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Employer</li>
                                            <li className="breadcrumb-item active">Approval Wokflow</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="card">
                                <div className="card-body">

                                <div className="row d-flex justify-content-end p-3">
                                        {
                                            role !== 'ADMIN' ? <button
                                            className="btn btn-rounded btn-success btn-outline px-4"
                                            data-toggle="modal"
                                            data-target="#ModalApprovalWorkFlow"
                                            onClick={()=>{setEdit();setType('add')}}
                                        >
                                            Add +
                                        </button> : null
                                        }
                                    </div>

                                    <div>
                                        {data&&data.length!==0?data?.map((i, key) => (

                                            role !== 'ADMIN' ?
                                            <div
                                                className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                                data-toggle="modal"
                                                data-target="#ModalApprovalWorkFlow"
                                                onClick={()=>{setType('edit');setEdit(i)}}
                                            >
                                                <div className="col-11" key={key}>
                                                    <div className="role-title">
                                                        {i.title}
                                                    </div>
                                                    {/* <div className="role-code">
                                                        {i.id}
                                                    </div> */}
                                                </div>
                                                <div className="col-1 d-flex align-items-center justify-content-end">
                                                    {'>'}
                                                </div>
                                            </div>
                                            : <div
                                            className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow"
                                            // data-toggle="modal"
                                            // data-target="#ModalApprovalWorkFlow"
                                            // onClick={()=>{setType('edit');setEdit(i)}}
                                        >
                                            <div className="col-11" key={key}>
                                                <div className="role-title">
                                                    {i.title}
                                                </div>
                                                {/* <div className="role-code">
                                                    {i.id}
                                                </div> */}
                                            </div>
                                            <div className="col-1 d-flex align-items-center justify-content-end">
                                                {'>'}
                                            </div>
                                        </div>
                                        ))
                                        :
                                        <Nodata/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppovalWorkflow