import React from 'react'

function ModalPostalRecieve() {
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
                                        <th className="border0">To Title</th>
                                        <td className="border0" id="to1">
                                            School
                                        </td>
                                        <th className="border0">Reference No</th>
                                        <td className="border0" id="ref1">
                                            1200
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td id="addre1" />
                                        <th>Note</th>
                                        <td id="note1" />
                                    </tr>
                                    <tr>
                                        <th>From Title</th>
                                        <td id="from1">Online Learning Material</td>
                                        <th>Date</th>
                                        <td id="date1">03/30/2022</td>
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

export default ModalPostalRecieve