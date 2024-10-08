import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../../../Components/Loader/Loader'
import Nodata from '../../../../Components/NoData/Nodata'
import DocumentReview from '../../../../modals/HR/DocumentWorkflow/DocumentReview'
import { EMPLOYEE_DOCUMENT_MANAGEMENT, HR_WORKFLOW } from '../../../../utils/apiConstants'
import './../DocumentWorkflow.scss'

function DocReview({setLoading, collegeId}) {
  const [status, setStatus] = useState("PENDING")
  const [data, setData] = useState()
  // const [type, setType] = useState()
  const [edit, setEdit] = useState();
  const [flow, setFlow] = useState()




  //Fuction calls a get function which search for documents with the perticular status
  const searchStatus = (s) => {
    setLoading(1)
    setStatus(s);
    
    //this is the cofig for axios
    const config = {
      method: 'get',
      url: `${EMPLOYEE_DOCUMENT_MANAGEMENT}?status=${s}&&college_id=${collegeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    }
    
    axios(config)
      .then((res) => {
        setLoading(0)
        setData(res.data.data)
        // toast.success("successfully data fetched")
        // console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(0)
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      })
  }

  const getDataFlow = async () => {
    setLoading(1)
    const config = {
      method: 'get',
      url: `${HR_WORKFLOW}?type=DOCUMENT&&college_id=${collegeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`
      },
    };

    await axios(config)
      .then((res) => {
        setLoading(0)
        console.log(res.data.data);
        setFlow(res.data.data)
        // toast.success("Data Fetched Success ")
      })
      .catch(err => {
        setLoading(0)
        console.log(err)
      })


  }

  useEffect(() => {
    getDataFlow()
    searchStatus('PENDING')
  }, [])

  return (
    <div className='DocReview'>
      <DocumentReview data={edit} status={status} reloadData={(m)=>{searchStatus(m)}} flow={flow} setLoading={setLoading} collegeId={collegeId}/>
      <div className="container-fluid">

        
        {/* start page title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between mt-3">
              <h4 className="mb-0">Document Review </h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Human Resource</a>
                  </li>
                  <li className="breadcrumb-item active"> Document Review</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}

        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Select Status</h2>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="validationCustom01">
                        Status <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-control"
                        value={status}
                        onChange={(e) => { searchStatus(e.target.value) }}
                      >
                        <option value="" selected>Select Status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="DECLINED">DECLINED</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* end card */}
          </div>
        </div>


        <div className="row mt-3">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {" "}
                  <div className="col-4">
                    <h4 className="card-title">Total : {!data||data?.length===0 ?'0' :data?.length}</h4>
                  </div>
                </div>

                <hr />
                <br />

                <div className="row">
                  <div className="col-12 row px-5 w-100 gap-5">

                    {
                      data && data.length !== 0
                        ?
                        data?.map((i, key) =>
                        (
                          <div
                            className="col-12 crd rowData"
                          >
                            <div className="rounded border card-default card cursor-pointer">
                              <div className="row p-3">
                                <div className="col-10 row">
                                  <div className="col-12">
                                    {i.description}  <strong>({i.submission_date.split("T")[0]})</strong>
                                  </div>
                                  <div className={`col-12 ${i.status==='APPROVED'?'text-success':i.status==='PENDING'?'text-warning':'text-danger'}`}>
                                    {i.status}
                                  </div>
                                </div>
                                <div className='col-2 d-flex justify-content-end justify-self-end' style={{fontSize:'18px'}}>


                                      {i.attachment &&
                                        <div className='px-1 rounded secondary mr-2'>
                                          <a href={i.attachment} target="_" className='text-secondary'><i className="ri-attachment-2"></i></a>
                                        </div>
                                      }
                                      <div
                                        className='px-1 rounded text-secondary cursor-pointer'
                                        data-toggle="modal"
                                        data-target="#ModalDocReview"
                                        onClick={() => { setEdit(i); }}
                                      >
                                        <i className="ri-eye-line"></i>
                                      </div>
                                    </div>
                              </div>
                            </div>
                          </div>
                        ))

                        :
                        <div className='col-12 mb-3'>
                          <Nodata titleTop={'No Data Available for your search'}/>
                        </div>
                    }


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

export default DocReview