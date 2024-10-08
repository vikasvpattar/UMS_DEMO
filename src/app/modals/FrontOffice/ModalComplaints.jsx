import React from 'react'

function ModalComplaints() {
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
                                        <th className="border0">Complain #</th>
                                        <td className="border0" id="comp1">
                                            01
                                        </td>
                                        <th className="border0">Complain Type</th>
                                        <td className="border0" id="compla1">
                                            Study{" "}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Source</th>
                                        <td id="source1">Admission Campa</td>
                                        <th>Name</th>
                                        <td id="name1"> Aston</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td id="phone1"> 9846544111</td>
                                        <th>Date</th>
                                        <td id="date1">03/30/2022</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td id="desc1" />
                                        <th>Action Taken</th>
                                        <td id="action1" />
                                    </tr>
                                    <tr>
                                        <th>Assigned</th>
                                        <td id="assign1" />
                                        <th>Note</th>
                                        <td id="note1" />
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

export default ModalComplaints