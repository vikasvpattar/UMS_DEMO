import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { STUDENTS_RESULTS_GET, STUDENTS_RESULTS_PUT } from '../../utils/InfoUploadingApiConstants';

function ViewHomeopathyResults({ setLoading }) {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const config = {
            method: "get",
            url: STUDENTS_RESULTS_GET,
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
        navigate(`/Homoeopathy/HomeoResults/${id}`, {
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
            url: `${STUDENTS_RESULTS_PUT}/${id}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
                "Content-Type": "application/json",
            },
            data: {
                status: 'INACTIVE'
            }
        }


        // axios(config)
        //     .then(res => {
        //         setLoading(0)
        //         toast.success("Success")
        //         getData()
        //     })

        axios(config)
            .then(res => {
                setLoading(0)
                toast.success("Success")
                const updatedData = data.map(item => (item.id === id ? { ...item, status: 'INACTIVE' } : item));
                setData(updatedData);
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
            url: `${STUDENTS_RESULTS_PUT}/${id}`,
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
                const updatedData = data.map(item => (item.id === id ? { ...item, status: 'ACTIVE' } : item));
                setData(updatedData);
            })
            .catch(err => {
                setLoading(0)
                toast.error("Something Went Wrong")
            })
    }



    return (
        <div>

            <div className="container register">
                <div className="row">
                    <div class="card-header">
                        <h1 class="text-danger"> Students Results </h1>
                    </div>
                    <table className="table">
                        <tr>
                            <th>Title</th>
                            <th>Attachments</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tbody>

                            {
                                data && data?.map((item, key) => {
                                    return (


                                        <tr>
                                            <td>{item?.title}</td>
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

export default ViewHomeopathyResults
