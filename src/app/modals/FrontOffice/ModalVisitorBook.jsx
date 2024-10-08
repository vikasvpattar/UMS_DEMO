import React from 'react'

function ModalVisitorBook() {
    return (
        <div>
            <div
                className="modal fade bs-example-modal-xl"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myExtraLargeModalLabel"
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
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th className="border0">Purpose</th>
                                        <td className="border0" id="purpose1">
                                            Principal Meeting
                                        </td>
                                        <th className="border0">Name</th>
                                        <td className="border0" id="name1">
                                            Oliver
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td id="phone1">9864641102</td>
                                        <th>Number Of Person</th>
                                        <td id="number1">10</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td id="date1">03/30/2022</td>
                                        <th>In Time</th>
                                        <td id="intime1">01:15 PM</td>
                                    </tr>
                                    <tr>
                                        <th>Out Time</th>
                                        <td id="outtime1">01:45 PM</td>
                                        <th>Note</th>
                                        <td id="note1" />
                                    </tr>
                                    <tr>
                                        <th>Id Card</th>
                                        <td id="idcard1">32554</td>
                                        <th />
                                        <td />
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

export default ModalVisitorBook