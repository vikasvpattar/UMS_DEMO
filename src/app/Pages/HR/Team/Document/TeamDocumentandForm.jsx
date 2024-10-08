import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader'
import Nodata from '../../../../Components/NoData/Nodata'
import ModalTeamDocument from '../../../../modals/HR/Team/ModalTeamDocument'
import { TEAM_DOC_SHARING } from '../../../../utils/apiConstants'
import './../Team.scss'
// import ModalTeamDocument from '../../../../modals/HR/Employer/ModalTeamDocument'



function TeamDocumentandForm({ setLoading, collegeId }) {

    const [data, setData] = useState([])
    const [type, setType] = useState('')
    const [edit, setEdit] = useState()

    const getData = async () => {

        setLoading(1)

        const config = {
            method: 'get',
            url: `${TEAM_DOC_SHARING}?college_id=${collegeId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
                'Content-Type': 'application/json'
            },
        }


        await axios(config)
            .then((res) => {
                console.log(res);
                setData(res.data.data)
                // toast.success("data fetched")
                setLoading(0)
            })
            .catch(err => {
                toast.error(err.response.data.message)
                setLoading(0)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='TeamDocumentandForm'>




            <div className="main-content">
                <ModalTeamDocument type={type} data={edit} reloadData={getData} setLoading={setLoading} collegeId={collegeId}/>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Document</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Team</li>
                                            <li className="breadcrumb-item active">Document</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row d-flex justify-content-between p-3">
                                        <h4 className='text-danger'>Total : {!data || data?.length === 0 ? '0' : data?.length}</h4>
                                        <button
                                            className="btn btn-rounded btn-success btn-outline px-4 mb-3"
                                            data-toggle="modal"
                                            data-target="#ModalTeamDocument"
                                            onClick={() => { setType('add'); setEdit() }}
                                        >
                                            Add +
                                        </button>
                                    </div>
                                    <div >
                                        <div>
                                            {data && data.length !== 0 ? data?.map((i, key) => (
                                                <div
                                                    className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow cursor-normal"
                                                    key={key}

                                                >
                                                    <div className="col-11" key={key}>
                                                        <div className="role-title">
                                                            <h4> {i.title}</h4>
                                                        </div>
                                                        <div className="role-code">
                                                            <p>{i.content}</p>
                                                        </div>
                                                        <div className="role-date">
                                                            <p className='text-primary'><b> {i.scope}</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-1 d-flex align-items-center justify-content-end">
                                                        <div className='d-flex justify-content-between' style={{fontSize:'18px'}}>


                                                            {i.attachment &&
                                                                <div className='px-1 rounded secondary mr-2'>
                                                                    <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                                                </div>
                                                            }
                                                            <div
                                                                className='px-1 rounded text-secondary cursor-pointer'
                                                                data-toggle="modal"
                                                                data-target="#ModalTeamDocument"
                                                                onClick={() => { setType('edit'); setEdit(i) }}
                                                            >
                                                                <i className="ri-edit-box-line"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                                :
                                                <Nodata titleTop={'No Data available for your search'} />
                                            }
                                        </div>
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

export default TeamDocumentandForm