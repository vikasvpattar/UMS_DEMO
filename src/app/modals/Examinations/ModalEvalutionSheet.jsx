import React from 'react'

function ModalEvalutionSheet() {
  return (
    <div>


<div
    className="modal fade"
    id="add"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
                  <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
                               Enter Marks <span className="text-danger">(xxxxxxxxxxx001)</span>
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
                              <table className="table ">
                                  <tbody className="text-center">
                                      <tr>
                                          <th> Questions Number</th>
                                          <th>Actual Marks</th>

                                         
                                          <th>Obtain Marks</th>
                                          <th> Total Marks</th>
                                      </tr>
  
                                     <tr>
                                        <th>01</th>
                                     
                                        <th><span id="tq"><b>01</b></span></th>
                                        <th>
<input type="number"className="form-control" name="marks" id="marks" placeholder='1'  />

                                        </th>
                                        <th>01 </th>
                                       
                                     </tr>
                                     <tr>
                                        <th>02</th>
                                     
                                        <th><span id="tq"><b>05</b></span></th>
                                        <th>
<input type="number"className="form-control" name="marks" id="marks" value={'04'} placeholder='1'  />

                                        </th>
                                        <th>04 </th>
                                       
                                     </tr>
                                      <tr className='bg-light'  >
                                        <th> Total</th>
                                          <th  >06</th>
                                          <th >Total Obtain Marks</th>
                                          <th>05</th>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <div className="modal-footer">
                          <button type="button" class="btn btn-primary">Save</button>
                          </div>
                      </div>

                      {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
              </div>

    </div>
  )
}

export default ModalEvalutionSheet