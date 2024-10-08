import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TEAM_DISCUSSION } from '../../../../utils/apiConstants'
import { SESSION_AUTH } from '../../../../utils/sessionStorageContants'
import Nodata from '../../../../Components/NoData/Nodata'
import { ROUTES } from '../../../../Router/routerConfig'

  function EmployeeTeamDiscussion({setLoading, collegeId}) {
    const navigate = useNavigate()
    const [data,setData] = useState([])
  
  
    const changeDir = (id) =>{
      navigate(`/employee/teamChat/${id}`)  
    }
    
    const getData = async() =>{
      setLoading(1)
      const config = {
          method:'get',
          url:`${TEAM_DISCUSSION}?college_id=${collegeId}`,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem(SESSION_AUTH)}`
          },
      }
  
      await axios(config)
      .then(res=>{
          setLoading(0)
          setData(res.data.data)
          console.log(res);
      })
      .catch(err=>{
          setLoading(0)
          console.log(err.response.data.message);
          toast.error(err.response.data.message)
      })
  
    }
  
    useEffect(()=>{
      getData()
    },[])
    return (
      <div className='TeamDiscussion'>
  
  <div className="main-content">
  <div className="page-content">
      <div className="container-fluid">
  
          <div className="row">
              <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0">Discussion</h4>
  
                      <div className="page-title-right">
                          <ol className="breadcrumb m-0">
                              <li className="breadcrumb-item">Team</li>
                              <li className="breadcrumb-item active">Discussion</li>
                          </ol>
                      </div>
  
                  </div>
              </div>
          </div>
  
          <div className="container-fluid">
              <div className="card">
                  <div className="card-body">
  
                      <div className="row d-flex justify-content-between p-3">
                        <h4 className='text-danger'>Total : {!data||data?.length===0 ?'0' :data?.length}</h4>
                      </div>
  <div >
                      <div>
                          {data&&data.length!==0?data?.map((i, key) => (
                              <div className="row my-3 mx-2 p-3 border rounded role-div flex-nowrap shadow cursor-normal">
                              <div className="col-11" key={key}>
                                  <div className="role-title">
                                      <h4> {i.title}</h4>
                                  </div>
                                  <div className="role-code">
                                      <p>{i.content}</p>
                                  </div>
                                  <div className="role-date">
                                      <p className='text-muted'> {i.createdAt.split("T")[0]}</p>
                                  </div>
                              </div>
                              <div className="col-1 d-flex align-items-center justify-content-end">
                                  <div className='d-flex justify-content-between' style={{ fontSize: '18px' }}>


                                      {i.attachment &&
                                          <div className='px-1 rounded secondary mr-2'>
                                              <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                          </div>
                                      }
                                      <div
                                          className='px-1 rounded text-secondary cursor-pointer'
                                          onClick={() => { changeDir(i.id) }}
                                      >
                                          <i className="ri-message-2-line"></i>
                                      </div>
                                  </div>
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
  
  
      </div>
    )
  }

export default EmployeeTeamDiscussion