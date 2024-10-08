import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ModalDocumentApproval from '../../../modals/Students/ModalDocumentApproval'
import { STUDENT_ADMISSION_DETAILS } from '../../../utils/apiConstants';

const StudentDocuments = ({ setLoading, data, setData, reloadData }) => {

  const [rejectReason, setRejectReason] = useState();

  const [docname, setDocname] = useState()

  const getDocStatus = (a) => {
    if (a?.status == 'ACTIVE') return 'pending'
    if (a?.status == 'DECLINED') return 'declined'
    if (a?.status == 'APPROVED') return 'approved'
    return 'pending'
  }

  const getDocStatusColor = (a) => {
    if (a?.status == 'ACTIVE') return 'warning'
    if (a?.status == 'DECLINED') return 'danger'
    if (a?.status == 'APPROVED') return 'success'
    return 'warning'
  }

  //Triggers when modal of discarding document submitted
  const rejectDocument = (rr) => {

    setData({
      ...data,
      basic_data: {
        ...data?.basic_data,
        [docname]: {
          ...data?.basic_data?.[docname],
          status: 'DECLINED',
          reason: rr
        }
      }
    })
  }

  //Triggers when document get approved
  const Approve = (a) => {
    setData({
      ...data,
      basic_data: {
        ...data?.basic_data,
        [a]: {
          ...data?.basic_data?.[a],
          status: 'APPROVED',
          reason: ''
        }
      }
    })
  }

  const HandleSubmit = () => {
    const config = {
      method: 'put',
      url: `${STUDENT_ADMISSION_DETAILS}/${data?.basic_data?.user_id}`,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('UMS_auth')}`,
        'Content-Type': 'application/json'
      },
      data: data
    }
    console.log(config.data);

    axios(config)
      .then(res => {
        setLoading(0)
        toast.success(res.data.message)
        reloadData()
      })
      .catch(err => {
        setLoading(0)
        toast.error(err.response.data.message)
      })
  }



  return (
    <div className='StudentDocuments'>
      <ModalDocumentApproval setRejectReason={setRejectReason} rejectDocument={(rr) => rejectDocument(rr)} />
      <div className="row">
        <div className=" col-12 row d-flex align-items-center">
          <h4 className="col-6 my-3">
            Documents Attached
          </h4>
          <div className="col-6 d-flex justify-content-end">
            <button className='btn btn-primary' onClick={HandleSubmit}>save</button>
          </div>
        </div>
        <div className="col-12">
          <table className="table table-bordered nowrap overflow-auto">
            <thead>
              <tr>
                <th>Document</th>
                <th>Status</th>
                <th>Comment</th>
                {/* <th>Approved by</th> */}

                <th style={{ maxWidth: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                            infoData && infoData?.map((data, key) => {
                              return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{data.document}</td>
                                <td> {data.status}</td>
                                <td> {data.comment}</td>
                                <td> {data.approvedby}</td>

                          


                                <td><a className='badge badge-light text-danger mr-3' data-toggle="modal"  data-target="#exampleModalLong" title="Discard"> <i class="fa fa-minus" aria-hidden="true"></i></a>
                                 
                                <a className='badge badge-light text-success mr-3' data-toggle="tooltip" title="Approve" > <i class="fa fa-check " aria-hidden="true"></i></a>
                                
                                  <a className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="View" > <i class="fa fa-eye " aria-hidden="true"></i></a>
                                </td>
                              </tr>
                            })


                          } */}
              {
                data?.basic_data?.aadhar?.link
                  ?
                  <tr>
                    <td>Aadhar</td>
                    <td><span className={`badge badge-soft-${getDocStatusColor(data?.basic_data?.aadhar)}`}>{getDocStatus(data?.basic_data?.aadhar)}</span></td>
                    <td>
                      {data?.basic_data?.aadhar?.reason
                        ?
                        data?.basic_data?.aadhar?.reason
                        :
                        'No Comments'
                      }
                    </td>
                    {/* <td>NA</td> */}
                    <td>
                      {
                        data?.basic_data?.aadhar?.status == 'APPROVED'
                        ?
                        <>
                        <a className='badge badge-light text-danger mr-3' data-toggle="modal" data-target="#exampleModalLong" title="Discard" onClick={() => setDocname('aadhar')}> <i class="fa fa-minus" aria-hidden="true"></i></a>
                        </>
                        :
                        data?.basic_data?.aadhar?.status =='DECLINED'
                        ?
                        <a className='badge badge-light text-success mr-3' data-toggle="tooltip" title="Approve" onClick={() => { setDocname('aadhar'); Approve('aadhar') }}> <i class="fa fa-check " aria-hidden="true"></i></a>
                        :
                        <>
                        <a className='badge badge-light text-danger mr-3' data-toggle="modal" data-target="#exampleModalLong" title="Discard" onClick={() => setDocname('aadhar')}> <i class="fa fa-minus" aria-hidden="true"></i></a>
                        <a className='badge badge-light text-success mr-3' data-toggle="tooltip" title="Approve" onClick={() => { setDocname('aadhar'); Approve('aadhar') }}> <i class="fa fa-check " aria-hidden="true"></i></a>
                        </>
                      }


                      <a className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="View" href={data?.basic_data?.aadhar?.link} target="_blank"> <i class="fa fa-eye " aria-hidden="true"></i></a>
                    </td>
                  </tr>
                  :
                  null
              }
              {
                data?.basic_data?.sslc_markscard?.link
                  ?
                  <tr>
                    <td>10th Marks Card</td>
                    <td><span className={`badge badge-soft-${getDocStatusColor(data?.basic_data?.sslc_markscard)}`}>{getDocStatus(data?.basic_data?.sslc_markscard)}</span></td>
                    <td>
                      {data?.basic_data?.sslc_markscard?.reason
                        ?
                        data?.basic_data?.sslc_markscard?.reason
                        :
                        'No Comments'
                      }
                    </td>
                    {/* <td>NA</td> */}
                    <td>
                      {
                        data?.basic_data?.sslc_markscard?.status == 'APPROVED'
                        ?
                        <>
                        <a className='badge badge-light text-danger mr-3' data-toggle="modal" data-target="#exampleModalLong" title="Discard" onClick={() => setDocname('sslc_markscard')}> <i class="fa fa-minus" aria-hidden="true"></i></a>
                        </>
                        :
                        data?.basic_data?.sslc_markscard?.status == 'DECLINED'
                        ?
                        <a className='badge badge-light text-success mr-3' data-toggle="tooltip" title="Approve" onClick={() => { setDocname('sslc_markscard'); Approve('sslc_markscard') }}> <i class="fa fa-check " aria-hidden="true"></i></a>
                        :
                        data?.basic_data?.sslc_markscard?.status == 'ACTIVE'
                        ?
                        <>
                          <a className='badge badge-light text-danger mr-3' data-toggle="modal" data-target="#exampleModalLong" title="Discard" onClick={() => setDocname('sslc_markscard')}> <i class="fa fa-minus" aria-hidden="true"></i></a>
                          <a className='badge badge-light text-success mr-3' data-toggle="tooltip" title="Approve" onClick={() => { setDocname('sslc_markscard'); Approve('sslc_markscard') }}> <i class="fa fa-check " aria-hidden="true"></i></a>
                        </>
                        :
                        null

                      }


                      <a className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="View" href={data?.basic_data?.sslc_markscard?.link} target="_blank"> <i class="fa fa-eye " aria-hidden="true"></i></a>
                    </td>
                  </tr>
                  :
                  null
              }
              {
                data?.basic_data?.pu_markscard?.link
                  ?
                  <tr>
                    <td>12th Marks Card</td>
                    <td><span className={`badge badge-soft-${getDocStatusColor(data?.basic_data?.pu_markscard)}`}>{getDocStatus(data?.basic_data?.pu_markscard)}</span></td>
                    <td>
                      {data?.basic_data?.pu_markscard?.reason
                        ?
                        data?.basic_data?.pu_markscard?.reason
                        :
                        'No Comments'
                      }
                    </td>
                    {/* <td>NA</td> */}
                    <td>
                      {
                        data?.basic_data?.pu_markscard?.status == 'APPROVED'
                        ?<> 
                        <a className='badge badge-light text-danger mr-3' data-toggle="modal" data-target="#exampleModalLong" title="Discard" onClick={() => setDocname('pu_markscard')}> <i class="fa fa-minus" aria-hidden="true"></i></a>
                        </>
                        :
                        data?.basic_data?.pu_markscard?.status == 'DECLINED'
                        ?
                        <a 
                        className='badge badge-light text-success mr-3' 
                        data-toggle="tooltip" 
                        title="Approve" 
                        onClick={() => { setDocname('pu_markscard'); Approve('pu_markscard') }}> 
                          <i class="fa fa-check " aria-hidden="true"></i>
                        </a>
                        :
                        data?.basic_data?.pu_markscard?.status == 'ACTIVE'
                        ?
                        <>
                          <a 
                          className='badge badge-light text-danger mr-3' 
                          data-toggle="modal" 
                          data-target="#exampleModalLong" 
                          title="Discard" 
                          onClick={() => setDocname('pu_markscard')}> 
                            <i class="fa fa-minus" aria-hidden="true"></i>
                          </a>
                          <a 
                          className='badge badge-light text-success mr-3' 
                          data-toggle="tooltip" 
                          title="Approve" 
                          onClick={() => { setDocname('pu_markscard'); Approve('pu_markscard') }}>    
                            <i class="fa fa-check " aria-hidden="true"></i>
                          </a>
                        </>
                        :
                        null

                      }


                      <a className='badge badge-light text-dark mr-3' data-toggle="tooltip" title="View" href={data?.basic_data?.pu_markscard?.link} target="_blank"> <i class="fa fa-eye " aria-hidden="true"></i></a>
                    </td>
                  </tr>
                  :
                  null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentDocuments