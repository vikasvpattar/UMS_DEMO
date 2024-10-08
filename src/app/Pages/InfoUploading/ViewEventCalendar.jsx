import React from 'react'
//import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EVENT_CALENDAR_GET, EVENT_CALENDAR_PUT } from '../../utils/InfoUploadingApiConstants';

//import { handleResponse } from '../../Services/reponses';





function ViewEventCalendar ({ setLoading }) {
  
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
      const config = {
          method: "get",
          url: EVENT_CALENDAR_GET,
          headers: {
              "Content-Type": "application/json",
          },
      };

      await axios(config)
          .then((res) => {
              res.data.data.sort((a, b) => b.id - a.id);
              res.data.data.forEach((element) => {
                  element.image = JSON.parse(element.image);
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
      navigate(`/Connect/WhatsHappening/EventCalendar/${id}`, {
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
        url: `${EVENT_CALENDAR_PUT}/${id}`,
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
            url: `${EVENT_CALENDAR_PUT}/${id}`,
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

    // const handleResponse = (id) => {
    //     const config = {
    //         method: 'put',
    //         //   url: `${BASE_URL}/api/infouploading/updateAdmissionNotifications/${id}`,
    //         url: `${RECRUITMENT_PUT}/${id}`,
    //         headers: {
    //             Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
    //             "Content-Type": "application/json",
    //         },
    //         data: {
    //             approved: '0'
    //         }
    //     }
    
    //     axios(config)
    //         .then(res => {
    //             setLoading(0)
    //             toast.success("Success")
    //             const updatedData = data.map(item => (item.id === id ? { ...item, approved: '0' } : item));
    //       setData(updatedData);
    //         })
    //             .catch(err => {
    //                 setLoading(0)
    //                 toast.error("Something Went Wrong")
    //             })
    //     }



    return (
        <div>
            
            <div className="container register">
                <div className="row">
                    <div class="card-header">
                        <h1 class="text-danger"> Event Calendar </h1>
                    </div>
                    <table className="table">
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tbody>

                            {
                                data && data?.map((item, key) => {
                                    return (


                                        <tr>
                                            <td>{item?.title}</td>
                                            <td>{item?.date}</td>
                                            <td>{item?.image}</td>
                                            <td>{item?.status}</td>
                                            <td>{item?.status == "INACTIVE" ? <button className="btn btn-success mr-2" onClick={() => handleApprove(item?.id)}>Approve</button> : <button className="btn btn-danger mr-2" onClick={() => handleDelete(item?.id)}>Declined</button>}</td>
                                           

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


export default ViewEventCalendar;