import React from 'react'

function ModalQuestionPaper() {
  return (
    <div>
        
        <div
  className="modal fade"
  id="view"
  tabIndex={-1}
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myExtraLargeModalLabel">
                                Details
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
                                    </tr>

                                    <tr>
                                        <td>1 </td>
                                        <td>10</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>2 </td>
                                        <td>10</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>3 </td>
                                        <td>5</td>
                                        <td>15</td>
                                    </tr>
                                    <tr>
                                        <td>5 </td>
                                        <td>3</td>
                                        <td>15</td>
                                    </tr>
                                    <tr>
                                        <td>10 </td>
                                        <td>2</td>
                                        <td>20</td>
                                    </tr>
                                    <tr className='bg-light'  >
                                        <th > Total </th>
                                        <th>30</th>
                                        <th>80</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
    </div>
  )
}

export default ModalQuestionPaper