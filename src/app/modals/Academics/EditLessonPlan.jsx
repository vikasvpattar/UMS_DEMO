import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { ACADEMICS_ADD_LESSON_PLAN } from '../../utils/Academics.apiConst';
import axios from 'axios';

function EditLessonPlan({id , data, setLoading, lessonData, topicData, getData}) {



  console.log('modal',data);
  const [user,setUser] = useState({
    session_id:'',
    created_by:'',
    timetable_id:'',
    college_id:'',
    employee_id:'',
    section_id:'',
    lesson_id:'',
    course_id:'',
    topic_id:'',
    date:'',
    time_from:'',
    time_to:'',
    presentation:'',
    attachment:'',
    lecture_youtube_url:'',
    lecture_video:'',
    sub_topic:'',
    teaching_method:'',
    general_objectives:'',
    previous_knowledge:'',
    comprehensive_questions:'',
  })

  const handleChange = (e) =>{
    const {name,value} = e.target
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }


  const handleSubmit = () =>{
    setLoading(1)
    const config = {
      method: "put",
      url:`${ACADEMICS_ADD_LESSON_PLAN}/${data?.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
        "Content-Type": "application/json",
      },
      data:user
    }

    axios(config)
    .then(res=>{
      setLoading(0)
      toast.success("Data Added Success")
      getData()
    })
    .catch(err=>{
      setLoading(0)
      toast.error("Some error occured")
    })
  }



  useEffect(()=>{
    setUser(data)
  },[data])

  return (
    <div><>
    {/*  Add Lesson Plan*/}
    <div
      className="modal fade bs-edit-modal-xl "
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
              Add Lesson Plan
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Lesson</label>
                      <small className="text-danger"> *</small>
                      <select
                        id="lessonid"
                        name="lesson_id"
                        className="form-control"
                        value={user?.lesson_id}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        {
                          lessonData?.filter(s=>s?.course_id==data?.course_id)?.map((i,key)=>(
                            <option value={i?.id}>{i?.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="form-group">
                      <label>Topic</label>
                      <small className="text-danger"> *</small>
                      <select
                        id="topicid"
                        name="topic_id"
                        className="form-control"
                        value={user?.topic_id}
                        onChange={handleChange}
                      >
                      <option value="">Select Topic</option>
                      {
                        topicData?.filter(s=>s?.lesson_id==user?.lesson_id)?.map((i,key)=>(
                          <option value={i?.id}>{i?.name}</option>
                        ))
                      }
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="pwd">Sub Topic</label>
                      <input
                        type="text"
                        id="sub_topic"
                        name="sub_topic"
                        className="form-control "
                        value={user?.sub_topic}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="pwd">Date</label>
                      <small className="text-danger"> *</small>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control "
                        value={user?.date?.split("T")[0]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="pwd">Time From</label>
                      <small className="text-danger"> *</small>
                      <div className="input-group ">
                        <input
                          className="form-control time"
                          name="time_from"
                          type='time'
                          value={user?.time_from}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="form-group">
                      <label htmlFor="pwd">Time To</label>
                      <small className="text-danger"> *</small>
                      <div className="input-group ">
                        <input
                          type="time"
                          name="time_to"
                          className="form-control "
                          value={user?.time_to}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="pwd">Lecture YouTube URL</label>
                      <input
                        type="text"
                        name="lecture_youtube_url"
                        className="form-control"
                        value={user?.lecture_youtube_url}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">Lecture Video</label>
                      <input
                        name="lecture_video" 
                        type="file" 
                        value={user?.lecture_video}
                        onChange={handleChange}
                        />{" "}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="form-group ">
                      <label htmlFor="pwd">Attachment</label>
                      <input 
                      name="attachment" 
                      type="file"
                      value={user?.attachment}
                      onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">Teaching Method</label>
                      <textarea
                        type="text"
                        id="teaching_method"
                        name="teaching_method"
                        className="form-control"
                        defaultValue={""}
                        value={user?.teaching_method}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">General Objectives</label>
                      <textarea
                        type="text"
                        id="general_objectives"
                        name="general_objectives"
                        className="form-control"
                        value={user?.general_objectives}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">Previous Knowledge</label>
                      <textarea
                        type="text"
                        id="previous_knowledge"
                        name="previous_knowledge"
                        className="form-control"
                        value={user?.previous_knowledge}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="pwd">Comprehensive Questions</label>
                      <textarea
                        type="text"
                        id="comprehensive_questions"
                        name="comprehensive_questions"
                        className="form-control"
                        value={user?.comprehensive_questions}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="">Presentation</label>
                    <textarea
                      id="elm1"
                      className='form-control'
                      name="presentation"
                      text-dangeruired=""
                      placeholder="Type Here...."
                      value={user?.presentation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/*./row*/}
              </div>
              {/*./col-md-12*/}
            </div>
          </div>
          <div className="modal-footer">
            <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
  </>
  </div>
  )
}

export default EditLessonPlan