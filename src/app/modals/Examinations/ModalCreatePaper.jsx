import React from 'react'

function ModalCreatePaper() {
  return (
    <div
    className="modal fade"
    id="create"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
                  <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
                                  Create Question Paper
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
                                          <th>Marks</th>
                                          <th>No. of Questions</th>
                                         
                                          <th>Total Marks</th>
                                          <th></th>
                                      </tr>
  
                                     <tr>
                                        <th>
<select name="marks" id="marks" className='form-control'>
    <option value="">Select Marks</option>
    <option value="1">1</option>
</select>

                                        </th>
                                        <th>
<input type="number"className="form-control" name="questions" id="questions" placeholder='eg. 10' />

                                        </th>
                                        <th>
<span id="tq"><b>10</b></span>

                                        </th>
                                        <td>
                                            <button className='mr-2 btn btn-success' >Add</button>
                                            <button className='mr-2 btn btn-danger' >Delete</button>

                                        </td>
                                     </tr>
                                      <tr className='bg-light'  >
                                        <th> Total</th>
                                          <th  >20</th>
                                          <th >80</th>
                                          <th></th>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <div className="modal-footer">
                          <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                      </div>

                      {/* /.modal-content */}
                  </div>
                  {/* /.modal-dialog */}
              </div>
  )
}

export default ModalCreatePaper