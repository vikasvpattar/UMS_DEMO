import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ADMISSION_NOTIFICATIONS_GET, ADMISSION_NOTIFICATIONS_PUT } from '../../utils/InfoUploadingApiConstants';

function ViewAdmissionNotifications({ setLoading }) {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const config = {
            method: "get",
            url: ADMISSION_NOTIFICATIONS_GET,
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios(config)
            .then((res) => {
                res.data.data.sort((a, b) => b.id - a.id);
                res.data.data.forEach((element) => {
                    element.attachments = JSON.parse(element.attachments);
                });
                console.log(res.data.data)
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const next = async (id, data1, images) => {
        console.log("error here");
        navigate(`/Homoeopathy/AdmissionNotifications/${id}`, {
            state: {
                images: images,
                data: data1,
            },
        });
    };

    const handleDelete = (id) => {
        const config = {
            method: 'put',
            //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
            url: `${ADMISSION_NOTIFICATIONS_PUT}/${id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
            data: {
                status: 'INACTIVE'
            }
        }

        axios(config)
            .then(res => {
                setLoading(0)
                toast.success("Success")
                getData()
            })
            .catch(err => {
                setLoading(0)
                toast.error("Something Went Wrong")
            })
    }

    const handleApprove = (id) => {
        const config = {
            method: 'put',
            //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
            url: `${ADMISSION_NOTIFICATIONS_PUT}/${id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
            data: {
                status: 'ACTIVE'
            }
        }

        axios(config)
            .then(res => {
                setLoading(0)
                toast.success("Success")
                getData()
            })
            .catch(err => {
                setLoading(0)
                toast.error("Something Went Wrong")
            })
    }


    return (
        <div>
            <div className="container register" style={{ maxWidth: "1200px" }}>
                <div className="row">
                    <div class="card-header">
                        <h1 class="text-danger"> Admission Notifications </h1>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Faculty</th>
                                <th>Department</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Last Date</th>
                                <th>Attachments</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data?.map((item, key) => {
                                    return (


                                        <tr>
                                            <td>{item?.faculty}</td>
                                            <td>{item?.department}</td>
                                            <td>{item?.title}</td>
                                            <td>{item?.date}</td>
                                            <td>{item?.lastdate}</td>
                                            <td>{item?.attachments}</td>
                                            <td>{item?.status}</td>
                                            <td>{item?.status == "INACTIVE" ? <button className="btn btn-success mr-2" onClick={() => handleApprove(item?.id)}>Approve</button>
                                                : <button className="btn btn-danger mr-2" onClick={() => handleDelete(item?.id)}>Declined</button>}</td>
                                        </tr>


                                    )
                                })
                            }
                        </tbody>
                    </table>



                </div>
            </div>
        </div>
    )
}

export default ViewAdmissionNotifications
