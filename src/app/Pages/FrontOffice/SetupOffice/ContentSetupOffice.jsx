import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FRONT_OFFICE_SETUP_COMPLAINT_TYPE, FRONT_OFFICE_SETUP_PURPOSE, FRONT_OFFICE_SETUP_REFERENCE, FRONT_OFFICE_SETUP_SOURCE } from '../../../utils/FrontOffice.apiConst'
import { SESSION_COLLEGE_ID } from '../../../utils/sessionStorageContants'
import './SetupOffice.scss'

function ContentSetupOffice(props) {
  
    //state to show or hide save and update button at the below form
    const [edited,setEdited] = useState(1)
    const [data,setData] = useState()
    const [name,setName] = useState();
    const [desc,setDesc] = useState()

    const getCollegeId = () =>{
      return sessionStorage.getItem(SESSION_COLLEGE_ID)?sessionStorage.getItem(SESSION_COLLEGE_ID):null
    }
  
    const [college_id,setCollegeId] = useState(getCollegeId())

    const getUrl = () =>{
      return props.contentData.title==='Complain Type'?FRONT_OFFICE_SETUP_COMPLAINT_TYPE:props.contentData.title==='Purpose'?FRONT_OFFICE_SETUP_PURPOSE:props.contentData.title==='Source'?FRONT_OFFICE_SETUP_SOURCE:props.contentData.title==='References'?FRONT_OFFICE_SETUP_REFERENCE:null
    }

    const clearData = () => {
      setName('')
      setDesc('')
    }

    const getData = async() =>{
      props.setLoading(1)
      const config ={
        method:'get',
        url:getUrl(),
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
          'Content-Type': 'application/json'
        },
      }
      await axios(config)
      .then((res)=>{
        props.setLoading(0)
        setData(res.data.data)
        console.log(res.data.data);
      })
      .catch(err=>{
        props.setLoading(0)
        toast(err.response.data.message)
      })
    }

    const HandleSubmit = async() =>{
      if(!name) return toast.error("Name is Required")
      if(!desc) return toast.error("Name is Required")
      props.setLoading(1)
      const config ={
        method:'post',
        url:getUrl(),
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`, 
          'Content-Type': 'application/json'
        },
        data:{
          "id": name,
          "title" : name,
          "description" : desc
        }
      }
      await axios(config)
      .then((res)=>{
        props.setLoading(0)
        console.log(res.data.data);
        toast.success('success')
        clearData()
        getData()
      })
      .catch(err=>{
        props.setLoading(0)
        toast.error('Some Error Occured')
        console.log(err);
      })
    }

    //Delete a Data
    const handleDelete = async(i) => {
      props.setLoading(1)
  
      const config = {
        method: 'put',
        url: `${getUrl()}/${i.id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
          "Content-Type": "application/json",
        },
        data: {
          status:"INACTIVE"
        },
      };
  
      await axios(config)
      .then(res=>{
        getData()
        props.setLoading(0)
      })
      .catch(err=>{
        toast.error(err.response.data.message)
        props.setLoading(0)

      })
    };
  
    useEffect(()=>{
      setCollegeId(sessionStorage.getItem(SESSION_COLLEGE_ID))
    },[sessionStorage.getItem(SESSION_COLLEGE_ID)])
    
    useEffect(()=>{
      getData()
    },[props.contentData.title])

    
    
  return (
    <div className='ContentSetupOffice'>
        <div className="tab-content p-3 text-muted">
  <div className="tab-pane active " id="fill-purpose" role="tabpanel">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">{props.contentData.title}</h5>
            
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">
                    {props.contentData.title} <small className="text-danger">*</small>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      placeholder={props.contentData.inputFormPlaceHolder}
                      className="form-control"
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Description </label>
                    <textarea
                      id="purpose_desc"
                      className="form-control"
                      cols={3}
                      rows={1}
                      value={desc}
                      onChange={(e)=>{setDesc(e.target.value)}}
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="row  ">
                <div className="col-md-12">
                  {
                    edited
                    ?
                      <button
                        className="btn btn-primary btn-rounded float-right "
                        type="submit"
                        name="submit"
                        value="purpose"
                        onClick={HandleSubmit}
                      >
                        <i className="fa fa-save" aria-hidden="true" /> Save
                      </button>
                    :
                      <button
                        className="btn btn-primary btn-rounded float-right "
                        type="submit"
                        name="submit"
                        value="purpose"
                      >
                        <i className="fa fa-save" aria-hidden="true" /> Update
                      </button>

                  }
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h4 className="card-title">{props.contentData.listTitle}</h4>
              </div>
              <div className="col-md-6"></div>
            </div>
            <hr />
            <table
              id=""
              className="table table-bordered dt-responsive nowrap"
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                width: "100%"
              }}
            >
              <thead>
                <tr>
                  <th className="text-center">Sl.No.</th>
                  <th>Purpose</th>
                  <th>Description </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data&&data?.length!==0?
                data?.map((i,key)=>{return(
                    <tr>
                    <td className="text-center">{key+1}</td>
                    <td>{i.title}</td>
                    <td>{i.description}</td>
                    <td>
                      {" "}
                     
                      <a href="javascript:void(0)">
                        <span
                          data-toggle="tooltip"
                          className="badge badge-light"
                          title="Edit"
                        >
                          {" "}
                          <i
                            className="fa fa-edit "
                            aria-hidden="true"
                            style={{ color: "blue", cursor: "pointer" }}
                            onmouseover="this.style.color='orange'"
                            onmouseout="this.style.color='blue'"
                          />
                        </span>
                    </a>
                      &nbsp;{" "}
                      <a
                        className="badge badge-light text-danger "
                        data-toggle="tooltip"
                        title="Delete"
                        href="javascript:void(0)"
                        name="purposedel"
                        onClick={()=>{handleDelete(i)}}
                      >
                        {" "}
                        <i className="fa fa-trash" aria-hidden="true" />{" "}
                      </a>{" "}
                    </td>
                  </tr>
                )})
                :
                <tr>
                  {" "}
                  <td colSpan={9}>
                    <div align="center" className="text-danger">
                      No data available in table <br /> <br />
                      <img src="/assets/images/addnewitem.svg" width={150} />
                      <br />
                      <br />{" "}
                      <span className="text-success bolds">
                        <i className="fa fa-arrow-left" /> Add new record or
                        search with different criteria.
                      </span>
                      <div></div>
                    </div>
                  </td>{" "}
                </tr>
                }
                
                
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
      {/* end col */}
    </div>{" "}
    {/* end row */}
  </div>
</div>

    </div>
  )
}

export default ContentSetupOffice