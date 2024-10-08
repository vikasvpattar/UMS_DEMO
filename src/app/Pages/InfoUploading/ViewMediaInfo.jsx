import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Http } from '../../Services/Services';
import { useNavigate } from 'react-router-dom';
import { MEDIA_GET, MEDIA_UPDATE } from '../../utils/InfoUploadingApiConstants';

// to display date in dd-mm-yyyy when it is in yyyy-mm-dd
function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
}

function ViewMediaInfo({ setLoading }) {

    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const getData = async () => {
        setLoading(1);
        await Http.get(MEDIA_GET)
            .then(async (res) => {
                res.data.data.sort((a, b) => b.id - a.id);
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(0);
    };

    useEffect(() => {
        getData();
    }, []);


    const handleDelete = (id) => {
        const config = {
            method: 'put',
            url: `${MEDIA_UPDATE}/${id}`,
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




    return (
        <div>
            <div className="container register" style={{ maxWidth: "1200px" }}>
                <div className="row">
                    <div class="card-header">
                        <h1 class="text-danger"> Media Coverage </h1>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Attachment</th>
                                <th>Video Info</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data?.map((info, key) => {
                                    return (

                                        <tr>
                                            {/* <td>{info?.date.split('T')[0]}</td> */}
                                            <td>{formatDate(info.date.split('T')[0])}</td>
                                            <td>{info?.title}</td>
                                            <td>{info?.type}</td>
                                            <td><a href={info?.attachment} target='_blank'> Click Here </a></td>
                                            <td>{info?.video}</td>
                                            <td> <button className='btn btn-danger' onClick={() => handleDelete(info.id)}> Delete </button> </td>
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

export default ViewMediaInfo
