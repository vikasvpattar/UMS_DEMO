import React, { useState, useEffect } from 'react'
import ModalStaffExperience from '../../../modals/HR/Staff/ModalStaffExperience'
import Loader from '../../Loader/Loader'
import './EditStaff.scss'
import { toast } from 'react-toastify'
import axios from 'axios'
import { EMPLOYEE_EXPERIENCE, EMPLOYEE_PUBLICATION } from '../../../utils/apiConstants'
import Nodata from '../../NoData/Nodata'
import ModalStaffPublication from '../../../modals/HR/Staff/ModalStaffPublication'

function StaffPublications({ tab, id, setLoading }) {

    const [data, setData] = useState([])
    const [type, setType] = useState('')
    const [edit, setEdit] = useState()

    const getData = async () => {

        setLoading(1)

        const config = {
            method: 'get',
            url: `${EMPLOYEE_PUBLICATION}?employee_id=${id}`,
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
    }, [])
    return (
        <div className='StaffExperience Staff'>
            <ModalStaffPublication type={type} id={id} data={edit} reloadData={getData} setLoading={setLoading} />
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

                            <div className="row float-right">
                                <button
                                    className='btn btn-success btn-rounded btn-outline'
                                    data-toggle="modal"
                                    data-target="#ModalStaffPublication"
                                    onClick={() => { setType('add'); setEdit() }}
                                >
                                    Add New +
                                </button>
                            </div>

                            <br />
                            <br />
                            <br />

                            <div className="row">
                                <div className="row px-5 w-100 gap-5">
                                    {data && data.length !== 0 ? data?.map((i, key) => (
                                        <div className="col-6 p-6 crd rowData" key={key}>
                                            <div
                                                className="rounded border card-default card "
                                            >
                                                <div className="col-12 fs-5 d-flex justify-content-between align-items-center">
                                                        <div>
                                                            {i?.name}
                                                        </div>
                                                        <div className='d-flex justify-content-between'>


                                                            {i.attachment &&
                                                                <div className='px-1 rounded secondary mr-2'>
                                                                    <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                                                </div>
                                                            }
                                                            <div 
                                                            className='px-1 rounded text-secondary cursor-pointer'
                                                            data-toggle="modal"
                                                            data-target="#ModalStaffPublication"
                                                            onClick={() => { setType('edit'); setEdit(i) }}
                                                            >
                                                                <i className="ri-edit-box-line"></i>
                                                            </div>
                                                        </div>

                                                    </div>
                                            </div>
                                        </div>
                                    ))
                                        :
                                        <div className="col-12">
                                            <Nodata />
                                        </div>
                                    }
                                </div>

                            </div>



                        </div>
                    </div>
                    {/* end card */}
                </div>
            </div>
        </div>
    )
}

export default StaffPublications