import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { TEAM_CHATS } from '../../../../utils/apiConstants'
import './TeamChat.scss'
import axios from "axios"
import { toast } from 'react-toastify'
import { SESSION_EMPLOYEE_ID } from '../../../../utils/sessionStorageContants'



function TeamChat({setLoading}) {

  const params = useParams()

  const [data, setData] = useState()

  const [content, setContent] = useState()

  const scollToRef = useRef();

  const getEmployeeId = () =>{
    return sessionStorage.getItem(SESSION_EMPLOYEE_ID)?sessionStorage.getItem(SESSION_EMPLOYEE_ID):null
  }

  const [employee,setEmployee] = useState(getEmployeeId())


  const getData = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: TEAM_CHATS + `?discussion_id=${params.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        setData(res.data)
        scollToRef.current.scrollIntoView({behavior: "smooth"})
      })
      .catch(err => {
        setLoading(0)
        console.log(err.response.data.message);
        toast.error(err.response.data.message)
      })

  }


  const addData = async () => {

    setLoading(1)

    const obj = {
      employee_id: employee,
      discussion_id: params.id,
      content
    }

    const config = {
      method: 'post',
      url: TEAM_CHATS,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
      data: obj
    }

    await axios(config)
      .then(res => {
        setLoading(0)
        setContent("")
        getData()
        toast.success("chat added successfully")
      })
      .catch(err => {
        setLoading(0)
        console.log(err.response.data.message);
        toast.error(err.response.data.message)
      })

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='TeamChat'>



      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Team Chat</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="/teamDiscussion">Team</a>
                      </li>
                      <li className="breadcrumb-item active"><a href="/teamDiscussion">Discussion</a></li>
                      <li className="breadcrumb-item active">Team Chat</li>

                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}

            <div className="row d-flex justify-content-center overflow-hidden">
              <div className="col-12">
                <div className="card">
                  <div className="card-body ">
                    <div>
                      <h2 className="card-title">{data?.data.title}</h2>

                    </div>
                    <hr />
                    <div className='chat-container'>

                      {data?.disData?.map((d, i) => {
                       return <div className={`row d-flex my-2 ${parseInt(employee)===parseInt(d.employee_id)?'chat-right':'chat-left'}`} ref={scollToRef}>
                          <div className="col-md-5 col-10 bg-primary rounded">

                            <div className='p-2'>
                              {/* <h4 className='text-white'>{d?.content}</h4> */}
                              <p className="text-white mb-0">
                                {d?.content}
                              </p>



                            </div>
                              {
                                parseInt(employee)===1
                                ?
                                <div className='d-flex justify-content-between align-items-center'>
                                  <p className="text-white mt-auto team-chat-date">{d?.createdAt.split("T")[0]}</p>
                                  <a href='' className='text-warning badge mb-3 d-flex align-items-center team-chat-delete-button' data-toggle="tooltip" title="Delete" ><i class="ri-delete-bin-2-line"></i></a>
                                </div>
                                :
                                <div className='d-flex justify-content-start'>
                                  <p className="text-white mt-auto team-chat-date">{d?.createdAt.split("T")[0]}</p>
                                </div>

                              }
 
                          </div>
                        </div>
                      })}



                    </div>

                    <div className=" row d-flex align-items-end  ">
                      <div className="input-group mb-3">
                        <input type="text" class="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" value={content} onChange={(e) => setContent(e.target.value)} />
                        <div className="input-group-append">
                          {
                            content
                            ?
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => addData()}><i class="ri-send-plane-2-fill"></i></button>
                            :
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="ri-attachment-2"></i></button>

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
      </div>

    </div>
  )
}

export default TeamChat