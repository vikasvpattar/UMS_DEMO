import React from 'react'
import { useState } from 'react'

function ModalDocumentApproval({setRejectReason, rejectDocument}) {
    const [data, setData] = useState('')

    const handleClick = () => {
        setRejectReason(data);
        rejectDocument(data)
        setData('')
    }
    return (
        <div>
            <div
                className="modal fade"
                id="exampleModalLong"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                               Document Approval
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
                                <div className="col-md-12">
                                    <input 
                                    type="text" 
                                    placeholder='Comment' 
                                    className="form-control"
                                    value={data}
                                    onChange={(e)=>{setData(e.target.value)}}
                                    />
                                    <div className='text-danger'>
                                        <i className='ri-information-line'></i> The Application will be declined after declining of a perticular document
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            {
                                data
                                ?
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    name="submit"
                                    value="bulk"
                                    onClick={handleClick}
                                    data-dismiss="modal"
                                >
                                    Decline Document
                                </button>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDocumentApproval